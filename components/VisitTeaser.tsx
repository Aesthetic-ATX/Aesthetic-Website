import Image from "next/image";
import Link from "next/link";
import { Frame } from "@/components/Frame";

/**
 * The card that replaced the Weekly on the homepage (2026-09-17). It carries
 * the one fact that makes a stranger curious and then hands off to /visit,
 * which is also where the hero's "what to expect" link should point.
 *
 * 2026-09-23: rebuilt from ~/Desktop/Reference Design Style.png. Two photo
 * plates side by side, the second dropped lower, each titled underneath.
 * The reference sets its titles over the photo on a dark fade with rounded
 * corners; here they sit on the sheet under square keylined frames, because
 * a photo never goes behind text and nothing takes an intermediate radius.
 */
const plates = [
  /* "Sapien Center" is the user's caption (Revision #2, 2026-09-23). "God in everyday places"
     replaced "A church that feels real" the same day; it is John's line from /visit's "The room" chapter. */
  {
    title: "Sapien Center",
    note: "The room at Sapien Center, 2316 Morelos St.",
    /* Source: Aesthetic Website Images/Sapien Center.png (1528x1029), supplied 2026-09-23. */
    photo: {
      src: "/images/sapien-center-v1.jpg",
      alt: "Inside Sapien Center: long wooden tables and stools on a concrete floor, copper pendant lights, and a small stage under a stair",
    },
  },
  {
    title: "God in everyday places",
    note: "Shot 1. Wide, from the back of the room as it fills up.",
    /* Source: Aesthetic Website Images/God in Everyday Places Picture.JPG (5472x3648), 2026-09-23. */
    photo: {
      src: "/images/everyday-places-v1.jpg",
      alt: "People stand during worship under string lights on a concrete floor, several in come as you are T-shirts.",
    },
  },
];

export function VisitTeaser() {
  return (
    <section className="teaser" aria-labelledby="teaser-title">
      <div className="teaser-head">
        <div className="teaser-intro">
          <span className="lbl">NEVER BEEN?</span>
          {/* The user's wording, tightened (2026-09-23). /visit's "The room" chapter describes the space in full. */}
          <h2 className="teaser-h" id="teaser-title">
            We meet on Sundays in a <span className="nobr">co-working</span> space on Morelos Street in East Austin.
          </h2>
        </div>
        <div className="teaser-body">
          {/* Cut down from John's Plan your visit draft (2026-09-23). /visit carries the long version. */}
          <p className="bd">
            Doors open at 10:30, half an hour early on purpose, so there&rsquo;s time to grab a coffee
            and settle in. There&rsquo;s no welcome desk to get through, and we won&rsquo;t ask you to
            stand up as a guest. Expect original art by people in our community, contemporary worship,
            and a Bible-based message from Pastor John.
          </p>
          <Link href="/visit" className="btn btn-o">Join us this Sunday</Link>
        </div>
      </div>
      <div className="plates">
        {plates.map((p) => (
          <figure key={p.title} className="plate">
            {p.photo ? (
              <div className="plate-img">
                <Image src={p.photo.src} alt={p.photo.alt} fill sizes="(max-width: 760px) 100vw, 50vw" fetchPriority="low" />
              </div>
            ) : (
              <Frame className="plate-photo" waitingFor="PHOTO PLACEHOLDER" note={p.note} ratio="4/3" />
            )}
            <figcaption className="plate-title">{p.title}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
