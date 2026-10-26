"use client";

import Image from "next/image";
import { PROFILES } from "@/data";
import type { Profile } from "@/types";
import { VELLOEARN_REGISTER_URL } from "@/lib/constants";
import Link from "next/link";

function ProfileCard({ profile }: { profile: Profile }) {
  return (
    <Link
      href={VELLOEARN_REGISTER_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 aspect-[2/3] block"
    >
      <Image
        src={profile.imageUrl}
        alt={profile.name}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      
      <div className="absolute top-3 right-3">
        <span className="flex items-center gap-1.5 bg-emerald-500 text-white text-[10px] font-semibold px-2 py-1 rounded-full">
          <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
          Waiting
        </span>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="text-white font-bold text-sm leading-tight mb-0.5">
          {profile.name}, {profile.age}
        </div>
        <div className="text-white/70 text-xs">{profile.city}</div>
        <div className="mt-3 bg-white/20 backdrop-blur-md text-white text-xs font-bold text-center py-2 rounded-lg group-hover:bg-rose-500 transition-colors">
          Chat & Earn
        </div>
      </div>
    </Link>
  );
}

export default function ChattingGrid() {
  // Use the first 8 profiles for the homepage preview
  const previewProfiles = PROFILES.slice(0, 8);

  return (
    <section id="chatting" className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <p className="text-rose-500 font-semibold text-xs uppercase tracking-wider mb-2">
              Live right now
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              People waiting to be chatted with
            </h2>
            <p className="text-gray-500 text-sm mt-2 max-w-xl">
              Real users on the platform right now. They&apos;re looking for conversation — and you get paid to give it to them.
            </p>
          </div>
          <Link
            href="/earn/chatting"
            className="text-sm font-semibold text-rose-500 hover:text-rose-600 transition-colors shrink-0"
          >
            See all active chatters →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {previewProfiles.map((profile) => (
            <ProfileCard key={profile.id} profile={profile} />
          ))}
        </div>
      </div>
    </section>
  );
}