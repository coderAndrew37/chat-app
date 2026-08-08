"use client";

import { useState } from "react";

export interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
}

export function FaqAccordion({ items }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
          >
            <button
              onClick={() => toggle(index)}
              className="flex w-full items-center justify-between px-5 py-4 text-left transition-colors hover:bg-gray-50"
              aria-expanded={isOpen}
            >
              <span className="font-semibold text-gray-900 text-sm sm:text-base pr-4">
                {item.question}
              </span>
              <span
                className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 ${
                  isOpen ? "bg-rose-500 text-white rotate-45" : "bg-gray-100 text-gray-500"
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </span>
            </button>
            {isOpen && (
              <div className="px-5 pb-5 animate-in fade-in slide-in-from-top-1 duration-200">
                <p className="text-sm text-gray-500 leading-relaxed">
                  {item.answer}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}