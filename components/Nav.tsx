"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { site } from "@/data/site";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/bible-study", label: "Bible study" },
  { href: "/give", label: "Give" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const active = links.findIndex((l) => l.href === pathname);

  return (
    <header className="nav">
      <div className="nav-in">
        {/* Brand primary logotype. WCAG 1.4.3 exempts logotypes from contrast. */}
        <Link
          className="sp wm"
          href="/"
          data-logotype="WCAG 1.4.3 exempts logotypes; sky is the brand primary"
          onClick={() => setOpen(false)}
        >
          {site.shortName}
        </Link>

        <nav className="nav-desk" aria-label="Main">
          <Capsule active={active} />
          <Link href="/visit" className="btn btn-v nav-cta">New here?</Link>
        </nav>

        <button
          className="burger"
          aria-label="Menu"
          aria-expanded={open}
          aria-controls="nav-mob"
          onClick={() => setOpen((v) => !v)}
        >
          <span /><span /><span />
        </button>
      </div>

      <nav id="nav-mob" className="nav-mob" data-open={open} aria-label="Main mobile">
        {links.map((l, i) => (
          <Link
            key={l.href}
            href={l.href}
            aria-current={i === active ? "page" : undefined}
            onClick={() => setOpen(false)}
          >
            {l.label}
          </Link>
        ))}
        <Link href="/visit" className="btn btn-v" onClick={() => setOpen(false)}>
          New here?
        </Link>
      </nav>
    </header>
  );
}

/**
 * The page links in one keylined capsule. A violet pill marks the current page
 * and slides to whichever link is hovered or focused. It is measured, not
 * calculated, because link widths depend on Jost having loaded. Until the first
 * measurement the current link paints its own pill, so the state never blinks.
 */
function Capsule({ active }: { active: number }) {
  const box = useRef<HTMLDivElement>(null);
  const items = useRef<Array<HTMLAnchorElement | null>>([]);
  const [hovered, setHovered] = useState<number | null>(null);
  const [pill, setPill] = useState({ left: 0, width: 0, ready: false });
  const shown = hovered ?? active;

  const measure = useCallback(() => {
    const el = items.current[shown];
    const c = box.current;
    if (!el || !c) return;
    const a = el.getBoundingClientRect();
    const b = c.getBoundingClientRect();
    setPill({ left: a.left - b.left, width: a.width, ready: true });
  }, [shown]);

  useLayoutEffect(measure, [measure]);

  useEffect(() => {
    document.fonts?.ready.then(measure);
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  return (
    <div
      ref={box}
      className="capsule"
      data-ready={pill.ready}
      onMouseLeave={() => setHovered(null)}
    >
      <span
        aria-hidden
        className="capsule-pill"
        style={{ left: pill.left, width: pill.width, opacity: shown >= 0 && pill.ready ? 1 : 0 }}
      />
      {links.map((l, i) => (
        <Link
          key={l.href}
          href={l.href}
          ref={(el) => { items.current[i] = el; }}
          aria-current={i === active ? "page" : undefined}
          data-shown={i === shown}
          onMouseEnter={() => setHovered(i)}
          onFocus={() => setHovered(i)}
          onBlur={() => setHovered(null)}
        >
          {l.label}
        </Link>
      ))}
    </div>
  );
}
