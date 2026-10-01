/**
 * The three groups, exactly as the church publishes them. Each ticket shows the group's own
 * poster (1320x1983, made by the user, 2026-09-30), never cropped.
 *
 * Weekly: the Called to Carry poster names that Sunday's trail and date, so it is swapped each
 * week. Save the new one as poster-called-to-carry-vN.jpg (a new name, so browsers drop the
 * cached copy) and update its `src` and `alt` below. The other two posters are evergreen.
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
  where: string[];
  /** A short line under the address, e.g. when the next location is announced. */
  note?: string;
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
    /* Source: ~/Desktop/bible-study-poster.jpg, the evergreen version, 2026-09-30. */
    photo: {
      src: "/images/poster-bible-study-v1.jpg",
      alt: "Bible study poster: pull up a chair at Central Market, the Triangle, Central Austin. Luke, the Gospel where everyone gets a seat. A relaxed walk through one Gospel, one chapter at a time. Bring yourself, we'll bring the rest. Wednesdays at 6:30pm.",
      waitingFor: "Bible study poster.",
    },
  },
  {
    name: "“Called to Carry” Hiking Group",
    when: "Sundays at 2:15pm",
    day: "SUN", time: "2:15pm", ink: "sky", weekday: 6,
    where: ["A different trail each week", "Around Austin"],
    note: "Next week's trail is revealed midweek.",
    contact: { name: "David Humphrey", phone: "(713) 969-9917", tel: "+17139699917" },
    /* Source: ~/Desktop/called-to-carry-poster.jpg, 2026-09-30. Dated: swap weekly (see top of file). */
    photo: {
      src: "/images/poster-called-to-carry-v1.jpg",
      alt: "Called to Carry poster: lace up for the great outdoors. This week, Spyglass Trailhead, 1601 Spyglass Dr, Austin 78746. Laid-back and beginner-friendly. Move, connect, and enjoy God's creation together on a different trail each week. Sundays at 2:15pm. Meet us October 4, 2026.",
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
    /* Source: ~/Desktop/morning-devotional-poster.jpg, evergreen, 2026-09-30. */
    photo: {
      src: "/images/poster-morning-devotional-v1.jpg",
      alt: "Morning devotional poster: start your weekend reset at Radio Coffee and Beer, South Austin. A worksheet, a coffee, and an honest conversation. Come as you are. Saturdays at 10am.",
      waitingFor: "Morning devotional poster.",
    },
  },
];
