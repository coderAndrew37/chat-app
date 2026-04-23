import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Scale Your Remote Earning Team | Chat254 Kenya",
  description:
    "A practical guide to building a team of earners under you on Chat254. How multi-level commissions work, how to recruit, and what serious earners do differently.",
  keywords: ["remote team building Kenya", "multi-level earning Kenya", "scale online income Kenya", "referral team earnings"],
};

export default function ScaleYourTeamPage() {
  return (
    <main className="bg-gray-50 min-h-screen">
      <section className="pt-20 pb-10 bg-white border-b border-gray-100">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-rose-500 mb-8 transition">
            ← Chat254
          </Link>
          <div className="inline-flex items-center gap-2 bg-rose-50 text-rose-600 text-xs font-semibold px-3 py-1 rounded-full mb-4">
            Strategy guide
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
            How to Scale Your Earning Team
          </h1>
          <p className="text-gray-500 text-base leading-relaxed">
            Most Chat254 earners start solo. The ones making serious money have built teams. Here&apos;s how that works and how you can do the same.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="space-y-8">
            {[
              {
                heading: "What is a team commission model?",
                body: "When you bring someone onto Chat254 and they become active, you earn a commission on their activity — not instead of them, but in addition to your own earnings. The platform pays you for building productive capacity. It's a multi-level structure that rewards both direct work and network building.",
              },
              {
                heading: "How do I bring people in?",
                body: "Share your experience and results. Real stories — what you earned this week, what you used the money for — convert better than any script. WhatsApp Status is the most effective channel for most team builders. Post consistently, let results speak, follow up with people who reach out.",
              },
              {
                heading: "What makes a good team member?",
                body: "Consistency beats skill. Someone who shows up daily for 2 hours earns more than someone who works 8 hours once a week. When recruiting, look for people who need income, have a smartphone, and take instructions seriously. Don&apos;t oversell the opportunity — people who join with realistic expectations stay active longer.",
              },
              {
                heading: "How much can you earn from team activity?",
                body: "This scales non-linearly. A team of 5 consistent earners generates more passive commission than most solo earners make in direct tasks. The serious earners on our platform — those clearing KES 20,000+ monthly — almost all have an active team of 10 or more members.",
              },
              {
                heading: "The right way to grow",
                body: "Don't recruit everyone. Bring in people you can actually support and onboard. A small, active team beats a large, inactive one every time. When your team members earn well, they stay, refer others, and your commission compounds. Play the long game.",
              },
            ].map((section) => (
              <div key={section.heading} className="bg-white rounded-2xl p-6 border border-gray-100">
                <h2 className="text-lg font-bold text-gray-900 mb-3">{section.heading}</h2>
                <p className="text-gray-500 text-sm leading-relaxed">{section.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 bg-rose-50 rounded-2xl p-6 border border-rose-100 text-center">
            <p className="text-rose-700 font-semibold mb-1">Start before you scale</p>
            <p className="text-rose-500 text-sm mb-4">Apply to join the team first. Build your own earnings, then build your network.</p>
            <Link
              href="/"
              className="inline-block bg-rose-500 hover:bg-rose-600 text-white font-bold px-6 py-3 rounded-full text-sm transition-all hover:scale-105"
            >
              Apply to join Chat254
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}