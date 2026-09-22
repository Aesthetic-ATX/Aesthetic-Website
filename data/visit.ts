/**
 * /visit, "Plan your visit". Chosen 2026-09-17 from prototypes/visit-2.html,
 * variant 2. Sequenced by what a first-time visitor notices rather than by the
 * clock: the doors time is the only hour that means anything to them, so it is
 * the only one printed.
 *
 * Sources: John's "Updated Content for the Plan your visit page" (2026-09-22),
 * the church's earlier draft (2026-09-17) and the approved copy in
 * "Aesthetic Website Copy.docx". John's file was rewritten here against the
 * brief's anti-slop rules: its em dashes are gone, its headings are sentence
 * case, and its claims are stated plainly rather than sold.
 *
 * Where the sources disagreed about the DJ, the 2026-09-17 draft won and the
 * church confirmed it: King Khary is in house and on the leadership team.
 * John's new file hedges with "sometimes", which is the same stale hedge the
 * .docx carried as "(occasionally)". FLAGGED FOR THE USER, not reinstated.
 *
 * Chapter 05 ("Short prayers, and then people stay") was cut on 2026-09-22 at
 * the user's request: the page is four chapters now.
 *
 * STILL OWED BY THE CHURCH: the parking line and the parking image, plus two
 * photographs (the room filling up, and the coffee table). Everything marked
 * `owed` renders as a visible marker rather than as invented copy.
 */

export type Chapter = {
  num: string;
  label: string;
  heading: string;
  body: string[];
  media?: Array<
    | { kind: "photo"; src: string; alt: string; caption?: { kicker: string; text: string } }
    | { kind: "needed"; waitingFor: string; note: string }
  >;
};

export const visit = {
  runhead: { left: "AESTHETIC · EAST AUSTIN", middle: "PLAN YOUR VISIT" },
  kicker: "IF YOU HAVE NEVER BEEN",
  headline: "Come early. Nothing starts until eleven.",
  deck: "Four things worth knowing before your first Sunday, in the order you would notice them.",
  opener: {
    waitingFor: "PHOTO NEEDED · SHOT 1",
    note: "Wide, from the back, the room filling up.",
    caption: { kicker: "SUNDAY.", text: "About twenty minutes before anything happens." },
  },
  promise: {
    kicker: "THE ONLY THING YOU HAVE TO DO",
    text: "Show up. No welcome desk, no visitor card, and nobody will ask you to stand.",
  },
  chapters: [
    {
      num: "01",
      label: "THE HALF\nHOUR",
      heading: "The doors open half an hour early, on purpose",
      body: [
        "Doors are at 10:30. There is coffee and something to eat, and by five to eleven the room is loud. Most people are still talking when the music starts. Nobody has to be on, though. Sitting down early, or standing near the coffee without talking to anyone yet, is a normal way to spend the half hour.",
        "Whether you grew up in church, walked away from it years ago, or have never worked out what you believe, this is an ordinary Sunday to walk into.",
      ],
      media: [
        {
          kind: "needed",
          waitingFor: "PHOTO NEEDED \u00b7 SHOT 5",
          note: "The coffee table. People standing, talking, holding cups.",
        },
      ],
    },
    {
      num: "02",
      label: "THE ROOM",
      heading: "Sunday service happens in a co-working space",
      body: [
        "We meet at Sapien Center on Morelos Street, in East Austin. Natural light, a concrete floor, and the room the rest of the week leaves behind. It takes about four seconds to work out that you are not in a sanctuary.",
        "We like it that way. A room does not have to look religious for God to be in it.",
      ],
    },
    {
      num: "03",
      label: "THE WALLS",
      heading: "The art is made by people who go here",
      body: [
        "Original work hangs through the space and it changes. We think making things is one of the ways God shows up in a person, so the work goes on the wall rather than in a folder. Sometimes an artist paints on stage while the room watches.",
      ],
      media: [
        {
          kind: "photo",
          src: "/images/instagram/ig-03.jpg",
          alt: "A woman looks at a wall of paintings at an Aesthetic art night.",
          caption: { kicker: "THE ART.", text: "Hung where you can stand in front of it." },
        },
        {
          kind: "photo",
          src: "/images/instagram/ig-02.jpg",
          alt: "An artist paints live on stage while people watch.",
          caption: { kicker: "SOMETIMES.", text: "An artist works through the service." },
        },
      ],
    },
    {
      num: "04",
      label: "THE MUSIC\nAND THE\nMESSAGE",
      heading: "A DJ on the way in, then contemporary worship and a message",
      body: [
        "King Khary plays as people arrive and again on the way out, which is the first clue about how the rest of the morning goes. He is on the leadership team here. The worship is contemporary and the team is small, close enough that you can hear the room over them. Sing, or listen, or take it in at whatever pace you are moving at. Nobody minds.",
        "John teaches out of a passage and talks about what it has to do with the ordinary parts of a life: who you are, who you are with, and the thing you are currently avoiding. You will not need to have read anything first, and there is no dress code. Wear what you have on.",
      ],
      media: [
        {
          kind: "needed",
          waitingFor: "PHOTO NEEDED \u00b7 SHOT 3",
          note: "Worship team mid-song, close and tight, so the room reads small.",
        },
      ],
    },
  ] as Chapter[],
  quote: { text: "You don’t have to clean yourself up first.", by: "JOHN LEE, LEAD PASTOR" },
  parking: {
    waitingFor: "PARKING INSTRUCTIONS · SUPPLIED",
    note: "The church's own parking image goes here.",
    caption: { kicker: "PARKING.", text: "Where to leave the car, and how to get from it to the door." },
  },
  practical: {
    kicker: "BEFORE YOU COME",
    heading: "The practical part",
    /** `owed` marks a fact the church has not given us yet. Never guessed. */
    rows: [
      { term: "WHEN", value: "Sundays at 11am, doors 10:30" },
      { term: "WHERE", value: "2316 Morelos St, Austin" },
      { term: "PARKING", value: "One line, once you have it", owed: true },
      { term: "WHAT PEOPLE WEAR", value: "Whatever you have on" },
    ],
  },
} as const;
