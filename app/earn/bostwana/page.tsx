import { CategoryCard } from "@/app/components/CategoryCard";
import { FaqAccordion } from "@/app/components/FaqAccordion";
import LiveAITraining from "@/app/components/LiveAITraining";
import LiveForeignersOnline from "@/app/components/LiveForeignersOnline";
import LiveLocalLanguage from "@/app/components/LiveLocalLanguage";
import { LiveTaskCounter } from "@/app/components/LiveTaskCounter";
import { TrustBadges } from "@/app/components/TrustBadges";
import { VELLOEARN_REGISTER_URL } from "@/lib/constants";
import { generateCountryMetadata } from "@/lib/seo/countries";
import {
  ArrowRight,
  Award,
  BookOpen,
  MessageSquare,
  Sparkles,
  TrendingUp,
  Users,
  Wallet,
  Zap,
} from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = generateCountryMetadata({
  country: "Botswana",
  countryCode: "BW",
  path: "/earn/botswana",
  title: "Latest Online Jobs in Botswana (August 2026) | Daily Pula Payouts",
  description:
    "Find high-paying remote online jobs in Botswana. Earn P150–P500/day completing paid surveys, AI data annotation, and chat moderation. Fast payouts via Orange Money & FNB eWallet.",
  keywords:
    "online jobs in botswana, paid surveys botswana, earn pula online, jobs in gaborone, remote jobs botswana, online work for students in botswana, orange money online jobs",
});

