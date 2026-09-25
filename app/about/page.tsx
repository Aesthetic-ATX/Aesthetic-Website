import Image from "next/image";
import { BeliefsWall } from "@/components/BeliefsWall";
import { mission, vision, values, beliefsIntro } from "@/data/commitment";
import { metaFor } from "@/data/meta";
import { team } from "@/data/team";

export const metadata = metaFor("about");

export default function About() {
  return (
    <section className="sec page-about">
      <div className="wrap" style={{ display: "flex", flexDirection: "column", gap: "clamp(36px,5vw,56px)" }}>
        <div className="split s-even">
          <div className="col">
            <span className="lbl">ABOUT</span>
            <h1 className="h1" style={{ fontSize: "clamp(40px,5.6vw,62px)" }}>
              We think God is better than the rumors.
            </h1>
          </div>
          <div className="col" style={{ gap: 20 }}>
            <p className="bl">
              Aesthetic exists to help people see the beauty of God in a way that feels real and
              personal.
            </p>
            <p className="bd">
              We believe many of the things people are drawn to in culture, including beauty, art,
              music, connection, and wonder, are reflections of the Creator himself. Our vision is a
              church where heaven meets culture, and where people can encounter God while still
              feeling fully human, fully seen, and deeply welcomed.
            </p>
          </div>
        </div>

        <div className="grid2">
          <div className="card-green">
            <span className="lbl">OUR MISSION</span><hr className="rule" style={{ width: 44 }} />
            <p className="h3" style={{ fontSize: "clamp(22px,2.4vw,28px)" }}>{mission}</p>
          </div>
          <div className="card-green">
            <span className="lbl">OUR VISION</span><hr className="rule" style={{ width: 44 }} />
            <p className="h3" style={{ fontSize: "clamp(22px,2.4vw,28px)" }}>{vision}</p>
          </div>
        </div>

        {/* Values read like an order of service: one row each, name left, line right. */}
        <section className="values" aria-labelledby="values-title">
          <h2 className="lbl values-lbl" id="values-title">OUR VALUES</h2>
          <ol className="values-list">
            {values.map((v) => (
              <li key={v.name} className="value-row">
                <h3 className="value-name">{v.name}</h3>
                <p className="bl value-text">{v.text}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Beliefs as a wall with The Bible as the base stone; the panel reads up it. */}
        <section className="beliefs" aria-labelledby="beliefs-title">
          <h2 className="lbl" id="beliefs-title">OUR CORE BELIEFS</h2>
          <p className="bd beliefs-intro">{beliefsIntro}</p>
          <BeliefsWall />
        </section>

        <hr className="rule" />

        {/* Bio: one portrait, then the story. */}
        <div className="split s-bio">
          {/* Source: ~/Desktop/John's Bio Picture.jpeg (1169x1841), uncropped at the user's request
              (2026-09-25), so this frame is taller than the team's 3:4 portraits.
              Filename is versioned on every swap: a reused name leaves browsers on the cached copy. */}
          <div className="bio-photo">
            <Image
              src="/images/john-lee-v3.jpg"
              alt="Pastor John Lee in a white T-shirt, seated and smiling, looking off to one side"
              width={1169}
              height={1841}
              sizes="(max-width: 900px) 100vw, 42vw"
            />
          </div>
          <div className="col" style={{ gap: 18 }}>
            <span className="lbl">MEET OUR TEAM</span>
            <h2 className="h2" style={{ fontSize: "clamp(32px,4vw,44px)" }}>Pastor</h2>
            <hr className="rule" style={{ width: 180 }} />
            <p className="bd">
              John Lee&rsquo;s aim is simple: to see the beauty of God and help other people see it
              too. It comes from Psalm 27:4, &ldquo;to gaze upon the beauty of the Lord.&rdquo;
            </p>
            <p className="bd">
              John grew up in Baton Rouge, Louisiana, and surrendered his life to Jesus in his
              freshman dorm room at LSU. From there he studied economics at NYU&rsquo;s Stern School
              of Business, worked in New York, moved back home to Louisiana, and later went to Los
              Angeles, where he earned a Master of Divinity from Fuller Theological Seminary.
            </p>
            <p className="bd">
              Ordained in 2019, John has served in a range of ministry roles, including Guest Services
              and as a Grow Pastor leading Groups ministry at Gateway Church South Austin.
            </p>
            <p className="bd">
              He loves art and culture, and he believes the Church should be a place where people
              can come as they are and experience a God who is near and beautiful.
            </p>
            <p className="bd">
              He lives in Austin with his wife, Tori, and their two dogs, Avery and Gracie.
            </p>
            <p className="bd" style={{ fontWeight: 700 }}>John Lee<br />Pastor</p>
          </div>
        </div>

        {/* Team bios alternate sides on desktop; the DOM keeps the picture first
            so phones always read picture, then story. */}
        {team.map((m) => (
          <div key={m.name} style={{ display: "contents" }}>
            <hr className="rule" />
            <div className={`split s-bio${m.photoSide === "right" ? " s-bio-flip" : ""}`}>
              <div className="bio-photo">
                <Image
                  src={m.photo.src}
                  alt={m.photo.alt}
                  width={m.photo.width}
                  height={m.photo.height}
                  sizes="(max-width: 900px) 100vw, 42vw"
                />
              </div>
              <div className="col" style={{ gap: 18 }}>
                <h2 className="h2" style={{ fontSize: "clamp(32px,4vw,44px)" }}>{m.role}</h2>
                <hr className="rule" style={{ width: 180 }} />
                {m.bio.map((para) => (
                  <p key={para.slice(0, 24)} className="bd">{para}</p>
                ))}
                <p className="bd" style={{ fontWeight: 700 }}>{m.name}<br />{m.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
