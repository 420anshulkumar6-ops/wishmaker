// ===== categoryConfig.js (backend copy) =====
// IMPORTANT: this must stay in sync with the frontend's js/category-config.js —
// specifically the designId, photoPosition, namePosition, music file names,
// and videoDurationSeconds for every design. The frontend drives the UI;
// this file drives the actual FFmpeg render, so a mismatch here means the
// video won't match what the user saw on the form.
//
// The frontend also carries `fields`, `article`, `previewVideo`, `label`,
// `icon`, and `tagline` — the backend doesn't need those, so they're
// intentionally left out here to keep this file focused on render-inputs only.

const categorySettings = {
  birthday: {
    designs: [
      {
        id: "birthday-1",
        backgroundVideo: "assets/bg_birthday1.mp4", // bundled with this backend repo
        photoPosition: {
          topPercent: 24.5,
          leftPercent: 50,
          widthPercent: 47.5,
          shape: "circle"
        },
        namePosition: {
          topPercent: 52
        },
        sourceClipSeconds: 8,
        videoDurationSeconds: 18,
        music: [
          { id: "m1", file: "music/birthday-1.mp3" },
          { id: "m2", file: "music/birthday-2.mp3" },
          { id: "m3", file: "music/birthday-3.mp3" },
          { id: "m4", file: "music/birthday-4.mp3" }
        ]
      }
      ,{
        id: "birthday-2",
        backgroundVideo: "assets/bg_birthday1.mp4", // reusing birthday-1's video
        photoPosition: { topPercent: 24.5, leftPercent: 50, widthPercent: 62.5, shape: "circle" },
        namePosition: { topPercent: 58 },
        sourceClipSeconds: 4.7,
        videoDurationSeconds: 18,
        music: [
          { id: "m1", file: "music/birthday-1.mp3" },
          { id: "m2", file: "music/birthday-2.mp3" },
          { id: "m3", file: "music/birthday-3.mp3" },
          { id: "m4", file: "music/birthday-4.mp3" }
        ]
      }
      ,{
        id: "birthday-3",
        backgroundVideo: "assets/bg_birthday1.mp4", // reusing birthday-1's video
        photoPosition: { topPercent: 24.5, leftPercent: 50, widthPercent: 62.5, shape: "circle" },
        namePosition: { topPercent: 58 },
        sourceClipSeconds: 4.7,
        videoDurationSeconds: 18,
        music: [
          { id: "m1", file: "music/birthday-1.mp3" },
          { id: "m2", file: "music/birthday-2.mp3" },
          { id: "m3", file: "music/birthday-3.mp3" },
          { id: "m4", file: "music/birthday-4.mp3" }
        ]
      }
      ,{
        id: "birthday-4",
        backgroundVideo: "assets/bg_birthday1.mp4", // reusing birthday-1's video
        photoPosition: { topPercent: 24.5, leftPercent: 50, widthPercent: 62.5, shape: "circle" },
        namePosition: { topPercent: 58 },
        sourceClipSeconds: 4.7,
        videoDurationSeconds: 18,
        music: [
          { id: "m1", file: "music/birthday-1.mp3" },
          { id: "m2", file: "music/birthday-2.mp3" },
          { id: "m3", file: "music/birthday-3.mp3" },
          { id: "m4", file: "music/birthday-4.mp3" }
        ]
      }
      ,{
        id: "birthday-5",
        backgroundVideo: "assets/bg_birthday1.mp4", // reusing birthday-1's video
        photoPosition: { topPercent: 24.5, leftPercent: 50, widthPercent: 62.5, shape: "circle" },
        namePosition: { topPercent: 58 },
        sourceClipSeconds: 4.7,
        videoDurationSeconds: 18,
        music: [
          { id: "m1", file: "music/birthday-1.mp3" },
          { id: "m2", file: "music/birthday-2.mp3" },
          { id: "m3", file: "music/birthday-3.mp3" },
          { id: "m4", file: "music/birthday-4.mp3" }
        ]
      }
      ,{
        id: "birthday-6",
        backgroundVideo: "assets/bg_birthday1.mp4", // reusing birthday-1's video
        photoPosition: { topPercent: 24.5, leftPercent: 50, widthPercent: 62.5, shape: "circle" },
        namePosition: { topPercent: 58 },
        sourceClipSeconds: 4.7,
        videoDurationSeconds: 18,
        music: [
          { id: "m1", file: "music/birthday-1.mp3" },
          { id: "m2", file: "music/birthday-2.mp3" },
          { id: "m3", file: "music/birthday-3.mp3" },
          { id: "m4", file: "music/birthday-4.mp3" }
        ]
      }
      ,{
        id: "birthday-7",
        backgroundVideo: "assets/bg_birthday1.mp4", // reusing birthday-1's video
        photoPosition: { topPercent: 24.5, leftPercent: 50, widthPercent: 62.5, shape: "circle" },
        namePosition: { topPercent: 58 },
        sourceClipSeconds: 4.7,
        videoDurationSeconds: 18,
        music: [
          { id: "m1", file: "music/birthday-1.mp3" },
          { id: "m2", file: "music/birthday-2.mp3" },
          { id: "m3", file: "music/birthday-3.mp3" },
          { id: "m4", file: "music/birthday-4.mp3" }
        ]
      }
      ,{
        id: "birthday-8",
        backgroundVideo: "assets/bg_birthday1.mp4", // reusing birthday-1's video
        photoPosition: { topPercent: 24.5, leftPercent: 50, widthPercent: 62.5, shape: "circle" },
        namePosition: { topPercent: 58 },
        sourceClipSeconds: 4.7,
        videoDurationSeconds: 18,
        music: [
          { id: "m1", file: "music/birthday-1.mp3" },
          { id: "m2", file: "music/birthday-2.mp3" },
          { id: "m3", file: "music/birthday-3.mp3" },
          { id: "m4", file: "music/birthday-4.mp3" }
        ]
      }
      ,{
        id: "birthday-9",
        backgroundVideo: "assets/bg_birthday1.mp4", // reusing birthday-1's video
        photoPosition: { topPercent: 24.5, leftPercent: 50, widthPercent: 62.5, shape: "circle" },
        namePosition: { topPercent: 58 },
        sourceClipSeconds: 4.7,
        videoDurationSeconds: 18,
        music: [
          { id: "m1", file: "music/birthday-1.mp3" },
          { id: "m2", file: "music/birthday-2.mp3" },
          { id: "m3", file: "music/birthday-3.mp3" },
          { id: "m4", file: "music/birthday-4.mp3" }
        ]
      }
      ,{
        id: "birthday-10",
        backgroundVideo: "assets/bg_birthday1.mp4", // reusing birthday-1's video
        photoPosition: { topPercent: 24.5, leftPercent: 50, widthPercent: 62.5, shape: "circle" },
        namePosition: { topPercent: 58 },
        sourceClipSeconds: 4.7,
        videoDurationSeconds: 18,
        music: [
          { id: "m1", file: "music/birthday-1.mp3" },
          { id: "m2", file: "music/birthday-2.mp3" },
          { id: "m3", file: "music/birthday-3.mp3" },
          { id: "m4", file: "music/birthday-4.mp3" }
        ]
      }
      ,{
        id: "birthday-11",
        backgroundVideo: "assets/bg_birthday1.mp4", // reusing birthday-1's video
        photoPosition: { topPercent: 24.5, leftPercent: 50, widthPercent: 62.5, shape: "circle" },
        namePosition: { topPercent: 58 },
        sourceClipSeconds: 4.7,
        videoDurationSeconds: 18,
        music: [
          { id: "m1", file: "music/birthday-1.mp3" },
          { id: "m2", file: "music/birthday-2.mp3" },
          { id: "m3", file: "music/birthday-3.mp3" },
          { id: "m4", file: "music/birthday-4.mp3" }
        ]
      }
      ,{
        id: "birthday-12",
        backgroundVideo: "assets/bg_birthday1.mp4", // reusing birthday-1's video
        photoPosition: { topPercent: 24.5, leftPercent: 50, widthPercent: 62.5, shape: "circle" },
        namePosition: { topPercent: 58 },
        sourceClipSeconds: 4.7,
        videoDurationSeconds: 18,
        music: [
          { id: "m1", file: "music/birthday-1.mp3" },
          { id: "m2", file: "music/birthday-2.mp3" },
          { id: "m3", file: "music/birthday-3.mp3" },
          { id: "m4", file: "music/birthday-4.mp3" }
        ]
      }
    ]
  }

  ,rakhi: {
    designs: [
      {
        id: "rakhi-1",
        backgroundVideo: "assets/bg_rakhi1.mp4", // ⬅️ ADD THIS FILE to backend's /assets folder too
        photoPosition: { topPercent: 24.5, leftPercent: 50, widthPercent: 62.5, shape: "circle" },
        namePosition: { topPercent: 58 },
        sourceClipSeconds: 4.7,
        videoDurationSeconds: 18,
        music: [
          { id: "m1", file: "music/rakhi-1.mp3" }, // ⬅️ ADD
          { id: "m2", file: "music/rakhi-2.mp3" }  // ⬅️ ADD
        ]
      }
    ]
  }

  ,diwali: {
    designs: [
      {
        id: "diwali-1",
        backgroundVideo: "assets/bg_diwali1.mp4", // ⬅️ ADD THIS FILE to backend's /assets folder too
        photoPosition: { topPercent: 24.5, leftPercent: 50, widthPercent: 62.5, shape: "square" },
        namePosition: { topPercent: 58 },
        sourceClipSeconds: 4.7,
        videoDurationSeconds: 18,
        music: [
          { id: "m1", file: "music/diwali-1.mp3" }, // ⬅️ ADD
          { id: "m2", file: "music/diwali-2.mp3" }  // ⬅️ ADD
        ]
      }
    ]
  }

  ,anniversary: {
    designs: [
      {
        id: "anniversary-1",
        backgroundVideo: "assets/bg_anniversary1.mp4", // ⬅️ ADD THIS FILE to backend's /assets folder too
        photoPosition: { topPercent: 24.5, leftPercent: 50, widthPercent: 62.5, shape: "circle" },
        namePosition: { topPercent: 58 },
        sourceClipSeconds: 4.7,
        videoDurationSeconds: 18,
        music: [
          { id: "m1", file: "music/anniversary-1.mp3" }, // ⬅️ ADD
          { id: "m2", file: "music/anniversary-2.mp3" }  // ⬅️ ADD
        ]
      }
    ]
  }

  ,independence: {
    designs: [
      {
        id: "independence-1",
        backgroundVideo: "assets/bg_independence1.mp4", // ⬅️ ADD THIS FILE to backend's /assets folder too
        photoPosition: { topPercent: 24.5, leftPercent: 50, widthPercent: 62.5, shape: "square" },
        namePosition: { topPercent: 58 },
        sourceClipSeconds: 4.7,
        videoDurationSeconds: 18,
        music: [
          { id: "m1", file: "music/independence-1.mp3" }, // ⬅️ ADD
          { id: "m2", file: "music/independence-2.mp3" }  // ⬅️ ADD
        ]
      }
    ]
  }

  ,holi: {
    designs: [
      {
        id: "holi-1",
        backgroundVideo: "assets/bg_holi1.mp4", // ⬅️ ADD THIS FILE to backend's /assets folder too
        photoPosition: { topPercent: 24.5, leftPercent: 50, widthPercent: 62.5, shape: "circle" },
        namePosition: { topPercent: 58 },
        sourceClipSeconds: 4.7,
        videoDurationSeconds: 18,
        music: [
          { id: "m1", file: "music/holi-1.mp3" }, // ⬅️ ADD
          { id: "m2", file: "music/holi-2.mp3" }  // ⬅️ ADD
        ]
      }
    ]
  }

  ,newyear: {
    designs: [
      {
        id: "newyear-1",
        backgroundVideo: "assets/bg_newyear1.mp4", // ⬅️ ADD THIS FILE to backend's /assets folder too
        photoPosition: { topPercent: 24.5, leftPercent: 50, widthPercent: 62.5, shape: "square" },
        namePosition: { topPercent: 58 },
        sourceClipSeconds: 4.7,
        videoDurationSeconds: 18,
        music: [
          { id: "m1", file: "music/newyear-1.mp3" }, // ⬅️ ADD
          { id: "m2", file: "music/newyear-2.mp3" }  // ⬅️ ADD
        ]
      }
    ]
  }

  ,wedding: {
    designs: [
      {
        id: "wedding-1",
        backgroundVideo: "assets/bg_wedding1.mp4", // ⬅️ ADD THIS FILE to backend's /assets folder too
        photoPosition: { topPercent: 24.5, leftPercent: 50, widthPercent: 62.5, shape: "circle" },
        namePosition: { topPercent: 58 },
        sourceClipSeconds: 4.7,
        videoDurationSeconds: 18,
        music: [
          { id: "m1", file: "music/wedding-1.mp3" }, // ⬅️ ADD
          { id: "m2", file: "music/wedding-2.mp3" }  // ⬅️ ADD
        ]
      }
    ]
  }
};

module.exports = { categorySettings };
