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

        {/* Feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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

        {/* Earn page bridge — "it's not just chatting" */}
        <div className="mt-14 rounded-3xl bg-gradient-to-br from-rose-500 to-pink-500 p-8 sm:p-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full translate-x-1/3 -translate-y-1/2 pointer-events-none" />
          <div className="relative flex flex-col sm:flex-row items-center gap-6 sm:gap-10">
            <div className="flex-1 text-center sm:text-left">
              <p className="text-rose-100 text-sm font-semibold uppercase tracking-wider mb-2">
                Not just chatting
              </p>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
                4 ways to earn on VelloEarn.
              </h3>
              <p className="text-rose-100 text-sm leading-relaxed max-w-md">
                AI training. Teaching Swahili to foreigners. Paid surveys. And of course, chatting. Pick one — or stack all four. All roads lead to M-Pesa.
              </p>
            </div>
            <div className="shrink-0">
              <Link
                href="/earn"
                className="inline-flex items-center gap-2 bg-white text-rose-500 font-bold px-7 py-4 rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all text-sm whitespace-nowrap"
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