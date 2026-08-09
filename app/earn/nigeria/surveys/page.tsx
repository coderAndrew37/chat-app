import JsonLd from "@/app/components/JsonLd";
import { PayoutEstimator } from "@/app/components/PayoutEstimator";
import { StepsToEarn } from "@/app/components/StepsToEarn";
import { TaskTable } from "@/app/components/TaskTable";
import { TrustBadges } from "@/app/components/TrustBadges";
import { VELLOEARN_REGISTER_URL } from "@/lib/constants";
import { generateHreflangMetadata } from "@/lib/seo/hreflang";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  HelpCircle,
  Smartphone,
  Wallet,
  Zap,
} from "lucide-react";
import { Metadata } from "next";

// --- Metadata ---
export const metadata: Metadata = generateHreflangMetadata({
  country: "Nigeria",
  countryCode: "NG",
  path: "/earn/nigeria/surveys",
  title: "Paid Surveys in Nigeria – Earn ₦500‑3,500 with OPay & PalmPay",
  description:
    "Take paid surveys in Nigeria and earn ₦500‑3,500 per survey. Instant payouts to OPay, PalmPay, Moniepoint, or local banks. No experience needed. Start earning today.",
  keywords:
    "paid surveys nigeria, online surveys nigeria, earn money nigeria, opay surveys, palmpay surveys, survey jobs nigeria, online tasks lagos abuja",
});

// --- JSON-LD Schema ---
const surveyJobSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.velloearn.co.ke/" },
        {
          "@type": "ListItem",
          position: 2,
          name: "Earn",
          item: "https://www.velloearn.co.ke/earn",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Surveys in Nigeria",
          item: "https://www.velloearn.co.ke/earn/nigeria/surveys",
        },
      ],
    },
    {
      "@type": "JobPosting",
      "title": "Online Survey Participant & Data Annotator – Nigeria",
      "description":
        "Complete paid online surveys, fintech UX reviews, and image/audio dataset tagging. Instant payout via OPay, PalmPay, Moniepoint, or local NUBAN banks.",
      "hiringOrganization": {
        "@type": "Organization",
        "name": "VelloEarn",
        "sameAs": "https://www.velloearn.co.ke",
      },
      "jobLocation": {
        "@type": "Place",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "NG",
        },
      },
      "applicantLocationRequirements": {
        "@type": "Country",
        "name": "Nigeria",
      },
      "baseSalary": {
        "@type": "MonetaryAmount",
        "currency": "NGN",
        "value": { "@type": "QuantitativeValue", "value": 2500, "unitText": "HOUR" },
      },
      "employmentType": "PART_TIME",
      "datePosted": "2026-08-01",
      "validThrough": "2026-12-31",
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How do I receive survey payments in Nigeria?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Earnings transfer directly to your OPay, PalmPay, Moniepoint, Kuda Bank, or any local Nigerian bank account (GTBank, Zenith, Access) instantly upon request.",
          },
        },
        {
          "@type": "Question",
          "name": "Are there registration charges or deposit fees?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. Signing up on VelloEarn is 100% free for everyone in Nigeria. We do not require registration deposits or initial activation fees.",
          },
        },
        {
          "@type": "Question",
          "name": "Can I complete surveys using an Android or iPhone?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, all surveys and micro-tasks are fully mobile-optimized for smartphones with internet connectivity.",
          },
        },
      ],
    },
  ],
};

const faqs = [
  {
    q: "How do I receive survey payments in Nigeria?",
    a: "Earnings transfer directly to your OPay, PalmPay, Moniepoint, Kuda Bank, or any commercial bank account (GTBank, Zenith, Access, FirstBank) instantly upon request.",
  },
  {
    q: "Are there registration charges or deposit fees?",
    a: "No. Signing up on VelloEarn is 100% free for everyone in Nigeria. We never request registration deposits, card credentials, or initial activation fees.",
  },
  {
    q: "How much can I make per day from surveys in Nigeria?",
    a: "Earnings depend on task availability and completion rate. Active participants earn between ₦3,000 and ₦15,000 daily by spending 1 to 2 hours completing research questionnaires.",
  },
  {
    q: "What is the minimum withdrawal limit in Naira?",
    a: "The minimum cashout limit is ₦1,000. Once reached, you can trigger instant withdrawals to your preferred wallet or bank account.",
  },
];

