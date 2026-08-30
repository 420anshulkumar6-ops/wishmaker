// ===== server.js =====
// WishCraft video rendering backend.
//
// Flow for POST /render:
//   1. Receive { theme, designId, name, musicId, photoUrl }
//   2. Look up the matching design + music in categoryConfig.js
//   3. Download the user's photo from its ImgBB URL
//   4. Use FFmpeg to: loop the background clip to full length, crop the
//      photo into the circle/shape at the measured position, overlay the
//      name text, mute the clip's own audio, and mix in the chosen music
//   5. Return a URL to the finished video
//
// NOTE: Step 5 currently returns a local temporary URL for testing.
// Cloudflare R2 upload will replace this once R2 credentials are added
// (see the TODO block near the bottom of renderVideo()).

const express = require("express");
const cors = require("cors");
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const { categorySettings } = require("./categoryConfig");

ffmpeg.setFfmpegPath(ffmpegPath);

const app = express();
app.use(cors());
app.use(express.json());

const TMP_DIR = path.join(__dirname, "tmp");
if (!fs.existsSync(TMP_DIR)) fs.mkdirSync(TMP_DIR);

// Serve rendered videos locally for now (testing only — replaced by R2 later).
// Explicit CORS + range-request headers are needed here specifically because
// browsers require them to fetch() a video as a blob (for download) rather
// than just play it in a <video> tag.
app.use("/files", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, HEAD");
  next();
}, express.static(TMP_DIR, {
  acceptRanges: true
}));

app.get("/", (req, res) => {
  res.send("WishCraft backend is running.");
});

/**
 * Converts photoPosition percentages (from the position tool) into pixel
 * coordinates on the 720x1280 canvas. Shared by /render and /preview-position
 * so both always agree on where the photo box actually is.
 */
function calculateBoxPixels(photoPosition, canvasW = 720, canvasH = 1280) {
  const { topPercent, leftPercent, widthPercent } = photoPosition;
  const boxW = Math.round((widthPercent / 100) * canvasW);
  const boxX = Math.round(((leftPercent / 100) * canvasW) - (boxW / 2));
  const boxY = Math.round((topPercent / 100) * canvasH);
  return { boxW, boxX, boxY };
}

/**
 * DEV/TESTING ONLY — not part of the production wish-creation flow.
 * Renders a SINGLE FRAME (not a full video) so you can quickly check where
 * a photo lands for a given design + position values, without waiting for
 * a full ~18s video render each time. Use this from the position-tester
 * page to dial in photoPosition values for a new design before adding it
 * to categoryConfig.js.
 *
 * POST /preview-position
 * body: { designId, photoUrl, topPercent, leftPercent, widthPercent, name, nameTopPercent }
 * returns: a JPEG image directly (not JSON)
 */
app.post("/preview-position", async (req, res) => {
  const { designId, photoUrl, topPercent, leftPercent, widthPercent, name, nameTopPercent } = req.body;

  try {
    let design = null;
    for (const cat of Object.values(categorySettings)) {
      const found = cat.designs.find(d => d.id === designId);
      if (found) { design = found; break; }
    }
    if (!design) return res.status(400).json({ error: "Unknown design: " + designId });
    if (!photoUrl) return res.status(400).json({ error: "photoUrl is required" });

    const jobId = uuidv4();
    const photoPath = path.join(TMP_DIR, `${jobId}-photo.jpg`);
    const framePath = path.join(TMP_DIR, `${jobId}-frame.jpg`);

    const photoResponse = await axios.get(photoUrl, { responseType: "arraybuffer" });
    fs.writeFileSync(photoPath, photoResponse.data);

    const backgroundPath = path.join(__dirname, design.backgroundVideo);
    const testPosition = {
      topPercent: parseFloat(topPercent),
      leftPercent: parseFloat(leftPercent),
      widthPercent: parseFloat(widthPercent),
      shape: design.photoPosition.shape
    };
    const testNameTopPercent = (nameTopPercent !== undefined && nameTopPercent !== null && nameTopPercent !== "")
      ? parseFloat(nameTopPercent)
      : undefined; // falls back to the auto-calculated position if not provided

    await renderSingleFrame({ backgroundPath, photoPath, framePath, photoPosition: testPosition, nameTopPercent: testNameTopPercent, name });

    fs.unlinkSync(photoPath);
    res.sendFile(framePath, () => fs.unlink(framePath, () => {}));

  } catch (err) {
    console.error("Preview failed:", err);
    res.status(500).json({ error: "Preview render failed" });
  }
});

