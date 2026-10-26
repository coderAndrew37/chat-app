"use client";

import { VELLOEARN_REGISTER_URL } from "@/lib/constants";
import { ArrowRight, CheckCircle2 } from "lucide-react";

type Choice = "hotels" | "chatting" | null;

export default function CTABanner({ choice }: { choice: Choice }) {
  const isChatting = choice === "chatting";

  // Dynamic Content
  const title = isChatting ? "Ready to start chatting?" : "Reviews are open right now.";
  const description = isChatting
    ? "Thousands of foreigners are online waiting for someone to talk to. Sign up free, pick a profile, and start earning M-Pesa today."
    : "New hotel tasks drop daily across Kenya. Sign up free, pick your first review, and get paid instantly to M-Pesa.";
  
  const buttonText = isChatting ? "Start Chatting Now" : "Start Reviewing Now";
  const badgeText = isChatting ? "💬 Live Chat Tasks" : "🏨 Live Hotel Tasks";
  const backgroundGradient = isChatting 
    ? "from-rose-600 via-rose-700 to-pink-800" 
    : "from-gray-900 via-gray-900 to-black";

  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      {/* Dynamic Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${backgroundGradient}`} />
      
      {/* Decorative Glow Effects */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl translate-x-1/3 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-6">
          
          {/* Text Content */}
          <div className="flex-1 text-center md:text-left">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-bold uppercase tracking-wider mb-6 backdrop-blur-sm border border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {badgeText}
            </span>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.1] mb-4">
              {title}
            </h2>
            
            <p className="text-white/70 text-base sm:text-lg max-w-xl mx-auto md:mx-0 leading-relaxed mb-8">
              {description}
            </p>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-6 gap-y-3 text-white/60 text-sm">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Free to join
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> No experience needed
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Instant M-Pesa
              </span>
            </div>
          </div>

          {/* CTA Action */}
          <div className="w-full md:w-auto shrink-0 flex flex-col items-center">
            {/* White glowing button */}
            <a
              href={VELLOEARN_REGISTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-2 w-full md:w-auto bg-white text-gray-900 font-extrabold text-lg px-8 py-4 sm:px-10 sm:py-5 rounded-full shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:shadow-[0_0_60px_rgba(255,255,255,0.4)] hover:scale-105 active:scale-95 transition-all duration-300"
            >
              {buttonText}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <p className="text-white/50 text-xs mt-4 text-center">
              Takes less than 2 minutes to apply
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}