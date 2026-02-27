import { HOW_IT_WORKS_STEPS } from "@/data";
import type { Step } from "@/types";

function StepCard({ step }: { step: Step }) {
  return (
    <div className="flex flex-col items-center text-center">
      {/* Step number circle */}
      <div className="w-16 h-16 rounded-full bg-rose-500 text-white font-extrabold text-xl flex items-center justify-center shadow-lg shadow-rose-200 mb-5">
        {step.number}
      </div>
      {/* Connector line (hidden on last) */}
      <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
      <p className="text-gray-500 leading-relaxed max-w-xs">
        {step.description}
      </p>
    </div>
  );
}

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-rose-500 font-semibold text-sm uppercase tracking-wider">
            Simple Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2 mb-3">
            How It Works
          </h2>
          <p className="text-gray-500">Get started in just 3 simple steps</p>
        </div>

        {/* Steps */}
        <div className="relative grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-8">
          {/* Connector lines on desktop */}
          <div className="hidden sm:block absolute top-8 left-1/3 right-1/3 h-0.5 bg-rose-200" />

          {HOW_IT_WORKS_STEPS.map((step) => (
            <StepCard key={step.number} step={step} />
          ))}
        </div>
      </div>
    </section>
  );
}
