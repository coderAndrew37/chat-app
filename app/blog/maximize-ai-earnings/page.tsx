import { whatsappNumber } from "@/lib/constants";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Maximize Earnings from AI Tasks | VelloEarn Kenya",
  description: "Pro tips from top earners on how to make more money doing AI data annotation, RLHF, and text evaluation.",
  keywords: ["maximize AI earnings Kenya", "high paying AI tasks Uganda", "earn more from data labeling"],
};

export default function MaximizeAiEarningsPage() {
  return (
    <main className="bg-gray-50 min-h-screen">
      <section className="pt-20 pb-10 bg-white border-b border-gray-100">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-violet-600 mb-8 transition">
            ← VelloEarn
          </Link>
          <div className="inline-flex items-center gap-2 bg-violet-50 text-violet-600 text-xs font-semibold px-3 py-1 rounded-full mb-4">
            Pro Tips
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
            How Top Earners Make More from AI Work
          </h1>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 prose prose-gray max-w-none">
          <div className="space-y-8">
            {[
              {
                heading: "Daily Routine of High Earners",
                body: "Successful members work 2–4 focused hours daily during peak task availability (mornings and evenings).",
              },
              {
                heading: "Build a Team for Passive Income",
                body: "Once you’re consistent, start referring others. Combine your direct earnings with team commissions.",
              },
              {
                heading: "Payment Strategy",
                body: "Withdraw via M-Pesa or Mobile Money as soon as you hit the minimum to stay motivated.",
              },
            ].map((section) => (
              <div key={section.heading} className="bg-white rounded-2xl p-6 border border-gray-100">
                <h2 className="text-lg font-bold text-gray-900 mb-3">{section.heading}</h2>
                <p className="text-gray-500 text-sm leading-relaxed">{section.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 bg-rose-50 rounded-2xl p-6 border border-rose-100 text-center">
            <p className="text-rose-700 font-semibold mb-1">Ready to scale your AI income?</p>
            <Link
              href={`https://wa.me/${whatsappNumber}?text=Hi%20VelloEarn%2C%20I%20want%20to%20start%20AI%20tasks.`}
              className="inline-block bg-violet-600 hover:bg-violet-700 text-white font-bold px-6 py-3 rounded-full text-sm transition-all hover:scale-105"
            >
              Join as an AI Earner
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}