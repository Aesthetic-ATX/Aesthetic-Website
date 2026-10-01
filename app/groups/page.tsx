import Image from "next/image";
import { Frame } from "@/components/Frame";
import { groups } from "@/data/groups";
import { metaFor } from "@/data/meta";

export const metadata = metaFor("groups");

export default function Groups() {
  return (
    <section className="sec page-groups">
      <div className="wrap" style={{ display: "flex", flexDirection: "column", gap: "clamp(32px,4vw,44px)" }}>
        <div className="col" style={{ gap: 18 }}>
          <span className="lbl">GROUPS</span>
          <h1 className="h1" style={{ fontSize: "clamp(40px,5.6vw,62px)", maxWidth: "19ch" }}>
            Honest questions, in a room with other people.
          </h1>
          <p className="bl" style={{ maxWidth: "62ch" }}>
            Three groups meet through the week. One reads through Luke on Wednesday evenings, one
            walks a different trail every Sunday, and one meets over coffee on Saturday mornings. You do not need to have
            read anything, know anyone, or have an answer ready. Turning up is the whole requirement.
          </p>
        </div>

        {/* Each group is a printed ticket: ink stub, tear line, details, the group's poster.
            Chosen 2026-09-16 from prototypes/groups.html, option B; posters 2026-09-30. */}
        <div className="tickets">
          {[...groups].sort((a, b) => a.weekday - b.weekday).map((g) => (
            <article key={g.name} className="ticket" aria-label={`${g.name}, ${g.when}`}>
              <div className={`stub stub-${g.ink}`}>
                <p className="stub-day">{g.day}</p>
                <p className="stub-time">{g.time}</p>
              </div>
              <div className="ticket-main">
                <h2 className="ticket-name">{g.name}</h2>
                <p className="ticket-where">{g.where.map((w, k) => <span key={k}>{w}<br /></span>)}</p>
                {g.note ? <p className="sm ticket-note">{g.note}</p> : null}
                <p className="sm">
                  Interested?<br />
                  Contact {g.contact.name} at{" "}
                  <a href={`tel:${g.contact.tel}`} className="ticket-tel">{g.contact.phone}</a>
                </p>
                {g.directions ? (
                  <p className="ticket-dir">
                    <a href={g.directions} className="arrow-link">
                      Directions <span aria-hidden>&rarr;</span>
                    </a>
                  </p>
                ) : null}
              </div>
              {g.photo.src ? (
                <div className="ticket-img">
                  {/* The poster carries its own lettering, so it keeps its 2:3 shape and is never cropped */}
                  <Image
                    src={g.photo.src}
                    alt={g.photo.alt}
                    width={1320}
                    height={1983}
                    sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, 340px"
                  />
                </div>
              ) : (
                <Frame waitingFor="PHOTO PLACEHOLDER" note={g.photo.waitingFor} className="ticket-photo" />
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
