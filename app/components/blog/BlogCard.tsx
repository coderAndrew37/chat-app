import Link from "next/link";
import Image from "next/image";
import { BlogPost } from "@/types/blog";

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  // Safe image resolution
  const mainImage =
    typeof post.mainImage === "string" ? post.mainImage : "/placeholder.jpg";
  const authorImage =
    typeof post.author?.image === "string"
      ? post.author.image
      : "/placeholder.jpg";

  return (
    <Link href={`/blog/${post.slug}`} className="group flex flex-col h-full">
      {/* Image Container */}
      <div className="relative aspect-[16/10] rounded-[2.5rem] overflow-hidden mb-6 bg-slate-100 border border-slate-100">
        <Image
          src={mainImage}
          alt={post.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Category Overlay */}
        <div className="absolute top-4 left-4">
          <span className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-slate-900 shadow-sm">
            {post.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow">
        <h3 className="text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors duration-300 leading-tight mb-3">
          {post.title}
        </h3>

        <p className="text-slate-500 line-clamp-2 font-light mb-6 leading-relaxed">
          {post.excerpt}
        </p>

        {/* Author & Meta */}
        <div className="mt-auto flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-slate-200 overflow-hidden relative border border-slate-100">
            <Image
              src={authorImage}
              alt={post.author?.name || "Author"}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-slate-900">
              {post.author?.name}
            </span>
            <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">
              {post.readTime} min read
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
