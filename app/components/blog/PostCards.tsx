import Image from "next/image";
import Link from "next/link";
import { BlogPost } from "@/types/blog";
import { formatDate } from "@/lib/utils";

export function CategoryBadge({ category }: { category?: string }) {
  if (!category) return null;
  return (
    <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-rose-500 bg-rose-50 px-3 py-1 rounded-full">
      {category}
    </span>
  );
}

function ReadingTime({ minutes }: { minutes?: number }) {
  if (!minutes) return null;
  return <span className="text-xs text-gray-300">{minutes} min read</span>;
}

export function FeaturedCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group relative bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col lg:flex-row"
    >
      <div className="relative w-full lg:w-3/5 aspect-[16/10] lg:aspect-auto lg:min-h-[420px] overflow-hidden bg-gray-100">
        {post.mainImage ? (
          <Image
            src={post.mainImage as string}
            alt={post.title}
            fill
            priority
            placeholder={post.mainImageBlur ? "blur" : "empty"}
            blurDataURL={post.mainImageBlur}
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 60vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-rose-100 to-pink-50" />
        )}
        <div className="absolute top-4 left-4">
          <span className="flex items-center gap-1.5 bg-rose-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
            Featured
          </span>
        </div>
      </div>

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
              <span className="text-xs font-semibold text-gray-700">{post.author.name}</span>
            )}
            <div className="flex items-center gap-2 text-xs text-gray-400">
              {post.publishedAt && <span>{formatDate(post.publishedAt)}</span>}
              {post.estimatedReadingTime && <span>·</span>}
              <ReadingTime minutes={post.estimatedReadingTime} />
            </div>
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

export function PostCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex flex-col"
    >
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-gray-100">
        {post.mainImage ? (
          <Image
            src={post.mainImage as string}
            alt={post.title}
            fill
            placeholder={post.mainImageBlur ? "blur" : "empty"}
            blurDataURL={post.mainImageBlur}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-rose-50 to-pink-50" />
        )}
      </div>

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
          <div className="flex items-center gap-2 min-w-0">
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
            <span className="text-xs text-gray-400 truncate">{post.author?.name}</span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <ReadingTime minutes={post.estimatedReadingTime} />
            {post.publishedAt && (
              <span className="text-xs text-gray-300">{formatDate(post.publishedAt)}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

export function SidebarPostCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex gap-4 items-start p-4 rounded-2xl hover:bg-rose-50/50 transition-colors"
    >
      <div className="relative w-20 h-16 rounded-xl overflow-hidden bg-gray-100 shrink-0">
        {post.mainImage ? (
          <Image
            src={post.mainImage as string}
            alt={post.title}
            fill
            placeholder={post.mainImageBlur ? "blur" : "empty"}
            blurDataURL={post.mainImageBlur}
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
          <span className="text-xs text-gray-400 mt-1 block">{formatDate(post.publishedAt)}</span>
        )}
      </div>
    </Link>
  );
}