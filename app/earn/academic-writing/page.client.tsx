"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ApplicationModal, SuccessState } from "@/app/components";
import { whatsappNumber } from "@/lib/constants";

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
    ? <Image {...props} fill unoptimized />
    : <Image {...props} width={width ?? 400} height={height ?? 300} unoptimized />;
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
            open ? "bg-emerald-600 text-white rotate-45" : "bg-gray-100 text-gray-500"
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

// --- Data ---

const WRITING_TYPES = [
  {
    icon: "📄",
    title: "Essays & coursework",
    pages: "2–10 pages",
    pay: "KES 500 – 2,500",
    body: "The bread and butter. Undergraduate essays, discussion posts, case studies, and short papers. High volume, fast turnaround. You can complete several per day once you're in a rhythm.",
  },
  {
    icon: "🔬",
    title: "Research papers",
    pages: "10–30 pages",
    pay: "KES 3,000 – 9,000",
    body: "Term papers and research assignments requiring sources, citations, and structured argument. Takes longer but pays proportionally more. Strong writers with subject expertise earn well here.",
  },
  {
    icon: "📚",
    title: "Dissertations & theses",
    pages: "30–100+ pages",
    pay: "KES 15,000 – 60,000",
    body: "The highest-paying category. Broken into chapters and delivered in stages. One good dissertation a month can match a full salary. Reserved for writers who've proven consistency.",
  },
  {
    icon: "💼",
    title: "Business & professional writing",
    pages: "Varies",
    pay: "KES 1,500 – 8,000",
    body: "Business plans, reports, executive summaries, and proposals. Clients are often working professionals, not students. Clean, structured writing is the main skill here.",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Apply with your subject areas",
    body: "Tell us your degree, your strong subjects, and your writing experience. You don't need prior freelance history — your academic background is the credential. Processing takes 24–48 hours.",
  },
  {
    step: "02",
    title: "Pass a short writing test",
    body: "You'll write a short sample (200–400 words) on an assigned topic. This is how we place you at the right pay grade from the start — higher-quality writers get higher-paying orders.",
  },
  {
    step: "03",
    title: "Claim orders from the queue",
    body: "You log in and browse available orders — topic, word count, deadline, and payout are shown upfront. You pick what suits your skills and schedule. No one assigns you work you didn't choose.",
  },
  {
    step: "04",
    title: "Submit, get approved, get paid",
    body: "You submit your work through the platform. Once reviewed and approved (usually within 12–24 hours), your balance updates. Request an M-Pesa payout anytime from KES 500 upward.",
  },
];

const EARNINGS = [
  { label: "Part-time (3–5 orders/week)", range: "KES 8,000 – 18,000", note: "/ month" },
  { label: "Full-time (daily orders)", range: "KES 25,000 – 45,000", note: "/ month" },
  { label: "Full-time + dissertations", range: "KES 50,000 – 90,000+", note: "/ month" },
];

const EARNER_STORIES = [
  {
    name: "Faith W.",
    location: "Nairobi, South B",
    earned: "KES 38,000 / month",
    story:
      "I graduated with a BA in Literature and had no idea what to do with it. A friend showed me this. I write 4–5 essays a week and two or three research papers. It took me a month to find my pace — now it's my main income.",
    img: "/testimonials/faith.jpg",
    fallback:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&h=200&fit=crop&crop=face&auto=format",
  },
  {
    name: "Brian K.",
    location: "Mombasa",
    earned: "KES 71,000 / month",
    story:
      "I specialise in business and management writing. Dissertations mostly. I do maybe two full dissertations a month on top of regular essays. I made more last month than my uncle who manages a bank branch.",
    img: "/testimonials/brian.jpg",
    fallback:
      "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=200&h=200&fit=crop&crop=face&auto=format",
  },
];

