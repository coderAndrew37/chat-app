import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LayoutClient from "./LayoutClient";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ─── SEO Metadata ─────────────────────────────────────────────────────────────

const BASE_URL = "https://chat254.co.ke"; // 🔁 update to your actual domain

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: "Chat254 — Earn Money Online in Kenya | Remote Work, M-Pesa Payouts",
    template: "%s | Chat254",
  },

  description:
    "Chat254 is Kenya's #1 remote earning platform. Get paid to chat, train AI, teach Swahili, and complete surveys — all from your phone. Instant M-Pesa payouts.",

  keywords: [
    "earn money online Kenya",
    "remote work Kenya",
    "mpesa earnings",
    "online jobs Kenya",
    "chat and earn Kenya",
    "teach Swahili online",
    "AI training jobs Kenya",
    "paid surveys Kenya",
    "work from phone Kenya",
    "Chat254",
  ],

  authors: [{ name: "Chat254" }],
  creator: "Chat254",
  publisher: "Chat254",

  // ── Open Graph ──────────────────────────────────────────────────────────────
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: BASE_URL,
    siteName: "Chat254",
    title: "Chat254 — Earn Money Online in Kenya",
    description:
      "Get paid to chat, train AI, teach Swahili, and complete surveys. Instant M-Pesa payouts. Apply free today.",
    images: [
      {
        url: "/og-image.jpg",      // place a 1200×630 image at /public/og-image.jpg
        width: 1200,
        height: 630,
        alt: "Chat254 — Kenya's remote earning platform",
      },
    ],
  },

  // ── Twitter / X card ────────────────────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    title: "Chat254 — Earn Money Online in Kenya",
    description:
      "Get paid to chat, train AI, teach Swahili, and complete surveys. Instant M-Pesa payouts.",
    images: ["/og-image.jpg"],
    site: "@chat254ke",       // 🔁 update to your Twitter handle if you have one
    creator: "@chat254ke",
  },

  // ── Robots ──────────────────────────────────────────────────────────────────
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

  // ── Icons ───────────────────────────────────────────────────────────────────
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    shortcut: "/favicon.ico",
  },

  // ── Manifest (PWA) ──────────────────────────────────────────────────────────
  manifest: "/site.webmanifest",

  // ── Canonical ───────────────────────────────────────────────────────────────
  alternates: {
    canonical: BASE_URL,
  },

  // ── Verification (add your codes when ready) ─────────────────────────────
  // verification: {
  //   google: "your-google-search-console-code",
  // },
};

export const viewport: Viewport = {
  themeColor: "#f43f5e",           // rose-500 — matches brand
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

// ─── Root Layout ──────────────────────────────────────────────────────────────

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}