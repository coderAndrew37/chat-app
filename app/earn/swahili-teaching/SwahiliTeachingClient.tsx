"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { VELLOEARN_REGISTER_URL } from "@/lib/constants";

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
            open ? "bg-emerald-500 text-white rotate-45" : "bg-gray-100 text-gray-500"
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
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

interface SwahiliTask {
  id: string;
  student: string;
  studentFlag: string;
  studentLocation: string;
  format: "1-on-1" | "Group" | "Written" | "Pronunciation";
  title: string;
  description: string;
  payPerSession: number;
  sessionLength: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  schedule: string;
  urgency: "Open" | "Urgent" | "Recurring" | "New" | "Premium";
}

const TASKS: SwahiliTask[] = [
  {
    id: "us-traveler",
    student: "Michael R.",
    studentFlag: "🇺🇸",
    studentLocation: "Austin, Texas",
    format: "1-on-1",
    title: "Conversational Swahili for travel",
    description:
      "Preparing for a three-week trip to Tanzania. Wants practical phrases, greetings, market negotiation, and basic directions.",
    payPerSession: 1400,
    sessionLength: "45 min",
    level: "Beginner",
    schedule: "Tue & Thu evenings (EAT 8–9pm)",
    urgency: "Urgent",
  },
  {
    id: "uk-business",
    student: "Sarah T.",
    studentFlag: "🇬🇧",
    studentLocation: "London, UK",
    format: "1-on-1",
    title: "Business Swahili for NGO work",
    description:
      "Working with a Nairobi-based NGO starting next month. Needs formal Swahili for meetings, correspondence, and polite negotiation.",
    payPerSession: 1800,
    sessionLength: "60 min",
    level: "Intermediate",
    schedule: "Weekly, Monday mornings (EAT 10am)",
    urgency: "Premium",
  },
  {
    id: "china-trade",
    student: "Wei L.",
    studentFlag: "🇨🇳",
    studentLocation: "Guangzhou, China",
    format: "Written",
    title: "Written Swahili correction & coaching",
    description:
      "Sends weekly written Swahili. Wants corrections with explanations. Async work — no video calls needed.",
    payPerSession: 900,
    sessionLength: "Async weekly",
    level: "Beginner",
    schedule: "Flexible · submit anytime",
    urgency: "Recurring",
  },
  {
    id: "diaspora-kid",
    student: "Amara O.",
    studentFlag: "🌍",
    studentLocation: "Atlanta, USA (Kenyan diaspora)",
    format: "1-on-1",
    title: "Kids' Swahili — heritage language",
    description:
      "Mother wants her 8-year-old to speak Swahili with visiting grandparents. Needs patient, playful teaching style.",
    payPerSession: 1200,
    sessionLength: "30 min",
    level: "Beginner",
    schedule: "Sat mornings (EAT 4–5pm)",
    urgency: "Open",
  },
  {
    id: "german-student",
    student: "Jonas K.",
    studentFlag: "🇩🇪",
    studentLocation: "Berlin, Germany",
    format: "Pronunciation",
    title: "Accent & pronunciation polish",
    description:
      "Already conversational but wants to sound natural. Focused sessions on stress patterns, rhythm, and native flow.",
    payPerSession: 1100,
    sessionLength: "30 min",
    level: "Advanced",
    schedule: "Flexible · any afternoon",
    urgency: "New",
  },
  {
    id: "aid-worker",
    student: "Priya M.",
    studentFlag: "🇮🇳",
    studentLocation: "Delhi, India",
    format: "Group",
    title: "Group class for aid workers",
    description:
      "Four aid workers deploying to Kenya next quarter. Wants weekly small-group sessions focused on field conversation.",
    payPerSession: 2600,
    sessionLength: "60 min (4 students)",
    level: "Beginner",
    schedule: "Wednesdays (EAT 6–7pm)",
    urgency: "Urgent",
  },
];

