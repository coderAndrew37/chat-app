// app/earn/swahili-teaching/page.tsx
import { Metadata } from "next";
import SwahiliClient from "./SwahiliTeachingClient";
import { BASE_URL } from "@/lib/config";

const EXPLICIT_PATH = "/earn/swahili-teaching";

export const metadata: Metadata = {
  title: "Teach Swahili Online | Earn KES 1,200+ Per Session | VelloEarn",
  description: 
    "Turn your native Swahili fluency into an income stream. Connect with students from the US, UK, and China. Flexible hours, M-Pesa payouts.",
  alternates: {
    canonical: `${BASE_URL}${EXPLICIT_PATH}`,
  },
  openGraph: {
    title: "Teach Swahili & Earn with VelloEarn",
    description: "Your language is a global asset. Apply to become a Swahili tutor today and start earning from home.",
    url: `${BASE_URL}${EXPLICIT_PATH}`,
    siteName: "VelloEarn",
    type: "website",
    locale: "en_KE",
    images: [
      {
        url: `${BASE_URL}/og-cover.png`,
        width: 1200,
        height: 630,
        alt: "Teach Swahili Online Portal Cover",
      },
    ],
  },
  twitter: {
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
    // FIXED: Adding explicit asset contextual URL ties the course definition to this exact path profile
    "url": `${BASE_URL}${EXPLICIT_PATH}`,
    "name": "Teach Swahili Online Program",
    "description": "Structured Swahili language teaching program designed for online tutor onboarding and learner engagement.",
    "provider": {
      "@type": "Organization",
      "name": "VelloEarn",
      "sameAs": `${BASE_URL}`,
      "logo": `${BASE_URL}/logo.jpg`
    },
    "hasCourseInstance": {
      "@type": "CourseInstance",
      "courseMode": "online",
      "courseWorkload": "PT12H" 
    }
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