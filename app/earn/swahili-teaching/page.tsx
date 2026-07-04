// app/earn/swahili/page.tsx
import { Metadata } from "next";
import SwahiliClient from "./SwahiliTeachingClient";

// Resilient domain configuration checking across multiple environments
const BASE_URL = 
  process.env.NEXT_PUBLIC_SITE_URL || 
  process.env.NEXT_PUBLIC_BASE_URL || 
  "https://www.velloearn.co.ke";

export const metadata: Metadata = {
  title: "Teach Swahili Online | Earn KES 1,200+ Per Session | VelloEarn",
  description: 
    "Turn your native Swahili fluency into an income stream. Connect with students from the US, UK, and China. Flexible hours, M-Pesa payouts.",
  alternates: {
    // FIXED: Explicit canonical definition targeting this specific sub-path
    canonical: `${BASE_URL}/earn/swahili`,
  },
  openGraph: {
    title: "Teach Swahili & Earn with VelloEarn",
    description: "Your language is a global asset. Apply to become a Swahili tutor today and start earning from home.",
    url: `${BASE_URL}/earn/swahili`,
    siteName: "VelloEarn",
    type: "website",
    locale: "en_KE",
    images: [
      {
        url: `${BASE_URL}/og-cover.png`, // FIXED: Absolute path string prevents display drops
        width: 1200,
        height: 630,
        alt: "Teach Swahili Online Portal Cover",
      },
    ],
  },
  twitter: {
    // FIXED: Appended missing Twitter configuration object for native rendering
    card: "summary_large_image",
    title: "Teach Swahili & Earn with VelloEarn",
    description: "Your language is a global asset. Apply to become a Swahili tutor today and start earning from home.",
    images: [`${BASE_URL}/og-cover.png`],
  },
};

export default function SwahiliPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Swahili Instructional and Conversational Tutoring Program",
    "description": "Comprehensive pedagogical module detailing lesson planning, pronunciation grading, and remote student engagement strategies for Swahili speakers.",
    "provider": {
      "@type": "Organization",
      "name": "VelloEarn Kenya",
      "sameAs": BASE_URL,
      "logo": `${BASE_URL}/logo.jpg`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SwahiliClient />
    </>
  );
}