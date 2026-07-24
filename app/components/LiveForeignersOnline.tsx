"use client";

import { useEffect, useState, useRef } from "react";
import { MessageCircle } from "lucide-react";

type Profile = {
  id: string;
  name: string;
  age: number;
  country: string;
  flag: string;
  avatar: string;
  link: string;
};

const unsplash = (photoId: string) =>
  `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=200&h=200&q=80`;

const PLACEHOLDER_LINK = "https://starhela.com/register?ref=velloearn"; // Replace with actual chat link if available

const PROFILES: Profile[] = [
  { id: "1", name: "Margaret W.", age: 58, country: "USA", flag: "US", avatar: unsplash("photo-1566616213894-2d4e1baee5d8"), link: PLACEHOLDER_LINK },
  { id: "2", name: "Robert H.", age: 62, country: "UK", flag: "GB", avatar: unsplash("photo-1544694032-19eb3ee39243"), link: PLACEHOLDER_LINK },
  { id: "3", name: "Helga S.", age: 55, country: "Germany", flag: "DE", avatar: unsplash("photo-1543430720-fa600c67e423"), link: PLACEHOLDER_LINK },
  { id: "4", name: "James M.", age: 64, country: "Canada", flag: "CA", avatar: unsplash("photo-1515515957482-9bfec374dbc4"), link: PLACEHOLDER_LINK },
  { id: "5", name: "Karen P.", age: 51, country: "Australia", flag: "AU", avatar: unsplash("photo-1616286608358-0e1b143f7d2f"), link: PLACEHOLDER_LINK },
  { id: "6", name: "Lars E.", age: 60, country: "Sweden", flag: "SE", avatar: unsplash("photo-1590074251929-76f7c465a3bd"), link: PLACEHOLDER_LINK },
  { id: "7", name: "Ingrid O.", age: 57, country: "Norway", flag: "NO", avatar: unsplash("photo-1446161543652-83eaa65fddab"), link: PLACEHOLDER_LINK },
  { id: "8", name: "Pierre D.", age: 63, country: "France", flag: "FR", avatar: unsplash("photo-1620894177222-b3d04146f00d"), link: PLACEHOLDER_LINK },
  { id: "9", name: "Sofia R.", age: 54, country: "Italy", flag: "IT", avatar: unsplash("photo-1634552516330-ab1ccc0f605e"), link: PLACEHOLDER_LINK },
  { id: "10", name: "Anouk V.", age: 56, country: "Netherlands", flag: "NL", avatar: unsplash("photo-1627622718888-1c8f96aadbbe"), link: PLACEHOLDER_LINK },
  { id: "11", name: "William T.", age: 67, country: "USA", flag: "US", avatar: unsplash("photo-1613061886834-92a52edf31f0"), link: PLACEHOLDER_LINK },
  { id: "12", name: "Diane K.", age: 59, country: "UK", flag: "GB", avatar: unsplash("photo-1665062173657-3912ae7991e0"), link: PLACEHOLDER_LINK },
];

// More concurrent typers for a busier feel
const MAX_CONCURRENT_TYPERS = 5;
// Much shorter typing bursts - fast switching like the site
const MIN_TYPE_DURATION_MS = 400;
const MAX_TYPE_DURATION_MS = 1200;
// Very frequent updates for fast switching
const TICK_MS = 150;

