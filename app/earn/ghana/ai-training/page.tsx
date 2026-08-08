import { Metadata } from "next";
import { generateHreflangMetadata } from "@/lib/seo/hreflang";
import { AiTaskTable } from "@/app/components/AiTaskTable";
import JsonLd from "@/app/components/JsonLd";
import { StepsToEarn } from "@/app/components/StepsToEarn";
import { TrustBadges } from "@/app/components/TrustBadges";


// --- Metadata ---
export const metadata: Metadata = generateHreflangMetadata({
  country: "Ghana",
  countryCode: "GH",
  path: "/earn/ghana/ai-training",
  title: "AI Jobs in Ghana – Remote Data Annotation & Training (Paid via MoMo)",
  description:
    "Apply for AI training jobs in Ghana. Earn GH₵ 40‑120/hour with image labelling, text sentiment, and audio transcription. Payouts to MTN MoMo. No experience needed.",
  keywords:
    "ai jobs in ghana, remote data annotation ghana, ai training ghana, data labeler ghana, earn money with ai ghana",
});

// --- JSON-LD Schema ---
const aiJobSchema = {
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
          name: "AI Training in Ghana",
          item: "https://www.velloearn.co.ke/earn/ghana/ai-training",
        },
      ],
    },
    {
      "@type": "JobPosting",
      "title": "AI Data Annotation Specialist – Ghana",
      "description":
        "Label images, transcribe audio, and classify text for machine learning projects. Work remotely, earn per task, get paid via MTN Mobile Money.",
      "hiringOrganization": {
        "@type": "Organization",
        "name": "VelloEarn",
        "sameAs": "https://www.velloearn.co.ke",
      },
      "jobLocation": {
        "@type": "Place",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "GH",
        },
      },
      "applicantLocationRequirements": {
        "@type": "Country",
        "name": "Ghana",
      },
      "baseSalary": {
        "@type": "MonetaryAmount",
        "currency": "GHS",
        "value": { "@type": "QuantitativeValue", "value": 60, "unitText": "HOUR" },
      },
      "employmentType": "PART_TIME",
      "datePosted": new Date().toISOString().split("T")[0],
      "validThrough": new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    },
  ],
};

// --- Page Component ---
export default function GhanaAiTrainingPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-950">
      <JsonLd data={aiJobSchema} />

      {/* Hero */}
      <section className="bg-gradient-to-r from-emerald-600 to-indigo-600 px-4 py-16 text-white sm:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-extrabold sm:text-5xl">
            AI Training Jobs in Ghana
          </h1>
          <p className="mt-4 text-lg text-emerald-100">
            Earn <strong className="text-white">GH₵ 40 – 120 / hour</strong> with data annotation tasks.
            No experience needed – we provide full guidelines.
          </p>
          <p className="mt-2 text-sm text-emerald-200">
            ✅ Instant payouts via MTN MoMo · Telecel Cash · AirtelTigo
          </p>
        </div>
      </section>

      {/* Trust badges */}
      <div className="mx-auto max-w-7xl px-4 py-6">
        <TrustBadges
          paymentMethods={[
            { name: "MTN MoMo", icon: "📱" },
            { name: "Telecel Cash", icon: "📲" },
            { name: "AirtelTigo Cash", icon: "📳" },
            { name: "PayPal", icon: "💳" },
          ]}
          extraText="Secure & reliable"
        />
      </div>

      {/* Task Table */}
      <section className="mx-auto max-w-4xl px-4 py-8">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Active AI Tasks in Ghana
        </h2>
        <p className="mt-1 text-slate-600 dark:text-slate-300">
          Updated daily. All tasks are verified and pay directly to your wallet.
        </p>
        <div className="mt-6">
          <AiTaskTable
            tasks={[
              {
                id: "ai-1",
                title: "Image Bounding Box – Retail Products",
                description: "Draw boxes around products in photos for e‑commerce AI.",
                reward: 85,
                currency: "GHS",
                estimatedTime: "25 min",
                payoutMethods: ["MTN MoMo", "Telecel Cash"],
                availableSlots: 120,
              },
              {
                id: "ai-2",
                title: "Text Sentiment Analysis",
                description: "Classify customer reviews as positive, neutral, or negative.",
                reward: 45,
                currency: "GHS",
                estimatedTime: "12 min",
                payoutMethods: ["AirtelTigo Cash", "PayPal"],
                availableSlots: 75,
              },
              {
                id: "ai-3",
                title: "Audio Transcription – Local Accents",
                description: "Transcribe short audio clips in English and local languages.",
                reward: 110,
                currency: "GHS",
                estimatedTime: "30 min",
                payoutMethods: ["MTN MoMo", "AirtelTigo Cash"],
                availableSlots: 40,
              },
              {
                id: "ai-4",
                title: "Video Frame Labeling",
                description: "Annotate objects in video frames for autonomous driving.",
                reward: 150,
                currency: "GHS",
                estimatedTime: "40 min",
                payoutMethods: ["Telecel Cash", "PayPal"],
                availableSlots: 25,
              },
            ]}
          />
        </div>
      </section>

      {/* Steps to Earn */}
      <section className="mx-auto max-w-4xl px-4 py-12">
        <StepsToEarn
          steps={[
            {
              icon: "1️⃣",
              title: "Select an AI Task",
              description:
                "Browse available annotation projects and choose one that fits your skills.",
            },
            {
              icon: "2️⃣",
              title: "Complete Guidelines",
              description:
                "Review the task instructions and guidelines – we provide clear examples.",
            },
            {
              icon: "3️⃣",
              title: "Get Verified",
              description:
                "Submit a sample task for quality check. Once approved, you're ready to earn.",
            },
            {
              icon: "4️⃣",
              title: "Receive Instant MoMo Transfer",
              description:
                "Your earnings are paid to your MTN MoMo, Telecel Cash, or AirtelTigo wallet within minutes.",
            },
          ]}
        />
      </section>
    </main>
  );
}