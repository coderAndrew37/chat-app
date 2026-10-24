// app/page.tsx
import type { Metadata } from "next";
import { HomePageClient } from "./components";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.velloearn.co.ke";

export const metadata: Metadata = {
  title: "Get Paid to Review Hotels in Kenya | VelloEarn",
  description:
    "Review real hotels across Kenya and earn KES 250–800 per approved task. Free to join, paid instantly to M-Pesa. No experience needed.",
  keywords: [
    "get paid to review hotels Kenya",
    "hotel review jobs Kenya",
    "earn money reviewing hotels",
    "M-Pesa hotel review tasks",
    "remote review jobs Kenya",
    "online jobs Kenya",
    "side hustle Kenya 2026",
    "VelloEarn",
  ],
  alternates: { canonical: BASE_URL },
  openGraph: {
    title: "Get Paid to Review Hotels in Kenya | VelloEarn",
    description:
      "Review real hotels across Kenya and earn KES 250–800 per approved task. Paid instantly to M-Pesa.",
    url: BASE_URL,
    type: "website",
    locale: "en_KE",
    siteName: "VelloEarn",
    images: [
      {
        url: `${BASE_URL}/og-cover.png`,
        width: 1200,
        height: 630,
        alt: "VelloEarn — Hotel Review Tasks in Kenya",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Get Paid to Review Hotels in Kenya | VelloEarn",
    description:
      "Review real hotels across Kenya and earn KES 250–800 per approved task. Paid instantly to M-Pesa.",
    images: [`${BASE_URL}/og-cover.png`],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "JobPosting",
  title: "Hotel Review Specialist — Remote, Kenya",
  description:
    "Review hotels across Kenya for real payouts. Complete photo, text, or video review tasks and get paid to M-Pesa. No experience needed, free to join.",
  hiringOrganization: {
    "@type": "Organization",
    name: "VelloEarn",
    sameAs: BASE_URL,
    logo: `${BASE_URL}/logo.jpg`,
  },
  jobLocationType: "TELECOMMUTE",
  applicantLocationRequirements: {
    "@type": "Country",
    name: "Kenya",
  },
  employmentType: "PART_TIME",
  datePosted: new Date().toISOString().split("T")[0],
  validThrough: "2027-12-31",
  baseSalary: {
    "@type": "MonetaryAmount",
    currency: "KES",
    value: {
      "@type": "QuantitativeValue",
      minValue: 250,
      maxValue: 800,
      unitText: "TASK",
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