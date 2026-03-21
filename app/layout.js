import "./globals.css";
import SiteShell from "../components/SiteShell";

export const metadata = {
  title: "VolatilityForge",
  description: "Private Discord signal delivery for volatility traders.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
