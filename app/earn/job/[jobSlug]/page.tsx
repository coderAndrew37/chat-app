// app/earn/[jobSlug]/page.tsx
// ─── HIGH-AUTHORITY GLOBAL JOB OPENINGS LANDING ENGINE (LIGHT THEME) ──────────
// Route: /earn/chatting  /earn/ai-training  /earn/surveys  /earn/forex  /earn/academic-writing

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

interface PageProps {
  params: Promise<{ jobSlug: string }>;
}

// ─── Static Generation Indexing ───────────────────────────────────────────────

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
      canonical: `/earn/${jobType.slug}`,
    }
  };
}

// ─── Semantic Track Content Matrix for Advanced SEO Content ───────────────────
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
  { step: "1", title: "Apply free", label: "Takes ~60 seconds", body: "Fill in a 2-minute application form. No fee, no CV required." },
  { step: "2", title: "Get approved", label: "Within 24 Hours", body: "We review your profile and reach out on WhatsApp within 24 hours." },
  { step: "3", title: "Activate & start", label: "Instant Access", body: "Complete the one-time activation, then access your first tasks." },
  { step: "4", title: "Earn & withdraw", label: "Flexible Cashouts", body: "Complete tasks, track earnings in your dashboard, withdraw to mobile money." },
];

// ─── Page Component ───────────────────────────────────────────────────────────

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
        <nav aria-label="breadcrumb" className="bg-white border-b border-gray-100 px-4 py-2 text-xs text-gray-400">
          <ol className="flex items-center gap-1 max-w-3xl mx-auto flex-wrap">
            <li><Link href="/" className="hover:text-rose-500">Home</Link></li>
            <li>/</li>
            <li><Link href="/join" className="hover:text-rose-500">Online Jobs</Link></li>
            <li>/</li>
            <li className="text-gray-600">{title} Openings</li>
          </ol>
        </nav>

        {/* ── Hero ────────────────────────────────────────────────── */}
        <section className="pt-16 pb-12 bg-gradient-to-br from-rose-50 via-white to-pink-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <div className="inline-flex items-center gap-2 bg-rose-100 text-rose-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">
              <span>{icon}</span>
              {badge} Verified Category
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
              Verified Online <span className="text-rose-500">{title}</span> Jobs — Phone Only
            </h1>

            <p className="text-lg text-gray-500 max-w-xl mx-auto mb-4">
              {tagline}
            </p>
            <p className="text-sm text-gray-400 max-w-lg mx-auto mb-8">
              {description} Top earners make up to{" "}
              <strong className="text-gray-700">{topEarning}/month</strong>. 
              Free to apply — no CV required.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href={`/join`}
                className="bg-rose-500 hover:bg-rose-600 text-white font-bold text-base px-8 py-4 rounded-full shadow-lg shadow-rose-200 transition-all hover:scale-105"
              >
                Apply for {title} Jobs →
              </Link>
              <a
                href="#payout-rates"
                className="bg-white text-gray-700 font-semibold text-base px-8 py-4 rounded-full border border-gray-200 shadow-sm transition-all hover:scale-105 flex items-center justify-center"
              >
                View Expected Wage Matrix
              </a>
            </div>
          </div>
        </section>

        {/* ── Core Structural Overview (SEO Content Engine) ────────── */}
        <section className="py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <div className="grid md:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Scope Details */}
              <div className="md:col-span-7 space-y-6">
                <div>
                  <h2 className="text-xs font-bold uppercase tracking-wider text-rose-500 mb-1">Operational Classification</h2>
                  <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight mb-3">Core Task Framework</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {contentMatrix.overview} VelloEarn processes structural global assignments, breaking them down into small entry flows and conversational lines that eliminate the need for premium technical gear.
                  </p>
                </div>

                <hr className="border-gray-100" />

                <div>
                  <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span>📋</span> Essential Responsibilities
                  </h3>
                  <ul className="space-y-3">
                    {contentMatrix.responsibilities.map((resp, i) => (
                      <li key={i} className="text-xs text-gray-500 flex items-start gap-2.5 leading-relaxed">
                        <span className="text-rose-500 shrink-0 mt-0.5">✦</span>
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Column: Requirements Box */}
              <div className="md:col-span-5 bg-gray-50 rounded-2xl border border-gray-100 p-6 relative">
                <div className="absolute top-0 right-6 -translate-y-1/2 bg-amber-100 text-amber-800 text-[10px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full">
                  No Laptop Needed
                </div>
                
                <h3 className="font-bold text-gray-900 text-sm mb-1">Acceptance Benchmarks</h3>
                <p className="text-[11px] text-gray-400 mb-4">Ensure your metrics pass these conditions before starting onboarding.</p>
                
                <div className="space-y-3">
                  {contentMatrix.skillsRequired.map((skill, idx) => (
                    <div key={idx} className="flex gap-2 items-start">
                      <div className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 text-emerald-700 text-[10px] font-bold">
                        ✓
                      </div>
                      <p className="text-xs text-gray-500 leading-relaxed">{skill}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── Strict Data-Driven Wage Matrix (High Value SEO Signal) ── */}
        <section id="payout-rates" className="py-16 bg-gray-50 border-y border-gray-100">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-8">
              <h2 className="text-xs font-bold uppercase tracking-wider text-rose-500 mb-1">Transparent Compensation Structure</h2>
              <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight">Project Payment & Task Value Scales</h3>
            </div>

            <div className="overflow-x-auto border border-gray-100 rounded-xl bg-white shadow-sm">
              <table className="w-full text-left text-sm text-gray-500 border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-gray-700 font-semibold border-b border-gray-100">
                    <th className="px-5 py-3.5 text-xs font-bold uppercase tracking-wider">Task Classification</th>
                    <th className="px-5 py-3.5 text-xs font-bold uppercase tracking-wider">Base Yield Rate</th>
                    <th className="px-5 py-3.5 text-xs font-bold uppercase tracking-wider">Payout Frequency</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-xs">
                  {contentMatrix.payoutBreakdown.map((row, i) => (
                    <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-5 py-4 text-gray-900 font-medium">{row.item}</td>
                      <td className="px-5 py-4 text-emerald-600 font-mono font-semibold">{row.rate}</td>
                      <td className="px-5 py-4 text-gray-400">{row.frequency}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── How it works ─────────────────────────────────────────── */}
        <section className="py-16 bg-white">
          <div className="max-w-2xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-10 text-center">
              How to start {title.toLowerCase()} work
            </h2>
            <div className="space-y-4">
              {HOW_IT_WORKS_STEPS.map((s) => (
                <div key={s.step} className="flex items-start gap-4 bg-gray-50 rounded-2xl border border-gray-100 p-5 shadow-sm">
                  <div className="w-8 h-8 rounded-full bg-rose-500 text-white font-extrabold text-sm flex items-center justify-center shrink-0">
                    {s.step}
                  </div>
                  <div>
                    <span className="text-[10px] font-semibold text-rose-500 uppercase tracking-wider block mb-0.5">{s.label}</span>
                    <h3 className="font-bold text-gray-900 text-sm mb-0.5">{s.title}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed">{s.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── High-Yield SEO Internal Geolocation Linking ───────────── */}
        <section className="py-12 bg-white border-t border-gray-100">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-lg font-extrabold text-gray-900 mb-2">
              Regional Mobile Money Deployments
            </h2>
            <p className="text-sm text-gray-500 mb-6 max-w-xl mx-auto">
              Select your specific regional node to launch with localized currency channels, enabling zero-fee instant dashboard extractions directly onto your phone.
            </p>
            <div className="flex flex-wrap justify-center gap-2.5">
              {MARKETS.map((m) => (
                <Link
                  key={m.slug}
                  href={`/earn/job/${jobType.slug}/${m.slug}`}
                  className="text-xs font-medium text-gray-600 bg-gray-50 border border-gray-100 px-4 py-2.5 rounded-full hover:border-rose-200 hover:text-rose-600 transition-all"
                >
                  📍 {title} in <span className="font-semibold">{m.country}</span> ({m.payment} Gate)
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ─────────────────────────────────────────────────── */}
        <section className="py-16 bg-gray-50 border-t border-gray-100">
          <div className="max-w-2xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-8 text-center">
              Common Questions Regarding {title} Work
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                  <h3 className="font-semibold text-gray-900 text-sm mb-2 flex items-start gap-2">
                    <span className="text-rose-500">Q.</span>
                    <span>{faq.question}</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed pl-4 border-l border-gray-100">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Related jobs ─────────────────────────────────────────── */}
        <section className="py-12 bg-white border-t border-gray-100">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <h2 className="text-lg font-extrabold text-gray-900 mb-5 text-center">
              Other Verified Tracks Available Right Now
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {JOB_TYPES.filter((j) => j.slug !== jobType.slug).map((job) => (
                <Link
                  key={job.slug}
                  href={`/earn/job/${job.slug}`}
                  className="group bg-gray-50 hover:bg-rose-50 border border-gray-100 hover:border-rose-200 rounded-2xl p-4 transition-all text-center"
                >
                  <div className="text-2xl mb-1">{job.icon}</div>
                  <h3 className="font-bold text-gray-900 text-xs mb-1 group-hover:text-rose-500 transition-colors">{job.title}</h3>
                  <p className="text-[11px] text-gray-400 mb-2 line-clamp-2">{job.tagline}</p>
                  <span className="text-[11px] text-rose-500 font-semibold block group-hover:underline">
                    Learn more →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Bottom CTA ───────────────────────────────────────────── */}
        <section className="py-14 bg-rose-500 text-center">
          <div className="max-w-xl mx-auto px-4">
            <h2 className="text-2xl font-extrabold text-white mb-3">
              Ready to claim your secure {title.toLowerCase()} task allocation?
            </h2>
            <p className="text-rose-100 mb-6 text-sm">
              Apply free in 2 minutes. Onboarding queues are processed daily. Lock your operational dashboard slots now.
            </p>
            <Link
              href={`/join`}
              className="inline-block bg-white text-rose-500 font-bold text-base px-10 py-4 rounded-full shadow-xl hover:scale-105 transition-all"
            >
              Initialize Free Application Now
            </Link>
          </div>
        </section>

      </main>
    </>
  );
}