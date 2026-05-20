// lib/seo/metadata.ts
// ─── Central metadata factory ─────────────────────────────────────────────────
// All generateMetadata() calls across the app import from here so title/desc
// templates stay consistent and DRY.

import type { Metadata } from "next";
import type { Market, JobType, City } from "./keyword-matrix";

const SITE_NAME = "VelloEarn";
const BASE_URL  = process.env.NEXT_PUBLIC_SITE_URL ?? "https://velloearn.co.ke";

// ─── Homepage ────────────────────────────────────────────────────────────────

export function homepageMetadata(): Metadata {
  return {
    title: "VelloEarn — Legit Online Jobs in Kenya, Uganda & Ghana | M-Pesa Payouts",
    description:
      "Join 5,000+ Africans earning from their phones. Remote chatting, AI training, paid surveys, Swahili teaching & more. Paid directly to M-Pesa, MTN MoMo, or Airtel Money.",
    keywords: [
      "online jobs Kenya",
      "online jobs Uganda",
      "online jobs Ghana",
      "earn from phone Kenya",
      "remote work M-Pesa",
      "work from home Kenya",
      "legit online jobs Africa",
    ],
    openGraph: {
      title: "VelloEarn — Earn Online from Kenya, Uganda & Ghana",
      description:
        "Remote chatting, AI training, surveys & more. Direct M-Pesa payouts. No laptop needed.",
      url: BASE_URL,
      siteName: SITE_NAME,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "VelloEarn — Legit Online Jobs | M-Pesa Payouts",
      description: "Earn from your phone. Remote chatting, AI training, surveys & more.",
    },
    alternates: { canonical: BASE_URL },
  };
}

// ─── Country page: /earn/[country] ───────────────────────────────────────────

export function countryPageMetadata(market: Market): Metadata {
  const { country, payment, currency, topEarning } = market;
  const url = `${BASE_URL}/earn/${market.slug}`;

  return {
    title: `Online Jobs in ${country} That Pay via ${payment} (2026) — VelloEarn`,
    description:
      `Find legit online jobs in ${country} paying directly to ${payment}. Remote chatting, AI training, paid surveys & more. Top earners make ${topEarning}/month. Free to apply — no laptop needed.`,
    keywords: [
      `online jobs ${country}`,
      `work from home ${country}`,
      `earn from phone ${country}`,
      `remote jobs ${country}`,
      `${payment} online jobs`,
      `legit online jobs ${country}`,
      `online jobs ${country} no experience`,
      `earn money online ${country}`,
    ],
    openGraph: {
      title: `Legit Online Jobs in ${country} — Paid via ${payment}`,
      description: `Remote chatting, AI training, surveys & more. Direct ${payment} payouts. Free to apply.`,
      url,
      siteName: SITE_NAME,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `Online Jobs in ${country} | ${payment} Payouts`,
      description: `Earn ${currency} from your phone. Legit remote work for ${country}ns.`,
    },
    alternates: { canonical: url },
  };
}

// ─── City page: /earn/[country]/[city] ───────────────────────────────────────

export function cityPageMetadata(market: Market, city: City): Metadata {
  const { country, payment, currency } = market;
  const url = `${BASE_URL}/earn/${market.slug}/${city.slug}`;

  return {
    title: `Online Jobs in ${city.name}, ${country} — Earn via ${payment} | VelloEarn`,
    description:
      `Looking for online jobs in ${city.name}? VelloEarn connects ${city.name} residents with remote chatting, AI training, and survey work. Paid directly to ${payment}. Apply free.`,
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

// ─── Job-type × country page: /earn/[jobSlug]/[country] ──────────────────────

export function jobCountryPageMetadata(market: Market, jobType: JobType): Metadata {
  const { country, payment } = market;
  const url = `${BASE_URL}/earn/${jobType.slug}/${market.slug}`;

  return {
    title: `${jobType.title} Jobs in ${country} — Paid via ${payment} | VelloEarn`,
    description:
      `${jobType.tagline} Find ${jobType.shortTitle} jobs in ${country} with direct ${payment} payouts. ${jobType.description} Free to apply.`,
    keywords: [
      `${jobType.shortTitle} jobs ${country}`,
      `${jobType.shortTitle} jobs ${country} ${payment}`,
      `online ${jobType.shortTitle} ${country}`,
      `earn from ${jobType.shortTitle} ${country}`,
      `legit ${jobType.shortTitle} jobs ${country}`,
    ],
    openGraph: {
      title: `${jobType.title} Jobs in ${country} | ${payment}`,
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
  const url = `${BASE_URL}/blog/${opts.slug}`;

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
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

/** BreadcrumbList schema */
export function breadcrumbSchema(
  crumbs: { name: string; href: string }[]
) {
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
        addressCountry: opts.country,
      },
    },
    employmentType: "CONTRACTOR",
    jobLocationType: "TELECOMMUTE",
    baseSalary: {
      "@type": "MonetaryAmount",
      currency: opts.currency,
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
      sameAs: process.env.NEXT_PUBLIC_SITE_URL ?? "https://velloearn.co.ke",
    },
    datePosted: new Date().toISOString().split("T")[0],
  };
}