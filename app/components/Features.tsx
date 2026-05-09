import Image from "next/image";
import Link from "next/link";

interface FeatureItem {
  icon: string;
  title: string;
  body: string;
}

const FEATURES: FeatureItem[] = [
  {
    icon: "💬",
    title: "Real conversations, real money",
    body: "You're not clicking ads or filling endless forms. You're having actual conversations — and getting paid every time. The M-Pesa hits are satisfying.",
  },
  {
    icon: "🏗️",
    title: "We built the infrastructure",
    body: "Defined tasks, clear rate cards, payout automation — all in place before you join. You focus on chatting. We handle everything else.",
  },
  {
    icon: "📈",
    title: "Your team multiplies your income",
    body: "Bring people in and earn on their activity too. The serious earners here don't just chat — they build teams that run while they sleep.",
  },
  {
    icon: "💸",
    title: "Instant M-Pesa, no minimums",
    body: "Direct B2C integration. Whatever you've earned, you can withdraw. No waiting, no bank accounts, no drama — just M-Pesa on demand.",
  },
];

const EARN_METHODS = [
  { icon: "💬", label: "Chatting", href: "/earn/chatting" },
  { icon: "🤖", label: "AI Training", href: "/earn/ai-training" },
  { icon: "🌍", label: "Teach Swahili", href: "/earn/swahili-teaching" },
  { icon: "📋", label: "Surveys", href: "/earn/surveys" },
  { icon: "✍️", label: "Academic Writing", href: "/earn/academic-writing" },
  { icon: "📊", label: "Forex Trading", href: "/earn/forex" },
];

export default function Features() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-14">
          <span className="text-rose-500 font-semibold text-sm uppercase tracking-wider">
            Why it works
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2 mb-3">
            Built different. Pays different.
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto">
            Most side hustles pay you once. VelloEarn keeps paying — and scales with the team you build.
          </p>
        </div>

        {/* Feature grid + lifestyle image side by side */}
        <div className="grid lg:grid-cols-5 gap-8 items-start mb-14">

          {/* Feature cards — 3 cols on large */}
          <div className="lg:col-span-3 grid sm:grid-cols-2 gap-5">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:border-rose-100 hover:shadow-md transition-all"
              >
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="text-base font-bold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>

          {/* Lifestyle image — 2 cols */}
          <div className="lg:col-span-2 relative h-[420px] rounded-3xl overflow-hidden shadow-2xl shadow-rose-50 hidden lg:block">
            <Image
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=900&fit=crop"
              alt="Young professionals working on laptops together, relaxed and happy"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 0px, 40vw"
            />
            {/* Overlay with earnings stat */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4">
                <div className="text-xs text-gray-500 mb-1 font-medium">Average team earner</div>
                <div className="text-2xl font-extrabold text-gray-900">KES 22,000</div>
                <div className="text-sm text-emerald-600 font-semibold">per month · paid to M-Pesa</div>
              </div>
            </div>
          </div>
        </div>

        {/* Earn page bridge */}
        <div className="rounded-3xl bg-gradient-to-br from-rose-500 to-pink-500 p-8 sm:p-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full translate-x-1/3 -translate-y-1/2 pointer-events-none" />
          <div className="relative flex flex-col sm:flex-row items-center gap-8">
            <div className="flex-1 text-center sm:text-left">
              <p className="text-rose-100 text-sm font-semibold uppercase tracking-wider mb-2">
                Not just chatting
              </p>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
                6 ways to earn on VelloEarn.
              </h3>
              <p className="text-rose-100 text-sm leading-relaxed max-w-md mb-5 sm:mb-0">
                AI training. Teaching Swahili. Academic writing. Forex trading. Surveys. And chatting. Pick one — or stack them all.
              </p>
            </div>
            <div className="shrink-0 w-full sm:w-auto">
              {/* Methods pill grid */}
              <div className="flex flex-wrap gap-2 justify-center sm:justify-end mb-5">
                {EARN_METHODS.map((m) => (
                  <Link
                    key={m.href}
                    href={m.href}
                    className="inline-flex items-center gap-1.5 bg-white/15 hover:bg-white/25 text-white text-xs font-semibold px-3 py-1.5 rounded-full transition-all"
                  >
                    {m.icon} {m.label}
                  </Link>
                ))}
              </div>
              <Link
                href="/earn"
                className="flex items-center justify-center gap-2 bg-white text-rose-500 font-bold px-7 py-4 rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all text-sm"
              >
                Explore all earning methods →
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}