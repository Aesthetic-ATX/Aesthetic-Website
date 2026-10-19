/**
 * The current sermon series: the homepage section under the About preview (replaces the weekly
 * message card, 2026-10-19). The ring has one tick per day of the series, the Sundays drawn
 * long; the browser marks this Sunday in green by the Austin calendar, so nothing needs bumping
 * week to week.
 *
 * New series: replace this object. A week with no title yet prints as a redaction bar with the
 * Sunday it will be revealed (the week before). Titles in sentence case; no em dashes in copy.
 * Source for "This is Aesthetic": John, 2026-10-19. His two em dashes became commas, and the
 * subtitle is the last line of his blurb, since the series has none of its own.
 */
export type SeriesWeek = { date: string; title: string | null; line?: string };

export const series = {
  kicker: "A NEW SERIES",
  title: "This is Aesthetic",
  subtitle: "Be part of the next chapter",
  weeks: [
    {
      date: "2026-10-18",
      title: "Remember why",
      line: "Celebrating the people and life change of our first year, remembering the heart behind Aesthetic, and dreaming about what God has ahead.",
    },
    {
      date: "2026-10-25",
      title: "Bridging the gap",
      line: "Exploring how art, music, technology, and contemporary culture can become bridges to encountering God, and discovering that He is more beautiful, dynamic, and relevant than we imagined.",
    },
    {
      date: "2026-11-01",
      title: "For those not here yet",
      line: "Looking toward the next chapter and taking ownership of a shared mission: making room for more people to encounter Jesus and experience life change.",
    },
  ] satisfies SeriesWeek[],
  note: [
    "As Aesthetic turns one, we’re celebrating the people, stories, and life change that have shaped our first year, and dreaming about what’s ahead. This three-week series brings us back to why we started: helping people see the beauty of God.",
    "Together, we’ll revisit our “come as you are” heartbeat, explore how we bridge the gap between God and contemporary culture, and discover how each of us can help make room for those not here yet. Whether you’ve been here from the beginning or are just checking things out, you’re invited to be part of the next chapter.",
  ],
  byline: "JOHN LEE · PASTOR",
  /** Optional (set to null for a series without one). Source: ~/Desktop/New Series Poster - October.png
   *  (1122x1402), 2026-10-19. Version the filename on every swap: a reused name stays cached. */
  poster: {
    src: "/images/series-this-is-aesthetic-v1.jpg",
    width: 1122,
    height: 1402,
    alt: "Series poster: This is Aesthetic. Remember why, October 18. Bridging the gap, October 25. For those not here yet, November 1. Set on a warm plaster wall with leaf shadows and white jasmine flowers.",
  } as { src: string; width: number; height: number; alt: string } | null,
};
