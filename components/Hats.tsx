"use client";

import Image from "next/image";
import { useRef, type CSSProperties } from "react";
import { hats, hatsCardLabel } from "@/data/hats";
import { usePlayOnce } from "@/components/usePlayOnce";

/**
 * The hats on /visit (2026-10-28, user's pick from prototypes/hats): a swing tag drawn as a receipt (thin
 * outline, dotted leaders, torn zigzag foot) hung by a string from a strip of tape, then the four angles in
 * the pinned-flyer frame from Groups and Events. Two play-once pieces: the tag drops in on its string and
 * its lines print in; the frames pin up one after another, tape last. Tokens only (DESIGN.md, "The hats").
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
        <div className="hats-hang">
          <span className="tape" aria-hidden="true" />
          <svg className="hats-string" viewBox="0 0 100 60" preserveAspectRatio="none" aria-hidden="true">
            <path d="M50 2 L36 58 M50 2 L64 58" />
          </svg>
          <div className="hats-tag" role="img" aria-label={hatsCardLabel}>
            <div className="hats-tag-in" aria-hidden="true">
              <span className="hats-hole" />
              <span className="hats-wm hats-ink" style={{ "--i": 0 } as CSSProperties}>Aesthetic</span>
              <span className="hats-c hats-ink" style={{ "--i": 0 } as CSSProperties}>NEW HATS</span>
              <span className="hats-rule" />
              {hats.prices.map((p, i) => (
                <span key={p.name} className="hats-row hats-ink" style={{ "--i": i + 1 } as CSSProperties}>
                  <span>{p.name}</span><i /><span>{p.price}</span>
                </span>
              ))}
              <span className="hats-row hats-q hats-ink" style={{ "--i": 3 } as CSSProperties}>{hats.tax}</span>
              <span className="hats-rule" />
              <span className="hats-c hats-ink" style={{ "--i": 4 } as CSSProperties}>PAY WITH</span>
              <span className="hats-payline hats-ink" style={{ "--i": 5 } as CSSProperties}>{hats.pay}</span>
              <span className="hats-rule" />
              <span className="hats-c hats-ink" style={{ "--i": 6 } as CSSProperties}>SEE YOU SUNDAY</span>
            </div>
            {/* the torn foot, drawn so its outline stays a crisp 1px at any width */}
            <svg className="hats-zz" viewBox="0 0 100 10" preserveAspectRatio="none" aria-hidden="true">
              <polygon points="0,0 2.5,9 5,0 7.5,9 10,0 12.5,9 15,0 17.5,9 20,0 22.5,9 25,0 27.5,9 30,0 32.5,9 35,0 37.5,9 40,0 42.5,9 45,0 47.5,9 50,0 52.5,9 55,0 57.5,9 60,0 62.5,9 65,0 67.5,9 70,0 72.5,9 75,0 77.5,9 80,0 82.5,9 85,0 87.5,9 90,0 92.5,9 95,0 97.5,9 100,0" />
              <polyline points="0,0 2.5,9 5,0 7.5,9 10,0 12.5,9 15,0 17.5,9 20,0 22.5,9 25,0 27.5,9 30,0 32.5,9 35,0 37.5,9 40,0 42.5,9 45,0 47.5,9 50,0 52.5,9 55,0 57.5,9 60,0 62.5,9 65,0 67.5,9 70,0 72.5,9 75,0 77.5,9 80,0 82.5,9 85,0 87.5,9 90,0 92.5,9 95,0 97.5,9 100,0" />
            </svg>
          </div>
        </div>
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
        <a className="btn btn-v" href="https://www.instagram.com/aesthetic_atx/" target="_blank" rel="noopener noreferrer">SEE THEM ON INSTAGRAM</a>
      </div>
    </section>
  );
}
