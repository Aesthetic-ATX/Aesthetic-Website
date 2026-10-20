"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { site } from "@/data/site";
import { series } from "@/data/series";
import { austinNow } from "@/components/austin";
import { usePlayOnce } from "@/components/usePlayOnce";

const WORDS = ["ONE", "TWO", "THREE", "FOUR", "FIVE", "SIX", "SEVEN", "EIGHT"];
/** "2026-10-18" -> "OCT 18". Parsed as UTC so no time zone shifts the day. */
const short = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" }).toUpperCase();
const long = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", { month: "long", day: "numeric", timeZone: "UTC" }).toUpperCase();

/* The ring: one tick per day of the series, twelve o'clock is the first Sunday. Ticks are drawn
   from the outside in, so the draw reads as a rule being laid round the edge. */
const DAYS = series.weeks.length * 7;
const C = 200, OUT = 194;
const ticks = Array.from({ length: DAYS }, (_, i) => {
  const a = (i / DAYS) * Math.PI * 2, sun = i % 7 === 0, len = sun ? 30 : 13;
  const p = (r: number) => [C + r * Math.sin(a), C - r * Math.cos(a)].map((v) => +v.toFixed(2));
  const [x1, y1] = p(OUT), [x2, y2] = p(OUT - len);
  return { x1, y1, x2, y2, sun, week: Math.floor(i / 7) };
});

/**
 * The current series (2026-10-19), made from the One Year ring and set inside the homepage's
 * bulletin sheet. Motion follows DESIGN.md: it plays once on arrival (the ticks rule round, the
 * paper ripples from the centre and the words surface inside it, this Sunday's green stamp goes
 * down last), with the site's --feed curve and the --t-* durations only. No scroll driving, no loops.
 */
export function Series() {
  const cover = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLOListElement>(null);
  const coverPhase = usePlayOnce(cover);
  const [noteOpen, setNoteOpen] = useState(false);
  const listPhase = usePlayOnce(list);

  // This Sunday: the first series Sunday on or after today in Austin. Null once the series is over.
  const [cur, setCur] = useState<number | null>(null);
  useEffect(() => {
    const today = austinNow().iso;
    const i = series.weeks.findIndex((w) => w.date >= today);
    setCur(i === -1 ? series.weeks.length : i);
  }, []);

  const first = series.weeks[0].date, last = series.weeks[series.weeks.length - 1].date;
  const now = cur !== null && cur < series.weeks.length ? cur : null;
  const nowAngle = now !== null ? (now * 7 / DAYS) * 360 : 0;

  return (
    <article className="sheet ser" aria-labelledby="series-title">
      <div ref={cover} className={`ser-cover ${coverPhase}`} style={{ "--days": DAYS } as CSSProperties}>
        {/* the paper ripples from the centre, as in the One Year film (option A, 2026-10-19) */}
        <div className="ser-emboss" aria-hidden="true" />
        <svg className="ser-ring" viewBox="0 0 400 400" aria-hidden="true">
          {ticks.map((t, i) => (
            <line
              key={i}
              {...{ x1: t.x1, y1: t.y1, x2: t.x2, y2: t.y2 }}
              pathLength={1}
              className={`${t.sun ? "sun" : ""}${cur !== null && t.week < cur ? " past" : ""}${now !== null && i === now * 7 ? " now" : ""}`}
              style={{ "--i": i } as CSSProperties}
            />
          ))}
          {now !== null && (
            /* rotated by the SVG attribute, not CSS: CSS transform origins inside a viewBox are what
               sent the About seal off-centre in Safari */
            <g transform={`rotate(${nowAngle.toFixed(2)} ${C} ${C})`}>
              <circle className="ser-stamp" cx={C} cy={C - OUT + 15} r="11" />
            </g>
          )}
        </svg>
        <div className="ser-words">
          <p className="lbl ink">{series.kicker}</p>
          <h2 id="series-title" className="ser-title ink">{series.title}</h2>
          <p className="sp ser-sub ink">{series.subtitle}</p>
          <p className="lbl ser-when ink">
            {WORDS[series.weeks.length - 1]} SUNDAYS &middot; {long(first)} TO {long(last)}
          </p>
        </div>
      </div>

      <div className="dateline">
        <span>EAST AUSTIN</span>
        <span>
          {site.service.day.toUpperCase()} AT {site.service.time.toUpperCase()} &middot; {site.address.street.toUpperCase()}
        </span>
        <a href={site.instagram.url}>{site.instagram.handle.toUpperCase()}</a>
      </div>

      <ol ref={list} className={`ser-weeks ${listPhase}`} aria-label="In this series">
        {series.weeks.map((w, i) => {
          const isNow = i === now, past = cur !== null && i < cur;
          return (
            <li
              key={w.date}
              className={isNow ? "now" : past ? "past" : undefined}
              aria-current={isNow ? "true" : undefined}
              style={{ "--i": i } as CSSProperties}
            >
              <span className="ser-ticks" aria-hidden="true">
                {Array.from({ length: 7 }, (_, d) => <i key={d} className={d === 0 ? "sun" : undefined} />)}
              </span>
              <p className="ser-n ink">
                <span className="ser-num">WEEK {i + 1}</span> &middot; {short(w.date)}
                {isNow && <> &middot; THIS SUNDAY</>}
              </p>
              {w.title ? (
                <>
                  <h3 className="ser-t ink">{w.title}</h3>
                  {w.line && <p className="ser-d ink">{w.line}</p>}
                </>
              ) : (
                <p className="ser-hidden ink">
                  <span className="redact" aria-hidden />
                  <span className="ser-reveal">
                    <span className="sr-only">Topic </span>REVEALED {short(series.weeks[i - 1]?.date ?? w.date)}
                  </span>
                </p>
              )}
            </li>
          );
        })}
      </ol>

      <div className={`ser-note${noteOpen ? " open" : ""}`}>
        {series.poster && (
          <div className="ser-poster">
            <Image
              src={series.poster.src}
              alt={series.poster.alt}
              width={series.poster.width}
              height={series.poster.height}
              sizes="(max-width: 720px) min(420px, 100vw), 400px"
              fetchPriority="low"   /* below the fold: leave the bandwidth to the hero, the LCP image */
            />
          </div>
        )}
        <div>
          <p className="lbl">A NOTE FROM OUR PASTOR</p>
          {series.note.map((para, i) => (
            <p key={i} className={i === 0 ? "bd dropcap" : "bd ser-more"}>{para}</p>
          ))}
          {/* phones only: the rest of the note waits behind this, so the page stays short */}
          {series.note.length > 1 && (
            <button type="button" className="ser-read" aria-expanded={noteOpen} onClick={() => setNoteOpen((v) => !v)}>
              {noteOpen ? "Show less" : "Read the full note"}
            </button>
          )}
          <p className="lbl ser-by">{series.byline}</p>
        </div>
      </div>
    </article>
  );
}
