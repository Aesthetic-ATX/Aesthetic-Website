"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { site } from "@/data/site";
import { series, seriesOver, crossword } from "@/data/series";
import { austinNow } from "@/components/austin";
import { usePlayOnce } from "@/components/usePlayOnce";

const WORDS = ["ONE", "TWO", "THREE", "FOUR", "FIVE", "SIX", "SEVEN", "EIGHT"];
/** "2026-11-08" -> "NOV 8". Parsed as UTC so no time zone shifts the day. */
const short = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" }).toUpperCase();

/** This Sunday: the first series Sunday on or after `today`; past the last one, the count of weeks. */
const weekOf = (today: string) => {
  const i = series.weeks.findIndex((w) => w.date >= today);
  return i === -1 ? series.weeks.length : i;
};

type Cell = { x: number; y: number; ch: string; n?: number; title: boolean; weeks: number[]; k: number };

/** Every lettered square once, in reading order. A square two words share keeps both owners. */
const CELLS: Cell[] = (() => {
  const m = new Map<string, Cell>();
  const put = (x: number, y: number, ch: string, k: number, title: boolean, week?: number, n?: number) => {
    const key = `${x},${y}`;
    const c = m.get(key) ?? { x, y, ch, title: false, weeks: [], k };
    if (title) c.title = true;
    if (week !== undefined) { c.weeks.push(week); c.k = k; }
    if (n !== undefined) c.n = n;
    m.set(key, c);
  };
  crossword.across.forEach((a) => [...a.word].forEach((ch, i) => put(a.x + i, a.y, ch, i, true, undefined, i === 0 ? a.n : undefined)));
  crossword.down.forEach((d) => [...d.word].forEach((ch, i) => put(d.x, d.y + i, ch, i, false, d.week, i === 0 ? d.n : undefined)));
  return [...m.values()].sort((a, b) => a.y - b.y || a.x - b.x);
})();

/**
 * The Good Company series as a crossword (2026-11-09, the user's pick from prototype round 4).
 * GOOD and COMPANY are always inked. A Sunday's word is filled in once that Sunday is this week or
 * has passed (this Sunday's in green); the ones still to come stay blank until someone taps the
 * squares or the clue. Motion follows DESIGN.md: it plays once on arrival (the grid rules across,
 * the letters ink in, the green goes down last), --feed and the --t-* tokens only.
 * `today` is Austin's date from the server, so the first HTML is already right; the browser checks again.
 */
