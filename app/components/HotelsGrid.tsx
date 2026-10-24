"use client";

import Image from "next/image";
import { VELLOEARN_REGISTER_URL } from "@/lib/constants";
import { HOTELS, Hotel } from "@/data/hotels";

function StarRating({ count }: { count: number }) {
  return (
    <span className="text-amber-400 text-xs tracking-tight" aria-label={`${count} stars`}>
      {"★".repeat(count)}
    </span>
  );
}

function HotelCard({ hotel }: { hotel: Hotel }) {
  return (
    <a
      href={VELLOEARN_REGISTER_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block rounded-xl overflow-hidden bg-gray-100 aspect-[3/4] shadow-sm hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
    >
      <Image
        src={hotel.imageUrl}
        alt={`${hotel.name}, ${hotel.city}`}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
      />

      {/* Dark gradient for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

      {/* Payout badge — top right */}
      <div className="absolute top-2.5 right-2.5 bg-white text-gray-900 rounded-md px-2 py-1 shadow-sm">
        <div className="text-[10px] font-medium text-gray-500 leading-none">Earn</div>
        <div className="text-sm font-bold leading-tight">KES {hotel.reviewPayKES}</div>
      </div>

      {/* Bottom content */}
      <div className="absolute bottom-0 left-0 right-0 p-3">
        <div className="flex items-center gap-1 mb-1">
          <StarRating count={hotel.stars} />
          <span className="text-white/60 text-[10px]">·</span>
          <span className="text-white/70 text-[10px] font-medium">{hotel.city}</span>
        </div>
        <h3 className="text-white text-sm font-bold leading-snug mb-2 line-clamp-2">
          {hotel.name}
        </h3>

        {/* Review meta row */}
        <div className="flex items-center justify-between text-[10px] text-white/70 mb-2.5">
          <span>{hotel.reviewType}</span>
          <span>~{hotel.estMinutes} min</span>
        </div>

        <div className="bg-white text-gray-900 text-xs font-bold text-center py-2 rounded-md group-hover:bg-rose-500 group-hover:text-white transition-colors">
          Review this hotel
        </div>
      </div>
    </a>
  );
}

export default function HotelsGrid() {
  return (
    <section id="hotels" className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <p className="text-rose-500 font-semibold text-xs uppercase tracking-wider mb-2">
              Open review tasks
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              Hotels waiting to be reviewed
            </h2>
            <p className="text-gray-500 text-sm mt-2 max-w-xl">
              Each property needs a real review from a real person. Pick one, submit your
              findings, get paid to M-Pesa. No scripts, no fake reviews.
            </p>
          </div>
          <div className="text-sm text-gray-500 shrink-0">
            <span className="font-semibold text-gray-900">{HOTELS.length}</span> open tasks
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {HOTELS.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400">
          <p>Payouts are per completed review. Tasks refresh daily.</p>
          <a
            href={VELLOEARN_REGISTER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-rose-500 hover:text-rose-600 transition-colors"
          >
            See all open tasks →
          </a>
        </div>
      </div>
    </section>
  );
}