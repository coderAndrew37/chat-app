import { Metadata } from "next";
import { generateHreflangMetadata } from "@/lib/seo/hreflang";
import JsonLd from "@/app/components/JsonLd";
import { PayoutEstimator } from "@/app/components/PayoutEstimator";
import { StepsToEarn } from "@/app/components/StepsToEarn";
import { TaskTable } from "@/app/components/TaskTable";
import { TrustBadges } from "@/app/components/TrustBadges";


// --- Metadata ---
export const metadata: Metadata = generateHreflangMetadata({
  country: "Cameroon",
  countryCode: "CM",
  path: "/earn/cameroon/surveys",
  title: "Paid Surveys in Cameroon – Earn 500‑2,000 FCFA with MTN MoMo & Orange Money",
  description:
    "Take paid surveys in Cameroon and earn 500‑2,000 FCFA per survey. Instant payouts to MTN MoMo & Orange Money. No experience needed. Start earning today. | Réalisez des sondages rémunérés au Cameroun et gagnez 500‑2 000 FCFA par sondage. Paiements instantanés via MTN MoMo et Orange Money.",
  keywords:
    "paid surveys cameroon, sondages rémunérés cameroun, online surveys cameroon, earn money cameroon, MTN MoMo surveys, orange money surveys",
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
      "title": "Survey Participant – Cameroon",
      "description":
        "Complete online surveys and get paid instantly via MTN Mobile Money or Orange Money. Flexible, remote work. / Réalisez des sondages en ligne et recevez vos paiements instantanément via MTN MoMo ou Orange Money.",
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
        "value": { "@type": "QuantitativeValue", "value": 1000, "unitText": "HOUR" },
      },
      "employmentType": "PART_TIME",
      "datePosted": new Date().toISOString().split("T")[0],
      "validThrough": new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    },
  ],
};

// --- Page Component ---
export default function CameroonSurveysPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-950">
      <JsonLd data={surveyJobSchema} />

      {/* Hero */}
      <section className="bg-gradient-to-r from-emerald-600 to-indigo-600 px-4 py-16 text-white sm:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-extrabold sm:text-5xl">
            Paid Surveys & Micro‑Tasks in Cameroon
          </h1>
          <p className="mt-4 text-lg text-emerald-100">
            Earn <strong className="text-white">500 – 2,000 FCFA per survey</strong>. Instant payouts via MTN MoMo or Orange Money.
          </p>
          <p className="mt-2 text-sm text-emerald-200">
            ✅ No experience required · Aucune expérience requise · 100% free
          </p>
        </div>
      </section>

      {/* Trust badges */}
      <div className="mx-auto max-w-7xl px-4 py-6">
        <TrustBadges
          paymentMethods={[
            { name: "MTN MoMo (CM)", icon: "📱" },
            { name: "Orange Money (CM)", icon: "📲" },
            { name: "PayPal", icon: "💳" },
          ]}
          extraText="Instant withdrawals · Paiement instantané"
        />
      </div>

      {/* Task Table */}
      <section className="mx-auto max-w-4xl px-4 py-8">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Available Surveys & Micro‑Tasks
        </h2>
        <p className="mt-1 text-slate-600 dark:text-slate-300">
          Updated daily · Mis à jour quotidiennement.
        </p>
        <div className="mt-6">
          <TaskTable
            tasks={[
              {
                id: "cm-survey-1",
                title: "Consumer Opinion Survey / Sondage d'opinion",
                description: "Share your thoughts on brands and products.",
                reward: 800,
                currency: "XAF",
                estimatedTime: "5 min",
                payoutMethods: ["MTN MoMo", "Orange Money"],
                availableSlots: 40,
              },
              {
                id: "cm-survey-2",
                title: "Mobile Money User Experience",
                description: "Tell us about your experience with mobile money.",
                reward: 1500,
                currency: "XAF",
                estimatedTime: "10 min",
                payoutMethods: ["Orange Money", "PayPal"],
                availableSlots: 25,
              },
              {
                id: "cm-survey-3",
                title: "Product Labeling (French/English)",
                description: "Categorize product images in French or English.",
                reward: 2000,
                currency: "XAF",
                estimatedTime: "12 min",
                payoutMethods: ["MTN MoMo", "PayPal"],
                availableSlots: 30,
              },
              {
                id: "cm-survey-4",
                title: "Audio Transcription (French/English)",
                description: "Transcribe short audio clips accurately.",
                reward: 2500,
                currency: "XAF",
                estimatedTime: "15 min",
                payoutMethods: ["MTN MoMo", "Orange Money"],
                availableSlots: 15,
              },
            ]}
          />
        </div>
      </section>

      {/* Payout Estimator */}
      <section className="mx-auto max-w-4xl px-4 py-12">
        <PayoutEstimator
          currency="XAF"
          exchangeRate={1}
          mobileMoneyProviders={["MTN Mobile Money", "Orange Money"]}
        />
      </section>

      {/* Steps to Earn (Bilingual) */}
      <section className="mx-auto max-w-4xl px-4 py-12">
        <StepsToEarn
          steps={[
            {
              icon: "1️⃣",
              title: "Register for Free · Inscrivez-vous gratuitement",
              description: "Create your VelloEarn account in under 2 minutes.",
            },
            {
              icon: "2️⃣",
              title: "Choose a Task · Choisissez une tâche",
              description: "Pick from surveys, annotation, or micro‑tasks.",
            },
            {
              icon: "3️⃣",
              title: "Complete the Work · Effectuez le travail",
              description: "Follow the instructions and submit your work.",
            },
            {
              icon: "4️⃣",
              title: "Withdraw to Mobile Money · Retrait vers Mobile Money",
              description:
                "Get paid instantly to MTN MoMo or Orange Money – no minimum balance.",
            },
          ]}
        />
      </section>
    </main>
  );
}