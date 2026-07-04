"use client";

import { ApplicationModal, SuccessState } from "@/app/components";
import { TESTIMONIALS } from "@/app/components/LandingInteractive";
import Requirements from "@/app/components/Requirements";
import TestimonialSlider from "@/app/components/TestimonialSlider";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import EarnerStoriesCarousel from "@/app/components/EarnerStoriesGrid";

// --- Sub-components ---

function SmartImage({ src, fallback, alt, fill, width, height, className, sizes, priority }: {
  src: string; fallback: string; alt: string; fill?: boolean; width?: number; height?: number;
  className?: string; sizes?: string; priority?: boolean;
}) {
  const [imgSrc, setImgSrc] = useState(src);
  const props = { src: imgSrc, alt, className, onError: () => setImgSrc(fallback), sizes, priority };
  return fill ? <Image {...props} fill unoptimized alt="" /> : <Image {...props} width={width ?? 400} height={height ?? 300} unoptimized alt=""/>;
}

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

// --- Multi-Country Dynamic Localization Matrix ---

interface LocalizationConfig {
  countryName: string;
  currency: string;
  payoutMethods: string;
  rateRange: string;
  dialectNote: string;
  tasksSectionNote: string;
  earningsTiers: { label: string; range: string; note: string }[];
  stories: { name: string; location: string; earned: string; story: string; image: { actualImage?: string; fallback: string } }[];
  objections: { q: string; a: string }[];
}

const LOCALIZATION_DATA: Record<string, LocalizationConfig> = {
  kenya: {
    countryName: "Kenya",
    currency: "KES",
    payoutMethods: "M-Pesa withdrawals",
    rateRange: "KES 80–400",
    dialectNote: "Your Swahili, your slang, your clarity.",
    tasksSectionNote: "Your real responses help train it to understand how Kenyans actually talk.",
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
      { q: "Do I need to understand AI or tech to do this?", a: "Not at all. You don't need to know how AI works. You just need to be able to read, think, and give honest feedback. The training materials explain everything in plain language." },
      { q: "What language do I work in?", a: "Most tasks are in English. Some are in Swahili or a mix of both. Swahili-language tasks often pay a premium because there's high demand and fewer qualified contributors." },
      { q: "What if I rate something 'wrong'?", a: "There are quality checks built in. If your ratings consistently deviate, you'll get feedback to help you improve. It's a learning process, not a test you fail once." }
    ]
  },
  uganda: {
    countryName: "Uganda",
    currency: "UGX",
    payoutMethods: "MTN and Airtel Mobile Money",
    rateRange: "UGX 2,500–12,000",
    dialectNote: "Your local phrasing, your context, your clarity.",
    tasksSectionNote: "Your real responses help train it to understand localized phrases used across Uganda.",
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
      { q: "Do I need to understand AI or tech to do this?", a: "Not at all. You just need to read carefully and provide logical, human reasoning based on clear platform guidelines." },
      { q: "What language do I work in?", a: "Tasks are mostly in English, with certain high-value localization sets designed for regional language comprehension." },
      { q: "What if I rate something 'wrong'?", a: "Quality metrics look for natural patterns. Regular discrepancies will just trigger helpful guidance interfaces so you can learn safely." }
    ]
  },
  ghana: {
    countryName: "Ghana",
    currency: "GHS",
    payoutMethods: "MTN Mobile Money & Vodafone Cash",
    rateRange: "GHS 10–50",
    dialectNote: "Your local expressions, your context, your clarity.",
    tasksSectionNote: "Your inputs train artificial intelligence layers to accurately process West African English context.",
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
        story: "The platform provides consistent work. I log on after my main job to complete grading tracks. Payouts arrive directly to my mobile wallet instantly.",
        image: { fallback: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face&auto=format" }
      }
    ],
    objections: [
      { q: "Do I need to understand AI or tech to do this?", a: "No engineering expertise required. Your normal, rational human logic is exactly what these algorithms are missing." },
      { q: "What language do I work in?", a: "Tasks are standard English along with specialized contextual datasets optimized for local nuance." },
      { q: "What if I rate something 'wrong'?", a: "The framework includes educational checkpoints. If answers match poorly against common standards, feedback tools deploy automatically to help you pick it up." }
    ]
  }
};

// --- Interfaces & Shared Types ---

interface EarningsStories {
  name: string;
  location: string;
  story: string;
  earned: string;
  image: {
    actualImage?: string;
    fallback: string;
  };
}

interface AITrainingClientProps {
  countryTarget?: "kenya" | "uganda" | "ghana";
}

