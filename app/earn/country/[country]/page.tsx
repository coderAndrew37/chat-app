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
import Image from "next/image";
import { notFound } from "next/navigation";
import Script from "next/script";
import { use } from "react";
import LiveForeignersOnline from "@/app/components/LiveForeignersOnline";

const VELLOEARN_REGISTER_URL = "https://starhela.com/register?ref=velloearn";

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
    avgEarning,
    topEarning,
    mobileOperator,
  } = market;

  return [
    {
      question: `What are the best ways to earn online in ${country} right now?`,
      answer: `The two biggest earners on VelloEarn are: 1) Chatting with foreigners — earn money having real conversations with people from USA, UK, Europe who are lonely and looking for connection. 2) AI training — rate AI responses, label data, and help train the world's most advanced AI models. Both pay directly to your ${payment}.`
    },
    {
      question: `How much can I realistically earn from online jobs in ${country}?`,
      answer: `New members typically earn ${avgEarning}/month within their first 30 days. Top performers consistently earn ${topEarning}/month combining chatting and AI training. The more you chat, the more you earn — it's that simple.`
    },
    {
      question: `Is VelloEarn free to join?`,
      answer: `Yes! VelloEarn is 100% free to join. No registration fees, no hidden charges, no monthly subscriptions. You earn from your first conversation and withdraw instantly to your ${payment}.`
    },
    {
      question: `Do I need a laptop to work with VelloEarn in ${country}?`,
      answer: `No. All VelloEarn tasks are optimized for smartphone use. A stable internet connection and a ${payment}-enabled phone number are all you need to start earning immediately.`
    },
    {
      question: `How does ${payment} payout work for ${demonym}?`,
      answer: `Earnings accumulate in real-time on your VelloEarn dashboard. When you request a payout, the amount is sent directly to your registered ${payment} number via ${mobileOperator}. Most withdrawals complete within 30 minutes — no bank account required.`
    },
    {
      question: `Is VelloEarn a legitimate opportunity for ${demonym}?`,
      answer: `Yes. VelloEarn is a verified remote work platform with active teams across ${country}. We've paid out millions in earnings to ${demonym} since launch. All tasks are legitimate, and all payout channels are direct to ${payment}.`
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
    avgEarning,
    topEarning,
    cities,
  } = market;

  const faqs = getMarketFAQs(market);

  // Extract numeric values for schema
  const avgNumeric = parseInt(avgEarning.replace(/[^0-9]/g, ""));
  const topNumeric = parseInt(topEarning.replace(/[^0-9]/g, ""));

  // Structured data
  const schemas = [
    breadcrumbSchema([
      { name: "Home", href: "/" },
      { name: `Vetted Online Jobs in ${country}`, href: `/earn/country/${slug}` },
    ]),
    faqSchema(faqs),
    jobPostingSchema({
      title: `Premium Remote Online Jobs in ${country} | VelloEarn`,
      description: `Earn ${avgEarning}/mo from chatting with foreigners and AI training. Payouts via ${payment}. Free to join.`,
      country,
      payment,
      minSalary: avgNumeric,
      maxSalary: topNumeric,
      currency,
    }),
  ];

  // Chatting and AI training images
  const chatImage = "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&h=600&fit=crop&crop=face&auto=format";
  const aiImage = "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&h=600&fit=crop&auto=format";

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
          <ol className="flex items-center gap-1 max-w-6xl mx-auto">
            <li><Link href="/" className="hover:text-rose-500">Home</Link></li>
            <li>/</li>
            <li className="text-gray-600">Earn Online in {country}</li>
          </ol>
        </nav>

        {/* ── HERO ── */}
        <section className="relative pt-12 pb-16 sm:pt-16 sm:pb-20 overflow-hidden bg-gradient-to-br from-rose-50 via-white to-pink-50">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-rose-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
          
          <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
              
              {/* Left - Content */}
              <div>
                <div className="inline-flex items-center gap-2 bg-rose-100 text-rose-600 text-xs font-bold px-3 py-1.5 rounded-full mb-4 uppercase tracking-wider">
                  🔥 #1 Earning Method in {country}
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight tracking-tight mb-4">
                  Chat with foreigners & <br />
                  <span className="text-rose-500">get paid instantly.</span>
                </h1>

                <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-4 max-w-lg">
                  No experience? No problem. 61,000+ Kenyans are already earning by 
                  chatting with lonely foreigners and training AI. Free to join. 
                  {payment} payouts daily.
                </p>

                {/* Stats */}
                <div className="flex flex-wrap gap-6 mb-6">
                  <div>
                    <div className="text-2xl font-extrabold text-gray-900">61K+</div>
                    <div className="text-xs text-gray-400">Active earners</div>
                  </div>
                  <div>
                    <div className="text-2xl font-extrabold text-gray-900">{topEarning}</div>
                    <div className="text-xs text-gray-400">Top earner this month</div>
                  </div>
                  <div>
                    <div className="text-2xl font-extrabold text-gray-900">Free</div>
                    <div className="text-xs text-gray-400">To join</div>
                  </div>
                  <div>
                    <div className="text-2xl font-extrabold text-gray-900">30 min</div>
                    <div className="text-xs text-gray-400">{payment} payout</div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={VELLOEARN_REGISTER_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-bold text-base px-8 py-4 rounded-full shadow-lg shadow-rose-200 transition-all hover:scale-105 active:scale-95 text-center"
                  >
                    Start Earning Now — Free →
                  </a>
                  <Link
                    href="#how-it-works"
                    className="bg-white hover:bg-gray-50 text-gray-600 font-semibold text-base px-8 py-4 rounded-full border border-gray-200 shadow-sm transition-all hover:scale-105 active:scale-95 text-center"
                  >
                    See how it works
                  </Link>
                </div>

                <div className="flex flex-wrap gap-4 mt-6 text-xs text-gray-400">
                  <span>✅ Free to join</span>
                  <span>💸 No fees ever</span>
                  <span>📱 Chat from your phone</span>
                  <span>🌍 50K+ active chatters</span>
                </div>
              </div>

              {/* Right - Image collage */}
              <div className="relative grid grid-cols-2 gap-3">
                <div className="col-span-2 relative rounded-2xl overflow-hidden h-48 sm:h-56 shadow-xl">
                  <Image
                    src={chatImage}
                    alt={`${demonym} chatting online and earning money`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <p className="text-white font-bold text-sm">💬 Chat with foreigners</p>
                    <p className="text-white/70 text-xs">Earn from every conversation</p>
                  </div>
                </div>
                <div className="relative rounded-2xl overflow-hidden h-40 shadow-xl">
                  <Image
                    src={aiImage}
                    alt={`AI training jobs in ${country}`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                    <p className="text-white font-bold text-xs">🤖 Train AI</p>
                    <p className="text-white/60 text-[10px]">KES 80-400/task</p>
                  </div>
                </div>
                <div className="relative rounded-2xl overflow-hidden h-40 bg-rose-500 flex items-center justify-center shadow-xl">
                  <div className="text-center text-white p-4">
                    <div className="text-3xl font-extrabold">61K+</div>
                    <div className="text-sm text-rose-100">Active earners</div>
                    <div className="text-xs text-rose-200 mt-1">Join them today</div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        <LiveForeignersOnline/>

        {/* ── 60/40 Split: Chatting & AI Training ── */}
        <section id="how-it-works" className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <span className="text-rose-500 font-semibold text-sm uppercase tracking-wider">Two ways to earn</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2 mb-3">
                The 2 biggest earners in {country}
              </h2>
              <p className="text-gray-500 max-w-xl mx-auto">
                60% of our members earn through chatting. 40% through AI training. 
                Most do both.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Chatting Card - 60% */}
              <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-3xl p-8 border border-rose-100 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-rose-200/20 rounded-full blur-2xl" />
                <div className="relative">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-4xl">💬</span>
                    <span className="bg-rose-500 text-white text-xs font-bold px-3 py-1 rounded-full">60% of earners</span>
                  </div>
                  <h3 className="text-2xl font-extrabold text-gray-900 mb-2">Chat with foreigners</h3>
                  <p className="text-gray-600 mb-4">Real conversations with people from USA, UK, Europe who are lonely and looking for connection. Make friends, share your culture, get paid.</p>
                  <ul className="space-y-2 mb-6 text-sm">
                    <li className="flex items-center gap-2 text-gray-600">
                      <span className="text-emerald-500">✓</span> Earn from every conversation
                    </li>
                    <li className="flex items-center gap-2 text-gray-600">
                      <span className="text-emerald-500">✓</span> No scripts — just be yourself
                    </li>
                    <li className="flex items-center gap-2 text-gray-600">
                      <span className="text-emerald-500">✓</span> 24/7 — chat whenever you want
                    </li>
                    <li className="flex items-center gap-2 text-gray-600">
                      <span className="text-emerald-500">✓</span> Earn {avgEarning}/month part-time
                    </li>
                  </ul>
                  <a
                    href={VELLOEARN_REGISTER_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-rose-500 hover:bg-rose-600 text-white font-bold px-6 py-3 rounded-full transition-all hover:scale-105 text-sm"
                  >
                    Start Chatting — Free →
                  </a>
                </div>
              </div>

              {/* AI Training Card - 40% */}
              <div className="bg-gradient-to-br from-violet-50 to-indigo-50 rounded-3xl p-8 border border-violet-100 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-violet-200/20 rounded-full blur-2xl" />
                <div className="relative">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-4xl">🤖</span>
                    <span className="bg-violet-500 text-white text-xs font-bold px-3 py-1 rounded-full">40% of earners</span>
                  </div>
                  <h3 className="text-2xl font-extrabold text-gray-900 mb-2">Train AI models</h3>
                  <p className="text-gray-600 mb-4">Rate AI responses, label data, and help train the world&apos;s most advanced AI models. No tech background needed — just your judgment.</p>
                  <ul className="space-y-2 mb-6 text-sm">
                    <li className="flex items-center gap-2 text-gray-600">
                      <span className="text-emerald-500">✓</span> KES 80-400 per task
                    </li>
                    <li className="flex items-center gap-2 text-gray-600">
                      <span className="text-emerald-500">✓</span> Work from your phone
                    </li>
                    <li className="flex items-center gap-2 text-gray-600">
                      <span className="text-emerald-500">✓</span> Paid training included
                    </li>
                    <li className="flex items-center gap-2 text-gray-600">
                      <span className="text-emerald-500">✓</span> Earn {avgEarning}/month part-time
                    </li>
                  </ul>
                  <a
                    href={VELLOEARN_REGISTER_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-violet-500 hover:bg-violet-600 text-white font-bold px-6 py-3 rounded-full transition-all hover:scale-105 text-sm"
                  >
                    Start AI Training — Free →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── How It Works - Simple Steps ── */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <span className="text-rose-500 font-semibold text-sm uppercase tracking-wider">3 simple steps</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2 mb-3">
                Start earning today — it&apos;s that easy
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: "📝",
                  title: "Sign up — free",
                  description: "Create your account in 2 minutes. No fees, no CV, no interview."
                },
                {
                  icon: "💬",
                  title: "Start chatting or training",
                  description: "Browse live profiles or start rating AI responses. Earn from your first conversation."
                },
                {
                  icon: "💸",
                  title: `Withdraw to ${payment}`,
                  description: `Your earnings accumulate instantly. Withdraw to ${payment} anytime. No minimum.`
                }
              ].map((step, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 text-center shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">{step.icon}</span>
                  </div>
                  <div className="text-sm font-mono text-rose-500 mb-1">Step {i + 1}</div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-500">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Earning methods grid ── */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2 text-center">
              More ways to earn in {country}
            </h2>
            <p className="text-gray-500 text-center mb-10">
              Choose one or combine multiple. All pay directly to {payment}.
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
                        Learn more →
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
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-2 text-center">
              Available across all of {country}
            </h2>
            <p className="text-gray-500 text-center text-sm mb-8">
              Work from home in any city. All you need is a smartphone and {payment}.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {cities.map((city) => (
                <Link
                  key={city.slug}
                  href={`/earn/country/${slug}/${city.slug}`}
                  className="bg-white border border-gray-100 hover:border-rose-200 hover:text-rose-600 text-gray-700 text-sm font-medium px-4 py-2 rounded-full shadow-sm transition-all"
                >
                  Jobs in {city.name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Trust signals ── */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-8 text-center">
              Why {demonym} choose VelloEarn
            </h2>
            <div className="grid sm:grid-cols-3 gap-5">
              {[
                {
                  icon: "✅",
                  title: "Free to join",
                  body: "No registration fees. No monthly subscriptions. No hidden charges. Ever."
                },
                {
                  icon: "📱",
                  title: "Chat from your phone",
                  body: `Everything is designed for smartphone use. No laptop required — just your phone and an internet connection.`
                },
                {
                  icon: "💸",
                  title: `Instant ${payment} payouts`,
                  body: `Earnings go straight to your ${payment} number. Most withdrawals complete in under 30 minutes.`
                },
                {
                  icon: "🌍",
                  title: "Chat with real people",
                  body: "Real conversations with foreigners from USA, UK, Europe who are lonely and looking for connection."
                },
                {
                  icon: "🤖",
                  title: "Train AI from home",
                  body: "Rate AI responses, label data, and help train the world's most advanced AI models."
                },
                {
                  icon: "🏆",
                  title: "61,000+ active earners",
                  body: `Join a thriving community of ${demonym} earning money online. You're not alone.`
                },
              ].map((card) => (
                <div key={card.title} className="bg-gray-50 rounded-2xl p-5 border border-gray-100 hover:border-rose-200 transition-colors">
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
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-8 text-center">
              Questions? We&apos;ve got answers.
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FINAL CTA - Irresistible Offer ── */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-rose-500 to-pink-600" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full translate-x-1/3 -translate-y-1/2 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/10 rounded-full -translate-x-1/3 translate-y-1/3 pointer-events-none" />
          
          <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white text-sm font-semibold px-4 py-2 rounded-full mb-6">
              🚀 61,000+ {demonym} already earning
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
              Your first {payment} payout could be <br />
              <span className="text-rose-200">today.</span>
            </h2>
            
            <p className="text-rose-100 text-lg mb-8 max-w-xl mx-auto">
              Free to join. Chat with foreigners or train AI. No experience needed. 
              No fees. Start earning immediately.
            </p>

            <div className="flex flex-wrap justify-center gap-6 mb-8 text-white/80 text-sm">
              <span>✅ Free to join</span>
              <span>💸 No fees ever</span>
              <span>📱 Chat from your phone</span>
              <span>⚡ Instant {payment} payouts</span>
            </div>

            <a
              href={VELLOEARN_REGISTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-rose-500 hover:bg-rose-50 font-extrabold text-xl px-12 py-5 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all"
            >
              Start Earning Now — Free →
            </a>
            
            <p className="text-rose-200/70 text-sm mt-4">
              No credit card · No payment required · Start earning instantly
            </p>
          </div>
        </section>

        {/* ── Cross-links to other markets ── */}
        <section className="py-10 bg-gray-50 border-t border-gray-100">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <p className="text-xs text-gray-400 mb-4 font-medium uppercase tracking-wider">
              Also available in
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {MARKETS.filter((m) => m.slug !== slug).map((m) => (
                <Link
                  key={m.slug}
                  href={`/earn/country/${m.slug}`}
                  className="text-sm text-gray-600 bg-white border border-gray-100 px-4 py-2 rounded-full hover:border-rose-200 hover:text-rose-600 transition-all shadow-sm"
                >
                  Earn in {m.country} →
                </Link>
              ))}
            </div>
          </div>
        </section>

      </main>
    </>
  );
}