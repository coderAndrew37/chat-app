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
        <span className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 ${open ? "bg-violet-500 text-white rotate-45" : "bg-gray-100 text-gray-500"}`}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
        </span>
      </button>
      {open && <div className="px-5 pb-5"><p className="text-gray-500 text-sm leading-relaxed">{a}</p></div>}
    </div>
  );
}

const TASK_TYPES = [
  { icon: "⭐", title: "Rating AI responses", body: "You read an AI-generated answer and score it: is it accurate? Helpful? Natural-sounding? Simple criteria, consistent work." },
  { icon: "✍️", title: "Rewriting bad outputs", body: "When an AI response is wrong or weird, you rewrite it the way a smart human would. Your Swahili, your slang, your clarity." },
  { icon: "🗣️", title: "Conversational training", body: "You chat with an AI model, probing it with normal questions. Your real responses help train it to understand how Kenyans actually talk." },
  { icon: "📝", title: "Data labelling", body: "Tagging content — images, text, audio clips — so AI models can learn to classify things. Clear instructions, simple interface." },
];

const HOW_IT_WORKS = [
  { step: "01", title: "Apply and get onboarded", body: "You apply, get accepted, then receive a short onboarding doc explaining the task types and how the scoring system works. No prior knowledge needed." },
  { step: "02", title: "Pick tasks from the queue", body: "You log in and see available tasks. Each one shows the task type, estimated time, and payout. You pick what you want." },
  { step: "03", title: "Complete them at your pace", body: "Tasks have deadlines, but you don't sit in a time-block. You can do three tasks in the morning and five at night. It's async." },
  { step: "04", title: "Earn and withdraw", body: "Approved tasks add to your balance. Withdraw to M-Pesa anytime from KES 500 upward." },
];

const EARNINGS = [
  { label: "Casual (5–10 tasks/day)", range: "KES 4,000 – 9,000", note: "/ month" },
  { label: "Active (20–30 tasks/day)", range: "KES 14,000 – 22,000", note: "/ month" },
  { label: "Active + team commissions", range: "KES 28,000 – 50,000+", note: "/ month" },
];

const EARNER_STORIES = [
  {
    name: "Patricia N.",
    location: "Nairobi, Githurai",
    earned: "KES 17,200 / month",
    story: "I do this during my lunch break and late evenings. It doesn't feel like work — I'm just reading things and typing what I think. The money is real though.",
    img: "/testimonials/patricia.jpg",
    fallback: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=face&auto=format",
  },
  {
    name: "Moses A.",
    location: "Mombasa",
    earned: "KES 31,500 / month",
    story: "I treat it like a second job. I block two hours every morning — no distractions. After three months I brought my cousin in. Her output adds to my team income now.",
    img: "/testimonials/moses.jpg",
    fallback: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face&auto=format",
  },
];

const OBJECTIONS = [
  {
    q: "Do I need to understand AI or tech to do this?",
    a: "Not at all. You don't need to know how AI works. You just need to be able to read, think, and give honest feedback. The training materials explain everything in plain language. If you can use WhatsApp, you can do this.",
  },
  {
    q: "What language do I work in?",
    a: "Most tasks are in English. Some are in Swahili or a mix of both. You can choose task types that match your strongest language. Swahili-language tasks often pay a premium because there's high demand and fewer qualified contributors.",
  },
  {
    q: "What if I rate something 'wrong'?",
    a: "There are quality checks built into the system. If your ratings consistently deviate from expected standards, you'll be flagged for a review — not punished immediately. Most people adjust quickly after feedback. It's a learning process, not a test you fail once.",
  },
  {
    q: "Can I do AI training alongside chatting tasks?",
    a: "Yes. Many team members mix tracks depending on the day. Some prefer AI training for its async flexibility, chatting for its scheduled consistency. You're not locked into one.",
  },
  {
    q: "How is this different from random survey apps?",
    a: "Survey apps pay KES 20–50 per task. AI training tasks pay KES 80–400 per task depending on complexity. The work is also more consistent — there's a queue, not a trickle. And your contributions actually matter: real AI products use this data.",
  },
];

export default function AITrainingPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <main className="bg-gray-50 min-h-screen">

      {/* ── Hero ── */}
      <section className="relative pt-24 pb-20 overflow-hidden bg-linear-to-br from-violet-50 via-white to-indigo-50">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-600 mb-8 transition">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                Back to Chat254
              </Link>
              <div className="inline-flex items-center gap-2 bg-violet-50 border border-violet-100 text-violet-600 text-xs font-bold px-3 py-1.5 rounded-full mb-6 uppercase tracking-wider">
                🤖 AI Training
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight tracking-tight mb-5">
                The world&apos;s biggest companies<br />
                <span className="text-violet-500">need your brain.</span>
              </h1>
              <p className="text-lg text-gray-500 leading-relaxed mb-8 max-w-lg">
                AI systems learn from human feedback. Your opinions, your language, your judgment — that&apos;s the raw material. And it&apos;s in high demand. You don&apos;t need a degree. You need to think clearly and communicate honestly.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setModalOpen(true)}
                  className="bg-violet-500 hover:bg-violet-600 text-white font-bold text-base px-8 py-4 rounded-full shadow-lg shadow-violet-200 transition-all hover:scale-105 active:scale-95"
                >
                  Apply for This Track →
                </button>
              </div>
              <div className="mt-10 flex gap-8">
                {[
                  { v: "Async", l: "Work anytime" },
                  { v: "No shifts", l: "Task-based" },
                  { v: "KES 80–400", l: "Per task" },
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
                src="/earn/ai-training-hero.jpg"
                fallback="https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&h=840&fit=crop&auto=format"
                alt="Person working on AI training task"
                fill priority className="object-cover" sizes="45vw"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-3">
                <p className="text-xs text-gray-400 mb-1">High demand right now</p>
                <p className="text-sm font-bold text-gray-900">Swahili-language tasks pay a premium — few people qualify</p>
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
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2 mb-4">Four types of tasks. All doable from your phone.</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5 mb-10">
            {TASK_TYPES.map(t => (
              <div key={t.title} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <div className="text-2xl mb-3">{t.icon}</div>
                <h3 className="font-bold text-gray-900 text-base mb-2">{t.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{t.body}</p>
              </div>
            ))}
          </div>
          <div className="bg-violet-50 border border-violet-100 rounded-2xl p-6 flex gap-4 items-start">
            <span className="text-2xl shrink-0">🌍</span>
            <div>
              <p className="font-bold text-gray-900 mb-1">Your Kenyan perspective is the product</p>
              <p className="text-sm text-gray-600 leading-relaxed">Most AI training data comes from Western users. Companies actively seek African voices — how Kenyans phrase things, what feels natural vs. robotic in Swahili, how we express frustration or humour. Your cultural lens is an asset, not a limitation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="text-violet-500 font-semibold text-sm uppercase tracking-wider">How it works</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2">No schedules. Just tasks.</h2>
          </div>
          <div className="space-y-5">
            {HOW_IT_WORKS.map((step, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex gap-5 items-start">
                <div className="shrink-0 w-12 h-12 rounded-2xl bg-violet-500 text-white font-extrabold text-sm flex items-center justify-center">
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
            <span className="text-violet-500 font-semibold text-sm uppercase tracking-wider">Earning potential</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2 mb-3">It adds up fast when you&apos;re consistent.</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Task payouts range from KES 80 to KES 400 depending on complexity. The more tasks you complete, the higher your monthly total.</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-4 mb-14">
            {EARNINGS.map((tier, i) => (
              <div key={i} className={`rounded-2xl p-6 border text-center ${i === 2 ? "bg-violet-500 border-violet-400 text-white" : "bg-gray-50 border-gray-100"}`}>
                <p className={`text-xs font-semibold uppercase tracking-wider mb-3 ${i === 2 ? "text-violet-200" : "text-gray-400"}`}>{tier.label}</p>
                <p className={`text-2xl font-extrabold mb-1 ${i === 2 ? "text-white" : "text-gray-900"}`}>{tier.range}</p>
                <p className={`text-xs ${i === 2 ? "text-violet-200" : "text-gray-400"}`}>{tier.note}</p>
                {i === 2 && <p className="text-xs text-violet-100 mt-2">Includes team commission income</p>}
              </div>
            ))}
          </div>
          <h3 className="text-xl font-extrabold text-gray-900 mb-5">From people already doing it</h3>
          <div className="grid sm:grid-cols-2 gap-5">
            {EARNER_STORIES.map(s => (
              <div key={s.name} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative w-11 h-11 rounded-full overflow-hidden bg-violet-100 shrink-0">
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
            <span className="text-violet-500 font-semibold text-sm uppercase tracking-wider">Real talk</span>
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
          <div className="absolute inset-0 bg-linear-to-br from-violet-600/90 to-indigo-600/90" />
        </div>
        <div className="relative z-10 max-w-xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">Help build the future. Get paid for it.</h2>
          <p className="text-violet-100 mb-8 leading-relaxed">Apply now. Tasks are available 24/7. Start earning this week.</p>
          <button onClick={() => setModalOpen(true)}
            className="inline-block bg-white text-violet-500 font-bold text-base px-10 py-4 rounded-full shadow-xl hover:scale-105 active:scale-95 transition-all">
            Apply for AI Training →
          </button>
        </div>
      </section>

      <a href="https://wa.me/254700000000?text=Hi%2C%20I%27d%20like%20to%20apply%20for%20AI%20training%20on%20Chat254."
        target="_blank" rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110"
        aria-label="Chat on WhatsApp">
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
      </a>

      {modalOpen && <ApplicationModal onClose={() => setModalOpen(false)} track="AI Training" />}
    </main>
  );
}