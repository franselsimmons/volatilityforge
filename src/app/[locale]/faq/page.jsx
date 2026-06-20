import Link from 'next/link';
import { notFound } from 'next/navigation';
import SiteShell from '@/components/SiteShell';

const LOCALES = ['en', 'nl', 'de', 'es', 'fr'];

const COPY = {
  nl: {
    badge: 'FAQ',
    title: 'Veelgestelde vragen over VolatilityForge.',
    intro:
      'Hier vind je de belangrijkste vragen over de private signal room, performance, betalingen, risico en toegang. De antwoorden zijn bewust helder gehouden zodat klanten snel begrijpen wat VolatilityForge wel en niet is.',

    primaryCta: 'Vraag toegang aan',
    secondaryCta: 'Bekijk pricing',

    sections: [
      {
        title: 'Toegang en membership',
        questions: [
          {
            q: 'Wat is VolatilityForge?',
            a: 'VolatilityForge is een private crypto signal room voor selectieve LONG en SHORT signalen. Leden ontvangen signalen via een afgesloten Discord-omgeving.'
          },
          {
            q: 'Is er één signal room of zijn er meerdere VIP-lagen?',
            a: 'Er is één private signal room. Alle leden krijgen dezelfde feed. Er zijn geen verborgen VIP-lagen en geen aparte hogere tier voor betere signalen.'
          },
          {
            q: 'Wat is het verschil tussen de memberships?',
            a: 'Alle memberships geven toegang tot dezelfde private feed. Het verschil zit alleen in de looptijd: maandelijks, 6 maanden of jaarlijks.'
          },
          {
            q: 'Krijg ik direct toegang na betaling?',
            a: 'De site is voorbereid op een betaal- en aanvraagflow. Zodra Stripe en de toegangsautomatisering zijn gekoppeld, kan toegang automatisch of semi-automatisch worden verwerkt.'
          }
        ]
      },
      {
        title: 'Signalen',
        questions: [
          {
            q: 'Krijgen leden LONG én SHORT signalen?',
            a: 'Ja. De private feed kan zowel LONG als SHORT signalen delen wanneer de markt, setup en risicostructuur voldoende kloppen.'
          },
          {
            q: 'Hoe ziet een signaal eruit?',
            a: 'Een signaal bevat normaal gesproken richting, market, entry-zone, invalidatie, targets en eventuele updates. De exacte live signalen blijven binnen de private Discord.'
          },
          {
            q: 'Komen er elke dag signalen?',
            a: 'Niet verplicht. Geen signaal is beter dan een zwakke setup. VolatilityForge is gebouwd rond selectie, niet rond geforceerde dagelijkse activiteit.'
          },
          {
            q: 'Geeft VolatilityForge trade management?',
            a: 'Binnen de private room kunnen updates worden gedeeld wanneer een setup verandert. Leden blijven zelf verantwoordelijk voor uitvoering, positieomvang en risicobeheer.'
          }
        ]
      },
      {
        title: 'Performance',
        questions: [
          {
            q: 'Wat betekent Model PnL?',
            a: 'Model PnL is een modelberekende presentatie van resultaat op basis van vaste risicoparameters. Het is bedoeld om performance begrijpelijker te tonen, maar het is geen garantie op toekomstige resultaten.'
          },
          {
            q: 'Is +49.2% gegarandeerd?',
            a: 'Nee. Geen enkel resultaat is gegarandeerd. Modelberekeningen en eerdere resultaten geven geen garantie voor toekomstige prestaties.'
          },
          {
            q: 'Waarom wordt er met 0.25% risico per signaal gerekend?',
            a: 'Dat is een conservatieve vaste risicoparameter om resultaten overzichtelijk te presenteren. Werkelijke resultaten kunnen afwijken door uitvoering, timing, fees, slippage, leverage en positieomvang.'
          },
          {
            q: 'Worden alle interne details openbaar gemaakt?',
            a: 'Nee. De publieke website toont alleen een begrijpelijke presentatie. De interne selectieparameters, technische modelstructuur en live uitvoeringscontext blijven privé.'
          }
        ]
      },
      {
        title: 'Betaling en koppelingen',
        questions: [
          {
            q: 'Is Stripe al gekoppeld?',
            a: 'De code is voorbereid op Stripe Checkout. Je hoeft later alleen je Stripe secret key, price IDs en site URL als environment variables in Vercel te zetten.'
          },
          {
            q: 'Wat gebeurt er zolang Stripe nog niet live staat?',
            a: 'Zolang betalingen niet actief zijn, sturen de pricing-knoppen naar de aanvraagpagina. Zo kun je eerst handmatig of semi-handmatig toegang verwerken.'
          },
          {
            q: 'Welke betaalopties zijn voorbereid?',
            a: 'De structuur is voorbereid voor maandtoegang, 6 maanden toegang en jaartoegang.'
          },
          {
            q: 'Kan ik later automatisering toevoegen?',
            a: 'Ja. De aanvraagroute is voorbereid om later te koppelen met bijvoorbeeld Make, Zapier, Formspree, een eigen backend of een Discord-toegangsflow.'
          }
        ]
      },
      {
        title: 'Risico en verantwoordelijkheid',
        questions: [
          {
            q: 'Is VolatilityForge financieel advies?',
            a: 'Nee. VolatilityForge is geen financieel advies en geeft geen persoonlijk beleggingsadvies. Tradingbeslissingen blijven altijd de verantwoordelijkheid van de gebruiker.'
          },
          {
            q: 'Kan ik geld verliezen?',
            a: 'Ja. Trading heeft risico. Verliezen zijn mogelijk, ook wanneer een signaal logisch of modelmatig sterk lijkt.'
          },
          {
            q: 'Waar moet ik rekening mee houden?',
            a: 'Resultaten kunnen worden beïnvloed door uitvoering, timing, fees, slippage, liquiditeit, positieomvang, leverage en marktomstandigheden.'
          },
          {
            q: 'Moet de juridische tekst nog gecontroleerd worden?',
            a: 'Ja. Laat disclaimers, betaalvoorwaarden en marketingclaims juridisch toetsen voordat je publiek betaalde toegang aanbiedt.'
          }
        ]
      }
    ],

    riskTitle: 'Belangrijke risicotoelichting',
    riskText:
      'VolatilityForge is geen financieel advies. Trading heeft risico. Resultaten uit het verleden, modelberekeningen en voorbeeldsignalen geven geen garantie voor toekomstige resultaten. Leden blijven zelf verantwoordelijk voor uitvoering, positieomvang, leverage en risicobeheer.',

    finalTitle: 'Nog vragen of klaar om toegang aan te vragen?',
    finalText:
      'Start een aanvraag of bekijk eerst de pricing-pagina. Alle leden krijgen dezelfde private LONG en SHORT signal feed.',
    finalPrimary: 'Aanvraag starten',
    finalSecondary: 'Bekijk pricing'
  },

  en: {
    badge: 'FAQ',
    title: 'Frequently asked questions about VolatilityForge.',
    intro:
      'Here you will find the main questions about the private signal room, performance, payments, risk and access. The answers are intentionally clear so clients quickly understand what VolatilityForge is and is not.',

    primaryCta: 'Request access',
    secondaryCta: 'View pricing',

    sections: [
      {
        title: 'Access and membership',
        questions: [
          {
            q: 'What is VolatilityForge?',
            a: 'VolatilityForge is a private crypto signal room for selective LONG and SHORT signals. Members receive signals through a closed Discord environment.'
          },
          {
            q: 'Is there one signal room or multiple VIP tiers?',
            a: 'There is one private signal room. Every member receives the same feed. There are no hidden VIP layers and no higher tier for better signals.'
          },
          {
            q: 'What is the difference between memberships?',
            a: 'Every membership gives access to the same private feed. The only difference is the access length: monthly, 6 months or annual.'
          },
          {
            q: 'Do I get access immediately after payment?',
            a: 'The site is prepared for a payment and application flow. Once Stripe and access automation are connected, access can be processed automatically or semi-automatically.'
          }
        ]
      },
      {
        title: 'Signals',
        questions: [
          {
            q: 'Do members receive both LONG and SHORT signals?',
            a: 'Yes. The private feed can share both LONG and SHORT signals when market, setup and risk structure align.'
          },
          {
            q: 'What does a signal look like?',
            a: 'A signal normally includes direction, market, entry zone, invalidation, targets and possible updates. Exact live signals remain inside the private Discord.'
          },
          {
            q: 'Are signals posted every day?',
            a: 'Not necessarily. No signal is better than a weak setup. VolatilityForge is built around selection, not forced daily activity.'
          },
          {
            q: 'Does VolatilityForge provide trade management?',
            a: 'Inside the private room, updates can be shared when a setup changes. Members remain responsible for execution, position size and risk management.'
          }
        ]
      },
      {
        title: 'Performance',
        questions: [
          {
            q: 'What does Model PnL mean?',
            a: 'Model PnL is a model-calculated presentation of results based on fixed risk parameters. It is intended to make performance easier to understand, but it is not a guarantee of future results.'
          },
          {
            q: 'Is +49.2% guaranteed?',
            a: 'No. No result is guaranteed. Model calculations and past results do not guarantee future performance.'
          },
          {
            q: 'Why use 0.25% risk per signal?',
            a: 'It is a conservative fixed-risk parameter to present results clearly. Real results can differ because of execution, timing, fees, slippage, leverage and position size.'
          },
          {
            q: 'Are all internal details made public?',
            a: 'No. The public website only shows an understandable presentation. Internal selection parameters, technical model structure and live execution context remain private.'
          }
        ]
      },
      {
        title: 'Payment and integrations',
        questions: [
          {
            q: 'Is Stripe already connected?',
            a: 'The code is prepared for Stripe Checkout. Later you only need to add your Stripe secret key, price IDs and site URL as environment variables in Vercel.'
          },
          {
            q: 'What happens while Stripe is not live yet?',
            a: 'As long as payments are not active, pricing buttons send users to the application page. This allows you to process access manually or semi-manually first.'
          },
          {
            q: 'Which payment options are prepared?',
            a: 'The structure is prepared for monthly access, 6-month access and annual access.'
          },
          {
            q: 'Can I add automation later?',
            a: 'Yes. The application route is prepared to connect later with Make, Zapier, Formspree, your own backend or a Discord access flow.'
          }
        ]
      },
      {
        title: 'Risk and responsibility',
        questions: [
          {
            q: 'Is VolatilityForge financial advice?',
            a: 'No. VolatilityForge is not financial advice and does not provide personal investment advice. Trading decisions remain the user’s own responsibility.'
          },
          {
            q: 'Can I lose money?',
            a: 'Yes. Trading involves risk. Losses are possible, even when a signal looks logical or model-supported.'
          },
          {
            q: 'What should I take into account?',
            a: 'Results can be affected by execution, timing, fees, slippage, liquidity, position size, leverage and market conditions.'
          },
          {
            q: 'Should the legal text be reviewed?',
            a: 'Yes. Have disclaimers, payment terms and marketing claims legally reviewed before offering paid public access.'
          }
        ]
      }
    ],

    riskTitle: 'Important risk explanation',
    riskText:
      'VolatilityForge is not financial advice. Trading involves risk. Past performance, model calculations and example signals do not guarantee future results. Members remain responsible for execution, position size, leverage and risk management.',

    finalTitle: 'Still have questions or ready to request access?',
    finalText:
      'Start an application or review the pricing page first. Every member receives the same private LONG and SHORT signal feed.',
    finalPrimary: 'Start application',
    finalSecondary: 'View pricing'
  }
};

