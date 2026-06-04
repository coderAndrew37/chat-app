"use client";

import { ApplicationModal, SuccessState } from "@/app/components";
import Requirements from "@/app/components/Requirements";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// --- Components ---

function SmartImage({ src, fallback, alt, fill, width, height, className, sizes, priority }: {
  src: string; fallback: string; alt: string; fill?: boolean; width?: number; height?: number;
  className?: string; sizes?: string; priority?: boolean;
}) {
  const [imgSrc, setImgSrc] = useState(src);
  const props = { src: imgSrc, alt, className, onError: () => setImgSrc(fallback), sizes, priority };
  return fill ? <Image {...props} fill unoptimized alt="" /> : <Image {...props} width={width ?? 400} height={height ?? 300} unoptimized alt="" />;
}

function ObjAccordion({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-5 py-4 text-left transition-colors hover:bg-gray-50">
        <span className="font-semibold text-gray-900 text-sm sm:text-base pr-4">{q}</span>
        <span className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 ${open ? "bg-rose-500 text-white rotate-45" : "bg-gray-100 text-gray-500"}`}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
        </span>
      </button>
      {open && <div className="px-5 pb-5 animate-in fade-in slide-in-from-top-1 duration-200"><p className="text-gray-500 text-sm leading-relaxed">{a}</p></div>}
    </div>
  );
}

interface ChattingClientProps {
  countryTarget: "kenya" | "uganda" | "ghana";
}

export default function ChattingClient({ countryTarget }: ChattingClientProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [successData, setSuccessData] = useState<{ name: string; whatsapp: string } | null>(null);

  const openModal = () => setModalOpen(true);

  // --- Dynamic Content Mapping ---
  const geoContent = {
    kenya: {
      wallet: "M-Pesa",
      minWithdrawal: "KES 500",
      locationContext: "a matatu stage, or a café in Westlands",
      earnings: [
        { label: "Part-time (2–3 hrs/day)", range: "KES 6,000 – 12,000", note: "/ month" },
        { label: "Full shifts (5–6 hrs/day)", range: "KES 18,000 – 28,000", note: "/ month" },
        { label: "Full shifts + team income", range: "KES 35,000 – 60,000+", note: "/ month" },
      ],
      stories: [
        {
          name: "Zawadi T.",
          location: "Nairobi, Embakasi",
          earned: "KES 22,500 / month",
          story: "I work the evening shift — 6pm to 11pm — while my husband watches the kids. By the time I sleep, M-Pesa has moved. It took me three days to figure out the platform. Now it's just routine.",
          initials: "ZT",
          img: "/testimonials/zawadi.jpg",
          fallback: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&h=200&fit=crop&crop=face&auto=format",
        },
        {
          name: "Kelvin O.",
          location: "Kisumu",
          earned: "KES 41,000 / month",
          story: "I started solo. After two months I brought in three friends. Now their shifts contribute to my team income on top of mine. That's where the real number comes from.",
          initials: "KO",
          img: "/testimonials/kelvin.jpg",
          fallback: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=200&h=200&fit=crop&crop=face&auto=format",
        }
      ],
      objections: [
        {
          q: "Is this just another scam?",
          a: "We get why you'd ask — the internet is full of fake 'earn online' schemes. What's different here: we don't ask you for money upfront to start earning. The application is free. Activation details come after you're accepted. You earn from real tasks, tracked in a real dashboard, paid to your real M-Pesa number."
        },
        {
          q: "When exactly does M-Pesa come?",
          a: "You request a withdrawal from your dashboard. The minimum withdrawal is KES 500. Once requested, most payments clear within 5–30 minutes depending on M-Pesa traffic. You'll see it in your Mpesa messages, not just the app."
        },
        {
          q: "Can I really earn KES 35K+ per month?",
          a: "Yes — but not just from chatting. The bigger earners combine their shift income with team commissions. When you bring someone onto the platform and they become active, you earn a percentage of their output. That's where the ceiling goes away."
        }
      ]
    },
    uganda: {
      wallet: "MTN MoMo / Airtel Money",
      minWithdrawal: "UGX 15,000",
      locationContext: "a taxi park, or a café in Kampala",
      earnings: [
        { label: "Part-time (2–3 hrs/day)", range: "UGX 180,000 – 360,000", note: "/ month" },
        { label: "Full shifts (5–6 hrs/day)", range: "UGX 540,000 – 840,000", note: "/ month" },
        { label: "Full shifts + team income", range: "UGX 1,000,000 – 1,800,000+", note: "/ month" },
      ],
      stories: [
        {
          name: "Florence N.",
          location: "Kampala, Ntinda",
          earned: "UGX 680,000 / month",
          story: "I manage the evening shifts from my phone after university lectures. The mobile money payouts clear securely to my MTN line before midnight. It completely transformed my pocket money.",
          initials: "FN",
          img: "/testimonials/florence.jpg",
          fallback: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&h=200&fit=crop&crop=face&auto=format",
        },
        {
          name: "Derrick B.",
          location: "Gulu",
          earned: "UGX 1,200,000 / month",
          story: "Building a small network of remote task friends here amplified my balance significantly. VelloEarn pays commissions reliably when your referred group finishes assignments.",
          initials: "DB",
          img: "/testimonials/derrick.jpg",
          fallback: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face&auto=format",
        }
      ],
      objections: [
        {
          q: "Is this just another scam?",
          a: "We get why you'd ask. What makes us different is that we do not charge registration or activation fees to start earning money. You get verified via WhatsApp and cash out real accumulated balances directly to your Mobile Money wallet numbers safely."
        },
        {
          q: "When exactly does Mobile Money arrive?",
          a: "Whenever you initiate a withdrawal, the system processes your request to MTN MoMo or Airtel lines. It scales within 5–30 minutes, popping directly into your core mobile carrier message boxes."
        },
        {
          q: "Can I really clear over 1 Million UGX monthly?",
          a: "Yes, but top earners scale up by inviting active team members. You receive recurring reward cuts from your squad's chat metrics alongside your normal personal shift logs."
        }
      ]
    },
    ghana: {
      wallet: "MTN MoMo / Telecel / Vodafone",
      minWithdrawal: "GHS 50",
      locationContext: "a trotro station, or a spot in Osu",
      earnings: [
        { label: "Part-time (2–3 hrs/day)", range: "GHS 700 – 1,400", note: "/ month" },
        { label: "Full shifts (5–6 hrs/day)", range: "GHS 2,100 – 3,200", note: "/ month" },
        { label: "Full shifts + team income", range: "GHS 4,000 – 7,000+", note: "/ month" },
      ],
      stories: [
        {
          name: "Abena A.",
          location: "Accra, Madina",
          earned: "GHS 2,450 / month",
          story: "The shift structure fits perfectly with my side business routines. I monitor text queues from my smartphone and trigger daily payouts directly to my Telecel Cash account.",
          initials: "AA",
          img: "/testimonials/abena.jpg",
          fallback: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face&auto=format",
        },
        {
          name: "Emmanuel K.",
          location: "Kumasi",
          earned: "GHS 4,800 / month",
          story: "I onboarded four course mates into the system. As they complete moderation loops during active hours, my affiliate bonuses stack right into my wallet. It is incredibly structured.",
          initials: "EK",
          img: "/testimonials/emmanuel.jpg",
          fallback: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face&auto=format",
        }
      ],
      objections: [
        {
          q: "Is this just another scam?",
          a: "No upfront payments are requested. Joining our remote task network is completely transparent and free. You earn based on genuine message metrics and withdraw directly via standard dynamic Ghanaian wallet frameworks."
        },
        {
          q: "When exactly does my wallet update?",
          a: "Withdrawals are instantly sent through local payment channels to your registered MTN Mobile Money, Telecel, or Vodafone nodes, processing in less than 30 minutes securely."
        },
        {
          q: "Can I really secure GHS 4,000+ every month?",
          a: "Yes. By executing shifts consistently and expanding your task networks, your base volume combined with secondary referral shares easily scales past that figure."
        }
      ]
    }
  };

  const currentGeo = geoContent[countryTarget];

  const baseObjections = [
    {
      q: "Do I need experience in customer service?",
      a: "No. Every channel you're assigned to comes with a briefing document, approved response templates, and a support channel where you can ask questions. If you can hold a decent conversation on WhatsApp, you can do this.",
    },
    {
      q: "What if I miss a shift or can't show up?",
      a: "Life happens. You're not fired for missing one shift. You simply don't earn for that time. There's no salary at risk — just the opportunity cost of not working. Consistent earners show up consistently. That's the only rule.",
    },
  ];

  const fullObjections = [
    currentGeo.objections[0],
    baseObjections[0],
    baseObjections[1],
    currentGeo.objections[1],
    currentGeo.objections[2]
  ];

  const HOW_IT_WORKS_LOCALIZED = [
    {
      step: "01",
      title: "You apply & get approved",
      body: "Fill in a short form. Our team reviews it, and if you're a fit, you get a WhatsApp message with your activation steps. Takes less than 24 hours.",
    },
    {
      step: "02",
      title: "You pick your shift",
      body: "Log into the dashboard and claim a shift — morning, afternoon, or evening. You decide how many hours you work. No minimums. No pressure.",
    },
    {
      step: "03",
      title: "You handle conversations",
      body: "You're assigned to a channel — could be customer support, community moderation, or engagement tasks. Scripts, templates, and training are provided.",
    },
    {
      step: "04",
      title: "Your earnings stack up",
      body: `Every shift completed adds to your balance. You can request a ${currentGeo.wallet} withdrawal anytime. Most land in minutes.`,
    },
  ];

  return (
    <main className="bg-gray-50 min-h-screen">

      {/* ── Hero ── */}
      <section className="relative pt-24 pb-20 overflow-hidden bg-gradient-to-br from-rose-50 via-white to-orange-50">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-rose-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-600 mb-8 transition">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                Back to VelloEarn
              </Link>
              <div className="inline-flex items-center gap-2 bg-rose-50 border border-rose-100 text-rose-600 text-xs font-bold px-3 py-1.5 rounded-full mb-6 uppercase tracking-wider">
                💬 Remote Chatting
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight tracking-tight mb-5">
                Get paid to chat.<br />
                <span className="text-rose-500">From your phone.</span>
              </h1>
              <p className="text-lg text-gray-500 leading-relaxed mb-8 max-w-lg">
                Real businesses need real humans to handle their conversations — customer queries, community moderation, engagement tasks. That&apos;s you. You pick your hours, we supply the work.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setModalOpen(true)}
                  className="bg-rose-500 hover:bg-rose-600 text-white font-bold text-base px-8 py-4 rounded-full shadow-lg shadow-rose-200 transition-all hover:scale-105 active:scale-95"
                >
                  Apply for This Track →
                </button>
              </div>
              <div className="mt-10 flex gap-8">
                {[
                  { v: "2–6 hrs", l: "Flexible daily hours" },
                  { v: currentGeo.minWithdrawal, l: "Min withdrawal" },
                  { v: "Daily", l: "Tasks available" },
                ].map(s => (
                  <div key={s.l}>
                    <div className="text-lg font-extrabold text-gray-900">{s.v}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
            {/* Hero image */}
            <div className="relative hidden lg:block h-[420px] rounded-3xl overflow-hidden shadow-2xl">
              <SmartImage
                src="/earn/chatting-hero.jpg"
                fallback="https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=800&h=840&fit=crop&auto=format"
                alt="Person chatting on phone"
                fill priority className="object-cover" sizes="45vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-3">
                <p className="text-xs text-gray-400 mb-1">Most popular track</p>
                <p className="text-sm font-bold text-gray-900">Over 60% of our team earns through chatting</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── What is remote chatting ── */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-rose-500 font-semibold text-sm uppercase tracking-wider">What it actually is</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2 mb-4">Not what you think. Better.</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-5 mb-12">
            {[
              { icon: "🎧", title: "Customer support chat", body: "Answering questions for brands via their web or app chat. Think: 'Where's my order?' 'How do I reset my account?' You get approved answers. You type them." },
              { icon: "🛡️", title: "Community moderation", body: "Keeping forums, groups, and comment sections on-brand and clean. You follow a moderation guide. Fast, repetitive, well-paid." },
              { icon: "💬", title: "Engagement tasks", body: "Responding to comments, generating activity, and supporting social presence. Structured tasks, not random posting." },
            ].map(c => (
              <div key={c.title} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <div className="text-2xl mb-3">{c.icon}</div>
                <h3 className="font-bold text-gray-900 text-base mb-2">{c.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{c.body}</p>
              </div>
            ))}
          </div>
          <div className="bg-rose-50 border border-rose-100 rounded-2xl p-6 flex gap-4 items-start">
            <span className="text-2xl shrink-0">📱</span>
            <div>
              <p className="font-bold text-gray-900 mb-1">Everything runs on your phone</p>
              <p className="text-sm text-gray-600 leading-relaxed">{`No laptop needed. No office. No commute. You log in, claim a shift, complete tasks, log out. You can do this from your house, ${currentGeo.locationContext}. The platform is fully mobile.`}</p>
            </div>
          </div>
        </div>
      </section>

      <Requirements onApply={openModal} />

      {/* ── How it works ── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="text-rose-500 font-semibold text-sm uppercase tracking-wider">How it works</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2">Four steps. That&apos;s it.</h2>
          </div>
          <div className="space-y-5">
            {HOW_IT_WORKS_LOCALIZED.map((step, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex gap-5 items-start">
                <div className="shrink-0 w-12 h-12 rounded-2xl bg-rose-500 text-white font-extrabold text-sm flex items-center justify-center">
                  {step.step}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-base mb-1">{step.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Earning potential ── */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-rose-500 font-semibold text-sm uppercase tracking-wider">Earning potential</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2 mb-3">Real numbers. No fluff.</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Based on actual team earnings. What you make depends on how many shifts you claim and whether you build a team.</p>
          </div>

          {/* Earnings tiers */}
          <div className="grid sm:grid-cols-3 gap-4 mb-14">
            {currentGeo.earnings.map((tier, i) => (
              <div key={i} className={`rounded-2xl p-6 border text-center ${i === 2 ? "bg-rose-500 border-rose-400 text-white" : "bg-gray-50 border-gray-100"}`}>
                <p className={`text-xs font-semibold uppercase tracking-wider mb-3 ${i === 2 ? "text-rose-200" : "text-gray-400"}`}>{tier.label}</p>
                <p className={`text-2xl font-extrabold mb-1 ${i === 2 ? "text-white" : "text-gray-900"}`}>{tier.range}</p>
                <p className={`text-xs ${i === 2 ? "text-rose-200" : "text-gray-400"}`}>{tier.note}</p>
                {i === 2 && <p className="text-xs text-rose-100 mt-2">Includes team commission income</p>}
              </div>
            ))}
          </div>

          <Requirements onApply={openModal} />

          {/* Earner stories */}
          <h3 className="text-xl font-extrabold text-gray-900 mb-5">From people already doing it</h3>
          <div className="grid sm:grid-cols-2 gap-5">
            {currentGeo.stories.map(s => (
              <div key={s.name} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative w-11 h-11 rounded-full overflow-hidden bg-rose-100 shrink-0">
                    <SmartImage src={s.img} fallback={s.fallback} alt={s.name} fill className="object-cover" sizes="44px" />
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
      <section className="py-20 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-rose-500 font-semibold text-sm uppercase tracking-wider">Real talk</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2 mb-3">The questions you&apos;re already thinking</h2>
          </div>
          <div className="space-y-4">
            {fullObjections.map((o, i) => (
              <ObjAccordion key={i} q={o.q} a={o.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0">
          <SmartImage
            src="/cta/background.jpg"
            fallback="https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1600&h=600&fit=crop&auto=format"
            alt="background" fill className="object-cover" sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-rose-600/90 to-pink-600/90" />
        </div>
        <div className="relative z-10 max-w-xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">Ready to start chatting for money?</h2>
          <p className="text-rose-100 mb-8 leading-relaxed">{`Apply now. Get approved via WhatsApp. Your first shift could be today.`}</p>
          <button
            onClick={() => setModalOpen(true)}
            className="inline-block bg-white text-rose-500 font-bold text-base px-10 py-4 rounded-full shadow-xl hover:scale-105 active:scale-95 transition-all"
          >
            Apply for Remote Chatting →
          </button>
        </div>
      </section>

      {modalOpen && (
        <ApplicationModal 
          onClose={() => setModalOpen(false)} 
          track="Remote Chatting" 
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