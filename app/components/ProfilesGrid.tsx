"use client";

import Image from "next/image";
import { PROFILES } from "@/data";
import type { Profile } from "@/types";

interface ProfileCardProps {
  profile: Profile;
  onChatClick: () => void;
}

function ProfileCard({ profile, onChatClick }: ProfileCardProps) {
  return (
    <div
      className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 aspect-[2/3]"
      onClick={onChatClick}
    >
      <Image
        src={profile.imageUrl}
        alt={profile.name}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

      {/* Online indicator */}
      <div className="absolute top-3 right-3">
        <span className="flex items-center gap-1.5 bg-green-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
          <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
          Online
        </span>
      </div>

      {/* Bottom info */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="mb-2">
          <div className="text-white font-bold text-lg leading-tight">
            {profile.name}, {profile.age}
          </div>
          <div className="text-white/80 text-sm">{profile.city}</div>
        </div>
        <button
          className="w-full bg-rose-500 hover:bg-rose-600 text-white text-sm font-semibold py-2 rounded-xl transition-colors opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-200"
          onClick={(e) => {
            e.stopPropagation();
            onChatClick();
          }}
        >
          Chat Now
        </button>
      </div>
    </div>
  );
}

interface ProfilesGridProps {
  onProfileClick: () => void;
}

export default function ProfilesGrid({ onProfileClick }: ProfilesGridProps) {
  return (
    <section id="profiles" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
            🔥 Hot Singles Online Now
          </h2>
          <p className="text-gray-500">Click any profile to start chatting</p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {PROFILES.map((profile) => (
            <ProfileCard
              key={profile.id}
              profile={profile}
              onChatClick={onProfileClick}
            />
          ))}
        </div>

        {/* Trust badges */}
        <div className="mt-12 flex flex-wrap justify-center gap-6 sm:gap-10">
          {[
            { icon: "✅", label: "Verified Profiles", sub: "Real people only" },
            { icon: "🔒", label: "100% Secure", sub: "Data protected" },
            { icon: "🕐", label: "24/7 Support", sub: "Always here" },
            { icon: "💰", label: "Earn Rewards", sub: "Chat & get paid" },
          ].map(({ icon, label, sub }) => (
            <div key={label} className="flex items-center gap-3">
              <span className="text-2xl">{icon}</span>
              <div>
                <div className="text-sm font-semibold text-gray-800">
                  {label}
                </div>
                <div className="text-xs text-gray-400">{sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* View all */}
        <div className="mt-10 text-center">
          <button
            onClick={onProfileClick}
            className="bg-rose-500 hover:bg-rose-600 text-white font-bold px-8 py-3.5 rounded-full shadow-md shadow-rose-100 transition-all hover:scale-105 active:scale-95"
          >
            View All Profiles
          </button>
        </div>
      </div>
    </section>
  );
}
