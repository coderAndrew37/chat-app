import type { Metadata } from "next";
import type { Market, JobType, City } from "./keyword-matrix";
import { BASE_URL as CONFIG_BASE_URL } from "@/lib/config";

const SITE_NAME = "VelloEarn";
const BASE_URL = CONFIG_BASE_URL.replace(/\/$/, "");

// ─── Single source of truth for URL paths ────────────────────────────────────
// Import these in app/sitemap.ts and in any <Link> that points at these pages,
// so canonicals, sitemap and internal links can never drift apart again.

export const paths = {
  country: (m: Market) => `/earn/country/${m.slug}`,
  city: (m: Market, c: City) => `/earn/country/${m.slug}/${c.slug}`,
  jobRoot: (j: JobType) => `/earn/job/${j.slug}`,
  jobCountry: (j: JobType, m: Market) => `/earn/job/${j.slug}/${m.slug}`,
  blog: (slug: string) => `/blog/${slug}`,
};

const abs = (path: string) => `${BASE_URL}${path}`;

// ─── Length helpers ──────────────────────────────────────────────────────────

/** Pick the first candidate that fits; fall back to the shortest one. */
function fitTitle(candidates: string[], max = 60): string {
  return candidates.find((c) => c.length <= max) ?? candidates[candidates.length - 1];
}

/** Trim a description at a word boundary. */
function fitDescription(text: string, max = 155): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  return cut.slice(0, cut.lastIndexOf(" ")).replace(/[.,;:\s]+$/, "") + "…";
}

// ─── Homepage ────────────────────────────────────────────────────────────────

export function homepageMetadata(): Metadata {
  return {
    title: "VelloEarn — Legit Online Jobs Across Africa | Mobile Payouts",
    description: fitDescription(
      "Earn from your phone: remote chatting, AI training, paid surveys & teaching. Direct payouts via M-Pesa, MTN MoMo, OPay & Orange Money."
    ),
    keywords: [
      "online jobs Kenya",
      "online jobs Ghana",
      "online jobs Uganda",
      "online jobs Tanzania",
      "online jobs Saudi Arabia M-Pesa",
      "online jobs Qatar M-Pesa",
      "earn from phone Africa",
      "remote work M-Pesa",
      "work from home OPay",
      "legit online jobs diaspora",
    ],
    openGraph: {
      title: "VelloEarn — Earn Online Across Africa & The Middle East",
      description:
        "Remote chatting, AI training, surveys & more. Direct mobile wallet payouts. No laptop needed.",
      url: BASE_URL,
      siteName: SITE_NAME,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "VelloEarn — Legit Online Jobs | Local Mobile Payouts",
      description: "Earn from your phone. Remote chatting, AI training, surveys & more.",
    },
    alternates: { canonical: BASE_URL },
  };
}

// ─── Country page: /earn/country/[country] ───────────────────────────────────

export function countryPageMetadata(market: Market): Metadata {
  const { country, payment, currency, topEarning, demonym, slug } = market;
  const url = abs(paths.country(market));

  const isDiaspora = ["saudi-arabia", "qatar", "oman", "lebanon"].includes(slug);

  const title = isDiaspora
    ? fitTitle([
        `Online Jobs for ${demonym} — Paid via ${payment} | VelloEarn`,
        `Online Jobs for ${demonym} (2026) | VelloEarn`,
      ])
    : fitTitle([
        `Online Jobs in ${country} Paid via ${payment} (2026) | VelloEarn`,
        `Online Jobs in ${country} (2026) | VelloEarn`,
      ]);

  const description = fitDescription(
    isDiaspora
      ? `Legit online jobs for ${demonym}. Earn during off-hours with instant payouts to ${payment}. Chatting, AI tasks & micro-jobs. Free to apply.`
      : `Legit online jobs in ${country} paid to ${payment}. Chatting, AI training, surveys & more. Top earners make ${topEarning}/month. Free to apply.`
  );

  return {
    title,
    description,
    keywords: [
      `online jobs ${country}`,
      `work from home ${country}`,
      `earn from phone ${country}`,
      `remote jobs ${country}`,
      `${payment} online jobs`,
      `legit online jobs ${country}`,
      `online jobs for ${demonym}`,
      `earn money online ${country}`,
    ],
    openGraph: { title, description, url, siteName: SITE_NAME, type: "website" },
    twitter: {
      card: "summary_large_image",
      title,
      description: `Earn ${currency} from your phone. Legit remote work for ${demonym}.`,
    },
    alternates: { canonical: url },
  };
}