export default function AITrainingClient({ countryTarget = "kenya" }: AITrainingClientProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [successData, setSuccessData] = useState<{ name: string; whatsapp: string } | null>(null);

  // Safely extract localization context falling back gracefully
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
      <section className="relative pt-24 pb-20 overflow-hidden bg-gradient-to-br from-violet-50 via-white to-indigo-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-600 mb-8 transition">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                Back to VelloEarn
              </Link>
              <div className="inline-flex items-center gap-2 bg-violet-50 border border-violet-100 text-violet-600 text-xs font-bold px-3 py-1.5 rounded-full mb-6 uppercase tracking-wider">
                🤖 AI Training
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight tracking-tight mb-5">
                The world&apos;s biggest companies<br />
                <span className="text-violet-500">need your brain.</span>
              </h1>
              <p className="text-lg text-gray-500 leading-relaxed mb-8 max-w-lg">
                AI systems learn from human feedback. Your judgment is the raw material. Earn {geo.rateRange} per task helping global tech companies improve their models.
              </p>
              <button onClick={() => setModalOpen(true)}
                className="bg-violet-500 hover:bg-violet-600 text-white font-bold text-base px-8 py-4 rounded-full shadow-lg shadow-violet-200 transition-all hover:scale-105 active:scale-95">
                Apply for This Track →
              </button>
              <p className="text-xs text-gray-400 mt-4">
                One-time KES 550 setup · KES 200 welcome bonus back · No monthly charges
              </p>
            </div>
            <div className="relative hidden lg:block h-[420px] rounded-3xl overflow-hidden shadow-2xl">
              <SmartImage src="/earn/ai-training.jpg" fallback="https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&h=840&fit=crop&auto=format"
                alt="Person working on AI training task" fill priority className="object-cover" sizes="45vw" />
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

      {/* Conversion Optimizer CTA Answering What, How Much, How to Pay */}
      <Requirements onApply={() => setModalOpen(true)} />

      {/* ── NEW SECTION: Deep SEO Rich-Text Context (Google Index Fuel) ── */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-left prose prose-violet">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-6">Why Global Tech Companies Hire Remotely in {geo.countryName}</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Artificial Intelligence models like ChatGPT, Claude, and specialized regional engines don&apos;t inherently understand human context, local dialects, or localized cultural nuances. To make these platforms useful for regional businesses and consumers, technology providers rely heavily on a data loop process called <strong>RLHF (Reinforcement Learning from Human Feedback)</strong>.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            By joining the VelloEarn AI data annotation community, you become an essential link in this engineering ecosystem. Your operational tasks involve verification of generated content for alignment, structural correction of broken logic templates, and semantic tagging of colloquial data strings.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Every submission is completely micro-tasked, allowing processing directly inside mobile viewports or laptop browsers within short intervals. Compensation details remain continually updated, with direct clearances handled smoothly via local network operators including <strong>{geo.payoutMethods}</strong>.
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
          <h2 className="text-3xl font-extrabold text-gray-900 mb-12">Monthly Earnings Overview ({geo.currency})</h2>
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

      {/* Secondary Requirements block preserved explicitly as requested for downstream conversion anchoring */}
      <Requirements onApply={() => setModalOpen(true)} />

      {/* ── Dynamic Local FAQs ── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-12">Common Questions</h2>
          <div className="space-y-4">
            {geo.objections.map((o, i) => <ObjAccordion key={i} q={o.q} a={o.a} />)}
          </div>
          <div className="mt-8 text-center">
            <button onClick={() => setModalOpen(true)} className="text-violet-600 font-semibold text-sm hover:text-violet-700 transition">
              Still have questions? Ask us directly →
            </button>
          </div>
        </div>
      </section>

      {/* ── Final Action Runway ── */}
      <section className="relative py-20 text-center overflow-hidden">
        <div className="absolute inset-0 bg-violet-600" />
        <div className="relative z-10 max-w-xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-white mb-6">Start your first task this week.</h2>
          <p className="text-violet-200 text-sm mb-6">One-time KES 550 setup · KES 200 welcome bonus back</p>
          <button onClick={() => setModalOpen(true)} className="bg-white text-violet-600 font-bold px-10 py-4 rounded-full shadow-xl hover:scale-105 active:scale-95 transition-all duration-150">
            Apply Now — KES 550 One-Time
          </button>
        </div>
      </section>

      {/* ── Handled State Overlay Interfaces ── */}
      {modalOpen && (
        <ApplicationModal 
          onClose={() => setModalOpen(false)} 
          track="AI Training" 
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