"use client";

import { useState } from "react";
import { Toaster } from "sonner";
import {
  ApplicationModal,
  CTABanner,
  Hero,
  HowItWorks,
  SuccessState,
  Testimonials,
} from ".";
import EarnMethods from "./EarnMethods";
import Trust from "./Trust";
import LiveForeignersOnline from "./LiveForeignersOnline";
import TrainingChannelBanner from "./TrainingChannelBanner";

interface ApplicationFormData {
  name: string;
  whatsapp: string;
}

export default function HomePageClient() {
  const [modalOpen, setModalOpen] = useState(false);
  const [successData, setSuccessData] = useState<ApplicationFormData | null>(null);

  return (
    <>
      <Toaster position="top-center" richColors />

      <main>
        {/* 1. Hero — Primary value proposition & primary signup action */}
        <Hero />

        {/* 2. Urgent Proof — Live active demand/clients online immediately builds belief */}
        <LiveForeignersOnline />

        {/* 3. Community / Low-Friction Engagement — Training channel link */}
        <TrainingChannelBanner />

        {/* 4. How It Works — Simple 3-step path to M-Pesa payouts */}
        <HowItWorks />

        {/* 5. Trust & Verification — Destroys scam anxiety with facts & numbers */}
        <Trust />

        {/* 6. Earn Methods — Catalog of all earning paths */}
        <EarnMethods />

        {/* 7. Social Proof — Real testimonials and verified payout stories */}
        <Testimonials />

        {/* 8. Final Conversion Push — High-contrast CTA Banner */}
        <CTABanner />
      </main>

      {modalOpen && (
        <ApplicationModal
          onClose={() => setModalOpen(false)}
          track="General Partner"
        />
      )}

      {successData && (
        <SuccessState
          data={successData}
          onClose={() => setSuccessData(null)}
        />
      )}
    </>
  );
}