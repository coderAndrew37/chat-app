"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from "next/image";
import { VELLOEARN_REGISTER_URL, whatsappNumber } from "@/lib/constants";
import { useSearchParams } from "next/navigation";

import { fbq } from "@/app/components/pixels/MetaPixel";

// ─── Types ─────────────────────────────────────────────────────────────────────
type CountryKey = "kenya" | "uganda" | "ghana";

interface EarningTrack {
  icon: string;
  title: string;
  tag: string;
  pay: string;
  body: string;
  cta: string;
}

interface JoinLocalizationConfig {
  countryName: string;
  currency: string;
  currencySymbol: string;
  payoutMethods: string;
  payoutMethodShort: string;
  minWithdrawal: number;
  tracks: EarningTrack[];
  faqs: Array<{ q: string; a: string | React.ReactNode }>;
}

// ─── Helper: build FAQs for a country ────────────────────────────────────────
function buildFaqs(cfg: JoinLocalizationConfig): Array<{ q: string; a: string | React.ReactNode }> {
  return [
    {
      q: "How much does it cost to join VelloEarn?",
      a: "VelloEarn is 100% Easy to join. No registration fees, no monthly subscriptions, no hidden charges — ever. You earn from your first conversation and withdraw instantly.",
    },
    {
      q: "Who will I be chatting with?",
      a: "You'll chat with lonely foreigners from the USA, UK, Canada, Australia, and Europe. They're looking for genuine conversation, friendship, and cultural exchange. Most are middle-aged or elderly and value connecting with people from different cultures.",
    },
    {
      q: "Do I need experience or perfect English?",
      a: "No. You just need conversational English and a friendly personality. If you can hold a friendly conversation, you can earn. No degrees, no experience, no CV needed.",
    },
    {
      q: "How quickly can I start earning?",
      a: "Immediately. After signing up, you can browse live profiles and start chatting right away. Most members earn within their first hour of chatting.",
    },
    {
      q: `How do ${cfg.payoutMethodShort} payouts work?`,
      a: `Your earnings accumulate in your dashboard as you chat. Withdraw to ${cfg.payoutMethodShort} anytime with no minimum balance. Most payouts clear within 30 minutes.`,
    },
    {
      q: "Is this available outside Kenya?",
      a: `Currently, VelloEarn operates primarily in Kenya. We're planning to expand to other African countries soon. Kenyan chatters are the most active and highest-rated on the platform.`,
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
    minWithdrawal: 0,
    tracks: [
      { icon: "💬", title: "One-on-one chatting", tag: "🔥 Most popular", pay: "KES 6,000 – 28,000 / month", body: "Chat with lonely foreigners looking for conversation. Earn money for every message. Simple and rewarding.", cta: "Start chatting" },
      { icon: "👥", title: "Group conversations", tag: "📈 High demand", pay: "KES 8,000 – 20,000 / month", body: "Join group chats with multiple foreigners. Engage in lively discussions and earn from every interaction.", cta: "Join a group" },
      { icon: "🌍", title: "Cultural sharing", tag: "⭐ Kenya advantage", pay: "KES 5,000 – 15,000 / month", body: "Share Kenyan culture, traditions, and daily life with curious foreigners. Be a cultural ambassador.", cta: "Share your culture" },
      { icon: "🎓", title: "Language exchange", tag: "💰 Premium rates", pay: "KES 7,000 – 18,000 / month", body: "Teach foreigners Swahili or Kenyan slang while they help you improve your English. Win-win.", cta: "Teach Swahili" },
      { icon: "🤝", title: "Friend matching", tag: "🏆 Highest rated", pay: "KES 10,000 – 25,000 / month", body: "Long-term friendship matching with foreigners seeking genuine Kenyan friends. Build meaningful connections.", cta: "Find friends" },
      { icon: "📱", title: "Voice & video chats", tag: "🚀 Advanced", pay: "KES 12,000 – 35,000 / month", body: "Premium voice and video conversations. Higher pay rates for more personal interactions.", cta: "Start a call" },
    ],
    faqs: [],
  },
  uganda: {
    countryName: "Uganda",
    currency: "UGX",
    currencySymbol: "UGX",
    payoutMethods: "MTN Mobile Money and Airtel Money",
    payoutMethodShort: "Mobile Money",
    minWithdrawal: 0,
    tracks: [
      { icon: "💬", title: "One-on-one chatting", tag: "🔥 Most popular", pay: "UGX 220,000 – 1,000,000 / month", body: "Chat with lonely foreigners looking for conversation. Earn money for every message.", cta: "Start chatting" },
      { icon: "👥", title: "Group conversations", tag: "📈 High demand", pay: "UGX 300,000 – 720,000 / month", body: "Join group chats with multiple foreigners. Engage in lively discussions and earn.", cta: "Join a group" },
      { icon: "🌍", title: "Cultural sharing", tag: "⭐ Uganda advantage", pay: "UGX 180,000 – 550,000 / month", body: "Share Ugandan culture and traditions with curious foreigners.", cta: "Share your culture" },
      { icon: "🎓", title: "Language exchange", tag: "💰 Premium rates", pay: "UGX 250,000 – 650,000 / month", body: "Teach Luganda or local languages while improving your English.", cta: "Teach Luganda" },
      { icon: "🤝", title: "Friend matching", tag: "🏆 Highest rated", pay: "UGX 360,000 – 900,000 / month", body: "Long-term friendships with foreigners seeking genuine connections.", cta: "Find friends" },
      { icon: "📱", title: "Voice & video chats", tag: "🚀 Advanced", pay: "UGX 450,000 – 1,300,000 / month", body: "Premium voice and video conversations with higher pay rates.", cta: "Start a call" },
    ],
    faqs: [],
  },
  ghana: {
    countryName: "Ghana",
    currency: "GHS",
    currencySymbol: "GHS",
    payoutMethods: "MTN Mobile Money and Telecel Cash",
    payoutMethodShort: "Mobile Money",
    minWithdrawal: 0,
    tracks: [
      { icon: "💬", title: "One-on-one chatting", tag: "🔥 Most popular", pay: "GHS 500 – 2,200 / month", body: "Chat with lonely foreigners looking for conversation. Earn money for every message.", cta: "Start chatting" },
      { icon: "👥", title: "Group conversations", tag: "📈 High demand", pay: "GHS 700 – 1,600 / month", body: "Join group chats with multiple foreigners. Engage in lively discussions.", cta: "Join a group" },
      { icon: "🌍", title: "Cultural sharing", tag: "⭐ Ghana advantage", pay: "GHS 400 – 1,200 / month", body: "Share Ghanaian culture and traditions with curious foreigners.", cta: "Share your culture" },
      { icon: "🎓", title: "Language exchange", tag: "💰 Premium rates", pay: "GHS 550 – 1,500 / month", body: "Teach Twi or local languages while improving your English.", cta: "Teach Twi" },
      { icon: "🤝", title: "Friend matching", tag: "🏆 Highest rated", pay: "GHS 800 – 2,000 / month", body: "Long-term friendships with foreigners seeking genuine connections.", cta: "Find friends" },
      { icon: "📱", title: "Voice & video chats", tag: "🚀 Advanced", pay: "GHS 1,000 – 2,800 / month", body: "Premium voice and video conversations with higher pay rates.", cta: "Start a call" },
    ],
    faqs: [],
  },
};

// wire up FAQs after object literal
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
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
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
  label = "Start Chatting Now →", 
  className = "",
  variant = "primary"
}: {
  label?: string; 
  className?: string;
  variant?: "primary" | "secondary";
}) {
  const handleClick = () => {
    fbq("Lead", {
      content_name: "VelloEarn Chat Registration",
      content_category: "Registration Flow",
      content_ids: ["velloearn_chat"],
    });
  };

  if (variant === "secondary") {
    return (
      <Link
        href={VELLOEARN_REGISTER_URL}
        rel="noopener noreferrer"
        onClick={handleClick}
        className={`group flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 font-semibold text-base px-8 py-4 rounded-full border border-gray-200 shadow-sm transition-all hover:scale-105 active:scale-95 ${className}`}
      >
        {label}
        <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </Link>
    );
  }

  return (
    <Link
      href={VELLOEARN_REGISTER_URL}
      rel="noopener noreferrer"
      onClick={handleClick}
      className={`group flex items-center justify-center gap-2 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-extrabold text-lg px-10 py-5 rounded-full shadow-2xl shadow-rose-200 transition-all hover:scale-105 active:scale-95 ${className}`}
    >
      {label}
      <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
    </Link>
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
        <div className="relative bg-black rounded-3xl p-3 shadow-xl">
          <div className="relative rounded-2xl overflow-hidden bg-white">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-black rounded-b-xl z-10 flex items-center justify-center gap-1">
              <div className="w-8 h-1.5 bg-black/30 rounded-full"></div>
            </div>
            <div className="relative w-full aspect-[9/16]">
              <Image
                src={image} 
                alt={`${name}'s M-Pesa earnings`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
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
          className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
            active === o.key
              ? "bg-rose-500 border-rose-500 text-white shadow-lg shadow-rose-200"
              : "bg-white/10 border-white/20 text-white/70 hover:border-rose-300 hover:text-white"
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

  return (
    <main className="bg-white min-h-screen">

      {/* ── SECTION 1 — HERO ── */}
      <section className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('/background.jpg')` }}
        />
        <div className="absolute inset-0 bg-[#0d0d1a]/30 backdrop-blur-sm" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,_#f43f5e20,_transparent)] pointer-events-none" />

        <div className="absolute top-6 right-4 sm:right-8 w-64 space-y-2 z-10 pointer-events-none">
          {PINGS.map((p, i) => <MpesaPing key={i} {...p} />)}
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-28 lg:py-36">
          <div className="max-w-3xl">
            <CountrySelector active={countryTarget} />

            {/* Social proof badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2 mb-8 text-white/80 text-sm">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
              61,000+ Kenyans already earning
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] tracking-tight mb-6">
              Turn your phone into
              <br />
              <span className="text-rose-400">a cash machine.</span>
            </h1>

            <p className="text-xl text-white/80 leading-relaxed mb-4 max-w-2xl">
              Chat with lonely foreigners. Get paid instantly. 
              No experience. No fees. Start today.
            </p>

            <p className="text-base text-white/50 mb-10 max-w-xl">
              <span className="text-emerald-400 font-semibold">⚡ 100% Easy to join</span> · 
              Instant {geo.payoutMethodShort} payouts · 50,000+ active chatters
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-14">
              <CtaButton label="Start Chatting Now →" />
              <button
                onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}
                className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white/70 font-semibold text-base px-8 py-5 rounded-full border border-white/10 transition-all"
              >
                Show me how it works
              </button>
            </div>

            {/* Trust signals */}
            <div className="flex flex-wrap gap-x-8 gap-y-3">
              {[
                { icon: "✅", text: "No fees. Ever." },
                { icon: "💸", text: `${geo.payoutMethodShort} payouts` },
                { icon: "📱", text: "Chat from your phone" },
                { icon: "🌍", text: "50,000+ active chatters" },
                { icon: "⏰", text: "Chat 24/7" },
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

      {/* ── SECTION 2 — SOCIAL PROOF ── */}
      <section className="py-20 bg-[#fafafa]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-rose-500 font-semibold text-sm uppercase tracking-wider mb-3">Real people, real money</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
              Kenyans are earning <span className="text-rose-500">every day</span>
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto">Not influencers — just regular people who started chatting.</p>
          </div>

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

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { value: "61,000+", label: "Active chatters" },
              { value: `${geo.currency} 1.2M+`, label: "Paid this month" },
              { value: "< 30 min", label: "Avg. payout time" },
              { value: "⭐ 4.9/5", label: "User rating" },
            ].map((s) => (
              <div key={s.label} className="text-center bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <p className="text-xl font-extrabold text-gray-900">{s.value}</p>
                <p className="text-xs text-gray-400 mt-1">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <CtaButton label="Start Earning Today →" />
          </div>
        </div>
      </section>

      {/* ── SECTION 3 — HOW IT WORKS ── */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <p className="text-rose-500 font-semibold text-sm uppercase tracking-wider mb-3">How it works</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
              Start earning in <span className="text-rose-500">4 simple steps</span>
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              No fees. No experience. Just you, your phone, and a friendly conversation.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <ProcessStep num={1} icon="📝"
                title="Sign up — 100% easy"
                body="Create your account in 2 minutes. No registration fees, no CV, no interview. Your account is active immediately."
                highlight="One-time fee — no monthly deductions"
              />
              <ProcessStep num={2} icon="👥"
                title="Browse live profiles"
                body="See who's online right now. Browse profiles of lonely foreigners from USA, UK, Canada, Europe, and more."
                highlight="50,000+ active chatters"
              />
              <ProcessStep num={3} icon="💬"
                title="Start chatting"
                body="Tap any profile and start talking. Share your culture, make friends, and earn money from every conversation."
                highlight="Earn from your first message"
              />
              <ProcessStep num={4} icon="💸"
                title={`Withdraw to ${geo.payoutMethodShort}`}
                body={`Your earnings grow with every chat. Withdraw to ${geo.payoutMethodShort} anytime. No minimum balance, no fees.`}
                highlight="Instant payouts"
              />
            </div>

            <div className="space-y-5">
              {/* Step 1 preview */}
              <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-3xl p-6 border border-rose-100">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
                  Step 1 — One-time fee
                </p>
                <div className="bg-white rounded-2xl p-5 shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-6 h-6 bg-rose-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">★</span>
                    </div>
                    <span className="font-bold text-sm text-rose-700">VELLOEARN</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-700 font-semibold px-2 py-0.5 rounded-full ml-auto">One-time Fee</span>
                  </div>
                  <p className="text-center font-bold text-gray-900 mb-1">Create Account</p>
                  <p className="text-center text-xs text-gray-400 mb-4">One-time fee · No CV · 2 minutes</p>
                  <div className="space-y-3">
                    {["Username", "Phone number", "Email", "Password"].map((field) => (
                      <div key={field} className="bg-gray-50 rounded-lg px-3 py-2.5 text-xs text-gray-400 border border-gray-100">
                        {field}
                      </div>
                    ))}
                    <div className="bg-gradient-to-r from-rose-500 to-pink-600 rounded-lg px-3 py-2.5 text-xs text-white text-center font-bold">
                      Create Account — Now
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2 preview */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-6 border border-blue-100">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
                  Step 2 — Live chatters
                </p>
                <div className="bg-white rounded-2xl p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-gray-900">Live Foreigners Online</span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-700 font-semibold px-2 py-0.5 rounded-full">50K+</span>
                    </div>
                    <span className="text-[10px] text-rose-500 font-medium animate-pulse">typing...</span>
                  </div>
                  <div className="space-y-2">
                    {[
                      { name: "Margaret W.", age: 58, country: "USA", typing: true },
                      { name: "Robert H.", age: 62, country: "UK", typing: false },
                      { name: "Helga S.", age: 55, country: "Germany", typing: false },
                    ].map((p) => (
                      <div key={p.name} className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2 border border-gray-100">
                        <div className="w-6 h-6 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full"></div>
                        <div className="flex-1">
                          <span className="text-xs font-medium text-gray-700">{p.name}</span>
                          <span className="text-[10px] text-gray-400 ml-1">· {p.age}</span>
                          <span className="text-[10px] text-gray-400 ml-1">{p.country}</span>
                        </div>
                        {p.typing ? (
                          <span className="flex items-center gap-1 text-[10px] text-emerald-600 font-medium">
                            <span className="flex gap-0.5">
                              <span className="w-1 h-1 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                              <span className="w-1 h-1 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                              <span className="w-1 h-1 bg-emerald-500 rounded-full animate-bounce"></span>
                            </span>
                            typing...
                          </span>
                        ) : (
                          <span className="text-[10px] text-gray-400">Looking to talk</span>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 text-center">
                    <span className="text-[10px] text-gray-400">+ 58 more active</span>
                  </div>
                </div>
              </div>

              {/* One-time fee promise card */}
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl p-6 border border-emerald-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center">
                    <span className="text-white text-lg">💰</span>
                  </div>
                  <div>
                    <p className="text-emerald-700 font-bold text-sm">100% Easy to join</p>
                    <p className="text-emerald-600/70 text-xs">No fees. No hidden charges. Ever.</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Registration fee</span>
                    <span className="font-bold text-emerald-600">One-time</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Monthly subscription</span>
                    <span className="font-bold text-emerald-600">None</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Withdrawal fees</span>
                    <span className="font-bold text-emerald-600">None</span>
                  </div>
                  <div className="flex justify-between items-center text-sm pt-2 border-t border-emerald-200">
                    <span className="text-gray-900 font-semibold">Total cost</span>
                    <span className="font-extrabold text-xl text-emerald-600">KES 0</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-14 text-center">
            <CtaButton label="Join for a One-time Fee — Start Chatting Now →" />
            <p className="text-gray-400 text-sm mt-4">
              No credit card · No monthly deductions · Start earning today
            </p>
          </div>
        </div>
      </section>

      {/* ── SECTION 4 — EARNING TRACKS ── */}
      <section className="py-20 bg-[#fafafa]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-rose-500 font-semibold text-sm uppercase tracking-wider mb-3">Ways to earn</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
              6 ways to <span className="text-rose-500">chat and earn</span>
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto">
              Pick what suits you — or combine multiple methods for higher income.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {geo.tracks.map((m) => (
              <div key={m.title} className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-rose-200 hover:shadow-lg transition-all duration-200 group">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-4xl">{m.icon}</span>
                  <span className="text-xs bg-rose-50 text-rose-600 font-semibold px-2.5 py-1 rounded-full">{m.tag}</span>
                </div>
                <h3 className="font-extrabold text-gray-900 text-base mb-1 group-hover:text-rose-500 transition-colors">{m.title}</h3>
                <p className="text-emerald-600 font-bold text-sm mb-3">{m.pay}</p>
                <p className="text-xs text-gray-500 leading-relaxed mb-4">{m.body}</p>
                <Link
                  href={VELLOEARN_REGISTER_URL}
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-rose-500 font-semibold text-xs hover:gap-2 transition-all"
                >
                  {m.cta} →
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center">
            <CtaButton label="Unlock All 6 Ways to Earn — One-time Fee →" />
          </div>
        </div>
      </section>

      {/* ── SECTION 5 — FAQ ── */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          {/* Promise card */}
          <div className="bg-gradient-to-br from-[#0d0d1a] to-[#1a1a2e] rounded-3xl p-8 sm:p-12 mb-14 text-center border border-white/5">
            <div className="w-16 h-16 bg-rose-500/20 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <span className="text-3xl">💎</span>
            </div>
            <p className="text-rose-400 text-sm font-semibold uppercase tracking-wider mb-4">Our promise to you</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-snug mb-5">
              One-time fee. <span className="text-rose-400">100% easy.</span>
              <br />
              <span className="text-white/40 text-xl">No hidden charges. No surprises.</span>
            </h2>
            <p className="text-white/40 text-sm leading-relaxed max-w-lg mx-auto mb-6">
              VelloEarn charges a one-time registration fee. No on-going fees. No monthly subscriptions. 
              No withdrawal fees. No hidden charges. You earn from your first conversation.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                "✓ Easy to join",
                "✓ No monthly fees",
                "✓ No withdrawal fees",
                "✓ No hidden charges",
                "✓ Instant M-Pesa payouts",
              ].map((s) => (
                <span key={s} className="text-white/30 text-sm bg-white/5 px-3 py-1.5 rounded-full">{s}</span>
              ))}
            </div>
          </div>

          <div className="mb-14">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">
              Questions? <span className="text-rose-500">We have answers.</span>
            </h2>
            <p className="text-gray-400 text-sm mb-8">Everything you need to know before you start.</p>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm divide-y divide-gray-50 px-6">
              {geo.faqs.map((faq) => (
                <Faq key={faq.q} q={faq.q} a={faq.a} />
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-6">
            <div className="flex gap-3 items-start">
              <span className="text-3xl shrink-0">💬</span>
              <div>
                <p className="font-bold text-gray-900 mb-2">Still have questions? We&apos;re here to help.</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Our team is on WhatsApp to help you get started. We typically respond within minutes.
                </p>
                <a
                  href={`https://wa.me/${whatsappNumber}?text=Hi%2C%20I%20want%20to%20start%20chatting%20with%20foreigners%20and%20earn%20money.%20How%20do%20I%20get%20started%3F`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-3 bg-[#25D366] hover:bg-[#1da851] text-white font-semibold text-sm px-4 py-2.5 rounded-full transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 6 — FINAL CTA ── */}
      <section className="py-24 bg-gradient-to-br from-rose-500 to-pink-600 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full translate-x-1/3 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full -translate-x-1/3 translate-y-1/3 pointer-events-none" />
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5" />

        <div className="relative max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <div className="text-6xl mb-6">🚀</div>
          <p className="text-rose-200 text-sm font-semibold uppercase tracking-wider mb-4">
            Your future self is already chatting
          </p>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-5">
            What are you waiting for?
          </h2>
          <p className="text-rose-100 text-lg leading-relaxed mb-8">
            Easy to join. No experience needed. Your first conversation could be your first payout.
          </p>

          <div className="inline-flex items-center gap-6 bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4 mb-8 flex-wrap justify-center">
            <div className="text-center">
              <p className="text-white font-extrabold text-xl">Easy</p>
              <p className="text-rose-200 text-xs">To join</p>
            </div>
            <span className="text-white/30 font-bold text-xl">✓</span>
            <div className="text-center">
              <p className="text-emerald-300 font-extrabold text-xl">Instant</p>
              <p className="text-rose-200 text-xs">{geo.payoutMethodShort} payouts</p>
            </div>
            <span className="text-white/30 font-bold text-xl">✓</span>
            <div className="text-center">
              <p className="text-white font-extrabold text-xl">24/7</p>
              <p className="text-rose-200 text-xs">Chat anytime</p>
            </div>
            <span className="text-white/30 font-bold text-xl">✓</span>
            <div className="text-center">
              <p className="text-white font-extrabold text-xl">KES 0</p>
              <p className="text-rose-200 text-xs">Total cost</p>
            </div>
          </div>

          <div className="mb-6">
            <Link
              href={VELLOEARN_REGISTER_URL}
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-white hover:bg-rose-50 text-rose-500 font-extrabold text-xl px-14 py-6 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all w-full sm:w-auto group"
            >
              Start Chatting Now 
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          <p className="text-rose-200/70 text-sm">
            No credit card · No payment required · Start earning instantly
          </p>

          <div className="border-t border-white/10 mt-10 pt-8">
            <p className="text-rose-200/60 text-sm mb-4">Need help getting started?</p>
            <a
              href={`https://wa.me/${whatsappNumber}?text=Hi%2C%20I%20want%20to%20start%20chatting%20with%20foreigners%20and%20earn%20money.%20How%20do%20I%20get%20started%3F`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-full text-sm transition-all"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Chat with us on WhatsApp
            </a>
            <p className="text-rose-300/40 text-xs mt-3">We typically respond within minutes</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <div className="py-6 bg-gray-50 border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-wrap justify-center gap-5 text-xs text-gray-400">
          <Link href="/" className="hover:text-gray-600 transition">← VelloEarn Home</Link>
          <Link href="/about" className="hover:text-gray-600 transition">About</Link>
          <Link href="/how-it-works" className="hover:text-gray-600 transition">How it works</Link>
          <Link href="/earn/chatting" className="hover:text-gray-600 transition">Chatting track</Link>
          <Link href="/faq" className="hover:text-gray-600 transition">FAQ</Link>
        </div>
        <p className="text-center text-xs text-gray-300 mt-3">VelloEarn — Chat with foreigners and earn</p>
      </div>
    </main>
  );
}