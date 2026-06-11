import { Tag } from "@/types/blog";
import Link from "next/link";

export function TagList({ tags }: { tags: Tag[] }) {
  if (!tags?.length) return null;

  return (
    <div className="mt-12">
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-4">
        Filed under topics
      </p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Link
            key={tag._id}
            href={`/blog/topic/${tag.slug}`}
            className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:border-blue-300 hover:text-blue-600 hover:bg-white transition-all uppercase tracking-tighter"
          >
            # {tag.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
