import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LayoutClient from "./LayoutClient";
import { Suspense } from "react";

import Script from "next/script";
import MetaPixel from "./components/pixels/MetaPixel";
import TikTokPixel from "./components/pixels/TikTokPixel";
import { BASE_URL } from "@/lib/config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ─── SEO Metadata ─────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: "VelloEarn — Chat with Foreigners & Earn M-Pesa Instantly in Kenya",

  description:
    "Chat with lonely foreigners and earn M-Pesa instantly. Free to join. No fees. 61,000+ active chatters. Start earning today from your phone.",

  keywords: [
    "chat and earn Kenya",
    "earn money chatting",
    "chat with foreigners",
    "mpesa earnings Kenya",
    "online chat jobs Kenya",
    "paid chat platforms Kenya",
    "remote chat jobs",
    "VelloEarn",
  ],

  authors: [{ name: "VelloEarn" }],
  creator: "VelloEarn",
  publisher: "VelloEarn",

  // ─── PWA specific metadata ───────────────────────────────────────────────
  applicationName: "VelloEarn",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "VelloEarn",
  },
  formatDetection: {
    telephone: true,
  },
  themeColor: "#f43f5e",

  openGraph: {
    type: "website",
    locale: "en_KE",
    url: BASE_URL,
    siteName: "VelloEarn",
    title: "VelloEarn — Chat with Foreigners & Earn M-Pesa",
    description:
      "Chat with lonely foreigners and earn M-Pesa instantly. Free to join. No fees. Start today.",
    images: [
      {
        url: "/og-cover.png",
        width: 1200,
        height: 630,
        alt: "VelloEarn — Chat & Earn in Kenya",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "VelloEarn — Chat with Foreigners & Earn M-Pesa",
    description:
      "Chat with lonely foreigners and earn M-Pesa instantly. Free to join. No fees.",
    images: ["/og-cover.png"],
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
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-384x384.png", sizes: "384x384", type: "image/png" },
      { url: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180" },
      { url: "/icons/icon-192x192.png", sizes: "192x192" },
      { url: "/icons/icon-384x384.png", sizes: "384x384" },
      { url: "/icons/icon-512x512.png", sizes: "512x512" },
    ],
    shortcut: "/favicon.ico",
  },

  manifest: "/site.webmanifest",

  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

export const viewport: Viewport = {
  themeColor: "#f43f5e",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

// ─── Root Layout ──────────────────────────────────────────────────────────────

const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const corporateJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${BASE_URL}/#website`,
        "url": BASE_URL,
        "name": "VelloEarn",
        "description": "Chat with lonely foreigners and earn M-Pesa instantly.",
        "publisher": { "@id": `${BASE_URL}/#organization` },
      },
      {
        "@type": "Organization",
        "@id": `${BASE_URL}/#organization`,
        "name": "VelloEarn",
        "url": BASE_URL,
        "logo": {
          "@type": "ImageObject",
          "url": `${BASE_URL}/logo.jpg`,
        },
        "sameAs": ["https://twitter.com/VelloEarnke"],
      },
    ],
  };

  return (
    <html lang="en">
      <head>
        {/* ─── PWA Meta Tags ────────────────────────────────────────────── */}
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#f43f5e" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Preload PWA assets */}
        <link rel="preload" href="/site.webmanifest" as="fetch" crossOrigin="anonymous" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(corporateJsonLd) }}
        />

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
        <Suspense fallback={null}>
          <MetaPixel />
          <TikTokPixel />
        </Suspense>

        {/* ── Ahrefs Web Analytics ────────────────── */}
        <Script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="oxt3DkRIHEroFVEUnKGCVQ"
          strategy="afterInteractive"
          async
        />

        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}