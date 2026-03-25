import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const logos = [
  "aalok hospital.png",
  "chandanmodi.jpeg",
  "ditvicnc.jpg",
  "duskbuty.jpg",
  "FOW.jpeg",
  "gujaratradiation.png",
  "HVT LOGO.png",
  "instant cravinglogo.jpeg",
  "lnt 1st logo.png",
  "motu.jpeg",
  "nidhiauto.jpeg",
  "owsho.jpg",
  "pearl logo 2.png",
  "rswealthamangement.png",
  "safaltogether.png",
  "sertajhair.jpg",
  "SPRO.png",
  "Storyofhampers1.png",
  "woogh.jpg",
];

const marqueeLogos = [...logos, ...logos];

export const ClientLogos: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  return (
    <section className="py-16 bg-white border-t border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-12 text-center">
        <h2 className="text-2xl md:text-3xl font-black tracking-tight text-[#111111] mb-4">
          Brands We've Worked With
        </h2>
        <div className="w-16 h-1 bg-primary mx-auto rounded-full"></div>
      </div>

      <div className="relative w-full group">
        {/* Prev Button */}
        <button
          onClick={() => scrollRef.current?.scrollBy({ left: -220, behavior: "smooth" })}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-[#111111] text-primary rounded-full flex items-center justify-center shadow-lg hover:bg-primary hover:text-[#111111] transition-all duration-200"
        >
          <ChevronLeft size={20} />
        </button>

        <div className="absolute top-0 left-0 w-20 md:w-48 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-20 md:w-48 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

        <div
          ref={scrollRef}
          className="overflow-x-auto scrollbar-none scroll-smooth"
        >
          <div className="flex animate-marquee group-hover:[animation-play-state:paused] whitespace-nowrap items-center">
            {marqueeLogos.map((logo, idx) => (
              <div key={`${idx}-${logo}`} className="inline-flex items-center justify-center px-8 md:px-12 py-4 flex-shrink-0">
                <img
                  src={`/clients-logo/${logo}`}
                  alt={logo.replace(/\.[^.]+$/, "")}
                  className="h-12 md:h-16 w-auto max-w-[160px] object-contain transition-all duration-300 select-none hover:scale-110"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Next Button */}
        <button
          onClick={() => scrollRef.current?.scrollBy({ left: 220, behavior: "smooth" })}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-[#111111] text-primary rounded-full flex items-center justify-center shadow-lg hover:bg-primary hover:text-[#111111] transition-all duration-200"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </section>
  );
};
