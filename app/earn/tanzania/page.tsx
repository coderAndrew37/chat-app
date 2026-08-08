
import { CategoryCard } from "@/app/components/CategoryCard";
import { FaqAccordion } from "@/app/components/FaqAccordion";
import { LiveTaskCounter } from "@/app/components/LiveTaskCounter";
import { TrustBadges } from "@/app/components/TrustBadges";
import { generateHreflangMetadata } from "@/lib/seo/hreflang";
import {
    Award,
    Globe,
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
  country: "Tanzania",
  countryCode: "TZ",
  path: "/earn/country/tanzania",
  title: "Online Jobs in Tanzania Paying via M-Pesa & Tigo Pesa (Kazi za Mtandaoni)",
  description:
    "Pata kazi za mtandaoni Tanzania na kulipwa kupitia M-Pesa, Tigo Pesa, na Airtel Money. Earn daily with surveys, AI tasks, and more. No fees, no experience needed. | Find online jobs in Tanzania with instant M-Pesa payouts.",
  keywords:
    "online jobs in tanzania, kazi za mtandaoni tanzania, m-pesa jobs tanzania, tigo pesa jobs, earn money tanzania, paid surveys tanzania, no experience jobs tanzania",
});

// --- Page Component ---
export default function TanzaniaHubPage() {
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
              <span>Updated for {currentYear} · Hakuna Ada | 100% Free</span>
            </div>
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">
              <span className="block">Kazi za Mtandaoni</span>
              <span className="block bg-gradient-to-r from-emerald-500 to-indigo-500 bg-clip-text text-transparent">
                Tanzania
              </span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-300">
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                Pata TZS 10,000 – 60,000 kwa siku
              </span>{" "}
              | Earn daily via{" "}
              <strong className="text-indigo-600 dark:text-indigo-400">M-Pesa</strong>,{" "}
              <strong className="text-indigo-600 dark:text-indigo-400">Tigo Pesa</strong>, or{" "}
              <strong className="text-indigo-600 dark:text-indigo-400">Airtel Money</strong>.
            </p>
            <p className="mx-auto mt-1 text-sm text-slate-500 dark:text-slate-400">
              No experience required · Hakuna uzoefu unaohitajika
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-indigo-500 px-6 py-3 font-semibold text-white shadow-lg shadow-emerald-500/25 transition-all hover:scale-105 hover:shadow-xl active:scale-95"
              >
                <Smartphone className="h-5 w-5" />
                Anza Kupata | Start Earning
              </Link>
              <Link
                href="#categories"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-6 py-3 font-semibold text-slate-700 backdrop-blur-sm transition-all hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
              >
                <TrendingUp className="h-5 w-5" />
                Tazama Kazi | Browse Jobs
              </Link>
            </div>
            {/* Live counter */}
            <div className="mt-6 flex justify-center">
              <LiveTaskCounter />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Banner with Tanzania-specific payment badges */}
      <section className="border-y border-slate-200/80 bg-white/50 dark:border-white/5 dark:bg-white/5 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <TrustBadges
            paymentMethods={[
              { name: "M-Pesa (TZ)", icon: "📱" },
              { name: "Tigo Pesa", icon: "📲" },
              { name: "Airtel Money (TZ)", icon: "📳" },
              { name: "PayPal", icon: "💳" },
            ]}
            extraText="Pato la papo kwa papo | Instant withdrawals"
          />
        </div>
      </section>

      {/* Major Cities Hub Section */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h2 className="text-xl font-semibold text-slate-800 dark:text-white">
          <MapPin className="mr-2 inline h-5 w-5 text-emerald-500" />
          Miji Mikubwa | Major Cities
        </h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {["Dar es Salaam", "Arusha", "Mwanza", "Dodoma", "Zanzibar", "Mbeya"].map((city) => (
            <Link
              key={city}
              href={`/earn/country/tanzania?city=${city.toLowerCase().replace(/\s/g, "-")}`}
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
          Aina za Kazi | Job Categories
        </h2>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          Chagua kazi inayokufaa · Choose tasks that pay via mobile money.
        </p>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <CategoryCard
            icon={<Award className="h-8 w-8" />}
            title="AI Training & Swahili Data Annotation"
            description="Label images, transcribe Swahili audio, train AI models. TZS 5,000‑20,000 / hour."
            href="/earn/job/ai-training/tanzania"
            badge="Hot in Dar"
          />
          <CategoryCard
            icon={<Wallet className="h-8 w-8" />}
            title="Micro Surveys & Instant Payout"
            description="Jibu maswali na upate TZS 2,000‑10,000 kwa dakika 5‑10."
            href="/earn/job/surveys/tanzania"
            badge="Papo kwa Papo"
          />
          <CategoryCard
            icon={<Users className="h-8 w-8" />}
            title="Chat & Text Moderation"
            description="Moderate content, chat with users, earn per task. 24/7 flexible."
            href="/earn/job/chat-moderation/tanzania"
            badge="24/7"
          />
          <CategoryCard
            icon={<Globe className="h-8 w-8" />}
            title="Student Jobs (Bila Mtaji)"
            description="No capital required. Work on your phone between classes."
            href="/earn/job/students/tanzania"
            badge="100% Free"
          />
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
          Maswali Yanayoulizwa Sana | FAQs
        </h2>
        <div className="mt-6">
          <FaqAccordion
            items={[
              {
                question: "How do I withdraw earnings directly to Vodacom M-Pesa or Tigo Pesa?",
                answer:
                  "Once you complete a task, your earnings are credited to your VelloEarn wallet. Withdraw anytime – choose Vodacom M-Pesa, Tigo Pesa, or Airtel Money. Funds arrive within minutes. No bank account needed. / Baada ya kumaliza kazi, malipo yako yanaingia kwenye wallet yako. Toa pesa wakati wowote – chagua M-Pesa, Tigo Pesa, au Airtel Money. Pesa inafika ndani ya dakika chache.",
              },
              {
                question: "Do I need previous experience or registration fees?",
                answer:
                  "No. All tasks are designed for beginners with clear instructions. Registration is 100% free – no hidden charges. / Hapana. Kazi zote zimeundwa kwa ajili ya wanaoanza na maelekezo wazi. Usajili ni bure kabisa – hakuna ada za ziada.",
              },
              {
                question: "What is the minimum payout amount in TZS?",
                answer:
                  "The minimum withdrawal amount is TZS 5,000. You can withdraw as soon as you reach that threshold, and the transfer to your mobile money is free. / Kiwango cha chini cha kutoa pesa ni TZS 5,000. Unaweza kutoa mara tu unapofikia kiwango hicho, na uhamisho kwa mobile money yako ni bure.",
              },
            ]}
          />
        </div>
      </section>
    </main>
  );
}