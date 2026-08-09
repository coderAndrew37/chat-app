import { Metadata } from "next";
import Link from "next/link";
import {
  Smartphone,
  Zap,
  Wallet,
  Award,
  MapPin,
  TrendingUp,
  Users,
  ShieldCheck,
} from "lucide-react";
import { generateHreflangMetadata } from "@/lib/seo/hreflang";
import { CategoryCard } from "@/app/components/CategoryCard";
import { FaqAccordion } from "@/app/components/FaqAccordion";
import { LiveTaskCounter } from "@/app/components/LiveTaskCounter";
import { TrustBadges } from "@/app/components/TrustBadges";
import { PayoutEstimator } from "@/app/components/PayoutEstimator";
import { TaskTable } from "@/app/components/TaskTable";
import { StepsToEarn } from "@/app/components/StepsToEarn";
import ApplyButton from "@/app/components/ApplyButton";
import JsonLd from "@/app/components/JsonLd";

// --- Metadata ---
export const metadata: Metadata = generateHreflangMetadata({
  country: "Zambia",
  countryCode: "ZM",
  path: "/earn/zambia",
  title: "Online Jobs in Zambia Paying via Mobile Money (Updated 2026)",
  description:
    "Find online jobs in Zambia with instant payouts to MTN MoMo, Airtel Money, and Zamtel. Earn ZMW 80–350/day with surveys, AI tasks, and micro-work. No fees, no experience required.",
  keywords:
    "online jobs in zambia, mobile money jobs zambia, MTN MoMo zambia, paid surveys zambia, earn money zambia, no experience jobs zambia",
});

// --- JSON-LD Schema ---
const currentDateISO = "2026-08-09";
const validThroughDateISO = "2026-11-07";

const zambiaJobSchema = {
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
          "name": "Zambia Remote Work Hub",
          "item": "https://www.velloearn.co.ke/earn/zambia",
        },
      ],
    },
    {
      "@type": "JobPosting",
      "title": "Mobile Money Remote Tasker – Zambia",
      "description":
        "Complete online micro-tasks and earn ZMW paid directly to MTN MoMo, Airtel Money, or Zamtel Kwacha. Zero experience required.",
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
        "value": {
          "@type": "QuantitativeValue",
          "minValue": 80,
          "maxValue": 350,
          "unitText": "DAY",
        },
      },
      "employmentType": "PART_TIME",
      "datePosted": currentDateISO,
      "validThrough": validThroughDateISO,
    },
  ],
};

