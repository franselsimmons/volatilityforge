// app/pricing/page.tsx

import Link from "next/link";
import { plans } from "@/lib/plans";
import { siteCopy } from "@/lib/sitecopy";

function PlanCard({
  name,
  subtitle,
  eur,
  usdt,
  bullets,
  note,
  badge,
  slug,
}: {
  name: string;
  subtitle: string;
  eur: number;
  usdt: number;
  bullets: string[];
  note: string;
  badge?: string;
  slug: string;
}) {
  return (
    <div className="rounded-[32px] border border-[#20284a] bg-[radial-gradient(circle_at_top,rgba(38,45,92,.45),rgba(10,10,16,.92))] p-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-4xl font-semibold">{name}</h2>
          <p className="mt-4 max-w-3xl text-xl leading-10 text-zinc-400">
            {subtitle}
          </p>
        </div>

        {badge ? (
          <div className="rounded-full border border-[#8b7441] px-5 py-3 text-lg text-[#d7bd70]">
            {badge}
          </div>
        ) : null}
      </div>

      <div className="mt-8 flex flex-wrap gap-14">
        <div>
          <div className="text-6xl font-semibold">€{eur}</div>
          <div className="mt-2 text-xl text-zinc-400">per month</div>
        </div>

        <div>
          <div className="text-6xl font-semibold">{usdt} USDT</div>
          <div className="mt-2 text-xl text-zinc-400">per month</div>
        </div>
      </div>

      <ul className="mt-8 space-y-4 text-xl leading-10 text-zinc-300">
        {bullets.map((item) => (
          <li key={item} className="flex gap-4">
            <span className="mt-1 text-[#d7bd70]">◆</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex flex-wrap gap-4">
        <Link
          href={`/checkout/${slug}?currency=eur`}
          className="rounded-3xl bg-[#d7bd70] px-8 py-5 text-lg font-medium text-black transition hover:opacity-90"
        >
          Pay in EUR (crypto)
        </Link>

        <Link
          href={`/checkout/${slug}?currency=usdt`}
          className="rounded-3xl border border-[#20284a] px-8 py-5 text-lg font-medium text-white transition hover:bg-white/5"
        >
          Pay in USDT
        </Link>
      </div>

      <p className="mt-8 text-xl leading-9 text-zinc-400">{note}</p>
    </div>
  );
}

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto max-w-6xl px-6 pb-10 pt-14">
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center rounded-2xl border border-[#20284a] px-5 py-3 text-sm text-zinc-300 hover:bg-white/5"
          >
            ← Back
          </Link>
        </div>

        <h1 className="text-5xl font-semibold md:text-7xl">Pricing</h1>

        <p className="mt-8 max-w-4xl text-xl leading-10 text-zinc-400 md:text-2xl">
          {siteCopy.pricingIntro}
        </p>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-6 pb-10">
        {plans.map((plan) => (
          <PlanCard key={plan.slug} {...plan} />
        ))}
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-6">
        <p className="text-xl leading-10 text-zinc-300">{siteCopy.pricingUrgency}</p>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <p className="text-lg leading-9 text-zinc-400">{siteCopy.pricingRenewal}</p>
      </section>

      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 text-zinc-400 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="text-2xl text-zinc-300">© 2026 {siteCopy.brand}</div>
            <p className="mt-4 max-w-3xl text-lg leading-9">{siteCopy.disclaimer}</p>
          </div>

          <div className="flex gap-8 text-lg">
            <Link href="/legal/privacy" className="hover:text-white">
              Privacy
            </Link>
            <Link href="/legal/terms" className="hover:text-white">
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}