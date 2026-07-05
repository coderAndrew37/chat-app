// app/earn/[country]/[city]/page.tsx
// ─── City landing page ────────────────────────────────────────────────────────
// Route: /earn/kenya/nairobi  /earn/ghana/accra  /earn/uganda/kampala etc.
// Targets: "online jobs Nairobi", "work from home Kisumu", "earn via M-Pesa Mombasa"

import { use } from "react"; // 👈 Required for unpacking async params in sync components
import { notFound } from "next/navigation"; // 👈 Gracefully handles missing cities or rogue URLs
import {
    JOB_TYPES,
    getAllCityParams,
    getMarket
} from "@/lib/seo/keyword-matrix";
import {
    breadcrumbSchema,
    cityPageMetadata,
    faqSchema,
} from "@/lib/seo/metadata";
import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

// Define the unified Promise-based params type
interface PageProps {
  params: Promise<{ country: string; city: string }>;
}

// ─── Static generation ────────────────────────────────────────────────────────

export function generateStaticParams() {
  return getAllCityParams().map(({ market, city }) => ({
    country: market.slug,
    city: city.slug,
  }));
}

// 👈 Changed to async and added await for params
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const market = getMarket(resolvedParams.country);
  if (!market) return {};
  
  const city = market.cities.find((c) => c.slug === resolvedParams.city);
  if (!city) return {};
  
  return cityPageMetadata(market, city);
}

// ─── Page Component ───────────────────────────────────────────────────────────

export default function CityPage({ params }: PageProps) {
  // 👈 Unwrapping the dynamic params Promise safely using React.use()
  const resolvedParams = use(params);
  
  // Guard clause against empty values
  if (!resolvedParams?.country || !resolvedParams?.city) {
    notFound();
  }

  const market = getMarket(resolvedParams.country);
  if (!market) notFound();

  const city = market.cities.find((c) => c.slug === resolvedParams.city);
  if (!city) notFound(); // 👈 Cleaner than returning a generic inline div

  const { country, payment, currency, mobileOperator, topEarning } = market;

  const faqs = [
    {
      question: `Are there legit online jobs in ${city.name}?`,
      answer: `Yes. VelloEarn connects ${city.name} residents with remote chatting, AI training, paid surveys, and more — all paying directly to ${payment} with no laptop required.`,
    },
    {
      question: `Can I do online jobs from ${city.name} without experience?`,
      answer: `Absolutely. VelloEarn provides onboarding and structured tasks. If you have a smartphone and good communication skills, you can start within 24 hours of your application being approved.`,
    },
    {
      question: `How do I get paid if I'm in ${city.name}?`,
      answer: `Payouts go directly to your ${payment} number — the same number you use in ${city.name} every day. Most withdrawals complete in minutes.`,
    },
    {
      question: `What online jobs are available in ${city.name} right now?`,
      answer: `Currently available: remote chatting, AI training, paid surveys, Swahili teaching, academic writing, and forex trading support. All available to ${city.name} residents.`,
    },
  ];

  const schemas = [
    breadcrumbSchema([
      { name: "Home", href: "/" },
      { name: `Online Jobs in ${country}`, href: `/earn/country/${market.slug}` },
      { name: `Online Jobs in ${city.name}`, href: `/earn/country/${market.slug}/${city.slug}` },
    ]),
    faqSchema(faqs),
  ];

  return (
    <>
      {schemas.map((schema, i) => (
        <Script
          key={i}
          id={`schema-city-${i}`}
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
            <li><Link href={`/earn/country/${market.slug}`} className="hover:text-rose-500">Online Jobs in {country}</Link></li>
            <li>/</li>
            <li className="text-gray-600">Online Jobs in {city.name}</li>
          </ol>
        </nav>

        {/* ── Hero ────────────────────────────────────────────────── */}
        <section className="pt-16 pb-12 bg-gradient-to-br from-rose-50 via-white to-pink-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
              Online Jobs in {city.name},{" "}
              <span className="text-rose-500">{country}</span>
            </h1>
            <p className="text-lg text-gray-500 max-w-xl mx-auto mb-6">
              Work from home in {city.name} and earn directly to {payment}. All tasks are
              phone-compatible — no commute, no degree required.
            </p>
            <p className="text-sm text-gray-400 mb-8">
              Join VelloEarn members across {city.name} earning up to{" "}
              <strong className="text-gray-700">{topEarning}/month</strong> from remote work.
            </p>
            <Link
              href="/join"
              className="inline-block bg-rose-500 hover:bg-rose-600 text-white font-bold text-base px-8 py-4 rounded-full shadow-lg shadow-rose-200 transition-all hover:scale-105"
            >
              Apply Now — {city.name}
            </Link>
          </div>
        </section>

        {/* ── Job types ───────────────────────────────────────────── */}
        <section className="py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-2 text-center">
              {payment} online jobs available in {city.name}
            </h2>
            <p className="text-gray-500 text-sm text-center mb-10">
              All positions are remote. All pay to {payment}. All available to {city.name} residents.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {JOB_TYPES.map((job) => (
                <Link
                  key={job.slug}
                  href={`/earn/job/${job.slug}/${market.slug}`}
                  className="group bg-gray-50 hover:bg-rose-50 border border-gray-100 hover:border-rose-200 rounded-2xl p-5 transition-all"
                >
                  <div className="text-2xl mb-2">{job.icon}</div>
                  <h3 className="font-bold text-gray-900 text-sm mb-1">{job.title}</h3>
                  <p className="text-xs text-gray-500 mb-2">{job.tagline}</p>
                  <span className="text-xs text-rose-500 font-medium group-hover:underline">
                    View {job.shortTitle} jobs →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Requirements — localized ─────────────────────────────── */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-3">
              Who can apply from {city.name}?
            </h2>
            <p className="text-gray-500 text-sm mb-8">
              Simple requirements. Big results.
            </p>
            <div className="grid sm:grid-cols-2 gap-3 text-left">
              {[
                { icon: "📱", text: `A smartphone (any ${mobileOperator}-compatible Android or iPhone)` },
                { icon: "💬", text: "Good communication skills in English or Swahili" },
                { icon: "📶", text: `Stable internet in ${city.name} — Wi-Fi or mobile data` },
                { icon: "🎯", text: "A genuine interest in building consistent remote income" },
              ].map((req) => (
                <div
                  key={req.text}
                  className="flex items-center gap-3 bg-white rounded-xl p-4 border border-gray-100 shadow-sm"
                >
                  <span className="text-xl shrink-0">{req.icon}</span>
                  <span className="text-sm text-gray-700">{req.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ─────────────────────────────────────────────────── */}
        <section className="py-16 bg-white">
          <div className="max-w-2xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-8 text-center">
              Questions about online jobs in {city.name}
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-gray-50 rounded-2xl border border-gray-100 p-5">
                  <h3 className="font-semibold text-gray-900 text-sm mb-2">{faq.question}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Cross-links: other cities in this country ─────────────── */}
        <section className="py-10 bg-gray-50 border-t border-gray-100">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <p className="text-xs text-gray-400 mb-4 font-medium uppercase tracking-wider">
              Other cities in {country}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {market.cities
                .filter((c) => c.slug !== city.slug)
                .map((c) => (
                  <Link
                    key={c.slug}
                    href={`/earn/country/${market.slug}/${c.slug}`}
                    className="text-sm text-gray-600 bg-white border border-gray-100 px-4 py-2 rounded-full hover:border-rose-200 hover:text-rose-600 transition-all shadow-sm"
                  >
                    Online jobs in {c.name}
                  </Link>
                ))}
            </div>
          </div>
        </section>

      </main>
    </>
  );
}