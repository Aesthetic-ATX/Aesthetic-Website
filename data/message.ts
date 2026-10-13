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
 *
 * When a series ends and the next one isn't in yet, set `wrapped` (2026-10-12): the card turns
 * into liner notes for the finished series, with each week's `line` and its `watch` link, and
 * nothing claims to be this week's. Set `wrapped` back to null when the new series goes in.
 */
export type Week = {
  date: string;
  title: string | null;
  /** Liner notes: one line about the message, printed once the series has wrapped. */
  line?: string;
  /** The recording on YouTube. A week without one shows only its date. */
  watch?: string;
};

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
   *  series title were cut: the masthead and the poster already carry it.
   *  Five weeks became four on 2026-09-29, John's call. */
  note: [
    "Every song has a beat. The beat keeps a song moving and tells it where to go. Our lives work the same way. There are rhythms and practices that shape us. They help us slow down, stay close to God, and become more like Jesus on ordinary days.",
    "Following Jesus means living with Him every day of the week. Over the next four weeks, we'll look at four simple practices that can form a healthy spiritual rhythm. Each one helps us hear from Jesus and make room for Him in a busy week.",
  ],
  byline: "JOHN LEE · PASTOR",
  /** The series is over (last Sunday 2026-10-11) and the next is not announced. null while a series runs. */
  wrapped: {
    kicker: "JUST WRAPPED · THE FULL SERIES",
    /** How many paragraphs of `note` still read true. The second looks ahead ("over the next four weeks"). */
    noteParagraphs: 1,
    next: "Coming soon. Sundays at 11am, same room.",
  } as { kicker: string; noteParagraphs: number; next: string } | null,
  /** 1-based index into `weeks` of the Sunday this card is about. */
  current: 4,
  weeks: [
    /* Week 1's line is John's own subtitle from the YouTube title. The other three are drafts
       (2026-10-12) waiting on John's rewrite or approval: do not publish them before that. */
    { date: "2026-09-20", title: "Beginning with prayer", line: "Start with the beat.", watch: "https://www.youtube.com/watch?v=nu0c3mFgVVg" },
    { date: "2026-09-27", title: "Practice of reading Scripture", line: "A few verses, read slowly, most days." },
    { date: "2026-10-04", title: "Community | Better together", line: "Faith grows in company." },
    { date: "2026-10-11", title: "Tithing/Generosity | Open handed living", line: "Hold what you have with an open hand." },
  ] satisfies Week[],   // four Sundays, not five: John shortened the series (2026-09-29)
} as const;
