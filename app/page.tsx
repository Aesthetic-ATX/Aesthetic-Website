import { getImageProps } from "next/image";
import { preload } from "react-dom";
import Link from "next/link";
import { Fragment, type CSSProperties } from "react";
import { site } from "@/data/site";
import { Series } from "@/components/Series";
import { TaglineBlank } from "@/components/TaglineBlank";
import { VisitTeaser } from "@/components/VisitTeaser";
import { PlayOnce } from "@/components/PlayOnce";

/** DUMMY COPY, drawn from the existing About text until the church writes the final line.
 *  Both phrases come from the approved .docx. "Take a next step" was cut in the 2026-09-22
 *  anti-slop pass: stock church phrasing, and it was mine, not the church's. */
const statement = ["Explore faith", "Grow at your own pace"];

const heroAlt =
  "A musician plays bass on stage at a table of pedals, in front of green and yellow chevron projections, beside the words come as you are";
const heroCommon = { alt: heroAlt, sizes: "100vw", loading: "eager" as const, fetchPriority: "high" as const };
const { props: { srcSet: heroDesktop } } = getImageProps({ ...heroCommon, src: "/images/hero-full-v4.jpg", width: 1672, height: 941 });
const { props: { srcSet: heroMobile, ...heroRest } } = getImageProps({ ...heroCommon, src: "/images/hero-mobile-v2.jpg", width: 1122, height: 1402 });

export default function Home() {
  // Start the hero download at once, the right one for the screen: it is the largest thing on the page.
  preload(heroMobile?.split(" ")[0] ?? "", { as: "image", imageSrcSet: heroMobile, imageSizes: "100vw", fetchPriority: "high", media: "(max-width: 600px)" });
  preload(heroDesktop?.split(" ")[0] ?? "", { as: "image", imageSrcSet: heroDesktop, imageSizes: "100vw", fetchPriority: "high", media: "(min-width: 601px)" });
  return (
    <>
      {/* Hero: the whole 16:9 photo as a plate, then a caption row on the sky
          field (prototypes/hero-full.html, variant B, 2026-09-22). The photo
          carries the wordmark, the tagline and the handle, so it is never
          cropped and nothing is set over it. The sky band for this page lives
          in the caption. */}
      <section className="hero" id="visit">
        <div className="hero-plate">
          {/* Source: ~/Desktop/Aesthetic (09:29) Hero Image.png (1672x941), supplied 2026-09-29: the
              wordmark now reads "Aesthetic", capitalised at Pastor John's request.
              Filename is versioned on every swap: a reused name leaves browsers on the cached copy. */}
          {/* Art direction (mobile-first pass, 2026-10-19): phones get the 4:5 version with larger lettering
              (~/Desktop/Aesthetic Stage_ Come As You Are.png, 1122x1402, the capital-A wordmark), wider screens the 16:9 plate. The frame keeps
              each one's shape, so nothing shifts while it loads. */}
          <picture>
            <source media="(min-width: 601px)" srcSet={heroDesktop} sizes="100vw" />
            <img {...heroRest} srcSet={heroMobile} className="hero-img" alt={heroAlt} />
          </picture>
        </div>
        <div className="hero-cap f-sky">
          <div className="wrap hero-cap-in">
            <div className="hero-when">
              <span className="lbl">NON-DENOMINATIONAL &middot; EAST AUSTIN</span>
              <h1 className="h1">{site.service.day}<br />at {site.service.time}</h1>
            </div>
            {/* The address is the directions link, as on /visit. The one button goes to
                /visit: a full-width violet Directions pill read as a paywall pop-up on
                phones (team feedback, 2026-09-28). */}
            <p className="hero-where">
              <a href={site.directionsUrl} target="_blank" rel="noopener noreferrer">
                {site.address.street}, {site.address.city} {site.address.region} {site.address.postalCode}
              </a>
            </p>
            <div className="hero-actions">
              <Link href="/visit" className="btn btn-v">Plan your visit</Link>
            </div>
          </div>
        </div>
      </section>

      {/* About preview. Text only: label left, two-line heading right, paragraph
          under the label, then a centred closing statement. Background #F8FFEF was
          added to the palette (tried 2026-09-16, approved 2026-09-28). */}
      {/* Motion (2026-10-19, user's mix: option A + B's proof marks + C's crop marks): crop marks
          frame the heading, the italic line prints in two inks and settles into register, the
          paragraph corrects itself, the closing lines ink in. Plays once; tokens only. */}
      <PlayOnce className="about f-about ab" aria-labelledby="about-title">
        <div className="wrap">
          <div className="about-grid">
            <span className="lbl about-lbl">ABOUT AESTHETIC</span>
            <h2 className="about-title" id="about-title">
              <span className="crop">
                <i className="cm tl" aria-hidden /><i className="cm tr" aria-hidden /><i className="cm bl" aria-hidden /><i className="cm br" aria-hidden />
                {/* DUMMY COPY: shortened from the mission so it sets on two lines. */}
                <span className="ink">The beauty of God,</span>
                <br />
                {/* two inks: the sky plate prints first, the black lands on it in register */}
                <em className="sp reg">
                  <span className="reg-sky" aria-hidden>in life and culture.</span>
                  <span className="reg-ink">in life and culture.</span>
                </em>
              </span>
            </h2>
            <div className="about-copy">
              {/* DUMMY COPY: final wording to be decided by the church. */}
              {/* the paragraph corrects itself: the old words struck, the true ones inked green */}
              <p className="bd">
                We believe God is not <span className="pm-x" style={{ "--k": 0 } as CSSProperties}>distant</span>,{" "}
                <span className="pm-x" style={{ "--k": 1 } as CSSProperties}>boring</span>, or{" "}
                <span className="pm-x" style={{ "--k": 2 } as CSSProperties}>disconnected</span> from everyday life. He is{" "}
                <span className="pm-y" style={{ "--k": 0 } as CSSProperties}>creative</span>,{" "}
                <span className="pm-y" style={{ "--k": 1 } as CSSProperties}>present</span>, and{" "}
                <span className="pm-y" style={{ "--k": 2 } as CSSProperties}>actively involved</span> in people&rsquo;s stories.
              </p>
              <Link href="/about" className="btn btn-o">Meet the church</Link>
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
            <span className="lbl highlight-lbl">FAITH IS NOT MEANT TO FEEL FORCED</span>{" "}
            <span className="sp highlight">make room to explore it.</span>
          </div>
        </div>
      </PlayOnce>

      {/* The current series (2026-10-19, replaced the weekly message card). Above
          the tagline so the newest thing on the page comes first. */}
      <section className="sec">
        <div className="wrap">
          <Series />
        </div>
      </section>

      {/* The tagline, then the invitation to visit. The Aesthetic Weekly was
          removed from the homepage on 2026-09-17: its story became /visit,
          and this card is what hands off to it. */}
      {/* No top padding: the series section above already ends with a full section gap. */}
      <section className="sec sec-flush-top">
        <div className="wrap">
          <TaglineBlank />

          <VisitTeaser />
        </div>
      </section>
    </>
  );
}
