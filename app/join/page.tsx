// app/join/page.tsx
import type { Metadata } from "next";
import JoinPage from "./JoinPage";

// Resilient double-check checking across variables, locked strictly onto the uniform www. host
const BASE_URL = 
  process.env.NEXT_PUBLIC_SITE_URL || 
  process.env.NEXT_PUBLIC_BASE_URL || 
  "https://www.velloearn.co.ke";

export const metadata: Metadata = {
  title: "Activate Your VelloEarn Account — KES 550 Setup · KES 200 Back | VelloEarn",
  description:
    "Start earning from remote tasks in Kenya today. KES 550 one-time account setup, KES 200 welcome bonus credited instantly. AI training, chatting, surveys and more — paid to M-Pesa.",
  alternates: {
    canonical: `${BASE_URL}/join`,
  },
  openGraph: {
    title: "Activate Your VelloEarn Account — Start Earning Today",
    description:
      "KES 550 setup. KES 200 back immediately. Dashboard with AI training, chatting, and survey tasks goes live the same day. Paid to M-Pesa.",
    type: "website",
    locale: "en_KE",
    siteName: "VelloEarn",
    url: `${BASE_URL}/join`,
    images: [
      {
        url: `${BASE_URL}/og-cover.png`, // FIXED: Absolute path string prevents fallback image drops
        width: 1200,
        height: 630,
        alt: "VelloEarn Secure Account Activation Portal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Activate Your VelloEarn Account — Start Earning Today",
    description:
      "KES 550 setup. KES 200 back immediately. Dashboard live same day. Paid to M-Pesa.",
    images: [`${BASE_URL}/og-cover.png`], // FIXED: Explicitly binds preview asset structures inside X
  },
  // CRITICAL PROTECTION: Intentionally blocks crawler indexing to avoid showing 
  // payment points within the organic Google Search landscape.
  robots: {
    index: false,
    follow: true,
    nocache: true, // ADDED: Prevents Google from displaying cached variants in search results
  },
};

export default function Page() {
  return <JoinPage />;
}