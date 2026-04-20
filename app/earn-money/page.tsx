"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

// ─── Types ────────────────────────────────────────────────────────────────────

interface EarnStep {
  number: number;
  icon: string;
  title: string;
  description: string;
  highlight: string;
}

interface Testimonial {
  id: number;
  name: string;
  location: string;
  avatar: string;
  quote: string;
  earned: string;
  timeframe: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const EARN_STEPS: EarnStep[] = [
  {
    number: 1,
    icon: "🔗",
    title: "Get Your Link",
    description:
      "Sign up free and grab your unique referral link from your dashboard. Takes less than 60 seconds.",
    highlight: "Free forever",
  },
  {
    number: 2,
    icon: "📲",
    title: "Share It Everywhere",
    description:
      "Post on WhatsApp, TikTok, Facebook, Instagram — anywhere your audience is. No experience needed.",
    highlight: "Any platform",
  },
  {
    number: 3,
    icon: "👥",
    title: "Friends Join & Chat",
    description:
      "When someone signs up and starts chatting through your link, you start earning. It's that simple.",
    highlight: "Auto-tracked",
  },
  {
    number: 4,
    icon: "💸",
    title: "Cash Out via M-Pesa",
    description:
      "Withdraw your earnings instantly to your M-Pesa number. No minimums, no delays, no stress.",
    highlight: "Instant payout",
  },
];

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Wanjiru M.",
    location: "Nairobi, Westlands",
    avatar: "W",
    quote:
      "I posted once on my WhatsApp status and made KES 3,200 by Monday morning. I didn't even have to explain anything — the link did the work!",
    earned: "KES 3,200",
    timeframe: "First week",
  },
  {
    id: 2,
    name: "Brian K.",
    location: "Mombasa",
    avatar: "B",
    quote:
      "Started sharing on TikTok because I already post content. Now Chat254 pays more than my part-time job. Serious passive income.",
    earned: "KES 18,500",
    timeframe: "Per month",
  },
  {
    id: 3,
    name: "Akinyi O.",
    location: "Kisumu",
    avatar: "A",
    quote:
      "I was skeptical at first. But the M-Pesa hit within minutes of my first withdrawal. These people actually pay — no games.",
    earned: "KES 7,800",
    timeframe: "Last month",
  },
  {
    id: 4,
    name: "Mutua J.",
    location: "Nairobi, Eastlands",
    avatar: "M",
    quote:
      "My campus WhatsApp group alone brings me 20+ signups a week. Chat254 is the easiest side hustle I've ever done.",
    earned: "KES 12,000",
    timeframe: "Monthly avg",
  },
  {
    id: 5,
    name: "Fatuma A.",
    location: "Eldoret",
    avatar: "F",
    quote:
      "Shared in three Facebook groups, went to sleep, woke up to KES 1,600 in my M-Pesa. This is real.",
    earned: "KES 1,600",
    timeframe: "Overnight",
  },
];

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "How much can I earn per referral?",
    answer:
      "You earn a commission for every person who signs up and becomes active through your link. Top affiliates in Kenya are making KES 10,000–25,000 per month just from sharing on social media.",
  },
  {
    question: "When and how do I get paid?",
    answer:
      "Payouts go straight to your M-Pesa, any time you request them. There's no minimum withdrawal amount and no waiting period — if you've earned it, you can withdraw it.",
  },
  {
    question: "Do I need a website or big following?",
    answer:
      "Not at all. Most of our top earners use WhatsApp Status, Facebook groups, and TikTok. If you have a smartphone and people who trust you, you're already set up to earn.",
  },
  {
    question: "Is this legit? How do I know you'll pay?",
    answer:
      "Chat254 has paid out millions of shillings to Kenyan affiliates. Your dashboard shows real-time earnings and every withdrawal is processed instantly to M-Pesa. No promises — just receipts.",
  },
  {
    question: "Can I see how many people signed up through my link?",
    answer:
      "Yes. Your affiliate dashboard shows clicks, signups, active users, and earnings in real time. You always know exactly where your money is coming from.",
  },
  {
    question: "Is there a cost to join the affiliate program?",
    answer:
      "Zero. Signing up as an affiliate is completely free and always will be. We only make money when you make money — that's the deal.",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function StepCard({ step, index }: { step: EarnStep; index: number }) {
  return (
    <div
      className="relative bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:border-rose-100 transition-all"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex items-start gap-4">
        <div className="shrink-0 w-12 h-12 rounded-xl bg-rose-500 text-white text-xl flex items-center justify-center shadow-md shadow-rose-200">
          {step.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">
              Step {step.number}
            </span>
            <span className="text-xs bg-emerald-50 text-emerald-600 font-semibold px-2 py-0.5 rounded-full">
              {step.highlight}
            </span>
          </div>
          <h3 className="text-base font-bold text-gray-900 mb-1">
            {step.title}
          </h3>
          <p className="text-sm text-gray-500 leading-relaxed">
            {step.description}
          </p>
        </div>
      </div>
      {/* Connector dot for mobile */}
      {index < EARN_STEPS.length - 1 && (
        <div className="absolute -bottom-4 left-10 w-0.5 h-8 bg-rose-100 hidden sm:block" />
      )}
    </div>
  );
}

function TestimonialSlider() {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 4000);
  };

  useEffect(() => {
    if (isAutoPlaying) startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isAutoPlaying]);

  const goTo = (index: number) => {
    setCurrent(index);
    setIsAutoPlaying(false);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const t = TESTIMONIALS[current];

  return (
    <div className="relative">
      {/* Card */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm min-h-[220px] transition-all duration-300">
        <div className="flex items-start gap-4 mb-4">
          {/* Avatar */}
          <div className="w-12 h-12 rounded-full bg-rose-500 text-white font-bold text-lg flex items-center justify-center shrink-0 shadow-md shadow-rose-100">
            {t.avatar}
          </div>
          <div>
            <div className="font-bold text-gray-900 text-sm">{t.name}</div>
            <div className="text-xs text-gray-400">{t.location}</div>
          </div>
          {/* Earned badge */}
          <div className="ml-auto text-right">
            <div className="text-lg font-extrabold text-emerald-600">
              {t.earned}
            </div>
            <div className="text-xs text-gray-400">{t.timeframe}</div>
          </div>
        </div>

        <p className="text-gray-600 text-sm sm:text-base leading-relaxed italic">
          &ldquo;{t.quote}&rdquo;
        </p>
      </div>

      {/* Dots */}
      <div className="flex items-center justify-center gap-2 mt-5">
        {TESTIMONIALS.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`rounded-full transition-all duration-300 ${
              i === current
                ? "w-6 h-2 bg-rose-500"
                : "w-2 h-2 bg-gray-200 hover:bg-rose-200"
            }`}
            aria-label={`Go to testimonial ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {FAQ_ITEMS.map((item, i) => (
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
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
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
            <div className="px-5 pb-4">
              <p className="text-gray-500 text-sm leading-relaxed">
                {item.answer}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HowItWorksPage() {
  return (
    <main className="bg-gray-50 min-h-screen">
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-rose-50 via-white to-pink-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-rose-200/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-pink-200/30 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none" />

        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center relative">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
            <span>💰</span>
            Affiliate Program — Kenya&apos;s Best
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight tracking-tight mb-5">
            Share Chat254.{" "}
            <span className="text-rose-500">Earn Real Money.</span>
          </h1>

          <p className="text-lg text-gray-500 leading-relaxed mb-10 max-w-xl mx-auto">
            No experience. No website. No startup cost. Just share your link and
            watch the M-Pesa notifications roll in.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/register"
              className="bg-rose-500 hover:bg-rose-600 text-white font-bold text-base px-8 py-4 rounded-full shadow-lg shadow-rose-200 transition-all hover:scale-105 active:scale-95"
            >
              Get My Referral Link
            </Link>
            <a
              href="#how-it-works"
              className="bg-white hover:bg-gray-50 text-gray-700 font-semibold text-base px-8 py-4 rounded-full border border-gray-200 shadow-sm transition-all hover:scale-105 active:scale-95"
            >
              See How It Works
            </a>
          </div>

          {/* Quick stats */}
          <div className="mt-12 grid grid-cols-3 gap-4 max-w-sm mx-auto">
            {[
              { value: "KES 25K+", label: "Top monthly earner" },
              { value: "Instant", label: "M-Pesa payouts" },
              { value: "Free", label: "To join" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-xl font-extrabold text-gray-900">
                  {s.value}
                </div>
                <div className="text-xs text-gray-400 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works Steps ───────────────────────────────────── */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-rose-500 font-semibold text-sm uppercase tracking-wider">
              Simple Process
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2 mb-3">
              4 Steps to Start Earning
            </h2>
            <p className="text-gray-500">
              From signup to M-Pesa in under 5 minutes.
            </p>
          </div>

          <div className="flex flex-col gap-5">
            {EARN_STEPS.map((step, i) => (
              <StepCard key={step.number} step={step} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-rose-500 font-semibold text-sm uppercase tracking-wider">
              Real People, Real Earnings
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2 mb-3">
              Kenyans Are Already Winning
            </h2>
            <p className="text-gray-500">
              From Nairobi to Kisumu — your neighbors are cashing out.
            </p>
          </div>

          <TestimonialSlider />

          {/* Trust note */}
          <p className="text-center text-xs text-gray-400 mt-6">
            ✅ Verified earnings · Real M-Pesa recipients · No paid actors
          </p>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-rose-500 font-semibold text-sm uppercase tracking-wider">
              Got Questions?
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2 mb-3">
              Frequently Asked
            </h2>
            <p className="text-gray-500">
              Everything you need to know before your first payout.
            </p>
          </div>

          <FaqAccordion />
        </div>
      </section>

      {/* ── Bottom CTA ───────────────────────────────────────────── */}
      <section className="py-16 bg-gradient-to-br from-rose-500 to-pink-500 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-1/3 -translate-x-1/4" />
        </div>
        <div className="max-w-xl mx-auto px-4 sm:px-6 text-center relative">
          <div className="text-4xl mb-4">💸</div>
          <h2 className="text-3xl font-extrabold text-white mb-3">
            Ready to Start Earning?
          </h2>
          <p className="text-rose-100 mb-8 leading-relaxed">
            Join thousands of Kenyans already making money with Chat254. Your
            link is waiting — it takes 60 seconds to set up.
          </p>
          <Link
            href="/register"
            className="inline-block bg-white text-rose-500 font-bold text-base px-10 py-4 rounded-full shadow-xl hover:scale-105 active:scale-95 transition-all"
          >
            Get Started Free →
          </Link>
          <p className="text-rose-200 text-xs mt-4">
            No credit card · No experience · Instant M-Pesa payouts
          </p>
        </div>
      </section>

      {/* ── WhatsApp FAB ─────────────────────────────────────────── */}
      <a
        href="https://wa.me/254700000000?text=Hi%2C%20I%27d%20like%20to%20learn%20more%20about%20the%20Chat254%20affiliate%20program"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95"
        aria-label="Chat on WhatsApp"
      >
        <svg
          className="w-7 h-7"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </main>
  );
}