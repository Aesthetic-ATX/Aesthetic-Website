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
    text: "Show up. No welcome desk to navigate, and no moment where we ask you to stand.",
  },
  chapters: [
    {
      num: "01",
      label: "THE HALF\nHOUR",
      heading: "Come early, or don't",
      body: [
        "Doors open at 10:30, half an hour before the service, on purpose. Grab a coffee, sit down, meet someone, or take a breath before anything starts. Most Sundays people are still talking when the music begins. There is no pressure to be on. Standing quietly with a coffee counts as settling in.",
        "Whether you have been in church your whole life, you are coming back after a long time away, or you have never worked out what you believe, you are welcome here.",
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
        "Aesthetic meets at Sapien Center on Morelos Street, in East Austin. Natural light, concrete floors, and the gear the rest of the week leaves behind. Within a few seconds you will know this is not a typical sanctuary.",
        "That is part of why we are here. God turns up in ordinary places, and church is easier to walk into when it looks like one.",
      ],
    },
    {
      num: "03",
      label: "THE WALLS",
      heading: "The art around the room is made by people who go here",
      body: [
        "Creativity is not a side project here. Original work hangs around the room and it changes, and some Sundays an artist paints on stage while the room watches. We think God is creative, and that making something beautiful is one way a person reflects him.",
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
      heading: "Contemporary worship, a DJ, and a message from John",
      body: [
        "Every Sunday runs a little differently, but the shape holds. The worship is contemporary and the team is small, close enough that you can hear the room over them. Sing, reflect, listen, or take it in at your own pace. Nobody minds which.",
        "King Khary plays as people arrive and again on the way out. He is on the leadership team here, and he is the first clue about how the rest of the morning goes: we do not think God is distant from music, or art, or the week you have just had.",
        "John teaches from a passage and connects it to the ordinary parts of a life: your questions, the people you live with, the thing you are currently avoiding. You will not need to know the Bible beforehand, and there is no dress code. Wear what you have on.",
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
