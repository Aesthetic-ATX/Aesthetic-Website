/**
 * Mission, vision, values and core beliefs from "Commitment to Community",
 * drafted by Pastor John Lee (Commitment to Community.pdf, page 1).
 *
 * Wording is John's. The only edits, approved 2026-09-16 because the brief bans
 * em dashes in site copy:
 * - Vision: "sees God—so He's known" became "sees God, so He's known"
 * - God: "Holy Spirit—eternally existing" became "Holy Spirit, eternally existing"
 * - Salvation: "Jesus alone—not earned" became "Jesus alone, not earned"
 * - Name/description dashes in the lists are now separate fields
 * - "fully yourself.." lost its doubled full stop
 */

export const mission = "We exist to help people see and enjoy the beauty of God.";

export const vision =
  "To change the way society sees God, so He’s known as beautiful, dynamic, and present in the modern world.";

export const values = [
  { name: "The Gospel", text: "Jesus at the center of everything." },
  {
    name: "Come as you are",
    text: "You don’t have to clean yourself up first. Our community is a safe space to explore God, ask questions, and be fully yourself.",
  },
  {
    name: "Creativity and beauty",
    text: "We embrace art, innovation, and creativity as reflections of God’s beauty.",
  },
  { name: "Heaven meets culture", text: "Bridging the gap between God and contemporary culture." },
] as const;

export const beliefsIntro =
  "Our core beliefs are the foundation of our community. Followers of Jesus may disagree on secondary issues, but these are central to our faith and life together.";

export const beliefs = [
  { name: "The Bible", text: "God-breathed, trustworthy, and our final authority for what we believe and how we live." },
  { name: "God", text: "One God, three persons: Father, Son, and Holy Spirit, eternally existing in perfect love and unity." },
  { name: "Jesus Christ", text: "Fully God and fully human; He lived, died for our sins, rose again, and is the only way we are reconciled to God." },
  { name: "The Holy Spirit", text: "Gives new life, lives within believers, and empowers us to live, love, and serve like Jesus." },
  { name: "Humanity", text: "Made in God’s image with deep worth and dignity, yet separated from God by sin; restored only through faith in Jesus." },
  { name: "Salvation", text: "A gift of grace, received through faith in Jesus alone, not earned by our effort or performance." },
  { name: "The Church", text: "All who trust in Jesus, expressed in local communities devoted to worship, Scripture, community, and mission." },
  { name: "Spiritual Growth", text: "A lifelong, Spirit-led transformation as we walk with God and are formed into the image of Christ." },
] as const;
