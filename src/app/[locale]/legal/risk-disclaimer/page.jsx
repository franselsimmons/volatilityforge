import Link from 'next/link';
import { notFound } from 'next/navigation';
import SiteShell from '@/components/SiteShell';

const LOCALES = ['en', 'nl', 'de', 'es', 'fr'];

const COPY = {
  nl: {
    badge: 'Risk Disclaimer',
    title: 'Risicodisclaimer voor VolatilityForge.',
    intro:
      'Deze pagina beschrijft de belangrijkste risico’s en beperkingen rond VolatilityForge, crypto trading, modelberekende performance en toegang tot de private signal room.',

    sections: [
      {
        title: 'Geen financieel advies',
        paragraphs: [
          'VolatilityForge verstrekt geen financieel advies, beleggingsadvies, vermogensbeheer, juridisch advies of fiscaal advies.',
          'Alle informatie, signalen, voorbeelden, modelresultaten en toelichtingen zijn uitsluitend bedoeld voor algemene informatiedoeleinden.',
          'Gebruikers blijven zelf verantwoordelijk voor hun eigen beslissingen, positieomvang, uitvoering, risicobeheer en eventuele verliezen.'
        ]
      },
      {
        title: 'Trading heeft risico',
        paragraphs: [
          'Crypto trading brengt aanzienlijke risico’s met zich mee. De waarde van crypto-activa kan snel en sterk bewegen.',
          'Gebruikers kunnen een deel of het volledige ingelegde kapitaal verliezen.',
          'Gebruik van leverage kan winsten vergroten, maar ook verliezen versnellen en vergroten.'
        ]
      },
      {
        title: 'Geen garantie op winst',
        paragraphs: [
          'Toegang tot VolatilityForge, de private signal room of voorbeeldsignalen geeft geen garantie op winst.',
          'Resultaten uit het verleden bieden geen garantie voor toekomstige resultaten.',
          'Een signaal dat modelmatig of technisch sterk lijkt, kan alsnog verlies opleveren.'
        ]
      },
      {
        title: 'Model-PnL en performance',
        paragraphs: [
          'Model-PnL is een modelberekende inschatting op basis van vaste aannames, zoals een vaste risicoparameter per signaal.',
          'Modelresultaten kunnen afwijken van werkelijke resultaten door timing, uitvoering, fees, slippage, liquiditeit, spread, positieomvang, leverage en marktomstandigheden.',
          'Performancecijfers op deze website zijn bedoeld als presentatie van een modeluitkomst en mogen niet worden gelezen als gegarandeerd rendement.'
        ]
      },
      {
        title: 'Signal room en uitvoering',
        paragraphs: [
          'Signalen kunnen richting, entry-zone, invalidatie, targets en updates bevatten, maar de gebruiker bepaalt zelf of, hoe en wanneer een signaal wordt uitgevoerd.',
          'VolatilityForge is niet verantwoordelijk voor afwijkingen tussen een gedeeld signaal en de werkelijke uitvoering van een gebruiker.',
          'Vertragingen, exchange-problemen, liquiditeit, ordertypes, latency en persoonlijke instellingen kunnen het uiteindelijke resultaat beïnvloeden.'
        ]
      },
      {
        title: 'Eigen verantwoordelijkheid',
        paragraphs: [
          'Iedere gebruiker moet zelf beoordelen of crypto trading past bij zijn of haar kennis, ervaring, financiële situatie en risicobereidheid.',
          'Trade nooit met geld dat je niet kunt missen.',
          'Raadpleeg waar nodig een onafhankelijke financieel, juridisch of fiscaal adviseur voordat je handelsbeslissingen neemt.'
        ]
      },
      {
        title: 'Wijzigingen en beschikbaarheid',
        paragraphs: [
          'VolatilityForge kan informatie, pricing, signal room-structuur, features en voorwaarden wijzigen.',
          'Er is geen garantie dat signalen altijd beschikbaar zijn, dat er dagelijks signalen worden geplaatst of dat de Discord-omgeving zonder onderbreking beschikbaar blijft.',
          'Geen signaal plaatsen kan een bewuste keuze zijn wanneer de marktcondities onvoldoende zijn.'
        ]
      }
    ],

    bulletsTitle: 'Samengevat',
    bullets: [
      'Geen financieel advies.',
      'Trading heeft risico.',
      'Verliezen zijn mogelijk.',
      'Model-PnL is geen garantie.',
      'Resultaten uit het verleden voorspellen geen toekomstige resultaten.',
      'Gebruikers blijven zelf verantwoordelijk voor uitvoering en risicobeheer.'
    ],

    legalNoteTitle: 'Juridische controle aanbevolen',
    legalNote:
      'Laat deze disclaimer, je algemene voorwaarden, betaalvoorwaarden en marketingclaims juridisch controleren voordat je VolatilityForge publiek en betaald aanbiedt.',

    finalTitle: 'Terug naar VolatilityForge',
    finalText:
      'Bekijk de homepage, pricing of FAQ voor meer context over de private signal room.',
    links: [
      ['Homepage', ''],
      ['Pricing', 'pricing'],
      ['FAQ', 'faq']
    ]
  },

  en: {
    badge: 'Risk Disclaimer',
    title: 'Risk disclaimer for VolatilityForge.',
    intro:
      'This page describes the main risks and limitations around VolatilityForge, crypto trading, model-calculated performance and access to the private signal room.',

    sections: [
      {
        title: 'No financial advice',
        paragraphs: [
          'VolatilityForge does not provide financial advice, investment advice, asset management, legal advice or tax advice.',
          'All information, signals, examples, model results and explanations are provided for general informational purposes only.',
          'Users remain responsible for their own decisions, position sizing, execution, risk management and possible losses.'
        ]
      },
      {
        title: 'Trading involves risk',
        paragraphs: [
          'Crypto trading involves significant risk. The value of crypto assets can move quickly and sharply.',
          'Users can lose part or all of their invested capital.',
          'Using leverage can increase profits, but can also accelerate and increase losses.'
        ]
      },
      {
        title: 'No profit guarantee',
        paragraphs: [
          'Access to VolatilityForge, the private signal room or example signals does not guarantee profit.',
          'Past performance does not guarantee future results.',
          'A signal that appears technically or model-supported can still result in a loss.'
        ]
      },
      {
        title: 'Model PnL and performance',
        paragraphs: [
          'Model PnL is a model-calculated estimate based on fixed assumptions, such as a fixed risk parameter per signal.',
          'Model results can differ from real results because of timing, execution, fees, slippage, liquidity, spread, position size, leverage and market conditions.',
          'Performance figures on this website are intended as a model outcome presentation and should not be read as guaranteed returns.'
        ]
      },
      {
        title: 'Signal room and execution',
        paragraphs: [
          'Signals may include direction, entry zone, invalidation, targets and updates, but the user decides whether, how and when a signal is executed.',
          'VolatilityForge is not responsible for differences between a shared signal and the actual execution of a user.',
          'Delays, exchange issues, liquidity, order types, latency and personal settings can affect the final result.'
        ]
      },
      {
        title: 'Personal responsibility',
        paragraphs: [
          'Every user must decide whether crypto trading fits their knowledge, experience, financial situation and risk tolerance.',
          'Never trade with money you cannot afford to lose.',
          'Where needed, consult an independent financial, legal or tax adviser before making trading decisions.'
        ]
      },
      {
        title: 'Changes and availability',
        paragraphs: [
          'VolatilityForge may change information, pricing, signal room structure, features and terms.',
          'There is no guarantee that signals are always available, that signals are posted daily or that the Discord environment remains available without interruption.',
          'Posting no signal can be a deliberate choice when market conditions are not strong enough.'
        ]
      }
    ],

    bulletsTitle: 'Summary',
    bullets: [
      'No financial advice.',
      'Trading involves risk.',
      'Losses are possible.',
      'Model PnL is not a guarantee.',
      'Past performance does not predict future results.',
      'Users remain responsible for execution and risk management.'
    ],

    legalNoteTitle: 'Legal review recommended',
    legalNote:
      'Have this disclaimer, your terms, payment terms and marketing claims legally reviewed before offering VolatilityForge publicly as a paid service.',

    finalTitle: 'Back to VolatilityForge',
    finalText:
      'View the homepage, pricing or FAQ for more context about the private signal room.',
    links: [
      ['Homepage', ''],
      ['Pricing', 'pricing'],
      ['FAQ', 'faq']
    ]
  }
};

