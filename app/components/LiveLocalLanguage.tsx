"use client";

import { VELLOEARN_REGISTER_URL } from "@/lib/constants";
import { Clock } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export interface LanguageTask {
  id: string;
  studentName: string;
  country: string;
  flag: string;
  lessonType: string;
  payout: string;
  duration: string;
  level: "Beginner" | "Intermediate" | "Conversational";
}

interface LiveLocalLanguageProps {
  languageName: string; // e.g., "Setswana", "Twi", "Luganda", "Bemba"
  countryName: string;  // e.g., "Botswana", "Ghana", "Uganda", "Zambia"
  currencySymbol?: string; // e.g., "P", "GHS", "UGX", "ZMW"
  sampleTasks?: LanguageTask[];
}

// Default mock live tasks
const defaultTasks: LanguageTask[] = [
  {
    id: "lang-1",
    studentName: "Elena R.",
    country: "Germany",
    flag: "🇩🇪",
    lessonType: "Basic Pronunciation & Greetings",
    payout: "80",
    duration: "30 mins",
    level: "Beginner",
  },
  {
    id: "lang-2",
    studentName: "Markus T.",
    country: "United States",
    flag: "🇺🇸",
    lessonType: "Conversational for Business/Travel",
    payout: "150",
    duration: "45 mins",
    level: "Conversational",
  },
  {
    id: "lang-3",
    studentName: "Sophia K.",
    country: "United Kingdom",
    flag: "🇬🇧",
    lessonType: "Culture & Everyday Phrases",
    payout: "110",
    duration: "40 mins",
    level: "Intermediate",
  },
    {
    id: "lang-4",
    studentName: "Liam O.",
    country: "Canada",
    flag: "🇨🇦",
    lessonType: "Basic Pronunciation & Greetings",
    payout: "80",
    duration: "30 mins",
    level: "Beginner",
  },
  {
    id: "lang-5",
    studentName: "Ava M.",
    country: "Australia",
    flag: "🇦🇺",
    lessonType: "Basic Pronunciation & Greetings",
    payout: "80",
    duration: "30 mins",
    level: "Beginner",
  },
    {
    id: "lang-6",
    studentName: "Noah L.",
    country: "France",
    flag: "🇫🇷",
    lessonType: "Basic Pronunciation & Greetings",
    payout: "80",
    duration: "30 mins",
    level: "Beginner",
  }
];

export default function LiveLocalLanguage({
  languageName = "Setswana",
  countryName = "Botswana",
  currencySymbol = "P",
  sampleTasks,
}: LiveLocalLanguageProps) {
  const tasks = sampleTasks || defaultTasks;
  const [activeIds, setActiveIds] = useState<Set<string>>(new Set());
  const expiryMap = useRef<Map<string, number>>(new Map());

  // Simulate active "booking" activity
  useEffect(() => {
    // Initially mark a couple as active
    const initialActive = new Set<string>();
    tasks.slice(0, 2).forEach((t) => {
      initialActive.add(t.id);
      expiryMap.current.set(t.id, Date.now() + 3000 + Math.random() * 2000);
    });
    setActiveIds(initialActive);

    const interval = setInterval(() => {
      const now = Date.now();
      setActiveIds((prev) => {
        const next = new Set(prev);
        // Remove expired
        for (const id of next) {
          const exp = expiryMap.current.get(id);
          if (exp && exp <= now) {
            next.delete(id);
            expiryMap.current.delete(id);
          }
        }
        // Randomly add a new one
        const available = tasks.filter((t) => !next.has(t.id));
        if (available.length > 0 && Math.random() < 0.3) {
          const pick = available[Math.floor(Math.random() * available.length)];
          next.add(pick.id);
          expiryMap.current.set(pick.id, now + 3000 + Math.random() * 2000);
        }
        return next;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [tasks]);

  const levelColors = {
    Beginner: "bg-emerald-100 text-emerald-700",
    Intermediate: "bg-amber-100 text-amber-700",
    Conversational: "bg-blue-100 text-blue-700",
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-50">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          <span className="text-sm font-semibold text-gray-900">
            Live {languageName} Lessons
          </span>
          <span className="text-xs text-gray-400">· {tasks.length} requests</span>
        </div>
        <span className="text-xs text-emerald-500 font-medium animate-pulse">
          booking now...
        </span>
      </div>

      {/* Task list */}
      <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
        {tasks.map((task) => {
          const isActive = activeIds.has(task.id);
          return (
            <div
              key={task.id}
              className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 transition-all group"
            >
              <div className="relative shrink-0 w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center text-xl">
                {task.flag}
                {isActive && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-sm font-medium text-gray-900 truncate">
                    {task.studentName}
                  </span>
                  <span className="text-xs text-gray-400">· {task.country}</span>
                  <span
                    className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${
                      levelColors[task.level]
                    }`}
                  >
                    {task.level}
                  </span>
                </div>
                <p className="text-xs text-gray-500 truncate">{task.lessonType}</p>
                <div className="flex items-center gap-3 text-[10px] text-gray-400 mt-0.5">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {task.duration}
                  </span>
                  <span className="font-semibold text-emerald-600">
                    {currencySymbol}{task.payout}
                  </span>
                  {isActive && (
                    <span className="flex items-center gap-1 text-emerald-600 font-medium">
                      <span className="flex gap-0.5">
                        <span className="w-1 h-1 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                        <span className="w-1 h-1 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                        <span className="w-1 h-1 bg-emerald-500 rounded-full animate-bounce"></span>
                      </span>
                      booking...
                    </span>
                  )}
                </div>
              </div>

              <Link
                href={VELLOEARN_REGISTER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold px-4 py-2 rounded-full transition-all hover:scale-105 active:scale-95 shadow-sm shadow-amber-200/50"
              >
                Accept Student
              </Link>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-4 pt-3 border-t border-gray-100">
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>+{tasks.length * 2} more students waiting</span>
          <Link
            href={VELLOEARN_REGISTER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-500 font-medium hover:text-amber-600 transition-colors flex items-center gap-1"
          >
            Teach {languageName} →
          </Link>
        </div>
      </div>
    </div>
  );
}