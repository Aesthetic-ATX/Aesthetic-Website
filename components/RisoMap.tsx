"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/data/site";
import { risoMap } from "@/data/riso-map";

/* Primary roads (East 7th's two carriageways) are drawn wide enough to read as one street. */
const ROADS: [string, string][] = [
  ...risoMap.residential.map((d) => ["res", d] as [string, string]),
  ...risoMap.tertiary.map((d) => ["ter", d] as [string, string]),
  ...risoMap.primary.map((d) => ["pri", d] as [string, string]),
];
const FT_100 = Math.round((100 * 0.3048) / risoMap.metresPerUnit);

const destination = `${site.address.street}, ${site.address.city}, ${site.address.region} ${site.address.postalCode}`;

/**
 * The footer map, printed rather than embedded (prototypes/footer-2.html, chosen
 * 2026-09-28). The streets, rail and building outline are real OpenStreetMap geometry
 * drawn to scale (0.40 m a unit, with a 100 ft bar): they draw in, the parking on both
 * kerbs of Northwestern Avenue lights up citron, the pin drops on Sapien Center, then a
 * dotted route walks from the parking to the building.
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
          {/* Streets from OpenStreetMap, projected to scale (data/riso-map.ts). The rail line is
              in the data but left off: it crossed the street labels and helps no one find the door. */}
          {ROADS.map(([kind, d], i) => <path key={`c${i}`} className={`road case ${kind} draw`} pathLength={1} d={d} />)}
          {ROADS.map(([kind, d], i) => <path key={`f${i}`} className={`road fill ${kind} draw`} pathLength={1} d={d} />)}
          {risoMap.parking.map((d, i) => <path key={`p${i}`} className="park draw d5" pathLength={1} d={d} />)}
          <path className="walk" d="M364 227 C348 224 332 222 316 219" />
          <text className="walk-lbl" x="326" y="211">WALK</text>
          <g className="venue">
            <path d={risoMap.building} fill="var(--citron)" stroke="var(--ink)" strokeWidth="3" strokeLinejoin="round" />
            <text className="map-lbl" textAnchor="end">
              <tspan x="250" y="200">SAPIEN</tspan>
              <tspan x="250" dy="1.2em">CENTER</tspan>
            </text>
          </g>
          <g className="streets">
            <text className="map-lbl" x="0" y="0" transform="translate(34 330) rotate(10.5)">E 7TH ST</text>
            <text className="map-lbl" x="0" y="0" transform="translate(28 140) rotate(24)">MORELOS ST</text>
            <text className="map-lbl" x="0" y="0" transform="translate(413 250) rotate(-43.5)">NORTHWESTERN AVE</text>
            <text className="map-lbl lbl-minor" x="0" y="0" transform="translate(372 38) rotate(32)">CORONADO ST</text>
            <text className="map-lbl" x="0" y="0" transform="translate(412 160) rotate(-43.5)">PARKING</text>
          </g>
          {/* A true scale bar: 100 ft is 30.5 m, at 0.40 m a unit */}
          <g className="scale">
            <path d={`M16 404 H${16 + FT_100} M16 398 V410 M${16 + FT_100} 398 V410`} />
            <text className="map-lbl" x="16" y="391">100 FT</text>
          </g>
          <g className="pin">
            <path d="M286 204 L274 180 A17 17 0 1 1 298 180 Z" fill="var(--violet)" />
            <circle cx="286" cy="168" r="6" fill="var(--sheet)" />
          </g>
        </svg>
        {/* The link's name starts with what it says on screen (WCAG 2.5.3). */}
        <span className="riso-go">Open in Google Maps</span>
        <span className="sr-only"> for directions to {site.venue}, {destination}</span>
      </a>
      </div>
      <p className="sm riso-bar">
        {site.venue}, {destination}
        <span className="riso-credit">Map data &copy; OpenStreetMap contributors</span>
      </p>
    </div>
  );
}
