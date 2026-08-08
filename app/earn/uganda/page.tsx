
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
  country: "Uganda",
  countryCode: "UG",
  path: "/earn/uganda",
  title: "Online Jobs in Uganda Paying via Mobile Money (No Experience)",
  description:
    "Earn daily with online jobs in Uganda – AI training, surveys, and micro‑tasks. Instant payouts to MTN MoMo & Airtel Money. No fees, no experience needed.",
  keywords:
    "online jobs in uganda, mobile money jobs uganda, MTN MoMo jobs uganda, earn money uganda, no experience jobs uganda, paid surveys uganda",
});

// --- Page Component ---
export default function UgandaHubPage() {
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
              <span>Updated for {currentYear} · No fees, no experience required</span>
            </div>
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">
              Online Jobs in{" "}
              <span className="bg-gradient-to-r from-emerald-500 to-indigo-500 bg-clip-text text-transparent">
                Uganda
              </span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-300">
              Earn up to <strong className="text-emerald-600 dark:text-emerald-400">UGX 15,000 – 60,000 / day</strong>{" "}
              with flexible remote tasks. Get paid instantly via{" "}
              <strong className="text-indigo-600 dark:text-indigo-400">MTN Mobile Money</strong> or{" "}
              <strong className="text-indigo-600 dark:text-indigo-400">Airtel Money</strong>.
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

      {/* Trust Banner with Uganda-specific payment badges */}
      <section className="border-y border-slate-200/80 bg-white/50 dark:border-white/5 dark:bg-white/5 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <TrustBadges
            paymentMethods={[
              { name: "MTN MoMo (UG)", icon: "📱" },
              { name: "Airtel Money (UG)", icon: "📲" },
              { name: "PayPal", icon: "💳" },
            ]}
            extraText="Instant withdrawals, 24/7 support"
          />
        </div>
      </section>

      {/* Major Cities Hub Section */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h2 className="text-xl font-semibold text-slate-800 dark:text-white">
          <MapPin className="mr-2 inline h-5 w-5 text-emerald-500" />
          Popular Cities in Uganda
        </h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {["Kampala", "Entebbe", "Jinja", "Gulu", "Mbarara", "Mbale"].map((city) => (
            <Link
              key={city}
              href={`/earn/country/uganda?city=${city.toLowerCase()}`}
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
          Top Earning Categories in Uganda
        </h2>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          Choose from high‑demand tasks that pay directly to your mobile wallet.
        </p>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <CategoryCard
            icon={<Award className="h-8 w-8" />}
            title="AI Training & Data Annotation"
            description="Label images, transcribe audio, train AI models. UGX 5,000‑20,000 / hour."
            href="/earn/uganda/ai-training"
            badge="Most Popular"
          />
          <CategoryCard
            icon={<Wallet className="h-8 w-8" />}
            title="Micro Surveys & Instant Payout"
            description="Share your opinion and earn UGX 2,000‑10,000 per survey. 5‑10 min each."
            href="/earn/job/surveys/uganda"
            badge="Quick Cash"
          />
          <CategoryCard
            icon={<Users className="h-8 w-8" />}
            title="Chat & Text Moderation"
            description="Moderate content, chat with users, earn per task. Flexible hours."
            href="/earn/job/chat-moderation/uganda"
            badge="24/7"
          />
          <CategoryCard
            icon={<Smartphone className="h-8 w-8" />}
            title="Student Jobs (Zero Capital)"
            description="No experience required. Work on your phone between classes."
            href="/earn/job/students/uganda"
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
                question: "How do I withdraw earnings directly to my MTN or Airtel Mobile Money account?",
                answer:
                  "Once you complete a task, your earnings are credited to your VelloEarn wallet. Withdraw anytime – choose MTN Mobile Money Uganda or Airtel Money Uganda. Funds arrive within minutes. No bank account needed.",
              },
              {
                question: "Do I need previous work experience or registration fees?",
                answer:
                  "No. All tasks are designed for beginners with clear instructions. Registration is 100% free – no hidden charges, no paid training. You simply sign up and start earning immediately.",
              },
              {
                question: "What is the minimum payout amount in UGX?",
                answer:
                  "The minimum withdrawal amount is UGX 5,000. You can withdraw as soon as you reach that threshold, and the transfer to your mobile money is free.",
              },
            ]}
          />
        </div>
      </section>
    </main>
  );
}