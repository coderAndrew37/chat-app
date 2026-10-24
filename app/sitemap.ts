import type { MetadataRoute } from "next";
import { client } from "@/lib/sanity/client";
import {
  MARKETS,
  JOB_TYPES,
  getAllCityParams,
  getAllJobCountryParams,
} from "@/lib/seo/keyword-matrix";
import { paths } from "@/lib/seo/metadata";
import { BASE_URL as CONFIG_BASE_URL } from "@/lib/config";

const BASE_URL = CONFIG_BASE_URL.replace(/\/$/, "");

// Regenerate the sitemap hourly (ISR) so new blog posts appear quickly.
export const revalidate = 3600;

// Bump this date when you ship real content/template changes to the
// programmatic pages. Using `new Date()` on every build tells Google that
// every page changes constantly, and it then learns to ignore <lastmod>.
const CONTENT_UPDATED = new Date("2026-10-15");

interface SanityBlogPost {
  slug: string;
  lastModified: string;
}

const entry = (
  path: string,
  lastModified: Date = CONTENT_UPDATED
): MetadataRoute.Sitemap[number] => ({
  url: `${BASE_URL}${path}`,
  lastModified,
});

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 1. Blog posts from Sanity (real last-modified dates)
  let blogPosts: SanityBlogPost[] = [];
  try {
    blogPosts = await client.fetch<SanityBlogPost[]>(
      `*[_type == "post" && defined(slug.current)] {
        "slug": slug.current,
        "lastModified": coalesce(_updatedAt, _createdAt)
      }`
    );
  } catch (error) {
    console.error("Failed to fetch blog posts for sitemap:", error);
  }

  // 2. Static pages ("/join" intentionally excluded)
  const staticPages = ["", "/about", "/privacy", "/terms", "/cookies", "/earn", "/blog"].map(
    (p) => entry(p)
  );

  // 3. Core service pages — CLEAN URLs (these are the Kenya/default versions)
  const CORE_JOB_SLUGS = [
    "chatting",
    "ai-training",
    "swahili-teaching",
    "surveys",
    "forex",
    "academic-writing",
  ];
  const coreJobPages = CORE_JOB_SLUGS.map((slug) => entry(`/earn/${slug}`));

  // 4. Localized variants for NON-default regions only.
  // Kenya is the default, so its canonical is the clean URL above
  // (e.g. /earn/forex), NOT /earn/forex?geo=kenya.
  // REQUIRES: each of these pages sets its canonical this way (see forex fix).
  const LOCALIZED_VARIANTS = [
    { slug: "ai-training", param: "country" },
    { slug: "forex", param: "geo" },
    { slug: "surveys", param: "geo" },
  ];
  const EXTRA_REGIONS = ["uganda", "ghana"];
  const localizedPages = LOCALIZED_VARIANTS.flatMap(({ slug, param }) =>
    EXTRA_REGIONS.map((region) => entry(`/earn/${slug}?${param}=${region}`))
  );

  // 5. Programmatic pages (paths come from the same helper the canonicals use)
  const countryPages = MARKETS.map((m) => entry(paths.country(m)));
  const cityPages = getAllCityParams().map(({ market, city }) =>
    entry(paths.city(market, city))
  );
  const jobRootPages = JOB_TYPES.map((j) => entry(paths.jobRoot(j)));
  const jobCountryPages = getAllJobCountryParams().map(({ market, jobType }) =>
    entry(paths.jobCountry(jobType, market))
  );

  // 6. Blog
  const blogPages = blogPosts.map((post) =>
    entry(paths.blog(post.slug), new Date(post.lastModified))
  );

  // 7. De-duplicate by URL
  const all = [
    ...staticPages,
    ...coreJobPages,
    ...localizedPages,
    ...countryPages,
    ...cityPages,
    ...jobRootPages,
    ...jobCountryPages,
    ...blogPages,
  ];
  return Array.from(new Map(all.map((e) => [e.url, e])).values());
}