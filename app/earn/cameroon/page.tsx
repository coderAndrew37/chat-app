import { CategoryCard } from "@/app/components/CategoryCard";
import { FaqAccordion } from "@/app/components/FaqAccordion";
import { LiveTaskCounter } from "@/app/components/LiveTaskCounter";
import { TrustBadges } from "@/app/components/TrustBadges";
import { VELLOEARN_REGISTER_URL } from "@/lib/constants";
import { generateHreflangMetadata } from "@/lib/seo/hreflang";
import {
  ArrowRight,
  Award,
  CheckCircle2,
  Clock,
  DollarSign,
  Globe,
  HelpCircle,
  Laptop,
  Layers,
  MapPin,
  MessageSquare,
  ShieldCheck,
  Smartphone,
  Star,
  TrendingUp,
  Users,
  Wallet,
  Zap,
} from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

// --- Types ---
interface EarningRateItem {
  category: string;
  categoryFr: string;
  avgTime: string;
  rateFCFA: string;
  difficulty: "Easy" | "Medium" | "Advanced";
  popularIn: string;
}

interface Testimonial {
  name: string;
  location: string;
  role: string;
  commentEn: string;
  commentFr: string;
  payoutMethod: "MTN MoMo" | "Orange Money";
  weeklyEarned: string;
  rating: number;
}

// --- Metadata ---
export const metadata: Metadata = generateHreflangMetadata({
  country: "Cameroon",
  countryCode: "CM",
  path: "/earn/country/cameroon",
  title: "Online Jobs in Cameroon: Earn 2,000–15,000 FCFA/Day (MTN MoMo & Orange Money)",
  description:
    "Complete guide to legit online jobs in Cameroon. Earn daily income via micro-tasks, AI annotation, transcription, and surveys with instant payout to MTN Mobile Money & Orange Money. Free registration. | Emplois en ligne au Cameroun payés par MTN MoMo & Orange Money.",
  keywords:
    "online jobs in cameroon, emplois en ligne cameroun, travail a domicile cameroun, MTN MoMo online earning, orange money jobs cameroon, paid surveys douala, remote jobs yaounde, gagnez de l'argent en ligne cameroun, micro tasks fcfa",
});

// --- Data Structures ---
const EARNING_RATES: EarningRateItem[] = [
  {
    category: "AI Data Labeling & Image Tagging",
    categoryFr: "Annotation de données IA & étiquetage",
    avgTime: "15 - 30 mins",
    rateFCFA: "1,500 - 4,500 FCFA",
    difficulty: "Easy",
    popularIn: "Douala & Yaoundé",
  },
  {
    category: "Audio & Speech Transcription (EN/FR)",
    categoryFr: "Transcription audio & vocale (EN/FR)",
    avgTime: "20 - 45 mins",
    rateFCFA: "2,000 - 6,000 FCFA",
    difficulty: "Medium",
    popularIn: "Buea & Bamenda",
  },
  {
    category: "Market Research & Surveys",
    categoryFr: "Sondages de marché & d'opinion",
    avgTime: "5 - 15 mins",
    rateFCFA: "500 - 2,000 FCFA",
    difficulty: "Easy",
    popularIn: "Nationwide / Tout le Cameroun",
  },
  {
    category: "App & Website Usability Testing",
    categoryFr: "Test d'applications et de sites web",
    avgTime: "15 - 20 mins",
    rateFCFA: "1,200 - 3,500 FCFA",
    difficulty: "Medium",
    popularIn: "Yaoundé & Bafoussam",
  },
  {
    category: "Social Media & Moderation",
    categoryFr: "Modération & gestion des réseaux",
    avgTime: "30 - 60 mins",
    rateFCFA: "2,500 - 8,000 FCFA",
    difficulty: "Advanced",
    popularIn: "Douala & Garoua",
  },
];

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Christelle Nguemani",
    location: "Douala (Akwa)",
    role: "University Student / Étudiante",
    commentEn:
      "I make between 25,000 and 40,000 FCFA every week doing AI dataset validation between my university lectures. Withdrawals directly to Orange Money take less than 3 minutes.",
    commentFr:
      "Je gagne entre 25 000 et 40 000 FCFA chaque semaine en validant des données IA entre mes cours. Les retraits directs sur Orange Money prennent moins de 3 minutes.",
    payoutMethod: "Orange Money",
    weeklyEarned: "38,500 FCFA",
    rating: 5,
  },
  {
    name: "Ebenezer Tanyi",
    location: "Buea (Silicon Mountain)",
    role: "Freelance Content Annotator",
    commentEn:
      "Finding legit online work in Cameroon that actually pays out locally was tough until VelloEarn. MTN MoMo integration is seamless and has zero transfer friction.",
    commentFr:
      "Trouver un travail en ligne légitime au Cameroun qui paie localement était difficile jusqu'à VelloEarn. L'intégration MTN MoMo est fluide et sans tracas.",
    payoutMethod: "MTN MoMo",
    weeklyEarned: "52,000 FCFA",
    rating: 5,
  },
  {
    name: "Marc-Aurele Manga",
    location: "Yaoundé (Biyem-Assi)",
    role: "Remote Task Operator",
    commentEn:
      "The bilingual task availability is a huge plus. Working on both French and English transcription tasks allows me to maximize my earnings daily.",
    commentFr:
      "La disponibilité des tâches bilingues est un grand plus. Travailler sur des tâches de transcription en français et en anglais me permet de maximiser mes gains quotidiens.",
    payoutMethod: "MTN MoMo",
    weeklyEarned: "44,000 FCFA",
    rating: 5,
  },
];

