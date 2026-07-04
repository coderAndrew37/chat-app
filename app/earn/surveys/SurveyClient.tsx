"use client";

import { ApplicationModal, SuccessState } from "@/app/components";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

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
    minWithdrawal: "KES 500",
    heroStats: [
      { v: "KES 80+", l: "Per survey" },
      { v: "KES 3,000+", l: "Focus groups" },
      { v: "No shifts", l: "Fully async" },
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
    paymentMethod: "Mobile Money (MTN / Airtel)",
    currency: "UGX",
    minWithdrawal: "UGX 15,000",
    heroStats: [
      { v: "UGX 2,500+", l: "Per survey" },
      { v: "UGX 90,000+", l: "Focus groups" },
      { v: "No shifts", l: "Fully async" },
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
    paymentMethod: "Mobile Money (MTN / Telecel)",
    currency: "GHS",
    minWithdrawal: "GHS 50",
    heroStats: [
      { v: "GHS 10+", l: "Per survey" },
      { v: "GHS 350+", l: "Focus groups" },
      { v: "No shifts", l: "Fully async" },
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
  const [modalOpen, setModalOpen] = useState(false);
  const [successData, setSuccessData] = useState<{ name: string; whatsapp: string } | null>(null);

  // Fallback to kenya if parameter mismatch occurs
  const config = REGIONAL_DATA[countryTarget] || REGIONAL_DATA.kenya;

  const handleSuccess = (data: { name: string; whatsapp: string }) => {
    setModalOpen(false);
    setSuccessData(data);
  };

  const HOW_IT_WORKS = [
    {
      step: "01",
      title: "Apply and set up your profile",
      body: "Your profile captures your demographics — age, location, income bracket, education, consumer habits. This determines which surveys and studies you qualify for. More complete profile = more tasks.",
    },
    {
      step: "02",
      title: "Get matched to tasks",
      body: "You're notified when a task you qualify for becomes available. First come, first served — most tasks have limited slots. So acting fast matters.",
    },
    {
      step: "03",
      title: "Complete the task honestly",
      body: "Quality checks flag inconsistent or rushed responses. Answer genuinely — your demographic data is why brands chose you. Honest answers protect your account standing.",
    },
    {
      step: "04",
      title: `Get paid to ${config.paymentMethod}`,
      body: `Payment releases after your response passes quality review — usually within 24 hours for surveys, 48–72 hours for more complex tasks. Minimum withdrawal: ${config.minWithdrawal}.`,
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
      <section className="relative pt-24 pb-20 overflow-hidden bg-gradient-to-br from-amber-50 via-white to-orange-50">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-600 mb-8 transition">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                Back to VelloEarn
              </Link>
              <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-100 text-amber-600 text-xs font-bold px-3 py-1.5 rounded-full mb-6 uppercase tracking-wider">
                📋 Surveys & Research
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight tracking-tight mb-5">
                Global brands are paying<br />
                <span className="text-amber-500">for your opinion.</span>
              </h1>
              <p className="text-lg text-gray-500 leading-relaxed mb-8 max-w-lg">
                Every product you buy, every app you use, every ad you scroll past — someone researched whether you&apos;d respond to it. That research pays. And it specifically needs people like you: a real {config.marketName}, with real opinions, in a market that&apos;s growing fast.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setModalOpen(true)}
                  className="bg-amber-500 hover:bg-amber-600 text-white font-bold text-base px-8 py-4 rounded-full shadow-lg shadow-amber-200 transition-all hover:scale-105 active:scale-95"
                >
                  Apply for This Track →
                </button>
              </div>
              <div className="mt-10 flex gap-8">
                {config.heroStats.map(s => (
                  <div key={s.l}>
                    <div className="text-lg font-extrabold text-gray-900">{s.v}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative hidden lg:block h-[420px] rounded-3xl overflow-hidden shadow-2xl">
              <SmartImage
                src="/earn/surveys.jpg"
                fallback="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=840&fit=crop&auto=format"
                alt="Person completing a survey on phone"
                fill priority className="object-cover" sizes="45vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-3">
                <p className="text-xs text-gray-400 mb-1">Quick start track</p>
                <p className="text-sm font-bold text-gray-900">No experience needed — your honest opinion is enough</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Task types ── */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-amber-500 font-semibold text-sm uppercase tracking-wider">What you&apos;ll do</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2 mb-4">Four types of research tasks. All pay real money.</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5 mb-10">
            {config.taskTypes.map(t => (
              <div key={t.title} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
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
          <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6 flex gap-4 items-start">
            <span className="text-2xl shrink-0">🎯</span>
            <div>
              <p className="font-bold text-gray-900 mb-1">Your {config.marketName} profile is in high demand</p>
              <p className="text-sm text-gray-600 leading-relaxed">{config.marketDesc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="text-amber-500 font-semibold text-sm uppercase tracking-wider">How it works</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2">From sign-up to {config.paymentMethod}.</h2>
          </div>
          <div className="space-y-5">
            {HOW_IT_WORKS.map((step, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex gap-5 items-start">
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
        </div>
      </section>

      {/* ── Earning potential ── */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-amber-500 font-semibold text-sm uppercase tracking-wider">Earning potential</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2 mb-3">Stack surveys. Stack income.</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-4 mb-14">
            {config.earnings.map((tier, i) => (
              <div key={i} className={`rounded-2xl p-6 border text-center ${i === 2 ? "bg-amber-500 border-amber-400 text-white" : "bg-gray-50 border-gray-100"}`}>
                <p className={`text-xs font-semibold uppercase tracking-wider mb-3 ${i === 2 ? "text-amber-100" : "text-gray-400"}`}>{tier.label}</p>
                <p className={`text-2xl font-extrabold mb-1 ${i === 2 ? "text-white" : "text-gray-900"}`}>{tier.range}</p>
                <p className={`text-xs ${i === 2 ? "text-amber-100" : "text-gray-400"}`}>{tier.note}</p>
              </div>
            ))}
          </div>

          <h3 className="text-xl font-extrabold text-gray-900 mb-5">From people already doing it</h3>
          <div className="grid sm:grid-cols-2 gap-5">
            {config.stories.map(s => (
              <div key={s.name} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
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
      <section className="py-20 bg-gray-50">
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

      {/* ── CTA ── */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0">
          <SmartImage src="/cta/background.jpg" fallback="https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1600&h=600&fit=crop&auto=format"
            alt="background" fill className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/90 to-orange-600/90" />
        </div>
        <div className="relative z-10 max-w-xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">Your opinion is worth money. Claim it.</h2>
          <p className="text-amber-100 mb-8 leading-relaxed">Apply now. Complete your profile. Get matched to your first task within 48 hours.</p>
          <button onClick={() => setModalOpen(true)}
            className="inline-block bg-white text-amber-600 font-bold text-base px-10 py-4 rounded-full shadow-xl hover:scale-105 active:scale-95 transition-all">
            Apply for Surveys & Research →
          </button>
        </div>
      </section>

      {modalOpen && (
        <ApplicationModal 
          onClose={() => setModalOpen(false)} 
          track="Surveys & Research" 
        />
      )}

      {successData && (
        <SuccessState 
          data={successData} 
          onClose={() => setSuccessData(null)} 
        />
      )}
    </main>
  );
}