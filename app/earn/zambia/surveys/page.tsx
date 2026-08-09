import { Metadata } from "next";
import Link from "next/link";
import { generateHreflangMetadata } from "@/lib/seo/hreflang";
import JsonLd from "@/app/components/JsonLd";
import { PayoutEstimator } from "@/app/components/PayoutEstimator";
import { StepsToEarn } from "@/app/components/StepsToEarn";
import { TaskTable } from "@/app/components/TaskTable";
import { TrustBadges } from "@/app/components/TrustBadges";
import ApplyButton from "@/app/components/ApplyButton";

// --- Metadata ---
export const metadata: Metadata = generateHreflangMetadata({
  country: "Zambia",
  countryCode: "ZM",
  path: "/earn/zambia/surveys",
  title: "Online Surveys in Zambia – Earn ZMW with MTN MoMo & Airtel Money",
  description:
    "Take paid surveys in Zambia and earn ZMW 5–30 per survey. Instant payouts to MTN MoMo, Airtel Money, or Zamtel. No experience needed. Start earning today.",
  keywords:
    "paid surveys zambia, online surveys zambia, earn money zambia, mobile money surveys zambia, survey jobs zambia",
});

// --- JSON-LD Schema ---
const currentDateISO = "2026-08-09";
const validThroughDateISO = "2026-11-07";

const surveyJobSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.velloearn.co.ke/",
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Jobs",
          "item": "https://www.velloearn.co.ke/earn",
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Surveys in Zambia",
          "item": "https://www.velloearn.co.ke/earn/zambia/surveys",
        },
      ],
    },
    {
      "@type": "JobPosting",
      "title": "Survey Participant – Zambia",
      "description":
        "Complete online surveys and get paid instantly via MTN MoMo, Airtel Money, or Zamtel. Flexible, remote work.",
      "hiringOrganization": {
        "@type": "Organization",
        "name": "VelloEarn",
        "sameAs": "https://www.velloearn.co.ke",
      },
      "jobLocation": {
        "@type": "Place",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "ZM",
        },
      },
      "applicantLocationRequirements": {
        "@type": "Country",
        "name": "Zambia",
      },
      "baseSalary": {
        "@type": "MonetaryAmount",
        "currency": "ZMW",
        "value": { "@type": "QuantitativeValue", "value": 15, "unitText": "HOUR" },
      },
      "employmentType": "PART_TIME",
      "datePosted": currentDateISO,
      "validThrough": validThroughDateISO,
    },
  ],
};

// --- Interfaces ---
interface SurveyTaskItem {
  id: string;
  title: string;
  description: string;
  reward: number;
  currency: string;
  estimatedTime: string;
  payoutMethods: string[];
  availableSlots: number;
}

// --- Data Constants ---
const ZAMBIA_SURVEY_TASKS: SurveyTaskItem[] = [
  {
    id: "zm-survey-1",
    title: "Consumer Opinion Survey",
    description: "Share your thoughts on local brands.",
    reward: 10,
    currency: "ZMW",
    estimatedTime: "5 min",
    payoutMethods: ["MTN MoMo", "Airtel Money"],
    availableSlots: 40,
  },
  {
    id: "zm-survey-2",
    title: "Mobile Banking Experience",
    description: "Tell us about your mobile money usage.",
    reward: 25,
    currency: "ZMW",
    estimatedTime: "10 min",
    payoutMethods: ["Zamtel", "PayPal"],
    availableSlots: 25,
  },
  {
    id: "zm-survey-3",
    title: "Product Labeling – Images",
    description: "Categorize product images for AI training.",
    reward: 35,
    currency: "ZMW",
    estimatedTime: "12 min",
    payoutMethods: ["MTN MoMo", "Zamtel"],
    availableSlots: 30,
  },
  {
    id: "zm-survey-4",
    title: "Audio Transcription (English)",
    description: "Transcribe short audio clips accurately.",
    reward: 50,
    currency: "ZMW",
    estimatedTime: "15 min",
    payoutMethods: ["Airtel Money", "PayPal"],
    availableSlots: 15,
  },
];