export function SeriesCrossword({ today }: { today: string }) {
  const root = useRef<HTMLDivElement>(null);
  const phase = usePlayOnce(root, 0.2);
  const [cur, setCur] = useState(() => weekOf(today));
  const [over, setOver] = useState(false);
  const [solved, setSolved] = useState<number[]>([]);
  useEffect(() => {
    const iso = austinNow().iso;
    setCur(weekOf(iso));
    setOver(seriesOver(iso));
  }, []);

  const open = (w: number) => w <= cur || solved.includes(w);
  const solve = (w: number) => setSolved((s) => (s.includes(w) ? s : [...s, w]));
  const now = cur < series.weeks.length ? cur : null;
  const down = useMemo(() => new Map(crossword.down.map((d) => [d.week, d])), []);
  const first = series.weeks[0].date, last = series.weeks[series.weeks.length - 1].date;

  // The server leaves the section out once the series is over (app/page.tsx); this covers a page
  // built before then, and ?now= previews.
  if (over) return null;

  return (
    <article className="sheet ser" aria-labelledby="series-title">
      <div className="dateline xw-dateline">
        <span>EAST AUSTIN</span>
        <span>
          {site.service.day.toUpperCase()} AT {site.service.time.toUpperCase()} &middot; {site.address.street.toUpperCase()}
        </span>
        <a href={site.instagram.url}>{site.instagram.handle.toUpperCase()}</a>
      </div>

      <div className="xw-box">
        <div ref={root} className={`xw ${phase}`}>
          {/* The grid is a picture of the clues beside it: pointer users can tap a blank square,
              everyone else uses the clue's own button. */}
          <div className="xw-left">
          <div
            className="xw-grid"
            aria-hidden="true"
            style={{ "--cols": crossword.cols, "--rows": crossword.rows } as CSSProperties}
          >
            <div className="xw-kick">
              <p className="xw-lbl">{series.kicker}</p>
              <p className="xw-lbl">
                {WORDS[series.weeks.length - 1]} SUNDAYS<br />
                {short(first)} TO {short(last)}
              </p>
            </div>
            {CELLS.map((c, i) => {
              const shown = c.title || c.weeks.some(open);
              const todo = c.weeks.find((w) => !open(w));
              const fresh = !c.title && c.weeks.every((w) => w > cur);
              return (
                <div
                  key={`${c.x},${c.y}`}
                  className={`xw-cell${shown ? "" : " empty"}${now !== null && c.weeks.includes(now) ? " now" : ""}${fresh ? " late" : ""}${todo !== undefined ? " tap" : ""}`}
                  style={{ "--x": c.x, "--y": c.y, "--i": i, "--k": c.k } as CSSProperties}
                  onClick={todo !== undefined ? () => solve(todo) : undefined}
                >
                  {c.n && <span className="xw-n">{c.n}</span>}
                  <span className="xw-ch">{c.ch}</span>
                </div>
              );
            })}
            {crossword.blocks.map(([x, y]) => (
              <div key={`${x},${y}`} className="xw-cell block" style={{ "--x": x, "--y": y } as CSSProperties} />
            ))}
          </div>
          <div className="xw-key xw-lbl" aria-hidden="true">
            <span><i className="g" />THIS SUNDAY</span>
            <span><i />STILL TO COME</span>
          </div>
          </div>

          <div className="xw-side">
            <h2 id="series-title" className="sp xw-title ink">{series.title}</h2>
            <p className="sp xw-lead ink">{series.subtitle}</p>
            <ol className="xw-clues" aria-label="In this series">
              {series.weeks.map((w, i) => {
                const d = down.get(i);
                const [before, answer, after = ""] = w.clue ?? [w.title ?? "", ""];
                return (
                  <li key={w.date} className={i === now ? "now" : i < cur ? "past" : undefined} aria-current={i === now ? "true" : undefined}>
                    <p className="xw-lbl">
                      {d && <>{d.n} DOWN &middot; </>}{short(w.date)}
                      {i === now && <> &middot; <span className="xw-chip">THIS SUNDAY</span></>}
                    </p>
                    {open(i) ? (
                      <>
                        <h3 className="xw-q">{before}{answer}{after}</h3>
                        {w.line && <p className="xw-p">{w.line}</p>}
                      </>
                    ) : (
                      <button type="button" className="xw-q xw-btn" onClick={() => solve(i)}>
                        {before}
                        <span className="xw-blank" role="img" aria-label={`blank, ${answer.length} letters`}>
                          {[...answer].map((_, k) => <i key={k} />)}
                        </span>
                        {after}
                        <span className="xw-lbl xw-go">FILL IT IN</span>
                      </button>
                    )}
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>

      <div className="ser-note xw-note">
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
          {now !== null && (
            <div className="xw-this">
              <p className="lbl">THIS SUNDAY &middot; {short(series.weeks[now].date)} &middot; WEEK {now + 1} OF {series.weeks.length}</p>
              <h3 className="sp xw-this-t">{series.weeks[now].title}</h3>
              {series.weeks[now].gist && <p className="bd">{series.weeks[now].gist}</p>}
            </div>
          )}
          <p className="lbl">{series.noteLabel}</p>
          {series.note.map((para, i) => <p key={i} className="bd">{para}</p>)}
          {series.byline && <p className="lbl ser-by">{series.byline}</p>}
        </div>
      </div>
    </article>
  );
}
