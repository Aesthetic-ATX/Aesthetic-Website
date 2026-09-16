import { mission, vision } from "./commitment";

/** Facts about the church. Single source for every page and for Phases 2 and 3. */
export const site = {
  name: "Aesthetic Church",
  shortName: "Aesthetic",
  tagline: "come as you are",
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
  mapsUrl: "https://maps.google.com/?q=2316+Morelos+St+Austin+TX+78702",
  instagram: { handle: "@aesthetic_atx", url: "https://www.instagram.com/aesthetic_atx/" },
  /** Venue, YouTube and parent org: from Aesthetic_ATX.md in the earlier project. */
  venue: "Sapien Center",
  youtube: { handle: "@Aesthetic_Church", url: "https://www.youtube.com/@Aesthetic_Church" },
  parentOrg: { name: "GLI Church Planting", url: "https://www.glichurchplanting.com/" },
  giving: {
    partner: "GLI Church Planting",
    formUrl: "https://give.tithe.ly/?formId=249375b4-0fa6-4b56-9ee9-3b4d77039b72",
  },
  /** Set once the domain is live. Used for canonical URLs and schema. */
  origin: "https://aestheticatx.org",
} as const;
