/**
 * Team bios under John's on /about. Source: John's drafts (sent 2026-09-25),
 * rewritten to the brief's copy rules. Facts are his; nothing added except
 * Sapien Center and doors at 10:30, both already confirmed on /visit.
 * Photos still owed: each renders as a labelled 3:4 slot until supplied.
 */
export type Member = {
  name: string;
  role: string;
  bio: string[];
  /** Picture side on desktop. Phones always show the picture first. */
  photoSide: "left" | "right";
};

export const team: Member[] = [
  {
    name: "Khary Alexander",
    role: "Creative experience lead",
    photoSide: "right",
    bio: [
      "Khary runs Sunday tech at Aesthetic Church: sound, lighting, and the visuals on screen. He supports the worship team, brings music and other creative pieces into the service, and on some Sundays and at church gatherings he is the DJ.",
      "All of it serves the reason Aesthetic exists, to help people see the beauty of God. Khary cares about closing the distance between God and the culture people live in every day.",
    ],
  },
  {
    name: "Tori Lee",
    role: "Volunteer coordinator",
    photoSide: "left",
    bio: [
      "Tori leads and looks after the volunteer team at Aesthetic Church. She coordinates the Sunday setup at Sapien Center and keeps track of the moving parts of church life, so the room is warm and ready when doors open at 10:30.",
      "If you would like to join the volunteer team, Tori is the person to talk to.",
    ],
  },
];
