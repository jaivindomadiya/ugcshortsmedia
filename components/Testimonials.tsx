import React, { useEffect, useState } from 'react';
import { TESTIMONIALS } from '../constants';
import { Testimonial } from '../types';
import { Star } from 'lucide-react';
import { supabase } from '../supabaseClient';

export const Testimonials: React.FC = () => {
  const [data, setData] = useState<Testimonial[]>(TESTIMONIALS);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const { data: result, error } = await supabase
          .from('testimonials')
          .select('*')
          .order('id', { ascending: true });
        
        if (error) {
          console.warn('Error fetching testimonials from Supabase:', error);
          return;
        }
        
        if (result && result.length > 0) {
          const mappedTestimonials: Testimonial[] = result.map((item: any) => ({
            id: String(item.id),
            name: item.name,
            brand: item.brand,
            quote: item.quote,
            rating: item.rating
          }));
          setData(mappedTestimonials);
        }
      } catch (e) {
        console.warn('Using default testimonials due to exception', e);
      }
    };
    fetchTestimonials();
  }, []);

  // Create a sufficiently long list for infinite scrolling loop
  // Duplicating the set multiple times ensures we cover wide screens before the loop resets
  const baseSet = [...data, ...data, ...data]; // 3x repeats
  const marqueeTestimonials = [...baseSet, ...baseSet]; // 6x repeats total (2 halves)

  return (
    <section id="testimonials" className="py-32 bg-secondary overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-[#111111] mb-6">
            Client's Love
          </h2>
          <p className="text-xl text-subtext font-medium">
            Join the D2C brands that are scaling faster with our creative intelligence.
          </p>
        </div>
      </div>

      {/* Marquee Container */}
      <div className="relative w-full group">
        {/* Gradient Masks for smooth fade in/out */}
        <div className="absolute top-0 left-0 w-20 md:w-60 h-full bg-gradient-to-r from-secondary to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-20 md:w-60 h-full bg-gradient-to-l from-secondary to-transparent z-10 pointer-events-none"></div>

        {/* Scrolling Track */}
        <div className="flex animate-[marquee_60s_linear_infinite] group-hover:[animation-play-state:paused] w-max">
          {marqueeTestimonials.map((testimonial, index) => (
            <div 
              key={`${testimonial.id}-${index}`}
              className="w-[350px] md:w-[450px] mx-5 flex-shrink-0 bg-white p-10 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between border-2 border-transparent hover:border-[#111111] hover:-translate-y-1 whitespace-normal"
            >
              <div>
                <div className="flex space-x-1 mb-8">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={20} 
                      fill={i < testimonial.rating ? "#FFCC00" : "transparent"}
                      className={i < testimonial.rating ? "text-primary" : "text-gray-200"}
                      strokeWidth={i < testimonial.rating ? 0 : 2}
                    />
                  ))}
                </div>
                <blockquote className="text-[#111111] text-xl font-semibold leading-relaxed mb-8">
                  "{testimonial.quote}"
                </blockquote>
              </div>
              
              <div className="flex items-center pt-6 border-t border-gray-50">
                <div className="w-12 h-12 rounded-full bg-[#111111] flex items-center justify-center text-primary font-bold text-xl mr-4 shadow-md flex-shrink-0">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-[#111111] text-lg">{testimonial.name}</div>
                  <div className="text-sm text-subtext font-semibold uppercase tracking-wide">{testimonial.brand}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};