// app/page.tsx
import type { Metadata } from "next";
import { HomePageClient } from "./components";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.velloearn.co.ke";

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
  alternates: {
    // FIXED: Switched to match your www. canonical strategy perfectly
    canonical: `${BASE_URL}`,
  },
  openGraph: {
    title: "Earn from Remote Tasks in Kenya — M-Pesa Payouts | VelloEarn",
    description:
      "Get paid to chat with foreigners or train AI in Kenya. Free to join. Instant M-Pesa payouts.",
    url: `${BASE_URL}`, // ADDED
    type: "website",
    locale: "en_KE",
    siteName: "VelloEarn",
    images: [
      {
        url: `${BASE_URL}/og-cover.png`, // ADDED: Global open graph visual fallback
        width: 1200,
        height: 630,
        alt: "VelloEarn — Remote Tasks Platform in Kenya",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Earn from Remote Tasks in Kenya — M-Pesa Payouts | VelloEarn",
    description:
      "Get paid to chat with foreigners or train AI in Kenya. Free to join. Instant M-Pesa payouts.",
    images: [`${BASE_URL}/og-cover.png`], // ADDED
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
    sameAs: `${BASE_URL}`, // FIXED: Aligned corporate schema link to your www domain
    logo: `${BASE_URL}/logo.jpg`,
  },
  jobLocationType: "TELECOMMUTE",
  applicantLocationRequirements: {
    "@type": "Country",
    name: "Kenya",
  },
  employmentType: "PART_TIME",
  datePosted: new Date().toISOString().split("T")[0],
  validThrough: "2027-12-31", // ADDED: Suppresses GSC optimization warnings regarding missing expiration attributes
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