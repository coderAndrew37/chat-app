// app/earn/chatting/page.tsx
import { Metadata } from "next";
import ChattingClient from "./ChattingClient";
import JobSchema from "@/app/components/seo/JobSchema";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

// Resilient domain checking across all environment variables to ensure strict www. targeting
const BASE_URL = 
  process.env.NEXT_PUBLIC_SITE_URL || 
  process.env.NEXT_PUBLIC_BASE_URL || 
  "https://www.velloearn.co.ke";

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const resolvedParams = await searchParams;
  const countryParam =
    typeof resolvedParams.country === "string"
      ? resolvedParams.country.toLowerCase()
      : "kenya";

  const localizedMeta: Record<string, { title: string; desc: string }> = {
    kenya: {
      title: "Get Paid to Chat with Foreigners in Kenya — M-Pesa | VelloEarn",
      desc: "Earn money chatting online in Kenya. Customer support, community moderation and engagement tasks. Flexible hours, instant M-Pesa payouts. Free to join.",
    },
    uganda: {
      title: "Get Paid to Chat Online in Uganda — MTN MoMo | VelloEarn",
      desc: "Remote chatting jobs in Uganda. Handle customer support and moderation tasks from your phone. Instant MTN MoMo and Airtel Money payouts. Free to join.",
    },
    ghana: {
      title: "Get Paid to Chat Online in Ghana — Mobile Money | VelloEarn",
      desc: "Remote chatting jobs in Ghana. Customer support and moderation tasks from your phone. Paid to MTN MoMo, Telecel, and Vodafone. Free to join.",
    },
  };

  const meta = localizedMeta[countryParam] || localizedMeta.kenya;
  
  // FIXED: Using self-referencing canonical URLs to force Google to index and rank 
  // these regional variations inside Uganda and Ghana search engine markets independently.
  const canonicalUrl = `${BASE_URL}/earn/chatting?country=${countryParam}`;
  const ogImageUrl = `${BASE_URL}/og-cover.png`;

  return {
    title: meta.title,
    description: meta.desc,
    alternates: {
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
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${meta.title} Cover Visual`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.desc,
      images: [ogImageUrl], // FIXED: Added missing Twitter graphic arrays
    },
  };
}

export default async function ChattingPage({ searchParams }: Props) {
  const resolvedParams = await searchParams;
  const countryParam =
    typeof resolvedParams.country === "string"
      ? resolvedParams.country.toLowerCase()
      : "kenya";

  const targetGeo = ["kenya", "uganda", "ghana"].includes(countryParam)
    ? (countryParam as "kenya" | "uganda" | "ghana")
    : "kenya";

  const jobSchemaDetails = {
    kenya: {
      title: "Remote Chat Operator — Customer Support & Moderation",
      description:
        "Handle customer support chats, community moderation, and engagement tasks for businesses worldwide. Work from your phone in Kenya. Paid directly to M-Pesa with no minimum withdrawal.",
      currency: "KES",
      minVal: 6000,
      maxVal: 28000,
      countryName: "Kenya" as const,
    },
    uganda: {
      title: "Remote Chat Support Operator",
      description:
        "Handle customer support and moderation tasks remotely from Uganda. Paid to MTN MoMo and Airtel Money.",
      currency: "UGX",
      minVal: 180000,
      maxVal: 840000,
      countryName: "Uganda" as const,
    },
    ghana: {
      title: "Remote Chat Moderator",
      description:
        "Customer support and community moderation tasks from Ghana. Paid to MTN MoMo, Telecel, and Vodafone.",
      currency: "GHS",
      minVal: 700,
      maxVal: 3200,
      countryName: "Ghana" as const,
    },
  };

  const geoSchema = jobSchemaDetails[targetGeo];

  return (
    <>
      <JobSchema
        title={geoSchema.title}
        description={geoSchema.description}
        currency={geoSchema.currency}
        minSalary={geoSchema.minVal}
        maxSalary={geoSchema.maxVal}
        countryName={geoSchema.countryName}
        baseUrl={BASE_URL}
      />
      <ChattingClient countryTarget={targetGeo} />
    </>
  );
}