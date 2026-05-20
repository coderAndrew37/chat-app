// app/earn/[jobSlug]/[country]/page.tsx
// ─── Job type × country page ──────────────────────────────────────────────────
// Route: /earn/chatting/kenya  /earn/ai-training/uganda  /earn/surveys/ghana
// These are the HIGHEST COMMERCIAL INTENT pages — someone searching
// "AI training jobs Kenya" or "paid surveys Uganda M-Pesa" is ready to apply.

import { use } from "react"; // 👈 Required for unpacking async params in sync components
import { notFound } from "next/navigation"; // 👈 Gracefully handles missing metrics or rogue URLs
import {
    JOB_TYPES,
    getAllJobCountryParams,
    getJobType,
    getMarket
} from "@/lib/seo/keyword-matrix";
import {
    breadcrumbSchema,
    faqSchema,
    jobCountryPageMetadata,
    jobPostingSchema,
} from "@/lib/seo/metadata";
import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

// Define the unified Promise-based params type
interface PageProps {
  params: Promise<{ jobSlug: string; country: string }>;
}

// ─── Static generation ────────────────────────────────────────────────────────

export function generateStaticParams() {
  return getAllJobCountryParams().map(({ market, jobType }) => ({
    country: market.slug,
    jobSlug: jobType.slug,
  }));
}

// 👈 Changed to async and added await for params
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const market  = getMarket(resolvedParams.country);
  const jobType = getJobType(resolvedParams.jobSlug);
  
  if (!market || !jobType) return {};
  return jobCountryPageMetadata(market, jobType);
}

// ─── Per-job FAQ builder ──────────────────────────────────────────────────────

function getJobCountryFAQs(
  market: NonNullable<ReturnType<typeof getMarket>>,
  jobType: NonNullable<ReturnType<typeof getJobType>>
) {
  const { country, payment, currency } = market;
  const { title, shortTitle } = jobType;

  return [
    {
      question: `Are there legit ${title.toLowerCase()} jobs in ${country}?`,
      answer: `Yes. VelloEarn offers verified ${title.toLowerCase()} positions open to ${country}ns. Payouts go directly to ${payment} — no third-party delays or fake promises.`,
    },
    {
      question: `How much can I earn from ${shortTitle} jobs in ${country}?`,
      answer: `Earnings depend on your availability and role. New members typically earn ${currency} 5,000–12,000/month in their first 30 days. Active members with team networks earn ${currency} 15,000–30,000+/month.`,
    },
    {
      question: `Do I need experience for ${title.toLowerCase()} jobs in ${country}?`,
      answer: `No prior experience is required. VelloEarn provides onboarding and structured task guidance. Good written communication in English or Swahili is the main requirement.`,
    },
    {
      question: `How do ${title.toLowerCase()} payouts work in ${country}?`,
      answer: `Your earnings are tracked in your VelloEarn dashboard. Request a withdrawal at any time and the amount is sent directly to your ${payment} number. Most payouts complete within minutes.`,
    },
    {
      question: `Is VelloEarn's ${shortTitle} program a scam?`,
      answer: `No. VelloEarn is a structured remote work platform — not a get-rich-quick scheme. We pay real ${currency} via ${payment} to verified members. The application process is free. We disclose all fees upfront and share details only with accepted applicants via WhatsApp.`,
    },
  ];
}

// ─── Earning steps component ──────────────────────────────────────────────────

const HOW_IT_WORKS_STEPS = [
  { step: "1", title: "Apply free",         body: "Fill in a 2-minute application form. No fee, no CV required."         },
  { step: "2", title: "Get approved",      body: "We review your profile and reach out on WhatsApp within 24 hours."     },
  { step: "3", title: "Activate & start",  body: "Complete the one-time activation, then access your first tasks."       },
  { step: "4", title: "Earn & withdraw",    body: "Complete tasks, track earnings in your dashboard, withdraw to M-Pesa." },
];

// ─── Page Component ───────────────────────────────────────────────────────────

