import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { site } from "@/data/site";
import { Message } from "@/components/Message";
import { VisitTeaser } from "@/components/VisitTeaser";

/** DUMMY COPY, drawn from the existing About text until the church writes the final line. */
const statement = ["Explore faith", "Grow at your own pace", "Take a next step"];

export default function Home() {
  return (
    <>
      {/* Hero: details on a sky field, image bleeding to the right edge with an
          inset hairline frame. The sky band for this page lives here. */}
      <section className="hero f-sky" id="visit">
        <div className="hero-copy">
          <span className="lbl">NON-DENOMINATIONAL &middot; EAST AUSTIN</span>
          <h1 className="h1">{site.service.day}<br />at {site.service.time}</h1>
          <p className="hero-sub">
            {site.address.street}, {site.address.city} {site.address.region} {site.address.postalCode}
          </p>
          <p className="bd hero-body">
            {site.mission} Whether you have followed Jesus for years or are working out what you
            think, there is room for you on Sunday.
          </p>
          <div className="hero-actions">
            <a href={site.mapsUrl} className="btn btn-v">Plan your visit</a>
            <Link href="/visit" className="arrow-link">
              What to expect <span aria-hidden>&rarr;</span>
            </Link>
          </div>
          <ul className="facts">
            <li>Doors {site.service.doors}</li>
            <li>{site.address.street}</li>
            <li>Come as you are</li>
          </ul>
        </div>
        <div className="hero-media has-photo">
          {/* Source: ~/Desktop/Redefined Image Final.png (1254px square), supplied 2026-09-16. */}
          <Image
            src="/images/hero-stage-final.jpg"
            alt="A bassist plays on stage at a table of pedals, in front of green and yellow chevron projections"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            loading="eager"
            fetchPriority="high"
            className="hero-img"
          />
          <span className="inset" aria-hidden />
        </div>
      </section>

      {/* About preview. Text only: label left, two-line heading right, paragraph
          under the label, then a centred closing statement. Background #F8FFEF is
          an experiment, not a brand colour (2026-09-16). */}
      <section className="about f-about" aria-labelledby="about-title">
        <div className="wrap">
          <div className="about-grid">
            <span className="lbl about-lbl">ABOUT AESTHETIC</span>
            <h2 className="about-title" id="about-title">
              {/* DUMMY COPY: shortened from the mission so it sets on two lines. */}
              The beauty of God,
              <br />
              <em className="sp">in life and culture.</em>
            </h2>
            <div className="about-copy">
              {/* DUMMY COPY: final wording to be decided by the church. */}
              <p className="bd">
                We believe God is not distant, boring, or disconnected from everyday life. He is
                creative, present, and actively involved in people&rsquo;s stories.
              </p>
              <Link href="/about" className="arrow-link">
                Learn more about Aesthetic <span aria-hidden>&rarr;</span>
              </Link>
            </div>
          </div>

          {/* DUMMY COPY */}
          <p className="sp statement">
            {statement.map((part, i) => (
              <Fragment key={part}>
                {i > 0 && <span className="statement-dot" aria-hidden>&middot;</span>}
                <span className="statement-part">{part}</span>
              </Fragment>
            ))}
          </p>
          <div className="highlight-row">
            <span className="lbl highlight-lbl">FAITH IS NOT MEANT TO FEEL FORCED</span>
            <span className="sp highlight">make room to explore it.</span>
          </div>
        </div>
      </section>

      {/* This week's message, under the bulletin masthead (2026-09-17). Moved
          above the tagline so the newest thing on the page comes first. */}
      <section className="sec">
        <div className="wrap">
          <Message />
        </div>
      </section>

      {/* The tagline, then the invitation to visit. The Aesthetic Weekly was
          removed from the homepage on 2026-09-17: its story became /visit,
          and this card is what hands off to it. */}
      <section className="sec">
        <div className="wrap">
          <div className="tagline-block">
            <span className="lbl">THE ONLY THING WE ASK</span>
            <p className="sp quote">{site.tagline}</p>
          </div>

          <VisitTeaser />
        </div>
      </section>
    </>
  );
}
