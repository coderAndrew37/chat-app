import type { Metadata } from "next";
import { HomePageClient } from "./components";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.velloearn.co.ke";

export const metadata: Metadata = {
  title: "VelloEarn | Get Paid to Chat with Foreigners & Review Hotels in Kenya",
  description:
    "Earn money online in Kenya by chatting with lonely foreigners or reviewing top hotels. Pick your track, complete tasks, and get paid instantly to M-Pesa. Free to join.",
  keywords: [
    "chat with foreigners and earn Kenya",
    "get paid to review hotels Kenya",
    "hotel review jobs Kenya",
    "online jobs Kenya M-Pesa",
    "remote work Kenya",
    "side hustle Kenya 2026",
    "VelloEarn",
  ],
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    title: "VelloEarn | Chat & Earn or Review Hotels",
    description:
      "Two ways to earn: Chat with foreigners or review hotels. Instant M-Pesa payouts. Free to join.",
    url: BASE_URL,
    type: "website",
    locale: "en_KE",
    siteName: "VelloEarn",
    images: [
      {
        url: `${BASE_URL}/og-cover.png`,
        width: 1200,
        height: 630,
        alt: "VelloEarn — Chat & Hotel Review Tasks",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VelloEarn | Chat & Earn or Review Hotels",
    description:
      "Two ways to earn: Chat with foreigners or review hotels. Instant M-Pesa payouts. Free to join.",
    images: [`${BASE_URL}/og-cover.png`],
  },
};

// Structured data now reflects both primary tracks
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "VelloEarn",
  url: BASE_URL,
  logo: `${BASE_URL}/logo.jpg`,
  description: "Kenya's remote task marketplace. Chat work and Hotel reviews paid instantly to M-Pesa.",
  offers: {
    "@type": "OfferCatalog",
    name: "Remote Earning Tracks",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Chat with Foreigners",
          description: "Chat with lonely foreigners from around the globe and get paid per conversation.",
          url: `${BASE_URL}/earn/chatting`,
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Hotel Reviews",
          description: "Review real hotels across Kenya. Earn KES 250–800 per approved review.",
          url: `${BASE_URL}/earn/hotel-reviews`,
        },
      },
    ],
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