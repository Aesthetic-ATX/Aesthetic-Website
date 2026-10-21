"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { site } from "@/data/site";
import { usePlayOnce } from "@/components/usePlayOnce";

/**
 * The footer's "how to find us", replacing the drawn Riso map (2026-10-19: the user found it
 * amateurish): the church's own aerial photo of the block (the /visit parking image) as a postcard on
 * a slight tilt, taped up like the Groups flyers (user's choice). /visit gets a text thread instead
 * (the user's concept, variant C, 2026-10-20), because its own content already shows the aerial.
 */
export function FootPlace() {
  const onVisit = usePathname() === "/visit";
  if (onVisit) return <Thread />;

  return (
    <div className="post">
      {/* One object: the photo, and the address and button written on the card's bottom strip. */}
      <div className="post-card">
        {/* the Groups flyers' tape, in the brand sky, holding the card up */}
        <span className="tape" aria-hidden />
        {/* the photo is a second way to the same directions; the button is the one in the tab order */}
        <a className="post-photo" href={site.directionsUrl} target="_blank" rel="noopener noreferrer" tabIndex={-1} aria-hidden>
          <Image
            src="/images/visit-parking-v1.jpg"
            alt=""
            width={1229}
            height={1280}
            sizes="(max-width: 900px) 100vw, 660px"
            loading="lazy"
          />
        </a>
        <div className="post-cap">
          <p className="post-bar">{site.venue}<br />{site.address.street}, {site.address.city}, {site.address.region} {site.address.postalCode}</p>
          <a className="post-go" href={site.directionsUrl} target="_blank" rel="noopener noreferrer">
            Open in Google Maps<span className="sr-only"> for directions to {site.venue}, {site.address.street}</span>
          </a>
        </div>
      </div>
    </div>
  );
}

/* The way in, told as a text from a friend (the user's concept, variant C, chosen 2026-10-20). The messages
   print in one after another when the card arrives (DESIGN.md, Motion: plays once, ink wipe); the server
   and reduced motion get the whole thread at once. The last message shares the location: the card's one action. */
const thread: Array<{ from: "us" | "you"; text: string; tag?: string }> = [
  { from: "us", text: "Hey! So glad you\u2019re coming today." },
  { from: "us", text: "Park anywhere on Northwestern Ave, either side is fine." },
  { from: "us", text: `Then walk over to ${site.venue} on Morelos St.` },
  { from: "you", text: "Got it, what time?" },
  {
    from: "us",
    text: `Doors at ${site.service.doors.replace(/am$/i, "")}, we start at ${site.service.time.replace(/am$/i, "")}. Grab a coffee and`,
    tag: "come as you are.",
  },
];

function Thread() {
  const ref = useRef<HTMLDivElement>(null);
  const phase = usePlayOnce(ref, 0.3);
  return (
    <div className={`thread ${phase}`} ref={ref}>
      <div className="thread-in">
        <div className="thread-l">
          <p className="lbl thread-lbl">FINDING US ON A SUNDAY</p>
          <p className="thread-where">We saved you a seat.</p>
        </div>
        <div className="thread-r">
          <div className="thread-who" aria-hidden>
            <p>AESTHETIC</p>
            <p className="thread-when">SUNDAY 9:42 AM</p>
          </div>
          <ol className="thread-msgs" aria-label="A text from Aesthetic">
            {thread.map((m, i) => (
              <li
                key={i}
                className={`tm ${m.from}${i > 0 && thread[i - 1].from !== m.from ? " turn" : ""}`}
                style={{ "--i": i } as React.CSSProperties}
              >
                <span className="sr-only">{m.from === "us" ? "Aesthetic: " : "You: "}</span>
                {m.text}
                {m.tag ? <> <span className="sp tm-tag">{m.tag}</span></> : null}
              </li>
            ))}
            <li className="tm us tm-place" style={{ "--i": thread.length } as React.CSSProperties}>
              <span className="sr-only">Aesthetic shared a location: </span>
              <span className="tm-k" aria-hidden>SHARED A LOCATION</span>
              <span className="tm-where">
                <span className="tm-name">{site.venue}</span>
                <span className="tm-addr">{site.address.street}, {site.address.city}, {site.address.region} {site.address.postalCode}</span>
              </span>
              <a className="riso-go" href={site.directionsUrl} target="_blank" rel="noopener noreferrer">
                Open in Google Maps<span className="sr-only"> for directions to {site.venue}, {site.address.street}</span>
              </a>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
