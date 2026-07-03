import Image from "next/image";
import Link from "next/link";
import { BlogPost } from "@/types/blog";
import { CategoryBadge } from "./PostCards";

function HeadlineItem({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex items-start justify-between gap-4 py-3 border-b border-gray-50 last:border-0"
    >
      <div className="flex-1 min-w-0">
        <CategoryBadge category={post.category} />
        <h4 className="text-sm font-bold text-gray-900 leading-snug mt-1.5 group-hover:text-rose-500 transition-colors line-clamp-2">
          {post.title}
        </h4>
      </div>
      {post.mainImage && (
        <div className="relative w-16 h-14 rounded-lg overflow-hidden bg-gray-100 shrink-0">
          <Image
            src={post.mainImage as string}
            alt={post.title}
            fill
            placeholder={post.mainImageBlur ? "blur" : "empty"}
            blurDataURL={post.mainImageBlur}
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="64px"
          />
        </div>
      )}
    </Link>
  );
}

function CompactCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300"
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
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-rose-50 to-pink-50" />
        )}
      </div>
      <div className="p-4">
        <CategoryBadge category={post.category} />
        <h4 className="text-sm font-bold text-gray-900 leading-snug mt-1.5 group-hover:text-rose-500 transition-colors line-clamp-2">
          {post.title}
        </h4>
      </div>
    </Link>
  );
}

function SectionFeature({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300"
    >
      <div className="relative w-full aspect-[16/9] overflow-hidden bg-gray-100">
        {post.mainImage ? (
          <Image
            src={post.mainImage as string}
            alt={post.title}
            fill
            placeholder={post.mainImageBlur ? "blur" : "empty"}
            blurDataURL={post.mainImageBlur}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 45vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-rose-100 to-pink-50" />
        )}
      </div>
      <div className="p-5">
        <CategoryBadge category={post.category} />
        <h3 className="text-xl font-extrabold text-gray-900 leading-tight tracking-tight mt-2 group-hover:text-rose-500 transition-colors line-clamp-2">
          {post.title}
        </h3>
        {post.excerpt && (
          <p className="text-gray-500 text-sm leading-relaxed mt-2 line-clamp-2">
            {post.excerpt}
          </p>
        )}
      </div>
    </Link>
  );
}

export function CategorySection({
  category,
  posts,
}: {
  category: string;
  posts: BlogPost[];
}) {
  if (posts.length === 0) return null;

  // First post is the big feature, next 6 fill the headline list,
  // the last 2 (if present) become compact cards under the feature.
  const [feature, ...rest] = posts;
  const listItems = rest.slice(0, 6);
  const compactItems = rest.slice(6, 8);

  return (
    <section className="py-10 border-t border-gray-100 first:border-t-0 first:pt-0">
      <h2 className="text-xl font-extrabold text-gray-900 tracking-tight relative pl-4 mb-6 before:content-[''] before:absolute before:left-0 before:top-0.5 before:bottom-0.5 before:w-1 before:bg-rose-500 before:rounded-full">
        {category}
      </h2>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left: feature + compact row */}
        <div className="lg:w-2/3 space-y-6">
          <SectionFeature post={feature} />
          {compactItems.length > 0 && (
            <div className="grid grid-cols-2 gap-4">
              {compactItems.map((post) => (
                <CompactCard key={post._id} post={post} />
              ))}
            </div>
          )}
        </div>

        {/* Right: headline list */}
        {listItems.length > 0 && (
          <div className="lg:w-1/3 bg-white rounded-2xl border border-gray-100 p-5 flex flex-col">
            <div className="divide-y divide-gray-50">
              {listItems.map((post) => (
                <HeadlineItem key={post._id} post={post} />
              ))}
            </div>
            <Link
              href={`/blog?category=${encodeURIComponent(category)}`}
              className="mt-4 block text-center bg-rose-500 text-white font-bold text-sm px-5 py-3 rounded-full hover:bg-rose-600 transition-colors"
            >
              Click for more {category}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}