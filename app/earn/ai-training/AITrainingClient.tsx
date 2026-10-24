"use client";

import { VELLOEARN_REGISTER_URL } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// ─── Accordion ───────────────────────────────────────────────────────────────

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
            open ? "bg-violet-500 text-white rotate-45" : "bg-gray-100 text-gray-500"
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

// ─── Types & data ────────────────────────────────────────────────────────────

interface AITask {
  id: string;
  client: string;
  category: string;
  title: string;
  description: string;
  payPerTask: number; // KES equivalent
  estMinutes: number;
  difficulty: "Beginner" | "Intermediate" | "Language";
  urgency: "Open" | "Urgent" | "High demand" | "New" | "Premium" | "Consistent";
  thumbnail: string; // NEW — small visual per task
}

interface LocalizationConfig {
  countryName: string;
  currency: string;
  wallet: string;
  fxFromKES: number;
  heroSubText: string;
  dialectNote: string;
  tasksSectionNote: string;
  legitimacyNote: string;
  payoutRailsDetail: string;
  howItWorks: { title: string; body: string }[];
  earningsTiers: { label: string; range: string; note: string }[];
  objections: { q: string; a: string }[];
}

// Unsplash thumbnails per task category — small, illustrative, not stock-photo-corporate
const THUMBS = {
  rate: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop&q=80",
  label: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=400&h=250&fit=crop&q=80",
  chat: "https://images.unsplash.com/photo-1587560699334-cc4ff634909a?w=400&h=250&fit=crop&q=80",
  lang: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400&h=250&fit=crop&q=80",
  mod: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=250&fit=crop&q=80",
  verify:
    "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=250&fit=crop&q=80",
};

const BASE_TASKS: AITask[] = [
  {
    id: "rate-english",
    client: "Global AI Lab",
    category: "Response rating",
    title: "Rate AI answers for accuracy",
    description:
      "Read an AI-generated answer, score it against a rubric (accuracy, helpfulness, naturalness). Approved feedback loops back to the model.",
    payPerTask: 120,
    estMinutes: 4,
    difficulty: "Beginner",
    urgency: "Urgent",
    thumbnail: THUMBS.rate,
  },
  {
    id: "label-image",
    client: "Vision Research Team",
    category: "Data labelling",
    title: "Image classification labels",
    description:
      "Tag images with object categories and attributes. Clear instructions, simple interface. High volume, fast throughput.",
    payPerTask: 150,
    estMinutes: 5,
    difficulty: "Beginner",
    urgency: "High demand",
    thumbnail: THUMBS.label,
  },
  {
    id: "chatbot-train",
    client: "Tech Startup",
    category: "Conversational training",
    title: "Probe a chatbot's responses",
    description:
      "Chat with a model using normal questions to test its boundaries. Flag inconsistencies, note weak spots.",
    payPerTask: 100,
    estMinutes: 6,
    difficulty: "Beginner",
    urgency: "New",
    thumbnail: THUMBS.chat,
  },
  {
    id: "swahili-rewrite",
    client: "Language AI",
    category: "Local language",
    title: "Rewrite outputs in Swahili",
    description:
      "When an AI response sounds unnatural in Swahili, rewrite it the way a native speaker would actually say it.",
    payPerTask: 200,
    estMinutes: 8,
    difficulty: "Language",
    urgency: "Premium",
    thumbnail: THUMBS.lang,
  },
  {
    id: "content-mod",
    client: "Social Platform",
    category: "Content moderation",
    title: "Flag policy-violating content",
    description:
      "Review user-generated content against a policy playbook. Tag violations, escalate edge cases.",
    payPerTask: 90,
    estMinutes: 3,
    difficulty: "Beginner",
    urgency: "Consistent",
    thumbnail: THUMBS.mod,
  },
  {
    id: "academic-verify",
    client: "EdTech",
    category: "Verification",
    title: "Verify academic answer correctness",
    description:
      "Read a model's answer to a curriculum question. Verify factual accuracy against source documents.",
    payPerTask: 180,
    estMinutes: 8,
    difficulty: "Intermediate",
    urgency: "Open",
    thumbnail: THUMBS.verify,
  },
];

