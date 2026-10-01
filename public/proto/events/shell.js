// Shared data and page shell for the four Groups prototypes. Data copied from site/data/groups.ts.
window.GROUPS = [
  {
    key: "bible", name: "Bible Study", day: "WED", dayLong: "Wednesday", wd: 2, time: "6:30pm", ink: "green",
    venue: "Central Market", street: "4001 N Lamar Blvd", city: "Austin, TX 78756",
    directions: "https://www.google.com/maps/place/Central+Market/@30.3076098,-97.7398761,17z",
    contact: { name: "John Lee", first: "John", phone: "(225) 252-1726", tel: "+12252521726" },
    poster: "img/poster-bible-study.jpg",
    alt: "Bible study poster: pull up a chair at Central Market, the Triangle, Central Austin. Luke, the Gospel where everyone gets a seat. Wednesdays at 6:30pm.",
  },
  {
    key: "devo", name: "Morning Devotional", day: "SAT", dayLong: "Saturday", wd: 5, time: "10am", ink: "citron",
    venue: "Radio Coffee & Beer", street: "4204 Menchaca Rd", city: "Austin, TX 78704",
    directions: "https://www.google.com/maps/place/radio+coffee+manchaca",
    contact: { name: "Andrew Blanton", first: "Andrew", phone: "(972) 679-5914", tel: "+19726795914" },
    poster: "img/poster-morning-devotional.jpg",
    alt: "Morning devotional poster: start your weekend reset at Radio Coffee and Beer, South Austin. A worksheet, a coffee, and an honest conversation. Saturdays at 10am.",
  },
  {
    key: "hike", name: "“Called to Carry” Hiking Group", short: "Called to Carry", day: "SUN", dayLong: "Sunday", wd: 6, time: "2:15pm", ink: "sky",
    venue: "A different trail each week", street: "Around Austin", city: "",
    // This week's trail, as printed on the poster. Swapped weekly with the poster; once its day has
    // passed the slip falls back to the line above instead of sending people to last week's trail.
    trail: { date: "2026-10-04", venue: "Spyglass Trailhead", street: "1601 Spyglass Dr",
      map: "https://www.google.com/maps/search/?api=1&query=Spyglass+Trailhead%2C+1601+Spyglass+Dr%2C+Austin%2C+TX+78746" },
    contact: { name: "David Humphrey", first: "David", phone: "(713) 969-9917", tel: "+17139699917" },
    poster: "img/poster-called-to-carry.jpg",
    alt: "Called to Carry poster: lace up for the great outdoors. This week, Spyglass Trailhead. Laid-back and beginner-friendly. Sundays at 2:15pm. Meet us October 4, 2026.",
  },
];
window.INK = { green: "#97F900", citron: "#E2FE0C", sky: "#66CCFF" };

// Prototype bar + the live nav + the live page head, written into #shell.
window.shell = function (current) {
  const opts = [["index.html", "All"], ["b3-continuity.html", "B3 After the calendar"], ["b2-setlist-motion.html", "B2"], ["e-folded.html", "E Folded"], ["f-flip.html", "F Flyer flip"], ["b-setlist.html", "B"], ["a-marquee.html", "A"], ["c-mixtape.html", "C"], ["d-calendar.html", "D"]];
  document.getElementById("shell").innerHTML = `
  <div class="bar"><div class="bar-in"><strong>WHAT'S HAPPENING · ROUND 2</strong>
    ${opts.map(([h, l]) => `<a href="${h}${location.search}"${h === current ? ' aria-current="page"' : ""}>${l}</a>`).join("")}
  </div></div>
  <header class="nav"><div class="nav-in">
    <a class="wm" href="#">Aesthetic</a>
    <div style="display:flex;gap:16px;align-items:center">
      <div class="capsule"><span>Home</span><span>About</span><span class="on">Groups</span><span>Give</span></div>
      <span class="nav-cta">NEW HERE?</span>
      <span class="burger" aria-hidden="true"><i></i><i></i><i></i></span>
    </div>
  </div></header>`;
};
window.head = `
  <div class="head">
    <p class="lbl">GROUPS</p>
    <h1 class="h1">Honest questions, in a room with other people.</h1>
    <p class="bl">Three groups meet through the week. One reads through Luke on Wednesday evenings, one walks a different trail every Sunday, and one meets over coffee on Saturday mornings. You do not need to have read anything, know anyone, or have an answer ready. Turning up is the whole requirement.</p>
  </div>`;
window.where = (g) => [g.venue, g.street, g.city].filter(Boolean).join("<br>");

