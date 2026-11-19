"use client";

import { use, useState } from "react";
import Link from "next/link";
import { bySlug, imgSrc } from "@/lib/hotels";
import { useDashboard } from "@/lib/use-dashboard";
import { localAmount } from "@/lib/money";
import { VELLOEARN_REGISTER_URL } from "@/lib/constants";
import { ReviewForm } from "@/app/components/dashboard/ReviewForm";
import { TaskSuccess } from "@/app/components/dashboard/TaskSuccess";

type SubmittedInfo = { rewardUsd: number; hotelName: string };

export default function RatePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const hotel = bySlug(slug);
  const { reviewsFor, paywalled, country, money, ready } = useDashboard();
  const [submitted, setSubmitted] = useState<SubmittedInfo | null>(null);

  if (!hotel) {
    return (
      <div className="rounded-xl border border-[#e5e6f1] bg-white p-10 text-center">
        <h2 className="font-heading text-xl font-extrabold text-[#14213d]">
          Hotel not found
        </h2>
        <Link
          href="/dashboard/hotels"
          className="mt-3 inline-block text-sm font-semibold text-[#5b4bdb] hover:text-[#4637c2]"
        >
          ← Back to hotels
        </Link>
      </div>
    );
  }

  if (!ready) {
    return (
      <div className="py-12 text-center text-sm text-[#667088]">
        Loading…
      </div>
    );
  }

  // Success screen wins over the "already reviewed" fallback so the fresh
  // submission shows the animation immediately.
  if (submitted) {
    return (
      <TaskSuccess
        taskType="hotel-review"
        itemName={submitted.hotelName}
        rewardUsd={submitted.rewardUsd}
        rewardLocal={money(
          localAmount(submitted.rewardUsd, country.rate, country.dec),
        )}
        backHref="/dashboard/hotels"
        backLabel="Back to hotels"
      />
    );
  }

  const existing = reviewsFor(hotel.slug);

  if (existing && existing.status !== "Rejected") {
    return (
      <div className="rounded-xl border border-[#e5e6f1] bg-white p-10 text-center">
        <h2 className="font-heading text-xl font-extrabold text-[#14213d]">
          You already reviewed {hotel.name}
        </h2>
        <p className="mt-2 text-sm text-[#667088]">
          {existing.status === "Verified"
            ? "This review has been verified and the reward was credited."
            : "Your review is currently being verified."}
        </p>
        <Link
          href="/dashboard/tasks"
          className="mt-5 inline-block rounded-lg bg-[#5b4bdb] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#4637c2]"
        >
          See my tasks
        </Link>
      </div>
    );
  }

  if (paywalled) {
    return (
      <div className="rounded-xl border border-[#e5e6f1] bg-white p-10 text-center">
        <h2 className="font-heading text-xl font-extrabold text-[#14213d]">
          Free limit reached
        </h2>
        <p className="mt-2 text-sm text-[#667088]">
          You&apos;ve completed your 2 free reviews. Upgrade to keep reviewing.
        </p>
        <a
          href={VELLOEARN_REGISTER_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-block rounded-lg bg-rose-500 px-5 py-2.5 text-sm font-bold text-white hover:bg-rose-600"
        >
          Upgrade to premium
        </a>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl">
      <Link
        href="/dashboard/hotels"
        className="text-sm font-semibold text-[#667088] hover:text-[#14213d]"
      >
        ← Back to hotels
      </Link>

      {/* Reward strip — the reason they're here, above the fold */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#e5e6f1] bg-white p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-xl bg-[#eeecfd] text-xl">
            🏨
          </div>
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#667088]">
              Hotel review
            </p>
            <p className="font-heading text-sm font-extrabold text-[#14213d]">
              {hotel.name}
            </p>
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-[11px] font-semibold text-[#667088]">
            Reward
          </span>
          <b className="font-heading text-xl text-[#14213d]">
            ${hotel.pay.toFixed(2)}
          </b>
          <span className="text-xs font-bold text-[#13795b]">
            ≈{" "}
            {money(localAmount(hotel.pay, country.rate, country.dec))}
          </span>
        </div>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1.6fr_1fr]">
        <ReviewForm
          hotel={hotel}
          onSubmitted={(info) => setSubmitted(info)}
        />
        <aside className="space-y-4">
          <div className="overflow-hidden rounded-xl border border-[#e5e6f1] bg-white shadow-sm">
            <img
              src={imgSrc(hotel.img)}
              alt={hotel.name}
              className="aspect-[4/3] w-full object-cover"
            />
            <div className="space-y-1 p-4">
              <span className="rounded bg-[#eeecfd] px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-[#4637c2]">
                {hotel.city.split(",")[1]?.trim() || "Hotel"}
              </span>
              <h3 className="font-heading text-lg font-extrabold text-[#14213d]">
                {hotel.name}
              </h3>
              <p className="text-xs text-[#667088]">
                {hotel.flag} {hotel.city}
              </p>
              <p className="text-sm text-[#667088]">{hotel.desc}</p>
            </div>
          </div>

          <div className="rounded-xl border border-[#e5e6f1] bg-white p-4 shadow-sm">
            <h3 className="font-heading font-bold text-[#14213d]">
              Writing guidelines
            </h3>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-[#667088]">
              <li>Write at least 100 characters.</li>
              <li>Mention the hotel by name and describe your stay.</li>
              <li>
                Use your own words. Don&apos;t copy descriptions or previous
                reviews.
              </li>
              <li>Each hotel can be reviewed once.</li>
              <li>
                Reviews verify within 1 minute. Rewards credit on verification.
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}