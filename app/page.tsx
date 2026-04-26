import type { Metadata } from "next";
import { HomePageClient } from "./components";

export const metadata: Metadata = {
  title: "VelloEarn — Chat with Lonely Souls. Get Paid for It.",
  description:
    "Join Kenya's remote chat & earn network. Real conversations, real people, direct M-Pesa payouts. Apply to join the team today — activation via WhatsApp.",
  keywords: [
    "chat and earn Kenya",
    "earn money chatting online Kenya",
    "remote work Kenya M-Pesa",
    "online jobs Kenya",
    "work from home Nairobi",
    "side hustle Kenya 2025",
    "VelloEarn",
  ],
  openGraph: {
    title: "VelloEarn — Chat with Lonely Souls. Get Paid for It.",
    description:
      "Real conversations. Instant M-Pesa payouts. Apply to join Kenya's remote chat & earn network.",
    type: "website",
    locale: "en_KE",
    siteName: "VelloEarn",
  },
  twitter: {
    card: "summary_large_image",
    title: "VelloEarn — Chat with Lonely Souls. Get Paid for It.",
    description:
      "Real conversations. Instant M-Pesa payouts. Apply to join Kenya's remote chat & earn network.",
  },
  alternates: {
    canonical: "https://velloearn.com",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "JobPosting",
  title: "Remote Chat & Engagement Specialist",
  description:
    "Join VelloEarn's remote team. Engage with real users through structured chat tasks, moderation, and communication support. Earn directly to M-Pesa with flexible hours from anywhere in Kenya.",
  hiringOrganization: {
    "@type": "Organization",
    name: "VelloEarn",
    sameAs: "https://velloearn.com",
  },
  jobLocationType: "TELECOMMUTE",
  applicantLocationRequirements: {
    "@type": "Country",
    name: "Kenya",
  },
  employmentType: "PART_TIME",
  datePosted: new Date().toISOString().split("T")[0],
  baseSalary: {
    "@type": "MonetaryAmount",
    currency: "KES",
    value: {
      "@type": "QuantitativeValue",
      minValue: 5000,
      maxValue: 30000,
      unitText: "MONTH",
    },
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomePageClient />
    </>
  );
}