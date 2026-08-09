import { CategoryCard } from "@/app/components/CategoryCard";
import { FaqAccordion } from "@/app/components/FaqAccordion";
import LiveForeignersLearning from "@/app/components/LiveForeignersLearning";
import LiveForeignersOnline from "@/app/components/LiveForeignersOnline";
import { LiveTaskCounter } from "@/app/components/LiveTaskCounter";
import { TrustBadges } from "@/app/components/TrustBadges";
import { VELLOEARN_REGISTER_URL } from "@/lib/constants";
import { generateHreflangMetadata } from "@/lib/seo/hreflang";
import {
    Award,
    BookOpen,
    CheckCircle2,
    Languages,
    MapPin,
    MessageCircle,
    MessageSquare,
    Smartphone,
    TrendingUp,
    Wallet,
    Zap
} from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

// --- Metadata ---
export const metadata: Metadata = generateHreflangMetadata({
  country: "Tanzania",
  countryCode: "TZ",
  path: "/earn/country/tanzania",
  title: "Online Jobs in Tanzania Paying via M-Pesa & Tigo Pesa (Kazi za Mtandaoni)",
  description:
    "Pata kazi za mtandaoni Tanzania na kulipwa kupitia M-Pesa, Tigo Pesa, na Airtel Money. Earn daily teaching Swahili, chatting, surveys, and AI tasks. No fees.",
  keywords:
    "online jobs in tanzania, kazi za mtandaoni tanzania, m-pesa jobs tanzania, tigo pesa jobs, teach swahili online, chat operator jobs tanzania, earn money tanzania, paid surveys tanzania",
});