const OBJECTIONS = [
  {
    q: "Is academic writing legal?",
    a: "Writing and selling academic content is legal. What clients do with work they purchase is their responsibility — the same way a ghostwriter isn't accountable for how a book is published. This is a legitimate writing service industry operating globally, and thousands of professional writers earn their income this way.",
  },
  {
    q: "Do I need a degree to apply?",
    a: "A degree helps and gives you more subject coverage. But strong writers without a formal degree can still qualify, especially for general subjects and business writing. Your writing test result is the main qualifier — not your certificate.",
  },
  {
    q: "What subjects are in demand?",
    a: "Business, management, nursing, psychology, law, and education are consistently the highest-volume subjects. STEM papers (engineering, computer science) are fewer but pay significantly more per page. Whatever your field, there are likely orders waiting.",
  },
  {
    q: "What if the client rejects my work?",
    a: "Rejections are rare if you follow the brief. When they happen, you'll get specific revision notes. You revise and resubmit — this is normal in any writing workflow. Consistent, unreasonable rejections are flagged on the client side, not yours.",
  },
  {
    q: "How fast do I need to write?",
    a: "Orders come with deadlines you see before accepting. You pick orders whose deadlines work for you. Most writers do 500–1,000 words per hour on familiar subjects. A 2,000-word essay with a 24-hour deadline is very manageable. You set the pace.",
  },
  {
    q: "What about plagiarism?",
    a: "All submissions are checked. Work must be 100% original — no copying from the internet, no AI-generated text. If you write it yourself, you have nothing to worry about. Writers who pass our test generally have no issues here.",
  },
];

// --- Main Page ---

