"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ApplicationModal, SuccessState } from "@/app/components";
import { whatsappNumber } from "@/lib/constants";

// --- Components ---

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
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-5 py-4 text-left transition-colors hover:bg-gray-50">
        <span className="font-semibold text-gray-900 text-sm sm:text-base pr-4">{q}</span>
        <span className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 ${open ? "bg-rose-500 text-white rotate-45" : "bg-gray-100 text-gray-500"}`}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
        </span>
      </button>
      {open && <div className="px-5 pb-5 animate-in fade-in slide-in-from-top-1 duration-200"><p className="text-gray-500 text-sm leading-relaxed">{a}</p></div>}
    </div>
  );
}

// --- Data ---

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "You apply & get approved",
    body: "Fill in a short form. Our team reviews it, and if you're a fit, you get a WhatsApp message with your activation steps. Takes less than 24 hours.",
  },
  {
    step: "02",
    title: "You pick your shift",
    body: "Log into the dashboard and claim a shift — morning, afternoon, or evening. You decide how many hours you work. No minimums. No pressure.",
  },
  {
    step: "03",
    title: "You handle conversations",
    body: "You're assigned to a channel — could be customer support, community moderation, or engagement tasks. Scripts, templates, and training are provided.",
  },
  {
    step: "04",
    title: "Your earnings stack up",
    body: "Every shift completed adds to your balance. You can request an M-Pesa withdrawal anytime. Most land in minutes.",
  },
];

const EARNINGS = [
  { label: "Part-time (2–3 hrs/day)", range: "KES 6,000 – 12,000", note: "/ month" },
  { label: "Full shifts (5–6 hrs/day)", range: "KES 18,000 – 28,000", note: "/ month" },
  { label: "Full shifts + team income", range: "KES 35,000 – 60,000+", note: "/ month" },
];

const EARNER_STORIES = [
  {
    name: "Zawadi T.",
    location: "Nairobi, Embakasi",
    earned: "KES 22,500 / month",
    story: "I work the evening shift — 6pm to 11pm — while my husband watches the kids. By the time I sleep, M-Pesa has moved. It took me three days to figure out the platform. Now it's just routine.",
    initials: "ZT",
    img: "/testimonials/zawadi.jpg",
    fallback: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&h=200&fit=crop&crop=face&auto=format",
  },
  {
    name: "Kelvin O.",
    location: "Kisumu",
    earned: "KES 41,000 / month",
    story: "I started solo. After two months I brought in three friends. Now their shifts contribute to my team income on top of mine. That's where the real number comes from.",
    initials: "KO",
    img: "/testimonials/kelvin.jpg",
    fallback: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=200&h=200&fit=crop&crop=face&auto=format",
  },
];

const OBJECTIONS = [
  {
    q: "Is this just another scam?",
    a: "We get why you'd ask — the internet is full of fake 'earn online' schemes. What's different here: we don't ask you for money upfront to start earning. The application is free. Activation details come after you're accepted. You earn from real tasks, tracked in a real dashboard, paid to your real M-Pesa number.",
  },
  {
    q: "Do I need experience in customer service?",
    a: "No. Every channel you're assigned to comes with a briefing document, approved response templates, and a support channel where you can ask questions. If you can hold a decent conversation on WhatsApp, you can do this.",
  },
  {
    q: "What if I miss a shift or can't show up?",
    a: "Life happens. You're not fired for missing one shift. You simply don't earn for that time. There's no salary at risk — just the opportunity cost of not working. Consistent earners show up consistently. That's the only rule.",
  },
  {
    q: "When exactly does M-Pesa come?",
    a: "You request a withdrawal from your dashboard. The minimum withdrawal is KES 500. Once requested, most payments clear within 5–30 minutes depending on M-Pesa traffic. You'll see it in your Mpesa messages, not just the app.",
  },
  {
    q: "Can I really earn KES 35K+ per month?",
    a: "Yes — but not just from chatting. The bigger earners combine their shift income with team commissions. When you bring someone onto the platform and they become active, you earn a percentage of their output. That's where the ceiling goes away.",
  },
];

// --- Main Page ---

export default function ChattingClient() {
  const [modalOpen, setModalOpen] = useState(false);
  const [successData, setSuccessData] = useState<{ name: string; whatsapp: string } | null>(null);

  const handleSuccess = (data: { name: string; whatsapp: string }) => {
    setModalOpen(false);
    setSuccessData(data);
  };

  return (
    <main className="bg-gray-50 min-h-screen">

      {/* ── Hero ── */}
      <section className="relative pt-24 pb-20 overflow-hidden bg-gradient-to-br from-rose-50 via-white to-orange-50">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-rose-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-600 mb-8 transition">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                Back to VelloEarn
              </Link>
              <div className="inline-flex items-center gap-2 bg-rose-50 border border-rose-100 text-rose-600 text-xs font-bold px-3 py-1.5 rounded-full mb-6 uppercase tracking-wider">
                💬 Remote Chatting
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight tracking-tight mb-5">
                Get paid to chat.<br />
                <span className="text-rose-500">From your phone.</span>
              </h1>
              <p className="text-lg text-gray-500 leading-relaxed mb-8 max-w-lg">
                Real businesses need real humans to handle their conversations — customer queries, community moderation, engagement tasks. That&apos;s you. You pick your hours, we supply the work.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setModalOpen(true)}
                  className="bg-rose-500 hover:bg-rose-600 text-white font-bold text-base px-8 py-4 rounded-full shadow-lg shadow-rose-200 transition-all hover:scale-105 active:scale-95"
                >
                  Apply for This Track →
                </button>
              </div>
              <div className="mt-10 flex gap-8">
                {[
                  { v: "2–6 hrs", l: "Flexible daily hours" },
                  { v: "KES 500", l: "Min withdrawal" },
                  { v: "Daily", l: "Tasks available" },
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
                src="/earn/chatting-hero.jpg"
                fallback="https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=800&h=840&fit=crop&auto=format"
                alt="Person chatting on phone"
                fill priority className="object-cover" sizes="45vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-3">
                <p className="text-xs text-gray-400 mb-1">Most popular track</p>
                <p className="text-sm font-bold text-gray-900">Over 60% of our team earns through chatting</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── What is remote chatting ── */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-rose-500 font-semibold text-sm uppercase tracking-wider">What it actually is</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2 mb-4">Not what you think. Better.</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-5 mb-12">
            {[
              { icon: "🎧", title: "Customer support chat", body: "Answering questions for brands via their web or app chat. Think: 'Where's my order?' 'How do I reset my account?' You get approved answers. You type them." },
              { icon: "🛡️", title: "Community moderation", body: "Keeping forums, groups, and comment sections on-brand and clean. You follow a moderation guide. Fast, repetitive, well-paid." },
              { icon: "💬", title: "Engagement tasks", body: "Responding to comments, generating activity, and supporting social presence. Structured tasks, not random posting." },
            ].map(c => (
              <div key={c.title} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <div className="text-2xl mb-3">{c.icon}</div>
                <h3 className="font-bold text-gray-900 text-base mb-2">{c.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{c.body}</p>
              </div>
            ))}
          </div>
          <div className="bg-rose-50 border border-rose-100 rounded-2xl p-6 flex gap-4 items-start">
            <span className="text-2xl shrink-0">📱</span>
            <div>
              <p className="font-bold text-gray-900 mb-1">Everything runs on your phone</p>
              <p className="text-sm text-gray-600 leading-relaxed">No laptop needed. No office. No commute. You log in, claim a shift, complete tasks, log out. You can do this from your house, a matatu stage, or a café in Westlands. The platform is fully mobile.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="text-rose-500 font-semibold text-sm uppercase tracking-wider">How it works</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2">Four steps. That&apos;s it.</h2>
          </div>
          <div className="space-y-5">
            {HOW_IT_WORKS.map((step, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex gap-5 items-start">
                <div className="shrink-0 w-12 h-12 rounded-2xl bg-rose-500 text-white font-extrabold text-sm flex items-center justify-center">
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
            <span className="text-rose-500 font-semibold text-sm uppercase tracking-wider">Earning potential</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2 mb-3">Real numbers. No fluff.</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Based on actual team earnings. What you make depends on how many shifts you claim and whether you build a team.</p>
          </div>

          {/* Earnings tiers */}
          <div className="grid sm:grid-cols-3 gap-4 mb-14">
            {EARNINGS.map((tier, i) => (
              <div key={i} className={`rounded-2xl p-6 border text-center ${i === 2 ? "bg-rose-500 border-rose-400 text-white" : "bg-gray-50 border-gray-100"}`}>
                <p className={`text-xs font-semibold uppercase tracking-wider mb-3 ${i === 2 ? "text-rose-200" : "text-gray-400"}`}>{tier.label}</p>
                <p className={`text-2xl font-extrabold mb-1 ${i === 2 ? "text-white" : "text-gray-900"}`}>{tier.range}</p>
                <p className={`text-xs ${i === 2 ? "text-rose-200" : "text-gray-400"}`}>{tier.note}</p>
                {i === 2 && <p className="text-xs text-rose-100 mt-2">Includes team commission income</p>}
              </div>
            ))}
          </div>

          {/* Earner stories */}
          <h3 className="text-xl font-extrabold text-gray-900 mb-5">From people already doing it</h3>
          <div className="grid sm:grid-cols-2 gap-5">
            {EARNER_STORIES.map(s => (
              <div key={s.name} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative w-11 h-11 rounded-full overflow-hidden bg-rose-100 shrink-0">
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
            <span className="text-rose-500 font-semibold text-sm uppercase tracking-wider">Real talk</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2 mb-3">The questions you&apos;re already thinking</h2>
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
            fallback="https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1600&h=600&fit=crop&auto=format"
            alt="background" fill className="object-cover" sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-rose-600/90 to-pink-600/90" />
        </div>
        <div className="relative z-10 max-w-xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">Ready to start chatting for money?</h2>
          <p className="text-rose-100 mb-8 leading-relaxed">Apply now. Get approved via WhatsApp. Your first shift could be today.</p>
          <button
            onClick={() => setModalOpen(true)}
            className="inline-block bg-white text-rose-500 font-bold text-base px-10 py-4 rounded-full shadow-xl hover:scale-105 active:scale-95 transition-all"
          >
            Apply for Remote Chatting →
          </button>
        </div>
      </section>

      {/* WhatsApp FAB */}
      <a href={`https://wa.me/${whatsappNumber}?text=Hi%2C%20I%27d%20like%20to%20apply%20for%20remote%20chatting%20on%20VelloEarn.`}
        target="_blank" rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110"
        aria-label="Chat on WhatsApp"
      >
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
      </a>

      {modalOpen && (
        <ApplicationModal 
          onClose={() => setModalOpen(false)} 
          onSuccess={handleSuccess} 
          track="Remote Chatting" 
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