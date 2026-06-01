"use client";

import { useState } from "react";
import { Toaster } from "sonner";
import {
  ApplicationModal,
  CTABanner,
  Features,
  Hero,
  HowItWorks,
  ProfilesGrid,
  SuccessState,
  Testimonials
} from ".";
import { whatsappNumber } from "@/lib/constants";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ApplicationFormData {
  name: string;
  whatsapp: string;
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePageClient() {
  const [modalOpen, setModalOpen] = useState(false);
  const [successData, setSuccessData] = useState<ApplicationFormData | null>(null);

  const openApply = () => setModalOpen(true);

  const handleSuccess = (data: ApplicationFormData) => {
    setModalOpen(false);
    setSuccessData(data);
  };

  return (
    <>
      <Toaster position="top-center" richColors />

      <main>
        {/* 1. Hero — "Chat with lonely souls. Get paid for it." */}
        <Hero onApplyClick={openApply} />

        {/* 2. Profiles grid — social proof, locked preview */}
        <ProfilesGrid onApplyClick={openApply} />

        {/* 3. How it works — apply → WhatsApp → earn */}
        <HowItWorks />

        {/* 4. Features — why it works + earn page bridge */}
        <Features />

        {/* 5. Testimonials — lifestyle proof */}
        <Testimonials />

        {/* 6. Final CTA banner */}
        <CTABanner onApplyClick={openApply} />
      </main>

      {/* Application modal */}
      {modalOpen && (
        <ApplicationModal
          onClose={() => setModalOpen(false)}
          track="General Partner"
        />
      )}

      {/* WhatsApp success state */}
      {successData && (
        <SuccessState
          data={successData}
          onClose={() => setSuccessData(null)}
        />
      )}

    </>
  );
}