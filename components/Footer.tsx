import Link from "next/link";
import { site } from "@/data/site";
import DecodeHeadline from "@/components/DecodeHeadline";
import { RisoMap } from "@/components/RisoMap";

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
  return (
    <footer className="foot f-ink">
      <div className="wrap">
        {/* Left: who we are, then the pages and the inbox. Right: the printed map.
            Laid out by the user, 2026-09-28. */}
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

            <div className="foot-refs">
              <nav className="foot-ref" aria-labelledby="foot-explore">
                <h2 className="lbl foot-lbl" id="foot-explore">EXPLORE</h2>
                <ul className="foot-list">
                  {explore.map((l) => (
                    <li key={l.href}><Link href={l.href} className="foot-link">{l.label}</Link></li>
                  ))}
                </ul>
              </nav>
              <div className="foot-ref">
                <h2 className="lbl foot-lbl">CONTACT</h2>
                <ul className="foot-list">
                  <li>
                    <a href={`mailto:${site.email}`} className="foot-link">{site.email}</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <RisoMap />
        </div>

        {/* The moving headline, centred at the foot of the page: brand sky straight on
            the ink, no frame (2026-09-28). The sign-up it used to sit beside returns in
            Phase 2, once there is somewhere to send email. */}
        <div className="foot-tag">
          <span className="sr-only">Come as you are</span>
          <DecodeHeadline className="foot-decode" color="var(--sky)" />
        </div>

        <div className="foot-base">
          <p className="sm">&copy; {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p className="sm">
            A church plant of{" "}
            {site.parentOrg.url ? (
              <a href={site.parentOrg.url} target="_blank" rel="noreferrer" className="foot-link">{site.parentOrg.name}</a>
            ) : (
              site.parentOrg.name
            )}
          </p>
        </div>
      </div>
    </footer>
  );
}
