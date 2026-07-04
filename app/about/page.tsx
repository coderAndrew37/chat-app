import { BASE_URL } from "@/lib/config";
import type { Metadata } from "next";
import Link from "next/link";


export const metadata: Metadata = {
  title: "About VelloEarn — Connecting African Talent to Global Technology Work",
  description:
    "VelloEarn bridges East and West African freelancers with global technology firms needing AI training data, Swahili instruction, and localised research. Instant M-Pesa and MTN MoMo payouts. No international bank transfers.",
  alternates: {
    canonical: `${BASE_URL}/about`,
  },
  openGraph: {
    title: "About VelloEarn — African Talent, Global Reach",
    description:
      "How VelloEarn connects Kenyan, Ugandan, and Ghanaian freelancers to global tech work — with instant local mobile money payouts.",
    type: "website",
    locale: "en_KE",
    siteName: "VelloEarn",
    url: `${BASE_URL}/about`,
  },
  twitter: {
    card: "summary_large_image",
    title: "About VelloEarn — African Talent, Global Reach",
    description:
      "How VelloEarn connects Kenyan, Ugandan, and Ghanaian freelancers to global tech work — with instant local mobile money payouts.",
  },
};

// ─── JSON-LD schema ───────────────────────────────────────────────────────────

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About VelloEarn",
  description:
    "VelloEarn is a remote micro-task and digital talent platform operating across East and West Africa. We connect Kenyan, Ugandan, and Ghanaian freelancers with global technology firms requiring AI training datasets, localized market research, Swahili instruction, and conversational AI development. Earnings are distributed instantly via M-Pesa and MTN Mobile Money.",
  url: `${BASE_URL}/about`,
  mainEntity: {
    "@type": "Organization",
    name: "VelloEarn",
    url: BASE_URL,
    foundingLocation: {
      "@type": "Place",
      name: "Nairobi, Kenya",
    },
    areaServed: ["Kenya", "Uganda", "Ghana"],
    knowsAbout: [
      "AI training data",
      "Data annotation",
      "Swahili language instruction",
      "Localized market research",
      "Remote micro-tasks",
      "M-Pesa payouts",
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
  { value: "61K+", label: "Active earners", sub: "Across KE · UG · GH" },
  { value: "KES 1.2M+", label: "Paid this month", sub: "Direct to mobile wallets" },
  { value: "< 30 min", label: "Avg. payout time", sub: "M-Pesa & MTN MoMo" },
  { value: "6", label: "Earning verticals", sub: "AI · Chat · Swahili · More" },
  { value: "3", label: "Countries active", sub: "Kenya · Uganda · Ghana" },
  { value: "0", label: "Bank transfers", sub: "100% local mobile money" },
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
    eyebrow: "The corporate challenge",
    headline: "Global AI companies can't get African data at scale.",
    body:
      "Artificial intelligence systems trained exclusively on Western datasets consistently underperform for African users. Accents go unrecognised. Idioms get mistranslated. Cultural context disappears entirely. The problem is not ambition — it's access.",
    points: [
      "Swahili and local dialect training data is critically scarce",
      "International payment infrastructure creates prohibitive onboarding friction",
      "Traditional outsourcing firms lack genuine regional fluency",
      "Regulatory complexity slows direct hiring across African markets",
    ],
  },
  {
    side: "solution",
    eyebrow: "The VelloEarn model",
    headline: "We mobilise local talent. We eliminate payout friction.",
    body:
      "VelloEarn acts as the operational bridge. We handle task structuring, quality assurance, worker onboarding, and the payment architecture — routing earnings directly to the mobile wallets that Kenyan, Ugandan, and Ghanaian workers already use every day.",
    points: [
      "Verified talent pool across three high-literacy African markets",
      "M-Pesa and MTN MoMo replace slow international bank transfers",
      "Task quality frameworks built for AI training standards",
      "No worker needs a bank account, PayPal, or Payoneer",
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
    icon: "🤖",
    title: "AI training & annotation",
    description:
      "Rating AI responses, labelling data, testing conversational models. The highest-volume category on the platform, driven by global demand for African-contextualised training data.",
    demand: "Very high demand",
  },
  {
    icon: "💬",
    title: "Remote chatting & moderation",
    description:
      "Customer support, community moderation, and brand engagement tasks for international platforms. Structured shifts, approved scripts, real-time task assignment.",
    demand: "High demand",
  },
  {
    icon: "🌍",
    title: "Swahili language services",
    description:
      "Transcription, translation verification, and language data collection for AI language models. Native Swahili speakers are a scarce global resource — Kenyan workers have a structural advantage.",
    demand: "Premium rates",
  },
  {
    icon: "📋",
    title: "Market research & surveys",
    description:
      "Brand research, consumer sentiment, and product testing tasks for companies entering or expanding in African markets. Your lived experience is the product.",
    demand: "Consistent volume",
  },
  {
    icon: "✍️",
    title: "Academic & content writing",
    description:
      "Structured writing tasks for qualified writers. The highest per-hour earning rate on the platform, accessible to university graduates with strong academic English.",
    demand: "High rates",
  },
  {
    icon: "📊",
    title: "Forex & financial education",
    description:
      "Structured currency trading guidance with platform support. Higher ceiling for workers willing to invest in financial skill development alongside task income.",
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
    title: "Global firm posts a task requirement",
    body: "A technology company needs AI training data, localised research, or language services. They fund the task batch through VelloEarn's verified business infrastructure.",
  },
  {
    step: "02",
    title: "VelloEarn structures and assigns work",
    body: "Tasks are broken into verifiable micro-units with clear guidelines, quality checkpoints, and fair rate cards. Workers receive assignments through their dashboard.",
  },
  {
    step: "03",
    title: "Workers complete verified tasks",
    body: "Earners complete tasks on their own schedule. Quality assurance runs automatically and through periodic human review. Verified completions credit earnings in real time.",
  },
  {
    step: "04",
    title: "M-Pesa or MTN MoMo pays out directly",
    body: "Withdrawal requests trigger a direct mobile money transfer to the worker's registered number. No bank account needed. Most payments clear within 30 minutes.",
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
    a: "VelloEarn charges a one-time KES 550 account setup fee. Your KES 200 welcome bonus is credited immediately after activation, so your real net investment is KES 350. There are no monthly fees, no withdrawal fees, and no hidden charges — ever.",
  },
  {
    q: "Do I need a bank account to receive payments?",
    a: "No. All earnings are paid directly to your mobile money wallet — M-Pesa in Kenya, MTN MoMo and Airtel Money in Uganda, and MTN MoMo and Vodafone Cash in Ghana. No bank account, PayPal, or international payment processor is required.",
  },
  {
    q: "What kind of tasks will I be doing?",
    a: "VelloEarn offers six earning verticals: AI training & annotation, remote chatting & moderation, Swahili language services, market research & surveys, academic & content writing, and forex & financial education. Most members start with one track and add more as they build their routine.",
  },
  {
    q: "How long does it take to start earning?",
    a: "After completing your one-time KES 550 setup, your dashboard is activated immediately. You can start working on available tasks the same day. Most members receive their first M-Pesa payout within their first week of consistent task completion.",
  },
  {
    q: "Is this available outside Kenya?",
    a: "Yes. VelloEarn currently operates in Kenya, Uganda, and Ghana, with plans to expand to additional African markets. Each country has localised payment methods — M-Pesa in Kenya, MTN MoMo and Airtel Money in Uganda, and MTN MoMo and Vodafone Cash in Ghana.",
  },
  {
    q: "What if I have trouble during registration or payment?",
    a: "Our support team is available via WhatsApp to assist with registration, activation, and any payment issues. We typically respond within a few minutes during business hours. Your activation instructions are sent directly to your WhatsApp after signup.",
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
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
                  About VelloEarn
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.08] tracking-tight text-gray-900 mb-6">
                  Democratising{" "}
                  <span className="text-rose-500">global remote</span>
                  {" "}opportunities for African talent.
                </h1>

                <p className="text-lg text-gray-500 leading-relaxed mb-8 max-w-lg">
                  VelloEarn connects skilled freelancers across Kenya, Uganda, and Ghana
                  with global technology companies that need what Africa uniquely offers —
                  native language fluency, localised market insight, and authentic human judgment.
                  We handle everything except the work itself.
                </p>

                <div className="flex flex-wrap gap-3">
                  {["Kenya", "Uganda", "Ghana"].map((country) => (
                    <span
                      key={country}
                      className="bg-white border border-gray-200 text-gray-600 text-sm px-4 py-1.5 rounded-full"
                    >
                      {country}
                    </span>
                  ))}
                  <span className="bg-rose-50 border border-rose-200 text-rose-600 text-sm px-4 py-1.5 rounded-full">
                    M-Pesa · MTN MoMo
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
                  <span className="text-rose-500 font-semibold">KES 550</span> one-time setup ·{" "}
                  <span className="text-emerald-600 font-semibold">KES 200</span> welcome bonus back
                </p>
                <p className="text-xs text-gray-400">No monthly fees · M-Pesa payouts · Start today</p>
              </div>
              <Link
                href="/join"
                className="shrink-0 bg-rose-500 hover:bg-rose-600 text-white font-bold text-sm px-8 py-3 rounded-full transition-all hover:scale-105 active:scale-95 shadow-lg shadow-rose-200"
              >
                Activate My Account →
              </Link>
            </div>
          </div>
        </section>

        {/* ── PROBLEM & SOLUTION ───────────────────────────────────────────── */}
        <section className="py-20 bg-gray-50 border-t border-gray-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="text-center mb-14">
              <p className="text-xs font-mono text-gray-400 uppercase tracking-widest mb-3">
                The market gap we close
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
                There is a mismatch at the heart of global AI development.
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
                  Payment transparency
                </p>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 mb-5">
                  Exactly how your earnings move from{" "}
                  <span className="text-rose-500">global client</span>{" "}
                  to your phone.
                </h2>
                <p className="text-gray-500 leading-relaxed mb-8">
                  The most common question we receive is: &ldquo;Where does the money actually come from?&rdquo;
                  The answer is straightforward — and we think transparency about this is more
                  important than any marketing claim we could make.
                </p>

                {/* Promise card */}
                <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6">
                  <p className="text-xs font-mono text-gray-400 uppercase tracking-widest mb-4">
                    Our commitment
                  </p>
                  <div className="space-y-3">
                    {[
                      { icon: "✓", text: "One-time KES 550 account setup — KES 200 credited back immediately" },
                      { icon: "✓", text: "No monthly fees, no withdrawal fees, no hidden charges ever" },
                      { icon: "✓", text: "Every shilling after setup flows toward you, not away from you" },
                      { icon: "✓", text: "If anyone asks for additional payment, that is fraud — report it" },
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
                      M-Pesa · MTN MoMo · Airtel Money
                    </p>
                    <p className="text-gray-500 text-xs mt-0.5">
                      Direct to your mobile wallet · Typically within 30 minutes
                    </p>
                  </div>
                  <div className="ml-auto text-right shrink-0">
                    <p className="font-mono text-emerald-600 font-bold text-lg">+KES 2,400</p>
                    <p className="text-gray-400 text-xs">example payout</p>
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
              <p className="text-gray-500 text-sm mb-2">Already convinced?</p>
              <Link
                href="/join"
                className="inline-block bg-rose-500 hover:bg-rose-600 text-white font-bold text-base px-10 py-4 rounded-full transition-all hover:scale-105 active:scale-95 shadow-lg shadow-rose-200"
              >
                Activate Your Account — KES 550 One-Time
              </Link>
              <p className="text-gray-400 text-xs mt-3">KES 200 welcome bonus back immediately · No monthly fees</p>
            </div>
          </div>
        </section>

        {/* ── EARNING VERTICALS ─────────────────────────────────────────────── */}
        <section className="py-20 bg-white border-t border-gray-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="text-center mb-14">
              <p className="text-xs font-mono text-gray-400 uppercase tracking-widest mb-3">
                What earners do
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 mb-4">
                Six verticals. One platform. One M-Pesa number.
              </h2>
              <p className="text-gray-500 max-w-xl mx-auto">
                All earning tracks are accessible from one account. Most members start with
                one method and add a second once they&apos;ve established a routine.
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

        {/* ── GEOGRAPHIC FOOTPRINT ─────────────────────────────────────────── */}
        <section className="py-20 bg-gray-50 border-t border-gray-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="grid lg:grid-cols-3 gap-6">
              {[
                {
                  country: "Kenya",
                  flag: "🇰🇪",
                  payment: "M-Pesa",
                  paymentColor: "text-emerald-600",
                  bgColor: "bg-emerald-50",
                  borderColor: "border-emerald-200",
                  highlights: [
                    "Largest active earner base",
                    "Highest Swahili task volume",
                    "AI training primary market",
                    "M-Pesa instant settlement",
                  ],
                  status: "Primary market",
                  statusColor: "bg-emerald-100 text-emerald-700 border-emerald-200",
                },
                {
                  country: "Uganda",
                  flag: "🇺🇬",
                  payment: "MTN MoMo · Airtel Money",
                  paymentColor: "text-amber-600",
                  bgColor: "bg-amber-50",
                  borderColor: "border-amber-200",
                  highlights: [
                    "Fast-growing earner community",
                    "English + Luganda tasks",
                    "AI training high demand",
                    "MTN MoMo settlement",
                  ],
                  status: "Active market",
                  statusColor: "bg-amber-100 text-amber-700 border-amber-200",
                },
                {
                  country: "Ghana",
                  flag: "🇬🇭",
                  payment: "MTN MoMo · Vodafone Cash",
                  paymentColor: "text-indigo-600",
                  bgColor: "bg-indigo-50",
                  borderColor: "border-indigo-200",
                  highlights: [
                    "West African expansion hub",
                    "English proficiency advantage",
                    "Survey & research demand",
                    "MTN MoMo settlement",
                  ],
                  status: "Growing market",
                  statusColor: "bg-indigo-100 text-indigo-700 border-indigo-200",
                },
              ].map((market) => (
                <div
                  key={market.country}
                  className={`bg-white border ${market.borderColor} rounded-3xl p-7 shadow-sm`}
                >
                  <div className="flex items-center gap-3 mb-5">
                    <span className="text-3xl">{market.flag}</span>
                    <div>
                      <p className="font-bold text-gray-900 text-lg">{market.country}</p>
                      <p className={`text-xs font-mono ${market.paymentColor}`}>
                        {market.payment}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`inline-block text-xs font-semibold px-3 py-1 rounded-full border ${market.statusColor}`}
                  >
                    {market.status}
                  </span>
                  <ul className="space-y-2.5 mt-5">
                    {market.highlights.map((h) => (
                      <li key={h} className="flex items-center gap-2.5 text-sm text-gray-600">
                        <span className="w-1 h-1 rounded-full bg-gray-300 shrink-0" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── E-E-A-T TRUST SIGNALS ─────────────────────────────────────────── */}
        <section className="py-20 bg-white border-t border-gray-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="bg-gray-50 border border-gray-100 rounded-3xl p-8 sm:p-12">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <p className="text-xs font-mono text-gray-400 uppercase tracking-widest mb-4">
                    Who we are
                  </p>
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 mb-5">
                    Built for Africa, not retrofitted to it.
                  </h2>
                  <p className="text-gray-500 leading-relaxed mb-5">
                    VelloEarn was designed from the ground up for the specific operational
                    realities of African freelance markets — mobile-first workers, M-Pesa as
                    the dominant financial infrastructure, and the genuine global demand for
                    African voices in AI development.
                  </p>
                  <p className="text-gray-500 leading-relaxed">
                    We are not a generic gig platform with an Africa toggle. The task types,
                    the payment rails, the rate structures, and the quality frameworks are
                    built specifically for this context — because that specificity is what
                    produces quality that global clients actually pay for.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    {
                      icon: "🏗️",
                      title: "Infrastructure built locally",
                      body: "M-Pesa and MTN MoMo integration is not an afterthought — it is the architecture.",
                    },
                    {
                      icon: "🔒",
                      title: "One-time fee model",
                      body: "KES 550 setup. KES 200 back immediately. No recurring charges. Full transparency.",
                    },
                    {
                      icon: "🎯",
                      title: "Task quality frameworks",
                      body: "Accuracy scores, quality checkpoints, and verified completions protect client data standards.",
                    },
                    {
                      icon: "🌐",
                      title: "Global client demand",
                      body: "Technology companies need what African workers have. We make the connection efficient.",
                    },
                  ].map((card) => (
                    <div
                      key={card.title}
                      className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm"
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
        <section className="py-20 bg-gray-50 border-t border-gray-100">
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
                  className="group bg-white border border-gray-200 hover:border-rose-200 rounded-2xl transition-colors duration-200 shadow-sm"
                >
                  <summary className="flex items-center justify-between cursor-pointer list-none p-6">
                    <span className="font-semibold text-gray-900 text-sm sm:text-base pr-4">
                      {faq.q}
                    </span>
                    <span className="shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 group-open:bg-rose-100 group-open:text-rose-500 transition-all">
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
                href="https://wa.me/2547107445114?text=Hi%2C%20I%20have%20a%20question%20about%20VelloEarn"
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
        <section className="py-20 bg-white border-t border-gray-100">
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
                  <span className="text-rose-500">You just haven&apos;t activated it.</span>
                </h2>
                <p className="text-gray-600 max-w-xl mx-auto mb-8 leading-relaxed">
                  KES 550 one-time setup. KES 200 welcome bonus back immediately.
                  Task dashboard live the same day. First M-Pesa this week.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                  <Link
                    href="/join"
                    className="inline-flex items-center gap-2 bg-rose-500 hover:bg-rose-600 text-white font-bold text-base px-10 py-4 rounded-full transition-all hover:scale-105 active:scale-95 shadow-lg shadow-rose-200"
                  >
                    Activate my account →
                  </Link>
                  <Link
                    href="/earn/ai-training"
                    className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 font-semibold text-base px-8 py-4 rounded-full transition-all hover:scale-105 active:scale-95 shadow-sm"
                  >
                    See how AI training works
                  </Link>
                </div>

                <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-500">
                  <span>✓ No monthly fee</span>
                  <span>✓ M-Pesa payouts</span>
                  <span>✓ No bank account needed</span>
                  <span>✓ Transparent fee structure</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── NAV LINKS ─────────────────────────────────────────────────────── */}
        <div className="border-t border-gray-100 py-6 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap justify-center gap-5 text-xs text-gray-400">
            <Link href="/" className="hover:text-gray-600 transition-colors">← Home</Link>
            <Link href="/earn/chatting" className="hover:text-gray-600 transition-colors">Chatting track</Link>
            <Link href="/earn/ai-training" className="hover:text-gray-600 transition-colors">AI training track</Link>
            <Link href="/earn/swahili-teaching" className="hover:text-gray-600 transition-colors">Swahili track</Link>
            <Link href="/blog/is-ai-training-a-scam-kenya" className="hover:text-gray-600 transition-colors">Is this legit?</Link>
            <Link href="/join" className="hover:text-gray-600 transition-colors">Activate account</Link>
          </div>
        </div>

      </main>
    </>
  );
}