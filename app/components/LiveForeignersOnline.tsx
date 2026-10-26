"use client";

import { VELLOEARN_REGISTER_URL } from "@/lib/constants";
import { Briefcase, CheckCircle2, MessageCircle, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Profile = {
  id: string;
  name: string;
  age: number;
  country: string;
  flag: string;
  avatar: string;
  link: string;
  jobBrief: string;
  rateUsd: string;
  fullDescription: string;
  topics: string[];
  requirements: string[];
};

const unsplash = (photoId: string) =>
  `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=200&h=200&q=80`;

const PLACEHOLDER_LINK = VELLOEARN_REGISTER_URL;

const PROFILES: Profile[] = [
  {
    id: "1",
    name: "Margaret W.",
    age: 58,
    country: "USA",
    flag: "US",
    avatar: unsplash("photo-1566616213894-2d4e1baee5d8"),
    link: PLACEHOLDER_LINK,
    jobBrief: "Daily life & travel chatting",
    rateUsd: "$0.12 / msg",
    fullDescription: "Margaret is looking for a friendly conversational partner to talk about daily life routines, travel experiences across East Africa, and family stories.",
    topics: ["Travel & Culture", "Daily Routines", "Gardening & Pets"],
    requirements: ["Friendly tone", "Basic English fluency", "Respond within 5 minutes"],
  },
  {
    id: "2",
    name: "Robert H.",
    age: 62,
    country: "UK",
    flag: "GB",
    avatar: unsplash("photo-1544694032-19eb3ee39243"),
    link: PLACEHOLDER_LINK,
    jobBrief: "Language practice & story sharing",
    rateUsd: "$0.15 / msg",
    fullDescription: "Robert enjoys deep conversations about history, classic literature, and sharing life stories from the UK while practicing conversational flow.",
    topics: ["World History", "Classic Books", "Life Experiences"],
    requirements: ["Good grammar", "Engaging questions", "Prompt replies"],
  },
  {
    id: "3",
    name: "Helga S.",
    age: 55,
    country: "Germany",
    flag: "DE",
    avatar: unsplash("photo-1543430720-fa600c67e423"),
    link: PLACEHOLDER_LINK,
    jobBrief: "English conversation assistant",
    rateUsd: "$14.00 / hr",
    fullDescription: "Helga wants hourly text chat sessions to practice her English conversational skills. Help her improve fluency through casual discussions.",
    topics: ["English Practice", "European Culture", "Hobbies"],
    requirements: ["Patient communication", "Correct subtle grammar mistakes", "Available for 30-60 min blocks"],
  },
  {
    id: "4",
    name: "James M.",
    age: 64,
    country: "Canada",
    flag: "CA",
    avatar: unsplash("photo-1515515957482-9bfec374dbc4"),
    link: PLACEHOLDER_LINK,
    jobBrief: "Evening casual companion chat",
    rateUsd: "$0.10 / msg",
    fullDescription: "James seeks lighthearted evening chats discussing nature, Canadian outdoors, sports, and current technology trends.",
    topics: ["Outdoors & Nature", "Sports", "Technology"],
    requirements: ["Casual & polite demeanor", "Active in evening hours"],
  },
  {
    id: "5",
    name: "Karen P.",
    age: 51,
    country: "Australia",
    flag: "AU",
    avatar: unsplash("photo-1616286608358-0e1b143f7d2f"),
    link: PLACEHOLDER_LINK,
    jobBrief: "Friendly advice & chat companion",
    rateUsd: "$0.14 / msg",
    fullDescription: "Karen loves chatting with friendly people around the world about healthy lifestyle habits, cooking recipes, and local everyday life.",
    topics: ["Healthy Living", "Recipes & Cooking", "Local Culture"],
    requirements: ["Positive attitude", "Clear typing"],
  },
  {
    id: "6",
    name: "Lars E.",
    age: 60,
    country: "Sweden",
    flag: "SE",
    avatar: unsplash("photo-1590074251929-76f7c465a3bd"),
    link: PLACEHOLDER_LINK,
    jobBrief: "Culture exchange & news discussions",
    rateUsd: "$16.00 / hr",
    fullDescription: "Lars is interested in discussing global news, economic trends, and cultural differences between Europe and Africa in structured hourly sessions.",
    topics: ["Global News", "Economy & Trade", "Cultural Exchange"],
    requirements: ["Informed perspective", "Professional English"],
  },
  {
    id: "7",
    name: "Ingrid O.",
    age: 57,
    country: "Norway",
    flag: "NO",
    avatar: unsplash("photo-1446161543652-83eaa65fddab"),
    link: PLACEHOLDER_LINK,
    jobBrief: "Voice note & text messaging",
    rateUsd: "$0.18 / msg",
    fullDescription: "Ingrid prefers short voice clips and text messages sharing daily photos, weather updates, and music recommendations.",
    topics: ["Music & Arts", "Daily Photography", "Travel"],
    requirements: ["Smartphone microphone support", "Expressive voice/text"],
  },
  {
    id: "8",
    name: "Pierre D.",
    age: 63,
    country: "France",
    flag: "FR",
    avatar: unsplash("photo-1620894177222-b3d04146f00d"),
    link: PLACEHOLDER_LINK,
    jobBrief: "French & English practice chat",
    rateUsd: "$0.13 / msg",
    fullDescription: "Pierre enjoys language exchange chats blending basic French phrases with conversational English.",
    topics: ["Language Exchange", "Food & Wine", "Architecture"],
    requirements: ["Enthusiastic chatter", "Basic English"],
  },
  {
    id: "9",
    name: "Sofia R.",
    age: 54,
    country: "Italy",
    flag: "IT",
    avatar: unsplash("photo-1634552516330-ab1ccc0f605e"),
    link: PLACEHOLDER_LINK,
    jobBrief: "Lifestyle & recipe chat partner",
    rateUsd: "$0.11 / msg",
    fullDescription: "Sofia is looking for someone to exchange family cooking recipes, traditional fashion trends, and local neighborhood stories.",
    topics: ["Cooking", "Fashion", "Home & Design"],
    requirements: ["Friendly interaction", "Fast responses"],
  },
  {
    id: "10",
    name: "Anouk V.",
    age: 56,
    country: "Netherlands",
    flag: "NL",
    avatar: unsplash("photo-1627622718888-1c8f96aadbbe"),
    link: PLACEHOLDER_LINK,
    jobBrief: "Direct message responding",
    rateUsd: "$12.50 / hr",
    fullDescription: "Anouk hires chat assistants to keep her company during work breaks with casual, engaging conversations.",
    topics: ["Work Life", "Coffee & Tea Breaks", "Casual Fun"],
    requirements: ["Fast typist", "Consistent availability"],
  },
  {
    id: "11",
    name: "William T.",
    age: 67,
    country: "USA",
    flag: "US",
    avatar: unsplash("photo-1613061886834-92a52edf31f0"),
    link: PLACEHOLDER_LINK,
    jobBrief: "Sports & history discussions",
    rateUsd: "$0.15 / msg",
    fullDescription: "William is a sports and history enthusiast who loves sharing historical trivia and discussing international football and basketball matches.",
    topics: ["Football & Basketball", "Military History", "Vintage Cars"],
    requirements: ["Knowledgeable or curious", "Friendly conversation"],
  },
  {
    id: "12",
    name: "Diane K.",
    age: 59,
    country: "UK",
    flag: "GB",
    avatar: unsplash("photo-1665062173657-3912ae7991e0"),
    link: PLACEHOLDER_LINK,
    jobBrief: "Daily friendly catchup text",
    rateUsd: "$0.12 / msg",
    fullDescription: "Diane is looking for regular daily check-ins to chat about daily motivation, morning tea routines, and good book recommendations.",
    topics: ["Daily Motivation", "Reading & Podcasts", "Wellness"],
    requirements: ["Warm attitude", "Reliable daily check-ins"],
  },
];

const MAX_CONCURRENT_TYPERS = 5;
const MIN_TYPE_DURATION_MS = 400;
const MAX_TYPE_DURATION_MS = 1200;
const TICK_MS = 150;

export default function LiveForeignersOnline() {
  // Initialize state cleanly without synchronous state setter calls inside useEffect
  const [typingIds, setTypingIds] = useState<Set<string>>(() => {
    const initial = new Set<string>();
    const numInitial = Math.floor(Math.random() * 3) + 2;
    const shuffled = [...PROFILES].sort(() => Math.random() - 0.5);
    for (let i = 0; i < Math.min(numInitial, shuffled.length); i++) {
      initial.add(shuffled[i].id);
    }
    return initial;
  });

  const [selectedTaskProfile, setSelectedTaskProfile] = useState<Profile | null>(null);
  const expiryMap = useRef<Map<string, number>>(new Map());

  useEffect(() => {
    // Populate expiry times asynchronously for initial set
    const now = Date.now();
    typingIds.forEach((id) => {
      expiryMap.current.set(
        id,
        now + MIN_TYPE_DURATION_MS + Math.random() * (MAX_TYPE_DURATION_MS - MIN_TYPE_DURATION_MS)
      );
    });

    const interval = setInterval(() => {
      const currentTime = Date.now();

      setTypingIds((prev) => {
        const next = new Set(prev);

        // Remove expired typers
        for (const id of next) {
          const exp = expiryMap.current.get(id);
          if (exp && exp <= currentTime) {
            next.delete(id);
            expiryMap.current.delete(id);
          }
        }

        // Add new typers asynchronously via interval ticks
        const available = PROFILES.filter((p) => !next.has(p.id));
        const slotsAvailable = MAX_CONCURRENT_TYPERS - next.size;

        if (slotsAvailable > 0 && available.length > 0 && Math.random() < 0.7) {
          const toAdd = Math.min(
            Math.random() < 0.5 ? 1 : 2,
            slotsAvailable,
            available.length
          );

          const shuffled = [...available].sort(() => Math.random() - 0.5);
          for (let i = 0; i < toAdd; i++) {
            const pick = shuffled[i];
            if (pick) {
              next.add(pick.id);
              const duration = MIN_TYPE_DURATION_MS + Math.random() * (MAX_TYPE_DURATION_MS - MIN_TYPE_DURATION_MS);
              expiryMap.current.set(pick.id, currentTime + duration);
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
        <p className="mb-6 text-sm text-slate-500">Tap any profile or task to start earning now.</p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PROFILES.map((profile) => (
            <ProfileCard
              key={profile.id}
              profile={profile}
              isTyping={typingIds.has(profile.id)}
              onOpenModal={() => setSelectedTaskProfile(profile)}
            />
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href={PLACEHOLDER_LINK}
            className="inline-flex items-center gap-1 text-sm font-medium text-teal-700 underline decoration-teal-300 underline-offset-4 hover:text-teal-800"
          >
            👉 + 58 more active — join to chat
          </Link>
        </div>
      </div>

      {/* Task Details Modal */}
      {selectedTaskProfile && (
        <TaskModal
          profile={selectedTaskProfile}
          onClose={() => setSelectedTaskProfile(null)}
        />
      )}
    </div>
  );
}

function ProfileCard({
  profile,
  isTyping,
  onOpenModal,
}: {
  profile: Profile;
  isTyping: boolean;
  onOpenModal: () => void;
}) {
  return (
    <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-md">
      <div>
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="relative shrink-0">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="h-12 w-12 rounded-full object-cover"
              />
              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-emerald-500" />
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

              <div className="mt-0.5 h-5 text-xs">
                {isTyping ? (
                  <span className="flex items-center gap-1 text-emerald-600 font-medium">
                    <TypingDots />
                    <span>typing message...</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-slate-400">
                    Online & waiting
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Rate Badge */}
          <div className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 border border-emerald-200 shrink-0">
            {profile.rateUsd}
          </div>
        </div>

        {/* Job Brief */}
        <div className="mt-4 rounded-xl bg-slate-50 p-3 border border-slate-100">
          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
            <Briefcase className="h-3.5 w-3.5 text-slate-400" />
            <span>Chat Task</span>
          </div>
          <p className="mt-1 text-xs font-medium text-slate-700">
            {profile.jobBrief}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-4 flex items-center gap-2">
        <Link
          href={profile.link}
          className="flex-1 text-center rounded-full bg-teal-700 py-2 text-xs font-semibold text-white hover:bg-teal-800 transition-colors"
        >
          Start Chat
        </Link>
        <button
          type="button"
          onClick={onOpenModal}
          className="flex-1 rounded-full border border-slate-200 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
        >
          View Task
        </button>
      </div>
    </div>
  );
}

function TaskModal({
  profile,
  onClose,
}: {
  profile: Profile;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header Profile */}
        <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
          <div className="relative">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="h-14 w-14 rounded-full object-cover"
            />
            <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-emerald-500" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-slate-900">{profile.name}</h3>
              <span className="text-xs font-medium text-slate-500">
                ({profile.age} y/o · {profile.country} {profile.flag})
              </span>
            </div>
            <div className="mt-1 flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-700 border border-emerald-200">
                {profile.rateUsd}
              </span>
              <span className="text-xs text-slate-400">Instant M-Pesa Cashout</span>
            </div>
          </div>
        </div>

        {/* Task Details */}
        <div className="my-5 space-y-4">
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
              Task Overview
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed">
              {profile.fullDescription}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Preferred Conversation Topics
            </h4>
            <div className="flex flex-wrap gap-2">
              {profile.topics.map((topic) => (
                <span
                  key={topic}
                  className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Task Requirements
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-600">
              {profile.requirements.map((req) => (
                <li key={req} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex items-center gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-full border border-slate-200 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <Link
            href={profile.link}
            className="flex-1 text-center rounded-full bg-teal-700 py-2.5 text-xs font-semibold text-white hover:bg-teal-800 transition-colors shadow-sm"
          >
            Accept & Start Chat
          </Link>
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