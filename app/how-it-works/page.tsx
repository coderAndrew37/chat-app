import { BASE_URL } from "@/lib/config";
import type { Metadata } from "next";
import Link from "next/link";
import { MessageCircle, Users, Clock, Shield, Zap, Award } from "lucide-react";
import Image from "next/image";

export const metadata: Metadata = {
  title: "How It Works — Chat with Foreigners & Earn M-Pesa | VelloEarn",
  description:
    "Learn how VelloEarn works. Free to join. Chat with lonely foreigners. Earn M-Pesa instantly. No fees, no experience needed. Start today.",
  alternates: {
    canonical: `${BASE_URL}/how-it-works`,
  },
  openGraph: {
    title: "How It Works — Chat & Earn in Kenya",
    description:
      "Free to join. Chat with lonely foreigners. Earn M-Pesa instantly. No fees, no experience needed.",
    type: "website",
    locale: "en_KE",
    siteName: "VelloEarn",
    url: `${BASE_URL}/how-it-works`,
  },
  twitter: {
    card: "summary_large_image",
    title: "How It Works — Chat & Earn in Kenya",
    description:
      "Free to join. Chat with lonely foreigners. Earn M-Pesa instantly. No fees, no experience needed.",
  },
};

// ─── JSON-LD schema ───────────────────────────────────────────────────────────

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to earn money by chatting with foreigners on VelloEarn",
  description:
    "A step-by-step guide to earning money by chatting with lonely foreigners on VelloEarn. Free to join, no experience needed, instant M-Pesa payouts.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Create your free account",
      text: "Sign up in 2 minutes. No registration fees, no CV, no interview. Your account is active immediately.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Browse live profiles",
      text: "See who's online and looking to chat. Browse profiles of lonely foreigners from USA, UK, Europe, and more.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Start chatting and earning",
      text: "Start conversations, share your culture, build friendships. Every conversation earns you money.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Withdraw to M-Pesa instantly",
      text: "Your earnings accumulate with every chat. Withdraw to M-Pesa anytime with no minimum balance.",
    },
  ],
};

// ─── Static data ──────────────────────────────────────────────────────────────

interface Step {
  number: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  detail: string;
  image?: string;
}

const STEPS: Step[] = [
  {
    number: 1,
    icon: <MessageCircle className="w-6 h-6" />,
    title: "Sign Up for Free",
    description: "Create your account in 2 minutes",
    detail: "No registration fees. No CV. No interview. Your account is active immediately. Just provide your phone number and create a profile.",
  },
  {
    number: 2,
    icon: <Users className="w-6 h-6" />,
    title: "Browse Live Profiles",
    description: "Find people to chat with",
    detail: "See who's online right now. Browse profiles of lonely foreigners from USA, UK, Canada, Australia, and Europe. Each profile shows their interests and what they're looking for.",
  },
  {
    number: 3,
    icon: <Zap className="w-6 h-6" />,
    title: "Start Chatting",
    description: "Earn from every conversation",
    detail: "Start a conversation with anyone online. Chat about daily life, culture, hobbies, or whatever they want to talk about. Every message earns you money. The more you chat, the more you earn.",
  },
  {
    number: 4,
    icon: <Award className="w-6 h-6" />,
    title: "Earn & Withdraw",
    description: "M-Pesa payout instantly",
    detail: "Your earnings grow with every chat. Withdraw to M-Pesa anytime you want — no minimum balance, no waiting periods. Most payouts clear within 30 minutes.",
  },
];

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FEATURES: Feature[] = [
  {
    icon: <Shield className="w-6 h-6 text-emerald-500" />,
    title: "100% Free to Join",
    description: "No registration fees. No monthly subscriptions. No hidden charges. Ever.",
  },
  {
    icon: <Clock className="w-6 h-6 text-rose-500" />,
    title: "Instant M-Pesa Payouts",
    description: "Withdraw your earnings anytime. No minimum balance. Most payouts clear within 30 minutes.",
  },
  {
    icon: <Users className="w-6 h-6 text-blue-500" />,
    title: "50,000+ Active Chatters",
    description: "Join a thriving community of Kenyans earning money by chatting with foreigners.",
  },
  {
    icon: <Zap className="w-6 h-6 text-amber-500" />,
    title: "Chat Anytime, Anywhere",
    description: "Work from your phone. No office, no schedule. Chat whenever you have free time.",
  },
];

