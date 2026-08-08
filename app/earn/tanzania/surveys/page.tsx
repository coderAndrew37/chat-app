import { Metadata } from "next";
import { generateHreflangMetadata } from "@/lib/seo/hreflang";
import JsonLd from "@/app/components/JsonLd";
import { PayoutEstimator } from "@/app/components/PayoutEstimator";
import { StepsToEarn } from "@/app/components/StepsToEarn";
import { TaskTable } from "@/app/components/TaskTable";
import { TrustBadges } from "@/app/components/TrustBadges";

// --- Metadata ---
export const metadata: Metadata = generateHreflangMetadata({
  country: "Tanzania",
  countryCode: "TZ",
  path: "/earn/job/surveys/tanzania",
  title: "Online Surveys in Tanzania – Pata Pesa kwa M-Pesa & Tigo Pesa",
  description:
    "Fanya tafiti za mtandaoni Tanzania na upate malipo ya haraka kupitia M-Pesa, Tigo Pesa, au Airtel Money. Earn TZS 2,000‑10,000 per survey. No experience needed.",
  keywords:
    "online surveys tanzania, paid surveys tanzania, kazi za mtandaoni tanzania, m-pesa surveys, earn money tanzania",
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
          name: "Surveys in Tanzania",
          item: "https://www.velloearn.co.ke/earn/job/surveys/tanzania",
        },
      ],
    },
    {
      "@type": "JobPosting",
      "title": "Survey Participant – Tanzania",
      "description":
        "Complete online surveys and get paid instantly via M-Pesa, Tigo Pesa, or Airtel Money. Flexible, remote work.",
      "hiringOrganization": {
        "@type": "Organization",
        "name": "VelloEarn",
        "sameAs": "https://www.velloearn.co.ke",
      },
      "jobLocation": {
        "@type": "Place",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "TZ",
        },
      },
      "applicantLocationRequirements": {
        "@type": "Country",
        "name": "Tanzania",
      },
      "baseSalary": {
        "@type": "MonetaryAmount",
        "currency": "TZS",
        "value": { "@type": "QuantitativeValue", "value": 5000, "unitText": "HOUR" },
      },
      "employmentType": "PART_TIME",
      "datePosted": new Date().toISOString().split("T")[0],
      "validThrough": new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    },
  ],
};

// --- Page Component ---
export default function TanzaniaSurveysPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-950">
      <JsonLd data={surveyJobSchema} />

      {/* Hero */}
      <section className="bg-gradient-to-r from-emerald-600 to-indigo-600 px-4 py-16 text-white sm:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-extrabold sm:text-5xl">
            Online Surveys & Micro‑Tasks Tanzania
          </h1>
          <p className="mt-4 text-lg text-emerald-100">
            Pata <strong className="text-white">TZS 2,000 – 10,000</strong> kwa kila utafiti.
            Malipo ya papo kwa papo kwa M-Pesa, Tigo Pesa, au Airtel Money.
          </p>
          <p className="mt-2 text-sm text-emerald-200">
            ✅ No experience required · Hakuna uzoefu unaohitajika
          </p>
        </div>
      </section>

      {/* Trust badges */}
      <div className="mx-auto max-w-7xl px-4 py-6">
        <TrustBadges
          paymentMethods={[
            { name: "M-Pesa (TZ)", icon: "📱" },
            { name: "Tigo Pesa", icon: "📲" },
            { name: "Airtel Money (TZ)", icon: "📳" },
            { name: "PayPal", icon: "💳" },
          ]}
          extraText="Pato la papo kwa papo | Instant payouts"
        />
      </div>

      {/* Task Table */}
      <section className="mx-auto max-w-4xl px-4 py-8">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Available Surveys & Micro‑Tasks
        </h2>
        <p className="mt-1 text-slate-600 dark:text-slate-300">
          Updated daily · Zinasasishwa kila siku.
        </p>
        <div className="mt-6">
          <TaskTable
            tasks={[
              {
                id: "tz-survey-1",
                title: "Consumer Feedback Survey",
                description: "Answer questions about local products.",
                reward: 3000,
                currency: "TZS",
                estimatedTime: "5 min",
                payoutMethods: ["M-Pesa", "Tigo Pesa"],
                availableSlots: 45,
              },
              {
                id: "tz-survey-2",
                title: "Mobile Banking User Experience",
                description: "Share your experience with mobile money apps.",
                reward: 8000,
                currency: "TZS",
                estimatedTime: "12 min",
                payoutMethods: ["Airtel Money", "PayPal"],
                availableSlots: 30,
              },
              {
                id: "tz-survey-3",
                title: "Product Labeling (Swahili)",
                description: "Categorize product images in Swahili.",
                reward: 10000,
                currency: "TZS",
                estimatedTime: "15 min",
                payoutMethods: ["M-Pesa", "Tigo Pesa"],
                availableSlots: 20,
              },
              {
                id: "tz-survey-4",
                title: "Audio Transcription (Swahili)",
                description: "Transcribe Swahili audio clips.",
                reward: 15000,
                currency: "TZS",
                estimatedTime: "20 min",
                payoutMethods: ["M-Pesa", "Airtel Money"],
                availableSlots: 15,
              },
            ]}
          />
        </div>
      </section>

      {/* Payout Estimator */}
      <section className="mx-auto max-w-4xl px-4 py-12">
        <PayoutEstimator
          currency="TZS"
          exchangeRate={1}
          mobileMoneyProviders={["Vodacom M-Pesa", "Tigo Pesa", "Airtel Money"]}
        />
      </section>

      {/* Steps to Earn */}
      <section className="mx-auto max-w-4xl px-4 py-12">
        <StepsToEarn
          steps={[
            {
              icon: "1️⃣",
              title: "Jisajili Bure | Register Free",
              description: "Create your VelloEarn account in under 2 minutes.",
            },
            {
              icon: "2️⃣",
              title: "Chagua Kazi | Choose a Task",
              description: "Pick from surveys, annotation, or micro‑tasks.",
            },
            {
              icon: "3️⃣",
              title: "Kamilisha Kazi | Complete the Work",
              description: "Follow instructions and submit your work.",
            },
            {
              icon: "4️⃣",
              title: "Pata Malipo | Get Paid",
              description:
                "Withdraw instantly to M-Pesa, Tigo Pesa, or Airtel Money – no minimum balance.",
            },
          ]}
        />
      </section>
    </main>
  );
}