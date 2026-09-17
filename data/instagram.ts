/**
 * "The Aesthetic Weekly": the homepage's Instagram section, set as the front
 * page of a printed bulletin (chosen 2026-09-16 from prototypes/instagram-2.html,
 * option C). Posts are chosen, not fetched: Instagram retired the Basic Display
 * API, and a hand-picked page loads instantly and lets the church decide what a
 * first-time visitor sees. Updating the page is an edit to this file.
 *
 * DUMMY COPY: the concept is approved, the story is not. Masthead name,
 * headline, deck, captions and brief titles are placeholders until the church
 * writes the real story. The pull quote is John Lee's own value line.
 * Photos are real posts from @aesthetic_atx, carried over from the earlier build.
 */

export type WeeklyPhoto = { src: string; alt: string; width: number; height: number };

export type Brief = {
  title?: string;
  text?: string;
  photo?: WeeklyPhoto & { ratio: string; caption?: { kicker: string; text: string } };
};

export const weekly = {
  kicker: "HEAR THE STORIES, SEE THE ROOM",
  masthead: "The Aesthetic Weekly",
  lead: {
    headline: "Come as you are, and people did.",
    photo: {
      src: "/images/instagram/ig-01.jpg",
      alt: "A DJ in a Come As You Are shirt plays for the room during a Sunday gathering.",
      width: 900, height: 900, ratio: "4/3",
      caption: { kicker: "SUNDAY.", text: "The decks, the room, the shirt that says it." },
    },
    deck: "Music led by musicians and DJs, art on every wall, and a message about real life. This is what a Sunday on Morelos Street looks like.",
  },
  middle: [
    {
      photo: {
        src: "/images/instagram/ig-03.jpg",
        alt: "A woman looks at a wall of paintings at an Aesthetic art night.",
        width: 900, height: 900, ratio: "1/1",
        caption: { kicker: "THE ART.", text: "Work by artists from the church, hung for the night." },
      },
    },
    { title: "Painted live", text: "An artist works on stage while the room watches." },
    {
      photo: {
        src: "/images/instagram/ig-02.jpg",
        alt: "An artist paints live on stage while people watch.",
        width: 900, height: 900, ratio: "16/10",
      },
    },
  ] as Brief[],
  side: [
    { title: "Prayed for", text: "Hands on shoulders at the end of the night." },
    {
      photo: {
        src: "/images/instagram/ig-06.jpg",
        alt: "People pray together, one resting a hand on another's shoulder.",
        width: 900, height: 900, ratio: "4/5",
      },
    },
  ] as Brief[],
  quote: "You don’t have to clean yourself up first.",
};
