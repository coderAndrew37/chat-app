"use client";

import { useState } from "react";
import Link from "next/link";

interface DeepDiveItem {
  question: string;
  answer: string;
}

const DEEP_DIVE_ITEMS: DeepDiveItem[] = [
  {
    question: "How does the team commission model work?",
    answer:
      "Beyond your direct earnings, you also benefit when people you bring onto the team become active. As your team grows and performs, your earnings grow with them — without doing their work. It's a structured multi-level system that rewards both your direct output and your ability to build a productive network.",
  },
  {
    question: "What does 'structured earning environment' mean?",
    answer:
      "Unlike random gig apps, VelloEarn provides defined tasks, clear rate cards, and a team structure. You know exactly what you're doing, how much it pays, and when your money moves to M-Pesa. No ambiguity, no chasing payments.",
  },
  {
    question: "How do M-Pesa payouts work?",
    answer:
      "Your earnings accumulate in your dashboard. When you request a withdrawal, the system processes it directly to your registered M-Pesa number. Most withdrawals complete in minutes. There's no third-party handling your money — it's a direct integration. Want the full breakdown? Read our guide on how M-Pesa payments work.",
  },
  {
    question: "Can I scale this into serious income?",
    answer:
      "Yes — and this is where most people underestimate the opportunity. Starting solo is fine, but the real growth comes when you build your team. Some of our most consistent earners spend less than 2 hours a day on direct tasks and earn more than a full-time salary through their team's activity. Read our guide on scaling your team for a step-by-step breakdown.",
  },
  {
    question: "Is there a cost to get started?",
    answer:
      "The application and review process is free. If you're selected to join the active team, there's a one-time account activation step — details of which are shared privately with accepted applicants via WhatsApp. We keep this process intentional to maintain quality on our platform.",
  },
];

export default function DeepDiveAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {DEEP_DIVE_ITEMS.map((item, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
        >
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full flex items-center justify-between px-5 py-4 text-left"
          >
            <span className="font-semibold text-gray-900 text-sm sm:text-base pr-4">
              {item.question}
            </span>
            <span
              className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 ${
                openIndex === i
                  ? "bg-rose-500 text-white rotate-45"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </span>
          </button>
          {openIndex === i && (
            <div className="px-5 pb-5">
              <p className="text-gray-500 text-sm leading-relaxed">{item.answer}</p>
              {i === 2 && (
                <Link
                  href="/blog/mpesa-payments"
                  className="inline-flex items-center gap-1 text-rose-500 text-sm font-medium mt-3 hover:underline"
                >
                  Read: How M-Pesa payments work →
                </Link>
              )}
              {i === 3 && (
                <Link
                  href="/blog/scale-your-team"
                  className="inline-flex items-center gap-1 text-rose-500 text-sm font-medium mt-3 hover:underline"
                >
                  Read: How to scale your team →
                </Link>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}