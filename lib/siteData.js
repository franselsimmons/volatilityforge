export const siteData = {
  brand: "VolatilityForge",
  tagline: "Execution-grade crypto signal delivery",
  description:
    "VolatilityForge delivers structured MAIN, MOON and execution-flow alerts through private Discord channels.",

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
      name: "Market Radar",
      euro: 0,
      usdt: 0,
      badge: "Free",
      description:
        "Vroege marktstructuur en momentum-opbouw uit MAIN en MOON.",
      channels: [
        "MAIN BUILDUP",
        "MOON BUILDUP",
      ],
      bullets: [
        "Toegang tot MAIN BUILDUP",
        "Toegang tot MOON BUILDUP",
        "Vroege watchlist en voorbereiding",
        "Niet bedoeld als directe execution-tier",
      ],
      audience:
        "Voor mensen die de markt willen volgen en setups vroeg willen zien.",
    },
    {
      key: "starter",
      tier: "Starter",
      name: "ALMOST Signals",
      euro: 79,
      usdt: 90,
      badge: "Most Popular",
      description:
        "Pre-breakout / pre-breakdown setups dichtbij execution in MAIN en MOON.",
      channels: [
        "MAIN ALMOST",
        "MOON ALMOST",
      ],
      bullets: [
        "Toegang tot MAIN ALMOST",
        "Toegang tot MOON ALMOST",
        "Dichter op execution dan BUILDUP",
        "Voor members die setups willen klaarzetten",
      ],
      audience:
        "Voor members die vroeg maar serieus willen positioneren vóór de echte entry-flow.",
    },
    {
      key: "pro",
      tier: "Pro",
      name: "Trade Signals",
      euro: 149,
      usdt: 169,
      badge: "Pro",
      description:
        "Sterkste scanner-output uit MAIN ENTRY en MOON elite scannerfases.",
      channels: [
        "MAIN ENTRY",
        "MOON ELITE IGNITION",
        "MOON ELITE EXPANSION",
      ],
      bullets: [
        "Toegang tot MAIN ENTRY",
        "Toegang tot MOON ELITE IGNITION",
        "Toegang tot MOON ELITE EXPANSION",
        "Sterkere filtering en hogere setupkwaliteit",
      ],
      audience:
        "Voor members die de beste scanner-signalen willen ontvangen.",
    },
    {
      key: "elite",
      tier: "Elite",
      name: "Execution Engine",
      euro: 249,
      usdt: 279,
      badge: "Elite",
      description:
        "Volledige execution-flow van pre-trade setup tot open en gesloten trade.",
      channels: [
        "PRE-TRADE SETUP",
        "TRADE OPENED",
        "TRADE CLOSED",
        "TRACK RECORD",
      ],
      bullets: [
        "Toegang tot PRE-TRADE SETUP",
        "Toegang tot TRADE OPENED",
        "Toegang tot TRADE CLOSED",
        "Toegang tot TRACK RECORD",
        "Hoogste tier met volledige execution delivery",
      ],
      audience:
        "Voor members die de volledige trade desk / execution-flow willen volgen.",
    },
  ],

  faq: [
    {
      q: "Do members get access to a dashboard?",
      a: "Nee. Delivery is Discord-first. Members krijgen alleen de private kanalen die bij hun tier horen.",
    },
    {
      q: "What is the difference between Main and Moon?",
      a: "Main is cleaner en meer structuur-gericht. Moon is agressiever, volatieler en sneller.",
    },
    {
      q: "What is the difference between Starter, Pro and Elite?",
      a: "Starter geeft ALMOST-signalen, Pro geeft ENTRY + Moon elite scanner output, Elite geeft de volledige execution-flow.",
    },
    {
      q: "Is this copy trading?",
      a: "Nee. Dit zijn signalen en execution-delivery. De member blijft altijd zelf verantwoordelijk.",
    },
  ],
};

export const plans = siteData.plans;
export const faqItems = siteData.faq;
export const navItems = siteData.nav;