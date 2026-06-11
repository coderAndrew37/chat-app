import { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogHeader } from "@/app/components/blog/BlogHeader";
import { AuthorBio } from "@/app/components/blog/AuthorBio";
import { RelatedPosts } from "@/app/components/blog/RelatedPosts";
import CustomPortableText from "@/app/components/blog/PortableTextComponents";
import { getPostBySlug, getRelatedPosts } from "@/lib/api";
import { getHeadings } from "@/lib/blog/heading-parser";
import { BlogClientShell } from "./BlogClient";
import { TagList } from "@/app/components/blog/TagList";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) return {};

  const ogImage = post.seo?.ogImage || post.mainImage;

  return {
    title: post.seo?.metaTitle || `${post.title} | SleekSites`,
    description: post.seo?.metaDescription || post.excerpt,
    keywords: post.seo?.keywords,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      images: ogImage ? [{ url: ogImage as string }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: ogImage ? [ogImage as string] : [],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  // Fetch related content and parse headings in parallel
  const [relatedPosts, headings] = await Promise.all([
    getRelatedPosts(post.category || "", post._id),
    getHeadings(post.body),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    image: post.mainImage,
    datePublished: post.publishedAt,
    author: {
      "@type": "Person",
      name: post.author.name,
    },
    description: post.excerpt,
  };

  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <BlogHeader post={post} />

      <section className="max-w-7xl mx-auto px-6 pb-24">
        <BlogClientShell headings={headings}>
          <CustomPortableText value={post.body} />

          <TagList tags={post.tags || []} />

          <footer className="mt-16 pt-16 border-t border-slate-100">
            <AuthorBio author={post.author} />
          </footer>
        </BlogClientShell>
      </section>

      <RelatedPosts posts={relatedPosts} />
    </main>
  );
}
