"use client";

import { useEffect, useRef, useState } from "react";
import { beliefs } from "@/data/commitment";

/**
 * Core beliefs laid as a wall, John's "foundation of our community" taken
 * literally, with The Bible as the base stone. Chosen 2026-09-16 from four
 * prototypes (prototypes/beliefs.html, option C).
 *
 * The panel reads up the wall on its own in John's order. Because it changes
 * by itself for longer than five seconds, WCAG 2.2.2 requires a pause, so a
 * button is always there. Hover or focus holds a stone and lets go 1.5s after
 * leaving; a tap holds until play. It only runs while in view, never under
 * reduced motion, and screen readers hear only the changes a person made.
 */

/** Courses from top to bottom; each stone grows with its name's length. */
const COURSES = [
  ["Salvation", "Spiritual Growth"],
  ["The Church", "Humanity", "The Holy Spirit"],
  ["Jesus Christ", "God"],
  ["The Bible"],
];

/** ~1.5s to find the line plus ~0.18s a word: about 4s to 5.6s per belief. */
const dwell = (i: number) => 1500 + 180 * beliefs[i].text.split(" ").length;

export function BeliefsWall() {
  const [current, setCurrent] = useState(0);
  const [announce, setAnnounce] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [holding, setHolding] = useState(false);
  const [visible, setVisible] = useState(false);
  const [moving, setMoving] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  const release = useRef<number | undefined>(undefined);

  useEffect(() => {
    setMoving(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const el = panel.current;
    if (!el) return;
    const io = new IntersectionObserver((es) => setVisible(es.some((e) => e.isIntersecting)), { threshold: 0.4 });
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearTimeout(release.current);
    };
  }, []);

  const running = moving && visible && !userPaused && !holding;

  useEffect(() => {
    if (!running) return;
    const t = window.setTimeout(() => {
      setAnnounce(false);
      setCurrent((c) => (c + 1) % beliefs.length);
    }, dwell(current));
    return () => window.clearTimeout(t);
  }, [running, current]);

  const pick = (i: number) => {
    window.clearTimeout(release.current);
    setAnnounce(true);
    setCurrent(i);
  };
  const letGo = () => {
    window.clearTimeout(release.current);
    release.current = window.setTimeout(() => setHolding(false), 1500);
  };

  return (
    <div className="found">
      <div>
        <div
          className="wall"
          role="group"
          aria-label="Core beliefs"
          onMouseLeave={letGo}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node | null)) letGo();
          }}
        >
          {COURSES.map((row) => (
            <div className="course" key={row.join()}>
              {row.map((name) => {
                const i = beliefs.findIndex((b) => b.name === name);
                return (
                  <button
                    key={name}
                    type="button"
                    className={name === "The Bible" ? "stone base" : "stone"}
                    style={{ flexGrow: name.length }}
                    aria-pressed={i === current}
                    onClick={() => {
                      pick(i);
                      setUserPaused(true);
                    }}
                    onMouseEnter={() => {
                      if (!window.matchMedia("(hover: hover)").matches) return;
                      setHolding(true);
                      pick(i);
                    }}
                    onFocus={() => {
                      setHolding(true);
                      pick(i);
                    }}
                  >
                    {name}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
        <p className="sm found-hint">Reading up from the foundation. Tap a stone to stay on it.</p>
      </div>

      <div className="found-panel" ref={panel} aria-live={announce ? "polite" : "off"}>
        {moving ? (
          <button
            type="button"
            className="found-toggle"
            aria-label={userPaused ? "Play the beliefs" : "Pause the beliefs"}
            onClick={() => {
              setHolding(false);
              setUserPaused((p) => !p);
            }}
          >
            {userPaused ? (
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden><path d="M8 5v14l11-7-11-7Z" fill="currentColor" /></svg>
            ) : (
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden><path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" fill="currentColor" /></svg>
            )}
          </button>
        ) : null}
        {running ? (
          <span
            key={current}
            className="found-progress"
            style={{ animationDuration: `${dwell(current)}ms` }}
            aria-hidden
          />
        ) : null}
        <span className="lbl">WE BELIEVE</span>
        {/* Every belief shares one grid cell, so the panel is always as tall as the
            longest and the page below never jumps when the cycle moves on. */}
        <div className="found-stack">
          {beliefs.map((b, i) => (
            <div key={b.name} className={i === current ? "found-item on" : "found-item"}>
              <h3>{b.name}</h3>
              <p>{b.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
