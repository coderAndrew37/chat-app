// app/earn/[country]/page.tsx
// ─── Country landing page ─────────────────────────────────────────────────────
// Route: /earn/kenya  /earn/uganda  /earn/ghana
// This is the highest-value SEO page for each market.
// It targets: "online jobs [country]", "earn via [payment] [country]", etc.

import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { use } from "react"; // 👈 Required for unpacking params in synchronous components
import { notFound } from "next/navigation"; // 👈 Good practice for handling invalid routes cleanly
import {
  MARKETS,
  JOB_TYPES,
  getMarket,
  ALL_COUNTRY_SLUGS,
} from "@/lib/seo/keyword-matrix";
import {
  countryPageMetadata,
  faqSchema,
  breadcrumbSchema,
  jobPostingSchema,
} from "@/lib/seo/metadata";

// Define the updated types where params is a Promise
interface PageProps {
  params: Promise<{ country: string }>;
}

// ─── Static generation ────────────────────────────────────────────────────────

export function generateStaticParams() {
  return ALL_COUNTRY_SLUGS.map((country) => ({ country }));
}

// 👈 Changed to async and added await for params
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const market = getMarket(resolvedParams.country);
  
  if (!market) return {};
  return countryPageMetadata(market);
}

// ─── Per-market FAQ content ───────────────────────────────────────────────────

function getMarketFAQs(market: ReturnType<typeof getMarket>) {
  const { country, payment, currency, topEarning, avgEarning } = market;
  return [
    {
      question: `Are there legit online jobs in ${country} that actually pay?`,
      answer: `Yes. VelloEarn connects ${country}ns with verified remote work including chatting, AI training, surveys, and more. Payouts go directly to ${payment} — no third-party delays.`,
    },
    {
      question: `How much can I earn per month from online jobs in ${country}?`,
      answer: `Earnings vary by role and effort. Beginners typically earn ${currency} 5,000–10,000/month within their first 30 days. Active team members average ${avgEarning}/month, and top earners reach ${topEarning}/month.`,
    },
    {
      question: `Do I need a laptop to work with VelloEarn in ${country}?`,
      answer: `No. All VelloEarn tasks are phone-compatible. A smartphone with a stable internet connection is all you need to start.`,
    },
    {
      question: `How does ${payment} payout work?`,
      answer: `Your earnings accumulate in your VelloEarn dashboard. When you request a withdrawal, the amount is sent directly to your registered ${payment} number — usually within minutes.`,
    },
    {
      question: `Is there a registration fee to join VelloEarn in ${country}?`,
      answer: `Applying is completely free. If selected, there is a one-time account activation step — details are shared privately via WhatsApp after your application is reviewed.`,
    },
  ];
}

// ─── Page Component ───────────────────────────────────────────────────────────

