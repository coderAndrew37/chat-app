// app/dashboard/page.tsx
"use client";

import Link from "next/link";
import { useDashboard } from "@/lib/use-dashboard";
import { StarRating } from "@/app/components/dashboard/StarRating";

// ─── helpers ────────────────────────────────────────────────────────────────

const fmtShortDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-KE", { day: "numeric", month: "short" });

const CARD_SHADOW =
  "shadow-[0_1px_2px_rgba(20,33,61,0.05),0_8px_24px_-16px_rgba(20,33,61,0.25)]";

// ─── stat card ──────────────────────────────────────────────────────────────

function Stat({
  label,
  value,
  sub,
  hero = false,
}: {
  label: string;
  value: string;
  sub: string;
  hero?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border p-4 ${CARD_SHADOW} sm:p-5 ${
        hero ? "border-[#14213d] bg-[#14213d] text-white" : "border-[#e5e6f1] bg-white"
      }`}
    >
      <p
        className={`text-[11px] font-semibold uppercase tracking-wider ${
          hero ? "text-[#b9c0d6]" : "text-[#667088]"
        }`}
      >
        {label}
      </p>
      <p className="mt-1 font-heading text-2xl font-extrabold tabular-nums leading-tight">
        {value}
      </p>
      <p className={`mt-1 text-xs ${hero ? "text-[#b9c0d6]" : "text-[#667088]"}`}>{sub}</p>
    </div>
  );
}

// ─── bar chart ──────────────────────────────────────────────────────────────

function MiniChart({ rewards }: { rewards: { day: string; amount: number }[] }) {
  const max = Math.max(...rewards.map((r) => r.amount), 1);
  return (
    <svg viewBox="0 0 420 160" className="w-full" role="img" aria-label="Rewards last 7 days">
      {rewards.map((r, i) => {
        const h = Math.max(3, (r.amount / max) * 110);
        const x = 14 + i * 58;
        const label = new Date(`${r.day}T12:00:00`).toLocaleDateString("en-KE", {
          weekday: "short",
        });
        return (
          <g key={r.day}>
            <rect
              x={x}
              y={130 - h}
              width={38}
              height={h}
              rx={5}
              className={r.amount ? "fill-[#5b4bdb]" : "fill-[#e5e6f1]"}
            >
              <title>{r.amount.toLocaleString()}</title>
            </rect>
            <text
              x={x + 19}
              y={148}
              textAnchor="middle"
              className="fill-[#667088] text-[11px]"
            >
              {label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// ─── check icon ─────────────────────────────────────────────────────────────

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12l5 5 9-10" />
    </svg>
  );
}

// ─── page ───────────────────────────────────────────────────────────────────

export default function OverviewPage() {
  const {
    state,
    ready,
    wallet,
    dailyCount,
    verifiedCount,
    limit,
    money,
    usd,
    country,
  } = useDashboard();

  if (!ready || !state) return null;

  const name = state.profile.name.trim();
  const rewards = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const day = d.toLocaleDateString("en-CA");
    const amount = state.tx
      .filter((t) => t.type === "reward" && t.date.slice(0, 10) === day)
      .reduce((a, t) => a + t.amount, 0);
    return { day, amount };
  });

  const recentReviews = state.reviews.slice(0, 4);
  const recentTx = state.tx.slice(0, 4);
  const limitReached = dailyCount >= limit;

  return (
    <div className="space-y-4 sm:space-y-5">
      {/* Header */}
      <div>
        <h2 className="font-heading text-xl font-extrabold text-[#14213d] sm:text-2xl">
          {name ? `Welcome back, ${name.split(" ")[0]}` : "Welcome to HotelRate"}
        </h2>
        <p className="mt-1 text-xs text-[#667088]">
          Rewards shown in {country.cur} at $1 = {country.cur}{" "}
          {country.rate.toLocaleString()}.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
        <Stat
          label="Available balance"
          value={money(wallet.avail)}
          sub="Ready to withdraw"
          hero
        />
        <Stat label="Total earnings" value={money(wallet.earned)} sub="All review rewards" />
        <Stat
          label="Pending earnings"
          value={money(wallet.pending)}
          sub="Under verification"
        />
        <Stat label="Total withdrawn" value={money(wallet.withdrawn)} sub="Paid out" />
      </div>

      {/* Progress + chart */}
      <div className="grid gap-3 sm:gap-4 lg:grid-cols-[1.4fr_1fr]">
        <div className={`rounded-xl border border-[#e5e6f1] bg-white p-4 ${CARD_SHADOW} sm:p-5`}>
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-bold text-[#14213d]">
              Today&apos;s review progress
            </h3>
            <span className="rounded-full bg-[#eeecfd] px-3 py-1 text-xs font-bold text-[#4637c2]">
              {dailyCount}/{limit}
            </span>
          </div>
          <div className="mt-4 flex gap-2">
            {Array.from({ length: limit }, (_, i) => (
              <span
                key={i}
                aria-hidden="true"
                className={`grid h-10 w-10 place-items-center rounded-full border-2 transition-colors ${
                  i < dailyCount
                    ? "border-[#5b4bdb] bg-[#5b4bdb] text-white"
                    : "border-dashed border-[#cfd2e3] text-transparent"
                }`}
              >
                <CheckIcon />
              </span>
            ))}
          </div>
          <p className="mt-3 text-xs text-[#667088]">
            {limitReached
              ? `Daily limit reached. New reviews open at midnight (${country.name} time).`
              : `${limit - dailyCount} review${
                  limit - dailyCount === 1 ? "" : "s"
                } left today.`}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Link
              href="/dashboard/hotels"
              className={`rounded-lg px-4 py-2 text-xs font-bold text-white transition-colors ${
                limitReached
                  ? "pointer-events-none bg-[#cfd2e3]"
                  : "bg-[#5b4bdb] hover:bg-[#4637c2]"
              }`}
            >
              Review a hotel
            </Link>
            <span className="text-xs text-[#667088]">
              {verifiedCount} hotel{verifiedCount === 1 ? "" : "s"} reviewed in total
            </span>
          </div>
        </div>

        <div className={`rounded-xl border border-[#e5e6f1] bg-white p-4 ${CARD_SHADOW} sm:p-5`}>
          <h3 className="font-heading font-bold text-[#14213d]">
            Earnings, last 7 days ({country.cur})
          </h3>
          <MiniChart rewards={rewards} />
        </div>
      </div>

      {/* Recent activity */}
      <div className="grid gap-3 sm:gap-4 lg:grid-cols-2">
        {/* Recent reviews */}
        <div className={`rounded-xl border border-[#e5e6f1] bg-white p-4 ${CARD_SHADOW} sm:p-5`}>
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-heading font-bold text-[#14213d]">Recent reviews</h3>
            <Link
              href="/dashboard/reviews"
              className="text-xs font-semibold text-[#5b4bdb] hover:text-[#4637c2]"
            >
              View all →
            </Link>
          </div>
          {recentReviews.length === 0 ? (
            <div className="py-8 text-center">
              <p className="text-sm font-bold text-[#14213d]">No reviews yet</p>
              <p className="mt-1 text-xs text-[#667088]">
                Pick a hotel to write your first review.
              </p>
              <Link
                href="/dashboard/hotels"
                className="mt-3 inline-block rounded-lg bg-[#5b4bdb] px-4 py-1.5 text-xs font-bold text-white hover:bg-[#4637c2]"
              >
                Browse hotels
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-[#e5e6f1]">
              {recentReviews.map((r) => (
                <li key={r.id} className="flex items-start justify-between gap-3 py-3">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold text-[#14213d]">
                      {r.hotelName}
                    </p>
                    <p className="truncate text-xs text-[#667088]">
                      {r.title} · {fmtShortDate(r.date)}
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <StarRating count={r.ratings.overall} size="sm" />
                    <div className="mt-1">
                      {r.status === "Verified" ? (
                        <span className="text-xs font-bold tabular-nums text-[#13795b]">
                          +{money(r.localAmount)}
                        </span>
                      ) : r.status === "Verifying" ? (
                        <span className="inline-block rounded-full bg-[#fff1d6] px-2 py-0.5 text-[10px] font-bold text-[#9a5b00]">
                          Verifying
                        </span>
                      ) : (
                        <span className="inline-block rounded-full bg-[#fde8e6] px-2 py-0.5 text-[10px] font-bold text-[#b42318]">
                          Rejected
                        </span>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Recent transactions */}
        <div className={`rounded-xl border border-[#e5e6f1] bg-white p-4 ${CARD_SHADOW} sm:p-5`}>
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-heading font-bold text-[#14213d]">Recent transactions</h3>
            <Link
              href="/dashboard/transactions"
              className="text-xs font-semibold text-[#5b4bdb] hover:text-[#4637c2]"
            >
              View all →
            </Link>
          </div>
          {recentTx.length === 0 ? (
            <div className="py-8 text-center">
              <p className="text-sm font-bold text-[#14213d]">No transactions yet</p>
              <p className="mt-1 text-xs text-[#667088]">
                Rewards and withdrawals will appear here.
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-[#e5e6f1]">
              {recentTx.map((t) => (
                <li key={t.id} className="flex items-start justify-between gap-3 py-3">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold text-[#14213d]">{t.desc}</p>
                    <p className="truncate text-xs text-[#667088]">
                      {fmtShortDate(t.date)} · {t.ref}
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p
                      className={`text-sm font-bold tabular-nums ${
                        t.type === "reward" ? "text-[#13795b]" : "text-[#b42318]"
                      }`}
                    >
                      {t.type === "reward" ? "+" : "−"}
                      {money(t.amount)}
                    </p>
                    <span className="text-[10px] text-[#667088]">
                      {t.type === "reward" ? usd(t.usd ?? 0) : t.status}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}