import type { Metadata } from "next";
import LandingInteractive from "@/app/components/LandingInteractive";

export const metadata: Metadata = {
  title: "VelloEarn — Join Kenya's Remote Work & Earning Network",
  description:
    "Apply to join VelloEarn's remote team. Earn from home via chatting, AI training, Swahili teaching, and surveys. Direct M-Pesa payouts. Serious applicants only.",
  keywords: [
    "remote work Kenya",
    "earn money online Kenya",
    "work from home Nairobi",
    "side hustle Kenya",
    "M-Pesa earnings",
    "online jobs Kenya",
    "chat and earn Kenya",
  ],
  openGraph: {
    title: "VelloEarn — Kenya's Remote Earning Network",
    description:
      "Real remote tasks. Structured payouts. Direct M-Pesa. Apply to join our team today.",
    type: "website",
    locale: "en_KE",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "JobPosting",
  title: "Remote Chat & Engagement Specialist",
  description:
    "Join VelloEarn's remote team. Tasks include real-time communication support, moderation, and data engagement. Earn via M-Pesa with flexible hours.",
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

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LandingInteractive />
    </>
  );
}