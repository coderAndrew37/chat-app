import { whatsappNumber } from "@/lib/constants";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "What is RLHF? How to Earn from AI Reinforcement Learning Tasks",
  description: "Learn how RLHF (Reinforcement Learning from Human Feedback) tasks work and how thousands are earning good money from home in Kenya, Uganda & Ghana.",
  keywords: ["RLHF jobs Kenya", "RLHF tasks Uganda", "AI reinforcement learning jobs Africa"],
};

export default function RlhfTasksPage() {
  return (
    <main className="bg-gray-50 min-h-screen">
      <section className="pt-20 pb-10 bg-white border-b border-gray-100">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-violet-600 mb-8 transition">
            ← VelloEarn
          </Link>
          <div className="inline-flex items-center gap-2 bg-violet-50 text-violet-600 text-xs font-semibold px-3 py-1 rounded-full mb-4">
            High Paying AI
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
            How to Earn from RLHF Tasks
          </h1>
          <p className="text-gray-500 text-base leading-relaxed">
            One of the highest paying categories in AI data work right now.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 prose prose-gray max-w-none">
          <div className="space-y-8">
            {[
              {
                heading: "What Does RLHF Mean?",
                body: "Reinforcement Learning from Human Feedback. You help train AI models (like ChatGPT) by rating which responses are better, correcting outputs, and giving feedback.",
              },
              {
                heading: "Why Do These Tasks Pay Well?",
                body: "RLHF requires human judgment, which makes it more valuable. On VelloEarn, RLHF tasks often pay 30-60% higher than regular annotation work.",
              },
              {
                heading: "Requirements",
                body: "Strong English reading & writing skills, patience, and logical thinking. A smartphone is enough to start.",
              },
            ].map((section) => (
              <div key={section.heading} className="bg-white rounded-2xl p-6 border border-gray-100">
                <h2 className="text-lg font-bold text-gray-900 mb-3">{section.heading}</h2>
                <p className="text-gray-500 text-sm leading-relaxed">{section.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href={`https://wa.me/${whatsappNumber}?text=Hi%20VelloEarn%2C%20I%27m%20interested%20in%20RLHF%20tasks.`} className="text-red-600 hover:underline">
              Join VelloEarn to Start Earning from RLHF Tasks Today
            </Link>
          </div>

          <div className="mt-12 text-center">
            <Link href="/blog/ai-data-annotation-jobs" className="text-violet-600 hover:underline">
              ← Back to AI Data Annotation Guide
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}