const WHO_LEARNS = [
  {
    flag: "🇺🇸",
    country: "Americans",
    reason: "Travelling to East Africa or working with regional businesses.",
    count: "~400 active",
  },
  {
    flag: "🇬🇧",
    country: "British & Europeans",
    reason: "Heritage connections, aid work, and language enthusiasts.",
    count: "~350 active",
  },
  {
    flag: "🇨🇳",
    country: "Chinese nationals",
    reason: "Trade and business with Kenya, Uganda, and Tanzania.",
    count: "~220 active",
  },
  {
    flag: "🌍",
    country: "African diaspora",
    reason: "Reconnecting with roots and cultural preservation.",
    count: "~450 active",
  },
];

const FORMAT_OPTIONS = [
  {
    icon: "👤",
    title: "1-on-1 lessons",
    body: "You and one student. 30 or 60 minutes. Conversational, focused, well-paid.",
    payHint: "KES 1,100–1,800 / session",
  },
  {
    icon: "👥",
    title: "Group lessons",
    body: "3–6 students at once. Lower per-student rate, higher hourly total.",
    payHint: "KES 2,000–2,800 / session",
  },
  {
    icon: "📝",
    title: "Written coaching",
    body: "Async. Students send written Swahili, you correct and explain.",
    payHint: "KES 800–1,200 / week",
  },
  {
    icon: "🎙️",
    title: "Pronunciation sessions",
    body: "Focused on accent and flow. Popular with advanced learners.",
    payHint: "KES 900–1,300 / session",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Sign up free",
    body: "Create your account in 2 minutes. No fees, no CV, no interview. Your teacher profile goes live immediately.",
  },
  {
    step: "02",
    title: "Pick a task",
    body: "Browse open student requests. Each shows the student, schedule, format, and exact payout before you claim it.",
  },
  {
    step: "03",
    title: "Teach the session",
    body: "Meet via the platform's video or chat tool. No third-party apps, no scheduling coordination outside the platform.",
  },
  {
    step: "04",
    title: "Get paid to M-Pesa",
    body: "Payment clears immediately after the session. Students can rebook directly through your profile.",
  },
];

const EARNINGS = [
  { label: "2–4 sessions/week", range: "KES 8,000 – 16,000", note: "/ month" },
  { label: "Daily (1–2 hrs/day)", range: "KES 22,000 – 38,000", note: "/ month" },
  { label: "Full schedule + team", range: "KES 45,000 – 75,000+", note: "/ month" },
];

