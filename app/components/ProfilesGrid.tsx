"use client";

import Image from "next/image";
import { PROFILES } from "@/data";
import type { Profile } from "@/types";

interface ProfileCardProps {
  profile: Profile;
  onApplyClick: () => void;
}

// Individual card — lock icon overlay, no "Chat Now" button
// This is social proof / platform preview, not a browse UI
function ProfileCard({ profile, onApplyClick }: ProfileCardProps) {
  return (
    <div
      className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 aspect-[2/3]"
      onClick={onApplyClick}
    >
      <Image
        src={profile.imageUrl}
        alt={profile.name}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

      {/* Online indicator */}
      <div className="absolute top-3 right-3">
        <span className="flex items-center gap-1.5 bg-green-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
          <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
          Waiting
        </span>
      </div>

      {/* Locked overlay — appears on hover */}
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2 backdrop-blur-sm">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <span className="text-white text-xs font-semibold">Apply to unlock</span>
        </div>
      </div>

      {/* Name / location */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="text-white font-bold text-base leading-tight">
          {profile.name}, {profile.age}
        </div>
        <div className="text-white/70 text-xs mt-0.5">{profile.city}</div>
      </div>
    </div>
  );
}

interface ProfilesGridProps {
  onApplyClick: () => void;
}

export default function ProfilesGrid({ onApplyClick }: ProfilesGridProps) {
  return (
    <section id="waiting" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="text-center mb-12">
          <span className="text-rose-500 font-semibold text-sm uppercase tracking-wider">
            Live right now
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2 mb-3">
            People waiting to be chatted with
          </h2>
          <p className="text-gray-500 max-w-md mx-auto">
            These are real users on the platform right now. They&apos;re looking
            for conversation — and you get paid to give it to them.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {PROFILES.map((profile) => (
            <ProfileCard
              key={profile.id}
              profile={profile}
              onApplyClick={onApplyClick}
            />
          ))}
        </div>

        {/* Blurred "more profiles" hint */}
        <div className="mt-6 relative">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 blur-sm pointer-events-none select-none opacity-40">
            {PROFILES.slice(0, 6).map((profile) => (
              <div key={`blur-${profile.id}`} className="aspect-[2/3] rounded-2xl bg-gray-200 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <div className="text-white font-bold text-sm">{profile.name}</div>
                </div>
              </div>
            ))}
          </div>
          {/* Unlock CTA over the blur */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center bg-white/90 backdrop-blur-sm rounded-2xl px-8 py-6 shadow-xl border border-gray-100">
              <p className="text-gray-900 font-bold text-lg mb-1">
                +247 more waiting
              </p>
              <p className="text-gray-500 text-sm mb-5">
                Apply to unlock access and start earning
              </p>
              <button
                onClick={onApplyClick}
                className="bg-rose-500 hover:bg-rose-600 text-white font-bold px-7 py-3 rounded-full shadow-md shadow-rose-200 transition-all hover:scale-105 active:scale-95 text-sm"
              >
                Apply to Join the Team
              </button>
            </div>
          </div>
        </div>

        {/* Trust row */}
        <div className="mt-14 flex flex-wrap justify-center gap-6 sm:gap-10">
          {[
            { icon: "✅", label: "Verified Profiles", sub: "Real people only" },
            { icon: "🔒", label: "100% Secure", sub: "Data protected" },
            { icon: "💸", label: "M-Pesa Payouts", sub: "Instant, always" },
            { icon: "🕐", label: "24/7 Active", sub: "Someone always online" },
          ].map(({ icon, label, sub }) => (
            <div key={label} className="flex items-center gap-3">
              <span className="text-2xl">{icon}</span>
              <div>
                <div className="text-sm font-semibold text-gray-800">{label}</div>
                <div className="text-xs text-gray-400">{sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}