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
  return <SwahiliClient />;
}