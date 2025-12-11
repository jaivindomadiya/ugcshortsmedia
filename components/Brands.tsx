import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

export const Brands: React.FC = () => {
  const [brands, setBrands] = useState<string[]>([]);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const { data, error } = await supabase
          .from('brands')
          .select('name')
          .order('id', { ascending: true });
          
        if (!error && data && data.length > 0) {
          // 'name' field holds the URL for the logo
          setBrands(data.map((b: any) => b.name));
        }
      } catch (e) {
        console.warn('Error fetching brands', e);
      }
    };
    fetchBrands();
  }, []);

  if (brands.length === 0) return null;

  // Ensure we have enough items to fill the screen width comfortably
  // For a seamless marquee with translateX(-50%), we need two identical halves.
  // The first half must be wider than the viewport.
  // Assuming average logo width + padding is ~150px.
  // 150px * 15 items = 2250px (wider than 1920px).
  // We repeat the brands list until we reach at least 15 items in the base set.
  let baseList = [...brands];
  while (baseList.length < 15) {
    baseList = [...baseList, ...brands];
  }

  // Double the list for the seamless loop (animation moves from 0% to -50%)
  const marqueeLogos = [...baseList, ...baseList];

  return (
    <section className="py-16 bg-white border-t border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-12">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-[#111111] mb-4">
            Brands We Help Grow Faster
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full"></div>
        </div>
      </div>
      
      {/* Marquee Container */}
      <div className="relative w-full overflow-hidden group">
        {/* Gradient Masks */}
        <div className="absolute top-0 left-0 w-24 md:w-48 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-24 md:w-48 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

        <div className="flex animate-marquee group-hover:[animation-play-state:paused] whitespace-nowrap items-center">
          {marqueeLogos.map((logoUrl, idx) => (
            <div 
              key={`${idx}-${logoUrl}`} 
              className="inline-block px-8 md:px-12 py-4"
            >
              <img 
                src={logoUrl} 
                alt="Brand Partner" 
                className="h-10 md:h-20 w-auto max-w-[260px] object-contain cursor-pointer select-none"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};