const LANGUAGE_TASK: Record<"kenya" | "uganda" | "ghana", Partial<AITask>> = {
  kenya: {
    client: "Language AI",
    title: "Rewrite outputs in Swahili",
    description:
      "When an AI response sounds unnatural in Swahili, rewrite it the way a native speaker would actually say it.",
    payPerTask: 200,
    urgency: "Premium",
  },
  uganda: {
    client: "Language AI",
    title: "Rewrite outputs in Luganda",
    description:
      "Correct unnatural Luganda phrasing in AI outputs. Match native tone, idioms, and local speech patterns.",
    payPerTask: 180,
    urgency: "Premium",
  },
  ghana: {
    client: "Language AI",
    title: "Rewrite outputs in Twi",
    description:
      "Correct unnatural Twi phrasing in AI outputs. Match native tone, idioms, and local speech patterns.",
    payPerTask: 160,
    urgency: "Premium",
  },
};

const GEO_CONTENT: Record<"kenya" | "uganda" | "ghana", LocalizationConfig> = {
  kenya: {
    countryName: "Kenya",
    currency: "KES",
    wallet: "M-Pesa",
    fxFromKES: 1,
    heroSubText: "Free to join · Instant M-Pesa payouts · No experience needed",
    dialectNote: "Your Swahili, your slang, your clarity.",
    tasksSectionNote:
      "Your real responses help train models to understand how Kenyans actually talk.",
    legitimacyNote:
      "Kenya's fast-growing digital economy and high English proficiency make Kenyan contributors prime candidates for training global AI models. All you need is a stable connection (Safaricom, Airtel, or Telkom) and a modern browser — no coding required.",
    payoutRailsDetail:
      "M-Pesa alongside standard bank transfers, converting cleanly into KES",
    howItWorks: [
      {
        title: "1. Sign up free",
        body: "Create your account, verify your phone. No fees, no CV, no interview. Active within minutes.",
      },
      {
        title: "2. Complete paid training",
        body: "A short guided module (under an hour) shows you how rating, rewriting, and labelling work. This training is compensated.",
      },
      {
        title: "3. Pick tasks from the queue",
        body: "Live task queue opens up: rating AI answers, rewriting weak ones, labelling content, or probing a model. Each task takes 3–10 minutes.",
      },
      {
        title: "4. Quality review loop",
        body: "A sample of your work is checked against guidelines. If ratings drift, you get specific feedback — a learning loop, not a one-strike system.",
      },
      {
        title: "5. Withdraw to M-Pesa",
        body: "Approved tasks hit your balance instantly. Withdraw on your schedule — no monthly payroll cycle.",
      },
    ],
    earningsTiers: [
      { label: "Casual (5–10 tasks/day)", range: "KES 4,000 – 9,000", note: "/ month" },
      { label: "Active (20–30 tasks/day)", range: "KES 14,000 – 22,000", note: "/ month" },
      { label: "Active + team commissions", range: "KES 28,000 – 50,000+", note: "/ month" },
    ],
    objections: [
      {
        q: "Is AI data annotation available in Kenya?",
        a: "Yes — 100% available across Nairobi, Mombasa, Kisumu, and every county in between. No VPN required, and no recurring charges.",
      },
      {
        q: "How do data annotation jobs work from home in Kenya?",
        a: "Fully remote and flexible around UoN or JKUAT classes, or other freelance work. Tasks run on laptop or smartphone with low-data modes for Safaricom, Airtel, or Telkom.",
      },
      {
        q: "Are these paid training jobs, and how do I get paid in KES?",
        a: "Yes — the foundational training is compensated. Once onboarded, earnings withdraw instantly to M-Pesa in Kenyan Shillings.",
      },
      {
        q: "This sounds too good to be true — how do I know it's not a scam?",
        a: "Fair question. We publish real payout amounts, keep everything clearly stated upfront, and our task structure matches how legitimate global AI companies actually source human feedback — through verified micro-tasks, not investment schemes.",
      },
      {
        q: "Do I need a degree or prior tech experience?",
        a: "No. Read carefully, think clearly, write plain English. Most contributors have no AI background — your everyday judgment is the actual skill.",
      },
      {
        q: "Can I do this alongside school or a full-time job?",
        a: "Yes. No fixed shifts — tasks sit in the queue and you complete them whenever you have time.",
      },
    ],
  },
  uganda: {
    countryName: "Uganda",
    currency: "UGX",
    wallet: "MTN MoMo & Airtel Money",
    fxFromKES: 28,
    heroSubText: "Free to join · Instant Mobile Money payouts · No experience needed",
    dialectNote: "Your local phrasing, your context, your clarity.",
    tasksSectionNote:
      "Your real responses help train models to understand localized phrases used across Uganda.",
    legitimacyNote:
      "Uganda's expanding digital transformation and strong English education make Ugandan contributors well-positioned to train AI models. All you need is a reliable connection (MTN or Airtel) and a standard browser.",
    payoutRailsDetail:
      "MTN Mobile Money and Airtel Money alongside standard bank transfers, converting cleanly into UGX",
    howItWorks: [
      {
        title: "1. Sign up free",
        body: "Create your account, verify your phone. No fees, no CV, no interview.",
      },
      {
        title: "2. Complete paid training",
        body: "A short guided module covers rating, rewriting, and labelling before you touch live tasks. Compensated.",
      },
      {
        title: "3. Pick tasks from the queue",
        body: "Live queue: rate AI answers, rewrite weak ones, label content, or probe a model. 3–10 min per task.",
      },
      {
        title: "4. Quality review loop",
        body: "Samples of your work are checked against guidelines. Feedback helps recalibrate — not a one-strike system.",
      },
      {
        title: "5. Withdraw to Mobile Money",
        body: "Approved tasks hit your balance instantly. Withdraw to MTN or Airtel on your schedule.",
      },
    ],
    earningsTiers: [
      { label: "Casual (5–10 tasks/day)", range: "UGX 120,000 – 270,000", note: "/ month" },
      { label: "Active (20–30 tasks/day)", range: "UGX 420,000 – 660,000", note: "/ month" },
      { label: "Active + team commissions", range: "UGX 840,000 – 1,500,000+", note: "/ month" },
    ],
    objections: [
      {
        q: "Is AI data annotation available in Uganda?",
        a: "Fully available across Kampala, Mbarara, Gulu, and the rest of the country. No VPN needed, no recurring charges.",
      },
      {
        q: "How do data annotation jobs work from home in Uganda?",
        a: "Fully remote and flexible around Makerere or MUBS lectures. Low-data modes for MTN and Airtel networks.",
      },
      {
        q: "Are these paid training jobs, and how do I get paid in UGX?",
        a: "Yes — training is paid. Earnings withdraw instantly to MTN MoMo or Airtel Money in UGX.",
      },
      {
        q: "This sounds too good to be true — how do I know it's not a scam?",
        a: "Fair question. Real payouts, clear structure, verified micro-task work — not personal data requests or investment schemes.",
      },
      {
        q: "Do I need a degree or prior tech experience?",
        a: "No. Read carefully and respond in clear English. No programming background needed.",
      },
      {
        q: "Can I do this alongside school or a full-time job?",
        a: "Yes. No fixed shifts — tasks sit in the queue and you complete them when you have time.",
      },
    ],
  },
  ghana: {
    countryName: "Ghana",
    currency: "GHS",
    wallet: "MTN MoMo & Telecel Cash",
    fxFromKES: 0.11,
    heroSubText: "Free to join · Instant Mobile Money payouts · No experience needed",
    dialectNote: "Your local expressions, your context, your clarity.",
    tasksSectionNote:
      "Your inputs train AI to accurately process West African English and localized terms.",
    legitimacyNote:
      "Ghana's digital transformation, reliable fintech, and high English fluency make Ghanaian students and young professionals premier candidates for training AI. All you need is a smartphone or laptop and an active MTN, Telecel, or AT connection.",
    payoutRailsDetail:
      "MTN Mobile Money and Telecel Cash alongside direct local bank routing, converting cleanly into GHS",
    howItWorks: [
      {
        title: "1. Sign up free",
        body: "Create your account, verify your phone. No fees, no CV, no interview.",
      },
      {
        title: "2. Complete paid training",
        body: "A guided module (under an hour) explains text rating and content labelling. Compensated.",
      },
      {
        title: "3. Pick tasks from the queue",
        body: "Live queue: score AI accuracy, rewrite unnatural outputs, or stress-test response boundaries. 2–5 min per task.",
      },
      {
        title: "4. Quality review loop",
        body: "Samples checked against guidelines. If output drifts, you get feedback to realign — a learning loop, not one-strike.",
      },
      {
        title: "5. Withdraw to Mobile Money",
        body: "Approved tasks hit your balance instantly. Withdraw to MoMo or Telecel Cash on your own schedule.",
      },
    ],
    earningsTiers: [
      { label: "Casual (5–10 tasks/day)", range: "GHS 500 – 1,100", note: "/ month" },
      { label: "Active (20–30 tasks/day)", range: "GHS 1,800 – 2,800", note: "/ month" },
      { label: "Active + team commissions", range: "GHS 3,500 – 6,000+", note: "/ month" },
    ],
    objections: [
      {
        q: "Is AI data annotation available in Ghana?",
        a: "100% available across Accra, Kumasi, Tamale, Cape Coast, and all regions. No VPN required, no hidden fees.",
      },
      {
        q: "How do data annotation jobs work from home in Ghana?",
        a: "Work from home or campus — flexible around UG Legon or KNUST classes. Low-data modes conserve MTN or Telecel bundles.",
      },
      {
        q: "Are these paid training jobs, and how do I get paid in GHS?",
        a: "Yes — onboarding hours are compensated. Withdraw earnings to MTN MoMo or Telecel Cash in GHS.",
      },
      {
        q: "This sounds too good to be true — how do I know it's not a scam?",
        a: "Fair question. Transparent structure, real earner data, verified micro-tasks — never tracking private keys or demanding investment tiers.",
      },
      {
        q: "Do I need a degree or prior tech experience?",
        a: "No degree or software experience needed. The core skill is comprehension and clear English responses.",
      },
      {
        q: "Can I do this alongside school or a full-time job?",
        a: "Absolutely. No mandatory shifts — task queue runs 24/7.",
      },
    ],
  },
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatPayout(kes: number, geo: LocalizationConfig): string {
  const local = kes * geo.fxFromKES;
  if (geo.currency === "KES") return `KES ${Math.round(local)}`;
  if (geo.currency === "UGX") return `UGX ${Math.round(local).toLocaleString()}`;
  return `GHS ${Math.round(local)}`;
}

const URGENCY_STYLES: Record<AITask["urgency"], string> = {
  Urgent: "bg-red-100 text-red-700",
  "High demand": "bg-orange-100 text-orange-700",
  New: "bg-blue-100 text-blue-700",
  Consistent: "bg-emerald-100 text-emerald-700",
  Premium: "bg-amber-100 text-amber-700",
  Open: "bg-gray-100 text-gray-600",
};

const DIFFICULTY_STYLES: Record<AITask["difficulty"], string> = {
  Beginner: "text-emerald-600",
  Intermediate: "text-blue-600",
  Language: "text-violet-600",
};

// ─── Task card (NOW WITH IMAGE) ──────────────────────────────────────────────

function TaskCard({ task, geo }: { task: AITask; geo: LocalizationConfig }) {
  return (
    <div className="group bg-white rounded-2xl border border-gray-200 hover:border-violet-300 hover:shadow-xl hover:shadow-violet-100/50 transition-all duration-200 overflow-hidden flex flex-col">
      {/* Thumbnail banner */}
      <div className="relative h-36 bg-gray-100 overflow-hidden">
        <Image
          src={task.thumbnail}
          alt={`${task.category} — ${task.title}`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        {/* Category + urgency pills on image */}
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 flex-wrap">
          <span className="text-[10px] font-semibold text-white bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-full uppercase tracking-wider">
            {task.category}
          </span>
        </div>
        <div className="absolute top-2.5 right-2.5">
          <span
            className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
              URGENCY_STYLES[task.urgency]
            }`}
          >
            {task.urgency}
          </span>
        </div>

        {/* Payout badge pinned bottom-left of image */}
        <div className="absolute bottom-2.5 left-2.5 bg-white/95 backdrop-blur-sm rounded-md px-2 py-1 shadow-sm">
          <div className="text-[9px] font-medium text-gray-500 leading-none">Payout</div>
          <div className="text-sm font-extrabold text-emerald-600 leading-tight">
            {formatPayout(task.payPerTask, geo)}
            <span className="text-[9px] font-normal text-gray-400"> /task</span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-sm font-bold text-gray-900 leading-snug mb-1 group-hover:text-violet-600 transition-colors">
          {task.title}
        </h3>
        <p className="text-[11px] text-gray-400 mb-2">{task.client}</p>

        <p className="text-xs text-gray-500 leading-relaxed mb-3 flex-1 line-clamp-2">
          {task.description}
        </p>

        {/* Meta row */}
        <div className="flex items-center justify-between text-[11px] mb-3 pt-3 border-t border-gray-100">
          <span className="text-gray-400 inline-flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            ~{task.estMinutes} min
          </span>
          <span className={`font-semibold ${DIFFICULTY_STYLES[task.difficulty]}`}>
            {task.difficulty}
          </span>
        </div>

        <a
          href={VELLOEARN_REGISTER_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center bg-gray-900 hover:bg-violet-500 text-white text-xs font-bold py-2.5 rounded-lg transition-colors"
        >
          Apply for this task
        </a>
      </div>
    </div>
  );
}

// ─── Trust bar — real reviewer avatars ───────────────────────────────────────

function ReviewerAvatars() {
  const faces = [
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face&q=80",
    "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=80&h=80&fit=crop&crop=face&q=80",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face&q=80",
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face&q=80",
  ];
  return (
    <div className="flex items-center gap-3">
      <div className="flex -space-x-2">
        {faces.map((src, i) => (
          <div
            key={i}
            className="relative w-9 h-9 rounded-full border-2 border-white overflow-hidden bg-gray-200"
          >
            <Image
              src={src}
              alt={`Active reviewer ${i + 1}`}
              fill
              className="object-cover"
              sizes="36px"
            />
          </div>
        ))}
      </div>
      <div className="text-xs">
        <div className="font-semibold text-gray-900">1,200+ contributors</div>
        <div className="text-gray-400">active this week</div>
      </div>
    </div>
  );
}

// ─── Main ────────────────────────────────────────────────────────────────────

interface AITrainingClientProps {
  countryTarget: "kenya" | "uganda" | "ghana";
}

export default function AITrainingClient({ countryTarget }: AITrainingClientProps) {
  const geo = GEO_CONTENT[countryTarget];

  const tasks: AITask[] = BASE_TASKS.map((t) =>
    t.id === "swahili-rewrite" ? { ...t, ...LANGUAGE_TASK[countryTarget] } : t
  );

  return (
    <main className="bg-gray-50 min-h-screen">
      {/* ── 1. HERO ──────────────────────────────────────────────────────── */}
      <section className="relative pt-12 pb-16 sm:pt-20 sm:pb-20 overflow-hidden bg-gradient-to-br from-violet-50 via-white to-indigo-50">
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-200/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-200/20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            {/* Left text */}
            <div>
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-600 mb-6 transition"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Back to VelloEarn
              </Link>

              <div className="inline-flex items-center gap-2 bg-violet-50 border border-violet-100 text-violet-600 text-xs font-bold px-3 py-1.5 rounded-full mb-6 uppercase tracking-wider">
                🤖 AI Training · Fast growing
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight tracking-tight mb-5">
                Train AI models —{" "}
                <span className="text-violet-500">from your phone.</span>
              </h1>

              <p className="text-base sm:text-lg text-gray-500 leading-relaxed mb-3">
                AI systems learn from human feedback. Your judgment is the raw material.
                Pick a task, complete it, get paid.
              </p>

              <p className="text-sm text-gray-400 mb-8">
                {geo.heroSubText} · {geo.wallet}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <a
                  href={VELLOEARN_REGISTER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-violet-500 hover:bg-violet-600 text-white font-bold text-base px-8 py-4 rounded-full shadow-lg shadow-violet-200 transition-all hover:scale-105 active:scale-95 text-center"
                >
                  Browse Open Tasks →
                </a>
                <a
                  href="#tasks"
                  className="bg-white hover:bg-gray-50 text-gray-600 font-semibold text-base px-8 py-4 rounded-full border border-gray-200 shadow-sm transition-all hover:scale-105 active:scale-95 text-center"
                >
                  See tasks below ↓
                </a>
              </div>

              <ReviewerAvatars />
            </div>

            {/* Right — hero image collage */}
            <div className="relative hidden lg:block h-[440px]">
              {/* Main image */}
              <div className="absolute top-0 right-0 w-[280px] h-[360px] rounded-3xl overflow-hidden shadow-2xl shadow-violet-200/50 rotate-2">
                <Image
                  src="https://images.unsplash.com/photo-1587560699334-cc4ff634909a?w=600&h=800&fit=crop&q=80"
                  alt="Contributor working on AI tasks from a phone"
                  fill
                  className="object-cover"
                  sizes="280px"
                  priority
                />
              </div>

              {/* Secondary image */}
              <div className="absolute bottom-0 left-0 w-[240px] h-[280px] rounded-3xl overflow-hidden shadow-2xl shadow-violet-200/50 -rotate-3 border-4 border-white">
                <Image
                  src="https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=500&h=600&fit=crop&q=80"
                  alt="Data annotation task interface"
                  fill
                  className="object-cover"
                  sizes="240px"
                  priority
                />
              </div>

              {/* Floating stat card */}
              <div className="absolute bottom-16 right-4 bg-white rounded-2xl shadow-xl p-4 border border-gray-100 w-[200px]">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  <span className="text-[10px] font-semibold text-gray-900 uppercase tracking-wider">
                    Live now
                  </span>
                </div>
                <div className="text-2xl font-extrabold text-gray-900">
                  {formatPayout(120, geo)}
                </div>
                <div className="text-[11px] text-gray-400">
                  avg. per completed task
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. TASK CARDS ────────────────────────────────────────────────── */}
      <section id="tasks" className="py-16 sm:py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div>
              <p className="text-violet-500 font-semibold text-xs uppercase tracking-wider mb-2">
                Live in {geo.countryName}
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                Open AI tasks
              </h2>
              <p className="text-gray-500 text-sm mt-2 max-w-xl">
                Each listing shows the exact client, payout, and time commitment. Pick one
                that fits your style and apply.
              </p>
            </div>
            <div className="text-sm text-gray-500 shrink-0">
              <span className="font-semibold text-gray-900">{tasks.length}</span> open roles
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} geo={geo} />
            ))}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400">
            <p>Payouts shown are per completed task. Quality approval required.</p>
            <a
              href={VELLOEARN_REGISTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-violet-500 hover:text-violet-600 transition-colors"
            >
              See all open tasks →
            </a>
          </div>
        </div>
      </section>

      {/* ── 3. HOW IT WORKS ──────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="mb-12">
            <p className="text-violet-500 font-semibold text-xs uppercase tracking-wider mb-2">
              From application to payout
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              How it actually works, step by step
            </h2>
          </div>
          <div className="space-y-4">
            {geo.howItWorks.map((step, i) => (
              <div
                key={step.title}
                className="bg-gray-50 rounded-2xl p-6 border border-gray-100 flex gap-5 items-start"
              >
                <div className="shrink-0 w-10 h-10 rounded-xl bg-violet-500 text-white font-extrabold text-sm flex items-center justify-center">
                  {i + 1}
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
              className="inline-block bg-violet-500 hover:bg-violet-600 text-white font-bold text-base px-10 py-4 rounded-full shadow-lg shadow-violet-200 transition-all hover:scale-105 active:scale-95"
            >
              Browse Open Tasks →
            </a>
          </div>
        </div>
      </section>

      {/* ── 4. DEEP CONTEXT (with side image) ────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-white border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-5">
                Why global AI companies hire remote contributors in {geo.countryName}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                AI models like ChatGPT, Claude, and specialized regional engines don&apos;t
                inherently understand local context, dialects, or cultural nuance. To make
                these systems useful for regional users, tech companies rely on a process
                called <strong>RLHF (Reinforcement Learning from Human Feedback)</strong>.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                By joining VelloEarn&apos;s AI task community, you become an essential link
                in that loop — verifying generated content, correcting broken logic, and
                tagging colloquial data strings drawn from everyday {geo.countryName} usage.
              </p>

              <h3 className="text-base font-bold text-gray-900 mb-2">
                Does data annotation work in {geo.countryName}?
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-4">
                {geo.legitimacyNote}
              </p>

              <div className="flex items-center gap-2 text-xs text-violet-600 font-semibold">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                Payouts withdraw through {geo.payoutRailsDetail}
              </div>
            </div>

            {/* Side image */}
            <div className="relative h-[420px] rounded-3xl overflow-hidden shadow-xl shadow-violet-100">
              <Image
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=800&fit=crop&q=80"
                alt="Remote workers collaborating on AI training tasks"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-violet-900/60 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4">
                  <div className="text-[10px] font-semibold text-violet-600 uppercase tracking-wider mb-1">
                    Contributor average
                  </div>
                  <div className="text-xl font-extrabold text-gray-900">
                    {formatPayout(340, geo)}
                    <span className="text-xs font-normal text-gray-500"> /day</span>
                  </div>
                  <div className="text-[11px] text-gray-400 mt-0.5">
                    at 20–30 tasks/day
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. EARNINGS ──────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="mb-10">
            <p className="text-violet-500 font-semibold text-xs uppercase tracking-wider mb-2">
              Earning potential
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              Real numbers. No fluff.
            </h2>
            <p className="text-gray-500 text-sm mt-2 max-w-xl">
              Based on actual contributor output in {geo.currency}. What you make depends on
              how many tasks you complete.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {geo.earningsTiers.map((tier, i) => (
              <div
                key={i}
                className={`rounded-2xl p-6 border text-center ${
                  i === 2
                    ? "bg-violet-500 border-violet-400 text-white shadow-xl shadow-violet-200"
                    : "bg-white border-gray-100"
                }`}
              >
                <p
                  className={`text-xs font-semibold uppercase tracking-wider mb-3 ${
                    i === 2 ? "text-violet-200" : "text-gray-400"
                  }`}
                >
                  {tier.label}
                </p>
                <p
                  className={`text-2xl font-extrabold mb-1 ${
                    i === 2 ? "text-white" : "text-gray-900"
                  }`}
                >
                  {tier.range}
                </p>
                <p className={`text-xs ${i === 2 ? "text-violet-200" : "text-gray-400"}`}>
                  {tier.note}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. FAQ ───────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-gray-50 border-t border-gray-100">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="mb-10">
            <p className="text-violet-500 font-semibold text-xs uppercase tracking-wider mb-2">
              Real talk
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              Common questions
            </h2>
          </div>
          <div className="space-y-4">
            {geo.objections.map((o, i) => (
              <ObjAccordion key={i} q={o.q} a={o.a} />
            ))}
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

      {/* ── 7. CROSS-FUNNEL BRIDGE ───────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-6 text-center">
            Also earning on VelloEarn
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              {
                icon: "🏨",
                title: "Hotel Reviews",
                desc: "Review real hotels and lodges. Earn per approved review.",
                href: "/earn/hotel-reviews",
                tag: "New",
              },
              {
                icon: "💬",
                title: "Remote Chat Work",
                desc: "Customer support and moderation tasks for global brands.",
                href: "/earn/chatting",
                tag: "Popular",
              },
              {
                icon: "📋",
                title: "Surveys",
                desc: "Share opinions on products and brands. Quick tasks, quick pay.",
                href: "/earn/surveys",
                tag: "Quick start",
              },
            ].map((m) => (
              <Link
                key={m.href}
                href={m.href}
                className="group bg-gray-50 hover:bg-violet-50 border border-gray-100 hover:border-violet-200 rounded-2xl p-5 transition-all duration-200"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">{m.icon}</span>
                  <span className="text-xs bg-white text-gray-500 font-medium px-2 py-0.5 rounded-full border border-gray-200">
                    {m.tag}
                  </span>
                </div>
                <h3 className="font-bold text-gray-900 text-sm mb-1 group-hover:text-violet-600 transition-colors">
                  {m.title}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">{m.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. FINAL CTA ─────────────────────────────────────────────────── */}
      <section className="relative py-16 sm:py-20 overflow-hidden">
        {/* Background image with violet overlay */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1600&h=600&fit=crop&q=80"
            alt="Team of remote AI task contributors"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-violet-700/95 to-indigo-800/95" />
        </div>

        <div className="relative z-10 max-w-xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Pick a task. Start earning this week.
          </h2>
          <p className="text-violet-100 mb-8 leading-relaxed">
            Free to join. No experience needed. Your first completed task could be your
            first payout.
          </p>
          <a
            href={VELLOEARN_REGISTER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-violet-600 font-bold text-base px-10 py-4 rounded-full shadow-xl hover:scale-105 active:scale-95 transition-all"
          >
            Browse Open Tasks →
          </a>
          <p className="text-violet-200 text-xs mt-4">
            Free to join · Instant {geo.wallet} payouts · No experience needed
          </p>
        </div>
      </section>
    </main>
  );
}