// --- Interfaces ---
interface CityOption {
  name: string;
  slug: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

interface TaskItem {
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
const ZAMBIA_CITIES: CityOption[] = [
  { name: "Lusaka", slug: "lusaka" },
  { name: "Ndola", slug: "ndola" },
  { name: "Kitwe", slug: "kitwe" },
  { name: "Livingstone", slug: "livingstone" },
  { name: "Chingola", slug: "chingola" },
  { name: "Kabwe", slug: "kabwe" },
];

const ZAMBIA_TASKS: TaskItem[] = [
  {
    id: "zm-1",
    title: "AI Dataset Image Labeling",
    description: "Categorize objects in pictures to train vision AI algorithms.",
    reward: 45,
    currency: "ZMW",
    estimatedTime: "12 min",
    payoutMethods: ["MTN MoMo", "Airtel Money"],
    availableSlots: 65,
  },
  {
    id: "zm-2",
    title: "Consumer Insights Survey",
    description: "Provide feedback on retail products and services in Zambia.",
    reward: 25,
    currency: "ZMW",
    estimatedTime: "8 min",
    payoutMethods: ["MTN MoMo", "Zamtel"],
    availableSlots: 40,
  },
  {
    id: "zm-3",
    title: "Bemba / Nyanja Voice Audio Review",
    description: "Verify short audio clips for accuracy and pronunciation.",
    reward: 85,
    currency: "ZMW",
    estimatedTime: "20 min",
    payoutMethods: ["Airtel Money", "PayPal"],
    availableSlots: 18,
  },
  {
    id: "zm-4",
    title: "Online Community Chat Moderation",
    description: "Review incoming chat messages and enforce safety rules.",
    reward: 60,
    currency: "ZMW",
    estimatedTime: "15 min",
    payoutMethods: ["MTN MoMo", "Airtel Money", "Zamtel"],
    availableSlots: 32,
  },
];

const FAQ_ITEMS: FaqItem[] = [
  {
    question:
      "How do I withdraw earnings directly to my MTN or Airtel Mobile Money wallet in Zambia?",
    answer:
      "Once you complete a task, your earnings are credited to your VelloEarn wallet. Withdraw anytime – choose MTN MoMo, Airtel Money, or Zamtel Kwacha. Funds arrive within minutes. No bank account needed.",
  },
  {
    question: "Are there registration fees or deposit requirements?",
    answer:
      "Absolutely not. Joining VelloEarn is 100% free. There are no hidden fees, no deposit requirements, and no paid training. You simply sign up and start working on available tasks.",
  },
  {
    question: "What is the minimum payout in Zambian Kwacha (ZMW)?",
    answer:
      "The minimum withdrawal amount is ZMW 10. You can withdraw as soon as you reach that threshold, and the transfer to your mobile money is free.",
  },
];

// --- Page Component ---
export default function ZambiaHubPage() {
  const displayYear = "2026";

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <JsonLd data={zambiaJobSchema} />

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
          <li className="font-semibold text-slate-900 dark:text-slate-100">
            Zambia
          </li>
        </ol>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-rose-50/60 via-slate-50 to-slate-50 px-4 py-12 sm:py-20 lg:py-24 dark:from-rose-950/20 dark:via-slate-950 dark:to-slate-950">
        <div className="pointer-events-none absolute top-0 right-0 h-[500px] w-[500px] -translate-y-1/2 translate-x-1/3 rounded-full bg-rose-500/10 blur-3xl dark:bg-rose-500/5" />

        <div className="relative mx-auto max-w-7xl">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50/80 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-rose-700 dark:border-rose-900/60 dark:bg-rose-950/60 dark:text-rose-300">
              <Zap className="h-3.5 w-3.5 text-rose-500" />
              <span>Updated for {displayYear} · No fees, no deposits</span>
            </div>

            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-white">
              Online Jobs in{" "}
              <span className="text-rose-600 dark:text-rose-500">
                Zambia
              </span>
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 sm:text-lg dark:text-slate-300">
              Earn up to{" "}
              <strong className="font-semibold text-slate-900 dark:text-white">
                ZMW 80 – 350 / day
              </strong>{" "}
              with flexible remote tasks. Get paid instantly via{" "}
              <strong className="font-semibold text-rose-600 dark:text-rose-400">
                MTN MoMo
              </strong>
              ,{" "}
              <strong className="font-semibold text-rose-600 dark:text-rose-400">
                Airtel Money
              </strong>
              , or{" "}
              <strong className="font-semibold text-rose-600 dark:text-rose-400">
                Zamtel Kwacha
              </strong>
              .
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <ApplyButton label="Start Earning ZMW Now →" />
              <Link
                href="#categories"
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3.5 text-sm font-bold text-slate-700 shadow-sm transition-all hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                <TrendingUp className="h-4 w-4" />
                Browse Categories
              </Link>
            </div>

            {/* Live Task Counter */}
            <div className="mt-6 flex justify-center">
              <LiveTaskCounter />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Banner with Zambia Payment Badges */}
      <section className="border-y border-slate-200 bg-white py-6 dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <TrustBadges
            paymentMethods={[
              { name: "MTN MoMo (ZM)", badge: "MoMo" },
              { name: "Airtel Money (ZM)", badge: "Airtel" },
              { name: "Zamtel Kwacha", badge: "Zamtel" },
              { name: "PayPal", badge: "PayPal" },
            ]}
            extraText="Instant withdrawals, 24/7 local support"
          />
        </div>
      </section>

