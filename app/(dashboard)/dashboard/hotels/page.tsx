// app/hotels/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { VELLOEARN_REGISTER_URL } from "@/lib/constants";
import { HOTELS, Hotel, imgSrc } from "@/lib/hotels";
import { useDashboard } from "@/lib/use-dashboard";

const PAGE_SIZE = 9;

const CATEGORY_RULES: Array<[string, string]> = [
  ["Resort", "Resort"],
  ["Villas", "Villa retreat"],
  ["Villa", "Villa retreat"],
  ["Lodge", "Lodge"],
  ["Retreat", "Retreat"],
  ["Inn", "Boutique inn"],
  ["Palace", "Luxury palace"],
  ["Suites", "Suites"],
  ["Haus", "Lodge"],
  ["Haven", "Retreat"],
];

const categoryFor = (name: string) =>
  CATEGORY_RULES.find(([k]) => name.includes(k))?.[1] ?? "City hotel";

const hashString = (s: string) => {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
};

const ratingFor = (slug: string) => 3.6 + (hashString(slug) % 14) / 10;
const reviewCountFor = (slug: string) => 100 + (hashString(slug) % 9900);

function Stars({ value }: { value: number }) {
  const full = Math.round(value);
  return (
    <span
      role="img"
      aria-label={`${value.toFixed(1)} out of 5 stars`}
      className="inline-flex items-center gap-px"
    >
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          aria-hidden="true"
          className={`h-3.5 w-3.5 ${i < full ? "text-amber-400" : "text-gray-200"}`}
          fill="currentColor"
        >
          <path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.9L12 17.8 5.8 21l1.2-6.9-5-4.9 6.9-1z" />
        </svg>
      ))}
    </span>
  );
}

function HotelCard({ hotel }: { hotel: Hotel }) {
  const { reviewsFor, paywalled, country } = useDashboard();
  const mine = reviewsFor(hotel.slug);
  const category = categoryFor(hotel.name);
  const rating = ratingFor(hotel.slug);
  const reviewCount = reviewCountFor(hotel.slug);

  const factor = 10 ** country.dec;
  const localPay = Math.round(hotel.pay * country.rate * factor) / factor;

  const cta = mine ? (
    mine.status === "Verified" ? (
      <Link
        href="/dashboard/reviews"
        className="inline-flex items-center gap-1 rounded-lg bg-[#e2f6ee] px-3 py-2 text-xs font-bold text-[#13795b] transition-colors hover:bg-[#d1ecdf]"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-3.5 w-3.5"
          fill="none"
          stroke="currentColor"
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M5 12l5 5 9-10" />
        </svg>
        Completed
      </Link>
    ) : mine.status === "Rejected" ? (
      <Link
        href={`/hotels/${hotel.slug}/rate`}
        className="inline-flex items-center gap-1 rounded-lg bg-[#fde8e6] px-3 py-2 text-xs font-bold text-[#b42318] transition-colors hover:bg-[#fbd0cc]"
      >
        Resubmit
      </Link>
    ) : (
      <Link
        href="/dashboard/reviews"
        className="inline-flex items-center gap-1 rounded-lg bg-[#fff1d6] px-3 py-2 text-xs font-bold text-[#9a5b00] transition-colors hover:bg-[#ffe6b8]"
      >
        Under verification
      </Link>
    )
  ) : paywalled ? (
    <button
      type="button"
      onClick={() => {
        toast("You've used your 2 free reviews. Upgrade to keep going.");
        window.open(VELLOEARN_REGISTER_URL, "_blank", "noopener,noreferrer");
      }}
      className="inline-flex items-center gap-1 rounded-lg bg-rose-500 px-3 py-2 text-xs font-bold text-white transition-colors hover:bg-rose-600"
    >
      Upgrade
    </button>
  ) : (
    <Link
      href={`/dashboard/hotels/${hotel.slug}/rate`}
      className="inline-flex items-center gap-1 rounded-lg bg-[#5b4bdb] px-3 py-2 text-xs font-bold text-white transition-colors hover:bg-[#4637c2]"
    >
      Review hotel
    </Link>
  );

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-[#e5e6f1] bg-white shadow-[0_1px_2px_rgba(20,33,61,0.05),0_8px_24px_-16px_rgba(20,33,61,0.25)] transition-shadow hover:shadow-[0_1px_2px_rgba(20,33,61,0.05),0_12px_32px_-12px_rgba(20,33,61,0.35)]">
      <div className="relative aspect-[16/10] overflow-hidden bg-[#e5e6f1]">
        <Image
          src={imgSrc(hotel.img)}
          alt={`${hotel.name}, ${hotel.city}`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <span className="absolute left-2.5 top-2.5 inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-[#14213d] shadow-sm">
          <span aria-hidden="true">{hotel.flag}</span>
          {hotel.city}
        </span>
        <span className="absolute right-2.5 top-2.5 rounded-full bg-[#ff7a00] px-2.5 py-1 text-[11px] font-bold text-white shadow-sm">
          ${hotel.pay.toFixed(2)}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-center justify-between gap-2">
          <span className="rounded-md bg-[#eeecfd] px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#4637c2]">
            {category}
          </span>
          <div className="flex items-center gap-1">
            <Stars value={rating} />
            <span className="text-[11px] font-semibold text-[#667088]">
              {rating.toFixed(1)}
            </span>
          </div>
        </div>

        <h3 className="font-heading line-clamp-2 text-base font-extrabold leading-snug text-[#14213d]">
          {hotel.name}
        </h3>

        <p className="line-clamp-2 text-xs leading-relaxed text-[#667088]">
          {hotel.desc}
        </p>

        <p className="text-[11px] font-medium text-[#667088]">
          {reviewCount.toLocaleString()} previous reviews
        </p>

        <div className="mt-auto flex items-center justify-between gap-2 border-t border-[#e5e6f1] pt-3">
          <div className="min-w-0">
            <p className="font-heading text-lg font-extrabold leading-none text-[#14213d]">
              ${hotel.pay.toFixed(2)}
            </p>
            <p className="mt-0.5 text-[11px] font-semibold text-[#13795b]">
              ≈ {country.cur}{" "}
              {localPay.toLocaleString(undefined, {
                minimumFractionDigits: 0,
                maximumFractionDigits: country.dec,
              })}
            </p>
          </div>
          {cta}
        </div>
      </div>
    </article>
  );
}

type Sort = "reward" | "low" | "reviews" | "rating" | "name";

const SORTS: { value: Sort; label: string }[] = [
  { value: "reward", label: "Highest reward" },
  { value: "low", label: "Lowest reward" },
  { value: "reviews", label: "Most reviews" },
  { value: "rating", label: "Top rated" },
  { value: "name", label: "Name A–Z" },
];

function pageRange(current: number, total: number): (number | "gap")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 4) return [1, 2, 3, 4, 5, "gap", total];
  if (current >= total - 3)
    return [1, "gap", total - 4, total - 3, total - 2, total - 1, total];
  return [1, "gap", current - 1, current, current + 1, "gap", total];
}

