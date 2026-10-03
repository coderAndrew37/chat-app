"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Star, CheckCircle, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import Link from "next/link";
import { VELLOEARN_REGISTER_URL } from "@/lib/constants";

interface TestimonialItem {
  id: string;
  avatar: string;
  name: string;
  location: string;
  quote: string;
  lifestyle: string;
  earned: string;
  date: string;
}

const unsplash = (photoId: string) =>
  `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=150&h=150&q=80`;

const TESTIMONIALS: TestimonialItem[] = [
  {
    id: "1",
    avatar: unsplash("photo-1534528741775-53994a69daeb"),
    name: "Wanjiru M.",
    location: "Nairobi, Westlands",
    quote:
      "I paid my kids' school fees this term entirely from what I make here. Nobody knows I'm working — I just look like I'm on my phone.",
    lifestyle: "School fees covered",
    earned: "KES 18,400 / mo",
    date: "Verified payout 2 days ago",
  },
  {
    id: "2",
    avatar: unsplash("photo-1507003211169-0a1dd7228f2d"),
    name: "Brian K.",
    location: "Mombasa",
    quote:
      "I booked a Diani trip last month and didn't stress about the cost once. This has changed the way I move through life, for real.",
    lifestyle: "Coastal holiday, zero stress",
    earned: "KES 24,000 / mo",
    date: "Verified payout 1 day ago",
  },
  {
    id: "3",
    avatar: unsplash("photo-1573496359142-b8d87734a5a2"),
    name: "Akinyi O.",
    location: "Kisumu",
    quote:
      "My campus friends kept asking how I'm always sorted. I just smile. The M-Pesa notifications come in while I'm out with them.",
    lifestyle: "Always sorted at campus",
    earned: "KES 11,200 / mo",
    date: "Verified payout 4 hours ago",
  },
  {
    id: "4",
    avatar: unsplash("photo-1531746020798-e6953c6e8e04"),
    name: "Fatuma A.",
    location: "Eldoret",
    quote:
      "I upgraded my phone, restocked my business, and still had money left. Soft life is not just a saying — it's the plan.",
    lifestyle: "Business + lifestyle upgrade",
    earned: "KES 15,000 / mo",
    date: "Verified payout yesterday",
  },
  {
    id: "5",
    avatar: unsplash("photo-1500648767791-00dcc994a43e"),
    name: "Mutua J.",
    location: "Nairobi, Eastlands",
    quote:
      "I thought it was too good to be true. Then the M-Pesa hit. I've been consistent for four months now and it just keeps growing.",
    lifestyle: "Consistent for 4 months",
    earned: "KES 20,500 / mo",
    date: "Verified payout 3 days ago",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
  }, []);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTimer]);

  const goTo = (index: number) => {
    setCurrent(index);
    startTimer();
  };

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % TESTIMONIALS.length);
    startTimer();
  };

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
    startTimer();
  };

  const t = TESTIMONIALS[current];

  return (
    <section className="py-20 bg-slate-50 border-t border-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">

        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 bg-rose-50 border border-rose-100 text-rose-600 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
            <CheckCircle className="w-3.5 h-3.5" /> Verified Member Success
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Real Kenyans. Daily M-Pesa Cashouts.
          </h2>
          <p className="text-slate-500 max-w-lg mx-auto text-sm sm:text-base mt-2">
            Ordinary people earning consistent extra income on their own terms.
          </p>
        </div>

        {/* Main Testimonial Card */}
        <div className="relative bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-md transition-all duration-300">
          
          {/* Header Row: User Info & Earnings */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div className="flex items-center gap-3.5">
              <img
                src={t.avatar}
                alt={t.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-emerald-500/20 shadow-xs shrink-0"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-slate-900 text-base">{t.name}</h3>
                  <span className="text-[11px] font-semibold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200/60 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-emerald-600" /> Verified
                  </span>
                </div>
                <div className="text-xs text-slate-400 mt-0.5">{t.location}</div>
                {/* 5-Star Rating */}
                <div className="flex items-center gap-0.5 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
            </div>

            {/* Payout & Earnings Highlight */}
            <div className="sm:text-right bg-slate-50 sm:bg-transparent p-3 sm:p-0 rounded-2xl border sm:border-none border-slate-100">
              <div className="text-lg font-extrabold text-emerald-600">{t.earned}</div>
              <div className="text-xs font-semibold text-slate-700">{t.lifestyle}</div>
              <div className="text-[11px] text-slate-400 mt-0.5">{t.date}</div>
            </div>
          </div>

          {/* Quote Body */}
          <p className="text-slate-700 text-base sm:text-lg leading-relaxed pt-6 font-medium">
            &ldquo;{t.quote}&rdquo;
          </p>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-8 pt-4 border-t border-slate-100">
            {/* Dots */}
            <div className="flex items-center gap-1.5">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === current
                      ? "w-7 h-2 bg-rose-500"
                      : "w-2 h-2 bg-slate-200 hover:bg-rose-300"
                  }`}
                  aria-label={`Testimonial ${i + 1}`}
                />
              ))}
            </div>

            {/* Arrow Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="p-2 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="p-2 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* High Converting Direct CTA */}
        <div className="mt-8 text-center flex flex-col items-center">
          <Link
            href={VELLOEARN_REGISTER_URL}
            className="inline-flex items-center justify-center gap-2 bg-rose-500 hover:bg-rose-600 text-white font-bold px-8 py-3.5 rounded-full shadow-lg shadow-rose-500/20 transition-all text-sm sm:text-base hover:scale-[1.02]"
          >
            Start Earning Like {t.name.split(" ")[0]} Today
            <ArrowRight className="w-4 h-4" />
          </Link>
          <p className="text-xs text-slate-400 mt-2">
            ⚡ Direct M-Pesa Withdrawals · No Experience Required
          </p>
        </div>

      </div>
    </section>
  );
}