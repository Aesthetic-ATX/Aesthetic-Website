"use client";

import { memo, useEffect, useRef, useState } from "react";

type Cell = { el: HTMLSpanElement | null; ch: string };
type Controls = { pause: () => void; play: () => void };

export type DecodeHeadlineProps = {
  /** Each inner array is one phrase; each string is a line of that phrase. */
  phrases?: string[][];
  /** How long the first phrase rests, still, once the block is in view. */
  firstHoldMs?: number;
  /** Gap between the starts of successive decodes: ~1.3s scramble + ~2.9s hold. */
  stepMs?: number;
  frameMs?: number;
  trackRatio?: number;
  wordGapRatio?: number;
  /** Any CSS colour. Flat, per DESIGN.md: no gradient text. */
  color?: string;
  className?: string;
};

// Module-level so the default is referentially stable. The effect lists
// `phrases` in its dependencies, so an inline array literal would restart it.
//
// Loops AESTHETIC -> GOD IS AN ARTIST -> COME AS YOU ARE (user's call,
// 2026-09-16). Because it moves for longer than five seconds, WCAG 2.2.2
// requires a way to pause it, so a pause/play button always sits beside it.
// It only runs while at least half in view, and reduced motion gets the
// tagline, still, with no button. Ported from the earlier build's footer.
const DEFAULT_PHRASES: string[][] = [
  ["AESTHETIC"],
  ["GOD IS", "AN ARTIST"],
  ["COME AS", "YOU ARE"],
];

const POOL = "ABCDEFGHKNOPQRSTUVXYZ";

export default function DecodeHeadline(props: DecodeHeadlineProps) {
  const controls = useRef<Controls | null>(null);
  const [paused, setPaused] = useState(false);
  const [moving, setMoving] = useState(false);

  useEffect(() => {
    setMoving(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const toggle = () => {
    if (paused) controls.current?.play();
    else controls.current?.pause();
    setPaused(!paused);
  };

  return (
    <>
      <DecodeLine {...props} controls={controls} />
      {moving ? (
        <button
          type="button"
          className="decode-toggle"
          onClick={toggle}
          aria-label={paused ? "Play animation" : "Pause animation"}
        >
          {paused ? (
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden><path d="M8 5v14l11-7-11-7Z" fill="currentColor" /></svg>
          ) : (
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden><path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" fill="currentColor" /></svg>
          )}
        </button>
      ) : null}
    </>
  );
}

/**
 * The letter grid. Memoised with stable props so the button's state changes
 * never re-render it: this subtree is written directly to the DOM (each cell
 * sized to its own glyph and repainted ~22x a second while scrambling), and a
 * React re-render would fight those writes.
 */
const DecodeLine = memo(function DecodeLine({
  phrases = DEFAULT_PHRASES,
  firstHoldMs = 1200,
  stepMs = 4200,
  frameMs = 45,
  trackRatio = 0.12,
  wordGapRatio = 0.42,
  color = "var(--ink)",
  className,
  controls,
}: DecodeHeadlineProps & { controls: React.RefObject<Controls | null> }) {
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const line = lineRef.current;
    if (!line) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = document.createElement("canvas").getContext("2d");
    if (!ctx) return;

    let cells: Cell[] = [];
    let current = phrases[0] ?? DEFAULT_PHRASES[0];
    let timer: number | undefined;
    let step: number | undefined;
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
      const last = phrases[phrases.length - 1] ?? phrases[0];

      // Re-measure on width changes only; building cells changes the height.
      let lastWidth = line.clientWidth;
      ro = new ResizeObserver(() => {
        const w = line.clientWidth;
        if (w === lastWidth) return;
        lastWidth = w;
        renderStatic(current);
      });
      ro.observe(line);

      if (reduce) {
        renderStatic(last);
        return;
      }

      let index = 0;
      let visible = false;
      let paused = false;

      const schedule = (delay: number) => {
        window.clearTimeout(step);
        if (paused || !visible) return;
        step = window.setTimeout(() => {
          index = (index + 1) % phrases.length;
          decodeTo(phrases[index]);
          schedule(stepMs);
        }, delay);
      };

      controls.current = {
        // Pausing settles the phrase in flight, so what stays on screen is readable.
        pause: () => {
          paused = true;
          window.clearTimeout(step);
          renderStatic(phrases[index]);
        },
        play: () => {
          paused = false;
          schedule(800);
        },
      };

      renderStatic(phrases[0]);
      io = new IntersectionObserver(
        (entries) => {
          const now = entries.some((e) => e.isIntersecting);
          if (now === visible) return;
          visible = now;
          if (visible) schedule(firstHoldMs);
          else window.clearTimeout(step); // off screen: finish the current scramble, then rest
        },
        { threshold: 0.5 },
      );
      io.observe(line);
    };

    // Cells are sized from measured glyph widths, so wait for Jost.
    const ready = (document as Document & { fonts?: FontFaceSet }).fonts?.ready ?? Promise.resolve();
    ready.then(start);

    return () => {
      cancelled = true;
      window.clearInterval(timer);
      window.clearTimeout(step);
      io?.disconnect();
      ro?.disconnect();
      controls.current = null;
    };
  }, [phrases, firstHoldMs, stepMs, frameMs, trackRatio, wordGapRatio, color, controls]);

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
});
