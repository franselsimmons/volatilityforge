import { siteData } from '@/lib/siteData';
import Link from 'next/link';

export default function PricingPage() {
  return (
    <div className="py-24 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-20">
        <h1 className="text-5xl font-bold mb-4">Execution Tiers</h1>
        <p className="text-slate-400 text-lg">Select the level of intelligence that fits your trading style.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {siteData.tiers.map((tier) => (
          <div key={tier.id} className={`relative flex flex-col p-10 rounded-[2.5rem] glass-card border-t-4 ${tier.color}`}>
            {tier.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-[10px] font-black px-4 py-1.5 rounded-full tracking-widest uppercase">
                Most Professional
              </div>
            )}
            <div className="mb-8">
              <span className="text-[10px] font-bold tracking-[0.2em] text-slate-500 uppercase">{tier.tierLabel}</span>
              <h2 className="text-3xl font-bold mt-2">{tier.name}</h2>
              <div className="mt-6 flex items-baseline gap-2">
                <span className="text-5xl font-bold">€{tier.price}</span>
                <span className="text-slate-500 font-medium">/mo</span>
              </div>
              <p className="text-slate-500 text-xs mt-2 italic">or {tier.usdt} USDT via manual crypto pay</p>
            </div>
            
            <ul className="space-y-5 mb-12 flex-grow">
              {tier.features.map((feat, i) => (
                <li key={i} className="flex items-start gap-4 text-sm text-slate-300">
                  <span className="text-amber-500 mt-1">✦</span>
                  {feat}
                </li>
              ))}
            </ul>

            <Link href="/pay" className="w-full py-5 rounded-2xl font-bold text-center bg-white text-black hover:bg-amber-500 hover:text-black transition-all">
              Select {tier.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
