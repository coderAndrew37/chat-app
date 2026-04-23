"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface TestimonialItem {
  initials: string;
  name: string;
  location: string;
  quote: string;
  lifestyle: string;
  earned: string;
}

const TESTIMONIALS: TestimonialItem[] = [
  {
    initials: "WM",
    name: "Wanjiru M.",
    location: "Nairobi, Westlands",
    quote:
      "I paid my kids' school fees this term entirely from what I make here. Nobody knows I'm working — I just look like I'm on my phone.",
    lifestyle: "School fees covered",
    earned: "KES 18,400 / month",
  },
  {
    initials: "BK",
    name: "Brian K.",
    location: "Mombasa",
    quote:
      "I booked a Diani trip last month and didn't stress about the cost once. This has changed the way I move through life, for real.",
    lifestyle: "Coastal holiday, zero stress",
    earned: "KES 24,000 / month",
  },
  {
    initials: "AO",
    name: "Akinyi O.",
    location: "Kisumu",
    quote:
      "My campus friends kept asking how I'm always sorted. I just smile. The M-Pesa notifications come in while I'm out with them.",
    lifestyle: "Always sorted at campus",
    earned: "KES 11,200 / month",
  },
  {
    initials: "FA",
    name: "Fatuma A.",
    location: "Eldoret",
    quote:
      "I upgraded my phone, restocked my business, and still had money left. Soft life is not just a saying — it's the plan.",
    lifestyle: "Business + lifestyle upgrade",
    earned: "KES 15,000 / month",
  },
  {
    initials: "MJ",
    name: "Mutua J.",
    location: "Nairobi, Eastlands",
    quote:
      "I thought it was too good to be true. Then the M-Pesa hit. I've been consistent for four months now and it just keeps growing.",
    lifestyle: "Consistent for 4 months",
    earned: "KES 20,500 / month",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = useCallback(() => {
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
  }, []);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTimer]);

  const goTo = (index: number) => {
    setCurrent(index);
    if (timerRef.current) clearInterval(timerRef.current);
    startTimer();
  };

  const t = TESTIMONIALS[current];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">

        <div className="text-center mb-12">
          <span className="text-rose-500 font-semibold text-sm uppercase tracking-wider">
            The soft life, for real
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2 mb-3">
            Our team members are living it.
          </h2>
          <p className="text-gray-500">
            Not influencers. Just regular Kenyans who applied and showed up.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm min-h-[200px] transition-all duration-500">
          <div className="flex items-start gap-4 mb-5">
            <div className="w-11 h-11 rounded-full bg-rose-100 text-rose-600 font-bold text-sm flex items-center justify-center shrink-0">
              {t.initials}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-gray-900 text-sm">{t.name}</div>
              <div className="text-xs text-gray-400">{t.location}</div>
            </div>
            <div className="text-right shrink-0">
              <div className="text-base font-bold text-emerald-600">{t.earned}</div>
              <div className="text-xs bg-emerald-50 text-emerald-700 font-medium px-2 py-0.5 rounded-full mt-0.5 inline-block">
                {t.lifestyle}
              </div>
            </div>
          </div>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed italic">
            &ldquo;{t.quote}&rdquo;
          </p>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-5">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`rounded-full transition-all duration-300 ${
                i === current
                  ? "w-6 h-2 bg-rose-500"
                  : "w-2 h-2 bg-gray-200 hover:bg-rose-200"
              }`}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
        </div>

        <p className="text-center text-xs text-gray-400 mt-5">
          ✅ Real team members · Real M-Pesa recipients
        </p>
      </div>
    </section>
  );
}