// No "use client" needed — pure presentational
// SEO NOTE: This section is your internal link hub.
// Every earn method links to its dedicated page, passing
// authority from the homepage down to each earning page.
// The two featured cards (Chat + AI Training) get the most
// descriptive copy because they are your biggest keyword targets.

import Link from "next/link";

interface EarnMethod {
  icon: string;
  label: string;
  href: string;
  description: string;
  tag: string;
  featured?: boolean;
}

const EARN_METHODS: EarnMethod[] = [
  {
    icon: "💬",
    label: "Chat with foreigners",
    href: "/earn/chatting",
    description:
      "Get paid to have real conversations with people from around the world. Available on your phone, any time of day. The most popular method on VelloEarn.",
    tag: "Most popular",
    featured: true,
  },
  {
    icon: "🤖",
    label: "AI training tasks",
    href: "/earn/ai-training",
    description:
      "Help train artificial intelligence by rating responses, labelling data, and testing AI systems. No tech background needed — just good judgment and honest feedback.",
    tag: "Fast growing",
    featured: true,
  },
  {
    icon: "🌍",
    label: "Teach Swahili",
    href: "/earn/swahili-teaching",
    description:
      "Native Swahili speakers are in high demand globally. Teach words, record phrases, or help with translation tasks.",
    tag: "Kenya advantage",
  },
  {
    icon: "📋",
    label: "Surveys",
    href: "/earn/surveys",
    description:
      "Share your opinion on products, brands, and services. Quick tasks, consistent pay.",
    tag: "Quick tasks",
  },
  {
    icon: "✍️",
    label: "Academic writing",
    href: "/earn/academic-writing",
    description:
      "Put your writing skills to work. Essays, research support, and editing tasks.",
    tag: "High pay",
  },
  {
    icon: "📊",
    label: "Forex trading",
    href: "/earn/forex",
    description:
      "Learn to trade currency markets with VelloEarn's guided program. Higher ceiling, steeper learning curve.",
    tag: "Advanced",
  },
];

const featured = EARN_METHODS.filter((m) => m.featured);
const secondary = EARN_METHODS.filter((m) => !m.featured);

export default function EarnMethods() {
  return (
    <section id="earn-methods" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-14">
          <span className="text-rose-500 font-semibold text-sm uppercase tracking-wider">
            How you earn
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2 mb-3">
            6 real ways to earn from your phone in Kenya
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto">
            Pick one method or combine them. Every payout goes straight to M-Pesa.
          </p>
        </div>

        {/* Featured two — Chat and AI Training */}
        <div className="grid sm:grid-cols-2 gap-6 mb-6">
          {featured.map((method) => (
            <Link
              key={method.href}
              href={method.href}
              className="group relative bg-gray-50 hover:bg-rose-50 border border-gray-100 hover:border-rose-200 rounded-3xl p-8 transition-all duration-200 hover:shadow-md"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-4xl">{method.icon}</span>
                <span className="text-xs bg-rose-100 text-rose-600 font-semibold px-3 py-1 rounded-full">
                  {method.tag}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-rose-600 transition-colors">
                {method.label}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-5">
                {method.description}
              </p>
              <span className="text-sm font-semibold text-rose-500 group-hover:underline">
                Learn how it works →
              </span>
            </Link>
          ))}
        </div>

        {/* Secondary four — smaller cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {secondary.map((method) => (
            <Link
              key={method.href}
              href={method.href}
              className="group bg-gray-50 hover:bg-rose-50 border border-gray-100 hover:border-rose-200 rounded-2xl p-6 transition-all duration-200 hover:shadow-sm"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl">{method.icon}</span>
                <span className="text-xs bg-white text-gray-500 font-medium px-2 py-0.5 rounded-full border border-gray-200">
                  {method.tag}
                </span>
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-2 group-hover:text-rose-600 transition-colors">
                {method.label}
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                {method.description}
              </p>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}