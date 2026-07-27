// app/components/LiveForeignersLearning.tsx
"use client";

import { useEffect, useState, useRef } from "react";
import { MessageCircle, BookOpen, Users, Globe } from "lucide-react";
import { VELLOEARN_REGISTER_URL } from "@/lib/constants";

type Learner = {
  id: string;
  name: string;
  age: number;
  country: string;
  flag: string;
  level: string;
  avatar: string;
  learningGoal: string;
};

// Unsplash portrait photos
const unsplash = (photoId: string) =>
  `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=200&h=200&q=80`;

const LEARNERS: Learner[] = [
  { id: "1", name: "Margaret W.", age: 58, country: "USA", flag: "US", level: "Beginner", learningGoal: "Travel to Kenya", avatar: unsplash("photo-1566616213894-2d4e1baee5d8") },
  { id: "2", name: "Robert H.", age: 62, country: "UK", flag: "GB", level: "Intermediate", learningGoal: "Business", avatar: unsplash("photo-1544694032-19eb3ee39243") },
  { id: "3", name: "Helga S.", age: 55, country: "Germany", flag: "DE", level: "Beginner", learningGoal: "Heritage", avatar: unsplash("photo-1543430720-fa600c67e423") },
  { id: "4", name: "James M.", age: 64, country: "Canada", flag: "CA", level: "Advanced", learningGoal: "Conversational", avatar: unsplash("photo-1515515957482-9bfec374dbc4") },
  { id: "5", name: "Karen P.", age: 51, country: "Australia", flag: "AU", level: "Beginner", learningGoal: "Volunteer work", avatar: unsplash("photo-1616286608358-0e1b143f7d2f") },
  { id: "6", name: "Lars E.", age: 60, country: "Sweden", flag: "SE", level: "Intermediate", learningGoal: "Business", avatar: unsplash("photo-1590074251929-76f7c465a3bd") },
  { id: "7", name: "Ingrid O.", age: 57, country: "Norway", flag: "NO", level: "Beginner", learningGoal: "Travel", avatar: unsplash("photo-1446161543652-83eaa65fddab") },
  { id: "8", name: "Pierre D.", age: 63, country: "France", flag: "FR", level: "Advanced", learningGoal: "Cultural", avatar: unsplash("photo-1620894177222-b3d04146f00d") },
  { id: "9", name: "Sofia R.", age: 54, country: "Italy", flag: "IT", level: "Intermediate", learningGoal: "Heritage", avatar: unsplash("photo-1634552516330-ab1ccc0f605e") },
  { id: "10", name: "Anouk V.", age: 56, country: "Netherlands", flag: "NL", level: "Beginner", learningGoal: "Business", avatar: unsplash("photo-1627622718888-1c8f96aadbbe") },
  { id: "11", name: "Wei C.", age: 48, country: "China", flag: "CN", level: "Intermediate", learningGoal: "Business", avatar: unsplash("photo-1613061886834-92a52edf31f0") },
  { id: "12", name: "Diane K.", age: 59, country: "UK", flag: "GB", level: "Beginner", learningGoal: "Travel", avatar: unsplash("photo-1665062173657-3912ae7991e0") },
  { id: "13", name: "Carlos R.", age: 61, country: "Spain", flag: "ES", level: "Intermediate", learningGoal: "Business", avatar: unsplash("photo-1507003211169-0a1dd7228f2d") },
  { id: "14", name: "Maria L.", age: 53, country: "Portugal", flag: "PT", level: "Beginner", learningGoal: "Heritage", avatar: unsplash("photo-1494790108377-be9c29b29330") },
  { id: "15", name: "Hans M.", age: 66, country: "Austria", flag: "AT", level: "Advanced", learningGoal: "Cultural", avatar: unsplash("photo-1500648767791-00dcc994a43e") },
];

// More concurrent "learning" indicators
const MAX_CONCURRENT_LEARNERS = 6;
const MIN_LEARN_DURATION_MS = 500;
const MAX_LEARN_DURATION_MS = 1500;
const TICK_MS = 120;

