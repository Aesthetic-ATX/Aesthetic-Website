import Link from "next/link";
import type { Metadata } from "next";

/** Any unmatched URL lands here, inside the normal nav and footer. On the
 *  sheet, not a tint: the four tinted grounds belong to their pages. */
export const metadata: Metadata = {
  title: "Page not found | Aesthetic Church Austin",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="sec">
      <div className="wrap">
        <div className="col" style={{ gap: 24, maxWidth: 720 }}>
          <p className="lbl" style={{ margin: 0 }}>PAGE NOT FOUND</p>
          <h1 className="h1" style={{ fontSize: "clamp(40px,5.6vw,62px)" }}>We can&rsquo;t find that page.</h1>
          <hr className="rule" style={{ width: 180 }} />
          <p className="bl">
            The link may be out of date, or the address may have a typo. Everything on the site
            starts from the homepage.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            <Link href="/" className="btn btn-v">Back to home</Link>
            <Link href="/visit" className="btn btn-o">Plan your visit</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
