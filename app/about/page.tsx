import { Frame, Needed } from "@/components/Frame";
import { site } from "@/data/site";
import { metaFor } from "@/data/meta";

export const metadata = metaFor("about");

export default function About() {
  return (
    <section className="sec">
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
            <p className="h3" style={{ fontSize: "clamp(22px,2.4vw,28px)" }}>{site.mission}</p>
          </div>
          <div className="card-green">
            <span className="lbl">OUR VISION</span><hr className="rule" style={{ width: 44 }} />
            <p className="h3" style={{ fontSize: "clamp(22px,2.4vw,28px)" }}>{site.vision}</p>
          </div>
        </div>

        <hr className="rule" />

        <div className="split s-even">
          <div className="col" style={{ gap: 16 }}>
            <span className="lbl">WHAT TO EXPECT</span>
            <h2 className="h2" style={{ fontSize: "clamp(28px,3.4vw,38px)", maxWidth: "18ch" }}>
              Grab a coffee, settle in, engage at your own pace.
            </h2>
          </div>
          <div className="col" style={{ gap: 16 }}>
            <p className="bd">
              You will find an environment that feels warm and welcoming. Original artwork through
              the space, music led by musicians and DJs, and people who genuinely care about making
              somewhere others feel comfortable and connected.
            </p>
            <p className="bd">
              Messages are centered around real life and the Bible, speaking into identity,
              relationships, and everyday challenges.
            </p>
          </div>
        </div>

        <hr className="rule" />

        {/* Bio layout modelled on Axiom: two photos, then the story. */}
        <div className="split s-bio">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <Frame waitingFor="PHOTO 1 OF 2" note="John Lee, headshot. Portrait crop 3:4." ratio="3/4" />
            <Frame waitingFor="PHOTO 2 OF 2" note="The Lee family, outdoors. Same crop, shot the same day." ratio="3/4" />
          </div>
          <div className="col" style={{ gap: 18 }}>
            <span className="lbl">MEET OUR PASTOR</span>
            <h2 className="h2" style={{ fontSize: "clamp(32px,4vw,44px)" }}>John Lee</h2>
            <hr className="rule" style={{ width: 180 }} />
            <p className="bd">
              John Lee&rsquo;s life has been shaped by a singular vision: to behold the beauty of God
              and help others do the same. It is rooted in Psalm 27:4, &ldquo;to gaze upon the beauty
              of the Lord.&rdquo;
            </p>
            <p className="bd">
              Originally from Baton Rouge, Louisiana, his faith began with a defining moment in his
              freshman dorm room at LSU, where he first surrendered his life to Jesus. That set him on
              a path from his hometown to studying Economics at NYU&rsquo;s Stern School of Business,
              to working in New York, back home to Louisiana, and eventually to Los Angeles, where he
              earned his Master of Divinity from Fuller Theological Seminary.
            </p>
            <p className="bd">
              Ordained in 2019, John has served in a range of ministry roles, including Guest Services
              and as a Grow Pastor leading Groups ministry at Gateway Church South Austin.
            </p>
            <p className="bd">
              With a deep love for art and culture, he believes the Church should be a place where
              people can come as they are and experience a God who is near and beautiful.
            </p>
            <p className="bd">
              He lives in Austin with his wife, Tori, and their two dogs, Avery and Gracie.
            </p>
            <p className="bd" style={{ fontWeight: 700 }}>John Lee<br />Lead pastor</p>
          </div>
        </div>
      </div>
    </section>
  );
}
