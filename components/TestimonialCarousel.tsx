import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, ChevronLeft, ChevronRight } from 'lucide-react';
import { DemoVideo } from '../types';
import { cloudinaryListUrl, cloudinaryVideoUrl } from '../cloudinaryConfig';

// Cloudinary tag whose assets feed the testimonial carousel.
const TESTIMONIAL_TAG = 'testimonial';

interface CloudinaryResource {
  public_id: string;
  format: string;
  version: number;
  tags?: string[];
  context?: { custom?: { title?: string; category?: string } };
}

const titleCase = (s: string) =>
  s
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());

const getOffset = (index: number, currentIndex: number, length: number) => {
  let offset = index - currentIndex;
  if (offset > length / 2) offset -= length;
  if (offset < -length / 2) offset += length;
  return offset;
};

interface TestimonialCardProps {
  video: DemoVideo;
  offset: number;
  isMobile: boolean;
  onClick: () => void;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ video, offset, isMobile, onClick }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const isActive = offset === 0;

  useEffect(() => {
    if (!videoRef.current) return;

    if (isActive) {
      videoRef.current.play().catch(() => setIsPlaying(false));
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
      try {
        videoRef.current.currentTime = 0;
      } catch {}
    }
  }, [isActive]);

  const handlePlayPause = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
      if (isMuted) setIsMuted(false);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMuted((m) => !m);
  };

  let translateX = '0%';
  let scale = 1;
  let zIndex = 10;
  let rotateY = '0deg';
  let opacity = 0;
  let pointerEvents = 'none';
  let rotateZ = '0deg';

  if (isMobile) {
    if (isActive) {
      translateX = '-50%';
      opacity = 1;
      zIndex = 50;
      scale = 1;
      pointerEvents = 'auto';
    } else {
      translateX = '-50%';
      opacity = 0;
      scale = 0.8;
      pointerEvents = 'none';
    }
  } else {
    if (isActive) {
      translateX = '-50%';
      scale = 1;
      zIndex = 50;
      opacity = 1;
      rotateY = '0deg';
      pointerEvents = 'auto';
      rotateZ = isHovered ? '0deg' : '0deg';
    } else if (offset === -1) {
      translateX = '-140%';
      scale = 0.85;
      zIndex = 40;
      opacity = 0.8;
      rotateY = '25deg';
      rotateZ = '-2deg';
      pointerEvents = 'auto';
    } else if (offset === 1) {
      translateX = '40%';
      scale = 0.85;
      zIndex = 40;
      opacity = 0.8;
      rotateY = '-25deg';
      rotateZ = '2deg';
      pointerEvents = 'auto';
    } else {
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
      onClick={onClick}
    >
      <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden border-[5px] border-primary bg-black shadow-2xl hover:shadow-[0_20px_60px_rgba(255,204,0,0.4)]">
        <video
          ref={videoRef}
          src={video.videoUrl}
          className="w-full h-full object-cover"
          loop
          muted={isMuted}
          playsInline
          preload="metadata"
        />

        {/* Play/Pause overlay */}
        <div
          className={`absolute inset-0 bg-black/20 transition-opacity duration-300 flex items-center justify-center ${
            isHovered && isActive ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-[#111111] shadow-lg transform transition-all duration-300 hover:scale-110">
            {isPlaying ? <Pause fill="currentColor" size={24} /> : <Play fill="currentColor" size={24} className="ml-1" />}
          </div>
        </div>

        {/* Mute button */}
        {(isHovered || !isMuted) && (
          <div className="absolute top-4 right-4 pointer-events-auto">
            <button
              onClick={handleMute}
              className="p-3 rounded-full bg-black/40 hover:bg-primary hover:text-black text-white backdrop-blur-md transition-all duration-300 hover:scale-105"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
          </div>
        )}

        {/* Video title & category badge */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
          <span className="inline-block px-3 py-1 bg-primary text-[#111111] text-xs font-extrabold tracking-widest rounded-full uppercase mb-2">
            {video.category}
          </span>
          <h3 className="text-lg font-bold line-clamp-2">{video.title}</h3>
        </div>
      </div>
    </div>
  );
};

export const TestimonialCarousel: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [videos, setVideos] = useState<DemoVideo[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fetch testimonial videos from Cloudinary (tag = "testimonial").
  useEffect(() => {
    let cancelled = false;
    const fetchVideos = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(cloudinaryListUrl(TESTIMONIAL_TAG), { cache: 'no-store' });
        if (!res.ok) {
          setError(
            `Failed to load testimonials (${res.status}). Tag videos with "${TESTIMONIAL_TAG}" and enable "Resource list" in Cloudinary → Settings → Security.`
          );
          return;
        }
        const data = (await res.json()) as { resources?: CloudinaryResource[] };
        const resources = data.resources || [];
        if (!resources.length) {
          setError(`No videos found with tag "${TESTIMONIAL_TAG}".`);
          return;
        }

        const mapped: DemoVideo[] = resources.map((r) => {
          const ctx = r.context?.custom || {};
          const filename = r.public_id.split('/').pop() || r.public_id;
          const category = ctx.category || (r.tags || []).find((t) => t !== TESTIMONIAL_TAG) || 'Testimonial';
          return {
            id: r.public_id,
            title: ctx.title || titleCase(filename),
            category: titleCase(category),
            videoUrl: cloudinaryVideoUrl(r.public_id, r.version, r.format),
          };
        });

        if (cancelled) return;
        setVideos(mapped);
        setCurrentIndex(0);
      } catch (err) {
        if (!cancelled) setError('Failed to load testimonials. Please try again later.');
        console.warn('Testimonial fetch error', err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchVideos();
    return () => {
      cancelled = true;
    };
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % videos.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);
  };

  if (loading) {
    return (
      <section className="py-16 md:py-24 bg-secondary">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-lg text-subtext font-medium">Loading testimonials…</p>
        </div>
      </section>
    );
  }

  if (error || videos.length === 0) {
    return (
      <section className="py-16 md:py-24 bg-secondary">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-lg text-red-600 font-medium">{error || 'No testimonials available.'}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-16 md:pt-20 pb-24 md:pb-32 bg-secondary relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-[#111111] mb-4 relative inline-block">
            Client's Love
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
          <p className="text-lg md:text-xl text-subtext max-w-2xl mx-auto font-medium">
            Join the D2C brands that are scaling faster with our creative intelligence.
          </p>
        </div>

        {/* Carousel container */}
        <div className="relative h-96 md:h-[500px] flex items-center justify-center">
          <div
            ref={containerRef}
            className="relative w-full h-full"
          >
            {videos.map((video, index) => (
              <TestimonialCard
                key={video.id}
                video={video}
                offset={getOffset(index, currentIndex, videos.length)}
                isMobile={isMobile}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>

          {/* Navigation arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 md:left-4 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full bg-white border-2 border-primary text-[#111111] hover:bg-primary transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 md:right-4 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full bg-white border-2 border-primary text-[#111111] hover:bg-primary transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl"
            aria-label="Next testimonial"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Slide counter */}
        <div className="text-center mt-8 md:mt-12">
          <p className="text-sm md:text-base text-subtext font-medium">
            <span className="font-bold text-[#111111]">{currentIndex + 1}</span> / {videos.length}
          </p>
        </div>
      </div>
    </section>
  );
};
