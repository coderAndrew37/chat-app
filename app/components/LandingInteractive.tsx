"use client";

import Link from "next/link";
import DeepDiveAccordion from "./DeepDiveAccordion";
import Requirements from "./Requirements";
import SmartImage from "./SmartImage";
import TestimonialSlider from "./TestimonialSlider";
import { VELLOEARN_REGISTER_URL } from "@/lib/constants";

// ─── Data ────────────────────────────────────────────────────────────────────

export const TESTIMONIALS = [
  {
    id: 1,
    initials: "WM",
    name: "Wanjiru M.",
    location: "Nairobi, Westlands",
    quote:
      "I review hotels during my lunch breaks. The M-Pesa hits my phone before I finish my coffee. Nobody at work knows I'm doing this.",
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
      "I book a Diani trip, photograph the lodge while I'm there, write it up, and get paid. That's not work — that's just my life with a side income attached.",
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
      "I mix hotel tasks with AI rating tasks. Between the two I'm sorted every semester. My campus friends keep asking how.",
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
    icon: "🏨",
    title: "Hotel reviews",
    tagline: "Earn KES 250–800 per approved review.",
    detail:
      "Real hotels, lodges, and resorts need honest reviews from real people. Pick a task, complete the review, get paid instantly.",
    href: "/earn/hotel-reviews",
    badge: "🔥 New",
    image: "/earn/hotel-reviews.jpg",
    unsplashFallback:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=360&fit=crop&auto=format",
  },
  {
    icon: "🤖",
    title: "AI training",
    tagline: "Train models. Get paid per task.",
    detail:
      "Rate AI responses, label data, rewrite unnatural outputs. Small tasks, fast payouts, no tech background needed.",
    href: "/earn/ai-training",
    badge: "📈 High demand",
    image: "/earn/ai-training.jpg",
    unsplashFallback:
      "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&h=360&fit=crop&auto=format",
  },
  {
    icon: "💬",
    title: "Remote chat work",
    tagline: "Customer support & moderation tasks.",
    detail:
      "Handle real chats for global brands. Approved playbooks, structured shifts, consistent pay.",
    href: "/earn/chatting",
    badge: "⚡ Popular",
    image: "/earn/chatting.jpg",
    unsplashFallback:
      "https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=600&h=360&fit=crop&auto=format",
  },
  {
    icon: "🌍",
    title: "Teach Swahili",
    tagline: "Foreigners pay to learn what you already speak.",
    detail:
      "Online one-on-one and group lessons for international learners. Your language is your income stream.",
    href: "/earn/swahili-teaching",
    badge: "⭐ Unique skill",
    image: "/earn/swahili.jpg",
    unsplashFallback:
      "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=600&h=360&fit=crop&auto=format",
  },
  {
    icon: "📋",
    title: "Surveys & research",
    tagline: "Your opinions have real value.",
    detail:
      "Paid surveys, product testing, and consumer research tasks. Quick tasks, consistent payouts to M-Pesa.",
    href: "/earn/surveys",
    badge: "⚡ Quick start",
    image: "/earn/surveys.jpg",
    unsplashFallback:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=360&fit=crop&auto=format",
  },
  {
    icon: "📚",
    title: "Academic writing",
    tagline: "Help students with their assignments.",
    detail:
      "Write essays, research papers, and academic content. Flexible deadlines, competitive rates.",
    href: "/earn/academic-writing",
    badge: "🎓 Expert skill",
    image: "/earn/academic-writing.jpg",
    unsplashFallback:
      "https://images.unsplash.com/photo-1507842217343-583bb72959d3?w=600&h=360&fit=crop&auto=format",
  },
];

// ─── Main Landing Component ───────────────────────────────────────────────────