export default function CameroonHubPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      {/* --- HERO SECTION --- */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-white px-4 py-16 sm:py-24 lg:py-28 dark:border-slate-800 dark:bg-slate-900">
        {/* Glow backdrop decorator */}
        <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-rose-500/10 blur-3xl dark:bg-rose-600/10" />

        <div className="mx-auto max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-4 py-1.5 text-xs font-semibold text-rose-700 sm:text-sm dark:border-rose-900/60 dark:bg-rose-950/50 dark:text-rose-300">
            <Zap className="h-4 w-4 text-rose-600 dark:text-rose-400" />
            <span>Cameroon Digital Economy Hub · 2026 Edition</span>
          </div>

          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-white">
            Online Jobs in Cameroon <br />
            <span className="text-rose-600 dark:text-rose-400">
              Emplois & Tâches en Ligne au Cameroun
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-slate-600 sm:text-xl dark:text-slate-300">
            Earn <strong className="font-semibold text-slate-900 dark:text-white">2,000 to 15,000 FCFA daily</strong> completing simple digital tasks, surveys, and AI training models. Receive instant direct payouts straight to your{" "}
            <span className="font-semibold text-rose-600 dark:text-rose-400">MTN Mobile Money</span> or{" "}
            <span className="font-semibold text-rose-600 dark:text-rose-400">Orange Money</span> account.
          </p>

          <p className="mx-auto mt-2 text-sm font-medium text-slate-500 dark:text-slate-400">
            100% Free Access · Aucune Expérience Requise · Bilingue (Français & English)
          </p>

          {/* Primary Action Buttons */}
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={VELLOEARN_REGISTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-rose-600 px-8 py-4 text-base font-bold text-white shadow-lg shadow-rose-600/25 transition-all hover:bg-rose-700 hover:shadow-rose-600/35 active:scale-[0.98] sm:w-auto dark:bg-rose-600 dark:hover:bg-rose-500"
            >
              <Smartphone className="h-5 w-5" />
              <span>Create an Account · Inscription Gratuite</span>
            </a>
            <a
              href="#rates-matrix"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-7 py-4 text-base font-semibold text-slate-700 transition-colors hover:bg-slate-100 sm:w-auto dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
            >
              <DollarSign className="h-5 w-5 text-rose-600 dark:text-rose-400" />
              <span>View Pay Rates (FCFA)</span>
            </a>
          </div>

          {/* Live Task Counter */}
          <div className="mt-8 flex justify-center">
            <LiveTaskCounter />
          </div>

          {/* Key Metric Highlights */}
          <div className="mt-10 grid grid-cols-2 gap-4 border-t border-slate-200/80 pt-8 sm:grid-cols-4 dark:border-slate-800">
            <div className="p-2">
              <p className="text-2xl font-extrabold text-slate-900 sm:text-3xl dark:text-white">1,000 FCFA</p>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Min. Withdrawal Threshold</p>
            </div>
            <div className="p-2">
              <p className="text-2xl font-extrabold text-rose-600 sm:text-3xl dark:text-rose-400">&lt; 5 Mins</p>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Payout Processing Time</p>
            </div>
            <div className="p-2">
              <p className="text-2xl font-extrabold text-slate-900 sm:text-3xl dark:text-white">18,500+</p>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Active Workers in Cameroon</p>
            </div>
            <div className="p-2">
              <p className="text-2xl font-extrabold text-rose-600 sm:text-3xl dark:text-rose-400">0 FCFA</p>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Registration & Usage Fee</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- LOCAL MOBILE MONEY TRUST BADGES --- */}
      <section className="border-b border-slate-200 bg-slate-100/70 py-6 dark:border-slate-800 dark:bg-slate-900/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <TrustBadges
            paymentMethods={[
              { name: "MTN MoMo", badge: "MTN Mobile Money Cameroon (*126#)" },
              { name: "Orange Money", badge: "Orange Money Cameroun (*150#)" },
              { name: "Express Union", badge: "Express Union Mobile Money" },
              { name: "Bank Transfer", badge: "UBA / Afriland / BICEC" },
            ]}
            extraText="Paiements directs en FCFA sans frais de conversion de devise (Zero Forex Fees)"
          />
        </div>
      </section>

      {/* --- HOW IT WORKS (COMMENT ÇA MARCHE) --- */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            How to Earn Money Online in Cameroon
          </h2>
          <p className="mt-3 text-lg text-slate-600 dark:text-slate-400">
            Comment commencer à gagner de l&apos;argent en 3 étapes simples.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Step 1 */}
          <div className="relative rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-rose-100 text-rose-600 dark:bg-rose-950/80 dark:text-rose-400">
              <Users className="h-6 w-6" />
            </div>
            <span className="absolute top-6 right-6 text-4xl font-black text-slate-200 dark:text-slate-800">01</span>
            <h3 className="mt-6 text-xl font-bold text-slate-900 dark:text-white">
              1. Register an Account
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              Sign up in under 60 seconds with your Cameroonian phone number (+237) or email. No deposit or setup fee is required.
            </p>
            <p className="mt-3 text-xs italic text-slate-500 dark:text-slate-400">
              Inscription 100% gratuite sans aucun dépôt obligatoire.
            </p>
          </div>

          {/* Step 2 */}
          <div className="relative rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-rose-100 text-rose-600 dark:bg-rose-950/80 dark:text-rose-400">
              <Layers className="h-6 w-6" />
            </div>
            <span className="absolute top-6 right-6 text-4xl font-black text-slate-200 dark:text-slate-800">02</span>
            <h3 className="mt-6 text-xl font-bold text-slate-900 dark:text-white">
              2. Complete Simple Tasks
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              Choose from daily micro-surveys, data categorization, image labeling, or audio transcription available in French or English.
            </p>
            <p className="mt-3 text-xs italic text-slate-500 dark:text-slate-400">
              Réalisez des sondages et tâches d&apos;annotation sur votre smartphone.
            </p>
          </div>

          {/* Step 3 */}
          <div className="relative rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-rose-100 text-rose-600 dark:bg-rose-950/80 dark:text-rose-400">
              <Wallet className="h-6 w-6" />
            </div>
            <span className="absolute top-6 right-6 text-4xl font-black text-slate-200 dark:text-slate-800">03</span>
            <h3 className="mt-6 text-xl font-bold text-slate-900 dark:text-white">
              3. Withdraw to Mobile Money
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              Request payout as soon as you hit 1,000 FCFA. Funds land directly in your MTN MoMo or Orange Money wallet within minutes.
            </p>
            <p className="mt-3 text-xs italic text-slate-500 dark:text-slate-400">
              Retrait instantané vers votre compte MTN MoMo ou Orange Money.
            </p>
          </div>
        </div>
      </section>

      {/* --- EARNING RATES MATRIX (TABLE) --- */}
      <section id="rates-matrix" className="scroll-mt-12 border-t border-slate-200 bg-white py-16 dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wide uppercase text-rose-600 dark:text-rose-400">
                <TrendingUp className="h-4 w-4" />
                <span>Transparent Pay Scale / Grille des Gains</span>
              </div>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                Cameroon Task Earnings Matrix (XAF)
              </h2>
            </div>
            <p className="max-w-md text-sm text-slate-600 dark:text-slate-400">
              Rates are calculated based on active Cameroonian user averages. Payouts are in FCFA with zero conversion losses.
            </p>
          </div>

          <div className="mt-8 overflow-x-auto rounded-2xl border border-slate-200 shadow-sm dark:border-slate-800">
            <table className="w-full text-left text-sm text-slate-600 dark:text-slate-300">
              <thead className="bg-slate-100 text-xs uppercase text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                <tr>
                  <th scope="col" className="px-6 py-4 font-bold">Task Category / Catégorie</th>
                  <th scope="col" className="px-6 py-4 font-bold">Avg. Duration</th>
                  <th scope="col" className="px-6 py-4 font-bold">Pay Range (FCFA)</th>
                  <th scope="col" className="px-6 py-4 font-bold">Level</th>
                  <th scope="col" className="px-6 py-4 font-bold">Top Location Hubs</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {EARNING_RATES.map((item, idx) => (
                  <tr
                    key={idx}
                    className="bg-white transition hover:bg-slate-50/80 dark:bg-slate-900 dark:hover:bg-slate-800/50"
                  >
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white">
                      <div>{item.category}</div>
                      <div className="text-xs font-normal text-slate-500 dark:text-slate-400">{item.categoryFr}</div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-4 w-4 text-slate-400" />
                        <span>{item.avgTime}</span>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 font-bold text-rose-600 dark:text-rose-400">
                      {item.rateFCFA}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                          item.difficulty === "Easy"
                            ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300"
                            : item.difficulty === "Medium"
                            ? "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300"
                            : "bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300"
                        }`}
                      >
                        {item.difficulty}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-xs font-medium text-slate-500 dark:text-slate-400">
                      {item.popularIn}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* --- TASK VERTICALS GRID --- */}
      <section id="categories" className="scroll-mt-12 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Available Online Job Categories
          </h2>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            Select a specialization to explore open tasks available across Cameroon today.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <CategoryCard
            icon={<Award className="h-8 w-8 text-rose-600 dark:text-rose-400" />}
            title="AI Data Training & Annotation"
            description="Label images, transcribe short audio snippets, and evaluate localized AI voice models in French & English."
            href="/earn/job/ai-training/cameroon"
            badge="High Demand · Bilingue"
          />
          <CategoryCard
            icon={<Wallet className="h-8 w-8 text-rose-600 dark:text-rose-400" />}
            title="Paid Online Surveys (Sondages)"
            description="Share your opinion on consumer products in Douala, Yaoundé, and nationwide. Instant mobile payout upon completion."
            href="/earn/job/surveys/cameroon"
            badge="Quick Cash"
          />
          <CategoryCard
            icon={<MessageSquare className="h-8 w-8 text-rose-600 dark:text-rose-400" />}
            title="Chat & Content Moderation"
            description="Moderate online community discussions, evaluate user comments, and filter spam. Flexible 24/7 night/day shifts."
            href="/earn/job/chat-moderation/cameroon"
            badge="24/7 Flexible"
          />
          <CategoryCard
            icon={<ShieldCheck className="h-8 w-8 text-rose-600 dark:text-rose-400" />}
            title="Student Jobs (Sans Capital)"
            description="Ideal for university students in Buea, Yaoundé I & II, Dschang, and Douala. Work directly from your smartphone."
            href="/earn/job/students/cameroon"
            badge="No Computer Needed"
          />
        </div>
      </section>

      {/* --- CITIES HUB SECTION --- */}
      <section className="border-t border-slate-200 bg-slate-100/60 py-16 dark:border-slate-800 dark:bg-slate-900/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <MapPin className="h-6 w-6 text-rose-600 dark:text-rose-400" />
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Remote Work Opportunities by Major City / Par Ville
            </h2>
          </div>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            VelloEarn connects workers across all 10 regions of Cameroon with high 4G mobile internet coverage.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                city: "Douala",
                region: "Littoral",
                desc: "Economic capital hub with heavy demand for market research, corporate feedback, and logistics data entry.",
                badge: "Highest Task Volume",
              },
              {
                city: "Yaoundé",
                region: "Centre",
                desc: "Political capital & university core. High volume of bilingual French/English translation and document review.",
                badge: "Bilingual Priority",
              },
              {
                city: "Buea & Limbe",
                region: "South West",
                desc: "Silicon Mountain tech ecosystem. Strong focus on AI dataset validation and software usability testing.",
                badge: "Tech Hub",
              },
              {
                city: "Bamenda",
                region: "North West",
                desc: "Active remote work cluster focusing on micro-surveys, transcription, and educational data tasks.",
                badge: "Active Remote Hub",
              },
              {
                city: "Bafoussam & Dschang",
                region: "West",
                desc: "Large student community performing mobile-first survey completion and app rating micro-tasks.",
                badge: "Student Preferred",
              },
              {
                city: "Garoua & Maroua",
                region: "North & Far North",
                desc: "Growing mobile task adoption with instant MTN MoMo and Orange Money payout availability.",
                badge: "Mobile First",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">{item.city}</h3>
                  <span className="rounded-full bg-rose-50 px-2.5 py-1 text-xs font-medium text-rose-700 dark:bg-rose-950/60 dark:text-rose-300">
                    {item.badge}
                  </span>
                </div>
                <p className="mt-1 text-xs font-semibold text-rose-600 dark:text-rose-400">{item.region} Region</p>
                <p className="mt-3 text-xs leading-relaxed text-slate-600 dark:text-slate-300">{item.desc}</p>
                <div className="mt-4 border-t border-slate-100 pt-3 dark:border-slate-800">
                  <Link
                    href={`/earn/country/cameroon?city=${item.city.toLowerCase()}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-rose-600 hover:underline dark:text-rose-400"
                  >
                    <span>View tasks in {item.city}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS SECTION --- */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="inline-flex items-center gap-1 text-xs font-bold tracking-wide uppercase text-rose-600 dark:text-rose-400">
            <Star className="h-4 w-4 fill-rose-600 dark:fill-rose-400" />
            <span>Cameroonian User Stories / Témoignages</span>
          </div>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Trusted by Thousands Across Cameroon
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Verified Payout
                  </span>
                  <span className="text-xs font-bold text-rose-600 dark:text-rose-400">{item.payoutMethod}</span>
                </div>

                <div className="mt-4 flex items-center gap-1 text-amber-400">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="mt-4 text-sm italic text-slate-700 dark:text-slate-300">
                  &ldquo;{item.commentEn}&rdquo;
                </p>
                <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                  &ldquo;{item.commentFr}&rdquo;
                </p>
              </div>

              <div className="mt-6 border-t border-slate-100 pt-4 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">{item.name}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {item.role} · {item.location}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-medium text-slate-400">Weekly</p>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">{item.weeklyEarned}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- IN-DEPTH EDITORIAL ARTICLE (SEO RICH) --- */}
      <section className="border-t border-slate-200 bg-white py-16 dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-rose-50 px-3 py-1 text-xs font-bold text-rose-700 dark:bg-rose-950/60 dark:text-rose-300">
            <Globe className="h-3.5 w-3.5" />
            <span>Guide Complêt · Remote Work Guide</span>
          </div>

          <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
            The Growth of Remote Micro-Work in Cameroon
          </h2>

          <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-600 dark:text-slate-300">
            <p>
              With the rapid expansion of high-speed 4G mobile broadband across Douala, Yaoundé, Buea, and secondary regional urban centers, Cameroon has emerged as a premier hub for micro-tasking and remote AI data entry in Central Africa.
            </p>
            <p>
              Traditionally, Cameroonian freelancers faced significant barriers when attempting to cash out earnings from global crowdsourcing platforms due to international banking restrictions, lack of PayPal support, or prohibitive international wire transfer fees.
            </p>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white pt-2">
              Bypassing Banking Barriers via Local Mobile Money
            </h3>
            <p>
              VelloEarn eliminates financial friction by bridging international micro-work providers directly with local telecommunication payment rails:
            </p>
            <ul className="list-disc space-y-2 pl-6 text-sm">
              <li>
                <strong className="text-slate-900 dark:text-white">MTN Mobile Money (MoMo):</strong> Direct push payouts straight to your MTN phone number (*126#). Receive instant notifications and withdraw cash at any MoMo kiosk nationwide.
              </li>
              <li>
                <strong className="text-slate-900 dark:text-white">Orange Money CM:</strong> Seamless integration with Orange Money accounts (*150#). Zero withdrawal delays or currency conversion markups.
              </li>
              <li>
                <strong className="text-slate-900 dark:text-white">Bilingual Task Workflows:</strong> Leverage Cameroon&apos;s unique bilingual heritage. Work on tasks available in French, English, or localized dialect speech annotation.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* --- BILINGUAL FAQ ACCORDION --- */}
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="inline-flex items-center gap-1 text-xs font-bold tracking-wide uppercase text-rose-600 dark:text-rose-400">
            <HelpCircle className="h-4 w-4" />
            <span>Questions Fréquentes</span>
          </div>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="mt-10">
          <FaqAccordion
            items={[
              {
                question: "How do I withdraw earnings directly to my MTN MoMo or Orange Money account in Cameroon?",
                answer:
                  "Once you complete a task, your earnings in FCFA are credited immediately to your VelloEarn balance. Navigate to 'Withdraw', select either MTN Mobile Money (*126#) or Orange Money (*150#), enter your registered Cameroonian phone number (+237), and confirm. Payouts arrive in under 5 minutes. / Une fois la tâche terminée, vos gains en FCFA sont crédités. Sélectionnez MTN MoMo ou Orange Money, entrez votre numéro +237 et validez. Le paiement arrive en moins de 5 minutes.",
              },
              {
                question: "Are there any upfront activation fees or mandatory training costs?",
                answer:
                  "Velloearn charges a one-time registration fee. We will never ask you for on-going fees, or paid training modules. If anyone asks you for money after joining VelloEarn in Cameroon, it is a scam. / Non. L'accès à VelloEarn est 100% gratuit. Aucun frais d'activation ou de formation ne vous sera jamais demandé.",
              },
              {
                question: "What is the minimum payout threshold in FCFA (XAF)?",
                answer:
                  "The minimum withdrawal amount is 1,000 FCFA. There are no maximum payout limits, and you can withdraw multiple times per day. / Le seuil minimum de retrait est de 1 000 FCFA. Il n'y a pas de limite maximale de retrait.",
              },
              {
                question: "Can I perform tasks using just my smartphone, or do I need a laptop?",
                answer:
                  "Over 80% of tasks on VelloEarn (including online surveys, image labeling, app testing, and chat moderation) can be performed entirely on an Android phone or iPhone connected to 3G/4G or Wi-Fi. / Plus de 80% des tâches peuvent être effectuées directement sur un smartphone Android ou iPhone.",
              },
              {
                question: "In what language are the tasks provided?",
                answer:
                  "Because Cameroon is bilingual, tasks are available in both French and English. You can set your language preference in your profile settings at any time. / En raison du bilinguisme du Cameroun, les tâches sont disponibles en français et en anglais.",
              },
            ]}
          />
        </div>
      </section>

      {/* --- BOTTOM CALL TO ACTION --- */}
      <section className="border-t border-slate-200 bg-slate-100 py-16 dark:border-slate-800 dark:bg-slate-900/80">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <div className="rounded-3xl border border-rose-200 bg-gradient-to-br from-rose-50 via-pink-50 to-white p-8 shadow-sm sm:p-12 dark:border-rose-900/60 dark:from-rose-950/60 dark:via-slate-900 dark:to-slate-900">
            <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl dark:text-white">
              Start Earning Online in Cameroon Today
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-slate-600 dark:text-slate-300">
              Rejoignez plus de 18 000 Camerounais qui gagnent un revenu quotidien grâce à leur téléphone. Inscription gratuite en 1 minute.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href={VELLOEARN_REGISTER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-rose-600 px-8 py-4 text-base font-bold text-white shadow-lg shadow-rose-600/25 transition-all hover:bg-rose-700 hover:shadow-rose-600/35 active:scale-[0.98] sm:w-auto dark:bg-rose-600 dark:hover:bg-rose-500"
              >
                <span>Create Account · Inscription Gratuite</span>
                <ArrowRight className="h-5 w-5" />
              </a>
            </div>
            <p className="mt-4 text-xs font-medium text-slate-500 dark:text-slate-400">
              ⚡ Instant setup on mobile · Payouts via MTN MoMo & Orange Money.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}