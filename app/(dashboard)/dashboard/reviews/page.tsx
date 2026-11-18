"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useDashboard } from "@/lib/use-dashboard";
import type { Review } from "@/lib/storage";
import { StarRating } from "@/app/components/dashboard/StarRating";

const CARD =
  "rounded-xl border border-[#e5e6f1] bg-white shadow-[0_1px_2px_rgba(20,33,61,0.05),0_8px_24px_-16px_rgba(20,33,61,0.25)]";

const fmtDateTime = (iso: string) =>
  new Date(iso).toLocaleString("en-KE", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

const CRITERIA = [
  ["cleanliness", "Cleanliness"],
  ["service", "Service"],
  ["facilities", "Facilities"],
  ["value", "Value"],
] as const;

export default function ReviewsPage() {
  const { state, ready, money, usd } = useDashboard();
  if (!ready || !state) return null;

  const reviews = state.reviews;

  if (reviews.length === 0) {
    return (
      <div className={`${CARD} px-6 py-16 text-center`}>
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#eeecfd]">
          <svg
            viewBox="0 0 24 24"
            className="h-7 w-7 text-[#5b4bdb]"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M21 12a8 8 0 0 1-11.5 7.2L4 20l1.1-4.4A8 8 0 1 1 21 12z" />
          </svg>
        </div>
        <h2 className="font-heading mt-4 text-lg font-extrabold text-[#14213d]">
          No reviews yet
        </h2>
        <p className="mt-1 text-sm text-[#667088]">
          Pick a hotel and write your first review.
        </p>
        <Link
          href="/dashboard/hotels"
          className="mt-5 inline-block rounded-lg bg-[#5b4bdb] px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#4637c2]"
        >
          Browse hotels
        </Link>
      </div>
    );
  }

  const verified = reviews.filter((r) => r.status === "Verified").length;
  const verifying = reviews.filter((r) => r.status === "Verifying").length;
  const rejected = reviews.filter((r) => r.status === "Rejected").length;

  return (
    <div className="space-y-4">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <h2 className="font-heading text-xl font-extrabold text-[#14213d] sm:text-2xl">
            My reviews
          </h2>
          <p className="mt-1 text-xs text-[#667088]">
            {reviews.length} total · {verified} verified · {verifying} verifying
            {rejected > 0 ? ` · ${rejected} rejected` : ""}
          </p>
        </div>
        <Link
          href="/dashboard/hotels"
          className="inline-block self-start rounded-lg bg-[#5b4bdb] px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-[#4637c2] sm:self-auto sm:text-sm"
        >
          + New review
        </Link>
      </div>

      <div className="space-y-3">
        {reviews.map((r) => (
          <ReviewCard key={r.id} review={r} money={money} usd={usd} />
        ))}
      </div>
    </div>
  );
}

function ReviewCard({
  review: r,
  money,
  usd,
}: {
  review: Review;
  money: (n: number) => string;
  usd: (n: number) => string;
}) {
  const [expanded, setExpanded] = useState(false);
  const [now, setNow] = useState(() => Date.now());

  const isLong = r.text.length > 220;
  const shown = expanded || !isLong ? r.text : r.text.slice(0, 220) + "…";

  const inProgress = r.status === "Verifying" && !!r.due;

  // tick once a second while verification is running
  useEffect(() => {
    if (!inProgress) return;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [inProgress]);

  const pct =
    inProgress && r.due
      ? Math.min(
          100,
          Math.max(
            0,
            ((now - Date.parse(r.date)) / (r.due - Date.parse(r.date))) * 100,
          ),
        )
      : null;

  return (
    <article className={`${CARD} p-4 sm:p-5`}>
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
        <div className="min-w-0 flex-1">
          <h3 className="font-heading text-base font-extrabold text-[#14213d]">
            {r.hotelName}
          </h3>
          <p className="mt-0.5 text-xs text-[#667088]">{fmtDateTime(r.date)}</p>
        </div>
        <div className="shrink-0">
          {r.status === "Verified" && (
            <div className="text-right">
              <p className="text-sm font-bold tabular-nums text-[#13795b]">
                +{money(r.localAmount)}
              </p>
              <p className="text-[11px] text-[#667088]">{usd(r.usd)}</p>
            </div>
          )}
          {r.status === "Verifying" && (
            <span className="inline-block rounded-full bg-[#fff1d6] px-2.5 py-1 text-[11px] font-bold text-[#9a5b00]">
              Verifying
            </span>
          )}
          {r.status === "Rejected" && (
            <span className="inline-block rounded-full bg-[#fde8e6] px-2.5 py-1 text-[11px] font-bold text-[#b42318]">
              Rejected
            </span>
          )}
        </div>
      </div>

      <div className="mt-3 flex items-center gap-2">
        <StarRating count={r.ratings.overall} size="md" />
        <span className="text-sm font-bold text-[#14213d]">
          {r.ratings.overall}/5
        </span>
      </div>

      <h4 className="mt-3 font-heading text-sm font-bold text-[#14213d]">
        {r.title}
      </h4>
      <p className="mt-1 whitespace-pre-wrap text-sm leading-relaxed text-[#667088]">
        {shown}
      </p>
      {isLong && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-2 text-xs font-bold text-[#5b4bdb] hover:text-[#4637c2]"
        >
          {expanded ? "Show less" : "Read more"}
        </button>
      )}

      {r.status === "Verifying" && pct !== null && (
        <div className="mt-4 rounded-lg bg-[#f6f6fb] p-3">
          <div className="flex items-center justify-between text-xs text-[#667088]">
            <span>Verification in progress</span>
            <span className="tabular-nums">{Math.round(pct)}%</span>
          </div>
          <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-[#eeecfd]">
            <div
              className="h-full rounded-full bg-[#5b4bdb] transition-[width] duration-1000 ease-linear"
              style={{ width: `${pct}%` }}
            />
          </div>
          <p className="mt-2 text-[11px] text-[#667088]">
            {money(r.localAmount)} credited once verified.
          </p>
        </div>
      )}

      {r.status === "Rejected" && r.reasons.length > 0 && (
        <div className="mt-4 rounded-lg bg-[#fde8e6] p-3 text-xs text-[#b42318]">
          <p className="font-bold">No reward was credited. Rejected because:</p>
          <ul className="mt-1.5 list-disc space-y-0.5 pl-4">
            {r.reasons.map((x, i) => (
              <li key={i}>{x}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-[#e5e6f1] pt-3 text-[11px] text-[#667088]">
        {CRITERIA.map(([k, label]) => (
          <span key={k}>
            {label} <b className="text-[#14213d]">{r.ratings[k]}/5</b>
          </span>
        ))}
      </div>
    </article>
  );
}