// app/sitemap.ts
// ─── Dynamic sitemap ──────────────────────────────────────────────────────────
// Registered in next.config with output: "standalone" + metadataBase.
// Covers: homepage, static pages, all country pages, all city pages,
// all job-type × country pages, and all blog posts.

import type { MetadataRoute } from "next";
import {
  MARKETS,
  JOB_TYPES,
  getAllCityParams,
  getAllJobCountryParams,
} from "@/lib/seo/keyword-matrix";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://velloearn.com";

// ─── Blog posts ───────────────────────────────────────────────────────────────
// Replace this with a real CMS/DB fetch when you have one.
const BLOG_POSTS = [
  { slug: "mpesa-payments",             lastModified: "2026-01-10" },
  { slug: "scale-your-team",            lastModified: "2026-01-10" },
  { slug: "how-to-start-ai-training",   lastModified: "2026-02-01" },
  { slug: "swahili-teaching-guide",     lastModified: "2026-02-15" },
  { slug: "online-surveys-kenya-guide", lastModified: "2026-03-01" },
  { slug: "forex-beginners-guide",      lastModified: "2026-03-15" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  // ── Static / high-priority pages ───────────────────────────────────────────
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/apply`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];

  // ── Country pages: /earn/[country] ─────────────────────────────────────────
  const countryPages: MetadataRoute.Sitemap = MARKETS.map((market) => ({
    url: `${BASE_URL}/earn/${market.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.95,
  }));

  // ── City pages: /earn/[country]/[city] ─────────────────────────────────────
  const cityPages: MetadataRoute.Sitemap = getAllCityParams().map(
    ({ market, city }) => ({
      url: `${BASE_URL}/earn/${market.slug}/${city.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    })
  );

  // ── Job type root pages: /earn/[jobSlug] ───────────────────────────────────
  const jobRootPages: MetadataRoute.Sitemap = JOB_TYPES.map((job) => ({
    url: `${BASE_URL}/earn/${job.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  // ── Job × country pages: /earn/[jobSlug]/[country] ─────────────────────────
  const jobCountryPages: MetadataRoute.Sitemap = getAllJobCountryParams().map(
    ({ market, jobType }) => ({
      url: `${BASE_URL}/earn/${jobType.slug}/${market.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })
  );

  // ── Blog posts: /blog/[slug] ───────────────────────────────────────────────
  const blogPages: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post.lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    ...staticPages,
    ...countryPages,
    ...cityPages,
    ...jobRootPages,
    ...jobCountryPages,
    ...blogPages,
  ];
}