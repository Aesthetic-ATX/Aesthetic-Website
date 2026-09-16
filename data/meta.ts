import type { Metadata } from "next";
import { site } from "./site";

/** Titles and descriptions come from the approved SEO keyword map. Do not rewrite. */
type Route = "home" | "about" | "bibleStudy" | "give";

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
  give: {
    title: "Give | Aesthetic Church Austin",
    description:
      "Support the work of Aesthetic Church in Austin. Giving is processed securely through our partner GLI Church Planting, and every gift is tax deductible.",
    path: "/give",
  },
};

export function metaFor(route: Route): Metadata {
  const { title, description, path } = copy[route];
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: `${site.origin}${path}`, type: "website" },
  };
}
