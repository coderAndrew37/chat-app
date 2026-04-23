import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Earn by Chatting Online | Chat254 Remote Work Kenya",
  description:
    "Join Chat254's remote chatting team. Real-time communication tasks, moderation, and engagement work. Direct M-Pesa payouts. Apply today.",
  keywords: ["online chatting jobs Kenya", "remote chat support Kenya", "earn money chatting Kenya", "M-Pesa online work"],
};

export default function ChattingPage() {
  return (
    <main className="bg-gray-50 min-h-screen">
      <section className="pt-20 pb-16 bg-gradient-to-br from-rose-50 via-white to-pink-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-rose-500 mb-8 transition">
            ← Back to main site
          </Link>
          <div className="text-4xl mb-4">💬</div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
            Earn by Chatting Online
          </h1>
          <p className="text-lg text-gray-500 mb-8 max-w-lg mx-auto">
            Real-time communication support, moderation, and engagement tasks — all from your phone. This is the most popular earning track on Chat254.
          </p>
          <Link
            href="/?apply=chatting"
            className="bg-rose-500 hover:bg-rose-600 text-white font-bold px-8 py-4 rounded-full shadow-lg shadow-rose-200 transition-all hover:scale-105"
          >
            Apply for Chatting Role
          </Link>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-6">What the work actually looks like</h2>
          <div className="space-y-4">
            {[
              { title: "Real-time communication support", body: "Respond to inquiries and messages within defined response windows. Tasks are structured — you know exactly what to do and how much each task pays." },
              { title: "Content moderation", body: "Review content on platforms to ensure it meets community standards. Consistent, well-paying work you can do in short focused sessions." },
              { title: "Data engagement tasks", body: "Interact with data sets and digital content to improve platform quality. No technical skills needed — just attention and consistency." },
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
          <h2 className="text-2xl font-extrabold text-gray-900 mb-3">Not just chatting, by the way</h2>
          <p className="text-gray-500 mb-8">Chat254 has three other earning tracks. Many team members do more than one.</p>
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: "🤖", label: "AI training", href: "/earn/ai-training" },
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