// --- Page Component ---
export default function ZambiaSurveysPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <JsonLd data={surveyJobSchema} />

      {/* Breadcrumb Navigation */}
      <nav
        aria-label="breadcrumb"
        className="border-b border-slate-200 bg-white px-4 py-2.5 text-xs text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400"
      >
        <ol className="mx-auto flex max-w-7xl flex-wrap items-center gap-1.5">
          <li>
            <Link
              href="/"
              className="transition-colors hover:text-rose-500 dark:hover:text-rose-400"
            >
              Home
            </Link>
          </li>
          <li className="text-slate-300 dark:text-slate-700">/</li>
          <li>
            <Link
              href="/earn"
              className="transition-colors hover:text-rose-500 dark:hover:text-rose-400"
            >
              Jobs
            </Link>
          </li>
          <li className="text-slate-300 dark:text-slate-700">/</li>
          <li>
            <Link
              href="/earn/zambia"
              className="transition-colors hover:text-rose-500 dark:hover:text-rose-400"
            >
              Zambia
            </Link>
          </li>
          <li className="text-slate-300 dark:text-slate-700">/</li>
          <li className="font-semibold text-slate-900 dark:text-slate-100">
            Surveys
          </li>
        </ol>
      </nav>

      {/* Hero Section */}
      <section className="bg-white px-4 py-12 sm:py-20 dark:bg-slate-900">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl dark:text-white">
            Online Surveys & Micro‑Tasks in Zambia
          </h1>
          <p className="mt-4 text-base text-slate-600 sm:text-lg dark:text-slate-300">
            Earn{" "}
            <strong className="font-semibold text-rose-600 dark:text-rose-400">
              ZMW 5 – 30 per survey
            </strong>
            . Instant payouts to MTN MoMo, Airtel Money, or Zamtel.
          </p>
          <p className="mt-2 text-xs font-medium text-slate-500 sm:text-sm dark:text-slate-400">
            ✅ No experience required · 100% free to join
          </p>
          <div className="mt-8 flex justify-center">
            <ApplyButton label="Start Taking Surveys Now →" />
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <div className="border-y border-slate-200 bg-white py-6 dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <TrustBadges
            paymentMethods={[
              { name: "MTN MoMo (ZM)", badge: "MTN MoMo" },
              { name: "Airtel Money (ZM)", badge: "Airtel Money" },
              { name: "Zamtel Kwacha", badge: "Zamtel" },
              { name: "PayPal", badge: "PayPal" },
            ]}
            extraText="Instant withdrawals, 24/7 support"
          />
        </div>
      </div>

      {/* Task Table Section */}
      <section className="mx-auto max-w-4xl px-4 py-12">
        <div className="mb-6">
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white sm:text-3xl">
            Available Surveys & Micro‑Tasks
          </h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Updated daily. All tasks are verified and pay directly to your mobile wallet.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-2 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-4">
          <TaskTable tasks={ZAMBIA_SURVEY_TASKS} />
        </div>
      </section>

      {/* Payout Estimator */}
      <section className="bg-slate-100/60 py-12 dark:bg-slate-900/40">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <PayoutEstimator
            currency="ZMW"
            exchangeRate={1}
            mobileMoneyProviders={[
              "MTN Mobile Money",
              "Airtel Money",
              "Zamtel Kwacha",
            ]}
          />
        </div>
      </section>

      {/* Steps to Earn */}
      <section className="border-t border-slate-200 bg-white py-12 dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="mb-8 text-center text-2xl font-extrabold text-slate-900 dark:text-white sm:text-3xl">
            How to Get Paid for Surveys
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
                description: "Pick from surveys, annotation, or micro‑tasks.",
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
                  "Get paid instantly to MTN MoMo, Airtel Money, or Zamtel – no minimum balance.",
              },
            ]}
          />
        </div>
      </section>

      {/* Bottom Conversion CTA Banner */}
      <section className="bg-rose-600 py-12 text-center text-white dark:bg-rose-700">
        <div className="mx-auto max-w-xl px-4">
          <h2 className="mb-2 text-2xl font-extrabold text-white sm:text-3xl">
            Ready to Earn ZMW with Surveys?
          </h2>
          <p className="mb-6 text-xs text-rose-100 sm:text-sm">
            Join thousands of Zambians completing online micro-tasks daily with direct mobile payouts.
          </p>
          <ApplyButton
            label="Get Started Free Now"
            className="inline-block rounded-full bg-white px-10 py-4 text-base font-bold text-rose-600 shadow-xl transition-all hover:bg-slate-50 hover:scale-105 active:scale-100"
          />
        </div>
      </section>
    </main>
  );
}