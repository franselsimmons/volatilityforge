export const LOCALES = ['nl', 'en', 'de', 'es', 'fr'];

export const DEFAULT_LOCALE = 'nl';

export const BRAND = {
  name: 'VolatilityForge',
  logo: '/volatilityforge-logo.svg',
  favicon: '/favicon.svg'
};

export const PRICING_PLANS = [
  {
    key: 'monthly',
    price: '€99',
    label: {
      nl: 'Maandelijks',
      en: 'Monthly',
      de: 'Monthly',
      es: 'Monthly',
      fr: 'Monthly'
    },
    period: {
      nl: '/ maand',
      en: '/ month',
      de: '/ month',
      es: '/ month',
      fr: '/ month'
    },
    description: {
      nl: 'Flexibele toegang tot de private signal room.',
      en: 'Flexible access to the private signal room.',
      de: 'Flexible access to the private signal room.',
      es: 'Flexible access to the private signal room.',
      fr: 'Flexible access to the private signal room.'
    }
  },
  {
    key: 'six_months',
    price: '€449',
    featured: true,
    label: {
      nl: '6 maanden',
      en: '6 months',
      de: '6 months',
      es: '6 months',
      fr: '6 months'
    },
    period: {
      nl: '/ 6 maanden',
      en: '/ 6 months',
      de: '/ 6 months',
      es: '/ 6 months',
      fr: '/ 6 months'
    },
    description: {
      nl: 'Aanbevolen membership voor leden die meerdere marktfases willen volgen.',
      en: 'Recommended membership for members who want to follow multiple market phases.',
      de: 'Recommended membership for members who want to follow multiple market phases.',
      es: 'Recommended membership for members who want to follow multiple market phases.',
      fr: 'Recommended membership for members who want to follow multiple market phases.'
    }
  },
  {
    key: 'annual',
    price: '€799',
    label: {
      nl: 'Jaarlijks',
      en: 'Annual',
      de: 'Annual',
      es: 'Annual',
      fr: 'Annual'
    },
    period: {
      nl: '/ jaar',
      en: '/ year',
      de: '/ year',
      es: '/ year',
      fr: '/ year'
    },
    description: {
      nl: 'Beste waarde voor langdurige toegang tot VolatilityForge.',
      en: 'Best value for longer-term access to VolatilityForge.',
      de: 'Best value for longer-term access to VolatilityForge.',
      es: 'Best value for longer-term access to VolatilityForge.',
      fr: 'Best value for longer-term access to VolatilityForge.'
    }
  }
];

export const PERFORMANCE_STATS = [
  {
    key: 'modelPnl',
    value: '+49.2%',
    label: {
      nl: 'Model PnL',
      en: 'Model PnL',
      de: 'Model PnL',
      es: 'Model PnL',
      fr: 'Model PnL'
    },
    description: {
      nl: 'Modelberekende accountgroei bij 0.25% vast risico per signaal.',
      en: 'Model-calculated account growth using 0.25% fixed risk per signal.',
      de: 'Model-calculated account growth using 0.25% fixed risk per signal.',
      es: 'Model-calculated account growth using 0.25% fixed risk per signal.',
      fr: 'Model-calculated account growth using 0.25% fixed risk per signal.'
    }
  },
  {
    key: 'period',
    value: '6',
    label: {
      nl: 'Maanden gemeten',
      en: 'Months measured',
      de: 'Months measured',
      es: 'Months measured',
      fr: 'Months measured'
    },
    description: {
      nl: 'Geselecteerde modelperiode voor LONG en SHORT samen.',
      en: 'Selected model period for LONG and SHORT combined.',
      de: 'Selected model period for LONG and SHORT combined.',
      es: 'Selected model period for LONG and SHORT combined.',
      fr: 'Selected model period for LONG and SHORT combined.'
    }
  },
  {
    key: 'closedSignals',
    value: '232',
    label: {
      nl: 'Gesloten signalen',
      en: 'Closed signals',
      de: 'Closed signals',
      es: 'Closed signals',
      fr: 'Closed signals'
    },
    description: {
      nl: 'Afgeronde modeluitkomsten in de geselecteerde signaalpool.',
      en: 'Completed model outcomes in the selected signal pool.',
      de: 'Completed model outcomes in the selected signal pool.',
      es: 'Completed model outcomes in the selected signal pool.',
      fr: 'Completed model outcomes in the selected signal pool.'
    }
  },
  {
    key: 'winRate',
    value: '46.8%',
    label: {
      nl: 'Winstpercentage',
      en: 'Win rate',
      de: 'Win rate',
      es: 'Win rate',
      fr: 'Win rate'
    },
    description: {
      nl: 'Gewogen over LONG en SHORT samen.',
      en: 'Weighted across LONG and SHORT together.',
      de: 'Weighted across LONG and SHORT together.',
      es: 'Weighted across LONG and SHORT together.',
      fr: 'Weighted across LONG and SHORT together.'
    }
  },
  {
    key: 'averageResult',
    value: '+0.85R',
    label: {
      nl: 'Gemiddeld resultaat',
      en: 'Average result',
      de: 'Average result',
      es: 'Average result',
      fr: 'Average result'
    },
    description: {
      nl: 'Gemiddelde netto uitkomst per gesloten signaal.',
      en: 'Average net outcome per closed signal.',
      de: 'Average net outcome per closed signal.',
      es: 'Average net outcome per closed signal.',
      fr: 'Average net outcome per closed signal.'
    }
  },
  {
    key: 'split',
    value: '+31.5% / +17.7%',
    label: {
      nl: 'LONG / SHORT split',
      en: 'LONG / SHORT split',
      de: 'LONG / SHORT split',
      es: 'LONG / SHORT split',
      fr: 'LONG / SHORT split'
    },
    description: {
      nl: 'Geschatte modelbijdrage per richting.',
      en: 'Estimated model contribution by direction.',
      de: 'Estimated model contribution by direction.',
      es: 'Estimated model contribution by direction.',
      fr: 'Estimated model contribution by direction.'
    }
  }
];

