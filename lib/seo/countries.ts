import type { Metadata } from "next";
import { MARKETS } from "./keyword-matrix";

export interface SeoParams {
  country: string;
  countryCode: string;
  path: string;
  title?: string;
  description?: string;
  keywords?: string;
}

/**
 * Generates metadata with canonical and dynamic hreflang links for all supported markets.
 */
export function generateCountryMetadata({
  country,
  path,
  title,
  description,
  keywords,
}: SeoParams): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.velloearn.co.ke";
  const canonicalUrl = `${baseUrl}${path}`;

  // Dynamically map all active markets to their locale keys and URLs
  const languages: Record<string, string> = {};
  
  MARKETS.forEach((market) => {
    languages[market.locale] = `${baseUrl}/earn/country/${market.slug}`;
  });

  // Fallback default
  languages["x-default"] = `${baseUrl}/earn`;

  return {
    title: title || `Online Jobs in ${country} | VelloEarn`,
    description:
      description ||
      `Find the best online jobs in ${country}. Earn daily with paid surveys, AI tasks, chat moderation and more. Free to join.`,
    keywords:
      keywords ||
      `jobs ${country}, online paying jobs ${country}, earn money online ${country}, paid surveys ${country}`,
    alternates: {
      canonical: canonicalUrl,
      languages,
    },
    openGraph: {
      title: `Online Jobs in ${country} – Start Earning Today`,
      description:
        `Earn money online in ${country} with flexible tasks. No experience needed. Direct payouts to local wallets.`,
      url: canonicalUrl,
      siteName: "VelloEarn",
      type: "website",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}