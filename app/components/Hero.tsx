"use client";

import { STATS } from "@/data";
import { VELLOEARN_REGISTER_URL, whatsappNumber } from "@/lib/constants";
import type { Stat } from "@/types";
import { MessageCircle, ShieldCheck, Zap, ArrowRight, CheckCircle2, Lock, X } from "lucide-react";
import { useEffect, useState } from "react";

function StatCard({ stat }: { stat: Stat }) {
  return (
    <div className="text-center">
      <div className="text-2xl sm:text-3xl font-extrabold text-gray-900">{stat.value}</div>
      <div className="text-xs sm:text-sm font-medium text-gray-500 mt-0.5">{stat.label}</div>
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

const unsplash = (photoId: string) =>
  `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=200&h=200&q=80`;

const PROFILES: Profile[] = [
  { id: "1", name: "Margaret W.", age: 58, country: "USA", flag: "🇺🇸", avatar: unsplash("photo-1566616213894-2d4e1baee5d8"), link: VELLOEARN_REGISTER_URL },
  { id: "2", name: "Robert H.", age: 62, country: "UK", flag: "🇬🇧", avatar: unsplash("photo-1544694032-19eb3ee39243"), link: VELLOEARN_REGISTER_URL },
  { id: "3", name: "Helga S.", age: 55, country: "Germany", flag: "🇩🇪", avatar: unsplash("photo-1543430720-fa600c67e423"), link: VELLOEARN_REGISTER_URL },
  { id: "4", name: "James M.", age: 64, country: "Canada", flag: "🇨🇦", avatar: unsplash("photo-1515515957482-9bfec374dbc4"), link: VELLOEARN_REGISTER_URL },
  { id: "5", name: "Karen P.", age: 51, country: "Australia", flag: "🇦🇺", avatar: unsplash("photo-1616286608358-0e1b143f7d2f"), link: VELLOEARN_REGISTER_URL },
  { id: "6", name: "Lars E.", age: 60, country: "Sweden", flag: "🇸🇪", avatar: unsplash("photo-1590074251929-76f7c465a3bd"), link: VELLOEARN_REGISTER_URL },
];

const RECENT_WITHDRAWALS = [
  { name: "Faith M.", location: "Nairobi", amount: "KES 1,450", time: "2 mins ago" },
  { name: "Brian K.", location: "Mombasa", amount: "KES 2,100", time: "4 mins ago" },
  { name: "Achieng O.", location: "Kisumu", amount: "KES 980", time: "Just now" },
  { name: "Kelvin W.", location: "Nakuru", amount: "KES 3,250", time: "7 mins ago" },
];

function LiveWithdrawalTicker() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % RECENT_WITHDRAWALS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const current = RECENT_WITHDRAWALS[index];

  return (
    <div className="inline-flex items-center gap-3 bg-emerald-50 border border-emerald-200/80 rounded-full px-4 py-1.5 shadow-sm">
      <span className="relative flex h-2.5 w-2.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
      </span>
      <span className="text-xs sm:text-sm font-medium text-emerald-950">
        <span className="font-bold text-emerald-700">{current?.name}</span> ({current?.location}) withdrew{" "}
        <span className="font-extrabold text-emerald-800">{current?.amount}</span> to M-Pesa{" "}
        <span className="text-emerald-600/70 text-xs">· {current?.time}</span>
      </span>
    </div>
  );
}

function LiveChatFeed() {
  const [typingIds, setTypingIds] = useState<Set<string>>(new Set(["1", "3", "5"]));

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIds = PROFILES.filter(() => Math.random() > 0.5).map((p) => p.id);
      setTypingIds(new Set(randomIds));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white rounded-3xl shadow-2xl shadow-rose-100/60 border border-gray-100 p-4 sm:p-5 h-[480px] overflow-y-auto relative">
      <div className="flex items-center justify-between mb-4 sticky top-0 bg-white/95 backdrop-blur-md z-10 pb-3 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
          <span className="text-sm font-bold text-gray-900">Active Foreigners Online</span>
          <span className="text-xs bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-full">
            High Demand
          </span>
        </div>
      </div>

      <div className="space-y-2.5">
        {PROFILES.map((profile) => (
          <div
            key={profile.id}
            onClick={() => (window.location.href = profile.link)}
            className="flex items-center gap-3 p-2.5 rounded-2xl hover:bg-rose-50/80 border border-transparent hover:border-rose-100 transition-all cursor-pointer group"
          >
            <div className="relative shrink-0">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-11 h-11 rounded-full object-cover ring-2 ring-rose-100"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white bg-emerald-500" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-xs">{profile.flag}</span>
                <span className="text-sm font-bold text-gray-900 truncate group-hover:text-rose-600 transition-colors">
                  {profile.name}
                </span>
                <span className="text-xs text-gray-400">· {profile.age}</span>
              </div>
              <div className="h-4 mt-0.5">
                {typingIds.has(profile.id) ? (
                  <span className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
                    <span className="flex items-center gap-0.5">
                      <span className="h-1 w-1 animate-bounce rounded-full bg-emerald-500 [animation-delay:-0.3s]" />
                      <span className="h-1 w-1 animate-bounce rounded-full bg-emerald-500 [animation-delay:-0.15s]" />
                      <span className="h-1 w-1 animate-bounce rounded-full bg-emerald-500" />
                    </span>
                    <span>typing a message...</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-xs text-gray-400">
                    <span>Looking for chat</span>
                    <MessageCircle className="h-3 w-3 text-rose-400" />
                  </span>
                )}
              </div>
            </div>

            <span className="text-xs font-semibold text-rose-500 bg-rose-50 group-hover:bg-rose-500 group-hover:text-white px-2.5 py-1 rounded-lg transition-all">
              Chat →
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-3 border-t border-gray-100 sticky bottom-0 bg-white/95 backdrop-blur-md">
        <button
          onClick={() => (window.location.href = VELLOEARN_REGISTER_URL)}
          className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-xs py-2.5 rounded-xl hover:shadow-md transition-all flex items-center justify-center gap-1.5"
        >
          <span>Connect with 40+ more online</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

function HowItWorksModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-2xl font-black text-gray-900 mb-4">How It Works</h3>

        <div className="space-y-4 text-left mb-6">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-600 font-bold flex items-center justify-center shrink-0">
              1
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-base">Create Your Account</h4>
              <p className="text-sm text-gray-600">
                Register on the portal to get instant access to your chatter dashboard.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-600 font-bold flex items-center justify-center shrink-0">
              2
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-base">Start Chatting</h4>
              <p className="text-sm text-gray-600">
                Reply to incoming messages from active members online.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-600 font-bold flex items-center justify-center shrink-0">
              3
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-base">Get Paid Directly to M-Pesa</h4>
              <p className="text-sm text-gray-600">
                Earn daily payouts straight to your M-Pesa number whenever you cash out.
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => (window.location.href = VELLOEARN_REGISTER_URL)}
          className="w-full bg-rose-500 hover:bg-rose-600 text-white font-extrabold text-base py-3.5 rounded-2xl shadow-lg shadow-rose-200 transition-all flex items-center justify-center gap-2"
        >
          <span>Create Account</span>
          <Zap className="w-5 h-5 fill-white" />
        </button>
      </div>
    </div>
  );
}

export default function Hero() {
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);

  const handleStartChat = () => {
    window.location.href = VELLOEARN_REGISTER_URL;
  };

  return (
    <section className="pt-20 pb-12 sm:pt-28 sm:pb-20 bg-gradient-to-br from-rose-50/70 via-white to-pink-50/50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-rose-200/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-100/40 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex justify-center mb-6 sm:mb-8">
          <LiveWithdrawalTicker />
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column Copy */}
          <div className="lg:col-span-7 text-center lg:text-left">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-[1.15] tracking-tight mb-5">
              Chat with lonely <span className="text-rose-500 underline decoration-rose-200 decoration-wavy decoration-2">foreigners</span> — get paid instantly.
            </h1>

            <p className="text-base sm:text-xl text-gray-600 mb-6 max-w-2xl leading-relaxed font-normal">
              Earn daily income directly to your <strong className="text-emerald-700 font-bold">M-Pesa</strong> by replying to messages. Activate your verified chatter account today and start earning immediately.
            </p>

            {/* Micro Trust Bullets */}
            <div className="grid grid-cols-1 sm:flex sm:flex-wrap gap-2.5 justify-center lg:justify-start mb-8 text-xs sm:text-sm font-semibold text-gray-700">
              <span className="flex items-center justify-center gap-1.5 bg-rose-50 border border-rose-200 text-rose-800 px-3 py-1.5 rounded-lg">
                <Lock className="w-4 h-4 text-rose-500 shrink-0" /> Verified Chatter Account
              </span>
              <span className="flex items-center justify-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-800 px-3 py-1.5 rounded-lg">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Signup Bonus Included
              </span>
              <span className="flex items-center justify-center gap-1.5 bg-white border border-gray-200/80 px-3 py-1.5 rounded-lg shadow-2xs">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" /> Same-Day M-Pesa Withdrawals
              </span>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3.5 justify-center lg:justify-start mb-8">
              <button
                onClick={handleStartChat}
                className="bg-rose-500 hover:bg-rose-600 text-white font-extrabold text-base sm:text-lg px-8 py-4 rounded-2xl shadow-xl shadow-rose-200/80 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <span>Apply Now</span>
                <Zap className="w-5 h-5 fill-white" />
              </button>
              <button
                onClick={() => setIsHowItWorksOpen(true)}
                className="bg-white hover:bg-gray-50 text-gray-800 font-bold text-base px-7 py-4 rounded-2xl border border-gray-200 shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center cursor-pointer"
              >
                See How It Works
              </button>
            </div>

            {/* Stats Breakdown */}
            <div className="grid grid-cols-3 gap-4 border-t border-gray-200/60 pt-6">
              {STATS.map((stat) => (
                <StatCard key={stat.label} stat={stat} />
              ))}
            </div>
          </div>

          {/* Right Live Feed */}
          <div className="lg:col-span-5">
            <LiveChatFeed />
          </div>
        </div>

        {/* WhatsApp Quick Help Banner */}
        <div className="mt-12 flex justify-center">
          <a
            href={`https://wa.me/${whatsappNumber}?text=Hi%2C%20I%20have%20questions%20about%20the%20registration%20and%20how%20to%20start.`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3.5 bg-white border border-gray-200/80 rounded-2xl px-5 py-3.5 shadow-sm hover:shadow-md transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-white text-lg shrink-0 group-hover:scale-105 transition-transform">
              💬
            </div>
            <div className="text-left">
              <div className="text-xs text-gray-400 font-medium font-sans">Have payment or setup questions?</div>
              <div className="text-sm font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">
                Chat with our Support Team on WhatsApp →
              </div>
            </div>
          </a>
        </div>
      </div>

      <HowItWorksModal isOpen={isHowItWorksOpen} onClose={() => setIsHowItWorksOpen(false)} />
    </section>
  );
}