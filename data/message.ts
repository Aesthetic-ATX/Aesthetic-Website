/**
 * "This week's message": the homepage video card, set with the same bulletin
 * masthead as the Weekly (layout from Screenshot #1, chosen 2026-09-17).
 *
 * Hand updated. The series and episode are edited here each week; the video
 * itself can later be pulled from the YouTube channel in data/site.ts.
 */
export const message = {
  kicker: "THIS WEEK'S MESSAGE",
  /** Series name. Carries the masthead line. */
  series: "Incognito",
  /** Episode, set smaller on the second line. */
  episode: "Jesus in the Old Testament (Week 8)",
} as const;
