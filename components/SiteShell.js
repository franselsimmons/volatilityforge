"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems, siteData } from "../lib/siteData";

export default function SiteShell({ children }) {
  const pathname = usePathname();

  return (
    <div className="site">
      <header className="topbar">
        <div className="topbarInner">
          <Link href="/" className="brand">
            <span className="brandGold">{siteData.brand.split("Forge")[0]}</span>
            <span className="brandWhite">Forge</span>
          </Link>

          <nav className="nav">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`navLink ${active ? "active" : ""}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      <main className="container">{children}</main>

      <footer className="footer">
        <div className="footerText">© 2026 {siteData.brand}</div>
        <div className="footerCopy">
          Disclaimer: Not financial advice. Trading is risky. You remain fully
          responsible for your own decisions.
        </div>
        <div className="footerNav">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="footerLink">
              {item.label}
            </Link>
          ))}
        </div>
      </footer>
    </div>
  );
}
