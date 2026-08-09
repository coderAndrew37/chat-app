import { Metadata } from "next";
import Link from "next/link";
import { generateHreflangMetadata } from "@/lib/seo/hreflang";
import { AiTaskTable } from "@/app/components/AiTaskTable";
import JsonLd from "@/app/components/JsonLd";
import { StepsToEarn } from "@/app/components/StepsToEarn";
import { TrustBadges } from "@/app/components/TrustBadges";
import ApplyButton from "@/app/components/ApplyButton";

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

// --- FAQs for Schema & Content ---
const FAQS = [
  {
    question: "Are there legitimate AI training jobs in Ghana?",
    answer:
      "Yes. VelloEarn connects Ghanaians to verified data annotation, text evaluation, and voice transcription tasks. Earnings are paid directly to your MTN MoMo, Telecel Cash, or AirtelTigo wallet without hidden fees.",
  },
  {
    question: "How much can I make doing AI tasks in Ghana?",
    answer:
      "Most contributors earn GH₵ 40 to GH₵ 120 per hour depending on complexity. Active members working 2–3 hours daily earn GH₵ 2,500–GH₵ 6,000+ per month.",
  },
  {
    question: "Do I need prior technical experience or a university degree?",
    answer:
      "No technical experience or coding knowledge is required. You only need a smartphone, stable internet, and basic comprehension of English or local languages.",
  },
  {
    question: "How fast are payouts processed to MTN MoMo?",
    answer:
      "Once a submitted task batch passes automated quality checks, funds are credited to your VelloEarn wallet and can be transferred to your mobile money wallet within 15 minutes.",
  },
  {
    question: "What equipment do I need to start?",
    answer:
      "An Android or iOS smartphone with an active data package is sufficient for 90% of image and text tasks. Audio transcription tasks can also be done on mobile or a laptop.",
  },
];

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
        "Label images, transcribe audio, and classify text for machine learning projects. Work remotely, earn per task, get paid via MTN Mobile Money, Telecel Cash, or AirtelTigo.",
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
      "directApply": true,
      "datePosted": new Date().toISOString().split("T")[0],
      "validThrough": new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    },
    {
      "@type": "FAQPage",
      "mainEntity": FAQS.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer,
        },
      })),
    },
  ],
};

