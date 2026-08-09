// lib/seo/keyword-matrix.ts
// ─── Master SEO data model ────────────────────────────────────────────────────
// Every dynamic page in the SEO system is derived from these arrays.
// Add a new country/city/job-type here and the pages, sitemap, and metadata
// all update automatically — no other files need touching.

export type Market = {
  country: string;           // "Kenya"
  countryCode: string;       // "ke"
  demonym: string;           // "Kenyans"
  slug: string;              // "kenya"
  currency: string;          // "KES"
  payment: string;           // "M-Pesa"
  paymentSlug: string;       // "mpesa"
  mobileOperator: string;    // "Safaricom"
  activationFee: string;     // "KES 450"
  topEarning: string;        // "KES 55,000"
  avgEarning: string;        // "KES 15,000"
  locale: string;            // "en-KE"
  cities: City[];
};

export type City = {
  name: string;    // "Nairobi"
  slug: string;    // "nairobi"
};

export type JobType = {
  slug: string;           // "chatting"
  title: string;          // "Remote Chatting"
  shortTitle: string;     // "chatting"
  icon: string;           // "💬"
  tagline: string;
  description: string;
  badge: string;
  searchVolumeTier: "high" | "medium" | "low";
};

// ─── Markets ─────────────────────────────────────────────────────────────────

export const MARKETS: Market[] = [
  {
    slug: "kenya",
    country: "Kenya",
    countryCode: "ke",
    demonym: "Kenyans",
    currency: "KES",
    payment: "M-Pesa",
    paymentSlug: "mpesa",
    mobileOperator: "Safaricom",
    activationFee: "KES 450",
    avgEarning: "KES 15,000",
    topEarning: "KES 55,000",
    locale: "en-KE",
    cities: [
      { name: "Nairobi", slug: "nairobi" },
      { name: "Mombasa", slug: "mombasa" },
      { name: "Kisumu", slug: "kisumu" },
      { name: "Nakuru", slug: "nakuru" },
    ],
  },
  {
    slug: "ghana",
    country: "Ghana",
    countryCode: "gh",
    demonym: "Ghanaians",
    currency: "GHS",
    payment: "MTN MoMo",
    paymentSlug: "mtn-momo",
    mobileOperator: "MTN",
    activationFee: "GHS 50",
    avgEarning: "GHS 1,800",
    topEarning: "GHS 6,500",
    locale: "en-GH",
    cities: [
      { name: "Accra", slug: "accra" },
      { name: "Kumasi", slug: "kumasi" },
      { name: "Tamale", slug: "tamale" },
      { name: "Takoradi", slug: "takoradi" },
    ],
  },
  {
    slug: "uganda",
    country: "Uganda",
    countryCode: "ug",
    demonym: "Ugandans",
    currency: "UGX",
    payment: "MTN MoMo & Airtel Money",
    paymentSlug: "mtn-momo",
    mobileOperator: "MTN or Airtel",
    activationFee: "UGX 15,000",
    avgEarning: "UGX 450,000",
    topEarning: "UGX 1,600,000",
    locale: "en-UG",
    cities: [
      { name: "Kampala", slug: "kampala" },
      { name: "Entebbe", slug: "entebbe" },
      { name: "Jinja", slug: "jinja" },
      { name: "Mbarara", slug: "mbarara" },
    ],
  },
  {
    slug: "botswana",
    country: "Botswana",
    countryCode: "bw",
    demonym: "Batswana",
    currency: "BWP",
    payment: "Orange Money",
    paymentSlug: "orange-money",
    mobileOperator: "Orange or Mascom",
    activationFee: "BWP 50",
    avgEarning: "BWP 1,500",
    topEarning: "BWP 5,200",
    locale: "en-BW",
    cities: [
      { name: "Gaborone", slug: "gaborone" },
      { name: "Francistown", slug: "francistown" },
      { name: "Molepolole", slug: "molepolole" },
      { name: "Maun", slug: "maun" },
    ],
  },
  {
    slug: "tanzania",
    country: "Tanzania",
    countryCode: "tz",
    demonym: "Tanzanians",
    currency: "TZS",
    payment: "M-Pesa & Tigo Pesa",
    paymentSlug: "m-pesa-tigo",
    mobileOperator: "Vodacom or Tigo",
    activationFee: "TZS 10,000",
    avgEarning: "TZS 350,000",
    topEarning: "TZS 1,200,000",
    locale: "sw-TZ",
    cities: [
      { name: "Dar es Salaam", slug: "dar-es-salaam" },
      { name: "Arusha", slug: "arusha" },
      { name: "Mwanza", slug: "mwanza" },
      { name: "Dodoma", slug: "dodoma" },
      { name: "Zanzibar", slug: "zanzibar" },
    ],
  },
  {
    slug: "zambia",
    country: "Zambia",
    countryCode: "zm",
    demonym: "Zambians",
    currency: "ZMW",
    payment: "MTN & Airtel Money",
    paymentSlug: "mtn-airtel-zm",
    mobileOperator: "MTN or Airtel",
    activationFee: "ZMW 80",
    avgEarning: "ZMW 2,500",
    topEarning: "ZMW 8,500",
    locale: "en-ZM",
    cities: [
      { name: "Lusaka", slug: "lusaka" },
      { name: "Ndola", slug: "ndola" },
      { name: "Kitwe", slug: "kitwe" },
      { name: "Livingstone", slug: "livingstone" },
    ],
  },
  {
    slug: "nigeria",
    country: "Nigeria",
    countryCode: "ng",
    demonym: "Nigerians",
    currency: "NGN",
    payment: "OPay & PalmPay",
    paymentSlug: "opay-palmpay",
    mobileOperator: "MTN or Airtel",
    activationFee: "NGN 2,000",
    avgEarning: "NGN 120,000",
    topEarning: "NGN 450,000",
    locale: "en-NG",
    cities: [
      { name: "Lagos", slug: "lagos" },
      { name: "Abuja", slug: "abuja" },
      { name: "Port Harcourt", slug: "port-harcourt" },
      { name: "Ibadan", slug: "ibadan" },
      { name: "Kano", slug: "kano" },
    ],
  },
  {
    slug: "cameroon",
    country: "Cameroon",
    countryCode: "cm",
    demonym: "Cameroonians",
    currency: "XAF",
    payment: "MTN MoMo & Orange Money",
    paymentSlug: "mtn-orange-cm",
    mobileOperator: "MTN or Orange",
    activationFee: "XAF 2,000",
    avgEarning: "XAF 85,000",
    topEarning: "XAF 300,000",
    locale: "en-CM",
    cities: [
      { name: "Douala", slug: "douala" },
      { name: "Yaoundé", slug: "yaounde" },
      { name: "Bamenda", slug: "bamenda" },
      { name: "Garoua", slug: "garoua" },
    ],
  },
];

