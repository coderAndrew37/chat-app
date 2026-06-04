import { Metadata } from "next";
import SurveysClient from "./SurveyClient";

interface PageProps {
  searchParams: Promise<{ geo?: string }>;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const params = await searchParams;
  const geo = params.geo?.toLowerCase();

  let title = "Paid Surveys & Market Research Kenya | VelloEarn";
  let description = "Get paid for your opinion. Complete surveys, test products, and join focus groups for global brands. Earn KES 80 - 3,000+ per task with M-Pesa payouts.";

  if (geo === "uganda") {
    title = "Paid Surveys & Market Research Uganda | VelloEarn";
    description = "Get paid for your opinion. Complete surveys, test products, and join focus groups for global brands. Earn reliable side income with Mobile Money payouts.";
  } else if (geo === "ghana") {
    title = "Paid Surveys & Market Research Ghana | VelloEarn";
    description = "Get paid for your opinion. Complete surveys, test products, and join focus groups for global brands. Earn reliable side income with MTN MoMo payouts.";
  }

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: "/og-surveys.jpg", width: 1200, height: 630 }],
    },
  };
}

export default async function SurveysPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const geo = params.geo?.toLowerCase();

  // Normalize geo target
  let countryTarget: "kenya" | "uganda" | "ghana" = "kenya";
  if (geo === "uganda" || geo === "ghana") {
    countryTarget = geo;
  }

  // Localized structural branding configurations
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
      "sameAs": "https://velloearn.co.ke",
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