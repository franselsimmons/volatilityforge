import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[rgb(var(--stroke))]">
      <div className="max-w-6xl mx-auto px-5 py-10 text-sm text-[rgb(var(--muted))] flex flex-col gap-3">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>© {new Date().getFullYear()} VolatilityForge</div>
          <div className="flex gap-4">
            <Link className="hover:text-white" href="/legal/privacy">
              Privacy
            </Link>
            <Link className="hover:text-white" href="/legal/terms">
              Terms
            </Link>
          </div>
        </div>

        <div className="opacity-80">
          Disclaimer: Not financial advice. Trading is risky. You remain fully responsible for your own decisions.
        </div>
      </div>
    </footer>
  );
}