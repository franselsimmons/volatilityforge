import { NextResponse } from 'next/server';

const ALLOWED_LOCALES = ['nl', 'en', 'de', 'es', 'fr'];

const ALLOWED_EXPERIENCE = ['beginner', 'intermediate', 'advanced', 'professional'];

const PLANS = {
  monthly: {
    id: 'monthly',
    label: 'Monthly',
    priceEUR: 99,
    duration: '1 month'
  },
  six_months: {
    id: 'six_months',
    label: '6 months',
    priceEUR: 449,
    duration: '6 months'
  },
  annual: {
    id: 'annual',
    label: 'Annual',
    priceEUR: 799,
    duration: '12 months'
  }
};

function cleanString(value) {
  if (typeof value !== 'string') {
    return '';
  }

  return value.trim();
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getSafeLocale(locale) {
  return ALLOWED_LOCALES.includes(locale) ? locale : 'nl';
}

function getSafeExperience(value) {
  return ALLOWED_EXPERIENCE.includes(value) ? value : 'intermediate';
}

function getSafePlan(value) {
  if (PLANS[value]) {
    return PLANS[value];
  }

  return PLANS.six_months;
}

function getSafeRedirectPath(value, locale) {
  const fallback = `/${locale}/success`;

  if (!value || typeof value !== 'string') {
    return fallback;
  }

  if (!value.startsWith('/')) {
    return fallback;
  }

  if (value.startsWith('//')) {
    return fallback;
  }

  if (value.includes('\\')) {
    return fallback;
  }

  return value;
}

async function parseRequest(request) {
  const contentType = request.headers.get('content-type') || '';

  if (contentType.includes('application/json')) {
    const body = await request.json();

    return {
      name: cleanString(body.name),
      email: cleanString(body.email).toLowerCase(),
      telegram: cleanString(body.telegram),
      experience: cleanString(body.experience),
      plan: cleanString(body.plan),
      goal: cleanString(body.goal),
      riskAccepted: cleanString(body.riskAccepted),
      locale: cleanString(body.locale),
      redirectTo: cleanString(body.redirectTo)
    };
  }

  const formData = await request.formData();

  return {
    name: cleanString(formData.get('name')),
    email: cleanString(formData.get('email')).toLowerCase(),
    telegram: cleanString(formData.get('telegram')),
    experience: cleanString(formData.get('experience')),
    plan: cleanString(formData.get('plan')),
    goal: cleanString(formData.get('goal')),
    riskAccepted: cleanString(formData.get('riskAccepted')),
    locale: cleanString(formData.get('locale')),
    redirectTo: cleanString(formData.get('redirectTo'))
  };
}

async function sendWebhook(payload) {
  const webhookUrl = process.env.APPLICATION_WEBHOOK_URL;

  if (!webhookUrl) {
    return {
      sent: false,
      reason: 'APPLICATION_WEBHOOK_URL is not configured'
    };
  }

  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error(`Webhook failed with status ${response.status}`);
  }

  return {
    sent: true,
    status: response.status
  };
}

export async function POST(request) {
  try {
    const data = await parseRequest(request);

    const locale = getSafeLocale(data.locale);
    const redirectPath = getSafeRedirectPath(data.redirectTo, locale);
    const plan = getSafePlan(data.plan);
    const experience = getSafeExperience(data.experience);

    if (!data.name || !data.email || !data.goal) {
      return NextResponse.json(
        {
          ok: false,
          error: 'Missing required fields'
        },
        { status: 400 }
      );
    }

    if (!isValidEmail(data.email)) {
      return NextResponse.json(
        {
          ok: false,
          error: 'Invalid email address'
        },
        { status: 400 }
      );
    }

    if (data.riskAccepted !== 'yes') {
      return NextResponse.json(
        {
          ok: false,
          error: 'Risk confirmation is required'
        },
        { status: 400 }
      );
    }

    const applicationId = `vf_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

    const payload = {
      source: 'volatilityforge-application',
      applicationId,
      submittedAt: new Date().toISOString(),

      applicant: {
        name: data.name,
        email: data.email,
        telegram: data.telegram || null,
        experience
      },

      selectedPlan: {
        id: plan.id,
        label: plan.label,
        priceEUR: plan.priceEUR,
        duration: plan.duration
      },

      payment: {
        method: 'manual_crypto',
        status: 'pending_manual_payment',
        instructions:
          'Send crypto payment instructions manually. Confirm payment manually before granting Discord access.'
      },

      access: {
        status: 'pending_manual_review',
        discordAccess: 'not_granted'
      },

      message: {
        goal: data.goal
      },

      riskAccepted: true,
      locale
    };

    let webhook = {
      sent: false,
      reason: 'Not attempted'
    };

    try {
      webhook = await sendWebhook(payload);
    } catch (error) {
      console.error('Application webhook error:', error);
      webhook = {
        sent: false,
        reason: 'Webhook request failed'
      };
    }

    const acceptsHtml = request.headers.get('accept')?.includes('text/html');

    if (acceptsHtml) {
      const redirectUrl = new URL(redirectPath, request.url);

      redirectUrl.searchParams.set('application', 'received');
      redirectUrl.searchParams.set('payment', 'manual_crypto');
      redirectUrl.searchParams.set('plan', plan.id);

      return NextResponse.redirect(redirectUrl, {
        status: 303
      });
    }

    return NextResponse.json({
      ok: true,
      application: payload,
      webhook
    });
  } catch (error) {
    console.error('Application route error:', error);

    return NextResponse.json(
      {
        ok: false,
        error: 'Application could not be processed'
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    {
      ok: true,
      route: 'VolatilityForge manual crypto application endpoint',
      method: 'POST',
      paymentMode: 'manual_crypto'
    },
    { status: 200 }
  );
}