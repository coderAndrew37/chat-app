"use server";

import { getPostsPaginated } from "@/lib/api";
import { BlogPost } from "@/types/blog";
import { BLOG_PAGE_SIZE } from "./constants";

export async function loadMorePosts(
  offset: number,
  category: string
): Promise<BlogPost[]> {
  return getPostsPaginated(offset, BLOG_PAGE_SIZE, {
    category: category || undefined,
    excludeFeatured: !category,
  });
}