app.post("/render", async (req, res) => {
  const { theme, designId, name, quote, musicId, photoUrl } = req.body;

  try {
    // ---- 1. Validate & look up config ----
    const category = categorySettings[theme];
    if (!category) return res.status(400).json({ error: "Unknown theme: " + theme });

    const design = category.designs.find(d => d.id === designId);
    if (!design) return res.status(400).json({ error: "Unknown design: " + designId });

    const track = design.music.find(m => m.id === musicId);
    if (!track) return res.status(400).json({ error: "Unknown music id: " + musicId });

    if (!photoUrl) return res.status(400).json({ error: "photoUrl is required" });

    // ---- 2. Download the user's photo ----
    const jobId = uuidv4();
    const photoPath = path.join(TMP_DIR, `${jobId}-photo.jpg`);
    const outputPath = path.join(TMP_DIR, `${jobId}-output.mp4`);

    const photoResponse = await axios.get(photoUrl, { responseType: "arraybuffer" });
    fs.writeFileSync(photoPath, photoResponse.data);

    // ---- 3. Render with FFmpeg ----
    const backgroundPath = path.join(__dirname, design.backgroundVideo);
    const musicPath = path.join(__dirname, track.file);

    await renderVideo({
      backgroundPath,
      photoPath,
      musicPath,
      outputPath,
      design,
      name,
      quote
    });

    // ---- 4. Clean up the downloaded photo (we don't need to keep it) ----
    fs.unlinkSync(photoPath);

    // ---- 5. Return the video URL ----
    // TODO: upload outputPath to Cloudflare R2 here and return the R2 public
    // URL instead. For now this returns a local URL for testing — it will
    // stop working once the server restarts or sleeps (free tier).
    //
    // IMPORTANT: hard-code https:// here rather than using req.protocol.
    // Render terminates TLS at its proxy and forwards requests to this
    // server as plain HTTP internally, so req.protocol reports "http" even
    // though the site is served over HTTPS — that mismatch was causing
    // "Mixed Content" errors that silently blocked the video from loading.
    const videoUrl = `https://${req.get("host")}/files/${jobId}-output.mp4`;
    res.json({ videoUrl });

  } catch (err) {
    console.error("Render failed:", err);
    res.status(500).json({ error: "Video rendering failed" });
  }
});

/**
 * Builds and runs the FFmpeg filter chain:
 *  - loops the background clip to reach videoDurationSeconds
 *  - crops the user's photo into a circle (or rounded-rect) at the
 *    measured position/size for this design
 *  - overlays it onto the background
 *  - overlays the name as text, if provided
 *  - replaces the background clip's own audio with the chosen music track,
 *    trimmed/looped to match the final video length
 */
