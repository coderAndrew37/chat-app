"use client";

import { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BlogPost } from "@/types/blog";
import { PostCard } from "./PostCards";

import Link from "next/link";
import {loadMorePosts } from "@/lib/blog/actions";
import { PostCardSkeleton } from "./Skeleton";
import { BLOG_PAGE_SIZE } from "@/lib/blog/constants";

export function BlogGrid({
  initialPosts,
  totalCount,
  category,
}: {
  initialPosts: BlogPost[];
  totalCount: number;
  category: string;
}) {
  const [posts, setPosts] = useState(initialPosts);
  const [isPending, startTransition] = useTransition();
  const hasMore = posts.length < totalCount;
  const remaining = totalCount - posts.length;

  function handleLoadMore() {
    startTransition(async () => {
      const next = await loadMorePosts(posts.length, category);
      setPosts((prev) => [...prev, ...next]);
    });
  }

  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <h3 className="text-xl font-bold text-gray-900 mb-2">No posts in this category yet</h3>
        <p className="text-gray-400 text-sm mb-6">Check back soon — we publish every week.</p>
        <Link href="/blog" className="text-sm font-bold text-rose-500 hover:text-rose-600 underline underline-offset-4">
          Browse all posts →
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        <AnimatePresence initial={false}>
          {posts.map((post, i) => (
            <motion.div
              key={post._id}
              initial={i < initialPosts.length ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: (i % BLOG_PAGE_SIZE) * 0.03 }}
            >
              <PostCard post={post} />
            </motion.div>
          ))}
        </AnimatePresence>
        {isPending &&
          Array.from({ length: Math.min(BLOG_PAGE_SIZE, remaining) }).map((_, i) => (
            <PostCardSkeleton key={`skeleton-${i}`} />
          ))}
      </div>

      {hasMore && (
        <div className="flex flex-col items-center gap-3 mt-12">
          <button
            onClick={handleLoadMore}
            disabled={isPending}
            className="bg-white border border-gray-200 text-gray-700 font-bold text-sm px-8 py-3.5 rounded-full shadow-sm hover:border-rose-200 hover:text-rose-500 hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? "Loading…" : "Load more posts"}
          </button>
          <span className="text-xs text-gray-400">
            Showing {posts.length} of {totalCount}
          </span>
        </div>
      )}
    </>
  );
}