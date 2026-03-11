import Link from "next/link";

export default function SiteShell({ children }) {
  return (
    <>
      <header className="nav">
        <div className="nav-inner">
          <Link href="/" className="brand">
            <span className="brand-accent">Volatility</span>Forge
          </Link>

          <nav className="nav-links">
            <Link href="/how-it-works">How it works</Link>
            <Link href="/pricing">Pricing</Link>
            <Link href="/faq">FAQ</Link>
            <Link href="/pay">Pay</Link>
          </nav>
        </div>
      </header>

      <main>{children}</main>

      <footer className="footer">
        <div className="container footer-grid">
          <div>
            © {new Date().getFullYear()} VolatilityForge
            <div style={{ marginTop: 10 }}>
              Disclaimer: Not financial advice. Trading is risky. You remain fully responsible for your own decisions.
            </div>
          </div>

          <div className="footer-links">
            <Link href="/how-it-works">How it works</Link>
            <Link href="/pricing">Pricing</Link>
            <Link href="/faq">FAQ</Link>
            <Link href="/pay">Pay</Link>
          </div>
        </div>
      </footer>
    </>
  );
}