"use client";

import { useEffect, useRef, useState } from "react";
import type { Group } from "@/data/groups";
import { firstName, isEmail, message, slipKey, waLink, waNumber, type Kind } from "@/components/slip";

/* The form that folds out of a flyer when MESSAGE is pressed (prototype round-1012 v2, approved
   2026-10-12: the leader is named once, on the slip). Two ways to send: WhatsApp opens the visitor's
   own app with the message written, addressed to the leader; email goes to the church inbox. */

const tips = { come: "First time, bringing a friend", ask: "What would you like to know?" };

type Done = { via: "whatsapp" | "email"; name: string; kind: Kind } | null;

export function RequestSlip({ g, venue, onClose }: { g: Group; venue: string; onClose: () => void }) {
  const k = slipKey(g);
  const leader = firstName(g.contact.name);
  const [kind, setKind] = useState<Kind>("come");
  const [err, setErr] = useState<{ field: "name" | "reach"; text: string } | null>(null);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<Done>(null);
  const box = useRef<HTMLDivElement>(null);
  const form = useRef<HTMLFormElement>(null);
  const doneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const name = form.current?.elements.namedItem("name");
    if (name instanceof HTMLInputElement) name.focus({ preventScroll: true });
    box.current?.scrollIntoView({ block: "nearest", behavior: reduced ? "auto" : "smooth" });
  }, []);

  useEffect(() => { if (done) doneRef.current?.focus(); }, [done]);

  const read = () => {
    const f = form.current!;
    const v = (n: string) => ((f.elements.namedItem(n) as HTMLInputElement | null)?.value ?? "");
    return { name: v("name").trim(), reach: v("reach").trim(), note: v("note").trim(), website: v("website") };
  };
  const fail = (field: "name" | "reach", text: string) => {
    setErr({ field, text });
    (form.current!.elements.namedItem(field) as HTMLInputElement).focus();
  };

  const viaWhatsApp = () => {
    const s = read();
    if (!s.name) return fail("name", `Add your name so ${leader} knows who is writing.`);
    setErr(null);
    window.open(waLink(waNumber(g.contact.tel)!, message(g, { kind, ...s })), "_blank", "noopener");
    setDone({ via: "whatsapp", name: s.name, kind });
  };

  const viaEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    const s = read();
    if (!s.name) return fail("name", `Add your name so ${leader} knows who is writing.`);
    if (!isEmail(s.reach) && !waNumber(s.reach)) return fail("reach", `Add a phone number or an email so ${leader} can reply.`);
    setErr(null);
    setBusy(true);
    try {
      const res = await fetch("/api/slip", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ group: k, kind, ...s }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setDone({ via: "email", name: s.name, kind });
    } catch {
      setErr({ field: "reach", text: `That didn't send. Try WhatsApp, or email aesthetic.austin.tx@gmail.com.` });
    } finally {
      setBusy(false);
    }
  };

  const invalid = (f: "name" | "reach") => (err?.field === f ? true : undefined);

  return (
    <div className="rq" id={`rq-${k}`} ref={box} onKeyDown={(e) => { if (e.key === "Escape") onClose(); }}>
      {/* the form stays mounted under the done note, so "Back to the form" keeps what was typed */}
      {done ? (
        <div className="rq-done" ref={doneRef} tabIndex={-1}>
          <span className="rq-stamp" aria-hidden>{done.via === "whatsapp" ? "WRITTEN" : "SENT"}</span>
          <p className="rq-done-t">
            {done.via === "whatsapp"
              ? `Your message to ${leader} is ready in WhatsApp. Press send there.`
              : `Thanks, ${firstName(done.name)}. ${leader} will get back to you.`}
          </p>
          {done.kind === "come" ? (
            <p className="sm">
              See you {g.when.replace(/s at /, " at ")}{g.trail ? `. ${leader} will send you the trail.` : `, ${venue}.`}
            </p>
          ) : null}
          <button type="button" className="rq-link" onClick={() => { if (done.via === "email") form.current?.reset(); setDone(null); }}>
            {done.via === "whatsapp" ? "Back to the form" : "Send another"}
          </button>
        </div>
      ) : null}
      <form ref={form} className="rq-form" hidden={!!done} noValidate onSubmit={viaEmail} aria-label={`Message ${g.contact.name} about ${g.name}`}>
        <fieldset className="rq-kind">
          <legend className="sr-only">What is this about?</legend>
          {(["come", "ask"] as const).map((v) => (
            <label key={v}>
              <input type="radio" name="kind" value={v} checked={kind === v} onChange={() => setKind(v)} />
              <span>{v === "come" ? "I'm coming" : "I have a question"}</span>
            </label>
          ))}
        </fieldset>
        <label className="rq-f">
          <span className="lbl">YOUR NAME</span>
          <input name="name" type="text" autoComplete="name" maxLength={80} aria-invalid={invalid("name")} />
        </label>
        <label className="rq-f">
          <span className="lbl">PHONE OR EMAIL <span className="rq-opt">FOR AN EMAIL REPLY</span></span>
          <input name="reach" type="text" autoComplete="email" inputMode="email" maxLength={120} aria-invalid={invalid("reach")} />
        </label>
        <label className="rq-f">
          <span className="lbl">NOTE <span className="rq-opt">OPTIONAL</span></span>
          <textarea name="note" rows={2} maxLength={1000} placeholder={tips[kind]} />
        </label>
        {/* left empty by people, filled in by bots */}
        <input className="rq-hp" name="website" type="text" tabIndex={-1} autoComplete="off" aria-hidden />
        {err ? <p className="rq-err sm" role="alert">{err.text}</p> : null}
        <div className="rq-actions">
          <button type="button" className="btn btn-v" onClick={viaWhatsApp}>SEND ON WHATSAPP</button>
          <button type="submit" className="btn btn-o" disabled={busy}>{busy ? "SENDING" : "SEND BY EMAIL"}</button>
          <button type="button" className="rq-link" onClick={onClose}>Close</button>
        </div>
      </form>
    </div>
  );
}
