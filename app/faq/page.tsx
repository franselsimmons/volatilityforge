import GlowCard from "@/components/GlowCard";

const FAQ = [
  {
    q: "Do I get access to a website or dashboard?",
    a: "No. Nobody gets access to a dashboard. You only receive Discord alerts in private channels via roles.",
  },
  {
    q: "Is this financial advice?",
    a: "No. These are signals/alerts. You decide and manage your own risk.",
  },
  {
    q: "How does access work after payment?",
    a: "After payment, click “Connect Discord”. We then automatically assign the correct role and you will see your private channels.",
  },
  {
    q: "Which coins can I use to pay?",
    a: "NOWPayments supports many cryptocurrencies. You pay a price fixed in EUR or USDT, then choose your payment coin.",
  },
];

export default function FAQPage() {
  return (
    <div className="max-w-6xl mx-auto px-5 py-14">
      <h1 className="text-3xl font-semibold">FAQ</h1>
      <div className="mt-10 grid md:grid-cols-2 gap-6">
        {FAQ.map((f) => (
          <GlowCard key={f.q}>
            <div className="font-semibold">{f.q}</div>
            <div className="mt-2 text-[rgb(var(--muted))]">{f.a}</div>
          </GlowCard>
        ))}
      </div>
    </div>
  );
}