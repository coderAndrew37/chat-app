// app/actions/search.ts
"use server";

import { client } from "@/lib/sanity/client";
import { groq } from "next-sanity";

const postListFields = groq`
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

export async function searchPostsAutocomplete(query: string) {
  "use server";
  
  if (!query || query.length < 2) return [];
  
  try {
    const searchTerm = `${query}*`;
    const searchQuery = groq`*[_type == "post" && title match $searchTerm] | order(publishedAt desc)[0...5] {
      title,
      "slug": slug.current,
      "category": category->title
    }`;
    
    return await client.fetch(searchQuery, { searchTerm });
  } catch (error) {
    console.error("Autocomplete fetch error:", error);
    return [];
  }
}

export async function searchPosts(query: string) {
  "use server";
  
  if (!query || query.length < 2) return [];
  
  try {
    const searchTerm = `${query}*`;
    const searchQuery = groq`*[_type == "post" && (
      title match $searchTerm ||
      excerpt match $searchTerm ||
      pt::text(body) match $searchTerm
    )] | order(publishedAt desc)[0...10] {
      ${postListFields}
    }`;
    
    return await client.fetch(searchQuery, { searchTerm });
  } catch (error) {
    console.error("Search fetch error:", error);
    return [];
  }
}