export default function HotelsPage() {
  const { state, ready, freeUsed, limit } = useDashboard();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");
  const [sort, setSort] = useState<Sort>("reward");
  const [page, setPage] = useState(1);
  const topRef = useRef<HTMLDivElement>(null);

  const categories = useMemo(() => {
    const set = new Set<string>();
    HOTELS.forEach((h) => set.add(categoryFor(h.name)));
    return Array.from(set).sort();
  }, []);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    const list = HOTELS.filter((h) => {
      if (cat !== "all" && categoryFor(h.name) !== cat) return false;
      if (!needle) return true;
      return `${h.name} ${h.city} ${h.desc}`.toLowerCase().includes(needle);
    });
    return [...list].sort((a, b) => {
      switch (sort) {
        case "reward":
          return b.pay - a.pay;
        case "low":
          return a.pay - b.pay;
        case "reviews":
          return reviewCountFor(b.slug) - reviewCountFor(a.slug);
        case "rating":
          return ratingFor(b.slug) - ratingFor(a.slug);
        case "name":
          return a.name.localeCompare(b.name);
      }
    });
  }, [q, cat, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const startIdx = (safePage - 1) * PAGE_SIZE;
  const endIdx = startIdx + PAGE_SIZE;
  const paginated = filtered.slice(startIdx, endIdx);

  const goToPage = (n: number) => {
    if (n === safePage || n < 1 || n > totalPages) return;
    setPage(n);
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (!ready || !state) return null;

  const inProgress = state.reviews.filter((r) => r.status === "Verifying").length;

  return (
    <div ref={topRef} className="scroll-mt-32 space-y-4">
      {/* Summary strip */}
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-xl border border-[#e5e6f1] bg-white p-3 shadow-sm">
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#667088]">
            Open tasks
          </p>
          <p className="font-heading mt-1 text-lg font-extrabold leading-none text-[#14213d]">
            {HOTELS.length}
          </p>
        </div>
        <div className="rounded-xl border border-[#e5e6f1] bg-white p-3 shadow-sm">
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#667088]">
            Free reviews left
          </p>
          <p className="font-heading mt-1 text-lg font-extrabold leading-none text-[#14213d]">
            {Math.max(0, limit - freeUsed)}
            <span className="text-xs font-bold text-[#667088]">/{limit}</span>
          </p>
        </div>
        <div className="rounded-xl border border-[#e5e6f1] bg-white p-3 shadow-sm">
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#667088]">
            In progress
          </p>
          <p className="font-heading mt-1 text-lg font-extrabold leading-none text-[#14213d]">
            {inProgress}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-2.5 sm:flex-row">
        <input
          type="search"
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setPage(1);
          }}
          placeholder="Search hotels, cities or descriptions"
          aria-label="Search hotels"
          className="w-full flex-1 rounded-[10px] border border-[#cfd2e3] bg-white px-3 py-2 text-sm text-[#1c2438] placeholder:text-[#667088] focus:border-[#5b4bdb] focus:outline-none focus:ring-3 focus:ring-[#eeecfd]"
        />
        <select
          value={cat}
          onChange={(e) => {
            setCat(e.target.value);
            setPage(1);
          }}
          aria-label="Category"
          className="rounded-[10px] border border-[#cfd2e3] bg-white px-3 py-2 text-sm text-[#1c2438] focus:border-[#5b4bdb] focus:outline-none focus:ring-3 focus:ring-[#eeecfd] sm:w-48"
        >
          <option value="all">All categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <select
          value={sort}
          onChange={(e) => {
            setSort(e.target.value as Sort);
            setPage(1);
          }}
          aria-label="Sort hotels"
          className="rounded-[10px] border border-[#cfd2e3] bg-white px-3 py-2 text-sm text-[#1c2438] focus:border-[#5b4bdb] focus:outline-none focus:ring-3 focus:ring-[#eeecfd] sm:w-48"
        >
          {SORTS.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      <p className="text-xs font-medium text-[#667088]">
        Showing{" "}
        <b className="text-[#14213d]">
          {filtered.length === 0 ? 0 : startIdx + 1}–{Math.min(endIdx, filtered.length)}
        </b>{" "}
        of <b className="text-[#14213d]">{filtered.length}</b> hotels
      </p>

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-[#e5e6f1] bg-white px-6 py-16 text-center">
          <p className="font-heading text-base font-extrabold text-[#14213d]">
            No hotels match
          </p>
          <p className="mt-1 text-sm text-[#667088]">
            Try a different search or category.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
            {paginated.map((hotel) => (
              <HotelCard key={hotel.slug} hotel={hotel} />
            ))}
          </div>

          {totalPages > 1 && (
            <nav
              aria-label="Pagination"
              className="flex flex-col items-center justify-between gap-3 border-t border-[#e5e6f1] pt-5 sm:flex-row"
            >
              <p className="text-xs text-[#667088]">
                Page <b className="text-[#14213d]">{safePage}</b> of {totalPages}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-1">
                <button
                  type="button"
                  onClick={() => goToPage(safePage - 1)}
                  disabled={safePage === 1}
                  className="rounded-lg border border-[#e5e6f1] bg-white px-3 py-1.5 text-xs font-semibold text-[#14213d] transition-colors hover:border-[#5b4bdb] hover:text-[#5b4bdb] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-[#e5e6f1] disabled:hover:text-[#14213d]"
                  aria-label="Previous page"
                >
                  ← Prev
                </button>

                {pageRange(safePage, totalPages).map((p, i) =>
                  p === "gap" ? (
                    <span
                      key={`gap-${i}`}
                      aria-hidden="true"
                      className="px-1 text-xs text-[#667088]"
                    >
                      …
                    </span>
                  ) : (
                    <button
                      key={p}
                      type="button"
                      onClick={() => goToPage(p)}
                      aria-current={p === safePage ? "page" : undefined}
                      className={`min-w-[2rem] rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-colors ${
                        p === safePage
                          ? "bg-[#5b4bdb] text-white"
                          : "border border-[#e5e6f1] bg-white text-[#14213d] hover:border-[#5b4bdb] hover:text-[#5b4bdb]"
                      }`}
                    >
                      {p}
                    </button>
                  ),
                )}

                <button
                  type="button"
                  onClick={() => goToPage(safePage + 1)}
                  disabled={safePage === totalPages}
                  className="rounded-lg border border-[#e5e6f1] bg-white px-3 py-1.5 text-xs font-semibold text-[#14213d] transition-colors hover:border-[#5b4bdb] hover:text-[#5b4bdb] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-[#e5e6f1] disabled:hover:text-[#14213d]"
                  aria-label="Next page"
                >
                  Next →
                </button>
              </div>
            </nav>
          )}
        </>
      )}
    </div>
  );
}