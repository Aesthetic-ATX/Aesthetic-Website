import Image from "next/image";
import { Fragment } from "react";
import { Frame } from "@/components/Frame";
import { metaFor } from "@/data/meta";
import { site } from "@/data/site";
import { visit, type Chapter } from "@/data/visit";

export const metadata = metaFor("visit");

/** One numbered chapter: the numeral and label in the margin, the story beside it. */
function Ch({ ch }: { ch: Chapter }) {
  return (
    <section className="ch" aria-labelledby={`ch-${ch.num}`}>
      <div className="ch-num">
        <b aria-hidden>{ch.num}</b>
        <span>
          {ch.label.split("\n").map((line, i) => (
            <span key={i} style={{ display: "block" }}>{line}</span>
          ))}
        </span>
      </div>
      <div className="ch-body">
        {/* h2, not h3: the chapters sit directly under the page h1, and
            skipping a level breaks the heading order for screen readers. */}
        <h2 id={`ch-${ch.num}`}>{ch.heading}</h2>
        {ch.body.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
        {ch.media ? (
          <div className={`ch-media${ch.media.length > 1 ? " two" : ""}`}>
            {ch.media.map((m, i) =>
              m.kind === "photo" ? (
                <figure key={i}>
                  <span className="ch-photo">
                    <Image src={m.src} alt={m.alt} fill sizes="(min-width:900px) 45vw, 100vw" loading="lazy" />
                  </span>
                  {m.caption ? (
                    <figcaption><b>{m.caption.kicker}</b> {m.caption.text}</figcaption>
                  ) : null}
                </figure>
              ) : (
                <figure key={i}>
                  <Frame waitingFor={m.waitingFor} note={m.note} ratio="3/2" />
                </figure>
              ),
            )}
          </div>
        ) : null}
      </div>
    </section>
  );
}

export default function Visit() {
  return (
    <div className="sec">
      <div className="wrap">
        <article className="mag">
          <div className="runhead">
            <span>{visit.runhead.left}</span>
            <span>{visit.runhead.middle}</span>
            <span>{site.address.street.toUpperCase()}</span>
          </div>

          <header className="mag-open">
            <div className="mag-open-grid">
              <div>
                <p className="mag-kick">{visit.kicker}</p>
                <h1 className="mag-h">{visit.headline}</h1>
                <p className="mag-deck">{visit.deck}</p>
              </div>
              <figure style={{ margin: 0 }}>
                <Frame waitingFor={visit.opener.waitingFor} note={visit.opener.note} ratio="4/3" />
                <figcaption>
                  <b>{visit.opener.caption.kicker}</b> {visit.opener.caption.text}
                </figcaption>
              </figure>
            </div>
          </header>

          {/* The page's one sky field. */}
          <div className="band sky">
            <p className="band-k">{visit.promise.kicker}</p>
            <p className="band-big">{visit.promise.text}</p>
          </div>

          <div className="chapters">
            {visit.chapters.map((ch) => <Ch key={ch.num} ch={ch} />)}
          </div>

          <blockquote className="pull">
            <p className="sp">&ldquo;{visit.quote.text}&rdquo;</p>
            <cite>{visit.quote.by}</cite>
          </blockquote>

          <div className="foot-pair">
            <figure>
              <Frame waitingFor={visit.parking.waitingFor} note={visit.parking.note} ratio="16/10" />
              <figcaption>
                <b>{visit.parking.caption.kicker}</b> {visit.parking.caption.text}
              </figcaption>
            </figure>
            <aside className="dept">
              <p className="dept-k">{visit.practical.kicker}</p>
              <h2 className="dept-h">{visit.practical.heading}</h2>
              <dl>
                {/* Fragments, not wrapper elements: a wrapper would make every
                    dt a :first-of-type and drop the rules between the rows. */}
                {visit.practical.rows.map((r) => (
                  <Fragment key={r.term}>
                    <dt>{r.term}</dt>
                    {/* A fact the church still owes is marked the way DESIGN.md
                        specifies: weight and a keyline, no colour. Violet means
                        clickable and nothing else. */}
                    <dd className={"owed" in r && r.owed ? "need" : undefined}>
                      {r.value}
                    </dd>
                  </Fragment>
                ))}
              </dl>
            </aside>
          </div>

          {/* The page's one citron field. */}
          <div className="band citron">
            <p className="band-k">THIS SUNDAY</p>
            <p className="band-big">
              {site.address.street}, doors at half past ten.{" "}
              <a href={site.mapsUrl}>Get directions <span aria-hidden>&rarr;</span></a>
            </p>
          </div>
        </article>
      </div>
    </div>
  );
}
