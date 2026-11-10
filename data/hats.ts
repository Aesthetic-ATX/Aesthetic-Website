/**
 * The hats (2026-10-28): sold in person at the table by the entrance on Sundays, not online. Shown as a
 * teaser strip on the homepage (under the series while one runs) and in full on /visit, after chapter 04.
 * Prices and payment from the user and the Instagram post of 2026-10-28. Set `show` to false to take
 * both down; online selling is a later, separate plan.
 *
 * Photos: John's originals (1080 square, 2026-11-09), cropped to 660x628 round each hat. Version the
 * filename on every swap.
 */
export type HatPhoto = { src: string; width: number; height: number; alt: string };

export const hats = {
  show: true,
  kicker: "BY THE ENTRANCE",
  heading: "Look for this tag on Sunday.",
  text: "The hats are at the table by the entrance at 2316 Morelos St, every Sunday at 11am. Stop by on your way in or out. We’re not selling online yet.",
  prices: [
    { name: "TRUCKER HAT", price: "22.00" },
    { name: "PONYTAIL HAT", price: "26.00" },
  ],
  tax: "+ TAX",
  pay: "CASH · CARD · ZELLE · VENMO",
  teaser: { kicker: "NEW MERCH", sub: "SOLD ON SUNDAYS", cta: "PRICES & DETAILS" },
  photos: [
    { src: "/images/hat-trucker-front-v2.jpg", width: 660, height: 628, alt: "Navy trucker hat from the front, Aesthetic embroidered in light blue" },
    { src: "/images/hat-trucker-side-v2.jpg", width: 660, height: 628, alt: "The trucker hat from the side, showing its mesh back panels" },
    { src: "/images/hat-ponytail-front-v2.jpg", width: 660, height: 628, alt: "Washed blue women’s ponytail hat from the front, Aesthetic embroidered in light blue" },
    { src: "/images/hat-ponytail-back-v2.jpg", width: 660, height: 628, alt: "The back of the ponytail hat: an opening for a ponytail above an adjustable strap" },
  ] satisfies HatPhoto[],
};

/** The tag's words as one sentence, for screen readers (the tag itself is drawn). */
export const hatsCardLabel = "Price tag: Aesthetic, new hats. Trucker hat $22, women’s ponytail hat $26, plus tax. Cash, card, Zelle or Venmo.";
