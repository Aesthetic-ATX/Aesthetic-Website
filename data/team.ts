/**
 * Team bios under John's on /about. Source: John's drafts (sent 2026-09-25),
 * rewritten to the brief's copy rules. Facts are his; nothing added except
 * Sapien Center and doors at 10:30, both already confirmed on /visit.
 * Photos supplied 2026-09-25 (~/Desktop/<Name>'s Bio Picture.JPG), trimmed to
 * 3:4 to match John's. Version the filename on every swap.
 */
export type Member = {
  name: string;
  role: string;
  bio: string[];
  photo: { src: string; alt: string; width: number; height: number };
  /** Picture side on desktop. Phones always show the picture first. */
  photoSide: "left" | "right";
};

export const team: Member[] = [
  {
    name: "Khary Alexander",
    role: "Creative Experience Lead",
    photoSide: "right",
    photo: {
      src: "/images/khary-alexander-v1.jpg",
      alt: "Khary Alexander in a black T-shirt, arms folded on a counter under warm pendant lights",
      width: 950,
      height: 1267,
    },
    bio: [
      "Khary runs Sunday tech at Aesthetic Church: sound, lighting, and the visuals on screen. He also works with the worship team, and on some Sundays and at church gatherings he is the DJ.",
      "He does it to help people see the beauty of God in the culture they already live in.",
    ],
  },
  {
    name: "Tori Lee",
    role: "Volunteer Coordinator",
    photoSide: "left",
    photo: {
      src: "/images/tori-lee-v1.jpg",
      alt: "Tori Lee crouching on the grass in a park, smiling and holding a small white dog",
      width: 1200,
      height: 1600,
    },
    bio: [
      "Tori leads and looks after the volunteer team at Aesthetic Church. She coordinates the Sunday setup at Sapien Center, so the room is warm and ready when doors open at 10:30.",
      "If you would like to join the volunteer team, Tori is the person to talk to.",
    ],
  },
];
