import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur border-b border-[rgb(var(--stroke))] bg-black/30">
      <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">
        <Link href="/" className="font-semibold tracking-wide">
          <span className="text-[rgb(var(--brand))]">Volatility</span>Forge
        </Link>
        <nav className="flex gap-5 text-sm text-[rgb(var(--muted))]">
          <Link className="hover:text-white" href="/how-it-works">How it works</Link>
          <Link className="hover:text-white" href="/pricing">Pricing</Link>
          <Link className="hover:text-white" href="/faq">FAQ</Link>
          <Link className="hover:text-white" href="/legal/terms">Terms</Link>
        </nav>
      </div>
    </header>
  );
}