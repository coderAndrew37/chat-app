import { whatsappNumber } from "@/lib/constants";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Start AI Training Data Work in Kenya, Uganda & Ghana | VelloEarn",
  description: "Step-by-step beginner's guide: How to start AI data annotation, RLHF, and text evaluation jobs from home. Earn via M-Pesa, MTN MoMo & Telecel with just a phone.",
  keywords: [
    "how to start AI data annotation jobs Kenya",
    "AI training data work Uganda",
    "RLHF jobs Ghana for beginners",
    "start AI annotation M-Pesa",
    "remote AI tasks East Africa",
    "data labeling jobs Kenya no experience"
  ],
};

export default function HowToStartAiTrainingPage() {
  return (
    <main className="bg-gray-50 min-h-screen">
      <section className="pt-20 pb-10 bg-white border-b border-gray-100">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-violet-600 mb-8 transition">
            ← VelloEarn
          </Link>
          <div className="inline-flex items-center gap-2 bg-violet-50 text-violet-600 text-xs font-semibold px-3 py-1 rounded-full mb-4">
            Beginner’s Guide
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
            How to Start AI Training Data Work
          </h1>
          <p className="text-gray-500 text-base leading-relaxed">
            A complete step-by-step guide for Kenyans, Ugandans, and Ghanaians who want to start earning from AI data annotation, RLHF, and text evaluation tasks.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 prose prose-gray max-w-none">
          <div className="space-y-10">
            {[
              {
                heading: "What is AI Training Data Work?",
                body: "AI companies (including big ones like OpenAI, Google, and Meta) need real humans to train their models. You will do tasks like data annotation (labeling images/text), RLHF (rating AI responses), and text evaluation. These are remote micro-tasks you can do from anywhere in Kenya, Uganda, or Ghana using just your phone.",
              },
              {
                heading: "Who Can Join? (Requirements)",
                body: "• Good command of English (reading & writing)<br>• Smartphone with internet (Android preferred)<br>• Be 18+ years old<br>• Consistent and honest worker<br><br>No degree, no laptop, and no experience needed. Many secondary school leavers, university students, and housewives are already earning daily on VelloEarn.",
              },
              {
                heading: "Step 1: Sign Up on VelloEarn",
                body: "Click the button below and message us on WhatsApp. Our team will send you the registration link. The process takes less than 5 minutes. Make sure you use your active M-Pesa / MTN MoMo number during signup.",
              },
              {
                heading: "Step 2: Complete Free Training",
                body: "After registration, you get access to short training modules (5–15 minutes each). You’ll learn how to do annotation, how to rate responses for RLHF, and quality standards. Most people finish training in under 1 hour.",
              },
              {
                heading: "Step 3: Pass the Qualification Test",
                body: "A simple test to confirm you understand the guidelines. Don’t worry — it’s not hard if you paid attention during training. Once you pass, you unlock real paying tasks.",
              },
              {
                heading: "Step 4: Start Working & Earning",
                body: "Tasks appear in your dashboard. You can work anytime — mornings, evenings, or weekends. Common tasks include image labeling, text classification, and chatbot response evaluation. Top beginners earn KES 800 – 2,500 per day.",
              },
              {
                heading: "How You Get Paid (M-Pesa, MTN MoMo, Telecel)",
                body: "Withdraw directly to M-Pesa (Kenya), MTN MoMo (Uganda), or Telecel/Mobile Money (Ghana). Most payouts are processed instantly or within minutes. Minimum withdrawal is low so you can cash out even small earnings.",
              },
              {
                heading: "How Much Can Beginners Realistically Earn?",
                body: "• First week: KES 4,000 – 12,000<br>• After 30 days: KES 25,000 – 60,000+ (with consistency)<br><br>The more focused hours you put in, the faster you grow. RLHF tasks usually pay better than basic annotation.",
              },
            ].map((section, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-4">{section.heading}</h2>
                <p 
                  className="text-gray-600 text-[15px] leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: section.body }}
                />
              </div>
            ))}
          </div>

          {/* Interlinking */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link 
              href="/blog/ai-data-annotation-jobs"
              className="block p-6 bg-white border border-gray-100 rounded-2xl hover:border-violet-200 transition group"
            >
              <div className="text-violet-600 text-sm font-medium mb-1">Next →</div>
              <div className="font-semibold group-hover:text-violet-700">AI Data Annotation Jobs Explained</div>
            </Link>
            
            <Link 
              href="/blog/rlhf-tasks"
              className="block p-6 bg-white border border-gray-100 rounded-2xl hover:border-violet-200 transition group"
            >
              <div className="text-violet-600 text-sm font-medium mb-1">Next →</div>
              <div className="font-semibold group-hover:text-violet-700">What is RLHF & How Much Does It Pay?</div>
            </Link>
          </div>

          <div className="mt-12 bg-gradient-to-br from-violet-50 to-emerald-50 border border-violet-100 rounded-3xl p-8 text-center">
            <p className="text-violet-700 font-semibold mb-2">Ready to begin your AI earning journey?</p>
            <p className="text-gray-600 mb-6">Join thousands of Africans already earning daily from AI training tasks.</p>
            
            <Link
              href={`https://wa.me/${whatsappNumber}?text=Hi%20VelloEarn%2C%20I%20want%20to%20start%20AI%20training%20data%20work.%20Please%20send%20me%20the%20registration%20link.`}
              className="inline-block bg-violet-600 hover:bg-violet-700 text-white font-bold px-8 py-4 rounded-2xl text-base transition-all hover:scale-105 shadow-lg shadow-violet-200"
            >
              Start AI Training Today → 
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}