// ─── Job Types ────────────────────────────────────────────────────────────────

export const JOB_TYPES: JobType[] = [
  {
    slug: "chatting",
    title: "Remote Chatting",
    shortTitle: "chatting",
    icon: "💬",
    tagline: "Get paid for every conversation you handle.",
    description:
      "Real-time text-based communication work for international platforms. Structured shifts, clear rate cards, direct mobile payouts.",
    badge: "Most popular",
    searchVolumeTier: "high",
  },
  {
    slug: "chat-moderation",
    title: "Chat Moderation",
    shortTitle: "chat moderation",
    icon: "💬",
    tagline: "Moderate chats and manage online community messages.",
    description:
      "Manage customer tickets, moderate live text chats, and process platform queries 24/7.",
    badge: "24/7 Shifts",
    searchVolumeTier: "high",
  },
  {
    slug: "ai-training",
    title: "AI Training",
    shortTitle: "AI training",
    icon: "🤖",
    tagline: "Help teach AI systems to understand humans better.",
    description:
      "Rate, review, and improve AI chatbot responses. Flexible tasks done entirely from your phone. No tech background required.",
    badge: "High demand",
    searchVolumeTier: "high",
  },
  {
    slug: "ai-annotation",
    title: "AI Data Annotation",
    shortTitle: "AI annotation",
    icon: "🏷️",
    tagline: "Label data, audio, and images to power next-gen AI.",
    description:
      "Perform high-speed bounding box, sentiment, and entity tagging for machine learning models.",
    badge: "Top Pick",
    searchVolumeTier: "high",
  },
  {
    slug: "surveys",
    title: "Paid Surveys",
    shortTitle: "surveys",
    icon: "📋",
    tagline: "Your opinions have real value to global brands.",
    description:
      "Paid surveys, product testing, and consumer research tasks from global companies. Quick to start, consistent payouts.",
    badge: "Quick start",
    searchVolumeTier: "high",
  },
  {
    slug: "foreigners",
    title: "Expat & Foreigner Micro-Jobs",
    shortTitle: "foreigner jobs",
    icon: "🌐",
    tagline: "Location-independent micro-tasks for foreign residents.",
    description:
      "Remote task opportunities open to non-citizens, expatriates, and international remote workers.",
    badge: "Global Access",
    searchVolumeTier: "medium",
  },
  {
    slug: "swahili-teaching",
    title: "Teach Swahili Online",
    shortTitle: "Swahili teaching",
    icon: "🌍",
    tagline: "Foreigners pay to learn what you already speak fluently.",
    description:
      "One-on-one and group lessons for international learners via video or chat. Your mother tongue is your income.",
    badge: "Unique skill",
    searchVolumeTier: "medium",
  },
  {
    slug: "luganda-teaching",
    title: "Teach Luganda Online",
    shortTitle: "Luganda teaching",
    icon: "🗣️",
    tagline: "Help foreign expats and tourists practice Luganda online.",
    description:
      "Host informal remote conversational lessons and audio translation for international learners. Earn daily payouts directly to MTN MoMo or Airtel Money.",
    badge: "Native Language",
    searchVolumeTier: "medium",
  },
  {
    slug: "academic-writing",
    title: "Academic Writing",
    shortTitle: "academic writing",
    icon: "📚",
    tagline: "Earn top rates writing essays and research papers.",
    description:
      "Essay writing, research papers, theses, and coursework for international clients. Competitive rates, flexible deadlines.",
    badge: "Expert skill",
    searchVolumeTier: "high",
  },
  {
    slug: "forex",
    title: "Forex Trading",
    shortTitle: "forex",
    icon: "💱",
    tagline: "Earn from global currency markets with expert guidance.",
    description:
      "Learn and participate in forex trading with real-time market insights, mentorship, and team support.",
    badge: "High potential",
    searchVolumeTier: "medium",
  },
  {
    slug: "students",
    title: "Student Side Hustles",
    shortTitle: "student jobs",
    icon: "🎓",
    tagline: "Flexible remote micro-tasks designed for university students.",
    description:
      "Zero capital required. Earn money between classes completing simple phone tasks, data entry, and online research.",
    badge: "No Capital",
    searchVolumeTier: "high",
  },
  {
    slug: "setswana-teaching",
    title: "Teach Setswana Online",
    shortTitle: "Setswana teaching",
    icon: "🗣️",
    tagline: "Get paid to help foreign expats and tourists practice Setswana.",
    description:
      "Host informal remote conversational lessons for international learners. Earn daily payouts directly to Orange Money, MyZaka, or bank transfer.",
    badge: "Native Language",
    searchVolumeTier: "medium",
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** All country slugs */
export const ALL_COUNTRY_SLUGS = MARKETS.map((m) => m.slug);

/** All job type slugs */
export const ALL_JOB_SLUGS = JOB_TYPES.map((j) => j.slug);

/** Get market by slug — throws if not found */
export function getMarket(slug: string): Market {
  const m = MARKETS.find((m) => m.slug === slug);
  if (!m) throw new Error(`Unknown market slug: ${slug}`);
  return m;
}

/** Get job type by slug — throws if not found */
export function getJobType(slug: string): JobType {
  const j = JOB_TYPES.find((j) => j.slug === slug);
  if (!j) throw new Error(`Unknown job type slug: ${slug}`);
  return j;
}

/**
 * All [country, city] pairs — used to generate city-level pages.
 * Returns { market, city } for each city across all markets.
 */
export function getAllCityParams() {
  return MARKETS.flatMap((market) =>
    market.cities.map((city) => ({ market, city }))
  );
}

/**
 * All [country, jobType] pairs — used to generate job-type × country pages.
 */
export function getAllJobCountryParams() {
  return MARKETS.flatMap((market) =>
    JOB_TYPES.map((jobType) => ({ market, jobType }))
  );
}