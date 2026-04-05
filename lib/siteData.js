export const siteData = {
  brand: "VolatilityForge",
  tagline: "Institutional-Grade Signal Intelligence",
  tiers: [
    {
      id: "pulse",
      name: "Market Pulse",
      tierLabel: "MOMENTUM RADAR",
      price: "79",
      usdt: "90",
      description: "Early-stage visibility for members who want to track structure and momentum before high-conviction setups emerge.",
      features: [
        "Real-time momentum alerts",
        "Broad watchlist visibility",
        "Structural trend tracking",
        "Entry/TP/SL parameters",
        "Access to #market-pulse"
      ],
      color: "border-slate-800"
    },
    {
      id: "prime",
      name: "Prime Setup",
      tierLabel: "TREND STRUCTURE",
      price: "149",
      usdt: "169",
      description: "High-probability setups filtered through established trend structures and volume profiling with human analysis.",
      features: [
        "Everything in Market Pulse",
        "High-conviction [CORE] setups",
        "Human-contextual analysis",
        "Mid-term trend identification",
        "Access to #prime-setups"
      ],
      color: "border-blue-600",
      popular: true
    },
    {
      id: "apex",
      name: "Apex Priority",
      tierLabel: "INSTITUTIONAL FLOW",
      price: "249",
      usdt: "279",
      description: "The gold standard. Signals derived from institutional order flow and whale activity with full lifecycle tracking.",
      features: [
        "Everything in Prime",
        "Ultra-low noise signal stream",
        "[ALPHA] momentum raketten",
        "Live trade lifecycle updates",
        "Lowest-latency execution bias",
        "Access to #apex-priority"
      ],
      color: "border-amber-500"
    }
  ]
};
