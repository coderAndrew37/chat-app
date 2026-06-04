import { Metadata } from "next";
import ChattingClient from "./ChattingClient";
import JobSchema from "@/app/components/seo/JobSchema";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://velloearn.co.ke";

// Dynamically generate localized SEO metadata and self-referencing canonical tags
export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const resolvedParams = await searchParams;
  const countryParam = typeof resolvedParams.country === "string" ? resolvedParams.country.toLowerCase() : "kenya";

  const localizedMeta: Record<string, { title: string; desc: string }> = {
    kenya: {
      title: "Get Paid to Chat Online in Kenya | Remote Chatting Jobs | VelloEarn",
      desc: "Work from your phone with VelloEarn. Earn KES 60–250 per hour handling customer support and community moderation chats. Flexible shifts, instant M-Pesa payments."
    },
    uganda: {
      title: "Paid Chat Operator Jobs Uganda | Remote Customer Support | VelloEarn",
      desc: "Turn your smartphone into an income stream in Uganda. Earn UGX 2,000–8,000 per hour responding to business text queues. Secure MTN MoMo & Airtel cashout."
    },
    ghana: {
      title: "Online Chatting Jobs Ghana | Remote Message Moderator | VelloEarn",
      desc: "Join VelloEarn Ghana for remote text-based chat support. Earn GHS 8–35 per hour with daily mobile money pathways via MTN and Telecel wallets."
    }
  };

  const meta = localizedMeta[countryParam] || localizedMeta.kenya;

  return {
    title: meta.title,
    description: meta.desc,
    alternates: {
      canonical: `${BASE_URL}/earn/chatting?country=${countryParam}`,
    },
    openGraph: {
      title: meta.title,
      description: meta.desc,
      images: ["/earn/chatting-hero.jpg"],
      url: `${BASE_URL}/earn/chatting?country=${countryParam}`,
    },
  };
}

export default async function ChattingPage({ searchParams }: Props) {
  const resolvedParams = await searchParams;
  const countryParam = typeof resolvedParams.country === "string" ? resolvedParams.country.toLowerCase() : "kenya";
  
  // Validate target parameters to map matching layout data safely
  const targetGeo = ["kenya", "uganda", "ghana"].includes(countryParam)
    ? (countryParam as "kenya" | "uganda" | "ghana")
    : "kenya";

  // Data matrix to fill out required structural schema fields dynamically
  const jobSchemaDetails = {
    kenya: { title: "Customer Support Chat Moderator", currency: "KES", minVal: 60, maxVal: 250, countryName: "Kenya" as const },
    uganda: { title: "Remote Chat Support Operator", currency: "UGX", minVal: 2000, maxVal: 8000, countryName: "Uganda" as const },
    ghana: { title: "Digital Message Queue Moderator", currency: "GHS", minVal: 8, maxVal: 35, countryName: "Ghana" as const }
  };

  const geoSchema = jobSchemaDetails[targetGeo];

  return (
    <>
      {/* Clean Dynamic Schema Injection Component for the Chatting Track */}
      <JobSchema
        title={geoSchema.title}
        description="Review and respond to incoming customer message chains, answer business text lines, and handle community platform moderation queues entirely over web or smartphone layouts."
        currency={geoSchema.currency}
        minSalary={geoSchema.minVal}
        maxSalary={geoSchema.maxVal}
        countryName={geoSchema.countryName}
        baseUrl={BASE_URL}
      />
      
      {/* Pass the dynamic geolocation parameter to your client view if needed */}
      <ChattingClient countryTarget={targetGeo} />
    </>
  );
}