export const NAVIGATION = [
  {
    slug: '',
    label: {
      nl: 'Home',
      en: 'Home',
      de: 'Home',
      es: 'Home',
      fr: 'Home'
    }
  },
  {
    slug: 'performance',
    label: {
      nl: 'Performance',
      en: 'Performance',
      de: 'Performance',
      es: 'Performance',
      fr: 'Performance'
    }
  },
  {
    slug: 'system',
    label: {
      nl: 'Systeem',
      en: 'System',
      de: 'System',
      es: 'System',
      fr: 'System'
    }
  },
  {
    slug: 'signal-room',
    label: {
      nl: 'Signal Room',
      en: 'Signal Room',
      de: 'Signal Room',
      es: 'Signal Room',
      fr: 'Signal Room'
    }
  },
  {
    slug: 'pricing',
    label: {
      nl: 'Pricing',
      en: 'Pricing',
      de: 'Pricing',
      es: 'Pricing',
      fr: 'Pricing'
    }
  },
  {
    slug: 'faq',
    label: {
      nl: 'FAQ',
      en: 'FAQ',
      de: 'FAQ',
      es: 'FAQ',
      fr: 'FAQ'
    }
  }
];

export const SITE_COPY = {
  nl: {
    metaTitle: 'VolatilityForge | Private LONG & SHORT Crypto Signals',
    metaDescription:
      'Private Discord signal room voor selectieve LONG en SHORT crypto-signalen met modelberekende performance en risk-first uitvoering.',

    tagline: 'Private LONG & SHORT crypto signal room.',
    apply: 'Toegang aanvragen',
    recommended: 'Aanbevolen',

    riskShort:
      'Geen financieel advies. Trading heeft risico. Resultaten uit het verleden en modelberekeningen geven geen garantie voor toekomstige resultaten.',

    riskFull:
      'VolatilityForge is geen financieel advies. Trading heeft risico. Betalen voor toegang tot de signal room geeft geen garantie op winst. Werkelijke resultaten kunnen afwijken door uitvoering, timing, fees, slippage, leverage, positieomvang en marktomstandigheden.',

    pricingFeatures: [
      'Private Discord signal room',
      'LONG en SHORT crypto-signalen',
      'Entry-zone, invalidatie en targets',
      'Signal updates wanneer een setup verandert',
      'Dezelfde feed voor alle leden',
      'Geen verborgen VIP-laag'
    ],

    signalExample: [
      ['Richting', 'SHORT'],
      ['Market', 'BTC / USDT'],
      ['Entry-zone', '67,850 – 68,120'],
      ['Invalidatie', '68,740'],
      ['Targets', '67,100 / 66,420 / 65,800'],
      ['Risk mode', 'Vast risico per signaal']
    ]
  },

  en: {
    metaTitle: 'VolatilityForge | Private LONG & SHORT Crypto Signals',
    metaDescription:
      'Private Discord signal room for selective LONG and SHORT crypto signals with model-calculated performance and risk-first execution.',

    tagline: 'Private LONG & SHORT crypto signal room.',
    apply: 'Request access',
    recommended: 'Recommended',

    riskShort:
      'No financial advice. Trading involves risk. Past performance and model calculations do not guarantee future results.',

    riskFull:
      'VolatilityForge is not financial advice. Trading involves risk. Paying for access to the signal room does not guarantee profit. Real results can differ because of execution, timing, fees, slippage, leverage, position size and market conditions.',

    pricingFeatures: [
      'Private Discord signal room',
      'LONG and SHORT crypto signals',
      'Entry zone, invalidation and targets',
      'Signal updates when a setup changes',
      'Same feed for every member',
      'No hidden VIP layer'
    ],

    signalExample: [
      ['Direction', 'SHORT'],
      ['Market', 'BTC / USDT'],
      ['Entry zone', '67,850 – 68,120'],
      ['Invalidation', '68,740'],
      ['Targets', '67,100 / 66,420 / 65,800'],
      ['Risk mode', 'Fixed risk per signal']
    ]
  }
};

SITE_COPY.de = SITE_COPY.en;
SITE_COPY.es = SITE_COPY.en;
SITE_COPY.fr = SITE_COPY.en;

export function isValidLocale(locale) {
  return LOCALES.includes(locale);
}

export function getSafeLocale(locale) {
  return isValidLocale(locale) ? locale : DEFAULT_LOCALE;
}

export function getCopy(locale = DEFAULT_LOCALE) {
  return SITE_COPY[getSafeLocale(locale)] || SITE_COPY[DEFAULT_LOCALE];
}

export function getLocalizedValue(value, locale = DEFAULT_LOCALE) {
  if (!value || typeof value !== 'object') {
    return value;
  }

  const safeLocale = getSafeLocale(locale);

  return value[safeLocale] || value.en || value[DEFAULT_LOCALE] || '';
}

export function getLocalizedHref(locale = DEFAULT_LOCALE, slug = '') {
  const safeLocale = getSafeLocale(locale);

  return slug ? `/${safeLocale}/${slug}` : `/${safeLocale}`;
}