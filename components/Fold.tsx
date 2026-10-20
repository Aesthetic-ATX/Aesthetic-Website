"use client";

import { useState, type ReactNode } from "react";

/**
 * Phones only (mobile-first pass, 2026-10-19): the children stay folded behind "Read more" so a long
 * page stays short. On wider screens the fold is always open and the button never shows (CSS).
 */
export function Fold({ children, more = "Read more" }: { children: ReactNode; more?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`fold${open ? " open" : ""}`}>
      <div className="fold-more">{children}</div>
      <button type="button" className="fold-btn" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
        {open ? "Show less" : more}
      </button>
    </div>
  );
}
