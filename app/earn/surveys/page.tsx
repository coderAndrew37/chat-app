import { Metadata } from "next";
import SurveysClient from "./SurveyClient";

export const metadata: Metadata = {
  title: "Paid Surveys & Market Research Kenya | VelloEarn",
  description: "Get paid for your opinion. Complete surveys, test products, and join focus groups for global brands. Earn KES 80 - 3,000+ per task with M-Pesa payouts.",
  openGraph: {
    title: "Earn with Surveys & Research | VelloEarn",
    description: "Your Kenyan perspective is valuable. Join our research track and get paid for your honest feedback.",
    images: [{ url: "/og-surveys.jpg", width: 1200, height: 630 }]
  }
};

export default function SurveysPage() {
  return <SurveysClient />;
}