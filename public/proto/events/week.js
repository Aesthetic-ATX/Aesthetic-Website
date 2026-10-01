// The Groups week strip and flyers, as live on /groups. Renders into #week. Needs shell.js first.
(function () {
const names = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
const byWd = Object.fromEntries(GROUPS.map((g) => [g.wd, g]));
const sorted = GROUPS.slice().sort((a, b) => a.wd - b.wd);
// up next: the first group whose day isn't over, else the first one next week
const next = sorted.find((g) => !isPast(g)) || sorted[0];
const dayOf = (wd) => { const d = new Date(AUSTIN.today); d.setUTCDate(d.getUTCDate() - AUSTIN.wd + wd); return d; };
const fmt = (d, o) => d.toLocaleDateString("en-US", { timeZone: "UTC", ...o }).toUpperCase();
const span = `${fmt(dayOf(0), { month: "short", day: "numeric" })} TO ${fmt(dayOf(6), { month: "short", day: "numeric" })}`;

document.getElementById("week").innerHTML = `
  <p class="lbl" style="margin-bottom:12px"><span class="wk-lbl">THIS WEEK <span style="font-weight:500">· ${span}</span></span><span class="up-lbl">COMING UP</span></p>
  <div class="rig" id="rig">
  <svg class="wires" id="wires" aria-hidden="true"></svg>
  <nav class="week" aria-label="Groups this week" style="--cols:${names.map((_, wd) => byWd[wd] ? "minmax(0,1.5fr)" : "minmax(0,.75fr)").join(" ")}">
    ${names.map((n, wd) => {
      const g = byWd[wd], past = g && isPast(g), today = wd === AUSTIN.wd;
      const d = dayOf(past ? wd + 7 : wd);
      const date = `<span class="date">${fmt(d, { month: "short", day: "numeric" })}</span>`;
      const label = `<span class="d">${n}</span>`;
      const tag = past ? `<span class="tag">NEXT WEEK</span>` : today ? `<span class="tag">TODAY</span>` : "";
      if (!g) return `<div class="day off${today ? " today" : ""}" aria-hidden="true"><span>${label}${tag ? "<br>" + tag : ""}</span>${date}</div>`;
      return `<a class="day${today ? " today" : ""}${past ? " past" : ""}" data-k="${g.key}" href="#f-${g.key}" style="--c:${INK[g.ink]}"
        aria-label="${g.name}, ${g.dayLong} ${fmt(d, { month: "long", day: "numeric" }).toLowerCase()}${past ? " next week" : ""} at ${g.time}${g === next ? ", up next" : ""}">
        <span>${label}${tag ? "<br>" + tag : ""}</span>${g === next ? '<span class="stamp">NEXT<span class="up"> UP</span></span>' : ""}
        <span><span class="t">${g.time.replace(/(am|pm)$/, "<small>$1</small>")}</span><span class="nm">${g.short || g.name}</span></span>
        ${date}</a>`;
    }).join("")}
  </nav>
  <div class="board">${sorted.map(flyer).join("")}</div>
  </div>`;

// Selecting a day works like B: only the chosen day gets the black bar and a line hanging from it.
// The line runs to that day's flyer: down, across at one shared height, then onto its tape. It aims
// at the flyer's top centre, which the tilt pivots on, so a flyer mid-animation doesn't move it.
const svg = document.getElementById("wires"), rig = document.getElementById("rig");
const still = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const solo = () => matchMedia("(max-width:900px)").matches;   // one poster at a time
let sel = next;
function wire(animate) {
  const R = rig.getBoundingClientRect(), week = document.querySelector(".week").getBoundingClientRect();
  const y0 = week.bottom - R.top;
  const d = document.querySelector(`a.day[data-k="${sel.key}"]`).getBoundingClientRect();
  const x0 = d.left + d.width / 2 - R.left;
  const shown = [...document.querySelectorAll(".flyer")].filter((f) => f.offsetParent).map((f) => f.getBoundingClientRect());
  const f = document.getElementById("f-" + sel.key).getBoundingClientRect();
  const tapeTop = (r) => r.top - R.top - 16;               // the tape sits 16px above the flyer
  const bus = y0 + (Math.min(...shown.map(tapeTop)) - y0) * .45;
  const x1 = f.left + f.width / 2 - R.left;
  const path = Math.abs(x1 - x0) < 2 ? `M${x0} ${y0}V${tapeTop(f) + 4}` : `M${x0} ${y0}V${bus}H${x1}V${tapeTop(f) + 4}`;
  svg.innerHTML = `<path d="${path}"/>`;
  const p = svg.firstChild; p.style.setProperty("--len", Math.ceil(p.getTotalLength()));
  svg.classList.remove("draw"); void svg.offsetWidth; svg.classList.toggle("draw", animate && !still());
}
function select(g) {
  sel = g;
  document.querySelectorAll("a.day").forEach((a) => a.dataset.k === g.key ? a.setAttribute("aria-current", "true") : a.removeAttribute("aria-current"));
  document.querySelectorAll(".flyer").forEach((f) => f.classList.toggle("on", f.id === "f-" + g.key));
}
select(next); // the bar and the right poster show straight away; the line waits for the flyers to settle
const repin = (f, ms) => { f.classList.remove("lit"); void f.offsetWidth; setTimeout(() => f.classList.add("lit"), still() ? 0 : ms); };

document.querySelectorAll("a.day").forEach((a) => a.addEventListener("click", (e) => {
  e.preventDefault();
  const g = GROUPS.find((x) => x.key === a.dataset.k), f = document.getElementById("f-" + g.key);
  if (g === sel && solo()) return;
  select(g);
  history.replaceState(null, "", a.getAttribute("href"));
  if (solo()) {
    // the new poster pins up in place of the old one, and the line draws to it
    const paper = f.querySelector(".paper");
    paper.style.animation = "none"; void paper.offsetWidth; paper.style.animation = ""; paper.style.animationDelay = "0s";
    wire(true);
  } else {
    wire(true);
    // stay put so the line can be seen landing; only scroll if the strip or the tape is off screen
    const w = document.querySelector(".week").getBoundingClientRect(), t = f.querySelector(".tape").getBoundingClientRect();
    if (w.top < 60 || t.top > innerHeight - 120) rig.scrollIntoView({ behavior: still() ? "auto" : "smooth", block: "start" });
    repin(f, 700);
  }
}));

// the flyers swing in for ~1s after load, so measure once they have settled, then on every resize
setTimeout(() => {
  wire(true);
  let seen = false; // the observer fires once on attach; skip it so the draw-in can finish
  new ResizeObserver(() => { if (seen) wire(false); seen = true; }).observe(rig);
}, still() ? 0 : 1000);

})();
