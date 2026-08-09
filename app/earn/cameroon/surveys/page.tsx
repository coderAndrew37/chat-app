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
    ShieldCheck,
    Smartphone,
    TrendingUp,
    Zap
} from "lucide-react";
import { Metadata } from "next";

// --- Metadata ---
export const metadata: Metadata = generateHreflangMetadata({
  country: "Cameroon",
  countryCode: "CM",
  path: "/earn/cameroon/surveys",
  title: "Paid Surveys in Cameroon – Earn 500‑2,000 FCFA with MTN MoMo & Orange Money",
  description:
    "Take paid surveys in Cameroon and earn 500‑2,000 FCFA per survey. Instant payouts to MTN MoMo & Orange Money. No experience needed. Start earning today. | Réalisez des sondages rémunérés au Cameroun et gagnez 500‑2 000 FCFA par sondage. Paiements instantanés via MTN MoMo et Orange Money.",
  keywords:
    "paid surveys cameroon, sondages rémunérés cameroun, online surveys cameroon, earn money cameroon, MTN MoMo surveys, orange money surveys, sondages douala yaounde",
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
          name: "Jobs",
          item: "https://www.velloearn.co.ke/earn",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Surveys in Cameroon",
          item: "https://www.velloearn.co.ke/earn/cameroon/surveys",
        },
      ],
    },
    {
      "@type": "JobPosting",
      "title": "Survey Participant & Micro-Tasker – Cameroon",
      "description":
        "Complete online surveys and get paid instantly via MTN Mobile Money or Orange Money. Flexible, remote work across Cameroon. / Réalisez des sondages en ligne et recevez vos paiements instantanément via MTN MoMo ou Orange Money.",
      "hiringOrganization": {
        "@type": "Organization",
        "name": "VelloEarn",
        "sameAs": "https://www.velloearn.co.ke",
      },
      "jobLocation": {
        "@type": "Place",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "CM",
        },
      },
      "applicantLocationRequirements": {
        "@type": "Country",
        "name": "Cameroon",
      },
      "baseSalary": {
        "@type": "MonetaryAmount",
        "currency": "XAF",
        "value": { "@type": "QuantitativeValue", "value": 1500, "unitText": "HOUR" },
      },
      "employmentType": "PART_TIME",
      "datePosted": "2026-01-15",
      "validThrough": "2026-12-31",
    },
  ],
};

// --- Interfaces ---
interface SurveyTask {
  id: string;
  title: string;
  description: string;
  reward: number;
  currency: string;
  estimatedTime: string;
  payoutMethods: string[];
  availableSlots: number;
}

