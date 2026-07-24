import { BASE_URL } from "@/lib/config";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About VelloEarn — Chat with Foreigners & Get Paid in Kenya",
  description:
    "VelloEarn connects Kenyans with lonely foreigners looking for conversation. Chat, make friends, and earn M-Pesa instantly. No fees, no experience needed. Join 61,000+ active chatters.",
  alternates: {
    canonical: `${BASE_URL}/about`,
  },
  openGraph: {
    title: "About VelloEarn — Chat & Earn in Kenya",
    description:
      "How VelloEarn connects Kenyans to lonely foreigners for paid conversations — with instant M-Pesa payouts. Free to join.",
    type: "website",
    locale: "en_KE",
    siteName: "VelloEarn",
    url: `${BASE_URL}/about`,
  },
  twitter: {
    card: "summary_large_image",
    title: "About VelloEarn — Chat & Earn in Kenya",
    description:
      "How VelloEarn connects Kenyans to lonely foreigners for paid conversations — with instant M-Pesa payouts. Free to join.",
  },
};

// ─── JSON-LD schema ───────────────────────────────────────────────────────────

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About VelloEarn",
  description:
    "VelloEarn is a platform that connects Kenyans with lonely foreigners looking for conversation. Users chat with foreigners and earn money via M-Pesa. No registration fees, no experience needed.",
  url: `${BASE_URL}/about`,
  mainEntity: {
    "@type": "Organization",
    name: "VelloEarn",
    url: BASE_URL,
    foundingLocation: {
      "@type": "Place",
      name: "Nairobi, Kenya",
    },
    areaServed: ["Kenya"],
    knowsAbout: [
      "Chat with foreigners",
      "Paid conversations",
      "M-Pesa payouts",
      "Remote chatting",
      "Earn money online",
    ],
  },
};

// ─── Static data ──────────────────────────────────────────────────────────────

interface StatItem {
  value: string;
  label: string;
  sub: string;
}

const STATS: StatItem[] = [
  { value: "61K+", label: "Active chatters", sub: "Across Kenya" },
  { value: "KES 1.2M+", label: "Paid this month", sub: "Direct to M-Pesa" },
  { value: "< 30 min", label: "Avg. payout time", sub: "M-Pesa instant" },
  { value: "50K+", label: "Foreigners online", sub: "Looking to chat" },
  { value: "24/7", label: "Chat availability", sub: "Chat anytime" },
  { value: "0", label: "Registration fees", sub: "100% free to join" },
];

interface ProblemSolutionItem {
  side: "problem" | "solution";
  eyebrow: string;
  headline: string;
  body: string;
  points: string[];
}

const PROBLEM_SOLUTION: ProblemSolutionItem[] = [
  {
    side: "problem",
    eyebrow: "The loneliness epidemic",
    headline: "Millions of foreigners are lonely and looking for conversation.",
    body:
      "In today's digital world, loneliness has become a global crisis. Millions of people, especially in Western countries, crave genuine human connection. They turn to chat platforms to find someone to talk to, share their day with, and feel heard.",
    points: [
      "Over 60% of adults report feeling lonely regularly",
      "Traditional social connections have declined dramatically",
      "People are willing to pay for meaningful conversations",
      "Cultural exchange is highly valued by lonely foreigners",
    ],
  },
  {
    side: "solution",
    eyebrow: "The VelloEarn model",
    headline: "We connect Kenyan chatters with lonely foreigners. Everyone benefits.",
    body:
      "VelloEarn acts as the bridge between Kenyans looking to earn extra income and foreigners seeking genuine conversation. Our platform handles the matching, ensures quality interactions, and routes earnings directly to your M-Pesa.",
    points: [
      "Free to join — no registration fees ever",
      "Chat with foreigners from USA, UK, Europe & more",
      "Earn money from every conversation",
      "Withdraw to M-Pesa instantly with no minimum",
    ],
  },
];

interface VerticalItem {
  icon: string;
  title: string;
  description: string;
  demand: string;
}

