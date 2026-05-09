"use client";

import Image from "next/image";
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

// Real lifestyle shots — people on phones, relaxed, Kenyan context
const LIFESTYLE_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=600&fit=crop&crop=face",
    alt: "Young woman smiling at phone",
  },
  {
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=face",
    alt: "Man relaxing with phone",
  },
  {
    src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=600&fit=crop&crop=face",
    alt: "Woman happy on phone",
  },
];

export default function Hero({ onApplyClick }: HeroProps) {
  return (
    <section className="pt-24 pb-16 bg-gradient-to-br from-rose-50 via-white to-pink-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-rose-200/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-pink-200/30 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── Left: copy ── */}
          <div className="text-center lg:text-left">
            {/* Live badge */}
            <div className="inline-flex items-center gap-2 bg-white border border-gray-100 shadow-sm text-gray-700 text-sm font-medium px-4 py-1.5 rounded-full mb-7">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              People online now — waiting to chat
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight mb-6">
              Chat with lonely souls.{" "}
              <span className="text-rose-500">Get paid for it.</span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-500 mb-4 max-w-xl leading-relaxed">
              Real people. Real conversations. Maybe even find someone to hook up
              with — and earn M-Pesa while you&apos;re at it.
            </p>
            <p className="text-base text-gray-400 mb-10 max-w-lg">
              Join Kenya&apos;s most interesting remote earning network. The work
              is just talking to people.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
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
            <div className="flex items-center gap-10 justify-center lg:justify-start border-t border-gray-100 pt-8">
              {STATS.map((stat) => (
                <StatCard key={stat.label} stat={stat} />
              ))}
            </div>
          </div>

          {/* ── Right: image collage ── */}
          <div className="relative hidden lg:flex items-end justify-center gap-4 h-[480px]">
            {/* Tall center image */}
            <div className="relative w-48 h-[420px] rounded-3xl overflow-hidden shadow-2xl shadow-rose-100 self-end">
              <Image
                src={LIFESTYLE_IMAGES[0].src}
                alt={LIFESTYLE_IMAGES[0].alt}
                fill
                className="object-cover"
                sizes="192px"
                priority
              />
              {/* M-Pesa notification overlay */}
              <div className="absolute bottom-4 left-3 right-3 bg-white/95 backdrop-blur-sm rounded-xl px-3 py-2.5 shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-emerald-500 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-white text-xs font-bold">M</span>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-900">M-Pesa</div>
                    <div className="text-xs text-emerald-600 font-semibold">+KES 2,400 received</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Left image — shorter, offset up */}
            <div className="relative w-40 h-64 rounded-3xl overflow-hidden shadow-xl shadow-rose-100 mb-16">
              <Image
                src={LIFESTYLE_IMAGES[1].src}
                alt={LIFESTYLE_IMAGES[1].alt}
                fill
                className="object-cover"
                sizes="160px"
              />
              {/* Online pill */}
              <div className="absolute top-3 left-3">
                <span className="flex items-center gap-1.5 bg-green-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                  Online
                </span>
              </div>
            </div>

            {/* Right image — medium, floating card */}
            <div className="relative w-40 h-52 rounded-3xl overflow-hidden shadow-xl shadow-pink-100 mb-8">
              <Image
                src={LIFESTYLE_IMAGES[2].src}
                alt={LIFESTYLE_IMAGES[2].alt}
                fill
                className="object-cover"
                sizes="160px"
              />
            </div>

            {/* Floating earnings card */}
            <div className="absolute top-6 right-0 bg-white rounded-2xl p-4 shadow-xl border border-gray-100 w-44">
              <div className="text-xs text-gray-500 mb-1">This week</div>
              <div className="text-xl font-extrabold text-gray-900">KES 8,750</div>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-emerald-500 text-xs font-semibold">↑ 23%</span>
                <span className="text-xs text-gray-400">vs last week</span>
              </div>
              <div className="mt-3 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full w-3/4 bg-rose-400 rounded-full" />
              </div>
            </div>

            {/* Floating member count */}
            <div className="absolute bottom-20 -left-4 bg-white rounded-2xl px-4 py-3 shadow-xl border border-gray-100">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {["WM", "BK", "AO"].map((i) => (
                    <div key={i} className="w-7 h-7 rounded-full bg-rose-100 border-2 border-white text-rose-600 text-xs font-bold flex items-center justify-center">
                      {i[0]}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-900">+247 joined</div>
                  <div className="text-xs text-gray-400">this month</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* App download strip — full width below grid */}
        <div className="mt-14 flex justify-center">
          <a
            href={`https://wa.me/${whatsappNumber}?text=Hi%2C%20I%27d%20like%20to%20apply%20to%20join%20the%20VelloEarn%20team.`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-4 bg-white border border-gray-200 rounded-2xl px-6 py-4 shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="w-12 h-12 rounded-xl bg-rose-500 flex items-center justify-center text-white text-xl">
              💬
            </div>
            <div className="text-left">
              <div className="text-xs text-gray-400 font-medium">📲 Available Now</div>
              <div className="text-sm font-bold text-gray-800">Get the VelloEarn App</div>
              <div className="text-xs text-gray-400">⭐ 4.8 · 61K+ users · Free</div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}