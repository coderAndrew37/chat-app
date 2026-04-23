// ─── app/earn/ai-training/page.tsx ───────────────────────────────────────────
// Copy this file to app/earn/ai-training/page.tsx

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Earn by Training AI | Chat254 Remote Work Kenya",
  description:
    "Help AI systems learn from humans. Rate responses, improve model accuracy, and get paid directly to M-Pesa. No tech background needed.",
  keywords: ["AI training jobs Kenya", "RLHF tasks Kenya", "data labeling Kenya", "earn online Kenya AI"],
};

export default function AITrainingPage() {
  return (
    <main className="bg-gray-50 min-h-screen">
      <section className="pt-20 pb-16 bg-gradient-to-br from-rose-50 via-white to-pink-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-rose-500 mb-8 transition">
            ← Back to main site
          </Link>
          <div className="text-4xl mb-4">🤖</div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
            Earn by Training AI
          </h1>
          <p className="text-lg text-gray-500 mb-8 max-w-lg mx-auto">
            AI companies pay people like you to teach their systems how to respond like humans. Your opinions and judgments are the product. No coding. No degree. Just your thinking.
          </p>
          <Link
            href="/?apply=ai-training"
            className="bg-rose-500 hover:bg-rose-600 text-white font-bold px-8 py-4 rounded-full shadow-lg shadow-rose-200 transition-all hover:scale-105"
          >
            Apply for AI Training Role
          </Link>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-6">What you actually do</h2>
          <div className="space-y-4">
            {[
              { title: "Rating AI responses", body: "You&apos;re shown two or more AI-generated answers and asked which one is better, more accurate, or more natural. Simple comparisons, consistent payouts." },
              { title: "Improving model outputs", body: "Rewrite or improve AI-generated text so it sounds more like a real person would say it. Your Kenyan cultural context is actually valuable here." },
              { title: "Fact-checking and flagging", body: "Review AI responses for accuracy and flag anything misleading or incorrect. Straightforward tasks with clear rate cards." },
            ].map((item) => (
              <div key={item.title} className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed" dangerouslySetInnerHTML={{ __html: item.body }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-3">Explore other earning tracks</h2>
          <div className="grid grid-cols-3 gap-3 mt-6">
            {[
              { icon: "💬", label: "Chatting", href: "/earn/chatting" },
              { icon: "🌍", label: "Teach Swahili", href: "/earn/swahili-teaching" },
              { icon: "📋", label: "Surveys", href: "/earn/surveys" },
            ].map((m) => (
              <Link key={m.href} href={m.href} className="bg-white rounded-2xl p-4 border border-gray-100 hover:border-rose-200 transition text-center">
                <div className="text-2xl mb-2">{m.icon}</div>
                <div className="text-sm font-semibold text-gray-700">{m.label}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}