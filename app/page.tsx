import GlowCard from "@/components/GlowCard";
import Link from "next/link";
import { BRAND, VALUE_POINTS } from "@/lib/sitecopy";

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-5 py-14">
      <div className="max-w-2xl">
        <div className="text-[rgb(var(--brand))] text-sm tracking-widest uppercase">Premium Discord Signals</div>
        <h1 className="mt-3 text-4xl md:text-5xl font-semibold leading-tight">
          {BRAND.tagline}
        </h1>
        <p className="mt-5 text-[rgb(var(--muted))] text-lg">
          VolatilityForge delivers tiered, execution-minded alerts. We show <i>how we operate</i> — not the proprietary engine.
        </p>
        <div className="mt-7 flex gap-3">
          <Link href="/pricing" className="px-5 py-3 rounded-xl bg-[rgb(var(--brand))] text-black font-medium hover:opacity-90">
            View Pricing
          </Link>
          <Link href="/how-it-works" className="px-5 py-3 rounded-xl border border-[rgb(var(--stroke))] hover:border-white/30">
            How it works
          </Link>
        </div>
      </div>

      <div className="mt-12 grid md:grid-cols-2 gap-6">
        {VALUE_POINTS.map(v => (
          <GlowCard key={v.title}>
            <div className="text-lg font-semibold">{v.title}</div>
            <div className="mt-2 text-[rgb(var(--muted))]">{v.text}</div>
          </GlowCard>
        ))}
      </div>

      <div className="mt-12 border border-[rgb(var(--stroke))] rounded-2xl p-6 bg-black/20">
        <div className="text-sm text-[rgb(var(--muted))]">
          We keep the methodology private by design. Customers pay for outcomes: cleaner alerts, tighter structure, less noise.
        </div>
      </div>
    </div>
  );
}