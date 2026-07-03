// app/sitemap.ts
import type { MetadataRoute } from "next";
import { client } from "@/lib/sanity/client"; 
import {
  MARKETS,
  JOB_TYPES,
  getAllCityParams,
  getAllJobCountryParams,
} from "@/lib/seo/keyword-matrix";

const NEXT_PUBLIC_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://velloearn.co.ke";

// Revalidate the sitemap once every hour (3600 seconds) via ISR
export const revalidate = 3600;

interface SanityBlogPost {
  slug: string;
  lastModified: string;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date().toISOString();

  // 1. Fetch live blog posts from Sanity CMS using GROQ
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
    blogPosts = []; // Fallback gracefully if the fetch fails
  }

  // 2. Static / high-priority pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: NEXT_PUBLIC_SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${NEXT_PUBLIC_SITE_URL}/join`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];

  // 3. Core Job Landing Pages (e.g., /earn/ai-training)
  const CORE_JOB_SLUGS = [
    "chatting",
    "ai-training",
    "swahili-teaching",
    "surveys",
    "forex",
    "academic-writing"
  ];
  
  const coreJobPages: MetadataRoute.Sitemap = CORE_JOB_SLUGS.map((slug) => ({
    url: `${NEXT_PUBLIC_SITE_URL}/earn/${slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.95,
  }));

  // 4. Parameterized AI Localized Pages
  const parameterizedAILocalizedPages: MetadataRoute.Sitemap = ["kenya", "uganda", "ghana"].map((country) => ({
    url: `${NEXT_PUBLIC_SITE_URL}/earn/ai-training?country=${country}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.95,
  }));

  // 5. Country pages: FIXED to match /earn/country/[country]
  const countryPages: MetadataRoute.Sitemap = MARKETS.map((market) => ({
    url: `${NEXT_PUBLIC_SITE_URL}/earn/country/${market.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.95,
  }));

  // 6. City pages: FIXED to match /earn/country/[country]/[city]
  const cityPages: MetadataRoute.Sitemap = getAllCityParams().map(
    ({ market, city }) => ({
      url: `${NEXT_PUBLIC_SITE_URL}/earn/country/${market.slug}/${city.slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    })
  );

  // 7. Job type matrix root pages: FIXED to match /earn/job/[jobSlug]
  const jobRootPages: MetadataRoute.Sitemap = JOB_TYPES.map((job) => ({
    url: `${NEXT_PUBLIC_SITE_URL}/earn/job/${job.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  // 8. Job × country pages: FIXED to match /earn/job/[jobSlug]/[country]
  const jobCountryPages: MetadataRoute.Sitemap = getAllJobCountryParams().map(
    ({ market, jobType }) => ({
      url: `${NEXT_PUBLIC_SITE_URL}/earn/job/${jobType.slug}/${market.slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    })
  );

  // 9. Map live Sanity data directly into sitemap format
  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${NEXT_PUBLIC_SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.lastModified).toISOString(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  // 10. Combine layouts and enforce uniqueness
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