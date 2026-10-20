import { groups, type Group } from "@/data/groups";

/* The request slip (prototype round-1012, chosen 2026-10-12; WhatsApp added 2026-10-20). A visitor
   can send it two ways: on WhatsApp, straight from their own phone to the group's leader, or by
   email to the church inbox through /api/slip. Both build their words here, so the leader reads
   the same message either way. */

export type Kind = "come" | "ask";
export type Slip = { group: string; kind: Kind; name: string; reach: string; note: string };

export const slipKey = (g: Group) => g.day.toLowerCase();
export const groupFor = (key: string) => groups.find((g) => slipKey(g) === key);
export const firstName = (name: string) => name.trim().split(/\s+/)[0];

/** A US number as WhatsApp wants it: country code and digits only. Null if it isn't a phone number. */
export function waNumber(phone: string) {
  const d = phone.replace(/\D/g, "");
  if (d.length === 10) return "1" + d;
  if (d.length === 11 && d.startsWith("1")) return d;
  return null;
}

export const waLink = (number: string, text: string) => `https://wa.me/${number}?text=${encodeURIComponent(text)}`;

export const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim());

/** The slip's WHATSAPP button: a short opener the visitor can finish in WhatsApp, which already shows the leader their name. */
export const opener = (g: Group) =>
  `Hi ${firstName(g.contact.name)}! I saw ${g.name} (${g.when}) on the Aesthetic website.`;

/** What the visitor says to the leader. */
export function message(g: Group, s: Pick<Slip, "kind" | "name" | "note">) {
  const hi = `Hi ${firstName(g.contact.name)}, this is ${s.name.trim()}.`;
  const what = s.kind === "come"
    ? `I'm planning to come to ${g.name} (${g.when}).`
    : `I have a question about ${g.name}.`;
  const note = s.note.trim();
  return [hi, what, note].filter(Boolean).join(" ");
}
