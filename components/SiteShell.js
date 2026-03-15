import Link from "next/link";
import { SITE } from "@/lib/siteData";

export default function SiteShell({ children }) {
  return (
    <>
      <header className="siteHeader">
        <div className="brand">
          <Link href="/">{SITE.name}</Link>
        </div>

        <nav className="nav">
          {SITE.nav.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      </header>

      {children}
    </>
  );
}