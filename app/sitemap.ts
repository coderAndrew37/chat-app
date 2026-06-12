// app/sitemap.ts
// ─── Dynamic sitemap ──────────────────────────────────────────────────────────
// Registered in next.config with output: "standalone" + metadataBase.
// Covers: homepage, static pages, main job categories, all country pages, all city pages,
// all job-type × country pages, all blog posts, and specialized parameterized localized tracks.

import type { MetadataRoute } from "next";
import {
  MARKETS,
  JOB_TYPES,
  getAllCityParams,
  getAllJobCountryParams,
} from "@/lib/seo/keyword-matrix";

const NEXT_PUBLIC_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://velloearn.co.ke";

// ─── Blog posts ───────────────────────────────────────────────────────────────
const BLOG_POSTS = [
  { slug: "mpesa-payments",             lastModified: "2026-01-10" },
  { slug: "scale-your-team",            lastModified: "2026-01-10" },
  { slug: "how-to-start-ai-training",   lastModified: "2026-02-01" },
  { slug: "swahili-teaching-guide",     lastModified: "2026-02-15" },
  { slug: "online-surveys-kenya-guide", lastModified: "2026-03-01" },
  { slug: "forex-beginners-guide",      lastModified: "2026-03-15" },
  { slug: "maximize-ai-earnings",       lastModified: "2026-04-01" },
  { slug: "ai-tools-requirements",      lastModified: "2026-05-01" },
  { slug: "rlhf-tasks-guide",           lastModified: "2026-05-15" },
  {slug:'ai-data-annotation-jobs' , lastModified: "2026-06-01"}
];

// ─── Main Core Job Category Slugs ──────────────────────────────────────────────
const CORE_JOB_SLUGS = [
  "chatting",
  "ai-training",
  "swahili-teaching",
  "surveys",
  "forex",
  "academic-writing"
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  // ── Static / high-priority pages ───────────────────────────────────────────
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: NEXT_PUBLIC_SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${NEXT_PUBLIC_SITE_URL}/apply`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];

  // ── Core Job Landing Pages (Explicitly Handled) ────────────────────────────
  const coreJobPages: MetadataRoute.Sitemap = CORE_JOB_SLUGS.map((slug) => ({
    url: `${NEXT_PUBLIC_SITE_URL}/earn/${slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.95, // Higher priority as these are your primary money pages
  }));

  // PRO-TIP IMPLEMENTATION: Explicit target parameters pushed to sitemap to enforce crawler parsing
  const parameterizedAILocalizedPages: MetadataRoute.Sitemap = ["kenya", "uganda", "ghana"].map((country) => ({
    url: `${NEXT_PUBLIC_SITE_URL}/earn/ai-training?country=${country}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.95,
  }));

  // ── Country pages: /earn/[country] ─────────────────────────────────────────
  const countryPages: MetadataRoute.Sitemap = MARKETS.map((market) => ({
    url: `${NEXT_PUBLIC_SITE_URL}/earn/${market.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.95,
  }));

  // ── City pages: /earn/[country]/[city] ─────────────────────────────────────
  const cityPages: MetadataRoute.Sitemap = getAllCityParams().map(
    ({ market, city }) => ({
      url: `${NEXT_PUBLIC_SITE_URL}/earn/${market.slug}/${city.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    })
  );

  // ── Job type matrix pages: /earn/[jobSlug] (Fallback for matrix consistency) ──
  const jobRootPages: MetadataRoute.Sitemap = JOB_TYPES.map((job) => ({
    url: `${NEXT_PUBLIC_SITE_URL}/earn/${job.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  // ── Job × country pages: /earn/[jobSlug]/[country] ─────────────────────────
  const jobCountryPages: MetadataRoute.Sitemap = getAllJobCountryParams().map(
    ({ market, jobType }) => ({
      url: `${NEXT_PUBLIC_SITE_URL}/earn/${jobType.slug}/${market.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })
  );

  // ── Blog posts: /blog/[slug] ───────────────────────────────────────────────
  const blogPages: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${NEXT_PUBLIC_SITE_URL}/blog/${post.slug}`,
    lastModified: post.lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Filter out any duplicate root URLs that might happen from combining coreJobPages and jobRootPages
  const allPages = [
    ...staticPages,
    ...coreJobPages,
    ...parameterizedAILocalizedPages,
    ...countryPages,
    ...cityPages,
    ...jobRootPages,
    ...jobCountryPages,
    ...blogPages,
  ];

  const uniqueUrls = new Set<string>();
  return allPages.filter((page) => {
    if (uniqueUrls.has(page.url)) {
      return false;
    }
    uniqueUrls.add(page.url);
    return true;
  });
}