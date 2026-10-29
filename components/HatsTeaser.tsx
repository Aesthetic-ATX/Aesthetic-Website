"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, type CSSProperties } from "react";
import { hats } from "@/data/hats";
import { usePlayOnce } from "@/components/usePlayOnce";

/**
 * The homepage pointer to the hats on /visit (2026-10-28, user's wording): NEW MERCH / SOLD ON SUNDAYS,
 * "Two hats. / Same Aesthetic." on two lines, and two of the angles (trucker front, ponytail back) in the
 * same pinned-flyer frame as /visit, with the site's violet button under them as the call to action. Only the
 * button links; the frames pin up once on arrival.
 */
export function HatsTeaser() {
  const pins = useRef<HTMLSpanElement>(null);
  const phase = usePlayOnce(pins, 0.4);
  const shown = [hats.photos[0], hats.photos[3]];
  return (
    <div className="hats-tz">
      <span className="hats-tz-t">
        <span className="lbl">{hats.teaser.kicker}</span>
        <span className="lbl">{hats.teaser.sub}</span>
        <span className="hats-tz-h">Two hats.<br />Same <span className="sp">Aesthetic</span>.</span>
      </span>
      <span ref={pins} className={`hats-pins hats-tz-pins ${phase}`}>
        {shown.map((p, i) => (
          <span key={p.src} className="hats-pin" style={{ "--i": i } as CSSProperties}>
            <span className="hats-paper">
              <span className="hats-block" aria-hidden="true" />
              <span className="hats-sheet">
                <Image src={p.src} width={p.width} height={p.height} alt="" sizes="(max-width: 900px) 42vw, 220px" />
              </span>
              <span className="tape" aria-hidden="true" />
            </span>
          </span>
        ))}
        {/* the one link in the block (user, 2026-10-28: not the whole container) */}
        <Link href="/visit#hats" className="btn btn-v hats-tz-btn">{hats.teaser.cta}</Link>
      </span>
    </div>
  );
}
