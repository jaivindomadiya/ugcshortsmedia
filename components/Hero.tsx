import React, { useEffect, useState, useRef } from 'react';
import { Button } from './Button';
import { Play } from 'lucide-react';
import { supabase } from '../supabaseClient';

type HeroSetting = {
  video_url: string | null;
  poster_url?: string | null; // optional
};

export const Hero: React.FC = () => {
  // Initial state is empty string to ensure no fallback is used if no data
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [posterUrl, setPosterUrl] = useState<string | undefined>(undefined);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const fetchHeroVideo = async () => {
    try {
      console.log('Fetching hero video from Supabase...');

      // Query: SELECT video_url, poster_url FROM hero_settings WHERE is_active = true LIMIT 1
      const { data, error } = await supabase
        .from('hero_settings')
        .select('video_url, poster_url')
        .eq('is_active', true)
        .limit(1)
        .single();

      if (error) {
        console.warn('Error fetching hero video from Supabase:', error.message);
        return;
      }

      if (data) {
        console.log('Hero video fetched:', data);
        const heroData = data as unknown as HeroSetting;

        // Use DB video if valid
        if (heroData.video_url && heroData.video_url.trim() !== '') {
          setVideoUrl(heroData.video_url);
        }

        // Poster is optional
        if (heroData.poster_url && heroData.poster_url.trim() !== '') {
          setPosterUrl(heroData.poster_url);
        } else {
          setPosterUrl(undefined);
        }
      }
    } catch (error) {
      console.warn('Unexpected error fetching hero video:', error);
    }
  };

  useEffect(() => {
    // 1️⃣ Initial load
    fetchHeroVideo();

    // 2️⃣ Live update when CRUD happens in hero_settings
    const channel = supabase
      .channel('hero_settings-updates')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'hero_settings' },
        () => {
          console.log('Hero video updated!');
          fetchHeroVideo();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // Trigger video load only after it comes into view
          // And add a small delay to ensure the poster (LCP) paints first
          setTimeout(() => {
            setShouldLoadVideo(true);
          }, 1500); // 1.5s delay to prioritize other assets
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-white flex flex-col justify-center items-center py-20 lg:py-0">
      
      {/* Decorative elements (unchanged) */}
      <div className="absolute top-20 left-10 w-40 h-40 bg-gray-50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

        {/* Left Side Content (unchanged) */}
        <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center group cursor-default">
            <span className="relative flex h-4 w-4 mr-2">
            
            </span>
           
          </div>

          {/* Headline */}
          <div className="relative mb-6">
            <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-extrabold tracking-tight text-[#111111] leading-[1.1] drop-shadow-sm">
              AI Creatives <br/>
              <span className="relative inline-block mt-2">
                for D2C Growth
                {/* Hand Drawn Underline */}
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

          {/* Subtitle */}
          <p className="text-xl text-subtext mb-10 max-w-lg leading-relaxed font-medium">
            High-impact AI UGC & CGI ad videos designed to boost conversions and ROAS. Stop guessing, start scaling with data-driven creatives.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto">
            <Button 
              size="lg" 
              onClick={() => scrollToSection('contact')}
              className="shadow-xl hover:-translate-y-1 transition-transform w-full sm:w-auto"
            >
              Book Strategy Call
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="w-full sm:w-auto hover:-translate-y-1 transition-transform border-gray-200"
              onClick={() => window.open('https://www.instagram.com/ugc_shorts/', '_blank')}
            >
              <Play size={20} className="mr-2 fill-current" />
              View Portfolio
            </Button>
          </div>
        </div>

        {/* Right Side - Hero Video */}
        <div 
          ref={containerRef}
          className="lg:col-span-6 relative flex justify-center items-center order-1 lg:order-2 min-h-[500px]"
        >
          {/* Wave background */}
          <div className="absolute inset-0 bg-primary/20 animate-wave-slower z-0 transform scale-105"></div>
          <div className="absolute inset-4 bg-primary animate-wave-slow z-0"></div>

          {/* Video container */}
          <div className="relative z-10 w-[95%] h-[95%] overflow-hidden animate-wave-slow bg-black shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 z-20 pointer-events-none"></div>

            {/* 1. Poster Image (Optimized LCP) */}
            {posterUrl && (
              <img 
                src={posterUrl} 
                alt="Hero Video Poster"
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${shouldLoadVideo ? 'opacity-0' : 'opacity-100'}`}
                loading="eager" // Prioritize this image
                fetchPriority="high"
              />
            )}

            {/* 2. Video (Lazy Loaded) */}
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
            ) : null}
            
            {/* Fallback empty state if neither poster nor video */}
            {!posterUrl && !videoUrl && <div className="w-full h-full bg-black"></div>}
          </div>
          
           {/* Floating Accent */}
           <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-2xl shadow-xl z-20 hidden md:block animate-bounce-slight">
              <div className="flex items-center space-x-3">
                 <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                 <span className="font-bold text-[#111111]">ROAS +240%</span>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};