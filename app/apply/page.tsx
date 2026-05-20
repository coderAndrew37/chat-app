"use client";

import { useState, use } from "react";
import Link from "next/link";
import ApplicationModal from "@/app/components/ApplicationModal";
import Requirements from "@/app/components/Requirements";
import { ApplicationFormData } from "@/types";

interface ApplyPageProps {
  searchParams: Promise<{ track?: string }>;
}

export default function ApplyPage({ searchParams }: ApplyPageProps) {
  // Unpack search parameters stream for Next.js 16+ compatibility
  const resolvedSearchParams = use(searchParams);
  
  // Resolve track parameter or fallback to standard track representation
  const rawTrack = resolvedSearchParams.track ?? "General Application";
  
  // Map simple slugs back to full display names matching your TRACK_ACCENT map
  const trackMap: Record<string, string> = {
    "chatting": "Remote Chatting",
    "surveys": "Surveys & Research",
    "ai-training": "AI Training",
    "academic-writing": "Academic Writing",
    "forex": "Forex Trading",
  };
  
  const selectedTrack = trackMap[rawTrack.toLowerCase()] ?? rawTrack;

  // Component UI state layers
  const [isOpen, setIsOpen] = useState(false);
  const [submittedData, setSubmittedData] = useState<ApplicationFormData | null>(null);

  const handleSuccess = (data: ApplicationFormData) => {
    setIsOpen(false);
    setSubmittedData(data);
  };

  // ─── Success Screen State Layout ───────────────────────────────────────────
  if (submittedData) {
    return (
      <main className="min-h-screen bg-[#0f1117] flex items-center justify-center px-4 py-12 relative overflow-hidden">
        {/* Decorative background ambient glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[350px] h-[350px] bg-rose-500/10 rounded-full filter blur-[80px] pointer-events-none" />
        
        <div className="max-w-md w-full text-center bg-gray-900/40 border border-white/5 rounded-[28px] p-8 backdrop-blur-xl relative z-10 shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-3xl flex items-center justify-center mx-auto mb-6 animate-bounce">
            ✓
          </div>
          
          <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">
            Application Received!
          </h1>
          <p className="text-sm text-gray-400 mb-6">
            Thanks <strong className="text-white">{submittedData.name}</strong>. Your profile for <span className="text-rose-400 font-semibold">{selectedTrack}</span> has been queued.
          </p>

          <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 text-left space-y-4 mb-8">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              Next Step: WhatsApp Activation
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              We have sent entry instructions to your phone number <strong className="text-white">{submittedData.whatsapp}</strong>. Please check your WhatsApp incoming requests within the next 24 hours to claim your dashboard activation.
            </p>
          </div>

          <Link
            href="/"
            className="block w-full text-center bg-white text-gray-900 font-bold py-4 rounded-xl shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Return to Homepage
          </Link>
        </div>
      </main>
    );
  }

  // ─── Regular Static Requirements Page Layout ──────────────────────────────
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col justify-center">
      {/* Dynamic contextual banner helper based on current path scope */}
      <div className="bg-rose-500 py-3 text-center text-white text-xs font-semibold px-4 tracking-wide shadow-inner">
        🔥 Currently accepting applications for {selectedTrack} team openings.
      </div>

      <Requirements onApply={() => setIsOpen(true)} />

      {isOpen && (
        <ApplicationModal
          track={selectedTrack}
          onClose={() => setIsOpen(false)}
          onSuccess={handleSuccess}
        />
      )}
    </main>
  );
}