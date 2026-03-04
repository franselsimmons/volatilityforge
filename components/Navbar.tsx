import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur border-b border-[rgb(var(--stroke))] bg-black/30">
      <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between gap-6">
        <Link href="/" className="font-semibold tracking-wide shrink-0">
          <span className="text-[rgb(var(--brand))]">Volatility</span>Forge
        </Link>

        {/* Right-aligned, single-line nav */}
        <nav className="flex items-center justify-end gap-6 text-sm text-[rgb(var(--muted))]">
          <Link className="hover:text-white whitespace-nowrap" href="/how-it-works">
            How it works
          </Link>
          <Link className="hover:text-white whitespace-nowrap" href="/pricing">
            Pricing
          </Link>
          <Link className="hover:text-white whitespace-nowrap" href="/faq">
            FAQ
          </Link>
          <Link className="hover:text-white whitespace-nowrap" href="/legal/terms">
            Terms
          </Link>
        </nav>
      </div>
    </header>
  );
}