// app/layout.js
import './globals.css';

export const metadata = {
  title: 'VolatilityForge | Precision Intelligence',
  description: 'Institutional-grade signal intelligence platform.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-[#06090F] text-white">
          {children}
        </div>
      </body>
    </html>
  )
}
