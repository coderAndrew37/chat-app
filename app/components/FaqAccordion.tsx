"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
}

export function FaqAccordion({ items }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm transition-all dark:border-white/10 dark:bg-white/5"
        >
          <button
            onClick={() => toggle(index)}
            className="flex w-full items-center justify-between px-5 py-4 text-left font-medium text-slate-900 transition hover:bg-slate-50/50 dark:text-white dark:hover:bg-white/5"
          >
            <span>{item.question}</span>
            <ChevronDown
              className={`h-5 w-5 text-slate-500 transition-transform duration-200 ${
                openIndex === index ? "rotate-180" : ""
              }`}
            />
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              openIndex === index ? "max-h-96" : "max-h-0"
            }`}
          >
            <div className="px-5 pb-5 text-sm text-slate-600 dark:text-slate-300">
              {item.answer}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}