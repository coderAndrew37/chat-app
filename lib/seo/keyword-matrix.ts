// lib/seo/keyword-matrix.ts
// ─── Master SEO data model ────────────────────────────────────────────────────
// Every dynamic page in the SEO system is derived from these arrays.
// Add a new country/city/job-type here and the pages, sitemap, and metadata
// all update automatically — no other files need touching.

export type Market = {
  country: string;           // "Kenya"
  countryCode: string;       // "ke"
  slug: string;              // "kenya"
  currency: string;          // "KES"
  payment: string;           // "M-Pesa"
  paymentSlug: string;       // "mpesa"
  mobileOperator: string;    // "Safaricom"
  cities: City[];
  topEarning: string;        // "KES 30,000"
  avgEarning: string;        // "KES 15,000"
  locale: string;            // "en-KE"
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
    country: "Kenya",
    countryCode: "ke",
    slug: "kenya",
    currency: "KES",
    payment: "M-Pesa",
    paymentSlug: "mpesa",
    mobileOperator: "Safaricom",
    topEarning: "KES 30,000",
    avgEarning: "KES 15,000",
    locale: "en-KE",
    cities: [
      { name: "Nairobi",  slug: "nairobi"  },
      { name: "Mombasa",  slug: "mombasa"  },
      { name: "Kisumu",   slug: "kisumu"   },
      { name: "Nakuru",   slug: "nakuru"   },
      { name: "Eldoret",  slug: "eldoret"  },
      { name: "Thika",    slug: "thika"    },
      { name: "Nyeri",    slug: "nyeri"    },
      { name: "Kakamega", slug: "kakamega" },
    ],
  },
  {
    country: "Uganda",
    countryCode: "ug",
    slug: "uganda",
    currency: "UGX",
    payment: "MTN Mobile Money",
    paymentSlug: "mtn-mobile-money",
    mobileOperator: "MTN Uganda",
    topEarning: "UGX 1,200,000",
    avgEarning: "UGX 600,000",
    locale: "en-UG",
    cities: [
      { name: "Kampala",  slug: "kampala"  },
      { name: "Entebbe",  slug: "entebbe"  },
      { name: "Jinja",    slug: "jinja"    },
      { name: "Mbarara",  slug: "mbarara"  },
      { name: "Gulu",     slug: "gulu"     },
    ],
  },
  {
    country: "Ghana",
    countryCode: "gh",
    slug: "ghana",
    currency: "GHS",
    payment: "MTN MoMo",
    paymentSlug: "mtn-momo",
    mobileOperator: "MTN Ghana",
    topEarning: "GHS 4,500",
    avgEarning: "GHS 2,000",
    locale: "en-GH",
    cities: [
      { name: "Accra",     slug: "accra"     },
      { name: "Kumasi",    slug: "kumasi"    },
      { name: "Tamale",    slug: "tamale"    },
      { name: "Cape Coast",slug: "cape-coast"},
      { name: "Takoradi",  slug: "takoradi"  },
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
      "Real-time text-based communication work for international platforms. Structured shifts, clear rate cards, M-Pesa payouts.",
    badge: "Most popular",
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