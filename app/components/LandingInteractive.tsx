"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { whatsappNumber } from "@/lib/constants";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ApplicationFormData {
  name: string;
  whatsapp: string;
}

interface TestimonialItem {
  id: number;
  initials: string;
  name: string;
  location: string;
  quote: string;
  lifestyle: string;
  earned: string;
  image: string;
  unsplashFallback: string;
}

interface EarningMethod {
  icon: string;
  title: string;
  tagline: string;
  detail: string;
  href: string;
  badge: string;
  image: string;
  unsplashFallback: string;
}

interface DeepDiveItem {
  question: string;
  answer: string;
}

interface RequirementItem {
  icon: string;
  text: string;
}

// ─── SmartImage ───────────────────────────────────────────────────────────────

function SmartImage({
  src,
  fallback,
  alt,
  fill,
  width,
  height,
  className,
  sizes,
  priority,
}: {
  src: string;
  fallback: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  const sharedProps = {
    src: imgSrc,
    alt,
    className,
    onError: () => setImgSrc(fallback),
    sizes,
    priority,
  };

  return fill ? (
    <Image {...sharedProps} fill unoptimized />
  ) : (
    <Image {...sharedProps} width={width ?? 400} height={height ?? 300} unoptimized />
  );
}

// ─── Data ────────────────────────────────────────────────────────────────────

const TESTIMONIALS: TestimonialItem[] = [
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

const EARNING_METHODS: EarningMethod[] = [
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
];

const DEEP_DIVE_ITEMS: DeepDiveItem[] = [
  {
    question: "How does the team commission model work?",
    answer:
      "Beyond your direct earnings, you also benefit when people you bring onto the team become active. As your team grows and performs, your earnings grow with them — without doing their work. It's a structured multi-level system that rewards both your direct output and your ability to build a productive network.",
  },
  {
    question: "What does 'structured earning environment' mean?",
    answer:
      "Unlike random gig apps, VelloEarn provides defined tasks, clear rate cards, and a team structure. You know exactly what you're doing, how much it pays, and when your money moves to M-Pesa. No ambiguity, no chasing payments.",
  },
  {
    question: "How do M-Pesa payouts work?",
    answer:
      "Your earnings accumulate in your dashboard. When you request a withdrawal, the system processes it directly to your registered M-Pesa number. Most withdrawals complete in minutes. There's no third-party handling your money — it's a direct integration. Want the full breakdown? Read our guide on how M-Pesa payments work.",
  },
  {
    question: "Can I scale this into serious income?",
    answer:
      "Yes — and this is where most people underestimate the opportunity. Starting solo is fine, but the real growth comes when you build your team. Some of our most consistent earners spend less than 2 hours a day on direct tasks and earn more than a full-time salary through their team's activity. Read our guide on scaling your team for a step-by-step breakdown.",
  },
  {
    question: "Is there a cost to get started?",
    answer:
      "The application and review process is free. If you're selected to join the active team, there's a one-time account activation step — details of which are shared privately with accepted applicants via WhatsApp. We keep this process intentional to maintain quality on our platform.",
  },
];

const REQUIREMENTS: RequirementItem[] = [
  { icon: "📱", text: "A smartphone (Android or iPhone)" },
  { icon: "💬", text: "Good communication skills in English or Swahili" },
  { icon: "🎯", text: "A serious attitude toward building remote income" },
  { icon: "📶", text: "Stable internet connection" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function TestimonialSlider() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = useCallback(() => {
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
  }, []);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTimer]);

  const goTo = (index: number) => {
    setCurrent(index);
    if (timerRef.current) clearInterval(timerRef.current);
    startTimer();
  };

  const t = TESTIMONIALS[current];

  return (
    <div>
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm min-h-[200px] transition-all duration-500">
        <div className="flex items-start gap-4 mb-5">
          <div className="relative w-11 h-11 rounded-full overflow-hidden shrink-0 bg-rose-100">
            <SmartImage
              src={t.image}
              fallback={t.unsplashFallback}
              alt={t.name}
              fill
              className="object-cover"
              sizes="44px"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-gray-900 text-sm">{t.name}</div>
            <div className="text-xs text-gray-400">{t.location}</div>
          </div>
          <div className="text-right shrink-0">
            <div className="text-base font-bold text-emerald-600">{t.earned}</div>
            <div className="text-xs mt-0.5 bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full font-medium">
              {t.lifestyle}
            </div>
          </div>
        </div>
        <p className="text-gray-600 text-sm sm:text-base leading-relaxed italic">
          &ldquo;{t.quote}&rdquo;
        </p>
      </div>
      <div className="flex justify-center gap-2 mt-5">
        {TESTIMONIALS.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`rounded-full transition-all duration-300 ${
              i === current ? "w-6 h-2 bg-rose-500" : "w-2 h-2 bg-gray-200 hover:bg-rose-200"
            }`}
            aria-label={`Testimonial ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

function DeepDiveAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {DEEP_DIVE_ITEMS.map((item, i) => (
        <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full flex items-center justify-between px-5 py-4 text-left"
          >
            <span className="font-semibold text-gray-900 text-sm sm:text-base pr-4">
              {item.question}
            </span>
            <span
              className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 ${
                openIndex === i ? "bg-rose-500 text-white rotate-45" : "bg-gray-100 text-gray-500"
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </span>
          </button>
          {openIndex === i && (
            <div className="px-5 pb-5">
              <p className="text-gray-500 text-sm leading-relaxed">{item.answer}</p>
              {i === 2 && (
                <Link
                  href="/blog/mpesa-payments"
                  className="inline-flex items-center gap-1 text-rose-500 text-sm font-medium mt-3 hover:underline"
                >
                  Read: How M-Pesa payments work →
                </Link>
              )}
              {i === 3 && (
                <Link
                  href="/blog/scale-your-team"
                  className="inline-flex items-center gap-1 text-rose-500 text-sm font-medium mt-3 hover:underline"
                >
                  Read: How to scale your team →
                </Link>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function ApplicationModal({
  onClose,
  onSuccess,
}: {
  onClose: () => void;
  onSuccess: (data: ApplicationFormData) => void;
}) {
  const [form, setForm] = useState<ApplicationFormData>({ name: "", whatsapp: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<ApplicationFormData>>({});

  const validate = (): boolean => {
    const newErrors: Partial<ApplicationFormData> = {};
    if (!form.name.trim() || form.name.trim().length < 2) {
      newErrors.name = "Please enter your full name";
    }
    const cleaned = form.whatsapp.replace(/\s/g, "");
    if (!cleaned || !/^(07|01|\+254|254)\d{8,9}$/.test(cleaned)) {
      newErrors.whatsapp = "Enter a valid Kenyan number (e.g. 0712345678)";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200));
    setIsSubmitting(false);
    onSuccess(form);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ background: "rgba(0,0,0,0.5)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white w-full sm:max-w-md sm:rounded-3xl rounded-t-3xl shadow-2xl overflow-hidden">
        {/* Modal hero image */}
        <div className="relative h-36 w-full">
          <SmartImage
            src="/modal/team-working.jpg"
            fallback="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=300&fit=crop&auto=format"
            alt="VelloEarn team working remotely"
            fill
            className="object-cover"
            sizes="(max-width: 448px) 100vw, 448px"
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/10 to-black/50" />
        </div>

        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                Applications Open
              </div>
              <h2 className="text-xl font-extrabold text-gray-900 leading-tight">
                Apply to Join the Team
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                We&apos;ll review your application and reach out on WhatsApp within 24 hours.
              </p>
            </div>
            <button
              aria-label="close application form"
              onClick={onClose}
              className="shrink-0 ml-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Your full name
              </label>
              <input
                type="text"
                placeholder="e.g. Wanjiru Muthoni"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 transition ${
                  errors.name ? "border-red-300 bg-red-50" : "border-gray-200 bg-gray-50"
                }`}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                WhatsApp number
              </label>
              <input
                type="tel"
                placeholder="e.g. 0712 345 678"
                value={form.whatsapp}
                onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 transition ${
                  errors.whatsapp ? "border-red-300 bg-red-50" : "border-gray-200 bg-gray-50"
                }`}
              />
              {errors.whatsapp && <p className="text-red-500 text-xs mt-1">{errors.whatsapp}</p>}
              <p className="text-xs text-gray-400 mt-1">
                This is where we&apos;ll send your activation instructions.
              </p>
            </div>

            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full bg-rose-500 hover:bg-rose-600 disabled:bg-rose-300 text-white font-bold text-base py-4 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-rose-200 mt-2"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Submitting application...
                </span>
              ) : (
                "Submit My Application →"
              )}
            </button>
          </div>

          <p className="text-center text-xs text-gray-400 mt-4">
            By applying you agree to our terms. We don&apos;t share your details with third parties.
          </p>
        </div>
      </div>
    </div>
  );
}

function SuccessState({
  data,
  onClose,
}: {
  data: ApplicationFormData;
  onClose: () => void;
}) {
  const firstName = data.name.trim().split(" ")[0];
  const message = encodeURIComponent(
    `Hi! My name is ${data.name} and I just applied to join the VelloEarn remote team. My WhatsApp is ${data.whatsapp}. I'd like to confirm my application and receive my activation instructions.`
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ background: "rgba(0,0,0,0.5)" }}
    >
      <div className="bg-white w-full sm:max-w-md sm:rounded-3xl rounded-t-3xl p-6 sm:p-8 shadow-2xl text-center">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-5">
          <svg className="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-xl font-extrabold text-gray-900 mb-2">
          Application received, {firstName}!
        </h2>
        <p className="text-gray-500 text-sm leading-relaxed mb-6">
          We&apos;re reviewing your profile now. To confirm your spot and receive your activation
          instructions, tap the button below to message our team directly on WhatsApp.
        </p>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-base py-4 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-green-200 mb-3"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Confirm on WhatsApp
        </a>
        <button onClick={onClose} className="text-sm text-gray-400 hover:text-gray-600 transition">
          I&apos;ll do this later
        </button>
      </div>
    </div>
  );
}

