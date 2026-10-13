import Image from "next/image";
import { site } from "@/data/site";
import { message } from "@/data/message";

/** "2026-09-27" -> "SEP 27". Parsed as UTC so the build machine's zone never shifts the day. */
function short(iso: string) {
  return new Date(`${iso}T00:00:00Z`)
    .toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" })
    .toUpperCase();
}
const COUNT = ["ONE", "TWO", "THREE", "FOUR", "FIVE", "SIX", "SEVEN", "EIGHT", "NINE", "TEN"];
function long(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", { month: "long", day: "numeric", timeZone: "UTC" });
}

/**
 * This week's message, under the bulletin masthead from Screenshot #1:
 * kicker, two-line title, then the three-slot dateline. Below it, a magazine
 * contents page: the series poster on the left, the pastor's note and
 * the series' Sundays on the right, this week marked in green.
 *
 * Once `message.wrapped` is set the same card prints as liner notes for the finished series:
 * no week is marked, each carries its one line and a WATCH link where a recording exists
 * (prototypes/round-1012, chosen 2026-10-12).
 */
export function Message() {
  const first = message.weeks[0].date;
  const last = message.weeks[message.weeks.length - 1].date;
  const wrapped = message.wrapped;
  const note = wrapped ? message.note.slice(0, wrapped.noteParagraphs) : message.note;
  return (
    <article className="sheet" aria-labelledby="message-title">
      <header className="mast">
        <p className="lbl">{wrapped ? wrapped.kicker : message.kicker}</p>
        <h2 id="message-title" className="mast-name msg-name">
          {message.series}{" "}
          <span className="msg-sub">{message.episode}</span>
        </h2>
      </header>
      <div className="dateline">
        <span>EAST AUSTIN</span>
        <span>
          {site.service.day.toUpperCase()} AT {site.service.time.toUpperCase()} &middot; {site.address.street.toUpperCase()}
        </span>
        <a href={site.instagram.url}>{site.instagram.handle.toUpperCase()}</a>
      </div>

      <div className="msg-spread">
        <div className="msg-poster">
          <Image
            src={message.poster.src}
            alt={message.poster.alt}
            width={message.poster.width}
            height={message.poster.height}
            sizes="(max-width: 820px) min(420px, 100vw), 460px"
            fetchPriority="low"   /* off-screen at load: yields bandwidth to the hero, the LCP image */
          />
        </div>
        <div className="msg-text">
          <p className="lbl">A NOTE FROM OUR PASTOR</p>
          <div className="msg-note">
            {note.map((para, i) => (
              <p key={i} className={i === 0 ? "bd dropcap" : "bd"}>{para}</p>
            ))}
          </div>
          {wrapped ? <p className="lbl ln-lbl">LINER NOTES &middot; {COUNT[message.weeks.length - 1]} SUNDAYS</p> : null}
          <ol className={wrapped ? "toc ln" : "toc"} aria-label={wrapped ? "The messages in this series" : "In this series"}>
            {message.weeks.map((w, i) => {
              const now = !wrapped && i + 1 === message.current;
              const revealOn = i > 0 ? message.weeks[i - 1].date : null;
              return (
                <li key={w.date} className={now ? "now" : undefined} aria-current={now ? "true" : undefined}>
                  <span className="toc-n">{String(i + 1).padStart(2, "0")}</span>
                  {w.title && wrapped ? (
                    <span className="toc-t">
                      <b>{w.title}</b>
                      {w.line ? <span className="ln-take">{w.line}</span> : null}
                    </span>
                  ) : w.title ? (
                    <span className="toc-t">{w.title}</span>
                  ) : (
                    <span className="toc-t toc-hidden">
                      <span className="redact" aria-hidden />
                      <span className="toc-reveal">
                        <span className="sr-only">Topic </span>REVEALED {revealOn ? short(revealOn) : ""}
                      </span>
                    </span>
                  )}
                  <span className={wrapped ? "ln-side" : undefined}>
                    <span className="toc-d">
                      <span className="sr-only">Sunday, </span>{short(w.date)}
                    </span>
                    {wrapped && w.watch ? (
                      <a className="ln-watch" href={w.watch}>
                        WATCH<span className="sr-only"> week {i + 1}, {w.title}, on YouTube</span>
                      </a>
                    ) : null}
                  </span>
                </li>
              );
            })}
          </ol>
          {wrapped ? (
            <div className="ln-next">
              <span className="ln-stamp">NEXT SERIES</span>
              <p>{wrapped.next}</p>
            </div>
          ) : null}
          <div className="byline">
            <span>{message.byline}</span>
            <span>
              {wrapped
                ? `${long(first).toUpperCase()} TO ${long(last).toUpperCase()}`
                : `${COUNT[message.weeks.length - 1]} SUNDAYS FROM ${long(first).toUpperCase()}`}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