// Austin time, whatever the visitor's clock or time zone says. ?now=2026-10-04T15:00 previews another moment.
window.AUSTIN = (() => {
  const q = new URLSearchParams(location.search).get("now");
  let y, m, d, min;
  if (q) { const [dt, t = "00:00"] = q.split("T"); [y, m, d] = dt.split("-").map(Number); const [h, mi] = t.split(":").map(Number); min = h * 60 + mi; }
  else {
    const p = Object.fromEntries(new Intl.DateTimeFormat("en-US", { timeZone: "America/Chicago", year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric", hourCycle: "h23" })
      .formatToParts(new Date()).map((x) => [x.type, x.value]));
    [y, m, d, min] = [+p.year, +p.month, +p.day, +p.hour * 60 + +p.minute];
  }
  const today = new Date(Date.UTC(y, m - 1, d));
  return { today, iso: today.toISOString().slice(0, 10), wd: (today.getUTCDay() + 6) % 7, min };
})();
// minutes after midnight for "6:30pm", "10am"
window.startMin = (t) => { const [, h, mi = 0, ap] = t.match(/(\d+)(?::(\d+))?(am|pm)/); return (+h % 12 + (ap === "pm" ? 12 : 0)) * 60 + +mi; };
// a group stays current all of its day, then rolls to next week (user's rule, 2026-10-01)
window.isPast = (g) => g.wd < AUSTIN.wd;

// Where the slip says to go. The hike names this week's trail until that day is over.
window.whereFor = (g) => {
  if (g.trail && AUSTIN.iso <= g.trail.date)
    return { label: AUSTIN.iso === g.trail.date ? "TODAY'S TRAIL" : "THIS SUNDAY", venue: g.trail.venue, street: g.trail.street, map: g.trail.map };
  if (g.trail) return { label: "WHERE", venue: g.venue, street: "Next trail posted midweek" };
  return { label: "WHERE", venue: g.venue, street: g.street, map: g.directions };
};

// One taped-up flyer with its location/contact slip. Used by A and E.
window.flyer = (g, i) => { const w = whereFor(g); return `
    <article class="flyer" id="f-${g.key}" style="--c:${INK[g.ink]};--i:${i}" aria-label="${g.name}, ${g.dayLong}s at ${g.time}">
      <div class="paper">
        <span class="tape" aria-hidden="true"></span>
        <img src="${g.poster}" alt="${g.alt}" width="800" height="1202">
        <div class="slip">
          <div><p class="lbl">${w.label}</p><p>${w.map
            ? `<a class="v map" href="${w.map}" aria-label="${w.venue}, ${w.street}: open in Google Maps">${w.venue}</a>`
            : `<span class="v">${w.venue}</span>`}${w.street ? `<span class="st">${w.street}</span>` : ""}</p></div>
          <div><p class="lbl">CONTACT</p><p class="v">${g.contact.name}</p>
            <a class="tel" href="tel:${g.contact.tel}">${g.contact.phone}</a></div>
        </div>
      </div>
    </article>`; };

// The event, from the flyer and the Partiful page (2026-10-01). Copy rewritten in the site's voice.
window.EVENT = {
  key: "open-mic", name: "Open Mic Night", date: "2026-10-10", day: "SAT", wd: 5, dayLong: "Saturday",
  start: "6pm", end: "9pm", startMin: 18 * 60, endMin: 21 * 60,
  venue: "Aesthetic", street: "2316 Morelos St", city: "Austin, TX 78702",
  map: "https://www.google.com/maps/place/2316+Morelos+St,+Austin,+TX+78702/data=!4m2!3m1!1s0x8644b5c9463fabc9:0x719188c4eae9d70d",
  rsvp: "https://partiful.com/e/nNwSIpDqjDoj3yqj61AK?c=C_vEd3x_",
  contact: { name: "John Lee", first: "John", phone: "(225) 252-1726", tel: "+12252521726" },
  poster: "img/poster-open-mic.jpg",
  alt: "Open Mic Night poster in neon on deep purple: Aesthetic presents Open Mic Night, October 10 at 6pm, 2316 Morelos St, Austin. Free admission. Open mic sign-ups at the venue from 6 to 6:15pm, first come first served. Grab the mic and make your voice be heard.",
  lead: "A laid-back night of music, poetry and whatever else Austin's artists bring. Feature sets from local creatives, with open-mic slots in between. Free, and the whole family is welcome.",
  signup: "Want a turn? Sign up at the table from 6 to 6:15pm. First come, first served. Each slot is one song or 3 to 4 minutes, and we can't promise everyone gets on.",
};
// how far off the event is, in Austin days; null once it has ended
window.eventWhen = (e = EVENT) => {
  const d = Math.round((Date.parse(e.date) - Date.parse(AUSTIN.iso)) / 864e5);
  if (d < 0 || (d === 0 && AUSTIN.min >= e.endMin)) return null;
  if (d === 0) return AUSTIN.min >= e.startMin ? { n: 0, says: "Happening now", short: "ON NOW" } : { n: 0, says: "Tonight", short: "TONIGHT" };
  if (d === 1) return { n: 1, says: "Tomorrow", short: "TOMORROW" };
  return { n: d, says: `In ${d} days`, short: `IN ${d} DAYS` };
};
window.eventDate = (o = { weekday: "short", month: "short", day: "numeric" }, e = EVENT) =>
  new Date(e.date + "T00:00:00Z").toLocaleDateString("en-US", { timeZone: "UTC", ...o });
