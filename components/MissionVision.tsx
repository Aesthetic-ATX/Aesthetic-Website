"use client";

import { useEffect, useRef, useState } from "react";
import { mission, vision, visionEdit } from "@/data/commitment";
import { usePlayOnce } from "@/components/usePlayOnce";

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
 * marks play once on arrival: each old word is struck, then the new one is inserted beside
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

  // The seal stamps down once, the first time it arrives (it used to re-stamp on every return, with
  // a bounce; 2026-10-19 motion pass). Separately, it only turns while it can be seen.
  const stampPhase = usePlayOnce(seal, 0.3);
  useEffect(() => {
    const el = seal.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Proof marks play once, in order, when half the block is on screen. They used to follow the
  // scroll, which left a reader who stopped mid-screen on "boring / disconnected" with the last
  // correction unmade (2026-10-19). The server renders the finished print; "armed" hides the
  // corrections without a transition, "play" makes them.
  const [proofPhase, setProofPhase] = useState<"print" | "armed" | "play">("print");
  useEffect(() => {
    const el = proof.current;
    if (!el || !moving) return;
    setProofPhase("armed");
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      requestAnimationFrame(() => setProofPhase("play"));
    }, { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, [moving]);

  const turning = moving && inView && !paused;

  return (
    <div className="mv">
      <div ref={seal} className={`seal ${stampPhase}`}>
        <h2 className="sr-only">Our mission at Aesthetic</h2>
        <p className="sr-only">{mission}</p>
        <svg viewBox="-10 -10 420 420" aria-hidden="true" className="seal-svg">
          <circle cx="200" cy="200" r="198" fill="var(--green)" stroke="var(--ink)" strokeWidth="3" />
          <circle cx="200" cy="200" r="128" fill="none" stroke="var(--ink)" strokeWidth="3" />
        </svg>
        {/* The turning text is its own svg laid over the disc, and the svg element itself turns
            round the centre of its box. Turning a <g> inside the viewBox left Safari 26 spinning
            it round the wrong point, so the words drifted off the seal (2026-10-19). */}
        <svg
          viewBox="-10 -10 420 420"
          aria-hidden="true"
          className="seal-svg seal-ring"
          style={{ animationPlayState: turning ? "running" : "paused" }}
        >
          <defs>
            <path id="seal-ring" d="M200 200 m-163 0 a163 163 0 1 1 326 0 a163 163 0 1 1 -326 0" />
          </defs>
          <text>
            <textPath href="#seal-ring" textLength={RING_LENGTH} lengthAdjust="spacing">
              {mission.replace(/\.$/, "").toUpperCase()}&#160;&#8226;&#160;
            </textPath>
          </text>
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
        <div
          ref={proof}
          className={`proof${proofPhase === "armed" ? " armed" : proofPhase === "play" ? " armed play" : ""}`}
          aria-hidden="true"
        >
          <span className="proof-lead">{visionEdit.lead}</span>
          {visionEdit.edits.map((e, i) => (
            <span key={e.from} className="edit" style={{ "--i": i } as React.CSSProperties}>
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