// --- Page Component ---
export default function TanzaniaHubPage() {
  const currentYear = new Date().getFullYear();

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      {/* Hero Section (Clean slate/dark neutral styles without green) */}
      <section className="border-b border-slate-200 bg-white px-4 py-12 sm:py-20 lg:py-24 dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-4 py-1.5 text-sm font-medium text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
              <Zap className="h-4 w-4 text-slate-600 dark:text-slate-400" />
              <span>Updated for {currentYear} · Hakuna Ada | 100% Free</span>
            </div>

            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-white">
              <span className="block">Kazi za Mtandaoni</span>
              <span className="block text-slate-700 dark:text-slate-300">
                Tanzania
              </span>
            </h1>

            <p className="mx-auto mt-4 max-w-3xl text-lg text-slate-600 dark:text-slate-300">
              <span className="font-semibold text-slate-900 dark:text-white">
                Pata TZS 10,000 – 60,000 kwa siku
              </span>{" "}
              | Earn daily teaching Swahili, chatting, completing AI tasks, and filling micro-surveys. Direct mobile payouts to{" "}
              <strong className="text-slate-900 dark:text-white">Vodacom M-Pesa</strong>,{" "}
              <strong className="text-slate-900 dark:text-white">Tigo Pesa</strong>, or{" "}
              <strong className="text-slate-900 dark:text-white">Airtel Money</strong>.
            </p>

            <p className="mx-auto mt-2 text-sm text-slate-500 dark:text-slate-400">
              No registration fees · Hakuna mtaji wala uzoefu unaohitajika
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href={VELLOEARN_REGISTER_URL}
                className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-7 py-3.5 font-semibold text-white shadow-lg transition-all hover:bg-slate-800 active:scale-95 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
              >
                <Smartphone className="h-5 w-5" />
                Anza Kupata | Start Earning
              </Link>
              <Link
                href="#categories"
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-7 py-3.5 font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
              >
                <TrendingUp className="h-5 w-5 text-slate-500" />
                Tazama Kazi | Browse Jobs
              </Link>
            </div>

            {/* Live counter */}
            <div className="mt-8 flex justify-center">
              <LiveTaskCounter />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Banner with Tanzania Payment Systems */}
      <section className="border-b border-slate-200 bg-slate-100/60 py-6 dark:border-slate-800 dark:bg-slate-900/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <TrustBadges
            paymentMethods={[
              { name: "Vodacom M-Pesa", badge: "M-Pesa" },
              { name: "Tigo Pesa", badge: "Tigo Pesa" },
              { name: "Airtel Money (TZ)", badge: "Airtel Money" },
              { name: "Halopesa", badge: "HaloPesa" },
            ]}
            extraText="Malipo ya papo kwa papo bila makatato | Instant zero-fee mobile payouts"
          />
        </div>
      </section>

      {/* Major Cities Hub Navigation */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-slate-900 dark:text-white">
          <MapPin className="h-5 w-5 text-slate-600 dark:text-slate-400" />
          <h2 className="text-xl font-bold">Miji Inayoshiriki | Popular Regions in Tanzania</h2>
        </div>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Work remotely from anywhere with a smartphone and internet bundle.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          {[
            { name: "Dar es Salaam", jobs: "1,240+ Active Tasks" },
            { name: "Arusha", jobs: "820+ Active Tasks" },
            { name: "Mwanza", jobs: "650+ Active Tasks" },
            { name: "Dodoma", jobs: "540+ Active Tasks" },
            { name: "Zanzibar", jobs: "490+ Active Tasks" },
            { name: "Mbeya", jobs: "380+ Active Tasks" },
            { name: "Morogoro", jobs: "290+ Active Tasks" },
            { name: "Tanga", jobs: "210+ Active Tasks" },
          ].map((city) => (
            <Link
              key={city.name}
              href={`/earn/country/tanzania?city=${city.name.toLowerCase().replace(/\s/g, "-")}`}
              className="group flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-400 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-slate-600 dark:hover:text-white"
            >
              <span>{city.name}</span>
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                {city.jobs}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* In-Depth Feature 1: Swahili Teaching Opportunity */}
      <section className="border-y border-slate-200 bg-white py-12 sm:py-16 dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 rounded-md bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-800 dark:bg-slate-800 dark:text-slate-200">
                <Languages className="h-4 w-4" />
                <span>Kazi ya Fundi wa Kiswahili</span>
              </div>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
                Fundisha Kiswahili kwa Wageni Mtandaoni (Teach Swahili to Foreigners)
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-300">
                As a native Swahili speaker from Tanzania, your natural fluency is in high demand worldwide. Thousands of international travelers, researchers, students, and tourists are eager to learn authentic Swahili conversation.
              </p>

              <div className="mt-6 space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-slate-700 dark:text-slate-300" />
                  <div>
                    <strong className="text-slate-900 dark:text-white">High Hourly Pay:</strong> Earn TZS 15,000 to TZS 45,000 per session conducting informal conversations.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-slate-700 dark:text-slate-300" />
                  <div>
                    <strong className="text-slate-900 dark:text-white">No Teaching Degree Required:</strong> Learners want natural conversational practice, pronunciation correction, and cultural context.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-slate-700 dark:text-slate-300" />
                  <div>
                    <strong className="text-slate-900 dark:text-white">Flexible Schedules:</strong> Accept student booking requests whenever you are free directly on your mobile device.
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Link
                  href={VELLOEARN_REGISTER_URL}
                  className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
                >
                  <BookOpen className="h-5 w-5" />
                  Anza Kufundisha Kiswahili
                </Link>
              </div>
            </div>

            {/* Embedded Live Swahili Learners Component */}
            <div className="lg:col-span-6">
              <LiveForeignersLearning />
            </div>
          </div>
        </div>
      </section>

      {/* In-Depth Feature 2: Paid Chat & Text Moderation */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
            {/* Embedded Live Chat Component */}
            <div className="order-2 lg:order-1 lg:col-span-6">
              <LiveForeignersOnline />
            </div>

            <div className="order-1 lg:order-2 lg:col-span-6">
              <div className="inline-flex items-center gap-2 rounded-md bg-slate-200 px-3 py-1 text-xs font-semibold text-slate-800 dark:bg-slate-800 dark:text-slate-200">
                <MessageSquare className="h-4 w-4" />
                <span>Kazi za Ku-Chat Mtandaoni</span>
              </div>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
                Paid Text Chat & Customer Messaging Operator
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-300">
                Connect with global clients and international platforms as a dedicated chat operator. Assist clients with general inquiries, offer friendship, practice language exchange, or moderate active platform communities.
              </p>

              <div className="mt-6 space-y-4">
                <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <h3 className="font-bold text-slate-900 dark:text-white">Lipwa kwa Kila Ujumbe (Paid Per Message)</h3>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                    Earn guaranteed rates for every processed reply. Complete 100 to 300 messages per day to unlock tier bonuses paid straight to M-Pesa.
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <h3 className="font-bold text-slate-900 dark:text-white">Ulinzi na Usiri (100% Anonymous & Secure)</h3>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                    Your personal contact numbers and physical identity are never revealed to clients. Operate comfortably through our secure web portal.
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <Link
                  href={VELLOEARN_REGISTER_URL}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                >
                  <MessageCircle className="h-5 w-5" />
                  Jiunge na Kazi za Chat
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Primary Category Grid */}
      <section id="categories" className="border-t border-slate-200 bg-white py-12 sm:py-16 dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
              Aina Zote za Kazi za Mtandaoni Tanzania
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-slate-600 dark:text-slate-400">
              Chagua aina ya kazi inayokufaa kulingana na muda wako na kifaa ulichonacho.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <CategoryCard
              icon={<Languages className="h-8 w-8 text-slate-800 dark:text-slate-200" />}
              title="Teach Swahili Online"
              description="Fundisha Swahili kwa wageni. Earn TZS 15,000 - 45,000 per student hour with flexible booking times."
              href="/earn/job/swahili-teaching/tanzania"
              badge="High Earnings"
            />
            <CategoryCard
              icon={<MessageSquare className="h-8 w-8 text-slate-800 dark:text-slate-200" />}
              title="Chat & Messaging Jobs"
              description="Jibu ujumbe wa wateja wa kimataifa. Earn per reply sent directly through your phone."
              href="/earn/job/chat-moderation/tanzania"
              badge="Hot & Instant"
            />
            <CategoryCard
              icon={<Award className="h-8 w-8 text-slate-800 dark:text-slate-200" />}
              title="AI & Swahili Data Annotation"
              description="Sikiliza na uandike sauti za Kiswahili (Audio Transcription) au lebo picha kusaidia AI."
              href="/earn/job/ai-training/tanzania"
              badge="Tech Opportunity"
            />
            <CategoryCard
              icon={<Wallet className="h-8 w-8 text-slate-800 dark:text-slate-200" />}
              title="Micro-Surveys & App Testing"
              description="Jibu tafiti fupi na upewe maoni kuhusu App mpya. Earn TZS 2,000 – 10,000 per completed survey."
              href="/earn/job/surveys/tanzania"
              badge="Quick Cash"
            />
          </div>
        </div>
      </section>

      {/* Step-by-Step Guide for Tanzanian Earners */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Jinsi ya Kuanza na Kupata Pesa (Step-by-Step Guide)
            </h2>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              Hatua tatu rahisi za kuanza kupokea pesa kwenye simu yako leo.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 font-bold text-white dark:bg-slate-100 dark:text-slate-900">
                1
              </div>
              <h3 className="mt-4 text-xl font-bold text-slate-900 dark:text-white">Fungua Akaunti Libre</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                Register with your valid Tanzanian phone number. Registration is 100% free with zero deposit required.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 font-bold text-white dark:bg-slate-100 dark:text-slate-900">
                2
              </div>
              <h3 className="mt-4 text-xl font-bold text-slate-900 dark:text-white">Chagua na Ufanye Kazi</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                Select tasks from Swahili teaching, text chatting, survey completion, or data entry matching your spare time.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 font-bold text-white dark:bg-slate-100 dark:text-slate-900">
                3
              </div>
              <h3 className="mt-4 text-xl font-bold text-slate-900 dark:text-white">Pata Pesa kwa M-Pesa / Tigo Pesa</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                Request instant payouts starting from TZS 5,000 directly to Vodacom M-Pesa, Tigo Pesa, or Airtel Money.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Comprehensive FAQs Section */}
      <section className="border-t border-slate-200 bg-white py-12 sm:py-16 dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Maswali Yanayoulizwa Mara kwa Mara (FAQs)
            </h2>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              Everything you need to know about earning online in Tanzania.
            </p>
          </div>

          <div className="mt-8">
            <FaqAccordion
              items={[
                {
                  question: "Je, nitatumiwaje pesa zangu zikishafika kwenye akaunti ya VelloEarn?",
                  answer:
                    "Pesa zako zikifikisha kiasi cha kutoa (Kuanzia TZS 5,000), unabonyeza 'Withdraw'. Unachagua mtandao wako wa simu (Vodacom M-Pesa, Tigo Pesa, Airtel Money, au Halopesa) na pesa inaingia moja kwa moja kwenye simu yako ndani ya dakika 5 hadi 15.",
                },
                {
                  question: "Je, ninahitaji kulipia ada yoyote ili kuanza kufanya kazi?",
                  answer:
                    "Hapana! Usajili ni bure 100%. Hatutombi ada yoyote ya usajili, mtaji, au kiingilio. Kazi zote ziko wazi bure kabisa.",
                },
                {
                  question: "Je, nawezaje kufundisha Kiswahili ikiwa sina cheti cha ualimu?",
                  answer:
                    "Wanafunzi wengi wageni hawatafuti sarufi ngumu ya darasani; wanataka mazoezi ya kuzungumza (Conversational Swahili). Kama unazungumza Kiswahili fasaha na una subira ya kukosoa matamshi yao, unavigezo vyote vinavyohitajika.",
                },
                {
                  question: "Je, naweza kutumia simu ya mkononi (Smartphone) tu?",
                  answer:
                    "Ndiyo! Kazi zote zikiwemo za Chat, Tafiti, na Kufundisha Kiswahili zimeboreshwa kufanya kazi vizuri sana kwenye simu yoyote ya smartphone yenye intaneti.",
                },
                {
                  question: "Kiwango cha chini cha kutoa pesa (Minimum Withdrawal) ni kiasi gani?",
                  answer:
                    "Kiwango cha chini kabisa cha kutoa pesa ni TZS 5,000 tu. Pesa inapotumwa kwenye simu yako hakuna makatato ya ziada kutoka kwetu.",
                },
              ]}
            />
          </div>
        </div>
      </section>

      {/* Bottom Conversion CTA Banner */}
      <section className="bg-slate-900 px-4 py-12 text-center text-white dark:bg-slate-950">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-extrabold sm:text-4xl">
            Aanza Kupata Kipato cha Mtandaoni Leo
          </h2>
          <p className="mt-3 text-slate-300">
            Join thousands of Tanzanians earning daily from Dar es Salaam, Arusha, Mwanza, Dodoma, and Zanzibar.
          </p>
          <div className="mt-6 flex justify-center">
            <Link
              href={VELLOEARN_REGISTER_URL
                
              }
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-base font-bold text-slate-900 shadow-lg transition hover:bg-slate-100"
            >
              <Smartphone className="h-5 w-5" />
              Sajili Akaunti Bure Now
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}