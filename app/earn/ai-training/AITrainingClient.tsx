"use client";

import { TESTIMONIALS } from "@/app/components/LandingInteractive";
import Requirements from "@/app/components/Requirements";
import TestimonialSlider from "@/app/components/TestimonialSlider";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import EarnerStoriesCarousel from "@/app/components/EarnerStoriesGrid";
import LiveAITraining from "@/app/components/LiveAITraining";

const VELLOEARN_REGISTER_URL = "https://starhela.com/register?ref=velloearn";

// --- Sub-components ---



function ObjAccordion({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-5 py-4 text-left transition-colors hover:bg-gray-50">
        <span className="font-semibold text-gray-900 text-sm sm:text-base pr-4">{q}</span>
        <span className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 ${open ? "bg-violet-500 text-white rotate-45" : "bg-gray-100 text-gray-500"}`}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
        </span>
      </button>
      {open && <div className="px-5 pb-5 animate-in fade-in slide-in-from-top-1 duration-200"><p className="text-gray-500 text-sm leading-relaxed">{a}</p></div>}
    </div>
  );
}

function CountrySelector({ active }: { active: "kenya" | "uganda" | "ghana" }) {
  const options: { key: "kenya" | "uganda" | "ghana"; label: string }[] = [
    { key: "kenya", label: "🇰🇪 Kenya" },
    { key: "uganda", label: "🇺🇬 Uganda" },
    { key: "ghana", label: "🇬🇭 Ghana" },
  ];
  return (
    <div className="flex justify-center gap-2 mb-10 flex-wrap">
      {options.map((o) => (
        <Link
          key={o.key}
          href={`/earn/ai-training?country=${o.key}`}
          className={`px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${
            active === o.key
              ? "bg-violet-500 border-violet-500 text-white"
              : "bg-white border-gray-200 text-gray-500 hover:border-violet-300 hover:text-violet-600"
          }`}
        >
          {o.label} Earnings
        </Link>
      ))}
    </div>
  );
}

// --- Multi-Country Dynamic Localization Matrix ---

export interface ObjectionItem {
  q: string;
  a: string;
}

interface WorkStep {
  title: string;
  body: string;
}

interface LocalizationConfig {
  countryName: string;
  currency: string;
  payoutMethods: string;
  rateRange: string;
  dialectNote: string;
  tasksSectionNote: string;
  networkProviders: string;
  universities: string;
  legitimacyNote: string;
  payoutRailsDetail: string;
  heroSubText: string;
  finalCtaSubText: string;
  finalCtaButtonLabel: string;
  howItWorks: WorkStep[];
  earningsTiers: { label: string; range: string; note: string }[];
  stories: { name: string; location: string; earned: string; story: string; image: { actualImage?: string; fallback: string } }[];
  objections: ObjectionItem[];
  activeJobs: { title: string; company: string; rate: string; type: string; urgency: string }[];
}

export const LOCALIZATION_DATA: Record<string, LocalizationConfig> = {
  kenya: {
    countryName: "Kenya",
    currency: "KES",
    payoutMethods: "M-Pesa",
    rateRange: "KES 80–400",
    dialectNote: "Your Swahili, your slang, your clarity.",
    tasksSectionNote: "Your real responses help train it to understand how Kenyans talk natively.",
    networkProviders: "Safaricom, Airtel, or Telkom",
    universities: "University of Nairobi (UoN) or JKUAT",
    heroSubText: "Free to join · No fees · Instant M-Pesa payouts · No experience needed",
    finalCtaSubText: "Free to join · No fees · Start earning today",
    finalCtaButtonLabel: "Start Training — Free →",
    legitimacyNote: "Kenya's fast-growing digital economy and high English proficiency make Kenyan contributors prime candidates for training global AI models. All you need is a stable internet connection (Safaricom, Airtel, or Telkom) and a modern browser — no coding or technical background required.",
    payoutRailsDetail: "M-Pesa alongside standard bank transfers, converting cleanly into KES with minimal transaction friction",
    howItWorks: [
      { title: "1. Apply free", body: "Fill in your name and WhatsApp number. No fees, no CV, no interview. Your account is active immediately." },
      { title: "2. Complete paid training", body: "Before real tasks, you go through a short guided training module — usually under an hour — that walks through how rating, rewriting, and labelling work. This training itself is compensated." },
      { title: "3. Start real micro-tasks", body: "You move into the live task queue: rating AI answers, rewriting weak ones, labelling content, or chatting with a model to probe its responses. Each task takes a few minutes and can be done from a smartphone or laptop." },
      { title: "4. Quality review", body: "A sample of your work is periodically checked against quality guidelines. If your ratings drift, you get specific feedback to recalibrate — it's a learning loop, not a one-strike system." },
      { title: "5. Withdraw to M-Pesa", body: "Once your balance clears, you cash out directly to M-Pesa. No waiting for a monthly payroll cycle — withdrawals process on your schedule." },
    ],
    earningsTiers: [
      { label: "Casual (5–10 tasks/day)", range: "KES 4,000 – 9,000", note: "/ month" },
      { label: "Active (20–30 tasks/day)", range: "KES 14,000 – 22,000", note: "/ month" },
      { label: "Active + team commissions", range: "KES 28,000 – 50,000+", note: "/ month" },
    ],
    stories: [
      {
        name: "Patricia N.",
        location: "Nairobi, Githurai",
        earned: "KES 17,200 / month",
        story: "I do this during my lunch break and late evenings. It doesn't feel like work — I'm just reading things and typing what I think. The money is real though.",
        image: { actualImage: "/testimonials/patricia.jpg", fallback: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=face&auto=format" }
      },
      {
        name: "Moses A.",
        location: "Mombasa",
        earned: "KES 31,500 / month",
        story: "I treat it like a second job. I block two hours every morning — no distractions. After three months I brought my cousin in. Her output adds to my team income now.",
        image: { actualImage: "/testimonials/moses.jpg", fallback: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face&auto=format" }
      },
    ],
    objections: [
      {
        q: "Is AI data annotation available in Kenya?",
        a: "Yes — 100% available across Nairobi, Mombasa, Kisumu, and every county in between. No VPN is required to access the platform, and there are no recurring registration or subscription charges."
      },
      {
        q: "How do data annotation jobs work from home in Kenya?",
        a: "It's completely remote and flexible enough to fit around university classes (UoN, JKUAT) or other freelance work. You can complete tasks from a laptop or smartphone, and the platform includes low-data modes so it stays usable on Safaricom, Airtel, or Telkom networks."
      },
      {
        q: "Are these paid training jobs, and how do I get paid in Kenyan Shillings (KES)?",
        a: "Yes — the foundational training itself is compensated. Once you're onboarded, earnings withdraw instantly to your M-Pesa wallet in Kenyan Shillings (KES)."
      },
      {
        q: "This sounds too good to be true — how do I know it's not a scam?",
        a: "Fair question, and worth asking of any online earning platform. We publish real payout amounts, keep everything free and clearly stated upfront, and our task structure matches how legitimate global AI companies actually source human feedback — through verified micro-task platforms, not personal data requests or upfront investment schemes."
      },
      {
        q: "Do I need a degree or prior tech experience?",
        a: "No. You need to read carefully, think clearly, and write in plain English. Most contributors have no AI or programming background at all — your everyday judgment is the actual skill being used."
      },
      {
        q: "Can I do this alongside school or a full-time job?",
        a: "Yes. There's no fixed shift schedule — tasks stay in the queue and you complete them whenever you have time, whether that's 30 minutes between lectures or a couple of hours in the evening."
      },
    ],
    activeJobs: [
      { title: "AI Response Rating - English", company: "Global Tech Corp", rate: "KES 120/task", type: "Remote", urgency: "Urgent" },
      { title: "Data Labeling - Image Classification", company: "AI Research Lab", rate: "KES 150/task", type: "Remote", urgency: "High demand" },
      { title: "Chatbot Conversation Training", company: "Tech Startup", rate: "KES 100/task", type: "Remote", urgency: "New" },
      { title: "Swahili Text Rewriting", company: "Language AI", rate: "KES 200/task", type: "Remote", urgency: "Premium" },
      { title: "Content Moderation - AI Training", company: "Social Platform", rate: "KES 90/task", type: "Remote", urgency: "Consistent" },
      { title: "Academic Text Verification", company: "EdTech", rate: "KES 180/task", type: "Remote", urgency: "Skilled" },
    ]
  },
  uganda: {
    countryName: "Uganda",
    currency: "UGX",
    payoutMethods: "MTN and Airtel Mobile Money",
    rateRange: "UGX 2,500–12,000",
    dialectNote: "Your local phrasing, your context, your clarity.",
    tasksSectionNote: "Your real responses help train it to understand localized phrases used across Uganda.",
    networkProviders: "MTN or Airtel",
    universities: "Makerere University or MUBS",
    heroSubText: "Free to join · No fees · Instant Mobile Money payouts · No experience needed",
    finalCtaSubText: "Free to join · No fees · Start earning today",
    finalCtaButtonLabel: "Start Training — Free →",
    legitimacyNote: "Uganda's expanding digital transformation and strong English-language education make Ugandan contributors well-positioned to train AI models. All that's required is a reliable internet connection (MTN or Airtel) and a standard browser — no technical background needed.",
    payoutRailsDetail: "MTN Mobile Money and Airtel Money alongside standard bank transfers, converting cleanly into UGX with minimal transaction friction",
    howItWorks: [
      { title: "1. Apply free", body: "Submit your name and WhatsApp number. No fees, no CV, no interview. Your account is active immediately." },
      { title: "2. Complete paid training", body: "A short guided module — usually under an hour — walks through rating, rewriting, and labelling before you touch live tasks. This training is compensated." },
      { title: "3. Start real micro-tasks", body: "You move into the live queue: rating AI answers, rewriting weak ones, labelling content, or chatting with a model to test its responses. Each task takes minutes and works on smartphone or laptop." },
      { title: "4. Quality review", body: "A sample of your work is periodically checked. If your ratings drift from the guidelines, you get specific feedback to recalibrate — it's a learning loop, not a one-strike system." },
      { title: "5. Withdraw to Mobile Money", body: "Once your balance clears, cash out directly to MTN Mobile Money or Airtel Money on your own schedule, not a fixed monthly payroll date." },
    ],
    earningsTiers: [
      { label: "Casual (5–10 tasks/day)", range: "UGX 120,000 – 270,000", note: "/ month" },
      { label: "Active (20–30 tasks/day)", range: "UGX 420,000 – 660,000", note: "/ month" },
      { label: "Active + team commissions", range: "UGX 840,000 – 1,500,000+", note: "/ month" },
    ],
    stories: [
      {
        name: "Brian O.",
        location: "Kampala, Wandegeya",
        earned: "UGX 510,000 / month",
        story: "Between lectures, I log in from my phone and label data. Getting paid via Mobile Money makes it easy to handle minor expenses without relying on parents.",
        image: { fallback: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face&auto=format" }
      }
    ],
    objections: [
      {
        q: "Is AI data annotation available in Uganda?",
        a: "Yes — fully available across Kampala, Mbarara, Gulu, and the rest of the country. No VPN is needed to use the platform, and there are no recurring registration charges."
      },
      {
        q: "How do data annotation jobs work from home in Uganda?",
        a: "The work is entirely remote and flexible around lectures at Makerere or MUBS, or alongside other freelance commitments. Tasks run on laptop or smartphone, with low-data modes built in for MTN and Airtel networks."
      },
      {
        q: "Are these paid training jobs, and how do I get paid in Ugandan Shillings (UGX)?",
        a: "Yes, the initial training itself is paid. Earnings withdraw instantly to MTN Mobile Money or Airtel Money in Ugandan Shillings (UGX)."
      },
      {
        q: "This sounds too good to be true — how do I know it's not a scam?",
        a: "A fair question for any online earning platform. We keep everything free and clearly stated upfront, publish real payout figures, and structure tasks the way legitimate global AI companies actually source human feedback — through verified micro-task work, not personal data requests or investment schemes."
      },
      {
        q: "Do I need a degree or prior tech experience?",
        a: "No. You need to read carefully and respond in clear English. Most contributors have no programming or AI background — your everyday judgment is the skill being used."
      },
      {
        q: "Can I do this alongside school or a full-time job?",
        a: "Yes. There's no fixed shift schedule — tasks sit in the queue and you complete them whenever you have time, whether that's between lectures or in the evening."
      },
    ],
    activeJobs: [
      { title: "AI Response Rating - English", company: "Global Tech Corp", rate: "UGX 3,500/task", type: "Remote", urgency: "Urgent" },
      { title: "Data Labeling - Image Classification", company: "AI Research Lab", rate: "UGX 4,500/task", type: "Remote", urgency: "High demand" },
      { title: "Luganda Text Rewriting", company: "Language AI", rate: "UGX 6,000/task", type: "Remote", urgency: "Premium" },
      { title: "Content Moderation - AI Training", company: "Social Platform", rate: "UGX 2,500/task", type: "Remote", urgency: "Consistent" },
    ]
  },
  ghana: {
    countryName: "Ghana",
    currency: "GHS",
    payoutMethods: "MTN Mobile Money & Telecel Cash",
    rateRange: "GHS 10–50",
    dialectNote: "Your local expressions, your context, your clarity.",
    tasksSectionNote: "Your inputs train artificial intelligence layers to accurately process West African English and localized structural terms.",
    networkProviders: "MTN, Telecel, or AT",
    universities: "University of Ghana (UG Legon) or KNUST",
    heroSubText: "Free to join · No fees · Instant Mobile Money payouts · No experience needed",
    finalCtaSubText: "Free to join · No fees · Start earning today",
    finalCtaButtonLabel: "Start Training — Free →",
    legitimacyNote: "Ghana's exceptional digital transformation pace, reliable fintech infrastructure, and high English fluency make Ghanaian youth and university students the absolute premier candidates for training AI models. All you need to scale up is a secure smartphone or laptop, a reliable browser, and an active connection on local data bundles — with completely zero code knowledge needed.",
    payoutRailsDetail: "MTN Mobile Money (MoMo) and Telecel Cash (formerly Vodafone Cash) alongside direct local bank routing, translating securely into Ghana Cedis (GHS) with near-zero transaction friction",
    howItWorks: [
      { title: "1. Apply free", body: "Submit your name and WhatsApp number. No fees, no CV, no interview. Your account is active immediately." },
      { title: "2. Complete paid training", body: "Before you touch live systems, you walk through a guided online training module (takes under an hour) explaining how text rating and content labelling operate. This training phase is fully compensated." },
      { title: "3. Start real micro-tasks", body: "Gain immediate access to the live task matrix: scoring AI text accuracy, rewriting unnatural outputs, or stress-testing layout boundaries. Each task takes just 2 to 5 minutes right from a phone or PC." },
      { title: "4. Quality review", body: "A random selection of data points is evaluated against global quality scripts. If answers drift, you get transparent dashboard hints to realign your tracking — it's built as an engineering learning loop." },
      { title: "5. Withdraw instantly to Mobile Money", body: "The moment your verified milestone clears, cash out your earnings directly to your MTN MoMo or Telecel Cash wallet. You completely control your payroll timing." },
    ],
    earningsTiers: [
      { label: "Casual (5–10 tasks/day)", range: "GHS 500 – 1,100", note: "/ month" },
      { label: "Active (20–30 tasks/day)", range: "GHS 1,800 – 2,800", note: "/ month" },
      { label: "Active + team commissions", range: "GHS 3,500 – 6,000+", note: "/ month" },
    ],
    stories: [
      {
        name: "Kwame A.",
        location: "Accra, Madina",
        earned: "GHS 2,200 / month",
        story: "The data annotation platform delivers a highly consistent micro-task queue. I log on after classes to handle text grading. The payouts land directly in my mobile money wallet instantly.",
        image: { fallback: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face&auto=format" }
      }
    ],
    objections: [
      {
        q: "Is AI data annotation available in Ghana?",
        a: "Yes — data annotation jobs are 100% available and operational across Accra, Kumasi, Tamale, Cape Coast, and all regions in Ghana. No VPN is required to access your work panel, and there are absolutely zero hidden recurring costs or platform registration fees."
      },
      {
        q: "How do data annotation jobs work from home in Ghana?",
        a: "These online jobs are engineered to work completely from home or campus, offering flexible hours ideal for students at UG Legon, KNUST, or tech freelancers. Every segment functions perfectly on both a smartphone or laptop, equipped with custom low-data optimization modes to conserve your MTN or Telecel bundles."
      },
      {
        q: "Are these paid training jobs, and how do I get paid in Ghana Cedis (GHS)?",
        a: "Yes — these are legitimate paid training jobs where your onboarding hours are fully compensated. Once tasks clear our quality parameters, you withdraw earnings directly to MTN Mobile Money (MoMo) or Telecel Cash in Ghana Cedis (GHS / ₵)."
      },
      {
        q: "This sounds too good to be true — how do I know it's not a scam?",
        a: "That is an essential question to ask given the volume of fake online jobs in Ghana. We establish complete trust by keeping everything free and transparent. We explicitly display real earner data, and our structure exactly matches how global platforms source distributed human review—relying on tangible micro-tasks, never tracking your private keys or demanding weird investment multi-level tiers."
      },
      {
        q: "Do I need a degree or prior tech experience?",
        a: "No degree or professional software experience is needed. The core skill is high context comprehension and writing clear English responses. Most active users across Ghana have zero engineering background."
      },
      {
        q: "Can I do this alongside school or a full-time job?",
        a: "Absolutely. There are no mandatory shifts or strict clock-ins. The micro-task queue runs 24/7, meaning you can knock out tasks between lectures at KNUST or during your quiet evening hours at home."
      },
    ],
    activeJobs: [
      { title: "AI Response Rating - English", company: "Global Tech Corp", rate: "GHS 15/task", type: "Remote", urgency: "Urgent" },
      { title: "Data Labeling - Image Classification", company: "AI Research Lab", rate: "GHS 20/task", type: "Remote", urgency: "High demand" },
      { title: "Twi Text Rewriting", company: "Language AI", rate: "GHS 25/task", type: "Remote", urgency: "Premium" },
      { title: "Content Moderation - AI Training", company: "Social Platform", rate: "GHS 12/task", type: "Remote", urgency: "Consistent" },
    ]
  }
};

// --- Main Component ---

interface AITrainingClientProps {
  countryTarget?: "kenya" | "uganda" | "ghana";
}

export default function AITrainingClient({ countryTarget = "kenya" }: AITrainingClientProps) {
  const geo = LOCALIZATION_DATA[countryTarget] || LOCALIZATION_DATA.kenya;

  const TASK_TYPES = [
    { icon: "⭐", title: "Rating AI responses", body: "You read an AI-generated answer and score it: is it accurate? Helpful? Natural-sounding? Simple criteria, consistent work." },
    { icon: "✍️", title: "Rewriting bad outputs", body: `When an AI response is wrong or weird, you rewrite it the way a smart human would. ${geo.dialectNote}` },
    { icon: "🗣️", title: "Conversational training", body: `You chat with an AI model, probing it with normal questions. ${geo.tasksSectionNote}` },
    { icon: "📝", title: "Data labelling", body: "Tagging content — images, text, audio clips — so AI models can learn to classify things. Clear instructions, simple interface." },
  ];

  return (
    <main className="bg-gray-50 min-h-screen">
      {/* ── Hero ── */}
      <section className="relative pt-12 pb-16 sm:pt-20 sm:pb-20 overflow-hidden bg-gradient-to-br from-violet-50 via-white to-indigo-50">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-8 items-start lg:items-center">
            <div>
              <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-600 mb-6 sm:mb-8 transition">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                Back to VelloEarn
              </Link>
              <div className="inline-flex items-center gap-2 bg-violet-50 border border-violet-100 text-violet-600 text-xs font-bold px-3 py-1.5 rounded-full mb-6 uppercase tracking-wider">
                🤖 AI Training · Fast Growing
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight tracking-tight mb-5">
                Train AI models
                <br />
                <span className="text-violet-500">from your phone.</span>
              </h1>
              <p className="text-base sm:text-lg text-gray-500 leading-relaxed mb-3 max-w-lg">
                AI systems learn from human feedback. Your judgment is the raw material. 
                Earn {geo.rateRange} per task helping global tech companies improve their models.
              </p>
              <p className="text-sm sm:text-base text-gray-400 mb-8 max-w-lg">
                {geo.heroSubText}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mb-10">
                <a
                  href={VELLOEARN_REGISTER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-violet-500 hover:bg-violet-600 text-white font-bold text-base px-8 py-4 rounded-full shadow-lg shadow-violet-200 transition-all hover:scale-105 active:scale-95 text-center"
                >
                  Start Training — Free →
                </a>
                <Link
                  href="/blog/is-ai-training-a-scam-kenya"
                  className="bg-white hover:bg-gray-50 text-gray-600 font-semibold text-base px-8 py-4 rounded-full border border-gray-200 shadow-sm transition-all hover:scale-105 active:scale-95 text-center"
                >
                  Is this legit? Read first →
                </Link>
              </div>
              <div className="flex gap-8">
                {[
                  { v: geo.rateRange, l: "Per task" },
                  { v: "No minimum", l: "Withdrawal" },
                  { v: "Free", l: "To join" },
                ].map((s) => (
                  <div key={s.l}>
                    <div className="text-lg font-extrabold text-gray-900">{s.v}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
            {/* Right Column - Active Jobs Board */}
            <div className="mt-8 lg:mt-0">
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                    <span className="text-sm font-semibold text-gray-900">Active AI Tasks</span>
                    <span className="text-xs text-gray-400">· {geo.activeJobs.length} available</span>
                  </div>
                  <span className="text-xs text-violet-500 font-medium">New tasks daily</span>
                </div>
                <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                  {geo.activeJobs.map((job, i) => (
                    <a
                      key={i}
                      href={VELLOEARN_REGISTER_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block bg-gray-50 hover:bg-violet-50 border border-gray-100 hover:border-violet-200 rounded-xl p-4 transition-all cursor-pointer group"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-gray-900 text-sm group-hover:text-violet-600 transition-colors">
                              {job.title}
                            </h4>
                            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                              job.urgency === 'Urgent' ? 'bg-red-100 text-red-600' :
                              job.urgency === 'Premium' ? 'bg-amber-100 text-amber-600' :
                              job.urgency === 'High demand' ? 'bg-orange-100 text-orange-600' :
                              'bg-gray-100 text-gray-500'
                            }`}>
                              {job.urgency}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 text-xs text-gray-400">
                            <span>{job.company}</span>
                            <span>·</span>
                            <span>{job.type}</span>
                          </div>
                        </div>
                        <div className="text-right shrink-0 ml-4">
                          <div className="text-sm font-bold text-emerald-600">{job.rate}</div>
                          <div className="text-[10px] text-gray-400">per task</div>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
                <div className="mt-4 pt-3 border-t border-gray-100">
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>+{geo.activeJobs.length * 2} more tasks available</span>
                    <a
                      href={VELLOEARN_REGISTER_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-violet-500 font-medium hover:text-violet-600 transition-colors"
                    >
                      Apply to see all →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      
      {/* ── What you actually do ── */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-violet-500 font-semibold text-sm uppercase tracking-wider">What you actually do</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2 mb-4">Four types of tasks. All from your phone.</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5 mb-10">
            {TASK_TYPES.map(t => (
              <div key={t.title} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 transition-transform hover:-translate-y-1">
                <div className="text-2xl mb-3">{t.icon}</div>
                <h3 className="font-bold text-gray-900 text-base mb-2">{t.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{t.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <LiveAITraining />

      {/* ── Requirements ── */}
      <Requirements />

      {/* ── How It Actually Works ── */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-violet-500 font-semibold text-sm uppercase tracking-wider">From application to payout</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2 mb-4">How it actually works, step by step.</h2>
          </div>
          <div className="space-y-4">
            {geo.howItWorks.map((step) => (
              <div key={step.title} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <h3 className="font-bold text-gray-900 text-base mb-2">{step.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <a
              href={VELLOEARN_REGISTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-violet-500 hover:bg-violet-600 text-white font-bold text-base px-10 py-4 rounded-full shadow-lg shadow-violet-200 transition-all hover:scale-105 active:scale-95"
            >
              Start Training — Free →
            </a>
          </div>
        </div>
      </section>

      {/* ── Deep SEO Rich-Text Context ── */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-left prose prose-violet">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-6">
            Why Global Tech Companies Hire Remote AI Contributors in {geo.countryName}
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Artificial Intelligence models like ChatGPT, Claude, and specialized regional engines don&apos;t inherently understand human context, local dialects, or localized cultural nuances. To make these platforms useful for regional businesses and consumers, technology providers rely heavily on a data loop process called <strong>RLHF (Reinforcement Learning from Human Feedback)</strong>.
          </p>
          <p className="text-gray-600 leading-relaxed mb-8">
            By joining the VelloEarn AI data annotation community, you become an essential link in this engineering ecosystem — verifying generated content for alignment, correcting broken logic templates, and tagging colloquial data strings drawn from everyday {geo.countryName} usage.
          </p>

          <h3 className="text-xl font-bold text-gray-900 mb-3">Does Data Annotation Work in {geo.countryName}?</h3>
          <p className="text-gray-600 leading-relaxed mb-8">
            {geo.legitimacyNote}
          </p>

          <h3 className="text-xl font-bold text-gray-900 mb-3">Direct Payment Systems via Local Networks</h3>
          <p className="text-gray-600 leading-relaxed">
            Every submission is micro-tasked, so it processes cleanly inside a mobile browser or laptop within short intervals. Once your balance clears, withdrawals route through {geo.payoutRailsDetail}.
          </p>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-rose-500 font-semibold text-sm uppercase tracking-wider">The soft life, for real</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2 mb-3">Our team members are living it.</h2>
            <p className="text-gray-500">Not influencers. Just regular individuals who applied and showed up.</p>
          </div>
          <TestimonialSlider testimonials={TESTIMONIALS} />
          <p className="text-center text-xs text-gray-400 mt-5">
            ✅ Real team members · Real {geo.currency} recipients
          </p>
        </div>
      </section>

      {/* ── Earner Stories Carousel ── */}
      <section className="py-20 bg-gray-50 border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-rose-500 font-semibold text-sm uppercase tracking-wider">Real stories, real earnings</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2 mb-3">Meet our top earners</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">Turn your spare time into a clear avenue for meaningful supplementary income.</p>
          </div>
          
          <EarnerStoriesCarousel 
            stories={geo.stories}
            layout="horizontal"
            autoPlay={true}
            autoPlaySpeed={5000}  
            showDots={true}
            showArrows={true}
          />
        </div>
      </section>

      {/* ── Earning Potential Tiers ── */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Monthly Earnings Overview ({geo.currency})</h2>
          <CountrySelector active={countryTarget} />
          <div className="grid sm:grid-cols-3 gap-4">
            {geo.earningsTiers.map((tier, i) => (
              <div key={i} className={`rounded-2xl p-6 border ${i === 2 ? "bg-violet-500 border-violet-400 text-white shadow-xl shadow-violet-200" : "bg-gray-50 border-gray-100"}`}>
                <p className={`text-xs font-semibold uppercase mb-3 ${i === 2 ? "text-violet-200" : "text-gray-400"}`}>{tier.label}</p>
                <p className="text-2xl font-extrabold">{tier.range}</p>
                <p className="text-xs opacity-70">{tier.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Dynamic Local FAQs ── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-12">Common Questions</h2>
          <div className="space-y-4">
            {geo.objections.map((o, i) => <ObjAccordion key={i} q={o.q} a={o.a} />)}
          </div>
          <div className="mt-8 text-center">
            <a
              href={VELLOEARN_REGISTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-violet-600 font-semibold text-sm hover:text-violet-700 transition inline-flex items-center gap-1"
            >
              Still have questions? Ask us directly →
            </a>
          </div>
        </div>
      </section>

      {/* ── Final Action Runway ── */}
      <section className="relative py-20 text-center overflow-hidden">
        <div className="absolute inset-0 bg-violet-600" />
        <div className="relative z-10 max-w-xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-white mb-6">Start your first task this week.</h2>
          <p className="text-violet-200 text-sm mb-6">{geo.finalCtaSubText}</p>
          <a
            href={VELLOEARN_REGISTER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-violet-600 font-bold px-10 py-4 rounded-full shadow-xl hover:scale-105 active:scale-95 transition-all duration-150"
          >
            {geo.finalCtaButtonLabel}
          </a>
          <p className="text-violet-300 text-xs mt-4">
            Free to join · No fees · Start earning today
          </p>
        </div>
      </section>
    </main>
  );
}