import { BlogPost, Tag } from "@/types/blog";
import { groq } from "next-sanity";
import "server-only";
import { client } from "./sanity/client";

export const postFields = groq`
  _id,
  title,
  "slug": slug.current,
  excerpt,
  // Fetch tags by dereferencing the array of references
  "tags": tags[]->{
    _id,
    title,
    "slug": slug.current
  },
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
        "mainImage": mainImage.asset->url,
        "mainImageCaption": mainImage.caption,
        "mainImageSource": mainImage.source
      }
    },
    _type == "quiz" => {
      ...
    }
  },
  "mainImage": mainImage.asset->url,
  "mainImageCaption": mainImage.caption,
  "mainImageSource": mainImage.source,
  "publishedAt": _createdAt,
  "author": author->{
    name,
    role,
    "image": image.asset->url,
    bio
  },
  "category": categories[0]->title,
  readTime,
  "featured": isFeatured,
  seo {
    metaTitle,
    metaDescription,
    keywords,
    "ogImage": ogImage.asset->url
  }
`;

/**
 * Fetches a list of recent blog posts
 */
export async function getPosts(limit: number = 3): Promise<BlogPost[]> {
  const query = groq`*[_type == "post"] | order(publishedAt desc)[0...${limit}] {
    ${postFields}
  }`;

  try {
    return await client.fetch<BlogPost[]>(query);
  } catch (error) {
    console.error("Critical Fetch Error:", error);
    return [];
  }
}

/**
 * Fetches a single post by its slug
 */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    return await client.fetch(
      groq`*[_type == "post" && slug.current == $slug][0]{${postFields}}`,
      { slug },
    );
  } catch (error) {
    console.error("Fetch error by slug:", error);
    return null;
  }
}

/**
 * Fetches posts within the same category, excluding the current post
 */
export async function getRelatedPosts(
  category: string,
  currentId: string,
): Promise<BlogPost[]> {
  try {
    return await client.fetch(
      groq`*[_type == "post" && categories[0]->title == $category && _id != $currentId][0...3]{${postFields}}`,
      { category, currentId },
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

/**
 * Fetches tag details and all posts referencing that specific tag
 */
export async function getPostsByTag(
  slug: string,
): Promise<{ tag: Tag; posts: BlogPost[] } | null> {
  const query = groq`*[_type == "tag" && slug.current == $slug][0]{
    ${tagFields},
    "posts": *[_type == "post" && references(^._id)] | order(publishedAt desc) {
      ${postFields}
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

