"use client";

import { STATS } from "@/data";
import type { Stat } from "@/types";

interface HeroProps {
  onRegisterClick: () => void;
}

function StatCard({ stat }: { stat: Stat }) {
  return (
    <div className="text-center">
      <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
      <div className="text-sm text-gray-500 mt-0.5">{stat.label}</div>
    </div>
  );
}

export default function Hero({ onRegisterClick }: HeroProps) {
  return (
    <section className="pt-24 pb-16 bg-gradient-to-br from-rose-50 via-white to-pink-50 relative overflow-hidden">
      {/* Background decorative blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-rose-200/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-pink-200/30 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-rose-100 text-rose-600 text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
            <span>🇰🇪</span>
            Kenya&apos;s #1 Dating App
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight mb-6">
            Meet Hot Singles.{" "}
            <span className="text-rose-500">Chat &amp; Earn.</span>
          </h1>

          {/* Sub-headline */}
          <p className="text-lg sm:text-xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">
            Thousands of beautiful women waiting to connect. Browse real
            profiles, start chatting, and earn rewards.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
            <button
              onClick={onRegisterClick}
              className="bg-rose-500 hover:bg-rose-600 text-white font-bold text-base px-8 py-4 rounded-full shadow-lg shadow-rose-200 transition-all hover:scale-105 active:scale-95"
            >
              Start Matching Free
            </button>
            <a
              href="#profiles"
              className="bg-white hover:bg-gray-50 text-gray-700 font-semibold text-base px-8 py-4 rounded-full border border-gray-200 shadow-sm transition-all hover:scale-105 active:scale-95"
            >
              Browse Profiles
            </a>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center gap-10 sm:gap-16 border-t border-gray-100 pt-8">
            {STATS.map((stat) => (
              <StatCard key={stat.label} stat={stat} />
            ))}
          </div>
        </div>

        {/* App download banner */}
        <div className="mt-12 flex justify-center">
          <a
            href="/download"
            className="inline-flex items-center gap-4 bg-white border border-gray-200 rounded-2xl px-6 py-4 shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="w-12 h-12 rounded-xl bg-rose-500 flex items-center justify-center text-white text-xl">
              💬
            </div>
            <div className="text-left">
              <div className="text-xs text-gray-400 font-medium">
                📲 Available Now
              </div>
              <div className="text-sm font-bold text-gray-800">
                Get the Chat254 App
              </div>
              <div className="text-xs text-gray-400">
                ⭐ 4.8 · 61K+ users · Free
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
