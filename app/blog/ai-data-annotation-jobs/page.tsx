import { whatsappNumber } from "@/lib/constants";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI Data Annotation Jobs in Kenya, Uganda & Ghana | VelloEarn",
  description: "Complete beginner's guide to AI data annotation jobs. How to start, what tasks pay best, and how to earn daily via M-Pesa and Mobile Money.",
  keywords: ["AI data annotation jobs Kenya", "data labeling Uganda", "AI annotation Ghana", "remote AI tasks Africa"],
};

export default function AiDataAnnotationPage() {
  return (
    <main className="bg-gray-50 min-h-screen">
      <section className="pt-20 pb-10 bg-white border-b border-gray-100">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-violet-600 mb-8 transition">
            ← VelloEarn
          </Link>
          <div className="inline-flex items-center gap-2 bg-violet-50 text-violet-600 text-xs font-semibold px-3 py-1 rounded-full mb-4">
            AI Guide
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
            How to Start AI Data Annotation Jobs
          </h1>
          <p className="text-gray-500 text-base leading-relaxed">
            The fastest growing remote earning opportunity in East and West Africa right now. No degree needed.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 prose prose-gray max-w-none">
          <div className="space-y-8">
            {[
              {
                heading: "What is AI Data Annotation?",
                body: "AI companies need humans to label, tag, and evaluate data so their models can learn. Tasks include highlighting objects in images, rating chatbot responses, or classifying text. VelloEarn connects you directly to these global AI projects.",
              },
              {
                heading: "Who Can Do This Work?",
                body: "Anyone with a smartphone or basic laptop, good English, and consistency. Secondary school leavers, university students, and housewives are already earning on our platform. No prior experience required — we provide training.",
              },
              {
                heading: "How Much Can You Earn?",
                body: "Beginners typically make KES 800–2,500 per day depending on time invested. Top performers in Kenya and Uganda clear over KES 60,000 monthly. Payments are made daily or weekly via M-Pesa and MTN MoMo.",
              },
              {
                heading: "How to Get Started",
                body: "Sign up on VelloEarn, complete the short training modules, pass the qualification test, and start working immediately. Most people earn their first payout within 48 hours.",
              },
            ].map((section) => (
              <div key={section.heading} className="bg-white rounded-2xl p-6 border border-gray-100">
                <h2 className="text-lg font-bold text-gray-900 mb-3">{section.heading}</h2>
                <p className="text-gray-500 text-sm leading-relaxed">{section.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 bg-violet-50 rounded-2xl p-6 border border-violet-100 text-center">
            <p className="text-violet-700 font-semibold mb-3">Ready to start earning from AI?</p>
            <Link
              href={`https://wa.me/${whatsappNumber}?text=Hi%20VelloEarn%2C%20I%27m%20interested%20in%20AI%20data%20annotation%20jobs.`}
              className="inline-block bg-violet-600 hover:bg-violet-700 text-white font-bold px-6 py-3 rounded-full text-sm transition-all hover:scale-105"
            >
              Join VelloEarn Today
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}