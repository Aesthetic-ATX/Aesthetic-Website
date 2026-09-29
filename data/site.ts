import { mission, vision } from "./commitment";

/** Facts about the church. Single source for every page and for Phases 2 and 3. */
export const site = {
  name: "Aesthetic Church",
  shortName: "Aesthetic",
  tagline: "come as you are",
  /** The homepage fill-in-the-blank: who walks in, then the tagline. Chosen by the user 2026-09-28
   *  (Set 1, with "a creative" cut and "a neighbor" replaced by "a friend"). The last entry must
   *  complete the tagline. Five words land in about 3.4s, under the 5s that would need a pause. */
  taglineWords: ["a first-timer", "a skeptic", "a plus-one", "a friend", "you are"],
  /** From John Lee's "Commitment to Community"; the full set lives in data/commitment.ts. */
  mission: mission,
  vision: vision,
  service: { day: "Sundays", time: "11am", doors: "10:30am" },
  address: {
    street: "2316 Morelos St",
    city: "Austin",
    region: "TX",
    postalCode: "78702",
    country: "US",
  },
  /** The Sapien Center place pin, supplied 2026-09-23 (Google's search tracking parameters removed).
   *  Every Directions link reads this; the footer's embedded map still searches by address. */
  mapsUrl: "https://www.google.com/maps/place/2316+Morelos+St,+Austin,+TX+78702/data=!4m2!3m1!1s0x8644b5c9463fabc9:0x719188c4eae9d70d",
  /** Supplied by the church 2026-09-28. */
  email: "aesthetic.austin.tx@gmail.com",
  /** Google Maps directions from the visitor's current location to the church, with distance and
   *  travel time (the footer map and the /visit address, 2026-09-28). mapsUrl above is the place pin. */
  directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=2316+Morelos+St%2C+Austin%2C+TX+78702",
  instagram: { handle: "@aesthetic_atx", url: "https://www.instagram.com/aesthetic_atx/" },
  /** Venue, YouTube and parent org: from Aesthetic_ATX.md in the earlier project. */
  venue: "Sapien Center",
  youtube: {
    handle: "@Aesthetic_Church",
    url: "https://www.youtube.com/@Aesthetic_Church",
    channelId: "UCMowPF9BRrL-qWKVh4xdriw",
  },
  /** Replaced GLI Church Planting on 2026-09-23. The footer prints the name unlinked if `url` is ever null. */
  parentOrg: { name: "Global Frontiers Project", url: "https://www.globalfp.org" as string | null },
  giving: {
    partner: "Global Frontiers Project",
    formUrl: "https://give.tithe.ly/?formId=249375b4-0fa6-4b56-9ee9-3b4d77039b72",
  },
  /** Set once the domain is live. Used for canonical URLs and schema. */
  origin: "https://aestheticatx.org",
} as const;
