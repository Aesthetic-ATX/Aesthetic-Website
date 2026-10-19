"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { site } from "@/data/site";
import { calendar, daysTo, phaseOf, type CalendarEvent } from "@/data/calendar";
import { austinNow } from "@/components/austin";

const day = (iso: string, o: Intl.DateTimeFormatOptions) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", { timeZone: "UTC", ...o }).toUpperCase();

/**
 * /events (2026-10-19): the next event as a feature (poster, a countdown in words and numbers, the
 * actions), anything else still to come as a list, and the finished ones under Earlier. Which is
 * which follows the Austin calendar in the browser; the server's build-day answer is the first paint,
 * so the page never flashes. `?now=2026-11-08T13:30` previews another moment, as on /groups.
 */
export function EventsBoard({ iso: buildIso, min: buildMin }: { iso: string; min: number }) {
  const [now, setNow] = useState({ iso: buildIso, min: buildMin });
  useEffect(() => {
    const read = () => { const n = austinNow(); setNow({ iso: n.iso, min: n.min }); };
    read();
    const t = setInterval(read, 60_000);
    return () => clearInterval(t);
  }, []);

  const byDate = (a: CalendarEvent, b: CalendarEvent) => a.date.localeCompare(b.date) || a.startMin - b.startMin;
  const ahead = calendar.filter((e) => phaseOf(e, now.iso, now.min) !== "over").sort(byDate);
  const earlier = calendar.filter((e) => phaseOf(e, now.iso, now.min) === "over").sort((a, b) => byDate(b, a));
  const [feat, ...more] = ahead;

  return (
    <div className="ev">
      {feat ? <Feature e={feat} iso={now.iso} min={now.min} /> : (
        <div className="ev-empty">
          <p className="bl">
            Nothing else is on the calendar right now. Sundays at 11am and the three groups carry on as usual.
          </p>
          <div className="ev-acts">
            <Link className="btn btn-v" href="/visit">Plan your visit</Link>
            <Link className="arrow-link" href="/groups">See the groups</Link>
          </div>
        </div>
      )}

      {more.length > 0 && (
        <section aria-labelledby="ev-up">
          <div className="ev-h"><h2 className="lbl" id="ev-up">COMING UP</h2></div>
          <ul className="ev-list">
            {more.map((e) => (
              <li key={e.slug}>
                <span className="ev-d">{day(e.date, { month: "short", day: "numeric" })} &middot; {day(e.date, { weekday: "short" })}</span>
                <span><strong>{e.name}</strong>, {e.hours}. {e.lead[0]}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {earlier.length > 0 && (
        <section aria-labelledby="ev-past">
          <div className="ev-h"><h2 className="lbl" id="ev-past">EARLIER</h2></div>
          <ul className="ev-list ev-past">
            {earlier.map((e) => (
              <li key={e.slug}>
                <span className="ev-d">{day(e.date, { month: "short", day: "numeric" })} &middot; {day(e.date, { weekday: "short" })}</span>
                <span><strong>{e.name}.</strong> {e.recap}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

function Feature({ e, iso, min }: { e: CalendarEvent; iso: string; min: number }) {
  const ph = phaseOf(e, iso, min), d = daysTo(e, iso);
  /* Words near the day, a number before it. No hour-by-hour countdown: the date sits right beside it. */
  const count =
    ph === "live" ? <p className="ev-count word">ON NOW</p>
    : ph === "today" ? <p className="ev-count word">TODAY</p>
    : d === 1 ? <p className="ev-count word">TOMORROW</p>
    : <p className="ev-count"><span>{d}</span><small>DAYS<br />TO GO</small></p>;

  return (
    <article className="ev-feat" aria-labelledby={`ev-${e.slug}`}>
      {e.poster && (
        <div className="ev-poster">
          <Image src={e.poster.src} alt={e.poster.alt} width={e.poster.width} height={e.poster.height}
            sizes="(max-width: 900px) min(440px, 100vw), 420px" priority />
        </div>
      )}
      <div className="ev-main">
        <p className="lbl">{ph === "live" ? "HAPPENING NOW" : "NEXT UP"}</p>
        <h2 className="ev-name" id={`ev-${e.slug}`}>{e.name}</h2>
        <p className="ev-when">
          <span>{day(e.date, { weekday: "long", month: "long", day: "numeric" })}</span>
          <span>{e.hours.toUpperCase()}</span>
          <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer">{e.place.toUpperCase()} &middot; {e.street.toUpperCase()}</a>
        </p>
        {count}
        <div className="ev-acts">
          {e.rsvp && <a className="btn btn-v" href={e.rsvp} target="_blank" rel="noopener noreferrer">RSVP</a>}
          {ph === "ahead" && e.ics && <a className={e.rsvp ? "arrow-link" : "btn btn-o"} href={e.ics} download>Add to your calendar</a>}
          <a className="arrow-link" href={site.directionsUrl} target="_blank" rel="noopener noreferrer">Get directions</a>
        </div>
      </div>

      <div className="ev-detail">
        <div className="ev-lead">
          {e.lead.map((p) => <p key={p.slice(0, 24)} className="bd">{p}</p>)}
          {e.signoff && <p className="sp ev-sign">{e.signoff}</p>}
        </div>
        {e.panel && (
          <div>
            <h3 className="lbl">THE PANEL</h3>
            <dl className="ev-panel">
              {e.panel.map((p) => (
                <div key={p.name}>
                  <dt>{p.name}</dt>
                  <dd><b>{p.role}</b>{p.what}</dd>
                </div>
              ))}
            </dl>
            {e.hosts && <p className="sm ev-hosts">{e.hosts}</p>}
            {e.ps && <p className="sm ev-ps">{e.ps}</p>}
          </div>
        )}
      </div>
    </article>
  );
}
