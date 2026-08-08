import { Metadata } from "next";

export interface SeoParams {
  country: string;
  countryCode: string;
  path: string;
  title?: string;
  description?: string;
  keywords?: string;
}

/**
 * Generates metadata with canonical and hreflang links for country-specific pages.
 * Supports en-BW, en-KE, and x-default.
 */
export function generateCountryMetadata({
  country,
  countryCode,
  path,
  title,
  description,
  keywords,
}: SeoParams): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.velloearn.co.ke";
  const canonicalUrl = `${baseUrl}${path}`;

  // Build hreflang alternatives
  const alternatives: Record<string, string> = {
    "en-BW": `${baseUrl}/earn/country/botswana`,
    "en-KE": `${baseUrl}/earn/country/kenya`,
    "x-default": `${baseUrl}/earn`,
  };

  // Build metadata
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
      languages: {
        "en-BW": alternatives["en-BW"],
        "en-KE": alternatives["en-KE"],
        "x-default": alternatives["x-default"],
      },
    },
    openGraph: {
      title: `Online Jobs in ${country} – Start Earning Today`,
      description:
        `Earn money online in ${country} with flexible tasks. No experience needed. Payouts via local eWallets.`,
      url: canonicalUrl,
      siteName: "VelloEarn",
      locale: "en_BW",
      type: "website",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

// Example usage in page.tsx:
// export const metadata = generateCountryMetadata({
//   country: "Botswana",
//   countryCode: "BW",
//   path: "/earn/country/botswana",
// });