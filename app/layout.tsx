import type { Metadata } from "next";
import { preload } from "react-dom";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { site } from "@/data/site";
import { metaFor } from "@/data/meta";

export const metadata: Metadata = {
  metadataBase: new URL(site.origin),
  ...metaFor("home"),
};

const schema = {
  "@context": "https://schema.org",
  "@type": "Church",
  name: site.name,
  url: site.origin,
  email: site.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressRegion: site.address.region,
    postalCode: site.address.postalCode,
    addressCountry: site.address.country,
  },
  sameAs: [site.instagram.url],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Both faces are self-hosted and small (41KB together). Preloading them means they are
  // usually in hand before first paint, so large type never reflows from a fallback font
  // (that reflow cost /about 0.19 CLS once the mission seal sat above the fold).
  preload("/fonts/jost-var-latin.woff2", { as: "font", type: "font/woff2", crossOrigin: "anonymous" });
  preload("/fonts/spectral-italic-500-latin.woff2", { as: "font", type: "font/woff2", crossOrigin: "anonymous" });
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        <a className="skip" href="#main">Skip to content</a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
