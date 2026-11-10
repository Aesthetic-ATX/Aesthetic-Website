/**
 * The current sermon series: the homepage section under the About preview (replaces the weekly
 * message card, 2026-10-19). The ring has one tick per day of the series, the Sundays drawn
 * long; the browser marks this Sunday in green by the Austin calendar, so nothing needs bumping
 * week to week.
 *
 * New series: replace this object. Titles in sentence case; no em dashes in copy.
 */
export type SeriesWeek = {
  date: string;
  title: string | null;
  /** One line under the title: here, the last sentence of the church's weekly summary. */
  line?: string;
  /** The church's full summary for the week, printed under THIS SUNDAY. */
  gist?: string;
  /** The title as a crossword clue: the words before the blank, then the answer. */
  clue?: [string, string];
};

/* Good Company (2026-11-09). Source: the Host Script of Nov 1 and the weekly summaries the church
   sent on 2026-11-03 (week 3 is "There's room", not the poster's "Make room"). Em dashes in the
   summaries became commas or full stops. The lead is the last clause of the church's blurb. */
export const series = {
  kicker: "A NEW SERIES",
  title: "Good Company",
  subtitle: "Love people genuinely and talk about Jesus naturally, without pressure or pretense.",
  weeks: [
    {
      date: "2026-11-08",
      title: "Let’s hang",
      clue: ["Let’s ", "hang"],
      line: "You don’t need a different personality; you might just need an extra chair.",
      gist: "Sharing the love of Jesus can begin with sharing your life. We’ll explore how ordinary things like coffee, a meal, or a favorite hobby can create space for genuine friendship and meaningful connection. You don’t need a different personality; you might just need an extra chair.",
    },
    {
      date: "2026-11-15",
      title: "More than small talk",
      clue: ["More than small ", "talk"],
      line: "Meaningful conversations don’t have to follow a script.",
      gist: "How do we talk about faith without making it awkward or forced? We’ll explore how to ask thoughtful questions, listen with genuine curiosity, and share our hope in Jesus with honesty and grace. Meaningful conversations don’t have to follow a script. They can begin with care for the person in front of us.",
    },
    {
      date: "2026-11-22",
      title: "There’s room",
      clue: ["There’s ", "room"],
      line: "An invitation is an open door, not an obligation.",
      gist: "A simple invitation can say something powerful: there’s room for you here. We’ll explore how to invite others into community, help them feel welcome, and keep showing up as a friend, whether they say yes, no, or maybe later. An invitation is an open door, not an obligation.",
    },
  ] satisfies SeriesWeek[],
  /** The label over the note. This series' blurb is from the host script, so it is not bylined to John. */
  noteLabel: "ABOUT THE SERIES",
  note: [
    "Join us for Good Company, a three-week series about making room for friendship, moving beyond small talk, and extending meaningful invitations. Together, we’ll explore how to love people genuinely and talk about Jesus naturally without pressure or pretense.",
  ],
  byline: null as string | null,
  /** No poster yet: the only file is a 578x383 screenshot crop that still says "Make room" for week 3.
   *  When the original arrives, save it as /images/series-good-company-v1.jpg and fill this in.
   *  Version the filename on every swap: a reused name stays cached. */
  poster: null as { src: string; width: number; height: number; alt: string } | null,
};

/**
 * The crossword on the homepage (components/SeriesCrossword.tsx, user's pick 2026-11-09, prototype
 * round 4, concept L). GOOD and COMPANY run across; one word from each Sunday's title runs down
 * through them, and they do interlock. Columns 1 to 7, rows 1 to 8; x and y are where a word starts.
 * `n` is the clue number, counted the way a crossword counts (left to right, top to bottom).
 * `blocks` are the black squares: the cells that the letters round them close off.
 * A new series needs its own grid, or the ring (components/Series.tsx), which is kept for that.
 */
export const crossword = {
  cols: 7,
  rows: 8,
  across: [
    { n: 3, x: 1, y: 4, word: "GOOD" },
    { n: 5, x: 1, y: 6, word: "COMPANY" },
  ],
  down: [
    { week: 0, n: 1, x: 1, y: 1, word: "HANG" },
    { week: 2, n: 2, x: 3, y: 3, word: "ROOM" },
    { week: 1, n: 4, x: 5, y: 5, word: "TALK" },
  ],
  blocks: [[2, 3], [2, 5], [4, 5]],
};

/** The series is over once its last Sunday has passed (Austin date, "YYYY-MM-DD"). The homepage then
 *  leaves the section out until a new series replaces the object above (user's call, 2026-10-28). */
export const seriesOver = (todayIso: string) => todayIso > series.weeks[series.weeks.length - 1].date;
