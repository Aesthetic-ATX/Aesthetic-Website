"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { site } from "@/data/site";

const links = [
  { href: "/about", label: "About" },
  { href: "/bible-study", label: "Bible study" },
  { href: "/give", label: "Give" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

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

        <nav className="nav-links" data-open={open} aria-label="Main">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={pathname === l.href ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/#visit"
            className="btn btn-v"
            style={{ minHeight: 44, padding: "12px 22px" }}
            onClick={() => setOpen(false)}
          >
            Plan your visit
          </Link>
        </nav>

        <button
          className="burger"
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span /><span /><span />
        </button>
      </div>
    </header>
  );
}
