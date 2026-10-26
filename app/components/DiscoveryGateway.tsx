"use client";

import { X } from "lucide-react";
import Image from "next/image";

type Choice = "hotels" | "chatting" | null;

interface DiscoveryGatewayProps {
  onChoice: (choice: Choice) => void;
  isOpen: boolean;
}

export default function DiscoveryGateway({ onChoice, isOpen }: DiscoveryGatewayProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#111111]/95 backdrop-blur-sm p-4 sm:p-6 animate-in fade-in duration-300">
      {/* Close Button */}
      <button
        onClick={() => onChoice(null)}
        className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-white/60 hover:text-white hover:bg-white/20 transition-all"
        aria-label="Close gateway"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="w-full max-w-5xl">
        <div className="text-center mb-10">
          <p className="text-amber-500 font-bold tracking-widest text-xs uppercase mb-3">
            VelloEarn • Choose Your Opportunity
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-white mb-4 leading-tight">
            Discover <span className="text-amber-500">Chat Foreigners</span> &<br />
            Review Hotels
          </h1>
          <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto">
            Choose the activity you want to explore. You will be taken directly to the section you select.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
          {/* Option 1: Chatting */}
          <button
            onClick={() => onChoice("chatting")}
            className="group relative flex flex-col text-left overflow-hidden rounded-2xl bg-[#1a1a1a] border border-white/10 hover:border-amber-500/50 transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-[#111]/80 to-transparent z-10" />
            <Image
              src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&h=500&fit=crop&q=80"
              alt="Chat with foreigners"
              width={800}
              height={500}
              className="object-cover h-48 sm:h-56 w-full group-hover:scale-105 transition-transform duration-500 opacity-60 group-hover:opacity-80"
            />
            <div className="relative z-20 p-6 sm:p-8 flex-1 flex flex-col">
              <div className="text-3xl mb-4">🌍</div>
              <h2 className="text-2xl font-serif text-white mb-2">Chat with Foreigners</h2>
              <p className="text-sm text-gray-400 leading-relaxed mb-6 flex-1">
                Chat lonely foreigners from around the globe who need someone to talk to and keep them company.
              </p>
              <div className="w-full bg-amber-500 text-black font-bold text-sm uppercase tracking-wide py-3.5 rounded-lg text-center group-hover:bg-amber-400 transition-colors">
                Chat with Foreigners
              </div>
            </div>
          </button>

          {/* Option 2: Hotel Reviews */}
          <button
            onClick={() => onChoice("hotels")}
            className="group relative flex flex-col text-left overflow-hidden rounded-2xl bg-[#1a1a1a] border border-white/10 hover:border-amber-500/50 transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-[#111]/80 to-transparent z-10" />
            <Image
              src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=500&fit=crop&q=80"
              alt="Review hotels"
              width={800}
              height={500}
              className="object-cover h-48 sm:h-56 w-full group-hover:scale-105 transition-transform duration-500 opacity-60 group-hover:opacity-80"
            />
            <div className="relative z-20 p-6 sm:p-8 flex-1 flex flex-col">
              <div className="text-3xl mb-4">🏨</div>
              <h2 className="text-2xl font-serif text-white mb-2">Review Hotels</h2>
              <p className="text-sm text-gray-400 leading-relaxed mb-6 flex-1">
                Explore hotel rooms, interior designs and food choices. Rate and review hotels and discover the hotel-review opportunity.
              </p>
              <div className="w-full bg-amber-500 text-black font-bold text-sm uppercase tracking-wide py-3.5 rounded-lg text-center group-hover:bg-amber-400 transition-colors">
                Review Hotels
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}