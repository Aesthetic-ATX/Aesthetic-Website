import Image from "next/image";
import { site } from "@/data/site";
import { message } from "@/data/message";

/** "2026-09-27" -> "SEP 27". Parsed as UTC so the build machine's zone never shifts the day. */
function short(iso: string) {
  return new Date(`${iso}T00:00:00Z`)
    .toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" })
    .toUpperCase();
}
function long(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", { month: "long", day: "numeric", timeZone: "UTC" });
}

/**
 * This week's message, under the bulletin masthead from Screenshot #1:
 * kicker, two-line title, then the three-slot dateline. Below it, a magazine
 * contents page: the series poster on the left, the lead pastor's note and
 * the five Sundays on the right, this week marked in citron.
 */
export function Message() {
  const first = message.weeks[0].date;
  return (
    <article className="sheet" aria-labelledby="message-title">
      <header className="mast">
        <p className="lbl">{message.kicker}</p>
        <h2 id="message-title" className="mast-name msg-name">
          {message.series}
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
          />
        </div>
        <div className="msg-text">
          <p className="lbl">A NOTE FROM OUR LEAD PASTOR</p>
          <div className="msg-note">
            {message.note.map((para, i) => (
              <p key={i} className={i === 0 ? "bd dropcap" : "bd"}>{para}</p>
            ))}
          </div>
          <ol className="toc" aria-label="In this series">
            {message.weeks.map((w, i) => {
              const now = i + 1 === message.current;
              const revealOn = i > 0 ? message.weeks[i - 1].date : null;
              return (
                <li key={w.date} className={now ? "now" : undefined} aria-current={now ? "true" : undefined}>
                  <span className="toc-n">{String(i + 1).padStart(2, "0")}</span>
                  {w.title ? (
                    <span className="toc-t">{w.title}</span>
                  ) : (
                    <span className="toc-t toc-hidden">
                      <span className="redact" aria-hidden />
                      <span className="toc-reveal">
                        <span className="sr-only">Topic </span>REVEALED {revealOn ? short(revealOn) : ""}
                      </span>
                    </span>
                  )}
                  <span className="toc-d">
                    <span className="sr-only">Sunday, </span>{short(w.date)}
                  </span>
                </li>
              );
            })}
          </ol>
          <div className="byline">
            <span>{message.byline}</span>
            <span>FIVE SUNDAYS FROM {long(first).toUpperCase()}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
