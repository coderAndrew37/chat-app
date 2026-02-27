"use client";

interface CTABannerProps {
  onRegisterClick: () => void;
  onLoginClick: () => void;
}

export default function CTABanner({
  onRegisterClick,
  onLoginClick,
}: CTABannerProps) {
  return (
    <section className="py-20 bg-gradient-to-br from-rose-500 to-pink-600 relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
          Ready to Find Your Match?
        </h2>
        <p className="text-rose-100 text-lg mb-10 leading-relaxed">
          Join thousands of singles already connecting on Chat254. Your perfect
          match is waiting.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onRegisterClick}
            className="bg-white hover:bg-rose-50 text-rose-500 font-bold text-base px-8 py-4 rounded-full shadow-lg transition-all hover:scale-105 active:scale-95"
          >
            Create Free Account
          </button>
          <button
            onClick={onLoginClick}
            className="bg-white/10 hover:bg-white/20 text-white border border-white/30 font-semibold text-base px-8 py-4 rounded-full transition-all hover:scale-105 active:scale-95"
          >
            Sign In
          </button>
        </div>
      </div>
    </section>
  );
}
