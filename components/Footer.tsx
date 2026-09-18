import Link from "next/link";
import { site } from "@/data/site";
import DecodeHeadline from "@/components/DecodeHeadline";
import { SignUp } from "@/components/SignUp";
import { MapCard } from "@/components/MapCard";

const explore = [
  { href: "/visit", label: "Plan your visit" },
  { href: "/about", label: "About" },
  { href: "/bible-study", label: "Bible study" },
  { href: "/give", label: "Give" },
];

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" stroke="none" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden>
      <rect x="2" y="5" width="20" height="14" rx="4" />
      <path d="M10.5 9.5v5l4.5-2.5-4.5-2.5Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Footer() {
  const address = `${site.address.street}, ${site.address.city}, ${site.address.region} ${site.address.postalCode}`;

  return (
    <footer className="foot f-ink">
      <div className="wrap">
        {/* Reference information first: brand, pages, where to find us. */}
        <div className="foot-top">
          <div className="foot-col">
            <span className="sp foot-wm">{site.shortName}</span>
            <p className="bd foot-about">
              A non-denominational, spirit-filled church in East Austin. Heaven meets culture.
            </p>
            <div className="foot-social">
              <a href={site.instagram.url} target="_blank" rel="noreferrer" className="social" aria-label={`${site.instagram.handle} on Instagram`}>
                <InstagramIcon />
              </a>
              <a href={site.youtube.url} target="_blank" rel="noreferrer" className="social" aria-label={`${site.youtube.handle} on YouTube`}>
                <YouTubeIcon />
              </a>
            </div>
          </div>

          <nav className="foot-col" aria-labelledby="foot-explore">
            <h2 className="lbl foot-lbl" id="foot-explore">EXPLORE</h2>
            <ul className="foot-list">
              {explore.map((l) => (
                <li key={l.href}><Link href={l.href} className="foot-link">{l.label}</Link></li>
              ))}
            </ul>
          </nav>

          <div className="foot-col">
            <h2 className="lbl foot-lbl">CONTACT</h2>
            {/* Email and phone are left out until the church supplies real ones. */}
            <ul className="foot-list">
              <li>
                <a href={site.mapsUrl} target="_blank" rel="noreferrer" className="foot-link">
                  {site.venue}, {address}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* The ask: the tagline block beside sign-up and the map. */}
        <div className="foot-mid">
          <div className="foot-tag">
            <span className="sr-only">Come as you are</span>
            <DecodeHeadline className="foot-decode" />
            <span className="inset" aria-hidden />
          </div>

          <div className="foot-ask">
            <div className="foot-news">
              {/* DUMMY COPY: carried over from the earlier build, not from the church. The
                  monthly cadence is unconfirmed; do not launch with it until they agree. */}
              <h2 className="foot-h">Stay in the room</h2>
              <p className="bd">
                One email a month: what&rsquo;s coming up on Sundays and through the week, and where to find us.
              </p>
              <SignUp />
            </div>
            <MapCard query={`${site.venue}, ${address}`} label={address} directionsUrl={site.mapsUrl} />
          </div>
        </div>

        <div className="foot-base">
          <p className="sm">&copy; {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p className="sm">
            A church plant of{" "}
            <a href={site.parentOrg.url} target="_blank" rel="noreferrer" className="foot-link">{site.parentOrg.name}</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
