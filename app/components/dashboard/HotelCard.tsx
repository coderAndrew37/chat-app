"use client";
import Link from "next/link";
import { Hotel } from "@/lib/hotels";
import { useDashboard } from "@/lib/use-dashboard";
import { StarRating } from "./StarRating";
import { toast } from "sonner";
import { VELLOEARN_REGISTER_URL } from "@/lib/constants";

export function HotelCard({ hotel }: { hotel: Hotel }) {
  const { alreadyReviewed, paywalled, country } = useDashboard();
  const reviewed = alreadyReviewed(hotel.slug);

  const local = hotel.pay * country.rate;

  const cta = reviewed ? (
    <Link
      href={`/hotels/${hotel.slug}/rate`}
      className="mt-2 block rounded-md bg-emerald-50 py-2 text-center text-xs font-bold text-emerald-700"
    >
      Completed ✓
    </Link>
  ) : paywalled ? (
    <button
      onClick={() => {
        toast("You’ve used your 2 free reviews.");
        window.open(VELLOEARN_REGISTER_URL, "_blank", "noopener");
      }}
      className="mt-2 w-full rounded-md bg-rose-500 py-2 text-xs font-bold text-white"
    >
      Upgrade to review
    </button>
  ) : (
    <Link
      href={`/hotels/${hotel.slug}/rate`}
      className="mt-2 block rounded-md bg-indigo-600 py-2 text-center text-xs font-bold text-white hover:bg-indigo-700"
    >
      Review hotel
    </Link>
  );

  return (
    <article className="overflow-hidden rounded-xl border bg-white shadow-sm">
      <div className="relative aspect-[4/3]">
        <img src={hotel.img} alt={hotel.name} className="h-full w-full object-cover" />
        <span className="absolute left-2 top-2 rounded-full bg-white/95 px-2 py-0.5 text-[11px] font-semibold">
          {hotel.flag} {hotel.city}
        </span>
        <span className="absolute right-2 top-2 rounded-full bg-orange-500 px-2 py-0.5 text-[11px] font-bold text-white">
          ${hotel.pay.toFixed(2)}
        </span>
      </div>
      <div className="space-y-1 p-3">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span className="rounded bg-indigo-50 px-1.5 py-0.5 font-bold text-indigo-700">
            {hotel.city.split(",")[0]}
          </span>
          <StarRating count={4} />
        </div>
        <h3 className="line-clamp-1 text-sm font-bold text-gray-900">{hotel.name}</h3>
        <p className="line-clamp-2 text-[11px] text-gray-500">{hotel.desc}</p>
        <div className="flex items-baseline justify-between pt-1">
          <b className="text-sm text-gray-900">${hotel.pay.toFixed(2)}</b>
          <span className="text-[11px] font-semibold text-emerald-700">
            ≈ {country.cur} {Math.round(local).toLocaleString()}
          </span>
        </div>
        {cta}
      </div>
    </article>
  );
}