import { siteData } from '@/lib/siteData';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Sectie */}
      <section className="py-24 px-6 text-center max-w-4xl">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
          Precision in <span className="gold-gradient-text">Every Tick.</span>
        </h1>
        <p className="text-xl text-slate-400 mb-10 leading-relaxed">
          Tiered signal intelligence delivered via Discord. Engineered for institutional accuracy, 
          refined with human-contextual analysis.
        </p>
        <Link href="/pricing" className="bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-opacity-90 transition">
          View Signal Tiers
        </Link>
      </section>

      {/* The Pillars */}
      <section className="grid md:grid-cols-3 gap-8 px-6 py-20 max-w-6xl w-full">
        {siteData.tiers.map((tier) => (
          <div key={tier.id} className={`p-8 rounded-2xl card-glass border-t-4 ${tier.color}`}>
            <h3 className="text-xs uppercase tracking-widest text-slate-500 mb-2">{tier.tagline}</h3>
            <h2 className="text-2xl font-bold mb-4">{tier.name}</h2>
            <p className="text-slate-400 text-sm mb-6">{tier.description}</p>
          </div>
        ))}
      </section>

      {/* Human Layer Section */}
      <section className="py-20 px-6 max-w-4xl text-center border-t border-white/10">
        <h2 className="text-3xl font-bold mb-6">Beyond the Algorithm</h2>
        <p className="text-lg text-slate-400">
          We don't just dump raw data. Every Prime and Apex alert is enriched with a unique technical 
          narrative. It’s the context you need to execute with absolute confidence.
        </p>
      </section>
    </div>
  );
}
