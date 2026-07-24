// No "use client" needed — pure presentational
// SEO NOTE: This section answers the "is this a scam" search intent
// directly on the homepage. Specific numbers and facts outperform
// vague promises for both trust AND keyword relevance.

interface TrustItem {
  question: string;
  answer: string;
}

const TRUST_ITEMS: TrustItem[] = [
  {
    question: "Is VelloEarn legitimate?",
    answer:
      "Yes. We've paid out to thousands of Kenyan earners directly via M-Pesa. No registration fees, no hidden charges. You earn from your first chat, then withdraw instantly — we never ask for money.",
  },
  {
    question: "Do I need experience or a degree?",
    answer:
      "No. Chatting with foreigners just requires a smartphone and conversational English. If you can hold a friendly conversation, you can earn. No tech background, no degree needed.",
  },
  {
    question: "How much can I realistically earn?",
    answer:
      "Casual chatters make KES 3,000–8,000 per month chatting a few hours a week. Consistent chatters who engage regularly average KES 15,000–22,000 per month.",
  },
  {
    question: "When and how do I get paid?",
    answer:
      "Earnings are paid directly to M-Pesa on demand. There is no minimum withdrawal amount and no waiting period. Withdraw your chat earnings anytime you want, instantly.",
  },
];

const STATS = [
  { value: "61K+", label: "Active chatters" },
  { value: "KES 22K", label: "Avg. monthly earnings" },
  { value: "Instant", label: "M-Pesa payout speed" },
  { value: "24/7", label: "Chat availability" },
];

export default function Trust() {
  return (
    <section id="trust" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-14">
          <span className="text-rose-500 font-semibold text-sm uppercase tracking-wider">
            Real answers
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2 mb-3">
            The questions everyone asks before joining
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto">
            We&apos;d rather you know exactly what this is before you start chatting.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-16">

          {/* Trust Q&A */}
          <div className="space-y-5">
            {TRUST_ITEMS.map((item) => (
              <div
                key={item.question}
                className="bg-white rounded-2xl p-6 border border-gray-100"
              >
                <h3 className="text-base font-bold text-gray-900 mb-2">
                  {item.question}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>

          {/* Stats + visual */}
          <div className="flex flex-col gap-5">
            <div className="grid grid-cols-2 gap-4">
              {STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white rounded-2xl p-6 border border-gray-100 text-center"
                >
                  <div className="text-3xl font-extrabold text-gray-900 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs text-gray-500 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Platform promise card */}
            <div className="flex-1 bg-rose-500 rounded-3xl p-8 text-white flex flex-col justify-between">
              <div>
                <div className="text-rose-200 text-sm font-semibold uppercase tracking-wider mb-3">
                  Our promise
                </div>
                <p className="text-2xl font-bold leading-snug mb-4">
                  Chat for free. Earn forever. No fees.
                </p>
                <p className="text-rose-100 text-sm leading-relaxed">
                  Sign up instantly and start chatting with lonely foreigners 
                  looking for conversation. No registration fees, no monthly 
                  subscriptions, no hidden charges. Your earnings are yours — 
                  withdraw to M-Pesa anytime.
                </p>
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-rose-200">
                <span>✓ Free to join</span>
                <span>✓ No fees ever</span>
                <span>✓ 61,000+ active chatters</span>
                <span>✓ Instant M-Pesa payouts</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}