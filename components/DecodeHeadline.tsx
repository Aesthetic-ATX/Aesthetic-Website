"use client";

import { useEffect, useRef } from "react";

type Cell = { el: HTMLSpanElement | null; ch: string };

export type DecodeHeadlineProps = {
  /** Each inner array is one phrase; each string is a line of that phrase. */
  phrases?: string[][];
  /** How long the first phrase rests, still, after the pass starts. */
  firstHoldMs?: number;
  /** Gap between the starts of successive decodes. */
  stepMs?: number;
  frameMs?: number;
  trackRatio?: number;
  wordGapRatio?: number;
  /** Any CSS colour. Flat, per DESIGN.md — no gradient text. */
  color?: string;
  className?: string;
};

// Module-level so the default is referentially stable. The effect below lists
// `phrases` in its dependency array, so a caller passing an inline array
// literal would re-run (and restart) the animation on every render.
//
// Plays once and rests on the last phrase, the tagline. WCAG 2.2.2 exempts
// motion only if it ends within five seconds, so the pass is budgeted from the
// moment it starts: GOD IS AN ARTIST decodes 1.2s in (settles within ~1.26s at
// 45ms frames), COME AS YOU ARE decodes at 3.6s and settles by ~4.8s. Adding a
// phrase or slowing frames means re-budgeting this.
//
// Ported 2026-09-16 from the earlier build's footer. It lives in the footer, so it waits:
// AESTHETIC sits still until the headline is at least half in view, and only
// then does the pass start. Played on page load, it would finish unseen.
const DEFAULT_PHRASES: string[][] = [
  ["AESTHETIC"],
  ["GOD IS", "AN ARTIST"],
  ["COME AS", "YOU ARE"],
];

const POOL = "ABCDEFGHKNOPQRSTUVXYZ";

