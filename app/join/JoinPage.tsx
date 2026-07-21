"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from "next/image";
import { whatsappNumber } from "@/lib/constants";
import { useSearchParams } from "next/navigation";

const VELLOEARN_REGISTER_URL = "https://starhela.com/register?ref=velloearn";
import { fbq } from "@/app/components/pixels/MetaPixel"; 

// ─── Types ─────────────────────────────────────────────────────────────────────
type CountryKey = "kenya" | "uganda" | "ghana";

interface EarningTrack {
  icon: string;
  title: string;
  tag: string;
  pay: string;
  body: string;
}

interface JoinLocalizationConfig {
  countryName: string;
  currency: string;
  currencySymbol: string;
  payoutMethods: string;
  payoutMethodShort: string;
  setupFee: number;
  welcomeBonus: number;
  minWithdrawal: number;
  localLanguageTrack: {
    name: string;
    body: string;
  };
  tracks: EarningTrack[];
  faqs: Array<{ q: string; a: string | React.ReactNode }>;
}

// ─── Helper: build FAQs for a country ────────────────────────────────────────
function buildFaqs(cfg: JoinLocalizationConfig): Array<{ q: string; a: string | React.ReactNode }> {
  const netCost = cfg.setupFee - cfg.welcomeBonus;
  return [
    {
      q: `Why do I need to pay ${cfg.currency} ${cfg.setupFee} to join?`,
      a: (
        <div className="space-y-3">
          <p>{`The ${cfg.currency} ${cfg.setupFee} is a one-time account setup fee that covers platform facilitation, task infrastructure, and ${cfg.payoutMethodShort} payout integration. These are real operating costs that keep the platform running and payouts flowing reliably.`}</p>
          <p>Think of it like activating any financial service — a mobile money account, a bank account. You pay once to unlock the system. After that, every unit you earn comes directly to you.</p>
          <p className="font-semibold text-gray-700">{`The ${cfg.currency} ${cfg.welcomeBonus} welcome bonus is credited to your account the moment activation completes — so your real net cost is ${cfg.currency} ${netCost}.`}</p>
        </div>
      ),
    },
    {
      q: `How does the ${cfg.currency} ${cfg.setupFee} payment work exactly?`,
      a: (
        <div className="space-y-3">
          <p>After you fill in your registration details on VelloEarn (username, phone number, email, password, country), you&apos;ll reach the payment screen.</p>
          <p>{`You'll see your phone number pre-filled and the activation amount shown. Tap ACTIVATE to trigger a ${cfg.payoutMethodShort} payment prompt on your phone. Confirm to complete. That's it.`}</p>
          <p>If the prompt doesn&apos;t appear within 30 seconds, use the manual payment option shown on the same screen.</p>
          <p className="font-semibold text-gray-700">{`Your ${cfg.currency} ${cfg.welcomeBonus} welcome bonus appears in your dashboard immediately after payment confirms.`}</p>
        </div>
      ),
    },
    {
      q: "Is this a pyramid scheme or MLM?",
      a: "No. Your primary income on VelloEarn is from completing tasks — AI training, chatting shifts, surveys, and more. You earn for work done, the same way a job pays for time worked. Referrals are a secondary bonus: if you bring someone in and they earn, you receive a small percentage on top of your own income, but you are never required to recruit anyone to earn from tasks.",
    },
    {
      q: "What tasks are available after I activate?",
      a: `Once your account is live, your dashboard shows AI training tasks (rating AI responses, labelling data, testing chatbots), chatting shifts, surveys, and language teaching tasks for native speakers. You pick what suits you.`,
    },
    {
      q: `How and when does ${cfg.payoutMethodShort} payout work?`,
      a: `Earnings accumulate in your VelloEarn dashboard as you complete tasks. When your balance reaches the ${cfg.currency} ${cfg.minWithdrawal} minimum, you request a withdrawal directly from your dashboard to your registered ${cfg.payoutMethodShort} number.`,
    },
    {
      q: `Are there any charges after the ${cfg.currency} ${cfg.setupFee} setup?`,
      a: `No. The ${cfg.currency} ${cfg.setupFee} is a one-time fee. There are no monthly subscriptions, no withdrawal fees, and no charges to unlock any feature of the platform. If anyone ever asks you for additional money to use the platform, that is fraud — report it to us immediately.`,
    },
    {
      q: "What if I get stuck during registration or payment?",
      a: "Our team is on WhatsApp specifically for registration support. If your mobile money prompt doesn't arrive, use the manual payment option on the payment screen. Message us and we'll walk you through it in real time.",
    },
  ];
}

