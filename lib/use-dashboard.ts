// lib/use-dashboard.ts
"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { COUNTRIES, type CountryKey } from "./countries";
import { formatMoney, formatUsd, localAmount } from "./money";
import { KEY, read, write, type DashboardState, type Review } from "./storage";
import { REVIEW_VERIFICATION_MS } from "./config";

export const REVIEW_LIMIT = 2;
const STATE_EVENT = "hotelrate:state";

const todayKey = () => new Date().toLocaleDateString("en-CA");

export function useDashboard() {
  const [state, setState] = useState<DashboardState | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const sync = () => setState(read());
    let active = true;
    const initialize = () => {
      if (!active) return;
      sync();
      setReady(true);
    };
    queueMicrotask(initialize);

    // cross-component, same tab:
    window.addEventListener(STATE_EVENT, sync);
    // cross-tab (existing, still valid):
    const onStorage = (e: StorageEvent) => { if (e.key === KEY) sync(); };
    window.addEventListener("storage", onStorage);

    return () => {
      active = false;
      window.removeEventListener(STATE_EVENT, sync);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const save = useCallback((next: DashboardState) => {
    setState(next);
    write(next);
    // notify every other mounted useDashboard in this tab:
    window.dispatchEvent(new Event(STATE_EVENT));
  }, []);

  const countryKey = (state?.profile.country || "KE") as CountryKey;
  const country = COUNTRIES[countryKey];

  const wallet = useMemo(() => {
    const empty = { earned: 0, pending: 0, withdrawn: 0, avail: 0 };
    if (!state) return empty;
    let earned = 0, withdrawn = 0, pendingWd = 0;
    for (const t of state.tx) {
      if (t.type === "reward") earned += t.amount;
      else if (t.status === "Paid") withdrawn += t.amount;
      else if (t.status === "Pending") pendingWd += t.amount;
    }
    const pending = state.reviews
      .filter((r) => r.status === "Verifying")
      .reduce((a, r) => a + r.localAmount, 0);
    const r2 = (n: number) => Math.round(n * 100) / 100;
    return {
      earned: r2(earned),
      pending: r2(pending),
      withdrawn: r2(withdrawn),
      avail: r2(earned - withdrawn - pendingWd),
    };
  }, [state]);

  const dailyCount = useMemo(() => {
    if (!state) return 0;
    const day = todayKey();
    return state.reviews.filter(
      (r) => r.date.slice(0, 10) === day && r.status !== "Rejected",
    ).length;
  }, [state]);

  const verifiedCount = useMemo(
    () => state?.reviews.filter((r) => r.status === "Verified").length ?? 0,
    [state],
  );

  const reviewsFor = (slug: string) =>
    state?.reviews.find((r) => r.hotelSlug === slug);
  const alreadyReviewed = (slug: string) => !!reviewsFor(slug);

  const freeUsed = state?.reviews.filter((r) => r.status !== "Rejected").length ?? 0;
  const paywalled = freeUsed >= REVIEW_LIMIT;

  const submitReview = (r: Omit<Review, "id" | "date" | "status" | "reasons">) => {
    if (!state) return;
    const next: Review = {
      ...r,
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
     due: Date.now() + REVIEW_VERIFICATION_MS,
      status: "Verifying",
      reasons: [],
    };
    save({
      ...state,
      reviews: [next, ...state.reviews],
      drafts: Object.fromEntries(
        Object.entries(state.drafts).filter(([k]) => k !== r.hotelSlug),
      ),
    });
    toast.success("Review submitted. We'll verify it shortly.");
  };

  const money = (n: number) => formatMoney(n, countryKey);
  const usd = formatUsd;
  const toLocal = (u: number) => localAmount(u, country.rate, country.dec);

  return {
    state, ready, country, countryKey, save,
    wallet, dailyCount, verifiedCount,
    reviewsFor, alreadyReviewed, freeUsed, paywalled, submitReview,
    money, usd, toLocal, limit: REVIEW_LIMIT,
  };
}