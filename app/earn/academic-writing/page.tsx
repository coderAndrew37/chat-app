import { Metadata } from "next";
import AcademicWritingClient from "./page.client";

export const metadata: Metadata = {
  title: "Earn Money as a Freelance Academic Writer in Kenya | VelloEarn",
  description:
    "Turn your degree into income. Write essays, research papers, and dissertations for students worldwide. Earn KES 20,000 – 60,000+ per month with M-Pesa payouts.",
  openGraph: {
    title: "Academic Writing Jobs in Kenya - VelloEarn",
    description:
      "Your education is worth money. Join our academic writing track and get paid to write.",
    images: ["/earn/academic-writing-hero.jpg"],
  },
};

export default function AcademicWritingPage() {
  return <AcademicWritingClient />;
}