import Image from "next/image";
import { Frame } from "@/components/Frame";
import { groups } from "@/data/groups";
import { metaFor } from "@/data/meta";

export const metadata = metaFor("bibleStudy");

export default function BibleStudy() {
  return (
    <section className="sec page-bible">
      <div className="wrap" style={{ display: "flex", flexDirection: "column", gap: "clamp(32px,4vw,44px)" }}>
        <div className="col" style={{ gap: 18 }}>
          <span className="lbl">GROUPS</span>
          <h1 className="h1" style={{ fontSize: "clamp(40px,5.6vw,62px)", maxWidth: "19ch" }}>
            Honest questions, in a room with other people.
          </h1>
          <p className="bl" style={{ maxWidth: "62ch" }}>
            Three groups meet through the week. One reads the Bible over coffee, one walks a
            different trail every Sunday, and one meets Saturday mornings. You do not need to have
            read anything, know anyone, or have an answer ready. Turning up is the whole requirement.
          </p>
        </div>

        {/* Each group is a printed ticket: ink stub, tear line, details, photo.
            Chosen 2026-09-16 from prototypes/groups.html, option B. */}
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
                <p className="sm">
                  Interested? Contact {g.contact.name}<br />
                  <a href={`tel:${g.contact.tel}`} className="ticket-tel">{g.contact.phone}</a>
                </p>
                <p className="ticket-fine">TURNING UP IS THE WHOLE REQUIREMENT</p>
              </div>
              {g.photo.src ? (
                <div className="ticket-img">
                  <Image
                    src={g.photo.src}
                    alt={g.photo.alt}
                    fill
                    sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, 380px"
                    style={{ objectPosition: g.photo.position }}
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
