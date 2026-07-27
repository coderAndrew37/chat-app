"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import LiveForeignersLearning from "@/app/components/LiveForeignersLearning";
import SwahiliJobListings from "@/app/components/SwahiliJobListings";
import TrainingChannelBanner from "@/app/components/TrainingChannelBanner";
import { VELLOEARN_REGISTER_URL } from "@/lib/constants";


function ObjAccordion({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-5 py-4 text-left transition-colors hover:bg-gray-50">
        <span className="font-semibold text-gray-900 text-sm sm:text-base pr-4">{q}</span>
        <span className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 ${open ? "bg-emerald-500 text-white rotate-45" : "bg-gray-100 text-gray-500"}`}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
        </span>
      </button>
      {open && <div className="px-5 pb-5 animate-in fade-in slide-in-from-top-1 duration-200"><p className="text-gray-500 text-sm leading-relaxed">{a}</p></div>}
    </div>
  );
}

// --- Content Data ---

const WHO_LEARNS = [
  { flag: "🇺🇸", country: "Americans", reason: "Travelling to East Africa or doing business in the region." },
  { flag: "🇬🇧", country: "British & Europeans", reason: "Heritage connections, aid work, language enthusiasts." },
  { flag: "🇨🇳", country: "Chinese nationals", reason: "Business interests in Kenya, Uganda, and Tanzania are growing fast." },
  { flag: "🌍", country: "African diaspora", reason: "Reconnecting with roots, cultural preservation." },
];

const FORMAT_OPTIONS = [
  { icon: "👤", title: "1-on-1 lessons", body: "You and one student. 30 or 60 minutes. Conversational, focused, and well-paid. Most popular with serious learners." },
  { icon: "👥", title: "Group lessons", body: "3–6 students at once. Lower per-student rate, but you earn more per hour total. Good for structured curriculum delivery." },
  { icon: "📝", title: "Written coaching", body: "Async. Students send you written Swahili. You correct it and explain. Works over chat — no video calls required." },
  { icon: "🎙️", title: "Pronunciation sessions", body: "Focused on accent and flow. Popular with students who already know some Swahili but want to sound natural." },
];

const HOW_IT_WORKS = [
  { step: "01", title: "Apply free", body: "Create your account in 2 minutes. No fees, no CV, no interview. Your teacher profile goes live immediately." },
  { step: "02", title: "Set up your profile", body: "Choose which session formats you offer, your available hours, and your style. Your profile goes live on our teacher marketplace." },
  { step: "03", title: "Students book you", body: "You get notified when a student books. You confirm, then meet via the platform's video or chat tool. No third-party apps needed." },
  { step: "04", title: "Teach. Get paid. Repeat.", body: "Payment processes immediately after the session. M-Pesa within minutes. Students can rebook directly through your profile." },
];

const EARNINGS = [
  { label: "2–4 sessions/week", range: "KES 8,000 – 16,000", note: "/ month" },
  { label: "Daily sessions (1–2hr/day)", range: "KES 22,000 – 38,000", note: "/ month" },
  { label: "Full schedule + team income", range: "KES 45,000 – 75,000+", note: "/ month" },
];

const EARNER_STORIES = [
  {
    name: "Grace W.",
    location: "Nairobi, Kilimani",
    earned: "KES 34,000 / month",
    story: "I teach four mornings a week — 7am to 10am. My students are in the US and UK so the time zones work perfectly. I didn't know Swahili was worth this much until I tried.",
    img: "/testimonials/grace.jpg",
    fallback: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=face&auto=format",
  },
  {
    name: "James M.",
    location: "Mombasa",
    earned: "KES 28,500 / month",
    story: "I grew up speaking Swahili as my first language. My first student was a Chinese businessman. Now I have regulars who've been booking weekly for five months.",
    img: "/testimonials/james.jpg",
    fallback: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=200&h=200&fit=crop&crop=face&auto=format",
  },
];

const OBJECTIONS = [
  {
    q: "I'm not a trained teacher. Can I still do this?",
    a: "Yes. The platform matches you with learners, not schools. Students want someone who speaks the language naturally and can explain things clearly. We provide the teaching framework.",
  },
  {
    q: "What if I speak Sheng more than formal Swahili?",
    a: "Formal Swahili is what international students need. We have a short brushup resource included in onboarding to help you polish your formal grammar and vocabulary.",
  },
  {
    q: "Do I need good internet and a camera?",
    a: "For video sessions, yes — a stable connection and camera are vital. For written coaching, you only need basic internet. Many teachers start with written and upgrade later.",
  },
  {
    q: "Can I set my own rates?",
    a: "There's a platform rate card to prevent a 'race to the bottom.' You can charge above the minimum as you gain strong reviews and experience.",
  },
];

// --- Main Page Component ---

export default function SwahiliClient() {
  // Images for hero collage
  const teachImage = "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&h=600&fit=crop&auto=format";
  const studentImage = "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop&auto=format";

  return (
    <main className="bg-gray-50 min-h-screen">

      {/* ── Hero ── */}
      <section className="relative pt-12 pb-16 sm:pt-16 sm:pb-20 overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-teal-50">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
            
            {/* Left - Content */}
            <div>
              <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-600 mb-6 sm:mb-8 transition">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                Back to VelloEarn
              </Link>

              <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-100 text-emerald-600 text-xs font-bold px-3 py-1.5 rounded-full mb-6 uppercase tracking-wider">
                🌍 Teach Swahili · Premium Rates
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight tracking-tight mb-4">
                You speak something <br />
                <span className="text-emerald-500">the world is paying to learn.</span>
              </h1>

              <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-4 max-w-lg">
                Swahili is the most spoken language in Africa. Foreigners from the US, Europe, and China are actively paying to learn it. You already know it — let&apos;s turn that into an income.
              </p>

              <p className="text-sm sm:text-base text-gray-400 mb-8 max-w-lg">
                Free to join · No fees · Set your own hours · KES 1,200+ per session
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-10">
                <Link
                  href={VELLOEARN_REGISTER_URL}
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold text-base px-8 py-4 rounded-full shadow-lg shadow-emerald-200 transition-all hover:scale-105 active:scale-95 text-center"
                >
                  Start Teaching — Free →
                </Link>
                <Link
                  href="#how-it-works"
                  className="bg-white hover:bg-gray-50 text-gray-600 font-semibold text-base px-8 py-4 rounded-full border border-gray-200 shadow-sm transition-all hover:scale-105 active:scale-95 text-center"
                >
                  See how it works
                </Link>
              </div>

              <div className="flex gap-8">
                {[
                  { v: "KES 1,200+", l: "Per session" },
                  { v: "Flexible", l: "Set your hours" },
                  { v: "Free", l: "To join" },
                ].map(s => (
                  <div key={s.l}>
                    <div className="text-lg font-extrabold text-gray-900">{s.v}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Image Collage */}
            <div className="relative grid grid-cols-2 gap-3 mt-8 lg:mt-0">
              {/* Main Image - Teaching */}
              <Link
                href={VELLOEARN_REGISTER_URL}
                rel="noopener noreferrer"
                className="col-span-2 relative rounded-2xl overflow-hidden h-48 sm:h-56 shadow-xl group"
              >
                <Image
                  src={teachImage}
                  alt="Teaching Swahili online to international students"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <p className="text-white font-bold text-sm group-hover:text-emerald-300 transition-colors">🌍 Teach Swahili</p>
                  <p className="text-white/70 text-xs">Earn KES 1,200+ per session →</p>
                </div>
              </Link>

              {/* Bottom Left - Students */}
              <Link
                href={VELLOEARN_REGISTER_URL}
                rel="noopener noreferrer"
                className="relative rounded-2xl overflow-hidden h-40 shadow-xl group"
              >
                <Image
                  src={studentImage}
                  alt="International students learning Swahili"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                  <p className="text-white font-bold text-xs group-hover:text-emerald-300 transition-colors">👨‍🎓 Students waiting</p>
                  <p className="text-white/60 text-[10px]">50+ active learners →</p>
                </div>
              </Link>

              {/* Bottom Right - Stats Card */}
              <Link
                href={VELLOEARN_REGISTER_URL}
                rel="noopener noreferrer"
                className="relative rounded-2xl overflow-hidden h-40 bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-xl group hover:scale-105 transition-transform duration-300"
              >
                <div className="text-center text-white p-4">
                  <div className="text-3xl font-extrabold group-hover:scale-110 transition-transform duration-300">KES 1,200+</div>
                  <div className="text-sm text-emerald-100">Per session</div>
                  <div className="text-xs text-emerald-200 mt-1 group-hover:text-white transition-colors">Start teaching →</div>
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
            <span className="text-emerald-500 font-semibold text-sm uppercase tracking-wider">Live right now</span>
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

      {/* ── Who's learning ── */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-emerald-500 font-semibold text-sm uppercase tracking-wider">Demand</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2 mb-4">Real students. Real money.</h2>
            <p className="text-gray-500">Foreigners are actively paying to learn Swahili. Here&apos;s who&apos;s waiting for you.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {WHO_LEARNS.map(w => (
              <div key={w.country} className="bg-white rounded-2xl p-5 border border-gray-100 flex gap-4 items-start shadow-sm hover:shadow-md transition-shadow">
                <span className="text-3xl shrink-0">{w.flag}</span>
                <div>
                  <p className="font-bold text-gray-900 text-base mb-1">{w.country}</p>
                  <p className="text-sm text-gray-500 leading-relaxed">{w.reason}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

        <TrainingChannelBanner />

      {/* ── Available Teaching Jobs ── */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <span className="text-emerald-500 font-semibold text-sm uppercase tracking-wider">Opportunities</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2 mb-3">
              Teaching opportunities waiting for you
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Real students, real bookings. Apply once and start teaching immediately.
            </p>
          </div>
          <SwahiliJobListings />
        </div>
      </section>

      {/* ── Session formats ── */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-emerald-500 font-semibold text-sm uppercase tracking-wider">How you teach</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2 mb-4">Four formats. Pick your fit.</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {FORMAT_OPTIONS.map(f => (
              <div key={f.title} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-2xl mb-3">{f.icon}</div>
                <h3 className="font-bold text-gray-900 text-base mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section id="how-it-works" className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="text-emerald-500 font-semibold text-sm uppercase tracking-wider">Process</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2">Start teaching in 4 simple steps</h2>
            <p className="text-gray-500 mt-2">Free to join. No experience needed. Start earning today.</p>
          </div>
          <div className="space-y-5">
            {HOW_IT_WORKS.map((step, i) => (
              <div key={i} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 shadow-sm flex gap-5 items-start hover:border-emerald-200 transition-colors">
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
            <Link
              href={VELLOEARN_REGISTER_URL}
              rel="noopener noreferrer"
              className="inline-block bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-base px-10 py-4 rounded-full shadow-lg shadow-emerald-200 transition-all hover:scale-105 active:scale-95"
            >
              Start Teaching — Free →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Earning potential ── */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-emerald-500 font-semibold text-sm uppercase tracking-wider">Earnings</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2 mb-3">Teaching pays well.</h2>
            <p className="text-gray-500">Real earnings from real teachers. What you make depends on how much you teach.</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {EARNINGS.map((tier, i) => (
              <div key={i} className={`rounded-2xl p-6 border text-center ${i === 2 ? "bg-emerald-500 border-emerald-400 text-white shadow-xl shadow-emerald-200" : "bg-white border-gray-100"}`}>
                <p className={`text-xs font-semibold uppercase tracking-wider mb-3 ${i === 2 ? "text-emerald-100" : "text-gray-400"}`}>{tier.label}</p>
                <p className={`text-2xl font-extrabold mb-1 ${i === 2 ? "text-white" : "text-gray-900"}`}>{tier.range}</p>
                <p className={`text-xs ${i === 2 ? "text-emerald-100" : "text-gray-400"}`}>{tier.note}</p>
                {i === 2 && <p className="text-xs text-emerald-100 mt-2">🏆 Top teachers earn this</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Objections ── */}
      <section className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">Questions?</h2>
            <p className="text-gray-500">Everything you need to know before you start teaching.</p>
          </div>
          <div className="space-y-4">
            {OBJECTIONS.map((o, i) => <ObjAccordion key={i} q={o.q} a={o.a} />)}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA - Irresistible Offer ── */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-600" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full translate-x-1/3 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/10 rounded-full -translate-x-1/3 translate-y-1/3 pointer-events-none" />
        
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white text-sm font-semibold px-4 py-2 rounded-full mb-6">
            🌍 Join 1,200+ Swahili teachers
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
            Your language is an <br />
            <span className="text-emerald-200">income stream.</span>
          </h2>
          
          <p className="text-emerald-100 text-lg mb-8 max-w-xl mx-auto">
            Free to join. Set your own hours. Earn KES 1,200+ per session. 
            No experience needed. Start teaching today.
          </p>

          <div className="flex flex-wrap justify-center gap-6 mb-8 text-white/80 text-sm">
            <span>✅ Free to join</span>
            <span>💸 No fees ever</span>
            <span>📱 Teach from your phone</span>
            <span>⚡ Instant M-Pesa payouts</span>
          </div>

          <Link
            href={VELLOEARN_REGISTER_URL}
            rel="noopener noreferrer"
            className="inline-block bg-white text-emerald-600 hover:bg-emerald-50 font-extrabold text-xl px-12 py-5 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all"
          >
            Start Teaching — Free →
          </Link>
          
          <p className="text-emerald-200/70 text-sm mt-4">
            No credit card · No payment required · Start earning instantly
          </p>
        </div>
      </section>

    </main>
  );
}