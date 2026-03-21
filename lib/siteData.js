export const siteData = {
  brand: "VolatilityForge",
  tagline: "Execution-grade crypto signal delivery",
  description:
    "VolatilityForge delivers structured crypto scanner and execution alerts through private Discord channels.",

  nav: [
    { href: "/how-it-works", label: "How it works" },
    { href: "/pricing", label: "Pricing" },
    { href: "/faq", label: "FAQ" },
    { href: "/pay", label: "Pay" },
  ],

  plans: [
    {
      key: "free",
      tier: "Free",
      name: "BUILDUP Access",
      euro: 0,
      usdt: 0,
      badge: "Free",
      description:
        "Early structure and momentum-building alerts from both MAIN and MOON.",
      channels: ["#market-radar"],
      bullets: [
        "MAIN BUILDUP alerts",
        "MOON BUILDUP alerts",
        "Early watchlist visibility",
        "Best for preparation and tracking",
      ],
      delivery:
        "Free radar delivery for members who want to watch early structure without execution-grade filtering.",
      score: "5.5/10",
    },
    {
      key: "starter",
      tier: "Starter",
      name: "ALMOST Signals",
      euro: 79,
      usdt: 90,
      badge: "Most Popular",
      description:
        "Pre-breakout and pre-breakdown setups close to execution in MAIN and MOON.",
      channels: ["#setup-watch", "#high-alert"],
      bullets: [
        "MAIN ALMOST alerts",
        "MOON ALMOST alerts",
        "Closer to execution than BUILDUP",
        "Best for members who want to prepare entries manually",
      ],
      delivery:
        "This tier gets the almost-ready setups, but not the strongest entry-grade scanner output and not the execution flow.",
      score: "7.4/10",
    },
    {
      key: "pro",
      tier: "Pro",
      name: "Trade Signals",
      euro: 149,
      usdt: 169,
      badge: "Pro",
      description:
        "Best scanner output from MAIN ENTRY and MOON ELITE IGNITION / ELITE EXPANSION.",
      channels: ["#trade-alerts"],
      bullets: [
        "MAIN ENTRY alerts",
        "MOON ELITE IGNITION alerts",
        "MOON ELITE EXPANSION alerts",
        "Higher quality filtering than Starter",
        "Built for members who want the strongest scanner-grade signals",
      ],
      delivery:
        "This is the strongest scanner tier. Members get the best scanner entries, but not the full elite execution flow.",
      score: "8.7/10",
    },
    {
      key: "elite",
      tier: "Elite",
      name: "Execution Engine",
      euro: 249,
      usdt: 279,
      badge: "Elite",
      description:
        "Full execution-flow delivery from pre-trade setup to trade open, trade close and results.",
      channels: [
        "#pre-trade-setup",
        "#trade-opened",
        "#trade-closed",
        "#track-record",
      ],
      bullets: [
        "Pre-trade setup flow",
        "Trade opened flow",
        "Trade closed flow",
        "Track record delivery",
        "Highest-tier execution-grade access",
      ],
      delivery:
        "This is the closest thing to the actual trade desk flow. Highest quality, lowest noise, most actionable delivery.",
      score: "9.4/10",
    },
  ],

  channelGroups: [
    {
      name: "FREE — Market Radar",
      channels: ["#market-radar"],
      quality: "5.5/10",
      summary:
        "Early structure only. Useful for watching market development, not for blind execution.",
    },
    {
      name: "STARTER — Setup Watch",
      channels: ["#setup-watch", "#high-alert"],
      quality: "7.4/10",
      summary:
        "Good pre-entry zone. Better than radar, but still one layer before the strongest signals.",
    },
    {
      name: "PRO — Trade Signals",
      channels: ["#trade-alerts"],
      quality: "8.7/10",
      summary:
        "Strongest scanner-grade output. Best for members who want high-quality scanner alerts without full execution flow.",
    },
    {
      name: "ELITE — Execution Engine",
      channels: ["#pre-trade-setup", "#trade-opened", "#trade-closed", "#track-record"],
      quality: "9.4/10",
      summary:
        "Highest quality delivery. Full execution-style alert chain with the cleanest filtering.",
    },
  ],

  faq: [
    {
      q: "Do members get access to a public dashboard?",
      a: "No. Delivery is Discord-first. Members only receive access to the private channels included in their plan.",
    },
    {
      q: "What does Starter include?",
      a: "Starter includes MAIN ALMOST and MOON ALMOST style delivery through setup-watch and high-alert style channels.",
    },
    {
      q: "What does Pro include?",
      a: "Pro includes the best scanner output: MAIN ENTRY and MOON ELITE IGNITION / ELITE EXPANSION.",
    },
    {
      q: "What does Elite include?",
      a: "Elite includes the execution flow: pre-trade setup, trade opened, trade closed and track record delivery.",
    },
    {
      q: "Is this financial advice?",
      a: "No. This is structured signal delivery. Every member remains fully responsible for their own decisions.",
    },
    {
      q: "How is access delivered?",
      a: "Access is assigned manually in Discord after payment verification.",
    },
  ],
};

export const plans = siteData.plans;
export const faqItems = siteData.faq;
export const navItems = siteData.nav;
export const channelGroups = siteData.channelGroups;
