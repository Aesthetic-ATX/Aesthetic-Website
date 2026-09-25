/**
 * "This week's message": the homepage card, set with the same bulletin
 * masthead as the Weekly (layout from Screenshot #1, chosen 2026-09-17).
 * Poster left, the pastor's note and the series contents right
 * (prototypes/message.html, option C, chosen 2026-09-23).
 *
 * Hand updated each week: move `current` down one, and fill in the next
 * week's title when John reveals it. A week with no title prints as
 * redacted, with the Sunday it will be revealed (the week before it).
 * Version the poster filename on every swap (message-v2.jpg, ...): a reused
 * name leaves browsers on the cached copy, as with the hero.
 */
export type Week = { date: string; title: string | null };

export const message = {
  kicker: "THIS WEEK'S MESSAGE",
  /** Series name. Carries the masthead line. */
  series: "Move to the rhythm",
  /** Set smaller on the second line. */
  episode: "Simple practices for a life with God",
  /** Source: ~/Desktop/Weekly Message .png (1760x2164), black border cropped off, 2026-09-23. */
  poster: {
    src: "/images/message-v1.jpg",
    width: 1672,
    height: 2076,
    alt: "Series poster: Move to the rhythm, simple practices for a life with God, starts Sunday, September 20th. An open Bible, a journal and headphones on a sunlit desk.",
  },
  /** John's series summary, edited 2026-09-23. The spoken welcome and the
   *  series title were cut: the masthead and the poster already carry it. */
  note: [
    "Every song has a beat. The beat keeps a song moving and tells it where to go. Our lives work the same way. There are rhythms and practices that shape us. They help us slow down, stay close to God, and become more like Jesus on ordinary days.",
    "Following Jesus means living with Him every day of the week. Over the next five weeks, we'll look at five simple practices that can form a healthy spiritual rhythm. Each one helps us hear from Jesus and make room for Him in a busy week.",
  ],
  byline: "JOHN LEE · PASTOR",
  /** 1-based index into `weeks` of the Sunday this card is about. */
  current: 2,
  weeks: [
    { date: "2026-09-20", title: "Beginning with prayer" },
    { date: "2026-09-27", title: "Practice of reading Scripture" },
    { date: "2026-10-04", title: null },
    { date: "2026-10-11", title: null },
    { date: "2026-10-18", title: null },
  ] satisfies Week[],
} as const;
