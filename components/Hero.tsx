import React, { useEffect, useState, useRef } from "react";
import { Button } from "./Button";
import { Play } from "lucide-react";

export const Hero: React.FC = () => {
  // Use Cloudinary video directly
  const videoUrl ="/videos/herosectionvid.mp4 ";
    //  "https://res.cloudinary.com/dnltq0vcx/video/upload/v1771049855/ugcshortsmediademo_ijypaa.mp4";
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(() => {
            setShouldLoadVideo(true);
          }, 1500);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-white flex flex-col justify-center items-center py-20 lg:py-0">
      <div className="absolute top-20 left-10 w-40 h-40 bg-gray-50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1">
          <div className="mb-8 inline-flex items-center group cursor-default">
            <span className="relative flex h-4 w-4 mr-2"></span>
          </div>

          <div className="relative mb-6">
            <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-extrabold tracking-tight text-[#111111] leading-[1.1] drop-shadow-sm">
              AI Creatives <br />
              <span className="relative inline-block mt-2">
                for D2C Growth
                <svg
                  className="absolute -bottom-3 -left-20 w-full h-4 text-yellow-400 z-[-1]"
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
              </span>
            </h1>
          </div>

          <p className="text-xl text-subtext mb-10 max-w-lg leading-relaxed font-medium">
            High-impact AI UGC & CGI ad videos designed to boost conversions and
            ROAS. Stop guessing, start scaling with data-driven creatives.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto">
            <Button
              size="lg"
              onClick={() => scrollToSection("contact")}
              className="shadow-xl hover:-translate-y-1 transition-transform w-full sm:w-auto"
            >
              Book Strategy Call
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto hover:-translate-y-1 transition-transform border-gray-200"
              onClick={() =>
                window.open("https://www.instagram.com/ugc_shorts/", "_blank")
              }
            >
              <Play size={20} className="mr-2 fill-current" />
              View Portfolio
            </Button>
          </div>
        </div>

        <div
          ref={containerRef}
          className="lg:col-span-6 relative flex justify-center items-center order-1 lg:order-2 min-h-[500px]"
        >
          <div className="absolute inset-0 bg-primary/20 animate-wave-slower z-0 transform scale-105"></div>
          <div className="absolute inset-4 bg-primary animate-wave-slow z-0"></div>

          <div className="relative z-10 w-[95%] h-[95%] overflow-hidden animate-wave-slow bg-black shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 z-20 pointer-events-none"></div>

            {shouldLoadVideo && videoUrl ? (
              <video
                key={videoUrl}
                className="w-full h-full object-cover scale-110 animate-fade-in"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
              >
                <source src={videoUrl} type="video/mp4" />
              </video>
            ) : (
              <div className="w-full h-full bg-black flex items-center justify-center">
                <div className="animate-pulse text-white">Loading video...</div>
              </div>
            )}
          </div>

          {/* <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-2xl shadow-xl z-20 hidden md:block animate-bounce-slight">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="font-bold text-[#111111]">ROAS +240%</span>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};
