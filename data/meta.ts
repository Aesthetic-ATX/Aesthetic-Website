import type { Metadata } from "next";
import { site } from "./site";

/** Titles and descriptions come from the approved SEO keyword map. Do not rewrite. */
type Route = "home" | "about" | "bibleStudy" | "give" | "visit";

const copy: Record<Route, { title: string; description: string; path: string }> = {
  home: {
    title: "Aesthetic Church Austin | A Modern Austin Church",
    description:
      "At Aesthetic, our mission is helping people see the beauty of God. A non-denominational, spirit-filled church in East Austin. Sundays at 11am, 2316 Morelos St.",
    path: "/",
  },
  about: {
    title: "About Aesthetic Church Austin | Heaven Meets Culture",
    description:
      "Learn about Aesthetic Church Austin, a modern, spirit-filled church helping people experience God in a real, creative, and meaningful way.",
    path: "/about",
  },
  bibleStudy: {
    title: "Bible Study Groups Austin | Aesthetic Church Austin",
    description:
      "Looking for bible study groups in Austin? Three Aesthetic groups meet through the week for honest conversation, over coffee, on the trail, and on Saturday mornings.",
    path: "/bible-study",
  },
  /**
   * NOT FROM THE SEO MAP. The map defines no Plan your visit page, so this
   * title and description are mine and need the church's approval before
   * launch. Every other entry here is approved copy and must not be rewritten.
   */
  /* Written by Claude, approved by the user on 2026-09-23 (the SEO keyword map defines no /visit page). */
  visit: {
    title: "Plan Your Visit | Aesthetic Church Austin",
    description:
      "What a Sunday at Aesthetic Church looks like, in order. Doors open at 10:30 in East Austin, the service starts at 11am, and you can come exactly as you are.",
    path: "/visit",
  },
  give: {
    title: "Give | Aesthetic Church Austin",
    description:
      "Support the work of Aesthetic Church in Austin. Giving is processed securely through our partner Global Frontiers Project, and every gift is tax deductible.",
    path: "/give",
  },
};

/** app/opengraph-image.png: the wordmark on sheet (user's call 2026-09-28, the logo over the hero).
 *  Named on every page because a page's own openGraph object replaces the root file's image. */
const shareImage = { url: "/opengraph-image.png", width: 1200, height: 630, alt: "The Aesthetic wordmark in sky blue on warm white." };

export function metaFor(route: Route): Metadata {
  const { title, description, path } = copy[route];
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: `${site.origin}${path}`, type: "website", siteName: site.name, images: [shareImage] },
    twitter: { card: "summary_large_image", images: [shareImage] },
  };
}
