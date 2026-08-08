// app/earn/[jobSlug]/[country]/page.tsx
// ─── Job type × country page ──────────────────────────────────────────────────
// Routes: /earn/chatting/kenya  /earn/ai-training/uganda  /earn/surveys/ghana
// These are the highest commercial-intent pages in the whole site.

import { use } from "react"; // 👈 Required to unpack the async params stream in sync components
import { notFound } from "next/navigation"; // 👈 Gracefully redirects missing slugs instead of throwing errors
import type { Metadata } from "next";
import Link from "next/link";
import {
  getMarket,
  getJobType,
  getAllJobCountryParams,
  JOB_TYPES,
} from "@/lib/seo/keyword-matrix";
import {
  jobCountryPageMetadata,
  faqSchema,
  breadcrumbSchema,
  jobPostingSchema,
} from "@/lib/seo/metadata";
import ApplyButton from "@/app/components/ApplyButton";

// Define the unified Promise-based params type layout
interface PageProps {
  params: Promise<{ jobSlug: string; country: string }>;
}

// ─── Static generation ────────────────────────────────────────────────────────

export function generateStaticParams() {
  return getAllJobCountryParams().map(({ market, jobType }) => ({
    jobSlug: jobType.slug,
    country: market.slug,
  }));
}

// 👈 Async structure with awaited params resolution to prevent undefined errors
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const market  = getMarket(resolvedParams.country);
  const jobType = getJobType(resolvedParams.jobSlug);
  
  if (!market || !jobType) return {};
  return jobCountryPageMetadata(market, jobType);
}

// ─── FAQ builder ──────────────────────────────────────────────────────────────

function buildFAQs(
  market: NonNullable<ReturnType<typeof getMarket>>,
  jobType: NonNullable<ReturnType<typeof getJobType>>,
) {
  const { country, payment, currency } = market;
  const { title, shortTitle } = jobType;
  return [
    {
      question: `Are there legit ${title.toLowerCase()} jobs in ${country}?`,
      answer: `Yes. VelloEarn offers verified ${title.toLowerCase()} positions open to ${country}ns. Payouts go directly to ${payment} — no delays or fake promises.`,
    },
    {
      question: `How much can I earn from ${shortTitle} jobs in ${country}?`,
      answer: `New members typically earn ${currency} 5,000–12,000 in their first 30 days. Active members with a team average ${market.avgEarning}/month, and top earners reach ${market.topEarning}/month.`,
    },
    {
      question: `Do I need experience for ${title.toLowerCase()} jobs in ${country}?`,
      answer: `No. VelloEarn provides onboarding and structured tasks. Good written communication in English or Swahili is all you need to start.`,
    },
    {
      question: `How do payouts work for ${shortTitle} jobs in ${country}?`,
      answer: `Earnings accumulate in your VelloEarn dashboard. Request a withdrawal any time — the amount is sent directly to your ${payment} number, usually within minutes.`,
    },
    {
      question: `Is VelloEarn's ${shortTitle} programme a scam?`,
      answer: `No. VelloEarn pays real ${currency} via ${payment} to verified members. The application is free. Any fees are disclosed upfront and shared only with accepted applicants via WhatsApp.`,
    },
  ];
}

// ─── How it works steps ───────────────────────────────────────────────────────

