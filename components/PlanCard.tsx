import Link from "next/link";
import GlowCard from "@/components/GlowCard";
import type { Plan } from "@/lib/plans";

export default function PlanCard({ plan }: { plan: Plan }) {
  return (
    <GlowCard>
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-lg font-semibold">{plan.name}</div>
          <div className="text-sm text-[rgb(var(--muted))] mt-1">{plan.subtitle}</div>
        </div>
        {plan.featured && (
          <div className="text-xs px-2 py-1 rounded-full border border-[rgb(var(--brand))]/40 text-[rgb(var(--brand))]">
            Most Popular
          </div>
        )}
      </div>

      <div className="mt-5 flex gap-6 items-end">
        <div>
          <div className="text-2xl font-semibold">€{plan.price.EUR}</div>
          <div className="text-xs text-[rgb(var(--muted))]">per month</div>
        </div>
        <div className="opacity-70">
          <div className="text-lg font-semibold">{plan.price.USDT} USDT</div>
          <div className="text-xs text-[rgb(var(--muted))]">per month</div>
        </div>
      </div>

      <ul className="mt-5 space-y-2 text-sm text-[rgb(var(--muted))]">
        {plan.bullets.map((b) => (
          <li key={b} className="flex gap-2">
            <span className="text-[rgb(var(--brand))]">◆</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex gap-3">
        <Link
          href={`/checkout/${plan.id}?currency=EUR`}
          className="px-4 py-2 rounded-xl bg-[rgb(var(--brand))] text-black font-medium text-sm hover:opacity-90"
        >
          Pay in EUR (crypto)
        </Link>
        <Link
          href={`/checkout/${plan.id}?currency=USDT`}
          className="px-4 py-2 rounded-xl border border-[rgb(var(--stroke))] text-sm hover:border-white/30"
        >
          Pay in USDT
        </Link>
      </div>

      <div className="mt-3 text-xs text-[rgb(var(--muted))]">
        Access is delivered via Discord role-based private channels.
      </div>
    </GlowCard>
  );
}