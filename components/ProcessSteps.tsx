import React from "react";
import { ClipboardList, Clapperboard, Rocket } from "lucide-react";

const STEPS = [
  {
    number: "01",
    icon: ClipboardList,
    title: "Strategy & Brief",
    description:
      "We start with a free strategy call to understand your brand, audience, and goals. Our team builds a custom creative brief tailored to your product.",
  },
  {
    number: "02",
    icon: Clapperboard,
    title: "AI Production",
    description:
      "Our AI engine produces high-converting UGC videos, CGI product ads, and creatives within 24 hours — no shoots, no delays, no guesswork.",
  },
  {
    number: "03",
    icon: Rocket,
    title: "Launch & Scale",
    description:
      "We deploy your creatives across Meta, Google, and other platforms, continuously testing and optimizing to maximize your ROAS.",
  },
];

export const ProcessSteps: React.FC = () => {
  return (
    <section className="pt-16 md:pt-20 pb-24 md:pb-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl mb-16 md:mb-20">
          <div className="inline-block relative">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-[#111111] mb-6 relative z-10">
              How It Works
              <svg
                className="absolute -bottom-2 left-0 w-32 h-3 text-primary z-[-1]"
                viewBox="0 0 200 9"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.00026 6.99997C58.4239 1.94426 137.89 -2.57147 197.997 3.52841"
                  stroke="currentColor"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
              </svg>
            </h2>
            <svg
              className="absolute -bottom-2 left-0 w-2/3 h-4 text-primary z-[-1]"
              viewBox="0 0 200 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.00025 2.5C45.394 6.27375 107.5 9.00001 198 2.5"
                stroke="currentColor"
                strokeWidth="6"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <p className="text-xl text-subtext font-medium mt-4 leading-relaxed max-w-2xl">
            From brief to live ads in 3 simple steps. No complexity, no long
            contracts — just results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 relative">
          {/* Connector line (desktop only) */}
          <div className="hidden md:block absolute top-16 left-[calc(16.66%+2rem)] right-[calc(16.66%+2rem)] h-0.5 bg-gray-200 z-0" />

          {STEPS.map((step) => (
            <div
              key={step.number}
              className="relative bg-secondary rounded-[2.5rem] p-10 border-2 border-transparent hover:border-[#111111] hover:bg-white hover:-translate-y-2 hover:shadow-xl transition-all duration-300 group z-10"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-2xl bg-white text-[#111111] flex items-center justify-center group-hover:bg-primary transition-colors duration-300 shadow-sm border border-gray-100 flex-shrink-0">
                  <step.icon size={28} strokeWidth={2} />
                </div>
                <span className="text-5xl font-black text-primary group-hover:text-primary transition-colors leading-none">
                  {step.number}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-[#111111] mb-4">
                {step.title}
              </h3>
              <p className="text-subtext leading-relaxed text-lg font-medium">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
