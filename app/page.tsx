import Link from "next/link";
import { Frame } from "@/components/Frame";
import { site } from "@/data/site";
import { posts } from "@/data/instagram";

export default function Home() {
  return (
    <>
      {/* Hero: details left, image right. Service time is the headline. */}
      <section className="sec" id="visit">
        <div className="wrap split s-hero">
          <div className="col">
            <span className="lbl">NON-DENOMINATIONAL &middot; EAST AUSTIN</span>
            <h1 className="h1">{site.service.day}<br />at {site.service.time}</h1>
            <hr className="rule" style={{ width: 180 }} />
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <p className="bl" style={{ fontWeight: 700 }}>
                {site.address.street}, {site.address.city} {site.address.region} {site.address.postalCode}
              </p>
              <a className="bl" href={site.mapsUrl}>Get directions</a>
            </div>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <a href={site.mapsUrl} className="btn btn-v">Plan your visit</a>
              <Link href="/about" className="btn btn-o">What to expect</Link>
            </div>
            <p className="bd" style={{ maxWidth: "46ch" }}>
              {site.mission} Whether you have followed Jesus for years or are working out what you
              think, there is room for you on Sunday.
            </p>
          </div>
          <Frame
            waitingFor="PHOTO PLACEHOLDER"
            note="Sunday gathering at Morelos St, wide, people visible. Vertical crop 4:5."
            minHeight="clamp(280px,42vw,560px)"
          />
        </div>
      </section>

      {/* About preview. One sky field per page. */}
      <section className="sec f-sky">
        <div className="wrap split s-photo" style={{ alignItems: "center" }}>
          <Frame
            waitingFor="PHOTO PLACEHOLDER"
            note="Room mid-worship, or the crowd outside afterwards. Square crop."
            minHeight="clamp(260px,34vw,470px)"
            style={{ background: "var(--sheet)" }}
          />
          <div className="col">
            <span className="lbl">ABOUT AESTHETIC</span>
            <h2 className="h2" style={{ maxWidth: "17ch" }}>{site.mission}</h2>
            <p className="bl">
              We believe God is not distant, boring, or disconnected from everyday life. He is
              creative, present, and actively involved in people&rsquo;s stories.
            </p>
            <p className="bl">
              Faith is not meant to feel forced or unreachable. We make room for people to explore
              it, grow at their own pace, and take a genuine next step.
            </p>
            <hr className="rule" style={{ width: 180 }} />
            <Link className="bl" href="/about" style={{ fontWeight: 700 }}>
              Learn more about Aesthetic
            </Link>
          </div>
        </div>
      </section>

      {/* Tagline block, then the grid. One merged section, one citron block. */}
      <section className="sec">
        <div className="wrap">
          <div className="tagline-block">
            <span className="lbl">THE ONLY THING WE ASK</span>
            <p className="sp quote">{site.tagline}</p>
          </div>

          <div className="ig-head">
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <span className="lbl">ON INSTAGRAM</span>
              <h2 className="h2" style={{ maxWidth: "16ch" }}>Hear the stories, see the room.</h2>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14, alignItems: "flex-start" }}>
              <a href={site.instagram.url} className="lbl" style={{ letterSpacing: ".22em" }}>
                {site.instagram.handle}
              </a>
              <a href={site.instagram.url} className="btn btn-v">Follow on Instagram</a>
            </div>
          </div>

          <div className="grid6">
            {posts.map((p, i) => (
              <div className="ig-t" key={i}><span>{String(i + 1).padStart(2, "0")}</span></div>
            ))}
          </div>
          <p className="sm" style={{ marginTop: 22, maxWidth: "70ch" }}>
            Six posts, chosen rather than fetched. Hand updated, no external script, and you decide
            which six a first time visitor sees.
          </p>
        </div>
      </section>
    </>
  );
}
