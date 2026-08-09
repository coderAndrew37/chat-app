import { Metadata } from "next";
import Link from "next/link";
import { generateHreflangMetadata } from "@/lib/seo/hreflang";
import JsonLd from "@/app/components/JsonLd";
import { PayoutEstimator } from "@/app/components/PayoutEstimator";
import { StepsToEarn } from "@/app/components/StepsToEarn";
import { TaskTable } from "@/app/components/TaskTable";
import { TrustBadges } from "@/app/components/TrustBadges";
import ApplyButton from "@/app/components/ApplyButton";
import { ShieldCheck, Zap } from "lucide-react";

// --- Metadata ---
export const metadata: Metadata = generateHreflangMetadata({
  country: "Uganda",
  countryCode: "UG",
  path: "/earn/uganda/mobile-money",
  title: "Online Jobs that Pay through Mobile Money in Uganda – No Experience",
  description:
    "Find legitimate online jobs that pay through MTN MoMo & Airtel Money in Uganda. Earn UGX 15,000–60,000/day with surveys, AI tasks, and micro-work. No experience required.",
  keywords:
    "online jobs that pay through mobile money in uganda, mobile money jobs uganda, MTN MoMo jobs, earn money without experience uganda",
});

// --- JSON-LD Schema ---
const currentDateISO = "2026-08-09";
const validThroughDateISO = "2026-11-07";

const mobileMoneyJobSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.velloearn.co.ke/" },
        {
          "@type": "ListItem",
          position: 2,
          name: "Jobs",
          item: "https://www.velloearn.co.ke/earn",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Mobile Money Jobs in Uganda",
          item: "https://www.velloearn.co.ke/earn/uganda/mobile-money",
        },
      ],
    },
    {
      "@type": "JobPosting",
      "title": "Mobile Money Micro-Tasker – Uganda",
      "description":
        "Complete online micro-tasks and get paid instantly to your MTN Mobile Money or Airtel Money account. No experience needed.",
      "hiringOrganization": {
        "@type": "Organization",
        "name": "VelloEarn",
        "sameAs": "https://www.velloearn.co.ke",
      },
      "jobLocation": {
        "@type": "Place",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "UG",
        },
      },
      "applicantLocationRequirements": {
        "@type": "Country",
        "name": "Uganda",
      },
      "baseSalary": {
        "@type": "MonetaryAmount",
        "currency": "UGX",
        "value": { "@type": "QuantitativeValue", "value": 20000, "unitText": "HOUR" },
      },
      "employmentType": "PART_TIME",
      "datePosted": currentDateISO,
      "validThrough": validThroughDateISO,
    },
  ],
};

