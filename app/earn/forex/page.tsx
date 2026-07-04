// app/earn/forex/page.tsx
import { Metadata } from "next";
import ForexClient from "./page.client";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

// Resilient domain configuration checking across multiple environment setups
const BASE_URL = 
  process.env.NEXT_PUBLIC_SITE_URL || 
  process.env.NEXT_PUBLIC_BASE_URL || 
  "https://www.velloearn.co.ke";

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const resolvedParams = await searchParams;
  const geoParam = typeof resolvedParams.geo === "string" ? resolvedParams.geo.toLowerCase() : "kenya";

  // Normalize geo target to match strict array bounds safely
  const countryTarget = ["kenya", "uganda", "ghana"].includes(geoParam)
    ? (geoParam as "kenya" | "uganda" | "ghana")
    : "kenya";

  const localizedMeta: Record<string, { title: string; desc: string }> = {
    kenya: {
      title: "Learn Forex Trading in Kenya & Earn | VelloEarn",
      desc: "Get structured forex training, funded account access, and a community of Kenyan traders. Learn to trade major pairs. Withdraw profits via M-Pesa.",
    },
    uganda: {
      title: "Learn Forex Trading in Uganda & Earn | VelloEarn",
      desc: "Get structured forex training, funded account access, and a community of Ugandan traders. Withdraw profits via Mobile Money.",
    },
    ghana: {
      title: "Learn Forex Trading in Ghana & Earn | VelloEarn",
      desc: "Get structured forex training, funded account access, and a community of Ghanaian traders. Withdraw profits via MTN MoMo.",
    },
  };

  const meta = localizedMeta[countryTarget];
  const canonicalUrl = `${BASE_URL}/earn/forex?geo=${countryTarget}`;
  const ogImageUrl = `${BASE_URL}/earn/forex-hero.jpg`;

  return {
    title: meta.title,
    description: meta.desc,
    alternates: {
      // FIXED: Locks regional search visibility onto specific geo-targeted paths
      canonical: canonicalUrl,
    },
    openGraph: {
      title: meta.title,
      description: meta.desc,
      url: canonicalUrl,
      siteName: "VelloEarn",
      type: "website",
      locale: "en_KE",
      images: [
        {
          url: ogImageUrl, // FIXED: Explicit absolute mapping prevents unfurl display drops
          width: 1200,
          height: 630,
          alt: `${meta.title} Program Cover`,
        },
      ],
    },
    twitter: {
      // FIXED: Added missing Twitter card arrays to maintain rich links on X
      card: "summary_large_image",
      title: meta.title,
      description: meta.desc,
      images: [ogImageUrl],
    },
  };
}

export default async function ForexPage({ searchParams }: Props) {
  const resolvedParams = await searchParams;
  const geoParam = typeof resolvedParams.geo === "string" ? resolvedParams.geo.toLowerCase() : "kenya";
  
  const countryTarget = ["kenya", "uganda", "ghana"].includes(geoParam)
    ? (geoParam as "kenya" | "uganda" | "ghana")
    : "kenya";

  const localizedProvider = {
    kenya: { name: "VelloEarn Kenya", region: "KE" },
    uganda: { name: "VelloEarn Uganda", region: "UG" },
    ghana: { name: "VelloEarn Ghana", region: "GH" }
  }[countryTarget];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": `Forex Trading & Capital Evaluation Program - ${countryTarget.toUpperCase()}`,
    "description": "Structured price action and risk mitigation training module culminating in corporate funded account challenges.",
    "provider": {
      "@type": "Organization",
      "name": localizedProvider.name,
      "sameAs": `${BASE_URL}`,
      "logo": `${BASE_URL}/logo.jpg`
    }
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