import { BlogPost, Tag } from "@/types/blog";
import { groq } from "next-sanity";
import "server-only";
import { client } from "./sanity/client";

export const postFields = groq`
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
  },
  "mainImage": mainImage.asset->url,
  "mainImageAlt": mainImage.alt,
  "publishedAt": publishedAt,
  "author": author->{
    name,
    "image": image.asset->url,
    bio
  },
  "category": category->title,
  "categorySlug": category->slug.current
`;

export async function getPosts(limit: number = 10): Promise<BlogPost[]> {
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

export async function getFeaturedPost(): Promise<BlogPost | null> {
  try {
    return await client.fetch(
      groq`*[_type == "post" && featured == true] | order(publishedAt desc)[0] { ${postFields} }`
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
      groq`*[_type == "post" && category->title == $category && _id != $currentId] | order(publishedAt desc)[0...3]{ ${postFields} }`,
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