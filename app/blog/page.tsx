import { whatsappNumber } from "@/lib/constants";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog | VelloEarn - Remote AI Earning Guides",
  description: "Practical guides on AI training data work, remote earning strategies, M-Pesa payments, team building, and maximizing income in Kenya, Uganda & Ghana.",
  keywords: ["VelloEarn blog", "AI data annotation guide Kenya", "remote earning tips Africa", "M-Pesa payouts"],
};

export default function BlogPage() {
  const blogPosts = [
    {
      title: "How to Start AI Training Data Work",
      description: "Step-by-step beginner’s guide to AI data annotation, RLHF, and text evaluation jobs. Start earning via M-Pesa and Mobile Money with just a phone.",
      slug: "/blog/how-to-start-ai-training",
      category: "AI Training",
      readTime: "8 min",
    },
    {
      title: "AI Data Annotation Jobs in Kenya, Uganda & Ghana",
      description: "Complete guide to AI data labeling and annotation opportunities. Who can join, how much you can earn, and how to begin.",
      slug: "/blog/ai-data-annotation-jobs",
      category: "AI Training",
      readTime: "6 min",
    },
    {
      title: "What is RLHF? How to Earn from AI Reinforcement Learning Tasks",
      description: "Learn about one of the highest-paying AI tasks and how to start doing RLHF work from home.",
      slug: "/blog/rlhf-tasks",
      category: "AI Training",
      readTime: "5 min",
    },
    {
      title: "Tools & Requirements for AI Training Data Jobs",
      description: "Smartphone vs laptop, internet speed, English level, and everything you need to succeed in AI tasks.",
      slug: "/blog/ai-tools-requirements",
      category: "Getting Started",
      readTime: "7 min",
    },
    {
      title: "How to Maximize Earnings from AI Tasks",
      description: "Pro tips from top earners on how to earn more doing data annotation, RLHF, and text evaluation.",
      slug: "/blog/maximize-ai-earnings",
      category: "Growth Tips",
      readTime: "6 min",
    },
    {
      title: "How to Scale Your Earning Team",
      description: "How to build and grow a team on VelloEarn to earn passive commissions while others work.",
      slug: "/blog/scale-your-team",
      category: "Strategy",
      readTime: "7 min",
    },
    {
      title: "How M-Pesa Payments Work for Remote Workers",
      description: "Clear explanation of how instant M-Pesa, MTN MoMo, and Telecel payouts work on VelloEarn.",
      slug: "/blog/mpesa-payments",
      category: "Payments",
      readTime: "5 min",
    },
  ];

  return (
    <main className="bg-gray-50 min-h-screen pb-16">
      <section className="pt-20 pb-12 bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-violet-50 text-violet-600 text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
            Knowledge Base
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
            VelloEarn Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-xl mx-auto">
            Practical guides to help you succeed in remote AI training data work and digital earning across Africa.
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 pt-12">
        <div className="grid gap-6">
          {blogPosts.map((post, index) => (
            <Link
              key={index}
              href={post.slug}
              className="group bg-white border border-gray-100 hover:border-violet-200 rounded-3xl p-8 transition-all duration-200 hover:shadow-sm flex flex-col"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-medium tracking-widest text-violet-600 bg-violet-50 px-3 py-1 rounded-full">
                  {post.category}
                </span>
                <span className="text-xs text-gray-400">{post.readTime} read</span>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 group-hover:text-violet-700 transition-colors mb-3">
                {post.title}
              </h2>

              <p className="text-gray-600 leading-relaxed flex-1">
                {post.description}
              </p>

              <div className="mt-6 flex items-center text-violet-600 text-sm font-medium group-hover:gap-2 transition-all">
                Read full guide
                <span className="text-base ml-1 transition-transform group-hover:translate-x-0.5">→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 mt-16">
        <div className="bg-gradient-to-br from-violet-600 to-violet-700 rounded-3xl p-10 text-white text-center">
          <h3 className="text-2xl font-bold mb-3">
            Ready to Start Earning from AI Tasks?
          </h3>
          <p className="text-violet-100 mb-8 max-w-md mx-auto">
            Join thousands of Kenyans, Ugandans, and Ghanaians already making daily income through AI training work.
          </p>
          <Link
            href={`https://wa.me/${whatsappNumber}?text=Hi%20VelloEarn%2C%20I%27d%20like%20to%20join%20and%20start%20AI%20training%20work.`}
            className="inline-block bg-white text-violet-700 font-bold px-8 py-4 rounded-2xl hover:bg-gray-100 transition-all hover:scale-105"
          >
            Apply to Join VelloEarn →
          </Link>
        </div>
      </section>
    </main>
  );
}