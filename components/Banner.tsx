import React from "react";
interface SubpageBannerProps {
  title: string;
  subtitle?: string;
}

export const Banner: React.FC<SubpageBannerProps> = ({ title, subtitle }) => {
  return (
    <section className="pt-28 md:pt-36 pb-10 md:pb-12 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="relative">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-[#111111] mb-6 relative z-10">
            {title}
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
          <p className="text-xl text-subtext max-w-3xl font-medium">
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  );
};
