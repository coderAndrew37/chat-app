import { Author } from "@/types/blog";
import Image from "next/image";
import Link from "next/link";

export function AuthorBio({ author }: { author: Author }) {
  if (!author) return null;

  return (
    <div className="flex items-center gap-4">
      {/* Avatar */}
      {author.image && (
        <div className="relative w-12 h-12 rounded-full overflow-hidden border border-gray-200 shrink-0">
          <Image
            src={
              typeof author.image === "string"
                ? author.image
                : "/placeholder.jpg"
            }
            alt={author.name}
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Name + role + link */}
      <div className="flex-1 min-w-0">
        <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-0.5">
          Author
        </p>
        <p className="text-sm font-bold text-gray-900">{author.name}</p>
        {author.role && (
          <p className="text-xs text-gray-400">{author.role}</p>
        )}
      </div>

      <Link
        href={`/blog?author=${encodeURIComponent(author.name)}`}
        className="shrink-0 text-xs font-bold text-rose-500 border border-rose-200 hover:bg-rose-500 hover:text-white hover:border-rose-500 transition-all px-4 py-2 rounded-full"
      >
        View all posts
      </Link>
    </div>
  );
}