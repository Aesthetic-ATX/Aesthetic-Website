import { site } from "@/data/site";
import { metaFor } from "@/data/meta";

export const metadata = metaFor("give");

const donateSchema = {
  "@context": "https://schema.org",
  "@type": "DonateAction",
  name: `Give to ${site.name}`,
  target: site.giving.formUrl,
  recipient: { "@type": "Organization", name: site.giving.partner },
};

export default function Give() {
  return (
    <section className="sec page-give">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(donateSchema) }} />
      <div className="wrap split s-even">
        <div className="col" style={{ gap: 24 }}>
          <h1 className="h1" style={{ fontSize: "clamp(40px,5.6vw,62px)" }}>Give</h1>
          <hr className="rule" style={{ width: 180 }} />
          <p className="bl">
            Giving is how this church keeps showing up on Morelos Street every Sunday, and how it
            keeps growing past it. If Aesthetic has been part of your story, this is one way to be
            part of someone else&rsquo;s.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <h2 className="h3" style={{ fontSize: "clamp(22px,2.2vw,26px)" }}>How giving works</h2>
            <p className="bd">
              Your gift is processed through {site.giving.partner}, our 501(c)(3) partner. That means
              it is tax deductible, it is handled securely, and you get a receipt for your records.
              You never leave this page to do it.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <h2 className="h3" style={{ fontSize: "clamp(22px,2.2vw,26px)" }}>Where your giving goes</h2>
            {/* Tightened from the user's wording and approved, 2026-09-23. */}
            <p className="bd">
              Your giving covers our operating costs and pays our small staff, so we can keep serving
              Austin.
            </p>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ border: "var(--key)", background: "var(--sheet)", overflow: "hidden" }}>
            <iframe
              title={`Give to ${site.name} through ${site.giving.partner}`}
              src={site.giving.formUrl}
              style={{ width: "100%", height: "clamp(520px,56vw,700px)", border: 0, display: "block" }}
              loading="lazy"
            />
          </div>
          <p className="sm">
            The form above is served by Tithe.ly on {site.giving.partner}&rsquo;s account. We never
            build a payment form and never touch card data.
          </p>
        </div>
      </div>
    </section>
  );
}
