"use client";
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

export function ReviewForm({ hotel }: { hotel: Hotel }) {
  const { submitReview, country, state } = useDashboard();
  const {
    register, handleSubmit, watch, setValue,
    formState: { errors, isSubmitting },
  } = useForm<ReviewInput>({ resolver: zodResolver(reviewSchema) });

  const text = watch("text") ?? "";
  const ratings = watch("ratings") ?? {};

  const onSubmit = (data: ReviewInput) => {
    submitReview({
      hotelSlug: hotel.slug,
      hotelName: hotel.name,
      ratings: data.ratings,
      title: data.title,
      text: data.text,
      usd: hotel.pay,
      rate: country.rate,
      localAmount: hotel.pay * country.rate,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="rounded-xl border bg-white p-4 sm:p-6">
      <h2 className="font-heading text-xl font-bold">Write your review</h2>
      <p className="mt-1 text-sm text-gray-500">
        Rate each area, then explain your rating in your own words.
      </p>

      <div className="mt-4 divide-y">
        {CRITERIA.map(([key, label]) => (
          <div key={key} className="flex items-center justify-between py-3">
            <span className="text-sm">{label}</span>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setValue(`ratings.${key}`, v, { shouldValidate: true })}
                  className={`text-2xl leading-none ${
                    v <= (ratings[key] ?? 0) ? "text-amber-400" : "text-gray-300"
                  }`}
                  aria-label={`${v} star${v > 1 ? "s" : ""}`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      {errors.ratings && (
        <p className="mt-1 text-xs text-red-600">Give a star rating for every category.</p>
      )}

      <div className="mt-4">
        <label className="text-sm font-semibold">Review title</label>
        <input
          {...register("title")}
          maxLength={80}
          placeholder="Summarise your review in a few words"
          className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
        />
        <div className="mt-0.5 flex justify-between text-xs text-gray-400">
          <span />
          <span>{(watch("title") ?? "").length}/80</span>
        </div>
        {errors.title && <p className="text-xs text-red-600">{errors.title.message}</p>}
      </div>

      <div className="mt-4">
        <label className="text-sm font-semibold">Your review</label>
        <textarea
          {...register("text")}
          rows={8}
          maxLength={4000}
          placeholder={`Mention ${hotel.name} by name and describe your stay…`}
          className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
        />
        <div className="mt-0.5 flex justify-between text-xs">
          <span className={text.length < 100 ? "text-amber-600" : "text-emerald-600"}>
            {text.length} / 100 characters minimum
          </span>
          <span className="text-gray-400">{text.length}/4000</span>
        </div>
        {errors.text && <p className="text-xs text-red-600">{errors.text.message}</p>}
      </div>

      <label className="mt-4 flex items-start gap-2 text-xs text-gray-600">
        <input type="checkbox" {...register("confirmed")} className="mt-0.5" />
        I confirm this review is my own and honestly reflects my experience.
      </label>
      {errors.confirmed && (
        <p className="text-xs text-red-600">{errors.confirmed.message}</p>
      )}

      <div className="mt-5 flex gap-2">
        <button
          type="button"
          onClick={() => toast("Draft saved.")}
          className="rounded-lg border px-4 py-2 text-sm font-bold"
        >
          Save draft
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-bold text-white disabled:opacity-50"
        >
          Submit review
        </button>
      </div>
    </form>
  );
}