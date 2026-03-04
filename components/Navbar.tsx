"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const NAV = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/pricing", label: "Pricing" },
  { href: "/faq", label: "FAQ" },
  { href: "/legal/terms", label: "Terms" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  // ✅ prevent background scroll when menu is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 vf-blurbar border-b vf-hairline">
      <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link
          href="/"
          className="font-semibold tracking-wide text-lg flex items-baseline gap-0.5"
          onClick={() => setOpen(false)}
        >
          <span className="text-[rgb(var(--brand))]">Volatility</span>
          <span>Forge</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm text-[rgb(var(--muted))]">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="vf-gold-underline hover:text-white transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile button */}
        <button
          type="button"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-xl border border-[rgb(var(--stroke))] hover:border-white/20 transition"
        >
          <span className="sr-only">Menu</span>

          {/* Animated hamburger */}
          <span className="relative w-5 h-4">
            <span
              className={[
                "absolute left-0 top-0 h-[2px] w-5 bg-white/80 rounded-full transition-all duration-200",
                open ? "translate-y-[7px] rotate-45" : "",
              ].join(" ")}
            />
            <span
              className={[
                "absolute left-0 top-[7px] h-[2px] w-5 bg-white/70 rounded-full transition-all duration-200",
                open ? "opacity-0" : "",
              ].join(" ")}
            />
            <span
              className={[
                "absolute left-0 top-[14px] h-[2px] w-5 bg-white/80 rounded-full transition-all duration-200",
                open ? "translate-y-[-7px] -rotate-45" : "",
              ].join(" ")}
            />
          </span>
        </button>
      </div>

      {/* Mobile menu (premium sheet) */}
      <div
        className={[
          "md:hidden fixed inset-0 z-[60] transition",
          open ? "pointer-events-auto" : "pointer-events-none",
        ].join(" ")}
      >
        {/* Backdrop */}
        <div
          onClick={() => setOpen(false)}
          className={[
            "absolute inset-0 bg-black/60 transition-opacity duration-200",
            open ? "opacity-100" : "opacity-0",
          ].join(" ")}
        />

        {/* Sheet */}
        <div
          className={[
            "absolute left-0 right-0 top-0 mx-3 mt-3 rounded-2xl vf-sheet vf-soft-shadow overflow-hidden",
            "transform transition-transform duration-200",
            open ? "translate-y-0" : "-translate-y-4",
          ].join(" ")}
          role="dialog"
          aria-modal="true"
        >
          <div className="px-4 py-4 flex items-center justify-between border-b vf-hairline">
            <div className="font-medium text-white/90">Menu</div>
            <button
              onClick={() => setOpen(false)}
              className="w-10 h-10 rounded-xl border border-[rgb(var(--stroke))] hover:border-white/20 transition grid place-items-center"
              aria-label="Close menu"
            >
              <span className="text-white/80 text-lg">×</span>
            </button>
          </div>

          <div className="p-2">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block px-4 py-4 rounded-xl text-[15px] text-white/90 hover:bg-white/5 transition"
              >
                <div className="flex items-center justify-between">
                  <span>{item.label}</span>
                  <span className="text-[rgb(var(--brand))] opacity-90">›</span>
                </div>
              </Link>
            ))}

            <div className="px-4 pb-4 pt-2 text-xs text-[rgb(var(--muted))]">
              Access is delivered via private Discord roles — no public dashboard.
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}