// ================= FILE FROM ROOT: src/app/layout.jsx =================

import './globals.css';

export const metadata = {
  title: 'VolatilityForge | Private LONG & SHORT Crypto Signals',
  description:
    'VolatilityForge is one private Discord signal room for LONG and SHORT crypto trades. Selective signals, clear risk and model-calculated performance.',
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