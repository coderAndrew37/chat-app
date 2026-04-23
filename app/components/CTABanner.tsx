"use client";

interface CTABannerProps {
  onApplyClick: () => void;
}

export default function CTABanner({ onApplyClick }: CTABannerProps) {
  return (
    <section className="py-20 bg-gradient-to-br from-rose-500 to-pink-600 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        <div className="text-5xl mb-5">💸</div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
          Your next M-Pesa notification could be from us.
        </h2>
        <p className="text-rose-100 text-lg mb-10 leading-relaxed max-w-xl mx-auto">
          Applications take 2 minutes. Activation happens on WhatsApp. You could be chatting — and earning — before the end of today.
        </p>
        <button
          onClick={onApplyClick}
          className="bg-white hover:bg-rose-50 text-rose-500 font-bold text-base px-10 py-4 rounded-full shadow-xl transition-all hover:scale-105 active:scale-95"
        >
          Apply to Join the Team →
        </button>
        <p className="text-rose-200 text-xs mt-5">
          Serious applicants only · Activation details shared privately via WhatsApp
        </p>
      </div>
    </section>
  );
}