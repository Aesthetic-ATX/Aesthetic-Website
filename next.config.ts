import type { NextConfig } from "next";

/**
 * Old Wix URLs that Google has indexed. Each one lands on the page that now
 * covers the same ground, so search traffic and old links keep working.
 */
const wixRedirects = [
  { source: "/learn-more", destination: "/about" },
  { source: "/groups", destination: "/bible-study" },
  { source: "/general-9", destination: "/visit" }, // "Weekend Service"
  { source: "/events", destination: "/visit" },
  { source: "/event-details/:slug", destination: "/visit" },
  { source: "/what-s-coming-up", destination: "/" },
];

const nextConfig: NextConfig = {
  redirects() {
    return wixRedirects.map((r) => ({ ...r, permanent: true }));
  },
};

export default nextConfig;
