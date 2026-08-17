"use client";

import { STATS } from "@/data";
import { VELLOEARN_REGISTER_URL, whatsappNumber } from "@/lib/constants";
import type { Stat } from "@/types";
import { MessageCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

function StatCard({ stat }: { stat: Stat }) {
  return (
    <div className="text-center">
      <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
      <div className="text-sm text-gray-500 mt-0.5">{stat.label}</div>
    </div>
  );
}

type Profile = {
  id: string;
  name: string;
  age: number;
  country: string;
  flag: string;
  avatar: string;
  link: string;
};

// Unsplash portrait photos
const unsplash = (photoId: string) =>
  `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=200&h=200&q=80`;

// Generate more profiles with diverse names and countries
const PROFILES: Profile[] = [
  { id: "1", name: "Margaret W.", age: 58, country: "USA", flag: "US", avatar: unsplash("photo-1566616213894-2d4e1baee5d8"), link: VELLOEARN_REGISTER_URL},
  { id: "2", name: "Robert H.", age: 62, country: "UK", flag: "GB", avatar: unsplash("photo-1544694032-19eb3ee39243"), link: VELLOEARN_REGISTER_URL },
  { id: "3", name: "Helga S.", age: 55, country: "Germany", flag: "DE", avatar: unsplash("photo-1543430720-fa600c67e423"), link: VELLOEARN_REGISTER_URL },
  { id: "4", name: "James M.", age: 64, country: "Canada", flag: "CA", avatar: unsplash("photo-1515515957482-9bfec374dbc4"), link: VELLOEARN_REGISTER_URL },
  { id: "5", name: "Karen P.", age: 51, country: "Australia", flag: "AU", avatar: unsplash("photo-1616286608358-0e1b143f7d2f"), link: VELLOEARN_REGISTER_URL },
  { id: "6", name: "Lars E.", age: 60, country: "Sweden", flag: "SE", avatar: unsplash("photo-1590074251929-76f7c465a3bd"), link: VELLOEARN_REGISTER_URL },
  { id: "7", name: "Ingrid O.", age: 57, country: "Norway", flag: "NO", avatar: unsplash("photo-1446161543652-83eaa65fddab"), link: VELLOEARN_REGISTER_URL },
  { id: "8", name: "Pierre D.", age: 63, country: "France", flag: "FR", avatar: unsplash("photo-1620894177222-b3d04146f00d"), link: VELLOEARN_REGISTER_URL },
  { id: "9", name: "Sofia R.", age: 54, country: "Italy", flag: "IT", avatar: unsplash("photo-1634552516330-ab1ccc0f605e"), link: VELLOEARN_REGISTER_URL },
  { id: "10", name: "Anouk V.", age: 56, country: "Netherlands", flag: "NL", avatar: unsplash("photo-1627622718888-1c8f96aadbbe"), link: VELLOEARN_REGISTER_URL },
  { id: "11", name: "William T.", age: 67, country: "USA", flag: "US", avatar: unsplash("photo-1613061886834-92a52edf31f0"), link: VELLOEARN_REGISTER_URL },
  { id: "12", name: "Diane K.", age: 59, country: "UK", flag: "GB", avatar: unsplash("photo-1665062173657-3912ae7991e0"), link: VELLOEARN_REGISTER_URL },
  { id: "13", name: "Carlos R.", age: 61, country: "Spain", flag: "ES", avatar: unsplash("photo-1507003211169-0a1dd7228f2d"), link: VELLOEARN_REGISTER_URL },
  { id: "14", name: "Maria L.", age: 53, country: "Portugal", flag: "PT", avatar: unsplash("photo-1494790108377-be9c29b29330"), link: VELLOEARN_REGISTER_URL },
  { id: "15", name: "Hans M.", age: 66, country: "Austria", flag: "AT", avatar: unsplash("photo-1500648767791-00dcc994a43e"), link: VELLOEARN_REGISTER_URL },
  { id: "16", name: "Elena K.", age: 52, country: "Greece", flag: "GR", avatar: unsplash("photo-1438761681033-6461ffad8d80"), link: VELLOEARN_REGISTER_URL },
  { id: "17", name: "David C.", age: 65, country: "Ireland", flag: "IE", avatar: unsplash("photo-1506794778202-cad84cf45f1d"), link: VELLOEARN_REGISTER_URL },
  { id: "18", name: "Anna S.", age: 50, country: "Poland", flag: "PL", avatar: unsplash("photo-1489424731084-a5d8b219a5bb"), link: VELLOEARN_REGISTER_URL },
  { id: "19", name: "Michael B.", age: 68, country: "Switzerland", flag: "CH", avatar: unsplash("photo-1472099645785-5658abf4ff4e"), link: VELLOEARN_REGISTER_URL },
  { id: "20", name: "Sarah J.", age: 56, country: "Belgium", flag: "BE", avatar: unsplash("photo-1544005313-94ddf0286df2"), link: VELLOEARN_REGISTER_URL },
  { id: "21", name: "Thomas W.", age: 63, country: "Denmark", flag: "DK", avatar: unsplash("photo-1507003211169-0a1dd7228f2d"), link: VELLOEARN_REGISTER_URL },
  { id: "22", name: "Emma L.", age: 54, country: "Finland", flag: "FI", avatar: unsplash("photo-1494790108377-be9c29b29330"), link: VELLOEARN_REGISTER_URL },
  { id: "23", name: "Oliver P.", age: 60, country: "New Zealand", flag: "NZ", avatar: unsplash("photo-1500648767791-00dcc994a43e"), link: VELLOEARN_REGISTER_URL },
  { id: "24", name: "Sophie M.", age: 57, country: "Ireland", flag: "IE", avatar: unsplash("photo-1438761681033-6461ffad8d80"), link: VELLOEARN_REGISTER_URL },
  { id: "25", name: "Daniel K.", age: 62, country: "South Africa", flag: "ZA", avatar: unsplash("photo-1506794778202-cad84cf45f1d"), link: VELLOEARN_REGISTER_URL },
  { id: "26", name: "Natalie R.", age: 55, country: "Russia", flag: "RU", avatar: unsplash("photo-1489424731084-a5d8b219a5bb"), link: VELLOEARN_REGISTER_URL },
  { id: "27", name: "Andreas G.", age: 64, country: "Greece", flag: "GR", avatar: unsplash("photo-1472099645785-5658abf4ff4e"), link: VELLOEARN_REGISTER_URL },
  { id: "28", name: "Isabella C.", age: 51, country: "Italy", flag: "IT", avatar: unsplash("photo-1544005313-94ddf0286df2"), link: VELLOEARN_REGISTER_URL },
  { id: "29", name: "Jonathan D.", age: 66, country: "UK", flag: "GB", avatar: unsplash("photo-1507003211169-0a1dd7228f2d"), link: VELLOEARN_REGISTER_URL },
  { id: "30", name: "Mia F.", age: 53, country: "Sweden", flag: "SE", avatar: unsplash("photo-1494790108377-be9c29b29330"), link: VELLOEARN_REGISTER_URL },
  { id: "31", name: "Gabriel S.", age: 59, country: "Brazil", flag: "BR", avatar: unsplash("photo-1500648767791-00dcc994a43e"), link: VELLOEARN_REGISTER_URL },
  { id: "32", name: "Victoria N.", age: 58, country: "Nigeria", flag: "NG", avatar: unsplash("photo-1438761681033-6461ffad8d80"), link: VELLOEARN_REGISTER_URL },
  { id: "33", name: "Alexander M.", age: 67, country: "Russia", flag: "RU", avatar: unsplash("photo-1506794778202-cad84cf45f1d"), link: VELLOEARN_REGISTER_URL },
  { id: "34", name: "Elizabeth W.", age: 52, country: "Canada", flag: "CA", avatar: unsplash("photo-1489424731084-a5d8b219a5bb"), link: VELLOEARN_REGISTER_URL },
  { id: "35", name: "Christopher B.", age: 65, country: "Australia", flag: "AU", avatar: unsplash("photo-1472099645785-5658abf4ff4e"), link: VELLOEARN_REGISTER_URL },
  { id: "36", name: "Grace P.", age: 54, country: "New Zealand", flag: "NZ", avatar: unsplash("photo-1544005313-94ddf0286df2"), link: VELLOEARN_REGISTER_URL },
  { id: "37", name: "Matthew H.", age: 61, country: "USA", flag: "US", avatar: unsplash("photo-1507003211169-0a1dd7228f2d"), link: VELLOEARN_REGISTER_URL },
  { id: "38", name: "Chloe D.", age: 50, country: "France", flag: "FR", avatar: unsplash("photo-1494790108377-be9c29b29330"), link: VELLOEARN_REGISTER_URL },
  { id: "39", name: "Andrew T.", age: 63, country: "Germany", flag: "DE", avatar: unsplash("photo-1500648767791-00dcc994a43e"), link: VELLOEARN_REGISTER_URL },
  { id: "40", name: "Hannah K.", age: 56, country: "Norway", flag: "NO", avatar: unsplash("photo-1438761681033-6461ffad8d80"), link: VELLOEARN_REGISTER_URL },
];

// More concurrent typers for a busier feel
const MAX_CONCURRENT_TYPERS = 8;
const MIN_TYPE_DURATION_MS = 300;
const MAX_TYPE_DURATION_MS = 1000;
const TICK_MS = 120;

function LiveChatFeed() {
  const [typingIds, setTypingIds] = useState<Set<string>>(new Set());
  const expiryMap = useRef<Map<string, number>>(new Map());

  useEffect(() => {
    // Initialize with many random typers immediately
    const initialTypers = new Set<string>();
    const numInitial = Math.floor(Math.random() * 4) + 4; // 4-8 initial typers
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
        
        if (slotsAvailable > 0 && available.length > 0 && Math.random() < 0.8) {
          // Add 1-3 at a time for rapid changes
          const toAdd = Math.min(
            Math.floor(Math.random() * 3) + 1,
            slotsAvailable,
            available.length
          );
          
          const shuffled = [...available].sort(() => Math.random() - 0.5);
          for (let i = 0; i < toAdd; i++) {
            const pick = shuffled[i];
            if (pick) {
              next.add(pick.id);
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

  const handleProfileClick = (link: string) => {
    window.location.assign(link);
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl shadow-rose-100/50 border border-gray-100 p-4 h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
      <div className="flex items-center justify-between mb-4 sticky top-0 bg-white z-10 pb-2 border-b border-gray-50">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          <span className="text-sm font-semibold text-gray-900">Live Chatters</span>
          <span className="text-xs text-gray-400">· {PROFILES.length} online</span>
        </div>
        <span className="text-xs text-rose-500 font-medium animate-pulse">typing...</span>
      </div>
      
      <div className="space-y-2">
        {PROFILES.map((profile) => (
          <div 
            key={profile.id} 
            onClick={() => handleProfileClick(profile.link)}
            className="flex items-center gap-3 p-2 rounded-xl hover:bg-rose-50 transition-all cursor-pointer group"
          >
            <div className="relative shrink-0">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white bg-emerald-500" />
              {typingIds.has(profile.id) && (
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-semibold text-gray-400">{profile.flag}</span>
                <span className="text-sm font-medium text-gray-900 truncate group-hover:text-rose-600 transition-colors">{profile.name}</span>
                <span className="text-xs text-gray-400">· {profile.age}</span>
              </div>
              <div className="h-4">
                {typingIds.has(profile.id) ? (
                  <span className="flex items-center gap-1 text-xs text-emerald-600 font-medium">
                    <TypingDots />
                    <span>typing...</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-xs text-gray-400">
                    Looking to talk
                    <MessageCircle className="h-3 w-3" strokeWidth={2} />
                  </span>
                )}
              </div>
            </div>
            
            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-xs text-rose-500 font-medium">→</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-3 border-t border-gray-100 sticky bottom-0 bg-white">
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-400">+18 more active</span>
          <button 
            onClick={() => window.location.href = VELLOEARN_REGISTER_URL}
            className="text-emerald-500 font-medium hover:text-emerald-600 transition-colors flex items-center gap-1"
          >
            join to chat →
          </button>
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

export default function Hero() {

  const handleStartChat = () => {
    // Direct link to chat platform - no modal
    window.location.href = VELLOEARN_REGISTER_URL;
  };

  return (
    <section className="pt-24 pb-16 bg-gradient-to-br from-rose-50 via-white to-pink-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-rose-200/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-pink-200/30 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* ── Left: copy ── */}
          <div className="text-center lg:text-left">

            {/* Platform badge */}
            <div className="inline-flex items-center gap-2 bg-white border border-gray-100 shadow-sm text-gray-700 text-sm font-medium px-4 py-1.5 rounded-full mb-7">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              Live chat · M-Pesa payouts · Kenya
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight mb-6">
              Chat with lonely{" "}
              <span className="text-rose-500">foreigners</span>
              {" "}— get paid instantly.
            </h1>

            <p className="text-lg sm:text-xl text-gray-500 mb-4 max-w-xl leading-relaxed">
              VelloEarn connects Kenyans with lonely foreigners looking for 
              real conversation. Chat, make friends, and earn M-Pesa daily.
              No experience needed. Start immediately.
            </p>

            <p className="text-base text-gray-400 mb-10 max-w-lg">
              No registration fees · KES 200 welcome bonus · 
              M-Pesa payouts daily · 50,000+ active chatters
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
              <button
                onClick={handleStartChat}
                className="bg-rose-500 hover:bg-rose-600 text-white font-bold text-base px-8 py-4 rounded-full shadow-lg shadow-rose-200 transition-all hover:scale-105 active:scale-95"
              >
                Start Chatting Now  →
              </button>
              <Link
                href="/earn/ai-training"
                className="bg-white hover:bg-gray-50 text-gray-700 font-semibold text-base px-8 py-4 rounded-full border border-gray-200 shadow-sm transition-all hover:scale-105 active:scale-95"
              >
                See how it works →
              </Link>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-10 justify-center lg:justify-start border-t border-gray-100 pt-8">
              {STATS.map((stat) => (
                <StatCard key={stat.label} stat={stat} />
              ))}
            </div>
          </div>

          {/* ── Right: Live chat feed ── */}
          <div className="hidden lg:block">
            <LiveChatFeed />
          </div>
        </div>

        {/* WhatsApp contact strip */}
        <div className="mt-14 flex justify-center">
          <a
            href={`https://wa.me/${whatsappNumber}?text=Hi%2C%20I%27d%20like%20to%20start%20chatting%20with%20foreigners.`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-4 bg-white border border-gray-200 rounded-2xl px-6 py-4 shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-500 flex items-center justify-center text-white text-xl">
              💬
            </div>
            <div className="text-left">
              <div className="text-xs text-gray-400 font-medium">Have questions first?</div>
              <div className="text-sm font-bold text-gray-800">Chat with us on WhatsApp</div>
              <div className="text-xs text-gray-400">We reply within the hour</div>
            </div>
          </a>
        </div>

      </div>
    </section>
  );
}