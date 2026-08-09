import JsonLd from "@/app/components/JsonLd";
import { PayoutEstimator } from "@/app/components/PayoutEstimator";
import { StepsToEarn } from "@/app/components/StepsToEarn";
import { TaskTable } from "@/app/components/TaskTable";
import { TrustBadges } from "@/app/components/TrustBadges";
import { VELLOEARN_REGISTER_URL } from "@/lib/constants";
import { generateHreflangMetadata } from "@/lib/seo/hreflang";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  HelpCircle,
  Smartphone,
  Wallet,
  Zap,
} from "lucide-react";
import { Metadata } from "next";

// --- Metadata ---
export const metadata: Metadata = generateHreflangMetadata({
  country: "Tanzania",
  countryCode: "TZ",
  path: "/earn/job/surveys/tanzania",
  title: "Online Surveys in Tanzania – Pata Pesa kwa M-Pesa & Tigo Pesa | VelloEarn",
  description:
    "Fanya tafiti za mtandaoni Tanzania na upate malipo ya haraka kupitia M-Pesa, Tigo Pesa, au Airtel Money. Earn TZS 2,000‑15,000 per survey. No experience needed. Jisajili bure sasa!",
  keywords:
    "online surveys tanzania, paid surveys tanzania, kazi za mtandaoni tanzania, m-pesa surveys tanzania, tigo pesa tasks, earn money tanzania online",
});

// --- JSON-LD Schema ---
const surveyJobSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.velloearn.co.ke/" },
        {
          "@type": "ListItem",
          position: 2,
          name: "Earn",
          item: "https://www.velloearn.co.ke/earn",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Surveys in Tanzania",
          item: "https://www.velloearn.co.ke/earn/job/surveys/tanzania",
        },
      ],
    },
    {
      "@type": "JobPosting",
      "title": "Online Survey Participant & Data Annotator – Tanzania",
      "description":
        "Complete paid online surveys, product tagging, and audio transcriptions in Swahili and English. Get paid instantly via Vodacom M-Pesa, Tigo Pesa, or Airtel Money. Flexible remote work from smartphone or PC.",
      "hiringOrganization": {
        "@type": "Organization",
        "name": "VelloEarn",
        "sameAs": "https://www.velloearn.co.ke",
      },
      "jobLocation": {
        "@type": "Place",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "TZ",
        },
      },
      "applicantLocationRequirements": {
        "@type": "Country",
        "name": "Tanzania",
      },
      "baseSalary": {
        "@type": "MonetaryAmount",
        "currency": "TZS",
        "value": { "@type": "QuantitativeValue", "value": 5000, "unitText": "HOUR" },
      },
      "employmentType": "PART_TIME",
      "datePosted": "2026-08-01",
      "validThrough": "2026-12-31",
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Ninapokeaje malipo yangu Tanzania?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Malipo yanatumwa moja kwa moja kwenye akaunti yako ya Vodacom M-Pesa, Tigo Pesa, au Airtel Money mara tu unapokamilisha utafiti au task.",
          },
        },
        {
          "@type": "Question",
          "name": "Je, kuna ada yoyote ya kujiunga?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Hapana. Kujiunga na VelloEarn ni 100% bure kabisa. Hutakiwi kulipia ada yoyote kuanza kufanya kazi.",
          },
        },
        {
          "@type": "Question",
          "name": "Je, naweza kutumia simu ya mkononi?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Ndiyo, tafiti na kazi zote zinaweza kukamilishwa kwa kutumia simu ya mkononi (Android/iOS) au kompyuta.",
          },
        },
      ],
    },
  ],
};

const faqs = [
  {
    q: "Ninapokeaje malipo yangu Tanzania?",
    a: "Malipo yanatumwa moja kwa moja kwenye akaunti yako ya Vodacom M-Pesa, Tigo Pesa, au Airtel Money mara tu utakapokamilisha utafiti na kuomba kutoa pesa. Hakuna ada za siri.",
  },
  {
    q: "Je, kuna ada yoyote ya kujiunga au kuanza kazi?",
    a: "Hapana. Usajili ni 100% bure. VelloEarn haitakuomba ulipe pesa yoyote ili kupata kazi au kutoa pesa zako.",
  },
  {
    q: "Naweza kupata TZS ngapi kwa siku?",
    a: "Kiasi unachoweza kupata kinategemea idadi ya tafiti na kazi unazokamilisha. Mtumiaji wa wastani anapata kati ya TZS 5,000 hadi TZS 25,000 kwa siku kwa kutumia masaa 1–2.",
  },
  {
    q: "Kiwango cha chini cha kutoa pesa (Minimum Withdrawal) ni kiasi gani?",
    a: "Hakuna kiwango kikuu cha chini cha kuzuia salio lako. Unaweza kutoa salio lako pindi unapofikisha kiasi cha TZS 1,000 pekee.",
  },
];

