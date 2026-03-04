"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 backdrop-blur border-b border-[rgb(var(--stroke))] bg-black/30">
      <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="font-semibold tracking-wide">
          <span className="text-[rgb(var(--brand))]">Volatility</span>Forge
        </Link>

        {/* Desktop menu */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-[rgb(var(--muted))]">
          <Link className="hover:text-white" href="/how-it-works">
            How it works
          </Link>
          <Link className="hover:text-white" href="/pricing">
            Pricing
          </Link>
          <Link className="hover:text-white" href="/faq">
            FAQ
          </Link>
          <Link className="hover:text-white" href="/legal/terms">
            Terms
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-[rgb(var(--muted))]"
        >
          ☰
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden border-t border-[rgb(var(--stroke))] bg-black/90">
          <nav className="flex flex-col px-5 py-4 gap-4 text-sm text-[rgb(var(--muted))]">
            <Link onClick={() => setOpen(false)} href="/how-it-works">
              How it works
            </Link>
            <Link onClick={() => setOpen(false)} href="/pricing">
              Pricing
            </Link>
            <Link onClick={() => setOpen(false)} href="/faq">
              FAQ
            </Link>
            <Link onClick={() => setOpen(false)} href="/legal/terms">
              Terms
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}