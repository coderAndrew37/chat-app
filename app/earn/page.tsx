import type { Metadata } from "next";
import LandingInteractive from "@/app/components/LandingInteractive";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.NEXT_PUBLIC_BASE_URL ||
  "https://www.velloearn.co.ke";

export const metadata: Metadata = {
  title: "VelloEarn — Remote Tasks in Kenya: Hotel Reviews, AI Training & More",
  description:
    "Pick from six remote earning tracks — hotel reviews, AI training, chat work, surveys, and more. Every task shows its payout upfront. Instant M-Pesa payouts. Free to join.",
  keywords: [
    "remote tasks Kenya",
    "earn money online Kenya",
    "paid hotel reviews Kenya",
    "AI training jobs Kenya",
    "online jobs Kenya M-Pesa",
    "work from home Kenya",
    "side hustle Kenya",
    "task-based work Kenya",
    "VelloEarn",
  ],
  alternates: {
    canonical: `${BASE_URL}/earn`,
  },
  openGraph: {
    title: "VelloEarn — Remote Tasks in Kenya, Paid to M-Pesa",
    description:
      "Six tracks. One account. Hotel reviews, AI training, chat work, surveys. Every task shows its payout. Instant M-Pesa.",
    url: `${BASE_URL}/earn`,
    type: "website",
    locale: "en_KE",
    siteName: "VelloEarn",
    images: [
      {
        url: `${BASE_URL}/og-cover.png`,
        width: 1200,
        height: 630,
        alt: "VelloEarn — Remote Tasks Portal for Kenya",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VelloEarn — Remote Tasks in Kenya, Paid to M-Pesa",
    description:
      "Six tracks. One account. Every task shows its payout. Instant M-Pesa payouts. Free to join.",
    images: [`${BASE_URL}/og-cover.png`],
  },
};

// Structured data — positioned as a marketplace, not a single job
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "VelloEarn",
  url: BASE_URL,
  logo: `${BASE_URL}/logo.jpg`,
  description:
    "Kenya's remote task marketplace. Hotel reviews, AI training, chat work, and surveys — all paid to M-Pesa.",
  offers: {
    "@type": "OfferCatalog",
    name: "Remote Earning Tracks",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Hotel Review Tasks",
          description:
            "Complete paid reviews of real hotels across Kenya. Earn KES 250–800 per approved review.",
          url: `${BASE_URL}/earn/hotel-reviews`,
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "AI Training Tasks",
          description:
            "Rate AI responses, label data, and rewrite outputs. Earn per completed task.",
          url: `${BASE_URL}/earn/ai-training`,
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Remote Chat Work",
          description:
            "Customer support and moderation tasks for global brands. Flexible shifts.",
          url: `${BASE_URL}/earn/chatting`,
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Swahili Teaching",
          description:
            "Teach Swahili to international learners. Set your own hours.",
          url: `${BASE_URL}/earn/swahili-teaching`,
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Surveys & Research",
          description:
            "Paid surveys and product research tasks. Quick, consistent payouts.",
          url: `${BASE_URL}/earn/surveys`,
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Academic Writing",
          description:
            "Write essays and research papers for students. Flexible deadlines.",
          url: `${BASE_URL}/earn/academic-writing`,
        },
      },
    ],
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