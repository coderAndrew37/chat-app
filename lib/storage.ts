// lib/storage.ts
import { DEFAULT_RATES } from "./countries";

export const KEY = "hotelrate.dashboard.v1";

// ─── Types ──────────────────────────────────────────────────────────────────

export type ReviewStatus = "Verifying" | "Verified" | "Rejected";

export type Review = {
  id: string;
  hotelSlug: string;
  hotelName: string;
  ratings: Record<
    "overall" | "cleanliness" | "service" | "facilities" | "value",
    number
  >;
  title: string;
  text: string;
  date: string;
  due?: number;
  status: ReviewStatus;
  reasons: string[];
  usd: number;
  rate: number;
  localAmount: number;
};

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
};

export type Draft = {
  hotelSlug: string;
  ratings: Partial<Review["ratings"]>;
  title: string;
  text: string;
};

export type DashboardState = {
  profile: { name: string; email: string; phone: string; country: string };
  rates: Record<string, number>;
  minWd: number;
  reviews: Review[];
  drafts: Record<string, Draft>;
  tx: Tx[];
  daily: { day: string; count: number };
};

// ─── Defaults ───────────────────────────────────────────────────────────────

export function defaults(): DashboardState {
  return {
    profile: { name: "", email: "", phone: "", country: "" },
    rates: { ...DEFAULT_RATES },
    minWd: 500,
    reviews: [],
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

    const stored = JSON.parse(raw) as Partial<DashboardState> | null;
    if (!stored || typeof stored !== "object") return base;

    return {
      ...base,
      ...stored,
      profile: { ...base.profile, ...(stored.profile ?? {}) },
      rates: { ...base.rates, ...(stored.rates ?? {}) },
      daily: { ...base.daily, ...(stored.daily ?? {}) },
      reviews: normalizeReviews(stored.reviews),
      tx: normalizeTx(stored.tx),
      drafts: stored.drafts ?? {},
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

// ─── Legacy migration ───────────────────────────────────────────────────────
// Normalizes data written by the old HTML dashboard (index.html + app.js),
// which used `hotel`/`kes` instead of `hotelName`/`localAmount` and had
// different status values.

function normalizeReviews(list: unknown): Review[] {
  if (!Array.isArray(list)) return [];
  return list
    .map((r): Review | null => {
      if (!r || typeof r !== "object") return null;
      const anyR = r as Record<string, unknown>;
      const ratings = (anyR.ratings ?? {}) as Record<string, number>;

      const localAmount =
        typeof anyR.localAmount === "number"
          ? anyR.localAmount
          : typeof anyR.kes === "number"
            ? anyR.kes
            : 0;

      const rawStatus = anyR.status;
      const status: ReviewStatus =
        rawStatus === "Verified" ||
        rawStatus === "Rejected" ||
        rawStatus === "Verifying"
          ? rawStatus
          : "Verified";

      const hotelName = String(anyR.hotelName ?? anyR.hotel ?? "");
      const hotelSlug =
        typeof anyR.hotelSlug === "string" && anyR.hotelSlug
          ? anyR.hotelSlug
          : slugifyHotel(hotelName);

      return {
        id: String(anyR.id ?? crypto.randomUUID()),
        hotelSlug,
        hotelName,
        ratings: {
          overall: ratings.overall ?? 0,
          cleanliness: ratings.cleanliness ?? 0,
          service: ratings.service ?? 0,
          facilities: ratings.facilities ?? 0,
          value: ratings.value ?? 0,
        },
        title: String(anyR.title ?? ""),
        text: String(anyR.text ?? ""),
        date: String(anyR.date ?? new Date().toISOString()),
        due: typeof anyR.due === "number" ? anyR.due : undefined,
        status,
        reasons: Array.isArray(anyR.reasons) ? (anyR.reasons as string[]) : [],
        usd: typeof anyR.usd === "number" ? anyR.usd : 0,
        rate:
          typeof anyR.rate === "number" ? anyR.rate : DEFAULT_RATES.KES ?? 130,
        localAmount,
      };
    })
    .filter((x): x is Review => x !== null);
}

function normalizeTx(list: unknown): Tx[] {
  if (!Array.isArray(list)) return [];
  return list
    .map((t): Tx | null => {
      if (!t || typeof t !== "object") return null;
      const anyT = t as Record<string, unknown>;
      const type = anyT.type === "withdrawal" ? "withdrawal" : "reward";
      return {
        id: String(anyT.id ?? crypto.randomUUID()),
        ref: String(anyT.ref ?? anyT.id ?? ""),
        type,
        desc: String(anyT.desc ?? ""),
        amount: typeof anyT.amount === "number" ? anyT.amount : 0,
        usd: typeof anyT.usd === "number" ? anyT.usd : undefined,
        rate: typeof anyT.rate === "number" ? anyT.rate : undefined,
        status: normalizeTxStatus(anyT.status, type),
        date: String(anyT.date ?? new Date().toISOString()),
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
  // Legacy HTML dashboard used "Completed" and "Verified"
  if (s === "Completed") return type === "reward" ? "Credited" : "Paid";
  if (s === "Verified") return "Credited";
  if (s === "Rejected") return "Cancelled";
  return "Pending";
}

function slugifyHotel(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}