// app/components/LiveAITraining.tsx
"use client";

import { TrendingUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type AITask = {
  id: string;
  title: string;
  company: string;
  rate: string;
  type: string;
  urgency: string;
  logo: string;
};

const AI_TASKS: AITask[] = [
  { id: "1", title: "Rate AI Response - Accuracy", company: "OpenAI", rate: "KES 1200/task", type: "Rating", urgency: "High", logo: "🤖" },
  { id: "2", title: "Data Labeling - Images", company: "Google AI", rate: "KES 1500/task", type: "Labeling", urgency: "High", logo: "📷" },
  { id: "3", title: "Chatbot Conversation Training", company: "Meta AI", rate: "KES 1000/task", type: "Chat", urgency: "Medium", logo: "💬" },
  { id: "4", title: "Text Rewriting - Natural Language", company: "Anthropic", rate: "KES 1800/task", type: "Writing", urgency: "High", logo: "✍️" },
  { id: "5", title: "Content Moderation - AI Training", company: "TikTok", rate: "KES 900/task", type: "Moderation", urgency: "Medium", logo: "🛡️" },
  { id: "6", title: "Swahili Text Verification", company: "Google AI", rate: "KES 2000/task", type: "Language", urgency: "Premium", logo: "🌍" },
  { id: "7", title: "AI Response Ranking", company: "Microsoft", rate: "KES 1300/task", type: "Rating", urgency: "High", logo: "📊" },
  { id: "8", title: "Video Description Labeling", company: "YouTube", rate: "KES 1600/task", type: "Labeling", urgency: "Medium", logo: "🎥" },
  { id: "9", title: "Academic Text Verification", company: "EdTech", rate: "KES 1800/task", type: "Verification", urgency: "Skilled", logo: "📚" },
  { id: "10", title: "Voice Recording - AI Training", company: "Amazon", rate: "KES 1400/task", type: "Voice", urgency: "High", logo: "🎙️" },
];

const MAX_CONCURRENT_TASKS = 4;
const MIN_TASK_DURATION_MS = 800;
const MAX_TASK_DURATION_MS = 2000;
const TICK_MS = 150;

function LiveAITraining() {
  const [activeIds, setActiveIds] = useState<Set<string>>(new Set());
  const expiryMap = useRef<Map<string, number>>(new Map());

  useEffect(() => {
    const initialActive = new Set<string>();
    const numInitial = Math.floor(Math.random() * 2) + 2;
    const shuffled = [...AI_TASKS].sort(() => Math.random() - 0.5);
    for (let i = 0; i < Math.min(numInitial, shuffled.length); i++) {
      initialActive.add(shuffled[i].id);
      expiryMap.current.set(
        shuffled[i].id,
        Date.now() + MIN_TASK_DURATION_MS + Math.random() * (MAX_TASK_DURATION_MS - MIN_TASK_DURATION_MS)
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

        const available = AI_TASKS.filter((p) => !next.has(p.id));
        const slotsAvailable = MAX_CONCURRENT_TASKS - next.size;
        
        if (slotsAvailable > 0 && available.length > 0 && Math.random() < 0.6) {
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
              const duration = MIN_TASK_DURATION_MS + Math.random() * (MAX_TASK_DURATION_MS - MIN_TASK_DURATION_MS);
              expiryMap.current.set(pick.id, now + duration);
            }
          }
        }

        return next;
      });
    }, TICK_MS);

    return () => clearInterval(interval);
  }, []);

  const handleTaskClick = () => {
    window.location.href = "https://starhela.com/register?ref=velloearn";
  };

  const urgencyColors = {
    High: "bg-red-100 text-red-600",
    Medium: "bg-orange-100 text-orange-600",
    Premium: "bg-amber-100 text-amber-600",
    Skilled: "bg-violet-100 text-violet-600"
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl shadow-violet-100/50 border border-gray-100 p-4 h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
      <div className="flex items-center justify-between mb-4 sticky top-0 bg-white z-10 pb-2 border-b border-gray-50">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-violet-400 rounded-full animate-pulse" />
          <span className="text-sm font-semibold text-gray-900">Live AI Training Tasks</span>
          <span className="text-xs text-gray-400">· {AI_TASKS.length} available</span>
        </div>
        <span className="text-xs text-violet-500 font-medium animate-pulse flex items-center gap-1">
          <TrendingUp className="w-3 h-3" />
          new tasks
        </span>
      </div>
      
      <div className="space-y-2">
        {AI_TASKS.map((task) => (
          <div 
            key={task.id} 
            onClick={handleTaskClick}
            className="flex items-center gap-3 p-2 rounded-xl hover:bg-violet-50 transition-all cursor-pointer group"
          >
            <div className="relative shrink-0 w-10 h-10 bg-violet-100 rounded-xl flex items-center justify-center text-xl">
              {task.logo}
              {activeIds.has(task.id) && (
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-violet-400 animate-ping" />
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-medium text-gray-900 truncate group-hover:text-violet-600 transition-colors">
                  {task.title}
                </span>
                <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full whitespace-nowrap ${urgencyColors[task.urgency as keyof typeof urgencyColors]}`}>
                  {task.urgency}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">{task.company}</span>
                <span className="text-[10px] text-gray-300">·</span>
                <span className="text-xs text-gray-400">{task.type}</span>
                {activeIds.has(task.id) ? (
                  <span className="flex items-center gap-1 text-xs text-violet-600 font-medium ml-auto">
                    <span className="flex gap-0.5">
                      <span className="w-1 h-1 bg-violet-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                      <span className="w-1 h-1 bg-violet-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                      <span className="w-1 h-1 bg-violet-500 rounded-full animate-bounce"></span>
                    </span>
                    processing...
                  </span>
                ) : (
                  <span className="text-xs font-bold text-emerald-600 ml-auto">{task.rate}</span>
                )}
              </div>
            </div>
            
            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-xs text-violet-500 font-medium">→</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-3 border-t border-gray-100 sticky bottom-0 bg-white">
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-400">+{AI_TASKS.length * 2} more tasks available</span>
          <button 
            onClick={handleTaskClick}
            className="text-violet-500 font-medium hover:text-violet-600 transition-colors flex items-center gap-1"
          >
            Start training →
          </button>
        </div>
      </div>
    </div>
  );
}

export default LiveAITraining;