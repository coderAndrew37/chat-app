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

// ─── Live ticker ──────────────────────────────────────────────────────────────
function LiveTicker() {
  const [amount, setAmount] = useState(1247830);
  useEffect(() => {
    const interval = setInterval(() => {
      setAmount((prev) => prev + Math.floor(Math.random() * 180 + 40));
    }, 1800);
    return () => clearInterval(interval);
  }, []);
  return <span className="font-mono tabular-nums">KES {amount.toLocaleString()}</span>;
}

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
function CtaButton({ label = "Create My Account — Activate Today →", className = "" }: {
  label?: string; className?: string;
}) {
  return (
    <a
      href="https://starhela.com/register.php?ref=velloEarn"
      target="_blank"
      rel="noopener noreferrer"
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

// ─── Main page ────────────────────────────────────────────────────────────────
export default function JoinPage() {
  const PINGS = [
    { name: "Wanjiru M. received", amount: "+KES 2,400", time: "just now", delay: 2500 },
    { name: "Kelvin O. received", amount: "+KES 1,850", time: "2 min ago", delay: 7000 },
    { name: "Akinyi T. received", amount: "+KES 3,100", time: "just now", delay: 13000 },
    { name: "Moses A. received", amount: "+KES 980", time: "4 min ago", delay: 18000 },
    { name: "Patricia N. received", amount: "+KES 2,200", time: "just now", delay: 23000 },
  ];

  const FAQS = [
    {
      q: "Why do I need to pay KES 550 to join?",
      a: (
        <div className="space-y-3">
          <p>The KES 550 is a one-time account setup fee that covers three things: platform facilitation, task infrastructure setup, and M-Pesa payout system integration. These are real operational costs that keep the platform running and your earnings flowing reliably.</p>
          <p>Think of it exactly like activating any financial service — your M-Pesa account, your bank account, your NHIF card. You pay once to unlock the system. After that, every shilling you earn comes directly to you.</p>
          <p className="font-semibold text-gray-700">The KES 200 welcome bonus is credited to your account the moment activation completes — so your real net investment is KES 350.</p>
        </div>
      ),
    },
    {
      q: "What exactly is Starhela and why does the link go there?",
      a: "Starhela is the task management and payout platform that VelloEarn runs on. When you click our activation link, you land on Starhela's registration page where you create your account. Think of VelloEarn as the brand and community, and Starhela as the engine underneath it. Your task dashboard, your earnings tracker, and your M-Pesa withdrawal system all live on Starhela. It's the same platform — just two names for the same thing.",
    },
    {
      q: "How does the KES 550 payment work exactly?",
      a: (
        <div className="space-y-3">
          <p>After you fill in your registration details on Starhela (username, phone number, email, password, country), you&apos;ll reach the payment screen.</p>
          <p>You&apos;ll see your phone number pre-filled and the activation amount shown. Tap <strong>ACTIVATE</strong> — an M-Pesa STK push notification will appear on your phone. Enter your M-Pesa PIN to complete. That&apos;s it.</p>
          <p>If the STK push doesn&apos;t appear within 30 seconds, tap <strong>&quot;Pay Manually to Till&quot;</strong> on the same screen. That option walks you through a manual M-Pesa transfer. Both routes complete your activation.</p>
          <p className="font-semibold text-gray-700">Your KES 200 welcome bonus appears in your dashboard immediately after payment confirms.</p>
        </div>
      ),
    },
    {
      q: "Will I earn back the KES 350 in my first week?",
      a: "Most members earn their net setup cost back within the first 2–3 days of consistent task completion. The dashboard has tasks available every day — AI training tasks, chatting shifts, and survey tasks all pay daily. Your first session alone can cover a significant portion of that KES 350 before the end of the week.",
    },
    {
      q: "Is this a pyramid scheme or MLM?",
      a: "No. Your primary income on VelloEarn is from completing tasks — AI training, chatting shifts, surveys, academic writing, and more. You earn for work done, the same way a salary pays you for time worked. Referrals are a secondary bonus: if you bring someone in and they earn, you receive a small percentage on top of your own income. You are never required to recruit anyone. Your dashboard has earning tasks ready from day one, regardless of whether you refer a single person.",
    },
    {
      q: "What tasks are available after I activate?",
      a: "Once your account is live, your dashboard shows: AI training tasks (rating AI responses, labelling data, testing chatbots), chatting shifts (customer support and moderation for businesses), surveys (brand research and product testing), Swahili teaching tasks if you're a native speaker, and academic writing tasks for qualified writers. You pick what suits you. Most members start with AI training and chatting.",
    },
    {
      q: "How and when does M-Pesa payout work?",
      a: "Earnings accumulate in your Starhela dashboard as you complete tasks. When your balance reaches the KES 500 minimum, you request a withdrawal directly from your dashboard. The money goes to the M-Pesa number registered on your account. Most payouts arrive within 30 minutes. There are no withdrawal fees.",
    },
    {
      q: "Are there any charges after the KES 550 setup?",
      a: "No. The KES 550 is a one-time fee. There are no monthly subscriptions, no withdrawal fees, no task access fees, and no charges to unlock any feature of the platform. Every shilling you earn after activation belongs to you. If anyone ever asks you for additional money to use the platform — that is fraud. Report it to us immediately.",
    },
    {
      q: "What if I get stuck during registration or payment?",
      a: "Our team is on WhatsApp specifically for registration support. If the M-Pesa STK push doesn't arrive, use 'Pay Manually to Till' — it's on the payment screen and takes 60 seconds. If anything else goes wrong, message us and we'll walk you through it in real time. We typically respond within a few minutes.",
    },
  ];

  return (
    <main className="bg-white min-h-screen">

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 1 — HERO
          Job: Stop the scroll. Create desire. Show proof it's real.
          3-second test: visitor sees money moving, real people earning, one clear CTA.
      ════════════════════════════════════════════════════════════════════════ */}
     <section className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden">
  {/* Background Image */}
  <div 
    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
    style={{
      backgroundImage: `url('/background.jpg')`,
    }}
  />
  
  {/* Dark overlay for better text readability */}
  <div className="absolute inset-0 bg-[#0d0d1a]/20 backdrop-blur-sm" />

  {/* Ambient glows - keeping these for atmosphere */}
  <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,_#f43f5e18,_transparent)] pointer-events-none" />
  <div className="absolute bottom-0 left-0 w-[600px] h-[400px] bg-[radial-gradient(ellipse,_#10b98108,_transparent)] pointer-events-none" />

  {/* Live M-Pesa pings — floats top-right on desktop, top on mobile */}
  <div className="absolute top-6 right-4 sm:right-8 w-64 space-y-2 z-10 pointer-events-none">
    {PINGS.map((p, i) => <MpesaPing key={i} {...p} />)}
  </div>

  {/* Content Overlay */}
  <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-28 lg:py-36">
    <div className="max-w-3xl">

      {/* Live earnings badge */}
      <div className="inline-flex items-center gap-2.5 bg-white/5 border border-white/10 backdrop-blur-sm rounded-full px-5 py-2.5 mb-8">
        <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shrink-0" />
        <span className="text-white/60 text-sm">Paid out today:</span>
        <span className="text-emerald-400 font-bold text-sm"><LiveTicker /></span>
      </div>

      <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] tracking-tight mb-7">
        Real tasks.{" "}
        <span className="text-rose-500">Real M-Pesa.</span>
        <br />
        <span className="text-white/30">One activation away.</span>
      </h1>

      <p className="text-xl text-white/80 leading-relaxed mb-3 max-w-2xl">
        VelloEarn connects Kenyans to paid remote tasks — AI training, chatting with foreigners,
        surveys and more. The M-Pesa notifications you&apos;ve seen online are real.
        This is how you get yours.
      </p>

      <p className="text-base text-white/60 mb-10 max-w-xl">
        One-time KES 550 account setup · KES 200 welcome bonus back immediately ·
        Tasks available the same day · No monthly charges ever.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 mb-14">
        <CtaButton />
        <button
          onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}
          className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white/70 font-semibold text-base px-8 py-5 rounded-full border border-white/10 transition-all"
        >
          Show me how it works first
        </button>
      </div>

      {/* Trust signals */}
      <div className="flex flex-wrap gap-x-6 gap-y-3">
        {[
          { icon: "✅", text: "No monthly charges" },
          { icon: "💸", text: "M-Pesa payouts daily" },
          { icon: "🎁", text: "KES 200 welcome bonus" },
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

  {/* Scroll nudge */}
  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce opacity-30 z-10">
    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  </div>
</section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 2 — SOCIAL PROOF
          Job: "Real people, real money." Specificity = credibility.
          Show method + earnings + real quote. No vague claims.
      ════════════════════════════════════════════════════════════════════════ */}
  <section className="py-20 bg-[#fafafa]">
  <div className="max-w-6xl mx-auto px-4 sm:px-6">

    <div className="text-center mb-14">
      <p className="text-rose-500 font-semibold text-sm uppercase tracking-wider mb-3">Real M-Pesa Screenshots</p>
      <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
        Real earnings. <span className="text-rose-500">Real proof.</span>
      </h2>
      <p className="text-gray-500 max-w-lg mx-auto">
        Every notification you see here is from a real VelloEarn user.
      </p>
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
            amount="KES 13, 605"
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
            amount="KES 5, 255"
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
        { value: "KES 1.2M+", label: "Paid this month" },
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
      <CtaButton label="Start Earning Today →" />
    </div>
  </div>
</section>



      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 3 — HOW IT WORKS (The most important section)
          Job: Make the process completely clear. No surprises.
          Starhela, the KES 550, the M-Pesa flow — all explained before they click.
          A person who understands every step converts. Confusion kills conversion.
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">

          <div className="text-center mb-16">
            <p className="text-rose-500 font-semibold text-sm uppercase tracking-wider mb-3">Step by step</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
              Exactly what happens when you tap that button
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              No surprises. No hidden steps. This is the complete process from first click to first M-Pesa.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">

            {/* Steps */}
            <div>
              <ProcessStep num={1} icon="📝"
                title="Create your account on Starhela"
                body="When you tap the activation button, you'll land on Starhela's registration page. Starhela is the platform VelloEarn runs on — your tasks, earnings, and payouts all live there. Fill in your username, phone number (07XX format), email address, password, and select Kenya as your country. Tap Create Account."
                highlight="Takes 90 seconds"
              />
              <ProcessStep num={2} icon="💳"
                title="Complete the KES 550 account setup"
                body="You'll reach the M-Pesa payment screen. Your phone number will already be filled in. The amount shown is KES 545–550 (you may see a small platform discount applied). Tap ACTIVATE — an M-Pesa STK push will appear on your phone. Enter your PIN. Done."
                highlight="KES 200 welcome bonus credited instantly"
              />
              <ProcessStep num={3} icon="🎯"
                title="Your dashboard goes live immediately"
                body="The moment payment confirms, your account is active. Your KES 200 welcome bonus appears in your earnings balance. Your task dashboard opens — AI training tasks, chatting shifts, surveys, and more are all visible and available to start."
                highlight="Same day, no waiting period"
              />
              <ProcessStep num={4} icon="💸"
                title="Work tasks. Earn. Withdraw to M-Pesa."
                body="Complete tasks at your own pace and schedule. Earnings accumulate in real time in your dashboard. When your balance reaches KES 500, request a withdrawal. The money goes directly to your M-Pesa number within 30 minutes."
                highlight="No withdrawal fees. No minimum wait."
              />
            </div>

            {/* Visual explanation — the screens */}
            <div className="space-y-5 sticky top-8">

              {/* Screen 1 mockup */}
              <div className="bg-[#f0f2f5] rounded-3xl p-6 border border-gray-100">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
                  Step 1 — What you&apos;ll see
                </p>
                <div className="bg-white rounded-2xl p-5 shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-6 h-6 bg-teal-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">★</span>
                    </div>
                    <span className="font-bold text-sm text-teal-700">STARHELA</span>
                  </div>
                  <p className="text-center font-bold text-gray-900 mb-1">Sign Up</p>
                  <p className="text-center text-xs text-gray-400 mb-4">Welcome & Join us by creating a free account!</p>
                  <div className="space-y-3">
                    {["Enter Username", "Mobile (+254)", "Email", "Password"].map((field) => (
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

              {/* Screen 2 mockup */}
              <div className="bg-[#f0f2f5] rounded-3xl p-6 border border-gray-100">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
                  Step 2 — The payment screen
                </p>
                <div className="bg-white rounded-2xl p-5 shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 bg-teal-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">★</span>
                    </div>
                    <span className="font-bold text-sm text-teal-700">STARHELA</span>
                  </div>
                  <p className="font-extrabold text-gray-900 text-base mb-1">M-Pesa STK Payment</p>
                  <p className="text-blue-600 font-semibold text-xs mb-2">Activate your account now and start your Journey!</p>
                  <div className="bg-emerald-50 rounded-lg px-3 py-2 text-xs text-emerald-700 font-semibold mb-3 text-center">
                    🎉 You&apos;ve received a Ksh 5 discount!
                  </div>
                  <div className="bg-gray-50 rounded-lg px-3 py-2.5 text-xs text-gray-600 mb-2 border border-gray-100">
                    254 7XX XXX XXX
                  </div>
                  <div className="bg-gray-50 rounded-lg px-3 py-2.5 text-xs text-gray-700 font-bold mb-3 border border-gray-100">
                    Ksh 545
                  </div>
                  <div className="bg-blue-500 rounded-lg px-3 py-2.5 text-xs text-white text-center font-bold mb-2">
                    ACTIVATE → Enter M-Pesa PIN
                  </div>
                  <p className="text-center text-xs text-gray-400">OR</p>
                  <div className="bg-violet-500 rounded-lg px-3 py-2 text-xs text-white text-center font-semibold mt-2">
                    Pay Manually to Till
                  </div>
                </div>
              </div>

              {/* Fee breakdown */}
              <div className="bg-gray-900 rounded-3xl p-6 text-white">
                <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-4">The honest math</p>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Account setup fee</span>
                    <span className="font-bold text-white">KES 550</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Welcome bonus (credited instantly)</span>
                    <span className="font-bold text-emerald-400">− KES 200</span>
                  </div>
                  <div className="h-px bg-white/10" />
                  <div className="flex justify-between items-center">
                    <span className="text-white font-semibold">Your real net cost</span>
                    <span className="font-extrabold text-2xl text-rose-400">KES 350</span>
                  </div>
                  <p className="text-gray-500 text-xs pt-1">
                    Less than a week&apos;s lunch money — for a task dashboard that pays you every day.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-14 text-center">
            <CtaButton />
            <p className="text-gray-400 text-sm mt-4">
              You&apos;ll land on Starhela&apos;s sign up page · Fill in details · Complete M-Pesa activation · Dashboard live
            </p>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 4 — WHAT YOU EARN (6 tracks)
          Job: Desire amplifier. Show the full earning landscape.
          Seeing 6 income streams makes KES 350 feel trivial.
      ════════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-[#fafafa]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">

          <div className="text-center mb-14">
            <p className="text-rose-500 font-semibold text-sm uppercase tracking-wider mb-3">What&apos;s inside</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
              6 earning tracks. One dashboard.
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto">
              Pick what suits you — or combine multiple for higher income.
              The top earners stack two or three methods for KES 30,000+ per month.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {[
              {
                icon: "💬", title: "Chat with foreigners", tag: "Most popular",
                pay: "KES 6,000 – 28,000 / month",
                body: "Handle customer support chats, community moderation, and engagement tasks for international brands. Pick your hours — morning, afternoon, or evening shifts.",
              },
              {
                icon: "🤖", title: "AI training tasks", tag: "Fast growing",
                pay: "KES 10,000 – 20,000 / month",
                body: "Rate AI responses, label data, test chatbots. No tech background required — just clear thinking and honest feedback. Flexible, asynchronous tasks.",
              },
              {
                icon: "🌍", title: "Teach Swahili", tag: "Kenya advantage",
                pay: "KES 6,000 – 15,000 / month",
                body: "Native Swahili speakers are in global demand for AI language training, transcription, and teaching tasks. Your first language is your income.",
              },
              {
                icon: "📋", title: "Surveys & research", tag: "Quick start",
                pay: "KES 2,000 – 6,000 / month",
                body: "Share opinions on products, brands, and services. Short tasks, quick pay. Perfect as a supplement to other earning tracks.",
              },
              {
                icon: "✍️", title: "Academic writing", tag: "Highest ceiling",
                pay: "KES 15,000 – 35,000 / month",
                body: "Essays, research papers, and academic content for international students. For confident writers — highest pay rate on the platform.",
              },
              {
                icon: "📊", title: "Forex trading", tag: "Advanced",
                pay: "Variable — guided program",
                body: "Structured currency trading with platform guidance. Higher learning curve, higher ceiling. Best approached after establishing income from other tracks.",
              },
            ].map((m) => (
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
            <CtaButton label="Unlock All 6 Tracks — Activate Today →" />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 5 — THE PROMISE
          Job: Pre-empt every remaining objection. Give them certainty.
          The dark card is the most important trust signal on the page.
      ════════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">

          {/* The promise */}
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
              The KES 550 is paid once. After that, every shilling flows toward you — not away from you.
              If anyone claiming to be VelloEarn ever asks for additional payment to use the platform,
              that is fraud. Contact us immediately on WhatsApp.
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

          {/* FAQ */}
          <div className="mb-14">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">
              Every question you have — answered honestly.
            </h2>
            <p className="text-gray-400 text-sm mb-8">We&apos;d rather you know everything before you activate than find surprises after.</p>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm divide-y divide-gray-50 px-6">
              {FAQS.map((faq) => (
                <Faq key={faq.q} q={faq.q} a={faq.a} />
              ))}
            </div>
          </div>

          {/* If you get stuck during payment — critical pre-empt */}
          <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6 mb-6">
            <div className="flex gap-3 items-start">
              <span className="text-2xl shrink-0">⚡</span>
              <div>
                <p className="font-bold text-gray-900 mb-2">If the M-Pesa STK push doesn&apos;t appear</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  On the payment screen, you&apos;ll see a <strong>&quot;Pay Manually to Till&quot;</strong> button below the main ACTIVATE button.
                  Tap it — it gives you a Till number to send the payment to directly from your M-Pesa app.
                  This always works even when the automated push fails.
                  Message us on WhatsApp if you need a hand — we&apos;re available and respond fast.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 6 — FINAL CTA
          Job: One instruction. One button. Make the decision feel inevitable.
          Hormozi: "You've read everything. The only thing left is the decision."
      ════════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-rose-500 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full translate-x-1/3 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full -translate-x-1/3 translate-y-1/3 pointer-events-none" />

        <div className="relative max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-rose-200 text-sm font-semibold uppercase tracking-wider mb-5">
            You&apos;ve seen the proof. You know the process. You know the cost.
          </p>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-5">
            The only thing left
            <br />
            is the decision.
          </h2>
          <p className="text-rose-100 text-lg leading-relaxed mb-8">
            KES 350 net. Dashboard live today. First M-Pesa this week.
            <br />
            The people who activated yesterday are already earning.
          </p>

          {/* Final math reminder */}
          <div className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4 mb-8 flex-wrap justify-center">
            <div className="text-center">
              <p className="text-white font-extrabold text-xl">KES 550</p>
              <p className="text-rose-200 text-xs">Setup fee</p>
            </div>
            <span className="text-white/40 font-bold text-xl">−</span>
            <div className="text-center">
              <p className="text-emerald-300 font-extrabold text-xl">KES 200</p>
              <p className="text-rose-200 text-xs">Welcome bonus back</p>
            </div>
            <span className="text-white/40 font-bold text-xl">=</span>
            <div className="text-center">
              <p className="text-white font-extrabold text-xl">KES 350</p>
              <p className="text-rose-200 text-xs">Your real cost</p>
            </div>
          </div>

          <div className="mb-6">
            <a
              href="https://starhela.com/register.php?ref=velloEarn"
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

          <p className="text-rose-200 text-sm mb-10">
            You&apos;ll fill in your details on Starhela · Complete M-Pesa setup · Dashboard goes live immediately
          </p>

          {/* WhatsApp support — bottom, not in the funnel */}
          <div className="border-t border-white/10 pt-8">
            <p className="text-rose-200 text-sm mb-4">Need help during registration?</p>
            <a
              href={`https://wa.me/${whatsappNumber}?text=Hi%2C%20I%20need%20help%20activating%20my%20VelloEarn%20account.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-full text-sm transition-all"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
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
          <Link href="/blog/is-ai-training-a-scam-kenya" className="hover:text-gray-600 transition">Is this legit?</Link>
          <Link href="/blog/is-getting-paid-to-chat-online-legit-kenya" className="hover:text-gray-600 transition">Chat jobs — legit?</Link>
        </div>
        <p className="text-center text-xs text-gray-300 mt-3">VelloEarn · velloearn.co.ke · Remote earning platform for Kenya</p>
      </div>

    </main>
  );
}