export default function BotswanaHubPage() {
  const todayDateFormatted = "August 2026";

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      {/* ── 1. HERO SECTION ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-rose-50 via-white to-orange-50 pt-12 pb-16 sm:pt-20 sm:pb-24">
        {/* Radial background glow */}
        <div className="pointer-events-none absolute top-0 right-0 h-[500px] w-[500px] -translate-y-1/2 translate-x-1/3 rounded-full bg-rose-200/20 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center">
            {/* Recency Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-rose-100 bg-rose-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-rose-600">
              <Zap className="h-3.5 w-3.5 text-rose-500" />
              <span>Verified Daily Openings • {todayDateFormatted}</span>
            </div>

            {/* Core H1 Keyword Heading */}
            <h1 className="mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight">
              Latest Online Jobs in{" "}
              <span className="text-rose-500">Botswana</span>
            </h1>

            {/* Subtitle with Currency & Local Triggers */}
            <p className="mx-auto mt-5 max-w-2xl text-base sm:text-lg text-gray-500 leading-relaxed">
              Earn between <strong className="font-bold text-gray-900">P150 – P500 per day</strong> completing verified micro-tasks, surveys, and AI evaluation. 
              Get paid straight to <span className="font-semibold text-gray-800">Orange Money, MyZaka, or Bank Transfer</span>.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={VELLOEARN_REGISTER_URL}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-rose-500 px-8 py-4 text-base font-bold text-white shadow-lg shadow-rose-500/25 transition-all hover:bg-rose-600 hover:shadow-rose-500/35"
              >
                <span>Start Earning Pulas Now</span>
                <ArrowRight className="h-5 w-5" />
              </a>
              <a
                href="#categories"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-8 py-4 text-base font-semibold text-gray-700 shadow-sm transition-all hover:bg-gray-50 hover:text-gray-900"
              >
                Browse Categories
              </a>
            </div>

            {/* Social Proof */}
            <div className="mt-10 pt-8 border-t border-gray-200/60 max-w-2xl mx-auto">
              <LiveTaskCounter />
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. TRUST BADGES ────────────────────────────────────────────────── */}
      <section className="border-y border-gray-100 bg-white py-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <TrustBadges />
        </div>
      </section>

      {/* ── 3. FEATURED LIVE MODULES ───────────────────────────────────────── */}
      <section className="py-12 bg-gray-50/50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col gap-8">
            {/* Live Foreigners Chat Component */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-gray-200/50 border border-gray-100">
              <div className="mb-6 flex items-center gap-3 border-b border-gray-100 pb-4">
                <div className="p-2.5 bg-rose-50 text-rose-500 rounded-2xl">
                  <MessageSquare className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Paid Foreigner Chat
                  </h3>
                  <p className="text-xs text-gray-500">
                    Connect with affluent individuals for remote companionship.
                  </p>
                </div>
              </div>
              <LiveForeignersOnline />
            </div>

            {/* Dedicated Teaching Setswana Component */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-gray-200/50 border border-gray-100">
              <div className="mb-6 flex items-center gap-3 border-b border-gray-100 pb-4">
                <div className="p-2.5 bg-amber-50 text-amber-600 rounded-2xl">
                  <BookOpen className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Teach Setswana to Foreigners
                  </h3>
                  <p className="text-xs text-gray-500">
                    Earn Pulas by hosting conversational Setswana lessons for expats, tourists, and international students.
                  </p>
                </div>
              </div>
              <LiveLocalLanguage
                languageName="Setswana"
                countryName="Botswana"
                currencySymbol="P"
              />
            </div>

            {/* Live AI Training Tasks Component */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-gray-200/50 border border-gray-100">
              <div className="mb-6 flex items-center gap-3 border-b border-gray-100 pb-4">
                <div className="p-2.5 bg-violet-50 text-violet-500 rounded-2xl">
                  <Sparkles className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Real-time AI Training Stream
                  </h3>
                  <p className="text-xs text-gray-500">
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
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-rose-500 font-semibold text-sm uppercase tracking-wider">
            Opportunities
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2 mb-3">
            Popular Job Categories in Botswana
          </h2>
          <p className="text-gray-500">
            Choose high-demand micro-jobs based on your schedule and equipment.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <CategoryCard
            icon={<Wallet className="h-6 w-6" />}
            title="Paid Surveys Botswana"
            description="Complete consumer research surveys. Earn P15–P60 per completed questionnaire."
            href="/earn/job/surveys/botswana"
            badge="Pula Paid"
          />
          <CategoryCard
            icon={<TrendingUp className="h-6 w-6" />}
            title="AI Data Annotation"
            description="Help train machine learning models by labeling images and text. High hourly output."
            href="/earn/job/ai-annotation/botswana"
            badge="Top Pick"
          />
          <CategoryCard
            icon={<Users className="h-6 w-6" />}
            title="Chat & Moderation"
            description="Manage online communities and customer query tickets. Flexible 24/7 shifts."
            href="/earn/job/chat-moderation/botswana"
            badge="24/7 Shifts"
          />
          <CategoryCard
  icon={<BookOpen className="h-6 w-6" />}
  title="Teach Setswana Online"
  description="Host informal conversational Setswana lessons for foreign expats & tourists. Earn per session."
  href="/earn/job/setswana-teaching/botswana"
  badge="High Payout"
/>
          <CategoryCard
            icon={<Award className="h-6 w-6" />}
            title="Non-Citizen & Expat Jobs"
            description="Remote micro-tasks open to foreign residents living within Botswana."
            href="/earn/job/foreigners/botswana"
            badge="Global Access"
          />
        </div>
      </section>

      {/* ── 5. FAQ SECTION ────────────────────────────────────────────────── */}
      <section className="bg-white border-t border-gray-100 py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Frequently Asked Questions
            </h2>
            <p className="mt-2 text-gray-500">
              Everything you need to know about starting online work in Botswana.
            </p>
          </div>
          <FaqAccordion
            items={[
              {
                question: "How can I start earning online in Botswana?",
                answer:
                  "Create a VelloEarn account, complete your profile, and browse available micro-job categories such as paid surveys, AI data annotation, and chat moderation."
              },
              {
                question: "What payout methods are available in Botswana?",
                answer:
                  "Most opportunities pay via Orange Money, MyZaka, FNB eWallet, bank transfer, or other local cash-out methods supported by the task provider."
              },
              {
                question: "Do I need special skills to get started?",
                answer:
                  "No. Many beginner-friendly tasks only require a smartphone, laptop, stable internet connection, and the ability to follow simple instructions."
              },
              {
                question: "Are these online jobs available for students or expats?",
                answer:
                  "Yes. Students, remote workers, and foreign residents in Botswana can apply to opportunities that accept flexible schedules and location-independent work."
              }
            ]}
          />
        </div>
      </section>
    </main>
  );
}