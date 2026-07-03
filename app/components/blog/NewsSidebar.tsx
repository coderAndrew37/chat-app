import { BlogPost } from "@/types/blog";
import Image from "next/image";
import Link from "next/link";

interface NewsSidebarProps {
  posts: BlogPost[];
}

function SidebarCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex gap-3 items-start py-4 border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition-colors -mx-2 px-2 rounded-lg"
    >
      {/* Thumbnail */}
      <div className="relative w-20 h-16 rounded-lg overflow-hidden bg-gray-100 shrink-0">
        {post.mainImage ? (
          <Image
            src={post.mainImage as string}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="80px"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-rose-100 to-pink-50" />
        )}
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        {post.category && (
          <span className="text-[10px] font-bold uppercase tracking-wider text-rose-500 block mb-1">
            {post.category}
          </span>
        )}
        <h4 className="text-xs font-bold text-gray-800 leading-snug group-hover:text-rose-500 transition-colors line-clamp-3">
          {post.title}
        </h4>
      </div>
    </Link>
  );
}

export function NewsSidebar({ posts }: NewsSidebarProps) {
  if (!posts || posts.length === 0) return null;

  return (
    <div className="space-y-6">
      {/* Latest News block */}
      <div className="border border-gray-200 rounded-2xl overflow-hidden">
        <div className="bg-gray-900 px-4 py-3">
          <h3 className="text-xs font-black uppercase tracking-widest text-white">
            Latest News
          </h3>
        </div>
        <div className="px-2 py-1 divide-y divide-gray-50">
          {posts.map((post) => (
            <SidebarCard key={post._id} post={post} />
          ))}
        </div>
      </div>

      {/* CTA widget */}
      <div className="bg-rose-500 rounded-2xl p-5 text-white relative overflow-hidden">
        <div className="absolute -top-4 -right-4 w-20 h-20 bg-white/10 rounded-full blur-xl" />
        <div className="relative z-10">
          <p className="text-[10px] font-black uppercase tracking-widest text-rose-200 mb-1">
            Free to join
          </p>
          <h3 className="text-base font-extrabold leading-snug mb-2">
            Earn from your phone — paid to M-Pesa
          </h3>
          <p className="text-rose-100 text-xs mb-4 leading-relaxed">
            No experience needed. Withdraw any time.
          </p>
          <Link
            href="/join"
            className="block text-center bg-white text-rose-500 font-bold text-xs px-4 py-2.5 rounded-full hover:bg-rose-50 transition-colors"
          >
            Apply — It&apos;s Free
          </Link>
        </div>
      </div>
    </div>
  );
}