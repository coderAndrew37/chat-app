import { BlogPost, CustomImage } from "@/types/blog";
import Image from "next/image";

export function BlogHeader({ post }: { post: BlogPost }) {
  const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  /**
   * Refined helper to extract a string URL from our
   * complex CustomImage object or a direct string.
   */
  const getImgSrc = (
    imageSource: CustomImage | string | null | undefined,
  ): string => {
    if (!imageSource) return "/placeholder.jpg";

    // If it's already a string, return it
    if (typeof imageSource === "string") return imageSource;

    // If it's a CustomImage object, return the assetUrl
    if (imageSource.assetUrl) return imageSource.assetUrl;

    return "/placeholder.jpg";
  };

  return (
    <header className="pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-4 mb-8">
          <span className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest">
            {post.category}
          </span>
          <span className="text-slate-400 text-sm font-light">
            {formattedDate}
          </span>
          <span className="text-slate-300">•</span>
          <span className="text-slate-400 text-sm font-light">
            {post.readTime} min read
          </span>
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-slate-900 leading-[0.9] mb-12 max-w-5xl">
          {post.title}
        </h1>

        {/* Author & Excerpt Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end mb-16">
          <div className="lg:col-span-4 flex items-center gap-4">
            <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
              <Image
                src={getImgSrc(post.author.image)}
                alt={post.author.name}
                fill
                className="object-cover grayscale"
              />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">
                {post.author.name}
              </p>
              <p className="text-xs text-slate-500 font-light">
                {post.author.role}
              </p>
            </div>
          </div>
          <div className="lg:col-span-8">
            <p className="text-xl md:text-2xl text-slate-600 font-light leading-relaxed max-w-3xl">
              {post.excerpt}
            </p>
          </div>
        </div>

        {/* Hero Figure Section */}
        <figure className="group">
          <div className="relative aspect-video w-full rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-100 bg-slate-50">
            <Image
              src={getImgSrc(post.mainImage)}
              alt={post.title}
              fill
              priority
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="100vw"
            />
          </div>

          {/* Hero Image Caption & Source */}
          {(post.mainImageCaption || post.mainImageSource) && (
            <figcaption className="mt-6 flex flex-col md:flex-row md:justify-between items-baseline gap-4 px-4">
              {post.mainImageCaption && (
                <p className="text-sm text-slate-500 font-light italic max-w-2xl">
                  — {post.mainImageCaption}
                </p>
              )}
              {post.mainImageSource && (
                <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold whitespace-nowrap">
                  Source:{" "}
                  <span className="text-slate-300">{post.mainImageSource}</span>
                </p>
              )}
            </figcaption>
          )}
        </figure>
      </div>
    </header>
  );
}
