// app/sitemap.ts
import type { MetadataRoute } from "next";
import { client } from "@/lib/sanity/client"; 
import {
  MARKETS,
  JOB_TYPES,
  getAllCityParams,
  getAllJobCountryParams,
} from "@/lib/seo/keyword-matrix";

const BASE_URL = 
  process.env.NEXT_PUBLIC_SITE_URL || 
  process.env.NEXT_PUBLIC_BASE_URL || 
  "https://www.velloearn.co.ke";

// Revalidate the sitemap layout once every hour via Incremental Static Regeneration
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
    blogPosts = [];
  }

  // 2. Static High-Priority Pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    // CRITICAL: Removed "/join" from this tracking segment to resolve GSC indexing conflicts
  ];

  // 3. Core Job Landing Pages
  // FIXED: Adjusted "swahili-teaching" to "swahili" to accurately mirror your actual page folder structures
  const CORE_JOB_SLUGS = [
    "chatting",
    "ai-training",
    "swahili",
    "surveys",
    "forex",
    "academic-writing"
  ];
  
  const coreJobPages: MetadataRoute.Sitemap = CORE_JOB_SLUGS.map((slug) => ({
    url: `${BASE_URL}/earn/${slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.95,
  }));

  // 4. Parameterized Regional Variations
  const targetRegions = ["kenya", "uganda", "ghana"];
  const parameterizedLocalizedPages: MetadataRoute.Sitemap = [];

  targetRegions.forEach((country) => {
    // Target country-parameterized paths for your AI segments
    parameterizedLocalizedPages.push({
      url: `${BASE_URL}/earn/ai-training?country=${country}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.95,
    });

    // Target geo-parameterized paths for your Forex and Survey training pages
    ["forex", "surveys"].forEach((slug) => {
      parameterizedLocalizedPages.push({
        url: `${BASE_URL}/earn/${slug}?geo=${country}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.95,
      });
    });
  });

  // 5. Country pages: /earn/country/[country]
  const countryPages: MetadataRoute.Sitemap = MARKETS.map((market) => ({
    url: `${BASE_URL}/earn/country/${market.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.95,
  }));

  // 6. City pages: /earn/country/[country]/[city]
  const cityPages: MetadataRoute.Sitemap = getAllCityParams().map(
    ({ market, city }) => ({
      url: `${BASE_URL}/earn/country/${market.slug}/${city.slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    })
  );

  // 7. Job type matrix root pages: /earn/job/[jobSlug]
  const jobRootPages: MetadataRoute.Sitemap = JOB_TYPES.map((job) => ({
    url: `${BASE_URL}/earn/job/${job.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  // 8. Job × country pages: /earn/job/[jobSlug]/[country]
  const jobCountryPages: MetadataRoute.Sitemap = getAllJobCountryParams().map(
    ({ market, jobType }) => ({
      url: `${BASE_URL}/earn/job/${jobType.slug}/${market.slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    })
  );

  // 9. Sanity Blog Post Entries
  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.lastModified).toISOString(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  // 10. Accumulate systems datasets and enforce uniqueness constraints safely
  const allPages = [
    ...staticPages,
    ...coreJobPages,
    ...parameterizedLocalizedPages,
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