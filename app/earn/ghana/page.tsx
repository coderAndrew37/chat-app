// app/earn/country/ghana/page.tsx
// ─── Ghana Regional Hub Page ──────────────────────────────────────────────────
// Route: /earn/country/ghana

import type { Metadata } from "next";
import Link from "next/link";
import {
  Award,
  MapPin,
  Smartphone,
  TrendingUp,
  Users,
  Wallet,
  Zap,
} from "lucide-react";
import { CategoryCard } from "@/app/components/CategoryCard";
import { FaqAccordion } from "@/app/components/FaqAccordion";
import { LiveTaskCounter } from "@/app/components/LiveTaskCounter";
import { TrustBadges } from "@/app/components/TrustBadges";
import LiveAITraining from "@/app/components/LiveAITraining";
import LiveForeignersLearning from "@/app/components/LiveForeignersLearning";
import LiveLocalLanguage from "@/app/components/LiveLocalLanguage";
import { generateHreflangMetadata } from "@/lib/seo/hreflang";
import {
  breadcrumbSchema,
  faqSchema,
  jobPostingSchema,
} from "@/lib/seo/metadata";
import { VELLOEARN_REGISTER_URL } from "@/lib/constants";

// ─── Metadata ─────────────────────────────────────────────────────────────────

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

// ─── Page Component ───────────────────────────────────────────────────────────

export default function GhanaHubPage() {
  const currentYear = new Date().getFullYear();

  const faqs = [
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
  ];

  const schemas = [
    breadcrumbSchema([
      { name: "Home", href: "/" },
      { name: "Online Jobs in Ghana", href: "/earn/country/ghana" },
    ]),
    faqSchema(faqs),
    jobPostingSchema({
      title: "Online Remote Tasks in Ghana",
      description:
        "Complete micro-tasks, AI data annotation, and surveys on your mobile phone in Ghana. Instant local payout to MTN MoMo, Telecel Cash, or AirtelTigo Cash.",
      country: "Ghana",
      payment: "MTN MoMo",
      minSalary: 2400,
      maxSalary: 10500,
      currency: "GHS",
    }),
  ];

  return (
    <>
      {/* ── JSON-LD Structured Data ─────────────────────────────────── */}
      {schemas.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}

      <main className="min-h-screen bg-gray-50">
        {/* ── Hero Section ─────────────────────────────────────────── */}
        <section className="relative overflow-hidden pt-16 pb-12 bg-gradient-to-br from-rose-50 via-white to-pink-50">
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-rose-100 px-4 py-1.5 text-xs font-semibold text-rose-700">
                <Zap className="h-4 w-4" />
                <span>Updated for {currentYear} · No fees, no deposits</span>
              </div>
              <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                Online Jobs in{" "}
                <span className="text-rose-500">
                  Ghana
                </span>
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-500">
                Earn up to{" "}
                <strong className="text-gray-900">
                  GH₵ 80 – GH₵ 350 / day
                </strong>{" "}
                with flexible remote tasks. Get paid instantly via{" "}
                <strong className="text-rose-600">
                  MTN Mobile Money
                </strong>
                .
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href={VELLOEARN_REGISTER_URL}
                  className="inline-flex items-center gap-2 rounded-full bg-rose-500 px-8 py-4 font-bold text-white shadow-lg transition-all hover:scale-105 active:scale-95"
                >
                  <Smartphone className="h-5 w-5" />
                  Start Earning with MoMo
                </Link>
                <Link
                  href="#categories"
                  className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-8 py-4 font-semibold text-gray-700 shadow-sm transition-all hover:scale-105"
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

        {/* ── Live Widgets Section ─────────────────────────────────── */}
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h2 className="text-2xl font-extrabold text-gray-900">
              Live Opportunity Feeds
            </h2>
            <p className="text-sm text-gray-500">
              Real-time available AI tasks, language learners, and Twi lesson requests.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <LiveAITraining />
            <LiveForeignersLearning />
            <LiveLocalLanguage
              languageName="Twi"
              countryName="Ghana"
              currencySymbol="GHS "
            />
          </div>
        </section>

        {/* ── Trust Banner ─────────────────────────────────────────── */}
        <section className="border-y border-gray-100 bg-white py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <TrustBadges
              paymentMethods={[
                { name: "MTN MoMo", badge: "MoMo" },
                { name: "Telecel Cash", badge: "Telecel" },
                { name: "AirtelTigo Cash", badge: "AirtelTigo" },
                { name: "PayPal", badge: "PayPal" },
              ]}
              extraText="Instant withdrawals, 24/7 support"
            />
          </div>
        </section>

        {/* ── City Target Section ─────────────────────────────────── */}
        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <h2 className="text-xl font-extrabold text-gray-900">
            <MapPin className="mr-2 inline h-5 w-5 text-rose-500" />
            Popular Cities in Ghana
          </h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {["Accra", "Kumasi", "Cape Coast", "Tamale", "Tema", "Takoradi"].map(
              (city) => (
                <Link
                  key={city}
                  href={`/earn/country/ghana/${city.toLowerCase()}`}
                  className="rounded-full border border-gray-100 bg-white px-4 py-2 text-sm font-medium text-gray-600 transition hover:border-rose-200 hover:text-rose-600"
                >
                  {city}
                </Link>
              )
            )}
          </div>
        </section>

        {/* ── Task Verticals Grid ─────────────────────────────────── */}
        <section
          id="categories"
          className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"
        >
          <h2 className="text-3xl font-extrabold text-gray-900">
            Top Earning Categories in Ghana
          </h2>
          <p className="mt-2 text-gray-500">
            Choose from high‑demand tasks that pay directly to your mobile wallet.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <CategoryCard
              icon={<Award className="h-8 w-8 text-rose-500" />}
              title="AI Training & Data Annotation"
              description="Label images, transcribe audio, train AI models. GH₵ 40‑120 / hour."
              href="/earn/ghana/ai-training"
              badge="Most Popular"
            />
            <CategoryCard
              icon={<Wallet className="h-8 w-8 text-rose-500" />}
              title="Micro Surveys & Opinion Rewards"
              description="Share your views and earn GH₵ 5‑30 per survey. 5‑10 min each."
              href="/earn/job/surveys/ghana"
              badge="Quick Cash"
            />
            <CategoryCard
              icon={<Users className="h-8 w-8 text-rose-500" />}
              title="Content Moderation & Chat"
              description="Moderate content, chat with users, earn per task. Flexible hours."
              href="/earn/job/chat-moderation/ghana"
              badge="24/7"
            />
            <CategoryCard
              icon={<Smartphone className="h-8 w-8 text-rose-500" />}
              title="Student Side Hustles"
              description="Zero capital required. Work on your phone between classes."
              href="/earn/job/students/ghana"
              badge="No Fees"
            />
          </div>
        </section>

        {/* ── FAQ Accordion ───────────────────────────────────────── */}
        <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Frequently Asked Questions
          </h2>
          <div className="mt-6">
            <FaqAccordion items={faqs} />
          </div>
        </section>
      </main>
    </>
  );
}