function LiveForeignersLearning() {
  const [activeIds, setActiveIds] = useState<Set<string>>(new Set());
  const expiryMap = useRef<Map<string, number>>(new Map());

  useEffect(() => {
    // Initialize with some random active learners
    const initialActive = new Set<string>();
    const numInitial = Math.floor(Math.random() * 3) + 3;
    const shuffled = [...LEARNERS].sort(() => Math.random() - 0.5);
    for (let i = 0; i < Math.min(numInitial, shuffled.length); i++) {
      initialActive.add(shuffled[i].id);
      expiryMap.current.set(
        shuffled[i].id,
        Date.now() + MIN_LEARN_DURATION_MS + Math.random() * (MAX_LEARN_DURATION_MS - MIN_LEARN_DURATION_MS)
      );
    }
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

        // Add new active learners
        const available = LEARNERS.filter((p) => !next.has(p.id));
        const slotsAvailable = MAX_CONCURRENT_LEARNERS - next.size;
        
        if (slotsAvailable > 0 && available.length > 0 && Math.random() < 0.75) {
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
              const duration = MIN_LEARN_DURATION_MS + Math.random() * (MAX_LEARN_DURATION_MS - MIN_LEARN_DURATION_MS);
              expiryMap.current.set(pick.id, now + duration);
            }
          }
        }

        return next;
      });
    }, TICK_MS);

    return () => clearInterval(interval);
  }, []);

  const handleLearnerClick = () => {
    window.location.href = VELLOEARN_REGISTER_URL;
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl shadow-emerald-100/50 border border-gray-100 p-4 h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
      <div className="flex items-center justify-between mb-4 sticky top-0 bg-white z-10 pb-2 border-b border-gray-50">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          <span className="text-sm font-semibold text-gray-900">Foreigners Learning Swahili</span>
          <span className="text-xs text-gray-400">· {LEARNERS.length} waiting</span>
        </div>
        <span className="text-xs text-emerald-500 font-medium animate-pulse">booking now...</span>
      </div>
      
      <div className="space-y-2">
        {LEARNERS.map((learner) => (
          <div 
            key={learner.id} 
            onClick={handleLearnerClick}
            className="flex items-center gap-3 p-2 rounded-xl hover:bg-emerald-50 transition-all cursor-pointer group"
          >
            <div className="relative shrink-0">
              <img
                src={learner.avatar}
                alt={learner.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white bg-emerald-500" />
              {activeIds.has(learner.id) && (
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-semibold text-gray-400">{learner.flag}</span>
                <span className="text-sm font-medium text-gray-900 truncate group-hover:text-emerald-600 transition-colors">{learner.name}</span>
                <span className="text-xs text-gray-400">· {learner.age}</span>
                <span className="text-[10px] bg-emerald-100 text-emerald-700 font-semibold px-1.5 py-0.5 rounded-full ml-auto">
                  {learner.level}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">{learner.learningGoal}</span>
                {activeIds.has(learner.id) ? (
                  <span className="flex items-center gap-1 text-xs text-emerald-600 font-medium">
                    <span className="flex gap-0.5">
                      <span className="w-1 h-1 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                      <span className="w-1 h-1 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                      <span className="w-1 h-1 bg-emerald-500 rounded-full animate-bounce"></span>
                    </span>
                    learning...
                  </span>
                ) : (
                  <span className="text-[10px] text-gray-400 flex items-center gap-1">
                    <BookOpen className="w-3 h-3" />
                    Looking for teacher
                  </span>
                )}
              </div>
            </div>
            
            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-xs text-emerald-500 font-medium">→</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-3 border-t border-gray-100 sticky bottom-0 bg-white">
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-400">+{LEARNERS.length + 12} more waiting</span>
          <button 
            onClick={handleLearnerClick}
            className="text-emerald-500 font-medium hover:text-emerald-600 transition-colors flex items-center gap-1"
          >
            Start teaching →
          </button>
        </div>
      </div>
    </div>
  );
}

export default LiveForeignersLearning;