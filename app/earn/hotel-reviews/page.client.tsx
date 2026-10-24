"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { VELLOEARN_REGISTER_URL } from "@/lib/constants";
import { HOTELS, Hotel } from "@/data/hotels";

// ─── Small components ────────────────────────────────────────────────────────

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
            open ? "bg-rose-500 text-white rotate-45" : "bg-gray-100 text-gray-500"
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

function StarRating({ count }: { count: number }) {
  return (
    <span className="text-amber-400 text-xs tracking-tight" aria-label={`${count} stars`}>
      {"★".repeat(count)}
    </span>
  );
}

function HotelCard({ hotel }: { hotel: Hotel }) {
  return (
    <a
      href={VELLOEARN_REGISTER_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block rounded-xl overflow-hidden bg-gray-100 aspect-[3/4] shadow-sm hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
    >
      <Image
        src={hotel.imageUrl}
        alt={`${hotel.name}, ${hotel.city}`}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

      <div className="absolute top-2.5 right-2.5 bg-white text-gray-900 rounded-md px-2 py-1 shadow-sm">
        <div className="text-[10px] font-medium text-gray-500 leading-none">Earn</div>
        <div className="text-sm font-bold leading-tight">KES {hotel.reviewPayKES}</div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-3">
        <div className="flex items-center gap-1 mb-1">
          <StarRating count={hotel.stars} />
          <span className="text-white/60 text-[10px]">·</span>
          <span className="text-white/70 text-[10px] font-medium">{hotel.city}</span>
        </div>
        <h3 className="text-white text-sm font-bold leading-snug mb-2 line-clamp-2">
          {hotel.name}
        </h3>
        <div className="flex items-center justify-between text-[10px] text-white/70 mb-2.5">
          <span>{hotel.reviewType}</span>
          <span>~{hotel.estMinutes} min</span>
        </div>
        <div className="bg-white text-gray-900 text-xs font-bold text-center py-2 rounded-md group-hover:bg-rose-500 group-hover:text-white transition-colors">
          Review this hotel
        </div>
      </div>
    </a>
  );
}

// ─── Geo content ─────────────────────────────────────────────────────────────

interface LocalizationConfig {
  countryName: string;
  currency: string;
  payoutMethods: string;
  rateRange: string;
  heroSubText: string;
  hotWaterNote: string;
  payoutRailsDetail: string;
  legitimacyNote: string;
  howItWorks: { title: string; body: string }[];
  earningsTiers: { label: string; range: string; note: string }[];
  taskTypes: { icon: string; title: string; body: string }[];
  objections: { q: string; a: string }[];
}

const GEO_CONTENT: Record<"kenya" | "uganda" | "ghana", LocalizationConfig> = {
  kenya: {
    countryName: "Kenya",
    currency: "KES",
    payoutMethods: "M-Pesa",
    rateRange: "KES 250–800",
    heroSubText: "Free to join · Instant M-Pesa payouts · No experience needed",
    hotWaterNote: "Whether you're reviewing a Nairobi boutique hotel or a Diani beach resort.",
    payoutRailsDetail: "M-Pesa alongside standard bank transfers, converting cleanly into KES with minimal transaction friction",
    legitimacyNote:
      "Kenya's booming hospitality sector — from Nairobi business hotels to coastal resorts and Maasai Mara safari lodges — has created real, ongoing demand for verified human property reviews. Global travel platforms need local eyes on the ground, and Kenyan reviewers are well-positioned to fill that gap. All you need is a smartphone and a stable internet connection (Safaricom, Airtel, or Telkom).",
    howItWorks: [
      {
        title: "1. Sign up free",
        body: "Create your account and verify your phone number. No fees, no CV, no interview. Your account is active within minutes.",
      },
      {
        title: "2. Browse hotel tasks",
        body: "See open review tasks listed with exact payouts and requirements — text-only, photo + text, or full video walkthrough. Every listing shows exactly what's expected before you claim it.",
      },
      {
        title: "3. Complete the review",
        body: "Visit the property if the task requires it, or complete from public information for text-only tasks. Submit your review with the required photos or footage.",
      },
      {
        title: "4. Get reviewed and approved",
        body: "A quality check compares your submission against guidelines. Approved reviews trigger payment. Rejected ones include feedback so you can recalibrate.",
      },
      {
        title: "5. Withdraw to M-Pesa",
        body: "Approved reviews hit your balance immediately. Withdraw to M-Pesa anytime — no minimum balance, no waiting period.",
      },
    ],
    earningsTiers: [
      { label: "Casual (2–3 reviews/wk)", range: "KES 3,000 – 6,000", note: "/ month" },
      { label: "Active (8–12 reviews/wk)", range: "KES 9,000 – 18,000", note: "/ month" },
      { label: "Active + regional travel", range: "KES 20,000 – 40,000+", note: "/ month" },
    ],
    taskTypes: [
      {
        icon: "📝",
        title: "Text-only reviews",
        body: "Written review based on public information about the property. Lowest-friction entry point — no visit required. Fast, repeatable, ideal for building review volume.",
      },
      {
        icon: "📸",
        title: "Photo + text reviews",
        body: "Visit the hotel or lodge, take clearly framed photos of key areas (room, bathroom, lobby, grounds), and write an honest summary. Higher payout than text-only.",
      },
      {
        icon: "🎥",
        title: "Video walkthroughs",
        body: "Full walkthrough video — lobby to room to facilities — with spoken commentary. Highest payout per task. Ideal for reviewers already travelling through the region.",
      },
    ],
    objections: [
      {
        q: "How much do paid hotel reviews pay in Kenya?",
        a: "Most hotel review tasks on VelloEarn pay between KES 250 and KES 800 per approved review, depending on the property's rating tier and the review type (text-only, photo + text, or full video walkthrough). Payouts are shown upfront on every listing before you claim a task.",
      },
      {
        q: "Do I need to physically visit the hotel to review it?",
        a: "It depends on the task. Photo and video review tasks require a visit — useful if you're already travelling in that region. Text-only tasks can be based on public information and online listings, which is why they're the lowest-friction entry point for new reviewers.",
      },
      {
        q: "Are hotel review jobs in Kenya legit?",
        a: "Fair question. We publish real payout amounts, never ask for personal financial data, and payments clear directly to M-Pesa once a review is approved. Our task structure matches how legitimate global hospitality and tourism research companies source human property feedback — through verified, submitted reviews, not upfront investment schemes.",
      },
      {
        q: "How quickly does M-Pesa payout after a review is approved?",
        a: "Approved reviews trigger instant withdrawal access in your dashboard. Once you hit withdraw, M-Pesa payments typically land within 5–30 minutes depending on Safaricom's network load. There's no minimum balance and no waiting for a monthly payroll cycle.",
      },
      {
        q: "What does a good hotel review actually look like?",
        a: "Honest, specific, and useful to a future guest. Good reviews mention what worked (cleanliness, staff responsiveness, room noise levels), what didn't, and one or two details that only a real reviewer would catch. Quality reviewers don't write marketing copy — they write what a friend would want to know.",
      },
      {
        q: "Can I review the same hotel more than once?",
        a: "No. Each hotel task is a single-claim assignment — once a review is submitted and approved for a property, that task closes. New hotels (and sometimes re-opened tasks after a property refresh) are added to the queue daily.",
      },
    ],
  },

  uganda: {
    countryName: "Uganda",
    currency: "UGX",
    payoutMethods: "MTN MoMo & Airtel Money",
    rateRange: "UGX 8,000–28,000",
    heroSubText: "Free to join · Instant Mobile Money payouts · No experience needed",
    hotWaterNote: "From Kampala business hotels to Lake Victoria lodges and safari camps in Murchison Falls.",
    payoutRailsDetail: "MTN Mobile Money and Airtel Money alongside standard bank transfers, converting cleanly into UGX",
    legitimacyNote:
      "Uganda's tourism and hospitality sector — from Kampala business hotels to safari lodges near Murchison Falls and Bwindi — is growing fast, and global travel platforms need verified local reviewers on the ground. All you need is a smartphone and a stable internet connection (MTN or Airtel).",
    howItWorks: [
      {
        title: "1. Sign up free",
        body: "Create your account and verify your phone number. No fees, no CV, no interview. Your account is active within minutes.",
      },
      {
        title: "2. Browse hotel tasks",
        body: "See open review tasks with exact payouts and requirements — text-only, photo + text, or video walkthrough.",
      },
      {
        title: "3. Complete the review",
        body: "Visit the property if the task requires it, or complete from public information for text-only tasks.",
      },
      {
        title: "4. Get reviewed and approved",
        body: "A quality check compares your submission against guidelines. Approved reviews trigger payment.",
      },
      {
        title: "5. Withdraw to Mobile Money",
        body: "Approved reviews hit your balance immediately. Withdraw to MTN MoMo or Airtel Money anytime — no minimum.",
      },
    ],
    earningsTiers: [
      { label: "Casual (2–3 reviews/wk)", range: "UGX 100,000 – 200,000", note: "/ month" },
      { label: "Active (8–12 reviews/wk)", range: "UGX 300,000 – 600,000", note: "/ month" },
      { label: "Active + regional travel", range: "UGX 700,000 – 1,400,000+", note: "/ month" },
    ],
    taskTypes: [
      {
        icon: "📝",
        title: "Text-only reviews",
        body: "Written review based on public information about the property. No visit required. Fast, repeatable entry point.",
      },
      {
        icon: "📸",
        title: "Photo + text reviews",
        body: "Visit the property, capture key areas, and write an honest summary. Higher payout than text-only.",
      },
      {
        icon: "🎥",
        title: "Video walkthroughs",
        body: "Full walkthrough with commentary. Highest payout per task.",
      },
    ],
    objections: [
      {
        q: "How much do paid hotel reviews pay in Uganda?",
        a: "Most hotel review tasks pay between UGX 8,000 and UGX 28,000 per approved review, depending on the property tier and review type. Payouts are shown upfront on every listing before you claim.",
      },
      {
        q: "Do I need to visit the hotel in person?",
        a: "Photo and video review tasks require a visit. Text-only tasks can be based on public listings, making them the lowest-friction way to start earning.",
      },
      {
        q: "Are hotel review jobs in Uganda legit?",
        a: "Yes — we publish real payout figures, never request financial data, and payments clear to MTN MoMo or Airtel Money once a review is approved. Our task structure matches how legitimate global research companies source human feedback through verified submitted reviews.",
      },
      {
        q: "How quickly does Mobile Money payout after a review is approved?",
        a: "Approved reviews trigger instant withdrawal. Mobile Money payments typically land within 5–30 minutes. No minimum balance, no monthly payroll delay.",
      },
      {
        q: "What makes a good hotel review?",
        a: "Specific, honest, and useful. Mention what worked, what didn't, and details a real visitor would care about. Quality reviewers write for future guests, not for marketing.",
      },
      {
        q: "Can I review hotels outside my city?",
        a: "Text-only tasks can be completed for any property in Uganda. Photo and video tasks require an actual visit, so they're best suited to reviewers already travelling or living nearby.",
      },
    ],
  },

  ghana: {
    countryName: "Ghana",
    currency: "GHS",
    payoutMethods: "MTN MoMo & Telecel Cash",
    rateRange: "GHS 30–100",
    heroSubText: "Free to join · Instant Mobile Money payouts · No experience needed",
    hotWaterNote: "From Accra boutique hotels to Cape Coast resorts and northern safari camps.",
    payoutRailsDetail: "MTN Mobile Money (MoMo) and Telecel Cash (formerly Vodafone Cash) alongside direct local bank routing, translating cleanly into Ghana Cedis (GHS)",
    legitimacyNote:
      "Ghana's hospitality and tourism sector — from Accra business hotels to Cape Coast heritage resorts and northern safari lodges — is expanding rapidly, and global travel platforms need verified local reviewers on the ground. All you need is a smartphone and a stable MTN, Telecel, or AT connection.",
    howItWorks: [
      {
        title: "1. Sign up free",
        body: "Create your account and verify your phone number. No fees, no CV, no interview. Your account is active within minutes.",
      },
      {
        title: "2. Browse hotel tasks",
        body: "See open review tasks with exact payouts and requirements — text-only, photo + text, or video walkthrough.",
      },
      {
        title: "3. Complete the review",
        body: "Visit the property if the task requires it, or complete from public information for text-only tasks.",
      },
      {
        title: "4. Get reviewed and approved",
        body: "A quality check compares your submission against guidelines. Approved reviews trigger payment.",
      },
      {
        title: "5. Withdraw to Mobile Money",
        body: "Approved reviews hit your balance immediately. Withdraw to MTN MoMo or Telecel Cash anytime — no minimum.",
      },
    ],
    earningsTiers: [
      { label: "Casual (2–3 reviews/wk)", range: "GHS 400 – 800", note: "/ month" },
      { label: "Active (8–12 reviews/wk)", range: "GHS 1,200 – 2,400", note: "/ month" },
      { label: "Active + regional travel", range: "GHS 2,800 – 5,500+", note: "/ month" },
    ],
    taskTypes: [
      {
        icon: "📝",
        title: "Text-only reviews",
        body: "Written review based on public information. No visit required. Fast, repeatable entry point.",
      },
      {
        icon: "📸",
        title: "Photo + text reviews",
        body: "Visit the property, capture key areas, and write an honest summary. Higher payout than text-only.",
      },
      {
        icon: "🎥",
        title: "Video walkthroughs",
        body: "Full walkthrough with commentary. Highest payout per task.",
      },
    ],
    objections: [
      {
        q: "How much do paid hotel reviews pay in Ghana?",
        a: "Most hotel review tasks pay between GHS 30 and GHS 100 per approved review, depending on property tier and review type. Payouts are shown upfront on every listing.",
      },
      {
        q: "Do I need to visit the hotel in person?",
        a: "Photo and video review tasks require a visit. Text-only tasks can be completed from public information, making them the easiest entry point for new reviewers.",
      },
      {
        q: "Are hotel review jobs in Ghana legit?",
        a: "Yes — we publish real payout figures, never request financial data, and payments clear to MTN MoMo or Telecel Cash once approved. Our task structure matches how legitimate global research companies source verified human feedback.",
      },
      {
        q: "How quickly does Mobile Money payout after approval?",
        a: "Approved reviews trigger instant withdrawal. Payments typically clear to MoMo or Telecel Cash within 5–30 minutes. No minimum withdrawal, no monthly cycle.",
      },
      {
        q: "What makes a good hotel review?",
        a: "Honest, specific, and useful. Mention what worked, what didn't, and details a real guest would care about. Reviewers write for future visitors — not for marketing copy.",
      },
      {
        q: "Can I review hotels outside my region?",
        a: "Text-only tasks work for any Ghanaian property. Photo and video reviews require an actual visit, ideal for reviewers already travelling.",
      },
    ],
  },
};

// ─── Main component ──────────────────────────────────────────────────────────

interface HotelReviewsClientProps {
  countryTarget: "kenya" | "uganda" | "ghana";
}

export default function HotelReviewsClient({ countryTarget }: HotelReviewsClientProps) {
  const geo = GEO_CONTENT[countryTarget];

  return (
    <main className="bg-gray-50 min-h-screen">
      {/* ── 1. HERO ─────────────────────────────────────────────────────── */}
      <section className="relative pt-12 pb-16 sm:pt-20 sm:pb-20 overflow-hidden bg-gradient-to-br from-rose-50 via-white to-orange-50">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-rose-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-8 items-start lg:items-center">
            <div>
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-600 mb-6 sm:mb-8 transition"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to VelloEarn
              </Link>

              <div className="inline-flex items-center gap-2 bg-rose-50 border border-rose-100 text-rose-600 text-xs font-bold px-3 py-1.5 rounded-full mb-6 uppercase tracking-wider">
                🏨 Hotel Reviews · Fast Growing
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight tracking-tight mb-5">
                Get paid to review hotels —
                <br />
                <span className="text-rose-500">from your phone.</span>
              </h1>

              <p className="text-base sm:text-lg text-gray-500 leading-relaxed mb-3 max-w-lg">
                Real hotels, lodges, and resorts need honest reviews from real people.
                Pick a task, complete the review, earn {geo.rateRange} per approved
                submission.
              </p>
              <p className="text-sm sm:text-base text-gray-400 mb-8 max-w-lg">
                {geo.heroSubText} · {geo.payoutMethods}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-10">
                <Link
                  href={VELLOEARN_REGISTER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-rose-500 hover:bg-rose-600 text-white font-bold text-base px-8 py-4 rounded-full shadow-lg shadow-rose-200 transition-all hover:scale-105 active:scale-95 text-center"
                >
                  Browse Open Reviews →
                </Link>
                <Link
                  href="/blog/is-hotel-review-work-legit"
                  className="bg-white hover:bg-gray-50 text-gray-600 font-semibold text-base px-8 py-4 rounded-full border border-gray-200 shadow-sm transition-all hover:scale-105 active:scale-95 text-center"
                >
                  Is this legit? Read first →
                </Link>
              </div>

              <div className="flex gap-8">
                {[
                  { v: geo.rateRange, l: "Per review" },
                  { v: "No minimum", l: "Withdrawal" },
                  { v: "Easy", l: "To join" },
                ].map((s) => (
                  <div key={s.l}>
                    <div className="text-lg font-extrabold text-gray-900">{s.v}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right column — a small preview of open tasks */}
            <div className="mt-8 lg:mt-0">
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                    <span className="text-sm font-semibold text-gray-900">Open review tasks</span>
                    <span className="text-xs text-gray-400">· {HOTELS.length} available</span>
                  </div>
                  <span className="text-xs text-rose-500 font-medium">New daily</span>
                </div>

                <div className="space-y-2.5 max-h-[420px] overflow-y-auto pr-2">
                  {HOTELS.slice(0, 5).map((hotel) => (
                    <a
                      key={hotel.id}
                      href={VELLOEARN_REGISTER_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 bg-gray-50 hover:bg-rose-50 border border-gray-100 hover:border-rose-200 rounded-xl p-3 transition-all group"
                    >
                      <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-gray-200">
                        <Image
                          src={hotel.imageUrl}
                          alt={hotel.name}
                          fill
                          className="object-cover"
                          sizes="56px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-gray-900 truncate group-hover:text-rose-600 transition-colors">
                          {hotel.name}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-400 mt-0.5">
                          <StarRating count={hotel.stars} />
                          <span>·</span>
                          <span className="truncate">{hotel.city}</span>
                        </div>
                        <div className="text-[11px] text-gray-400 mt-1">
                          {hotel.reviewType} · ~{hotel.estMinutes} min
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-sm font-bold text-emerald-600">
                          KES {hotel.reviewPayKES}
                        </div>
                        <div className="text-[10px] text-gray-400">per review</div>
                      </div>
                    </a>
                  ))}
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                  <span className="text-gray-400">+{HOTELS.length - 5} more tasks</span>
                  <a
                    href={VELLOEARN_REGISTER_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-rose-500 font-medium hover:text-rose-600 transition-colors"
                  >
                    See all →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. WHAT YOU ACTUALLY DO ─────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-rose-500 font-semibold text-sm uppercase tracking-wider">
              What you actually do
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2 mb-4">
              Three types of review tasks. One entry point.
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto">
              Pick the review format that fits your time and travel. All three pay, just at
              different rates.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-5 mb-10">
            {geo.taskTypes.map((t) => (
              <div
                key={t.title}
                className="bg-gray-50 rounded-2xl p-6 border border-gray-100 transition-transform hover:-translate-y-1"
              >
                <div className="text-2xl mb-3">{t.icon}</div>
                <h3 className="font-bold text-gray-900 text-base mb-2">{t.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{t.body}</p>
              </div>
            ))}
          </div>

          <div className="bg-rose-50 border border-rose-100 rounded-2xl p-6 flex gap-4 items-start">
            <span className="text-2xl shrink-0">📍</span>
            <div>
              <p className="font-bold text-gray-900 mb-1">You don&apos;t need a laptop or office</p>
              <p className="text-sm text-gray-600 leading-relaxed">
                Everything runs on your phone. {geo.hotWaterNote} Whether you do a text-only
                task from home or a photo review during travel, it all works from a mobile
                browser.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. OPEN HOTELS GRID ─────────────────────────────────────────── */}
      <section id="hotels" className="py-16 sm:py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div>
              <p className="text-rose-500 font-semibold text-xs uppercase tracking-wider mb-2">
                Live in {geo.countryName}
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                Hotels waiting to be reviewed
              </h2>
              <p className="text-gray-500 text-sm mt-2 max-w-xl">
                Each property needs a real review from a real reviewer. Pick one, submit your
                findings, get paid to {geo.payoutMethods}.
              </p>
            </div>
            <div className="text-sm text-gray-500 shrink-0">
              <span className="font-semibold text-gray-900">{HOTELS.length}</span> open tasks
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {HOTELS.map((hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400">
            <p>Payouts are per completed review. Tasks refresh daily.</p>
            <a
              href={VELLOEARN_REGISTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-rose-500 hover:text-rose-600 transition-colors"
            >
              See all open tasks →
            </a>
          </div>
        </div>
      </section>

      {/* ── 4. HOW IT WORKS ─────────────────────────────────────────────── */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-rose-500 font-semibold text-sm uppercase tracking-wider">
              From application to payout
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2 mb-4">
              How it actually works, step by step.
            </h2>
          </div>
          <div className="space-y-4">
            {geo.howItWorks.map((step) => (
              <div key={step.title} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <h3 className="font-bold text-gray-900 text-base mb-2">{step.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href={VELLOEARN_REGISTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-rose-500 hover:bg-rose-600 text-white font-bold text-base px-10 py-4 rounded-full shadow-lg shadow-rose-200 transition-all hover:scale-105 active:scale-95"
            >
              Start Reviewing →
            </Link>
          </div>
        </div>
      </section>

      {/* ── 5. DEEP SEO CONTEXT ─────────────────────────────────────────── */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-left">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-6">
            Why Global Travel Platforms Hire Remote Hotel Reviewers in {geo.countryName}
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Travel research and hospitality intelligence companies — the platforms that feed
            data into booking sites, review aggregators, and tourism boards — can&apos;t verify
            thousands of properties on their own. They rely on local reviewers who can visit
            a property, take real photos, describe what they actually saw, and submit a
            structured review that gets scored against quality guidelines.
          </p>
          <p className="text-gray-600 leading-relaxed mb-8">
            VelloEarn is the onramp to those tasks. Instead of applying to a dozen global
            review platforms individually, you browse one queue of open hotel tasks with clear
            payouts and submit through one interface. Approved reviews trigger payment
            directly to your local wallet.
          </p>

          <h3 className="text-xl font-bold text-gray-900 mb-3">
            Does Hotel Review Work in {geo.countryName}?
          </h3>
          <p className="text-gray-600 leading-relaxed mb-8">{geo.legitimacyNote}</p>

          <h3 className="text-xl font-bold text-gray-900 mb-3">
            How Payouts Actually Work
          </h3>
          <p className="text-gray-600 leading-relaxed">
            Every review is scored against a quality checklist before it's approved. Approved
            tasks hit your balance instantly, and withdrawals route through{" "}
            {geo.payoutRailsDetail}. There's no monthly payroll cycle and no minimum
            withdrawal threshold — the money is yours the moment the task clears.
          </p>
        </div>
      </section>

      {/* ── 6. EARNINGS TIERS ───────────────────────────────────────────── */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-3">
            Monthly earnings overview ({geo.currency})
          </h2>
          <p className="text-gray-500 mb-8 max-w-xl mx-auto">
            Based on actual reviewer output. What you make depends on how many reviews you
            claim and complete each week.
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            {geo.earningsTiers.map((tier, i) => (
              <div
                key={i}
                className={`rounded-2xl p-6 border ${
                  i === 2
                    ? "bg-rose-500 border-rose-400 text-white shadow-xl shadow-rose-200"
                    : "bg-gray-50 border-gray-100"
                }`}
              >
                <p
                  className={`text-xs font-semibold uppercase tracking-wider mb-3 ${
                    i === 2 ? "text-rose-200" : "text-gray-400"
                  }`}
                >
                  {tier.label}
                </p>
                <p className="text-2xl font-extrabold mb-1">{tier.range}</p>
                <p className={`text-xs ${i === 2 ? "text-rose-200" : "text-gray-400"}`}>
                  {tier.note}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. FAQ ──────────────────────────────────────────────────────── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-rose-500 font-semibold text-sm uppercase tracking-wider">
              Real talk
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2 mb-3">
              Common questions
            </h2>
          </div>
          <div className="space-y-4">
            {geo.objections.map((o, i) => (
              <ObjAccordion key={i} q={o.q} a={o.a} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href={VELLOEARN_REGISTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-rose-600 font-semibold text-sm hover:text-rose-700 transition inline-flex items-center gap-1"
            >
              Still have questions? Ask us directly →
            </Link>
          </div>
        </div>
      </section>

      {/* ── 8. CROSS-FUNNEL BRIDGE ──────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-6 text-center">
            Also earning on VelloEarn
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              {
                icon: "🤖",
                title: "AI Training Tasks",
                desc: "Rate AI responses, label data, test chatbots. No tech background needed.",
                href: "/earn/ai-training",
                tag: "Fast growing",
              },
              {
                icon: "💬",
                title: "Remote Chat Work",
                desc: "Customer support and moderation tasks for global brands.",
                href: "/earn/chatting",
                tag: "Popular",
              },
              {
                icon: "📋",
                title: "Surveys",
                desc: "Share opinions on products and brands. Quick tasks, quick pay.",
                href: "/earn/surveys",
                tag: "Quick start",
              },
            ].map((m) => (
              <Link
                key={m.href}
                href={m.href}
                className="group bg-gray-50 hover:bg-rose-50 border border-gray-100 hover:border-rose-200 rounded-2xl p-5 transition-all duration-200"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">{m.icon}</span>
                  <span className="text-xs bg-white text-gray-500 font-medium px-2 py-0.5 rounded-full border border-gray-200">
                    {m.tag}
                  </span>
                </div>
                <h3 className="font-bold text-gray-900 text-sm mb-1 group-hover:text-rose-600 transition-colors">
                  {m.title}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">{m.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. FINAL CTA ────────────────────────────────────────────────── */}
      <section className="relative py-20 text-center overflow-hidden bg-rose-600">
        <div className="relative z-10 max-w-xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-white mb-6">
            Start your first review this week.
          </h2>
          <p className="text-rose-100 text-sm mb-6">
            Free to join · Instant {geo.payoutMethods} payouts · No experience needed
          </p>
          <Link
            href={VELLOEARN_REGISTER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-rose-600 font-bold px-10 py-4 rounded-full shadow-xl hover:scale-105 active:scale-95 transition-all duration-150"
          >
            Start Reviewing →
          </Link>
          <p className="text-rose-200 text-xs mt-4">
            Real hotels · Real payouts · Real reviewers
          </p>
        </div>
      </section>
    </main>
  );
}