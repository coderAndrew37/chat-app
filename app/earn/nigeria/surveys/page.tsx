import { Metadata } from "next";
import { generateHreflangMetadata } from "@/lib/seo/hreflang";
import JsonLd from "@/app/components/JsonLd";
import { PayoutEstimator } from "@/app/components/PayoutEstimator";
import { StepsToEarn } from "@/app/components/StepsToEarn";
import { TaskTable } from "@/app/components/TaskTable";
import { TrustBadges } from "@/app/components/TrustBadges";

// --- Metadata ---
export const metadata: Metadata = generateHreflangMetadata({
  country: "Nigeria",
  countryCode: "NG",
  path: "/earn/nigeria/surveys",
  title: "Paid Surveys in Nigeria – Earn ₦500‑2,000 with OPay & PalmPay",
  description:
    "Take paid surveys in Nigeria and earn ₦500‑2,000 per survey. Instant payouts to OPay, PalmPay, Moniepoint, or local banks. No experience needed. Start earning today.",
  keywords:
    "paid surveys nigeria, online surveys nigeria, earn money nigeria, opay surveys, palmpay surveys, survey jobs nigeria",
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
          name: "Surveys in Nigeria",
          item: "https://www.velloearn.co.ke/earn/nigeria/surveys",
        },
      ],
    },
    {
      "@type": "JobPosting",
      "title": "Survey Participant – Nigeria",
      "description":
        "Complete online surveys and get paid instantly via OPay, PalmPay, Moniepoint, or local banks. Flexible, remote work.",
      "hiringOrganization": {
        "@type": "Organization",
        "name": "VelloEarn",
        "sameAs": "https://www.velloearn.co.ke",
      },
      "jobLocation": {
        "@type": "Place",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "NG",
        },
      },
      "applicantLocationRequirements": {
        "@type": "Country",
        "name": "Nigeria",
      },
      "baseSalary": {
        "@type": "MonetaryAmount",
        "currency": "NGN",
        "value": { "@type": "QuantitativeValue", "value": 1500, "unitText": "HOUR" },
      },
      "employmentType": "PART_TIME",
      "datePosted": new Date().toISOString().split("T")[0],
      "validThrough": new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    },
  ],
};

// --- Page Component ---
export default function NigeriaSurveysPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-950">
      <JsonLd data={surveyJobSchema} />

      {/* Hero */}
      <section className="bg-gradient-to-r from-emerald-600 to-indigo-600 px-4 py-16 text-white sm:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-extrabold sm:text-5xl">
            Paid Surveys & Micro‑Tasks in Nigeria
          </h1>
          <p className="mt-4 text-lg text-emerald-100">
            Earn <strong className="text-white">₦500 – 2,000 per survey</strong>. Instant payouts to OPay,
            PalmPay, Moniepoint, or any local bank.
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
            { name: "OPay", icon: "💰" },
            { name: "PalmPay", icon: "💳" },
            { name: "Moniepoint", icon: "🏦" },
            { name: "Kuda Bank", icon: "🏧" },
            { name: "Local Banks", icon: "🏛️" },
            { name: "PayPal", icon: "🌐" },
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
                id: "ng-survey-1",
                title: "Consumer Opinion Survey",
                description: "Share your thoughts on brands and products.",
                reward: 800,
                currency: "NGN",
                estimatedTime: "5 min",
                payoutMethods: ["OPay", "PalmPay"],
                availableSlots: 50,
              },
              {
                id: "ng-survey-2",
                title: "Fintech App Feedback",
                description: "Tell us about your experience with digital banks.",
                reward: 1500,
                currency: "NGN",
                estimatedTime: "10 min",
                payoutMethods: ["Moniepoint", "Kuda Bank"],
                availableSlots: 30,
              },
              {
                id: "ng-survey-3",
                title: "Product Labeling – Images",
                description: "Categorize product images for AI training.",
                reward: 2000,
                currency: "NGN",
                estimatedTime: "12 min",
                payoutMethods: ["OPay", "Local Banks"],
                availableSlots: 25,
              },
              {
                id: "ng-survey-4",
                title: "Audio Transcription (English/Pidgin)",
                description: "Transcribe short audio clips accurately.",
                reward: 2500,
                currency: "NGN",
                estimatedTime: "15 min",
                payoutMethods: ["PalmPay", "PayPal"],
                availableSlots: 15,
              },
            ]}
          />
        </div>
      </section>

      {/* Payout Estimator */}
      <section className="mx-auto max-w-4xl px-4 py-12">
        <PayoutEstimator
          currency="NGN"
          exchangeRate={1}
          mobileMoneyProviders={["OPay", "PalmPay", "Moniepoint", "Kuda Bank", "Local Banks"]}
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
              title: "Withdraw to OPay/PalmPay or Bank",
              description:
                "Get paid instantly to your preferred fintech wallet or local bank – no minimum balance.",
            },
          ]}
        />
      </section>
    </main>
  );
}