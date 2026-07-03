import { BlogPost, Tag } from "@/types/blog";
import { groq } from "next-sanity";
import "server-only";
import { client } from "./sanity/client";

const baseFields = groq`
  _id,
  title,
  "slug": slug.current,
  excerpt,
  seoTitle,
  featured,
  publishedAt,
  "tags": tags[]->{
    _id,
    title,
    "slug": slug.current
  },
  "mainImage": mainImage.asset->url,
  "mainImageAlt": mainImage.alt,
  "mainImageBlur": mainImage.asset->metadata.lqip,
  "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180) + 1,
  "author": author->{
    name,
    "image": image.asset->url,
    bio
  },
  "category": category->title,
  "categorySlug": category->slug.current
`;

// Used for listing pages — no body, so payload stays small
export const postListFields = baseFields;

// Used for single post pages — includes full rich-text body
export const postFields = groq`
  ${baseFields},
  body[]{
    ...,
    _type == "image" => {
      ...,
      "assetUrl": asset->url,
      caption,
      source
    },
    _type == "relatedPost" => {
      ...,
      article->{
        title,
        "slug": slug.current,
        "mainImage": mainImage.asset->url
      }
    },
    _type == "quiz" => {
      ...
    }
  }
`;

interface PostListOptions {
  category?: string;
  excludeFeatured?: boolean;
}

function buildListFilter({ category, excludeFeatured }: PostListOptions) {
  const clauses = [`_type == "post"`];
  if (category) clauses.push(`category->title == $category`);
  if (excludeFeatured) clauses.push(`featured != true`);
  return clauses.join(" && ");
}

export async function getPostsPaginated(
  offset: number,
  limit: number,
  options: PostListOptions = {}
): Promise<BlogPost[]> {
  const filter = buildListFilter(options);
  const query = groq`*[${filter}] | order(publishedAt desc)[${offset}...${offset + limit}] {
    ${postListFields}
  }`;
  try {
    return await client.fetch<BlogPost[]>(query, { category: options.category });
  } catch (error) {
    console.error("Paginated posts fetch error:", error);
    return [];
  }
}

export async function getPostsCount(options: PostListOptions = {}): Promise<number> {
  const filter = buildListFilter(options);
  try {
    return await client.fetch<number>(groq`count(*[${filter}])`, {
      category: options.category,
    });
  } catch (error) {
    console.error("Post count fetch error:", error);
    return 0;
  }
}

export async function getCategories(): Promise<string[]> {
  try {
    return await client.fetch<string[]>(
      groq`array::unique(*[_type == "post" && defined(category->title)].category->title)`
    );
  } catch (error) {
    console.error("Categories fetch error:", error);
    return [];
  }
}

// Kept for backwards compatibility (post detail page etc.)
export async function getPosts(limit: number = 10): Promise<BlogPost[]> {
  const query = groq`*[_type == "post"] | order(publishedAt desc)[0...${limit}] {
    ${postListFields}
  }`;
  try {
    return await client.fetch<BlogPost[]>(query);
  } catch (error) {
    console.error("Critical Fetch Error:", error);
    return [];
  }
}

export async function getFeaturedPost(): Promise<BlogPost | null> {
  try {
    return await client.fetch(
      groq`*[_type == "post" && featured == true] | order(publishedAt desc)[0] { ${postListFields} }`
    );
  } catch (error) {
    console.error("Featured post fetch error:", error);
    return null;
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    return await client.fetch(
      groq`*[_type == "post" && slug.current == $slug][0]{ ${postFields} }`,
      { slug }
    );
  } catch (error) {
    console.error("Fetch error by slug:", error);
    return null;
  }
}

export async function getRelatedPosts(
  category: string,
  currentId: string
): Promise<BlogPost[]> {
  try {
    return await client.fetch(
      groq`*[_type == "post" && category->title == $category && _id != $currentId] | order(publishedAt desc)[0...3]{ ${postListFields} }`,
      { category, currentId }
    );
  } catch (error) {
    console.error("Related posts fetch error:", error);
    return [];
  }
}

export const tagFields = groq`
  _id,
  title,
  "slug": slug.current,
  description
`;

export async function getPostsByTag(
  slug: string
): Promise<{ tag: Tag; posts: BlogPost[] } | null> {
  const query = groq`*[_type == "tag" && slug.current == $slug][0]{
    ${tagFields},
    "posts": *[_type == "post" && references(^._id)] | order(publishedAt desc) {
      ${postListFields}
    }
  }`;
  try {
    const result = await client.fetch(query, { slug });
    if (!result) return null;
    return {
      tag: {
        _id: result._id,
        title: result.title,
        slug: result.slug,
        description: result.description,
      },
      posts: result.posts || [],
    };
  } catch (error) {
    console.error("Tag page fetch error:", error);
    return null;
  }
}