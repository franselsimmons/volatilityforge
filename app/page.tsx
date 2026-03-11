// app/page.tsx

import Link from "next/link";
import { siteCopy } from "@/lib/sitecopy";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto max-w-6xl px-6 pb-12 pt-14">
        <div className="mb-6 text-sm uppercase tracking-[0.22em] text-[#d7bd70]">
          {siteCopy.heroEyebrow}
        </div>

        <h1 className="max-w-4xl text-5xl font-semibold leading-tight md:text-7xl">
          {siteCopy.heroTitle}
        </h1>

        <p className="mt-8 max-w-3xl text-xl leading-10 text-zinc-400 md:text-2xl">
          {siteCopy.heroDescription}
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/pricing"
            className="rounded-3xl bg-[#d7bd70] px-8 py-5 text-lg font-medium text-black transition hover:opacity-90"
          >
            View Pricing
          </Link>

          <Link
            href="/how-it-works"
            className="rounded-3xl border border-[#20284a] px-8 py-5 text-lg font-medium text-white transition hover:bg-white/5"
          >
            How it works
          </Link>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-6 pb-10 md:grid-cols-2">
        {siteCopy.homeCards.map((card) => (
          <div
            key={card.title}
            className="rounded-[32px] border border-[#20284a] bg-[radial-gradient(circle_at_top,rgba(38,45,92,.45),rgba(10,10,16,.92))] p-8"
          >
            <h2 className="text-3xl font-semibold">{card.title}</h2>
            <p className="mt-5 text-xl leading-10 text-zinc-400">{card.body}</p>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="rounded-[32px] border border-[#20284a] bg-[#090b12] p-8 text-xl leading-10 text-zinc-300">
          {siteCopy.methodologyNote}
        </div>
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