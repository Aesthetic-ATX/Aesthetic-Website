"use client";

import { useState } from "react";

/**
 * The map loads only when asked. A Google embed on every page sets third-party
 * cookies on first paint, which is what costs /give its best-practices score;
 * behind a button it costs nothing until someone wants it.
 */
export function MapCard({ query, label, directionsUrl }: { query: string; label: string; directionsUrl: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="map-card">
      <div className="map-view">
        {open ? (
          <iframe
            src={`https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`}
            title={`Map to ${label}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        ) : (
          <div className="map-idle">
            <span className="lbl">EAST AUSTIN</span>
            <button type="button" className="btn btn-o" onClick={() => setOpen(true)}>
              Show map
            </button>
            <p className="sm">Loads Google Maps</p>
          </div>
        )}
        {/* same 3px inset keyline as the hero photo and the footer tagline block */}
        <span className="inset" aria-hidden />
      </div>
      <div className="map-bar">
        <span className="sm">{label}</span>
        <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="sm map-dir">
          Directions <span aria-hidden>&#8599;</span>
        </a>
      </div>
    </div>
  );
}
