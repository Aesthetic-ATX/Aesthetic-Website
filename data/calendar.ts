/**
 * The Events page (/events, built 2026-10-19). Every one-off gathering, newest last. The page shows the
 * next event that hasn't ended as the feature, any others still to come under "Coming up", and the
 * ones that have finished under "Earlier", all by the Austin calendar, so nothing needs moving by hand.
 *
 * Separate from data/events.ts on purpose: that file feeds What's happening on /groups, which needs a
 * run of show (set list) per event. An event can be listed here without one (user's call, 2026-10-19:
 * Next Gen is on /events only).
 *
 * Adding an event: copy an entry, put its poster in /public/images (versioned name) and its calendar
 * file in /public/events (UTC: Austin is UTC-5 in summer time, UTC-6 from the first Sunday of November).
 * Copy rules: sentence case for our own words, no em dashes.
 */
export type Panelist = { name: string; role: string; what: string };

export type CalendarEvent = {
  slug: string;
  name: string;
  /** Austin date, yyyy-mm-dd, and the clock in minutes after midnight. */
  date: string;
  startMin: number;
  endMin: number;
  /** As printed: "1 to 3pm". */
  hours: string;
  /** ISO with the Austin offset, for search engines (Event schema). */
  startISO: string;
  endISO: string;
  place: string;
  street: string;
  lead: string[];
  panel?: Panelist[];
  hosts?: string;
  signoff?: string;
  /** A short practical aside under the panel. */
  ps?: string;
  /** Null until the church sends the link. */
  rsvp: string | null;
  ics?: string;
  poster?: { src: string; width: number; height: number; alt: string };
  /** One line for the Earlier list once it is over. */
  recap: string;
};

export const calendar: CalendarEvent[] = [
  {
    slug: "open-mic-night",
    name: "Open Mic Night",
    date: "2026-10-10", startMin: 18 * 60, endMin: 21 * 60, hours: "6 to 9pm",
    startISO: "2026-10-10T18:00:00-05:00", endISO: "2026-10-10T21:00:00-05:00",
    place: "Sapien Center", street: "2316 Morelos St",
    lead: ["A laid-back night of music, poetry and whatever else Austin's artists bring."],
    rsvp: null,
    recap: "Music, poetry and whatever else Austin's artists brought.",
  },
  {
    slug: "one-year",
    name: "One Year",
    date: "2026-10-18", startMin: 11 * 60, endMin: 12 * 60 + 30, hours: "11am",
    startISO: "2026-10-18T11:00:00-05:00", endISO: "2026-10-18T12:30:00-05:00",
    place: "Sapien Center", street: "2316 Morelos St",
    lead: ["Our first birthday as a church in Austin."],
    rsvp: null,
    recap: "Our first birthday: worship, stories from the year, a look ahead, and cake.",
  },
  {
    slug: "next-gen",
    name: "Next Gen: Building Kingdom Movements",
    date: "2026-11-08", startMin: 13 * 60, endMin: 15 * 60, hours: "1 to 3pm",
    startISO: "2026-11-08T13:00:00-06:00", endISO: "2026-11-08T15:00:00-06:00",
    place: "Sapien Center", street: "2316 Morelos St",
    /* From the church's Partiful page and Instagram post (2026-10). The ellipsis in "for the
       Kingdom... but" became a comma; nothing else changed in meaning. */
    lead: [
      "What does it actually look like to start something for Jesus in your 20s? Join us for a short time of worship, followed by a raw Q&A panel with four young adult leaders who've already done it.",
      "They're going to share their stories, the real lessons they've learned, and practical wisdom on how to kickstart communities, events, and ministries that actually impact people.",
      "If you've ever thought “I want to do something for the Kingdom, but I don't know where to start,” this afternoon is for you. Come ready to listen, ask questions, and leave with wisdom, clarity, and courage to start something of your own.",
    ],
    panel: [
      { name: "Reagan Popoff", role: "Popoff Ministries", what: "Cliff diver and creative evangelism." },
      { name: "Naven Dabria", role: "Founder of BSTUD, RVVL co-founder", what: "Co-ed Bible studies and worship gatherings sparking revival." },
      { name: "Keilani Francisco", role: "SALT, RVVL co-founder", what: "Community gatherings reclaiming spaces for Jesus." },
      { name: "Austin Huang", role: "GoodNewsRunClub, RVVL co-founder", what: "Hundreds of runners building community around Jesus." },
    ],
    hosts: "Hosted by @khoi_gg and @artbyjohnlee.",
    signoff: "Bring a friend. Come expectant. Come as you are.",
    ps: "Free that morning? Come earlier for the 11am service. Same address.",   // our line, not the Partiful page
    rsvp: null,   // NEEDED: the Partiful link (Instagram says "link in bio")
    ics: "/events/next-gen-2026-11-08.ics",
    /* TEMPORARY: cropped from a Partiful screenshot (IMG_0875, 708x986). Swap for the original file
       as poster-next-gen-v2.jpg when it arrives. */
    poster: {
      src: "/images/poster-next-gen-v1.jpg", width: 708, height: 986,
      alt: "Next Gen: Building Kingdom Movements, at Aesthetic, 2316 Morelos St, Austin. Meet the panelists: Reagan Popoff of Popoff Ministries, Naven Dabria of BSTUD and RVVL, Keilani Francisco of SALT and RVVL, and Austin Huang of GoodNewsRunClub and RVVL. Stories, wisdom, how to kickstart ministry.",
    },
    recap: "Worship and a Q&A panel with four young leaders building movements around Jesus.",
  },
];

export type Phase = "ahead" | "today" | "live" | "over";
/** Where an event stands at an Austin date and minute. */
export function phaseOf(e: CalendarEvent, iso: string, min: number): Phase {
  if (iso < e.date) return "ahead";
  if (iso > e.date) return "over";
  return min >= e.endMin ? "over" : min >= e.startMin ? "live" : "today";
}
/** Whole days from `iso` to the event, by the calendar. */
export const daysTo = (e: CalendarEvent, iso: string) =>
  Math.round((Date.parse(e.date) - Date.parse(iso)) / 864e5);
