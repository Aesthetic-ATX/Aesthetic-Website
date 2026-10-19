"use client";

import { useEffect, useState, type RefObject } from "react";

/**
 * The site's one motion trigger (DESIGN.md, Motion): a piece plays once, when `threshold` of it
 * is on screen. The server renders the finished print; "armed" hides the moving parts with no
 * transition, "play" runs them. Reduced motion never leaves the finished print.
 * Returns the class to add: "", "armed" or "armed play".
 */
export function usePlayOnce(ref: RefObject<Element | null>, threshold = 0.4) {
  const [phase, setPhase] = useState<"" | "armed" | "armed play">("");
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setPhase("armed");
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      requestAnimationFrame(() => setPhase("armed play"));
    }, { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [ref, threshold]);
  return phase;
}
