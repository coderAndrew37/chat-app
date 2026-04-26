import { Metadata } from "next";
import ChattingClient from "./ChattingClient";

export const metadata: Metadata = {
  title: "Get Paid to Chat Online in Kenya | Remote Chatting Jobs | Chat254",
  description: "Work from your phone with Chat254. Earn KES 18,000 – 28,000+ per month handling customer support and community moderation chats. Flexible shifts, M-Pesa payments.",
  openGraph: {
    title: "Remote Chatting Jobs in Kenya - Chat254",
    description: "Real businesses need real humans to handle their conversations. Pick your shifts and get paid to chat.",
    images: ["/earn/chatting-hero.jpg"],
  },
};

export default function ChattingPage() {
  return <ChattingClient />;
}