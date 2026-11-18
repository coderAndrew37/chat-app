// lib/use-review-verifier.ts
"use client";

import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { useDashboard } from "./use-dashboard";
import type { Review, DashboardState } from "./storage";

const genRef = (prefix: string) =>
  prefix +
  Date.now().toString(36).toUpperCase().slice(-5) +
  Array.from(
    { length: 4 },
    () =>
      "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"[Math.floor(Math.random() * 32)],
  ).join("");

/**
 * Quality check that runs when the verification window expires.
 * Returns an array of reasons; empty array means "approve".
 */
function judge(review: Review, all: Review[]): string[] {
  const reasons: string[] = [];
  const text = review.text.trim();
  const haystack = (review.title + " " + text).toLowerCase();

  if (text.length < 100) {
    reasons.push("Review must be at least 100 characters.");
  }

  const profanity =
    /\b(fuck\w*|shit\w*|bitch\w*|asshole\w*|bastard\w*|cunt\w*|dickhead\w*)\b/i;
  if (profanity.test(haystack)) {
    reasons.push("Review contains offensive language.");
  }

  const normalized = text.toLowerCase().replace(/\s+/g, " ").trim();
  const duplicate = all.find(
    (x) =>
      x.id !== review.id &&
      x.text.toLowerCase().replace(/\s+/g, " ").trim() === normalized,
  );
  if (duplicate) {
    reasons.push("This review is a duplicate of one you already submitted.");
  }

  const uniqueWords = new Set(
    text
      .toLowerCase()
      .split(/\s+/)
      .filter((w) => w.length > 1),
  );
  if (uniqueWords.size < 10) {
    reasons.push(
      "Review doesn't contain enough detail about the property (at least 10 unique words).",
    );
  }

  return reasons;
}

export function useReviewVerifier() {
  const { state, save } = useDashboard();
  const stateRef = useRef<DashboardState | null>(null);

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  useEffect(() => {
    const settle = () => {
      const s = stateRef.current;
      if (!s) return;

      const now = Date.now();
      const due = s.reviews.filter(
        (r) => r.status === "Verifying" && r.due && now >= r.due,
      );
      if (due.length === 0) return;

      const nextReviews = [...s.reviews];
      const newTx: DashboardState["tx"] = [];
      let changed = false;

      for (const r of due) {
        const idx = nextReviews.findIndex((x) => x.id === r.id);
        if (idx < 0) continue;

        const reasons = judge(r, s.reviews);
        if (reasons.length > 0) {
          nextReviews[idx] = { ...r, status: "Rejected", reasons };
          toast.error(`Review rejected: ${r.hotelName}`, {
            description: reasons[0],
          });
        } else {
          nextReviews[idx] = { ...r, status: "Verified", reasons: [] };
          newTx.push({
            id: crypto.randomUUID(),
            ref: genRef("HR"),
            type: "reward",
            desc: `Review reward: ${r.hotelName}`,
            amount: r.localAmount,
            usd: r.usd,
            rate: r.rate,
            status: "Credited",
            date: new Date().toISOString(),
          });
          toast.success(`Review verified: ${r.hotelName}`, {
            description: `Reward credited: ${r.localAmount}`,
          });
        }
        changed = true;
      }

      if (changed) {
        save({
          ...s,
          reviews: nextReviews,
          tx: [...newTx, ...s.tx],
        });
      }
    };

    // Run immediately so navigating back doesn't wait for the interval
    settle();

    const interval = window.setInterval(settle, 5_000);

    const onVisible = () => {
      if (!document.hidden) settle();
    };
    document.addEventListener("visibilitychange", onVisible);

    const onStorage = (e: StorageEvent) => {
      if (e.key === "hotelrate.dashboard.v1") settle();
    };
    window.addEventListener("storage", onStorage);

    return () => {
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("storage", onStorage);
    };
  }, [save]);
}