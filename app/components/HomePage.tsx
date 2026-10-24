"use client";

import { Toaster } from "sonner";
import { Hero, HowItWorks, Features, CTABanner, Testimonials } from ".";
import HotelsGrid from "./HotelsGrid";

export default function HomePageClient() {
  return (
    <>
      <Toaster position="top-center" richColors />
      <main>
        {/* 1. Hero — clear value prop, direct CTA to hotels */}
        <Hero />

        {/* 2. Hotels grid — the core product, front and center */}
        <HotelsGrid />

        {/* 3. How it works — removes friction after they've seen the tasks */}
        <HowItWorks />

        {/* 4. Features — answers "is this legit / how does it pay" */}
        <Features />

        {/* 5. Testimonials — social proof before final CTA */}
        <Testimonials />

        {/* 6. Final CTA */}
        <CTABanner />
      </main>
    </>
  );
}