export default function NigeriaSurveysPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <JsonLd data={surveyJobSchema} />

      {/* --- Hero Section --- */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-white px-4 py-16 sm:py-24 lg:py-28 dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-4 py-1.5 text-sm font-semibold text-rose-700 dark:border-rose-900/60 dark:bg-rose-950/50 dark:text-rose-300">
            <Zap className="h-4 w-4 text-rose-600 dark:text-rose-400" />
            <span>Verified Remote Surveys · Nigeria</span>
          </div>

          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-white">
            Paid Surveys & Micro-Tasks in <br className="hidden sm:inline" />
            <span className="text-rose-600 dark:text-rose-400">Nigeria</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-xl dark:text-slate-300">
            Complete quick market research questionnaires on your phone. Earn{" "}
            <strong className="font-semibold text-slate-900 dark:text-white">
              ₦500 – ₦3,500
            </strong>{" "}
            per survey and withdraw instantly to OPay, PalmPay, Moniepoint, or any local bank.
          </p>

          {/* Primary CTA Group */}
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={VELLOEARN_REGISTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-rose-600 px-8 py-4 text-base font-bold text-white shadow-lg shadow-rose-600/25 transition-all hover:bg-rose-700 hover:shadow-rose-600/35 active:scale-[0.98] sm:w-auto dark:bg-rose-600 dark:hover:bg-rose-500"
            >
              <span>Start Earning Now</span>
              <ArrowRight className="h-5 w-5" />
            </a>
            <a
              href="#available-tasks"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-7 py-4 text-base font-semibold text-slate-700 transition-colors hover:bg-slate-100 sm:w-auto dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
            >
              <span>View Available Surveys</span>
            </a>
          </div>

          {/* Trust Highlights */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-sm font-medium text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-rose-600 dark:text-rose-400" />
              <span>100% Free Registration</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-rose-600 dark:text-rose-400" />
              <span>Instant Local Payouts</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-rose-600 dark:text-rose-400" />
              <span>Mobile Phone Friendly</span>
            </div>
          </div>
        </div>
      </section>

      {/* --- Trust Badges Bar --- */}
      <div className="border-b border-slate-200 bg-slate-100/70 py-6 dark:border-slate-800 dark:bg-slate-900/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <TrustBadges
            paymentMethods={[
              { name: "OPay", badge: "OPay Instant" },
              { name: "PalmPay", badge: "PalmPay" },
              { name: "Moniepoint", badge: "Moniepoint" },
              { name: "Kuda Bank", badge: "Kuda" },
              { name: "Local Banks", badge: "GTB / Zenith / Access" },
              { name: "PayPal", badge: "Global PayPal" },
            ]}
            extraText="Instant 24/7 withdrawals directly to your Nigerian wallet or bank account"
          />
        </div>
      </div>

      {/* --- Why Take Surveys Section --- */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Why Complete Surveys on VelloEarn Nigeria?
          </h2>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            A reliable way to turn spare time into extra income on your phone.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-100 text-rose-600 dark:bg-rose-950 dark:text-rose-400">
              <Wallet className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-xl font-semibold text-slate-900 dark:text-white">
              Instant Fintech Payouts
            </h3>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              Cash out earnings straight to OPay, PalmPay, or Moniepoint. No bank delays or payment locks.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-100 text-rose-600 dark:bg-rose-950 dark:text-rose-400">
              <Clock className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-xl font-semibold text-slate-900 dark:text-white">
              Work on Your Schedule
            </h3>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              Complete surveys whenever you want—during lunch breaks, lectures, or evening downtime.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-100 text-rose-600 dark:bg-rose-950 dark:text-rose-400">
              <Smartphone className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-xl font-semibold text-slate-900 dark:text-white">
              Low Mobile Data Usage
            </h3>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              Lightweight questionnaires optimized to run smoothly on MTN, Airtel, Glo, or 9mobile connections.
            </p>
          </div>
        </div>
      </section>

      {/* --- Available Surveys Section --- */}
      <section id="available-tasks" className="scroll-mt-12 border-t border-slate-200 bg-white py-16 dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="flex flex-col justify-between sm:flex-row sm:items-end">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                Available Surveys & Micro-Tasks
              </h2>
              <p className="mt-2 text-slate-600 dark:text-slate-400">
                Updated daily. All tasks are verified and pay directly to your selected wallet or bank.
              </p>
            </div>
            <div className="mt-4 sm:mt-0">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                <span className="h-2 w-2 rounded-full bg-rose-500 animate-pulse"></span>
                Live Feed · Nigeria
              </span>
            </div>
          </div>

          <div className="mt-8">
            <TaskTable
              tasks={[
                {
                  id: "ng-survey-1",
                  title: "Consumer Opinion & Brand Habits Survey",
                  description: "Share your thoughts on everyday household brands and retail shopping.",
                  reward: 1200,
                  currency: "NGN",
                  estimatedTime: "5 min",
                  payoutMethods: ["OPay", "PalmPay"],
                  availableSlots: 150,
                },
                {
                  id: "ng-survey-2",
                  title: "Fintech App Usability & Mobile Banking Feedback",
                  description: "Evaluate user experience and features on digital bank platforms.",
                  reward: 2500,
                  currency: "NGN",
                  estimatedTime: "10 min",
                  payoutMethods: ["Moniepoint", "Kuda Bank"],
                  availableSlots: 80,
                },
                {
                  id: "ng-survey-3",
                  title: "E-Commerce Image Classification & Tagging",
                  description: "Categorize product images for retail catalog AI models.",
                  reward: 3500,
                  currency: "NGN",
                  estimatedTime: "12 min",
                  payoutMethods: ["OPay", "Local Banks"],
                  availableSlots: 42,
                },
                {
                  id: "ng-survey-4",
                  title: "English & Pidgin Audio Transcription",
                  description: "Listen to brief audio clips and verify text transcripts accurately.",
                  reward: 4500,
                  currency: "NGN",
                  estimatedTime: "15 min",
                  payoutMethods: ["PalmPay", "PayPal"],
                  availableSlots: 25,
                },
              ]}
            />
          </div>

          {/* Inline Conversion Banner */}
          <div className="mt-8 rounded-2xl border border-rose-100 bg-rose-50/80 p-6 text-center sm:flex sm:items-center sm:justify-between sm:text-left dark:border-rose-900/40 dark:bg-rose-950/40">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Want access to higher-paying surveys?
              </h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                Register a free profile to get instant notifications when new high-value surveys go live.
              </p>
            </div>
            <a
              href={VELLOEARN_REGISTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl bg-rose-600 px-6 py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-rose-700 sm:mt-0 dark:bg-rose-600 dark:hover:bg-rose-500"
            >
              <span>Sign Up Free</span>
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* --- Payout Estimator --- */}
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <PayoutEstimator
          currency="NGN"
          exchangeRate={1}
          mobileMoneyProviders={["OPay", "PalmPay", "Moniepoint", "Kuda Bank", "Local Bank Transfer"]}
        />
      </section>

      {/* --- Steps To Earn --- */}
      <section className="border-t border-slate-200 bg-white py-16 dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <StepsToEarn
            steps={[
              {
                icon: "1️⃣",
                title: "1. Register for Free",
                description: "Create your free VelloEarn profile in under 30 seconds using your email or phone number.",
              },
              {
                icon: "2️⃣",
                title: "2. Pick a Survey or Task",
                description: "Browse available surveys and select a topic that fits your schedule.",
              },
              {
                icon: "3️⃣",
                title: "3. Complete Questionnaire",
                description: "Answer the questions honestly or follow brief instructions on your smartphone.",
              },
              {
                icon: "4️⃣",
                title: "4. Withdraw to OPay / PalmPay / Bank",
                description: "Receive instant payouts to your preferred wallet or local NUBAN account once you hit ₦1,000.",
              },
            ]}
          />
        </div>
      </section>

      {/* --- FAQ Section --- */}
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-3.5 py-1 text-xs font-semibold text-slate-700 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-300">
            <HelpCircle className="h-3.5 w-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="mt-10 space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {faq.q}
              </h3>
              <p className="mt-2 text-base text-slate-600 dark:text-slate-300">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* --- Bottom CTA Section --- */}
      <section className="border-t border-slate-200 bg-slate-100 py-16 dark:border-slate-800 dark:bg-slate-900/80">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <div className="rounded-3xl border border-rose-200 bg-gradient-to-br from-rose-50 to-pink-50 p-8 sm:p-12 dark:border-rose-900/60 dark:from-rose-950/60 dark:to-slate-900">
            <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl dark:text-white">
              Ready to Start Earning from Surveys in Nigeria?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-slate-600 dark:text-slate-300">
              Join thousands of Nigerians earning extra income daily on their smartphones with zero initial investment.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href={VELLOEARN_REGISTER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-rose-600 px-8 py-4 text-base font-bold text-white shadow-lg shadow-rose-600/25 transition-all hover:bg-rose-700 hover:shadow-rose-600/35 active:scale-[0.98] sm:w-auto dark:bg-rose-600 dark:hover:bg-rose-500"
              >
                <span>Create Free Account</span>
                <ArrowRight className="h-5 w-5" />
              </a>
            </div>
            <p className="mt-4 text-xs font-medium text-slate-500 dark:text-slate-400">
              ⚡ Setup takes under 1 minute.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}