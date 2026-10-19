"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/data/site";

/**
 * The footer's "how to find us", replacing the drawn Riso map (2026-10-19: the user found it
 * amateurish). Two candidates while the user chooses:
 *  - "aerial": the church's own aerial photo of the block (the /visit parking image) as a postcard
 *    on a slight tilt, with one line of wayfinding under it;
 *  - "sign": a wayfinding sign set in type, no picture.
 * /visit always gets the sign, because its own content already shows the aerial.
 * PREVIEW ONLY: ?place=sign shows the sign on any page. Remove the switch once one is chosen.
 */
export function FootPlace() {
  const onVisit = usePathname() === "/visit";
  const [preview, setPreview] = useState(false);
  useEffect(() => { setPreview(new URLSearchParams(location.search).get("place") === "sign"); }, []);
  const go = (
    <a className="riso-go" href={site.directionsUrl} target="_blank" rel="noopener noreferrer">
      Open in Google Maps<span className="sr-only"> for directions to {site.venue}, {site.address.street}</span>
    </a>
  );

  if (onVisit || preview) {
    return (
      <div className="sign">
        <p className="lbl sign-lbl">FINDING US ON A SUNDAY</p>
        <p className="sign-where">{site.address.street}</p>
        <ol className="sign-steps">
          <li><span className="sign-n" aria-hidden>1</span><span>Park on Northwestern Ave, either side of the street</span></li>
          <li><span className="sign-n" aria-hidden>2</span><span>Walk over to {site.venue} on Morelos St</span></li>
          <li><span className="sign-n" aria-hidden>3</span><span>Doors open at {site.service.doors.replace(/am$/i, "")}, we start at {site.service.time}</span></li>
        </ol>
        {go}
      </div>
    );
  }

  return (
    <div className="post">
      {/* the card is a second way to the same directions; the button below is the one in the tab order */}
      <a className="post-card" href={site.directionsUrl} target="_blank" rel="noopener noreferrer" tabIndex={-1} aria-hidden>
        <Image
          src="/images/visit-parking-v1.jpg"
          alt=""
          width={1229}
          height={1280}
          sizes="(max-width: 900px) min(480px, 90vw), 480px"
          loading="lazy"
        />
      </a>
      <p className="sm post-bar">{site.venue}, {site.address.street}, {site.address.city}, {site.address.region} {site.address.postalCode}</p>
      <p className="post-way">Park on Northwestern Ave &middot; walk over to {site.venue} &middot; doors {site.service.doors.replace(/am$/i, "")}</p>
      {go}
    </div>
  );
}
