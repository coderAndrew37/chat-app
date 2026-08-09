import { CategoryCard } from "@/app/components/CategoryCard";
import { FaqAccordion } from "@/app/components/FaqAccordion";
import JsonLd from "@/app/components/JsonLd";
import { LiveTaskCounter } from "@/app/components/LiveTaskCounter";
import { PayoutEstimator } from "@/app/components/PayoutEstimator";
import { StepsToEarn } from "@/app/components/StepsToEarn";
import { TaskTable } from "@/app/components/TaskTable";
import { TrustBadges } from "@/app/components/TrustBadges";
import { VELLOEARN_REGISTER_URL } from "@/lib/constants";
import { generateHreflangMetadata } from "@/lib/seo/hreflang";
import {
  ArrowRight,
  Award,
  CheckCircle2,
  Clock,
  HelpCircle,
  MapPin,
  ShieldCheck,
  Smartphone,
  TrendingUp,
  Users,
  Wallet,
  Zap,
} from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

// --- Metadata ---
export const metadata: Metadata = generateHreflangMetadata({
  country: "Nigeria",
  countryCode: "NG",
  path: "/earn/country/nigeria",
  title: "Online Jobs in Nigeria Paying via OPay, PalmPay & Banks (2026)",
  description:
    "Find verified online jobs in Nigeria with instant payouts to OPay, PalmPay, Moniepoint, Kuda, and all Nigerian banks. Earn ₦5,000‑30,000/day with AI tasks, paid surveys, and chat moderation. 100% free signup.",
  keywords:
    "online jobs in nigeria, opay jobs nigeria, palmpay jobs, earn money nigeria, paid surveys nigeria, no experience jobs nigeria, student side hustles nigeria, remote work lagos abuja, moniepoint instant payout",
});

// --- JSON-LD Structured Data ---
const nigeriaHubSchema = {
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
          name: "Nigeria Hub",
          item: "https://www.velloearn.co.ke/earn/country/nigeria",
        },
      ],
    },
    {
      "@type": "ItemList",
      "name": "Top Online Work Categories in Nigeria",
      "description": "Legitimate online tasks and micro-jobs available for Nigerians with instant mobile fintech payouts.",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "AI Data Annotation & Swahili/English Audio Training",
          "url": "https://www.velloearn.co.ke/earn/job/ai-training/nigeria",
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Paid Micro Surveys & Consumer Feedback",
          "url": "https://www.velloearn.co.ke/earn/job/surveys/nigeria",
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Chat & Content Moderation",
          "url": "https://www.velloearn.co.ke/earn/job/chat-moderation/nigeria",
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "Zero-Capital Student Side Hustles",
          "url": "https://www.velloearn.co.ke/earn/job/students/nigeria",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How do I withdraw my earnings directly to OPay, PalmPay, or my Nigerian bank?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Upon completing any task, funds credit immediately to your VelloEarn balance. Go to Cash Out, select OPay, PalmPay, Moniepoint, Kuda, or local bank transfer (GTBank, Zenith, Access, First Bank). Instant processing, zero withdrawal charges.",
          },
        },
        {
          "@type": "Question",
          "name": "Are there any registration or membership fees in Nigeria?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. VelloEarn is completely free to join in Nigeria. We never request registration deposits, activation fees, or paid training bundles.",
          },
        },
        {
          "@type": "Question",
          "name": "What is the minimum cashout threshold in Naira (NGN)?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The minimum cashout limit is ₦1,000. Once reached, instant payout triggers directly to your registered fintech phone number or NUBAN account.",
          },
        },
      ],
    },
  ],
};

const faqs = [
  {
    question: "How do I withdraw earnings directly to my OPay, PalmPay, or Nigerian bank account?",
    answer:
      "Once you complete a task, your earnings are credited to your VelloEarn wallet immediately. Withdraw anytime—choose OPay, PalmPay, Moniepoint, Kuda Bank, or any local bank (GTBank, Zenith, Access, FirstBank). Funds arrive within minutes. No traditional bank account required if you use fintech wallets.",
  },
  {
    question: "Are there registration fees or deposit requirements?",
    answer:
      "Absolutely not. Joining VelloEarn is 100% free for everyone in Nigeria. There are no hidden charges, no referral lockouts, no deposit requirements, and no paid training packages.",
  },
  {
    question: "What is the minimum withdrawal threshold in Naira (NGN)?",
    answer:
      "The minimum withdrawal amount is ₦1,000. You can withdraw as soon as you reach that threshold, and transfers to your fintech wallet or local bank account carry zero hidden charges.",
  },
  {
    question: "Can university students or NYSC corps members work on VelloEarn?",
    answer:
      "Yes! Thousands of students across UNILAG, OAU, UNN, ABU, and active NYSC corps members use VelloEarn to cover monthly stipends and data bills. All you need is an internet-connected smartphone.",
  },
  {
    question: "How much can I realistically earn per day in Nigeria?",
    answer:
      "Depending on your consistency and task availability, active workers earn between ₦5,000 and ₦30,000 per day completing AI dataset tags, audio transcription, and market research surveys.",
  },
];

