// app/blog/search/page.tsx
import { Suspense } from "react";
import Link from "next/link";
import { searchPosts } from "@/lib/actions/search";
import { BlogGrid } from "@/app/components/blog/BlogGrid";
import { GridSkeleton } from "@/app/components/blog/Skeleton";
import SearchBar from "@/app/components/blog/SearchBar";

interface Props {
  searchParams: Promise<{ q?: string }>;
}

async function SearchResults({ query }: { query: string }) {
  if (!query || query.length < 2) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">Enter at least 2 characters to search</p>
      </div>
    );
  }

  const posts = await searchPosts(query);

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">No posts found for &quot;{query}&quot;</p>
        <p className="text-sm text-gray-300 mt-2">Try a different search term</p>
      </div>
    );
  }

  return (
    <>
      <p className="text-sm text-gray-400 mb-6">
        Found {posts.length} result{posts.length > 1 ? "s" : ""} for &quot;{query}&quot;
      </p>
      <BlogGrid initialPosts={posts} totalCount={posts.length} category="" />
    </>
  );
}

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams;
  const query = q || "";

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-rose-50 via-white to-pink-50 border-b border-gray-100 pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-600 transition"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Blog
              </Link>
              <h1 className="text-3xl font-extrabold text-gray-900 mt-3">
                Search Results
              </h1>
            </div>
            <div className="w-full md:w-80">
              <SearchBar />
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Suspense key={query} fallback={<GridSkeleton />}>
          <SearchResults query={query} />
        </Suspense>
      </div>
    </main>
  );
}