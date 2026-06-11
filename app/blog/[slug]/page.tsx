import { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogHeader } from "@/app/components/blog/BlogHeader";
import { AuthorBio } from "@/app/components/blog/AuthorBio";
import { RelatedPosts } from "@/app/components/blog/RelatedPosts";
import CustomPortableText from "@/app/components/blog/PortableTextComponents";
import { getPostBySlug, getRelatedPosts, getPosts } from "@/lib/api";
import { BlogClientShell } from "./BlogClient";
import { TagList } from "@/app/components/blog/TagList";
import { NewsSidebar } from "@/app/components/blog/NewsSidebar";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) return {};

  return {
    title: post.seoTitle || `${post.title} | VelloEarn`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      images: post.mainImage ? [{ url: post.mainImage as string }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: post.mainImage ? [post.mainImage as string] : [],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  const [post, latestPosts] = await Promise.all([
    getPostBySlug(slug),
    getPosts(6),
  ]);

  if (!post) notFound();

  const relatedPosts = await getRelatedPosts(post.category || "", post._id);

  const sidebarPosts = latestPosts.filter((p) => p._id !== post._id).slice(0, 5);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    image: post.mainImage,
    datePublished: post.publishedAt,
    author: {
      "@type": "Person",
      name: post.author?.name,
    },
    description: post.excerpt,
  };

  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Thin top border in rose to brand the page */}
      <div className="h-1 w-full bg-rose-500" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-24">
        <div className="flex flex-col lg:flex-row gap-12 xl:gap-16">

          {/* ── Main Article Column ── */}
          <div className="w-full lg:max-w-[680px] min-w-0">
            <BlogHeader post={post} />

            <BlogClientShell>
              <CustomPortableText value={post.body} />
            </BlogClientShell>

            <div className="mt-8">
              <TagList tags={post.tags || []} />
            </div>

            <div className="mt-12 pt-10 border-t border-gray-100">
              <AuthorBio author={post.author} />
            </div>
          </div>

          {/* ── Right Sidebar ── */}
          <aside className="w-full lg:w-80 xl:w-96 shrink-0">
            <div className="lg:sticky lg:top-8">
              <NewsSidebar posts={sidebarPosts} />
            </div>
          </aside>

        </div>
      </div>

      {/* More on [Category] — full width below */}
      <RelatedPosts posts={relatedPosts} category={post.category} />
    </main>
  );
}