export default function AcademicWritingClient() {
  const [modalOpen, setModalOpen] = useState(false);
  const [successData, setSuccessData] = useState<{ name: string; whatsapp: string } | null>(null);

  const handleSuccess = (data: { name: string; whatsapp: string }) => {
    setModalOpen(false);
    setSuccessData(data);
  };

  return (
    <main className="bg-gray-50 min-h-screen">

      {/* ── Hero ── */}
      <section className="relative pt-24 pb-20 overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-teal-50">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-600 mb-8 transition"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to VelloEarn
              </Link>
              <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1.5 rounded-full mb-6 uppercase tracking-wider">
                ✍️ Academic Writing
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight tracking-tight mb-5">
                Your degree is sitting<br />
                <span className="text-emerald-600">idle. It shouldn&apos;t be.</span>
              </h1>
              <p className="text-lg text-gray-500 leading-relaxed mb-8 max-w-lg">
                Students worldwide pay for quality academic writing. If you write well — in any subject — there&apos;s a queue of orders waiting. Get paid per paper, directly to M-Pesa, on your own schedule.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setModalOpen(true)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base px-8 py-4 rounded-full shadow-lg shadow-emerald-200 transition-all hover:scale-105 active:scale-95"
                >
                  Apply for This Track →
                </button>
              </div>
              <div className="mt-10 flex gap-8">
                {[
                  { v: "KES 500+", l: "Per essay" },
                  { v: "KES 60,000+", l: "Max per dissertation" },
                  { v: "You choose", l: "Your subjects" },
                ].map((s) => (
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
                src="/earn/academic-writing-hero.jpg"
                fallback="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&h=840&fit=crop&auto=format"
                alt="Person writing at a desk"
                fill
                priority
                className="object-cover"
                sizes="45vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-3">
                <p className="text-xs text-gray-400 mb-1">Highest earning track</p>
                <p className="text-sm font-bold text-gray-900">Top writers earn KES 70,000+ monthly</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── What you write ── */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-emerald-600 font-semibold text-sm uppercase tracking-wider">What you&apos;ll write</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2 mb-4">
              Four order types. Pick what you&apos;re good at.
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5 mb-10">
            {WRITING_TYPES.map((t) => (
              <div key={t.title} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-2xl">{t.icon}</span>
                  <div className="text-right">
                    <p className="text-xs text-gray-400">{t.pages}</p>
                    <p className="text-xs font-bold text-emerald-600">{t.pay}</p>
                  </div>
                </div>
                <h3 className="font-bold text-gray-900 text-base mb-2">{t.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{t.body}</p>
              </div>
            ))}
          </div>
          <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 flex gap-4 items-start">
            <span className="text-2xl shrink-0">🎓</span>
            <div>
              <p className="font-bold text-gray-900 mb-1">Every subject is in demand</p>
              <p className="text-sm text-gray-600 leading-relaxed">
                Business and nursing are the highest-volume subjects. But literature, history, law, engineering, IT, and education all have consistent order flow. Whatever you studied, there&apos;s work for you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="text-emerald-600 font-semibold text-sm uppercase tracking-wider">How it works</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2">Apply. Test. Write. Earn.</h2>
          </div>
          <div className="space-y-5">
            {HOW_IT_WORKS.map((step, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex gap-5 items-start">
                <div className="shrink-0 w-12 h-12 rounded-2xl bg-emerald-600 text-white font-extrabold text-sm flex items-center justify-center">
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
            <span className="text-emerald-600 font-semibold text-sm uppercase tracking-wider">Earning potential</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2 mb-3">
              The more you write, the more it compounds.
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Academic writing is the highest per-hour track on VelloEarn. Skilled writers who stay consistent are among our top earners.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 mb-14">
            {EARNINGS.map((tier, i) => (
              <div
                key={i}
                className={`rounded-2xl p-6 border text-center ${
                  i === 2
                    ? "bg-emerald-600 border-emerald-500 text-white"
                    : "bg-gray-50 border-gray-100"
                }`}
              >
                <p
                  className={`text-xs font-semibold uppercase tracking-wider mb-3 ${
                    i === 2 ? "text-emerald-200" : "text-gray-400"
                  }`}
                >
                  {tier.label}
                </p>
                <p className={`text-2xl font-extrabold mb-1 ${i === 2 ? "text-white" : "text-gray-900"}`}>
                  {tier.range}
                </p>
                <p className={`text-xs ${i === 2 ? "text-emerald-200" : "text-gray-400"}`}>{tier.note}</p>
                {i === 2 && (
                  <p className="text-xs text-emerald-100 mt-2">Dissertation writers reach this regularly</p>
                )}
              </div>
            ))}
          </div>

          {/* Earner stories */}
          <h3 className="text-xl font-extrabold text-gray-900 mb-5">From writers already doing it</h3>
          <div className="grid sm:grid-cols-2 gap-5">
            {EARNER_STORIES.map((s) => (
              <div key={s.name} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative w-11 h-11 rounded-full overflow-hidden bg-emerald-100 shrink-0">
                    <SmartImage
                      src={s.img}
                      fallback={s.fallback}
                      alt={s.name}
                      fill
                      className="object-cover"
                      sizes="44px"
                    />
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
            <span className="text-emerald-600 font-semibold text-sm uppercase tracking-wider">Real talk</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2 mb-3">
              The questions you&apos;re already thinking
            </h2>
          </div>
          <div className="space-y-4">
            {OBJECTIONS.map((o, i) => (
              <ObjAccordion key={i} q={o.q} a={o.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0">
          <SmartImage
            src="/cta/background.jpg"
            fallback="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1600&h=600&fit=crop&auto=format"
            alt="background"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-700/90 to-teal-700/90" />
        </div>
        <div className="relative z-10 max-w-xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Your writing is worth serious money.
          </h2>
          <p className="text-emerald-100 mb-8 leading-relaxed">
            Apply today. Pass the writing test. Your first order could come within 48 hours.
          </p>
          <button
            onClick={() => setModalOpen(true)}
            className="inline-block bg-white text-emerald-700 font-bold text-base px-10 py-4 rounded-full shadow-xl hover:scale-105 active:scale-95 transition-all"
          >
            Apply for Academic Writing →
          </button>
        </div>
      </section>

      

      {modalOpen && (
        <ApplicationModal
          onClose={() => setModalOpen(false)}
          onSuccess={handleSuccess}
          track="Academic Writing"
        />
      )}

      {successData && (
        <SuccessState data={successData} onClose={() => setSuccessData(null)} />
      )}
    </main>
  );
}