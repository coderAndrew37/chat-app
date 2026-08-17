// app/blog/[slug]/page.tsx
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
import TrainingChannelBanner from "@/app/components/TrainingChannelBanner";

interface Props {
  params: Promise<{ slug: string }>;
}

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.velloearn.co.ke";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  
  // Clean up any accidental leading/trailing spaces passed down by messy links
  const cleanSlug = slug ? decodeURIComponent(slug).trim() : "";
  const post = await getPostBySlug(cleanSlug);

  if (!post) {
    return {
      robots: { index: false, follow: true }, // Keep non-existent records out of SERPs safely
    };
  }

  // Enforce unified www. canonical routing strategy 
  const canonicalUrl = `${BASE_URL}/blog/${cleanSlug}`;
  const ogImage = post.mainImage ? [{ url: post.mainImage as string }] : [];

  return {
    title: post.seoTitle || `${post.title} | VelloEarn`,
    description: post.excerpt,
    alternates: {
      canonical: canonicalUrl,
    },
    // Forcefully clear out parent layout noindex flags
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: canonicalUrl,
      type: "article",
      publishedTime: post.publishedAt,
      images: ogImage,
      siteName: "VelloEarn",
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
  const cleanSlug = slug ? decodeURIComponent(slug).trim() : "";

  const [post, latestPosts] = await Promise.all([
    getPostBySlug(cleanSlug),
    getPosts(6),
  ]);

  if (!post) notFound();

  const relatedPosts = await getRelatedPosts(post.category || "", post._id);
  const sidebarPosts = latestPosts.filter((p) => p._id !== post._id).slice(0, 5);
  
  const canonicalUrl = `${BASE_URL}/blog/${cleanSlug}`;

  // Fully enriched Schema.org layout for rich card results
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    image: post.mainImage ? [post.mainImage] : [`${BASE_URL}/og-cover.png`],
    datePublished: post.publishedAt,
    dateModified:  post.publishedAt, 
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
    author: {
      "@type": "Person",
      name: post.author?.name || "VelloEarn Team",
    },
    publisher: {
      "@type": "Organization",
      name: "VelloEarn",
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/logo.jpg`, 
      },
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

<TrainingChannelBanner />
      {/* More on [Category] — full width below */}
      <RelatedPosts posts={relatedPosts} category={post.category} />
    </main>
  );
}