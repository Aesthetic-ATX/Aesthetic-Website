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
 * THE DJ: the page says "some Sundays" and does not name him. The user chose
 * this on 2026-09-22, preferring John's hedge over the 2026-09-17 correction
 * that named King Khary and called him in house. Do not put the name back.
 *
 * Chapter 05 ("Short prayers, and then people stay") was cut on 2026-09-22 at
 * the user's request: the page is four chapters now.
 *
 * Every photograph and fact has now been supplied (2026-09-23). Anything
 * marked `owed` in future still renders as a visible marker rather than as
 * invented copy.
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
    /* Source: Aesthetic Website Images/Plan Your Visit (Main) Picture.jpg (2048x1365), 2026-09-23. */
    photo: {
      src: "/images/visit-main-v1.jpg",
      alt: "People lean over a long paper banner, painting the word Aesthetic in bright colors.",
    },
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
        /* Source: Aesthetic Website Images/Come Early or Don't Picture.jpg (2048x1365), 2026-09-23. */
        {
          kind: "photo",
          src: "/images/visit-come-early-v1.jpg",
          alt: "About fifteen people cheer and wave outside the open roll-up door of a corrugated metal building.",
        },
      ],
    },
    {
      num: "02",
      label: "THE ROOM",
      heading: "Our Sunday service happens in a co-working space",
      body: [
        "We do not meet in a traditional church building, and we think that is part of the beauty of it. Aesthetic meets at Sapien Center, a co-working space on Morelos Street in East Austin, with natural light, concrete floors and a creative, eclectic feel.",
        "Within a few seconds you will know you are not walking into a typical sanctuary. The room says something about us: God is present in everyday places, and church can be both meaningful and easy to walk into.",
      ],
    },
    {
      num: "03",
      label: "THE WALLS",
      heading: "The art around the room is made by local artists in our church",
      body: [
        "Creativity is part of who we are. You may see original art around the room, creative visuals, or work that came out of the gifts of people in this community, and now and then an artist paints on stage while the room watches.",
        "We believe God is beautiful, creative and alive, and that making beautiful things is one way we reflect him.",
      ],
      media: [
        {
          kind: "photo",
          src: "/images/instagram/ig-03.jpg",
          alt: "A woman looks at a wall of paintings at an Aesthetic art night.",
        },
        {
          kind: "photo",
          src: "/images/instagram/ig-02.jpg",
          alt: "An artist paints live on stage while people watch.",
        },
      ],
    },
    {
      num: "04",
      label: "THE MUSIC\nAND THE\nMESSAGE",
      heading: "Contemporary worship, a DJ, and a message from John",
      body: [
        "Every Sunday runs a little differently, but the shape holds. The worship is contemporary and the team is small, close enough that you can hear the room over them. Sing, reflect, listen, or take it in at your own pace. Nobody minds which.",
        "Some Sundays there is a DJ playing as people arrive and again on the way out. It is one of the ways Aesthetic bridges faith and the culture around it, because we do not think God is distant from music, or art, or the week you have just had.",
        "John teaches from a passage and connects it to the ordinary parts of a life: your questions, the people you live with, the thing you are currently avoiding. You will not need to know the Bible beforehand, and there is no dress code. Wear what you have on.",
      ],
      media: [
        /* Source: Aesthetic Website Images/The Music & The Message Picture.JPG (6000x4000), 2026-09-23. */
        {
          kind: "photo",
          src: "/images/visit-music-message-v1.jpg",
          alt: "A speaker on a low stage between two screens reading Aesthetic, with the room seated in rows of folding chairs.",
        },
      ],
    },
  ] as Chapter[],
  quote: { text: "You don’t have to clean yourself up first.", by: "JOHN LEE, LEAD PASTOR" },
  parking: {
    /* Source: Aesthetic Website Images/Parking Instructions Picture.PNG (1229x1280), 2026-09-23.
       Shown uncropped: the street names and parking labels are printed on it. */
    photo: {
      src: "/images/visit-parking-v1.jpg",
      width: 1229,
      height: 1280,
      alt: "Aerial map. Aesthetic's green building is on Morelos Street, just off East 7th Street. Parking is marked along both sides of Northwest Avenue, which runs north from East 7th Street to Coronado Street.",
    },
    caption: { kicker: "PARKING INSTRUCTIONS.", text: "Where to leave the car, and how to get to the entrance of Sapien Center." },
  },
  practical: {
    kicker: "BEFORE YOU COME",
    heading: "The practical part",
    /** `owed` marks a fact the church has not given us yet. Never guessed. */
    rows: [
      { term: "WHEN", value: "Sundays at 11am, doors open at 10:30" },
      /* Links to the Sapien Center pin in Google Maps, styled like "Get directions" (2026-09-23). */
      { term: "WHERE", value: "2316 Morelos St, Austin, TX 78702", href: "place" },
      /* Read off the church's parking map (2026-09-23): parking is marked on both sides of Northwest Ave. */
      { term: "PARKING", value: "Street parking on both sides of Northwest Ave" },
      /* Second line sets in Spectral italic: it is the church's tagline (user's wording, 2026-09-23). */
      { term: "WHAT PEOPLE WEAR", value: "You do not need to dress a certain way.", tagline: "Just come as you are." },
    ],
  },
} as const;
