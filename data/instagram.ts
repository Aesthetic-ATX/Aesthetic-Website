/**
 * Six curated posts, chosen rather than fetched.
 * Instagram retired the Basic Display API; a hand-picked grid loads instantly,
 * costs nothing, and lets the church decide what a first time visitor sees.
 * Updating the grid is an edit to this file.
 */
export type Post = { src?: string; alt: string; href?: string; waitingFor: string };

export const posts: Post[] = [
  { alt: "", waitingFor: "Post 01" },
  { alt: "", waitingFor: "Post 02" },
  { alt: "", waitingFor: "Post 03" },
  { alt: "", waitingFor: "Post 04" },
  { alt: "", waitingFor: "Post 05" },
  { alt: "", waitingFor: "Post 06" },
];
