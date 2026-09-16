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
  photo: { src?: string; alt: string; waitingFor: string };
};

export const groups: Group[] = [
  {
    name: "Mid-week Bible Study",
    when: "Wednesdays at 6:30pm",
    day: "WED", time: "6:30pm", ink: "green", weekday: 2,
    where: ["Central Market", "4001 N Lamar"],
    contact: { name: "John Lee", phone: "225-252-1726", tel: "+12252521726" },
    photo: { alt: "The mid-week bible study around a table at Central Market.", waitingFor: "Group around the table, Central Market." },
  },
  {
    name: "“Called to Carry” Hiking Group",
    when: "Sundays at 2:15pm",
    day: "SUN", time: "2:15pm", ink: "sky", weekday: 6,
    where: ["A different trail each week", "Around Austin"],
    contact: { name: "David Humphrey", phone: "713-969-9917", tel: "+17139699917" },
    photo: { alt: "The Called to Carry hiking group on a trail outside Austin.", waitingFor: "Group on the trail, wide." },
  },
  {
    name: "Saturday Devotional Group",
    when: "Saturdays at 10am",
    day: "SAT", time: "10am", ink: "citron", weekday: 5,
    where: ["Radio Coffee", "4204 Menchaca Rd"],
    contact: { name: "Andrew Blanton", phone: "972-679-5914", tel: "+19726795914" },
    photo: { alt: "The Saturday devotional group at Radio Coffee.", waitingFor: "Saturday group, Radio Coffee." },
  },
];
