/** The three groups, exactly as the church publishes them. */
export type Group = {
  name: string;
  when: string;
  /** Ticket stub: short day, time, and which ink prints it. */
  day: "WED" | "SAT" | "SUN";
  time: string;
  ink: "green" | "citron" | "sky";
  /** 0 = Monday. The page lists groups in week order. */
  weekday: number;
  where: string[];
  contact: { name: string; phone: string; tel: string };
  /** Photo slot. Fill `src` when the real image arrives. */
  photo: { src?: string; alt: string; waitingFor: string; /** object-position when cropped */ position?: string };
};

export const groups: Group[] = [
  {
    name: "Mid-week Bible Study",
    when: "Wednesdays at 6:30pm",
    day: "WED", time: "6:30pm", ink: "green", weekday: 2,
    where: ["Central Market", "4001 N Lamar"],
    contact: { name: "John Lee", phone: "225-252-1726", tel: "+12252521726" },
    /* Source: Aesthetic Website Images/Bible Study Group Picture.JPEG, supplied 2026-09-23. */
    photo: {
      src: "/images/group-bible-study-v1.jpg",
      alt: "About a dozen people around a long wooden table with open Bibles, smiling toward the camera.",
      waitingFor: "Group around the table, Central Market.",
    },
  },
  {
    name: "“Called to Carry” Hiking Group",
    when: "Sundays at 2:15pm",
    day: "SUN", time: "2:15pm", ink: "sky", weekday: 6,
    where: ["A different trail each week", "Around Austin"],
    contact: { name: "David Humphrey", phone: "713-969-9917", tel: "+17139699917" },
    /* Source: Aesthetic Website Images/Hiking Group Picture.JPG, supplied 2026-09-23. */
    photo: {
      src: "/images/group-hiking-v1.jpg",
      alt: "The Called to Carry hiking group resting on rocks in the shade of the trees beside a trail.",
      waitingFor: "Group on the trail, wide.",
    },
  },
  {
    name: "Saturday Devotional Group",
    when: "Saturdays at 10am",
    day: "SAT", time: "10am", ink: "citron", weekday: 5,
    where: ["Radio Coffee", "4204 Menchaca Rd"],
    contact: { name: "Andrew Blanton", phone: "972-679-5914", tel: "+19726795914" },
    /* Source: Aesthetic Website Images/Saturday Devotional Group Picture.png, supplied 2026-09-23.
       It shows the Radio Coffee sign, not the group; position keeps the sign in frame when cropped. */
    photo: {
      src: "/images/group-saturday-v1.jpg",
      alt: "The red Radio Coffee and Beer sign against a blue sky, where the Saturday devotional group meets.",
      waitingFor: "Saturday group, Radio Coffee.",
      position: "50% 48%",
    },
  },
];