// --- Page Component ---
export default function UgandaMobileMoneyPage() {
  const todayDateFormatted = "August 2026";

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <JsonLd data={mobileMoneyJobSchema} />

      {/* Breadcrumb Navigation */}
      <nav
        aria-label="breadcrumb"
        className="border-b border-slate-200 bg-white px-4 py-2.5 text-xs text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400"
      >
        <ol className="mx-auto flex max-w-6xl flex-wrap items-center gap-1.5">
          <li>
            <Link href="/" className="transition-colors hover:text-rose-500 dark:hover:text-rose-400">
              Home
            </Link>
          </li>
          <li className="text-slate-300 dark:text-slate-700">/</li>
          <li>
            <Link href="/earn" className="transition-colors hover:text-rose-500 dark:hover:text-rose-400">
              Jobs
            </Link>
          </li>
          <li className="text-slate-300 dark:text-slate-700">/</li>
          <li className="font-semibold text-slate-900 dark:text-slate-100">Mobile Money Uganda</li>
        </ol>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-rose-50/60 via-slate-50 to-slate-50 pt-12 pb-16 sm:pt-20 sm:pb-24 dark:from-rose-950/20 dark:via-slate-950 dark:to-slate-950">
        <div className="pointer-events-none absolute top-0 right-0 h-[500px] w-[500px] -translate-y-1/2 translate-x-1/3 rounded-full bg-rose-500/10 blur-3xl dark:bg-rose-500/5" />

        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
          {/* Recency Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50/80 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-rose-700 dark:border-rose-900/60 dark:bg-rose-950/60 dark:text-rose-300">
            <Zap className="h-3.5 w-3.5 text-rose-500" />
            <span>Verified Payouts • {todayDateFormatted}</span>
          </div>

          <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl lg:text-6xl dark:text-white">
            Online Jobs that Pay via <span className="text-rose-600 dark:text-rose-500">Mobile Money</span> in Uganda
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base text-slate-600 sm:text-lg dark:text-slate-300">
            Earn <strong className="font-semibold text-slate-900 dark:text-white">UGX 15,000 – 60,000 / day</strong> with simple tasks. No experience required — start earning today.
          </p>

          <p className="mt-4 text-xs font-bold text-slate-700 sm:text-sm dark:text-slate-300">
            ✅ Instant payouts to MTN Mobile Money · Airtel Money · PayPal
          </p>

          <div className="mt-8 flex justify-center">
            <ApplyButton label="Start Earning UGX Now →" />
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="border-y border-slate-200 bg-white py-8 dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <TrustBadges
            paymentMethods={[
              { name: "MTN MoMo (UG)", badge: "MTN" },
              { name: "Airtel Money (UG)", badge: "Airtel" },
              { name: "PayPal", badge: "PayPal" },
            ]}
            extraText="Secure & reliable instant payouts"
          />
        </div>
      </section>

      {/* Task Table */}
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <div className="mb-6">
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white sm:text-3xl">
            Available Tasks (Paid via Mobile Money)
          </h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Updated daily. All tasks are verified and pay directly to your wallet.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-2 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-4">
          <TaskTable
            tasks={[
              {
                id: "mm-1",
                title: "Simple Image Labeling",
                description: "Tag objects in photos for AI training.",
                reward: 8000,
                currency: "UGX",
                estimatedTime: "10 min",
                payoutMethods: ["MTN MoMo", "Airtel Money"],
                availableSlots: 50,
              },
              {
                id: "mm-2",
                title: "Product Feedback Survey",
                description: "Answer questions about consumer goods.",
                reward: 5000,
                currency: "UGX",
                estimatedTime: "6 min",
                payoutMethods: ["MTN MoMo", "PayPal"],
                availableSlots: 30,
              },
              {
                id: "mm-3",
                title: "Audio Transcription (English)",
                description: "Transcribe short audio clips accurately.",
                reward: 15000,
                currency: "UGX",
                estimatedTime: "20 min",
                payoutMethods: ["Airtel Money", "PayPal"],
                availableSlots: 20,
              },
              {
                id: "mm-4",
                title: "Chat Moderation",
                description: "Review chat messages for policy compliance.",
                reward: 12000,
                currency: "UGX",
                estimatedTime: "15 min",
                payoutMethods: ["MTN MoMo", "Airtel Money"],
                availableSlots: 45,
              },
            ]}
          />
        </div>
      </section>

      {/* Payout Estimator */}
      <section className="bg-slate-100/60 py-12 dark:bg-slate-900/40">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <PayoutEstimator
            currency="UGX"
            exchangeRate={1}
            mobileMoneyProviders={["MTN Mobile Money", "Airtel Money"]}
          />
        </div>
      </section>

      {/* Mobile Money Guarantee Banner */}
      <section className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 dark:border-emerald-900/60 dark:bg-emerald-950/30">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h3 className="flex items-center gap-2 text-base font-extrabold text-emerald-950 dark:text-emerald-100">
                <ShieldCheck className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                Uganda Mobile Money Direct Payout Guarantee
              </h3>
              <p className="mt-1 text-xs text-emerald-800 dark:text-emerald-300">
                Instant withdrawal processing directly to your MTN MoMo or Airtel Money wallet.
              </p>
            </div>
            <span className="whitespace-nowrap rounded-full bg-emerald-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-sm dark:bg-emerald-500">
              0% Cashout Fee
            </span>
          </div>
        </div>
      </section>

      {/* Steps to Earn */}
      <section className="border-t border-slate-200 bg-white py-12 dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="mb-8 text-center text-2xl font-extrabold text-slate-900 dark:text-white sm:text-3xl">
            How to Get Paid in Uganda
          </h2>
          <StepsToEarn
            steps={[
              {
                icon: "1️⃣",
                title: "Register for Free",
                description: "Create your VelloEarn account in under 2 minutes.",
              },
              {
                icon: "2️⃣",
                title: "Choose a Task",
                description: "Pick from available surveys, annotation, or micro-tasks.",
              },
              {
                icon: "3️⃣",
                title: "Complete the Work",
                description: "Follow the instructions and submit your work.",
              },
              {
                icon: "4️⃣",
                title: "Withdraw to Mobile Money",
                description:
                  "Get paid instantly to your MTN MoMo or Airtel Money account. No minimum balance.",
              },
            ]}
          />
          <div className="mt-8 text-center">
            <ApplyButton label="Get Started Now →" />
          </div>
        </div>
      </section>

      {/* Bottom Conversion CTA Banner */}
      <section className="bg-rose-600 py-12 text-center text-white dark:bg-rose-700">
        <div className="mx-auto max-w-xl px-4">
          <h2 className="mb-2 text-2xl font-extrabold text-white sm:text-3xl">
            Start Earning UGX 15,000–60,000 / Day
          </h2>
          <p className="mb-6 text-xs text-rose-100 sm:text-sm">
            Free sign-up · MTN MoMo & Airtel Money instant transfers · Work on your schedule
          </p>
          <ApplyButton
            label="Apply for Mobile Money Jobs"
            className="inline-block rounded-full bg-white px-10 py-4 text-base font-bold text-rose-600 shadow-xl transition-all hover:bg-slate-50 hover:scale-105 active:scale-100"
          />
        </div>
      </section>
    </main>
  );
}