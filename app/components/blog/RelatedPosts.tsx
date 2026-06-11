import { BlogPost } from "@/types/blog";
import Image from "next/image";
import Link from "next/link";

interface RelatedPostsProps {
  posts: BlogPost[];
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (!posts || posts.length === 0) return null;

  return (
    <section className="py-24 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tighter mb-4">
              Keep{" "}
              <span className="text-slate-400 font-light italic">Reading.</span>
            </h2>
            <p className="text-lg text-slate-500 font-light">
              Explore more insights on digital strategy and Kenyan tech growth.
            </p>
          </div>
          <Link
            href="/blog"
            className="text-sm font-bold uppercase tracking-widest text-blue-600 border-b-2 border-blue-100 hover:border-blue-600 transition-all pb-1"
          >
            View Journal
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link
              key={post._id}
              href={`/blog/${post.slug}`}
              className="group block"
            >
              <div className="relative aspect-[16/10] rounded-[2rem] overflow-hidden mb-6 bg-slate-100 border border-slate-100">
                <Image
                  src={
                    typeof post.mainImage === "string"
                      ? post.mainImage
                      : "/placeholder.jpg"
                  }
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600">
                  {post.category}
                </span>
                <h3 className="text-xl font-bold text-slate-900 leading-tight group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h3>
                <p className="text-slate-500 text-sm font-light line-clamp-2">
                  {post.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
