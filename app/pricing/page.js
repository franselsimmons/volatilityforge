import { siteData } from '@/lib/siteData';
import Link from 'next/link';

export default function PricingPage() {
  return (
    <div className="py-20 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Choose Your Execution Tier</h1>
        <p className="text-slate-400">All plans include Entry, Take Profit, and Stop Loss parameters.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {siteData.tiers.map((tier) => (
          <div key={tier.id} className={`relative flex flex-col p-8 rounded-3xl card-glass ${tier.popular ? 'ring-2 ring-blue-500' : ''}`}>
            {tier.popular && (
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-500 text-xs font-bold px-3 py-1 rounded-full">
                MOST POPULAR
              </span>
            )}
            <div className="mb-8">
              <h2 className="text-2xl font-bold">{tier.name}</h2>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-bold">€{tier.price}</span>
                <span className="text-slate-500">/mo</span>
              </div>
              <p className="text-sm text-slate-500 mt-1">or {tier.usdt} USDT</p>
            </div>
            
            <ul className="space-y-4 mb-10 flex-grow">
              {tier.features.map((feat, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-slate-300">
                  <span className="text-blue-500">✓</span> {feat}
                </li>
              ))}
            </ul>

            <Link href="/pay" className="w-full py-4 rounded-xl font-bold text-center bg-white text-black hover:bg-slate-200 transition">
              Select {tier.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
