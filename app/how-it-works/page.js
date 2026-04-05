export default function HowItWorks() {
  const steps = [
    { title: "Data Aggregation", desc: "Our engine scans thousands of pairs for institutional order flow and volume anomalies." },
    { title: "The Funnel Filter", desc: "Setups are categorized into Pulse, Prime, or Apex based on conviction levels." },
    { title: "Human Enrichment", desc: "Senior analysts add the 'Human Layer'—technical context that bots simply can't provide." },
    { title: "Real-time Execution", desc: "Alerts land in your private Discord channel with clear Entry, TP, and SL targets." }
  ];

  return (
    <div className="py-24 px-6 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-12 text-center">Our Methodology</h1>
      <div className="space-y-12">
        {steps.map((step, i) => (
          <div key={i} className="flex gap-8 items-start">
            <span className="text-6xl font-black opacity-10 leading-none">{i + 1}</span>
            <div>
              <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
              <p className="text-slate-400 leading-relaxed text-lg">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
