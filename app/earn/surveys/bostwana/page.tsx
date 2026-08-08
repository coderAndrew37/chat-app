import JsonLd from "@/app/components/JsonLd";
import { StepsToEarn } from "@/app/components/StepsToEarn";
import { SurveyTaskList } from "@/app/components/SurveyTaskList";
import { TrustBadges } from "@/app/components/TrustBadges";
import { generateCountryMetadata } from "@/lib/seo/countries";
import { Metadata } from "next";

// --- Metadata ---
export const metadata: Metadata = generateCountryMetadata({
  country: "Botswana",
  countryCode: "BW",
  path: "/earn/surveys/botswana",
  title: "Paid Surveys in Botswana – Earn P10‑P50 per Survey",
  description:
    "Take paid surveys in Botswana and earn extra cash. Top providers, instant payouts to Orange Money & FNB eWallet. Start earning today – no experience needed.",
  keywords:
    "paid surveys in botswana, online surveys botswana, earn money surveys botswana, survey jobs botswana",
});

// --- JSON-LD (JobPosting & BreadcrumbList) ---
const jsonLd = {
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
          name: "Surveys in Botswana",
          item: "https://www.velloearn.co.ke/earn/surveys/botswana",
        },
      ],
    },
    {
      "@type": "JobPosting",
      "title": "Paid Survey Participant – Botswana",
      "description": "Complete online surveys and earn rewards. Flexible, remote work.",
      "hiringOrganization": {
        "@type": "Organization",
        "name": "VelloEarn",
        "sameAs": "https://www.velloearn.co.ke",
      },
      "jobLocation": {
        "@type": "Place",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "BW",
        },
      },
      "applicantLocationRequirements": {
        "@type": "Country",
        "name": "Botswana",
      },
      "baseSalary": {
        "@type": "MonetaryAmount",
        "currency": "BWP",
        "value": { "@type": "QuantitativeValue", "value": 25, "unitText": "HOUR" },
      },
      "employmentType": "PART_TIME",
      "datePosted": new Date().toISOString().split("T")[0],
      "validThrough": new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    },
  ],
};

// --- Page Component ---
export default function BotswanaSurveysPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-950">
      <JsonLd data={jsonLd} />

      {/* Hero */}
      <section className="bg-gradient-to-r from-emerald-600 to-indigo-600 px-4 py-16 text-white sm:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-extrabold sm:text-5xl">
            Paid Surveys in Botswana
          </h1>
          <p className="mt-4 text-lg text-emerald-100">
            Earn up to <strong className="text-white">P50 per survey</strong> – no experience needed.
            Payouts via Orange Money, FNB eWallet &amp; PayPal.
          </p>
          <p className="mt-2 text-sm text-emerald-200">
            ⏱️ Average completion time: 10–15 minutes
          </p>
        </div>
      </section>

      {/* Trust badges */}
      <div className="mx-auto max-w-7xl px-4 py-6">
        <TrustBadges />
      </div>

      {/* Survey List */}
      <section className="mx-auto max-w-4xl px-4 py-8">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Available Survey Opportunities
        </h2>
        <p className="mt-1 text-slate-600 dark:text-slate-300">
          Updated daily. All tasks are verified and pay directly to your wallet.
        </p>
        <div className="mt-6">
          <SurveyTaskList
            tasks={[
              {
                id: "1",
                title: "Consumer Opinions on Retail Brands",
                provider: "VelloEarn Research",
                reward: 35,
                currency: "BWP",
                estimatedTime: "12 min",
                payoutMethods: ["Orange Money", "FNB eWallet"],
                availableSlots: 42,
              },
              {
                id: "2",
                title: "Mobile Banking User Experience Survey",
                provider: "FinTech Insights",
                reward: 50,
                currency: "BWP",
                estimatedTime: "18 min",
                payoutMethods: ["PayPal", "M‑Pesa"],
                availableSlots: 18,
              },
              {
                id: "3",
                title: "Product Feedback – New Beverage",
                provider: "Consumer Panel",
                reward: 20,
                currency: "BWP",
                estimatedTime: "8 min",
                payoutMethods: ["Orange Money", "Airtel Money"],
                availableSlots: 65,
              },
              {
                id: "4",
                title: "Tech Usage Survey (Smartphones)",
                provider: "TechTrack",
                reward: 45,
                currency: "BWP",
                estimatedTime: "15 min",
                payoutMethods: ["FNB eWallet", "PayPal"],
                availableSlots: 10,
              },
            ]}
          />
        </div>
      </section>

      {/* Steps to earn */}
      <section className="mx-auto max-w-4xl px-4 py-12">
        <StepsToEarn
          steps={[
            {
              icon: "📝",
              title: "Register for Free",
              description: "Create your VelloEarn account in under 2 minutes.",
            },
            {
              icon: "📋",
              title: "Complete Your Profile",
              description: "Fill in your details to unlock all survey offers.",
            },
            {
              icon: "📊",
              title: "Take Surveys",
              description: "Choose from available surveys and start answering.",
            },
            {
              icon: "💰",
              title: "Get Paid to Your eWallet",
              description:
                "Withdraw earnings to Orange Money, FNB eWallet, or PayPal instantly.",
            },
          ]}
        />
      </section>
    </main>
  );
}