export default function JobCountryPage({ params }: PageProps) {
  // 👈 Unwrapping the dynamic params Promise safely using React.use()
  const resolvedParams = use(params);

  // Guard clause against empty values
  if (!resolvedParams?.country || !resolvedParams?.jobSlug) {
    notFound();
  }

  const market  = getMarket(resolvedParams.country);
  const jobType = getJobType(resolvedParams.jobSlug);

  if (!market || !jobType) {
    notFound(); // 👈 Use Next.js notFound handler instead of crashing
  }

  const { country, payment, currency, topEarning, cities } = market;
  const { title, icon, tagline, description, badge } = jobType;

  const faqs = getJobCountryFAQs(market, jobType);

  const schemas = [
    breadcrumbSchema([
      { name: "Home",                           href: "/" },
      { name: `Online Jobs in ${country}`,      href: `/earn/${market.slug}` },
      { name: `${title} Jobs in ${country}`,    href: `/earn/${jobType.slug}/${market.slug}` },
    ]),
    faqSchema(faqs),
    jobPostingSchema({
      title: `${title} Jobs in ${country}`,
      description: `${tagline} ${description}`,
      country,
      payment,
      minSalary: 5000,
      maxSalary: 30000,
      currency,
    }),
  ];

  // Related job types for internal linking
  const relatedJobs = JOB_TYPES.filter((j) => j.slug !== jobType.slug).slice(0, 3);

  return (
    <>
      {schemas.map((schema, i) => (
        <Script
          key={i}
          id={`schema-job-${i}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <main className="bg-gray-50 min-h-screen">

        {/* ── Breadcrumb ──────────────────────────────────────────── */}
        <nav aria-label="breadcrumb" className="bg-white border-b border-gray-100 px-4 py-2 text-xs text-gray-400">
          <ol className="flex items-center gap-1 max-w-3xl mx-auto flex-wrap">
            <li><Link href="/" className="hover:text-rose-500">Home</Link></li>
            <li>/</li>
            <li><Link href={`/earn/${market.slug}`} className="hover:text-rose-500">Online Jobs in {country}</Link></li>
            <li>/</li>
            <li className="text-gray-600">{title} Jobs in {country}</li>
          </ol>
        </nav>

        {/* ── Hero ────────────────────────────────────────────────── */}
        <section className="pt-16 pb-12 bg-gradient-to-br from-rose-50 via-white to-pink-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <div className="inline-flex items-center gap-2 bg-rose-100 text-rose-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">
              <span>{icon}</span>
              {badge}
            </div>

            {/* Primary H1: "[Job] jobs in [Country]" — exact match keyword */}
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
              {title} Jobs in{" "}
              <span className="text-rose-500">{country}</span> — Paid via {payment}
            </h1>

            <p className="text-lg text-gray-500 max-w-xl mx-auto mb-4">
              {tagline}
            </p>
            <p className="text-sm text-gray-400 max-w-lg mx-auto mb-8">
              {description} Top earners make{" "}
              <strong className="text-gray-700">{topEarning}/month</strong>.
              Free to apply — phone only.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/apply"
                className="bg-rose-500 hover:bg-rose-600 text-white font-bold text-base px-8 py-4 rounded-full shadow-lg shadow-rose-200 transition-all hover:scale-105"
              >
                Apply for {title} Jobs →
              </Link>
              <Link
                href={`/earn/${market.slug}`}
                className="bg-white text-gray-700 font-semibold text-base px-8 py-4 rounded-full border border-gray-200 shadow-sm transition-all hover:scale-105"
              >
                All online jobs in {country}
              </Link>
            </div>
          </div>
        </section>

        {/* ── What the job involves ────────────────────────────────── */}
        <section className="py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-2 text-center">
              What does {title.toLowerCase()} work involve?
            </h2>
            <p className="text-gray-500 text-sm text-center mb-10 max-w-xl mx-auto">
              {description}
            </p>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { icon: "📱", title: "Phone only",         body: `All ${jobType.shortTitle} tasks are completed from your smartphone. No laptop or office needed.` },
                { icon: "⏰", title: "Flexible hours",     body: "Work when you want. Morning, evening, or late night — tasks are available around the clock." },
                { icon: "💸", title: `${payment} payouts`, body: `Earnings go directly to ${payment}. Request a withdrawal any time and receive it within minutes.` },
              ].map((card) => (
                <div key={card.title} className="bg-gray-50 rounded-2xl border border-gray-100 p-5">
                  <div className="text-2xl mb-2">{card.icon}</div>
                  <h3 className="font-bold text-gray-900 text-sm mb-1">{card.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{card.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── How it works ─────────────────────────────────────────── */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-2xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-10 text-center">
              How to start {title.toLowerCase()} work in {country}
            </h2>
            <div className="space-y-4">
              {HOW_IT_WORKS_STEPS.map((s) => (
                <div key={s.step} className="flex items-start gap-4 bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                  <div className="w-8 h-8 rounded-full bg-rose-500 text-white font-extrabold text-sm flex items-center justify-center shrink-0">
                    {s.step}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm mb-0.5">{s.title}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed">{s.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── City availability — internal links ───────────────────── */}
        <section className="py-12 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-xl font-extrabold text-gray-900 mb-2">
              {title} jobs available in all of {country}
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              No matter where you are, you can work remotely.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {cities.map((city) => (
                <Link
                  key={city.slug}
                  href={`/earn/${market.slug}/${city.slug}`}
                  className="text-sm text-gray-600 bg-gray-50 border border-gray-100 px-4 py-2 rounded-full hover:border-rose-200 hover:text-rose-600 transition-all"
                >
                  {title} in {city.name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ─────────────────────────────────────────────────── */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-2xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-8 text-center">
              {title} jobs in {country} — common questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                  <h3 className="font-semibold text-gray-900 text-sm mb-2">{faq.question}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Related jobs ─────────────────────────────────────────── */}
        <section className="py-12 bg-white border-t border-gray-100">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <h2 className="text-lg font-extrabold text-gray-900 mb-5 text-center">
              Other ways to earn online in {country}
            </h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {relatedJobs.map((job) => (
                <Link
                  key={job.slug}
                  href={`/earn/${job.slug}/${market.slug}`}
                  className="group bg-gray-50 hover:bg-rose-50 border border-gray-100 hover:border-rose-200 rounded-2xl p-4 transition-all text-center"
                >
                  <div className="text-2xl mb-1">{job.icon}</div>
                  <h3 className="font-bold text-gray-900 text-xs mb-1">{job.title}</h3>
                  <p className="text-xs text-gray-400 mb-2">{job.tagline}</p>
                  <span className="text-xs text-rose-500 font-semibold group-hover:underline">
                    Learn more →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Bottom CTA ───────────────────────────────────────────── */}
        <section className="py-14 bg-rose-500 text-center">
          <div className="max-w-xl mx-auto px-4">
            <h2 className="text-2xl font-extrabold text-white mb-3">
              Ready to start {title.toLowerCase()} work in {country}?
            </h2>
            <p className="text-rose-100 mb-6 text-sm">
              Apply free in 2 minutes. Get your activation on WhatsApp. Earn to {payment}.
            </p>
            <Link
              href="/apply"
              className="inline-block bg-white text-rose-500 font-bold text-base px-10 py-4 rounded-full shadow-xl hover:scale-105 transition-all"
            >
              Apply for {title} Jobs — {country}
            </Link>
          </div>
        </section>

      </main>
    </>
  );
}