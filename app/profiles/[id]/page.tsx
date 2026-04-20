"use client";

import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";
import { useProfile } from "@/hooks/useProfiles";
import { useStartConversation } from "@/hooks/useStartConversation";
import { formatDistanceToNow } from "date-fns";

export default function ProfileDetailPage() {
  const params = useParams();
  const router = useRouter();
  const profileId = typeof params.id === "string" ? params.id : null;
  const { profile, isLoading } = useProfile(profileId);
  const { startConversation, isStarting } = useStartConversation();

  const handleStartChat = async () => {
    if (!profileId) return;
    const convId = await startConversation(profileId);
    if (convId) {
      router.push("/chat");
    } else {
      toast.error("Couldn't start conversation. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <svg className="w-8 h-8 animate-spin text-rose-400" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4 text-center px-6">
        <div className="text-5xl">🤷</div>
        <h2 className="text-lg font-extrabold text-gray-800">Profile not found</h2>
        <button
          onClick={() => router.back()}
          className="text-rose-500 font-semibold text-sm"
        >
          ← Go back
        </button>
      </div>
    );
  }

  const initials = profile.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const lastSeenText = profile.is_online
    ? "Online now"
    : profile.last_seen
      ? `Active ${formatDistanceToNow(new Date(profile.last_seen), { addSuffix: true })}`
      : "Recently active";

  return (
    <div className="flex flex-col h-full overflow-y-auto bg-gray-50">
      {/* Hero image */}
      <div className="relative w-full aspect-[3/4] max-h-[65vh] flex-shrink-0">
        {profile.avatar_url ? (
          <Image
            src={profile.avatar_url}
            alt={profile.name}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-rose-300 via-pink-400 to-rose-500 flex items-center justify-center">
            <span className="text-white font-extrabold text-8xl opacity-50">
              {initials}
            </span>
          </div>
        )}

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="absolute top-4 left-4 w-10 h-10 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/60 transition-colors"
          aria-label="Go back"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Name overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="flex items-end justify-between">
            <div>
              <h1 className="text-white font-extrabold text-4xl leading-tight">
                {profile.name.split(" ")[0]}
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-white/80 text-lg">{profile.age}</span>
                {profile.city && (
                  <>
                    <span className="text-white/40">·</span>
                    <span className="text-white/80 text-sm flex items-center gap-1">
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      {profile.city}
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Online status */}
            <div className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full ${
              profile.is_online
                ? "bg-emerald-500/90 text-white"
                : "bg-black/40 text-white/80"
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${profile.is_online ? "bg-white animate-pulse" : "bg-white/60"}`} />
              {lastSeenText}
            </div>
          </div>
        </div>
      </div>

      {/* Details card */}
      <div className="flex-1 bg-white rounded-t-3xl -mt-6 relative z-10 px-5 pt-6 pb-32">
        {/* Quick stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: "Age", value: String(profile.age) },
            { label: "Gender", value: profile.gender.charAt(0).toUpperCase() + profile.gender.slice(1) },
            { label: "City", value: profile.city ?? "—" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-gray-50 rounded-2xl px-3 py-3 text-center"
            >
              <div className="text-xs text-gray-400 mb-0.5">{stat.label}</div>
              <div className="font-bold text-gray-900 text-sm truncate">{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Bio */}
        {profile.bio && (
          <div className="mb-6">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">
              About
            </h3>
            <p className="text-gray-700 leading-relaxed text-sm">{profile.bio}</p>
          </div>
        )}

        {/* Member since */}
        <p className="text-xs text-gray-400 text-center">
          Member since {new Date(profile.created_at).toLocaleDateString("en-KE", { month: "long", year: "numeric" })}
        </p>
      </div>

      {/* Fixed CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 shadow-lg z-20">
        <button
          onClick={handleStartChat}
          disabled={isStarting}
          className="w-full bg-rose-500 hover:bg-rose-600 disabled:bg-rose-300 text-white font-bold text-base py-4 rounded-2xl transition-colors shadow-lg shadow-rose-100 flex items-center justify-center gap-2"
        >
          {isStarting ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Starting chat...
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Send a Message
            </>
          )}
        </button>
      </div>
    </div>
  );
}