export default function LandingInteractive() {
  return (
    <main className="bg-gray-50 min-h-screen">
      {/* ── 1. HERO ──────────────────────────────────────────────────────── */}
      <section className="relative pt-12 pb-16 sm:pt-20 sm:pb-24 overflow-hidden bg-gradient-to-br from-rose-50 via-white to-violet-50">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-rose-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-violet-200/20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: copy */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-white border border-gray-100 shadow-sm text-gray-700 text-sm font-medium px-4 py-1.5 rounded-full mb-8">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                Tasks open now · Paid instantly to M-Pesa
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-[1.05] tracking-tight mb-5">
                Real work.
                <br />
                Real payouts.
                <br />
                <span className="text-rose-500">No drama.</span>
              </h1>

              <p className="text-lg sm:text-xl text-gray-500 leading-relaxed mb-4 max-w-xl mx-auto lg:mx-0">
                Review hotels, train AI models, or handle chat tasks for real clients. Pick
                a task, complete it, get paid to M-Pesa.
              </p>

              <p className="text-base text-gray-400 mb-10 max-w-lg mx-auto lg:mx-0">
                Free to join · No experience needed · Instant M-Pesa payouts
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <Link
                  href="/earn/hotel-reviews"
                  className="bg-rose-500 hover:bg-rose-600 text-white font-bold text-base px-8 py-4 rounded-full shadow-lg shadow-rose-200 transition-all hover:scale-105 active:scale-95 text-center"
                >
                  Browse Open Tasks →
                </Link>
                <a
                  href="#ways-to-earn"
                  className="bg-white hover:bg-gray-50 text-gray-700 font-semibold text-base px-8 py-4 rounded-full border border-gray-200 shadow-sm transition-all hover:scale-105 active:scale-95 text-center"
                >
                  See all ways to earn
                </a>
              </div>

              {/* Micro trust */}
              <div className="mt-12 flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-3 text-xs text-gray-500">
                <span className="inline-flex items-center gap-1.5">
                  <svg
                    className="w-4 h-4 text-emerald-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Free to join
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <svg
                    className="w-4 h-4 text-emerald-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Instant M-Pesa
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <svg
                    className="w-4 h-4 text-emerald-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  No experience required
                </span>
              </div>
            </div>

            {/* Right: image collage */}
            <div className="hidden lg:flex flex-col gap-3 h-[500px]">
              <div className="flex gap-3 flex-1 min-h-0">
                <div className="relative w-[56%] rounded-3xl overflow-hidden shadow-xl">
                  <SmartImage
                    src="/hero/hotel-main.jpg"
                    fallback="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=900&fit=crop&auto=format"
                    alt="Hotel exterior being reviewed"
                    fill
                    priority
                    className="object-cover"
                    sizes="25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-3 right-3 bg-white/95 backdrop-blur-sm rounded-2xl px-3 py-2.5 flex items-center gap-2.5">
                    <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-sm shrink-0">
                      💸
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] text-gray-400 leading-none mb-0.5">
                        M-Pesa received
                      </p>
                      <p className="text-sm font-extrabold text-gray-900 leading-none">
                        +KES 450
                      </p>
                    </div>
                    <span className="text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full whitespace-nowrap">
                      just now
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-3 flex-1 min-w-0">
                  <div className="relative flex-1 rounded-2xl overflow-hidden shadow-lg">
                    <SmartImage
                      src="/hero/reviewer.jpg"
                      fallback="https://images.unsplash.com/photo-1587560699334-cc4ff634909a?w=400&h=300&fit=crop&auto=format"
                      alt="Reviewer photographing a hotel room"
                      fill
                      className="object-cover"
                      sizes="15vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  </div>
                  <div className="relative flex-1 rounded-2xl overflow-hidden shadow-lg">
                    <SmartImage
                      src="/hero/lifestyle.jpg"
                      fallback="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop&auto=format"
                      alt="Remote worker completing tasks on phone"
                      fill
                      className="object-cover"
                      sizes="15vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  </div>
                </div>
              </div>

              {/* Reviewer strip */}
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
                    +1k
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-gray-900 truncate">
                    Active reviewers this week
                  </p>
                  <p className="text-[10px] text-gray-400 truncate">
                    Nairobi · Mombasa · Kisumu · Eldoret
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. EARNING METHODS ───────────────────────────────────────────── */}
      <section id="ways-to-earn" className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-rose-500 font-semibold text-sm uppercase tracking-wider">
              Ways to earn
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2 mb-3">
              Six tracks. One account.
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Pick what fits your schedule and skills — or stack them. Every track pays to
              M-Pesa.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {EARNING_METHODS.map((method) => (
              <Link
                key={method.title}
                href={method.href}
                className="group bg-white rounded-2xl border border-gray-200 hover:border-rose-300 shadow-sm hover:shadow-xl hover:shadow-rose-100/50 transition-all block overflow-hidden flex flex-col"
              >
                <div className="relative w-full h-40 overflow-hidden bg-gray-100">
                  <SmartImage
                    src={method.image}
                    fallback={method.unsplashFallback}
                    alt={method.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  <span className="absolute top-3 right-3 text-[10px] bg-white/95 backdrop-blur-sm text-gray-900 font-semibold px-2.5 py-1 rounded-full shadow-sm">
                    {method.badge}
                  </span>
                  <span className="absolute bottom-3 left-3 text-2xl drop-shadow">
                    {method.icon}
                  </span>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-bold text-gray-900 text-base mb-1 group-hover:text-rose-600 transition-colors">
                    {method.title}
                  </h3>
                  <p className="text-sm text-rose-500 font-medium mb-2">
                    {method.tagline}
                  </p>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4 flex-1">
                    {method.detail}
                  </p>
                  <span className="text-sm font-semibold text-rose-500 group-hover:underline inline-flex items-center gap-1">
                    Explore tasks
                    <svg
                      className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. WHY IT WORKS ──────────────────────────────────────────────── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <span className="text-rose-500 font-semibold text-sm uppercase tracking-wider">
                Why it works
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2 mb-5">
                Real tasks from real clients. Nothing made up.
              </h2>
              <p className="text-gray-600 leading-relaxed mb-5">
                VelloEarn is the onramp to real remote work. Hotels need verified reviews.
                AI companies need human feedback. Brands need chat support. You complete the
                task, we clear the payout.
              </p>
              <ul className="space-y-3 text-sm text-gray-600">
                {[
                  "Every task shows the exact payout before you claim it",
                  "No minimum balance — withdraw the moment a task is approved",
                  "Straight to M-Pesa. No payroll cycles, no waiting weeks",
                  "Free to join. No CV, no interview, no hidden fees",
                ].map((point) => (
                  <li key={point} className="flex items-start gap-2.5">
                    <svg
                      className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-xl">
              <SmartImage
                src="/about/reviewer.jpg"
                fallback="https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=800&fit=crop&auto=format"
                alt="Contributor completing a task"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-rose-900/60 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4">
                  <div className="text-[10px] font-semibold text-rose-600 uppercase tracking-wider mb-1">
                    Average active reviewer
                  </div>
                  <div className="text-xl font-extrabold text-gray-900">
                    KES 15,000
                    <span className="text-xs font-normal text-gray-500"> /month</span>
                  </div>
                  <div className="text-[11px] text-gray-400 mt-0.5">
                    combining hotel + AI tasks
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. REQUIREMENTS ──────────────────────────────────────────────── */}
      <Requirements />

      {/* ── 5. MORE WAYS TO EARN — compact cross-sell ────────────────────── */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <span className="text-rose-500 font-semibold text-xs uppercase tracking-wider">
              Not what you&apos;re looking for?
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-2">
              Explore the other tracks.
            </h2>
            <p className="text-gray-500 text-sm mt-2 max-w-lg mx-auto">
              Each track has its own task queue, payout structure, and schedule. Mix them or
              stick to one.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              {
                icon: "🏨",
                label: "Hotel reviews",
                sub: "KES 250–800 / review",
                href: "/earn/hotel-reviews",
              },
              {
                icon: "🤖",
                label: "AI training",
                sub: "KES 90–200 / task",
                href: "/earn/ai-training",
              },
              {
                icon: "💬",
                label: "Chat work",
                sub: "Per completed shift",
                href: "/earn/chatting",
              },
              {
                icon: "🌍",
                label: "Swahili teaching",
                sub: "Set your own rate",
                href: "/earn/swahili-teaching",
              },
            ].map((track) => (
              <Link
                key={track.href}
                href={track.href}
                className="group bg-white rounded-xl border border-gray-200 hover:border-rose-300 hover:shadow-md transition-all p-4 text-center"
              >
                <div className="text-2xl mb-2">{track.icon}</div>
                <div className="text-sm font-bold text-gray-900 group-hover:text-rose-600 transition-colors">
                  {track.label}
                </div>
                <div className="text-[11px] text-gray-400 mt-1">{track.sub}</div>
              </Link>
            ))}
          </div>

          <p className="text-center text-xs text-gray-400 mt-6">
            Also on VelloEarn:{" "}
            <Link
              href="/earn/surveys"
              className="text-rose-500 hover:underline font-medium"
            >
              surveys
            </Link>
            {" · "}
            <Link
              href="/earn/academic-writing"
              className="text-rose-500 hover:underline font-medium"
            >
              academic writing
            </Link>
            {" · "}
            <Link
              href="/earn/forex"
              className="text-rose-500 hover:underline font-medium"
            >
              forex
            </Link>
          </p>
        </div>
      </section>

      {/* ── 6. TESTIMONIALS ──────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-rose-500 font-semibold text-sm uppercase tracking-wider">
              The soft life, for real
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2 mb-3">
              From people already doing it
            </h2>
            <p className="text-gray-500">
              Not influencers. Regular people who signed up and showed up.
            </p>
          </div>
          <TestimonialSlider testimonials={TESTIMONIALS} />
          <p className="text-center text-xs text-gray-400 mt-5">
            ✅ Real contributors · Real M-Pesa recipients
          </p>
        </div>
      </section>

      {/* ── 7. FAQ ───────────────────────────────────────────────────────── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-rose-500 font-semibold text-sm uppercase tracking-wider">
              Straight answers
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2 mb-3">
              The questions you&apos;re already asking
            </h2>
            <p className="text-gray-500">
              Transparent answers before you sign up — nothing hidden.
            </p>
          </div>
          <DeepDiveAccordion />
        </div>
      </section>

      {/* ── 8. FINAL CTA ─────────────────────────────────────────────────── */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-500 to-pink-600" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full translate-x-1/3 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/10 rounded-full -translate-x-1/3 translate-y-1/3 pointer-events-none" />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white text-sm font-semibold px-4 py-2 rounded-full mb-6">
            🚀 Tasks open now across Kenya
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
            Pick a task. Start earning <br />
            <span className="text-rose-200">this week.</span>
          </h2>

          <p className="text-rose-100 text-lg mb-8 max-w-xl mx-auto">
            Free to join. No experience needed. Every task shows its payout upfront — the
            money hits your M-Pesa as soon as it&apos;s approved.
          </p>

          <div className="flex flex-wrap justify-center gap-6 mb-8 text-white/80 text-sm">
            <span>✅ Free to join</span>
            <span>💸 No fees ever</span>
            <span>📱 Phone-only tasks</span>
            <span>⚡ Instant M-Pesa payouts</span>
          </div>

          <Link
            href="/earn/hotel-reviews"
            className="inline-block bg-white text-rose-500 hover:bg-rose-50 font-extrabold text-lg sm:text-xl px-10 sm:px-12 py-4 sm:py-5 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all"
          >
            Browse Open Tasks →
          </Link>

          <p className="text-rose-200/70 text-sm mt-4">
            No credit card · No payment required · Start earning today
          </p>
        </div>
      </section>

      {/* ── 9. BLOG LINKS ────────────────────────────────────────────────── */}
      <section className="py-14 bg-gray-50 border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <p className="text-center text-sm font-semibold text-gray-500 mb-6 uppercase tracking-wider">
            Learn more
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { label: "Hotel reviews explained", href: "/earn/hotel-reviews" },
              { label: "Training AI from your phone", href: "/earn/ai-training" },
              { label: "Remote chat work", href: "/earn/chatting" },
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
    </main>
  );
}