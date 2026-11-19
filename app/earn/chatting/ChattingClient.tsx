"use client";

import { ProfilesGrid } from "@/app/components";
import Requirements from "@/app/components/Requirements";
import TrainingChannelBanner from "@/app/components/TrainingChannelBanner";
import { VELLOEARN_REGISTER_URL } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// ─── SmartImage ───────────────────────────────────────────────────────────────
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
    minWithdrawal: "KES 0",
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
        a: "VelloEarn charges a one-time registration fee.You apply, get approved, complete real tasks, and withdraw to M-Pesa instantly. No hidden fees, no waiting period, no fake promises. We disclose everything upfront via WhatsApp.",
      },
      {
        q: "When exactly does M-Pesa come?",
        a: "You request a withdrawal from your dashboard. No minimum balance. Most payments clear within 5–30 minutes depending on M-Pesa traffic. You'll see it in your M-Pesa messages directly.",
      },
      {
        q: "Can I really earn KES 35,000+ per month?",
        a: "Yes — but not from chatting alone. The bigger earners combine shift income with team commissions. When you bring active people onto the platform and they earn, you earn a percentage of their output too. That's where the ceiling goes away.",
      },
    ],
  },
  uganda: {
    wallet: "MTN MoMo / Airtel Money",
    minWithdrawal: "UGX 0",
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
        a: "We charge a one-time registration fee. You apply, get verified, and withdraw real earnings directly to your MTN MoMo or Airtel Money number.",
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
    minWithdrawal: "GHS 0",
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
        a: "One-time registration fee. You join free, complete real tasks, and withdraw to your MTN MoMo, Telecel, or Vodafone wallet. No activation fees, no processing charges.",
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
  const geo = GEO_CONTENT[countryTarget];

  const fullObjections = [
    geo.objections[0],
    BASE_OBJECTIONS[0],
    BASE_OBJECTIONS[1],
    geo.objections[1],
    geo.objections[2],
  ];

  const HOW_IT_WORKS = [
    {
      step: "01",
      title: "Apply Now — 2 minutes",
      body: "Submit your name and WhatsApp number. No CV, no interview, no fee. Your account is active immediately.",
    },
    {
      step: "02",
      title: "Browse live profiles",
      body: "See who's online right now. Browse profiles of lonely foreigners from USA, UK, Canada, Europe, and more.",
    },
    {
      step: "03",
      title: "Start chatting",
      body: "Tap any profile and start talking. Every conversation earns you money. No scripts needed — just be yourself.",
    },
    {
      step: "04",
      title: `Withdraw to ${geo.wallet}`,
      body: `Your earnings grow with every chat. Withdraw to ${geo.wallet} anytime — no minimum, no waiting period.`,
    },
  ];

  return (
    <main className="bg-gray-50 min-h-screen">

{/* ── 1. HERO ─────────────────────────────────────────────────────────── */}
<section className="relative pt-12 pb-16 sm:pt-20 sm:pb-20 overflow-hidden bg-gradient-to-br from-rose-50 via-white to-orange-50">
  <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-rose-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
  <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange-200/20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none" />

  <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-8 items-start lg:items-center">

      {/* Left Column - Hero Content */}
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-600 mb-6 sm:mb-8 transition"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to VelloEarn
        </Link>

        <div className="inline-flex items-center gap-2 bg-rose-50 border border-rose-100 text-rose-600 text-xs font-bold px-3 py-1.5 rounded-full mb-6 uppercase tracking-wider">
          💬 Remote Chatting · Most Popular
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight tracking-tight mb-5">
          Get paid to chat with foreigners —{" "}
          <span className="text-rose-500">from your phone.</span>
        </h1>

        <p className="text-base sm:text-lg text-gray-500 leading-relaxed mb-3 max-w-lg">
          Chat with lonely foreigners looking for conversation. Make friends,
          share your culture, and earn money instantly. No experience needed.
        </p>

        <p className="text-sm sm:text-base text-gray-400 mb-8 max-w-lg">
          One-time fee to join · No fees · Instant {geo.wallet} payouts · 50,000+ active chatters
        </p>

        <div className="flex flex-col sm:flex-row gap-3 mb-10">
          <Link
            href={VELLOEARN_REGISTER_URL}
            rel="noopener noreferrer"
            className="bg-rose-500 hover:bg-rose-600 text-white font-bold text-base px-8 py-4 rounded-full shadow-lg shadow-rose-200 transition-all hover:scale-105 active:scale-95 text-center"
          >
            Start Chatting Now — One-time Fee →
          </Link>
          <Link
            href="/blog/is-ai-training-a-scam-kenya"
            className="bg-white hover:bg-gray-50 text-gray-600 font-semibold text-base px-8 py-4 rounded-full border border-gray-200 shadow-sm transition-all hover:scale-105 active:scale-95 text-center"
          >
            Is this legit? Read first →
          </Link>
        </div>

        <div className="flex gap-8">
          {[
            { v: "24/7", l: "Chat anytime" },
            { v: "No minimum", l: "Withdrawal" },
            { v: "Easy", l: "To join" },
          ].map((s) => (
            <div key={s.l}>
              <div className="text-lg font-extrabold text-gray-900">{s.v}</div>
              <div className="text-xs text-gray-400 mt-0.5">{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Column - Hero Image Collage */}
      <div className="mt-8 lg:mt-0 relative hidden lg:block h-[440px]">
        {/* Main image */}
        <div className="absolute top-0 right-0 w-[280px] h-[360px] rounded-3xl overflow-hidden shadow-2xl shadow-rose-200/50 rotate-2">
          <Image
            src="https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?w=600&h=800&fit=crop&q=80"
            alt="Person chatting on their phone from home"
            fill
            className="object-cover"
            sizes="280px"
            priority
          />
        </div>

        {/* Secondary image */}
        <div className="absolute bottom-0 left-0 w-[240px] h-[280px] rounded-3xl overflow-hidden shadow-2xl shadow-rose-200/50 -rotate-3 border-4 border-white">
          <Image
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&h=600&fit=crop&q=80"
            alt="Someone having a conversation on their phone"
            fill
            className="object-cover"
            sizes="240px"
            priority
          />
        </div>

        {/* Floating live stat card */}
        <div className="absolute bottom-16 right-4 bg-white rounded-2xl shadow-xl p-4 border border-gray-100 w-[200px]">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-[10px] font-semibold text-gray-900 uppercase tracking-wider">
              Live now
            </span>
          </div>
          <div className="text-2xl font-extrabold text-gray-900">24/7</div>
          <div className="text-[11px] text-gray-400">
            chatters online this week
          </div>
        </div>
      </div>

    </div>
  </div>
</section>

  <TrainingChannelBanner />

      {/* ── 2. WHAT THE WORK IS ─────────────────────────────────────────────── */}
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
              Not random chatting. Real conversations with real people looking for connection.
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
                No laptop needed. No office. No commute. Log in, browse profiles, start chatting.
                You can do this from your house, {geo.locationContext}. The platform is fully mobile.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. PROFILES GRID ────────────────────────────────────────────────── */}
      <ProfilesGrid/>

      {/* ── 4. HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="text-rose-500 font-semibold text-sm uppercase tracking-wider">
              How it works
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2 mb-3">
              From curious to earning in minutes
            </h2>
            <p className="text-gray-500">Four simple steps. No tech skills. One-time fee to join.</p>
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

          <div className="mt-10 text-center">
            <Link
              href={VELLOEARN_REGISTER_URL}
              
              rel="noopener noreferrer"
              className="inline-block bg-rose-500 hover:bg-rose-600 text-white font-bold text-base px-10 py-4 rounded-full shadow-lg shadow-rose-200 transition-all hover:scale-105 active:scale-95"
            >
              Start Chatting Now →
            </Link>
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
              Based on actual team earnings. What you make depends on how much you chat.
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

          <Requirements />

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
            Ready to start chatting and earning?
          </h2>
          <p className="text-rose-100 mb-8 leading-relaxed">
            One-time fee to join. No experience needed. Your first conversation could be your first payout.
          </p>
          <Link
            href={VELLOEARN_REGISTER_URL}
            
            rel="noopener noreferrer"
            className="inline-block bg-white text-rose-500 font-bold text-base px-10 py-4 rounded-full shadow-xl hover:scale-105 active:scale-95 transition-all"
          >
            Start Chatting Now — One-time Fee →
          </Link>
          <p className="text-rose-200 text-xs mt-4">
            Easy to join · One-time fee · Instant {geo.wallet} payouts · 50,000+ active chatters
          </p>
        </div>
      </section>

    </main>
  );
}