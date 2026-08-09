import { CategoryCard } from "@/app/components/CategoryCard";
import { FaqAccordion } from "@/app/components/FaqAccordion";
import LiveAITraining from "@/app/components/LiveAITraining";
import LiveForeignersOnline from "@/app/components/LiveForeignersOnline";
import LiveLocalLanguage from "@/app/components/LiveLocalLanguage";
import { LiveTaskCounter } from "@/app/components/LiveTaskCounter";
import { TrustBadges } from "@/app/components/TrustBadges";
import { StepsToEarn } from "@/app/components/StepsToEarn";
import ApplyButton from "@/app/components/ApplyButton";
import JsonLd from "@/app/components/JsonLd";
import { generateHreflangMetadata } from "@/lib/seo/hreflang";
import { VELLOEARN_REGISTER_URL } from "@/lib/constants";
import {
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle2,
  MapPin,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
  Wallet,
  XCircle,
  Zap,
} from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

// --- Metadata ---
export const metadata: Metadata = generateHreflangMetadata({
  country: "Uganda",
  countryCode: "UG",
  path: "/earn/uganda",
  title: "Latest Online Jobs in Uganda (August 2026) | MTN MoMo & Airtel Money Daily Payouts",
  description:
    "Find high-paying remote online jobs in Uganda. Earn UGX 15,000–60,000/day completing paid surveys, Luganda audio translation, AI data annotation, and chat moderation. Fast payouts via MTN MoMo & Airtel Money.",
  keywords:
    "online jobs in uganda, paid surveys uganda, luganda translation jobs, earn mobile money uganda, jobs in kampala, remote jobs uganda, mtn momo online jobs, airtel money jobs",
});

// --- Schema Structured Data ---
const ugandaHubSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.velloearn.co.ke/" },
        { "@type": "ListItem", position: 2, name: "Earn", item: "https://www.velloearn.co.ke/earn" },
        { "@type": "ListItem", position: 3, name: "Uganda", item: "https://www.velloearn.co.ke/earn/uganda" },
      ],
    },
    {
      "@type": "Organization",
      "name": "VelloEarn Uganda",
      "url": "https://www.velloearn.co.ke/earn/uganda",
      "logo": "https://www.velloearn.co.ke/logo.png",
      "description": "Remote micro-task, local language audio transcription, and AI training opportunities paying via MTN Mobile Money and Airtel Money Uganda.",
    },
  ],
};

