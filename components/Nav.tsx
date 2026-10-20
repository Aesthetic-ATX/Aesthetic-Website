"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { site } from "@/data/site";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/groups", label: "Groups" },
  { href: "/events", label: "Events" },   // added 2026-10-19 (user: main nav)
  { href: "/give", label: "Give" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const active = links.findIndex((l) => l.href === pathname);
  const onVisit = pathname === "/visit" ? "page" : undefined;
  const header = useRef<HTMLElement>(null);
  const burger = useRef<HTMLButtonElement>(null);

  /* The phone menu closes the ways people expect (audit, 2026-10-20): Escape, a tap anywhere
     outside the bar, or scrolling the page away. Escape hands focus back to the menu button. */
  useEffect(() => {
    if (!open) return;
    const y = scrollY;
    const key = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(false); burger.current?.focus(); } };
    const tap = (e: PointerEvent) => { if (!header.current?.contains(e.target as Node)) setOpen(false); };
    const scroll = () => { if (Math.abs(scrollY - y) > 40) setOpen(false); };   // a little give for iOS rubber-banding
    addEventListener("keydown", key);
    addEventListener("pointerdown", tap);
    addEventListener("scroll", scroll, { passive: true });
    return () => {
      removeEventListener("keydown", key);
      removeEventListener("pointerdown", tap);
      removeEventListener("scroll", scroll);
    };
  }, [open]);

  return (
    <header className="nav" ref={header}>
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
          <Link href="/visit" className="btn btn-v nav-cta" aria-current={onVisit}>New here?</Link>
        </nav>

        {/* Phones and tablets: the one call to action stays in the bar beside the menu, not inside it
            (mobile-first pass, 2026-10-19: 80% of visitors are on phones). */}
        <Link href="/visit" className="btn btn-v nav-cta-mob" aria-current={onVisit} onClick={() => setOpen(false)}>New here?</Link>

        {/* the three bars fold into a cross while the menu is open */}
        <button
          ref={burger}
          className="burger"
          aria-label={open ? "Close menu" : "Menu"}
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
