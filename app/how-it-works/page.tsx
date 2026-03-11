// app/how-it-works/page.tsx

import Link from "next/link";
import { siteCopy } from "@/lib/sitecopy";

export default function HowItWorksPage() {
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

        <h1 className="text-5xl font-semibold md:text-7xl">
          {siteCopy.howItWorksTitle}
        </h1>

        <p className="mt-8 max-w-4xl text-xl leading-10 text-zinc-400 md:text-2xl">
          {siteCopy.howItWorksIntro}
        </p>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-6 pb-10 md:grid-cols-2">
        {siteCopy.howItWorksCards.map((card) => (
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
        <p className="max-w-4xl text-xl leading-10 text-zinc-300">
          {siteCopy.footerNote}
        </p>
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