const VERTICALS: VerticalItem[] = [
  {
    icon: "💬",
    title: "One-on-one chatting",
    description:
      "The most popular category. Chat with lonely foreigners looking for conversation. Earn money for every message. Simple, rewarding, and always in demand.",
    demand: "Very high demand",
  },
  {
    icon: "👥",
    title: "Group conversations",
    description:
      "Join group chats with multiple foreigners. Engage in lively discussions, share Kenyan culture, and earn from group interactions. Great for outgoing personalities.",
    demand: "High demand",
  },
  {
    icon: "🎓",
    title: "Language exchange",
    description:
      "Teach foreigners Swahili or Kenyan slang while they help you improve your English. Earn while building cross-cultural friendships. Premium rates for language teaching.",
    demand: "Premium rates",
  },
  {
    icon: "🌍",
    title: "Cultural sharing",
    description:
      "Share Kenyan culture, traditions, and daily life with curious foreigners. Be a cultural ambassador and get paid for sharing what makes Kenya special.",
    demand: "Consistent volume",
  },
  {
    icon: "🤝",
    title: "Friend matching",
    description:
      "Long-term friendship matching with foreigners seeking genuine Kenyan friends. Build meaningful connections that pay off. Highest rated category on the platform.",
    demand: "High rates",
  },
  {
    icon: "📱",
    title: "Voice & video chats",
    description:
      "Premium voice and video conversations. Higher pay rates for more personal interactions. Available for chatters with good English speaking skills.",
    demand: "Advanced track",
  },
];

interface TrustItem {
  step: string;
  title: string;
  body: string;
}

const TRUST_FLOW: TrustItem[] = [
  {
    step: "01",
    title: "Sign up for free",
    body: "Create your account in 2 minutes. No registration fees, no CV, no interview. Your account is active immediately and ready for chatting.",
  },
  {
    step: "02",
    title: "Browse live profiles",
    body: "See who's online and looking to chat. Browse profiles of lonely foreigners from USA, UK, Europe, and more. Tap any profile to start.",
  },
  {
    step: "03",
    title: "Chat and earn",
    body: "Start conversations. Share your day, learn about their culture, and build connections. Every conversation earns you money.",
  },
  {
    step: "04",
    title: "Withdraw to M-Pesa instantly",
    body: "Your earnings accumulate with every chat. Withdraw to M-Pesa anytime with no minimum balance. Most payouts clear within 30 minutes.",
  },
];

// ─── FAQ Data ─────────────────────────────────────────────────────────────────

interface FAQItem {
  q: string;
  a: string;
}

const FAQS: FAQItem[] = [
  {
    q: "How much does it cost to join VelloEarn?",
    a: "VelloEarn is completely free to join. No registration fees, no monthly subscriptions, no hidden charges — ever. You earn from your first conversation and withdraw your earnings instantly.",
  },
  {
    q: "Do I need a bank account to receive payments?",
    a: "No. All earnings are paid directly to your M-Pesa wallet. No bank account, PayPal, or international payment processor is required. You just need a phone with M-Pesa.",
  },
  {
    q: "Who will I be chatting with?",
    a: "You'll chat with lonely foreigners from countries like the USA, UK, Canada, Australia, and Europe. They're looking for genuine conversation, friendship, and cultural exchange. Most are middle-aged or elderly and value connecting with people from different cultures.",
  },
  {
    q: "How long does it take to start earning?",
    a: "Immediately. After signing up for free, you can browse live profiles and start chatting right away. Most members earn their first KES within their first hour of chatting.",
  },
  {
    q: "Is this available outside Kenya?",
    a: "Currently, VelloEarn operates primarily in Kenya. We're planning to expand to other African countries like Uganda, Ghana, and Nigeria soon. Kenyan chatters are the most active and highest-rated on the platform.",
  },
  {
    q: "Do I need experience or perfect English?",
    a: "No. You just need conversational English and a friendly personality. If you can hold a friendly conversation, you can earn. No degrees, no experience, no CV needed.",
  },
];