export default function DecodeHeadline({
  phrases = DEFAULT_PHRASES,
  firstHoldMs = 1200,
  stepMs = 2400,
  frameMs = 45,
  trackRatio = 0.12,
  wordGapRatio = 0.42,
  color = "var(--ink)",
  className,
}: DecodeHeadlineProps) {
  const lineRef = useRef<HTMLDivElement>(null);

  // This builds its letter cells with direct DOM writes rather than React
  // state, on purpose: each cell is sized to its own glyph's measured advance
  // width and repainted ~22x/second during a scramble. Driving that through
  // React would mean a re-render per frame per letter.
  //
  // It is safe to own this subtree imperatively because React never re-renders
  // it — the component holds no state, and the JSX child below is only the
  // pre-hydration fallback, which build() replaces on mount.
  useEffect(() => {
    const line = lineRef.current;
    if (!line) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = document.createElement("canvas").getContext("2d");
    if (!ctx) return;

    let cells: Cell[] = [];
    let current = phrases[0] ?? DEFAULT_PHRASES[0];
    let timer: number | undefined;
    const steps: number[] = [];
    let io: IntersectionObserver | undefined;
    let ro: ResizeObserver | undefined;
    let cancelled = false;

    // Height is reserved for the tallest phrase, so switching from one-row
    // AESTHETIC to a two-row phrase never shifts anything around it.
    const maxRows = Math.max(...phrases.map((p) => p.length));

    const build = (phrase: string[]) => {
      current = phrase;
      const cs = getComputedStyle(line);
      const weight = cs.fontWeight;
      const family = cs.fontFamily;
      const adv = (ch: string, fs: number) => {
        ctx.font = `${weight} ${fs}px ${family}`;
        return ctx.measureText(ch).width;
      };
      const rowWidth = (str: string, fs: number, track: number, wgap: number) => {
        let w = 0;
        let letters = 0;
        for (const c of str) {
          if (c === " ") w += wgap;
          else {
            w += adv(c, fs);
            letters++;
          }
        }
        return w + track * Math.max(0, letters - 1);
      };

      // Sized to its container, not the viewport: the largest size up to 104px
      // at which the widest row of any phrase fits the line's own width. Fitting
      // against every phrase keeps one size for all three, so the headline
      // doesn't grow and shrink as the phrases change.
      const maxW = line.clientWidth;
      const widest = (f: number) =>
        Math.max(...phrases.flat().map((r) => rowWidth(r, f, trackRatio * f, wordGapRatio * f)));
      let fs = 104;
      const measured = widest(fs);
      if (maxW > 0 && measured > maxW) fs *= maxW / measured;

      const track = trackRatio * fs;
      const wgap = wordGapRatio * fs;
      line.style.fontSize = `${fs}px`;
      line.style.minHeight = `${maxRows * 1.04 * fs}px`;
      line.innerHTML = "";
      cells = [];

      for (const rowStr of phrase) {
        const row = document.createElement("div");
        row.style.whiteSpace = "nowrap";
        row.style.textAlign = "center";
        for (const c of rowStr) {
          if (c === " ") {
            const g = document.createElement("span");
            g.style.display = "inline-block";
            g.style.width = `${wgap}px`;
            row.appendChild(g);
            cells.push({ el: null, ch: " " });
            continue;
          }
          const s = document.createElement("span");
          s.style.display = "inline-block";
          s.style.textAlign = "center";
          // Fixed cell width, sized to this letter's own advance rather than a
          // monospace grid. Scrambling glyphs swap inside a cell that never
          // resizes, which is what keeps the line from jittering mid-decode.
          s.style.width = `${adv(c, fs)}px`;
          s.style.marginRight = `${track}px`;
          s.style.opacity = "0.42";
          s.style.transition = "opacity 0.4s ease";
          s.style.color = color;
          s.textContent = c;
          row.appendChild(s);
          cells.push({ el: s, ch: c });
        }
        const spans = row.querySelectorAll("span");
        for (let i = spans.length - 1; i >= 0; i--) {
          const el = spans[i] as HTMLSpanElement;
          if (el.style.width && el.textContent) {
            el.style.marginRight = "0px";
            break;
          }
        }
        line.appendChild(row);
      }
    };

    const decodeTo = (phrase: string[]) => {
      build(phrase);
      const len = cells.length;
      const settleEnd: number[] = [];
      let li = 0;
      for (let i = 0; i < len; i++) {
        if (cells[i].ch === " ") settleEnd.push(0);
        else {
          settleEnd.push(2 + li * 1.4 + 5 + Math.random() * 4);
          li++;
        }
      }
      let frame = 0;
      window.clearInterval(timer);
      timer = window.setInterval(() => {
        frame++;
        let done = 0;
        for (let i = 0; i < len; i++) {
          const c = cells[i];
          if (c.ch === " ") {
            done++;
            continue;
          }
          if (frame >= settleEnd[i]) {
            if (c.el && c.el.style.opacity !== "1") {
              c.el.textContent = c.ch;
              c.el.style.opacity = "1";
            }
            done++;
          } else if (c.el) {
            c.el.textContent = POOL[Math.floor(Math.random() * POOL.length)];
          }
        }
        if (done === len) window.clearInterval(timer);
      }, frameMs);
    };

    const renderStatic = (phrase: string[]) => {
      window.clearInterval(timer);
      build(phrase);
      for (const c of cells)
        if (c.el) {
          c.el.textContent = c.ch;
          c.el.style.opacity = "1";
        }
    };

    const start = () => {
      if (cancelled) return;
      const first = phrases[0] ?? DEFAULT_PHRASES[0];
      const last = phrases[phrases.length - 1] ?? first;

      // Re-measure when the container's width changes. Height changes are
      // ignored on purpose: building the cells changes the height, which would
      // otherwise re-trigger this in a loop.
      let lastWidth = line.clientWidth;
      ro = new ResizeObserver(() => {
        const w = line.clientWidth;
        if (w === lastWidth) return;
        lastWidth = w;
        renderStatic(current);
      });
      ro.observe(line);

      // Reduced motion gets the resting phrase immediately — the same state
      // everyone else ends on.
      if (reduce) {
        renderStatic(last);
        return;
      }

      // One pass, once the headline is at least half in view: the first phrase
      // sits still, then each later phrase decodes once. No interval, so
      // nothing moves after the last phrase settles.
      renderStatic(first);
      io = new IntersectionObserver(
        (entries) => {
          if (!entries.some((e) => e.isIntersecting)) return;
          io?.disconnect();
          phrases.slice(1).forEach((phrase, i) => {
            steps.push(window.setTimeout(() => decodeTo(phrase), firstHoldMs + i * stepMs));
          });
        },
        { threshold: 0.5 },
      );
      io.observe(line);
    };

    // Cells are sized from measured glyph widths, so measuring before the
    // webfont loads would size every cell to the fallback face and leave the
    // line visibly mis-tracked once Jost swaps in.
    const ready = (document as Document & { fonts?: FontFaceSet }).fonts?.ready ?? Promise.resolve();
    ready.then(start);

    return () => {
      cancelled = true;
      window.clearInterval(timer);
      steps.forEach((id) => window.clearTimeout(id));
      io?.disconnect();
      ro?.disconnect();
    };
  }, [phrases, firstHoldMs, stepMs, frameMs, trackRatio, wordGapRatio, color]);

  return (
    <div
      ref={lineRef}
      // Decorative: the tagline set as a moving graphic. The footer carries a
      // visually hidden "Come as you are" beside it, so screen readers get the
      // words once instead of a letter grid that rewrites itself.
      aria-hidden="true"
      className={className}
      style={{
        fontFamily: "'Jost', 'Futura', 'Century Gothic', system-ui, sans-serif",
        fontWeight: 700, // the system has two Jost weights, 400 and 700
        lineHeight: 1.04,
        textAlign: "center",
        // Rows centre vertically inside the reserved height.
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        // Lets the pre-hydration fallback size itself to this box (cqi units).
        containerType: "inline-size",
      }}
    >
      {/* Server-rendered fallback: the first phrase, flat, no scramble, sized to
          the container so it can't overflow before build() replaces it. */}
      <span
        style={{
          color,
          fontSize: "min(104px, 14cqi)",
          textTransform: "uppercase",
          letterSpacing: "0.06em",
        }}
      >
        {(phrases[0] ?? DEFAULT_PHRASES[0]).join(" ")}
      </span>
    </div>
  );
}
