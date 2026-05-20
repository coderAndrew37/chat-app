"use client";

// app/components/ApplyButton.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Thin client wrapper that opens the ApplicationModal with the correct `track`.
// Used on every SSR page (country, city, job×country) so those pages stay
// server-rendered while this single island handles the modal state.
//
// Usage:
//   <ApplyButton track="Remote Chatting" label="Apply for Chatting Jobs →" />
//   <ApplyButton track="AI Training"     label="Start AI Training" className="..." />

import { useState } from "react";
import ApplicationModal from "@/app/components/ApplicationModal";
import SuccessState     from "@/app/components/SuccessState";
import { ApplicationFormData } from "@/types";

interface ApplyButtonProps {
  track:      string;
  label:      string;
  className?: string;
}

export default function ApplyButton({ track, label, className }: ApplyButtonProps) {
  const [modalOpen,   setModalOpen]   = useState(false);
  const [successData, setSuccessData] = useState<ApplicationFormData | null>(null);

  const defaultClass =
    "bg-rose-500 hover:bg-rose-600 text-white font-bold text-base px-8 py-4 rounded-full shadow-lg shadow-rose-200 transition-all hover:scale-105 active:scale-95";

  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        className={className ?? defaultClass}
      >
        {label}
      </button>

      {modalOpen && (
        <ApplicationModal
          track={track}
          onClose={() => setModalOpen(false)}
          onSuccess={(data) => {
            setModalOpen(false);
            setSuccessData(data);
          }}
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