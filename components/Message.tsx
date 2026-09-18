import { Frame } from "@/components/Frame";
import { site } from "@/data/site";
import { message } from "@/data/message";

/**
 * This week's message, under the bulletin masthead from Screenshot #1:
 * kicker, two-line title, then the three-slot dateline. The series sets at
 * masthead size and the episode sits smaller beneath it, because the episode
 * runs to twice the characters and will not hold at the same size.
 */
export function Message() {
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
      <Frame
        className="msg-video"
        waitingFor="VIDEO PLACEHOLDER"
        note={`YouTube embed, 16:9, full width. Hand updated for now; the latest video can be pulled automatically from ${site.youtube.handle} (channel ${site.youtube.channelId}).`}
        ratio="16/9"
        style={{ width: "100%" }}
      />
    </article>
  );
}
