import { BlogPost, CustomImage } from "@/types/blog";
import Image from "next/image";

const getImgSrc = (
  imageSource: CustomImage | string | null | undefined,
): string => {
  if (!imageSource) return "/placeholder.jpg";
  if (typeof imageSource === "string") return imageSource;
  if (imageSource.assetUrl) return imageSource.assetUrl;
  return "/placeholder.jpg";
};

const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString("en-KE", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export function BlogHeader({ post }: { post: BlogPost }) {
  return (
    <header className="mb-8">

      {/* ── Meta row: category · date · author ── */}
      <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 mb-5">
        {post.category && (
          <>
            <span className="text-rose-500 font-semibold text-xs uppercase tracking-wider">
              {post.category}
            </span>
            <span className="text-gray-300">·</span>
          </>
        )}
        {post.publishedAt && (
          <>
            <time className="text-gray-400 text-xs">
              {formatDate(post.publishedAt)}
            </time>
            <span className="text-gray-300">·</span>
          </>
        )}
        {post.author?.name && (
          <span className="text-xs text-gray-500">
            By{" "}
            <span className="font-semibold text-gray-700">
              {post.author.name}
            </span>
          </span>
        )}
      </div>

      {/* ── H1 ── */}
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading text-gray-900 leading-tight tracking-tight mb-5">
        {post.title}
      </h1>

      {/* ── Excerpt / standfirst ── */}
      {post.excerpt && (
        <p className="text-base sm:text-lg text-gray-500 leading-relaxed border-l-4 border-rose-400 pl-4 mb-8 font-normal">
          {post.excerpt}
        </p>
      )}

      {/* ── Hero image — full width, below headline ── */}
      {post.mainImage && (
        <figure className="mb-6">
          <div className="relative w-full aspect-[16/9] overflow-hidden rounded-xl bg-gray-100">
            <Image
              src={getImgSrc(post.mainImage)}
              alt={post.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 65vw"
            />
          </div>
          {(post.mainImageCaption || post.mainImageSource) && (
            <figcaption className="mt-2 flex flex-col sm:flex-row sm:justify-between gap-1 text-xs text-gray-400 px-1">
              {post.mainImageCaption && (
                <span className="italic">{post.mainImageCaption}</span>
              )}
              {post.mainImageSource && (
                <span className="font-semibold uppercase tracking-wider">
                  {post.mainImageSource}
                </span>
              )}
            </figcaption>
          )}
        </figure>
      )}

    </header>
  );
}