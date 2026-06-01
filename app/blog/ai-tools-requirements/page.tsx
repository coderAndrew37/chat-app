import { whatsappNumber } from "@/lib/constants";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Tools & Requirements for AI Training Data Jobs | VelloEarn",
  description: "What you really need to start AI annotation and RLHF work in Kenya, Uganda and Ghana. Phone vs Laptop, internet speed, and skills required.",
  keywords: ["AI jobs requirements Kenya", "tools for data annotation Uganda", "internet for AI tasks Ghana"],
};

export default function AiToolsRequirementsPage() {
  return (
    <main className="bg-gray-50 min-h-screen">
      <section className="pt-20 pb-10 bg-white border-b border-gray-100">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-violet-600 mb-8 transition">
            ← VelloEarn
          </Link>
          <div className="inline-flex items-center gap-2 bg-violet-50 text-violet-600 text-xs font-semibold px-3 py-1 rounded-full mb-4">
            Getting Started
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
            What You Need for AI Training Data Work
          </h1>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 prose prose-gray max-w-none">
          <div className="space-y-8">
            {[
              {
                heading: "Can I Use Just a Smartphone?",
                body: "Yes. Most annotation and text evaluation tasks work perfectly on Android phones. RLHF tasks are also mobile-friendly on VelloEarn.",
              },
              {
                heading: "Internet Requirements",
                body: "Stable 4G connection is enough. You don’t need fiber — many successful earners use Safaricom, MTN, and Airtel bundles.",
              },
              {
                heading: "Skills That Matter Most",
                body: "Good English comprehension, attention to detail, and consistency. We provide free training for everything else.",
              },
            ].map((section) => (
              <div key={section.heading} className="bg-white rounded-2xl p-6 border border-gray-100">
                <h2 className="text-lg font-bold text-gray-900 mb-3">{section.heading}</h2>
                <p className="text-gray-500 text-sm leading-relaxed">{section.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href={`https://wa.me/${whatsappNumber}?text=Hi%20VelloEarn%2C%20I%27m%20interested%20in%20AI%20training%20data%20jobs.`} className="text-red-600 hover:underline">
              Join VelloEarn to Start Earning from AI Training Data Jobs Today
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}