const OBJECTIONS = [
  {
    q: "I'm not a trained teacher. Can I still do this?",
    a: "Yes. The platform matches you with learners, not schools. Students want someone who speaks the language naturally and can explain things clearly. We provide the teaching framework.",
  },
  {
    q: "What if I speak Sheng more than formal Swahili?",
    a: "Formal Swahili is what international students need. We include a short brush-up resource in onboarding to help you polish formal grammar and vocabulary.",
  },
  {
    q: "Do I need good internet and a camera?",
    a: "For video sessions, yes — stable connection and camera are essential. For written coaching, you only need basic internet. Many teachers start with written and upgrade later.",
  },
  {
    q: "Can I set my own rates?",
    a: "There's a platform rate card to prevent a race to the bottom. You can charge above the minimum as you gain strong reviews and experience.",
  },
  {
    q: "How quickly does M-Pesa pay out?",
    a: "Immediately after the session is marked complete. No minimum balance, no waiting for a monthly payroll cycle.",
  },
  {
    q: "Can I teach alongside my day job or studies?",
    a: "Yes. You set your own availability and only take the tasks that fit your schedule. No fixed shifts.",
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

const URGENCY_STYLES: Record<SwahiliTask["urgency"], string> = {
  Urgent: "bg-red-100 text-red-700",
  Premium: "bg-amber-100 text-amber-700",
  Recurring: "bg-emerald-100 text-emerald-700",
  New: "bg-blue-100 text-blue-700",
  Open: "bg-gray-100 text-gray-600",
};

const LEVEL_STYLES: Record<SwahiliTask["level"], string> = {
  Beginner: "text-emerald-600",
  Intermediate: "text-blue-600",
  Advanced: "text-violet-600",
};

// ─── Task card ───────────────────────────────────────────────────────────────

function TaskCard({ task }: { task: SwahiliTask }) {
  return (
    <div className="group bg-white rounded-2xl border border-gray-200 hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-100/50 transition-all duration-200 p-5 flex flex-col">
      {/* Student row */}
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-xl shrink-0">
          {task.studentFlag}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold text-gray-900 truncate">
            {task.student}
          </div>
          <div className="text-[11px] text-gray-400 truncate">
            {task.studentLocation}
          </div>
        </div>
        <span
          className={`text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${
            URGENCY_STYLES[task.urgency]
          }`}
        >
          {task.urgency}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-base font-bold text-gray-900 leading-snug mb-2 group-hover:text-emerald-600 transition-colors">
        {task.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-gray-500 leading-relaxed mb-4 flex-1 line-clamp-2">
        {task.description}
      </p>

      {/* Meta grid */}
      <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
        <div className="bg-gray-50 rounded-lg px-3 py-2">
          <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">
            Payout
          </div>
          <div className="font-bold text-emerald-600">
            KES {task.payPerSession.toLocaleString()}
            <span className="text-[10px] font-normal text-gray-400"> /session</span>
          </div>
        </div>
        <div className="bg-gray-50 rounded-lg px-3 py-2">
          <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">
            Length
          </div>
          <div className="font-bold text-gray-900">{task.sessionLength}</div>
        </div>
      </div>

      {/* Format / Level */}
      <div className="flex items-center justify-between text-[11px] mb-3 pb-3 border-b border-gray-100">
        <span className="text-gray-400">Format</span>
        <span className="font-semibold text-gray-700">{task.format}</span>
      </div>

      {/* Schedule + level */}
      <div className="flex items-center justify-between text-[11px] mb-4">
        <span className="text-gray-400 inline-flex items-center gap-1 truncate pr-2">
          <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="truncate">{task.schedule}</span>
        </span>
        <span className={`font-semibold shrink-0 ${LEVEL_STYLES[task.level]}`}>
          {task.level}
        </span>
      </div>

      <a
        href={VELLOEARN_REGISTER_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="block text-center bg-gray-900 hover:bg-emerald-500 text-white text-sm font-bold py-2.5 rounded-lg transition-colors"
      >
        Apply to teach
      </a>
    </div>
  );
}

// ─── Main ────────────────────────────────────────────────────────────────────

export default function SwahiliClient() {
  return (
    <main className="bg-gray-50 min-h-screen">
      {/* ── 1. HERO ──────────────────────────────────────────────────────── */}
      <section className="relative pt-12 pb-16 sm:pt-20 sm:pb-20 overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-teal-50">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-200/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal-200/20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            {/* Left */}
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

              <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-100 text-emerald-600 text-xs font-bold px-3 py-1.5 rounded-full mb-6 uppercase tracking-wider">
                🌍 Teach Swahili · Premium rates
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight tracking-tight mb-5">
                You speak something{" "}
                <span className="text-emerald-500">the world pays to learn.</span>
              </h1>

              <p className="text-base sm:text-lg text-gray-500 leading-relaxed mb-3">
                Swahili is the most spoken language in Africa. Students from the US, UK,
                Europe, and China are actively booking lessons. Pick a task, teach the
                session, get paid.
              </p>

              <p className="text-sm text-gray-400 mb-8">
                Free to join · Set your own hours · KES 1,100+ per session · Instant M-Pesa
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-10">
                <a
                  href={VELLOEARN_REGISTER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-base px-8 py-4 rounded-full shadow-lg shadow-emerald-200 transition-all hover:scale-105 active:scale-95 text-center"
                >
                  Browse Open Lessons →
                </a>
                <a
                  href="#tasks"
                  className="bg-white hover:bg-gray-50 text-gray-600 font-semibold text-base px-8 py-4 rounded-full border border-gray-200 shadow-sm transition-all hover:scale-105 active:scale-95 text-center"
                >
                  See student requests ↓
                </a>
              </div>

              <div className="flex gap-8">
                {[
                  { v: `${TASKS.length}+`, l: "Open requests" },
                  { v: "Flexible", l: "Your hours" },
                  { v: "Instant", l: "M-Pesa" },
                ].map((s) => (
                  <div key={s.l}>
                    <div className="text-lg font-extrabold text-gray-900">{s.v}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — image collage */}
            <div className="relative hidden lg:block h-[440px]">
              {/* Main image */}
              <div className="absolute top-0 right-0 w-[280px] h-[360px] rounded-3xl overflow-hidden shadow-2xl shadow-emerald-200/50 rotate-2">
                <Image
                  src="https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=600&h=800&fit=crop&q=80"
                  alt="Teaching Swahili online"
                  fill
                  className="object-cover"
                  sizes="280px"
                  priority
                />
              </div>

              {/* Secondary image */}
              <div className="absolute bottom-0 left-0 w-[240px] h-[280px] rounded-3xl overflow-hidden shadow-2xl shadow-emerald-200/50 -rotate-3 border-4 border-white">
                <Image
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&h=600&fit=crop&q=80"
                  alt="International students learning"
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
                  {TASKS.length}
                </div>
                <div className="text-[11px] text-gray-400">
                  students waiting for a teacher
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
              <p className="text-emerald-500 font-semibold text-xs uppercase tracking-wider mb-2">
                Live student requests
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                Open teaching tasks
              </h2>
              <p className="text-gray-500 text-sm mt-2 max-w-xl">
                Each listing shows the student, schedule, and exact payout. Pick one that
                fits your hours and apply.
              </p>
            </div>
            <div className="text-sm text-gray-500 shrink-0">
              <span className="font-semibold text-gray-900">{TASKS.length}</span> open
              requests
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TASKS.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400">
            <p>Payouts shown are per session. Students rebook directly through your profile.</p>
            <a
              href={VELLOEARN_REGISTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-emerald-500 hover:text-emerald-600 transition-colors"
            >
              See all open requests →
            </a>
          </div>
        </div>
      </section>

      {/* ── 3. WHO'S LEARNING ────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <p className="text-emerald-500 font-semibold text-xs uppercase tracking-wider mb-2">
              Who's learning
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mb-2">
              Real students. Real money.
            </h2>
            <p className="text-gray-500 text-sm max-w-lg mx-auto">
              Demand comes from four main groups. All actively paying for lessons.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {WHO_LEARNS.map((w) => (
              <div
                key={w.country}
                className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-3xl mb-3">{w.flag}</div>
                <p className="font-bold text-gray-900 text-sm mb-1">{w.country}</p>
                <p className="text-xs text-gray-500 leading-relaxed mb-3">{w.reason}</p>
                <div className="text-[10px] font-semibold text-emerald-600 uppercase tracking-wider">
                  {w.count}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. FORMATS ───────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-white border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <p className="text-emerald-500 font-semibold text-xs uppercase tracking-wider mb-2">
              How you teach
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mb-2">
              Four formats. Pick your fit.
            </h2>
            <p className="text-gray-500 text-sm max-w-lg mx-auto">
              Each format has its own payout range. Stack them or specialize.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {FORMAT_OPTIONS.map((f) => (
              <div
                key={f.title}
                className="bg-gray-50 rounded-2xl p-5 border border-gray-100 hover:border-emerald-200 transition-colors"
              >
                <div className="text-2xl mb-3">{f.icon}</div>
                <h3 className="font-bold text-gray-900 text-sm mb-1.5">{f.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed mb-3">{f.body}</p>
                <div className="text-[11px] font-semibold text-emerald-600">
                  {f.payHint}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. HOW IT WORKS ──────────────────────────────────────────────── */}
      <section
        id="how-it-works"
        className="py-16 sm:py-20 bg-gray-50 border-t border-gray-100"
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="mb-10">
            <p className="text-emerald-500 font-semibold text-xs uppercase tracking-wider mb-2">
              Process
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              Start teaching in four steps
            </h2>
          </div>

          <div className="space-y-4">
            {HOW_IT_WORKS.map((step) => (
              <div
                key={step.step}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex gap-5 items-start"
              >
                <div className="shrink-0 w-12 h-12 rounded-2xl bg-emerald-500 text-white font-extrabold text-sm flex items-center justify-center">
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
              className="inline-block bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-base px-10 py-4 rounded-full shadow-lg shadow-emerald-200 transition-all hover:scale-105 active:scale-95"
            >
              Browse Open Lessons →
            </a>
          </div>
        </div>
      </section>

      {/* ── 6. EARNINGS ──────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <p className="text-emerald-500 font-semibold text-xs uppercase tracking-wider mb-2">
              Earning potential
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mb-2">
              Real numbers. No fluff.
            </h2>
            <p className="text-gray-500 text-sm max-w-lg mx-auto">
              Based on actual teacher earnings. What you make depends on how many sessions
              you take.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {EARNINGS.map((tier, i) => (
              <div
                key={i}
                className={`rounded-2xl p-6 border text-center ${
                  i === 2
                    ? "bg-emerald-500 border-emerald-400 text-white shadow-xl shadow-emerald-200"
                    : "bg-gray-50 border-gray-100"
                }`}
              >
                <p
                  className={`text-xs font-semibold uppercase tracking-wider mb-3 ${
                    i === 2 ? "text-emerald-100" : "text-gray-400"
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
                <p
                  className={`text-xs ${i === 2 ? "text-emerald-100" : "text-gray-400"}`}
                >
                  {tier.note}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. FAQ ───────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-gray-50 border-t border-gray-100">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="mb-10">
            <p className="text-emerald-500 font-semibold text-xs uppercase tracking-wider mb-2">
              Real talk
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              Common questions
            </h2>
          </div>
          <div className="space-y-4">
            {OBJECTIONS.map((o, i) => (
              <ObjAccordion key={i} q={o.q} a={o.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. CROSS-FUNNEL BRIDGE ───────────────────────────────────────── */}
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
                icon: "🤖",
                title: "AI Training",
                desc: "Rate AI responses and label data. Fast-growing category.",
                href: "/earn/ai-training",
                tag: "Fast growing",
              },
              {
                icon: "💬",
                title: "Remote Chat Work",
                desc: "Customer support and moderation tasks for global brands.",
                href: "/earn/chatting",
                tag: "Popular",
              },
            ].map((m) => (
              <Link
                key={m.href}
                href={m.href}
                className="group bg-gray-50 hover:bg-emerald-50 border border-gray-100 hover:border-emerald-200 rounded-2xl p-5 transition-all duration-200"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">{m.icon}</span>
                  <span className="text-xs bg-white text-gray-500 font-medium px-2 py-0.5 rounded-full border border-gray-200">
                    {m.tag}
                  </span>
                </div>
                <h3 className="font-bold text-gray-900 text-sm mb-1 group-hover:text-emerald-600 transition-colors">
                  {m.title}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">{m.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. FINAL CTA ─────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-emerald-600">
        <div className="max-w-xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Your language is an income stream.
          </h2>
          <p className="text-emerald-100 mb-8 leading-relaxed">
            Free to join. Set your own hours. Your first session could be your first payout.
          </p>
          <a
            href={VELLOEARN_REGISTER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-emerald-600 font-bold text-base px-10 py-4 rounded-full shadow-xl hover:scale-105 active:scale-95 transition-all"
          >
            Browse Open Lessons →
          </a>
          <p className="text-emerald-200 text-xs mt-4">
            Free to join · Instant M-Pesa payouts · Set your own schedule
          </p>
        </div>
      </section>
    </main>
  );
}
