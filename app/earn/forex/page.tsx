import { Metadata } from "next";
import ForexClient from "./page.client";

interface PageProps {
  searchParams: Promise<{ geo?: string }>;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const params = await searchParams;
  const geo = params.geo?.toLowerCase();

  let title = "Learn Forex Trading in Kenya & Earn | VelloEarn";
  let description = "Get structured forex training, funded account access, and a community of Kenyan traders. Learn to trade major pairs. Withdraw profits via M-Pesa.";

  if (geo === "uganda") {
    title = "Learn Forex Trading in Uganda & Earn | VelloEarn";
    description = "Get structured forex training, funded account access, and a community of Ugandan traders. Withdraw profits via Mobile Money.";
  } else if (geo === "ghana") {
    title = "Learn Forex Trading in Ghana & Earn | VelloEarn";
    description = "Get structured forex training, funded account access, and a community of Ghanaian traders. Withdraw profits via MTN MoMo.";
  }

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: ["/earn/forex-hero.jpg"],
    },
  };
}

export default async function ForexPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const geo = params.geo?.toLowerCase();
  
  // Normalize geo target
  let countryTarget: "kenya" | "uganda" | "ghana" = "kenya";
  if (geo === "uganda" || geo === "ghana") {
    countryTarget = geo;
  }

  // Define localized dynamic schema values safely
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
      "sameAs": "https://velloearn.co.ke"
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