export default function CountryPage({ params }: PageProps) {
  // 👈 Unwrapping the params Promise safely using React.use()
  const resolvedParams = use(params);
  
  // Guard clause to catch rogue hits gracefully
  if (!resolvedParams?.country) {
    notFound();
  }

  const market = getMarket(resolvedParams.country);
  const {
    country, payment, currency, cities,
    topEarning, avgEarning, mobileOperator,
  } = market;

  const faqs = getMarketFAQs(market);

  // Structured data
  const schemas = [
    breadcrumbSchema([
      { name: "Home", href: "/" },
      { name: `Online Jobs in ${country}`, href: `/earn/country/${market.slug}` },
    ]),
    faqSchema(faqs),
    jobPostingSchema({
      title: `Remote Online Jobs in ${country}`,
      description: `Remote chatting, AI training, surveys & more. Paid via ${payment}.`,
      country,
      payment,
      minSalary: 5000,
      maxSalary: 30000,
      currency,
    }),
  ];

  return (
    <>
      {/* Structured data injection */}
      {schemas.map((schema, i) => (
        <Script
          key={i}
          id={`schema-${i}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <main className="bg-gray-50 min-h-screen">

        {/* ── Breadcrumb ──────────────────────────────────────────── */}
        <nav
          aria-label="breadcrumb"
          className="bg-white border-b border-gray-100 px-4 py-2 text-xs text-gray-400"
        >
          <ol className="flex items-center gap-1 max-w-3xl mx-auto">
            <li><Link href="/" className="hover:text-rose-500">Home</Link></li>
            <li>/</li>
            <li className="text-gray-600">Online Jobs in {country}</li>
          </ol>
        </nav>

        {/* ── Hero ────────────────────────────────────────────────── */}
        <section className="pt-16 pb-12 bg-gradient-to-br from-rose-50 via-white to-pink-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
              Online Jobs in {country} That Pay via {payment}
            </h1>
            <p className="text-lg text-gray-500 max-w-xl mx-auto mb-8">
              Remote chatting, AI training, paid surveys & more. Free to apply — your phone is all
              you need. Payouts go straight to {payment}.
            </p>
            <div className="flex flex-wrap justify-center gap-8 mb-8">
              {[
                { value: topEarning + "/mo", label: "Top earner this month" },
                { value: avgEarning + "/mo", label: "Average active member" },
                { value: "Instant",           label: `${payment} payouts` },
                { value: "Free",              label: "To apply" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-xl font-extrabold text-gray-900">{s.value}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
            <Link
              href="/apply"
              className="inline-block bg-rose-500 hover:bg-rose-600 text-white font-bold text-base px-8 py-4 rounded-full shadow-lg shadow-rose-200 transition-all hover:scale-105"
            >
              Apply to Join — Free
            </Link>
          </div>
        </section>

        {/* ── Earning methods grid ─────────────────────────────────── */}
        <section className="py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2 text-center">
              Ways to earn online in {country}
            </h2>
            <p className="text-gray-500 text-center mb-10">
              All pay directly to {payment}. Pick one or do all of them.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {JOB_TYPES.map((job) => (
                <Link
                  key={job.slug}
                  href={`/earn/job/${job.slug}/${market.slug}`}
                  className="group bg-gray-50 hover:bg-rose-50 border border-gray-100 hover:border-rose-200 rounded-2xl p-5 transition-all"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl shrink-0">{job.icon}</span>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-gray-900 text-sm">{job.title}</h3>
                        <span className="text-[10px] bg-rose-100 text-rose-600 font-semibold px-2 py-0.5 rounded-full">
                          {job.badge}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 leading-relaxed">{job.tagline}</p>
                      <p className="text-xs text-rose-500 font-medium mt-2 group-hover:underline">
                        {job.title} jobs in {country} →
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── City grid ────────────────────────────────────────────── */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-2 text-center">
              Online jobs available across all of {country}
            </h2>
            <p className="text-gray-500 text-center text-sm mb-8">
              Work from home in any city or town — all you need is a smartphone and {mobileOperator}.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {cities.map((city) => (
                <Link
                  key={city.slug}
                  href={`/earn/country/${market.slug}/${city.slug}`}
                  className="bg-white border border-gray-100 hover:border-rose-200 hover:text-rose-600 text-gray-700 text-sm font-medium px-4 py-2 rounded-full shadow-sm transition-all"
                >
                  Online jobs in {city.name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Trust signals ────────────────────────────────────────── */}
        <section className="py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-8 text-center">
              Why {country}ns choose VelloEarn
            </h2>
            <div className="grid sm:grid-cols-3 gap-5">
              {[
                { icon: "✅", title: "Verified & legit", body: `No scams. Every earning method is reviewed and pays real ${currency} to your ${payment}.` },
                { icon: "📱", title: "Phone only", body: `No laptop required. Every task is designed to be completed from a ${mobileOperator} smartphone.` },
                { icon: "💸", title: `Direct ${payment} payouts`, body: `Earnings go straight to your registered ${payment} number. Most withdrawals complete in minutes.` },
                { icon: "🎓", title: "No experience needed", body: "We provide onboarding, training, and a structured team environment. Start from zero." },
                { icon: "🤝", title: "Team earnings model", body: "Earn not just from your work — also from the team you build. Income compounds as your network grows." },
                { icon: "🔒", title: "No hidden fees", body: "Applying is free. The one-time activation cost (if selected) is disclosed upfront via WhatsApp." },
              ].map((card) => (
                <div key={card.title} className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                  <div className="text-2xl mb-2">{card.icon}</div>
                  <h3 className="font-bold text-gray-900 text-sm mb-1">{card.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{card.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ — schema + long-tail keyword coverage ────────────── */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-2xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-8 text-center">
              Frequently asked questions about online jobs in {country}
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Bottom CTA ───────────────────────────────────────────── */}
        <section className="py-14 bg-rose-500 text-center">
          <div className="max-w-xl mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
              Ready to start earning in {country}?
            </h2>
            <p className="text-rose-100 mb-6 text-sm">
              2-minute application. Activation on WhatsApp. Payout to {payment}.
            </p>
            <Link
              href="/apply"
              className="inline-block bg-white text-rose-500 font-bold text-base px-10 py-4 rounded-full shadow-xl hover:scale-105 transition-all"
            >
              Apply Free — {country}
            </Link>
          </div>
        </section>

        {/* ── Cross-links to other markets ─────────────────────────── */}
        <section className="py-10 bg-gray-50 border-t border-gray-100">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <p className="text-xs text-gray-400 mb-4 font-medium uppercase tracking-wider">
              Also available in
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {MARKETS.filter((m) => m.slug !== market.slug).map((m) => (
                <Link
                  key={m.slug}
                  href={`/earn/country/${m.slug}`}
                  className="text-sm text-gray-600 bg-white border border-gray-100 px-4 py-2 rounded-full hover:border-rose-200 hover:text-rose-600 transition-all shadow-sm"
                >
                  Online jobs in {m.country} →
                </Link>
              ))}
            </div>
          </div>
        </section>

      </main>
    </>
  );
}