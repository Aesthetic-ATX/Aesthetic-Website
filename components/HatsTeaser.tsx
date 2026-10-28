import Image from "next/image";
import Link from "next/link";
import { hats } from "@/data/hats";

/** The homepage pointer to the hats on /visit (2026-10-28): one tappable stone strip, no motion. */
export function HatsTeaser() {
  const photo = hats.photos[0];
  return (
    <Link href="/visit#hats" className="hats-tz">
      <Image src={photo.src} width={photo.width} height={photo.height} alt="" sizes="120px" />
      <span className="hats-tz-t">
        <span className="lbl">{hats.teaser.kicker}</span>
        <span className="hats-tz-h">Two hats. Same <span className="sp">Aesthetic</span>.</span>
        <span className="hats-tz-go">{hats.teaser.link}</span>
      </span>
    </Link>
  );
}
