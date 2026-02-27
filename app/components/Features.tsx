import { FEATURES } from "@/data";
import type { Feature } from "@/types";

function FeatureCard({ feature }: { feature: Feature }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-rose-100 transition-all">
      <div className="text-4xl mb-4">{feature.icon}</div>
      <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">
        {feature.description}
      </p>
    </div>
  );
}

export default function Features() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-14">
          <span className="text-rose-500 font-semibold text-sm uppercase tracking-wider">
            Why Us
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2">
            Why Everyone Loves Chat254
          </h2>
        </div>

        {/* Feature cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((feature) => (
            <FeatureCard key={feature.title} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
