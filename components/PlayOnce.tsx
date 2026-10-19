"use client";

import { useRef, type ReactNode } from "react";
import { usePlayOnce } from "@/components/usePlayOnce";

/**
 * A section that plays its motion once, on arrival (DESIGN.md, Motion system). Server-rendered
 * children stay server-rendered; this only adds "armed" / "armed play" to the wrapper's class.
 */
export function PlayOnce({
  className, children, threshold = 0.4, ...rest
}: { className: string; children: ReactNode; threshold?: number; "aria-labelledby"?: string }) {
  const ref = useRef<HTMLElement>(null);
  const phase = usePlayOnce(ref, threshold);
  return <section ref={ref} className={`${className} ${phase}`} {...rest}>{children}</section>;
}
