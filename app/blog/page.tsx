import Image from "next/image";
import Link from "next/link";
import { getPosts, getFeaturedPost } from "@/lib/api";
import { BlogPost } from "@/types/blog";
import { formatDate } from "@/lib/utils";
// ─── Sub-components ───────────────────────────────────────────────────────────

function CategoryBadge({ category }: { category?: string }) {
  if (!category) return null;
  return (
    <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-rose-500 bg-rose-50 px-3 py-1 rounded-full">
      {category}
    </span>
  );
}

function FeaturedCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group relative bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col lg:flex-row"
    >
      {/* Image */}
      <div className="relative w-full lg:w-3/5 aspect-[16/10] lg:aspect-auto lg:min-h-[420px] overflow-hidden bg-gray-100">
        {post.mainImage ? (
          <Image
            src={post.mainImage as string}
            alt={post.title}
            fill
            priority
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 60vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-rose-100 to-pink-50" />
        )}
        {/* Featured pill */}
        <div className="absolute top-4 left-4">
          <span className="flex items-center gap-1.5 bg-rose-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
            Featured
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-8 lg:p-10 flex flex-col justify-center gap-4">
        <CategoryBadge category={post.category} />

        <h2 className="text-2xl lg:text-3xl font-extrabold text-gray-900 leading-tight tracking-tight group-hover:text-rose-500 transition-colors">
          {post.title}
        </h2>

        {post.excerpt && (
          <p className="text-gray-500 leading-relaxed text-sm lg:text-base line-clamp-3">
            {post.excerpt}
          </p>
        )}

        <div className="flex items-center gap-3 pt-2">
          {post.author?.image && (
            <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-rose-100 shrink-0">
              <Image
                src={post.author.image as string}
                alt={post.author.name}
                fill
                className="object-cover"
                sizes="32px"
              />
            </div>
          )}
          <div className="flex flex-col">
            {post.author?.name && (
              <span className="text-xs font-semibold text-gray-700">
                {post.author.name}
              </span>
            )}
            {post.publishedAt && (
              <span className="text-xs text-gray-400">
                {formatDate(post.publishedAt)}
              </span>
            )}
          </div>
          <span className="ml-auto flex items-center gap-1 text-rose-500 text-sm font-bold group-hover:translate-x-1 transition-transform">
            Read
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}

function PostCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col"
    >
      {/* Image */}
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-gray-100">
        {post.mainImage ? (
          <Image
            src={post.mainImage as string}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-rose-50 to-pink-50" />
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <CategoryBadge category={post.category} />

        <h3 className="text-base font-extrabold text-gray-900 leading-snug tracking-tight group-hover:text-rose-500 transition-colors line-clamp-2">
          {post.title}
        </h3>

        {post.excerpt && (
          <p className="text-sm text-gray-400 leading-relaxed line-clamp-2 flex-1">
            {post.excerpt}
          </p>
        )}

        <div className="flex items-center justify-between pt-1 border-t border-gray-50 mt-auto">
          <div className="flex items-center gap-2">
            {post.author?.image && (
              <div className="relative w-6 h-6 rounded-full overflow-hidden border border-rose-100 shrink-0">
                <Image
                  src={post.author.image as string}
                  alt={post.author.name}
                  fill
                  className="object-cover"
                  sizes="24px"
                />
              </div>
            )}
            <span className="text-xs text-gray-400">
              {post.author?.name}
            </span>
          </div>
          {post.publishedAt && (
            <span className="text-xs text-gray-300">
              {formatDate(post.publishedAt)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

function SidebarPostCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex gap-4 items-start p-4 rounded-2xl hover:bg-rose-50/50 transition-colors"
    >
      {/* Thumbnail */}
      <div className="relative w-20 h-16 rounded-xl overflow-hidden bg-gray-100 shrink-0">
        {post.mainImage ? (
          <Image
            src={post.mainImage as string}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="80px"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-rose-100 to-pink-50" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <CategoryBadge category={post.category} />
        <h4 className="text-sm font-bold text-gray-900 leading-snug mt-1 group-hover:text-rose-500 transition-colors line-clamp-2">
          {post.title}
        </h4>
        {post.publishedAt && (
          <span className="text-xs text-gray-400 mt-1 block">
            {formatDate(post.publishedAt)}
          </span>
        )}
      </div>
    </Link>
  );
}

// ─── Category Filter (server-safe: uses search params) ────────────────────────

function CategoryFilter({
  categories,
  active,
}: {
  categories: string[];
  active: string;
}) {
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

// ─── Page ────────────────────────────────────────────────────────────────────

interface Props {
  searchParams: Promise<{ category?: string }>;
}

export default async function BlogPage({ searchParams }: Props) {
  const { category } = await searchParams;

  const [allPosts, featuredPost] = await Promise.all([
    getPosts(50),
    getFeaturedPost(),
  ]);

  // Derive unique categories from posts
  const categories = Array.from(
    new Set(allPosts.map((p) => p.category).filter(Boolean) as string[])
  );

  // Filter by category if selected
  const filtered = category
    ? allPosts.filter((p) => p.category === category)
    : allPosts;

  // Main column: first 6 (or all if filtered)
  const mainPosts = filtered.filter((p) => p._id !== featuredPost?._id).slice(0, 6);

  // Sidebar: latest 5 posts regardless of filter (for the "Latest" sidebar)
  const sidebarPosts = allPosts
    .filter((p) => p._id !== featuredPost?._id)
    .slice(0, 5);

  return (
    <main className="min-h-screen bg-gray-50">

      {/* ── Header ─────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-rose-50 via-white to-pink-50 border-b border-gray-100 pt-24 pb-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-rose-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
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

          {/* Category filter */}
          {categories.length > 0 && (
            <div className="mt-8">
              <CategoryFilter categories={categories} active={category ?? ""} />
            </div>
          )}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* ── Featured post (only when no category filter active) ── */}
        {!category && featuredPost && (
          <div className="mb-12">
            <FeaturedCard post={featuredPost} />
          </div>
        )}

        {/* ── Magazine grid + sidebar ─────────────────────────────── */}
        <div className="flex flex-col lg:flex-row gap-10">

          {/* Main column */}
          <div className="flex-1 min-w-0">
            {mainPosts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <span className="text-5xl mb-4">📭</span>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  No posts in this category yet
                </h3>
                <p className="text-gray-400 text-sm mb-6">
                  Check back soon — we publish every week.
                </p>
                <Link
                  href="/blog"
                  className="text-sm font-bold text-rose-500 hover:text-rose-600 underline underline-offset-4"
                >
                  Browse all posts →
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {mainPosts.map((post) => (
                  <PostCard key={post._id} post={post} />
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="w-full lg:w-72 shrink-0 space-y-6">

            {/* Latest posts */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-4">
              <div className="px-2 pb-3 mb-1 border-b border-gray-50">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                  Latest Posts
                </span>
              </div>
              <div className="divide-y divide-gray-50">
                {sidebarPosts.map((post) => (
                  <SidebarPostCard key={post._id} post={post} />
                ))}
              </div>
            </div>

            {/* Newsletter / CTA widget */}
            <div className="bg-rose-500 rounded-3xl p-6 text-white relative overflow-hidden">
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
              <div className="relative z-10">
                <span className="text-[10px] font-black uppercase tracking-widest text-rose-200">
                  Free to join
                </span>
                <h3 className="text-xl font-extrabold mt-1 mb-2 leading-snug">
                  Start earning from your phone today
                </h3>
                <p className="text-rose-100 text-sm mb-5 leading-relaxed">
                  No experience needed. Paid to M-Pesa.
                </p>
                <Link
                  href="/#apply"
                  className="block text-center bg-white text-rose-500 font-bold text-sm px-5 py-3 rounded-full shadow-md hover:bg-rose-50 transition-colors"
                >
                  Apply — It&apos;s Free
                </Link>
              </div>
            </div>

          </aside>
        </div>
      </div>
    </main>
  );
}