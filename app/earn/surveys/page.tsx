// ─── Save as: app/earn/surveys/page.tsx ──────────────────────────────────────

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Earn from Online Surveys | Chat254 Kenya",
  description:
    "Get paid for your opinions. Global brands pay for Kenyan consumer insights. Quick survey tasks, direct M-Pesa payouts. No experience needed.",
  keywords: ["paid surveys Kenya", "online surveys M-Pesa", "earn from surveys Kenya", "survey jobs Nairobi"],
};

export default function SurveysPage() {
  return (
    <main className="bg-gray-50 min-h-screen">
      <section className="pt-20 pb-16 bg-gradient-to-br from-rose-50 via-white to-pink-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-rose-500 mb-8 transition">
            ← Back to main site
          </Link>
          <div className="text-4xl mb-4">📋</div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
            Earn from Surveys & Research
          </h1>
          <p className="text-lg text-gray-500 mb-8 max-w-lg mx-auto">
            Global brands are paying to understand what Kenyans think, buy, and value. Your opinion is the product. You get paid every time you share it.
          </p>
          <Link
            href="/?apply=surveys"
            className="bg-rose-500 hover:bg-rose-600 text-white font-bold px-8 py-4 rounded-full shadow-lg shadow-rose-200 transition-all hover:scale-105"
          >
            Apply for Survey Tasks
          </Link>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-6">Types of survey work</h2>
          <div className="space-y-4">
            {[
              { title: "Consumer opinion surveys", body: "Short questionnaires from brands wanting to understand how Kenyan consumers think about their products. 5–15 minutes per survey." },
              { title: "Product testing", body: "Receive products to test and review. More involved, but pay is significantly higher than standard surveys." },
              { title: "Focus group participation", body: "Small group discussions (online) where your specific opinions are sought in depth. Pay is the highest in this category." },
            ].map((item) => (
              <div key={item.title} className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-3">Stack it with other earning tracks</h2>
          <div className="grid grid-cols-3 gap-3 mt-6">
            {[
              { icon: "💬", label: "Chatting", href: "/earn/chatting" },
              { icon: "🤖", label: "AI training", href: "/earn/ai-training" },
              { icon: "🌍", label: "Teach Swahili", href: "/earn/swahili-teaching" },
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