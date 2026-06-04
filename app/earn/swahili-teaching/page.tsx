import { Metadata } from "next";
import SwahiliClient from "./SwahiliTeachingClient";

export const metadata: Metadata = {
  title: "Teach Swahili Online | Earn KES 1,200+ Per Session | VelloEarn",
  description: "Turn your native Swahili fluency into an income stream. Connect with students from the US, UK, and China. Flexible hours, M-Pesa payouts.",
  openGraph: {
    title: "Teach Swahili & Earn with VelloEarn",
    description: "Your language is a global asset. Apply to become a Swahili tutor today and start earning from home.",
    images: [
      {
        url: "/og-teach-swahili.jpg",
        width: 1200,
        height: 630,
        alt: "Teach Swahili Online",
      },
    ],
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
      "sameAs": "https://velloearn.co.ke",
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