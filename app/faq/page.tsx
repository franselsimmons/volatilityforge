import GlowCard from "@/components/GlowCard";

const FAQ = [
  { q: "Krijg ik toegang tot een website/dashboard?", a: "Nee. Niemand ziet een dashboard. Alleen Discord alerts in private channels via roles." },
  { q: "Is dit financieel advies?", a: "Nee. Dit zijn signalen/alerts. Jij beslist en beheert je risico." },
  { q: "Hoe werkt toegang na betaling?", a: "Na betaling klik je ‘Connect Discord’. Daarna geven we automatisch de juiste role en zie je je channels." },
  { q: "Welke munten kan ik gebruiken om te betalen?", a: "NOWPayments ondersteunt veel crypto. Je betaalt een EUR- of USDT-prijs en kiest je betaalmunt." }
];

export default function FAQPage() {
  return (
    <div className="max-w-6xl mx-auto px-5 py-14">
      <h1 className="text-3xl font-semibold">FAQ</h1>
      <div className="mt-10 grid md:grid-cols-2 gap-6">
        {FAQ.map(f => (
          <GlowCard key={f.q}>
            <div className="font-semibold">{f.q}</div>
            <div className="mt-2 text-[rgb(var(--muted))]">{f.a}</div>
          </GlowCard>
        ))}
      </div>
    </div>
  );
}