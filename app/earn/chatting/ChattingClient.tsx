"use client";

import { ApplicationModal, SuccessState } from "@/app/components";
import Requirements from "@/app/components/Requirements";
import ProfilesGrid from "@/app/components/ProfilesGrid";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// ─── SmartImage ───────────────────────────────────────────────────────────────
// Fixed: alt is no longer hardcoded to "" — it passes through correctly now.
// Every image on this page has a descriptive alt for SEO and accessibility.

function SmartImage({
  src, fallback, alt, fill, width, height, className, sizes, priority,
}: {
  src: string; fallback: string; alt: string; fill?: boolean;
  width?: number; height?: number; className?: string; sizes?: string; priority?: boolean;
}) {
  const [imgSrc, setImgSrc] = useState(src);
  const sharedProps = {
    src: imgSrc, alt, className, sizes, priority,
    onError: () => setImgSrc(fallback),
  };
  return fill
    ? <Image {...sharedProps} fill unoptimized />
    : <Image {...sharedProps} width={width ?? 400} height={height ?? 300} unoptimized />;
}

// ─── Accordion ────────────────────────────────────────────────────────────────

function ObjAccordion({ q, a }: { q: string; a: string | React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left transition-colors hover:bg-gray-50"
      >
        <span className="font-semibold text-gray-900 text-sm sm:text-base pr-4">{q}</span>
        <span className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 ${open ? "bg-rose-500 text-white rotate-45" : "bg-gray-100 text-gray-500"}`}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </span>
      </button>
      {open && (
        <div className="px-5 pb-5 animate-in fade-in slide-in-from-top-1 duration-200">
          <div className="text-gray-500 text-sm leading-relaxed">{a}</div>
        </div>
      )}
    </div>
  );
}

// ─── Geo content map ──────────────────────────────────────────────────────────

interface GeoContent {
  wallet: string;
  minWithdrawal: string;
  locationContext: string;
  earnings: { label: string; range: string; note: string }[];
  stories: {
    name: string; location: string; earned: string;
    story: string; initials: string; img: string; fallback: string;
  }[];
  objections: { q: string; a: string }[];
}

const GEO_CONTENT: Record<"kenya" | "uganda" | "ghana", GeoContent> = {
  kenya: {
    wallet: "M-Pesa",
    minWithdrawal: "KES 500",
    locationContext: "a matatu stage, or a café in Westlands",
    earnings: [
      { label: "Part-time (2–3 hrs/day)", range: "KES 6,000 – 12,000", note: "/ month" },
      { label: "Full shifts (5–6 hrs/day)", range: "KES 18,000 – 28,000", note: "/ month" },
      { label: "Full shifts + team income", range: "KES 35,000 – 60,000+", note: "/ month" },
    ],
    stories: [
      {
        name: "Zawadi T.", location: "Nairobi, Embakasi", earned: "KES 22,500 / month",
        story: "I work the evening shift — 6pm to 11pm — while my husband watches the kids. By the time I sleep, M-Pesa has moved. It took me three days to figure out the platform. Now it's just routine.",
        initials: "ZT", img: "/testimonials/zawadi.jpg",
        fallback: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&h=200&fit=crop&crop=face&auto=format",
      },
      {
        name: "Kelvin O.", location: "Kisumu", earned: "KES 41,000 / month",
        story: "I started solo. After two months I brought in three friends. Now their shifts contribute to my team income on top of mine. That's where the real number comes from.",
        initials: "KO", img: "/testimonials/kelvin.jpg",
        fallback: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=200&h=200&fit=crop&crop=face&auto=format",
      },
    ],
    objections: [
      {
        q: "How is this different from other 'chat and earn' scams in Kenya?",
        a: "Most scam platforms ask for money before you earn — an activation fee, a registration charge, or a 'processing deposit.' We never ask for money. You apply free, you get activated free, you earn from real tasks, and you withdraw to M-Pesa whenever you want. If anyone claiming to be VelloEarn ever asks for payment before you've earned it, that is a scam. Report it to us immediately.",
      },
      {
        q: "When exactly does M-Pesa come?",
        a: "You request a withdrawal from your dashboard. Minimum is KES 500. Most payments clear within 5–30 minutes depending on M-Pesa traffic. You'll see it in your M-Pesa messages directly.",
      },
      {
        q: "Can I really earn KES 35,000+ per month?",
        a: "Yes — but not from chatting alone. The bigger earners combine shift income with team commissions. When you bring active people onto the platform and they earn, you earn a percentage of their output too. That's where the ceiling goes away.",
      },
    ],
  },
  uganda: {
    wallet: "MTN MoMo / Airtel Money",
    minWithdrawal: "UGX 15,000",
    locationContext: "a taxi park, or a café in Kampala",
    earnings: [
      { label: "Part-time (2–3 hrs/day)", range: "UGX 180,000 – 360,000", note: "/ month" },
      { label: "Full shifts (5–6 hrs/day)", range: "UGX 540,000 – 840,000", note: "/ month" },
      { label: "Full shifts + team income", range: "UGX 1,000,000 – 1,800,000+", note: "/ month" },
    ],
    stories: [
      {
        name: "Florence N.", location: "Kampala, Ntinda", earned: "UGX 680,000 / month",
        story: "I manage the evening shifts from my phone after university lectures. The mobile money payouts clear to my MTN line before midnight. It completely transformed my pocket money.",
        initials: "FN", img: "/testimonials/florence.jpg",
        fallback: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&h=200&fit=crop&crop=face&auto=format",
      },
      {
        name: "Derrick B.", location: "Gulu", earned: "UGX 1,200,000 / month",
        story: "Building a small network of remote task friends here amplified my balance significantly. VelloEarn pays commissions reliably when your referred group finishes assignments.",
        initials: "DB", img: "/testimonials/derrick.jpg",
        fallback: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face&auto=format",
      },
    ],
    objections: [
      {
        q: "How is this different from other earn-online scams in Uganda?",
        a: "We charge nothing upfront. No registration fee, no activation charge. You get verified via WhatsApp and withdraw real earnings directly to your MTN MoMo or Airtel Money number.",
      },
      {
        q: "When exactly does Mobile Money arrive?",
        a: "Once you initiate a withdrawal, payments process to your MTN MoMo or Airtel line within 5–30 minutes. You'll receive a mobile money message confirming the transfer.",
      },
      {
        q: "Can I really clear over 1 million UGX monthly?",
        a: "Yes. Top earners combine their own shift income with referral commissions from their team. Consistent chatters who build a small team regularly hit this figure.",
      },
    ],
  },
  ghana: {
    wallet: "MTN MoMo / Telecel / Vodafone",
    minWithdrawal: "GHS 50",
    locationContext: "a trotro station, or a spot in Osu",
    earnings: [
      { label: "Part-time (2–3 hrs/day)", range: "GHS 700 – 1,400", note: "/ month" },
      { label: "Full shifts (5–6 hrs/day)", range: "GHS 2,100 – 3,200", note: "/ month" },
      { label: "Full shifts + team income", range: "GHS 4,000 – 7,000+", note: "/ month" },
    ],
    stories: [
      {
        name: "Abena A.", location: "Accra, Madina", earned: "GHS 2,450 / month",
        story: "The shift structure fits perfectly with my side business routines. I trigger daily payouts directly to my Telecel Cash account. Consistent and reliable.",
        initials: "AA", img: "/testimonials/abena.jpg",
        fallback: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face&auto=format",
      },
      {
        name: "Emmanuel K.", location: "Kumasi", earned: "GHS 4,800 / month",
        story: "I onboarded four course mates. As they complete tasks, my referral bonuses stack into my wallet. Structured and predictable income.",
        initials: "EK", img: "/testimonials/emmanuel.jpg",
        fallback: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face&auto=format",
      },
    ],
    objections: [
      {
        q: "How is this different from other earn-online scams in Ghana?",
        a: "No upfront payments, ever. You join free, complete real tasks, and withdraw to your MTN MoMo, Telecel, or Vodafone wallet. No activation fees, no processing charges.",
      },
      {
        q: "When exactly does my wallet update?",
        a: "Withdrawals process to your registered mobile wallet within 30 minutes. You'll receive a wallet notification confirming the transfer.",
      },
      {
        q: "Can I really secure GHS 4,000+ every month?",
        a: "Yes — consistent chatters who build a team of active referrals regularly reach this figure. Your base shift income combined with referral commission is where the ceiling disappears.",
      },
    ],
  },
};

const BASE_OBJECTIONS = [
  {
    q: "Do I need experience in customer service?",
    a: "No. Every channel comes with a briefing document, approved response templates, and a support channel where you can ask questions. If you can hold a decent conversation on WhatsApp, you can do this.",
  },
  {
    q: "What if I miss a shift or can't show up?",
    a: "Life happens. You're not fired for missing a shift — you simply don't earn for that time. There's no salary at risk. Consistent earners show up consistently. That's the only rule.",
  },
];

const TASK_TYPES = [
  {
    icon: "🎧",
    title: "Customer support chat",
    body: "Answer questions for brands via their web or app chat. 'Where's my order?' 'How do I reset my account?' You get approved answers — you type them. Fast, structured, repeatable.",
  },
  {
    icon: "🛡️",
    title: "Community moderation",
    body: "Keep forums, groups, and comment sections on-brand and clean. You follow a moderation guide. Consistent tasks, consistent pay, no improvisation required.",
  },
  {
    icon: "💬",
    title: "Engagement tasks",
    body: "Respond to comments, generate activity, support social presence for brands. Structured tasks assigned per shift — not random posting.",
  },
];

// ─── Main component ───────────────────────────────────────────────────────────

interface ChattingClientProps {
  countryTarget: "kenya" | "uganda" | "ghana";
}

export default function ChattingClient({ countryTarget }: ChattingClientProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [successData, setSuccessData] = useState<{ name: string; whatsapp: string } | null>(null);

  const geo = GEO_CONTENT[countryTarget];

  const fullObjections = [
    geo.objections[0],       // scam differentiator — most important, goes first
    BASE_OBJECTIONS[0],      // experience question
    BASE_OBJECTIONS[1],      // missed shifts
    geo.objections[1],       // payout timing
    geo.objections[2],       // earnings ceiling
  ];

  const HOW_IT_WORKS = [
    {
      step: "01",
      title: "Apply free — 2 minutes",
      body: "Submit your name and WhatsApp number. No CV, no interview, no fee. Our team reviews and responds within 24 hours.",
    },
    {
      step: "02",
      title: "Get activated on WhatsApp",
      body: "Activation instructions come directly to your WhatsApp. You get dashboard access, your task briefings, and your earning track.",
    },
    {
      step: "03",
      title: "Claim a shift and start",
      body: "Log into your dashboard, claim a shift — morning, afternoon, or evening. You decide how many hours. Scripts and templates are provided.",
    },
    {
      step: "04",
      title: `Earn and withdraw to ${geo.wallet}`,
      body: `Every completed shift adds to your balance. Withdraw to ${geo.wallet} any time — minimum ${geo.minWithdrawal}, no waiting period.`,
    },
  ];

  return (
    <main className="bg-gray-50 min-h-screen">

      {/* ── 1. HERO ─────────────────────────────────────────────────────────── */}
      {/*
        SEO NOTE:
        H1 now contains the primary keyword: "chat with foreigners in Kenya"
        Sub-heading answers the two questions a skeptic has immediately:
        what is the work, and how do I get paid.
        Secondary CTA links to the scam blog post — visitors who aren't
        ready to apply get funneled to high-intent content instead of lost.
      */}
      <section className="relative pt-24 pb-20 overflow-hidden bg-gradient-to-br from-rose-50 via-white to-orange-50">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-rose-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative">
          <div className="grid lg:grid-cols-2 gap-14 items-center">

            <div>
              <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-600 mb-8 transition">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to VelloEarn
              </Link>

              <div className="inline-flex items-center gap-2 bg-rose-50 border border-rose-100 text-rose-600 text-xs font-bold px-3 py-1.5 rounded-full mb-6 uppercase tracking-wider">
                💬 Remote Chatting · Most Popular
              </div>

              <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight tracking-tight mb-5">
                Get paid to chat with foreigners —{" "}
                <span className="text-rose-500">from Kenya.</span>
              </h1>

              <p className="text-lg text-gray-500 leading-relaxed mb-3 max-w-lg">
                Real businesses need real humans to handle their conversations —
                customer queries, community moderation, engagement tasks. You pick
                your hours. We supply the work. {geo.wallet} pays you.
              </p>
              <p className="text-base text-gray-400 mb-8 max-w-lg">
                Free to join. No experience needed. Your first shift could be today.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-10">
                <button
                  onClick={() => setModalOpen(true)}
                  className="bg-rose-500 hover:bg-rose-600 text-white font-bold text-base px-8 py-4 rounded-full shadow-lg shadow-rose-200 transition-all hover:scale-105 active:scale-95"
                >
                  Apply for This Track →
                </button>
                <Link
                  href="/blog/is-ai-training-a-scam-kenya"
                  className="bg-white hover:bg-gray-50 text-gray-600 font-semibold text-base px-8 py-4 rounded-full border border-gray-200 shadow-sm transition-all hover:scale-105 active:scale-95 text-center"
                >
                  Is this legit? Read first →
                </Link>
              </div>

              <div className="flex gap-8">
                {[
                  { v: "2–6 hrs", l: "Flexible daily hours" },
                  { v: geo.minWithdrawal, l: "Min withdrawal" },
                  { v: "Daily", l: "Tasks available" },
                ].map((s) => (
                  <div key={s.l}>
                    <div className="text-lg font-extrabold text-gray-900">{s.v}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative hidden lg:block h-[420px] rounded-3xl overflow-hidden shadow-2xl">
              <SmartImage
                src="/earn/chatting.jpg"
                fallback="https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=800&h=840&fit=crop&auto=format"
                alt="Young Kenyan woman earning money by chatting online from her phone"
                fill priority className="object-cover" sizes="45vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-3">
                <p className="text-xs text-gray-400 mb-1">Most popular earning method</p>
                <p className="text-sm font-bold text-gray-900">Over 60% of our team earns through chatting</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 2. WHAT THE WORK IS ─────────────────────────────────────────────── */}
      {/*
        SEO NOTE:
        H2 "What remote chatting work actually involves" targets the query
        "what is remote chatting work Kenya" — a real long-tail search.
        Specific task descriptions make this section comprehensive enough
        to satisfy that intent and reduce bounce.
      */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-rose-500 font-semibold text-sm uppercase tracking-wider">
              What it actually is
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2 mb-4">
              What remote chatting work actually involves
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto">
              Not random chatting. Structured tasks with briefings, templates, and clear pay rates.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-5 mb-10">
            {TASK_TYPES.map((c) => (
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
              <p className="text-sm text-gray-600 leading-relaxed">
                No laptop needed. No office. No commute. Log in, claim a shift, complete
                tasks, log out. You can do this from your house, {geo.locationContext}.
                The platform is fully mobile.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. PROFILES GRID ────────────────────────────────────────────────── */}
      {/*
        SEO NOTE:
        ProfilesGrid is reused from the homepage — no code duplication.
        This is contextually honest here: real people ARE waiting to chat.
        The FOMO is legitimate on this page. On the homepage it was misleading.
        It also adds a visual break between the task description and how-it-works,
        which keeps scroll depth high — a positive experience signal to Google.
      */}
      <ProfilesGrid onApplyClick={() => setModalOpen(true)} />

      {/* ── 4. HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="text-rose-500 font-semibold text-sm uppercase tracking-wider">
              How it works
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2 mb-3">
              From curious to earning in one day
            </h2>
            <p className="text-gray-500">Four steps. No tech skills. No startup costs.</p>
          </div>

          <div className="space-y-5">
            {HOW_IT_WORKS.map((step) => (
              <div key={step.step} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex gap-5 items-start">
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

      {/* ── 5. EARNINGS ─────────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-rose-500 font-semibold text-sm uppercase tracking-wider">
              Earning potential
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2 mb-3">
              Real numbers. No fluff.
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Based on actual team earnings. What you make depends on how many
              shifts you claim and whether you build a team.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 mb-10">
            {geo.earnings.map((tier, i) => (
              <div
                key={i}
                className={`rounded-2xl p-6 border text-center ${
                  i === 2
                    ? "bg-rose-500 border-rose-400 text-white"
                    : "bg-gray-50 border-gray-100"
                }`}
              >
                <p className={`text-xs font-semibold uppercase tracking-wider mb-3 ${i === 2 ? "text-rose-200" : "text-gray-400"}`}>
                  {tier.label}
                </p>
                <p className={`text-2xl font-extrabold mb-1 ${i === 2 ? "text-white" : "text-gray-900"}`}>
                  {tier.range}
                </p>
                <p className={`text-xs ${i === 2 ? "text-rose-200" : "text-gray-400"}`}>{tier.note}</p>
                {i === 2 && <p className="text-xs text-rose-100 mt-2">Includes team commission income</p>}
              </div>
            ))}
          </div>

          {/*
            SEO NOTE:
            Comparison table targets "chatting vs AI training Kenya" and
            "best way to earn online Kenya" — comparison intent searchers
            land here and find a complete answer. Comprehensive pages
            rank higher than narrow ones for the same effort.
          */}
          <div className="bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden mb-10">
            <div className="px-6 py-4 border-b border-gray-100">
              <h3 className="font-bold text-gray-900">How chatting compares to other methods</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left px-6 py-3 text-gray-500 font-medium">Method</th>
                    <th className="text-left px-6 py-3 text-gray-500 font-medium">Monthly (consistent)</th>
                    <th className="text-left px-6 py-3 text-gray-500 font-medium">Skill needed</th>
                    <th className="text-left px-6 py-3 text-gray-500 font-medium">Ceiling</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { method: "💬 Chatting", monthly: "KES 6K – 28K", skill: "Low", ceiling: "High", highlight: true },
                    { method: "🤖 AI Training", monthly: "KES 10K – 20K", skill: "Low–Medium", ceiling: "Medium", highlight: false },
                    { method: "📋 Surveys", monthly: "KES 2K – 6K", skill: "Very low", ceiling: "Low", highlight: false },
                    { method: "🌍 Swahili Teaching", monthly: "KES 6K – 15K", skill: "Native speaker", ceiling: "Medium", highlight: false },
                  ].map((row) => (
                    <tr key={row.method} className={`border-b border-gray-50 ${row.highlight ? "bg-rose-50" : ""}`}>
                      <td className={`px-6 py-3 font-medium ${row.highlight ? "text-rose-700" : "text-gray-900"}`}>{row.method}</td>
                      <td className="px-6 py-3 text-gray-600">{row.monthly}</td>
                      <td className="px-6 py-3 text-gray-600">{row.skill}</td>
                      <td className="px-6 py-3 text-gray-600">{row.ceiling}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <Requirements onApply={() => setModalOpen(true)} />

          <h3 className="text-xl font-extrabold text-gray-900 mb-5 mt-14">From people already doing it</h3>
          <div className="grid sm:grid-cols-2 gap-5">
            {geo.stories.map((s) => (
              <div key={s.name} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative w-11 h-11 rounded-full overflow-hidden bg-rose-100 shrink-0">
                    <SmartImage
                      src={s.img} fallback={s.fallback}
                      alt={`${s.name} — VelloEarn earner from ${s.location}`}
                      fill className="object-cover" sizes="44px"
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

      {/* ── 6. OBJECTIONS ───────────────────────────────────────────────────── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-rose-500 font-semibold text-sm uppercase tracking-wider">
              Real talk
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2 mb-3">
              The questions you&apos;re already thinking
            </h2>
          </div>
          <div className="space-y-4">
            {fullObjections.map((o, i) => (
              <ObjAccordion key={i} q={o.q} a={o.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. CROSS-FUNNEL BRIDGE ──────────────────────────────────────────── */}
      {/*
        SEO NOTE:
        Visitors who aren't ready to apply get funneled laterally to other
        earning pages rather than bouncing back to Google. This keeps time-on-site
        high and passes internal authority to /earn/ai-training and the blog.
        Every internal link here is a deliberate authority transfer.
      */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-6 text-center">
            Also earning on VelloEarn
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              {
                icon: "🤖",
                title: "AI Training Tasks",
                desc: "Rate AI responses, label data, test chatbots. No tech background needed.",
                href: "/earn/ai-training",
                tag: "Fast growing",
              },
              {
                icon: "🌍",
                title: "Teach Swahili",
                desc: "Native Swahili speakers are in global demand. Teach, translate, transcribe.",
                href: "/earn/swahili-teaching",
                tag: "Kenya advantage",
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
                className="group bg-gray-50 hover:bg-rose-50 border border-gray-100 hover:border-rose-200 rounded-2xl p-5 transition-all duration-200"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">{m.icon}</span>
                  <span className="text-xs bg-white text-gray-500 font-medium px-2 py-0.5 rounded-full border border-gray-200">
                    {m.tag}
                  </span>
                </div>
                <h3 className="font-bold text-gray-900 text-sm mb-1 group-hover:text-rose-600 transition-colors">
                  {m.title}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">{m.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. FINAL CTA ────────────────────────────────────────────────────── */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0">
          <SmartImage
            src="/cta/background.jpg"
            fallback="https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1600&h=600&fit=crop&auto=format"
            alt="VelloEarn remote chatting team earning from their phones in Kenya"
            fill className="object-cover" sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-rose-600/90 to-pink-600/90" />
        </div>
        <div className="relative z-10 max-w-xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Ready to start chatting for money?
          </h2>
          <p className="text-rose-100 mb-8 leading-relaxed">
            Apply now. Get approved via WhatsApp. Your first shift could be today.
          </p>
          <button
            onClick={() => setModalOpen(true)}
            className="inline-block bg-white text-rose-500 font-bold text-base px-10 py-4 rounded-full shadow-xl hover:scale-105 active:scale-95 transition-all"
          >
            Apply for Remote Chatting →
          </button>
          <p className="text-rose-200 text-xs mt-4">
            Free to join · No experience needed · {geo.wallet} payouts
          </p>
        </div>
      </section>

      {/* ── Modals ──────────────────────────────────────────────────────────── */}
      {modalOpen && (
        <ApplicationModal
          onClose={() => setModalOpen(false)}
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