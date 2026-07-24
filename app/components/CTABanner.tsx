"use client";

export default function CTABanner() {
  const handleStartChat = () => {
    // Direct link to chat platform - no modal
    window.location.href = "https://starhela.com/register?ref=velloearn";
  };

  return (
    <section className="py-20 bg-gradient-to-br from-rose-500 to-pink-600 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        <div className="text-5xl mb-5">💬</div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
          Start chatting with foreigners — earn M-Pesa today.
        </h2>
        <p className="text-rose-100 text-lg mb-10 leading-relaxed max-w-xl mx-auto">
          Sign up takes 2 minutes. No fees, no experience needed. 
          You could be chatting — and earning — before the end of today.
        </p>
        <button
          onClick={handleStartChat}
          className="bg-white hover:bg-rose-50 text-rose-500 font-bold text-base px-10 py-4 rounded-full shadow-xl transition-all hover:scale-105 active:scale-95"
        >
          Start Chatting Now — Free →
        </button>
        <p className="text-rose-200 text-xs mt-5">
          No registration fees · Instant M-Pesa payouts · 50,000+ active chatters
        </p>
      </div>
    </section>
  );
}