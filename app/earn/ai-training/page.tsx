import { Metadata } from "next";
import AITrainingClient from "./AITrainingClient";

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

  return <AITrainingClient countryTarget={targetGeo} />;
}