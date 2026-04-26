"use client";

import { whatsappNumber } from "@/lib/constants";
import { ApplicationFormData } from "@/types";

interface SuccessStateProps {
  data: ApplicationFormData;
  onClose: () => void;
}

export default function SuccessState({ data, onClose }: SuccessStateProps) {
  const firstName = data.name.trim().split(" ")[0];

  const message = encodeURIComponent(
    `Hi! My name is ${data.name} and I just applied to join the team. ` +
    `My WhatsApp is ${data.whatsapp}. ` +
    `I'd like to confirm my application and receive my activation instructions.`
  );

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ background: "rgba(0,0,0,0.55)" }}
    >
      <div className="bg-white w-full sm:max-w-md sm:rounded-3xl rounded-t-3xl p-6 sm:p-8 shadow-2xl text-center">
        {/* Check icon */}
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-5">
          <svg className="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h2 className="text-xl font-extrabold text-gray-900 mb-2">
          Application received, {firstName}!
        </h2>
        <p className="text-gray-500 text-sm leading-relaxed mb-7">
          We&apos;re reviewing your profile now. To confirm your spot and get
          your activation instructions, tap below to message our team on
          WhatsApp.
        </p>

        {/* WhatsApp CTA */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-base py-4 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-green-200 mb-3"
        >
          Confirm on WhatsApp
        </a>

        <button
          onClick={onClose}
          className="text-sm text-gray-400 hover:text-gray-600 transition"
        >
          I&apos;ll do this later
        </button>
      </div>
    </div>
  );
}