// ─── Localization Data ──────────────────────────────────────────────────────
const JOIN_LOCALIZATION_DATA: Record<CountryKey, JoinLocalizationConfig> = {
  kenya: {
    countryName: "Kenya",
    currency: "KES",
    currencySymbol: "KES",
    payoutMethods: "M-Pesa",
    payoutMethodShort: "M-Pesa",
    setupFee: 550,
    welcomeBonus: 200,
    minWithdrawal: 500,
    localLanguageTrack: {
      name: "Teach Swahili",
      body: "Native Swahili speakers are in demand for AI language training, transcription, and teaching tasks. Your first language is your income.",
    },
    tracks: [
      { icon: "💬", title: "Chat with foreigners", tag: "Most popular", pay: "KES 6,000 – 28,000 / month", body: "Handle customer support chats, community moderation, and engagement tasks for international brands. Pick your hours." },
      { icon: "🤖", title: "AI training tasks", tag: "Fast growing", pay: "KES 10,000 – 20,000 / month", body: "Rate AI responses, label data, test chatbots. No tech background required — flexible, asynchronous tasks." },
      { icon: "🌍", title: "Teach Swahili", tag: "Kenya advantage", pay: "KES 6,000 – 15,000 / month", body: "Native speakers are in global demand for AI language training and teaching tasks." },
      { icon: "📋", title: "Surveys & research", tag: "Quick start", pay: "KES 2,000 – 6,000 / month", body: "Share opinions on products and services. Short tasks, quick pay." },
      { icon: "✍️", title: "Academic writing", tag: "Highest ceiling", pay: "KES 15,000 – 35,000 / month", body: "Essays and academic content for international students. For confident writers." },
      { icon: "📊", title: "Forex trading", tag: "Advanced", pay: "Variable — guided program", body: "Structured currency trading with platform guidance. Higher learning curve, higher ceiling." },
    ],
    faqs: [],
  },
  uganda: {
    countryName: "Uganda",
    currency: "UGX",
    currencySymbol: "UGX",
    payoutMethods: "MTN Mobile Money and Airtel Money",
    payoutMethodShort: "Mobile Money",
    setupFee: 20000,
    welcomeBonus: 7500,
    minWithdrawal: 18000,
    localLanguageTrack: {
      name: "Teach Luganda",
      body: "Native Luganda speakers are in demand for AI language training, transcription, and teaching tasks. Your first language is your income.",
    },
    tracks: [
      { icon: "💬", title: "Chat with foreigners", tag: "Most popular", pay: "UGX 220,000 – 1,000,000 / month", body: "Handle customer support chats, community moderation, and engagement tasks for international brands. Pick your hours." },
      { icon: "🤖", title: "AI training tasks", tag: "Fast growing", pay: "UGX 360,000 – 720,000 / month", body: "Rate AI responses, label data, test chatbots. No tech background required — flexible, asynchronous tasks." },
      { icon: "🌍", title: "Teach Luganda", tag: "Uganda advantage", pay: "UGX 220,000 – 550,000 / month", body: "Native speakers are in global demand for AI language training and teaching tasks." },
      { icon: "📋", title: "Surveys & research", tag: "Quick start", pay: "UGX 70,000 – 220,000 / month", body: "Share opinions on products and services. Short tasks, quick pay." },
      { icon: "✍️", title: "Academic writing", tag: "Highest ceiling", pay: "UGX 550,000 – 1,300,000 / month", body: "Essays and academic content for international students. For confident writers." },
      { icon: "📊", title: "Forex trading", tag: "Advanced", pay: "Variable — guided program", body: "Structured currency trading with platform guidance. Higher learning curve, higher ceiling." },
    ],
    faqs: [],
  },
  ghana: {
    countryName: "Ghana",
    currency: "GHS",
    currencySymbol: "GHS",
    payoutMethods: "MTN Mobile Money and Telecel Cash",
    payoutMethodShort: "Mobile Money",
    setupFee: 45,
    welcomeBonus: 16,
    minWithdrawal: 40,
    localLanguageTrack: {
      name: "Teach Twi",
      body: "Native Twi speakers are in demand for AI language training, transcription, and teaching tasks. Your first language is your income.",
    },
    tracks: [
      { icon: "💬", title: "Chat with foreigners", tag: "Most popular", pay: "GHS 500 – 2,200 / month", body: "Handle customer support chats, community moderation, and engagement tasks for international brands. Pick your hours." },
      { icon: "🤖", title: "AI training tasks", tag: "Fast growing", pay: "GHS 800 – 1,600 / month", body: "Rate AI responses, label data, test chatbots. No tech background required — flexible, asynchronous tasks." },
      { icon: "🌍", title: "Teach Twi", tag: "Ghana advantage", pay: "GHS 500 – 1,200 / month", body: "Native speakers are in global demand for AI language training and teaching tasks." },
      { icon: "📋", title: "Surveys & research", tag: "Quick start", pay: "GHS 150 – 500 / month", body: "Share opinions on products and services. Short tasks, quick pay." },
      { icon: "✍️", title: "Academic writing", tag: "Highest ceiling", pay: "GHS 1,200 – 2,800 / month", body: "Essays and academic content for international students. For confident writers." },
      { icon: "📊", title: "Forex trading", tag: "Advanced", pay: "Variable — guided program", body: "Structured currency trading with platform guidance. Higher learning curve, higher ceiling." },
    ],
    faqs: [],
  },
};

