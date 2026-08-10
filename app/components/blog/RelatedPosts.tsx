import { urlFor } from "@/lib/sanity/client";
import { BlogPost } from "@/types/blog";
import Image from "next/image";
import Link from "next/link";

interface RelatedPostsProps {
  posts: BlogPost[];
  category?: string;
}

export function RelatedPosts({ posts, category }: RelatedPostsProps) {
  if (!posts || posts.length === 0) return null;

  // Helper to extract a valid image URL whether mainImage is a string or Sanity asset object
  const getImageUrl = (image: unknown): string | null => {
    if (!image) return null;
    if (typeof image === "string" && image.trim() !== "") return image;

    if (typeof image === "object" && image !== null && "asset" in image) {
      try {
        return urlFor(image).width(800).fit("max").url();
      } catch (err) {
        console.error("Failed to build image URL:", err);
        return null;
      }
    }

    return null;
  };

  return (
    <section className="border-t border-gray-200 bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-sm font-black uppercase tracking-widest text-gray-900">
            More on{" "}
            <span className="text-rose-500">{category || "VelloEarn"}</span>
          </h2>
          <Link
            href="/blog"
            className="text-xs font-bold text-rose-500 hover:text-rose-600 underline underline-offset-4"
          >
            View all →
          </Link>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => {
            const imageUrl = getImageUrl(post.mainImage) || "/placeholder.jpg";

            return (
              <Link
                key={post._id}
                href={`/blog/${post.slug}`}
                className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                {/* Image Container */}
                <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                  <Image
                    src={imageUrl}
                    alt={post.title || "Blog post preview"}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>

                {/* Content */}
                <div className="p-4">
                  {post.category && (
                    <span className="text-[10px] font-bold uppercase tracking-wider text-rose-500 block mb-1">
                      {post.category}
                    </span>
                  )}
                  <h3 className="text-sm font-bold text-gray-900 leading-snug group-hover:text-rose-500 transition-colors line-clamp-2 mb-2">
                    {post.title}
                  </h3>
                  {post.publishedAt && (
                    <p className="text-xs text-gray-400">
                      {new Date(post.publishedAt).toLocaleDateString("en-KE", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}