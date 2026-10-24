import type { Metadata } from "next";
import ForexClient from "./page.client";
import { BASE_URL as CONFIG_BASE_URL } from "@/lib/config";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const BASE_URL = CONFIG_BASE_URL.replace(/\/$/, "");

// ─── Supported regions ───────────────────────────────────────────────────────
// Kenya is the DEFAULT. Its canonical is the clean URL (/earn/forex);
// other regions keep ?geo=<country> as their own canonical.

const COUNTRIES = ["kenya", "uganda", "ghana"] as const;
type Country = (typeof COUNTRIES)[number];
const DEFAULT_COUNTRY: Country = "kenya";

function resolveCountry(geo: string | string[] | undefined): Country {
  const value = typeof geo === "string" ? geo.toLowerCase() : DEFAULT_COUNTRY;
  return (COUNTRIES as readonly string[]).includes(value)
    ? (value as Country)
    : DEFAULT_COUNTRY;
}

function canonicalFor(country: Country): string {
  return country === DEFAULT_COUNTRY
    ? `${BASE_URL}/earn/forex`
    : `${BASE_URL}/earn/forex?geo=${country}`;
}

const LOCALIZED: Record<
  Country,
  { title: string; desc: string; locale: string; providerName: string }
> = {
  kenya: {
    title: "Learn Forex Trading in Kenya & Earn | VelloEarn",
    desc: "Get structured forex training, funded account access, and a community of Kenyan traders. Learn to trade major pairs. Withdraw profits via M-Pesa.",
    locale: "en_KE",
    providerName: "VelloEarn Kenya",
  },
  uganda: {
    title: "Learn Forex Trading in Uganda & Earn | VelloEarn",
    desc: "Get structured forex training, funded account access, and a community of Ugandan traders. Withdraw profits via Mobile Money.",
    locale: "en_UG",
    providerName: "VelloEarn Uganda",
  },
  ghana: {
    title: "Learn Forex Trading in Ghana & Earn | VelloEarn",
    desc: "Get structured forex training, funded account access, and a community of Ghanaian traders. Withdraw profits via MTN MoMo.",
    locale: "en_GH",
    providerName: "VelloEarn Ghana",
  },
};

// ─── Metadata ────────────────────────────────────────────────────────────────

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { geo } = await searchParams;
  const country = resolveCountry(geo);
  const meta = LOCALIZED[country];
  const canonicalUrl = canonicalFor(country);
  // Confirm this file exists at /public/earn/forex-hero.jpg
  const ogImageUrl = `${BASE_URL}/earn/forex-hero.jpg`;

  return {
    title: meta.title,
    description: meta.desc,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: meta.title,
      description: meta.desc,
      url: canonicalUrl,
      siteName: "VelloEarn",
      type: "website",
      locale: meta.locale,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${meta.title} Program Cover`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.desc,
      images: [ogImageUrl],
    },
  };
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default async function ForexPage({ searchParams }: Props) {
  const { geo } = await searchParams;
  const countryTarget = resolveCountry(geo);
  const meta = LOCALIZED[countryTarget];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: `Forex Trading & Capital Evaluation Program - ${countryTarget.toUpperCase()}`,
    description:
      "Structured price action and risk mitigation training module culminating in corporate funded account challenges.",
    url: canonicalFor(countryTarget),
    provider: {
      "@type": "Organization",
      name: meta.providerName,
      sameAs: BASE_URL,
      logo: `${BASE_URL}/logo.jpg`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ForexClient countryTarget={countryTarget} />
    </>
  );
}