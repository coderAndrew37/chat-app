import { Metadata } from "next";
import AITrainingClient from "./AITrainingClient";
import JobSchema from "@/app/components/seo/JobSchema";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://velloearn.co.ke";

// Dynamically generate SEO tags using query parameters (e.g., /earn/ai-training?country=ghana)
export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const resolvedParams = await searchParams;
  const countryParam = typeof resolvedParams.country === "string" ? resolvedParams.country.toLowerCase() : "kenya";

  const localizedMeta: Record<string, { title: string; desc: string }> = {
    kenya: {
      title: "AI Data Annotation Jobs Kenya M-Pesa Payment | VelloEarn",
      desc: "Join the VelloEarn AI Training track in Kenya. Earn KES 80–400 per task with instant M-Pesa withdrawals. No laptop required—work from your smartphone today."
    },
    uganda: {
      title: "RLHF Remote Jobs Uganda Apply Now MTN MoMo | VelloEarn",
      desc: "Get paid to train AI models in Uganda. Earn UGX 2,500–12,000 per task with secure MTN MoMo & Airtel Mobile Money cashout. Smartphone optimized."
    },
    ghana: {
      title: "Online Text Evaluation Jobs Ghana Daily Payout | VelloEarn",
      desc: "Discover remote AI training data side hustles in Ghana. Earn GHS 10–50 per task with instant Telecel, Vodafone, and MTN Mobile Money pathways."
    }
  };

  const meta = localizedMeta[countryParam] || localizedMeta.kenya;

  return {
    title: meta.title,
    description: meta.desc,
    // PRO-TIP IMPLEMENTATION: Self-referencing canonical URLs prevent Google from grouping or dropping your parameter variations
    alternates: {
      canonical: `${BASE_URL}/earn/ai-training?country=${countryParam}`,
    },
    openGraph: {
      title: meta.title,
      description: meta.desc,
      images: ["/earn/ai-training-hero.jpg"],
      url: `${BASE_URL}/earn/ai-training?country=${countryParam}`,
    },
  };
}

export default async function AITrainingPage({ searchParams }: Props) {
  const resolvedParams = await searchParams;
  const countryParam = typeof resolvedParams.country === "string" ? resolvedParams.country.toLowerCase() : "kenya";
  
  // Validate parameter alignment safely before mounting client view
  const targetGeo = ["kenya", "uganda", "ghana"].includes(countryParam)
    ? (countryParam as "kenya" | "uganda" | "ghana")
    : "kenya";

  // Data matrix to fill out required schema fields based on the localized route variant
  const jobSchemaDetails = {
    kenya: { title: "AI Data Annotation Specialist", currency: "KES", minVal: 80, maxVal: 400, countryName: "Kenya" as const },
    uganda: { title: "RLHF Remote Data Evaluator", currency: "UGX", minVal: 2500, maxVal: 12000, countryName: "Uganda" as const },
    ghana: { title: "Online Text Evaluation Contributor", currency: "GHS", minVal: 10, maxVal: 50, countryName: "Ghana" as const }
  };

  const geoSchema = jobSchemaDetails[targetGeo];

  return (
    <>
      {/* Clean Dynamic Schema Injection Component */}
      <JobSchema
        title={geoSchema.title}
        description="Evaluate and rate AI-generated text responses, rewrite incorrect data outputs, and provide human feedback to optimize machine learning models via smartphone platforms."
        currency={geoSchema.currency}
        minSalary={geoSchema.minVal}
        maxSalary={geoSchema.maxVal}
        countryName={geoSchema.countryName}
        baseUrl={BASE_URL}
      />
      
      <AITrainingClient countryTarget={targetGeo} />
    </>
  );
}