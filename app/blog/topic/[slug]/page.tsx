import { Metadata } from 'next';
import Link from 'next/link';

// --- Interfaces ---
interface Post {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  excerpt?: string;
  publishedAt: string;
  coverImage?: string;
  tags?: string[];
}

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Optional helper to format slug back to clean title (e.g., 'wafanyakazi-wa-maofisini' -> 'Wafanyakazi Wa Maofisini')
function formatSlugToTitle(slug: string): string {
  return decodeURIComponent(slug)
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

// --- Data Fetcher ---
async function getPostsByTopic(topicSlug: string): Promise<Post[]> {
  const decodedSlug = decodeURIComponent(topicSlug);

  // Example Sanity GROQ Query:
  // Match posts where the tag array contains the slug or formatted tag name
  /*
  const query = `*[_type == "post" && ($slug in tags[] || $slug in tags[]->slug.current)] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    "coverImage": mainImage.asset->url,
    tags
  }`;
  return await client.fetch<Post[]>(query, { slug: decodedSlug });
  */

  // Replace this mock return with your actual DB/Sanity fetch logic
  return [];
}

// --- Dynamic Metadata ---
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const topicTitle = formatSlugToTitle(slug);

  return {
    title: `${topicTitle} Articles | Blog`,
    description: `Browse all articles and resources tagged under ${topicTitle}.`,
  };
}

// --- Main Page Component ---
export default async function TopicPage({ params }: PageProps) {
  const { slug } = await params;
  const topicTitle = formatSlugToTitle(slug);
  const posts = await getPostsByTopic(slug);

  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <header className="mb-10 border-b pb-6">
        <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
          Topic / Tag
        </p>
        <h1 className="text-4xl font-bold text-gray-900 capitalize mt-1">
          {topicTitle}
        </h1>
        <p className="text-gray-600 mt-2">
          Showing {posts.length} {posts.length === 1 ? 'article' : 'articles'} in this category.
        </p>
      </header>

      {posts.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-lg border border-dashed">
          <h2 className="text-lg font-medium text-gray-700">
            No articles found for &apos;{topicTitle}&apos;
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Check back later or explore other topics.
          </p>
          <Link
            href="/blog"
            className="inline-block mt-4 text-sm text-blue-600 font-medium hover:underline"
          >
            ← Back to all posts
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article
              key={post._id}
              className="flex flex-col border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              {post.coverImage && (
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6 flex flex-col flex-1">
                <time className="text-xs text-gray-500 mb-2">
                  {new Date(post.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
                <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                  <Link
                    href={`/blog/${post.slug.current}`}
                    className="hover:text-blue-600 transition-colors"
                  >
                    {post.title}
                  </Link>
                </h2>
                {post.excerpt && (
                  <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                    {post.excerpt}
                  </p>
                )}
                <div className="mt-auto pt-4 border-t">
                  <Link
                    href={`/blog/${post.slug.current}`}
                    className="text-sm font-semibold text-blue-600 hover:text-blue-800"
                  >
                    Read article →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}