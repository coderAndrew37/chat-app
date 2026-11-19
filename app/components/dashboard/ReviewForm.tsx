"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { reviewSchema, ReviewInput } from "@/lib/review-schema";
import { useDashboard } from "@/lib/use-dashboard";
import { Hotel } from "@/lib/hotels";

const CRITERIA = [
  ["overall", "Overall experience"],
  ["cleanliness", "Cleanliness"],
  ["service", "Customer service"],
  ["facilities", "Facilities"],
  ["value", "Value for money"],
] as const;

type Submitted = { rewardUsd: number; hotelName: string };

export function ReviewForm({
  hotel,
  onSubmitted,
}: {
  hotel: Hotel;
  onSubmitted: (info: Submitted) => void;
}) {
  const { submitTask, saveDraft, getDraft, ready } = useDashboard();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ReviewInput>({ resolver: zodResolver(reviewSchema) });

  // Restore draft once on mount
  useEffect(() => {
    if (!ready) return;
    const d = getDraft("hotel-review", hotel.slug);
    if (!d?.payload) return;
    const p = d.payload as {
      ratings?: Record<string, number>;
      title?: string;
      text?: string;
    };
    if (!p.ratings && !p.title && !p.text) return;
        reset({
      ratings: {
        overall: p.ratings?.overall ?? 0,
        cleanliness: p.ratings?.cleanliness ?? 0,
        service: p.ratings?.service ?? 0,
        facilities: p.ratings?.facilities ?? 0,
        value: p.ratings?.value ?? 0,
      },
       title: p.title ?? "",
       text: p.text ?? "",
     });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, hotel.slug]);

  const text = watch("text") ?? "";
  const title = watch("title") ?? "";
  const ratings = watch("ratings") ?? {};
  const ratedCount = Object.values(ratings).filter((v) => v && v > 0).length;
  const charOk = text.length >= 100;

  const onSubmit = (data: ReviewInput) => {
    submitTask({
      taskType: "hotel-review",
      taskSlug: hotel.slug,
      taskTitle: hotel.name,
      rewardUsd: hotel.pay,
      payload: {
        kind: "hotel-review",
        hotelSlug: hotel.slug,
        hotelCity: hotel.city,
        ratings: {
          overall: data.ratings.overall ?? 0,
          cleanliness: data.ratings.cleanliness ?? 0,
          service: data.ratings.service ?? 0,
          facilities: data.ratings.facilities ?? 0,
          value: data.ratings.value ?? 0,
        },
        title: data.title,
        text: data.text,
      },
    });
    onSubmitted({ rewardUsd: hotel.pay, hotelName: hotel.name });
  };

  const onSaveDraft = () => {
    saveDraft("hotel-review", hotel.slug, { ratings, title, text });
    toast.success("Draft saved. Pick it up any time.");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-xl border border-[#e5e6f1] bg-white p-5 shadow-[0_1px_2px_rgba(20,33,61,0.05),0_8px_24px_-16px_rgba(20,33,61,0.25)] sm:p-6"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="font-heading text-xl font-extrabold text-[#14213d]">
            Write your review
          </h2>
          <p className="mt-1 text-xs text-[#667088]">
            Rate each area, then explain your rating in your own words.
          </p>
        </div>
        <div className="shrink-0 rounded-full bg-[#f6f6fb] px-3 py-1.5 text-[11px] font-bold tabular-nums text-[#667088]">
          {ratedCount}/5 rated
        </div>
      </div>

      <div className="mt-5 divide-y divide-[#e5e6f1] overflow-hidden rounded-xl border border-[#e5e6f1]">
        {CRITERIA.map(([key, label]) => {
          const current = ratings[key] ?? 0;
          return (
            <div
              key={key}
              className="flex items-center justify-between gap-3 px-4 py-3"
            >
              <div className="min-w-0">
                <p className="text-sm font-semibold text-[#14213d]">{label}</p>
                <p className="text-[11px] text-[#667088]">
                  {current ? `Rated ${current}/5` : "Not rated"}
                </p>
              </div>
              <div className="flex shrink-0 gap-0.5">
                {[1, 2, 3, 4, 5].map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() =>
                      setValue(`ratings.${key}`, v, { shouldValidate: true })
                    }
                    className={`grid h-9 w-9 place-items-center rounded-lg text-xl leading-none transition-colors ${
                      v <= current
                        ? "text-amber-400"
                        : "text-[#cfd2e3] hover:text-amber-300"
                    }`}
                    aria-label={`Rate ${label} ${v} out of 5`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      {errors.ratings && (
        <p className="mt-2 text-xs text-[#b42318]">
          Give a star rating for every category.
        </p>
      )}

      <div className="mt-5">
        <label className="text-sm font-semibold text-[#14213d]">
          Review title
        </label>
        <input
          {...register("title")}
          maxLength={80}
          placeholder="Summarise your review in a few words"
          className="mt-1.5 w-full rounded-[10px] border border-[#cfd2e3] bg-white px-3 py-2 text-sm text-[#1c2438] placeholder:text-[#667088] focus:border-[#5b4bdb] focus:outline-none focus:ring-3 focus:ring-[#eeecfd]"
        />
        <div className="mt-1 flex justify-between text-[11px] text-[#667088]">
          <span />
          <span className="tabular-nums">{title.length}/80</span>
        </div>
        {errors.title && (
          <p className="text-xs text-[#b42318]">{errors.title.message}</p>
        )}
      </div>

      <div className="mt-4">
        <label className="text-sm font-semibold text-[#14213d]">
          Your review
        </label>
        <textarea
          {...register("text")}
          rows={8}
          maxLength={4000}
          placeholder={`Mention ${hotel.name} by name and describe your stay…`}
          className="mt-1.5 w-full rounded-[10px] border border-[#cfd2e3] bg-white px-3 py-2 text-sm text-[#1c2438] placeholder:text-[#667088] focus:border-[#5b4bdb] focus:outline-none focus:ring-3 focus:ring-[#eeecfd]"
        />
        <div className="mt-1 flex justify-between text-[11px]">
          <span
            className={charOk ? "text-[#13795b]" : "text-[#9a5b00]"}
          >
            {text.length} / 100 min
          </span>
          <span className="tabular-nums text-[#667088]">{text.length}/4000</span>
        </div>
        {errors.text && (
          <p className="text-xs text-[#b42318]">{errors.text.message}</p>
        )}
      </div>

      <label className="mt-5 flex items-start gap-2 rounded-lg bg-[#f6f6fb] px-3 py-2.5 text-xs text-[#667088]">
        <input
          type="checkbox"
          {...register("confirmed")}
          className="mt-0.5 accent-[#5b4bdb]"
        />
        <span>
          I confirm this review is my own and honestly reflects my experience.
        </span>
      </label>
      {errors.confirmed && (
        <p className="mt-1 text-xs text-[#b42318]">
          {errors.confirmed.message}
        </p>
      )}

      <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onSaveDraft}
          className="rounded-lg border border-[#e5e6f1] bg-white px-4 py-2.5 text-sm font-bold text-[#14213d] transition-colors hover:border-[#5b4bdb] hover:text-[#5b4bdb]"
        >
          Save draft
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-lg bg-[#5b4bdb] px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#4637c2] disabled:opacity-50"
        >
          Submit review
        </button>
      </div>
    </form>
  );
}