// ─── Page component ───────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="bg-white min-h-screen">

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section className="relative pt-28 pb-24 overflow-hidden bg-gradient-to-br from-rose-50 via-white to-pink-50">

          {/* Ambient glows */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-rose-200/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-20 left-0 w-64 h-64 bg-rose-100/30 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-20 right-0 w-64 h-64 bg-pink-100/30 rounded-full blur-3xl pointer-events-none" />

          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">

              {/* Left: editorial headline */}
              <div>
                <div className="inline-flex items-center gap-2 bg-white border border-gray-100 shadow-sm rounded-full px-4 py-2 mb-8 text-sm text-gray-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  About VelloEarn
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.08] tracking-tight text-gray-900 mb-6">
                  Chat with{" "}
                  <span className="text-rose-500">lonely foreigners</span>
                  {" "}and earn M-Pesa instantly.
                </h1>

                <p className="text-lg text-gray-500 leading-relaxed mb-8 max-w-lg">
                  VelloEarn connects Kenyans with lonely foreigners looking for conversation.
                  No experience needed. No registration fees. Start chatting immediately and
                  earn money from every conversation.
                </p>

                <div className="flex flex-wrap gap-3">
                  {["Free to join", "M-Pesa payouts", "24/7 chat", "No experience needed"].map((tag) => (
                    <span
                      key={tag}
                      className="bg-white border border-gray-200 text-gray-600 text-sm px-4 py-1.5 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                  <span className="bg-rose-50 border border-rose-200 text-rose-600 text-sm px-4 py-1.5 rounded-full">
                    61,000+ active chatters
                  </span>
                </div>
              </div>

              {/* Right: operational stats matrix */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-3">
                {STATS.map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-white border border-gray-100 shadow-sm rounded-2xl p-5"
                  >
                    <p className="font-mono text-2xl font-bold text-rose-500 mb-1 tabular-nums">
                      {stat.value}
                    </p>
                    <p className="text-sm font-medium text-gray-800 mb-0.5">{stat.label}</p>
                    <p className="text-xs text-gray-400">{stat.sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── EARLY CTA ────────────────────────────────────────────────────── */}
        <section className="py-8 border-t border-gray-100 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="text-sm text-gray-600">
                  <span className="text-rose-500 font-semibold">Free</span> to join ·
                  <span className="text-emerald-600 font-semibold"> Instant</span> M-Pesa payouts
                </p>
                <p className="text-xs text-gray-400">No fees · Start chatting today · 61,000+ active chatters</p>
              </div>
              <a
                href="https://starhela.com/register?ref=velloearn"
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 bg-rose-500 hover:bg-rose-600 text-white font-bold text-sm px-8 py-3 rounded-full transition-all hover:scale-105 active:scale-95 shadow-lg shadow-rose-200"
              >
                Start Chatting Now →
              </a>
            </div>
          </div>
        </section>

        {/* ── PROBLEM & SOLUTION ───────────────────────────────────────────── */}
        <section className="py-20 bg-gray-50 border-t border-gray-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="text-center mb-14">
              <p className="text-xs font-mono text-gray-400 uppercase tracking-widest mb-3">
                The opportunity we unlock
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
                Solving loneliness while earning money.
              </h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {PROBLEM_SOLUTION.map((item) => (
                <div
                  key={item.side}
                  className={`relative rounded-3xl p-8 border ${
                    item.side === "problem"
                      ? "bg-white border-gray-200"
                      : "bg-rose-50 border-rose-200"
                  }`}
                >
                  {item.side === "solution" && (
                    <div className="absolute inset-0 bg-rose-500/5 pointer-events-none rounded-3xl" />
                  )}
                  <div className="relative">
                    <p
                      className={`text-xs font-mono uppercase tracking-widest mb-4 ${
                        item.side === "problem"
                          ? "text-gray-400"
                          : "text-rose-500"
                      }`}
                    >
                      {item.eyebrow}
                    </p>
                    <h3
                      className={`text-xl font-bold leading-snug mb-4 ${
                        item.side === "problem" ? "text-gray-700" : "text-gray-900"
                      }`}
                    >
                      {item.headline}
                    </h3>
                    <p className={`text-sm leading-relaxed mb-6 ${
                      item.side === "problem" ? "text-gray-500" : "text-gray-600"
                    }`}>
                      {item.body}
                    </p>
                    <ul className="space-y-2.5">
                      {item.points.map((point) => (
                        <li key={point} className="flex items-start gap-2.5 text-sm">
                          <span
                            className={`mt-1 w-4 h-4 rounded-full flex items-center justify-center shrink-0 text-xs ${
                              item.side === "problem"
                                ? "bg-gray-100 text-gray-400"
                                : "bg-rose-100 text-rose-500"
                            }`}
                          >
                            {item.side === "problem" ? "−" : "✓"}
                          </span>
                          <span
                            className={
                              item.side === "problem"
                                ? "text-gray-500"
                                : "text-gray-700"
                            }
                          >
                            {point}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PAYMENT TRUST FLOW ───────────────────────────────────────────── */}
        <section className="py-20 bg-white border-t border-gray-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="grid lg:grid-cols-2 gap-16 items-start">

              {/* Left: copy */}
              <div className="lg:sticky lg:top-24">
                <p className="text-xs font-mono text-gray-400 uppercase tracking-widest mb-4">
                  How it works
                </p>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 mb-5">
                  From your phone to your{" "}
                  <span className="text-rose-500">M-Pesa</span> in 4 steps.
                </h2>
                <p className="text-gray-500 leading-relaxed mb-8">
                  The most common question we receive is: &ldquo;How does this actually work?&rdquo;
                  The answer is straightforward — and we believe transparency is more important
                  than any marketing claim.
                </p>

                {/* Promise card */}
                <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6">
                  <p className="text-xs font-mono text-gray-400 uppercase tracking-widest mb-4">
                    Our promise
                  </p>
                  <div className="space-y-3">
                    {[
                      { icon: "✓", text: "100% free to join — no registration fees ever" },
                      { icon: "✓", text: "No hidden charges, no monthly subscriptions" },
                      { icon: "✓", text: "Every chat earns you money" },
                      { icon: "✓", text: "Instant M-Pesa payouts with no minimum" },
                    ].map((item) => (
                      <div key={item.text} className="flex items-start gap-3 text-sm">
                        <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-500 flex items-center justify-center shrink-0 mt-0.5 text-xs">
                          {item.icon}
                        </span>
                        <span className="text-gray-600 leading-relaxed">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: flow steps */}
              <div className="space-y-4">
                {TRUST_FLOW.map((step, i) => (
                  <div
                    key={step.step}
                    className="relative bg-gray-50 border border-gray-100 rounded-2xl p-6"
                  >
                    {i < TRUST_FLOW.length - 1 && (
                      <div className="absolute left-[2.35rem] top-full w-px h-4 bg-gray-200" />
                    )}
                    <div className="flex gap-4 items-start">
                      <div className="shrink-0 w-10 h-10 rounded-xl bg-rose-100 border border-rose-200 flex items-center justify-center">
                        <span className="font-mono text-xs text-rose-500 font-bold">
                          {step.step}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-base mb-1.5">
                          {step.title}
                        </p>
                        <p className="text-sm text-gray-500 leading-relaxed">{step.body}</p>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Final payout indicator */}
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center shrink-0">
                    <span className="text-white font-bold text-sm">M</span>
                  </div>
                  <div>
                    <p className="text-emerald-700 font-bold text-sm">
                      M-Pesa Instant Payout
                    </p>
                    <p className="text-gray-500 text-xs mt-0.5">
                      Direct to your mobile wallet · Typically within 30 minutes
                    </p>
                  </div>
                  <div className="ml-auto text-right shrink-0">
                    <p className="font-mono text-emerald-600 font-bold text-lg">+KES 2,400</p>
                    <p className="text-gray-400 text-xs">example earnings</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── MID-PAGE CTA ──────────────────────────────────────────────────── */}
        <section className="py-12 bg-gray-50 border-t border-gray-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
              <p className="text-gray-500 text-sm mb-2">Ready to start chatting?</p>
              <a
                href="https://starhela.com/register?ref=velloearn"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-rose-500 hover:bg-rose-600 text-white font-bold text-base px-10 py-4 rounded-full transition-all hover:scale-105 active:scale-95 shadow-lg shadow-rose-200"
              >
                Start Chatting Now — Free
              </a>
              <p className="text-gray-400 text-xs mt-3">No registration fees · Instant M-Pesa payouts</p>
            </div>
          </div>
        </section>

        {/* ── EARNING VERTICALS ─────────────────────────────────────────────── */}
        <section className="py-20 bg-white border-t border-gray-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="text-center mb-14">
              <p className="text-xs font-mono text-gray-400 uppercase tracking-widest mb-3">
                Ways to earn
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 mb-4">
                Six ways to chat and earn.
              </h2>
              <p className="text-gray-500 max-w-xl mx-auto">
                All earning methods are accessible from one free account. Most members start with
                one and add more as they build their routine.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {VERTICALS.map((v) => (
                <div
                  key={v.title}
                  className="bg-gray-50 border border-gray-100 hover:border-rose-200 rounded-2xl p-6 transition-colors duration-200 group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-3xl">{v.icon}</span>
                    <span className="text-xs bg-white text-gray-500 font-mono px-2.5 py-1 rounded-full border border-gray-200">
                      {v.demand}
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900 text-base mb-2 group-hover:text-rose-500 transition-colors">
                    {v.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{v.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── E-E-A-T TRUST SIGNALS ─────────────────────────────────────────── */}
        <section className="py-20 bg-gray-50 border-t border-gray-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="bg-white border border-gray-100 rounded-3xl p-8 sm:p-12">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <p className="text-xs font-mono text-gray-400 uppercase tracking-widest mb-4">
                    Why VelloEarn
                  </p>
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 mb-5">
                    Built for Kenyan chatters, by Kenyans.
                  </h2>
                  <p className="text-gray-500 leading-relaxed mb-5">
                    VelloEarn was designed specifically for the Kenyan context — mobile-first workers,
                    M-Pesa as the dominant financial infrastructure, and the genuine global demand
                    for Kenyan voices in conversation.
                  </p>
                  <p className="text-gray-500 leading-relaxed">
                    We are not a generic chat platform with an Africa toggle. The chat types, payment
                    rails, and rate structures are built specifically for this context — because that
                    specificity is what produces quality that chatters actually get paid for.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    {
                      icon: "🏗️",
                      title: "Built for Kenyans",
                      body: "M-Pesa integration is not an afterthought — it is the architecture.",
                    },
                    {
                      icon: "🔒",
                      title: "100% free to join",
                      body: "No registration fees. No recurring charges. Full transparency.",
                    },
                    {
                      icon: "🎯",
                      title: "Quality conversations",
                      body: "Chat quality frameworks ensure meaningful interactions and consistent earnings.",
                    },
                    {
                      icon: "🌐",
                      title: "Global demand",
                      body: "Lonely foreigners worldwide want to chat with Kenyans. We make it happen.",
                    },
                  ].map((card) => (
                    <div
                      key={card.title}
                      className="bg-gray-50 border border-gray-100 rounded-2xl p-5 shadow-sm"
                    >
                      <span className="text-2xl mb-3 block">{card.icon}</span>
                      <p className="font-semibold text-gray-900 text-sm mb-1.5">{card.title}</p>
                      <p className="text-xs text-gray-500 leading-relaxed">{card.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ SECTION ───────────────────────────────────────────────────── */}
        <section className="py-20 bg-white border-t border-gray-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-xs font-mono text-gray-400 uppercase tracking-widest mb-3">
                Common questions
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
                Everything you need to know
              </h2>
              <p className="text-gray-500 mt-2">Transparent answers to the questions we hear most</p>
            </div>

            <div className="space-y-3">
              {FAQS.map((faq, index) => (
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

            {/* FAQ CTA */}
            <div className="mt-10 text-center">
              <p className="text-gray-500 text-sm mb-4">Still have questions?</p>
              <a
                href="https://wa.me/2547107445114?text=Hi%2C%20I%20want%20to%20start%20chatting%20with%20foreigners.%20How%20do%20I%20get%20started%3F"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 font-semibold text-sm px-6 py-3 rounded-full transition-all shadow-sm"
              >
                <svg className="w-4 h-4 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Ask us on WhatsApp
              </a>
            </div>
          </div>
        </section>

        {/* ── FINAL CONVERSION CTA ──────────────────────────────────────────── */}
        <section className="py-20 bg-gray-50 border-t border-gray-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

            <div className="bg-gradient-to-br from-rose-50 to-pink-50 border border-rose-100 rounded-3xl p-10 sm:p-16 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-rose-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-pink-200/20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none" />

              <div className="relative">
                <p className="text-xs font-mono text-rose-400 uppercase tracking-widest mb-5">
                  Ready to start
                </p>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 mb-5">
                  Your phone is already capable of this.
                  <br />
                  <span className="text-rose-500">Start chatting and earning today.</span>
                </h2>
                <p className="text-gray-600 max-w-xl mx-auto mb-8 leading-relaxed">
                  Free to join. No experience needed. Chat with lonely foreigners.
                  Your first M-Pesa payout could be today.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                  <a
                    href="https://starhela.com/register?ref=velloearn"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-rose-500 hover:bg-rose-600 text-white font-bold text-base px-10 py-4 rounded-full transition-all hover:scale-105 active:scale-95 shadow-lg shadow-rose-200"
                  >
                    Start Chatting Now →
                  </a>
                  <Link
                    href="/how-it-works"
                    className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 font-semibold text-base px-8 py-4 rounded-full transition-all hover:scale-105 active:scale-95 shadow-sm"
                  >
                    See how it works
                  </Link>
                </div>

                <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-500">
                  <span>✓ Free to join</span>
                  <span>✓ M-Pesa payouts</span>
                  <span>✓ No bank account needed</span>
                  <span>✓ No hidden fees</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── NAV LINKS ─────────────────────────────────────────────────────── */}
        <div className="border-t border-gray-100 py-6 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap justify-center gap-5 text-xs text-gray-400">
            <Link href="/" className="hover:text-gray-600 transition-colors">← Home</Link>
            <Link href="/earn/chatting" className="hover:text-gray-600 transition-colors">Chatting track</Link>
            <Link href="/how-it-works" className="hover:text-gray-600 transition-colors">How it works</Link>
            <Link href="/faq" className="hover:text-gray-600 transition-colors">FAQ</Link>
            <a href="https://starhela.com/register?ref=velloearn" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600 transition-colors">Start chatting</a>
          </div>
        </div>

      </main>
    </>
  );
}