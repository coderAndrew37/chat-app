// lib/use-dashboard.ts
"use client";
import { useEffect, useMemo, useSyncExternalStore } from "react";
import { toast } from "sonner";
import { COUNTRIES, type CountryKey } from "./countries";
import { formatMoney, formatUsd, localAmount } from "./money";
import { type DashboardState, type Tx } from "./storage";
import { dashboardStore } from "./store";
import {
  FREE_LIMIT,
  type TaskCompletion,
  type TaskCompletionOf,
  type TaskPayloadByType,
  type TaskType,
  VERIFY_DELAY_MS,
} from "./tasks/types";

export const REVIEW_LIMIT = FREE_LIMIT["hotel-review"]; // legacy export

const genRef = (prefix: string) =>
  prefix +
  Date.now().toString(36).toUpperCase().slice(-5) +
  Array.from(
    { length: 4 },
    () => "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"[Math.floor(Math.random() * 32)],
  ).join("");

/**
 * Mirrors TaskCompletion minus the fields the hook fills in.
 * Mapped union so `taskType` and `payload` stay correlated at the call site.
 */
type NewTask = {
  [T in TaskType]: {
    taskType: T;
    taskSlug: string;
    taskTitle: string;
    rewardUsd: number;
    payload: TaskPayloadByType[T];
  };
}[TaskType];

type SubmitReviewInput = {
  hotelSlug: string;
  hotelName: string;
  ratings: Record<string, number>;
  title: string;
  text: string;
  usd: number;
};