function renderVideo({ backgroundPath, photoPath, musicPath, outputPath, design, name, quote }) {
  return new Promise((resolve, reject) => {
    const { shape } = design.photoPosition;
    const duration = design.videoDurationSeconds;
    const loopCount = Math.ceil(duration / design.sourceClipSeconds);
    const { boxW, boxX, boxY } = calculateBoxPixels(design.photoPosition);
    // namePosition/quotePosition are independent of the photo box — each
    // falls back to a reasonable default if a design hasn't defined one.
    const nameTopPercent = design.namePosition?.topPercent ?? null;
    const nameY = nameTopPercent !== null
      ? Math.round((nameTopPercent / 100) * 1280)
      : boxY + boxW + 70;
    const quoteTopPercent = design.quotePosition?.topPercent ?? null;
    const quoteY = quoteTopPercent !== null
      ? Math.round((quoteTopPercent / 100) * 1280)
      : nameY + 60;

    const isCircle = shape === "circle";

    // geq-based alpha mask crops the square photo into a circle by making
    // every pixel outside the circle's radius fully transparent.
    // scale+crop first forces any photo (portrait/landscape/square) into a
    // true square by filling the box and cropping the overflow, instead of
    // stretching it — this is what was distorting non-square photos before.
    const circleMaskFilter = isCircle
      ? `,format=rgba,geq=a='if(gt(pow(X-${boxW / 2},2)+pow(Y-${boxW / 2},2),pow(${boxW / 2},2)),0,255)':r='r(X,Y)':g='g(X,Y)':b='b(X,Y)'`
      : ",format=rgba"; // rounded-rect designs can extend this later with a different mask

    const nameOverlay = name
      ? `,drawtext=text='${escapeForDrawtext(name)}':fontcolor=white:fontsize=48:x=(w-text_w)/2:y=${nameY}:borderw=3:bordercolor=black@0.5`
      : "";

    // Quote uses a smaller font since it's typically a longer line than a name.
    const quoteOverlay = quote
      ? `,drawtext=text='${escapeForDrawtext(quote, 60)}':fontcolor=white:fontsize=30:x=(w-text_w)/2:y=${quoteY}:borderw=2:bordercolor=black@0.5`
      : "";

    const filterComplex = [
      `[1:v]scale=${boxW}:${boxW}:force_original_aspect_ratio=increase,crop=${boxW}:${boxW}${circleMaskFilter}[photo]`,
      `[0:v][photo]overlay=x=${boxX}:y=${boxY}${nameOverlay}${quoteOverlay}[videoOut]`
    ].join(";");

    ffmpeg()
      .input(backgroundPath)
      .inputOptions([`-stream_loop ${loopCount}`])
      .input(photoPath)
      .input(musicPath)
      .inputOptions(["-stream_loop -1"]) // loop music so it never runs out before the video ends
      .complexFilter(filterComplex)
      .outputOptions([
        "-map", "[videoOut]",
        "-map", "2:a",       // use the music track's audio, not the background clip's
        "-t", `${duration}`, // hard-cap total output length
        "-c:v", "libx264",
        "-preset", "veryfast",
        "-c:a", "aac",
        "-shortest"
      ])
      .on("end", () => resolve())
      .on("error", (err) => reject(err))
      .save(outputPath);
  });
}

// Basic sanitization so text can't break out of the drawtext filter string
function escapeForDrawtext(text, maxLength = 30) {
  return text.replace(/[\\':]/g, "").slice(0, maxLength);
}

/**
 * Same photo-crop + overlay logic as renderVideo, but outputs a single JPEG
 * frame instead of a full video — used only by /preview-position for fast
 * iteration while dialing in a new design's photoPosition values.
 */
function renderSingleFrame({ backgroundPath, photoPath, framePath, photoPosition, nameTopPercent, name }) {
  return new Promise((resolve, reject) => {
    const { shape } = photoPosition;
    const { boxW, boxX, boxY } = calculateBoxPixels(photoPosition);
    const isCircle = shape === "circle";
    const nameY = (nameTopPercent !== null && nameTopPercent !== undefined)
      ? Math.round((nameTopPercent / 100) * 1280)
      : boxY + boxW + 70;

    const circleMaskFilter = isCircle
      ? `,format=rgba,geq=a='if(gt(pow(X-${boxW / 2},2)+pow(Y-${boxW / 2},2),pow(${boxW / 2},2)),0,255)':r='r(X,Y)':g='g(X,Y)':b='b(X,Y)'`
      : ",format=rgba";

    const nameOverlay = name
      ? `,drawtext=text='${escapeForDrawtext(name)}':fontcolor=white:fontsize=48:x=(w-text_w)/2:y=${nameY}:borderw=3:bordercolor=black@0.5`
      : "";

    const filterComplex = [
      `[1:v]scale=${boxW}:${boxW}:force_original_aspect_ratio=increase,crop=${boxW}:${boxW}${circleMaskFilter}[photo]`,
      `[0:v][photo]overlay=x=${boxX}:y=${boxY}${nameOverlay}[frameOut]`
    ].join(";");

    ffmpeg()
      .input(backgroundPath)
      .input(photoPath)
      .complexFilter(filterComplex)
      .outputOptions([
        "-map", "[frameOut]",
        "-frames:v", "1"
      ])
      .on("end", () => resolve())
      .on("error", (err) => reject(err))
      .save(framePath);
  });
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`WishCraft backend listening on port ${PORT}`);
});
