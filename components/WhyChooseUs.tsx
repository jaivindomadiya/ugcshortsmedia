import React from 'react';
import { BENEFITS } from '../constants';

export const WhyChooseUs: React.FC = () => {
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-12 md:gap-20 items-start">
          
          <div className="md:w-1/3 sticky top-32">
             <div className="inline-block relative mb-6 md:mb-8">
                <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-[#111111] leading-[1.1] font-heading">
                  Why Brands <br/>
                  <span className="relative z-10">Choose Us
                     <div className="absolute bottom-2 left-0 w-full h-5 bg-primary -z-10 -rotate-1 opacity-60 rounded-sm"></div>
                  </span>
                </h2>
             </div>
             <p className="text-xl text-subtext font-medium mb-8 md:mb-10 font-body leading-relaxed">
                We combine human creativity with AI speed to deliver results that outperform traditional agencies.
             </p>
             <div className="w-16 h-2 bg-[#111111] rounded-full"></div>
          </div>

          <div className="md:w-2/3 grid grid-cols-1 gap-4 md:gap-6">
            {BENEFITS.map((benefit) => (
              <div key={benefit.id} className="bg-secondary p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] hover:bg-primary transition-colors duration-300 group flex items-start space-x-4 md:space-x-6">
                <div className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 bg-white rounded-full text-[#111111] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 border-2 border-[#111111]">
                  <benefit.icon className="w-6 h-6 md:w-7 md:h-7" strokeWidth={2.5} />
                </div>
                <div>
                    <h3 className="text-xl md:text-2xl font-bold text-[#111111] mb-2 font-heading">{benefit.title}</h3>
                    <p className="text-subtext group-hover:text-[#111111]/90 font-medium leading-relaxed font-body text-base md:text-lg">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};