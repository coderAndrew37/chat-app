const FEATURES = [
  {
    title: "Real tasks, real payouts",
    body: "You're evaluating actual hotels — not clicking ads or filling spam forms. Every approved review pays out to M-Pesa.",
  },
  {
    title: "Clear pay per task",
    body: "Every listing shows the exact payout, what's required (photo, text, video), and how long it should take. No surprises.",
  },
  {
    title: "Instant M-Pesa, no minimums",
    body: "Direct B2C integration. Whatever you've earned, withdraw it whenever you want. No waiting periods, no bank accounts.",
  },
  {
    title: "Built for consistency",
    body: "New hotel tasks are added daily. The reviewers who show up regularly build a steady income, not a one-off payout.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 max-w-2xl">
          <p className="text-rose-500 font-semibold text-xs uppercase tracking-wider mb-2">
            Why review with us
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Straightforward work, straightforward pay
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-px bg-gray-200 border border-gray-200 rounded-xl overflow-hidden">
          {FEATURES.map((f) => (
            <div key={f.title} className="bg-white p-6 sm:p-8">
              <h3 className="text-base font-bold text-gray-900 mb-2">{f.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}