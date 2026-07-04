// app/earn/surveys/page.tsx
import { Metadata } from "next";
import SurveysClient from "./SurveyClient";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

// Resilient domain configuration checking across all environment variables
const BASE_URL = 
  process.env.NEXT_PUBLIC_SITE_URL || 
  process.env.NEXT_PUBLIC_BASE_URL || 
  "https://www.velloearn.co.ke";

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const resolvedParams = await searchParams;
  const geoParam = typeof resolvedParams.geo === "string" ? resolvedParams.geo.toLowerCase() : "kenya";

  // Normalize geo target to strictly map inside allowed regions
  const countryTarget = ["kenya", "uganda", "ghana"].includes(geoParam)
    ? (geoParam as "kenya" | "uganda" | "ghana")
    : "kenya";

  const localizedMeta: Record<string, { title: string; desc: string }> = {
    kenya: {
      title: "Paid Surveys & Market Research Kenya | VelloEarn",
      desc: "Get paid for your opinion. Complete surveys, test products, and join focus groups for global brands. Earn KES 80 - 3,000+ per task with M-Pesa payouts.",
    },
    uganda: {
      title: "Paid Surveys & Market Research Uganda | VelloEarn",
      desc: "Get paid for your opinion. Complete surveys, test products, and join focus groups for global brands. Earn reliable side income with Mobile Money payouts.",
    },
    ghana: {
      title: "Paid Surveys & Market Research Ghana | VelloEarn",
      desc: "Get paid for your opinion. Complete surveys, test products, and join focus groups for global brands. Earn reliable side income with MTN MoMo payouts.",
    },
  };

  const meta = localizedMeta[countryTarget];
  const canonicalUrl = `${BASE_URL}/earn/surveys?geo=${countryTarget}`;
  const ogImageUrl = `${BASE_URL}/og-cover.png`;

  return {
    title: meta.title,
    description: meta.desc,
    alternates: {
      // FIXED: Locks search index authority onto the specific localized destination
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
          url: ogImageUrl, // FIXED: Explicit absolute string parsing handles previews flawlessly
          width: 1200,
          height: 630,
          alt: `${meta.title} Platform Preview`,
        },
      ],
    },
    twitter: {
      // FIXED: Added missing card array to prevent content fallback traps on social grids
      card: "summary_large_image",
      title: meta.title,
      description: meta.desc,
      images: [ogImageUrl],
    },
  };
}

export default async function SurveysPage({ searchParams }: Props) {
  const resolvedParams = await searchParams;
  const geoParam = typeof resolvedParams.geo === "string" ? resolvedParams.geo.toLowerCase() : "kenya";

  const countryTarget = ["kenya", "uganda", "ghana"].includes(geoParam)
    ? (geoParam as "kenya" | "uganda" | "ghana")
    : "kenya";

  const localizedProvider = {
    kenya: { name: "VelloEarn Kenya" },
    uganda: { name: "VelloEarn Uganda" },
    ghana: { name: "VelloEarn Ghana" },
  }[countryTarget];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": `Consumer Insights & Market Research Analyst Track - ${countryTarget.toUpperCase()}`,
    "description": "Structured curriculum focusing on consumer survey accuracy, application interface benchmarking, and focus group parameters.",
    "provider": {
      "@type": "Organization",
      "name": localizedProvider.name,
      "sameAs": BASE_URL,
      "logo": `${BASE_URL}/logo.jpg`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SurveysClient countryTarget={countryTarget} />
    </>
  );
}