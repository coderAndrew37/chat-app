interface Step {
  icon: string;
  title: string;
  description: string;
}

interface StepsToEarnProps {
  steps: Step[];
}

export function StepsToEarn({ steps }: StepsToEarnProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
        How to Start Earning Today
      </h2>
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => (
          <div
            key={index}
            className="relative rounded-xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-2xl dark:bg-emerald-900/40">
              {step.icon}
            </div>
            <h3 className="mt-3 font-semibold text-slate-900 dark:text-white">
              {index + 1}. {step.title}
            </h3>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}