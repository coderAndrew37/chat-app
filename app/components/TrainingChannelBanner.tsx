// app/components/TrainingChannelBanner.tsx
"use client";

import { useState, useEffect } from "react";
import { MessageCircle, Users, Zap, ChevronRight } from "lucide-react";

const WHATSAPP_CHANNEL_URL =
  "https://whatsapp.com/channel/0029Vb8Xwc2HgZWm3hqBeg2L";

export default function TrainingChannelBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Animate in after a short delay for scroll-based entrance
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#25D366] via-[#128C7E] to-[#075E54] p-[2px] shadow-2xl transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      {/* Inner content with glass effect */}
      <div className="relative rounded-2xl bg-gradient-to-br from-white/95 to-gray-50/95 backdrop-blur-sm p-5 sm:p-7 overflow-hidden">
        
        {/* Animated background blob */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#25D366]/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#128C7E]/10 rounded-full blur-3xl animate-pulse [animation-delay:1s]" />

        {/* Live indicator badge */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-[#25D366]/10 px-2.5 py-1 rounded-full border border-[#25D366]/20">
          <span className="w-1.5 h-1.5 bg-[#25D366] rounded-full animate-ping" />
          <span className="text-[10px] font-semibold text-[#128C7E] tracking-wider">LIVE</span>
        </div>

        <div className="relative flex flex-col sm:flex-row items-center justify-between gap-5">
          {/* Left side: Icon + Text */}
          <div className="flex items-center gap-4 w-full sm:w-auto">
            {/* Animated WhatsApp icon */}
            <div className="relative shrink-0">
              <div className="absolute inset-0 bg-[#25D366] rounded-full blur-md opacity-40 animate-pulse" />
              <div className="relative w-14 h-14 bg-gradient-to-br from-[#25D366] to-[#128C7E] rounded-2xl flex items-center justify-center shadow-lg shadow-[#25D366]/30 animate-bounce [animation-duration:2s]">
                <MessageCircle className="w-7 h-7 text-white fill-white/20" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#25D366] rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                <Users className="w-2.5 h-2.5 text-white" />
              </div>
            </div>

            <div>
              <h3 className="text-base sm:text-lg font-extrabold text-gray-900 leading-tight flex items-center gap-2">
                Join Our Training Channel
                <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-semibold bg-[#25D366]/10 text-[#128C7E] px-2 py-0.5 rounded-full border border-[#25D366]/20">
                  <Zap className="w-3 h-3 fill-[#128C7E]" />
                  2,400+ members
                </span>
              </h3>
              <p className="text-sm text-gray-500 mt-0.5 max-w-md">
                Get training updates, tips &amp; connect with other earners
              </p>
              <div className="flex items-center gap-3 mt-1 sm:hidden">
                <span className="text-[10px] font-semibold bg-[#25D366]/10 text-[#128C7E] px-2 py-0.5 rounded-full border border-[#25D366]/20">
                  <Zap className="w-3 h-3 inline fill-[#128C7E]" />
                  2,400+ members
                </span>
              </div>
            </div>
          </div>

          {/* Right side: CTA Button */}
          <a
            href={WHATSAPP_CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative shrink-0 w-full sm:w-auto overflow-hidden rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] px-6 py-3 text-white font-bold text-sm shadow-lg shadow-[#25D366]/25 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
          >
            <span className="relative z-10 flex items-center gap-2">
              Join Now
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </span>
            {/* Shimmer effect on hover */}
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </a>
        </div>

        {/* Subtle bottom border accent */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#25D366]/0 via-[#25D366] to-[#25D366]/0" />
      </div>
    </div>
  );
}