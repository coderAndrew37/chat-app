// lib/storage.ts
import { DEFAULT_RATES } from "./countries";
import type {
  TaskCompletion,
  TaskCompletionOf,
  TaskCompletionStatus,
  TaskType,
} from "./tasks/types";

import { VERIFY_DELAY_MS } from "./tasks/types";

export const KEY = "hotelrate.dashboard.v1";

// ─── Types ──────────────────────────────────────────────────────────────────

export type TxStatus = "Credited" | "Pending" | "Paid" | "Cancelled";

export type Tx = {
  id: string;
  ref: string;
  type: "reward" | "withdrawal";
  desc: string;
  amount: number;
  usd?: number;
  rate?: number;
  status: TxStatus;
  date: string;
  taskType?: TaskType;
};

export type Draft = {
  taskType: TaskType;
  taskSlug: string;
  payload: Record<string, unknown>;
};

export type DashboardState = {
  profile: {
    name: string;
    email: string;
    phone: string;
    country: string;
    accountActivated?: boolean;
  };
  rates: Record<string, number>;
  minWd: number;
  tasks: TaskCompletion[];
  drafts: Record<string, Draft>;
  tx: Tx[];
  daily: { day: string; count: number };
};

/** @deprecated Legacy shape — only used by the migration path from
 *  pre-multi-track dashboards. Do not write to this. */
export type ReviewStatus = "Verifying" | "Verified" | "Rejected";

// ─── Defaults ───────────────────────────────────────────────────────────────

export function defaults(): DashboardState {
  return {
    profile: { name: "", email: "", phone: "", country: "" },
    rates: { ...DEFAULT_RATES },
    minWd: 500,
    tasks: [],
    drafts: {},
    tx: [],
    daily: { day: new Date().toLocaleDateString("en-CA"), count: 0 },
  };
}

// ─── Read / write ───────────────────────────────────────────────────────────

export function read(): DashboardState {
  const base = defaults();
  if (typeof window === "undefined") return base;

  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return base;

    const stored = JSON.parse(raw) as Record<string, unknown> | null;
    if (!stored || typeof stored !== "object") return base;

      const rawTasks = Array.isArray(stored.tasks)
      ? normalizeTasks(stored.tasks)
    : migrateReviewsToTasks(stored.reviews);

     const now = Date.now();
    const tasks = rawTasks.map((t) =>
      t.status === "Verifying" && now - Date.parse(t.date) > VERIFY_DELAY_MS
        ? { ...t, status: "Verified" as const }
        : t,
    );
    return {
      profile: {
        ...base.profile,
        ...((stored.profile as DashboardState["profile"]) ?? {}),
      },
      rates: {
        ...base.rates,
        ...((stored.rates as Record<string, number>) ?? {}),
      },
      minWd: typeof stored.minWd === "number" ? stored.minWd : base.minWd,
      tasks,
      drafts: normalizeDrafts(stored.drafts),
      tx: normalizeTx(stored.tx),
      daily: {
        ...base.daily,
        ...((stored.daily as DashboardState["daily"]) ?? {}),
      },
    };
  } catch {
    return base;
  }
}

export function write(s: DashboardState) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(KEY, JSON.stringify(s));
  } catch {
    /* quota exceeded / private mode */
  }
}

// ─── Normalisation ──────────────────────────────────────────────────────────

const VALID_TASK_TYPES: TaskType[] = [
  "hotel-review",
  "survey",
  "chatting",
  "ai-training",
];

function isTaskType(v: unknown): v is TaskType {
  return typeof v === "string" && (VALID_TASK_TYPES as string[]).includes(v);
}

function isTaskStatus(v: unknown): v is TaskCompletionStatus {
  return v === "Verified" || v === "Verifying" || v === "Rejected";
}

function normalizeDrafts(raw: unknown): Record<string, Draft> {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return {};
  const out: Record<string, Draft> = {};
  for (const [k, v] of Object.entries(raw as Record<string, unknown>)) {
    if (!v || typeof v !== "object") continue;
    const d = v as Record<string, unknown>;
    if (!isTaskType(d.taskType)) continue;
    out[k] = {
      taskType: d.taskType,
      taskSlug: String(d.taskSlug ?? ""),
      payload:
        d.payload && typeof d.payload === "object"
          ? (d.payload as Record<string, unknown>)
          : {},
    };
  }
  return out;
}

function normalizeTasks(list: unknown): TaskCompletion[] {
  if (!Array.isArray(list)) return [];
  return list
    .map(normalizeTask)
    .filter((x): x is TaskCompletion => x !== null);
}

