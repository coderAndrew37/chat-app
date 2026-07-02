"use client";

import { useState, type ReactNode } from "react";
import { Footer, Navbar, ApplicationModal } from "./components";
import { toast } from "sonner"; // Assuming you're using sonner for notifications
import WhatsAppWidget from "./components/WhatsappWidget";
import { whatsappNumber } from "@/lib/constants";
import AntiScrapeShield from "./components/AntiScrapeShield";
import DevToolsDefender from "./components/DevToolsDefender";

interface LayoutClientProps {
  children: ReactNode;
}

export default function LayoutClient({ children }: LayoutClientProps) {
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

  

  return (
    <>
      <Navbar  />

      <main>{children}</main>

      <Footer />
      <WhatsAppWidget whatsappNumber={whatsappNumber} />
      <AntiScrapeShield />
<DevToolsDefender />
      {isApplyModalOpen && (
        <ApplicationModal 
          onClose={() => setIsApplyModalOpen(false)} 
          track="General Application" 
        />
      )}
    </>
  );
}