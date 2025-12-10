import React, { useRef, useState, useEffect } from 'react';
import { DEMO_VIDEOS } from '../constants';
import { Play, Pause, Volume2, VolumeX, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { DemoVideo } from '../types';
import { supabase } from '../supabaseClient';

// Helper to calculate the circular offset distance
// Returns 0 for center, -1 for immediate left, 1 for immediate right, etc.
const getOffset = (index: number, currentIndex: number, length: number) => {
  let offset = index - currentIndex;
  if (offset > length / 2) offset -= length;
  if (offset < -length / 2) offset += length;
  return offset;
};

// Individual Video Card Component
interface VideoCardProps {
  video: DemoVideo;
  offset: number;
  isMobile: boolean;
  onClick: () => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, offset, isMobile, onClick }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const isActive = offset === 0;

  // Auto-play logic for active center card
  useEffect(() => {
    if (!videoRef.current) return;

    if (isActive) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          setIsPlaying(false);
        });
      }
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
      try {
        videoRef.current.currentTime = 0; // Reset inactive videos
      } catch (e) {
        // ignore if not loaded
      }
    }
  }, [isActive]);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isActive) {
      onClick(); // If clicking side card, move to it
      return;
    }

    if (!videoRef.current) return;
    
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
      if (isMuted) setIsMuted(false);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMuted(!isMuted);
  };

  // ---------------------------------------------------------------------------
  // 3D & Layout Calculations
  // ---------------------------------------------------------------------------
  
  // Base transform logic for the Arc
  let translateX = '0%';
  let scale = 1;
  let zIndex = 10;
  let rotateY = '0deg';
  let opacity = 0;
  let pointerEvents = 'none';
  let rotateZ = '0deg';

  if (isMobile) {
    // --- Mobile Layout (Single Stack) ---
    if (isActive) {
      translateX = '-50%';
      opacity = 1;
      zIndex = 50;
      scale = 1;
      pointerEvents = 'auto';
    } else {
      // Hide others offscreen or behind
      translateX = '-50%';
      opacity = 0;
      scale = 0.8;
      pointerEvents = 'none';
    }
  } else {
    // --- Desktop Layout (Arc) ---
    if (isActive) {
      // Center
      translateX = '-50%';
      scale = 1;
      zIndex = 50;
      opacity = 1;
      rotateY = '0deg';
      pointerEvents = 'auto';
      rotateZ = isHovered ? '0deg' : '0deg'; // Center is straight
    } else if (offset === -1) {
      // Left
      translateX = '-140%'; // Move left relative to center
      scale = 0.85;
      zIndex = 40;
      opacity = 0.8;
      rotateY = '25deg'; // Angle inwards
      rotateZ = '-2deg'; // Creative tilt
      pointerEvents = 'auto'; // Allow clicking to navigate
    } else if (offset === 1) {
      // Right
      translateX = '40%'; // Move right relative to center
      scale = 0.85;
      zIndex = 40;
      opacity = 0.8;
      rotateY = '-25deg'; // Angle inwards
      rotateZ = '2deg'; // Creative tilt
      pointerEvents = 'auto';
    } else {
      // Far cards (hidden but present for smooth transition)
      translateX = offset < 0 ? '-250%' : '150%';
      scale = 0.6;
      zIndex = 10;
      opacity = 0;
    }
  }

  return (
    <div
      className="absolute top-1/2 left-1/2 w-[75vw] max-w-[280px] md:w-[340px] aspect-[9/16] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
      style={{
        transform: `translate(${translateX}, -50%) perspective(1000px) rotateY(${rotateY}) rotateZ(${isHovered && isActive ? '0deg' : rotateZ}) scale(${isHovered && isActive ? 1.05 : scale})`,
        zIndex,
        opacity,
        pointerEvents: pointerEvents as any,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={togglePlay}
    >
      <div 
        className={`
          relative w-full h-full rounded-[2rem] 
          border-[6px] border-primary bg-white 
          flex flex-col overflow-hidden
          transition-all duration-300
          ${isActive ? 'shadow-[0_20px_50px_rgba(0,0,0,0.3)]' : 'shadow-xl'}
          ${isHovered && isActive ? 'shadow-[0_20px_60px_rgba(255,204,0,0.4)] brightness-105 border-primary-hover' : ''}
        `}
      >
        {/* Video Area */}
        <div className="relative flex-grow bg-black overflow-hidden group">
          <video
            ref={videoRef}
            src={video.videoUrl}
            // Poster removed as per database change
            className="w-full h-full object-cover"
            loop
            muted={isMuted}
            playsInline
          />

          {/* Overlay & Controls */}
          <div className={`absolute inset-0 bg-black/10 transition-opacity duration-300 ${isHovered || !isActive ? 'opacity-100' : 'opacity-0'}`}>
            {/* Play Button */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div 
                className={`
                  w-16 h-16 rounded-full bg-primary flex items-center justify-center 
                  text-[#111111] shadow-lg
                  transform transition-all duration-500
                  ${isHovered ? 'scale-110' : 'scale-100'}
                  ${isPlaying && isActive && !isHovered ? 'opacity-0' : 'opacity-100'}
                  ${isHovered && 'animate-pulse'}
                `}
              >
                {isPlaying && isActive ? <Pause fill="currentColor" size={24} /> : <Play fill="currentColor" size={24} className="ml-1" />}
              </div>
            </div>

            {/* Mute Toggle (Only visible if active) */}
            {isActive && (
              <div className="absolute top-4 right-4 pointer-events-auto">
                <button 
                  onClick={toggleMute}
                  className="p-2.5 rounded-full bg-black/40 hover:bg-primary hover:text-black text-white backdrop-blur-md transition-all duration-300 hover:scale-105"
                >
                  {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Info Area */}
        <div className="px-5 py-5 bg-white flex flex-col items-center text-center relative z-10 border-t border-gray-100">
          <span className="px-3 py-1 bg-primary text-[#111111] text-[10px] font-extrabold tracking-widest rounded-full uppercase font-heading mb-3">
            {video.category}
          </span>
          <h3 className="text-[#111111] font-bold text-lg leading-tight font-heading line-clamp-1">
            {video.title}
          </h3>
        </div>
      </div>
    </div>
  );
};

export const VideoCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [videos, setVideos] = useState<DemoVideo[]>(DEMO_VIDEOS);
  const [isMobile, setIsMobile] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  
  // Touch handling state
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize(); 
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fetch videos from Supabase
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const { data, error } = await supabase
          .from('demo_videos')
          .select('id, title, category, video_url')
          .order('id', { ascending: true });
        
        if (error) {
          console.warn('Could not fetch videos from Supabase, using default data.', error);
          return;
        }

        if (data && data.length > 0) {
          const mappedVideos = data.map((item: any) => ({
             id: String(item.id),
             title: item.title,
             category: item.category,
             videoUrl: item.video_url
          }));
          
          setVideos(mappedVideos);
          
          // Safety check: if current index is out of bounds with new data, reset
          setCurrentIndex((prev) => (prev >= mappedVideos.length ? 0 : prev));
        }
      } catch (err) {
        console.warn('Supabase fetch error', err);
      }
    };

    fetchVideos();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % videos.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);
  };

  // Auto-slide effect
  useEffect(() => {
    if (isPaused) return;

    timerRef.current = setInterval(() => {
      nextSlide();
    }, 15000); // 15 seconds

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, videos.length]);

  // Pause on hover
  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  // Swipe handlers
  const onTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    setIsPaused(false);
    if (!touchStartX.current || !touchEndX.current) return;
    
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    }
    if (isRightSwipe) {
      prevSlide();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <section id="our-work" className="py-24 md:py-32 bg-secondary relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-20">
          <div className="relative">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-[#111111] mb-6 relative z-10 font-heading">
              Our Demo Ads
              <svg className="absolute -bottom-2 left-0 w-32 h-3 text-primary z-[-1]" viewBox="0 0 200 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.00026 6.99997C58.4239 1.94426 137.89 -2.57147 197.997 3.52841" stroke="currentColor" strokeWidth="6" strokeLinecap="round"/>
              </svg>
            </h2>
            <p className="text-xl text-subtext max-w-xl font-medium font-body">
              High-performing creatives that stop the scroll and drive action.
            </p>
          </div>
          
          <div className="mt-8 md:mt-0">
             <a href="#contact" className="group text-[#111111] font-bold text-lg flex items-center hover:text-primary transition-colors font-heading">
               View Full Portfolio <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
             </a>
          </div>
        </div>

        {/* Carousel Container */}
        <div 
          className="relative w-full h-[550px] md:h-[700px] flex items-center justify-center"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* Card Track */}
          <div className="relative w-full max-w-5xl h-full flex items-center justify-center perspective-container">
            {videos.map((video, index) => {
              const offset = getOffset(index, currentIndex, videos.length);
              
              // Only render cards that are close to center to save resources, 
              // but keep enough for smooth transition in/out
              if (Math.abs(offset) > 2 && !isMobile) return null; 

              return (
                <VideoCard 
                  key={video.id} 
                  video={video} 
                  offset={offset} 
                  isMobile={isMobile}
                  onClick={() => {
                    // Jump to this slide if clicked
                    setCurrentIndex(index);
                  }}
                />
              );
            })}
          </div>

          {/* Navigation Arrows (Absolute positioned relative to container) */}
          <div className="absolute top-1/2 -translate-y-1/2 left-4 md:left-10 z-50">
            <button 
              onClick={(e) => { e.stopPropagation(); prevSlide(); }}
              className="w-16 h-16 rounded-full bg-white text-[#111111] shadow-2xl border-2 border-gray-100 hover:border-primary hover:bg-primary transition-all duration-300 flex items-center justify-center focus:outline-none group/nav hover:-translate-x-1"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-8 h-8 group-hover/nav:text-[#111111]" />
            </button>
          </div>

          <div className="absolute top-1/2 -translate-y-1/2 right-4 md:right-10 z-50">
            <button 
              onClick={(e) => { e.stopPropagation(); nextSlide(); }}
              className="w-16 h-16 rounded-full bg-white text-[#111111] shadow-2xl border-2 border-gray-100 hover:border-primary hover:bg-primary transition-all duration-300 flex items-center justify-center focus:outline-none group/nav hover:translate-x-1"
              aria-label="Next slide"
            >
              <ChevronRight className="w-8 h-8 group-hover/nav:text-[#111111]" />
            </button>
          </div>

           {/* Progress Bar */}
           <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gray-200 rounded-full overflow-hidden max-w-[200px] mx-auto opacity-0 group-hover:opacity-100 transition-opacity z-50">
              <div key={currentIndex} className={`h-full bg-primary ${!isPaused ? 'animate-[width_15s_linear_forwards]' : 'w-full'}`} style={{ width: '0%', animationName: !isPaused ? 'expandWidth' : 'none' }}></div>
          </div>
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes expandWidth {
                from { width: 0%; }
                to { width: 100%; }
            }
          `}} />

        </div>
      </div>
    </section>
  );
};