// wire up FAQs after object literal so we can reuse buildFaqs per country
(Object.keys(JOIN_LOCALIZATION_DATA) as CountryKey[]).forEach((key) => {
  const cfg = JOIN_LOCALIZATION_DATA[key];
  cfg.faqs = buildFaqs(cfg);
});


// ─── Floating M-Pesa notification ────────────────────────────────────────────
function MpesaPing({ name, amount, time, delay }: {
  name: string; amount: string; time: string; delay: number;
}) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const show = setTimeout(() => setVisible(true), delay);
    const hide = setTimeout(() => setVisible(false), delay + 4000);
    return () => { clearTimeout(show); clearTimeout(hide); };
  }, [delay]);
  return (
    <div className={`transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}>
      <div className="bg-white rounded-2xl px-4 py-3 shadow-xl flex items-center gap-3 border border-gray-100">
        <div className="w-9 h-9 bg-emerald-500 rounded-full flex items-center justify-center shrink-0">
          <span className="text-white text-xs font-bold">M</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold text-gray-900 truncate">{name}</p>
          <p className="text-emerald-600 font-extrabold text-sm">{amount}</p>
        </div>
        <span className="text-xs text-gray-400 shrink-0">{time}</span>
      </div>
    </div>
  );
}

// ─── Process step ─────────────────────────────────────────────────────────────
function ProcessStep({
  num, icon, title, body, highlight,
}: {
  num: number; icon: string; title: string; body: string; highlight?: string;
}) {
  return (
    <div className="flex gap-5 items-start">
      <div className="shrink-0 flex flex-col items-center">
        <div className="w-12 h-12 rounded-2xl bg-rose-500 text-white font-extrabold flex items-center justify-center shadow-lg shadow-rose-200 text-lg">
          {icon}
        </div>
        {num < 4 && <div className="w-0.5 h-8 bg-rose-100 mt-2" />}
      </div>
      <div className="pt-2 pb-6">
        <p className="font-extrabold text-gray-900 text-lg mb-1">{title}</p>
        <p className="text-gray-500 text-sm leading-relaxed mb-2">{body}</p>
        {highlight && (
          <div className="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold px-3 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
            {highlight}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── FAQ accordion ────────────────────────────────────────────────────────────
function Faq({ q, a }: { q: string; a: string | React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between py-5 text-left gap-4"
      >
        <span className="font-semibold text-gray-900 text-sm sm:text-base leading-snug">{q}</span>
        <span className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 mt-0.5 ${open ? "bg-rose-500 text-white rotate-45" : "bg-gray-100 text-gray-400"}`}>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
          </svg>
        </span>
      </button>
      {open && (
        <div className="pb-5 pr-10 animate-in fade-in slide-in-from-top-1 duration-200">
          <div className="text-gray-500 text-sm leading-relaxed">{a}</div>
        </div>
      )}
    </div>
  );
}