// --- Page Component ---
export default function GhanaAiTrainingPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-950">
      <JsonLd data={aiJobSchema} />

      {/* Breadcrumb Navigation */}
      <nav
        aria-label="breadcrumb"
        className="border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 px-4 py-2 text-xs text-slate-500"
      >
        <ol className="mx-auto flex max-w-4xl flex-wrap items-center gap-1.5">
          <li><Link href="/" className="hover:text-rose-500">Home</Link></li>
          <li>/</li>
          <li><Link href="/earn" className="hover:text-rose-500">Earn</Link></li>
          <li>/</li>
          <li className="font-medium text-slate-800 dark:text-slate-200">AI Training Ghana</li>
        </ol>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-br from-rose-50 via-white to-pink-50 dark:from-slate-900 dark:via-slate-950 dark:to-rose-950/20 px-4 py-16 text-slate-900 dark:text-white sm:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-rose-100 dark:bg-rose-950/50 px-3 py-1 text-xs font-semibold text-rose-700 dark:text-rose-300">
            <span>🤖</span> High Demand Remote Category
          </div>

          <h1 className="text-4xl font-extrabold sm:text-5xl text-gray-900 dark:text-white">
            AI Training Jobs in <span className="text-rose-500">Ghana</span>
          </h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            Earn <strong className="text-rose-600 dark:text-rose-400">GH₵ 40 – 120 / hour</strong> with data annotation tasks.
            No experience needed – we provide full guidelines.
          </p>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            ✅ Instant payouts via MTN MoMo · Telecel Cash · AirtelTigo
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ApplyButton label="Apply for AI Jobs →" />
          </div>

          {/* Social Proof Live Activity Ticker */}
          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            <span>Over <strong>85+ Ghanaian annotators</strong> active today</span>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <div className="mx-auto max-w-7xl px-4 py-6">
        <TrustBadges
          paymentMethods={[
            { name: "MTN MoMo", badge: "MoMo" },
            { name: "Telecel Cash", badge: "Cash" },
            { name: "AirtelTigo Cash", badge: "Cash" },
            { name: "PayPal", badge: "Global" },
          ]}
          extraText="Verified & Encrypted Payouts"
        />
      </div>

      {/* Application Eligibility & Requirements Grid */}
      <section className="border-y border-slate-100 bg-slate-50 py-12 dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-center text-2xl font-extrabold text-slate-900 dark:text-white">
            Requirements & Eligibility
          </h2>
          <p className="mx-auto mt-1 max-w-md text-center text-xs text-slate-500 dark:text-slate-400">
            Clear guidelines so you can start annotating data immediately without delays.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm dark:border-emerald-900/30 dark:bg-slate-950">
              <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-emerald-800 dark:text-emerald-400">
                <span className="font-extrabold text-emerald-600">✓</span> What is required
              </h3>
              <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500">•</span>
                  <span>An active smartphone or computer with reliable data</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500">•</span>
                  <span>Registered MoMo (MTN, Telecel, or AirtelTigo) account</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500">•</span>
                  <span>Basic English or local Ghanaian language fluency</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500">•</span>
                  <span>Ability to follow task instructions carefully</span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-rose-100 bg-white p-6 shadow-sm dark:border-rose-900/30 dark:bg-slate-950">
              <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-rose-600 dark:text-rose-400">
                <span className="font-extrabold text-rose-500">✕</span> What is NOT required
              </h3>
              <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400">•</span>
                  <span>Coding, programming, or AI development knowledge</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400">•</span>
                  <span>Prior formal work experience or CV submission</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400">•</span>
                  <span>University degrees or academic credentials</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400">•</span>
                  <span>Upfront fee to register or submit task samples</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Task Table */}
      <section className="mx-auto max-w-4xl px-4 py-12">
        <div className="flex flex-col items-start justify-between sm:flex-row sm:items-end">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Active AI Tasks in Ghana
            </h2>
            <p className="mt-1 text-slate-600 dark:text-slate-300">
              Updated daily. All tasks are verified and pay directly to your wallet.
            </p>
          </div>
          <span className="mt-2 rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold text-rose-800 dark:bg-rose-950 dark:text-rose-200 sm:mt-0">
            ⚡ High Availability
          </span>
        </div>

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

      {/* MoMo Guarantee Banner */}
      <section className="mx-auto max-w-4xl px-4 py-4">
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 dark:border-emerald-900/50 dark:bg-emerald-950/30">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h3 className="text-base font-extrabold text-emerald-950 dark:text-emerald-100">
                Ghanaian Mobile Wallet Payout Guarantee
              </h3>
              <p className="mt-1 text-xs text-emerald-800 dark:text-emerald-300">
                Instant disbursement upon verification across MTN MoMo, Telecel Cash, and AirtelTigo.
              </p>
            </div>
            <span className="whitespace-nowrap rounded-full bg-emerald-600 px-3.5 py-1.5 text-xs font-bold text-white">
              0% Transfer Fee
            </span>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3 border-t border-emerald-200/60 pt-4 text-center text-xs dark:border-emerald-800/60 sm:grid-cols-4">
            <div>
              <span className="block font-bold text-emerald-900 dark:text-emerald-200">Payout Speed</span>
              <span className="text-emerald-700 dark:text-emerald-400">Under 15 Mins</span>
            </div>
            <div>
              <span className="block font-bold text-emerald-900 dark:text-emerald-200">Currency</span>
              <span className="text-emerald-700 dark:text-emerald-400">GH₵ (GHS) Direct</span>
            </div>
            <div>
              <span className="block font-bold text-emerald-900 dark:text-emerald-200">Minimum Cashout</span>
              <span className="text-emerald-700 dark:text-emerald-400">GH₵ 20</span>
            </div>
            <div>
              <span className="block font-bold text-emerald-900 dark:text-emerald-200">Support</span>
              <span className="text-emerald-700 dark:text-emerald-400">WhatsApp Team</span>
            </div>
          </div>
        </div>
      </section>

      {/* Steps to Earn */}
      <section className="mx-auto max-w-4xl px-4 py-12">
        <h2 className="mb-8 text-center text-2xl font-extrabold text-slate-900 dark:text-white">
          4 Steps to Start Earning
        </h2>
        <StepsToEarn
          steps={[
            {
              icon: "1️⃣",
              title: "Select an AI Task",
              description:
                "Browse available annotation projects and choose one that fits your schedule.",
            },
            {
              icon: "2️⃣",
              title: "Review Guidelines",
              description:
                "Read the brief task instructions and check provided correct annotation examples.",
            },
            {
              icon: "3️⃣",
              title: "Submit & Verify",
              description:
                "Complete your annotations. Quality controls run quickly to confirm accuracy.",
            },
            {
              icon: "4️⃣",
              title: "Receive Mobile Money",
              description:
                "Your earnings are credited to your MTN MoMo, Telecel Cash, or AirtelTigo wallet.",
            },
          ]}
        />
        <div className="mt-8 text-center">
          <ApplyButton label="Get Started Now →" />
        </div>
      </section>

      {/* Comprehensive FAQ Section */}
      <section className="border-t border-slate-100 bg-slate-50 py-16 dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="mb-8 text-center text-2xl font-extrabold text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950"
              >
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                  {faq.question}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Conversion CTA Banner */}
      <section className="bg-rose-500 py-12 text-center text-white">
        <div className="mx-auto max-w-xl px-4">
          <h2 className="text-2xl font-extrabold mb-2">
            Start Earning GH₵ 40–120/Hr in Ghana
          </h2>
          <p className="mb-6 text-xs text-rose-100">
            Free application · Mobile Money instant transfer · Daily flexible task limits
          </p>
          <ApplyButton
            label="Apply for AI Jobs in Ghana"
            className="inline-block bg-white text-rose-500 font-bold text-base px-10 py-4 rounded-full shadow-xl hover:scale-105 transition-all"
          />
        </div>
      </section>
    </main>
  );
}