import { Metadata } from "next";
import { generateHreflangMetadata } from "@/lib/seo/hreflang";
import JsonLd from "@/app/components/JsonLd";
import { PayoutEstimator } from "@/app/components/PayoutEstimator";
import { StepsToEarn } from "@/app/components/StepsToEarn";
import { TaskTable } from "@/app/components/TaskTable";
import { TrustBadges } from "@/app/components/TrustBadges";


// --- Metadata ---
export const metadata: Metadata = generateHreflangMetadata({
  country: "Uganda",
  countryCode: "UG",
  path: "/earn/uganda/mobile-money",
  title: "Online Jobs that Pay through Mobile Money in Uganda – No Experience",
  description:
    "Find legitimate online jobs that pay through MTN MoMo & Airtel Money in Uganda. Earn UGX 15,000‑60,000/day with surveys, AI tasks, and micro‑work. No experience required.",
  keywords:
    "online jobs that pay through mobile money in uganda, mobile money jobs uganda, MTN MoMo jobs, earn money without experience uganda",
});

// --- JSON-LD Schema ---
const mobileMoneyJobSchema = {
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
          name: "Mobile Money Jobs in Uganda",
          item: "https://www.velloearn.co.ke/earn/uganda/mobile-money",
        },
      ],
    },
    {
      "@type": "JobPosting",
      "title": "Mobile Money Micro‑Tasker – Uganda",
      "description":
        "Complete online micro‑tasks and get paid instantly to your MTN Mobile Money or Airtel Money account. No experience needed.",
      "hiringOrganization": {
        "@type": "Organization",
        "name": "VelloEarn",
        "sameAs": "https://www.velloearn.co.ke",
      },
      "jobLocation": {
        "@type": "Place",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "UG",
        },
      },
      "applicantLocationRequirements": {
        "@type": "Country",
        "name": "Uganda",
      },
      "baseSalary": {
        "@type": "MonetaryAmount",
        "currency": "UGX",
        "value": { "@type": "QuantitativeValue", "value": 20000, "unitText": "HOUR" },
      },
      "employmentType": "PART_TIME",
      "datePosted": new Date().toISOString().split("T")[0],
      "validThrough": new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    },
  ],
};

// --- Page Component ---
export default function UgandaMobileMoneyPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-950">
      <JsonLd data={mobileMoneyJobSchema} />

      {/* Hero */}
      <section className="bg-gradient-to-r from-emerald-600 to-indigo-600 px-4 py-16 text-white sm:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-extrabold sm:text-5xl">
            Online Jobs that Pay via Mobile Money in Uganda
          </h1>
          <p className="mt-4 text-lg text-emerald-100">
            Earn <strong className="text-white">UGX 15,000 – 60,000 / day</strong> with simple tasks.
            No experience – start earning today.
          </p>
          <p className="mt-2 text-sm text-emerald-200">
            ✅ Instant payouts to MTN Mobile Money · Airtel Money · PayPal
          </p>
        </div>
      </section>

      {/* Trust badges */}
      <div className="mx-auto max-w-7xl px-4 py-6">
        <TrustBadges
          paymentMethods={[
            { name: "MTN MoMo (UG)", icon: "📱" },
            { name: "Airtel Money (UG)", icon: "📲" },
            { name: "PayPal", icon: "💳" },
          ]}
          extraText="Secure & reliable"
        />
      </div>

      {/* Task Table */}
      <section className="mx-auto max-w-4xl px-4 py-8">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Available Tasks (Paid via Mobile Money)
        </h2>
        <p className="mt-1 text-slate-600 dark:text-slate-300">
          Updated daily. All tasks are verified and pay directly to your wallet.
        </p>
        <div className="mt-6">
          <TaskTable
            tasks={[
              {
                id: "mm-1",
                title: "Simple Image Labeling",
                description: "Tag objects in photos for AI training.",
                reward: 8000,
                currency: "UGX",
                estimatedTime: "10 min",
                payoutMethods: ["MTN MoMo", "Airtel Money"],
                availableSlots: 50,
              },
              {
                id: "mm-2",
                title: "Product Feedback Survey",
                description: "Answer questions about consumer goods.",
                reward: 5000,
                currency: "UGX",
                estimatedTime: "6 min",
                payoutMethods: ["MTN MoMo", "PayPal"],
                availableSlots: 30,
              },
              {
                id: "mm-3",
                title: "Audio Transcription (English)",
                description: "Transcribe short audio clips accurately.",
                reward: 15000,
                currency: "UGX",
                estimatedTime: "20 min",
                payoutMethods: ["Airtel Money", "PayPal"],
                availableSlots: 20,
              },
              {
                id: "mm-4",
                title: "Chat Moderation",
                description: "Review chat messages for policy compliance.",
                reward: 12000,
                currency: "UGX",
                estimatedTime: "15 min",
                payoutMethods: ["MTN MoMo", "Airtel Money"],
                availableSlots: 45,
              },
            ]}
          />
        </div>
      </section>

      {/* Payout Estimator */}
      <section className="mx-auto max-w-4xl px-4 py-12">
        <PayoutEstimator
          currency="UGX"
          exchangeRate={1} // 1 UGX = 1 UGX (base)
          mobileMoneyProviders={["MTN Mobile Money", "Airtel Money"]}
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
              description: "Pick from available surveys, annotation, or micro‑tasks.",
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
                "Get paid instantly to your MTN MoMo or Airtel Money account. No minimum balance.",
            },
          ]}
        />
      </section>
    </main>
  );
}