"use client";

import { useState, type ReactNode, useEffect } from "react";
import { Footer, Navbar, ApplicationModal } from "./components";
import { toast } from "sonner";
import WhatsAppWidget from "./components/WhatsappWidget";
import { whatsappNumber } from "@/lib/constants";
import AntiScrapeShield from "./components/AntiScrapeShield";
import DevToolsDefender from "./components/DevToolsDefender";
import InstallPrompt from "./components/InstallPrompt";
import PWARegister from "./components/PWARegister";

interface LayoutClientProps {
  children: ReactNode;
}

export default function LayoutClient({ children }: LayoutClientProps) {
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

  useEffect(() => {
    // PWA install event listener
    if (typeof window !== "undefined") {
      window.addEventListener("beforeinstallprompt", (e) => {
        // @ts-ignore
        window.deferredPrompt = e;
        console.log("PWA install prompt ready");
      });

      window.addEventListener("appinstalled", () => {
        console.log("PWA installed successfully");
        // @ts-ignore
        window.deferredPrompt = null;
        toast.success("VelloEarn installed successfully! 🎉");
      });
    }
  }, []);

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <WhatsAppWidget whatsappNumber={whatsappNumber} />
      <AntiScrapeShield />
      <DevToolsDefender />
      <InstallPrompt />
      <PWARegister />

      {isApplyModalOpen && (
        <ApplicationModal
          onClose={() => setIsApplyModalOpen(false)}
          track="General Application"
        />
      )}
    </>
  );
}