// --- Page Component ---
export default function UgandaHubPage() {
  const todayDateFormatted = "August 2026";

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 dark:bg-slate-950 dark:text-slate-100">
      <JsonLd data={ugandaHubSchema} />

      {/* Breadcrumb Navigation */}
      <nav
        aria-label="breadcrumb"
        className="border-b border-gray-200/60 bg-white px-4 py-2 text-xs text-gray-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400"
      >
        <ol className="mx-auto flex max-w-6xl flex-wrap items-center gap-1.5">
          <li>
            <Link href="/" className="hover:text-rose-500">
              Home
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link href="/earn" className="hover:text-rose-500">
              Earn
            </Link>
          </li>
          <li>/</li>
          <li className="font-medium text-gray-800 dark:text-slate-200">Uganda</li>
        </ol>
      </nav>

      {/* ── 1. HERO SECTION ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-rose-50 via-white to-pink-50 pt-12 pb-16 sm:pt-20 sm:pb-24 dark:from-slate-900 dark:via-slate-950 dark:to-rose-950/20">
        <div className="pointer-events-none absolute top-0 right-0 h-[500px] w-[500px] -translate-y-1/2 translate-x-1/3 rounded-full bg-rose-200/20 blur-3xl dark:bg-rose-900/10" />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center">
            {/* Recency Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-rose-100 bg-rose-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-rose-600 dark:border-rose-900/50 dark:bg-rose-950/50 dark:text-rose-300">
              <Zap className="h-3.5 w-3.5 text-rose-500" />
              <span>Verified Daily Openings • {todayDateFormatted}</span>
            </div>

            {/* Core H1 Heading */}
            <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl md:text-5xl lg:text-6xl dark:text-white">
              Latest Online Jobs in{" "}
              <span className="text-rose-500">Uganda</span>
            </h1>

            {/* Subtitle with Currency & Mobile Money Triggers */}
            <p className="mx-auto mt-5 max-w-2xl text-base text-gray-600 sm:text-lg dark:text-slate-300">
              Earn between <strong className="font-bold text-gray-900 dark:text-white">UGX 15,000 – UGX 60,000 per day</strong> completing verified micro-tasks, Luganda transcription, and AI evaluation. 
              Get paid straight to <span className="font-semibold text-gray-800 dark:text-slate-200">MTN Mobile Money or Airtel Money</span>.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href={VELLOEARN_REGISTER_URL}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-rose-500 px-8 py-4 text-base font-bold text-white shadow-lg shadow-rose-500/25 transition-all hover:bg-rose-600 hover:shadow-rose-500/35 sm:w-auto"
              >
                <span>Start Earning UGX Now</span>
                <ArrowRight className="h-5 w-5" />
              </a>
              <a
                href="#categories"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-8 py-4 text-base font-semibold text-gray-700 shadow-sm transition-all hover:bg-gray-50 hover:text-gray-900 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 sm:w-auto"
              >
                Browse Categories
              </a>
            </div>

            {/* Social Proof */}
            <div className="mx-auto mt-10 max-w-2xl border-t border-gray-200/60 pt-8 dark:border-slate-800">
              <LiveTaskCounter country="Uganda" />
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. TRUST BADGES ────────────────────────────────────────────────── */}
      <section className="border-y border-gray-100 bg-white py-8 dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <TrustBadges
            paymentMethods={[
              { name: "MTN MoMo (UG)", badge: "Mobile Money" },
              { name: "Airtel Money (UG)", badge: "Mobile Money" },
              { name: "PayPal", badge: "Global" },
            ]}
            extraText="Instant withdrawals, 24/7 support"
          />
        </div>
      </section>

      {/* ── Major Cities Navigation ─────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <h2 className="flex items-center text-lg font-semibold text-gray-800 dark:text-slate-200">
          <MapPin className="mr-2 h-5 w-5 text-rose-500" />
          Popular Cities in Uganda
        </h2>
        <div className="mt-4 flex flex-wrap gap-2.5">
          {["Kampala", "Entebbe", "Jinja", "Gulu", "Mbarara", "Mbale", "Lira", "Masaka"].map((city) => (
            <Link
              key={city}
              href={`/earn/country/uganda?city=${city.toLowerCase()}`}
              className="rounded-full border border-gray-200 bg-white px-4 py-1.5 text-xs font-medium text-gray-700 transition hover:border-rose-300 hover:bg-rose-50 hover:text-rose-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-rose-900/50 dark:hover:bg-rose-950/30 dark:hover:text-rose-400"
            >
              {city}
            </Link>
          ))}
        </div>
      </section>

      {/* ── 3. FEATURED LIVE MODULES ───────────────────────────────────────── */}
      <section className="bg-gray-50/50 py-12 dark:bg-slate-950/50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col gap-8">
            {/* Live Foreigners Chat Component */}
            <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-xl shadow-gray-200/50 dark:border-slate-800 dark:bg-slate-900 dark:shadow-none sm:p-8">
              <div className="mb-6 flex items-center gap-3 border-b border-gray-100 pb-4 dark:border-slate-800">
                <div className="rounded-2xl bg-rose-50 p-2.5 text-rose-500 dark:bg-rose-950/50 dark:text-rose-400">
                  <MessageSquare className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Paid Foreigner Chat
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-slate-400">
                    Connect with affluent individuals for remote companionship.
                  </p>
                </div>
              </div>
              <LiveForeignersOnline />
            </div>

            {/* Dedicated Teaching Luganda / Local Language Component */}
            <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-xl shadow-gray-200/50 dark:border-slate-800 dark:bg-slate-900 dark:shadow-none sm:p-8">
              <div className="mb-6 flex items-center gap-3 border-b border-gray-100 pb-4 dark:border-slate-800">
                <div className="rounded-2xl bg-amber-50 p-2.5 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400">
                  <BookOpen className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Teach Luganda to Foreigners
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-slate-400">
                    Earn UGX by hosting conversational Luganda lessons for expats, tourists, and international students.
                  </p>
                </div>
              </div>
              <LiveLocalLanguage
                languageName="Luganda"
                countryName="Uganda"
                currencySymbol="UGX "
              />
            </div>

            {/* Live AI Training Tasks Component */}
            <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-xl shadow-gray-200/50 dark:border-slate-800 dark:bg-slate-900 dark:shadow-none sm:p-8">
              <div className="mb-6 flex items-center gap-3 border-b border-gray-100 pb-4 dark:border-slate-800">
                <div className="rounded-2xl bg-violet-50 p-2.5 text-violet-500 dark:bg-violet-950/50 dark:text-violet-400">
                  <Sparkles className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Real-time AI Training Stream
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-slate-400">
                    Train global machine learning models on-demand.
                  </p>
                </div>
              </div>
              <LiveAITraining />
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. JOB CATEGORIES SECTION ─────────────────────────────────────── */}
      <section id="categories" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-rose-500">
            Opportunities
          </span>
          <h2 className="mt-2 mb-3 text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Popular Job Categories in Uganda
          </h2>
          <p className="text-gray-500 dark:text-slate-400">
            Choose high-demand micro-jobs based on your schedule and device.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <CategoryCard
            icon={<Wallet className="h-6 w-6 text-rose-500" />}
            title="Paid Surveys Uganda"
            description="Complete consumer research surveys. Earn UGX 2,000–10,000 per completed questionnaire."
            href="/earn/job/surveys/uganda"
            badge="UGX Paid"
          />
          <CategoryCard
            icon={<TrendingUp className="h-6 w-6 text-rose-500" />}
            title="AI Data Annotation"
            description="Help train machine learning models by labeling images, text, and audio. High hourly output."
            href="/earn/uganda/ai-training"
            badge="Top Pick"
          />
          <CategoryCard
            icon={<Users className="h-6 w-6 text-rose-500" />}
            title="Chat & Moderation"
            description="Manage online communities and customer query tickets. Flexible 24/7 shifts."
            href="/earn/job/chat-moderation/uganda"
            badge="24/7 Shifts"
          />
          <CategoryCard
            icon={<BookOpen className="h-6 w-6 text-rose-500" />}
            title="Teach Luganda Online"
            description="Host informal conversational Luganda lessons for foreign expats & tourists. Earn per session."
            href="/earn/job/luganda-teaching/uganda"
            badge="High Payout"
          />
          <CategoryCard
            icon={<Award className="h-6 w-6 text-rose-500" />}
            title="Non-Citizen & Expat Jobs"
            description="Remote micro-tasks open to foreign residents living within Uganda."
            href="/earn/job/foreigner-remote/uganda"
            badge="Global Access"
          />
        </div>
      </section>

      {/* ── Requirements & Eligibility Grid ──────────────────────────────── */}
      <section className="border-y border-gray-100 bg-white py-12 dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-center text-2xl font-extrabold text-gray-900 dark:text-white">
            Requirements & Eligibility
          </h2>
          <p className="mx-auto mt-1 max-w-md text-center text-xs text-gray-500 dark:text-slate-400">
            Clear guidelines so you can start working on tasks immediately without delays.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-emerald-100 bg-slate-50 p-6 shadow-sm dark:border-emerald-900/30 dark:bg-slate-950">
              <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-emerald-800 dark:text-emerald-400">
                <CheckCircle2 className="h-5 w-5 text-emerald-500" /> What is required
              </h3>
              <ul className="space-y-2.5 text-xs text-gray-600 dark:text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500">•</span>
                  <span>An active smartphone or laptop with internet connection</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500">•</span>
                  <span>Registered MTN Mobile Money or Airtel Money account in Uganda</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500">•</span>
                  <span>Basic reading and comprehension in English or Luganda</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500">•</span>
                  <span>Attention to detail when following task guidelines</span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-rose-100 bg-slate-50 p-6 shadow-sm dark:border-rose-900/30 dark:bg-slate-950">
              <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-rose-600 dark:text-rose-400">
                <XCircle className="h-5 w-5 text-rose-500" /> What is NOT required
              </h3>
              <ul className="space-y-2.5 text-xs text-gray-600 dark:text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400">•</span>
                  <span>Registration fees, activation charges, or upfront deposits</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400">•</span>
                  <span>University degrees or technical work experience</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400">•</span>
                  <span>Resume/CV submissions or interview stages</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400">•</span>
                  <span>Specialized hardware or expensive software setup</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Mobile Money Guarantee Banner ─────────────────────────────────── */}
      <section className="mx-auto max-w-4xl px-4 py-12">
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 dark:border-emerald-900/50 dark:bg-emerald-950/30">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h3 className="flex items-center gap-2 text-base font-extrabold text-emerald-950 dark:text-emerald-100">
                <ShieldCheck className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                Uganda Mobile Money Direct Payout
              </h3>
              <p className="mt-1 text-xs text-emerald-800 dark:text-emerald-300">
                Instant withdrawal processing directly to your MTN MoMo or Airtel Money wallet.
              </p>
            </div>
            <span className="whitespace-nowrap rounded-full bg-emerald-600 px-3.5 py-1.5 text-xs font-bold text-white">
              0% Cashout Fee
            </span>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3 border-t border-emerald-200/60 pt-4 text-center text-xs dark:border-emerald-800/60 sm:grid-cols-4">
            <div>
              <span className="block font-bold text-emerald-900 dark:text-emerald-200">Payout Speed</span>
              <span className="text-emerald-700 dark:text-emerald-400">Under 15 Mins</span>
            </div>
            <div>
              <span className="block font-bold text-emerald-900 dark:text-emerald-200">Currency</span>
              <span className="text-emerald-700 dark:text-emerald-400">UGX Direct</span>
            </div>
            <div>
              <span className="block font-bold text-emerald-900 dark:text-emerald-200">Minimum Cashout</span>
              <span className="text-emerald-700 dark:text-emerald-400">UGX 5,000</span>
            </div>
            <div>
              <span className="block font-bold text-emerald-900 dark:text-emerald-200">Support</span>
              <span className="text-emerald-700 dark:text-emerald-400">WhatsApp & Email</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Steps to Earn ─────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-4xl px-4 py-8">
        <h2 className="mb-8 text-center text-2xl font-extrabold text-gray-900 dark:text-white">
          4 Steps to Start Earning in Uganda
        </h2>
        <StepsToEarn
          steps={[
            {
              icon: "1️⃣",
              title: "Create Free Account",
              description:
                "Sign up with your active phone number. Registration takes less than 2 minutes and is 100% free.",
            },
            {
              icon: "2️⃣",
              title: "Select Daily Tasks",
              description:
                "Choose from available AI training, Luganda teaching, foreigner chat, or micro-surveys on your dashboard.",
            },
            {
              icon: "3️⃣",
              title: "Complete & Submit",
              description:
                "Follow simple task guidelines directly on your phone or computer. Automated checks verify your work.",
            },
            {
              icon: "4️⃣",
              title: "Instant Cashout",
              description:
                "Withdraw your earned balance straight to your MTN Mobile Money or Airtel Money wallet.",
            },
          ]}
        />
        <div className="mt-8 text-center">
          <ApplyButton label="Get Started Now →" />
        </div>
      </section>

      {/* ── 5. FAQ SECTION ────────────────────────────────────────────────── */}
      <section className="border-t border-gray-100 bg-white py-16 dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
              Frequently Asked Questions
            </h2>
            <p className="mt-2 text-gray-500 dark:text-slate-400">
              Everything you need to know about starting online work in Uganda.
            </p>
          </div>
          <FaqAccordion
            items={[
              {
                question: "How can I start earning online in Uganda?",
                answer:
                  "Create a free VelloEarn account, complete your profile, and browse available micro-job categories such as paid surveys, Luganda translation, AI data annotation, and chat moderation.",
              },
              {
                question: "What payout methods are available in Uganda?",
                answer:
                  "Most opportunities pay via MTN Mobile Money Uganda, Airtel Money Uganda, or bank transfer supported by the task provider.",
              },
              {
                question: "Do I need special skills or registration fees to get started?",
                answer:
                  "No. All tasks are 100% free to join and feature beginner-friendly instructions. You only need a smartphone or computer with internet connection.",
              },
              {
                question: "How does teaching Luganda to foreigners work?",
                answer:
                  "You can host simple, conversational sessions for expats or tourists through our interactive platform modules, earning per completed session or hourly commitment.",
              },
            ]}
          />
        </div>
      </section>

      {/* Bottom Conversion CTA Banner */}
      <section className="bg-rose-500 py-12 text-center text-white">
        <div className="mx-auto max-w-xl px-4">
          <h2 className="mb-2 text-2xl font-extrabold">
            Start Earning UGX 15,000–60,000 / Day
          </h2>
          <p className="mb-6 text-xs text-rose-100">
            Free sign-up · MTN MoMo & Airtel Money instant transfers · Work on your schedule
          </p>
          <ApplyButton
            label="Apply for Online Jobs in Uganda"
            className="inline-block rounded-full bg-white px-10 py-4 text-base font-bold text-rose-500 shadow-xl transition-all hover:scale-105"
          />
        </div>
      </section>
    </main>
  );
}