function normalizeTask(t: unknown): TaskCompletion | null {
  if (!t || typeof t !== "object") return null;
  const any = t as Record<string, unknown>;
  if (!isTaskType(any.taskType)) return null;
  if (!any.payload || typeof any.payload !== "object") return null;

  return {
    id: String(any.id ?? crypto.randomUUID()),
    taskType: any.taskType,
    taskSlug: String(any.taskSlug ?? ""),
    taskTitle: String(any.taskTitle ?? ""),
    rewardUsd: typeof any.rewardUsd === "number" ? any.rewardUsd : 0,
    rewardLocal: typeof any.rewardLocal === "number" ? any.rewardLocal : 0,
    rate:
      typeof any.rate === "number" ? any.rate : DEFAULT_RATES.KES ?? 130,
    date: String(any.date ?? new Date().toISOString()),
    status: isTaskStatus(any.status) ? any.status : "Verified",
    reasons: Array.isArray(any.reasons) ? (any.reasons as string[]) : [],
    payload: any.payload as TaskCompletion["payload"],
  } as TaskCompletion;
}

// ─── Legacy migration ───────────────────────────────────────────────────────
// Pre-multi-track dashboards stored hotel reviews at `reviews[]` with
// `hotel`/`kes` instead of `hotelName`/`localAmount`. Convert to the
// current `tasks[]` shape.

function migrateReviewsToTasks(list: unknown): TaskCompletion[] {
  if (!Array.isArray(list)) return [];
  return list
    .map(migrateReview)
   .filter(
      (x): x is TaskCompletionOf<"hotel-review"> => x !== null,
    );
}

function migrateReview(r: unknown): TaskCompletionOf<"hotel-review"> | null {
  if (!r || typeof r !== "object") return null;
  const any = r as Record<string, unknown>;

  const ratings = (any.ratings ?? {}) as Record<string, number>;
  const hotelName = String(any.hotelName ?? any.hotel ?? "");
  const hotelSlug =
    typeof any.hotelSlug === "string" && any.hotelSlug
      ? any.hotelSlug
      : slugify(hotelName);

  const rewardLocal =
    typeof any.localAmount === "number"
      ? any.localAmount
      : typeof any.kes === "number"
        ? any.kes
        : 0;

  const status: TaskCompletionStatus = isTaskStatus(any.status)
    ? any.status
    : "Verified";

  return {
    id: String(any.id ?? crypto.randomUUID()),
    taskType: "hotel-review",
    taskSlug: hotelSlug,
    taskTitle: hotelName,
    rewardUsd: typeof any.usd === "number" ? any.usd : 0,
    rewardLocal,
    rate:
      typeof any.rate === "number" ? any.rate : DEFAULT_RATES.KES ?? 130,
    date: String(any.date ?? new Date().toISOString()),
    status,
    reasons: Array.isArray(any.reasons) ? (any.reasons as string[]) : [],
    payload: {
      kind: "hotel-review",
      hotelSlug,
      hotelCity: "",
      ratings: {
        overall: ratings.overall ?? 0,
        cleanliness: ratings.cleanliness ?? 0,
        service: ratings.service ?? 0,
        facilities: ratings.facilities ?? 0,
        value: ratings.value ?? 0,
      },
      title: String(any.title ?? ""),
      text: String(any.text ?? ""),
    },
  };
}

function normalizeTx(list: unknown): Tx[] {
  if (!Array.isArray(list)) return [];
  return list
    .map((t): Tx | null => {
      if (!t || typeof t !== "object") return null;
      const any = t as Record<string, unknown>;
      const type = any.type === "withdrawal" ? "withdrawal" : "reward";
      return {
        id: String(any.id ?? crypto.randomUUID()),
        ref: String(any.ref ?? any.id ?? ""),
        type,
        desc: String(any.desc ?? ""),
        amount: typeof any.amount === "number" ? any.amount : 0,
        usd: typeof any.usd === "number" ? any.usd : undefined,
        rate: typeof any.rate === "number" ? any.rate : undefined,
        status: normalizeTxStatus(any.status, type),
        date: String(any.date ?? new Date().toISOString()),
        taskType: isTaskType(any.taskType) ? any.taskType : undefined,
      };
    })
    .filter((x): x is Tx => x !== null);
}

function normalizeTxStatus(
  s: unknown,
  type: "reward" | "withdrawal",
): TxStatus {
  if (s === "Credited" || s === "Pending" || s === "Paid" || s === "Cancelled")
    return s;
  if (s === "Completed") return type === "reward" ? "Credited" : "Paid";
  if (s === "Verified") return "Credited";
  if (s === "Rejected") return "Cancelled";
  return "Pending";
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}