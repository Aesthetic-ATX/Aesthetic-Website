"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { groups, type Group } from "@/data/groups";

/* The week strip and the flyer wall (prototypes/groups-2, option E, chosen 2026-10-01).
   The strip is this week, Monday to Sunday, in Austin time. Selecting a group day gives it a black
   bar and a line that runs down to that group's flyer. On phones the flyers stack, so the line
   stays a short stem, the page jumps to the flyer, and a slim copy of the strip pins under the nav.

   Everything that depends on today's date waits for the browser: the server can't know it, and
   the page is built once. Until then the strip shows days and times with no dates or marks. */

const DAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
const sorted = [...groups].sort((a, b) => a.weekday - b.weekday);
const byDay = new Map(sorted.map((g) => [g.weekday, g]));
const key = (g: Group) => g.day.toLowerCase();

type Now = { today: Date; iso: string; wd: number; min: number };

/** Austin's date and time, whatever the visitor's clock says. `?now=2026-10-04T15:00` previews another moment. */
function austinNow(): Now {
  const q = new URLSearchParams(location.search).get("now");
  let y: number, m: number, d: number, min: number;
  if (q && /^\d{4}-\d\d-\d\d(T\d\d:\d\d)?$/.test(q)) {
    const [date, time = "00:00"] = q.split("T");
    [y, m, d] = date.split("-").map(Number);
    const [h, mi] = time.split(":").map(Number);
    min = h * 60 + mi;
  } else {
    const p = Object.fromEntries(
      new Intl.DateTimeFormat("en-US", {
        timeZone: "America/Chicago", year: "numeric", month: "numeric", day: "numeric",
        hour: "numeric", minute: "numeric", hourCycle: "h23",
      }).formatToParts(new Date()).map((x) => [x.type, x.value]),
    );
    [y, m, d, min] = [+p.year, +p.month, +p.day, +p.hour * 60 + +p.minute];
  }
  const today = new Date(Date.UTC(y, m - 1, d));
  return { today, iso: today.toISOString().slice(0, 10), wd: (today.getUTCDay() + 6) % 7, min };
}

/** Minutes after midnight for "6:30pm" or "10am". */
function startMin(t: string) {
  const [, h, mi = "0", ap] = t.match(/(\d+)(?::(\d+))?(am|pm)/)!;
  return ((+h % 12) + (ap === "pm" ? 12 : 0)) * 60 + +mi;
}
/** A group has happened this week once its start time has gone by. */
const isPast = (g: Group, now: Now) => g.weekday < now.wd || (g.weekday === now.wd && now.min >= startMin(g.time));
const dayOf = (now: Now, wd: number) => { const d = new Date(now.today); d.setUTCDate(d.getUTCDate() - now.wd + wd); return d; };
const fmt = (d: Date, o: Intl.DateTimeFormatOptions) => d.toLocaleDateString("en-US", { timeZone: "UTC", ...o });

/** What the slip says about where to go. A moving group names this week's place until that day is over. */
function whereFor(g: Group, now: Now | null) {
  if (g.trail && (!now || now.iso <= g.trail.date)) {
    const label = now?.iso === g.trail.date ? "TODAY'S TRAIL" : `THIS ${g.day === "SUN" ? "SUNDAY" : g.day}`;
    return { label, venue: g.trail.venue, street: g.trail.street, map: g.trail.map };
  }
  if (g.trail) return { label: "WHERE", venue: g.where[0], street: g.note ?? g.where[1] };
  return { label: "WHERE", venue: g.where[0], street: g.where[1], map: g.directions };
}

const inkVar = (g: Group) => ({ "--c": `var(--${g.ink})`, "--c-past": `var(--${g.ink}-past-exp)` }) as React.CSSProperties;
const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const stacked = () => matchMedia("(max-width:900px)").matches;

