import Link from "next/link";
import { Frame } from "@/components/Frame";

/**
 * The card that replaced the Weekly on the homepage (2026-09-17). It carries
 * the one fact that makes a stranger curious and then hands off to /visit,
 * which is also where the hero's "what to expect" link should point.
 */
export function VisitTeaser() {
  return (
    <section className="teaser" aria-labelledby="teaser-title">
      <div className="teaser-body">
        <span className="lbl">NEVER BEEN?</span>
        <h2 className="teaser-h" id="teaser-title">The doors open at half past ten.</h2>
        <p className="bd">
          Coffee, a DJ on the way in, and art on the walls by people who go here. Nothing starts
          until eleven, so there is half an hour to stand around first. Here is the whole morning,
          so none of it is a surprise.
        </p>
        <p className="teaser-link">
          <Link href="/visit" className="arrow-link">
            Plan your visit <span aria-hidden>&rarr;</span>
          </Link>
        </p>
      </div>
      <Frame
        className="teaser-media"
        waitingFor="VIDEO PLACEHOLDER"
        note="YouTube embed. Wide, shot from the back of the room as it fills up."
      />
    </section>
  );
}
