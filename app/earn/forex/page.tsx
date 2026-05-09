import { Metadata } from "next";
import ForexClient from "./page.client";

export const metadata: Metadata = {
  title: "Learn Forex Trading in Kenya & Earn | VelloEarn",
  description:
    "Get structured forex training, funded account access, and a community of Kenyan traders. Learn to trade USD/KES, gold, and major pairs. Withdraw profits via M-Pesa.",
  openGraph: {
    title: "Forex Trading in Kenya - VelloEarn",
    description:
      "Stop watching other people trade. Get trained, get funded, and start earning from the markets.",
    images: ["/earn/forex-hero.jpg"],
  },
};

export default function ForexPage() {
  return <ForexClient />;
}