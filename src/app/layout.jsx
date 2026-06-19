// ================= FILE FROM ROOT: src/app/layout.jsx =================

import './globals.css';

export const metadata = {
  title: 'VolatilityForge',
  description: 'Crypto-signalen zonder hype. Discipline zichtbaar. Motorkap dicht.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}