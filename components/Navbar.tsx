"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/pricing", label: "Pricing" },
  { href: "/faq", label: "FAQ" },
  { href: "/legal/terms", label: "Terms" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // close menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // lock body scroll when menu open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const active = useMemo(() => pathname || "/", [pathname]);

  return (
    <header className="sticky top-0 z-50">
      {/* Apple-style blur bar */}
      <div className="vf-nav">
        <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="font-semibold tracking-wide select-none">
            <span className="text-[rgb(var(--brand))]">Volatility</span>Forge
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7 text-sm text-[rgb(var(--muted))]">
            {NAV.map((it) => (
              <Link
                key={it.href}
                href={it.href}
                className={`vf-link ${active === it.href ? "vf-link-active" : ""}`}
              >
                {it.label}
              </Link>
            ))}
          </nav>

          {/* Animated hamburger */}
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            className="md:hidden vf-burger"
            onClick={() => setOpen((v) => !v)}
          >
            <span className={`vf-burger-line ${open ? "is-open" : ""}`} />
            <span className={`vf-burger-line ${open ? "is-open" : ""}`} />
          </button>
        </div>
      </div>

      {/* Premium mobile menu */}
      <div className={`vf-mobile ${open ? "open" : ""}`}>
        {/* Backdrop */}
        <div className="vf-mobile-backdrop" onClick={() => setOpen(false)} />

        {/* Panel */}
        <div className="vf-mobile-panel">
          <div className="vf-mobile-top">
            <div className="text-sm text-[rgb(var(--muted))] tracking-widest uppercase">
              Menu
            </div>
            <button
              className="vf-close"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            >
              ✕
            </button>
          </div>

          <div className="vf-mobile-links">
            {NAV.map((it, idx) => (
              <Link
                key={it.href}
                href={it.href}
                className={`vf-mobile-link ${active === it.href ? "active" : ""}`}
                style={{ transitionDelay: open ? `${80 + idx * 60}ms` : "0ms" }}
              >
                {it.label}
              </Link>
            ))}
          </div>

          <div className="vf-mobile-cta">
            <Link
              href="/pricing"
              className="vf-mobile-primary"
              onClick={() => setOpen(false)}
            >
              View Pricing
            </Link>
            <div className="vf-mobile-hint">
              Discord-first delivery. No public dashboard.
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}