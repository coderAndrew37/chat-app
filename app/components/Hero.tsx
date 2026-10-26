import { VELLOEARN_REGISTER_URL } from "@/lib/constants";
import Image from "next/image";

type Choice = "hotels" | "chatting" | null;

export default function Hero({ choice }: { choice: Choice }) {
  const isChatting = choice === "chatting";

  const title = isChatting 
    ? "Get paid to chat with foreigners." 
    : "Get paid to review hotels across Kenya.";
    
  const description = isChatting
    ? "Chat with lonely foreigners looking for conversation. Make friends, share your culture, and earn money instantly. No experience needed."
    : "Real properties need real reviews. Pick a hotel, complete the review task, earn KES 250–800 per approved submission. Paid straight to M-Pesa.";

  const badgeText = isChatting ? "Remote Chatting · Most Popular" : "Hotel review tasks · Kenya";
  const primaryCta = isChatting ? "Start chatting now" : "Browse open reviews";
  const secondaryCta = isChatting ? "See active chatters below ↓" : "See hotels below ↓";
  const secondaryHref = isChatting ? "#chatting" : "#hotels";

  return (
    <section className="pt-16 pb-12 sm:pt-20 sm:pb-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="inline-flex items-center gap-2 text-rose-500 font-semibold text-xs uppercase tracking-wider mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
              {badgeText}
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-[1.1] mb-5">
              {title}
            </h1>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-7 max-w-lg">
              {description}
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <a
                href={VELLOEARN_REGISTER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-rose-500 hover:bg-rose-600 text-white font-bold px-6 py-3.5 rounded-lg transition-colors text-sm shadow-sm"
              >
                {primaryCta}
              </a>
              <a
                href={secondaryHref}
                className="text-gray-700 hover:text-gray-900 font-semibold text-sm px-4 py-3.5"
              >
                {secondaryCta}
              </a>
            </div>

            {/* Trust row */}
            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-xs text-gray-500">
              <span>✓ Free to join</span>
              <span>✓ No experience needed</span>
              <span>✓ Instant M-Pesa payouts</span>
            </div>
          </div>

          {/* Visual — stack of images */}
          <div className="relative h-[360px] sm:h-[420px] lg:h-[480px] hidden sm:block">
            <div className="absolute inset-0 grid grid-cols-2 gap-3">
              <div className="relative rounded-2xl overflow-hidden">
                <Image
                  src={isChatting 
                    ? "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=900&fit=crop&q=80"
                    : "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=900&fit=crop&q=80"
                  }
                  alt={isChatting ? "Person chatting online" : "Hotel exterior"}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 0px, 30vw"
                  priority
                />
              </div>
              <div className="relative rounded-2xl overflow-hidden mt-8">
                <Image
                  src={isChatting
                    ? "https://images.unsplash.com/photo-1587560699334-cc4ff634909a?w=600&h=900&fit=crop&q=80"
                    : "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&h=900&fit=crop&q=80"
                  }
                  alt={isChatting ? "Remote worker on phone" : "Hotel room"}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 0px, 30vw"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}