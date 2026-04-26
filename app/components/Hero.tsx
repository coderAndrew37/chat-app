"use client";

import { STATS } from "@/data";
import { whatsappNumber } from "@/lib/constants";
import type { Stat } from "@/types";

interface HeroProps {
  onApplyClick: () => void;
}

function StatCard({ stat }: { stat: Stat }) {
  return (
    <div className="text-center">
      <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
      <div className="text-sm text-gray-500 mt-0.5">{stat.label}</div>
    </div>
  );
}

export default function Hero({ onApplyClick }: HeroProps) {
  return (
    <section className="pt-24 pb-16 bg-gradient-to-br from-rose-50 via-white to-pink-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-rose-200/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-pink-200/30 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto">

          {/* Live badge */}
          <div className="inline-flex items-center gap-2 bg-white border border-gray-100 shadow-sm text-gray-700 text-sm font-medium px-4 py-1.5 rounded-full mb-7">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            People online now — waiting to chat
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight mb-6">
            Chat with lonely souls.{" "}
            <span className="text-rose-500">Get paid for it.</span>
          </h1>

          {/* Sub-headline */}
          <p className="text-lg sm:text-xl text-gray-500 mb-4 max-w-2xl mx-auto leading-relaxed">
            Real people. Real conversations. Maybe even find someone to hook up
            with — and earn M-Pesa while you&apos;re at it.
          </p>
          <p className="text-base text-gray-400 mb-10 max-w-xl mx-auto">
            Join Kenya&apos;s most interesting remote earning network. The work
            is just talking to people.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
            <button
              onClick={onApplyClick}
              className="bg-rose-500 hover:bg-rose-600 text-white font-bold text-base px-8 py-4 rounded-full shadow-lg shadow-rose-200 transition-all hover:scale-105 active:scale-95"
            >
              Apply to Join the Team
            </button>
            <a
              href="#waiting"
              className="bg-white hover:bg-gray-50 text-gray-700 font-semibold text-base px-8 py-4 rounded-full border border-gray-200 shadow-sm transition-all hover:scale-105 active:scale-95"
            >
              See who&apos;s waiting
            </a>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center gap-10 sm:gap-16 border-t border-gray-100 pt-8">
            {STATS.map((stat) => (
              <StatCard key={stat.label} stat={stat} />
            ))}
          </div>
        </div>

        {/* App download strip */}
        <div className="mt-12 flex justify-center">
          <a
          // link to whatsapp
            href={`https://wa.me/${whatsappNumber}?text=Hi%2C%20I%27d%20like%20to%20apply%20to%20join%20the%20velloearn%20team.`}
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
                Get the VelloEarn App
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