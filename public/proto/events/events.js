// Pieces every What's happening option shares. Needs shell.js first.
window.ev = {
  // the plain facts, as a definition list
  facts: (e = EVENT) => `
    <dl class="ev-facts">
      <div><dt>WHEN</dt><dd>${eventDate()} · ${e.start} to ${e.end}</dd></div>
      <div><dt>WHERE</dt><dd><a class="ev-map" href="${e.map}" aria-label="${e.street}: open in Google Maps">${e.street}</a></dd></div>
      <div><dt>COST</dt><dd>Free</dd></div>
      <div><dt>SIGN-UPS</dt><dd>At the door, 6 to 6:15pm</dd></div>
    </dl>`,
  rsvp: (e = EVENT) => `<a class="ev-btn" href="${e.rsvp}" target="_blank" rel="noopener">RSVP on Partiful <span aria-hidden="true">&#8599;</span></a>`,
  ask: (e = EVENT) => `<p class="sm ev-ask">Questions?<br>Call ${e.contact.name} at <a class="tel" href="tel:${e.contact.tel}">${e.contact.phone}</a></p>`,
  // phones: the flyer folds behind a tap; desktop shows it in its own column
  flyerToggle: (e = EVENT) => `
    <details class="ev-fold"><summary>See the flyer</summary>
      <img src="${e.poster}" alt="${e.alt}" width="1019" height="1320" loading="lazy"></details>`,
  flyer: (e = EVENT) => `<img class="ev-poster" src="${e.poster}" alt="${e.alt}" width="1019" height="1320" loading="lazy">`,
  // the section, or nothing once the event is over
  section: (inner) => eventWhen() ? `<section class="ev" aria-labelledby="ev-h"><p class="lbl ev-lbl" id="ev-h">WHAT'S HAPPENING</p>${inner}</section>` : "",
};

// The set list, shared by B2, E and F. On the night it follows Austin time: rows that are over get
// struck through, and the one happening now is marked. `from`/`to` are minutes after midnight.
ev.rows = [
  { t: "6:00", from: 1080, to: 1095, what: "Doors open, sign-up table opens", more: "Want a turn at the mic? Put your name down here.", hi: true },
  { t: "6:15", from: 1095, to: 1095, what: "Sign-ups close" },
  { t: "THEN", word: true, from: 1095, to: 1260, what: "Feature sets", more: "An eclectic mix of Austin artists and creatives." },
  { t: "MIXED IN", word: true, what: "Show up &amp; go up", more: "Open-mic slots: one song or 3 to 4 minutes each." },
  { t: "ALL NIGHT", word: true, what: "Snacks, drinks, new friends" },
  { t: "9:00", from: 1260, to: 1260, what: "Last song" },
];
ev.setlist = (e = EVENT, a = 0, b = ev.rows.length) => {
  const tonight = AUSTIN.iso === e.date, m = AUSTIN.min;
  return `<ol class="sl-list">${ev.rows.slice(a, b).map((r, j) => {
    const i = a + j;
    const done = tonight && r.to != null && m >= r.to && !(r.from === r.to && m < r.from);
    const now = tonight && r.from != null && m >= r.from && m < r.to;
    return `<li class="${r.hi ? "hi" : ""}${done ? " done" : ""}${now ? " now" : ""}" style="--n:${i}">
      <span class="sl-t${r.word ? " w" : ""}">${r.t}</span>
      <span class="sl-what"><b><span class="hl">${r.what}</span></b>${now ? '<em class="sl-now">ON NOW</em>' : ""}${r.more ? `<small>${r.more}</small>` : ""}</span></li>`;
  }).join("")}</ol>`;
};
ev.slNote = "Sign-ups are first come, first served. Time is short, so we can't promise everyone a turn. Free, and the whole family is welcome.";
// motion is opt-in: only with JS running and no reduced-motion preference
if (!matchMedia("(prefers-reduced-motion: reduce)").matches) document.documentElement.classList.add("mo");
// a set list starts writing itself when a third of it is on screen
ev.watch = (el, cls = "in", t = .3) => el && new IntersectionObserver((es, io) => {
  if (es.some((x) => x.isIntersecting)) { el.classList.add(cls); io.disconnect(); }
}, { threshold: t }).observe(el);

// The event's label in the strip's own words: Next week, This Sat, Tomorrow, Tonight, On now.
ev.tag = (e = EVENT) => {
  const w = eventWhen(e); if (!w) return null;
  if (w.n === 0) return w.short;
  const monday = Date.parse(AUSTIN.iso) - AUSTIN.wd * 864e5;
  const weeks = Math.floor((Date.parse(e.date) - monday) / (7 * 864e5));
  if (weeks === 0) return w.n === 1 ? "TOMORROW" : `THIS ${e.day}`;
  return weeks === 1 ? "NEXT WEEK" : `IN ${weeks} WEEKS`;
};
// On the day, once the morning's group is over (noon) and until doors open, the event is what's next.
ev.spotlight = (e = EVENT) => AUSTIN.iso === e.date && AUSTIN.min >= 720 && AUSTIN.min < e.startMin;
// Where the event falls in the strip's week (0 = Monday), or null if it's another week.
ev.inWeek = (e = EVENT) => { const d = Math.round((Date.parse(e.date) - (Date.parse(AUSTIN.iso) - AUSTIN.wd * 864e5)) / 864e5); return d >= 0 && d < 7 ? d : null; };
// From noon on the day until the last song, the evening belongs to the event: no group is "next" in the strip.
ev.owns = (e = EVENT) => AUSTIN.iso === e.date && AUSTIN.min >= 720 && AUSTIN.min < e.endMin;
