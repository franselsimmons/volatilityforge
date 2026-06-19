// ================= FILE FROM ROOT: src/app/layout.jsx =================

import './globals.css';

export const metadata = {
  title: 'VolatilityForge | Private LONG & SHORT Crypto Signals',
  description:
    'VolatilityForge is one private Discord signals group for LONG and SHORT crypto trades. Strict filtering, clear risk, no hype.',
  icons: {
    icon: '/favicon.svg'
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}