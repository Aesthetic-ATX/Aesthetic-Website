"use client";

import { useEffect, useRef, useState } from "react";
import type { Group } from "@/data/groups";
import { firstName, isEmail, slipKey, waNumber, type Kind } from "@/components/slip";

/* The email form, printed on the back of the poster (2026-10-20, "back of the flyer", user's pick).
   EMAIL on the slip turns the poster over; the form sits in the poster's own space, so the flyer
   doesn't grow. WhatsApp needs no form: the slip's WHATSAPP button opens the chat directly. */

const tips = { come: "First time, bringing a friend", ask: "What would you like to know?" };

type Done = { name: string; kind: Kind } | null;

export function RequestSlip({ g, venue, onClose }: { g: Group; venue: string; onClose: () => void }) {
  const k = slipKey(g);
  const leader = firstName(g.contact.name);
  const [kind, setKind] = useState<Kind>("come");
  const [noting, setNoting] = useState(false);
  const [err, setErr] = useState<{ field?: "name" | "reach"; text: string } | null>(null);   // no field: the send failed, not the input
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<Done>(null);
  const form = useRef<HTMLFormElement>(null);
  const doneRef = useRef<HTMLDivElement>(null);

  const field = (n: string) => form.current?.elements.namedItem(n) as HTMLInputElement | null;

  useEffect(() => {
    field("name")?.focus({ preventScroll: true });
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    form.current?.closest(".flyer-sheet")?.scrollIntoView({ block: "nearest", behavior: reduced ? "auto" : "smooth" });
  }, []);

  useEffect(() => { if (done) doneRef.current?.focus(); }, [done]);
  useEffect(() => { if (noting) field("note")?.focus(); }, [noting]);

  const fail = (f: "name" | "reach", text: string) => { setErr({ field: f, text }); field(f)?.focus(); };

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    const v = (n: string) => (field(n)?.value ?? "").trim();
    const s = { name: v("name"), reach: v("reach"), note: v("note"), website: field("website")?.value ?? "" };
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
      setDone({ name: s.name, kind });
    } catch {
      setErr({ text: `That didn't send. Try WhatsApp, or email aesthetic.austin.tx@gmail.com.` });
    } finally {
      setBusy(false);
    }
  };

  const invalid = (f: "name" | "reach") => (err?.field === f ? true : undefined);

  return (
    <div className="rq" id={`rq-${k}`} onKeyDown={(e) => { if (e.key === "Escape") onClose(); }}>
      <div className="rq-head">
        <p className="lbl">EMAIL {leader.toUpperCase()}</p>
        <button type="button" className="rq-x" aria-label="Close the form" onClick={onClose}>
          <span aria-hidden>✕</span>
        </button>
      </div>
      {done ? (
        <div className="rq-done" ref={doneRef} tabIndex={-1}>
          <span className="rq-stamp" aria-hidden>SENT</span>
          <p className="rq-done-t">Thanks, {firstName(done.name)}. {leader} will get back to you.</p>
          {done.kind === "come" ? (
            <p className="sm">
              See you {g.when.replace(/s at /, " at ")}{g.trail ? `. ${leader} will send you the trail.` : `, ${venue}.`}
            </p>
          ) : null}
          <button type="button" className="rq-link" onClick={() => { form.current?.reset(); setNoting(false); setDone(null); }}>
            Send another
          </button>
        </div>
      ) : null}
      <form ref={form} className="rq-form" hidden={!!done} noValidate onSubmit={send} aria-label={`Email ${g.contact.name} about ${g.name}`}>
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
          <span className="lbl">PHONE OR EMAIL</span>
          <input name="reach" type="text" autoComplete="email" inputMode="email" maxLength={120} aria-invalid={invalid("reach")} />
        </label>
        {noting ? (
          <label className="rq-f">
            <span className="lbl">NOTE</span>
            <textarea name="note" rows={2} maxLength={1000} placeholder={tips[kind]} />
          </label>
        ) : (
          <button type="button" className="rq-link" onClick={() => setNoting(true)}>+ Add a note</button>
        )}
        {/* left empty by people, filled in by bots */}
        <input className="rq-hp" name="website" type="text" tabIndex={-1} autoComplete="off" aria-hidden />
        {err ? <p className="rq-err sm" role="alert">{err.text}</p> : null}
        <button type="submit" className="btn btn-v rq-send" disabled={busy}>{busy ? "SENDING" : "SEND"}</button>
      </form>
    </div>
  );
}
