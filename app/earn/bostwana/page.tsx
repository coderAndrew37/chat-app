
import { CategoryCard } from "@/app/components/CategoryCard";
import { FaqAccordion } from "@/app/components/FaqAccordion";
import { LiveTaskCounter } from "@/app/components/LiveTaskCounter";
import { TrustBadges } from "@/app/components/TrustBadges";
import { generateCountryMetadata } from "@/lib/seo/countries";
import {
    Award,
    Briefcase,
    Clock,
    TrendingUp,
    Users,
    Wallet,
    Zap
} from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

// --- Metadata ---
export const metadata: Metadata = generateCountryMetadata({
  country: "Botswana",
  countryCode: "BW",
  path: "/earn/botswana",
  title: "Latest Online Jobs in Botswana (Updated Today) | Pay Daily",
  description:
    "Find high-paying online jobs in Botswana – surveys, AI training, chat moderation & more. Earn up to P500/day. Updated for August 2026. Free to join.",
  keywords:
    "jobs botswana in the last 3 days, online paying jobs in botswana, high paying jobs in botswana, paid surveys in botswana, jobs in botswana for foreigners, how to earn money online in botswana",
});

// --- Page Component ---
export default function BotswanaHubPage() {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-BW", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-12 sm:py-20 lg:py-28">
        <div className="absolute inset-0 bg-emerald-500/5 dark:bg-emerald-500/10" />
        <div className="relative mx-auto max-w-7xl">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100/80 dark:bg-emerald-900/30 px-4 py-1.5 text-sm font-medium text-emerald-700 dark:text-emerald-300 backdrop-blur-sm">
              <Zap className="h-4 w-4" />
              <span>Updated for {formattedDate}</span>
            </div>
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">
              Latest Online Jobs in{" "}
              <span className="bg-gradient-to-r from-emerald-500 to-indigo-500 bg-clip-text text-transparent">
                Botswana
              </span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-300">
              Earn up to <strong className="text-emerald-600 dark:text-emerald-400">P150 – P500/day</strong> with
              flexible micro‑tasks. No experience needed – start today.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-indigo-500 px-6 py-3 font-semibold text-white shadow-lg shadow-emerald-500/25 transition-all hover:scale-105 hover:shadow-xl active:scale-95"
              >
                <Users className="h-5 w-5" />
                Start Earning Now
              </Link>
              <Link
                href="#categories"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-6 py-3 font-semibold text-slate-700 backdrop-blur-sm transition-all hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
              >
                <Briefcase className="h-5 w-5" />
                Browse Jobs
              </Link>
            </div>
            {/* Live counter badge */}
            <div className="mt-6 flex justify-center">
              <LiveTaskCounter />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Banner */}
      <section className="border-y border-slate-200/80 bg-white/50 dark:border-white/5 dark:bg-white/5 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <TrustBadges />
        </div>
      </section>

      {/* Recency / Search Intent Banner */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-emerald-200/50 bg-emerald-50/50 p-4 dark:border-emerald-800/30 dark:bg-emerald-900/10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Clock className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
              <span className="font-medium text-slate-800 dark:text-white">
                New tasks posted within the last 3 days
              </span>
            </div>
            <Link
              href="/tasks?fresh=true"
              className="inline-flex items-center gap-1 rounded-full bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700"
            >
              View fresh tasks
              <TrendingUp className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Category Cards Grid */}
      <section id="categories" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
          Popular Job Categories in Botswana
        </h2>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          Start earning today with these high‑demand remote tasks.
        </p>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <CategoryCard
            icon={<Wallet className="h-8 w-8" />}
            title="Paid Surveys Botswana"
            description="Share your opinion and earn P10‑P50 per survey. 10‑15 min each."
            href="/earn/job/surveys/botswana"
            badge="High paying"
          />
          <CategoryCard
            icon={<TrendingUp className="h-8 w-8" />}
            title="AI Data Annotation & Training"
            description="Label images, transcribe audio, train AI models. No degree required."
            href="/earn/job/ai-annotation/botswana"
            badge="Remote"
          />
          <CategoryCard
            icon={<Users className="h-8 w-8" />}
            title="Chat & Moderation Micro‑tasks"
            description="Chat with users, moderate content, earn per message. Flexible hours."
            href="/earn/job/chat-moderation/botswana"
            badge="24/7"
          />
          <CategoryCard
            icon={<Award className="h-8 w-8" />}
            title="Remote Work for Non‑Citizens"
            description="Online jobs open to foreigners in Botswana. Work from anywhere."
            href="/earn/job/foreigners/botswana"
            badge="Global"
          />
        </div>
      </section>

      {/* FAQ Component */}
      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
          Frequently Asked Questions
        </h2>
        <div className="mt-6">
          <FaqAccordion
            items={[
              {
                question: "How do I withdraw earnings in Botswana?",
                answer:
                  "We support Orange Money, FNB eWallet, PayPal, M‑Pesa, and Airtel Money. Withdrawals are processed within 24 hours, and you'll receive your money directly to your mobile wallet or bank account.",
              },
              {
                question: "Do I need previous experience?",
                answer:
                  "No. Most tasks are designed for beginners with clear instructions. Our platform provides training materials and 24/7 support to help you get started.",
              },
              {
                question: "Are these jobs legitimate and free to join?",
                answer:
                  "Absolutely. VelloEarn is a trusted platform with thousands of active users. There are no hidden fees – you can register and start earning immediately.",
              },
            ]}
          />
        </div>
      </section>
    </main>
  );
}