// ─── CTA Button ───────────────────────────────────────────────────────────────
function CtaButton({ 
  label = "Create My Account — Activate Today →", 
  className = "",
  currency = "KES",
  amount = 550,
  country = "Kenya",
}: {
  label?: string; 
  className?: string;
  currency?: string;
  amount?: number;
  country?: string;
}) {
  const handleClick = () => {
    // 1. Fire Meta Pixel event dynamically based on selected country
    fbq("InitiateCheckout", {
      content_name: "VelloEarn Account Activation",
      content_category: "Registration Flow",
      content_ids: [country.toLowerCase()],
      currency: currency,
      value: amount,
    });
  };

  return (
    <a
      href={VELLOEARN_REGISTER_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={`group flex items-center justify-center gap-2 bg-rose-500 hover:bg-rose-600 text-white font-extrabold text-lg px-10 py-5 rounded-full shadow-2xl shadow-rose-200 transition-all hover:scale-105 active:scale-95 ${className}`}
    >
      {label}
      <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
    </a>
  );
}

function ScreenshotCard({
  image,
  amount,
  name,
  location,
  time,
}: {
  image: string;
  amount: string;
  name: string;
  location: string;
  time: string;
}) {
  return (
    <div className="flex justify-center">
      <div className="relative w-full max-w-[280px]">
        {/* Phone Frame */}
        <div className="relative bg-black rounded-3xl p-3 shadow-xl">
          <div className="relative rounded-2xl overflow-hidden bg-white">
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-black rounded-b-xl z-10 flex items-center justify-center gap-1">
              <div className="w-8 h-1.5 bg-black/30 rounded-full"></div>
            </div>
            
            {/* Screenshot - FIXED */}
            <div className="relative w-full aspect-[9/16]">
              <Image
                src={image} 
                alt={`${name}'s M-Pesa earnings`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
            
            {/* M-Pesa Overlay */}
            <div className="absolute bottom-2 left-2 right-2 bg-black/80 backdrop-blur-md rounded-xl p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-400 font-bold text-lg">{amount}</p>
                  <p className="text-white/50 text-xs">{name} · {location}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                    <span className="text-white/40 text-[10px]">{time}</span>
                  </div>
                  <p className="text-emerald-400/60 text-[10px] font-semibold">M-PESA</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CountrySelector({ active }: { active: CountryKey }) {
  const options: { key: CountryKey; label: string }[] = [
    { key: "kenya", label: "🇰🇪 Kenya" },
    { key: "uganda", label: "🇺🇬 Uganda" },
    { key: "ghana", label: "🇬🇭 Ghana" },
  ];
  return (
    <div className="flex justify-center gap-2 mb-10 flex-wrap">
      {options.map((o) => (
        <Link
          key={o.key}
          href={`/join?country=${o.key}`}
          className={`px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${
            active === o.key
              ? "bg-rose-500 border-rose-500 text-white"
              : "bg-white border-gray-200 text-gray-500 hover:border-rose-300 hover:text-rose-600"
          }`}
        >
          {o.label}
        </Link>
      ))}
    </div>
  );
}



// ─── Main page ────────────────────────────────────────────────────────────────
export default function JoinPage() {
  const PINGS = [
    { name: "Wanjiru M. received", amount: "+KES 2,400", time: "just now", delay: 2500 },
    { name: "Kelvin O. received", amount: "+KES 1,850", time: "2 min ago", delay: 7000 },
    { name: "Akinyi T. received", amount: "+KES 3,100", time: "just now", delay: 13000 },
    { name: "Moses A. received", amount: "+KES 980", time: "4 min ago", delay: 18000 },
    { name: "Patricia N. received", amount: "+KES 2,200", time: "just now", delay: 23000 },
  ];

  const searchParams = useSearchParams();
  const countryParam = (searchParams.get("country") || "kenya").toLowerCase();
  const countryTarget: CountryKey = (["kenya", "uganda", "ghana"].includes(countryParam)
    ? countryParam
    : "kenya") as CountryKey;

  const geo = JOIN_LOCALIZATION_DATA[countryTarget];
  const netCost = geo.setupFee - geo.welcomeBonus;

  

  return (
    <main className="bg-white min-h-screen">

      {/* ── SECTION 1 — HERO ── */}
      <section className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('/background.jpg')` }}
        />
        <div className="absolute inset-0 bg-[#0d0d1a]/20 backdrop-blur-sm" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,_#f43f5e18,_transparent)] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[400px] bg-[radial-gradient(ellipse,_#10b98108,_transparent)] pointer-events-none" />

          {/* Live M-Pesa pings — floats top-right on desktop, top on mobile */}
        <div className="absolute top-6 right-4 sm:right-8 w-64 space-y-2 z-10 pointer-events-none">
          {PINGS.map((p, i) => <MpesaPing key={i} {...p} />)}
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-28 lg:py-36">
          <div className="max-w-3xl">
            <CountrySelector active={countryTarget} />

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] tracking-tight mb-7">
              Real tasks.{" "}
              <span className="text-rose-500">Real {geo.payoutMethodShort}.</span>
              <br />
              <span className="text-white/30">One activation away.</span>
            </h1>

            <p className="text-xl text-white/80 leading-relaxed mb-3 max-w-2xl">
              {`VelloEarn connects people in ${geo.countryName} to paid remote tasks — AI training, chatting with international clients, surveys and more.`}
            </p>

            <p className="text-base text-white/60 mb-10 max-w-xl">
              {`One-time ${geo.currency} ${geo.setupFee} account setup · ${geo.currency} ${geo.welcomeBonus} welcome bonus back immediately · Tasks available the same day · No monthly charges.`}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-14">
         <CtaButton 
  currency={geo.currency}
  amount={geo.setupFee}
  country={geo.countryName}
/>
              <button
                onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}
                className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white/70 font-semibold text-base px-8 py-5 rounded-full border border-white/10 transition-all"
              >
                Show me how it works first
              </button>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-3">
              {[
                { icon: "✅", text: "No monthly charges" },
                { icon: "💸", text: `${geo.payoutMethodShort} payouts` },
                { icon: "🎁", text: `${geo.currency} ${geo.welcomeBonus} welcome bonus` },
                { icon: "📱", text: "Any smartphone" },
                { icon: "🔒", text: "No recruitment required" },
              ].map((s) => (
                <div key={s.text} className="flex items-center gap-1.5 text-white/60 text-sm">
                  <span>{s.icon}</span><span>{s.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce opacity-30 z-10">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ── SECTION 2 — REAL SOCIAL PROOF ── */}
      <section className="py-20 bg-[#fafafa]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-rose-500 font-semibold text-sm uppercase tracking-wider mb-3">Real stories</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
              Real people. <span className="text-rose-500">Real earnings.</span>
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto">Not influencers — just members who applied and showed up.</p>
          </div>

          {/* Screenshots Swiper */}
          <div className="relative mb-12">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={24}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              autoplay={{
                delay: 3500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 24,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 24,
                },
              }}
              className="pb-12"
            >
              <SwiperSlide>
                <ScreenshotCard
                  image="/screenshots/mpesa-1.jpg"
                  amount="KES 13,605"
                  name="Sam K."
                  location="Nairobi"
                  time="2 hours ago"
                />
              </SwiperSlide>
              
              <SwiperSlide>
                <ScreenshotCard
                  image="/screenshots/mpesa-2.jpg"
                  amount="KES 100,152"
                  name="Macky O."
                  location="Kisumu"
                  time="Yesterday"
                />
              </SwiperSlide>
              
              <SwiperSlide>
                <ScreenshotCard
                  image="/screenshots/mpesa-3.jpg"
                  amount="KES 11,239"
                  name="Akinyi O."
                  location="Kisumu"
                  time="3 days ago"
                />
              </SwiperSlide>
              
              <SwiperSlide>
                <ScreenshotCard
                  image="/screenshots/mpesa-4.jpg"
                  amount="KES 5,255"
                  name="James K."
                  location="Mombasa"
                  time="1 week ago"
                />
              </SwiperSlide>
              
              <SwiperSlide>
                <ScreenshotCard
                  image="/screenshots/mpesa-5.jpg"
                  amount="KES 15,044"
                  name="Sarah N."
                  location="Thika"
                  time="4 days ago"
                />
              </SwiperSlide>
            </Swiper>
          </div>

          {/* Minimal Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { value: "61,000+", label: "Active earners" },
              { value: `${geo.currency} 1.2M+`, label: "Paid this month" },
              { value: "< 30 min", label: "Avg. payout time" },
              { value: "⭐ 4.9", label: "User rating" },
            ].map((s) => (
              <div key={s.label} className="text-center bg-white rounded-xl p-4 border border-gray-100">
                <p className="text-xl font-extrabold text-gray-900">{s.value}</p>
                <p className="text-xs text-gray-400 mt-1">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <CtaButton 
  label="Start Earning Today →" 
  currency={geo.currency}
  amount={geo.setupFee}
  country={geo.countryName}
/>
          </div>
        </div>
      </section>

      {/* ── SECTION 3 — HOW IT WORKS ── */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <p className="text-rose-500 font-semibold text-sm uppercase tracking-wider mb-3">Step by step</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
              Exactly what happens when you tap that button
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              No surprises. No hidden steps. This is the complete process from first click to first payout.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <ProcessStep num={1} icon="📝"
                title="Create your VelloEarn account"
                body="Fill in your username, phone number, email address, and password, and select your country. Tap Create Account."
                highlight="Takes 90 seconds"
              />
              <ProcessStep num={2} icon="💳"
                title={`Complete the ${geo.currency} ${geo.setupFee} account setup`}
                body={`You'll reach the ${geo.payoutMethodShort} payment screen. Your phone number will already be filled in. Tap ACTIVATE and confirm the payment prompt on your phone.`}
                highlight={`${geo.currency} ${geo.welcomeBonus} welcome bonus credited instantly`}
              />
              <ProcessStep num={3} icon="🎯"
                title="Your dashboard goes live immediately"
                body="The moment payment confirms, your account is active and your welcome bonus appears in your earnings balance. Your task dashboard opens right away."
                highlight="Same day, no waiting period"
              />
              <ProcessStep num={4} icon="💸"
                title={`Work tasks. Earn. Withdraw to ${geo.payoutMethodShort}.`}
                body={`Complete tasks at your own pace. When your balance reaches ${geo.currency} ${geo.minWithdrawal}, request a withdrawal directly to your ${geo.payoutMethodShort} number.`}
                highlight="No withdrawal fees. No minimum wait."
              />
            </div>

            <div className="space-y-5 sticky top-8">
              <div className="bg-[#f0f2f5] rounded-3xl p-6 border border-gray-100">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
                  Step 1 — What you&apos;ll see
                </p>
                <div className="bg-white rounded-2xl p-5 shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-6 h-6 bg-violet-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">★</span>
                    </div>
                    <span className="font-bold text-sm text-violet-700">VELLOEARN</span>
                  </div>
                  <p className="text-center font-bold text-gray-900 mb-1">Sign Up</p>
                  <p className="text-center text-xs text-gray-400 mb-4">Create your free account to get started</p>
                  <div className="space-y-3">
                    {["Enter Username", "Mobile number", "Email", "Password"].map((field) => (
                      <div key={field} className="bg-gray-50 rounded-lg px-3 py-2.5 text-xs text-gray-400 border border-gray-100">
                        {field}
                      </div>
                    ))}
                    <div className="bg-violet-500 rounded-lg px-3 py-2.5 text-xs text-white text-center font-bold">
                      Create Account
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#f0f2f5] rounded-3xl p-6 border border-gray-100">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
                  Step 2 — The payment screen
                </p>
                <div className="bg-white rounded-2xl p-5 shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 bg-violet-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">★</span>
                    </div>
                    <span className="font-bold text-sm text-violet-700">VELLOEARN</span>
                  </div>
                  <p className="font-extrabold text-gray-900 text-base mb-1">{geo.payoutMethodShort} Payment</p>
                  <p className="text-blue-600 font-semibold text-xs mb-2">Activate your account to start earning</p>
                  <div className="bg-gray-50 rounded-lg px-3 py-2.5 text-xs text-gray-600 mb-2 border border-gray-100">
                    Your registered number
                  </div>
                  <div className="bg-gray-50 rounded-lg px-3 py-2.5 text-xs text-gray-700 font-bold mb-3 border border-gray-100">
                    {geo.currency} {geo.setupFee}
                  </div>
                  <div className="bg-blue-500 rounded-lg px-3 py-2.5 text-xs text-white text-center font-bold mb-2">
                    ACTIVATE →
                  </div>
                  <p className="text-center text-xs text-gray-400">OR</p>
                  <div className="bg-violet-500 rounded-lg px-3 py-2 text-xs text-white text-center font-semibold mt-2">
                    Pay Manually
                  </div>
                </div>
              </div>

              <div className="bg-gray-900 rounded-3xl p-6 text-white">
                <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-4">The honest math</p>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Account setup fee</span>
                    <span className="font-bold text-white">{geo.currency} {geo.setupFee}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Welcome bonus (credited instantly)</span>
                    <span className="font-bold text-emerald-400">− {geo.currency} {geo.welcomeBonus}</span>
                  </div>
                  <div className="h-px bg-white/10" />
                  <div className="flex justify-between items-center">
                    <span className="text-white font-semibold">Your real net cost</span>
                    <span className="font-extrabold text-2xl text-rose-400">{geo.currency} {netCost}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-14 text-center">
              <CtaButton 
  currency={geo.currency}
  amount={geo.setupFee}
  country={geo.countryName}
/>
            <p className="text-gray-400 text-sm mt-4">
              {`Fill in your details on VelloEarn · Complete ${geo.payoutMethodShort} activation · Dashboard live immediately`}
            </p>
          </div>
        </div>
      </section>

      {/* ── SECTION 4 — WHAT YOU EARN ── */}
      <section className="py-20 bg-[#fafafa]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-rose-500 font-semibold text-sm uppercase tracking-wider mb-3">What&apos;s inside</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
              6 earning tracks. One dashboard.
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto">
              Pick what suits you — or combine multiple tracks for higher income.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {geo.tracks.map((m) => (
              <div key={m.title} className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-rose-200 hover:shadow-lg transition-all duration-200">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-4xl">{m.icon}</span>
                  <span className="text-xs bg-rose-50 text-rose-600 font-semibold px-2.5 py-1 rounded-full">{m.tag}</span>
                </div>
                <h3 className="font-extrabold text-gray-900 text-base mb-1">{m.title}</h3>
                <p className="text-emerald-600 font-bold text-sm mb-3">{m.pay}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{m.body}</p>
              </div>
            ))}
          </div>

     <div className="text-center">
  <CtaButton 
    label="Unlock All 6 Tracks — Activate Today →" 
    currency={geo.currency}
    amount={geo.setupFee}
    country={geo.countryName}
  />
</div>
        </div>
      </section>

      {/* ── SECTION 5 — THE PROMISE + FAQ ── */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="bg-[#0d0d1a] rounded-3xl p-8 sm:p-12 mb-14 text-center">
            <div className="w-12 h-12 bg-rose-500/20 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <span className="text-2xl">🔒</span>
            </div>
            <p className="text-rose-400 text-sm font-semibold uppercase tracking-wider mb-4">Our promise to you</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-snug mb-5">
              We never ask for money again after setup.
              <br />
              <span className="text-white/30">Not to unlock tasks. Not to withdraw. Never.</span>
            </h2>
            <p className="text-white/50 text-sm leading-relaxed max-w-lg mx-auto mb-6">
              {`The ${geo.currency} ${geo.setupFee} is paid once. After that, every unit you earn flows toward you — not away from you. If anyone claiming to be VelloEarn ever asks for additional payment to use the platform, that is fraud. Contact us immediately on WhatsApp.`}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                "✓ No monthly fee",
                "✓ No withdrawal fee",
                "✓ No task unlocking fee",
                "✓ No recruitment requirement",
                "✓ No hidden charges",
              ].map((s) => (
                <span key={s} className="text-white/40 text-sm bg-white/5 px-3 py-1.5 rounded-full">{s}</span>
              ))}
            </div>
          </div>

          <div className="mb-14">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">
              Every question you have — answered honestly.
            </h2>
            <p className="text-gray-400 text-sm mb-8">We&apos;d rather you know everything before you activate than find surprises after.</p>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm divide-y divide-gray-50 px-6">
              {geo.faqs.map((faq) => (
                <Faq key={faq.q} q={faq.q} a={faq.a} />
              ))}
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6 mb-6">
            <div className="flex gap-3 items-start">
              <span className="text-2xl shrink-0">⚡</span>
              <div>
                <p className="font-bold text-gray-900 mb-2">If the {geo.payoutMethodShort} prompt doesn&apos;t appear</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  On the payment screen, use the manual payment option below the main ACTIVATE button.
                  It gives you the details to send the payment directly. This always works even when the automated prompt fails.
                  Message us on WhatsApp if you need a hand.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 6 — FINAL CTA ── */}
      <section className="py-20 bg-rose-500 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full translate-x-1/3 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full -translate-x-1/3 translate-y-1/3 pointer-events-none" />

        <div className="relative max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-rose-200 text-sm font-semibold uppercase tracking-wider mb-5">
            You&apos;ve seen the process. You know the cost.
          </p>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-5">
            The only thing left
            <br />
            is the decision.
          </h2>
          <p className="text-rose-100 text-lg leading-relaxed mb-8">
            {`${geo.currency} ${netCost} net. Dashboard live today.`}
          </p>

          <div className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4 mb-8 flex-wrap justify-center">
            <div className="text-center">
              <p className="text-white font-extrabold text-xl">{geo.currency} {geo.setupFee}</p>
              <p className="text-rose-200 text-xs">Setup fee</p>
            </div>
            <span className="text-white/40 font-bold text-xl">−</span>
            <div className="text-center">
              <p className="text-emerald-300 font-extrabold text-xl">{geo.currency} {geo.welcomeBonus}</p>
              <p className="text-rose-200 text-xs">Welcome bonus back</p>
            </div>
            <span className="text-white/40 font-bold text-xl">=</span>
            <div className="text-center">
              <p className="text-white font-extrabold text-xl">{geo.currency} {netCost}</p>
              <p className="text-rose-200 text-xs">Your real cost</p>
            </div>
          </div>

          <div className="mb-6">
            <a
              href={VELLOEARN_REGISTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-white text-rose-500 font-extrabold text-xl px-14 py-5 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all w-full sm:w-auto"
            >
              Create My Account — Activate Today
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>

          <div className="border-t border-white/10 pt-8">
            <p className="text-rose-200 text-sm mb-4">Need help during registration?</p>
            <a
              href={`https://wa.me/${whatsappNumber}?text=Hi%2C%20I%20need%20help%20activating%20my%20VelloEarn%20account.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-full text-sm transition-all"
            >
              Chat with us on WhatsApp
            </a>
            <p className="text-rose-300/50 text-xs mt-3">We typically respond within minutes</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <div className="py-6 bg-gray-50 border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-wrap justify-center gap-5 text-xs text-gray-400">
          <Link href="/" className="hover:text-gray-600 transition">← VelloEarn Home</Link>
          <Link href="/earn/chatting" className="hover:text-gray-600 transition">Chatting track</Link>
          <Link href="/earn/ai-training" className="hover:text-gray-600 transition">AI Training track</Link>
        </div>
        <p className="text-center text-xs text-gray-300 mt-3">VelloEarn — Remote earning platform</p>
      </div>
    </main>
  );
}