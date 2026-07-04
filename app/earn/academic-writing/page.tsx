// app/earn/academic-writing/page.tsx
import { Metadata } from "next";
import AcademicWritingClient from "./page.client";
import JobSchema from "@/app/components/seo/JobSchema";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

// Resilient domain checking configuration across multiple variable environments
const BASE_URL = 
  process.env.NEXT_PUBLIC_SITE_URL || 
  process.env.NEXT_PUBLIC_BASE_URL || 
  "https://www.velloearn.co.ke";

// Dynamically generate localized SEO metadata and self-referencing canonical tags
export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const resolvedParams = await searchParams;
  const countryParam = typeof resolvedParams.country === "string" ? resolvedParams.country.toLowerCase() : "kenya";

  const localizedMeta: Record<string, { title: string; desc: string }> = {
    kenya: {
      title: "Freelance Academic Writing Jobs Kenya M-Pesa | VelloEarn",
      desc: "Turn your degree into income with VelloEarn Kenya. Write essays, research papers, and dissertations for global clients. Earn KES 300–1,200 per page with instant M-Pesa payouts."
    },
    uganda: {
      title: "Remote Academic Freelance Writing Jobs Uganda | VelloEarn",
      desc: "Get paid to write research papers, case studies, and essays in Uganda. Earn UGX 8,500–35,000 per page. Secure payments via MTN MoMo & Airtel Mobile Money."
    },
    ghana: {
      title: "Online Academic Research Writer Jobs Ghana | VelloEarn",
      desc: "Discover flexible freelance academic writing tracks in Ghana. Earn GHS 35–150 per page delivering high-quality reports. Fast daily cashouts via Mobile Money channels."
    }
  };

  const meta = localizedMeta[countryParam] || localizedMeta.kenya;
  const canonicalUrl = `${BASE_URL}/earn/academic-writing?country=${countryParam}`;
  const ogImageUrl = `${BASE_URL}/og-cover.png`;

  return {
    title: meta.title,
    description: meta.desc,
    alternates: {
      // Retaining self-referencing path strategy to let all 3 target regions index safely
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
          url: ogImageUrl, // FIXED: Absolute path concatenation prevents unfurl parsing drops
          width: 1200,
          height: 630,
          alt: `${meta.title} Promotional Cover`,
        },
      ],
    },
    twitter: {
      // FIXED: Added missing Twitter metadata object array to preserve native cards on X
      card: "summary_large_image",
      title: meta.title,
      description: meta.desc,
      images: [ogImageUrl],
    },
  };
}

export default async function AcademicWritingPage({ searchParams }: Props) {
  const resolvedParams = await searchParams;
  const countryParam = typeof resolvedParams.country === "string" ? resolvedParams.country.toLowerCase() : "kenya";
  
  // Validate target parameters to map matching layout data safely
  const targetGeo = ["kenya", "uganda", "ghana"].includes(countryParam)
    ? (countryParam as "kenya" | "uganda" | "ghana")
    : "kenya";

  // Data matrix to fill out required structural schema fields dynamically
  const jobSchemaDetails = {
    kenya: { title: "Freelance Academic Researcher & Writer", currency: "KES", minVal: 300, maxVal: 1200, countryName: "Kenya" as const },
    uganda: { title: "Remote Academic Research Consultant", currency: "UGX", minVal: 8500, maxVal: 35000, countryName: "Uganda" as const },
    ghana: { title: "Freelance Academic Content Specialist", currency: "GHS", minVal: 35, maxVal: 150, countryName: "Ghana" as const }
  };

  const geoSchema = jobSchemaDetails[targetGeo];

  return (
    <>
      {/* Dynamic Schema Injection for the Academic Writing Track */}
      <JobSchema
        title={geoSchema.title}
        description="Conduct comprehensive academic research, draft structured essays, compile case studies, and format authentic literature reviews across diverse fields adhering to global citation rules."
        currency={geoSchema.currency}
        minSalary={geoSchema.minVal}
        maxSalary={geoSchema.maxVal}
        countryName={geoSchema.countryName}
        baseUrl={BASE_URL}
      />
      
      {/* Passing countryTarget prop directly down into the client shell */}
      <AcademicWritingClient countryTarget={targetGeo} />
    </>
  );
}