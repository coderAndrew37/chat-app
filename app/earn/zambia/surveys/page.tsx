import { Metadata } from "next";
import { generateHreflangMetadata } from "@/lib/seo/hreflang";
import JsonLd from "@/app/components/JsonLd";
import { PayoutEstimator } from "@/app/components/PayoutEstimator";
import { StepsToEarn } from "@/app/components/StepsToEarn";
import { TaskTable } from "@/app/components/TaskTable";
import { TrustBadges } from "@/app/components/TrustBadges";


// --- Metadata ---
export const metadata: Metadata = generateHreflangMetadata({
  country: "Zambia",
  countryCode: "ZM",
  path: "/earn/zambia/surveys",
  title: "Online Surveys in Zambia – Earn ZMW with MTN MoMo & Airtel Money",
  description:
    "Take paid surveys in Zambia and earn ZMW 5‑30 per survey. Instant payouts to MTN MoMo, Airtel Money, or Zamtel. No experience needed. Start earning today.",
  keywords:
    "paid surveys zambia, online surveys zambia, earn money zambia, mobile money surveys zambia, survey jobs zambia",
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
          name: "Surveys in Zambia",
          item: "https://www.velloearn.co.ke/earn/zambia/surveys",
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
      "datePosted": new Date().toISOString().split("T")[0],
      "validThrough": new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    },
  ],
};

// --- Page Component ---
export default function ZambiaSurveysPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-950">
      <JsonLd data={surveyJobSchema} />

      {/* Hero */}
      <section className="bg-gradient-to-r from-emerald-600 to-indigo-600 px-4 py-16 text-white sm:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-extrabold sm:text-5xl">
            Online Surveys & Micro‑Tasks in Zambia
          </h1>
          <p className="mt-4 text-lg text-emerald-100">
            Earn <strong className="text-white">ZMW 5 – 30 per survey</strong>. Instant payouts to MTN MoMo,
            Airtel Money, or Zamtel.
          </p>
          <p className="mt-2 text-sm text-emerald-200">
            ✅ No experience required · 100% free to join
          </p>
        </div>
      </section>

      {/* Trust badges */}
      <div className="mx-auto max-w-7xl px-4 py-6">
        <TrustBadges
          paymentMethods={[
            { name: "MTN MoMo (ZM)", icon: "📱" },
            { name: "Airtel Money (ZM)", icon: "📲" },
            { name: "Zamtel Kwacha", icon: "📳" },
            { name: "PayPal", icon: "💳" },
          ]}
          extraText="Instant withdrawals, 24/7 support"
        />
      </div>

      {/* Task Table */}
      <section className="mx-auto max-w-4xl px-4 py-8">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Available Surveys & Micro‑Tasks
        </h2>
        <p className="mt-1 text-slate-600 dark:text-slate-300">
          Updated daily. All tasks are verified and pay directly to your wallet.
        </p>
        <div className="mt-6">
          <TaskTable
            tasks={[
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
            ]}
          />
        </div>
      </section>

      {/* Payout Estimator */}
      <section className="mx-auto max-w-4xl px-4 py-12">
        <PayoutEstimator
          currency="ZMW"
          exchangeRate={1}
          mobileMoneyProviders={["MTN Mobile Money", "Airtel Money", "Zamtel Kwacha"]}
        />
      </section>

      {/* Steps to Earn */}
      <section className="mx-auto max-w-4xl px-4 py-12">
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
      </section>
    </main>
  );
}