export default function NigeriaHubPage() {
  const currentYear = new Date().getFullYear();

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <JsonLd data={nigeriaHubSchema} />

      {/* --- Hero Section --- */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-white px-4 py-16 sm:py-24 lg:py-28 dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto max-w-7xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-4 py-1.5 text-sm font-semibold text-rose-700 dark:border-rose-900/60 dark:bg-rose-950/50 dark:text-rose-300">
            <Zap className="h-4 w-4 text-rose-600 dark:text-rose-400" />
            <span>Updated for {currentYear} · 100% Free · No Deposit Required</span>
          </div>

          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-white">
            Legitimate Online Jobs in{" "}
            <span className="text-rose-600 dark:text-rose-400">Nigeria</span>
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-slate-600 sm:text-xl dark:text-slate-300">
            Earn <strong className="font-semibold text-slate-900 dark:text-white">₦5,000 – ₦30,000 / day</strong>{" "}
            doing simple AI data tasks, micro surveys, and content moderation from your phone. Receive direct, instant payouts to{" "}
            <strong className="font-semibold text-rose-600 dark:text-rose-400">OPay</strong>,{" "}
            <strong className="font-semibold text-rose-600 dark:text-rose-400">PalmPay</strong>,{" "}
            <strong className="font-semibold text-rose-600 dark:text-rose-400">Moniepoint</strong>, or any Nigerian NUBAN bank account.
          </p>

          {/* Primary Action Group */}
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={VELLOEARN_REGISTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-rose-600 px-8 py-4 text-base font-bold text-white shadow-lg shadow-rose-600/25 transition-all hover:bg-rose-700 hover:shadow-rose-600/35 active:scale-[0.98] sm:w-auto dark:bg-rose-600 dark:hover:bg-rose-500"
            >
              <Smartphone className="h-5 w-5" />
              <span>Start Earning with OPay/PalmPay</span>
              <ArrowRight className="h-5 w-5" />
            </a>
            <a
              href="#categories"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-7 py-4 text-base font-semibold text-slate-700 transition-colors hover:bg-slate-100 sm:w-auto dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
            >
              <TrendingUp className="h-5 w-5 text-rose-600 dark:text-rose-400" />
              <span>Browse Available Jobs</span>
            </a>
          </div>

          {/* Live Task Counter Widget */}
          <div className="mt-8 flex justify-center">
            <LiveTaskCounter />
          </div>

          {/* Key Value Propositions */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-sm font-medium text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-rose-600 dark:text-rose-400" />
              <span>No Registration Fees</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-rose-600 dark:text-rose-400" />
              <span>Instant Local Cashouts</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-rose-600 dark:text-rose-400" />
              <span>Mobile Phone Friendly</span>
            </div>
          </div>
        </div>
      </section>

      {/* --- Trust & Payment Methods Banner --- */}
      <section className="border-b border-slate-200 bg-slate-100/70 py-6 dark:border-slate-800 dark:bg-slate-900/60">
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
            extraText="Instant 24/7 withdrawals directly to your Nigerian wallet or NUBAN bank account"
          />
        </div>
      </section>

      {/* --- Major Cities Navigation Hub --- */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="flex items-center text-xl font-bold text-slate-900 dark:text-white">
            <MapPin className="mr-2 h-5 w-5 text-rose-600 dark:text-rose-400" />
            Top Locations with Active Remote Openings in Nigeria
          </h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Work remotely from anywhere across Nigeria. Select your state or major hub to view area-specific survey tasks and dataset opportunities.
          </p>
          <div className="mt-5 flex flex-wrap gap-2.5">
            {[
              "Lagos",
              "Abuja (FCT)",
              "Port Harcourt",
              "Ibadan",
              "Kano",
              "Enugu",
              "Benin City",
              "Abeokuta",
              "Kaduna",
              "Ilorin",
              "Warri",
              "Calabar",
            ].map((city) => (
              <Link
                key={city}
                href={`/earn/country/nigeria?city=${city.toLowerCase().replace(/[^a-z]/g, "")}`}
                className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-rose-300 hover:bg-rose-50 hover:text-rose-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300 dark:hover:border-rose-900 dark:hover:bg-rose-950/40 dark:hover:text-rose-300"
              >
                {city}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* --- Earning Categories Grid --- */}
      <section id="categories" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Top Earning Categories in Nigeria
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-slate-600 dark:text-slate-300">
            Choose high-demand remote workflows optimized for Nigerian users. Complete tasks on your smartphone during your spare time.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <CategoryCard
            icon={<Award className="h-8 w-8 text-rose-600 dark:text-rose-400" />}
            title="AI Training & Data Annotation"
            description="Label datasets, perform sentiment analysis, transcribe audio clips. Earn ₦2,500 – ₦12,000 / hour."
            href="/earn/job/ai-training/nigeria"
            badge="Highest Pay"
          />
          <CategoryCard
            icon={<Wallet className="h-8 w-8 text-rose-600 dark:text-rose-400" />}
            title="Micro Surveys & Market Feedback"
            description="Provide product feedback and brand opinions. ₦500 – ₦3,500 per survey (5–10 minutes each)."
            href="/earn/job/surveys/nigeria"
            badge="Instant Payout"
          />
          <CategoryCard
            icon={<Users className="h-8 w-8 text-rose-600 dark:text-rose-400" />}
            title="Chat & Content Moderation"
            description="Review online messages, flag inappropriate posts, engage in moderation queues 24/7."
            href="/earn/job/chat-moderation/nigeria"
            badge="Flexible Hours"
          />
          <CategoryCard
            icon={<ShieldCheck className="h-8 w-8 text-rose-600 dark:text-rose-400" />}
            title="Student Jobs (Zero Capital)"
            description="Ideal for university students & NYSC corps members. Work on Android/iOS with zero startup fees."
            href="/earn/job/students/nigeria"
            badge="100% Free"
          />
        </div>
      </section>

      {/* --- Active Tasks Preview Table --- */}
      <section className="border-t border-slate-200 bg-white py-16 dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="flex flex-col justify-between sm:flex-row sm:items-end">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                Live Openings in Nigeria Right Now
              </h2>
              <p className="mt-2 text-slate-600 dark:text-slate-400">
                Sample tasks available for instant completion. Signup takes under 60 seconds.
              </p>
            </div>
            <div className="mt-4 sm:mt-0">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                <span className="h-2 w-2 rounded-full bg-rose-500 animate-pulse"></span>
                Updated Realtime · Nigeria
              </span>
            </div>
          </div>

          <div className="mt-8">
            <TaskTable
              tasks={[
                {
                  id: "ng-task-1",
                  title: "Nigerian Mobile Banking App Review & UX Feedback",
                  description: "Test consumer features on mobile fintech apps and record short feedback.",
                  reward: 4500,
                  currency: "NGN",
                  estimatedTime: "8 min",
                  payoutMethods: ["OPay", "PalmPay"],
                  availableSlots: 142,
                },
                {
                  id: "ng-task-2",
                  title: "Pidgin / English AI Audio Dataset Transcription",
                  description: "Listen to 30-second audio prompts and correct speech-to-text transcripts.",
                  reward: 12500,
                  currency: "NGN",
                  estimatedTime: "20 min",
                  payoutMethods: ["OPay", "Moniepoint", "Kuda"],
                  availableSlots: 45,
                },
                {
                  id: "ng-task-3",
                  title: "FMCG Consumer Habits & Shopping Survey",
                  description: "Answer basic market research questions on daily household purchases.",
                  reward: 2000,
                  currency: "NGN",
                  estimatedTime: "5 min",
                  payoutMethods: ["PalmPay", "Bank Transfer"],
                  availableSlots: 210,
                },
                {
                  id: "ng-task-4",
                  title: "Image Classification for E-Commerce Catalog",
                  description: "Tag product photos according to fashion and electronic categories.",
                  reward: 18000,
                  currency: "NGN",
                  estimatedTime: "30 min",
                  payoutMethods: ["OPay", "Moniepoint", "PayPal"],
                  availableSlots: 18,
                },
              ]}
            />
          </div>

          {/* Quick Registration CTA Strip */}
          <div className="mt-8 rounded-2xl border border-rose-100 bg-rose-50/80 p-6 text-center sm:flex sm:items-center sm:justify-between sm:text-left dark:border-rose-900/40 dark:bg-rose-950/40">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Ready to grab these jobs?
              </h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                Register your free VelloEarn profile and start requesting task assignments immediately.
              </p>
            </div>
            <a
              href={VELLOEARN_REGISTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl bg-rose-600 px-6 py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-rose-700 sm:mt-0 dark:bg-rose-600 dark:hover:bg-rose-500"
            >
              <span>Create Account Free</span>
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* --- Nigeria Payout Estimator Component --- */}
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <PayoutEstimator
          currency="NGN"
          exchangeRate={1}
          mobileMoneyProviders={["OPay", "PalmPay", "Moniepoint", "Kuda Bank", "Nigerian Bank Transfer"]}
        />
      </section>

      {/* --- Detailed Why VelloEarn Nigeria Section --- */}
      <section className="border-t border-slate-200 bg-white py-16 dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Why Nigerians Choose VelloEarn
            </h2>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              Built specifically to overcome the common financial and withdrawal bottlenecks faced by online earners in Nigeria.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950/50">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-100 text-rose-600 dark:bg-rose-950 dark:text-rose-400">
                <Wallet className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-slate-900 dark:text-white">
                Fintech First (OPay & PalmPay)
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                Forget delayed bank transfers or international payment blocks. Receive instant, zero-fee credits to your OPay, PalmPay, or Moniepoint wallet.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950/50">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-100 text-rose-600 dark:bg-rose-950 dark:text-rose-400">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-slate-900 dark:text-white">
                Low ₦1,000 Cashout Threshold
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                You don&apos;t need to accumulate huge balances. Request payouts as soon as you hit ₦1,000 and get credited in minutes.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950/50">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-100 text-rose-600 dark:bg-rose-950 dark:text-rose-400">
                <Smartphone className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-slate-900 dark:text-white">
                Low-Data & Mobile Ready
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                Our lightweight web platform is engineered to consume minimal mobile data on MTN, Airtel, Glo, or 9mobile networks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- Step-by-step How It Works --- */}
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <StepsToEarn
          steps={[
            {
              icon: "1️⃣",
              title: "1. Create Your Free Account",
              description: "Register with your active email address and Nigerian phone number in 30 seconds. No setup charges or card details required.",
            },
            {
              icon: "2️⃣",
              title: "2. Choose Remote Tasks",
              description: "Select from AI annotation projects, mobile app tests, or high-paying surveys matching your interests.",
            },
            {
              icon: "3️⃣",
              title: "3. Complete & Verify Work",
              description: "Follow straightforward instructions right from your phone or laptop to submit your work.",
            },
            {
              icon: "4️⃣",
              title: "4. Receive Instant Cashouts",
              description: "Cash out your earnings directly to OPay, PalmPay, Moniepoint, or any commercial Nigerian bank.",
            },
          ]}
        />
      </section>

      {/* --- FAQ Accordion Section --- */}
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-3.5 py-1 text-xs font-semibold text-slate-700 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-300">
            <HelpCircle className="h-3.5 w-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Frequently Asked Questions (Nigeria)
          </h2>
        </div>

        <div className="mt-10">
          <FaqAccordion
            items={faqs}
          />
        </div>
      </section>

      {/* --- Bottom Conversion Banner CTA --- */}
      <section className="border-t border-slate-200 bg-slate-100 py-16 dark:border-slate-800 dark:bg-slate-900/80">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <div className="rounded-3xl border border-rose-200 bg-gradient-to-br from-rose-50 to-pink-50 p-8 sm:p-12 dark:border-rose-900/60 dark:from-rose-950/60 dark:to-slate-900">
            <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl dark:text-white">
              Start Earning Daily Income in Nigeria Today
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-slate-600 dark:text-slate-300">
              Join thousands of Nigerians earning reliable daily stipends on their phones. No startup investment needed.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href={VELLOEARN_REGISTER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-rose-600 px-8 py-4 text-base font-bold text-white shadow-lg shadow-rose-600/25 transition-all hover:bg-rose-700 hover:shadow-rose-600/35 active:scale-[0.98] sm:w-auto dark:bg-rose-600 dark:hover:bg-rose-500"
              >
                <span>Register Account Free</span>
                <ArrowRight className="h-5 w-5" />
              </a>
            </div>
            <p className="mt-4 text-xs font-medium text-slate-500 dark:text-slate-400">
              ⚡ Account setup takes less than 1 minute.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}