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
  /** The title as a crossword clue: the words before the blank, the answer, then any words after it. */
  clue?: [string, string, string?];
};

/* Good Company (2026-11-09). Titles from the final poster; week 3 is "Come and see" (it was "Make room",
   then "There's room"). Summaries: week 2 from 2026-11-03, weeks 1 and 3 and the series blurb as the user
   sent them on 2026-11-09. Their em dashes became commas, and "Come and See" inside week 3's summary is
   set in the site's sentence case. Each `line` is a sentence of that week's own summary. The lead is the
   last clause of the blurb. */
export const series = {
  kicker: "A NEW SERIES",
  title: "Good Company",
  subtitle: "Love people genuinely and talk about Jesus naturally, without pressure or pretense.",
  weeks: [
    {
      date: "2026-11-08",
      title: "Let’s hang",
      clue: ["Let’s ", "hang"],
      line: "Jesus meets people where they are, and invites us to do the same.",
      gist: "Jesus meets people where they are, and invites us to do the same. Through the story of Jesus at Levi’s table, we’ll explore what it means to move beyond our familiar circles, enter someone else’s world, and love people genuinely. Whether we’re sharing a meal, watching a game, or joining in something they enjoy, ordinary time together can become a meaningful expression of Jesus’ love.",
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
      title: "Come and see",
      clue: ["", "Come", " and see"],
      line: "There’s something beautiful about discovering God’s goodness together.",
      gist: "There’s something beautiful about discovering God’s goodness together. In Come and see, we’ll explore how to invite others into a community learning to know, love, and follow Jesus. More than an invitation to attend a service, it’s an invitation to discover God’s beauty with us, and to offer a genuine welcome as people explore for themselves.",
    },
  ] satisfies SeriesWeek[],
  /** The label over the note. This series' blurb is from the host script, so it is not bylined to John. */
  noteLabel: "ABOUT THE SERIES",
  note: [
    "Following Jesus moves us toward people, right where they are. Join us for Good Company, a three-week series about sharing everyday life, moving beyond small talk, and inviting others to discover the goodness and beauty of God with us. Together, we’ll explore how to love people genuinely and talk about Jesus naturally, without pressure or pretense.",
  ],
  byline: null as string | null,
  /** Optional (set to null for a series without one). Source: the original the user sent on 2026-11-09
   *  (1535x1024). Version the filename on every swap: a reused name stays cached. */
  poster: {
    src: "/images/series-good-company-v1.jpg",
    width: 1535,
    height: 1024,
    alt: "Series poster: Good Company in blue and green lettering on dark green, with neon drawings of an ATX sign, a guitar, an armadillo, a bat and a paddleboarder. November 8, Let’s hang. November 15, More than small talk. November 22, Come and see.",
  } as { src: string; width: number; height: number; alt: string } | null,
};

/**
 * The crossword on the homepage (components/SeriesCrossword.tsx, user's pick 2026-11-09, prototype
 * round 4, concept L). GOOD and COMPANY run across; one word from each Sunday's title runs down
 * through them, and they do interlock. Columns 1 to 7, rows 1 to 9; x and y are where a word starts.
 * `n` is the clue number, counted the way a crossword counts (left to right, top to bottom).
 * `blocks` are the black squares: the cells that the letters round them close off.
 * A new series needs its own grid, or the ring (components/Series.tsx), which is kept for that.
 */
export const crossword = {
  cols: 7,
  rows: 9,
  across: [
    { n: 2, x: 1, y: 4, word: "GOOD" },
    { n: 4, x: 1, y: 6, word: "COMPANY" },
  ],
  /* COME starts on the C of COMPANY, so 4 across and 4 down share a square and a number. */
  down: [
    { week: 0, n: 1, x: 1, y: 1, word: "HANG" },
    { week: 1, n: 3, x: 5, y: 5, word: "TALK" },
    { week: 2, n: 4, x: 1, y: 6, word: "COME" },
  ],
  blocks: [[1, 5], [2, 5], [3, 5], [4, 5]],
};

/** The series is over once its last Sunday has passed (Austin date, "YYYY-MM-DD"). The homepage then
 *  leaves the section out until a new series replaces the object above (user's call, 2026-10-28). */
export const seriesOver = (todayIso: string) => todayIso > series.weeks[series.weeks.length - 1].date;