// ─── Main Landing Component ───────────────────────────────────────────────────

export default function LandingInteractive() {
  const [modalOpen, setModalOpen] = useState(false);
  const [successData, setSuccessData] = useState<ApplicationFormData | null>(null);

  const handleSuccess = (data: ApplicationFormData) => {
    setModalOpen(false);
    setSuccessData(data);
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
                M-Pesa notifications while you&apos;re out with friends. School fees sorted. Travel booked.
                That&apos;s the goal — and it&apos;s what our team members are already doing.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <button
                  onClick={() => setModalOpen(true)}
                  className="bg-rose-500 hover:bg-rose-600 text-white font-bold text-base px-8 py-4 rounded-full shadow-lg shadow-rose-200 transition-all hover:scale-105 active:scale-95"
                >
                  Apply to Join the Team
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
                  { value: "4 ways", label: "To earn" },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="text-xl font-extrabold text-gray-900">{s.value}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: image collage */}
            <div className="hidden lg:flex flex-col gap-3 h-[500px]">

              {/* Top row: tall portrait + two stacked images */}
              <div className="flex gap-3 flex-1 min-h-0">

                {/* Tall portrait — left */}
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
                  {/* M-Pesa badge overlaid on portrait */}
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

                {/* Right column: two stacked images */}
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

              {/* Bottom: stat bar */}
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

          {/* Wide lifestyle image */}
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
              We have four different earning tracks. Pick what suits you — or do all four.
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
      <section className="relative py-20 overflow-hidden">
        {/* Background image — sits at z-0, no negative z-index */}
        <div className="absolute inset-0">
          <Image
            src="/background.jpg"
            alt="Background"
            fill
            priority
            className="object-cover"
            quality={90}
          />
          {/* Frosted overlay keeps text legible while image shows through */}
          <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px]" />
        </div>

        {/* Content floats above */}
        <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-rose-500 font-semibold text-sm uppercase tracking-wider">
              Who qualifies
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2 mb-3">
              The bar is low. The results aren&apos;t.
            </h2>
            <p className="text-gray-600">
              You don&apos;t need a degree, experience, or a laptop. Just these.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {REQUIREMENTS.map((req) => (
              <div
                key={req.text}
                className="flex items-center gap-4 bg-white/70 backdrop-blur-md rounded-2xl p-5 border border-white/50 shadow-sm"
              >
                <span className="text-xl shrink-0">{req.icon}</span>
                <span className="text-gray-700 text-sm font-medium">{req.text}</span>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <button
              onClick={() => setModalOpen(true)}
              className="bg-rose-500 hover:bg-rose-600 text-white font-bold text-base px-8 py-4 rounded-full shadow-lg shadow-rose-200 transition-all hover:scale-105 active:scale-95"
            >
              I qualify — Apply now
            </button>
          </div>
        </div>
      </section>

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
          <TestimonialSlider />
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
            Applications take 2 minutes. Activation happens on WhatsApp. Your first task could be live
            today.
          </p>
          <button
            onClick={() => setModalOpen(true)}
            className="inline-block bg-white text-rose-500 font-bold text-base px-10 py-4 rounded-full shadow-xl hover:scale-105 active:scale-95 transition-all"
          >
            Apply to Join the Team →
          </button>
          <p className="text-rose-200 text-xs mt-4">
            Serious applicants only · Activation details shared via WhatsApp
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
              { label: "How M-Pesa payments work", href: "/blog/mpesa-payments" },
              { label: "Scaling your remote team", href: "/blog/scale-your-team" },
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

      {/* ── WhatsApp FAB ─────────────────────────────────────────── */}
      <a
        href={`https://wa.me/${whatsappNumber}?text=Hi%2C%20I%27d%20like%20to%20apply%20to%20join%20the%20VelloEarn%20remote%20team.`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95"
        aria-label="Chat on WhatsApp"
      >
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>

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