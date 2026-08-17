// lib/seo/metadata.ts
// ─── Central metadata factory ─────────────────────────────────────────────────
// All generateMetadata() calls across the app import from here so title/desc
// templates stay consistent and DRY.

import type { Metadata } from "next";
import { type Market, type JobType, type City, MARKETS } from "./keyword-matrix";

const SITE_NAME = "VelloEarn";
const BASE_URL  = process.env.NEXT_PUBLIC_SITE_URL ?? "https://velloearn.co.ke";

// ─── Helper: Generate Hreflang Languages Mapping ─────────────────────────────

/**
 * Builds regional alternate language links for Google search engines.
 * Example path: "/earn" -> generates hreflang for en-KE, en-GH, en-SA, etc.
 */
function buildHreflangAlternates(pathSuffix: string = ""): Record<string, string> {
  const alternates: Record<string, string> = {};
  
  MARKETS.forEach((m) => {
    alternates[m.locale] = `${BASE_URL}/earn/${m.slug}${pathSuffix}`;
  });

  // Default international fallback
  alternates["x-default"] = `${BASE_URL}${pathSuffix}`;

  return alternates;
}

// ─── Homepage ────────────────────────────────────────────────────────────────

export function homepageMetadata(): Metadata {
  return {
    title: "VelloEarn — Legit Online Jobs in Kenya, Ghana, GCC & Across Africa | Mobile Payouts",
    description:
      "Join 10,000+ earners making daily money from their phones. Remote chatting, AI training, paid surveys & teaching. Direct payouts via M-Pesa, MTN MoMo, OPay, STC Pay & Orange Money.",
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
    alternates: {
      canonical: BASE_URL,
      languages: buildHreflangAlternates(),
    },
  };
}

// ─── Country page: /earn/[country] ───────────────────────────────────────────

export function countryPageMetadata(market: Market): Metadata {
  const { country, payment, currency, topEarning, demonym, slug } = market;
  const url = `${BASE_URL}/earn/${slug}`;

  // Tailored title/description for Diaspora markets vs Local markets
  const isDiaspora = ["saudi-arabia", "qatar", "oman", "lebanon"].includes(slug);

  const title = isDiaspora
    ? `Online Jobs for ${demonym} — Earn in ${currency} via ${payment} (2026)`
    : `Online Jobs in ${country} That Pay via ${payment} (2026) — VelloEarn`;

  const description = isDiaspora
    ? `Find legit online jobs for ${demonym}. Earn ${currency} during your off-hours with instant payouts to ${payment}. Remote chatting, AI tasks & micro-jobs. Free to apply.`
    : `Find legit online jobs in ${country} paying directly to ${payment}. Remote chatting, AI training, paid surveys & more. Top earners make ${topEarning}/month. Free to apply — no experience needed.`;

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
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: `Earn ${currency} from your phone. Legit remote work for ${demonym}.`,
    },
    alternates: {
      canonical: url,
      languages: buildHreflangAlternates(),
    },
  };
}

// ─── City page: /earn/[country]/[city] ───────────────────────────────────────

export function cityPageMetadata(market: Market, city: City): Metadata {
  const { country, payment, slug } = market;
  const url = `${BASE_URL}/earn/${slug}/${city.slug}`;

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
    alternates: {
      canonical: url,
      languages: MARKETS.reduce((acc, m) => {
        acc[m.locale] = `${BASE_URL}/earn/${m.slug}/${city.slug}`;
        return acc;
      }, {} as Record<string, string>),
    },
  };
}

// ─── Job-type × country page: /earn/[jobSlug]/[country] ──────────────────────

export function jobCountryPageMetadata(market: Market, jobType: JobType): Metadata {
  const { country, payment, slug } = market;
  const url = `${BASE_URL}/earn/${jobType.slug}/${slug}`;

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
    alternates: {
      canonical: url,
      languages: MARKETS.reduce((acc, m) => {
        acc[m.locale] = `${BASE_URL}/earn/${jobType.slug}/${m.slug}`;
        return acc;
      }, {} as Record<string, string>),
    },
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
    applicantLocationRequirements: {
      "@type": "Country",
      name: opts.country,
    },
    baseSalary: {
      "@type": "MonetaryAmount",
      currency: opts.currency.split("/")[0].trim(), // Sanitizes inputs like "KES / SAR" to "KES"
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