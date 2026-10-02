"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { type Now, fmt } from "@/components/austin";
import { type SiteEvent, phase, rowState, spotlight, tag } from "@/data/events";

/* What's happening (prototypes/events, B3, chosen 2026-10-01). It sits after the week strip and reuses
   its grammar: the event gets a day box drawn like the strip's, and the same hanging line runs from it
   to the set list taped below. The set list writes itself in once, follows the clock on the night, and
   the actions change with the hour: RSVP and save the date ahead, directions once doors are open.
   Its ink is the approved neutral, because the strip has already used the page's sky, green and citron. */

const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

export function WhatsHappening({ event: e, now }: { event: SiteEvent; now: Now }) {
  const sec = useRef<HTMLElement>(null);
  const sl = useRef<HTMLDivElement>(null);
  const wire = useRef<SVGPathElement>(null);
  const drawn = useRef(false);
  const ph = phase(e, now);
  const date = new Date(e.date + "T00:00:00Z");

  // The line from the day box to the tape: down, across, down. Drawn once the sheet has hung itself up.
  const draw = (animate: boolean) => {
    const s = sec.current, p = wire.current, l = sl.current;
    if (!s || !p || !l) return;
    const R = s.getBoundingClientRect(), d = s.querySelector(".wh-day")!.getBoundingClientRect();
    const t = l.querySelector(".tape")!.getBoundingClientRect();
    const x0 = d.left + d.width / 2 - R.left, y0 = d.bottom - R.top, x1 = t.left + t.width / 2 - R.left, y1 = t.top - R.top + 4;
    const bus = y0 + (y1 - y0) * 0.45;
    // over the tape already: straight down (the tape is 112px wide, so anything inside 40px lands on it)
    p.setAttribute("d", Math.abs(x1 - x0) < 40 ? `M${x0} ${y0}V${y1}` : `M${x0} ${y0}V${bus}H${x1}V${y1}`);
    p.style.setProperty("--len", String(Math.ceil(p.getTotalLength())));
    const svg = p.ownerSVGElement!;
    svg.classList.remove("draw");
    if (animate && !reduced()) { void svg.getBoundingClientRect(); svg.classList.add("draw"); }
  };

  useEffect(() => {
    const s = sec.current, l = sl.current;
    if (!s || !l) return;
    if (!reduced()) document.documentElement.classList.add("mo");   // motion is opt-in, and only with JS
    let timer = 0;
    const io = new IntersectionObserver((es) => {
      if (!es.some((x) => x.isIntersecting)) return;
      io.disconnect();
      l.classList.add("in");
      timer = window.setTimeout(() => { drawn.current = true; draw(true); }, reduced() ? 0 : 950);
    }, { threshold: 0.25 });
    io.observe(l);
    let width = s.offsetWidth;
    const ro = new ResizeObserver(() => { if (drawn.current && s.offsetWidth !== width) draw(false); width = s.offsetWidth; });
    ro.observe(s);
    // the strip's tab sends people here: the day box answers and the line redraws
    const ping = () => {
      const d = s.querySelector<HTMLElement>(".wh-day")!;
      d.classList.remove("ping"); void d.offsetWidth; d.classList.add("ping");
      if (drawn.current) draw(true);
    };
    addEventListener("wh:ping", ping);
    return () => { io.disconnect(); ro.disconnect(); clearTimeout(timer); removeEventListener("wh:ping", ping); };
  }, []);

  const actions =
    ph === "live" ? (
      <>
        <p className="wh-live">{now.min < e.startMin + 15 ? "Doors are open. Sign-ups close at 6:15." : `Doors are open until ${e.end.replace("pm", "")}.`}</p>
        <div className="wh-acts"><a className="wh-btn" href={e.directions} target="_blank" rel="noopener">Get directions</a></div>
      </>
    ) : (
      <div className="wh-acts">
        <a className="wh-btn" href={e.rsvp} target="_blank" rel="noopener">RSVP on Partiful</a>
        {ph === "today" ? (
          <a className="arrow-link" href={e.directions} target="_blank" rel="noopener">Get directions</a>
        ) : (
          <a className="arrow-link" href={e.ics} download>Add to your calendar</a>
        )}
      </div>
    );

  return (
    <section className="wh" id="whats-happening" ref={sec} aria-labelledby="wh-h">
      <svg className="wh-wire" aria-hidden><path ref={wire} /></svg>
      <p className="lbl wh-lbl" id="wh-h">WHAT&rsquo;S HAPPENING</p>

      <div className="wh-row">
        <div className="wh-day" aria-hidden>
          <span>
            <span className="gw-d">{e.day}</span>
            <br />
            <span className="gw-tag">{tag(e, now)}</span>
          </span>
          {spotlight(e, now) ? <span className="gw-stamp">NEXT<span className="gw-up"> UP</span></span> : null}
          <span>
            <span className="gw-t">{e.start.replace(/(am|pm)$/, "")}<small>{e.start.match(/(am|pm)$/)?.[1]}</small></span>
            <span className="gw-nm">{e.name}</span>
          </span>
          <span className="gw-date">{fmt(date, { month: "short", day: "numeric" }).toUpperCase()}</span>
        </div>
        <p className="wh-lead"><span className="wh-long">{e.lead}</span><span className="wh-short">{e.leadShort}</span></p>
      </div>

      <div className="wh-wrap">
        <div className="sl slm hlm" ref={sl}>
          <div className="sl-paper">
            <span className="sl-ink" aria-hidden />
            <span className="tape" aria-hidden />
            <div className="sl-sheet">
              <p className="lbl">SET LIST</p>
              <h2 className="sl-h">{e.name}</h2>
              <p className="sl-sub">
                <span className="nw">{fmt(date, { weekday: "long", month: "long", day: "numeric" })}</span>
                <span className="dot"> · </span>
                <span className="nw">{e.start} to {e.end}</span>
              </p>
              <p className="sl-sub">
                <a className="slip-map nw" href={e.map} aria-label={`${e.street}: open in Google Maps`}>{e.street}</a>
                <span className="dot"> · </span>
                <b className="nw">Free admission</b>
              </p>
              <ol className="sl-list">
                {e.rows.map((r, i) => {
                  const st = rowState(r, e, now);
                  return (
                    <li key={i} className={[r.hi ? "hi" : "", st].join(" ").trim() || undefined} style={{ "--n": i } as React.CSSProperties}>
                      <span className={`sl-t${r.word ? " w" : ""}`}>{r.t}</span>
                      <span className="sl-what">
                        <b><span className="hl">{r.what}</span></b>
                        {st === "now" ? <em className="sl-now">ON NOW</em> : null}
                        {r.more ? <small>{r.more}</small> : null}
                      </span>
                    </li>
                  );
                })}
              </ol>
              <p className="sl-note">{e.note}</p>
              <div className="sl-do">{actions}</div>
              <p className="sm wh-ask">
                Questions?<br />
                Call {e.contact.name} at <a className="tel" href={`tel:${e.contact.tel}`}>{e.contact.phone}</a>
              </p>
            </div>
          </div>
        </div>
        {/* beside the set list on wide screens; on phones it stacks under it, always shown */}
        <div className="wh-side">
          <Image className="wh-poster" src={e.poster.src} alt={e.poster.alt} width={e.poster.width} height={e.poster.height} sizes="(max-width: 900px) min(440px, 100vw), 300px" />
        </div>
      </div>
    </section>
  );
}