export default function CameroonSurveysPage() {
  const surveyTasksList: SurveyTask[] = [
    {
      id: "cm-survey-1",
      title: "Consumer Opinion Survey / Sondage d'opinion consommateur",
      description: "Share your thoughts on FMCG brands and mobile service preferences in Douala & Yaoundé.",
      reward: 800,
      currency: "XAF",
      estimatedTime: "5 min",
      payoutMethods: ["MTN MoMo", "Orange Money"],
      availableSlots: 40,
    },
    {
      id: "cm-survey-2",
      title: "Mobile Money User Experience / Expérience Utilisateur Mobile Money",
      description: "Feedback on local digital wallets, transaction fees, and app usability (*126# & *150#).",
      reward: 1500,
      currency: "XAF",
      estimatedTime: "10 min",
      payoutMethods: ["Orange Money", "MTN MoMo"],
      availableSlots: 25,
    },
    {
      id: "cm-survey-3",
      title: "Product Labeling & Image Tagging (Bilingual)",
      description: "Categorize retail inventory items and verify description text in French or English.",
      reward: 2000,
      currency: "XAF",
      estimatedTime: "12 min",
      payoutMethods: ["MTN MoMo", "Express Union"],
      availableSlots: 30,
    },
    {
      id: "cm-survey-4",
      title: "Audio Transcription Snippets (French/English)",
      description: "Transcribe short audio clips to improve regional natural language processing models.",
      reward: 2500,
      currency: "XAF",
      estimatedTime: "15 min",
      payoutMethods: ["MTN MoMo", "Orange Money"],
      availableSlots: 15,
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <JsonLd data={surveyJobSchema} />

      {/* --- HERO SECTION --- */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-white px-4 py-16 sm:py-24 dark:border-slate-800 dark:bg-slate-900">
        <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-rose-500/10 blur-3xl dark:bg-rose-600/10" />

        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-4 py-1.5 text-xs font-semibold text-rose-700 sm:text-sm dark:border-rose-900/60 dark:bg-rose-950/50 dark:text-rose-300">
            <Zap className="h-4 w-4 text-rose-600 dark:text-rose-400" />
            <span>Updated 2026 · Paid Surveys Cameroon</span>
          </div>

          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl dark:text-white">
            Paid Surveys & Micro‑Tasks in Cameroon
            <span className="block text-rose-600 dark:text-rose-400">
              Sondages Rémunérés au Cameroun
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-xl dark:text-slate-300">
            Earn <strong className="font-semibold text-slate-900 dark:text-white">500 – 2,500 FCFA per survey</strong>. Instant payouts directly to your{" "}
            <span className="font-semibold text-rose-600 dark:text-rose-400">MTN Mobile Money</span> or{" "}
            <span className="font-semibold text-rose-600 dark:text-rose-400">Orange Money</span> wallet.
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-sm font-medium text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-rose-600 dark:text-rose-400" />
              100% Free / Gratuit
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-rose-600 dark:text-rose-400" />
              No Experience Required
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-rose-600 dark:text-rose-400" />
              Bilingual (FR / EN)
            </span>
          </div>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={VELLOEARN_REGISTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-rose-600 px-8 py-4 text-base font-bold text-white shadow-lg shadow-rose-600/25 transition-all hover:bg-rose-700 hover:shadow-rose-600/35 active:scale-[0.98] sm:w-auto dark:bg-rose-600 dark:hover:bg-rose-500"
            >
              <Smartphone className="h-5 w-5" />
              <span>Start Earning Now · Commencer</span>
            </a>
          </div>
        </div>
      </section>

      {/* --- TRUST BADGES --- */}
      <section className="border-b border-slate-200 bg-slate-100/70 py-6 dark:border-slate-800 dark:bg-slate-900/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <TrustBadges
            paymentMethods={[
              { name: "MTN MoMo", badge: "MTN MoMo CM (*126#)" },
              { name: "Orange Money", badge: "Orange Money CM (*150#)" },
              { name: "Express Union", badge: "EU Mobile Money" },
            ]}
            extraText="Instant withdrawals · Paiement instantané sans aucun frais masqué"
          />
        </div>
      </section>

      {/* --- LIVE TASK TABLE --- */}
      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wide uppercase text-rose-600 dark:text-rose-400">
              <TrendingUp className="h-4 w-4" />
              <span>Real-Time Tasks / Offres Disponibles</span>
            </div>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
              Available Surveys & Micro‑Tasks
            </h2>
          </div>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Updated today · Mis à jour quotidiennement
          </p>
        </div>

        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <TaskTable tasks={surveyTasksList} />
        </div>
      </section>

      {/* --- PAYOUT ESTIMATOR --- */}
      <section className="border-t border-slate-200 bg-white py-12 dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
              Earnings Calculator (FCFA)
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Calculate your estimated daily or weekly payouts based on active time spent.
            </p>
          </div>
          <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
            <PayoutEstimator
              currency="XAF"
              exchangeRate={1}
              mobileMoneyProviders={["MTN Mobile Money (*126#)", "Orange Money (*150#)", "Express Union"]}
            />
          </div>
        </div>
      </section>

      {/* --- BILINGUAL STEPS TO EARN --- */}
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
            How to Complete Surveys in 4 Easy Steps
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Comment participer aux sondages et retirer vos gains au Cameroun.
          </p>
        </div>

        <div className="mt-10">
          <StepsToEarn
            steps={[
              {
                icon: "1️⃣",
                title: "Register for Free · Inscription Gratuite",
                description: "Create your VelloEarn account using your Cameroonian phone number (+237) or email.",
              },
              {
                icon: "2️⃣",
                title: "Select a Survey · Choisissez un Sondage",
                description: "Filter available tasks by time required, language (FR/EN), and reward size in FCFA.",
              },
              {
                icon: "3️⃣",
                title: "Submit Feedback · Effectuez le Travail",
                description: "Answer questions honestly or complete simple data validation steps on your phone.",
              },
              {
                icon: "4️⃣",
                title: "Instant Mobile Payout · Retrait Mobile Money",
                description: "Cash out earnings above 1,000 FCFA directly to MTN MoMo or Orange Money with zero fees.",
              },
            ]}
          />
        </div>
      </section>

      {/* --- LOCAL TIPS & GUIDANCE SECTION --- */}
      <section className="border-t border-slate-200 bg-slate-100/60 py-12 dark:border-slate-800 dark:bg-slate-900/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="rounded-2xl border border-rose-200 bg-white p-6 shadow-sm dark:border-rose-900/40 dark:bg-slate-900">
            <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400">
              <ShieldCheck className="h-5 w-5" />
              <h3 className="font-bold text-slate-900 dark:text-white">
                Tips for Maximum Earnings in Cameroon / Conseils Pratiques
              </h3>
            </div>
            <ul className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-300">
              <li className="flex items-start gap-2">
                <span className="font-bold text-rose-600 dark:text-rose-400">•</span>
                <span>
                  <strong>Complete Your Profile:</strong> Accurate geographic details (Douala, Yaoundé, Buea, etc.) ensure you get matched with higher-paying localized surveys.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-rose-600 dark:text-rose-400">•</span>
                <span>
                  <strong>Check Daily at Morning Peaks:</strong> New survey quotas for Cameroonian participants typically release around 8:00 AM and 2:00 PM local time.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-rose-600 dark:text-rose-400">•</span>
                <span>
                  <strong>Zero Upfront Fees:</strong> VelloEarn is completely free. Never send money to anyone claiming to sell &quot;premium survey access&quot; in Cameroon.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* --- BOTTOM CTA --- */}
      <section className="border-t border-slate-200 bg-white py-16 dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <div className="rounded-3xl border border-rose-200 bg-gradient-to-br from-rose-50 via-pink-50 to-white p-8 shadow-sm sm:p-12 dark:border-rose-900/60 dark:from-rose-950/60 dark:via-slate-900 dark:to-slate-900">
            <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl dark:text-white">
              Ready to Take Your First Survey?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-slate-600 dark:text-slate-300">
              Inscrivez-vous gratuitement et recevez vos premiers paiements sur votre compte Mobile Money.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href={VELLOEARN_REGISTER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-rose-600 px-8 py-4 text-base font-bold text-white shadow-lg shadow-rose-600/25 transition-all hover:bg-rose-700 hover:shadow-rose-600/35 active:scale-[0.98] sm:w-auto dark:bg-rose-600 dark:hover:bg-rose-500"
              >
                <span>Create Account · S&apos;inscrire Gratuitement</span>
                <ArrowRight className="h-5 w-5" />
              </a>
            </div>
            <p className="mt-4 text-xs font-medium text-slate-500 dark:text-slate-400">
              ⚡ Mobile optimized · Works on all 3G/4G Cameroonian networks.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}