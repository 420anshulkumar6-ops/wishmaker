// ===== categoryConfig.js (backend copy) =====
// IMPORTANT: this must stay in sync with the frontend's js/category-config.js.
// The frontend uses this data to build the form UI; the backend uses the
// exact same photoPosition/video values to actually render the video with FFmpeg.
// When you add a new design on the frontend, copy the same entry here too.

const categorySettings = {
  birthday: {
    designs: [
      {
        id: "birthday-1",
        backgroundVideo: "assets/bg_birthday1.mp4", // bundled with this backend repo
        photoPosition: {
          topPercent: 24.5,
          leftPercent: 50,
          widthPercent: 62.5,
          shape: "circle"
        },
        // Independent from photoPosition — the name label doesn't have to
        // sit at a fixed offset below the photo, since designs vary (some
        // have a ribbon far below the circle, some right underneath).
        namePosition: {
          topPercent: 58
        },
        sourceClipSeconds: 4.7,
        videoDurationSeconds: 18
      }
    ],
    music: [
      { id: "m1", file: "music/birthday-1.mp3" },
      { id: "m2", file: "music/birthday-2.mp3" },
      { id: "m3", file: "music/birthday-3.mp3" },
      { id: "m4", file: "music/birthday-4.mp3" }
    ]
  }
};

module.exports = { categorySettings };
