import { Metadata } from "next";

export interface HreflangMetadataParams {
  country: string;
  countryCode: string; // e.g., "CM", "KE", "BW", "GH", "UG", "TZ", "ZM", "NG"
  path: string;
  title?: string;
  description?: string;
  keywords?: string;
}

/**
 * Generates Metadata with canonical and hreflang links.
 * Supports en-CM, fr-CM, en-KE, en-BW, en-GH, en-UG, en-TZ, sw-TZ, en-ZM, en-NG, and x-default.
 */
export function generateHreflangMetadata({
  country,
  countryCode,
  path,
  title,
  description,
  keywords,
}: HreflangMetadataParams): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.velloearn.co.ke";
  const canonicalUrl = `${baseUrl}${path}`;

  // Map country codes to their country names (lowercase for URL)
  const countryMap: Record<string, string> = {
    CM: "cameroon",
    KE: "kenya",
    BW: "botswana",
    GH: "ghana",
    UG: "uganda",
    TZ: "tanzania",
    ZM: "zambia",
    NG: "nigeria",
  };

  // Build hreflang languages map
  const languages: Record<string, string> = {};

  // For each supported country, generate the appropriate URL
  const supportedCodes = ["CM", "KE", "BW", "GH", "UG", "TZ", "ZM", "NG"];
  for (const code of supportedCodes) {
    const countryName = countryMap[code];
    // Construct the country-specific path.
    // If the path already contains a country (e.g., "/earn/country/cameroon"), replace it.
    // Otherwise, we assume the path is a generic page and we need to add the country hub.
    let countryPath = path;
    const countryMatch = path.match(/\/country\/([a-z]+)/);
    if (countryMatch) {
      // Replace the current country with the target country
      countryPath = path.replace(/\/country\/[a-z]+/, `/country/${countryName}`);
    } else {
      // For subpages like "/earn/job/surveys/cameroon", we need to replace the last segment with the country.
      // We'll look for any of the country names in the path and replace.
      // Simpler: we'll construct the base country hub URL.
      // For generic pages (like /earn), we'll use the country hub.
      if (path === "/earn" || path === "/") {
        countryPath = `/earn/country/${countryName}`;
      } else {
        // For other paths, we assume they have the country code at the end.
        // We'll replace the last segment with the target country name.
        const segments = path.split("/");
        const last = segments[segments.length - 1];
        // Check if last is a country code (lowercase)
        if (last in countryMap) {
          segments[segments.length - 1] = countryName;
          countryPath = segments.join("/");
        } else {
          // Otherwise, we'll just use the country hub as fallback.
          countryPath = `/earn/country/${countryName}`;
        }
      }
    }
    // For Cameroon, we add both en-CM and fr-CM
    if (code === "CM") {
      languages["en-CM"] = `${baseUrl}${countryPath}`;
      languages["fr-CM"] = `${baseUrl}${countryPath}`;
    }
    // For Tanzania, we add both en-TZ and sw-TZ
    else if (code === "TZ") {
      languages["en-TZ"] = `${baseUrl}${countryPath}`;
      languages["sw-TZ"] = `${baseUrl}${countryPath}`;
    } else {
      languages[`en-${code}`] = `${baseUrl}${countryPath}`;
    }
  }

  // Add x-default
  languages["x-default"] = `${baseUrl}/earn`;

  return {
    title: title || `Online Jobs in ${country} | VelloEarn`,
    description:
      description ||
      `Find the best online jobs in ${country}. Earn daily with paid surveys, AI tasks, and more. Free to join.`,
    keywords:
      keywords ||
      `jobs ${country}, online jobs ${country}, earn money ${country}, paid surveys ${country}, AI training ${country}`,
    alternates: {
      canonical: canonicalUrl,
      languages,
    },
    openGraph: {
      title: title || `Online Jobs in ${country} – Start Earning Today`,
      description:
        description ||
        `Earn money online in ${country} with flexible tasks. No experience needed. Payouts via mobile money.`,
      url: canonicalUrl,
      siteName: "VelloEarn",
      locale: `en_${countryCode}`,
      type: "website",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}