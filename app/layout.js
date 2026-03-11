export const metadata = {
  title: "VolatilityForge",
  description:
    "Premium Discord signals for volatility traders. Tiered signal access via private Discord channels.",
};

import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="nl">
      <body>{children}</body>
    </html>
  );
}