import React from 'react';
import { SERVICES } from '../constants';

export const Services: React.FC = () => {
  return (
    <section id="services" className="py-32 bg-white relative">
        
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mb-20">
          <div className="inline-block relative">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-[#111111] mb-6 relative z-10">
              What We Do
            </h2>
            {/* Hand drawn underline */}
            <svg className="absolute -bottom-2 left-0 w-2/3 h-4 text-primary z-[-1]" viewBox="0 0 200 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.00025 2.5C45.394 6.27375 107.5 9.00001 198 2.5" stroke="currentColor" strokeWidth="6" strokeLinecap="round"/>
            </svg>
          </div>
          <p className="text-xl text-subtext font-medium mt-4 leading-relaxed max-w-2xl">
            A comprehensive suite of AI-powered creative services designed specifically for high-growth performance marketing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, idx) => (
            <div 
              key={service.id}
              className="group p-10 rounded-[2.5rem] bg-secondary border-2 border-transparent hover:border-[#111111] hover:bg-white transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="w-16 h-16 rounded-2xl bg-white text-[#111111] flex items-center justify-center mb-8 group-hover:bg-primary transition-colors duration-300 shadow-sm border border-gray-100">
                <service.icon size={32} strokeWidth={2} />
              </div>
              <h3 className="text-2xl font-bold text-[#111111] mb-4 group-hover:translate-x-1 transition-transform">
                {service.title}
              </h3>
              <p className="text-subtext leading-relaxed text-lg font-medium">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};