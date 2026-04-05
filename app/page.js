import { siteData } from '@/lib/siteData';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 text-center max-w-5xl">
        <span className="text-amber-500 font-bold tracking-[0.3em] text-xs uppercase mb-4 block">
          Alpha Delivery System
        </span>
        <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-none">
          Precision in <br /><span className="gold-text">Every Tick.</span>
        </h1>
        <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
          Tiered signal intelligence delivered via Discord. Engineered for institutional accuracy, 
          refined with human-contextual analysis.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/pricing" className="bg-white text-black px-10 py-5 rounded-full font-bold text-lg hover:scale-105 transition">
            View Tiers
          </Link>
          <Link href="/how-it-works" className="px-10 py-5 rounded-full font-bold text-lg border border-white/10 hover:bg-white/5 transition">
            Our Methodology
          </Link>
        </div>
      </section>

      {/* The USP: Human Layer */}
      <section className="py-24 px-6 w-full max-w-6xl grid md:grid-cols-2 gap-16 items-center border-y border-white/5">
        <div>
          <h2 className="text-4xl font-bold mb-6">The Human Layer</h2>
          <p className="text-slate-400 text-lg leading-relaxed mb-6">
            Algorithms find the volatility; we find the meaning. Every Prime and Apex signal is 
            vetted and enriched with a technical narrative. 
          </p>
          <div className="space-y-4">
            {['No Blind Execution', 'Institutional Order Flow', 'Live Lifecycle Tracking'].map((item) => (
              <div key={item} className="flex items-center gap-3 font-semibold text-slate-200">
                <div className="w-2 h-2 rounded-full bg-amber-500" /> {item}
              </div>
            ))}
          </div>
        </div>
        <div className="glass-card p-8 rounded-3xl border-l-4 border-l-amber-500">
          <code className="text-sm text-amber-200/70 block mb-4">// APEX_PRIORITY_SIGNAL</code>
          <p className="text-xl font-mono">"Whale accumulation detected at $62.4k. Order flow confirms sell-side exhaustion. Entering [ALPHA] position."</p>
        </div>
      </section>
    </div>
  );
}
