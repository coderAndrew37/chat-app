"use client";

import Image from "next/image";
import { REQUIREMENTS } from "@/lib/constants";

const VELLOEARN_REGISTER_URL = "https://starhela.com/register?ref=velloearn";

interface RequirementsProps {
  onApply?: () => void; // Keep for backward compatibility
}

export default function Requirements({ onApply }: RequirementsProps) {
  return (
    <section className="relative py-16 sm:py-20 overflow-hidden rounded-2xl">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/background.jpg"
          alt="Background"
          fill
          priority
          className="object-cover"
          quality={90}
        />
        {/* Frosted overlay */}
        <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-12">
          <span className="text-rose-500 font-semibold text-sm uppercase tracking-wider bg-white/50 px-3 py-1 rounded-full inline-block">
            Who qualifies
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mt-3 mb-3">
            The bar is low. The results aren&apos;t.
          </h2>
          <p className="text-gray-700 text-sm sm:text-base">
            You don&apos;t need a degree, experience, or a laptop. Just these.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {REQUIREMENTS.map((req) => (
            <div
              key={req.text}
              className="flex items-center gap-4 bg-white/80 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/50 shadow-sm hover:shadow-md transition-shadow"
            >
              <span className="text-2xl sm:text-xl shrink-0">{req.icon}</span>
              <span className="text-gray-800 text-sm sm:text-base font-medium">{req.text}</span>
            </div>
          ))}
        </div>

        <div className="text-center mt-8 sm:mt-10">
          <a
            href={VELLOEARN_REGISTER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-rose-500 hover:bg-rose-600 text-white font-bold text-base px-8 py-4 rounded-full shadow-lg shadow-rose-200 transition-all hover:scale-105 active:scale-95"
          >
            I qualify — Apply Now →
          </a>
          <p className="text-gray-600 text-xs sm:text-sm mt-3">
            Free to join · No fees · Start earning today
          </p>
        </div>
      </div>
    </section>
  );
}