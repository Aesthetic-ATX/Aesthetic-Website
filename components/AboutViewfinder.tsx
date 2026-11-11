"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { usePlayOnce } from "@/components/usePlayOnce";

/**
 * The homepage About section (DESIGN.md, "About section motion", the viewfinder, 2026-11-10). Like
 * PlayOnce, it only adds "armed" / "armed play" to the section. It also tells each crop mark where
 * to start (round the word "beauty") and where to pause (round the first line), as offsets from
 * the corner it ends on, so the CSS can move the marks with transforms alone. Measured again as the
 * motion starts, because the heading may have re-wrapped since the page loaded.
 */
export function AboutViewfinder({
  className, children, ...rest
}: { className: string; children: ReactNode; "aria-labelledby"?: string }) {
  const ref = useRef<HTMLElement>(null);
  const phase = usePlayOnce(ref, 0.4);

  useLayoutEffect(() => {
    const el = ref.current;
    const crop = el?.querySelector(".crop")?.getBoundingClientRect();
    const word = el?.querySelector(".vf-word")?.getBoundingClientRect();
    const line = el?.querySelector(".vf-line")?.getBoundingClientRect();
    if (!el || !phase || !crop || !word || !line) return;
    const pad = Math.max(6, crop.height * 0.04);
    type Box = { l: number; t: number; r: number; b: number };
    const round = (r: DOMRect): Box => ({
      l: Math.max(crop.left, r.left - pad), t: Math.max(crop.top, r.top - pad * 0.4),
      r: Math.min(crop.right, r.right + pad), b: Math.min(crop.bottom, r.bottom + pad * 0.4),
    });
    const first = round(word);
    const second: Box = { ...round(line), l: crop.left, t: crop.top, r: crop.right };
    const corners = [["tl", "l", "t"], ["tr", "r", "t"], ["bl", "l", "b"], ["br", "r", "b"]] as const;
    for (const [name, x, y] of corners) {
      const mark = el.querySelector<HTMLElement>(`.cm.${name}`);
      if (!mark) continue;
      const endX = x === "l" ? crop.left : crop.right, endY = y === "t" ? crop.top : crop.bottom;
      mark.style.setProperty("--x0", `${(first[x] - endX).toFixed(1)}px`);
      mark.style.setProperty("--y0", `${(first[y] - endY).toFixed(1)}px`);
      mark.style.setProperty("--x1", `${(second[x] - endX).toFixed(1)}px`);
      mark.style.setProperty("--y1", `${(second[y] - endY).toFixed(1)}px`);
    }
  }, [phase]);

  return <section ref={ref} className={`${className} ${phase}`} {...rest}>{children}</section>;
}
