import Link from "next/link";
import { site } from "@/data/site";

export function Footer() {
  return (
    <footer className="sec f-ink">
      <div className="wrap" style={{ display: "flex", flexDirection: "column", gap: 36 }}>
        <div className="foot-grid">
          <div className="foot-col">
            <span className="sp" style={{ fontSize: 40, color: "var(--sheet)" }}>{site.shortName}</span>
            <p className="bd" style={{ maxWidth: "30ch" }}>
              A non-denominational, spirit-filled church in East Austin. Heaven meets culture.
            </p>
          </div>
          <div className="foot-col">
            <span className="lbl foot-lbl">SUNDAYS</span><hr className="rule" />
            <p className="bd">{site.service.time} every week<br />Doors open {site.service.doors}</p>
          </div>
          <div className="foot-col">
            <span className="lbl foot-lbl">FIND US</span><hr className="rule" />
            <p className="bd">{site.address.street}<br />{site.address.city}, {site.address.region} {site.address.postalCode}</p>
            <a href={site.mapsUrl}>Get directions</a>
          </div>
          <div className="foot-col">
            <span className="lbl foot-lbl">GO TO</span><hr className="rule" />
            <Link href="/about">About</Link>
            <Link href="/bible-study">Bible study</Link>
            <Link href="/give">Give</Link>
            <a href={site.instagram.url}>{site.instagram.handle}</a>
          </div>
        </div>
        <hr className="rule" />
        <div style={{ display: "flex", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
          <p className="sm">&copy; {new Date().getFullYear()} {site.name}, Austin TX.</p>
          <p className="sm">Giving is processed by {site.giving.partner}, a 501(c)(3).</p>
        </div>
      </div>
    </footer>
  );
}
