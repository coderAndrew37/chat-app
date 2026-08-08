
import { CategoryCard } from "@/app/components/CategoryCard";
import { FaqAccordion } from "@/app/components/FaqAccordion";
import { LiveTaskCounter } from "@/app/components/LiveTaskCounter";
import { TrustBadges } from "@/app/components/TrustBadges";
import { generateHreflangMetadata } from "@/lib/seo/hreflang";
import {
    Award,
    MapPin,
    ShieldCheck,
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
  country: "Cameroon",
  countryCode: "CM",
  path: "/earn/country/cameroon",
  title: "Online Jobs in Cameroon Paying via MTN MoMo & Orange Money (Emplois en Ligne)",
  description:
    "Find online jobs in Cameroon with instant payouts to MTN Mobile Money & Orange Money. Earn 2,000‑15,000 FCFA/day with surveys, AI tasks, and micro‑work. No fees, no experience required. | Trouvez des emplois en ligne au Cameroun avec paiements instantanés via MTN MoMo et Orange Money. Gagnez 2 000‑15 000 FCFA/jour.",
  keywords:
    "online jobs in cameroon, emplois en ligne cameroun, MTN MoMo cameroun, orange money cameroun, paid surveys cameroon, sondages rémunérés cameroun, no experience jobs cameroon",
});

// --- Page Component ---
export default function CameroonHubPage() {
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
              <span>Updated for {currentYear} · 100% Free / Gratuit</span>
            </div>
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">
              <span className="block">Online Jobs in Cameroon</span>
              <span className="block bg-gradient-to-r from-emerald-500 to-indigo-500 bg-clip-text text-transparent">
                Emplois en Ligne Cameroun
              </span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-300">
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                Earn 2,000 – 15,000 FCFA / day · Gagnez 2 000 – 15 000 FCFA / jour
              </span>{" "}
              with instant payouts via{" "}
              <strong className="text-indigo-600 dark:text-indigo-400">MTN MoMo</strong> and{" "}
              <strong className="text-indigo-600 dark:text-indigo-400">Orange Money</strong>.
            </p>
            <p className="mx-auto mt-1 text-sm text-slate-500 dark:text-slate-400">
              No experience required · Aucune expérience requise
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-indigo-500 px-6 py-3 font-semibold text-white shadow-lg shadow-emerald-500/25 transition-all hover:scale-105 hover:shadow-xl active:scale-95"
              >
                <Smartphone className="h-5 w-5" />
                Start Earning · Commencer
              </Link>
              <Link
                href="#categories"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-6 py-3 font-semibold text-slate-700 backdrop-blur-sm transition-all hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
              >
                <TrendingUp className="h-5 w-5" />
                Browse Jobs · Voir les offres
              </Link>
            </div>
            {/* Live counter */}
            <div className="mt-6 flex justify-center">
              <LiveTaskCounter />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Banner with Cameroon-specific payment badges */}
      <section className="border-y border-slate-200/80 bg-white/50 dark:border-white/5 dark:bg-white/5 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <TrustBadges
            paymentMethods={[
              { name: "MTN MoMo (CM)", icon: "📱" },
              { name: "Orange Money (CM)", icon: "📲" },
              { name: "PayPal", icon: "💳" },
            ]}
            extraText="Instant withdrawals · Paiement instantané"
          />
        </div>
      </section>

      {/* Major Cities Hub Section */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h2 className="text-xl font-semibold text-slate-800 dark:text-white">
          <MapPin className="mr-2 inline h-5 w-5 text-emerald-500" />
          Major Cities · Grandes Villes
        </h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {["Douala", "Yaoundé", "Bamenda", "Garoua", "Bafoussam", "Maroua"].map((city) => (
            <Link
              key={city}
              href={`/earn/country/cameroon?city=${city.toLowerCase()}`}
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
          Job Categories · Catégories d&apos;emplois
        </h2>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          Choose tasks that pay via MTN MoMo & Orange Money.
          <br className="sm:hidden" />
          <span className="hidden sm:inline"> </span>Choisissez des tâches payées via MTN MoMo & Orange Money.
        </p>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <CategoryCard
            icon={<Award className="h-8 w-8" />}
            title="AI Training & Data Annotation"
            description="Label images, transcribe audio, train AI models. 1,000‑5,000 FCFA / hour."
            href="/earn/job/ai-training/cameroon"
            badge="Bilingual · Bilingue"
          />
          <CategoryCard
            icon={<Wallet className="h-8 w-8" />}
            title="Micro Surveys & Instant Payout"
            description="Sondages rémunérés – earn 500‑2,000 FCFA per survey. 5‑10 min."
            href="/earn/job/surveys/cameroon"
            badge="Quick Cash"
          />
          <CategoryCard
            icon={<Users className="h-8 w-8" />}
            title="Chat & Text Moderation"
            description="Moderate content, chat with users, earn per task. 24/7 flexible."
            href="/earn/job/chat-moderation/cameroon"
            badge="24/7"
          />
          <CategoryCard
            icon={<ShieldCheck className="h-8 w-8" />}
            title="Student Jobs (Zero Capital)"
            description="Sans capital. Work on your phone anytime, anywhere."
            href="/earn/job/students/cameroon"
            badge="100% Free · Gratuit"
          />
        </div>
      </section>

      {/* FAQ Accordion (Bilingual) */}
      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
          FAQ · Foire aux questions
        </h2>
        <div className="mt-6">
          <FaqAccordion
            items={[
              {
                question: "How do I withdraw earnings directly to my MTN MoMo or Orange Money account in Cameroon?",
                answer:
                  "Once you complete a task, your earnings are credited to your VelloEarn wallet. Withdraw anytime – choose MTN Mobile Money or Orange Money. Funds arrive within minutes. No bank account needed. / Après avoir terminé une tâche, vos gains sont crédités sur votre portefeuille VelloEarn. Retirez à tout moment – choisissez MTN MoMo ou Orange Money. Les fonds arrivent en quelques minutes. Aucun compte bancaire requis.",
              },
              {
                question: "Are there registration fees or deposit requirements?",
                answer:
                  "Absolutely not. Joining VelloEarn is 100% free. No hidden fees, no deposits, no paid training. You simply sign up and start working. / Absolument pas. Rejoindre VelloEarn est 100% gratuit. Aucuns frais cachés, aucun dépôt, aucune formation payante. Vous vous inscrivez et commencez à travailler.",
              },
              {
                question: "What is the minimum payout threshold in FCFA (XAF)?",
                answer:
                  "The minimum withdrawal amount is 1,000 FCFA. You can withdraw as soon as you reach that threshold, and the transfer to your mobile money is free. / Le montant minimum de retrait est de 1 000 FCFA. Vous pouvez retirer dès que vous atteignez ce seuil, et le transfert vers votre mobile money est gratuit.",
              },
            ]}
          />
        </div>
      </section>
    </main>
  );
}