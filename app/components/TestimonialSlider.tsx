"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import SmartImage from "./SmartImage";

export interface TestimonialItem {
  id: number;
  initials: string;
  name: string;
  location: string;
  quote: string;
  lifestyle: string;
  earned: string;
  image: string;
  unsplashFallback: string;
}

interface TestimonialSliderProps {
  testimonials: TestimonialItem[];
}

export default function TestimonialSlider({ testimonials }: TestimonialSliderProps) {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = useCallback(() => {
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
  }, [testimonials.length]);

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

  const t = testimonials[current];

  return (
    <div>
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm min-h-[200px] transition-all duration-500">
        <div className="flex items-start gap-4 mb-5">
          <div className="relative w-11 h-11 rounded-full overflow-hidden shrink-0 bg-rose-100">
            <SmartImage
              src={t.image}
              fallback={t.unsplashFallback}
              alt={t.name}
              fill
              className="object-cover"
              sizes="44px"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-gray-900 text-sm">{t.name}</div>
            <div className="text-xs text-gray-400">{t.location}</div>
          </div>
          <div className="text-right shrink-0">
            <div className="text-base font-bold text-emerald-600">{t.earned}</div>
            <div className="text-xs mt-0.5 bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full font-medium">
              {t.lifestyle}
            </div>
          </div>
        </div>
        <p className="text-gray-600 text-sm sm:text-base leading-relaxed italic">
          &ldquo;{t.quote}&rdquo;
        </p>
      </div>
      <div className="flex justify-center gap-2 mt-5">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`rounded-full transition-all duration-300 ${
              i === current ? "w-6 h-2 bg-rose-500" : "w-2 h-2 bg-gray-200 hover:bg-rose-200"
            }`}
            aria-label={`Testimonial ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}