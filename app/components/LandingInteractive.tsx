"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ApplicationModal, { ApplicationFormData } from "./CTAModal";
import DeepDiveAccordion from "./DeepDiveAccordion";
import Requirements from "./Requirements";
import SmartImage from "./SmartImage";
import SuccessState from "./SuccessState";
import TestimonialSlider from "./TestimonialSlider";

// ─── Data ────────────────────────────────────────────────────────────────────

export const TESTIMONIALS = [
  {
    id: 1,
    initials: "WM",
    name: "Wanjiru M.",
    location: "Nairobi, Westlands",
    quote:
      "I paid my kids' school fees this term entirely from what I make here. Nobody knows I'm working — I just look like I'm on my phone.",
    lifestyle: "School fees covered",
    earned: "KES 18,400 / month",
    image: "/testimonials/wanjiru.jpg",
    unsplashFallback:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&h=200&fit=crop&crop=face&auto=format",
  },
  {
    id: 2,
    initials: "BK",
    name: "Brian K.",
    location: "Mombasa",
    quote:
      "I booked a Diani trip last month and didn't stress about the cost once. This has changed the way I move through life, for real.",
    lifestyle: "Coastal holiday, stress-free",
    earned: "KES 24,000 / month",
    image: "/testimonials/brian.jpg",
    unsplashFallback:
      "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=200&h=200&fit=crop&crop=face&auto=format",
  },
  {
    id: 3,
    initials: "AO",
    name: "Akinyi O.",
    location: "Kisumu",
    quote:
      "My campus friends kept asking how I'm always sorted. I just smile. The M-Pesa notifications come in while I'm out with them.",
    lifestyle: "Always sorted at campus",
    earned: "KES 11,200 / month",
    image: "/testimonials/akinyi.jpg",
    unsplashFallback:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=face&auto=format",
  },
  {
    id: 4,
    initials: "FM",
    name: "Fatuma A.",
    location: "Eldoret",
    quote:
      "I upgraded my phone, restocked my business, and still had money left. Soft life is not just a saying — it's the plan.",
    lifestyle: "Business + lifestyle upgrade",
    earned: "KES 15,000 / month",
    image: "/testimonials/fatuma.jpg",
    unsplashFallback:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=face&auto=format",
  },
];

const EARNING_METHODS = [
  {
    icon: "💬",
    title: "Remote chatting",
    tagline: "Earn for every conversation you support.",
    detail:
      "Real-time communication tasks, moderation, and engagement work. Structured shifts, clear payouts.",
    href: "/earn/chatting",
    badge: "Most popular",
    image: "/earn/chatting.jpg",
    unsplashFallback:
      "https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=600&h=360&fit=crop&auto=format",
  },
  {
    icon: "🤖",
    title: "AI training",
    tagline: "Help teach AI systems to understand humans better.",
    detail:
      "Review, rate, and improve AI responses. Flexible tasks you can do from anywhere, any time.",
    href: "/earn/ai-training",
    badge: "High demand",
    image: "/earn/ai-training.jpg",
    unsplashFallback:
      "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&h=360&fit=crop&auto=format",
  },
  {
    icon: "🌍",
    title: "Teach Swahili",
    tagline: "Foreigners pay to learn what you already speak fluently.",
    detail:
      "Online one-on-one and group lessons for international learners. Your language is your income.",
    href: "/earn/swahili-teaching",
    badge: "Unique skill",
    image: "/earn/swahili.jpg",
    unsplashFallback:
      "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=600&h=360&fit=crop&auto=format",
  },
  {
    icon: "📋",
    title: "Surveys & research",
    tagline: "Your opinions have real value to global brands.",
    detail:
      "Paid surveys, product testing, and consumer research tasks. Quick tasks, consistent payouts.",
    href: "/earn/surveys",
    badge: "Quick start",
    image: "/earn/surveys.jpg",
    unsplashFallback:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=360&fit=crop&auto=format",
  },
  {
    icon: "💱",
    title: "Forex trading",
    tagline: "Earn from global currency markets with expert guidance.",
    detail:
      "Learn and participate in forex trading with real-time market insights and support. Flexible participation, potential for significant returns.",
    href: "/earn/forex",
    badge: "High potential",
    image: "/earn/forex.jpg",
    unsplashFallback:
      "https://images.unsplash.com/photo-1556740749-887f6717d7e4?w=600&h=360&fit=crop&auto=format",
  },
  {
    icon: "📚",
    title: "Academic writing",
    tagline: "Help students with their assignments and research papers.",
    detail:
      "Write essays, research papers, and other academic content. Flexible deadlines, competitive rates, and expert review.",
    href: "/earn/academic-writing",
    badge: "Expert skill",
    image: "/earn/academic-writing.jpg",
    unsplashFallback:
      "https://images.unsplash.com/photo-1507842217343-583bb72959d3?w=600&h=360&fit=crop&auto=format",
  },
];

