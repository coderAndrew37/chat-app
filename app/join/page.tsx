import type { Metadata } from "next";
import JoinPage from "./JoinPage";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://velloearn.co.ke";

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
  },
  twitter: {
    card: "summary_large_image",
    title: "Activate Your VelloEarn Account — Start Earning Today",
    description:
      "KES 550 setup. KES 200 back immediately. Dashboard live same day. Paid to M-Pesa.",
  },
  // Noindex this page from Google — it's a conversion page, not an SEO page.
  // You don't want "how much does VelloEarn activation cost" ranking here
  // and spoiling the conversion flow for warm leads.
  robots: {
    index: false,
    follow: true,
  },
};

export default function Page() {
  return <JoinPage />;
}