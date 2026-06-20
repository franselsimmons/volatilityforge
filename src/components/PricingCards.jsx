'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const COPY = {
  nl: {
    recommended: 'Aanbevolen',
    choose: 'Kies membership',
    processing: 'Checkout openen...',
    fallback: 'Betaling nog niet actief. Je wordt doorgestuurd naar de aanvraagpagina.',
    error: 'Checkout kon niet worden gestart. Gebruik de aanvraagpagina.',
    features: [
      'Private Discord signal room',
      'LONG en SHORT crypto-signalen',
      'Entry-zone, invalidatie en targets',
      'Signal updates bij wijzigende markt',
      'Dezelfde feed voor alle leden',
      'Geen verborgen VIP-laag'
    ],
    plans: [
      {
        key: 'monthly',
        name: 'Maandelijks',
        price: '€99',
        period: '/ maand',
        description: 'Flexibele toegang tot de private signal room.'
      },
      {
        key: 'six_months',
        name: '6 maanden',
        price: '€449',
        period: '/ 6 maanden',
        description: 'De kernoptie voor serieuze leden die meerdere marktfases willen volgen.',
        featured: true
      },
      {
        key: 'annual',
        name: 'Jaarlijks',
        price: '€799',
        period: '/ jaar',
        description: 'Beste waarde voor langdurige toegang tot VolatilityForge.'
      }
    ]
  },

  en: {
    recommended: 'Recommended',
    choose: 'Choose membership',
    processing: 'Opening checkout...',
    fallback: 'Payments are not active yet. Redirecting to the application page.',
    error: 'Checkout could not be started. Use the application page.',
    features: [
      'Private Discord signal room',
      'LONG and SHORT crypto signals',
      'Entry zone, invalidation and targets',
      'Signal updates when the market changes',
      'Same feed for every member',
      'No hidden VIP layer'
    ],
    plans: [
      {
        key: 'monthly',
        name: 'Monthly',
        price: '€99',
        period: '/ month',
        description: 'Flexible access to the private signal room.'
      },
      {
        key: 'six_months',
        name: '6 months',
        price: '€449',
        period: '/ 6 months',
        description: 'The core option for serious members who want to follow multiple market phases.',
        featured: true
      },
      {
        key: 'annual',
        name: 'Annual',
        price: '€799',
        period: '/ year',
        description: 'Best value for longer-term access to VolatilityForge.'
      }
    ]
  }
};

COPY.de = COPY.en;
COPY.es = COPY.en;
COPY.fr = COPY.en;

function getCopy(locale) {
  return COPY[locale] || COPY.en;
}

export default function PricingCards({ locale = 'nl' }) {
  const router = useRouter();
  const copy = getCopy(locale);
  const [loadingPlan, setLoadingPlan] = useState('');
  const [message, setMessage] = useState('');

  async function handlePlanClick(planKey) {
    const paymentsEnabled = process.env.NEXT_PUBLIC_ENABLE_PAYMENTS === 'true';

    setMessage('');

    if (!paymentsEnabled) {
      setMessage(copy.fallback);
      router.push(`/${locale}/apply?plan=${planKey}`);
      return;
    }

    try {
      setLoadingPlan(planKey);

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          plan: planKey,
          locale
        })
      });

      const data = await response.json();

      if (!response.ok || !data?.url) {
        throw new Error(data?.error || 'Checkout failed');
      }

      window.location.href = data.url;
    } catch (error) {
      console.error('Pricing checkout error:', error);
      setMessage(copy.error);
      router.push(`/${locale}/apply?plan=${planKey}`);
    } finally {
      setLoadingPlan('');
    }
  }

  return (
    <>
      <div className="priceGrid">
        {copy.plans.map((plan) => (
          <article key={plan.key} className={plan.featured ? 'priceCard featured' : 'priceCard'}>
            <div className="priceTopline">
              <span>{plan.name}</span>
              {plan.featured ? <em>{copy.recommended}</em> : null}
            </div>

            <div className="priceValue">
              <strong>{plan.price}</strong>
              <span>{plan.period}</span>
            </div>

            <p>{plan.description}</p>

            <ul className="priceFeatures">
              {copy.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>

            <button
              className={plan.featured ? 'primaryButton fullButton' : 'secondaryButton fullButton'}
              type="button"
              onClick={() => handlePlanClick(plan.key)}
              disabled={Boolean(loadingPlan)}
            >
              {loadingPlan === plan.key ? copy.processing : copy.choose}
            </button>
          </article>
        ))}
      </div>

      {message ? <p className="formStatus">{message}</p> : null}
    </>
  );
}