export function GroupsWeek() {
  const [now, setNow] = useState<Now | null>(null);
  const [sel, setSel] = useState<Group | null>(null);
  const [miniOn, setMiniOn] = useState(false);
  const [here, setHere] = useState(sorted[0].day);
  const rig = useRef<HTMLDivElement>(null);
  const week = useRef<HTMLElement>(null);
  const board = useRef<HTMLDivElement>(null);
  const wire = useRef<SVGPathElement>(null);
  const drawn = useRef(false);

  const next = now ? sorted.find((g) => !isPast(g, now)) ?? sorted[0] : null;

  useEffect(() => {
    const n = austinNow();
    setNow(n);
    setSel(sorted.find((g) => !isPast(g, n)) ?? sorted[0]);
  }, []);

  /* The line: from the bottom of the selected day down to its flyer's tape. On the 3-across board
     it drops, runs across at a height shared by every flyer, then drops onto the tape. */
  const draw = useCallback((animate: boolean) => {
    const r = rig.current, w = week.current, p = wire.current;
    if (!r || !w || !p || !sel) return;
    const R = r.getBoundingClientRect();
    const y0 = w.getBoundingClientRect().bottom - R.top;
    const d = w.querySelector(`[data-k="${key(sel)}"]`)!.getBoundingClientRect();
    const x0 = d.left + d.width / 2 - R.left;
    let path = `M${x0} ${y0}V${y0 + 34}`;
    if (!stacked()) {
      const tapes = [...r.querySelectorAll(".tape")].map((t) => t.getBoundingClientRect());
      const t = r.querySelector(`#f-${key(sel)} .tape`)!.getBoundingClientRect();
      const bus = y0 + (Math.min(...tapes.map((x) => x.top - R.top)) - y0) * 0.45;
      path = `M${x0} ${y0}V${bus}H${t.left + t.width / 2 - R.left}V${t.top - R.top + 4}`;
    }
    p.setAttribute("d", path);
    p.style.setProperty("--len", String(Math.ceil(p.getTotalLength())));
    const svg = p.ownerSVGElement!;
    svg.classList.remove("draw");
    if (animate && !reduced()) { void svg.getBoundingClientRect(); svg.classList.add("draw"); }
  }, [sel]);

  // first line waits for the flyers to finish pinning up (~1s); later selections draw at once
  useEffect(() => {
    if (!sel) return;
    if (drawn.current) { draw(true); return; }
    const t = setTimeout(() => { drawn.current = true; draw(true); }, reduced() ? 0 : 1000);
    return () => clearTimeout(t);
  }, [sel, draw]);

  useEffect(() => {
    const r = rig.current;
    if (!r) return;
    let first = true; // the observer fires once on attach; skip it so the draw-in can finish
    const ro = new ResizeObserver(() => { if (!first && drawn.current) draw(false); first = false; });
    ro.observe(r);
    return () => ro.disconnect();
  }, [draw]);

  /* Phones: the mini strip shows once the week strip has gone under the nav and the flyers are still
     on screen, and marks whichever flyer is in view. */
  useEffect(() => {
    const track = () => {
      const w = week.current, b = board.current;
      if (!w || !b) return;
      const navBottom = document.querySelector(".nav")?.getBoundingClientRect().bottom ?? 0;
      setMiniOn(stacked() && w.getBoundingClientRect().bottom < navBottom && b.getBoundingClientRect().bottom > navBottom + 120);
      const line = innerHeight * 0.4;
      let best = sorted[0], dist = Infinity;
      for (const g of sorted) {
        const f = document.getElementById(`f-${key(g)}`);
        const dd = f ? Math.abs(f.getBoundingClientRect().top - line) : Infinity;
        if (dd < dist) { dist = dd; best = g; }
      }
      setHere(best.day);
    };
    track();
    addEventListener("scroll", track, { passive: true });
    addEventListener("resize", track);
    return () => { removeEventListener("scroll", track); removeEventListener("resize", track); };
  }, []);

  const repin = (f: HTMLElement, ms: number) => {
    f.classList.remove("lit");
    void f.offsetWidth;
    setTimeout(() => f.classList.add("lit"), reduced() ? 0 : ms);
  };
  const goTo = (f: HTMLElement) => {
    f.scrollIntoView({ behavior: reduced() ? "auto" : "smooth", block: "start" });
    repin(f, 450);
    f.querySelector<HTMLElement>(".tel")?.focus({ preventScroll: true });
  };

  const pick = (e: React.MouseEvent<HTMLAnchorElement>, g: Group) => {
    e.preventDefault();
    const f = document.getElementById(`f-${key(g)}`)!;
    drawn.current = true;
    setSel(g);
    history.replaceState(null, "", `#f-${key(g)}`);
    if (stacked()) {
      setTimeout(() => goTo(f), reduced() ? 0 : 350); // let the stem drop, then go to the flyer
    } else {
      // stay put so the line can be seen landing; scroll only if the strip or the tape is off screen
      const w = week.current!.getBoundingClientRect(), t = f.querySelector(".tape")!.getBoundingClientRect();
      if (w.top < 60 || t.top > innerHeight - 120) rig.current!.scrollIntoView({ behavior: reduced() ? "auto" : "smooth", block: "start" });
      repin(f, 700);
    }
  };

  const span = now
    ? `${fmt(dayOf(now, 0), { month: "short", day: "numeric" })} to ${fmt(dayOf(now, 6), { month: "short", day: "numeric" })}`.toUpperCase()
    : null;

  return (
    <>
      <p className="lbl gw-lbl">
        THIS WEEK{span ? <span className="gw-span"> · {span}</span> : null}
      </p>
      <div className="gw-rig" ref={rig}>
        <svg className="gw-wire" aria-hidden><path ref={wire} /></svg>
        <nav
          className="gw-week"
          ref={week}
          aria-label="Groups this week"
          style={{ gridTemplateColumns: DAYS.map((_, wd) => (byDay.has(wd) ? "minmax(0,1.5fr)" : "minmax(0,.75fr)")).join(" ") }}
        >
          {DAYS.map((n, wd) => {
            const g = byDay.get(wd);
            const past = !!(g && now && isPast(g, now));
            const today = now?.wd === wd;
            const d = now ? dayOf(now, past ? wd + 7 : wd) : null;
            const date = (
              <span className="gw-date">
                {d ? <><span className="gw-mo">{fmt(d, { month: "short" }).toUpperCase()} </span>{d.getUTCDate()}</> : " "}
              </span>
            );
            const head = (
              <span>
                <span className="gw-d"><span className="gw-long">{n}</span><span className="gw-short">{n[0]}</span></span>
                <br />
                <span className="gw-tag">
                  {past ? <><span className="gw-wk">NEXT WEEK</span><span className="gw-wk-s">NEXT WK</span></> : today ? "TODAY" : " "}
                </span>
              </span>
            );
            if (!g) return <div key={n} className={`gw-day gw-off${today ? " gw-today" : ""}`} aria-hidden>{head}{date}</div>;
            return (
              <a
                key={n}
                href={`#f-${key(g)}`}
                data-k={key(g)}
                className={`gw-day${today ? " gw-today" : ""}${past ? " gw-past" : ""}`}
                style={inkVar(g)}
                aria-current={sel === g ? "true" : undefined}
                aria-label={`${g.name}, ${g.when}${d ? `. Next: ${fmt(d, { weekday: "long", month: "long", day: "numeric" })}` : ""}${g === next ? ", next up" : ""}`}
                onClick={(e) => pick(e, g)}
              >
                {head}
                {g === next ? <span className="gw-stamp">NEXT<span className="gw-up"> UP</span></span> : null}
                <span>
                  <span className="gw-t">{g.time.replace(/(am|pm)$/, "")}<small>{g.time.match(/(am|pm)$/)?.[1]}</small></span>
                  <br />
                  <span className="gw-nm">{g.short ?? g.name}</span>
                </span>
                {date}
              </a>
            );
          })}
        </nav>

        {/* Each poster taped to the board, with one slip under it: where it meets, who to call */}
        <div className="gw-board" ref={board}>
          {sorted.map((g, i) => {
            const w = whereFor(g, now);
            return (
              <article key={g.name} id={`f-${key(g)}`} className="flyer" style={{ ...inkVar(g), "--i": i } as React.CSSProperties} aria-label={`${g.name}, ${g.when}`}>
                <div className="flyer-paper">
                  <span className="flyer-ink" aria-hidden />
                  <span className="tape" aria-hidden />
                  <div className="flyer-sheet">
                    {g.photo.src ? (
                      <Image
                        src={g.photo.src}
                        alt={g.photo.alt}
                        width={1320}
                        height={1983}
                        sizes="(max-width: 900px) min(440px, 100vw), 360px"
                      />
                    ) : null}
                    <div className="slip">
                      <div>
                        <p className="lbl">{w.label}</p>
                        <p>
                          {w.map ? (
                            <a className="slip-v slip-map" href={w.map} aria-label={`${w.venue}, ${w.street}: open in Google Maps`}>{w.venue}</a>
                          ) : (
                            <span className="slip-v">{w.venue}</span>
                          )}
                          {w.street ? <span className="slip-st">{w.street}</span> : null}
                        </p>
                      </div>
                      <div>
                        <p className="lbl">CONTACT</p>
                        <p className="slip-v">{g.contact.name}</p>
                        <a className="tel" href={`tel:${g.contact.tel}`}>{g.contact.phone}</a>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <nav className={`gw-mini${miniOn ? " on" : ""}`} aria-label="Jump to a group" inert={!miniOn}>
        <div className="gw-mini-in">
          {sorted.map((g) => (
            <a
              key={g.day}
              href={`#f-${key(g)}`}
              className={now && isPast(g, now) ? "gw-past" : undefined}
              style={inkVar(g)}
              aria-current={here === g.day ? "true" : undefined}
              onClick={(e) => { e.preventDefault(); history.replaceState(null, "", `#f-${key(g)}`); goTo(document.getElementById(`f-${key(g)}`)!); }}
            >
              {g.day} <span>{g.time}</span>
            </a>
          ))}
        </div>
      </nav>
    </>
  );
}
