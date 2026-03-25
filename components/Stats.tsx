import React from "react";

const STATS = [
  { value: "240%", label: "Average ROAS Increase" },
  { value: "500+", label: "Ad Creatives Delivered" },
  { value: "24hrs", label: "Turnaround Time" },
  { value: "50+", label: "D2C Brands Scaled" },
];

export const Stats: React.FC = () => {
  return (
    <section className="py-16 bg-[#111111]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {STATS.map((stat, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center px-4 border-r border-white/10 last:border-0"
            >
              <span className="text-4xl md:text-5xl font-black text-primary mb-2">
                {stat.value}
              </span>
              <span className="text-sm font-bold text-white/60 uppercase tracking-widest">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
