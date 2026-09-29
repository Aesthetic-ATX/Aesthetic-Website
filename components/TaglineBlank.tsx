"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/data/site";

const STEP_MS = 760;
const START_MS = 300;

/**
 * "come as ___": the blank feeds through the people who walk into a church for the
 * first time, like sheets through the rollers, and lands on "you are" (prototypes/
 * tagline-2.html, Set 1, chosen 2026-09-28). Plays once each time it scrolls into view
 * and lands in about 3.4s, so it stays under WCAG 2.2.2's five seconds and needs no
 * pause button. The server renders the finished line, so without JavaScript, and with
 * reduced motion, it simply reads "come as you are".
 */
export function TaglineBlank() {
  const words = site.taglineWords;
  const last = words.length - 1;
  const [now, setNow] = useState(last);
  const [width, setWidth] = useState<number | null>(null);
  const block = useRef<HTMLElement>(null);
  const spans = useRef<(HTMLSpanElement | null)[]>([]);

  // The blank fits whichever word is in it; measured from the word's own box.
  useEffect(() => {
    const el = now >= 0 ? spans.current[now] : null;
    setWidth(el ? el.scrollWidth : null);
  }, [now]);

  useEffect(() => {
    const el = block.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let timers: number[] = [];
    const clear = () => { timers.forEach(window.clearTimeout); timers = []; };
    const reset = () => { clear(); setNow(-1); };
    const run = () => {
      reset();
      words.forEach((_, i) => timers.push(window.setTimeout(() => setNow(i), START_MS + i * STEP_MS)));
    };

    // Empty the blank before it is seen: the block sits well below the fold.
    reset();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && e.intersectionRatio > 0.6) run();
          else if (!e.isIntersecting) reset();
        }
      },
      { threshold: [0, 0.6] },
    );
    io.observe(el);
    return () => { io.disconnect(); clear(); };
  }, [words]);

  return (
    <section ref={block} className="blank" aria-labelledby="tagline-title">
      {/* The section's heading, written from the homepage keywords in the SEO map:
          church in austin, non denominational church austin, spirit filled churches. */}
      <h2 className="lbl" id="tagline-title">
        A spirit-filled, <span className="nobr">non-denominational</span> church in Austin
      </h2>
      <p className="sr-only">Come as you are.</p>
      <p className="blank-line sp" aria-hidden="true">
        <span className="blank-box"><span>come as</span></span>
        <span
          className={`blank-box slot${now === last ? " done" : ""}`}
          style={width ? { width } : undefined}
        >
          {words.map((w, i) => (
            <span
              key={w}
              ref={(el) => { spans.current[i] = el; }}
              className={i === now ? "now" : i < now ? "gone" : undefined}
            >
              {w}
            </span>
          ))}
        </span>
      </p>
    </section>
  );
}
