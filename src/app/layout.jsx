import './globals.css';

export const metadata = {
  title: {
    default: 'VolatilityForge | Private LONG & SHORT Crypto Signals',
    template: '%s | VolatilityForge'
  },
  description:
    'VolatilityForge is a private crypto signal room for selective LONG and SHORT trading signals, model-calculated performance and risk-first execution.',
  applicationName: 'VolatilityForge',
  authors: [{ name: 'VolatilityForge' }],
  creator: 'VolatilityForge',
  publisher: 'VolatilityForge',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://volatilityforge.com'),
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg'
  },
  openGraph: {
    title: 'VolatilityForge | Private LONG & SHORT Crypto Signals',
    description:
      'Private Discord signal room for selective LONG and SHORT crypto signals.',
    url: '/',
    siteName: 'VolatilityForge',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VolatilityForge | Private LONG & SHORT Crypto Signals',
    description:
      'Private Discord signal room for selective LONG and SHORT crypto signals.'
  },
  robots: {
    index: true,
    follow: true
  }
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#03070D'
};

export default function RootLayout({ children }) {
  return (
    <html lang="nl">
      <body>{children}</body>
    </html>
  );
}