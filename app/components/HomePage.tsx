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
        {/* 1. Hero — platform statement, chat + AI training, funnel CTA */}
        <Hero />

        {/* 2. How it works — apply → pick method → earn to M-Pesa */}
        <HowItWorks />

        <LiveForeignersOnline />

        {/* 3. Earn methods — internal link hub for all 6 earning pages */}
        <EarnMethods />

        {/* 4. Trust — answers "is this a scam", specific facts and numbers */}
        <Trust />

        {/* 5. Testimonials — method-specific social proof */}
        <Testimonials />

        {/* 6. Final CTA banner */}
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