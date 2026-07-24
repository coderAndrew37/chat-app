"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import LiveForeignersLearning from "@/app/components/LiveForeignersLearning";

const VELLOEARN_REGISTER_URL = "https://starhela.com/register?ref=velloearn";

// --- Components ---

function SmartImage({
  src, fallback, alt, fill, width, height, className, sizes, priority,
}: {
  src: string; fallback: string; alt: string; fill?: boolean; width?: number; height?: number;
  className?: string; sizes?: string; priority?: boolean;
}) {
  const [imgSrc, setImgSrc] = useState(src);
  const props = { src: imgSrc, alt, className, onError: () => setImgSrc(fallback), sizes, priority };
  return fill
    ? <Image {...props} fill unoptimized alt="" />
    : <Image {...props} width={width ?? 400} height={height ?? 300} unoptimized alt=""/>;
}

function ObjAccordion({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left transition-colors hover:bg-gray-50"
      >
        <span className="font-semibold text-gray-900 text-sm sm:text-base pr-4">{q}</span>
        <span
          className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 ${
            open ? "bg-amber-500 text-white rotate-45" : "bg-gray-100 text-gray-500"
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </span>
      </button>
      {open && (
        <div className="px-5 pb-5 animate-in fade-in slide-in-from-top-1 duration-200">
          <p className="text-gray-500 text-sm leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  );
}

// --- Props Configuration ---
interface SurveysClientProps {
  countryTarget: "kenya" | "uganda" | "ghana";
}

// --- Dynamic Regional Data Matrix ---
const REGIONAL_DATA = {
  kenya: {
    marketName: "Kenyan consumer",
    marketDesc: "Kenya is one of the fastest-growing consumer markets in Africa. International brands launching here, or studying African market behaviour, specifically need Kenyan respondents.",
    paymentMethod: "M-Pesa",
    currency: "KES",
    minWithdrawal: "KES 0",
    heroStats: [
      { v: "KES 80+", l: "Per survey" },
      { v: "KES 3,000+", l: "Focus groups" },
      { v: "Free", l: "To join" },
    ],
    taskTypes: [
      { icon: "📋", title: "Paid surveys", time: "5–20 min", pay: "KES 80–350 each", body: "Answer structured questions from global brands. Topics range from consumer habits to political sentiment to product feedback. Your Kenyan perspective is specifically what they're paying for." },
      { icon: "📦", title: "Product testing", time: "30–90 min", pay: "KES 400–1,500 each", body: "You receive a product (physical or digital), use it, then fill in a detailed feedback form or record a short video review. Higher effort, significantly higher payout." },
      { icon: "💻", title: "Website & app testing", time: "15–45 min", pay: "KES 300–800 each", body: "You're given a website or app and a set of tasks to complete while narrating your experience. Companies use this to find friction points before launch. Your honest confusion is valuable." },
      { icon: "🎙️", title: "Focus groups", time: "60–90 min", pay: "KES 1,200–3,000 each", body: "Live video sessions with a small group of researchers. You discuss a product, ad campaign, or social issue. High pay, lower frequency — but when they come up, they're worth your time." },
    ],
    earnings: [
      { label: "Casual (5–10 surveys/week)", range: "KES 3,000 – 7,000", note: "/ month" },
      { label: "Active (daily tasks + testing)", range: "KES 12,000 – 20,000", note: "/ month" },
      { label: "Active + focus groups + team", range: "KES 25,000 – 45,000+", note: "/ month" },
    ],
    stories: [
      { name: "Sylvia K.", location: "Nairobi, Karen", earned: "KES 14,800 / month", story: "I do surveys while watching TV in the evening. It's the most painless income I've ever made. I only do tasks that take under 20 minutes — I just stack them up across the week.", img: "/testimonials/sylvia.jpg", fallback: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&h=200&fit=crop&crop=face&auto=format" },
      { name: "Daniel M.", location: "Eldoret", earned: "KES 29,000 / month", story: "I prioritise the product testing and focus groups — they pay the most per hour. I treat it like a part-time job. When a focus group drops, I clear my schedule and show up. KES 2,500 for 90 minutes is not something I pass on.", img: "/testimonials/daniel.jpg", fallback: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face&auto=format" },
    ],
    appObjection: "Isn't this like those useless survey apps that pay KES 5? Those apps exist, and they're a waste of time. What's different here: the tasks are sourced from actual market research firms and global brands with real budgets. The minimum survey payout on our platform is KES 80 — and most pay more. Product tests and focus groups pay multiples of that. The infrastructure is built to bring quality work, not filler tasks.",
    qualifyObjection: "Qualification is based on your profile. Kenyans aged 18–40 in urban areas qualify for the majority of our available tasks — that's the demographic global brands want. The more complete your profile (education, income, device usage, shopping habits), the wider your task eligibility. New tasks are added weekly.",
  },
  uganda: {
    marketName: "Ugandan consumer",
    marketDesc: "Uganda represents an emerging market frontier across East Africa. International enterprises expanding services or studying consumer habits specifically require local Ugandan feedback arrays.",
    paymentMethod: "Mobile Money",
    currency: "UGX",
    minWithdrawal: "UGX 0",
    heroStats: [
      { v: "UGX 2,500+", l: "Per survey" },
      { v: "UGX 90,000+", l: "Focus groups" },
      { v: "Free", l: "To join" },
    ],
    taskTypes: [
      { icon: "📋", title: "Paid surveys", time: "5–20 min", pay: "UGX 2,500–10,000 each", body: "Answer structured questions from global brands. Topics range from consumer habits to political sentiment to product feedback. Your Ugandan perspective is specifically what they're paying for." },
      { icon: "📦", title: "Product testing", time: "30–90 min", pay: "UGX 12,000–45,000 each", body: "You receive a product (physical or digital), use it, then fill in a detailed feedback form or record a short video review. Higher effort, significantly higher payout." },
      { icon: "💻", title: "Website & app testing", time: "15–45 min", pay: "UGX 9,000–25,000 each", body: "You're given a website or app and a set of tasks to complete while narrating your experience. Companies use this to find friction points before launch. Your honest confusion is valuable." },
      { icon: "🎙️", title: "Focus groups", time: "60–90 min", pay: "UGX 35,000–90,000 each", body: "Live video sessions with a small group of researchers. You discuss a product, ad campaign, or social issue. High pay, lower frequency — but when they come up, they're worth your time." },
    ],
    earnings: [
      { label: "Casual (5–10 surveys/week)", range: "UGX 90k – 200k", note: "/ month" },
      { label: "Active (daily tasks + testing)", range: "UGX 350k – 600k", note: "/ month" },
      { label: "Active + focus groups + team", range: "UGX 750k – 1.3M+", note: "/ month" },
    ],
    stories: [
      { name: "Grace A.", location: "Kampala", earned: "UGX 440,000 / month", story: "Filling research slots between regular schedules gives clear side income. Selecting localized studies yields fast clearing queues directly into Mobile Money channels.", img: "/testimonials/sylvia.jpg", fallback: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&h=200&fit=crop&crop=face&auto=format" },
      { name: "Derrick B.", location: "Gulu", earned: "UGX 820,000 / month", story: "Focusing heavily on UI application benchmarks pays best. Bringing clean, descriptive feedback checks out seamlessly.", img: "/testimonials/daniel.jpg", fallback: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face&auto=format" },
    ],
    appObjection: "Isn't this like those useless survey apps that pay almost nothing? Those apps exist, and they're a waste of time. What's different here: the tasks are sourced from actual market research firms and global brands with real budgets. The minimum survey payouts match standard commercial allocations. The infrastructure is built to bring quality work, not filler tasks.",
    qualifyObjection: "Qualification is based on your profile. Regional users aged 18–40 in urban centers qualify for the majority of available datasets. Completing your profile details properly ensures steady processing matching.",
  },
  ghana: {
    marketName: "Ghanaian consumer",
    marketDesc: "Ghana is a major focal consumer hub across West Africa. Global entities launching brands or tracking retail trends look to verified local feedback loops to evaluate product viability.",
    paymentMethod: "Mobile Money",
    currency: "GHS",
    minWithdrawal: "GHS 0",
    heroStats: [
      { v: "GHS 10+", l: "Per survey" },
      { v: "GHS 350+", l: "Focus groups" },
      { v: "Free", l: "To join" },
    ],
    taskTypes: [
      { icon: "📋", title: "Paid surveys", time: "5–20 min", pay: "GHS 10–40 each", body: "Answer structured questions from global brands. Topics range from consumer habits to political sentiment to product feedback. Your Ghanaian perspective is specifically what they're paying for." },
      { icon: "📦", title: "Product testing", time: "30–90 min", pay: "GHS 50–180 each", body: "You receive a product (physical or digital), use it, then fill in a detailed feedback form or record a short video review. Higher effort, significantly higher payout." },
      { icon: "💻", title: "Website & app testing", time: "15–45 min", pay: "GHS 35–100 each", body: "You're given a website or app and a set of tasks to complete while narrating your experience. Companies use this to find friction points before launch. Your honest confusion is valuable." },
      { icon: "🎙️", title: "Focus groups", time: "60–90 min", pay: "GHS 150–350 each", body: "Live video sessions with a small group of researchers. You discuss a product, ad campaign, or social issue. High pay, lower frequency — but when they come up, they're worth your time." },
    ],
    earnings: [
      { label: "Casual (5–10 surveys/week)", range: "GHS 350 – 800", note: "/ month" },
      { label: "Active (daily tasks + testing)", range: "GHS 1,400 – 2,500", note: "/ month" },
      { label: "Active + focus groups + team", range: "GHS 3,000 – 5,000+", note: "/ month" },
    ],
    stories: [
      { name: "Kofi O.", location: "Accra", earned: "GHS 1,850 / month", story: "Running consumer review tracks on my phone during down-times is highly reliable. The system is straightforward and fits into standard schedules seamlessly.", img: "/testimonials/sylvia.jpg", fallback: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&h=200&fit=crop&crop=face&auto=format" },
      { name: "Ama A.", location: "Kumasi", earned: "GHS 3,200 / month", story: "The application parameters pull accurate focus segments. Collecting clean, straightforward feedback parameters drops directly to Mobile Money fast.", img: "/testimonials/daniel.jpg", fallback: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face&auto=format" },
    ],
    appObjection: "Isn't this like those useless survey apps that pay tiny fractions? Those apps exist, and they're a waste of time. What's different here: the tasks are sourced from actual market research firms and global brands with real budgets. The minimum survey payouts follow structured industry tiers. The infrastructure is built to bring quality work, not filler tasks.",
    qualifyObjection: "Qualification is based on your profile. West African users aged 18–40 in metropolitan locations match standard consumer criteria. Complete your profile fields accurately to expand availability queues.",
  },
};

export default function SurveysClient({ countryTarget }: SurveysClientProps) {
  // Fallback to kenya if parameter mismatch occurs
  const config = REGIONAL_DATA[countryTarget] || REGIONAL_DATA.kenya;

  // Images for hero collage
  const surveyImage = "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=600&fit=crop&auto=format";
  const focusGroupImage = "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&h=600&fit=crop&auto=format";

  const HOW_IT_WORKS = [
    {
      step: "01",
      title: "Apply free",
      body: "Create your account in 2 minutes. No fees, no CV, no interview. Complete your profile to start getting matched to tasks."
    },
    {
      step: "02",
      title: "Get matched to tasks",
      body: "You're notified when a task you qualify for becomes available. First come, first served — most tasks have limited slots. Act fast."
    },
    {
      step: "03",
      title: "Complete the task honestly",
      body: "Quality checks flag inconsistent or rushed responses. Answer genuinely — your demographic data is why brands chose you."
    },
    {
      step: "04",
      title: `Get paid to ${config.paymentMethod}`,
      body: `Payment releases after your response passes quality review — usually within 24 hours. Withdraw to ${config.paymentMethod} with no minimum.`
    },
  ];

  const OBJECTIONS = [
    {
      q: "Isn't this like those useless survey apps that pay next to nothing?",
      a: config.appObjection,
    },
    {
      q: "How do I know I'll qualify for enough tasks?",
      a: config.qualifyObjection,
    },
    {
      q: "What if my response is rejected?",
      a: "Responses are flagged if they're too fast (rushing through), inconsistent (contradicting yourself), or off-topic. If you answer honestly and at a normal pace, rejection is rare. If a response is rejected, you're notified with the reason. It doesn't affect your account unless it becomes a pattern.",
    },
    {
      q: "Can I do surveys alongside other VelloEarn tracks?",
      a: "Yes. Surveys are the most stackable track — they're async, short, and don't require a shift or a session. Most members combine surveys with chatting or AI training. Surveys fill the gaps in your day.",
    },
    {
      q: "Is my personal data shared with brands?",
      a: "Your responses are shared in aggregated, anonymised form. Brands see consumer profiles matching location and demographics — not your name or number. For focus groups, you participate directly but under the platform's privacy framework. Your WhatsApp and personal contact details are never passed to brands.",
    },
  ];

  return (
    <main className="bg-gray-50 min-h-screen">

      {/* ── Hero ── */}
      <section className="relative pt-12 pb-16 sm:pt-16 sm:pb-20 overflow-hidden bg-gradient-to-br from-amber-50 via-white to-orange-50">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
            
            {/* Left - Content */}
            <div>
              <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-600 mb-6 sm:mb-8 transition">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                Back to VelloEarn
              </Link>

              <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-100 text-amber-600 text-xs font-bold px-3 py-1.5 rounded-full mb-6 uppercase tracking-wider">
                📋 Surveys & Research · Quick Start
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight tracking-tight mb-4">
                Global brands are paying <br />
                <span className="text-amber-500">for your opinion.</span>
              </h1>

              <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-4 max-w-lg">
                Every product you buy, every app you use, every ad you scroll past — someone researched whether you&apos;d respond to it. That research pays. And it specifically needs people like you: a real {config.marketName}, with real opinions.
              </p>

              <p className="text-sm sm:text-base text-gray-400 mb-8 max-w-lg">
                Free to join · No fees · Instant {config.paymentMethod} payouts · No experience needed
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-10">
                <a
                  href={VELLOEARN_REGISTER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold text-base px-8 py-4 rounded-full shadow-lg shadow-amber-200 transition-all hover:scale-105 active:scale-95 text-center"
                >
                  Start Earning — Free →
                </a>
                <Link
                  href="#how-it-works"
                  className="bg-white hover:bg-gray-50 text-gray-600 font-semibold text-base px-8 py-4 rounded-full border border-gray-200 shadow-sm transition-all hover:scale-105 active:scale-95 text-center"
                >
                  See how it works
                </Link>
              </div>

              <div className="flex gap-8">
                {config.heroStats.map(s => (
                  <div key={s.l}>
                    <div className="text-lg font-extrabold text-gray-900">{s.v}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Image Collage */}
            <div className="relative grid grid-cols-2 gap-3 mt-8 lg:mt-0">
              {/* Main Image - Surveys */}
              <Link
                href={VELLOEARN_REGISTER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="col-span-2 relative rounded-2xl overflow-hidden h-48 sm:h-56 shadow-xl group"
              >
                <Image
                  src={surveyImage}
                  alt="Person completing paid surveys on phone"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <p className="text-white font-bold text-sm group-hover:text-amber-300 transition-colors">📋 Paid surveys</p>
                  <p className="text-white/70 text-xs">KES 80–350 each · 5–20 minutes →</p>
                </div>
              </Link>

              {/* Bottom Left - Focus Groups */}
              <Link
                href={VELLOEARN_REGISTER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="relative rounded-2xl overflow-hidden h-40 shadow-xl group"
              >
                <Image
                  src={focusGroupImage}
                  alt="Focus group discussion"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                  <p className="text-white font-bold text-xs group-hover:text-amber-300 transition-colors">🎙️ Focus groups</p>
                  <p className="text-white/60 text-[10px]">KES 1,200–3,000 each →</p>
                </div>
              </Link>

              {/* Bottom Right - Stats Card */}
              <Link
                href={VELLOEARN_REGISTER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="relative rounded-2xl overflow-hidden h-40 bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-xl group hover:scale-105 transition-transform duration-300"
              >
                <div className="text-center text-white p-4">
                  <div className="text-3xl font-extrabold group-hover:scale-110 transition-transform duration-300">KES 80+</div>
                  <div className="text-sm text-amber-100">Per survey</div>
                  <div className="text-xs text-amber-200 mt-1 group-hover:text-white transition-colors">Start earning →</div>
                </div>
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ── Live Foreigners Learning Section ── */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <span className="text-amber-500 font-semibold text-sm uppercase tracking-wider">Live right now</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2 mb-3">
              Foreigners waiting to learn Swahili
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Real students from around the world are actively looking for teachers. Start earning today.
            </p>
          </div>
          <LiveForeignersLearning />
        </div>
      </section>

      {/* ── Task types ── */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-amber-500 font-semibold text-sm uppercase tracking-wider">What you'll do</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2 mb-4">Four types of research tasks. All pay real money.</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {config.taskTypes.map(t => (
              <div key={t.title} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-2xl">{t.icon}</span>
                  <div className="text-right">
                    <p className="text-xs text-gray-400">{t.time}</p>
                    <p className="text-xs font-bold text-amber-600">{t.pay}</p>
                  </div>
                </div>
                <h3 className="font-bold text-gray-900 text-base mb-2">{t.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{t.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 bg-amber-50 border border-amber-100 rounded-2xl p-6 flex gap-4 items-start">
            <span className="text-2xl shrink-0">🎯</span>
            <div>
              <p className="font-bold text-gray-900 mb-1">Your {config.marketName} profile is in high demand</p>
              <p className="text-sm text-gray-600 leading-relaxed">{config.marketDesc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section id="how-it-works" className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="text-amber-500 font-semibold text-sm uppercase tracking-wider">How it works</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2">From sign-up to {config.paymentMethod}.</h2>
            <p className="text-gray-500 mt-2">Free to join. Start earning today.</p>
          </div>
          <div className="space-y-5">
            {HOW_IT_WORKS.map((step, i) => (
              <div key={i} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 shadow-sm flex gap-5 items-start hover:border-amber-200 transition-colors">
                <div className="shrink-0 w-12 h-12 rounded-2xl bg-amber-500 text-white font-extrabold text-sm flex items-center justify-center">
                  {step.step}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-base mb-1">{step.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <a
              href={VELLOEARN_REGISTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-bold text-base px-10 py-4 rounded-full shadow-lg shadow-amber-200 transition-all hover:scale-105 active:scale-95"
            >
              Start Earning — Free →
            </a>
          </div>
        </div>
      </section>

      {/* ── Earning potential ── */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-amber-500 font-semibold text-sm uppercase tracking-wider">Earning potential</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2 mb-3">Stack surveys. Stack income.</h2>
            <p className="text-gray-500">Real earnings from real members. What you make depends on how many tasks you complete.</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {config.earnings.map((tier, i) => (
              <div key={i} className={`rounded-2xl p-6 border text-center ${i === 2 ? "bg-amber-500 border-amber-400 text-white shadow-xl shadow-amber-200" : "bg-white border-gray-100"}`}>
                <p className={`text-xs font-semibold uppercase tracking-wider mb-3 ${i === 2 ? "text-amber-100" : "text-gray-400"}`}>{tier.label}</p>
                <p className={`text-2xl font-extrabold mb-1 ${i === 2 ? "text-white" : "text-gray-900"}`}>{tier.range}</p>
                <p className={`text-xs ${i === 2 ? "text-amber-100" : "text-gray-400"}`}>{tier.note}</p>
                {i === 2 && <p className="text-xs text-amber-100 mt-2">🏆 Top earners combine methods</p>}
              </div>
            ))}
          </div>

          <h3 className="text-xl font-extrabold text-gray-900 mb-5 mt-14">From people already doing it</h3>
          <div className="grid sm:grid-cols-2 gap-5">
            {config.stories.map(s => (
              <div key={s.name} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative w-11 h-11 rounded-full overflow-hidden bg-amber-100 shrink-0">
                    <SmartImage src={s.img} fallback={s.fallback} alt={s.name} fill className="object-cover" sizes="44px" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 text-sm">{s.name}</p>
                    <p className="text-xs text-gray-400">{s.location}</p>
                  </div>
                  <span className="text-sm font-bold text-emerald-600 shrink-0">{s.earned}</span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed italic">&ldquo;{s.story}&rdquo;</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Objections ── */}
      <section className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-amber-500 font-semibold text-sm uppercase tracking-wider">Real talk</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2 mb-3">The questions you&apos;re already thinking</h2>
          </div>
          <div className="space-y-4">
            {OBJECTIONS.map((o, i) => <ObjAccordion key={i} q={o.q} a={o.a} />)}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA - Irresistible Offer ── */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-orange-600" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full translate-x-1/3 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/10 rounded-full -translate-x-1/3 translate-y-1/3 pointer-events-none" />
        
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white text-sm font-semibold px-4 py-2 rounded-full mb-6">
            📋 Join 5,000+ survey takers
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
            Your opinion is worth <br />
            <span className="text-amber-200">real money.</span>
          </h2>
          
          <p className="text-amber-100 text-lg mb-8 max-w-xl mx-auto">
            Free to join. Complete surveys, test products, join focus groups. 
            No experience needed. Get paid instantly to {config.paymentMethod}.
          </p>

          <div className="flex flex-wrap justify-center gap-6 mb-8 text-white/80 text-sm">
            <span>✅ Free to join</span>
            <span>💸 No fees ever</span>
            <span>📱 Complete from your phone</span>
            <span>⚡ Instant {config.paymentMethod} payouts</span>
          </div>

          <a
            href={VELLOEARN_REGISTER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-amber-600 hover:bg-amber-50 font-extrabold text-xl px-12 py-5 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all"
          >
            Start Earning — Free →
          </a>
          
          <p className="text-amber-200/70 text-sm mt-4">
            No credit card · No payment required · Start earning instantly
          </p>
        </div>
      </section>

    </main>
  );
}