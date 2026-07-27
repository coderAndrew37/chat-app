"use client";

import LiveAcademicWriting from "@/app/components/LiveAcademicWriting";
import TrainingChannelBanner from "@/app/components/TrainingChannelBanner";
import { VELLOEARN_REGISTER_URL } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";



// --- Components ---

function SmartImage({
  src, fallback, alt, fill, width, height, className, sizes, priority,
}: {
  src: string; fallback: string; alt: string; fill?: boolean; width?: number; height?: number;
  className?: string; sizes?: string; priority?: boolean;
}) {
  const [imgSrc, setImgSrc] = useState(src);
  const props = { src: imgSrc, alt, className, onError: () => setImgSrc(fallback), sizes, priority };
  return fill
    ? <Image {...props} fill unoptimized alt="" />
    : <Image {...props} width={width ?? 400} height={height ?? 300} unoptimized alt=""/>;
}

function ObjAccordion({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left transition-colors hover:bg-gray-50"
      >
        <span className="font-semibold text-gray-900 text-sm sm:text-base pr-4">{q}</span>
        <span
          className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 ${
            open ? "bg-emerald-600 text-white rotate-45" : "bg-gray-100 text-gray-500"
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </span>
      </button>
      {open && (
        <div className="px-5 pb-5 animate-in fade-in slide-in-from-top-1 duration-200">
          <p className="text-gray-500 text-sm leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  );
}

// --- Props Typings ---
interface AcademicWritingClientProps {
  countryTarget: "kenya" | "uganda" | "ghana";
}

// --- Dynamic Geo-Configuration Matrix ---
const REGIONAL_CONFIGS = {
  kenya: {
    currency: "KES",
    paymentMethod: "M-Pesa",
    minWithdrawal: "KES 0",
    topEarnerPayout: "KES 70,000+",
    heroStats: [
      { v: "KES 500+", l: "Per essay" },
      { v: "KES 60,000+", l: "Max per dissertation" },
      { v: "Free", l: "To join" },
    ],
    writingTypes: [
      { icon: "📄", title: "Essays & coursework", pages: "2–10 pages", pay: "KES 500 – 2,500", body: "The bread and butter. Undergraduate essays, discussion posts, case studies, and short papers. High volume, fast turnaround." },
      { icon: "🔬", title: "Research papers", pages: "10–30 pages", pay: "KES 3,000 – 9,000", body: "Term papers and research assignments requiring sources, citations, and structured argument. Higher pay grade profiles." },
      { icon: "📚", title: "Dissertations & theses", pages: "30–100+ pages", pay: "KES 15,000 – 60,000", body: "The highest-paying category. Broken into chapters and delivered in stages. One solid dissertation can easily match a corporate salary." },
      { icon: "💼", title: "Business & professional writing", pages: "Varies", pay: "KES 1,500 – 8,000", body: "Business plans, reports, executive summaries, and proposals. Clean, professionally structured academic language is standard." },
    ],
    earnings: [
      { label: "Part-time (3–5 orders/week)", range: "KES 8,000 – 18,000", note: "/ month" },
      { label: "Full-time (daily orders)", range: "KES 25,000 – 45,000", note: "/ month" },
      { label: "Full-time + dissertations", range: "KES 50,000 – 90,000+", note: "/ month" },
    ],
    stories: [
      { name: "Faith W.", location: "Nairobi, South B", earned: "KES 38,000 / month", story: "I graduated with a BA in Literature and had no idea what to do with it. A friend showed me this. I write 4–5 essays a week and two or three research papers. Now it's my main income.", img: "/testimonials/faith.jpg", fallback: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&h=200&fit=crop&crop=face&auto=format" },
      { name: "Brian K.", location: "Mombasa", earned: "KES 71,000 / month", story: "I specialise in business and management writing. Dissertations mostly. I do maybe two full dissertations a month on top of regular essays. I make a great sustainable income here.", img: "/testimonials/brian.jpg", fallback: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=200&h=200&fit=crop&crop=face&auto=format" },
    ],
    objections: [
      { q: "Is academic writing legal?", a: "Writing and selling academic content is completely legal. What clients do with work they purchase is their responsibility — the same way a ghostwriter isn't accountable for how a book is published. This is a legitimate global service industry." },
      { q: "Do I need a degree to apply?", a: "A degree helps and gives you more subject coverage. But strong writers without a formal degree can still qualify based on their writing test result, especially for general subjects and business writing tracks." },
    ]
  },
  uganda: {
    currency: "UGX",
    paymentMethod: "MTN MoMo & Airtel Money",
    minWithdrawal: "UGX 0",
    topEarnerPayout: "UGX 2,000,000+",
    heroStats: [
      { v: "UGX 15,000+", l: "Per essay" },
      { v: "UGX 1,800,000+", l: "Max per dissertation" },
      { v: "Free", l: "To join" },
    ],
    writingTypes: [
      { icon: "📄", title: "Essays & coursework", pages: "2–10 pages", pay: "UGX 15,000 – 75,000", body: "The bread and butter. Undergraduate essays, discussion posts, case studies, and short papers. High volume, fast turnaround." },
      { icon: "🔬", title: "Research papers", pages: "10–30 pages", pay: "UGX 90,000 – 270,000", body: "Term papers and research assignments requiring sources, citations, and structured argument. Higher pay grade profiles." },
      { icon: "📚", title: "Dissertations & theses", pages: "30–100+ pages", pay: "UGX 450,000 – 1,800,000", body: "The highest-paying category. Broken into chapters and delivered in stages. One solid dissertation can easily match a corporate salary." },
      { icon: "💼", title: "Business & professional writing", pages: "Varies", pay: "UGX 45,000 – 240,000", body: "Business plans, reports, executive summaries, and proposals. Clean, professionally structured academic language is standard." },
    ],
    earnings: [
      { label: "Part-time (3–5 orders/week)", range: "UGX 240,000 – 550,000", note: "/ month" },
      { label: "Full-time (daily orders)", range: "UGX 750,000 – 1,350,000", note: "/ month" },
      { label: "Full-time + dissertations", range: "UGX 1,500,000 – 2,700,000+", note: "/ month" },
    ],
    stories: [
      { name: "Florence N.", location: "Kampala, Makerere", earned: "UGX 1,150,000 / month", story: "After campus, finding a direct employment connection took months. VelloEarn changed everything. I handle literature reviews and history papers right from my phone and laptop.", img: "/testimonials/faith.jpg", fallback: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&h=200&fit=crop&crop=face&auto=format" },
      { name: "Derrick O.", location: "Mbarara", earned: "UGX 2,100,000 / month", story: "I focus solely on business modules and strategic marketing tasks. Managing two big dissertations a month pays much better than traditional junior administration frameworks here.", img: "/testimonials/brian.jpg", fallback: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=200&h=200&fit=crop&crop=face&auto=format" },
    ],
    objections: [
      { q: "Is academic writing legal in Uganda?", a: "Writing and selling academic reference material is completely legal. How clients choose to use their bought products is their business domain. It's an active global freelance industry employing thousands of writers." },
      { q: "Do I need a degree to apply?", a: "A degree maps out direct domain authority, but your fundamental performance on our sample entry writing test is what overrides everything else during initial onboarding." },
    ]
  },
  ghana: {
    currency: "GHS",
    paymentMethod: "Mobile Money (MTN / Vodafone)",
    minWithdrawal: "GHS 0",
    topEarnerPayout: "GHS 7,500+",
    heroStats: [
      { v: "GHS 60+", l: "Per essay" },
      { v: "GHS 7,000+", l: "Max per dissertation" },
      { v: "Free", l: "To join" },
    ],
    writingTypes: [
      { icon: "📄", title: "Essays & coursework", pages: "2–10 pages", pay: "GHS 60 – 300", body: "The bread and butter. Undergraduate essays, discussion posts, case studies, and short papers. High volume, fast turnaround." },
      { icon: "🔬", title: "Research papers", pages: "10–30 pages", pay: "GHS 350 – 1,100", body: "Term papers and research assignments requiring sources, citations, and structured argument. Higher pay grade profiles." },
      { icon: "📚", title: "Dissertations & theses", pages: "30–100+ pages", pay: "GHS 1,800 – 7,000", body: "The highest-paying category. Broken into chapters and delivered in stages. One solid dissertation can easily match a corporate salary." },
      { icon: "💼", title: "Business & professional writing", pages: "Varies", pay: "GHS 180 – 950", body: "Business plans, reports, executive summaries, and proposals. Clean, professionally structured academic language is standard." },
    ],
    earnings: [
      { label: "Part-time (3–5 orders/week)", range: "GHS 950 – 2,200", note: "/ month" },
      { label: "Full-time (daily orders)", range: "GHS 3,000 – 5,500", note: "/ month" },
      { label: "Full-time + dissertations", range: "GHS 6,000 – 11,000+", note: "/ month" },
    ],
    stories: [
      { name: "Ama A.", location: "Accra, East Legon", earned: "GHS 4,500 / month", story: "My degree in economics was just sitting there until I started applying it to research orders here. Getting instant Mobile Money payouts directly helps smooth out monthly logistics.", img: "/testimonials/faith.jpg", fallback: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&h=200&fit=crop&crop=face&auto=format" },
      { name: "Emmanuel T.", location: "Kumasi", earned: "GHS 8,200 / month", story: "STEM projects and long-form engineering dissertations bring in heavy value. Once you lock down standard citation styling layouts, writing flows naturally.", img: "/testimonials/brian.jpg", fallback: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=200&h=200&fit=crop&crop=face&auto=format" },
    ],
    objections: [
      { q: "Is academic writing legal in Ghana?", a: "Yes, researching and writing content on contract terms is perfectly legal worldwide. Your operations fall under contract freelance writing services catering to global clients." },
      { q: "Do I need a degree to apply?", a: "While specialized qualifications allow entry into high-tier assignments, any writer demonstrating strong research capabilities during our preliminary writing text gets approved." },
    ]
  },
};

// --- Main Page ---
export default function AcademicWritingClient({ countryTarget }: AcademicWritingClientProps) {
  // Active geo configuration backup fallback to Kenya
  const config = REGIONAL_CONFIGS[countryTarget] || REGIONAL_CONFIGS.kenya;

  // Images for hero collage
  const writingImage = "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&h=600&fit=crop&auto=format";
  const researchImage = "https://images.unsplash.com/photo-1507842217343-583bb72959d3?w=800&h=600&fit=crop&auto=format";

  // Remaining standard structural content
  const INVARIANT_OBJECTIONS = [
    { q: "What subjects are in demand?", a: "Business, management, nursing, psychology, law, and education are consistently the highest-volume subjects. STEM papers (engineering, computer science) are fewer but pay significantly more per page. Whatever your field, there are likely orders waiting." },
    { q: "What if the client rejects my work?", a: "Rejections are rare if you follow the brief. When they happen, you'll get specific revision notes. You revise and resubmit — this is normal in any writing workflow." },
    { q: "How fast do I need to write?", a: "Orders come with deadlines you see before accepting. Most writers do 500–1,000 words per hour on familiar subjects. You set the pace entirely." },
    { q: "What about plagiarism?", a: "All submissions are checked. Work must be 100% original — no copying from the internet, no AI-generated text. If you write it yourself, you have nothing to worry about." }
  ];

  const fullObjections = [...config.objections, ...INVARIANT_OBJECTIONS];

  return (
    <main className="bg-gray-50 min-h-screen">

      {/* ── Hero ── */}
      <section className="relative pt-12 pb-16 sm:pt-16 sm:pb-20 overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-teal-50">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
            
            {/* Left - Content */}
            <div>
              <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-600 mb-6 sm:mb-8 transition">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                Back to VelloEarn
              </Link>

              <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1.5 rounded-full mb-6 uppercase tracking-wider">
                ✍️ Academic Writing · Highest Earning
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight tracking-tight mb-4">
                Your degree is sitting <br />
                <span className="text-emerald-600">idle. It shouldn&apos;t be.</span>
              </h1>

              <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-4 max-w-lg">
                Students worldwide pay for quality academic writing. If you write well — in any subject — there&apos;s a queue of orders waiting. Get paid per paper, directly to {config.paymentMethod}, on your own schedule.
              </p>

              <p className="text-sm sm:text-base text-gray-400 mb-8 max-w-lg">
                Free to join · No fees · Instant {config.paymentMethod} payouts · {config.topEarnerPayout} top earners
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-10">
                <Link
                  href={VELLOEARN_REGISTER_URL}
               
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-base px-8 py-4 rounded-full shadow-lg shadow-emerald-200 transition-all hover:scale-105 active:scale-95 text-center"
                >
                  Start Writing — Free →
                </Link>
                <Link
                  href="#how-it-works"
                  className="bg-white hover:bg-gray-50 text-gray-600 font-semibold text-base px-8 py-4 rounded-full border border-gray-200 shadow-sm transition-all hover:scale-105 active:scale-95 text-center"
                >
                  See how it works
                </Link>
              </div>

              <div className="flex gap-8">
                {config.heroStats.map((s) => (
                  <div key={s.l}>
                    <div className="text-lg font-extrabold text-gray-900">{s.v}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Image Collage */}
            <div className="relative grid grid-cols-2 gap-3 mt-8 lg:mt-0">
              {/* Main Image - Writing */}
              <Link
                href={VELLOEARN_REGISTER_URL}
             
                rel="noopener noreferrer"
                className="col-span-2 relative rounded-2xl overflow-hidden h-48 sm:h-56 shadow-xl group"
              >
                <Image
                  src={writingImage}
                  alt="Academic writing from home"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <p className="text-white font-bold text-sm group-hover:text-emerald-300 transition-colors">✍️ Academic Writing</p>
                  <p className="text-white/70 text-xs">KES 500+ per essay · Flexible hours →</p>
                </div>
              </Link>

              {/* Bottom Left - Research */}
              <Link
                href={VELLOEARN_REGISTER_URL}
             
                rel="noopener noreferrer"
                className="relative rounded-2xl overflow-hidden h-40 shadow-xl group"
              >
                <Image
                  src={researchImage}
                  alt="Research papers"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                  <p className="text-white font-bold text-xs group-hover:text-emerald-300 transition-colors">📚 Dissertations</p>
                  <p className="text-white/60 text-[10px]">KES 15,000–60,000 each →</p>
                </div>
              </Link>

              {/* Bottom Right - Stats Card */}
              <Link
                href={VELLOEARN_REGISTER_URL}
             
                rel="noopener noreferrer"
                className="relative rounded-2xl overflow-hidden h-40 bg-gradient-to-br from-emerald-600 to-teal-600 flex items-center justify-center shadow-xl group hover:scale-105 transition-transform duration-300"
              >
                <div className="text-center text-white p-4">
                  <div className="text-3xl font-extrabold group-hover:scale-110 transition-transform duration-300">{config.topEarnerPayout}</div>
                  <div className="text-sm text-emerald-100">Top earners</div>
                  <div className="text-xs text-emerald-200 mt-1 group-hover:text-white transition-colors">Start writing →</div>
                </div>
              </Link>
            </div>

          </div>
        </div>
      </section>

    <LiveAcademicWriting />

      {/* ── What you write ── */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-emerald-600 font-semibold text-sm uppercase tracking-wider">What you&apos;ll write</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2 mb-4">
              Four order types. Pick what you&apos;re good at.
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {config.writingTypes.map((t) => (
              <div key={t.title} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-2xl">{t.icon}</span>
                  <div className="text-right">
                    <p className="text-xs text-gray-400">{t.pages}</p>
                    <p className="text-xs font-bold text-emerald-600">{t.pay}</p>
                  </div>
                </div>
                <h3 className="font-bold text-gray-900 text-base mb-2">{t.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{t.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 bg-emerald-50 border border-emerald-100 rounded-2xl p-6 flex gap-4 items-start">
            <span className="text-2xl shrink-0">🎓</span>
            <div>
              <p className="font-bold text-gray-900 mb-1">Every subject is in demand</p>
              <p className="text-sm text-gray-600 leading-relaxed">
                Business and nursing are the highest-volume subjects. But literature, history, law, engineering, IT, and education all have consistent order flow. Whatever you studied, there&apos;s work for you.
              </p>
            </div>
          </div>
        </div>
      </section>

        <TrainingChannelBanner />

      {/* ── How it works ── */}
      <section id="how-it-works" className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="text-emerald-600 font-semibold text-sm uppercase tracking-wider">How it works</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2">Apply. Test. Write. Earn.</h2>
            <p className="text-gray-500 mt-2">Free to join. Start earning today.</p>
          </div>
          <div className="space-y-5">
            {[
              { step: "01", title: "Apply free", body: "Tell us your degree, your strong subjects, and your writing experience. No fees, no CV, no interview. Processing takes 24–48 hours." },
              { step: "02", title: "Pass a short writing test", body: "You'll write a short sample (200–400 words) on an assigned topic. This is how we place you at the right pay grade from the start — higher-quality writers get higher-paying orders." },
              { step: "03", title: "Claim orders from the queue", body: "You log in and browse available orders — topic, word count, deadline, and payout are shown upfront. You pick what suits your skills and schedule." },
              { step: "04", title: `Submit, get approved, get paid`, body: `You submit your work through the platform. Once reviewed and approved, your balance updates. Request a ${config.paymentMethod} payout anytime with no minimum.` }
            ].map((step, i) => (
              <div key={i} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 shadow-sm flex gap-5 items-start hover:border-emerald-200 transition-colors">
                <div className="shrink-0 w-12 h-12 rounded-2xl bg-emerald-600 text-white font-extrabold text-sm flex items-center justify-center">
                  {step.step}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-base mb-1">{step.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href={VELLOEARN_REGISTER_URL}
           
              rel="noopener noreferrer"
              className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base px-10 py-4 rounded-full shadow-lg shadow-emerald-200 transition-all hover:scale-105 active:scale-95"
            >
              Start Writing — Free →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Earning potential ── */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-emerald-600 font-semibold text-sm uppercase tracking-wider">Earning potential</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2 mb-3">
              The more you write, the more it compounds.
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Academic writing is the highest per-hour track on VelloEarn. Skilled writers who stay consistent are among our top earners.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 mb-14">
            {config.earnings.map((tier, i) => (
              <div
                key={i}
                className={`rounded-2xl p-6 border text-center ${
                  i === 2
                    ? "bg-emerald-600 border-emerald-500 text-white shadow-xl shadow-emerald-200"
                    : "bg-white border-gray-100 shadow-sm"
                }`}
              >
                <p
                  className={`text-xs font-semibold uppercase tracking-wider mb-3 ${
                    i === 2 ? "text-emerald-200" : "text-gray-400"
                  }`}
                >
                  {tier.label}
                </p>
                <p className={`text-2xl font-extrabold mb-1 ${i === 2 ? "text-white" : "text-gray-900"}`}>
                  {tier.range}
                </p>
                <p className={`text-xs ${i === 2 ? "text-emerald-200" : "text-gray-400"}`}>{tier.note}</p>
                {i === 2 && (
                  <p className="text-xs text-emerald-100 mt-2">🏆 Dissertation writers reach this</p>
                )}
              </div>
            ))}
          </div>

          <h3 className="text-xl font-extrabold text-gray-900 mb-5">From writers already doing it</h3>
          <div className="grid sm:grid-cols-2 gap-5">
            {config.stories.map((s) => (
              <div key={s.name} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative w-11 h-11 rounded-full overflow-hidden bg-emerald-100 shrink-0">
                    <SmartImage
                      src={s.img}
                      fallback={s.fallback}
                      alt={s.name}
                      fill
                      className="object-cover"
                      sizes="44px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 text-sm">{s.name}</p>
                    <p className="text-xs text-gray-400">{s.location}</p>
                  </div>
                  <span className="text-sm font-bold text-emerald-600 shrink-0">{s.earned}</span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed italic">&ldquo;{s.story}&rdquo;</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Objections ── */}
      <section className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-emerald-600 font-semibold text-sm uppercase tracking-wider">Real talk</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2 mb-3">
              The questions you&apos;re already thinking
            </h2>
          </div>
          <div className="space-y-4">
            {fullObjections.map((o, i) => (
              <ObjAccordion key={i} q={o.q} a={o.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA - Irresistible Offer ── */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 to-teal-600" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full translate-x-1/3 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/10 rounded-full -translate-x-1/3 translate-y-1/3 pointer-events-none" />
        
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white text-sm font-semibold px-4 py-2 rounded-full mb-6">
            ✍️ Join 1,200+ academic writers
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
            Your writing is worth <br />
            <span className="text-emerald-200">serious money.</span>
          </h2>
          
          <p className="text-emerald-100 text-lg mb-8 max-w-xl mx-auto">
            Free to join. Write essays, research papers, and dissertations. 
            No experience needed. Get paid instantly to {config.paymentMethod}.
          </p>

          <div className="flex flex-wrap justify-center gap-6 mb-8 text-white/80 text-sm">
            <span>✅ Free to join</span>
            <span>💸 No fees ever</span>
            <span>📱 Write from your phone</span>
            <span>⚡ Instant {config.paymentMethod} payouts</span>
          </div>

          <Link
            href={VELLOEARN_REGISTER_URL}
         
            rel="noopener noreferrer"
            className="inline-block bg-white text-emerald-600 hover:bg-emerald-50 font-extrabold text-xl px-12 py-5 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all"
          >
            Start Writing — Free →
          </Link>
          
          <p className="text-emerald-200/70 text-sm mt-4">
            No credit card · No payment required · Start earning instantly
          </p>
        </div>
      </section>

    </main>
  );
}