// ─── Main Landing Component ───────────────────────────────────────────────────

export default function LandingInteractive() {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [successData, setSuccessData] = useState<ApplicationFormData | null>(null);

  const openModal = () => setModalOpen(true);

  const handleSuccess = (data: ApplicationFormData) => {
    setModalOpen(false);
    setSuccessData(data);
  };

  const handleApplyClick = () => {
    router.push("/join");
  };

  return (
    <main className="bg-gray-50 min-h-screen">

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="pt-20 pb-16 bg-linear-to-br from-rose-50 via-white to-pink-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-rose-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-200/20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left: copy */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-white border border-gray-100 shadow-sm text-gray-700 text-sm font-medium px-4 py-1.5 rounded-full mb-8">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                Applications open — limited spots this week
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight mb-5">
                Join the Global{" "}
                <span className="text-rose-500">Chatting &amp; Remote</span>
                <br />Work Network.
              </h1>

              <p className="text-lg sm:text-xl text-gray-500 leading-relaxed mb-4 max-w-xl mx-auto lg:mx-0">
                We provide the training, the platform, and the payout infrastructure.{" "}
                <strong className="text-gray-700 font-semibold">You provide the conversation.</strong>
              </p>

              <p className="text-base text-gray-400 mb-10 max-w-lg mx-auto lg:mx-0">
                One-time KES 550 setup unlocks your dashboard. KES 200 welcome bonus back immediately.
                M-Pesa notifications while you&apos;re out with friends. That&apos;s the goal — and it&apos;s what 
                our team members are already doing.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <button
                  onClick={handleApplyClick}
                  className="bg-rose-500 hover:bg-rose-600 text-white font-bold text-base px-8 py-4 rounded-full shadow-lg shadow-rose-200 transition-all hover:scale-105 active:scale-95"
                >
                  Apply to Join — KES 550 One-Time
                </button>
                <a
                  href="#what-we-do"
                  className="bg-white hover:bg-gray-50 text-gray-700 font-semibold text-base px-8 py-4 rounded-full border border-gray-200 shadow-sm transition-all hover:scale-105 active:scale-95"
                >
                  See how it works
                </a>
              </div>

              {/* Social proof strip */}
              <div className="mt-12 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-center lg:text-left">
                {[
                  { value: "KES 30K+", label: "Top monthly earner" },
                  { value: "Instant", label: "M-Pesa payouts" },
                  { value: "6 ways", label: "To earn" },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="text-xl font-extrabold text-gray-900">{s.value}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: image collage (unchanged) */}
            <div className="hidden lg:flex flex-col gap-3 h-[500px]">
              <div className="flex gap-3 flex-1 min-h-0">
                <div className="relative w-[56%] rounded-3xl overflow-hidden shadow-xl">
                  <SmartImage
                    src="/hero/main.jpg"
                    fallback="https://images.unsplash.com/photo-1616077168712-fc6c788db4af?w=600&h=900&fit=crop&crop=top&auto=format"
                    alt="Young Kenyan professional working on phone"
                    fill
                    priority
                    className="object-cover"
                    sizes="25vw"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-3 right-3 bg-white/90 backdrop-blur-sm rounded-2xl px-3 py-2.5 flex items-center gap-2.5">
                    <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-sm shrink-0">
                      💸
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] text-gray-400 leading-none mb-0.5">M-Pesa received</p>
                      <p className="text-sm font-extrabold text-gray-900 leading-none">+KES 2,400</p>
                    </div>
                    <span className="text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full whitespace-nowrap">
                      just now
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-3 flex-1 min-w-0">
                  <div className="relative flex-1 rounded-2xl overflow-hidden shadow-lg">
                    <SmartImage
                      src="/hero/secondary.jpg"
                      fallback="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=300&fit=crop&auto=format"
                      alt="Team members working together"
                      fill
                      className="object-cover"
                      sizes="15vw"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />
                  </div>
                  <div className="relative flex-1 rounded-2xl overflow-hidden shadow-lg">
                    <SmartImage
                      src="/hero/lifestyle.jpg"
                      fallback="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop&auto=format"
                      alt="Remote workers on phones"
                      fill
                      className="object-cover"
                      sizes="15vw"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-md border border-gray-100 px-5 py-3.5 flex items-center gap-4 shrink-0">
                <div className="flex -space-x-2 shrink-0">
                  {TESTIMONIALS.map((t) => (
                    <div
                      key={t.id}
                      className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-white shadow-sm"
                    >
                      <SmartImage
                        src={t.image}
                        fallback={t.unsplashFallback}
                        alt={t.name}
                        fill
                        className="object-cover"
                        sizes="32px"
                      />
                    </div>
                  ))}
                  <div className="w-8 h-8 rounded-full bg-rose-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-rose-600 shadow-sm shrink-0">
                    +84
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-gray-900 truncate">Active earners this week</p>
                  <p className="text-[10px] text-gray-400 truncate">Nairobi · Mombasa · Kisumu · Eldoret</p>
                </div>
                <div className="w-px h-8 bg-gray-100 shrink-0" />
                <div className="text-right shrink-0">
                  <p className="text-base font-extrabold text-emerald-600 leading-none">KES 1.2M</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">paid out this month</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── What We Do ───────────────────────────────────────────── */}
      <section id="what-we-do" className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-rose-500 font-semibold text-sm uppercase tracking-wider">
              What we do
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2 mb-4">
              This isn&apos;t a hustle. It&apos;s an infrastructure.
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto leading-relaxed">
              VelloEarn connects skilled individuals with structured remote tasks — real-time communication
              support, moderation, AI training, and data engagement. We built the system so you can focus
              on earning.
            </p>
          </div>

          <div className="relative w-full h-52 sm:h-64 rounded-2xl overflow-hidden mb-10 shadow-sm">
            <SmartImage
              src="/about/lifestyle.jpg"
              fallback="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&h=500&fit=crop&auto=format"
              alt="People working remotely in Nairobi"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
            />
            <div className="absolute inset-0 bg-linear-to-r from-rose-900/30 to-transparent" />
            <div className="absolute inset-0 flex items-end p-6">
              <p className="text-white font-semibold text-sm drop-shadow">
                Real people. Real payouts. From anywhere in Kenya.
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-5">
            {[
              {
                icon: "🏗️",
                title: "Professional infrastructure",
                body: "Defined tasks, rate cards, and a team structure. You always know what you're doing and how much it pays.",
              },
              {
                icon: "💸",
                title: "Automated M-Pesa payouts",
                body: "Direct integration. Request a withdrawal, get the money. No chasing, no waiting, no middlemen.",
              },
              {
                icon: "📈",
                title: "Team growth model",
                body: "Earn not just for your work, but for the team you build. Your network compounds your income.",
              },
            ].map((card) => (
              <div key={card.title} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <div className="text-2xl mb-3">{card.icon}</div>
                <h3 className="font-bold text-gray-900 text-base mb-2">{card.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Earning Methods ──────────────────────────────────────── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-4">
            <span className="text-rose-500 font-semibold text-sm uppercase tracking-wider">
              Ways to earn
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2 mb-2">
              It&apos;s not just chatting.
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              We have six different earning tracks. Pick what suits you — or do all of them.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mt-10">
            {EARNING_METHODS.map((method) => (
              <Link
                key={method.title}
                href={method.href}
                className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-rose-100 transition-all block overflow-hidden"
              >
                <div className="relative w-full h-36 overflow-hidden">
                  <SmartImage
                    src={method.image}
                    fallback={method.unsplashFallback}
                    alt={method.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
                  <span className="absolute top-3 right-3 text-xs bg-rose-500 text-white font-semibold px-2.5 py-1 rounded-full">
                    {method.badge}
                  </span>
                  <span className="absolute bottom-3 left-3 text-2xl">{method.icon}</span>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-gray-900 text-base mb-1">{method.title}</h3>
                  <p className="text-sm text-rose-500 font-medium mb-2">{method.tagline}</p>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4">{method.detail}</p>
                  <span className="text-sm font-semibold text-rose-500 group-hover:underline">
                    Learn more →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Requirements ─────────────────────────────────────────── */}
      <Requirements onApply={handleApplyClick} />

      {/* ── Testimonials ─────────────────────────────────────────── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-rose-500 font-semibold text-sm uppercase tracking-wider">
              The soft life, for real
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2 mb-3">
              Our team members are living it.
            </h2>
            <p className="text-gray-500">
              Not influencers. Just regular Kenyans who applied and showed up.
            </p>
          </div>
          <TestimonialSlider testimonials={TESTIMONIALS} />
          <p className="text-center text-xs text-gray-400 mt-5">
            ✅ Real team members · Real M-Pesa recipients
          </p>
        </div>
      </section>

      {/* ── Deep Dive / Accordion ────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-rose-500 font-semibold text-sm uppercase tracking-wider">
              Deep dive
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2 mb-3">
              The questions everyone asks
            </h2>
            <p className="text-gray-500">
              Transparent answers — before you even reach out to us.
            </p>
          </div>
          <DeepDiveAccordion />
        </div>
      </section>

      {/* ── Bottom CTA ───────────────────────────────────────────── */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0">
          <SmartImage
            src="/cta/background.jpg"
            fallback="https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1600&h=600&fit=crop&auto=format"
            alt="Remote workers in Kenya"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-linear-to-br from-rose-600/90 to-pink-600/90" />
        </div>

        <div className="relative z-10 max-w-xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-rose-200 font-semibold text-sm uppercase tracking-wider mb-3">
            Ready?
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Your next M-Pesa notification could be from us.
          </h2>
          <p className="text-rose-100 mb-8 leading-relaxed">
            One-time KES 550 setup unlocks your dashboard. KES 200 welcome bonus back immediately.
            Your first task could be live today.
          </p>
          <button
            onClick={handleApplyClick}
            className="inline-block bg-white text-rose-500 font-bold text-base px-10 py-4 rounded-full shadow-xl hover:scale-105 active:scale-95 transition-all"
          >
            Apply to Join — KES 550 One-Time →
          </button>
          <p className="text-rose-200 text-xs mt-4">
            KES 200 welcome bonus back immediately · No monthly charges ever
          </p>
        </div>
      </section>

      {/* ── Blog Links (SEO) ─────────────────────────────────────── */}
      <section className="py-14 bg-gray-50 border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <p className="text-center text-sm font-semibold text-gray-500 mb-6 uppercase tracking-wider">
            Learn more
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
            
              { label: "Remote chatting explained", href: "/earn/chatting" },
              { label: "Training AI from your phone", href: "/earn/ai-training" },
              { label: "Earn by teaching Swahili", href: "/earn/swahili-teaching" },
              { label: "How paid surveys work", href: "/earn/surveys" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-gray-600 bg-white border border-gray-100 px-4 py-2 rounded-full hover:border-rose-200 hover:text-rose-600 transition-all shadow-sm"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Modals ───────────────────────────────────────────────── */}
      {modalOpen && (
        <ApplicationModal
          onClose={() => setModalOpen(false)}
          onSuccess={handleSuccess}
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