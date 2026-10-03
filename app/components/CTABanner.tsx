"use client";

import Link from "next/link";
import { VELLOEARN_REGISTER_URL } from "@/lib/constants";
import { ArrowRight, ShieldCheck, Zap, Smartphone } from "lucide-react";

export default function CTABanner() {
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-rose-500 via-rose-600 to-pink-600 relative overflow-hidden">
      {/* Background Decorative Circles */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none blur-sm" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-1/3 translate-y-1/3 pointer-events-none blur-sm" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Real-time Urgency Badge */}
        <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md text-white border border-white/20 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-6 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Active foreign clients online right now
        </div>

        {/* Primary Headline */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4 leading-tight">
          Start Chatting with Foreigners — <br className="hidden sm:inline" />
          Earn Daily M-Pesa Today.
        </h2>

        {/* Subtitle */}
        <p className="text-rose-100 text-base sm:text-lg mb-8 leading-relaxed max-w-xl mx-auto font-medium">
          Registration takes less than 2 minutes. No experience or registration fees needed. You could receive your first M-Pesa payout today.
        </p>

        {/* Primary CTA Link */}
        <div className="flex flex-col items-center">
          <Link
            href={VELLOEARN_REGISTER_URL}
            className="group inline-flex items-center justify-center gap-2 bg-white hover:bg-rose-50 text-rose-600 font-extrabold text-base sm:text-lg px-9 py-4 rounded-full shadow-2xl transition-all duration-200 hover:scale-105 active:scale-95"
          >
            <span>Start Chatting & Earning Now</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>

          {/* Micro Trust Indicators */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-rose-100 text-xs sm:text-sm font-medium">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-300" />
              <span>100% Free Registration</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Smartphone className="w-4 h-4 text-emerald-300" />
              <span>Direct M-Pesa Payouts</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-emerald-300" />
              <span>Instant Approval</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}