export function useDashboard() {
  const raw = useSyncExternalStore(
    dashboardStore.subscribe,
    dashboardStore.getSnapshot,
    dashboardStore.getServerSnapshot,
  );

   const mounted = useSyncExternalStore(
     () => () => {},
     () => true,
     () => false,
   );

  // Rehydrate Verifying tasks left over from a previous session: schedule the
  // flip for the remaining time, or flip immediately if already past.
  useEffect(() => {
    if (!mounted) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    for (const t of raw.tasks) {
      if (t.status !== "Verifying") continue;
      const remaining = Math.max(
        0,
        VERIFY_DELAY_MS - (Date.now() - Date.parse(t.date)),
      );
      timers.push(
        setTimeout(() => {
          dashboardStore.patchState((s) => ({
            ...s,
            tasks: s.tasks.map((task) =>
              task.id === t.id && task.status === "Verifying"
                ? { ...task, status: "Verified" as const }
                : task,
            ),
          }));
        }, remaining),
      );
    }
    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted]);


  const countryKey = (raw.profile.country || "KE") as CountryKey;
  const country = COUNTRIES[countryKey];

  // ── Wallet ────────────────────────────────────────────────────────────
  let earned = 0;
  let withdrawn = 0;
  let pendingWd = 0;
  for (const t of raw.tx) {
    if (t.type === "reward") earned += t.amount;
    else if (t.status === "Paid") withdrawn += t.amount;
    else if (t.status === "Pending") pendingWd += t.amount;
  }
  const pendingRewards = raw.tasks
    .filter((t) => t.status === "Verifying")
    .reduce((a, t) => a + t.rewardLocal, 0);
  const r2 = (n: number) => Math.round(n * 100) / 100;
  const wallet = {
    earned: r2(earned),
    pending: r2(pendingRewards),
    withdrawn: r2(withdrawn),
    avail: r2(earned - pendingRewards - withdrawn - pendingWd),
  };

  // ── Daily count ───────────────────────────────────────────────────────
  const today = new Date().toLocaleDateString("en-CA");
  const dailyCount = raw.tasks.filter(
    (t) => t.date.slice(0, 10) === today && t.status !== "Rejected",
  ).length;

  const verifiedCount = raw.tasks.filter(
    (t) => t.status === "Verified",
  ).length;

  // ── Per-type helpers ──────────────────────────────────────────────────
  const completedFor = (taskType: TaskType, slug: string) =>
    raw.tasks.find((t) => t.taskType === taskType && t.taskSlug === slug);

  const usedFor = (taskType: TaskType) =>
    raw.tasks.filter(
      (t) => t.taskType === taskType && t.status !== "Rejected",
    ).length;

  const freeUsedFor = (taskType: TaskType) => usedFor(taskType);
  const paywalledFor = (taskType: TaskType) =>
    usedFor(taskType) >= FREE_LIMIT[taskType];

  // ── Backward-compat hotel-review surface ─────────────────────────────
  const reviews = raw.tasks
    .filter(
      (t): t is TaskCompletionOf<"hotel-review"> =>
        t.taskType === "hotel-review",
    )
    .map((t) => ({
      id: t.id,
      hotelSlug: t.payload.hotelSlug,
      hotelName: t.taskTitle,
      ratings: t.payload.ratings,
      title: t.payload.title,
      text: t.payload.text,
      date: t.date,
      status: t.status,
      reasons: t.reasons,
      usd: t.rewardUsd,
      rate: t.rate,
      localAmount: t.rewardLocal,
    }));

  const reviewsFor = (slug: string) => {
    const t = completedFor("hotel-review", slug);
    if (!t || t.taskType !== "hotel-review") return undefined;
    const p = t.payload;
    return {
      id: t.id,
      hotelSlug: p.hotelSlug,
      hotelName: t.taskTitle,
      ratings: p.ratings,
      title: p.title,
      text: p.text,
      date: t.date,
      status: t.status,
      reasons: t.reasons,
      usd: t.rewardUsd,
      rate: t.rate,
      localAmount: t.rewardLocal,
    };
  };

  const alreadyReviewed = (slug: string) => !!reviewsFor(slug);
  const freeUsed = freeUsedFor("hotel-review");
  const paywalled = paywalledFor("hotel-review");

  // ── Submit ────────────────────────────────────────────────────────────
  const submitTask = (t: NewTask) => {
    const now = new Date().toISOString();
    // Spread preserves the taskType ↔ payload correlation; TS can't prove
    // it on field-by-field reassignment, so we build it as one object.
    const completion = {
      ...t,
      id: crypto.randomUUID(),
      rewardLocal: localAmount(t.rewardUsd, country.rate, country.dec),
      rate: country.rate,
      date: now,
     status: "Verifying" as const,
      reasons: [] as string[],
    } as TaskCompletion;

    const tx: Tx = {
      id: crypto.randomUUID(),
      ref: genRef("HR"),
      type: "reward",
      desc: `${labelFor(t.taskType)}: ${t.taskTitle}`,
      amount: completion.rewardLocal,
      usd: t.rewardUsd,
      rate: country.rate,
      status: "Credited",
      date: now,
      taskType: t.taskType,
    };

    dashboardStore.patchState((s) => ({
      ...s,
      tasks: [completion, ...s.tasks],
      tx: [tx, ...s.tx],
      drafts: Object.fromEntries(
        Object.entries(s.drafts).filter(
          ([k]) => k !== `${t.taskType}:${t.taskSlug}`,
        ),
      ),
    }));


     setTimeout(() => {
      dashboardStore.patchState((s) => ({
        ...s,
        tasks: s.tasks.map((task) =>
          task.id === completion.id
            ? { ...task, status: "Verified" as const }
            : task,
        ),
      }));
    }, VERIFY_DELAY_MS);

    

    toast.success(
      `Task complete! ${formatMoney(completion.rewardLocal, countryKey)} added to your wallet.`,
    );
  };

  const saveDraft = (
    taskType: TaskType,
    taskSlug: string,
    payload: Record<string, unknown>,
  ) => {
    dashboardStore.patchState((s) => ({
      ...s,
      drafts: {
        ...s.drafts,
        [`${taskType}:${taskSlug}`]: { taskType, taskSlug, payload },
      },
    }));
  };

  const getDraft = (taskType: TaskType, taskSlug: string) =>
    raw.drafts[`${taskType}:${taskSlug}`];

  // ── Profile / activation ─────────────────────────────────────────────
  const isActivated = raw.profile.accountActivated === true;

  const activateAccount = () => {
    dashboardStore.patchState((s) => ({
      ...s,
      profile: { ...s.profile, accountActivated: true },
    }));
    toast.success("Account activated. You can now withdraw.");
  };

  const save = (next: DashboardState) => dashboardStore.setState(next);

  const money = (n: number) => formatMoney(n, countryKey);
  const usd = formatUsd;
  const toLocal = (u: number) => localAmount(u, country.rate, country.dec);

  // Backward-compat: expose `reviews` on state so legacy pages keep working.
  const state = useMemo(
    () => ({ ...raw, reviews }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [raw],
  );

  return {
    state,
    ready: mounted,
    country,
    countryKey,
    save,
    wallet,
    dailyCount,
    verifiedCount,
    // new API
    completedFor,
    freeUsedFor,
    paywalledFor,
    submitTask,
    saveDraft,
    getDraft,
    // legacy hotel-review API (works as before)
    reviewsFor,
    alreadyReviewed,
    freeUsed,
    paywalled,
    submitReview: (r: SubmitReviewInput) => {
      submitTask({
        taskType: "hotel-review",
        taskSlug: r.hotelSlug,
        taskTitle: r.hotelName,
        rewardUsd: r.usd,
        payload: {
          kind: "hotel-review",
          hotelSlug: r.hotelSlug,
          hotelCity: "",
          ratings: {
            overall: r.ratings.overall ?? 0,
            cleanliness: r.ratings.cleanliness ?? 0,
            service: r.ratings.service ?? 0,
            facilities: r.ratings.facilities ?? 0,
            value: r.ratings.value ?? 0,
          },
          title: r.title,
          text: r.text,
        },
      });
    },
    // account
    isActivated,
    activateAccount,
    // formatting
    money,
    usd,
    toLocal,
    limit: REVIEW_LIMIT,
  };
}

function labelFor(t: TaskType): string {
  switch (t) {
    case "hotel-review":
      return "Review reward";
    case "survey":
      return "Survey reward";
    case "chatting":
      return "Chat reward";
    case "ai-training":
      return "AI task reward";
  }
}