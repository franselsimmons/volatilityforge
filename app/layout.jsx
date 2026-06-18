import { Space_Grotesk, IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';

const display = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap'
});

const body = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-body',
  display: 'swap'
});

const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
  display: 'swap'
});

export const metadata = {
  title: 'VolatilityForge — gefilterde crypto-selectie',
  description:
    'Niet méér signalen, maar betere. VolatilityForge volgt een streng selectieproces en laat in gewone taal zien wanneer er gehandeld wordt en wanneer bewust niet.',
  metadataBase: new URL('https://volatilityforge.com')
};

export const viewport = {
  themeColor: '#131519'
};

export default function RootLayout({ children }) {
  return (
    <html lang="nl" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
