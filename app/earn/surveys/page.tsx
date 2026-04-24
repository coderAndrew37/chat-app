"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ApplicationModal } from "@/app/components";

function SmartImage({ src, fallback, alt, fill, width, height, className, sizes, priority }: {
  src: string; fallback: string; alt: string; fill?: boolean; width?: number; height?: number;
  className?: string; sizes?: string; priority?: boolean;
}) {
  const [imgSrc, setImgSrc] = useState(src);
  const props = { src: imgSrc, alt, className, onError: () => setImgSrc(fallback), sizes, priority };
  return fill ? <Image {...props} fill unoptimized /> : <Image {...props} width={width ?? 400} height={height ?? 300} unoptimized />;
}

function ObjAccordion({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-5 py-4 text-left">
        <span className="font-semibold text-gray-900 text-sm sm:text-base pr-4">{q}</span>
        <span className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 ${open ? "bg-amber-500 text-white rotate-45" : "bg-gray-100 text-gray-500"}`}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
        </span>
      </button>
      {open && <div className="px-5 pb-5"><p className="text-gray-500 text-sm leading-relaxed">{a}</p></div>}
    </div>
  );
}

const TASK_TYPES = [
  {
    icon: "📋",
    title: "Paid surveys",
    time: "5–20 min",
    pay: "KES 80–350 each",
    body: "Answer structured questions from global brands. Topics range from consumer habits to political sentiment to product feedback. Your Kenyan perspective is specifically what they're paying for.",
  },
  {
    icon: "📦",
    title: "Product testing",
    time: "30–90 min",
    pay: "KES 400–1,500 each",
    body: "You receive a product (physical or digital), use it, then fill in a detailed feedback form or record a short video review. Higher effort, significantly higher payout.",
  },
  {
    icon: "💻",
    title: "Website & app testing",
    time: "15–45 min",
    pay: "KES 300–800 each",
    body: "You're given a website or app and a set of tasks to complete while narrating your experience. Companies use this to find friction points before launch. Your honest confusion is valuable.",
  },
  {
    icon: "🎙️",
    title: "Focus groups",
    time: "60–90 min",
    pay: "KES 1,200–3,000 each",
    body: "Live video sessions with a small group of researchers. You discuss a product, ad campaign, or social issue. High pay, lower frequency — but when they come up, they're worth your time.",
  },
];

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
    title: "Get paid to M-Pesa",
    body: "Payment releases after your response passes quality review — usually within 24 hours for surveys, 48–72 hours for more complex tasks. Minimum withdrawal: KES 500.",
  },
];

const EARNINGS = [
  { label: "Casual (5–10 surveys/week)", range: "KES 3,000 – 7,000", note: "/ month" },
  { label: "Active (daily tasks + testing)", range: "KES 12,000 – 20,000", note: "/ month" },
  { label: "Active + focus groups + team", range: "KES 25,000 – 45,000+", note: "/ month" },
];

const EARNER_STORIES = [
  {
    name: "Sylvia K.",
    location: "Nairobi, Karen",
    earned: "KES 14,800 / month",
    story: "I do surveys while watching TV in the evening. It's the most painless income I've ever made. I only do tasks that take under 20 minutes — I just stack them up across the week.",
    img: "/testimonials/sylvia.jpg",
    fallback: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&h=200&fit=crop&crop=face&auto=format",
  },
  {
    name: "Daniel M.",
    location: "Eldoret",
    earned: "KES 29,000 / month",
    story: "I prioritise the product testing and focus groups — they pay the most per hour. I treat it like a part-time job. When a focus group drops, I clear my schedule and show up. KES 2,500 for 90 minutes is not something I pass on.",
    img: "/testimonials/daniel.jpg",
    fallback: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face&auto=format",
  },
];

const OBJECTIONS = [
  {
    q: "Isn't this like those useless survey apps that pay KES 5?",
    a: "Those apps exist, and they're a waste of time. What's different here: the tasks are sourced from actual market research firms and global brands with real budgets. The minimum survey payout on our platform is KES 80 — and most pay more. Product tests and focus groups pay multiples of that. The infrastructure is built to bring quality work, not filler tasks.",
  },
  {
    q: "How do I know I'll qualify for enough tasks?",
    a: "Qualification is based on your profile. Kenyans aged 18–40 in urban areas qualify for the majority of our available tasks — that's the demographic global brands want. The more complete your profile (education, income, device usage, shopping habits), the wider your task eligibility. New tasks are added weekly.",
  },
  {
    q: "What if my response is rejected?",
    a: "Responses are flagged if they're too fast (rushing through), inconsistent (contradicting yourself), or off-topic. If you answer honestly and at a normal pace, rejection is rare. If a response is rejected, you're notified with the reason. It doesn't affect your account unless it becomes a pattern.",
  },
  {
    q: "Can I do surveys alongside other Chat254 tracks?",
    a: "Yes. Surveys are the most stackable track — they're async, short, and don't require a shift or a session. Most members combine surveys with chatting or AI training. Surveys fill the gaps in your day.",
  },
  {
    q: "Is my personal data shared with brands?",
    a: "Your responses are shared in aggregated, anonymised form. Brands see 'Kenyan female, 25–34, urban, mid-income consumer' — not your name or number. For focus groups, you participate directly but under the platform's privacy framework. Your WhatsApp and personal contact details are never passed to brands.",
  },
];

export default function SurveysPage() {
  const [modalOpen, setModalOpen] = useState(false);

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
                Back to Chat254
              </Link>
              <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-100 text-amber-600 text-xs font-bold px-3 py-1.5 rounded-full mb-6 uppercase tracking-wider">
                📋 Surveys & Research
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight tracking-tight mb-5">
                Global brands are paying<br />
                <span className="text-amber-500">for your opinion.</span>
              </h1>
              <p className="text-lg text-gray-500 leading-relaxed mb-8 max-w-lg">
                Every product you buy, every app you use, every ad you scroll past — someone researched whether you&apos;d respond to it. That research pays. And it specifically needs people like you: a real Kenyan consumer, with real opinions, in a market that&apos;s growing fast.
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
                {[
                  { v: "KES 80+", l: "Per survey" },
                  { v: "KES 3,000+", l: "Focus groups" },
                  { v: "No shifts", l: "Fully async" },
                ].map(s => (
                  <div key={s.l}>
                    <div className="text-lg font-extrabold text-gray-900">{s.v}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero image */}
            <div className="relative hidden lg:block h-[420px] rounded-3xl overflow-hidden shadow-2xl">
              <SmartImage
                src="/earn/surveys-hero.jpg"
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
            {TASK_TYPES.map(t => (
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
              <p className="font-bold text-gray-900 mb-1">Your Kenyan consumer profile is in high demand</p>
              <p className="text-sm text-gray-600 leading-relaxed">Kenya is one of the fastest-growing consumer markets in Africa. International brands launching here, or studying African market behaviour, specifically need Kenyan respondents. Your age, location, spending habits, and digital behaviour make you a sought-after research participant — not just another survey taker.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="text-amber-500 font-semibold text-sm uppercase tracking-wider">How it works</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2">From sign-up to M-Pesa.</h2>
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
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2 mb-3">Stack surveys. Stack focus groups. Stack income.</h2>
            <p className="text-gray-500 max-w-xl mx-auto">The more task types you qualify for, the higher your monthly total. Focus groups alone can add KES 10,000+ in a single good month.</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-4 mb-14">
            {EARNINGS.map((tier, i) => (
              <div key={i} className={`rounded-2xl p-6 border text-center ${i === 2 ? "bg-amber-500 border-amber-400 text-white" : "bg-gray-50 border-gray-100"}`}>
                <p className={`text-xs font-semibold uppercase tracking-wider mb-3 ${i === 2 ? "text-amber-100" : "text-gray-400"}`}>{tier.label}</p>
                <p className={`text-2xl font-extrabold mb-1 ${i === 2 ? "text-white" : "text-gray-900"}`}>{tier.range}</p>
                <p className={`text-xs ${i === 2 ? "text-amber-100" : "text-gray-400"}`}>{tier.note}</p>
                {i === 2 && <p className="text-xs text-amber-100 mt-2">Includes team commission income</p>}
              </div>
            ))}
          </div>

          {/* Earner stories */}
          <h3 className="text-xl font-extrabold text-gray-900 mb-5">From people already doing it</h3>
          <div className="grid sm:grid-cols-2 gap-5">
            {EARNER_STORIES.map(s => (
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

      {/* WhatsApp FAB */}
      <a href="https://wa.me/254700000000?text=Hi%2C%20I%27d%20like%20to%20apply%20for%20surveys%20and%20research%20on%20Chat254."
        target="_blank" rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110"
        aria-label="Chat on WhatsApp">
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
      </a>

      {modalOpen && <ApplicationModal onClose={() => setModalOpen(false)} track="Surveys & Research" />}
    </main>
  );
}