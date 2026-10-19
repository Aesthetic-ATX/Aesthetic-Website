"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { site } from "@/data/site";

/**
 * The footer's "how to find us", replacing the drawn Riso map (2026-10-19: the user found it
 * amateurish): the church's own aerial photo of the block (the /visit parking image) as a postcard on
 * a slight tilt, taped up like the Groups flyers (user's choice). /visit gets a typeset wayfinding
 * sign instead, because its own content already shows the aerial.
 */
export function FootPlace() {
  const onVisit = usePathname() === "/visit";
  const go = (
    <a className="riso-go" href={site.directionsUrl} target="_blank" rel="noopener noreferrer">
      Open in Google Maps<span className="sr-only"> for directions to {site.venue}, {site.address.street}</span>
    </a>
  );

  if (onVisit) {
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
