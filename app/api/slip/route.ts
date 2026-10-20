import { site } from "@/data/site";
import { firstName, groupFor, isEmail, message, waLink, waNumber, type Slip } from "@/components/slip";

/* Emails a request slip to the church inbox through Resend (https://resend.com/docs/api-reference/emails/send-email).
   Needs RESEND_API_KEY in Vercel. Until the domain is verified with Resend, mail goes out from
   onboarding@resend.dev, which Resend only delivers to the address the account was made with, so the
   account belongs to the church inbox. SLIP_FROM and SLIP_TO override sender and recipient.

   The email carries two WhatsApp links so the slip can be answered there: one that passes it to the
   group's leader, and one that opens a chat with the visitor when they left a phone number. */

const LIMITS = { name: 80, reach: 120, note: 1000 };

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

export async function POST(req: Request) {
  let body: Partial<Slip> & { website?: string };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "bad-request" }, { status: 400 });
  }

  // the hidden field only a bot fills in: say yes and send nothing
  if (body.website) return Response.json({ ok: true });

  const g = groupFor(String(body.group ?? ""));
  const kind = body.kind === "ask" ? "ask" : "come";
  const name = String(body.name ?? "").trim();
  const reach = String(body.reach ?? "").trim();
  const note = String(body.note ?? "").trim();
  const phone = waNumber(reach);
  if (!g || !name || !(isEmail(reach) || phone)
    || name.length > LIMITS.name || reach.length > LIMITS.reach || note.length > LIMITS.note) {
    return Response.json({ error: "invalid" }, { status: 422 });
  }

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.error("slip: RESEND_API_KEY is not set for this deployment");
    return Response.json({ error: "not-configured" }, { status: 503 });
  }

  const leader = g.contact.name;
  const said = message(g, { kind, name, note });
  const toLeader = waLink(waNumber(g.contact.tel)!, `New request slip from the website:\n\n${said}\n\nReply to ${name}: ${reach}`);
  const toVisitor = phone ? waLink(phone, `Hi ${firstName(name)}! Thanks for your note about ${g.name}.`) : null;
  const subject = kind === "come"
    ? `${g.name}: ${name} is coming (for ${leader})`
    : `${g.name}: a question from ${name} (for ${leader})`;

  const rows: Array<[string, string]> = [
    ["Group", `${g.name}, ${g.when}`],
    ["Leader", leader],
    ["About", kind === "come" ? "I'm coming" : "I have a question"],
    ["Name", name],
    ["Phone or email", reach],
    ["Note", note || "(none)"],
  ];
  const text = [
    ...rows.map(([k, v]) => `${k}: ${v}`),
    "",
    `Pass it to ${firstName(leader)} on WhatsApp: ${toLeader}`,
    toVisitor ? `Reply to ${firstName(name)} on WhatsApp: ${toVisitor}` : `Reply to ${firstName(name)} by email: ${reach}`,
  ].join("\n");
  const link = (href: string, label: string) =>
    `<a href="${esc(href)}" style="display:inline-block;margin:0 8px 8px 0;padding:10px 16px;background:#3E08E0;color:#fff;font-weight:700;text-decoration:none">${esc(label)}</a>`;
  const html = `<div style="font-family:Helvetica,Arial,sans-serif;font-size:15px;line-height:1.5;color:#000">
<p style="margin:0 0 16px;font-size:12px;font-weight:700;letter-spacing:.12em">REQUEST SLIP FROM AESTHETICATX.ORG</p>
<table style="border-collapse:collapse;margin:0 0 20px">${rows
    .map(([k, v]) => `<tr><td style="padding:4px 16px 4px 0;font-weight:700;vertical-align:top">${esc(k)}</td><td style="padding:4px 0;white-space:pre-wrap">${esc(v)}</td></tr>`)
    .join("")}</table>
<p style="margin:0">${link(toLeader, `Pass it to ${firstName(leader)} on WhatsApp`)}${toVisitor ? link(toVisitor, `Reply to ${firstName(name)} on WhatsApp`) : ""}</p>
</div>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.SLIP_FROM ?? "Aesthetic website <onboarding@resend.dev>",
      to: [process.env.SLIP_TO ?? site.email],
      ...(isEmail(reach) ? { reply_to: reach } : {}),
      subject,
      text,
      html,
    }),
  });
  if (!res.ok) {
    console.error("slip: resend", res.status, await res.text());
    return Response.json({ error: "send-failed" }, { status: 502 });
  }
  return Response.json({ ok: true });
}
