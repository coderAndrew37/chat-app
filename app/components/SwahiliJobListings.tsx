// app/components/SwahiliJobListings.tsx
"use client";

import { VELLOEARN_REGISTER_URL } from "@/lib/constants";
import { BookOpen, Clock, TrendingUp, Users } from "lucide-react";
import Link from "next/link";


interface TeachingJob {
  id: string;
  title: string;
  type: "1-on-1" | "Group" | "Written" | "Pronunciation";
  rate: string;
  urgency: "High" | "Medium" | "Low";
  students: string;
  requirements: string[];
  flag: string;
}

const TEACHING_JOBS: TeachingJob[] = [
  {
    id: "1",
    title: "Swahili for Business - Advanced",
    type: "1-on-1",
    rate: "KES 1,800/session",
    urgency: "High",
    students: "2 students waiting",
    requirements: ["Fluent Swahili", "Business vocabulary", "Flexible hours"],
    flag: "🇺🇸"
  },
  {
    id: "2",
    title: "Beginner Swahili - Travel Focus",
    type: "1-on-1",
    rate: "KES 1,200/session",
    urgency: "High",
    students: "5 students waiting",
    requirements: ["Native speaker", "Patient", "Good English"],
    flag: "🇬🇧"
  },
  {
    id: "3",
    title: "Swahili Group Class - Intermediate",
    type: "Group",
    rate: "KES 2,500/session",
    urgency: "Medium",
    students: "8 students waiting",
    requirements: ["Group teaching experience", "Structured lessons"],
    flag: "🇩🇪"
  },
  {
    id: "4",
    title: "Written Swahili Coaching",
    type: "Written",
    rate: "KES 800/assignment",
    urgency: "Medium",
    students: "4 students waiting",
    requirements: ["Strong writing skills", "Grammar knowledge"],
    flag: "🇨🇳"
  },
  {
    id: "5",
    title: "Pronunciation & Accent Training",
    type: "Pronunciation",
    rate: "KES 1,500/session",
    urgency: "High",
    students: "3 students waiting",
    requirements: ["Clear accent", "Patient", "Good audio setup"],
    flag: "🇫🇷"
  },
  {
    id: "6",
    title: "Swahili for Heritage Learners",
    type: "1-on-1",
    rate: "KES 1,400/session",
    urgency: "Low",
    students: "6 students waiting",
    requirements: ["Cultural knowledge", "Conversational skills"],
    flag: "🇨🇦"
  },
];

const urgencyColors = {
  High: "bg-red-100 text-red-600",
  Medium: "bg-orange-100 text-orange-600",
  Low: "bg-gray-100 text-gray-500"
};

const typeIcons = {
  "1-on-1": "👤",
  "Group": "👥",
  "Written": "📝",
  "Pronunciation": "🎙️"
};

export default function SwahiliJobListings() {
  return (
    <div className="bg-white rounded-3xl shadow-2xl shadow-emerald-100/50 border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          <span className="text-sm font-semibold text-gray-900">Available Teaching Opportunities</span>
          <span className="text-xs text-gray-400">· {TEACHING_JOBS.length} open</span>
        </div>
        <span className="text-xs text-emerald-500 font-medium flex items-center gap-1">
          <TrendingUp className="w-3 h-3" />
          High demand
        </span>
      </div>

      <div className="space-y-3 max-h-[420px] overflow-y-auto pr-2">
        {TEACHING_JOBS.map((job) => (
          <a
            key={job.id}
            href={VELLOEARN_REGISTER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-gray-50 hover:bg-emerald-50 border border-gray-100 hover:border-emerald-200 rounded-xl p-4 transition-all cursor-pointer group"
          >
            <div className="flex items-start gap-3">
              <div className="text-2xl shrink-0">{typeIcons[job.type]}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <h4 className="font-semibold text-gray-900 text-sm group-hover:text-emerald-600 transition-colors">
                    {job.title}
                  </h4>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${urgencyColors[job.urgency]}`}>
                    {job.urgency}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-400 flex-wrap">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3 h-3" />
                    {job.type}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {job.students}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {job.rate}
                  </span>
                </div>
                <div className="flex items-center gap-1 mt-1.5 flex-wrap">
                  {job.requirements.map((req, idx) => (
                    <span key={idx} className="text-[10px] bg-white text-gray-500 px-2 py-0.5 rounded-full border border-gray-100">
                      {req}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-right shrink-0 ml-2">
                <span className="text-2xl">{job.flag}</span>
                <div className="text-[10px] text-emerald-500 font-medium mt-1 group-hover:underline">
                  Apply →
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>

      <div className="mt-4 pt-3 border-t border-gray-100">
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>+{TEACHING_JOBS.length * 2} more students waiting</span>
          <Link
            href={VELLOEARN_REGISTER_URL}
            rel="noopener noreferrer"
            className="text-emerald-500 font-medium hover:text-emerald-600 transition-colors flex items-center gap-1"
          >
            Apply to teach →
          </Link>
        </div>
      </div>
    </div>
  );
}