COPY.de = COPY.en;
COPY.es = COPY.en;
COPY.fr = COPY.en;

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;

  if (!LOCALES.includes(locale)) {
    return {};
  }

  const copy = COPY[locale] || COPY.en;

  return {
    title: locale === 'nl' ? 'Risicodisclaimer' : 'Risk Disclaimer',
    description: copy.intro
  };
}

export default async function RiskDisclaimerPage({ params }) {
  const { locale } = await params;

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
        </div>
      </section>

      <section className="section">
        <article className="legalCard">
          {copy.sections.map((section) => (
            <div key={section.title}>
              <h2>{section.title}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          ))}
        </article>
      </section>

      <section className="section twoColumnGrid">
        <article className="panel">
          <p className="kicker">Summary</p>
          <h2>{copy.bulletsTitle}</h2>

          <ul className="checkList">
            {copy.bullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="panel">
          <p className="kicker">Legal</p>
          <h2>{copy.legalNoteTitle}</h2>
          <p className="lead">{copy.legalNote}</p>
        </article>
      </section>

      <section className="section">
        <article className="panel">
          <p className="kicker">Navigation</p>
          <h2>{copy.finalTitle}</h2>
          <p className="lead">{copy.finalText}</p>

          <div className="buttonRow">
            {copy.links.map(([label, slug]) => (
              <Link
                key={label}
                className="secondaryButton"
                href={slug ? `/${locale}/${slug}` : `/${locale}`}
              >
                {label}
              </Link>
            ))}
          </div>
        </article>
      </section>
    </SiteShell>
  );
}