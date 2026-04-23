import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Earn by Teaching Swahili Online | Chat254 Kenya",
  description:
    "Get paid to teach Swahili to international learners. Flexible one-on-one lessons from your phone. Direct M-Pesa payouts.",
  keywords: ["teach Swahili online", "Swahili tutor jobs Kenya", "online language teaching Kenya", "earn teaching Swahili"],
};

export default function SwahiliTeachingPage() {
  return (
    <main className="bg-gray-50 min-h-screen">
      <section className="pt-20 pb-16 bg-gradient-to-br from-rose-50 via-white to-pink-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-rose-500 mb-8 transition">
            ← Back to main site
          </Link>
          <div className="text-4xl mb-4">🌍</div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
            Earn by Teaching Swahili
          </h1>
          <p className="text-lg text-gray-500 mb-8 max-w-lg mx-auto">
            Foreigners are actively paying to learn what you already speak fluently. Your mother tongue is a global skill. We connect you with the learners — you just show up.
          </p>
          <Link
            href="/?apply=swahili-teaching"
            className="bg-rose-500 hover:bg-rose-600 text-white font-bold px-8 py-4 rounded-full shadow-lg shadow-rose-200 transition-all hover:scale-105"
          >
            Apply to Teach Swahili
          </Link>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-6">How the teaching works</h2>
          <div className="space-y-4">
            {[
              { title: "One-on-one video lessons", body: "Short 30–60 minute sessions with international learners via video call. You teach conversational Swahili from wherever you are." },
              { title: "Group classes", body: "Small groups of learners who prefer a classroom feel. Slightly higher pay per session, and students come prepared with questions." },
              { title: "Written lesson support", body: "Learners can send written questions between classes. Answer on your schedule — extra earnings for minimal effort." },
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
          <h2 className="text-2xl font-extrabold text-gray-900 mb-3">Other ways to earn</h2>
          <div className="grid grid-cols-3 gap-3 mt-6">
            {[
              { icon: "💬", label: "Chatting", href: "/earn/chatting" },
              { icon: "🤖", label: "AI training", href: "/earn/ai-training" },
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