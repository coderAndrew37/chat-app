"use client";

import Image from "next/image";
import { REQUIREMENTS } from "@/lib/constants";

interface RequirementsProps {
  onApply: () => void;
}

export default function Requirements({ onApply }: RequirementsProps) {
  return (
    <section className="relative py-20 overflow-hidden">
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
        <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="text-rose-500 font-semibold text-sm uppercase tracking-wider">
            Who qualifies
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2 mb-3">
            The bar is low. The results aren&apos;t.
          </h2>
          <p className="text-gray-600">
            You don&apos;t need a degree, experience, or a laptop. Just these.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {REQUIREMENTS.map((req) => (
            <div
              key={req.text}
              className="flex items-center gap-4 bg-white/70 backdrop-blur-md rounded-2xl p-5 border border-white/50 shadow-sm"
            >
              <span className="text-xl shrink-0">{req.icon}</span>
              <span className="text-gray-700 text-sm font-medium">{req.text}</span>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <button
            onClick={onApply}
            className="bg-rose-500 hover:bg-rose-600 text-white font-bold text-base px-8 py-4 rounded-full shadow-lg shadow-rose-200 transition-all hover:scale-105 active:scale-95"
          >
            I qualify — Apply now
          </button>
        </div>
      </div>
    </section>
  );
}