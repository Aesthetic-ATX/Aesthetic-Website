"use client";

import Image from "next/image";
import { useRef, type CSSProperties } from "react";
import { hats, hatsCardLabel } from "@/data/hats";
import { usePlayOnce } from "@/components/usePlayOnce";

/**
 * The hats on /visit (2026-10-28, user's pick from prototypes/hats): a stone table with the tent card
 * standing on it, then the four angles in the pinned-flyer frame from Groups and Events. Two play-once
 * pieces: the card stands up from flat, its stitching sews round the patch and its prices print in; the
 * frames pin up one after another, tape last. Tokens only (DESIGN.md, "The hats").
 */
export function Hats() {
  const scene = useRef<HTMLDivElement>(null);
  const pins = useRef<HTMLDivElement>(null);
  const scenePhase = usePlayOnce(scene, 0.5);
  const pinsPhase = usePlayOnce(pins, 0.3);

  return (
    <section className="hats" id="hats" aria-labelledby="hats-title">
      <div className="hats-head">
        <p className="lbl">{hats.kicker}</p>
        <h2 id="hats-title" className="hats-h">{hats.heading}</h2>
      </div>

      <div ref={scene} className={`hats-scene ${scenePhase}`}>
        <div className="hats-card" role="img" aria-label={hatsCardLabel}>
          <div className="hats-patch" aria-hidden="true">
            <svg className="hats-stitch">
              <defs>
                <mask id="hats-sewn" maskUnits="userSpaceOnUse">
                  <rect className="hats-sew" x="0" y="0" width="100%" height="100%" pathLength={1} />
                </mask>
              </defs>
              <rect x="0" y="0" width="100%" height="100%" mask="url(#hats-sewn)" />
            </svg>
            <span className="hats-wm">Aesthetic</span>
            <span className="hats-new">NEW HATS</span>
          </div>
          <div className="hats-prices" aria-hidden="true">
            {hats.prices.map((p, i) => (
              <div key={p.name} className="hats-price hats-ink" style={{ "--i": i } as CSSProperties}>
                <span className="hats-pn">{p.name}</span>
                <span className="hats-pp">{p.price}</span>
              </div>
            ))}
          </div>
          <p className="hats-pay" aria-hidden="true">
            {hats.pay.map((line, i) => (
              <span key={line} className="hats-ink" style={{ "--i": i + 2 } as CSSProperties}>{line}</span>
            ))}
          </p>
        </div>
        <div className="hats-edge" aria-hidden="true" />
      </div>

      <div ref={pins} className={`hats-pins ${pinsPhase}`}>
        {hats.photos.map((p, i) => (
          <figure key={p.src} className="hats-pin" style={{ "--i": i } as CSSProperties}>
            <div className="hats-paper">
              <span className="hats-block" aria-hidden="true" />
              <div className="hats-sheet">
                <Image src={p.src} width={p.width} height={p.height} alt={p.alt}
                  sizes="(max-width: 900px) 45vw, 260px" />
              </div>
              <span className="tape" aria-hidden="true" />
            </div>
          </figure>
        ))}
      </div>

      <div className="hats-foot">
        <p>{hats.text}</p>
        <a className="arrow-link" href="https://www.instagram.com/aesthetic_atx/" target="_blank" rel="noopener noreferrer">SEE THEM ON INSTAGRAM</a>
      </div>
    </section>
  );
}
