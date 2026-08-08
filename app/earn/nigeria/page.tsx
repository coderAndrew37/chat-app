
import { CategoryCard } from "@/app/components/CategoryCard";
import { FaqAccordion } from "@/app/components/FaqAccordion";
import { LiveTaskCounter } from "@/app/components/LiveTaskCounter";
import { TrustBadges } from "@/app/components/TrustBadges";
import { generateHreflangMetadata } from "@/lib/seo/hreflang";
import {
    Award,
    MapPin,
    ShieldCheck,
    Smartphone,
    TrendingUp,
    Users,
    Wallet,
    Zap
} from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

// --- Metadata ---
export const metadata: Metadata = generateHreflangMetadata({
  country: "Nigeria",
  countryCode: "NG",
  path: "/earn/country/nigeria",
  title: "Online Jobs in Nigeria Paying via OPay & PalmPay (Updated 2026)",
  description:
    "Find online jobs in Nigeria with instant payouts to OPay, PalmPay, Moniepoint, Kuda, and local banks. Earn ₦5,000‑30,000/day with surveys, AI tasks, and micro‑work. No fees, no experience required.",
  keywords:
    "online jobs in nigeria, opay jobs nigeria, palmpay jobs, earn money nigeria, paid surveys nigeria, no experience jobs nigeria, student side hustles nigeria",
});

// --- Page Component ---
export default function NigeriaHubPage() {
  const currentYear = new Date().getFullYear();

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-12 sm:py-20 lg:py-28">
        <div className="absolute inset-0 bg-emerald-500/5 dark:bg-emerald-500/10" />
        <div className="relative mx-auto max-w-7xl">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100/80 dark:bg-emerald-900/30 px-4 py-1.5 text-sm font-medium text-emerald-700 dark:text-emerald-300 backdrop-blur-sm">
              <Zap className="h-4 w-4" />
              <span>Updated for {currentYear} · No fees, no deposits</span>
            </div>
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">
              Online Jobs in{" "}
              <span className="bg-gradient-to-r from-emerald-500 to-indigo-500 bg-clip-text text-transparent">
                Nigeria
              </span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-300">
              Earn up to <strong className="text-emerald-600 dark:text-emerald-400">₦5,000 – 30,000 / day</strong>{" "}
              with flexible remote tasks. Get paid instantly via{" "}
              <strong className="text-indigo-600 dark:text-indigo-400">OPay</strong>,{" "}
              <strong className="text-indigo-600 dark:text-indigo-400">PalmPay</strong>,{" "}
              <strong className="text-indigo-600 dark:text-indigo-400">Moniepoint</strong>, or any
              local bank.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-indigo-500 px-6 py-3 font-semibold text-white shadow-lg shadow-emerald-500/25 transition-all hover:scale-105 hover:shadow-xl active:scale-95"
              >
                <Smartphone className="h-5 w-5" />
                Start Earning with OPay/PalmPay
              </Link>
              <Link
                href="#categories"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-6 py-3 font-semibold text-slate-700 backdrop-blur-sm transition-all hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
              >
                <TrendingUp className="h-5 w-5" />
                Browse Jobs
              </Link>
            </div>
            {/* Live counter */}
            <div className="mt-6 flex justify-center">
              <LiveTaskCounter />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Banner with Nigeria-specific payment badges */}
      <section className="border-y border-slate-200/80 bg-white/50 dark:border-white/5 dark:bg-white/5 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <TrustBadges
            paymentMethods={[
              { name: "OPay", icon: "💰" },
              { name: "PalmPay", icon: "💳" },
              { name: "Moniepoint", icon: "🏦" },
              { name: "Kuda Bank", icon: "🏧" },
              { name: "Local Banks", icon: "🏛️" },
              { name: "PayPal", icon: "🌐" },
            ]}
            extraText="Instant withdrawals, 24/7 support"
          />
        </div>
      </section>

      {/* Major Cities Hub Section */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h2 className="text-xl font-semibold text-slate-800 dark:text-white">
          <MapPin className="mr-2 inline h-5 w-5 text-emerald-500" />
          Major Cities in Nigeria
        </h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {["Lagos", "Abuja", "Port Harcourt", "Ibadan", "Kano", "Enugu"].map((city) => (
            <Link
              key={city}
              href={`/earn/country/nigeria?city=${city.toLowerCase()}`}
              className="rounded-full border border-slate-200 bg-white/60 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-emerald-300 hover:bg-emerald-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:border-emerald-500/30"
            >
              {city}
            </Link>
          ))}
        </div>
      </section>

      {/* Task Verticals Grid */}
      <section id="categories" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
          Top Earning Categories in Nigeria
        </h2>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          Choose from high‑demand tasks that pay directly to your preferred wallet or bank.
        </p>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <CategoryCard
            icon={<Award className="h-8 w-8" />}
            title="AI Training & Data Annotation"
            description="Label images, transcribe audio, train AI models. ₦2,000‑10,000 / hour."
            href="/earn/job/ai-training/nigeria"
            badge="High Demand"
          />
          <CategoryCard
            icon={<Wallet className="h-8 w-8" />}
            title="Micro Surveys & Instant Payout"
            description="Share your opinion and earn ₦500‑2,000 per survey. 5‑10 min each."
            href="/earn/job/surveys/nigeria"
            badge="Quick Cash"
          />
          <CategoryCard
            icon={<Users className="h-8 w-8" />}
            title="Content Moderation & Chat"
            description="Moderate content, chat with users, earn per task. 24/7 flexible."
            href="/earn/job/chat-moderation/nigeria"
            badge="24/7"
          />
          <CategoryCard
            icon={<ShieldCheck className="h-8 w-8" />}
            title="Student Jobs (Zero Capital)"
            description="No capital required. Work on your phone anytime, anywhere."
            href="/earn/job/students/nigeria"
            badge="100% Free"
          />
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
          Frequently Asked Questions
        </h2>
        <div className="mt-6">
          <FaqAccordion
            items={[
              {
                question: "How do I withdraw earnings directly to my OPay, PalmPay, or Nigerian bank account?",
                answer:
                  "Once you complete a task, your earnings are credited to your VelloEarn wallet. Withdraw anytime – choose OPay, PalmPay, Moniepoint, Kuda Bank, or any local bank. Funds arrive within minutes. No bank account is required if you use fintech wallets.",
              },
              {
                question: "Are there registration fees or deposit requirements?",
                answer:
                  "Absolutely not. Joining VelloEarn is 100% free. There are no hidden fees, no deposit requirements, and no paid training. You simply sign up and start working on available tasks.",
              },
              {
                question: "What is the minimum withdrawal threshold in Naira (NGN)?",
                answer:
                  "The minimum withdrawal amount is ₦1,000. You can withdraw as soon as you reach that threshold, and the transfer to your fintech wallet or bank is free.",
              },
            ]}
          />
        </div>
      </section>
    </main>
  );
}