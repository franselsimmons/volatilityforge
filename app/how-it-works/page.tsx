import GlowCard from "@/components/GlowCard";
import { HOW_IT_WORKS } from "@/lib/sitecopy";

export default function HowItWorks() {
  return (
    <div className="max-w-6xl mx-auto px-5 py-14">
      <h1 className="text-3xl font-semibold">How it works</h1>
      <p className="mt-3 text-[rgb(var(--muted))] max-w-2xl">
        We explain the workflow without exposing proprietary details. The engine stays private — the delivery stays clear.
      </p>

      <div className="mt-10 grid md:grid-cols-2 gap-6">
        {HOW_IT_WORKS.map(s => (
          <GlowCard key={s.title}>
            <div className="text-lg font-semibold">{s.title}</div>
            <div className="mt-2 text-[rgb(var(--muted))]">{s.text}</div>
          </GlowCard>
        ))}
      </div>

      <div className="mt-10 text-sm text-[rgb(var(--muted))]">
        Signals are delivered via Discord roles to private channels. No public pages. No leaking.
      </div>
    </div>
  );
}