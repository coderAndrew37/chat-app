// app/blog/page.tsx (updated)
import {
    getCategories,
    getFeaturedPost,
    getPostsCount,
    getPostsPaginated,
} from "@/lib/api";
import { BLOG_PAGE_SIZE } from "@/lib/blog/constants";
import Link from "next/link";
import { Suspense } from "react";
import { CategorySection } from "../components/blog/BlogCategorySection";
import { BlogGrid } from "../components/blog/BlogGrid";
import { FeaturedCard, SidebarPostCard } from "../components/blog/PostCards";
import SearchBar from "../components/blog/SearchBar";
import {
    CategorySectionSkeleton,
    FeaturedCardSkeleton,
    GridSkeleton,
    SidebarSkeleton,
} from "../components/blog/Skeleton";

const SECTION_POST_COUNT = 9;

import { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://www.velloearn.co.ke";

// Define the precise type matching Next.js App Router metadata conventions
export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { category } = await searchParams;
  
  const title = category 
    ? `${category} Tips & Strategies | VelloEarn Blog`
    : "VelloEarn Blog | Online Earning Strategies, Guides & Tips in Kenya";
    
  const description = category
    ? `Discover the best working strategies, expert guides, and tips for ${category} online. Start optimization setups with VelloEarn.`
    : "Master online tasks, AI training, surveys, and remote digital opportunities. Explore free expert guides curated to optimize your digital side hustles in Kenya.";

  const canonicalUrl = category 
    ? `${BASE_URL}/blog?category=${encodeURIComponent(category)}`
    : `${BASE_URL}/blog`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "VelloEarn",
      type: "website",
      images: [
        {
          url: `${BASE_URL}/og-cover.png`, // Ensure you have a global meta image asset here
          width: 1200,
          height: 630,
          alt: "VelloEarn Blog Hub Cover",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${BASE_URL}/og-cover.png`],
    },
  };
}

interface Props {
  searchParams: Promise<{ category?: string }>;
}

function CategoryFilter({ categories, active }: { categories: string[]; active: string }) {
  return (
    <div className="flex flex-wrap gap-2">
      <Link
        href="/blog"
        className={`text-xs font-bold px-4 py-2 rounded-full border transition-all ${
          active === ""
            ? "bg-rose-500 text-white border-rose-500 shadow-md shadow-rose-100"
            : "bg-white text-gray-500 border-gray-200 hover:border-rose-200 hover:text-rose-500"
        }`}
      >
        All
      </Link>
      {categories.map((cat) => (
        <Link
          key={cat}
          href={`/blog?category=${encodeURIComponent(cat)}`}
          className={`text-xs font-bold px-4 py-2 rounded-full border transition-all ${
            active === cat
              ? "bg-rose-500 text-white border-rose-500 shadow-md shadow-rose-100"
              : "bg-white text-gray-500 border-gray-200 hover:border-rose-200 hover:text-rose-500"
          }`}
        >
          {cat}
        </Link>
      ))}
    </div>
  );
}

async function FeaturedSection() {
  const featured = await getFeaturedPost();
  if (!featured) return null;
  return <FeaturedCard post={featured} />;
}

async function CategorySectionLoader({ category }: { category: string }) {
  const posts = await getPostsPaginated(0, SECTION_POST_COUNT, { category });
  return <CategorySection category={category} posts={posts} />;
}

async function MainGridSection({ category }: { category: string }) {
  const [posts, totalCount] = await Promise.all([
    getPostsPaginated(0, BLOG_PAGE_SIZE, { category, excludeFeatured: !category }),
    getPostsCount({ category, excludeFeatured: !category }),
  ]);
  return <BlogGrid initialPosts={posts} totalCount={totalCount} category={category} />;
}

async function SidebarSection() {
  const latest = await getPostsPaginated(0, 5, { excludeFeatured: true });
  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-4">
      <div className="px-2 pb-3 mb-1 border-b border-gray-50">
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
          Latest Posts
        </span>
      </div>
      <div className="divide-y divide-gray-50">
        {latest.map((post) => (
          <SidebarPostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}

function NewsletterCTA() {
  return (
    <div className="bg-rose-500 rounded-3xl p-6 text-white relative overflow-hidden">
      <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-rose-200">
            One-time setup
          </span>
          <h3 className="text-xl font-extrabold mt-1 leading-snug">
            Start earning from your phone today
          </h3>
          <p className="text-rose-100 text-sm mt-1">
            Join our community and start earning rewards today.
          </p>
        </div>
        <Link
          href="/join"
          className="shrink-0 text-center bg-white text-rose-500 font-bold text-sm px-6 py-3 rounded-full shadow-md hover:bg-rose-50 transition-colors"
        >
          Apply — It&apos;s Free
        </Link>
      </div>
    </div>
  );
}

export default async function BlogPage({ searchParams }: Props) {
  const { category } = await searchParams;
  const activeCategory = category ?? "";
  const categories = await getCategories();

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-rose-50 via-white to-pink-50 border-b border-gray-100 pt-24 pb-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-rose-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="max-w-2xl">
              <span className="text-rose-500 font-semibold text-sm uppercase tracking-wider">
                VelloEarn Blog
              </span>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mt-2 mb-4 tracking-tight leading-tight">
                Tips, guides &amp; earning strategies
              </h1>
              <p className="text-gray-500 text-lg leading-relaxed">
                Everything you need to earn more from home — from AI training to
                survey tricks, straight from the VelloEarn team.
              </p>
            </div>
            
            {/* Search Bar */}
            <div className="w-full md:w-auto md:shrink-0">
              <SearchBar />
            </div>
          </div>
          
          {categories.length > 0 && (
            <div className="mt-8">
              <CategoryFilter categories={categories} active={activeCategory} />
            </div>
          )}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {activeCategory ? (
          <div className="flex flex-col lg:flex-row gap-10">
            <div className="flex-1 min-w-0">
              <Suspense key={activeCategory} fallback={<GridSkeleton />}>
                <MainGridSection category={activeCategory} />
              </Suspense>
            </div>

            <aside className="w-full lg:w-72 shrink-0 space-y-6 lg:sticky lg:top-24 lg:self-start">
              <Suspense fallback={<SidebarSkeleton />}>
                <SidebarSection />
              </Suspense>
              <NewsletterCTA />
            </aside>
          </div>
        ) : (
          <>
            <div className="mb-10">
              <Suspense fallback={<FeaturedCardSkeleton />}>
                <FeaturedSection />
              </Suspense>
            </div>

            <div className="mb-10">
              <NewsletterCTA />
            </div>

            {categories.map((cat) => (
              <Suspense key={cat} fallback={<CategorySectionSkeleton />}>
                <CategorySectionLoader category={cat} />
              </Suspense>
            ))}
          </>
        )}
      </div>
    </main>
  );
}