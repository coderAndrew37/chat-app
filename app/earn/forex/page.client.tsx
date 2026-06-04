"use client";

import { ApplicationModal, SuccessState } from "@/app/components";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

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
    ? <Image {...props} fill unoptimized alt="" />
    : <Image {...props} width={width ?? 400} height={height ?? 300} unoptimized alt=""/>;
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
            open ? "bg-blue-600 text-white rotate-45" : "bg-gray-100 text-gray-500"
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

// --- Props Configuration ---
interface ForexClientProps {
  countryTarget: "kenya" | "uganda" | "ghana";
}

// --- Dynamic Regional Data Matrix ---
const REGIONAL_DATA = {
  kenya: {
    marketName: "Kenyan traders",
    paymentMethod: "M-Pesa",
    currency: "KES",
    heroStats: [
      { v: "70–80%", l: "Profit split (your share)" },
      { v: "0 KES", l: "Your capital at risk" },
      { v: "M-Pesa", l: "Withdrawal method" },
    ],
    pairs: [
      { pair: "USD/KES", label: "US Dollar / Kenyan Shilling", note: "High local relevance" },
      { pair: "EUR/USD", label: "Euro / US Dollar", note: "Most liquid pair globally" },
      { pair: "XAU/USD", label: "Gold / US Dollar", note: "Favourite of local traders" },
      { pair: "GBP/USD", label: "British Pound / US Dollar", note: "High volatility, high opportunity" },
    ],
    earnings: [
      { label: "Learning phase (months 1–2)", range: "KES 0", note: "Building skill, not income yet" },
      { label: "Early funded trading", range: "KES 8,000 – 25,000", note: "/ month (conservative)" },
      { label: "Consistent funded trader", range: "KES 40,000 – 120,000+", note: "/ month (skilled)" },
    ],
    stories: [
      { name: "James M.", location: "Nairobi, Westlands", earned: "KES 52,000 / month", story: "I lost money before I joined — I was copying signals from Telegram without understanding anything. The training changed how I see markets. I passed my evaluation in week three. Now I trade my own setups and actually know why I'm in a trade.", img: "/testimonials/james.jpg", fallback: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face&auto=format" },
      { name: "Aisha R.", location: "Nairobi, Kasarani", earned: "KES 31,000 / month", story: "I started with zero experience. The demo phase was frustrating — I kept blowing accounts. My mentor told me to drop the lot size and focus on one pair. That shift changed everything. I've been funded for four months.", img: "/testimonials/aisha.jpg", fallback: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&h=200&fit=crop&crop=face&auto=format" },
    ],
    legalAnswer: "Yes, online currency trading is entirely legal. We strictly provide premium training data and coordinate structured pathways to international capital asset providers.",
  },
  uganda: {
    marketName: "Ugandan traders",
    paymentMethod: "Mobile Money (MTN / Airtel)",
    currency: "UGX",
    heroStats: [
      { v: "70–80%", l: "Profit split (your share)" },
      { v: "0 UGX", l: "Your capital at risk" },
      { v: "MoMo", l: "Withdrawal method" },
    ],
    pairs: [
      { pair: "USD/UGX", label: "US Dollar / Ugandan Shilling", note: "High local relevance" },
      { pair: "EUR/USD", label: "Euro / US Dollar", note: "Most liquid pair globally" },
      { pair: "XAU/USD", label: "Gold / US Dollar", note: "High volume opportunity" },
      { pair: "GBP/USD", label: "British Pound / US Dollar", note: "High volatility setups" },
    ],
    earnings: [
      { label: "Learning phase (months 1–2)", range: "UGX 0", note: "Building skill, not income yet" },
      { label: "Early funded trading", range: "UGX 250k – 750k", note: "/ month (conservative)" },
      { label: "Consistent funded trader", range: "UGX 1.2M – 3.6M+", note: "/ month (skilled)" },
    ],
    stories: [
      { name: "Patrick O.", location: "Kampala", earned: "UGX 1,550,000 / month", story: "Blowing small personal balances taught me nothing but fear. Transitioning to standard evaluation methods and executing via funded lines provides massive psychological security.", img: "/testimonials/james.jpg", fallback: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face&auto=format" },
      { name: "Joan N.", location: "Entebbe", earned: "UGX 950,000 / month", story: "Structuring high-volume major pairs trading allows me to pull consistent revenue down to Mobile Money accounts straight from processing queues.", img: "/testimonials/aisha.jpg", fallback: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&h=200&fit=crop&crop=face&auto=format" },
    ],
    legalAnswer: "Yes, freelance currency trading operates fully across Uganda. We provide educational coursework frameworks and coordinate prop connections.",
  },
  ghana: {
    marketName: "Ghanaian traders",
    paymentMethod: "Mobile Money (MTN / Telecel)",
    currency: "GHS",
    heroStats: [
      { v: "70–80%", l: "Profit split (your share)" },
      { v: "0 GHS", l: "Your capital at risk" },
      { v: "MTN MoMo", l: "Withdrawal method" },
    ],
    pairs: [
      { pair: "USD/GHS", label: "US Dollar / Ghanaian Cedi", note: "High local relevance" },
      { pair: "EUR/USD", label: "Euro / US Dollar", note: "Most liquid pair globally" },
      { pair: "XAU/USD", label: "Gold / US Dollar", note: "Favourite commodity market" },
      { pair: "GBP/USD", label: "British Pound / US Dollar", note: "High volatility setups" },
    ],
    earnings: [
      { label: "Learning phase (months 1–2)", range: "GHS 0", note: "Building skill, not income yet" },
      { label: "Early funded trading", range: "GHS 1,000 – 3,000", note: "/ month (conservative)" },
      { label: "Consistent funded trader", range: "GHS 5,000 – 15,000+", note: "/ month (skilled)" },
    ],
    stories: [
      { name: "Derick A.", location: "Accra", earned: "GHS 6,500 / month", story: "The education structure focuses purely on liquidity areas and order blocks instead of generic textbook indicators. Having automated tracking systems lets you gauge errors instantly.", img: "/testimonials/james.jpg", fallback: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face&auto=format" },
      { name: "Blessing K.", location: "Kumasi", earned: "GHS 4,200 / month", story: "Trading indices efficiently inside large asset brackets shifts how you view scalable finance. Mobile Money system integration makes payout schedules seamless.", img: "/testimonials/aisha.jpg", fallback: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&h=200&fit=crop&crop=face&auto=format" },
    ],
    legalAnswer: "Yes, online financial training and trading global markets from contract agreements is legal across Ghana.",
  },
};

export default function ForexClient({ countryTarget }: ForexClientProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [successData, setSuccessData] = useState<{ name: string; whatsapp: string } | null>(null);

  // Fallback cleanly to kenya if parameters mismatch
  const config = REGIONAL_DATA[countryTarget] || REGIONAL_DATA.kenya;

  const handleSuccess = (data: { name: string; whatsapp: string }) => {
    setModalOpen(false);
    setSuccessData(data);
  };

  const WHAT_YOU_GET = [
    {
      icon: "📊",
      title: "Structured trading education",
      body: `A full curriculum — from what a pip is to reading price action on a 4H chart. Video lessons, PDF guides, and live walkthroughs. Built specifically for local traders, with regional examples.`,
    },
    {
      icon: "🖥️",
      title: "Practice on a demo account first",
      body: "You trade with virtual money until you're consistently profitable. No pressure, no real losses. Most traders spend 4–8 weeks on demo before going live. We don't rush this.",
    },
    {
      icon: "💰",
      title: "Funded account access",
      body: "Once you pass our internal evaluation (a 2-week demo challenge), you get access to a funded account — our capital, your trades. You keep 70–80% of profits. You don't risk your own savings.",
    },
    {
      icon: "👥",
      title: "A real trading community",
      body: `Daily signals, trade analysis, and a WhatsApp group of active regional traders. When someone spots a setup, the group knows. Learning alongside people in your timezone makes a difference.`,
    },
  ];

  const HOW_IT_WORKS = [
    {
      step: "01",
      title: "Apply and get onboarded",
      body: "You apply, get accepted, and receive access to the full training curriculum. No prior knowledge required. We start from absolute zero — what forex is, how markets move, and why most people lose.",
    },
    {
      step: "02",
      title: "Go through the training (2–4 weeks)",
      body: "Work through the curriculum at your pace. Modules cover: how to read charts, when to enter and exit trades, risk management, and the psychology behind trading decisions. This part is non-negotiable.",
    },
    {
      step: "03",
      title: "Trade on demo. Build a track record.",
      body: "Open a demo account on MT4 or MT5 and trade with virtual funds. Target: two consecutive profitable weeks following your strategy. Your mentor reviews your trades and gives feedback.",
    },
    {
      step: "04",
      title: "Pass the evaluation. Get funded.",
      body: "You run a 2-week funded challenge on a small live account. Hit the profit target without breaking risk rules and you graduate to a full funded account. Profits split 70/30 in your favour.",
    },
    {
      step: "05",
      title: `Withdraw profits to ${config.paymentMethod}`,
      body: `Funded traders withdraw monthly or bi-monthly. Most withdrawals process within 24 hours directly to ${config.paymentMethod}. You also earn referral commissions for bringing other traders into the programme.`,
    },
  ];

  const OBJECTIONS = [
    {
      q: "Isn't forex just gambling?",
      a: "Gambling is random. Trading is probabilistic — you're making decisions with edge, not luck. A coin flip is 50/50 forever. A well-tested strategy has a statistical edge that compounds over hundreds of trades. The problem isn't the market — it's undisciplined traders who treat it like gambling. The curriculum specifically addresses this.",
    },
    {
      q: `Is forex trading legal in my country?`,
      a: config.legalAnswer,
    },
    {
      q: "I've seen people lose everything in forex. Why is this different?",
      a: "Most losses come from three things: no education, too much leverage, and trading with money you can't afford to lose. Our structure removes all three. You don't trade live until you've proven you can manage risk on demo. And on the funded account, you're trading our money — not yours.",
    },
    {
      q: "How long before I make money?",
      a: "Be honest with yourself: the training and demo phase takes 4–12 weeks for most people. Rushing it is how people blow accounts. If you follow the programme, you can realistically be earning from a funded account within 3 months. We'll tell you clearly where you are and what's holding you back.",
    },
    {
      q: "Do I need a laptop or special equipment?",
      a: "No. You can trade on your phone using MT4 or MT5 — both have solid Android and iOS apps. A laptop helps for chart analysis during learning, but many of our traders manage live accounts entirely from their phones.",
    },
    {
      q: "What is the funded account, exactly?",
      a: "After passing your evaluation, you trade on a live account funded by VelloEarn. You make trading decisions. Profits are split — you take 70–80%, we take the rest. If you have a losing month, there's no debt — you simply don't earn that month and continue trading under revised risk rules.",
    },
    {
      q: "Can I do this alongside other VelloEarn tracks?",
      a: "Yes, but forex demands more mental presence than the other tracks. Most people who combine it do surveys or AI tasks during their non-trading hours — something that doesn't need deep focus. Don't try to trade while moderating a chat channel.",
    },
  ];

  return (
    <main className="bg-gray-50 min-h-screen">

      {/* ── Hero ── */}
      <section className="relative pt-24 pb-20 overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
        {/* Subtle grid texture */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(rgba(99,179,237,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(99,179,237,0.3) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute top-0 left-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-sm text-blue-300/70 hover:text-blue-200 mb-8 transition"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to VelloEarn
              </Link>
              <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-400/20 text-blue-300 text-xs font-bold px-3 py-1.5 rounded-full mb-6 uppercase tracking-wider">
                📈 Forex Trading
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight tracking-tight mb-5">
                Stop watching<br />
                <span className="text-blue-400">other people trade.</span>
              </h1>
              <p className="text-lg text-blue-100/70 leading-relaxed mb-8 max-w-lg">
                The forex market moves trillions a day. {config.marketName} are in it. Most lose because they start without structure. We give you the education, the tools, and a funded account — so your only job is to learn to trade properly.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setModalOpen(true)}
                  className="bg-blue-500 hover:bg-blue-400 text-white font-bold text-base px-8 py-4 rounded-full shadow-lg shadow-blue-900/50 transition-all hover:scale-105 active:scale-95"
                >
                  Apply for This Track →
                </button>
              </div>

              {/* Risk disclaimer */}
              <p className="mt-5 text-xs text-blue-300/40 leading-relaxed max-w-md">
                Forex trading carries risk. You will go through a structured learning phase before trading with real funds. Past results of our traders do not guarantee your earnings.
              </p>

              <div className="mt-8 flex gap-8">
                {config.heroStats.map((s) => (
                  <div key={s.l}>
                    <div className="text-lg font-extrabold text-white">{s.v}</div>
                    <div className="text-xs text-blue-300/50 mt-0.5">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero image */}
            <div className="relative hidden lg:block h-[420px] rounded-3xl overflow-hidden shadow-2xl shadow-blue-900/50 border border-blue-400/10">
              <SmartImage
                src="/earn/forex-hero.jpg"
                fallback="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=840&fit=crop&auto=format"
                alt="Forex trading charts"
                fill
                priority
                className="object-cover"
                sizes="45vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
              {/* Live-style ticker */}
              <div className="absolute bottom-5 left-5 right-5 bg-slate-900/90 backdrop-blur-sm border border-blue-400/20 rounded-2xl px-4 py-3">
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  {config.pairs.slice(0, 2).map((p) => (
                    <div key={p.pair} className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-white">{p.pair}</span>
                      <span className="text-xs text-emerald-400 font-semibold">▲ live</span>
                    </div>
                  ))}
                  <span className="text-xs text-blue-300/50">Markets open 24/5</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── What you get ── */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">What you get</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2 mb-4">
              Not just signals. An actual trading system.
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Most Telegram &ldquo;forex groups&rdquo; sell you signals with no explanation. We give you the foundation to generate your own.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-5 mb-10">
            {WHAT_YOU_GET.map((t) => (
              <div key={t.title} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <div className="text-2xl mb-3">{t.icon}</div>
                <h3 className="font-bold text-gray-900 text-base mb-2">{t.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{t.body}</p>
              </div>
            ))}
          </div>

          {/* Pairs you'll trade */}
          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-700">
            <p className="text-sm font-bold text-blue-300 mb-4 uppercase tracking-wider">Pairs you&apos;ll learn to trade</p>
            <div className="grid grid-cols-2 gap-4">
              {config.pairs.map((p) => (
                <div key={p.pair} className="flex items-start gap-3">
                  <span className="font-mono font-bold text-white text-sm shrink-0">{p.pair}</span>
                  <div>
                    <p className="text-xs text-slate-400">{p.label}</p>
                    <p className="text-xs text-blue-400/70">{p.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">How it works</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2">
              From zero to funded. Five steps.
            </h2>
          </div>
          <div className="space-y-5">
            {HOW_IT_WORKS.map((step, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex gap-5 items-start">
                <div className="shrink-0 w-12 h-12 rounded-2xl bg-blue-600 text-white font-extrabold text-sm flex items-center justify-center">
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
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Earning potential</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2 mb-3">
              Honest numbers. This isn&apos;t instant.
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Forex is the highest-ceiling track on VelloEarn and the one that requires the most patience. The income takes time to build — but for traders who stay consistent, there&apos;s no ceiling.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 mb-6">
            {config.earnings.map((tier, i) => (
              <div
                key={i}
                className={`rounded-2xl p-6 border text-center ${
                  i === 2
                    ? "bg-slate-900 border-slate-700 text-white"
                    : i === 0
                    ? "bg-gray-50 border-gray-100 opacity-70"
                    : "bg-gray-50 border-gray-100"
                }`}
              >
                <p
                  className={`text-xs font-semibold uppercase tracking-wider mb-3 ${
                    i === 2 ? "text-blue-400" : "text-gray-400"
                  }`}
                >
                  {tier.label}
                </p>
                <p
                  className={`text-2xl font-extrabold mb-1 ${
                    i === 0 ? "text-gray-400" : i === 2 ? "text-white" : "text-gray-900"
                  }`}
                >
                  {tier.range}
                </p>
                <p className={`text-xs ${i === 2 ? "text-blue-400/70" : "text-gray-400"}`}>{tier.note}</p>
              </div>
            ))}
          </div>

          {/* Honest disclaimer box */}
          <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5 flex gap-4 items-start mb-14">
            <span className="text-xl shrink-0">⚠️</span>
            <div>
              <p className="font-bold text-gray-900 text-sm mb-1">We won&apos;t lie to you about this</p>
              <p className="text-sm text-gray-600 leading-relaxed">
                Most people who &ldquo;try forex&rdquo; lose money because they skip the learning phase. We built this programme to change that — but it requires discipline. If you want fast money this month, start with the chatting or surveys track first. Come to forex when you can commit 4–8 weeks to learning before expecting income.
              </p>
            </div>
          </div>

          {/* Earner stories */}
          <h3 className="text-xl font-extrabold text-gray-900 mb-5">From traders already funded</h3>
          <div className="grid sm:grid-cols-2 gap-5">
            {config.stories.map((s) => (
              <div key={s.name} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative w-11 h-11 rounded-full overflow-hidden bg-blue-100 shrink-0">
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
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Real talk</span>
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
        <div className="absolute inset-0 bg-slate-900" />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(rgba(99,179,237,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(99,179,237,0.3) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute top-1/2 left-1/2 w-[500px] h-[300px] bg-blue-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="relative z-10 max-w-xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            The market is open 24 hours a day.
          </h2>
          <p className="text-blue-200/60 mb-8 leading-relaxed">
            Apply today. Start training this week. The only bad time to learn to trade is later.
          </p>
          <button
            onClick={() => setModalOpen(true)}
            className="inline-block bg-blue-500 hover:bg-blue-400 text-white font-bold text-base px-10 py-4 rounded-full shadow-xl shadow-blue-900/50 hover:scale-105 active:scale-95 transition-all"
          >
            Apply for Forex Track →
          </button>
          <p className="mt-4 text-xs text-blue-300/30">
            Forex trading involves risk. Capital in funded accounts is subject to drawdown rules.
          </p>
        </div>
      </section>

      {modalOpen && (
        <ApplicationModal
          onClose={() => setModalOpen(false)}
          track="Forex Trading"
        />
      )}

      {successData && (
        <SuccessState data={successData} onClose={() => setSuccessData(null)} />
      )}
    </main>
  );
}