// app/components/LiveAcademicWriting.tsx
"use client";

import { VELLOEARN_REGISTER_URL } from "@/lib/constants";
import { Award, Clock, TrendingUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type WritingOrder = {
  id: string;
  title: string;
  subject: string;
  pages: number;
  rate: string;
  deadline: string;
  urgency: string;
  level: string;
};

const WRITING_ORDERS: WritingOrder[] = [
  { id: "1", title: "Business Strategy Analysis", subject: "Business", pages: 8, rate: "KES 2,400", deadline: "3 days", urgency: "Medium", level: "Undergraduate" },
  { id: "2", title: "Nursing Case Study", subject: "Nursing", pages: 6, rate: "KES 1,800", deadline: "2 days", urgency: "High", level: "Undergraduate" },
  { id: "3", title: "Psychology Research Paper", subject: "Psychology", pages: 12, rate: "KES 4,200", deadline: "5 days", urgency: "Medium", level: "Masters" },
  { id: "4", title: "Economics Essay - Market Structures", subject: "Economics", pages: 5, rate: "KES 1,500", deadline: "1 day", urgency: "Urgent", level: "Undergraduate" },
  { id: "5", title: "Law Dissertation - Constitutional Rights", subject: "Law", pages: 45, rate: "KES 27,000", deadline: "14 days", urgency: "Medium", level: "PhD" },
  { id: "6", title: "Education Literature Review", subject: "Education", pages: 10, rate: "KES 3,000", deadline: "4 days", urgency: "Medium", level: "Masters" },
  { id: "7", title: "IT Systems Analysis Report", subject: "IT", pages: 7, rate: "KES 2,100", deadline: "3 days", urgency: "High", level: "Undergraduate" },
  { id: "8", title: "Marketing Campaign Proposal", subject: "Marketing", pages: 9, rate: "KES 2,700", deadline: "2 days", urgency: "High", level: "Undergraduate" },
  { id: "9", title: "Sociology Research Proposal", subject: "Sociology", pages: 15, rate: "KES 5,250", deadline: "7 days", urgency: "Low", level: "Masters" },
  { id: "10", title: "Engineering Thesis - Structural Design", subject: "Engineering", pages: 60, rate: "KES 36,000", deadline: "21 days", urgency: "Medium", level: "PhD" },
  { id: "11", title: "History Essay - Colonial Africa", subject: "History", pages: 6, rate: "KES 1,800", deadline: "2 days", urgency: "Urgent", level: "Undergraduate" },
  { id: "12", title: "Finance Case Study Analysis", subject: "Finance", pages: 10, rate: "KES 3,500", deadline: "4 days", urgency: "High", level: "Masters" },
  { id: "13", title: "Public Health Report", subject: "Public Health", pages: 8, rate: "KES 2,400", deadline: "3 days", urgency: "Medium", level: "Undergraduate" },
  { id: "14", title: "Literature Analysis - Postmodernism", subject: "Literature", pages: 7, rate: "KES 2,100", deadline: "5 days", urgency: "Low", level: "Masters" },
  { id: "15", title: "Data Science Project Report", subject: "Data Science", pages: 12, rate: "KES 4,800", deadline: "6 days", urgency: "High", level: "Masters" },
];

// Subject emoji mapping
const subjectEmojis: Record<string, string> = {
  "Business": "💼",
  "Nursing": "🏥",
  "Psychology": "🧠",
  "Economics": "📈",
  "Law": "⚖️",
  "Education": "📚",
  "IT": "💻",
  "Marketing": "📊",
  "Sociology": "👥",
  "Engineering": "🔧",
  "History": "📜",
  "Finance": "💰",
  "Public Health": "🩺",
  "Literature": "📖",
  "Data Science": "📉"
};

const MAX_CONCURRENT_ORDERS = 5;
const MIN_ORDER_DURATION_MS = 800;
const MAX_ORDER_DURATION_MS = 2000;
const TICK_MS = 150;

function LiveAcademicWriting() {
  const [activeIds, setActiveIds] = useState<Set<string>>(new Set());
  const expiryMap = useRef<Map<string, number>>(new Map());

  useEffect(() => {
    const initialActive = new Set<string>();
    const numInitial = Math.floor(Math.random() * 3) + 2;
    const shuffled = [...WRITING_ORDERS].sort(() => Math.random() - 0.5);
    for (let i = 0; i < Math.min(numInitial, shuffled.length); i++) {
      initialActive.add(shuffled[i].id);
      expiryMap.current.set(
        shuffled[i].id,
        Date.now() + MIN_ORDER_DURATION_MS + Math.random() * (MAX_ORDER_DURATION_MS - MIN_ORDER_DURATION_MS)
      );
    }
    setActiveIds(initialActive);

    const interval = setInterval(() => {
      const now = Date.now();

      setActiveIds((prev) => {
        const next = new Set(prev);

        for (const id of next) {
          const exp = expiryMap.current.get(id);
          if (exp && exp <= now) {
            next.delete(id);
            expiryMap.current.delete(id);
          }
        }

        const available = WRITING_ORDERS.filter((p) => !next.has(p.id));
        const slotsAvailable = MAX_CONCURRENT_ORDERS - next.size;
        
        if (slotsAvailable > 0 && available.length > 0 && Math.random() < 0.65) {
          const toAdd = Math.min(
            Math.floor(Math.random() * 2) + 1,
            slotsAvailable,
            available.length
          );
          
          const shuffled = [...available].sort(() => Math.random() - 0.5);
          for (let i = 0; i < toAdd; i++) {
            const pick = shuffled[i];
            if (pick) {
              next.add(pick.id);
              const duration = MIN_ORDER_DURATION_MS + Math.random() * (MAX_ORDER_DURATION_MS - MIN_ORDER_DURATION_MS);
              expiryMap.current.set(pick.id, now + duration);
            }
          }
        }

        return next;
      });
    }, TICK_MS);

    return () => clearInterval(interval);
  }, []);

  const handleOrderClick = () => {
    window.location.href = VELLOEARN_REGISTER_URL;
  };

  const urgencyColors = {
    Urgent: "bg-red-100 text-red-600",
    High: "bg-orange-100 text-orange-600",
    Medium: "bg-amber-100 text-amber-600",
    Low: "bg-gray-100 text-gray-500"
  };

  const urgencyIcons = {
    Urgent: "🔥",
    High: "⚡",
    Medium: "📝",
    Low: "📋"
  };

  const levelColors = {
    "Undergraduate": "bg-blue-100 text-blue-600",
    "Masters": "bg-purple-100 text-purple-600",
    "PhD": "bg-rose-100 text-rose-600"
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl shadow-emerald-100/50 border border-gray-100 p-4 h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
      <div className="flex items-center justify-between mb-4 sticky top-0 bg-white z-10 pb-2 border-b border-gray-50">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          <span className="text-sm font-semibold text-gray-900">Live Writing Orders</span>
          <span className="text-xs text-gray-400">· {WRITING_ORDERS.length} available</span>
        </div>
        <span className="text-xs text-emerald-500 font-medium animate-pulse flex items-center gap-1">
          <TrendingUp className="w-3 h-3" />
          new orders
        </span>
      </div>
      
      <div className="space-y-2">
        {WRITING_ORDERS.map((order) => (
          <div 
            key={order.id} 
            onClick={handleOrderClick}
            className="flex items-center gap-3 p-2 rounded-xl hover:bg-emerald-50 transition-all cursor-pointer group"
          >
            <div className="relative shrink-0 w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-xl">
              {subjectEmojis[order.subject] || "📝"}
              {activeIds.has(order.id) && (
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-medium text-gray-900 truncate group-hover:text-emerald-600 transition-colors">
                  {order.title}
                </span>
                <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full whitespace-nowrap ${urgencyColors[order.urgency as keyof typeof urgencyColors]}`}>
                  {urgencyIcons[order.urgency as keyof typeof urgencyIcons]} {order.urgency}
                </span>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs text-gray-400">{order.subject}</span>
                <span className="text-[10px] text-gray-300">·</span>
                <span className="text-xs text-gray-400">{order.pages} pages</span>
                <span className="text-[10px] text-gray-300">·</span>
                <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${levelColors[order.level as keyof typeof levelColors]}`}>
                  {order.level}
                </span>
                {activeIds.has(order.id) ? (
                  <span className="flex items-center gap-1 text-xs text-emerald-600 font-medium ml-auto">
                    <span className="flex gap-0.5">
                      <span className="w-1 h-1 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                      <span className="w-1 h-1 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                      <span className="w-1 h-1 bg-emerald-500 rounded-full animate-bounce"></span>
                    </span>
                    writing...
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-xs text-gray-400 ml-auto">
                    <Clock className="w-3 h-3" />
                    {order.deadline}
                  </span>
                )}
              </div>
            </div>
            
            <div className="text-right shrink-0 ml-2">
              <div className="text-sm font-bold text-emerald-600">{order.rate}</div>
              <div className="text-[10px] text-gray-400">total</div>
            </div>
            
            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-xs text-emerald-500 font-medium">→</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-3 border-t border-gray-100 sticky bottom-0 bg-white">
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-400">+{WRITING_ORDERS.length * 2} more orders available</span>
          <button 
            onClick={handleOrderClick}
            className="text-emerald-500 font-medium hover:text-emerald-600 transition-colors flex items-center gap-1"
          >
            <Award className="w-3 h-3" />
            Start writing →
          </button>
        </div>
      </div>
    </div>
  );
}

export default LiveAcademicWriting;