"use client";
import Link from 'next/link';

export default function SiteShell({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto w-full">
        <Link href="/" className="text-2xl font-bold gold-gradient-text tracking-tighter">
          VolatilityForge
        </Link>
        <div className="hidden md:flex gap-8 text-sm font-medium text-slate-400">
          <Link href="/how-it-works" className="hover:text-white transition">Methodology</Link>
          <Link href="/pricing" className="hover:text-white transition">Pricing</Link>
          <Link href="/faq" className="hover:text-white transition">FAQ</Link>
        </div>
        <Link href="/pay" className="bg-slate-800 px-5 py-2 rounded-full text-sm font-bold border border-white/10 hover:bg-slate-700">
          Access Group
        </Link>
      </nav>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="py-10 px-8 text-center text-slate-600 text-xs border-t border-white/5">
        © 2026 VolatilityForge. All signals are for educational purposes. 
        Trading crypto involves significant risk.
      </footer>
    </div>
  );
}
