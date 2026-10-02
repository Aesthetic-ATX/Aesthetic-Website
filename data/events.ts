import { type Now } from "@/components/austin";

/**
 * One-off events for What's happening on /groups (B3, chosen 2026-10-01). The section shows the next
 * event that hasn't ended, and hides itself once the last one is over, so a finished event can stay
 * here until someone tidies it away. Copy follows the site voice: sentence case, no em dashes.
 *
 * Adding an event: copy the entry, change every field, put its poster in /public/images and its
 * calendar file in /public/events (UTC times: Austin is UTC-5 in summer time, UTC-6 in winter).
 */
export type SetRow = {
  /** What prints in the time column: a clock time, or a word like THEN. */
  t: string;
  word?: boolean;
  /** Minutes after midnight, Austin time: when the row is "on now" (from up to to), and struck after `to`. */
  from?: number;
  to?: number;
  what: string;
  more?: string;
  /** The one step people miss, inked like a highlighter. */
  hi?: boolean;
};

export type SiteEvent = {
  name: string;
  /** For the tab in the week strip. */
  short: string;
  /** Austin date, yyyy-mm-dd. */
  date: string;
  weekday: number; // 0 = Monday
  day: "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT" | "SUN";
  dayLong: string;
  start: string;
  end: string;
  startMin: number;
  endMin: number;
  /** Shown beside the day box: the full line on desktop, the short one on phones. */
  lead: string;
  leadShort: string;
  street: string;
  map: string;
  directions: string;
  rsvp: string;
  /** A calendar file under /public. */
  ics: string;
  contact: { name: string; phone: string; tel: string };
  poster: { src: string; width: number; height: number; alt: string };
  rows: SetRow[];
  note: string;
};

export const events: SiteEvent[] = [
  {
    name: "Open Mic Night", short: "Open Mic",
    date: "2026-10-10", weekday: 5, day: "SAT", dayLong: "Saturday",
    start: "6pm", end: "9pm", startMin: 18 * 60, endMin: 21 * 60,
    lead: "A laid-back night of music, poetry and whatever else Austin's artists bring. Feature sets from local creatives, with open-mic slots in between. Free, and the whole family is welcome.",
    leadShort: "Music, poetry and whatever else Austin's artists bring. Free, and all ages are welcome.",
    street: "2316 Morelos St",
    map: "https://www.google.com/maps/place/2316+Morelos+St,+Austin,+TX+78702/data=!4m2!3m1!1s0x8644b5c9463fabc9:0x719188c4eae9d70d",
    directions: "https://www.google.com/maps/dir/?api=1&destination=2316+Morelos+St%2C+Austin%2C+TX+78702",
    /* Supplied by the user, 2026-10-01. */
    rsvp: "https://partiful.com/e/nNwSIpDqjDoj3yqj61AK?c=C_vEd3x_",
    ics: "/events/open-mic-night-2026-10-10.ics",
    contact: { name: "John Lee", phone: "(225) 252-1726", tel: "+12252521726" },
    /* Source: ~/Desktop/OPEN MIC.png, its black export frame trimmed, 2026-10-01. */
    poster: {
      src: "/images/poster-open-mic-v1.jpg", width: 1019, height: 1320,
      alt: "Open Mic Night poster in neon on deep purple: Aesthetic presents Open Mic Night, October 10 at 6pm, 2316 Morelos St, Austin. Free admission. Open mic sign-ups at the venue from 6 to 6:15pm, first come first served. Grab the mic and make your voice be heard.",
    },
    rows: [
      { t: "6:00", from: 1080, to: 1095, what: "Doors open, sign-up table opens", more: "Want a turn at the mic? Put your name down here.", hi: true },
      { t: "6:15", from: 1095, to: 1095, what: "Sign-ups close" },
      { t: "THEN", word: true, from: 1095, to: 1260, what: "Feature sets", more: "An eclectic mix of Austin artists and creatives." },
      { t: "MIXED IN", word: true, what: "Show up & go up", more: "Open-mic slots: one song or 3 to 4 minutes each." },
      { t: "ALL NIGHT", word: true, what: "Snacks, drinks, new friends" },
      { t: "9:00", from: 1260, to: 1260, what: "Last song" },
    ],
    note: "Sign-ups are first come, first served. Time is short, so we can't promise everyone a turn. Free, and the whole family is welcome.",
  },
];

/* ---- timing: one sequence, rehearsed day by day on 2026-10-01 ---- */

const DAY = 864e5;
const days = (e: SiteEvent, now: Now) => Math.round((Date.parse(e.date) - Date.parse(now.iso)) / DAY);

/** The next event that hasn't ended, or null. */
export const upcoming = (now: Now) =>
  [...events].sort((a, b) => a.date.localeCompare(b.date)).find((e) => days(e, now) > 0 || (days(e, now) === 0 && now.min < e.endMin)) ?? null;

/** Where we are: days "ahead", "today" before doors, or "live" while it's on. */
export const phase = (e: SiteEvent, now: Now): "ahead" | "today" | "live" =>
  now.iso !== e.date ? "ahead" : now.min >= e.startMin ? "live" : "today";

/** The day box's label, in the strip's own words. No day count: the date sits right beside it. */
export function tag(e: SiteEvent, now: Now) {
  const ph = phase(e, now);
  if (ph === "live") return "ON NOW";
  if (ph === "today") return "TONIGHT";
  const d = days(e, now), weeks = Math.floor((d + now.wd) / 7);
  if (weeks === 0) return d === 1 ? "TOMORROW" : `THIS ${e.day}`;
  return weeks === 1 ? "NEXT WEEK" : "COMING UP";
}

/** On the day, once the morning's group is over (noon) and until doors open, the event is what's next. */
export const spotlight = (e: SiteEvent, now: Now) => now.iso === e.date && now.min >= 720 && now.min < e.startMin;
/** From noon to the last song the evening belongs to the event: no group is "next" in the strip. */
export const owns = (e: SiteEvent, now: Now) => now.iso === e.date && now.min >= 720 && now.min < e.endMin;
/** True when the event falls in the week the strip is showing. */
export const inStripWeek = (e: SiteEvent, now: Now) => { const d = days(e, now) + now.wd; return d >= 0 && d < 7; };
/** A set-list row's state on the night. */
export function rowState(r: SetRow, e: SiteEvent, now: Now) {
  if (now.iso !== e.date || r.from == null || r.to == null) return "";
  if (now.min >= r.to && !(r.from === r.to && now.min < r.from)) return "done";
  if (now.min >= r.from && now.min < r.to) return "now";
  return "";
}