export default function LiveForeignersOnline() {
  const [typingIds, setTypingIds] = useState<Set<string>>(new Set());
  const expiryMap = useRef<Map<string, number>>(new Map());

  useEffect(() => {
    // Initialize with some random typers immediately
    const initialTypers = new Set<string>();
    const numInitial = Math.floor(Math.random() * 3) + 2; // 2-4 initial typers
    const shuffled = [...PROFILES].sort(() => Math.random() - 0.5);
    for (let i = 0; i < Math.min(numInitial, shuffled.length); i++) {
      initialTypers.add(shuffled[i].id);
      expiryMap.current.set(
        shuffled[i].id,
        Date.now() + MIN_TYPE_DURATION_MS + Math.random() * (MAX_TYPE_DURATION_MS - MIN_TYPE_DURATION_MS)
      );
    }
    setTypingIds(initialTypers);

    const interval = setInterval(() => {
      const now = Date.now();

      setTypingIds((prev) => {
        const next = new Set(prev);

        // Remove expired typers
        for (const id of next) {
          const exp = expiryMap.current.get(id);
          if (exp && exp <= now) {
            next.delete(id);
            expiryMap.current.delete(id);
          }
        }

        // Add new typers - high probability for fast switching
        const available = PROFILES.filter((p) => !next.has(p.id));
        const slotsAvailable = MAX_CONCURRENT_TYPERS - next.size;
        
        if (slotsAvailable > 0 && available.length > 0 && Math.random() < 0.7) {
          // Randomly pick how many to add (1 or 2 at a time for faster switching)
          const toAdd = Math.min(
            Math.random() < 0.5 ? 1 : 2,
            slotsAvailable,
            available.length
          );
          
          // Shuffle available and pick random ones
          const shuffled = [...available].sort(() => Math.random() - 0.5);
          for (let i = 0; i < toAdd; i++) {
            const pick = shuffled[i];
            if (pick) {
              next.add(pick.id);
              // Shorter, more random durations
              const duration = MIN_TYPE_DURATION_MS + Math.random() * (MAX_TYPE_DURATION_MS - MIN_TYPE_DURATION_MS);
              expiryMap.current.set(pick.id, now + duration);
            }
          }
        }

        return next;
      });
    }, TICK_MS);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-1 flex items-center gap-2">
          <MessageCircle className="h-6 w-6 fill-slate-800 text-slate-50" strokeWidth={1.5} />
          <h1 className="text-2xl font-bold text-slate-900">Live Foreigners Online</h1>
        </div>
        <p className="mb-6 text-sm text-slate-500">Tap any profile to start a paid chat now.</p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PROFILES.map((profile) => (
            <ProfileCard key={profile.id} profile={profile} isTyping={typingIds.has(profile.id)} />
          ))}
        </div>

        <div className="mt-8 text-center">
          <a
            href={PLACEHOLDER_LINK}
            className="inline-flex items-center gap-1 text-sm font-medium text-teal-700 underline decoration-teal-300 underline-offset-4 hover:text-teal-800"
          >
            👉 + 58 more active — join to chat
          </a>
        </div>
      </div>
    </div>
  );
}

function ProfileCard({ profile, isTyping }: { profile: Profile; isTyping: boolean }) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm transition-all duration-300 hover:shadow-md">
      <div className="flex items-center gap-3">
        <div className="relative shrink-0">
          <img
            src={profile.avatar}
            alt={profile.name}
            className="h-14 w-14 rounded-full object-cover"
          />
          <span className="absolute bottom-0.5 right-0.5 h-3 w-3 rounded-full border-2 border-white bg-emerald-500" />
          {isTyping && (
            <span className="absolute -top-1 -right-1 h-2.5 w-2.5 animate-ping rounded-full bg-emerald-400" />
          )}
        </div>

        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-semibold tracking-wide text-slate-400">
              {profile.flag}
            </span>
            <span className="font-semibold text-slate-900">{profile.name}</span>
            <span className="text-sm text-slate-400">· {profile.age}</span>
          </div>

          <div className="mt-0.5 h-5 text-sm">
            {isTyping ? (
              <span className="flex items-center gap-1.5 text-emerald-600 font-medium">
                <TypingDots />
                <span>typing...</span>
              </span>
            ) : (
              <span className="flex items-center gap-1 italic text-slate-500">
                Looking to talk
                <MessageCircle className="h-3.5 w-3.5" strokeWidth={2} />
              </span>
            )}
          </div>

          <div className="mt-2 flex items-center gap-2">
            <a
              href={profile.link}
              className="rounded-full bg-teal-700 px-4 py-1.5 text-sm font-medium text-white hover:bg-teal-800 transition-colors"
            >
              Start
            </a>
            <a
              href={profile.link}
              className="rounded-full border border-slate-200 px-4 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
            >
              Watch
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function TypingDots() {
  return (
    <span className="flex items-center gap-0.5">
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-emerald-500 [animation-delay:-0.3s]" />
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-emerald-500 [animation-delay:-0.15s]" />
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-emerald-500" />
    </span>
  );
}