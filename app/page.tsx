import type { Metadata } from "next";
import { HomePageClient } from "./components";

export const metadata: Metadata = {
  title: "Earn from Remote Tasks in Kenya — M-Pesa Payouts | VelloEarn",
  description:
    "Get paid to chat with foreigners or train AI in Kenya. Plus surveys, Swahili teaching & more. Free to join. Instant M-Pesa payouts.",
  keywords: [
    "chat with foreigners and earn Kenya",
    "AI training jobs Kenya",
    "how to train AI and get paid Kenya",
    "is AI training legit Kenya",
    "earn money online Kenya M-Pesa",
    "remote work Kenya",
    "online jobs Kenya",
    "work from home Nairobi",
    "side hustle Kenya 2026",
    "VelloEarn",
  ],
  openGraph: {
    title: "Earn from Remote Tasks in Kenya — M-Pesa Payouts | VelloEarn",
    description:
      "Get paid to chat with foreigners or train AI in Kenya. Free to join. Instant M-Pesa payouts.",
    type: "website",
    locale: "en_KE",
    siteName: "VelloEarn",
  },
  twitter: {
    card: "summary_large_image",
    title: "Earn from Remote Tasks in Kenya — M-Pesa Payouts | VelloEarn",
    description:
      "Get paid to chat with foreigners or train AI in Kenya. Free to join. Instant M-Pesa payouts.",
  },
  alternates: {
    canonical: "https://velloearn.co.ke",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "JobPosting",
  title: "Remote Task Specialist — Chat, AI Training & More",
  description:
    "Join VelloEarn to earn from remote tasks in Kenya — AI training, chatting with foreigners, surveys, Swahili teaching and more. Paid directly to M-Pesa. Flexible hours, no experience needed.",
  hiringOrganization: {
    "@type": "Organization",
    name: "VelloEarn",
    sameAs: "https://velloearn.co.ke",
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