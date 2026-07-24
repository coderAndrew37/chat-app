// app/earn/[country]/[city]/page.tsx
// ─── City landing page ────────────────────────────────────────────────────────
// Route: /earn/kenya/nairobi  /earn/ghana/accra  /earn/uganda/kampala etc.
// Targets: "online jobs Nairobi", "work from home Kisumu", "earn via M-Pesa Mombasa"

import { use } from "react";
import { notFound } from "next/navigation";
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
import Image from "next/image";
import Script from "next/script";
import LiveForeignersOnline from "@/app/components/LiveForeignersOnline";

const VELLOEARN_REGISTER_URL = "https://starhela.com/register?ref=velloearn";

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
  const resolvedParams = use(params);
  
  if (!resolvedParams?.country || !resolvedParams?.city) {
    notFound();
  }

  const market = getMarket(resolvedParams.country);
  if (!market) notFound();

  const city = market.cities.find((c) => c.slug === resolvedParams.city);
  if (!city) notFound();

  const { country, payment, currency, mobileOperator, topEarning, avgEarning } = market;

  const faqs = [
    {
      question: `What are the best online jobs in ${city.name} right now?`,
      answer: `The top two earners in ${city.name} are: 1) Chatting with foreigners — earn from real conversations with people from USA, UK, Europe. 2) AI training — rate AI responses, label data, and help train global AI models. Both pay directly to your ${payment}.`
    },
    {
      question: `Can I do online jobs from ${city.name} without experience?`,
      answer: `Absolutely. VelloEarn provides onboarding and structured tasks. If you have a smartphone and good communication skills, you can start within 24 hours. No experience needed.`
    },
    {
      question: `How much can I earn in ${city.name}?`,
      answer: `New members typically earn ${avgEarning}/month within their first 30 days. Top performers consistently earn ${topEarning}/month combining chatting and AI training.`
    },
    {
      question: `How do I get paid if I'm in ${city.name}?`,
      answer: `Payouts go directly to your ${payment} number — the same number you use in ${city.name} every day. Most withdrawals complete within 30 minutes.`
    },
    {
      question: `Is VelloEarn free to join in ${city.name}?`,
      answer: `Yes! VelloEarn is 100% free to join. No registration fees, no hidden charges, no monthly subscriptions. You earn from your first conversation and withdraw instantly.`
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

  // Images
  const chatImage = "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&h=600&fit=crop&crop=face&auto=format";
  const aiImage = "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&h=600&fit=crop&auto=format";

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
          <ol className="flex items-center gap-1 max-w-6xl mx-auto flex-wrap">
            <li><Link href="/" className="hover:text-rose-500">Home</Link></li>
            <li>/</li>
            <li><Link href={`/earn/country/${market.slug}`} className="hover:text-rose-500">Online Jobs in {country}</Link></li>
            <li>/</li>
            <li className="text-gray-600">Online Jobs in {city.name}</li>
          </ol>
        </nav>

        {/* ── Hero ────────────────────────────────────────────────── */}
        <section className="relative pt-12 pb-16 sm:pt-16 sm:pb-20 overflow-hidden bg-gradient-to-br from-rose-50 via-white to-pink-50">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-rose-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
          
          <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
              
              {/* Left - Content */}
              <div>
                <div className="inline-flex items-center gap-2 bg-rose-100 text-rose-600 text-xs font-bold px-3 py-1.5 rounded-full mb-4 uppercase tracking-wider">
                  🔥 #1 in {city.name}
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight tracking-tight mb-4">
                  Online Jobs in {city.name} — <br />
                  <span className="text-rose-500">Chat &amp; Earn {payment}</span>
                </h1>

                <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-4 max-w-lg">
                  Work from home in {city.name}. Chat with foreigners or train AI. 
                  No experience needed. Free to join. {payment} payouts daily.
                </p>

                {/* Stats */}
                <div className="flex flex-wrap gap-6 mb-6">
                  <div>
                    <div className="text-2xl font-extrabold text-gray-900">61K+</div>
                    <div className="text-xs text-gray-400">Active earners</div>
                  </div>
                  <div>
                    <div className="text-2xl font-extrabold text-gray-900">{topEarning}</div>
                    <div className="text-xs text-gray-400">Top earner</div>
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

           {/* Right - Image Collage */}
<div className="relative grid grid-cols-2 gap-3">
  {/* Main Image - Chat with foreigners (links to chatting page) */}
  <Link
    href="/earn/chatting"
    className="col-span-2 relative rounded-2xl overflow-hidden h-48 sm:h-56 shadow-xl group"
  >
    <Image
      src={chatImage}
      alt={`${city.name} residents chatting online and earning money`}
      fill
      className="object-cover transition-transform duration-500 group-hover:scale-105"
    />
    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300" />
    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
      <p className="text-white font-bold text-sm group-hover:text-rose-300 transition-colors">💬 Chat with foreigners</p>
      <p className="text-white/70 text-xs">Earn from every conversation →</p>
    </div>
  </Link>

  {/* Bottom Left - Train AI (links to AI training page) */}
  <Link
    href="/earn/ai-training"
    className="relative rounded-2xl overflow-hidden h-40 shadow-xl group"
  >
    <Image
      src={aiImage}
      alt={`AI training jobs in ${city.name}`}
      fill
      className="object-cover transition-transform duration-500 group-hover:scale-105"
    />
    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300" />
    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
      <p className="text-white font-bold text-xs group-hover:text-violet-300 transition-colors">🤖 Train AI</p>
      <p className="text-white/60 text-[10px]">Earn per task →</p>
    </div>
  </Link>

  {/* Bottom Right - Stats Card (links to join) */}
  <Link
    href={VELLOEARN_REGISTER_URL}
    target="_blank"
    rel="noopener noreferrer"
    className="relative rounded-2xl overflow-hidden h-40 bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center shadow-xl group hover:scale-105 transition-transform duration-300"
  >
    <div className="text-center text-white p-4">
      <div className="text-3xl font-extrabold group-hover:scale-110 transition-transform duration-300">61K+</div>
      <div className="text-sm text-rose-100">Active earners</div>
      <div className="text-xs text-rose-200 mt-1 group-hover:text-white transition-colors">Join them today →</div>
    </div>
  </Link>
</div>

            </div>
          </div>
        </section>

        {/* ── Live Foreigners Online Section ── */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-10">
              <span className="text-rose-500 font-semibold text-sm uppercase tracking-wider">Live right now</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2 mb-3">
                Real people waiting to chat with you
              </h2>
              <p className="text-gray-500 max-w-xl mx-auto">
                These are real users looking for conversation right now. Start chatting and earning instantly.
              </p>
            </div>
            <LiveForeignersOnline />
          </div>
        </section>

        {/* ── 60/40 Split: Chatting & AI Training ── */}
        <section id="how-it-works" className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <span className="text-rose-500 font-semibold text-sm uppercase tracking-wider">Two ways to earn</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2 mb-3">
                The 2 biggest earners in {city.name}
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
                      <span className="text-emerald-500">✓</span> Earn per task completed
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

        {/* ── Job types ───────────────────────────────────────────── */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-2 text-center">
              More {payment} jobs available in {city.name}
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
                        View {job.shortTitle} jobs →
                      </p>
                    </div>
                  </div>
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
                { icon: "📱", text: `A smartphone (any ${mobileOperator}-compatible phone)` },
                { icon: "💬", text: "Good communication skills in English" },
                { icon: "📶", text: `Stable internet in ${city.name} — Wi-Fi or data` },
                { icon: "🎯", text: "Willingness to chat and earn" },
              ].map((req) => (
                <div
                  key={req.text}
                  className="flex items-center gap-3 bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:border-rose-200 transition-colors"
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
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-8 text-center">
              Questions about online jobs in {city.name}
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-gray-50 rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-2">{faq.question}</h3>
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
              🚀 Join 61,000+ active earners
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
              Your first {payment} payout from {city.name} <br />
              <span className="text-rose-200">could be today.</span>
            </h2>
            
            <p className="text-rose-100 text-lg mb-8 max-w-xl mx-auto">
              Free to join. Chat with foreigners or train AI. No experience needed. 
              No fees. Start earning immediately from {city.name}.
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