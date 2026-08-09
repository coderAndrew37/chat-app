// app/earn/[jobSlug]/page.tsx
// ─── HIGH-AUTHORITY GLOBAL JOB OPENINGS LANDING ENGINE (LIGHT THEME - WIDE & HIGH-CONVERSION) ──────────

import { use } from "react";
import { notFound } from "next/navigation";
import { 
  JOB_TYPES, 
  MARKETS,
  getJobType, 
  getMarket 
} from "@/lib/seo/keyword-matrix";
import { 
  breadcrumbSchema, 
  faqSchema 
} from "@/lib/seo/metadata";
import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import TrainingChannelBanner from "@/app/components/TrainingChannelBanner";
import { VELLOEARN_REGISTER_URL } from "@/lib/constants";

interface PageProps {
  params: Promise<{ jobSlug: string }>;
}

export function generateStaticParams() {
  return JOB_TYPES.map((job) => ({
    jobSlug: job.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const jobType = getJobType(resolvedParams.jobSlug);
  
  if (!jobType) return {};

  return {
    title: `Legit ${jobType.title} Jobs: Work From Home (Earn Weekly via Mobile Money)`,
    description: `Looking for ${jobType.title} opportunities? ${jobType.tagline} Discover remote positions, hourly pay structures, entry requirements, and secure payouts via local mobile money. Apply free inside.`,
    alternates: {
      canonical: `/earn/job/${jobType.slug}`,
    }
  };
}

const DEEP_CONTENT_MATRIX: Record<string, {
  overview: string;
  responsibilities: string[];
  skillsRequired: string[];
  payoutBreakdown: { item: string; rate: string; frequency: string }[];
}> = {
  "chatting": {
    overview: "Remote Chatting operations involve handling asynchronous client correspondence, live message moderations, and text-based digital support channels. Companies outsource micro-communication tasks to independent operators who can maintain engaging, fluent conversational flows while adhering to community safety guidelines.",
    responsibilities: [
      "Respond to incoming user queries or discussion prompts with high accuracy and clear grammar.",
      "Maintain active session reply rates under 90 seconds during high-volume digital traffic spikes.",
      "Moderate digital message interfaces to weed out flagrant spam or structural violations.",
      "Adapt conversational tone protocols dynamically based on platform-specific demographic assignments."
    ],
    skillsRequired: [
      "Excellent written expression in English, Swahili, or localized regional dialects.",
      "High-speed mobile typing proficiency (minimum 35 words per minute recommended).",
      "Ability to handle diverse conversational scenarios objectively without personal bias."
    ],
    payoutBreakdown: [
      { item: "Standard Live Interaction Chat", rate: "KES 15 - 45 per text thread", frequency: "Instantly calculated" },
      { item: "High-Priority Queue Escalation", rate: "KES 60 - 120 per ticket", frequency: "Tiered performance bonuses" },
      { item: "Night Shift Support Premium", rate: "+25% Base payout adjustments", frequency: "10 PM to 6 AM slots" }
    ]
  },
  "ai-training": {
    overview: "AI Training specialists serve as human annotators, training large language models (LLMs) and computer vision systems. By supplying contextual feedback, ranking machine outputs, and correcting syntax loops, trainers ensure artificial intelligence frameworks interact with humans accurately without hallucinations.",
    responsibilities: [
      "Evaluate algorithmic machine responses and grade them based on real-world logic and helpfulness.",
      "Create high-quality prompt-and-response data strings to teach semantic nuances to AI instances.",
      "Review and rewrite bad computer code strings, text summaries, or translation variations.",
      "Tag structural components within images or voice transcript snippets for machine visual models."
    ],
    skillsRequired: [
      "Strong deductive reasoning skills and ability to strictly follow complex annotation handbooks.",
      "Good foundational literacy with clean reading comprehension capabilities.",
      "Detail-oriented mindset to catch minor anomalies in large blocks of comparative machine text."
    ],
    payoutBreakdown: [
      { item: "Text RLHF Output Verification", rate: "KES 200 - 450 per evaluation", frequency: "Approved tasks" },
      { item: "Prompt Generation & Edge-Case Input", rate: "KES 500 - 1,200 per scenario", frequency: "Verified strings" },
      { item: "Image Tagging & Object Segmentation", rate: "KES 5 - 25 per coordinate marker", frequency: "Bulk processing bundles" }
    ]
  },
  "surveys": {
    overview: "Market Research and Data Collection operations capture targeted consumer insights for brands looking to expand product lifecycles globally. Field profiles feed accurate baseline feedback into algorithmic matrices, replacing traditional physical focus groups with rapid smartphone responses.",
    responsibilities: [
      "Complete fully audited digital survey sequences covering consumer behavior, buying habits, and brand interactions.",
      "Provide objective feedback loops regarding newly released app prototypes, ads, and packaging.",
      "Participate in high-integrity dynamic opinion polling across local socio-economic trends.",
      "Maintain consistent responses matching demographic data to pass automated anti-fraud checks."
    ],
    skillsRequired: [
      "Honest response submission metrics (automated filters flag conflicting demographic answers).",
      "Consistent daily checking habits to claim short-lived, high-payout survey pools.",
      "Basic tech comfort navigating multi-page digital analytical forms."
    ],
    payoutBreakdown: [
      { item: "Brand Feedback Survey Packet", rate: "KES 150 - 600 per complete run", frequency: "Verified submissions" },
      { item: "App Interaction Experience Log", rate: "KES 400 - 1,000 per review task", frequency: "Post-installation audits" },
      { item: "Daily Core Diagnostic Polls", rate: "KES 30 - 80 per quick response", frequency: "Instant balance credits" }
    ]
  },
  "academic-writing": {
    overview: "Academic Research Writing and Professional Content Creation services support global informational compilation, long-form ghostwriting, and advanced citation formatting tasks. Experts structure multi-layered arguments, clean up source references, and ensure original work delivery.",
    responsibilities: [
      "Draft comprehensive essays, research abstracts, and business analytical frameworks from scratch.",
      "Apply uniform citation rules perfectly (APA, MLA, Harvard, Chicago, or specialized guidelines).",
      "Ensure structural formatting contains 0% plagiarism and completely clean vocabulary matrices.",
      "Execute rapid structural corrections or reference amendments during client review workflows."
    ],
    skillsRequired: [
      "Strong scholarly writing proficiency and deep understanding of secondary analytical source structures.",
      "Impeccable time management skills to hit fixed delivery deadlines without exception.",
      "Expert command over subject material, grammar formatting tools, and semantic structure engines."
    ],
    payoutBreakdown: [
      { item: "Standard Research Essay Page", rate: "KES 350 - 800 per 275 words", frequency: "Milestone completion" },
      { item: "Technical Abstract / Case Compilation", rate: "KES 900 - 2,200 per page layout", frequency: "Source verification approval" },
      { item: "Editing, Proofing & Formatting Runs", rate: "KES 150 - 400 per reviewed section", frequency: "Immediate pipeline payouts" }
    ]
  },
  "forex": {
    overview: "Foreign Exchange Trading educational tracking monitors global currency pair shifts, risk management parameters, and micro-lot execution dynamics. We focus on training users to monitor macro liquidity triggers and data charts to spot structural setup patterns.",
    responsibilities: [
      "Track dynamic currency trends and execute algorithmic setups within tight pip parameters.",
      "Implement hard stop-loss and take-profit ratios to maintain consistent risk management accounts.",
      "Analyze systemic economic calendar updates, interest adjustments, and global trading volume flows.",
      "Document daily trade execution logs to audit strategy accuracy across recurring chart loops."
    ],
    skillsRequired: [
      "Strict logical discipline to execute strategy rules without emotional panic overrides.",
      "Foundational reading of candlestick patterns, liquidity blocks, and pivot trend maps.",
      "Patience to wait for optimum confluence setups instead of forcing low-probability entries."
    ],
    payoutBreakdown: [
      { item: "Funded Target Account Splits", rate: "70% to 90% of verified payout splits", frequency: "Bi-weekly extractions" },
      { item: "Prop Account Milestones reached", rate: "Performance scaling match credits", frequency: "Level progression triggers" },
      { item: "Daily Scalp Setup Executions", rate: "Variable depending on market volume", frequency: "Standard balance updates" }
    ]
  }
};

const HOW_IT_WORKS_STEPS = [
  { step: "01", title: "Apply Free", label: "Takes ~60 seconds", body: "Fill in a short application form. No hidden fees, no experience or CV required." },
  { step: "02", title: "Get Approved", label: "Within 24 Hours", body: "Our automated onboarding system processes your submission and provides immediate access." },
  { step: "03", title: "Start Tasks", label: "Instant Access", body: "Log into your personal workspace from any smartphone and choose available micro-tasks." },
  { step: "04", title: "Earn & Cashout", label: "Flexible Cashouts", body: "Track your real-time earnings on your dashboard and request instant mobile money extractions." },
];

export default function GlobalJobPage({ params }: PageProps) {
  const resolvedParams = use(params);

  if (!resolvedParams?.jobSlug) {
    notFound();
  }

  const jobType = getJobType(resolvedParams.jobSlug);
  if (!jobType) {
    notFound();
  }

  const contentMatrix = DEEP_CONTENT_MATRIX[jobType.slug.toLowerCase()] ?? DEEP_CONTENT_MATRIX["chatting"];

  const fallbackMarket = getMarket("kenya") || {
    country: "Kenya",
    payment: "M-Pesa",
    currency: "KES",
    topEarning: "KES 45,000",
    cities: []
  };

  const { title, icon, tagline, description, badge } = jobType;
  const { payment, topEarning } = fallbackMarket;

  const faqs = [
    {
      question: `Is experience or a laptop mandatory for online ${title.toLowerCase()} jobs?`,
      answer: `No. All remote tasks are structured explicitly to run smoothly inside smartphone mobile browsers. You do not need a computer or prior professional certification. VelloEarn includes comprehensive contextual onboarding instructions delivered directly over WhatsApp to get you up and running within minutes.`
    },
    {
      question: `How and when do I get paid for completed ${title.toLowerCase()} work?`,
      answer: `Payments are tracked instantly in your secure user dashboard as tasks are completed and verified. You can execute direct balance withdrawal requests at any point. Funds are processed out and sent using high-speed mobile money options straight to your registered telephone line.`
    },
    {
      question: `Are there hidden fees to start this ${title.toLowerCase()} remote program?`,
      answer: `No. Submitting an application and receiving project matches on the VelloEarn platform is entirely free. We do not charge registration fees or account creation charges. We disclose everything upfront via WhatsApp.`
    },
    {
      question: `Can I do this work part-time while keeping my regular day job?`,
      answer: `Absolutely. The workflow engine functions 24/7. Operators log on whenever convenient—whether early morning, late night, or over weekends. You retain full control over your operational hours with zero mandatory daily shifts.`
    }
  ];

  const schemas = [
    breadcrumbSchema([
      { name: "Home", href: "/" },
      { name: "Remote Opportunities", href: "/join" },
      { name: `${title} Openings`, href: `/earn/${jobType.slug}` },
    ]),
    faqSchema(faqs),
  ];

  return (
    <>
      {schemas.map((schema, i) => (
        <Script
          key={i}
          id={`schema-global-job-${i}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <main className="bg-gray-50 min-h-screen">

        {/* ── Breadcrumb ──────────────────────────────────────────── */}
        <nav aria-label="breadcrumb" className="bg-white border-b border-gray-100 px-4 py-3 text-xs text-gray-400">
          <ol className="flex items-center gap-2 max-w-7xl mx-auto flex-wrap">
            <li><Link href="/" className="hover:text-rose-500 transition-colors">Home</Link></li>
            <li>/</li>
            <li><Link href="/join" className="hover:text-rose-500 transition-colors">Online Jobs</Link></li>
            <li>/</li>
            <li className="text-gray-700 font-medium">{title} Openings</li>
          </ol>
        </nav>

        {/* ── Hero (Split Conversion Layout) ────────────────────── */}
        <section className="pt-12 pb-16 bg-gradient-to-br from-rose-50/60 via-white to-pink-50/40 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Column: Offer Messaging */}
              <div className="lg:col-span-7 text-left space-y-6">
                <div className="inline-flex items-center gap-2 bg-rose-100/80 text-rose-700 text-xs font-bold px-3.5 py-1.5 rounded-full">
                  <span>{icon}</span>
                  <span>{badge} Verified Category</span>
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-[1.15] tracking-tight">
                  Verified Online <span className="text-rose-500">{title}</span> Jobs — Phone Only
                </h1>

                <p className="text-lg text-gray-600 font-medium leading-relaxed max-w-2xl">
                  {tagline} {description} Top earners make up to <strong className="text-gray-900 underline decoration-rose-300 decoration-2">{topEarning}/month</strong> with instant {payment} payouts.
                </p>

                {/* Micro-Trust Signals */}
                <div className="pt-2 flex flex-wrap gap-y-2 gap-x-6 text-xs text-gray-500 font-semibold">
                  <div className="flex items-center gap-1.5">
                    <span className="text-emerald-500 font-bold">✓</span> No Laptop Required
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-emerald-500 font-bold">✓</span> 0% Registration Fee
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-emerald-500 font-bold">✓</span> Instant Mobile Money Cashout
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <Link
                    href={VELLOEARN_REGISTER_URL}
                    className="bg-rose-500 hover:bg-rose-600 text-white font-bold text-base px-8 py-4 rounded-xl shadow-lg shadow-rose-200 transition-all text-center hover:-translate-y-0.5"
                  >
                    Apply for {title} Jobs Free →
                  </Link>
                  <a
                    href="#payout-rates"
                    className="bg-white text-gray-700 font-bold text-base px-8 py-4 rounded-xl border border-gray-200 shadow-sm transition-all hover:bg-gray-50 text-center"
                  >
                    View Wage Matrix
                  </a>
                </div>
              </div>

              {/* Right Column: High-Converting Quick Apply Preview Box */}
              <div className="lg:col-span-5">
                <div className="bg-white rounded-2xl border border-gray-200 shadow-xl p-6 sm:p-8 space-y-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-emerald-500 text-white text-[10px] font-bold tracking-wider uppercase px-4 py-1 rounded-bl-xl shadow-sm">
                    Open Slots Available
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-xl font-black text-gray-900">Start Earning Today</h3>
                    <p className="text-xs text-gray-500">Fast-track onboardings active for {title} operators.</p>
                  </div>

                  <div className="space-y-3 bg-gray-50 p-4 rounded-xl border border-gray-100 text-xs">
                    <div className="flex justify-between items-center pb-2 border-b border-gray-200/60">
                      <span className="text-gray-500">Estimated Rate:</span>
                      <span className="font-bold text-emerald-600 font-mono">Up to {topEarning}/mo</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-gray-200/60">
                      <span className="text-gray-500">Requirement:</span>
                      <span className="font-semibold text-gray-800">Smartphone & Internet</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">Payout Option:</span>
                      <span className="font-semibold text-gray-800">{payment} / Direct Transfer</span>
                    </div>
                  </div>

                  <Link
                    href={VELLOEARN_REGISTER_URL}
                    className="w-full block text-center bg-rose-500 hover:bg-rose-600 text-white font-extrabold text-sm py-4 rounded-xl shadow-md transition-all uppercase tracking-wide"
                  >
                    Complete 2-Min Application
                  </Link>

                  <p className="text-[11px] text-center text-gray-400">
                    🔒 100% Free Application. No upfront fees ever required.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <TrainingChannelBanner />
        </div>

        {/* ── Core Structural Overview ────────────────────────────── */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-10 items-start">
              
              {/* Left Column: Scope & Responsibilities */}
              <div className="lg:col-span-7 space-y-8">
                <div>
                  <h2 className="text-xs font-bold uppercase tracking-wider text-rose-500 mb-1">Operational Classification</h2>
                  <h3 className="text-3xl font-black text-gray-900 tracking-tight mb-4">Core Task Framework</h3>
                  <p className="text-gray-600 text-base leading-relaxed">
                    {contentMatrix.overview} VelloEarn processes structural global assignments, breaking them down into small entry flows and conversational lines that eliminate the need for premium technical gear.
                  </p>
                </div>

                <hr className="border-gray-100" />

                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span>📋</span> Essential Responsibilities
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {contentMatrix.responsibilities.map((resp, i) => (
                      <div key={i} className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex items-start gap-3">
                        <span className="text-rose-500 shrink-0 font-bold">✦</span>
                        <p className="text-xs text-gray-600 leading-relaxed">{resp}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Requirements Box */}
              <div className="lg:col-span-5 bg-gradient-to-b from-gray-50 to-white rounded-2xl border border-gray-200 p-6 sm:p-8 relative shadow-sm">
                <div className="absolute top-0 right-6 -translate-y-1/2 bg-amber-100 text-amber-800 text-[10px] font-extrabold tracking-wider uppercase px-3 py-1 rounded-full border border-amber-200">
                  No Laptop Needed
                </div>
                
                <h3 className="font-extrabold text-gray-900 text-lg mb-1">Acceptance Benchmarks</h3>
                <p className="text-xs text-gray-500 mb-6">Ensure your metrics pass these conditions before starting onboarding.</p>
                
                <div className="space-y-4">
                  {contentMatrix.skillsRequired.map((skill, idx) => (
                    <div key={idx} className="flex gap-3 items-start bg-white p-3.5 rounded-xl border border-gray-100">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 text-emerald-700 text-xs font-bold">
                        ✓
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed font-medium">{skill}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── Strict Data-Driven Wage Matrix ────────────────────── */}
        <section id="payout-rates" className="py-16 bg-gray-50/70 border-y border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="text-xs font-bold uppercase tracking-wider text-rose-500 mb-1">Transparent Compensation Structure</h2>
              <h3 className="text-3xl font-black text-gray-900 tracking-tight">Project Payment & Task Value Scales</h3>
            </div>

            <div className="overflow-hidden border border-gray-200 rounded-2xl bg-white shadow-sm">
              <table className="w-full text-left text-sm text-gray-500 border-collapse">
                <thead>
                  <tr className="bg-gray-100/70 text-gray-800 font-bold border-b border-gray-200">
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Task Classification</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Base Yield Rate</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Payout Frequency</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-xs sm:text-sm">
                  {contentMatrix.payoutBreakdown.map((row, i) => (
                    <tr key={i} className="hover:bg-rose-50/30 transition-colors">
                      <td className="px-6 py-4 text-gray-900 font-semibold">{row.item}</td>
                      <td className="px-6 py-4 text-emerald-600 font-mono font-bold">{row.rate}</td>
                      <td className="px-6 py-4 text-gray-500">{row.frequency}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── How it works (Full 4-Column Grid) ─────────────────── */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-xl mx-auto mb-12">
              <h2 className="text-3xl font-black text-gray-900 mb-2">
                How to Start {title} Work
              </h2>
              <p className="text-xs text-gray-500">Simple four-step process to launch your operational dashboard.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {HOW_IT_WORKS_STEPS.map((s) => (
                <div key={s.step} className="bg-gray-50/80 rounded-2xl border border-gray-200 p-6 shadow-sm flex flex-col justify-between hover:border-rose-200 transition-colors">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-rose-500 text-white font-black text-sm flex items-center justify-center mb-4">
                      {s.step}
                    </div>
                    <span className="text-[10px] font-bold text-rose-500 uppercase tracking-wider block mb-1">{s.label}</span>
                    <h3 className="font-black text-gray-900 text-lg mb-2">{s.title}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed">{s.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── High-Yield SEO Internal Geolocation Linking ───────────── */}
        <section className="py-14 bg-gray-50 border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-xl font-black text-gray-900 mb-2">
              Regional Mobile Money Deployments
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mb-8 max-w-2xl mx-auto">
              Select your specific regional node to launch with localized currency channels, enabling zero-fee instant dashboard extractions directly onto your phone.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {MARKETS.map((m) => (
                <Link
                  key={m.slug}
                  href={`/earn/job/${jobType.slug}/${m.slug}`}
                  className="text-xs font-semibold text-gray-700 bg-white border border-gray-200 px-5 py-3 rounded-xl hover:border-rose-400 hover:text-rose-600 shadow-sm transition-all"
                >
                  📍 {title} in <span className="font-bold">{m.country}</span> ({m.payment} Gate)
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ─────────────────────────────────────────────────── */}
        <section className="py-16 bg-white border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-black text-gray-900 mb-10 text-center">
              Common Questions Regarding {title} Work
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-gray-50 rounded-2xl border border-gray-100 p-6 shadow-sm">
                  <h3 className="font-bold text-gray-900 text-base mb-3 flex items-start gap-2">
                    <span className="text-rose-500 font-extrabold">Q.</span>
                    <span>{faq.question}</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed pl-6 border-l-2 border-rose-200">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Related Jobs Grid ─────────────────────────────────── */}
        <section className="py-14 bg-gray-50 border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-black text-gray-900 mb-8 text-center">
              Other Verified Tracks Available Right Now
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {JOB_TYPES.filter((j) => j.slug !== jobType.slug).map((job) => (
                <Link
                  key={job.slug}
                  href={`/earn/job/${job.slug}`}
                  className="group bg-white hover:bg-rose-50/50 border border-gray-200 hover:border-rose-300 rounded-2xl p-5 transition-all text-center flex flex-col justify-between shadow-sm"
                >
                  <div>
                    <div className="text-3xl mb-2">{job.icon}</div>
                    <h3 className="font-extrabold text-gray-900 text-sm mb-1 group-hover:text-rose-500 transition-colors">{job.title}</h3>
                    <p className="text-xs text-gray-400 mb-3 line-clamp-2">{job.tagline}</p>
                  </div>
                  <span className="text-xs text-rose-500 font-bold block group-hover:underline">
                    Learn more →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Bottom Wide High-Impact CTA ──────────────────────────── */}
        <section className="py-16 bg-gradient-to-r from-rose-600 to-rose-500 text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Ready to claim your secure {title.toLowerCase()} task allocation?
            </h2>
            <p className="text-rose-100 mb-8 text-base max-w-2xl mx-auto">
              Apply free in 2 minutes. Onboarding queues are processed daily. Lock your operational dashboard slots now.
            </p>
            <Link
              href={VELLOEARN_REGISTER_URL}
              className="inline-block bg-white text-rose-600 font-black text-lg px-10 py-4 rounded-xl shadow-2xl hover:scale-105 transition-all uppercase tracking-wide"
            >
              Initialize Free Application Now
            </Link>
          </div>
        </section>

      </main>
    </>
  );
}