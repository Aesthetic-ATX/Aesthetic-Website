"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { site } from "@/data/site";
import { austinNow } from "@/components/austin";
import { usePlayOnce } from "@/components/usePlayOnce";

const hm = (t: string) => { const [h, m] = t.split(":").map(Number); return h * 60 + m; };
const OPENS = hm(site.serviceHours.opens), CLOSES = hm(site.serviceHours.closes);
const DOORS = site.service.doors.replace(/am$/i, "");   // "10:30"

/** The countdown under "See you Sunday.", in Austin time. Words near the day, a count before it. */
function line(): string {
  const n = austinNow();
  const sunday = n.wd === 6;   // austin.ts counts Monday as 0
  if (sunday && n.min >= OPENS && n.min < CLOSES) return `WE ARE IN THE ROOM RIGHT NOW · ${site.address.street.toUpperCase()}`;
  if (sunday && n.min < OPENS) return `TODAY AT ${site.service.time.toUpperCase()} · DOORS ${DOORS}`;
  if (n.wd === 5) return `TOMORROW AT ${site.service.time.toUpperCase()} · DOORS ${DOORS}`;
  const days = sunday ? 7 : 6 - n.wd;
  const next = new Date(n.today); next.setUTCDate(next.getUTCDate() + days);
  const date = next.toLocaleDateString("en-US", { timeZone: "UTC", month: "long", day: "numeric" }).toUpperCase();
  return `IN ${days} DAYS · ${date} · ${site.service.time.toUpperCase()}`;
}

/** The sign's capitals, read aloud in sentence case: "In 6 days · October 25 · 11am". */
const spoken = (s: string) =>
  s.toLowerCase().replace(/^./, (c) => c.toUpperCase())
    .replace(/\b(january|february|march|april|may|june|july|august|september|october|november|december|morelos)\b/g, (m) => m[0].toUpperCase() + m.slice(1))
    .replace(/\bst\b/g, "St");

/** One row of plastic letters. Words never break across rows; `start` numbers the letters so they press in in reading order. */
function Row({ text, start, cls }: { text: string; start: number; cls: string }) {
  let n = start;
  return (
    <p className={`lb-row ${cls}`} aria-hidden="true">
      {text.split(" ").map((word, w) => (
        <span className="lb-word" key={w}>
          {[...word].map((ch, i) => <b key={i} style={{ "--n": n++ } as CSSProperties}>{ch}</b>)}
        </span>
      ))}
    </p>
  );
}

/**
 * The footer's send-off as a felt letter board (2026-10-19, user's mix of footer round 3 A + B):
 * "SEE YOU SUNDAY." in white letters, the live countdown under it in sky. The letters press in once
 * when the board arrives. The server prints the standing times; the browser swaps in the countdown
 * and re-reads it every minute (?now= previews another moment, as on /groups).
 */
export function SeeYouSunday() {
  const board = useRef<HTMLDivElement>(null);
  const phase = usePlayOnce(board, 0.35);
  const [when, setWhen] = useState(`${site.service.day.toUpperCase()} AT ${site.service.time.toUpperCase()} · DOORS ${DOORS}`);
  useEffect(() => {
    setWhen(line());
    const t = setInterval(() => setWhen(line()), 60_000);
    return () => clearInterval(t);
  }, []);
  const TOP = "SEE YOU SUNDAY.";
  return (
    <div ref={board} className={`lb ${phase}`}>
      <p className="sr-only">See you Sunday. {spoken(when)}</p>
      <div className="lb-felt">
        <Row text={TOP} start={0} cls="lb-big" />
        <Row text={when} start={TOP.replace(/ /g, "").length} cls="lb-small" />
      </div>
    </div>
  );
}
