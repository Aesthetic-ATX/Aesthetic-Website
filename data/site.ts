/** Facts about the church. Single source for every page and for Phases 2 and 3. */
export const site = {
  name: "Aesthetic Church",
  shortName: "Aesthetic",
  tagline: "come as you are",
  mission: "Helping people see the beauty of God in life and culture.",
  vision: "A church where heaven meets culture.",
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
  giving: {
    partner: "GLI Church Planting",
    formUrl: "https://give.tithe.ly/?formId=249375b4-0fa6-4b56-9ee9-3b4d77039b72",
  },
  /** Set once the domain is live. Used for canonical URLs and schema. */
  origin: "https://aestheticatx.org",
} as const;