COPY.de = COPY.en;
COPY.es = COPY.en;
COPY.fr = COPY.en;

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export function generateMetadata({ params }) {
  const locale = params.locale;

  if (!LOCALES.includes(locale)) {
    return {};
  }

  const copy = COPY[locale] || COPY.en;

  return {
    title: locale === 'nl' ? 'FAQ' : 'FAQ',
    description: copy.intro
  };
}

export default function FAQPage({ params }) {
  const locale = params.locale;

  if (!LOCALES.includes(locale)) {
    notFound();
  }

  const copy = COPY[locale] || COPY.en;

  return (
    <SiteShell locale={locale}>
      <section className="pageStack">
        <div className="center narrow">
          <p className="eyebrow">{copy.badge}</p>
          <h1>{copy.title}</h1>
          <p className="lead">{copy.intro}</p>

          <div className="buttonRow center">
            <Link className="primaryButton" href={`/${locale}/apply`}>
              {copy.primaryCta}
            </Link>
            <Link className="secondaryButton" href={`/${locale}/pricing`}>
              {copy.secondaryCta}
            </Link>
          </div>
        </div>
      </section>

      {copy.sections.map((section) => (
        <section className="section" key={section.title}>
          <div className="center narrow">
            <p className="kicker">FAQ</p>
            <h2>{section.title}</h2>
          </div>

          <div className="faqGrid">
            {section.questions.map((item) => (
              <article className="faqCard" key={item.q}>
                <h3>{item.q}</h3>
                <p>{item.a}</p>
              </article>
            ))}
          </div>
        </section>
      ))}

      <section className="section">
        <div className="noticeCard">
          <span>{copy.riskTitle}</span>
          <p>{copy.riskText}</p>
        </div>
      </section>

      <section className="section">
        <article className="panel">
          <p className="kicker">Access</p>
          <h2>{copy.finalTitle}</h2>
          <p className="lead">{copy.finalText}</p>

          <div className="buttonRow">
            <Link className="primaryButton" href={`/${locale}/apply`}>
              {copy.finalPrimary}
            </Link>
            <Link className="secondaryButton" href={`/${locale}/pricing`}>
              {copy.finalSecondary}
            </Link>
          </div>
        </article>
      </section>
    </SiteShell>
  );
}