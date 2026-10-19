import { EventsBoard } from "@/components/EventsBoard";
import { calendar, phaseOf } from "@/data/calendar";
import { metaFor } from "@/data/meta";
import { site } from "@/data/site";

export const metadata = metaFor("events");

/** Austin's date and minute on the server, for the first paint; the browser takes over after. */
function austinToday() {
  const p = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Chicago", year: "numeric", month: "2-digit", day: "2-digit", hour: "numeric", minute: "numeric", hourCycle: "h23",
    }).formatToParts(new Date()).map((x) => [x.type, x.value]),
  );
  return { iso: `${p.year}-${p.month}-${p.day}`, min: +p.hour * 60 + +p.minute };
}

export default function Events() {
  const now = austinToday();
  /* Event schema for whatever is still to come at build time, so search results can show the date. */
  const schema = calendar
    .filter((e) => phaseOf(e, now.iso, now.min) !== "over")
    .map((e) => ({
      "@context": "https://schema.org",
      "@type": "Event",
      name: e.name,
      startDate: e.startISO,
      endDate: e.endISO,
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      description: e.lead[0],
      ...(e.poster ? { image: `${site.origin}${e.poster.src}` } : {}),
      location: {
        "@type": "Place",
        name: e.place,
        address: { "@type": "PostalAddress", streetAddress: site.address.street, addressLocality: site.address.city, addressRegion: site.address.region, postalCode: site.address.postalCode, addressCountry: "US" },
      },
      organizer: { "@type": "Organization", name: site.name, url: site.origin },
      url: `${site.origin}/events`,
    }));

  return (
    <section className="sec page-events">
      {schema.length > 0 && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      )}
      <div className="wrap" style={{ display: "flex", flexDirection: "column", gap: "clamp(32px,4vw,48px)" }}>
        <div className="col" style={{ gap: 18 }}>
          <span className="lbl">EVENTS</span>
          <h1 className="h1" style={{ fontSize: "clamp(40px,5.6vw,62px)", maxWidth: "16ch" }}>
            What&rsquo;s coming up at Aesthetic.
          </h1>
          <p className="bl" style={{ maxWidth: "58ch" }}>
            The gatherings outside the weekly rhythm. Sundays at 11am and the three groups carry on as usual.
          </p>
        </div>
        <EventsBoard iso={now.iso} min={now.min} />
      </div>
    </section>
  );
}
