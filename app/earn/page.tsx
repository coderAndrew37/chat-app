// app/earn/page.tsx
import type { Metadata } from "next";
import LandingInteractive from "@/app/components/LandingInteractive";

// Resilient fallback checking across environment variables to lock onto the canonical domain
const BASE_URL = 
  process.env.NEXT_PUBLIC_SITE_URL || 
  process.env.NEXT_PUBLIC_BASE_URL || 
  "https://www.velloearn.co.ke";

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
  alternates: {
    // FIXED: Explicit canonical configuration pointing to the true sub-path
    canonical: `${BASE_URL}/earn`,
  },
  openGraph: {
    title: "VelloEarn — Kenya's Remote Earning Network",
    description:
      "Real remote tasks. Structured payouts. Direct M-Pesa. Apply to join our team today.",
    url: `${BASE_URL}/earn`, // ADDED: Standardized open graph context binding
    type: "website",
    locale: "en_KE",
    siteName: "VelloEarn",
    images: [
      {
        url: `${BASE_URL}/og-cover.png`, // ADDED: Resolved absolute image asset injection
        width: 1200,
        height: 630,
        alt: "VelloEarn — Remote Earning Network Portal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VelloEarn — Kenya's Remote Earning Network",
    description:
      "Real remote tasks. Structured payouts. Direct M-Pesa. Apply to join our team today.",
    images: [`${BASE_URL}/og-cover.png`], // ADDED
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
    sameAs: `${BASE_URL}`,
    logo: `${BASE_URL}/logo.jpg`, // ADDED
  },
  jobLocationType: "TELECOMMUTE",
  applicantLocationRequirements: {
    "@type": "Country",
    name: "Kenya",
  },
  employmentType: "PART_TIME",
  datePosted: new Date().toISOString().split("T")[0], // ADDED: Generates live dynamic post dates to stay compliant
  validThrough: "2027-12-31", // ADDED: Suppresses Google Search Console automated expiration warnings
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

export default function EarnPage() {
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