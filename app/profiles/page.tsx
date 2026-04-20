"use client";

import { useProfiles } from "@/hooks/useProfiles";
import { useStartConversation } from "@/hooks/useStartConversation";
import type { ProfileRow } from "@/types/database";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import { toast } from "sonner";

// ─── Types ────────────────────────────────────────────────────────────────────

interface SwipeState {
  isDragging: boolean;
  startX: number;
  currentX: number;
  direction: "left" | "right" | null;
}

interface FilterState {
  gender: "" | "male" | "female" | "other";
  minAge: number;
  maxAge: number;
}

// ─── ProfileCard ──────────────────────────────────────────────────────────────

interface ProfileCardProps {
  profile: ProfileRow;
  isTop: boolean;
  swipeOffset: number;
  swipeDirection: "left" | "right" | null;
  onDragStart: (x: number) => void;
  onDragMove: (x: number) => void;
  onDragEnd: () => void;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  onViewProfile: (id: string) => void;
}

function ProfileCard({
  profile,
  isTop,
  swipeOffset,
  swipeDirection,
  onDragStart,
  onDragMove,
  onDragEnd,
  onSwipeLeft,
  onSwipeRight,
  onViewProfile,
}: ProfileCardProps) {
  const rotation = swipeOffset * 0.08;
  const opacity = isTop ? 1 : Math.max(0.6, 1 - Math.abs(swipeOffset) * 0.002);

  const initials = profile.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div
      className="absolute inset-0 select-none touch-none"
      style={{
        transform: isTop
          ? `translateX(${swipeOffset}px) rotate(${rotation}deg)`
          : `scale(${isTop ? 1 : 0.95})`,
        opacity,
        transition: isTop && Math.abs(swipeOffset) < 5 ? "transform 0.3s ease, opacity 0.3s ease" : "none",
        zIndex: isTop ? 10 : 5,
        cursor: isTop ? "grab" : "default",
      }}
      onMouseDown={(e) => isTop && onDragStart(e.clientX)}
      onMouseMove={(e) => isTop && onDragMove(e.clientX)}
      onMouseUp={() => isTop && onDragEnd()}
      onMouseLeave={() => isTop && onDragEnd()}
      onTouchStart={(e) => isTop && onDragStart(e.touches[0].clientX)}
      onTouchMove={(e) => isTop && onDragMove(e.touches[0].clientX)}
      onTouchEnd={() => isTop && onDragEnd()}
    >
      {/* Card */}
      <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl">
        {/* Background */}
        {profile.avatar_url ? (
          <Image
            src={profile.avatar_url}
            alt={profile.name}
            fill
            className="object-cover"
            draggable={false}
          />
        ) : (
          <div className="w-full h-full bg-linear-to-br from-rose-300 via-pink-400 to-rose-500 flex items-center justify-center">
            <span className="text-white font-extrabold text-7xl opacity-60">
              {initials}
            </span>
          </div>
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

        {/* Like / Nope stamps */}
        {isTop && swipeDirection === "right" && (
          <div
            className="absolute top-10 left-6 border-4 border-emerald-400 text-emerald-400 font-extrabold text-3xl px-4 py-1 rounded-xl rotate-[-15deg] opacity-90"
            style={{ opacity: Math.min(1, Math.abs(swipeOffset) / 60) }}
          >
            LIKE 💚
          </div>
        )}
        {isTop && swipeDirection === "left" && (
          <div
            className="absolute top-10 right-6 border-4 border-rose-400 text-rose-400 font-extrabold text-3xl px-4 py-1 rounded-xl rotate-[15deg] opacity-90"
            style={{ opacity: Math.min(1, Math.abs(swipeOffset) / 60) }}
          >
            NOPE ✕
          </div>
        )}

        {/* Online badge */}
        {profile.is_online && (
          <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-black/40 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            Online
          </div>
        )}

        {/* Profile info */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-white font-extrabold text-3xl leading-tight">
                {profile.name.split(" ")[0]}
                <span className="font-light text-white/80 ml-2 text-2xl">
                  {profile.age}
                </span>
              </h2>
              {profile.city && (
                <p className="text-white/70 text-sm mt-1 flex items-center gap-1">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  {profile.city}
                </p>
              )}
              {profile.bio && (
                <p className="text-white/60 text-sm mt-2 line-clamp-2 max-w-[240px]">
                  {profile.bio}
                </p>
              )}
            </div>

            {/* View profile button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onViewProfile(profile.id);
              }}
              className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              aria-label="View full profile"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── SwipeDeck ────────────────────────────────────────────────────────────────

interface SwipeDeckProps {
  profiles: ProfileRow[];
  onLike: (profile: ProfileRow) => void;
  onPass: (profile: ProfileRow) => void;
  onViewProfile: (id: string) => void;
}

function SwipeDeck({ profiles, onLike, onPass, onViewProfile }: SwipeDeckProps) {
  const [topIndex, setTopIndex] = useState(0);
  const [swipe, setSwipe] = useState<SwipeState>({
    isDragging: false,
    startX: 0,
    currentX: 0,
    direction: null,
  });
  const [isAnimatingOut, setIsAnimatingOut] = useState<"left" | "right" | null>(null);
  const animatingRef = useRef(false);

  const SWIPE_THRESHOLD = 80;

  const advance = useCallback(
    (direction: "left" | "right") => {
      if (animatingRef.current || topIndex >= profiles.length) return;
      animatingRef.current = true;
      setIsAnimatingOut(direction);

      setTimeout(() => {
        const profile = profiles[topIndex];
        if (direction === "right") onLike(profile);
        else onPass(profile);
        setTopIndex((i) => i + 1);
        setIsAnimatingOut(null);
        setSwipe({ isDragging: false, startX: 0, currentX: 0, direction: null });
        animatingRef.current = false;
      }, 350);
    },
    [topIndex, profiles, onLike, onPass],
  );

  const handleDragStart = (x: number) => {
    if (animatingRef.current) return;
    setSwipe({ isDragging: true, startX: x, currentX: x, direction: null });
  };

  const handleDragMove = (x: number) => {
    if (!swipe.isDragging) return;
    const offset = x - swipe.startX;
    setSwipe((s) => ({
      ...s,
      currentX: x,
      direction: offset > 20 ? "right" : offset < -20 ? "left" : null,
    }));
  };

  const handleDragEnd = () => {
    if (!swipe.isDragging) return;
    const offset = swipe.currentX - swipe.startX;
    if (Math.abs(offset) >= SWIPE_THRESHOLD) {
      advance(offset > 0 ? "right" : "left");
    } else {
      setSwipe({ isDragging: false, startX: 0, currentX: 0, direction: null });
    }
  };

  if (topIndex >= profiles.length) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4 text-center px-8">
        <div className="text-6xl">🎉</div>
        <h3 className="text-xl font-extrabold text-gray-800">
          You&apos;ve seen everyone!
        </h3>
        <p className="text-sm text-gray-500">
          Check back later for new profiles, or adjust your filters.
        </p>
      </div>
    );
  }

  const swipeOffset =
    isAnimatingOut === "right"
      ? 500
      : isAnimatingOut === "left"
        ? -500
        : swipe.isDragging
          ? swipe.currentX - swipe.startX
          : 0;

  const visibleProfiles = profiles.slice(topIndex, topIndex + 3);

  return (
    <div className="relative w-full h-full">
      {[...visibleProfiles].reverse().map((profile, reversedIdx) => {
        const stackIdx = visibleProfiles.length - 1 - reversedIdx;
        const isTop = stackIdx === 0;
        return (
          <ProfileCard
            key={profile.id}
            profile={profile}
            isTop={isTop}
            swipeOffset={isTop ? swipeOffset : 0}
            swipeDirection={isTop ? swipe.direction : null}
            onDragStart={handleDragStart}
            onDragMove={handleDragMove}
            onDragEnd={handleDragEnd}
            onSwipeLeft={() => advance("left")}
            onSwipeRight={() => advance("right")}
            onViewProfile={onViewProfile}
          />
        );
      })}
    </div>
  );
}

// ─── FilterPanel ──────────────────────────────────────────────────────────────

interface FilterPanelProps {
  filters: FilterState;
  onChange: (f: FilterState) => void;
  onClose: () => void;
}

function FilterPanel({ filters, onChange, onClose }: FilterPanelProps) {
  const [local, setLocal] = useState<FilterState>(filters);

  return (
    <div className="absolute inset-0 z-50 bg-white rounded-3xl p-6 flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-extrabold text-gray-900">Filters</h3>
        <button
        aria-label="close filters"
          onClick={onClose}
          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="space-y-6 flex-1">
        {/* Gender */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Show me
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(["", "female", "male", "other"] as const).map((g) => (
              <button
                key={g}
                onClick={() => setLocal((f) => ({ ...f, gender: g }))}
                className={`py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                  local.gender === g
                    ? "bg-rose-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {g === "" ? "Everyone" : g === "female" ? "Women" : g === "male" ? "Men" : "Other"}
              </button>
            ))}
          </div>
        </div>

        {/* Age range */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Age range: {local.minAge} – {local.maxAge}
          </label>
          <div className="space-y-3">
            <div>
              <span className="text-xs text-gray-400">Min age: {local.minAge}</span>
              <input
              aria-label="enter age"
                type="range"
                min={18}
                max={local.maxAge - 1}
                value={local.minAge}
                onChange={(e) =>
                  setLocal((f) => ({ ...f, minAge: Number(e.target.value) }))
                }
                className="w-full accent-rose-500 mt-1"
              />
            </div>
            <div>
              <span className="text-xs text-gray-400">Max age: {local.maxAge}</span>
              <input
                aria-label="enter maximum age"
                type="range"
                min={local.minAge + 1}
                max={99}
                value={local.maxAge}
                onChange={(e) =>
                  setLocal((f) => ({ ...f, maxAge: Number(e.target.value) }))
                }
                className="w-full accent-rose-500 mt-1"
              />
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={() => {
          onChange(local);
          onClose();
        }}
        className="w-full bg-rose-500 hover:bg-rose-600 text-white font-bold py-3.5 rounded-2xl transition-colors mt-6"
      >
        Apply Filters
      </button>
    </div>
  );
}

// ─── ProfilesPage ─────────────────────────────────────────────────────────────

export default function ProfilesPage() {
  const router = useRouter();
  const [filters, setFilters] = useState<FilterState>({
    gender: "",
    minAge: 18,
    maxAge: 50,
  });
  const [showFilters, setShowFilters] = useState(false);
  const [likedCount, setLikedCount] = useState(0);

  const profileFilters =
    filters.gender !== ""
      ? { gender: filters.gender, minAge: filters.minAge, maxAge: filters.maxAge }
      : { minAge: filters.minAge, maxAge: filters.maxAge };

  const { profiles, isLoading } = useProfiles(profileFilters);
  const { startConversation, isStarting } = useStartConversation();

  const handleLike = useCallback(
    async (profile: ProfileRow) => {
      setLikedCount((c) => c + 1);
      const convId = await startConversation(profile.id);
      if (convId) {
        toast.success(
          <span>
            💬 Matched with <strong>{profile.name.split(" ")[0]}</strong>!{" "}
            <button
              className="underline font-semibold"
              onClick={() => router.push("/chat")}
            >
              Say hi →
            </button>
          </span>,
          { duration: 5000 },
        );
      }
    },
    [startConversation, router],
  );

  const handlePass = useCallback((_profile: ProfileRow) => {
    // Could log passes for analytics
  }, []);

  const handleViewProfile = useCallback(
    (id: string) => {
      router.push(`/profiles/${id}`);
    },
    [router],
  );

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-100 shadow-sm">
        <div>
          <h1 className="text-lg font-extrabold text-gray-900">Discover</h1>
          <p className="text-xs text-gray-400">
            {profiles.length} people near you
          </p>
        </div>
        <div className="flex items-center gap-2">
          {likedCount > 0 && (
            <span className="text-xs bg-rose-100 text-rose-600 font-bold px-2.5 py-1 rounded-full">
              {likedCount} liked 💚
            </span>
          )}
          <button
            onClick={() => setShowFilters(true)}
            className="p-2.5 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors relative"
            aria-label="Open filters"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
            </svg>
            {(filters.gender !== "" || filters.minAge > 18 || filters.maxAge < 50) && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full" />
            )}
          </button>
        </div>
      </div>

      {/* Deck area */}
      <div className="flex-1 relative p-4 pb-6">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-full gap-4">
            <svg className="w-8 h-8 animate-spin text-rose-400" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <p className="text-sm text-gray-400">Finding people near you...</p>
          </div>
        ) : profiles.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-3 text-center px-8">
            <div className="text-5xl">😔</div>
            <h3 className="font-extrabold text-gray-800 text-lg">No profiles found</h3>
            <p className="text-sm text-gray-500">
              Try adjusting your filters to see more people.
            </p>
            <button
              onClick={() => setShowFilters(true)}
              className="mt-2 bg-rose-500 text-white font-semibold text-sm px-6 py-3 rounded-full"
            >
              Adjust Filters
            </button>
          </div>
        ) : (
          <SwipeDeck
            profiles={profiles}
            onLike={handleLike}
            onPass={handlePass}
            onViewProfile={handleViewProfile}
          />
        )}

        {/* Filter panel overlay */}
        {showFilters && (
          <FilterPanel
            filters={filters}
            onChange={setFilters}
            onClose={() => setShowFilters(false)}
          />
        )}
      </div>

      {/* Action buttons */}
      {!isLoading && profiles.length > 0 && !showFilters && (
        <div className="flex items-center justify-center gap-6 pb-6 px-4">
          {/* Pass */}
          <button
            className="w-14 h-14 bg-white rounded-full shadow-lg border border-gray-100 flex items-center justify-center text-gray-400 hover:text-rose-400 hover:border-rose-100 hover:shadow-rose-100 transition-all active:scale-95"
            aria-label="Pass"
            onClick={() => {
              // Trigger next card — handled inside deck via advance
              // This button is decorative; swipe is the primary interaction
            }}
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Like */}
          <button
            className="w-16 h-16 bg-rose-500 hover:bg-rose-600 rounded-full shadow-xl shadow-rose-200 flex items-center justify-center text-white transition-all active:scale-95 disabled:opacity-60"
            aria-label="Like"
            disabled={isStarting}
          >
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </button>

          {/* Super like */}
          <button
            className="w-14 h-14 bg-white rounded-full shadow-lg border border-gray-100 flex items-center justify-center text-yellow-400 hover:border-yellow-100 hover:shadow-yellow-100 transition-all active:scale-95"
            aria-label="Super like"
          >
            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}