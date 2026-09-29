"use client";

import { useEffect, useRef, useState } from "react";
import { mission, vision, visionEdit } from "@/data/commitment";

/* The ring's circumference is 2 * pi * 163 = 1024. The text runs the whole way round and
   ends in a no-break space, so the bullet sits midway between GOD and WE: the same space
   on both sides of it (user's call, 2026-09-29). Plain spaces at the ends would be dropped. */
const RING_LENGTH = 1024;

/**
 * Mission and vision on /about (chosen 2026-09-28): the mission set round a green seal
 * on the left, the vision set as a printer's correction on the right.
 *
 * The seal turns slowly and steadily (one turn a minute) so the ring can be read as it
 * passes. Continuous motion over five seconds needs a way to stop it (WCAG 2.2.2), so it
 * has a pause button, it holds while hovered, and it rests while off screen. The proof
 * marks follow the scroll: each old word is struck, then the new one is inserted beside
 * it. Reduced motion gets the finished print: a still seal, every correction made.
 */
export function MissionVision() {
  const seal = useRef<HTMLDivElement>(null);
  const proof = useRef<HTMLDivElement>(null);
  const [moving, setMoving] = useState(false);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    setMoving(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // The seal stamps down on arrival and only turns while it can be seen.
  useEffect(() => {
    const el = seal.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Proof marks: progress through the block drives each strike and insertion.
  useEffect(() => {
    const el = proof.current;
    if (!el || !moving) return;
    const rows = [...el.querySelectorAll<HTMLElement>(".edit")];
    let raf = 0;
    const clamp = (v: number) => Math.min(1, Math.max(0, v));
    const frame = () => {
      const r = el.getBoundingClientRect();
      const h = window.innerHeight;
      const p = clamp((h * 0.85 - r.top) / (h * 0.55));
      rows.forEach((row, i) => {
        const t = clamp(p * rows.length - i);
        row.style.setProperty("--s", clamp(t / 0.55).toFixed(3));
        row.style.setProperty("--n", clamp((t - 0.5) / 0.5).toFixed(3));
      });
      raf = requestAnimationFrame(frame);
    };
    const io = new IntersectionObserver(([e]) => {
      cancelAnimationFrame(raf);
      if (e.isIntersecting) raf = requestAnimationFrame(frame);
    });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [moving]);

  const turning = moving && inView && !paused;

  return (
    <div className="mv">
      <div ref={seal} className={`seal${inView || !moving ? " in" : ""}`}>
        <h2 className="sr-only">Our mission at Aesthetic</h2>
        <p className="sr-only">{mission}</p>
        <svg viewBox="-10 -10 420 420" aria-hidden="true" className="seal-svg">
          <circle cx="200" cy="200" r="198" fill="var(--green)" stroke="var(--ink)" strokeWidth="3" />
          <circle cx="200" cy="200" r="128" fill="none" stroke="var(--ink)" strokeWidth="3" />
          <defs>
            <path id="seal-ring" d="M200 200 m-163 0 a163 163 0 1 1 326 0 a163 163 0 1 1 -326 0" />
          </defs>
          <g className="seal-ring" style={{ animationPlayState: turning ? "running" : "paused" }}>
            <text>
              <textPath href="#seal-ring" textLength={RING_LENGTH} lengthAdjust="spacing">
                {mission.replace(/\.$/, "").toUpperCase()}&#160;&#8226;&#160;
              </textPath>
            </text>
          </g>
        </svg>
        <div className="seal-mid" aria-hidden="true">
          <span className="lbl">OUR MISSION AT</span>
          <span className="sp seal-wm">Aesthetic</span>
        </div>
        {moving ? (
          <button
            type="button"
            className="seal-toggle"
            onClick={() => setPaused((v) => !v)}
            aria-label={paused ? "Turn the mission seal" : "Stop the mission seal"}
          >
            {paused ? (
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden><path d="M8 5v14l11-7-11-7Z" fill="currentColor" /></svg>
            ) : (
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden><path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" fill="currentColor" /></svg>
            )}
          </button>
        ) : null}
      </div>

      <div className="mv-vision">
        <h2 className="lbl">OUR VISION</h2>
        <hr className="rule" style={{ width: 44 }} />
        <div ref={proof} className={`proof${moving ? "" : " done"}`} aria-hidden="true">
          <span className="proof-lead">{visionEdit.lead}</span>
          {visionEdit.edits.map((e) => (
            <span key={e.from} className="edit">
              <s className="old">{e.from}</s>
              <span className="caret">&#8248;</span>
              <span className="new sp">{e.to}</span>
            </span>
          ))}
        </div>
        <p className="bl mv-words">{vision}</p>
      </div>
    </div>
  );
}
