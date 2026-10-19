"use client";

import { useEffect, useState } from "react";
import { site } from "@/data/site";
import { austinNow } from "@/components/austin";

const hm = (t: string) => { const [h, m] = t.split(":").map(Number); return h * 60 + m; };
const OPENS = hm(site.serviceHours.opens), CLOSES = hm(site.serviceHours.closes);
const DOORS = site.service.doors.replace(/am$/i, "");   // "10:30"

/** The line under "See you Sunday.", in Austin time. Words near the day, a count before it. */
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

/**
 * The footer's send-off (2026-10-19, round 3 option B, kept inside the existing footer at the
 * user's request): "See you Sunday." across the black, with a live countdown under it. The server
 * prints the standing times; the browser swaps in the countdown and re-reads it every minute.
 * `?now=` previews another moment, as on /groups.
 */
export function SeeYouSunday() {
  const [when, setWhen] = useState(`${site.service.day.toUpperCase()} AT ${site.service.time.toUpperCase()} · DOORS ${DOORS}`);
  useEffect(() => {
    setWhen(line());
    const t = setInterval(() => setWhen(line()), 60_000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="foot-sun">
      <p className="foot-sun-line"><span className="sp foot-sun-see">See you</span> <span className="foot-sun-day">Sunday.</span></p>
      <p className="foot-sun-when">{when}</p>
    </div>
  );
}
