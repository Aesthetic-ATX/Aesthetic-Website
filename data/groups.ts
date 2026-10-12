/**
 * The three groups, exactly as the church publishes them. Each ticket shows the group's own
 * poster (1320x1983, made by the user), never cropped.
 *
 * All three posters are evergreen since v2 (2026-10-12): Called to Carry no longer names a trail
 * or a date. When a poster changes, save it under a new name (poster-...-vN.jpg, so browsers drop
 * the cached copy), delete the old file, and update its `src` and `alt` below. If a week's trail
 * should show on the slip, set `trail` (date, place, map link); once that date has passed the slip
 * stops naming it and shows `where` and `note` instead.
 */
export type Group = {
  name: string;
  when: string;
  /** Ticket stub: short day, time, and which ink prints it. */
  day: "WED" | "SAT" | "SUN";
  time: string;
  ink: "green" | "citron" | "sky";
  /** 0 = Monday. The page lists groups in week order. */
  weekday: number;
  /** Shorter name for the week strip, where the full one won't fit. */
  short?: string;
  where: string[];
  /** A short line under the address, e.g. when the next location is announced. */
  note?: string;
  /** This week's place, for groups that move. Shown until the end of `date` (Austin time). */
  trail?: { date: string; venue: string; street: string; map: string };
  /** Google Maps pin for the venue. Omitted when the place changes each week. */
  directions?: string;
  contact: { name: string; phone: string; tel: string };
  /** The group's poster. Without `src` the ticket shows a placeholder frame. */
  photo: { src?: string; alt: string; waitingFor: string };
};

export const groups: Group[] = [
  {
    name: "Bible Study",
    when: "Wednesdays at 6:30pm",
    day: "WED", time: "6:30pm", ink: "green", weekday: 2,
    where: ["Central Market", "4001 N Lamar Blvd", "Austin, TX 78756"],
    /* Pin supplied 2026-09-23; Google's tracking parameters removed. */
    directions: "https://www.google.com/maps/place/Central+Market/@30.3076098,-97.7398761,17z/data=!3m1!4b1!4m6!3m5!1s0x8644ca7d7a2a6d0d:0x209a4c2782a39461!8m2!3d30.3076098!4d-97.7398761!16s%2Fg%2F12xpmqk9y",
    contact: { name: "John Lee", phone: "(225) 252-1726", tel: "+12252521726" },
    /* Source: ~/Desktop/Bible Study - Poster.jpg, 2026-10-12. */
    photo: {
      src: "/images/poster-bible-study-v2.jpg",
      alt: "Bible study poster: pull up a chair at Central Market, the Triangle, Central Austin. Luke, the Gospel where everyone gets a seat. A relaxed walk through one Gospel, one chapter at a time. Bring yourself, we'll bring the rest. Wednesdays at 6:30pm.",
      waitingFor: "Bible study poster.",
    },
  },
  {
    name: "“Called to Carry” Hiking Group",
    when: "Sundays at 2:15pm",
    day: "SUN", time: "2:15pm", ink: "sky", weekday: 6,
    short: "Called to Carry",
    where: ["A different trail each week", "Around Austin"],
    note: "Next trail posted midweek",
    /* The 2026-10-04 trail, now past, so the slip shows `where` and `note`. */
    trail: {
      date: "2026-10-04",
      venue: "Spyglass Trailhead",
      street: "1601 Spyglass Dr",
      map: "https://www.google.com/maps/search/?api=1&query=Spyglass+Trailhead%2C+1601+Spyglass+Dr%2C+Austin%2C+TX+78746",
    },
    contact: { name: "David Humphrey", phone: "(713) 969-9917", tel: "+17139699917" },
    /* Source: ~/Desktop/Called To Carry - Poster.jpg, 2026-10-12. Evergreen: no trail or date on it. */
    photo: {
      src: "/images/poster-called-to-carry-v2.jpg",
      alt: "Called to Carry poster: lace up for the great outdoors, a different trail each week. Laid-back and beginner-friendly. Move, connect, and enjoy God's creation together on a different trail each week. Sundays at 2:15pm.",
      waitingFor: "Called to Carry poster.",
    },
  },
  {
    name: "Morning Devotional",
    when: "Saturdays at 10am",
    day: "SAT", time: "10am", ink: "citron", weekday: 5,
    where: ["Radio Coffee & Beer", "4204 Menchaca Rd", "Austin, TX 78704"],
    /* Pin supplied 2026-09-23; Google's tracking parameters removed. */
    directions: "https://www.google.com/maps/place/radio+coffee+manchaca/data=!4m2!3m1!1s0x865b4b345f5f9e47:0x987257b0016e1db8",
    contact: { name: "Andrew Blanton", phone: "(972) 679-5914", tel: "+19726795914" },
    /* Source: ~/Desktop/Morning Devotional - Poster.jpg, 2026-10-12. */
    photo: {
      src: "/images/poster-morning-devotional-v2.jpg",
      alt: "Morning devotional poster: start your weekend reset at Radio Coffee and Beer, South Austin. A worksheet, a coffee, and an honest conversation. Come as you are. Saturdays at 10am.",
      waitingFor: "Morning devotional poster.",
    },
  },
];