const STEPS = [
  { n: "1", title: "Apply free",      body: "2-minute form — no CV, no fee required."                          },
  { n: "2", title: "Get approved",     body: "We review your profile and message you on WhatsApp within 24 hrs." },
  { n: "3", title: "Activate & start", body: "Complete one-time activation, then access your first tasks."       },
  { n: "4", title: "Earn & withdraw",  body: "Track earnings on your dashboard. Withdraw to M-Pesa any time."    },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function JobCountryPage({ params }: PageProps) {
  // 👈 React.use component unwrapper extracts resolved properties instantly
  const resolvedParams = use(params);

  if (!resolvedParams?.country || !resolvedParams?.jobSlug) {
    notFound();
  }

  const market  = getMarket(resolvedParams.country);
  const jobType = getJobType(resolvedParams.jobSlug);

  if (!market || !jobType) {
    notFound();
  }

  const { country, payment, currency, topEarning, cities } = market;
  const { title, icon, tagline, description, badge, slug: jobSlug } = jobType;

  const faqs    = buildFAQs(market, jobType);
  const related = JOB_TYPES.filter((j) => j.slug !== jobSlug).slice(0, 3);

  const schemas = [
    breadcrumbSchema([
      { name: "Home",                        href: "/"                                    },
      { name: `Online Jobs in ${country}`,   href: `/earn/country/${market.slug}`            },
      { name: `${title} Jobs in ${country}`, href: `/earn/job/${jobSlug}/${market.slug}` },
    ]),
    faqSchema(faqs),
    jobPostingSchema({
      title:       `${title} Jobs in ${country}`,
      description: `${tagline} ${description}`,
      country,
      payment,
      minSalary: 5000,
      maxSalary: 30000,
      currency,
    }),
  ];

  return (
    <>
      {schemas.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}

      <main className="bg-gray-50 min-h-screen">

        {/* ── Breadcrumb ─────────────────────────────────────────── */}
        <nav
          aria-label="breadcrumb"
          className="bg-white border-b border-gray-100 px-4 py-2 text-xs text-gray-400"
        >
          <ol className="flex items-center gap-1 max-w-3xl mx-auto flex-wrap">
            <li><Link href="/" className="hover:text-rose-500">Home</Link></li>
            <li>/</li>
            <li>
              <Link href={`/earn/country/${market.slug}`} className="hover:text-rose-500">
                Online Jobs in {country}
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-600">{title} Jobs in {country}</li>
          </ol>
        </nav>

        {/* ── Hero ───────────────────────────────────────────────── */}
        <section className="pt-16 pb-12 bg-gradient-to-br from-rose-50 via-white to-pink-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">

            <div className="inline-flex items-center gap-2 bg-rose-100 text-rose-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">
              <span>{icon}</span>{badge}
            </div>

            {/* H1 — exact match: "[Title] Jobs in [Country] — Paid via [Payment]" */}
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
              {title} Jobs in{" "}
              <span className="text-rose-500">{country}</span>
              {" "}— Paid via {payment}
            </h1>

            <p className="text-lg text-gray-500 max-w-xl mx-auto mb-3">{tagline}</p>
            <p className="text-sm text-gray-400 max-w-lg mx-auto mb-8">
              {description}{" "}Top earners make{" "}
              <strong className="text-gray-700">{topEarning}/month</strong>.
              Free to apply — phone only.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <ApplyButton label={`Apply for ${title} Jobs →`} />
              <Link
                href={`/earn/country/${market.slug}`}
                className="bg-white text-gray-700 font-semibold text-base px-8 py-4 rounded-full border border-gray-200 shadow-sm transition-all hover:scale-105"
              >
                All online jobs in {country}
              </Link>
            </div>
          </div>
        </section>

        {/* ── What it involves ───────────────────────────────────── */}
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
                { icon: "📱", title: "Phone only",         body: `All tasks done from your smartphone — no laptop or office needed in ${country}.` },
                { icon: "⏰", title: "Flexible hours",     body: "Work mornings, evenings, or nights. Tasks are available around the clock."       },
                { icon: "💸", title: `${payment} payouts`, body: `Withdraw any time. Funds go directly to your ${payment} number within minutes.` },
              ].map((c) => (
                <div key={c.title} className="bg-gray-50 rounded-2xl border border-gray-100 p-5">
                  <div className="text-2xl mb-2">{c.icon}</div>
                  <h3 className="font-bold text-gray-900 text-sm mb-1">{c.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{c.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── How it works ───────────────────────────────────────── */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-2xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-10 text-center">
              How to start {title.toLowerCase()} work in {country}
            </h2>
            <div className="space-y-4">
              {STEPS.map((s) => (
                <div
                  key={s.n}
                  className="flex items-start gap-4 bg-white rounded-2xl border border-gray-100 p-5 shadow-sm"
                >
                  <div className="w-8 h-8 rounded-full bg-rose-500 text-white font-extrabold text-sm flex items-center justify-center shrink-0">
                    {s.n}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm mb-0.5">{s.title}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed">{s.body}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <ApplyButton label="Apply Free — Takes 2 Minutes" />
            </div>
          </div>
        </section>

        {/* ── City availability ──────────────────────────────────── */}
        <section className="py-12 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-xl font-extrabold text-gray-900 mb-2">
              {title} jobs available in all of {country}
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              Fully remote — work from any city or town.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {cities.map((city) => (
                <Link
                  key={city.slug}
                  href={`/earn/country/${market.slug}/${city.slug}`}
                  className="text-sm text-gray-600 bg-gray-50 border border-gray-100 px-4 py-2 rounded-full hover:border-rose-200 hover:text-rose-600 transition-all"
                >
                  {title} in {city.name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ────────────────────────────────────────────────── */}
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

        {/* ── Related jobs ───────────────────────────────────────── */}
        <section className="py-12 bg-white border-t border-gray-100">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <h2 className="text-lg font-extrabold text-gray-900 mb-5 text-center">
              Other ways to earn online in {country}
            </h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {related.map((job) => (
                <Link
                  key={job.slug}
                  href={`/earn/job/${job.slug}/${market.slug}`}
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

        {/* ── Bottom CTA ─────────────────────────────────────────── */}
        <section className="py-14 bg-rose-500 text-center">
          <div className="max-w-xl mx-auto px-4">
            <h2 className="text-2xl font-extrabold text-white mb-3">
              Ready to start {title.toLowerCase()} work in {country}?
            </h2>
            <p className="text-rose-100 mb-6 text-sm">
              Apply free in 2 minutes. Activation on WhatsApp. Payout to {payment}.
            </p>
            <ApplyButton
              label={`Apply for ${title} Jobs — ${country}`}
              className="inline-block bg-white text-rose-500 font-bold text-base px-10 py-4 rounded-full shadow-xl hover:scale-105 transition-all"
            />
          </div>
        </section>

      </main>
    </>
  );
}