import { Metadata } from "next";
import AITrainingClient from "./AITrainingClient";

export const metadata: Metadata = {
  title: "Earn Money Training AI Models in Kenya | VelloEarn",
  description: "Join the VelloEarn AI Training track. Help global companies improve AI by rating responses and rewriting text. Earn KES 80–400 per task with M-Pesa withdrawals.",
  openGraph: {
    title: "AI Training Jobs in Kenya - VelloEarn",
    description: "Get paid to train AI models. Work from your phone, anytime, anywhere.",
    images: ["/earn/ai-training-hero.jpg"],
  },
};

export default function AITrainingPage() {
  return <AITrainingClient />;
}