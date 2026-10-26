"use client";

import { useState } from "react";
import { Toaster } from "sonner";
import { Hero, HowItWorks, CTABanner } from ".";
import HotelsGrid from "./HotelsGrid";
import ChattingGrid from "./ChattingGrid";
import DiscoveryGateway from "./DiscoveryGateway";
import Features from "./Features";
import Testimonials from "./Testimonials";

type Choice = "hotels" | "chatting" | null;

// 1. Safely read from sessionStorage. If on server, return fallback.
function getStoredChoice(): Choice {
  if (typeof window === "undefined") return null;
  return (sessionStorage.getItem("vello_home_choice") as Choice) || null;
}

function getShouldShowGateway(): boolean {
  if (typeof window === "undefined") return false;
  
  const isReturning = sessionStorage.getItem("vello_returning_to_home");
  const savedChoice = sessionStorage.getItem("vello_home_choice");
  
  if (isReturning === "true") return false;
  return !savedChoice;
}

export default function HomePageClient() {
  // 2. Lazy initialize state directly from the functions above.
  // This runs exactly once on the client during the first render.
  const [choice, setChoice] = useState<Choice>(getStoredChoice);
  const [gatewayOpen, setGatewayOpen] = useState<boolean>(getShouldShowGateway);

  const handleChoice = (newChoice: Choice) => {
    const finalChoice = newChoice || "hotels";
    setChoice(finalChoice);
    setGatewayOpen(false);
    sessionStorage.setItem("vello_home_choice", finalChoice);
  };

  // 3. Clean up the "returning" flag right before the gateway would render.
  // We can do this safely here because it's not setting state.
  if (typeof window !== "undefined") {
    sessionStorage.removeItem("vello_returning_to_home");
  }

  return (
    <>
      <Toaster position="top-center" richColors />
      
      <DiscoveryGateway isOpen={gatewayOpen} onChoice={handleChoice} />

      <main>
        <Hero choice={choice} />

        {choice === "hotels" && (
          <>
            <HotelsGrid />
            <HowItWorks choice={choice} />
            <Features choice={choice} />
            <Testimonials />
          </>
        )}

        {choice === "chatting" && (
          <>
            <ChattingGrid />
            <HowItWorks choice={choice} />
            <Features choice={choice} />
            <Testimonials />
          </>
        )}

        <CTABanner />
      </main>
    </>
  );
}