// ─── City page: /earn/country/[country]/[city] ───────────────────────────────

export function cityPageMetadata(market: Market, city: City): Metadata {
  const { country, payment } = market;
  const url = abs(paths.city(market, city));

  const title = fitTitle([
    `Online Jobs in ${city.name}, ${country} — Paid via ${payment} | VelloEarn`,
    `Online Jobs in ${city.name}, ${country} | VelloEarn`,
  ]);

  const description = fitDescription(
    `Online jobs in ${city.name}, ${country}: remote chatting, AI training and survey work paid directly to ${payment}. Apply free.`
  );

  return {
    title,
    description,
    keywords: [
      `online jobs ${city.name}`,
      `work from home ${city.name}`,
      `remote jobs ${city.name} ${country}`,
      `earn money online ${city.name}`,
      `${city.name} ${payment} jobs`,
    ],
    openGraph: {
      title: `Online Jobs in ${city.name} — Paid via ${payment}`,
      description: `Remote work for ${city.name} residents. No laptop needed. Free to apply.`,
      url,
      siteName: SITE_NAME,
      type: "website",
    },
    alternates: { canonical: url },
  };
}

// ─── Job × country page: /earn/job/[jobSlug]/[country] ───────────────────────

export function jobCountryPageMetadata(market: Market, jobType: JobType): Metadata {
  const { country, payment } = market;
  const url = abs(paths.jobCountry(jobType, market));

  // Avoid "Micro-Jobs Jobs" / "Side Hustles Jobs"
  const label = /(jobs|hustles)$/i.test(jobType.title)
    ? jobType.title
    : `${jobType.title} Jobs`;

  const title = fitTitle([
    `${label} in ${country} — Paid via ${payment} | VelloEarn`,
    `${label} in ${country} | VelloEarn`,
  ]);

  const description = fitDescription(
    `${jobType.tagline} ${jobType.shortTitle} jobs in ${country} with direct ${payment} payouts. Free to apply.`
  );

  return {
    title,
    description,
    keywords: [
      `${jobType.shortTitle} jobs ${country}`,
      `${jobType.shortTitle} jobs ${country} ${payment}`,
      `online ${jobType.shortTitle} ${country}`,
      `earn from ${jobType.shortTitle} ${country}`,
      `legit ${jobType.shortTitle} jobs ${country}`,
    ],
    openGraph: {
      title: `${label} in ${country} | ${payment}`,
      description: jobType.tagline,
      url,
      siteName: SITE_NAME,
      type: "website",
    },
    alternates: { canonical: url },
  };
}

// ─── Blog/article page ───────────────────────────────────────────────────────

export function blogPostMetadata(opts: {
  title: string;
  description: string;
  slug: string;
  publishedAt: string;
  updatedAt?: string;
}): Metadata {
  const url = abs(paths.blog(opts.slug));

  return {
    title: `${opts.title} | VelloEarn`,
    description: opts.description,
    openGraph: {
      title: opts.title,
      description: opts.description,
      url,
      siteName: SITE_NAME,
      type: "article",
      publishedTime: opts.publishedAt,
      ...(opts.updatedAt ? { modifiedTime: opts.updatedAt } : {}),
    },
    alternates: { canonical: url },
  };
}

// ─── Shared structured data helpers ──────────────────────────────────────────

/** FAQ schema — pass the same items you render in the accordion */
export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

/** BreadcrumbList schema */
export function breadcrumbSchema(crumbs: { name: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: `${BASE_URL}${crumb.href}`,
    })),
  };
}

/** JobPosting schema — for individual earn pages */
export function jobPostingSchema(opts: {
  title: string;
  description: string;
  country: string;
  countryCode?: string;
  payment: string;
  minSalary: number;
  maxSalary: number;
  currency: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: opts.title,
    description: opts.description,
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressCountry: opts.countryCode ? opts.countryCode.toUpperCase() : opts.country,
      },
    },
    employmentType: "CONTRACTOR",
    jobLocationType: "TELECOMMUTE",
    applicantLocationRequirements: { "@type": "Country", name: opts.country },
    baseSalary: {
      "@type": "MonetaryAmount",
      currency: opts.currency.split("/")[0].trim(), // "KES / SAR" -> "KES"
      value: {
        "@type": "QuantitativeValue",
        minValue: opts.minSalary,
        maxValue: opts.maxSalary,
        unitText: "MONTH",
      },
    },
    hiringOrganization: {
      "@type": "Organization",
      name: "VelloEarn",
      sameAs: BASE_URL,
    },
    datePosted: new Date().toISOString().split("T")[0],
  };
}