export default function TanzaniaSurveysPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <JsonLd data={surveyJobSchema} />

      {/* --- Hero Section --- */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-white px-4 py-16 sm:py-24 lg:py-28 dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-4 py-1.5 text-sm font-semibold text-rose-700 dark:border-rose-900/60 dark:bg-rose-950/50 dark:text-rose-300">
            <Zap className="h-4 w-4 text-rose-600 dark:text-rose-400" />
            <span>Fursa za Mtandaoni Tanzania · Verified Remote Tasks</span>
          </div>

          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-white">
            Pata Pesa kwa Kufanya <br className="hidden sm:inline" />
            <span className="text-rose-600 dark:text-rose-400">Tafiti za Mtandaoni</span> Tanzania
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-xl dark:text-slate-300">
            Kamilisha tafiti fupi na kazi ndogo ndogo kwenye simu yako. Pata{" "}
            <strong className="font-semibold text-slate-900 dark:text-white">
              TZS 2,000 – 15,000
            </strong>{" "}
            kwa kila utafiti na ulipwe papo hapo kupitia M-Pesa, Tigo Pesa, au Airtel Money.
          </p>

          {/* Primary CTA Group */}
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={VELLOEARN_REGISTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-rose-600 px-8 py-4 text-base font-bold text-white shadow-lg shadow-rose-600/25 transition-all hover:bg-rose-700 hover:shadow-rose-600/35 active:scale-[0.98] sm:w-auto dark:bg-rose-600 dark:hover:bg-rose-500"
            >
              <span>Anza Kufanya Kazi Sasa</span>
              <ArrowRight className="h-5 w-5" />
            </a>
            <a
              href="#available-tasks"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-7 py-4 text-base font-semibold text-slate-700 transition-colors hover:bg-slate-100 sm:w-auto dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
            >
              <span>Tazama Tafiti Zilizopo</span>
            </a>
          </div>

          {/* Trust Highlights */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-sm font-medium text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-rose-600 dark:text-rose-400" />
              <span>Usajili ni Libre (100% Free)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-rose-600 dark:text-rose-400" />
              <span>Malipo ya Papo kwa Papo</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-rose-600 dark:text-rose-400" />
              <span>Inatumia Simu Yoyote</span>
            </div>
          </div>
        </div>
      </section>

      {/* --- Trust Badges Bar --- */}
      <div className="border-b border-slate-200 bg-slate-100/70 py-6 dark:border-slate-800 dark:bg-slate-900/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <TrustBadges
            paymentMethods={[
              { name: "Vodacom M-Pesa", badge: "M-Pesa" },
              { name: "Tigo Pesa", badge: "Tigo Pesa" },
              { name: "Airtel Money", badge: "Airtel Money" },
              { name: "PayPal", badge: "PayPal" },
            ]}
            extraText="Malipo ya papo hapo kwa mtandao wako wa simu nchini Tanzania"
          />
        </div>
      </div>

      {/* --- Core Features / Why Join Section --- */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Kwanini Utumie VelloEarn Tanzania?
          </h2>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            Njia rahisi na ya kuaminika ya kujipatia kipato cha ziada kupitia mtandao.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-100 text-rose-600 dark:bg-rose-950 dark:text-rose-400">
              <Wallet className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-xl font-semibold text-slate-900 dark:text-white">
              Njia Za Local Payment
            </h3>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              Lipwa moja kwa moja kupitia M-Pesa, Tigo Pesa au Airtel Money bila vikwazo vya benki au mataifa ya nje.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-100 text-rose-600 dark:bg-rose-950 dark:text-rose-400">
              <Clock className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-xl font-semibold text-slate-900 dark:text-white">
              Muda Wako Mwenyewe
            </h3>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              Fanya kazi muda wowote unaotaka—nyumbani, safarini, au wakati wa mapumziko. Hakuna mkataba unaokubana.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-100 text-rose-600 dark:bg-rose-950 dark:text-rose-400">
              <Smartphone className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-xl font-semibold text-slate-900 dark:text-white">
              Simu Yoyote Inatosha
            </h3>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              Hauhitaji kompyuta ya gharama kubwa. Smartphone yako yoyote yenye mtandao wa internet inatosha kuanza.
            </p>
          </div>
        </div>
      </section>

      {/* --- Task Table Section --- */}
      <section id="available-tasks" className="scroll-mt-12 border-t border-slate-200 bg-white py-16 dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="flex flex-col justify-between sm:flex-row sm:items-end">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                Tafiti na Kazi Zilizopo Sasa
              </h2>
              <p className="mt-2 text-slate-600 dark:text-slate-400">
                Orodha inasasishwa kila siku. Chagua kazi kisha jisajili kuipokea.
              </p>
            </div>
            <div className="mt-4 sm:mt-0">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                <span className="h-2 w-2 rounded-full bg-rose-500 animate-pulse"></span>
                Live Feed · Tanzania
              </span>
            </div>
          </div>

          <div className="mt-8">
            <TaskTable
              tasks={[
                {
                  id: "tz-survey-1",
                  title: "Consumer Product Feedback (Kiswahili)",
                  description: "Toa maoni yako kuhusu bidhaa za nyumbani na matumizi ya kila siku.",
                  reward: 3500,
                  currency: "TZS",
                  estimatedTime: "5-7 min",
                  payoutMethods: ["M-Pesa", "Tigo Pesa"],
                  availableSlots: 62,
                },
                {
                  id: "tz-survey-2",
                  title: "Mobile Banking & Payments Survey",
                  description: "Eleza uzoefu wako wa kutumia huduma za fedha kwa simu Tanzania.",
                  reward: 8500,
                  currency: "TZS",
                  estimatedTime: "10-12 min",
                  payoutMethods: ["M-Pesa", "Airtel Money"],
                  availableSlots: 28,
                },
                {
                  id: "tz-survey-3",
                  title: "Swahili Audio Audio Transcription",
                  description: "Sikiliza vipande vifupi vya sauti na kuandika maneno kwenye mfumo.",
                  reward: 12000,
                  currency: "TZS",
                  estimatedTime: "15 min",
                  payoutMethods: ["Tigo Pesa", "M-Pesa"],
                  availableSlots: 19,
                },
                {
                  id: "tz-survey-4",
                  title: "Local E-commerce Usability Test",
                  description: "Jaribu tovuti mpya ya biashara kisha ujaze fomu fupi ya tathmini.",
                  reward: 15000,
                  currency: "TZS",
                  estimatedTime: "20 min",
                  payoutMethods: ["M-Pesa", "Airtel Money", "PayPal"],
                  availableSlots: 14,
                },
              ]}
            />
          </div>

          {/* Inline Conversion Strip */}
          <div className="mt-8 rounded-2xl border border-rose-100 bg-rose-50/80 p-6 text-center sm:flex sm:items-center sm:justify-between sm:text-left dark:border-rose-900/40 dark:bg-rose-950/40">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Unataka kupata kazi zaidi za kulipwa?
              </h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                Fungua akaunti mpya ya VelloEarn kupata taarifa za tafiti mpya kila zikitoka.
              </p>
            </div>
            <a
              href={VELLOEARN_REGISTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl bg-rose-600 px-6 py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-rose-700 sm:mt-0 dark:bg-rose-600 dark:hover:bg-rose-500"
            >
              <span>Jisajili Bure</span>
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* --- Payout Estimator --- */}
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <PayoutEstimator
          currency="TZS"
          exchangeRate={1}
          mobileMoneyProviders={["Vodacom M-Pesa", "Tigo Pesa", "Airtel Money"]}
        />
      </section>

      {/* --- Steps To Earn --- */}
      <section className="border-t border-slate-200 bg-white py-16 dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <StepsToEarn
            steps={[
              {
                icon: "1️⃣",
                title: "1. Jisajili Bure | Register Free",
                description: "Tengeneza akaunti yako ya VelloEarn kwa sekunde 30 tu kwa kutumia namba yako ya simu au barua pepe.",
              },
              {
                icon: "2️⃣",
                title: "2. Chagua Utafiti | Pick a Survey",
                description: "Chagua kazi au utafiti unaokufaa kutoka kwenye orodha yetu ya kila siku.",
              },
              {
                icon: "3️⃣",
                title: "3. Kamilisha Kazi | Complete Task",
                description: "Jibu maswali kwa uaminifu au kamilisha maelekezo ya kazi uliyochagua.",
              },
              {
                icon: "4️⃣",
                title: "4. Pokea Malipo | Get Paid",
                description: "Pesa zako zitaingizwa papo hapo kwenye M-Pesa, Tigo Pesa au Airtel Money yako.",
              },
            ]}
          />
        </div>
      </section>

      {/* --- FAQ Section --- */}
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-3.5 py-1 text-xs font-semibold text-slate-700 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-300">
            <HelpCircle className="h-3.5 w-3.5" />
            <span>Maswali Yanayoulizwa Mara kwa Mara</span>
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Maswali na Majibu (FAQ)
          </h2>
        </div>

        <div className="mt-10 space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {faq.q}
              </h3>
              <p className="mt-2 text-base text-slate-600 dark:text-slate-300">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* --- Bottom Conversion Banner CTA --- */}
      <section className="border-t border-slate-200 bg-slate-100 py-16 dark:border-slate-800 dark:bg-slate-900/80">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <div className="rounded-3xl border border-rose-200 bg-gradient-to-br from-rose-50 to-pink-50 p-8 sm:p-12 dark:border-rose-900/60 dark:from-rose-950/60 dark:to-slate-900">
            <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl dark:text-white">
              Upo Tayari Kuanza Kupata Kipato Tanzania?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-slate-600 dark:text-slate-300">
              Jiunge na maelfu ya Watanzania wanaojipatia pesa kwa kufanya tafiti kwenye simu zao. Hakuna ada ya kujiunga.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href={VELLOEARN_REGISTER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-rose-600 px-8 py-4 text-base font-bold text-white shadow-lg shadow-rose-600/25 transition-all hover:bg-rose-700 hover:shadow-rose-600/35 active:scale-[0.98] sm:w-auto dark:bg-rose-600 dark:hover:bg-rose-500"
              >
                <span>Tengeneza Akaunti Bure Sasa</span>
                <ArrowRight className="h-5 w-5" />
              </a>
            </div>
            <p className="mt-4 text-xs font-medium text-slate-500 dark:text-slate-400">
              ⚡ Usajili unachukua chini ya dakika 1 tu.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}