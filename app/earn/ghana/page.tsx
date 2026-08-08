
import { CategoryCard } from "@/app/components/CategoryCard";
import { FaqAccordion } from "@/app/components/FaqAccordion";
import { LiveTaskCounter } from "@/app/components/LiveTaskCounter";
import { TrustBadges } from "@/app/components/TrustBadges";
import { generateHreflangMetadata } from "@/lib/seo/hreflang";
import {
    Award,
    MapPin,
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
  country: "Ghana",
  countryCode: "GH",
  path: "/earn/country/ghana",
  title: "Online Jobs in Ghana Paying via MTN MoMo (Updated 2026)",
  description:
    "Earn daily with online jobs in Ghana – AI training, surveys, and micro‑tasks. Instant payouts to MTN MoMo, Telecel Cash, AirtelTigo. No fees, start now.",
  keywords:
    "online jobs in ghana, earn money online ghana, MTN MoMo jobs ghana, AI training ghana, paid surveys ghana, student side hustles ghana",
});

// --- Page Component ---
export default function GhanaHubPage() {
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
                Ghana
              </span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-300">
              Earn up to <strong className="text-emerald-600 dark:text-emerald-400">GH₵ 80 – GH₵ 350 / day</strong>{" "}
              with flexible remote tasks. Get paid instantly via{" "}
              <strong className="text-indigo-600 dark:text-indigo-400">MTN Mobile Money</strong>.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-indigo-500 px-6 py-3 font-semibold text-white shadow-lg shadow-emerald-500/25 transition-all hover:scale-105 hover:shadow-xl active:scale-95"
              >
                <Smartphone className="h-5 w-5" />
                Start Earning with MoMo
              </Link>
              <Link
                href="#categories"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-6 py-3 font-semibold text-slate-700 backdrop-blur-sm transition-all hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
              >
                <TrendingUp className="h-5 w-5" />
                Explore Jobs
              </Link>
            </div>
            {/* Live counter */}
            <div className="mt-6 flex justify-center">
              <LiveTaskCounter />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Banner with Ghana-specific payment badges */}
      <section className="border-y border-slate-200/80 bg-white/50 dark:border-white/5 dark:bg-white/5 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <TrustBadges
            paymentMethods={[
              { name: "MTN MoMo", icon: "📱" },
              { name: "Telecel Cash", icon: "📲" },
              { name: "AirtelTigo Cash", icon: "📳" },
              { name: "PayPal", icon: "💳" },
            ]}
            extraText="Instant withdrawals, 24/7 support"
          />
        </div>
      </section>

      {/* City Target Section */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h2 className="text-xl font-semibold text-slate-800 dark:text-white">
          <MapPin className="mr-2 inline h-5 w-5 text-emerald-500" />
          Popular Cities in Ghana
        </h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {["Accra", "Kumasi", "Cape Coast", "Tamale", "Tema", "Takoradi"].map((city) => (
            <Link
              key={city}
              href={`/earn/country/ghana?city=${city.toLowerCase()}`}
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
          Top Earning Categories in Ghana
        </h2>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          Choose from high‑demand tasks that pay directly to your mobile wallet.
        </p>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <CategoryCard
            icon={<Award className="h-8 w-8" />}
            title="AI Training & Data Annotation"
            description="Label images, transcribe audio, train AI models. GH₵ 40‑120 / hour."
            href="/earn/job/ai-training/ghana"
            badge="Most Popular"
          />
          <CategoryCard
            icon={<Wallet className="h-8 w-8" />}
            title="Micro Surveys & Opinion Rewards"
            description="Share your views and earn GH₵ 5‑30 per survey. 5‑10 min each."
            href="/earn/job/surveys/ghana"
            badge="Quick Cash"
          />
          <CategoryCard
            icon={<Users className="h-8 w-8" />}
            title="Content Moderation & Chat"
            description="Moderate content, chat with users, earn per task. Flexible hours."
            href="/earn/job/chat-moderation/ghana"
            badge="24/7"
          />
          <CategoryCard
            icon={<Smartphone className="h-8 w-8" />}
            title="Student Side Hustles"
            description="Zero capital required. Work on your phone between classes."
            href="/earn/job/students/ghana"
            badge="No Fees"
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
                question: "How do I cash out directly to my MTN MoMo wallet?",
                answer:
                  "Once you complete a task, your earnings are credited to your VelloEarn wallet. Withdraw anytime – choose MTN Mobile Money, Telecel Cash, or AirtelTigo. Funds arrive within minutes. No bank account needed.",
              },
              {
                question: "Are there registration charges or deposit requirements?",
                answer:
                  "Absolutely not. Joining VelloEarn is 100% free. There are no hidden fees, no deposit requirements, and no paid training. You simply sign up and start working on available tasks.",
              },
              {
                question: "Can university students work on their mobile phones?",
                answer:
                  "Yes! All tasks are designed to be completed on a smartphone. Whether you're on campus or at home, you can earn by completing surveys, annotating data, or doing micro‑tasks – all from your phone.",
              },
            ]}
          />
        </div>
      </section>
    </main>
  );
}