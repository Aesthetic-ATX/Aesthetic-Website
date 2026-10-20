import type { NextConfig } from "next";

/**
 * Old Wix URLs that Google has indexed. Each one lands on the page that now
 * covers the same ground, so search traffic and old links keep working.
 */
const wixRedirects = [
  { source: "/learn-more", destination: "/about" },
  { source: "/general-9", destination: "/visit" }, // "Weekend Service"
  { source: "/events", destination: "/visit" },
  { source: "/event-details/:slug", destination: "/visit" },
  { source: "/what-s-coming-up", destination: "/" },
];

/* This site's own moved pages. /bible-study was live 2026-09-28 to 09-30 before the page
   was renamed Groups; /groups is the old Wix address too, so it now lands directly. */
const moved = [
  { source: "/bible-study", destination: "/groups" },
];

const nextConfig: NextConfig = {
  /* AVIF first (about a third smaller than WebP), WebP for older browsers. Added 2026-10-19 so the
     taller 4:5 phone hero loads fast: 80% of visitors are on phones. */
  images: { formats: ["image/avif", "image/webp"] },
  redirects() {
    return [...wixRedirects, ...moved].map((r) => ({ ...r, permanent: true }));
  },
};

export default nextConfig;
