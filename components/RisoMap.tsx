"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/data/site";

const destination = `${site.address.street}, ${site.address.city}, ${site.address.region} ${site.address.postalCode}`;

/**
 * The footer map, printed rather than embedded (prototypes/footer-2.html, chosen
 * 2026-09-28). A flat drawing of the block from the church's own parking image: the
 * streets draw in, the Northwest Ave parking lights up citron, the pin drops on Sapien
 * Center, then a dotted route walks from the parking to the building. Not to scale.
 *
 * Nothing loads from Google until it is pressed, so no third-party cookies and no layout
 * shift. Pressing it opens Google Maps directions from the visitor's own location, with
 * distance and travel time (the user's reference, 2026-09-28).
 */
export function RisoMap() {
  const box = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && e.intersectionRatio > 0.35) setInView(true);
        else if (!e.isIntersecting) setInView(false);
      },
      { threshold: [0, 0.35] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={box} className={`riso${inView ? " in" : ""}`}>
      <div className="riso-frame">
      <a
        className="riso-map"
        href={site.directionsUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        <svg viewBox="0 0 600 420" aria-hidden="true">
          <path className="road case draw d1" pathLength={1} d="M-20 362 L620 316" />
          <path className="road fill draw d1" pathLength={1} d="M-20 362 L620 316" />
          <path className="road case draw d2" pathLength={1} d="M-20 300 C110 298 190 322 252 344" />
          <path className="road fill draw d2" pathLength={1} d="M-20 300 C110 298 190 322 252 344" />
          <path className="road case draw d3" pathLength={1} d="M455 330 L522 -20" />
          <path className="road fill draw d3" pathLength={1} d="M455 330 L522 -20" />
          <path className="road case draw d4" pathLength={1} d="M-20 118 C160 96 340 92 496 118" />
          <path className="road fill draw d4" pathLength={1} d="M-20 118 C160 96 340 92 496 118" />
          <path className="park draw d5" pathLength={1} d="M438 314 L474 126" />
          <path className="park draw d5" pathLength={1} d="M472 318 L508 128" />
          <path className="walk" d="M440 236 C410 238 390 240 364 240" />
          <text className="walk-lbl" x="378" y="222">WALK</text>
          <g className="venue">
            <rect x="238" y="206" width="124" height="64" transform="rotate(-6 300 238)" fill="var(--citron)" stroke="var(--ink)" strokeWidth="3" />
            <text className="map-lbl venue-lbl" textAnchor="middle" transform="rotate(-6 300 238)">
              <tspan x="300" y="234">SAPIEN</tspan>
              <tspan x="300" dy="1.15em">CENTER</tspan>
            </text>
          </g>
          <g className="streets">
            <text className="map-lbl" x="300" y="386" transform="rotate(-4 300 386)">E 7TH ST</text>
            <text className="map-lbl" x="18" y="284">MORELOS ST</text>
            <text className="map-lbl" x="150" y="88" transform="rotate(-3 150 88)">CORONADO ST</text>
            <text className="map-lbl" x="0" y="0" transform="translate(544 250) rotate(-79)">NORTHWEST AVE</text>
            <text className="map-lbl" x="0" y="0" transform="translate(425 196) rotate(-79)">PARKING</text>
          </g>
          <g className="pin">
            <path d="M300 200 L288 176 A17 17 0 1 1 312 176 Z" fill="var(--violet)" />
            <circle cx="300" cy="164" r="6" fill="var(--sheet)" />
          </g>
        </svg>
        {/* The link's name starts with what it says on screen (WCAG 2.5.3). */}
        <span className="riso-go">Open in Google Maps</span>
        <span className="sr-only"> for directions to {site.venue}, {destination}</span>
      </a>
      {/* Outside the link, so the link's name is only where it goes (WCAG 2.5.3) */}
      <span className="riso-note" aria-hidden="true">NOT TO SCALE</span>
      </div>
      <p className="sm riso-bar">{site.venue}, {destination}</p>
    </div>
  );
}
