import './globals.css';

export const metadata = {
  title: 'Content HQ',
  description: 'Interne social content generator voor vijf merken'
};

export default function RootLayout({ children }) {
  return (
    <html lang="nl">
      <body>{children}</body>
    </html>
  );
}
