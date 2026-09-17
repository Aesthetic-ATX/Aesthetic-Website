import Image from "next/image";
import { site } from "@/data/site";
import { weekly, type Brief } from "@/data/instagram";

/** One column item: a captioned photo or a short brief. */
function Item({ item }: { item: Brief }) {
  if (item.photo) {
    const p = item.photo;
    return (
      <figure className="weekly-fig">
        <a href={site.instagram.url} className="weekly-img" style={{ aspectRatio: p.ratio }}>
          {/* Far down the page: never compete with the hero for the first paint. */}
          <Image src={p.src} alt={p.alt} fill sizes="(min-width: 900px) 30vw, (min-width: 561px) 50vw, 100vw" loading="lazy" fetchPriority="low" />
        </a>
        {p.caption ? (
          <figcaption>
            <b>{p.caption.kicker}</b> {p.caption.text}
          </figcaption>
        ) : null}
      </figure>
    );
  }
  return (
    <div className="weekly-brief">
      <h4>{item.title}</h4>
      <p>{item.text}</p>
    </div>
  );
}

/** The homepage Instagram section as the front page of a printed bulletin. */
export function Weekly() {
  const { lead } = weekly;
  return (
    <article className="weekly" aria-labelledby="weekly-title">
      <header className="weekly-mast">
        <p className="lbl">{weekly.kicker}</p>
        <h2 id="weekly-title" className="weekly-name">{weekly.masthead}</h2>
      </header>
      <div className="weekly-dateline">
        <span>EAST AUSTIN</span>
        <span>
          {site.service.day.toUpperCase()} AT {site.service.time.toUpperCase()} &middot; {site.address.street.toUpperCase()}
        </span>
        <a href={site.instagram.url}>{site.instagram.handle.toUpperCase()}</a>
      </div>

      <div className="weekly-cols">
        <div>
          <h3 className="weekly-headline">{lead.headline}</h3>
          <Item item={{ photo: lead.photo }} />
          <p className="weekly-deck">{lead.deck}</p>
        </div>
        <div>
          {weekly.middle.map((item, i) => <Item key={i} item={item} />)}
        </div>
        <div>
          {weekly.side.map((item, i) => <Item key={i} item={item} />)}
          <blockquote className="weekly-quote">
            <p className="sp">&ldquo;{weekly.quote}&rdquo;</p>
          </blockquote>
          <p className="weekly-jump">
            Continued on Instagram.{" "}
            <a href={site.instagram.url}>{site.instagram.handle} &rarr;</a>
          </p>
        </div>
      </div>
    </article>
  );
}
