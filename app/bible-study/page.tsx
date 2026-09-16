import { Frame } from "@/components/Frame";
import { groups } from "@/data/groups";
import { metaFor } from "@/data/meta";

export const metadata = metaFor("bibleStudy");

export default function BibleStudy() {
  return (
    <section className="sec">
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

        <div className="col" style={{ gap: 16 }}>
          <span className="lbl">THIS WEEK&rsquo;S MESSAGE</span>
          <Frame
            waitingFor="VIDEO PLACEHOLDER"
            note="YouTube embed, 16:9, full width. Hand updated for now. Channel ID needed before this can pull the latest automatically."
            ratio="16/9"
            style={{ width: "100%" }}
          />
        </div>

        <div className="grid3">
          {groups.map((g, i) => (
            <div key={g.name} className={i === 0 ? "card-green" : "card-plain"}>
              <Frame waitingFor={`PHOTO ${i + 1} OF 3`} note={g.photo.waitingFor} ratio="4/3" style={{ marginBottom: 6 }} />
              <h2 className="h3" style={{ fontSize: "clamp(22px,2.2vw,26px)" }}>{g.name}</h2>
              <hr className="rule" style={{ width: 44 }} />
              <p className="bd" style={{ fontWeight: 700 }}>{g.when}</p>
              <p className="bd">{g.where.map((w, k) => <span key={k}>{w}<br /></span>)}</p>
              <p className="sm">
                Interested? Contact {g.contact.name}<br />
                <a href={`tel:${g.contact.tel}`}>{g.contact.phone}</a>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