      {/* Live Available Tasks Table */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white sm:text-3xl">
            Live Available Tasks in Zambia
          </h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Updated live. Select a task to start earning ZMW immediately.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-2 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-4">
          <TaskTable tasks={ZAMBIA_TASKS} />
        </div>
      </section>

      {/* Interactive Payout Estimator */}
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

      {/* Major Cities Hub Section */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h2 className="flex items-center text-lg font-bold text-slate-900 dark:text-white">
          <MapPin className="mr-2 h-5 w-5 text-rose-500" />
          Major Cities in Zambia
        </h2>
        <div className="mt-4 flex flex-wrap gap-2.5">
          {ZAMBIA_CITIES.map((city: CityOption) => (
            <Link
              key={city.slug}
              href={`/earn/country/zambia?city=${city.slug}`}
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm transition-all hover:border-rose-300 hover:bg-rose-50 hover:text-rose-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-rose-900/60 dark:hover:bg-rose-950/40 dark:hover:text-rose-400"
            >
              {city.name}
            </Link>
          ))}
        </div>
      </section>

      {/* Task Verticals Grid */}
      <section
        id="categories"
        className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"
      >
        <div className="mb-8">
          <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl dark:text-white">
            Top Earning Categories in Zambia
          </h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Choose from high-demand tasks that pay directly to your mobile
            wallet.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <CategoryCard
            icon={<Award className="h-7 w-7 text-rose-500" />}
            title="AI Training & Data Annotation"
            description="Label images, transcribe audio, and train AI models. Earn ZMW 20–100 / hour."
            href="/earn/job/ai-training/zambia"
            badge="Most Popular"
          />
          <CategoryCard
            icon={<Wallet className="h-7 w-7 text-rose-500" />}
            title="Micro Surveys & Instant Payout"
            description="Share your opinion and earn ZMW 5–30 per survey. 5–10 min per task."
            href="/earn/job/surveys/zambia"
            badge="Quick Cash"
          />
          <CategoryCard
            icon={<Users className="h-7 w-7 text-rose-500" />}
            title="Chat & Text Moderation"
            description="Moderate community content and respond to user messages on a flexible schedule."
            href="/earn/job/chat-moderation/zambia"
            badge="24/7 Available"
          />
          <CategoryCard
            icon={<ShieldCheck className="h-7 w-7 text-rose-500" />}
            title="Student Jobs (Zero Capital)"
            description="No experience or deposit required. Work directly from your smartphone."
            href="/earn/job/students/zambia"
            badge="100% Free"
          />
        </div>
      </section>

      {/* Steps to Earn */}
      <section className="border-t border-slate-200 bg-white py-12 dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="mb-8 text-center text-2xl font-extrabold text-slate-900 sm:text-3xl dark:text-white">
            How to Get Paid in Zambia
          </h2>
          <StepsToEarn
            steps={[
              {
                icon: "1️⃣",
                title: "Free Account Setup",
                description: "Create your VelloEarn account in under 2 minutes.",
              },
              {
                icon: "2️⃣",
                title: "Select a Task",
                description: "Choose from active surveys, AI annotation, or chat moderation.",
              },
              {
                icon: "3️⃣",
                title: "Submit Work",
                description: "Complete tasks accurately from your phone or PC.",
              },
              {
                icon: "4️⃣",
                title: "Instant Withdrawal",
                description:
                  "Transfer Kwacha straight to MTN MoMo, Airtel Money, or Zamtel.",
              },
            ]}
          />
          <div className="mt-8 text-center">
            <ApplyButton label="Get Started Now →" />
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
          <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl dark:text-white">
            Frequently Asked Questions
          </h2>
          <div className="mt-6">
            <FaqAccordion items={FAQ_ITEMS} />
          </div>
        </div>
      </section>

      {/* Bottom Conversion CTA Banner */}
      <section className="bg-rose-600 py-12 text-center text-white dark:bg-rose-700">
        <div className="mx-auto max-w-xl px-4">
          <h2 className="mb-2 text-2xl font-extrabold text-white sm:text-3xl">
            Start Earning ZMW 80–350 / Day
          </h2>
          <p className="mb-6 text-xs text-rose-100 sm:text-sm">
            Free sign-up · MTN MoMo, Airtel Money & Zamtel instant transfers · Work on your schedule
          </p>
          <ApplyButton
            label="Apply for Zambia Online Jobs"
            className="inline-block rounded-full bg-white px-10 py-4 text-base font-bold text-rose-600 shadow-xl transition-all hover:bg-slate-50 hover:scale-105 active:scale-100"
          />
        </div>
      </section>
    </main>
  );
}