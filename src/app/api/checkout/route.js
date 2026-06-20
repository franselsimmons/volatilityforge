import Stripe from 'stripe';
import { NextResponse } from 'next/server';

const ALLOWED_LOCALES = ['nl', 'en', 'de', 'es', 'fr'];

const PLANS = {
  monthly: {
    label: 'VolatilityForge Monthly',
    priceEnv: 'STRIPE_PRICE_MONTHLY'
  },
  six_months: {
    label: 'VolatilityForge 6 Months',
    priceEnv: 'STRIPE_PRICE_SIX_MONTHS'
  },
  annual: {
    label: 'VolatilityForge Annual',
    priceEnv: 'STRIPE_PRICE_ANNUAL'
  }
};

function cleanString(value) {
  if (typeof value !== 'string') {
    return '';
  }

  return value.trim();
}

function getSafeLocale(locale) {
  return ALLOWED_LOCALES.includes(locale) ? locale : 'nl';
}

function getSafePlan(plan) {
  return Object.prototype.hasOwnProperty.call(PLANS, plan) ? plan : 'six_months';
}

function getBaseUrl(request) {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL;

  if (configuredUrl) {
    return configuredUrl.replace(/\/$/, '');
  }

  return new URL(request.url).origin;
}

async function parseCheckoutRequest(request) {
  const contentType = request.headers.get('content-type') || '';

  if (contentType.includes('application/json')) {
    const body = await request.json();

    return {
      plan: cleanString(body.plan),
      locale: cleanString(body.locale),
      email: cleanString(body.email).toLowerCase()
    };
  }

  const formData = await request.formData();

  return {
    plan: cleanString(formData.get('plan')),
    locale: cleanString(formData.get('locale')),
    email: cleanString(formData.get('email')).toLowerCase()
  };
}

export async function POST(request) {
  try {
    const paymentsEnabled = process.env.NEXT_PUBLIC_ENABLE_PAYMENTS === 'true';

    if (!paymentsEnabled) {
      return NextResponse.json(
        {
          ok: false,
          error: 'Payments are not enabled',
          fallbackUrl: '/nl/apply'
        },
        { status: 503 }
      );
    }

    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        {
          ok: false,
          error: 'STRIPE_SECRET_KEY is not configured'
        },
        { status: 500 }
      );
    }

    const data = await parseCheckoutRequest(request);
    const locale = getSafeLocale(data.locale);
    const planKey = getSafePlan(data.plan);
    const plan = PLANS[planKey];
    const priceId = process.env[plan.priceEnv];

    if (!priceId) {
      return NextResponse.json(
        {
          ok: false,
          error: `${plan.priceEnv} is not configured`
        },
        { status: 500 }
      );
    }

    const baseUrl = getBaseUrl(request);
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const sessionPayload = {
      mode: 'subscription',
      line_items: [
        {
          price: priceId,
          quantity: 1
        }
      ],
      success_url: `${baseUrl}/${locale}/success?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/${locale}/pricing?checkout=cancelled&plan=${planKey}`,
      metadata: {
        source: 'volatilityforge',
        plan: planKey,
        locale
      },
      subscription_data: {
        metadata: {
          source: 'volatilityforge',
          plan: planKey,
          locale
        }
      }
    };

    if (data.email) {
      sessionPayload.customer_email = data.email;
    }

    const session = await stripe.checkout.sessions.create(sessionPayload);

    return NextResponse.json({
      ok: true,
      plan: planKey,
      label: plan.label,
      url: session.url
    });
  } catch (error) {
    console.error('Checkout route error:', error);

    return NextResponse.json(
      {
        ok: false,
        error: 'Checkout session could not be created'
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    {
      ok: true,
      route: 'VolatilityForge checkout endpoint',
      method: 'POST',
      paymentsEnabled: process.env.NEXT_PUBLIC_ENABLE_PAYMENTS === 'true',
      plans: Object.keys(PLANS)
    },
    { status: 200 }
  );
}