interface Testimonial {
  name: string;
  age: number;
  location: string;
  quote: string;
  earnings: string;
  avatar: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Grace M.",
    age: 24,
    location: "Nairobi",
    quote: "I started chatting with foreigners on VelloEarn and made KES 5,000 in my first week. It's so easy — I just chat during my breaks and after work.",
    earnings: "KES 5,000/week",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&h=200&q=80",
  },
  {
    name: "David O.",
    age: 31,
    location: "Mombasa",
    quote: "I was skeptical at first, but VelloEarn is legit. I've made KES 12,000 this month just chatting with people from the UK and USA. The M-Pesa payouts are instant.",
    earnings: "KES 12,000/month",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80",
  },
  {
    name: "Sarah K.",
    age: 27,
    location: "Kisumu",
    quote: "I love chatting with foreigners and learning about their cultures. Getting paid for it is just a bonus. I've made friends all over the world while earning.",
    earnings: "KES 8,000/month",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&h=200&q=80",
  },
];

// ─── Page component ───────────────────────────────────────────────────────────

export default function HowItWorks() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="bg-white min-h-screen">

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section className="relative pt-28 pb-16 overflow-hidden bg-gradient-to-br from-rose-50 via-white to-pink-50">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-rose-200/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-20 left-0 w-64 h-64 bg-rose-100/30 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-20 right-0 w-64 h-64 bg-pink-100/30 rounded-full blur-3xl pointer-events-none" />

          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 bg-white border border-gray-100 shadow-sm rounded-full px-4 py-2 mb-8 text-sm text-gray-600">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              How VelloEarn Works
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.08] tracking-tight text-gray-900 mb-6">
              Chat with foreigners.
              <br />
              <span className="text-rose-500">Earn M-Pesa instantly.</span>
            </h1>

            <p className="text-lg text-gray-500 leading-relaxed max-w-2xl mx-auto mb-10">
              Four simple steps from signing up to your first M-Pesa payout. 
              Free to join. No experience needed. Start today.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://starhela.com/register?ref=velloearn"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-rose-500 hover:bg-rose-600 text-white font-bold text-base px-8 py-4 rounded-full shadow-lg shadow-rose-200 transition-all hover:scale-105 active:scale-95"
              >
                Start Chatting Now — Free
              </a>
              <Link
                href="#steps"
                className="bg-white hover:bg-gray-50 text-gray-700 font-semibold text-base px-8 py-4 rounded-full border border-gray-200 shadow-sm transition-all hover:scale-105 active:scale-95"
              >
                See the steps ↓
              </Link>
            </div>
          </div>
        </section>

        {/* ── QUICK STATS ───────────────────────────────────────────────────── */}
        <section className="py-8 bg-white border-t border-gray-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: "Free to join", value: "100%" },
                { label: "M-Pesa payout time", value: "< 30 min" },
                { label: "Active chatters", value: "61,000+" },
                { label: "Chat availability", value: "24/7" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-bold text-rose-500">{stat.value}</div>
                  <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── STEPS ─────────────────────────────────────────────────────────── */}
        <section id="steps" className="py-20 bg-gray-50 border-t border-gray-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <p className="text-xs font-mono text-rose-400 uppercase tracking-widest mb-3">
                Four simple steps
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
                How to start earning today
              </h2>
              <p className="text-gray-500 max-w-lg mx-auto mt-2">
                From sign up to your first M-Pesa payout in hours, not days.
              </p>
            </div>

            <div className="space-y-8">
              {STEPS.map((step, index) => (
                <div
                  key={step.number}
                  className={`flex flex-col ${
                    index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  } gap-8 lg:gap-12 items-center bg-white border border-gray-100 rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow`}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-500 flex items-center justify-center">
                        {step.icon}
                      </div>
                      <span className="text-sm font-mono text-gray-400">Step {step.number}/4</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-rose-500 font-medium mb-2">{step.description}</p>
                    <p className="text-gray-500 leading-relaxed">{step.detail}</p>
                  </div>
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-rose-100 to-pink-100 flex items-center justify-center text-4xl font-bold text-rose-500">
                      {step.number}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA after steps */}
            <div className="mt-12 text-center">
              <a
                href="https://starhela.com/register?ref=velloearn"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-rose-500 hover:bg-rose-600 text-white font-bold text-base px-10 py-4 rounded-full transition-all hover:scale-105 active:scale-95 shadow-lg shadow-rose-200"
              >
                Start Your Free Account →
              </a>
              <p className="text-gray-400 text-sm mt-3">No registration fees · No hidden charges</p>
            </div>
          </div>
        </section>

        {/* ── FEATURES ──────────────────────────────────────────────────────── */}
        <section className="py-20 bg-white border-t border-gray-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-xs font-mono text-rose-400 uppercase tracking-widest mb-3">
                Why VelloEarn
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
                What makes VelloEarn different
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {FEATURES.map((feature) => (
                <div
                  key={feature.title}
                  className="bg-gray-50 border border-gray-100 rounded-2xl p-6 text-center hover:border-rose-200 transition-colors group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-white border border-gray-100 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ──────────────────────────────────────────────────── */}
        <section className="py-20 bg-gray-50 border-t border-gray-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-xs font-mono text-rose-400 uppercase tracking-widest mb-3">
                Real stories
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
                What Kenyan chatters are saying
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {TESTIMONIALS.map((t) => (
                <div
                  key={t.name}
                  className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 italic">&quot;{t.quote}&quot;</p>
                  <div className="inline-block bg-emerald-50 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full">
                    Earns {t.earnings}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ───────────────────────────────────────────────────────────── */}
        <section className="py-20 bg-white border-t border-gray-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-xs font-mono text-rose-400 uppercase tracking-widest mb-3">
                Common questions
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
                Quick answers
              </h2>
            </div>

            <div className="space-y-3">
              {[
                {
                  q: "How much does it cost to join VelloEarn?",
                  a: "VelloEarn is completely free to join. No registration fees, no monthly subscriptions, no hidden charges — ever.",
                },
                {
                  q: "Do I need a bank account to receive payments?",
                  a: "No. All earnings are paid directly to your M-Pesa wallet. No bank account, PayPal, or international payment processor is required.",
                },
                {
                  q: "Who will I be chatting with?",
                  a: "You'll chat with lonely foreigners from countries like the USA, UK, Canada, Australia, and Europe. They're looking for genuine conversation and cultural exchange.",
                },
                {
                  q: "How long does it take to start earning?",
                  a: "Immediately. After signing up for free, you can browse live profiles and start chatting right away. Most members earn within their first hour.",
                },
                {
                  q: "Do I need experience or perfect English?",
                  a: "No. You just need conversational English and a friendly personality. No degrees, no experience, no CV needed.",
                },
              ].map((faq, index) => (
                <details
                  key={index}
                  className="group bg-gray-50 border border-gray-200 hover:border-rose-200 rounded-2xl transition-colors duration-200"
                >
                  <summary className="flex items-center justify-between cursor-pointer list-none p-6">
                    <span className="font-semibold text-gray-900 text-sm sm:text-base pr-4">
                      {faq.q}
                    </span>
                    <span className="shrink-0 w-8 h-8 rounded-full bg-white flex items-center justify-center text-gray-400 group-open:bg-rose-100 group-open:text-rose-500 transition-all">
                      <svg
                        className="w-4 h-4 transition-transform duration-200 group-open:rotate-45"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                      </svg>
                    </span>
                  </summary>
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ────────────────────────────────────────────────────── */}
        <section className="py-20 bg-gradient-to-br from-rose-500 to-pink-600 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-1/3 translate-y-1/3 pointer-events-none" />

          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
            <div className="text-5xl mb-5">💬</div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              Ready to start chatting and earning?
            </h2>
            <p className="text-rose-100 text-lg mb-10 leading-relaxed max-w-xl mx-auto">
              Free to join. No experience needed. Your first M-Pesa payout could be today.
            </p>
            <a
              href="https://starhela.com/register?ref=velloearn"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white hover:bg-rose-50 text-rose-500 font-bold text-base px-10 py-4 rounded-full shadow-xl transition-all hover:scale-105 active:scale-95"
            >
              Start Chatting Now — Free →
            </a>
            <p className="text-rose-200 text-xs mt-5">
              No registration fees · Instant M-Pesa payouts · 61,000+ active chatters
            </p>
          </div>
        </section>

        {/* ── NAV LINKS ─────────────────────────────────────────────────────── */}
        <div className="border-t border-gray-100 py-6 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap justify-center gap-5 text-xs text-gray-400">
            <Link href="/" className="hover:text-gray-600 transition-colors">← Home</Link>
            <Link href="/about" className="hover:text-gray-600 transition-colors">About</Link>
            <Link href="/earn/chatting" className="hover:text-gray-600 transition-colors">Chatting track</Link>
            <Link href="/faq" className="hover:text-gray-600 transition-colors">FAQ</Link>
            <a href="https://starhela.com/register?ref=velloearn" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600 transition-colors">Start chatting</a>
          </div>
        </div>

      </main>
    </>
  );
}