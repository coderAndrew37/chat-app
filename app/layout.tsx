import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LayoutClient from "./LayoutClient";
import { Suspense } from "react";

import Script from "next/script";
import MetaPixel from "./components/pixels/MetaPixel";
import TikTokPixel from "./components/pixels/TikTokPixel";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ─── SEO Metadata ─────────────────────────────────────────────────────────────

const BASE_URL = "https://velloearn.co.ke";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: "VelloEarn — Earn Money Online in Kenya | Remote Work, M-Pesa Payouts",
    template: "%s | VelloEarn",
  },

  description:
    "VelloEarn is Kenya's #1 remote earning platform. Get paid to chat, train AI, complete surveys, write, and trade forex — all from your phone. Instant M-Pesa payouts.",

  keywords: [
    "earn money online Kenya",
    "remote work Kenya",
    "mpesa earnings",
    "online jobs Kenya",
    "chat and earn Kenya",
    "academic writing jobs Kenya",
    "forex trading Kenya",
    "AI training jobs Kenya",
    "paid surveys Kenya",
    "work from phone Kenya",
    "VelloEarn",
  ],

  authors: [{ name: "VelloEarn" }],
  creator: "VelloEarn",
  publisher: "VelloEarn",

  openGraph: {
    type: "website",
    locale: "en_KE",
    url: BASE_URL,
    siteName: "VelloEarn",
    title: "VelloEarn — Earn Money Online in Kenya",
    description:
      "Get paid to chat, train AI, complete surveys, write, and trade forex. Instant M-Pesa payouts. Apply free today.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "VelloEarn — Kenya's remote earning platform",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "VelloEarn — Earn Money Online in Kenya",
    description:
      "Get paid to chat, train AI, complete surveys, write, and trade forex. Instant M-Pesa payouts.",
    images: ["/og-image.jpg"],
    site: "@VelloEarnke",
    creator: "@VelloEarnke",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    shortcut: "/favicon.ico",
  },

  manifest: "/site.webmanifest",

  alternates: {
    canonical: BASE_URL,
  },

  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

export const viewport: Viewport = {
  themeColor: "#f43f5e",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

// ─── Root Layout ──────────────────────────────────────────────────────────────

const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>

        {/* ── Google Ads global tag ───────────────────────────────────────── */}
        {GOOGLE_ADS_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-ads-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GOOGLE_ADS_ID}');
              `}
            </Script>
          </>
        )}

        {/* ── Meta + TikTok pixels ────────────────────────────────────────── */}
        {/* Suspense is required — both components use useSearchParams()      */}
        <Suspense fallback={null}>
          <MetaPixel />
          <TikTokPixel />
        </Suspense>

        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}