// app/earn/country/[country]/page.tsx
// ─── Country landing page ─────────────────────────────────────────────────────
// Route: /earn/country/kenya  /earn/country/uganda  /earn/country/ghana  /earn/country/botswana
// SEO targets: "vetted online jobs [country]", "earn via [payment] [country]", etc.

import {
    ALL_COUNTRY_SLUGS,
    JOB_TYPES,
    MARKETS
} from "@/lib/seo/keyword-matrix";
import {
    breadcrumbSchema,
    countryPageMetadata,
    faqSchema,
    jobPostingSchema,
} from "@/lib/seo/metadata";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Script from "next/script";
import { use } from "react";

// ─── Types ─────────────────────────────────────────────────────────────────────

interface PageProps {
  params: Promise<{ country: string }>;
}

// ─── Helper: get market data directly from MARKETS ──────────────────────────

function getMarketData(countrySlug: string) {
  return MARKETS.find((m) => m.slug === countrySlug) || null;
}

// ─── Static generation ────────────────────────────────────────────────────────

export function generateStaticParams() {
  return ALL_COUNTRY_SLUGS.map((country) => ({ country }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const market = getMarketData(resolvedParams.country);

  if (!market) return {};
  return countryPageMetadata(market);
}

// ─── Per-market FAQ content ──────────────────────────────────────────────────

function getMarketFAQs(market: any) {
  const {
    country,
    demonym,
    payment,
    activationFee,
    avgEarning,
    topEarning,
    mobileOperator,
  } = market;

  return [
    {
      question: `What are the best vetted online jobs in ${country} right now?`,
      answer: `VelloEarn connects ${demonym} with premium remote work opportunities including AI training, international chatting, paid surveys, and content creation. All roles are verified, and payouts go directly to your ${payment} wallet.`,
    },
    {
      question: `How much can I realistically earn from online jobs in ${country}?`,
      answer: `New team members typically earn ${avgEarning}/month within their first 45 days. Top performers consistently earn ${topEarning}/month. Your earnings scale with experience and consistency — the platform has members earning six figures annually.`,
    },
    {
      question: `What does the ${activationFee} activation fee cover?`,
      answer: `The activation fee is a one-time workspace investment that filters out low-quality applicants and secures your place in our vetted earning ecosystem. It covers: full skills training, dedicated supervisor support, access to premium task pipelines, and ${payment} integration setup. Think of it as an accountability commitment to your success.`,
    },
    {
      question: `Do I need a laptop to work with VelloEarn in ${country}?`,
      answer: `No. All VelloEarn tasks are optimized for smartphone use. A stable internet connection and a ${payment}-enabled phone number are all you need to start earning immediately.`,
    },
    {
      question: `How does ${payment} payout work for ${demonym}?`,
      answer: `Earnings accumulate in real-time on your VelloEarn dashboard. When you request a payout, the amount is sent directly to your registered ${payment} number via ${mobileOperator}. Most withdrawals complete within 30 minutes — no bank account required.`,
    },
    {
      question: `Is VelloEarn a legitimate opportunity for ${demonym}?`,
      answer: `Yes. VelloEarn is a verified remote work platform with active teams across ${country}. We've paid out millions in earnings to ${demonym} since launch. All task providers are vetted, and all payout channels are direct to ${payment}.`,
    },
  ];
}

// ─── Page Component ──────────────────────────────────────────────────────────

export default function CountryPage({ params }: PageProps) {
  const resolvedParams = use(params);

  if (!resolvedParams?.country) {
    notFound();
  }

  const market = getMarketData(resolvedParams.country);
  if (!market) {
    notFound();
  }

  const {
    slug,
    country,
    demonym,
    payment,
    currency,
    activationFee,
    avgEarning,
    topEarning,
    mobileOperator,
    cities,
  } = market;

  const faqs = getMarketFAQs(market);

  // Extract numeric values for schema
  const avgNumeric = parseInt(avgEarning.replace(/[^0-9]/g, ""));
  const topNumeric = parseInt(topEarning.replace(/[^0-9]/g, ""));

  // Structured data - clean canonical URLs without /country/ segment
  const schemas = [
    breadcrumbSchema([
      { name: "Home", href: "/" },
      { name: `Vetted Online Jobs in ${country}`, href: `/earn/country/${slug}` },
    ]),
    faqSchema(faqs),
    jobPostingSchema({
      title: `Premium Remote Online Jobs in ${country} | VelloEarn`,
      description: `Earn ${avgEarning}/mo from vetted AI training, chatting, and survey jobs. Payouts via ${payment}. Premium workspace with full training and support.`,
      country,
      payment,
      minSalary: avgNumeric,
      maxSalary: topNumeric,
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

        {/* ── Breadcrumb ── */}
        <nav
          aria-label="breadcrumb"
          className="bg-white border-b border-gray-100 px-4 py-2 text-xs text-gray-400"
        >
          <ol className="flex items-center gap-1 max-w-3xl mx-auto">
            <li><Link href="/" className="hover:text-rose-500">Home</Link></li>
            <li>/</li>
            <li className="text-gray-600">Vetted Online Jobs in {country}</li>
          </ol>
        </nav>

        {/* ── Hero ── */}
        <section className="pt-16 pb-12 bg-linear-to-br from-rose-50 via-white to-pink-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
              Premium Online Jobs in {country} — Paid via {payment}
            </h1>
            <p className="text-lg text-gray-600 max-w-xl mx-auto mb-8">
              Vetted remote work for {demonym}. AI training, international chatting, surveys & more.
              Full training provided. Direct {payment} payouts.
            </p>

            {/* ROI Stats - Front and Center */}
            <div className="flex flex-wrap justify-center gap-8 mb-8">
              {[
                { value: topEarning, label: "Top earner this month" },
                { value: avgEarning, label: "Average active member" },
                { value: "30 min", label: `Avg. ${payment} payout` },
                { value: activationFee, label: "One-time activation" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-xl font-extrabold text-gray-900">{s.value}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>

            <Link
              href="/join"
              className="inline-block bg-rose-500 hover:bg-rose-600 text-white font-bold text-base px-10 py-4 rounded-full shadow-lg shadow-rose-200 transition-all hover:scale-105"
            >
              Apply Now — Join the Vetted Workspace
            </Link>
            <p className="text-xs text-gray-400 mt-3">
              {activationFee} activation · Full training included · Premium task access
            </p>
          </div>
        </section>

        {/* ── Earning methods grid ── */}
        <section className="py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2 text-center">
              Ways to earn online in {country}
            </h2>
            <p className="text-gray-500 text-center mb-10">
              All roles are vetted and pay directly to {payment}. Choose one or combine multiple.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {JOB_TYPES.map((job) => (
                <Link
                  key={job.slug}
                  href={`/earn/job/${job.slug}/${slug}`}
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
                        Vetted {job.title} jobs in {country} →
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── City grid ── */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-2 text-center">
              Premium remote jobs available across all of {country}
            </h2>
            <p className="text-gray-500 text-center text-sm mb-8">
              Work from home in any city. All you need is a smartphone and {payment} via {mobileOperator}.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {cities.map((city) => (
                <Link
                  key={city.slug}
                  href={`/earn/country/${slug}/${city.slug}`}
                  className="bg-white border border-gray-100 hover:border-rose-200 hover:text-rose-600 text-gray-700 text-sm font-medium px-4 py-2 rounded-full shadow-sm transition-all"
                >
                  Vetted jobs in {city.name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Trust signals ── */}
        <section className="py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-8 text-center">
              Why {demonym} choose VelloEarn
            </h2>
            <div className="grid sm:grid-cols-3 gap-5">
              {[
                {
                  icon: "✅",
                  title: "Vetted & Verified",
                  body: `All earning opportunities are reviewed and verified. You earn real ${currency} that pays directly to your ${payment}.`,
                },
                {
                  icon: "📱",
                  title: "Phone-First Platform",
                  body: `Everything is designed for smartphone use. No laptop required — just your ${mobileOperator} phone and an internet connection.`,
                },
                {
                  icon: "💸",
                  title: `Direct ${payment} Payouts`,
                  body: `Earnings go straight to your registered ${payment} number via ${mobileOperator}. Most withdrawals complete in under 30 minutes.`,
                },
                {
                  icon: "🎓",
                  title: "Full Skills Training",
                  body: "We provide comprehensive onboarding, role-specific training, and dedicated supervisor support. Start from zero, build to expert.",
                },
                {
                  icon: "🤝",
                  title: "Team Earnings Model",
                  body: "Earn from your work and build a team. Income compounds as you expand your network — the platform rewards builders.",
                },
                {
                  icon: "🔒",
                  title: "Premium Workspace",
                  body: `One-time ${activationFee} activation unlocks full access. This filters spam and secures a committed, high-quality earning environment.`,
                },
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

        {/* ── FAQ ── */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-2xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-8 text-center">
              Frequently asked questions about vetted online jobs in {country}
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

        {/* ── Bottom CTA ── */}
        <section className="py-14 bg-rose-500 text-center">
          <div className="max-w-xl mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
              Ready to start earning in {country}?
            </h2>
            <p className="text-rose-100 mb-6 text-sm">
              {activationFee} activation · Full training included · Payout to {payment}
            </p>
            <Link
              href="/join"
              className="inline-block bg-white text-rose-500 font-bold text-base px-10 py-4 rounded-full shadow-xl hover:scale-105 transition-all"
            >
              Apply Now — Join the Premium Workspace
            </Link>
            <p className="text-rose-200/70 text-xs mt-3">
              Vetted roles · Direct {payment} payouts · Premium team support
            </p>
          </div>
        </section>

        {/* ── Cross-links to other markets ── */}
        <section className="py-10 bg-gray-50 border-t border-gray-100">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <p className="text-xs text-gray-400 mb-4 font-medium uppercase tracking-wider">
              Premium online jobs also available in
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {MARKETS.filter((m) => m.slug !== slug).map((m) => (
                <Link
                  key={m.slug}
                  href={`/earn/country/${m.slug}`}
                  className="text-sm text-gray-600 bg-white border border-gray-100 px-4 py-2 rounded-full hover:border-rose-200 hover:text-rose-600 transition-all shadow-sm"
                >
                  Vetted jobs in {m.country} →
                </Link>
              ))}
            </div>
          </div>
        </section>

      </main>
    </>
  );
}