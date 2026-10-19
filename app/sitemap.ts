import type { MetadataRoute } from "next";
import { site } from "@/data/site";

const paths = ["/", "/about", "/visit", "/groups", "/events", "/give"];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((path) => ({ url: `${site.origin}${path === "/" ? "" : path}` }));
}
