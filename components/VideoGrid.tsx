import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX, ChevronLeft, ChevronRight } from 'lucide-react';
import { DemoVideo } from '../types';
import {
  VIDEO_CATEGORIES,
  cloudinaryListUrl,
  cloudinaryVideoUrl,
} from '../cloudinaryConfig';

interface CloudinaryResource {
  public_id: string;
  format: string;
  version: number;
  resource_type: string;
  type: string;
  created_at: string;
  bytes: number;
  width: number;
  height: number;
  tags?: string[];
  context?: { custom?: { title?: string; category?: string } };
}

interface CloudinaryListResponse {
  resources: CloudinaryResource[];
  updated_at?: string;
}

const titleCase = (s: string) =>
  s
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());

const resourceToVideo = (
  r: CloudinaryResource,
  fallbackCategory: string
): DemoVideo => {
  const ctx = r.context?.custom || {};
  const filename = r.public_id.split('/').pop() || r.public_id;
  return {
    id: r.public_id,
    title: ctx.title || titleCase(filename),
    category: ctx.category || fallbackCategory,
    videoUrl: cloudinaryVideoUrl(r.public_id, r.version, r.format),
  };
};

interface GridCardProps {
  video: DemoVideo;
}

const GridCard: React.FC<GridCardProps> = ({ video }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const handleEnter = () => {
    setIsHovered(true);
    const v = videoRef.current;
    if (!v) return;
    const p = v.play();
    if (p !== undefined) p.then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
  };

  const handleLeave = () => {
    setIsHovered(false);
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    setIsPlaying(false);
    try { v.currentTime = 0; } catch { /* noop */ }
  };

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
      if (isMuted) setIsMuted(false);
    } else {
      v.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMuted((m) => !m);
  };

  return (
    <div
      className="group w-full aspect-[9/16] transition-transform duration-500 ease-out hover:-translate-y-1"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={togglePlay}
    >
      <div
        className={`
          relative w-full h-full rounded-[2rem]
          border-[6px] border-primary bg-white
          flex flex-col overflow-hidden cursor-pointer
          transition-all duration-300
          shadow-xl
          ${isHovered ? 'shadow-[0_20px_60px_rgba(255,204,0,0.4)] brightness-105 border-primary-hover' : ''}
        `}
      >
        <div className="relative flex-grow bg-black overflow-hidden">
          <video
            ref={videoRef}
            src={video.videoUrl}
            className="w-full h-full object-cover"
            loop
            muted={isMuted}
            playsInline
            preload="metadata"
          />

          <div
            className={`absolute inset-0 bg-black/10 transition-opacity duration-300 ${
              isHovered && isPlaying ? 'opacity-0' : 'opacity-100'
            }`}
          >
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div
                className={`
                  w-14 h-14 rounded-full bg-primary flex items-center justify-center
                  text-[#111111] shadow-lg
                  transform transition-all duration-300
                  ${isHovered ? 'scale-110' : 'scale-100'}
                `}
              >
                {isPlaying ? <Pause fill="currentColor" size={20} /> : <Play fill="currentColor" size={20} className="ml-0.5" />}
              </div>
            </div>
          </div>

          {(isHovered || !isMuted) && (
            <div className="absolute top-3 right-3 pointer-events-auto">
              <button
                onClick={toggleMute}
                className="p-2 rounded-full bg-black/40 hover:bg-primary hover:text-black text-white backdrop-blur-md transition-all duration-300 hover:scale-105"
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </button>
            </div>
          )}
        </div>

        <div className="px-4 py-4 bg-white flex flex-col items-center text-center relative z-10 border-t border-gray-100">
          <span className="px-3 py-1 bg-primary text-[#111111] text-[10px] font-extrabold tracking-widest rounded-full uppercase mb-2">
            {video.category}
          </span>
          <h3 className="text-[#111111] font-bold text-base leading-tight line-clamp-1">
            {video.title}
          </h3>
        </div>
      </div>
    </div>
  );
};

interface CategoryFilterProps {
  categories: { label: string; tag: string }[];
  activeCategory: string;
  onChange: (tag: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  activeCategory,
  onChange,
}) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = () => {
    const el = scrollerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 4);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 4);
  };

  useEffect(() => {
    updateScrollState();
    const el = scrollerRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);
    return () => {
      el.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, [categories.length]);

  // Keep the active pill in view when it changes (e.g. via keyboard).
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const active = el.querySelector<HTMLElement>(`[data-tag="${activeCategory}"]`);
    if (active) {
      active.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [activeCategory]);

  const scrollByAmount = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.max(240, el.clientWidth * 0.6), behavior: 'smooth' });
  };

  return (
    <div className="relative mb-10 md:mb-14">
      {/* Left edge fade + arrow */}
      <div
        className={`pointer-events-none absolute left-0 top-0 bottom-0 w-12 md:w-16 z-10 bg-gradient-to-r from-secondary to-transparent transition-opacity duration-200 ${
          canScrollLeft ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <button
        type="button"
        onClick={() => scrollByAmount(-1)}
        aria-label="Scroll categories left"
        className={`hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white border-2 border-gray-200 shadow-md items-center justify-center text-[#111111] hover:bg-primary hover:border-primary transition-all duration-200 ${
          canScrollLeft ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <ChevronLeft size={18} />
      </button>

      {/* Scrollable pill strip */}
      <div
        ref={scrollerRef}
        className="flex items-center gap-2 md:gap-3 overflow-x-auto scroll-smooth px-2 md:px-12 py-1 no-scrollbar"
        style={{ scrollSnapType: 'x proximity' }}
      >
        {categories.map((cat) => {
          const isActive = activeCategory === cat.tag;
          return (
            <button
              key={cat.tag}
              data-tag={cat.tag}
              onClick={() => onChange(cat.tag)}
              style={{ scrollSnapAlign: 'center' }}
              className={`
                shrink-0 px-4 md:px-5 py-2 rounded-full text-sm md:text-base font-bold uppercase tracking-wide
                border-2 transition-all duration-200 whitespace-nowrap
                ${
                  isActive
                    ? 'bg-primary text-[#111111] border-primary shadow-md scale-[1.02]'
                    : 'bg-white text-[#111111] border-gray-200 hover:border-primary hover:bg-primary/10'
                }
              `}
              aria-pressed={isActive}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Right edge fade + arrow */}
      <div
        className={`pointer-events-none absolute right-0 top-0 bottom-0 w-12 md:w-16 z-10 bg-gradient-to-l from-secondary to-transparent transition-opacity duration-200 ${
          canScrollRight ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <button
        type="button"
        onClick={() => scrollByAmount(1)}
        aria-label="Scroll categories right"
        className={`hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white border-2 border-gray-200 shadow-md items-center justify-center text-[#111111] hover:bg-primary hover:border-primary transition-all duration-200 ${
          canScrollRight ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <ChevronRight size={18} />
      </button>

      {/* Hide the native scrollbar across browsers */}
      <style dangerouslySetInnerHTML={{ __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
};

const PAGE_SIZE = 12;

export const VideoGrid: React.FC = () => {
  const [videosByTag, setVideosByTag] = useState<Record<string, DemoVideo[]>>({});
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const gridTopRef = useRef<HTMLDivElement>(null);

  // Fetch each category tag from Cloudinary's public list endpoint in parallel.
  useEffect(() => {
    let cancelled = false;
    const fetchAll = async () => {
      setLoading(true);
      setError(null);
      try {
        const results = await Promise.all(
          VIDEO_CATEGORIES.map(async ({ label, tag }) => {
            try {
              const res = await fetch(cloudinaryListUrl(tag), { cache: 'no-store' });
              if (!res.ok) return [tag, [] as DemoVideo[]] as const;
              const data = (await res.json()) as CloudinaryListResponse;
              const videos = (data.resources || []).map((r) => resourceToVideo(r, label));
              return [tag, videos] as const;
            } catch {
              return [tag, [] as DemoVideo[]] as const;
            }
          })
        );

        if (cancelled) return;
        const map: Record<string, DemoVideo[]> = {};
        results.forEach(([tag, vids]) => {
          map[tag] = vids;
        });
        setVideosByTag(map);
      } catch (e: any) {
        if (!cancelled) setError(e?.message || 'Failed to load videos');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchAll();
    return () => {
      cancelled = true;
    };
  }, []);

  // "All" + only categories that actually returned at least one video
  const categories = useMemo(() => {
    const available = VIDEO_CATEGORIES.filter(
      ({ tag }) => (videosByTag[tag]?.length || 0) > 0
    );
    return [{ label: 'All', tag: 'All' }, ...available];
  }, [videosByTag]);

  const allVideos = useMemo(() => {
    // Merge across tags, dedupe by public_id (in case a video has multiple category tags)
    const seen = new Set<string>();
    const out: DemoVideo[] = [];
    VIDEO_CATEGORIES.forEach(({ tag }) => {
      (videosByTag[tag] || []).forEach((v) => {
        if (!seen.has(v.id)) {
          seen.add(v.id);
          out.push(v);
        }
      });
    });
    return out;
  }, [videosByTag]);

  const filtered = useMemo(() => {
    if (activeCategory === 'All') return allVideos;
    return videosByTag[activeCategory] || [];
  }, [allVideos, videosByTag, activeCategory]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

  // Reset to first page whenever the filter (or video set) changes
  useEffect(() => {
    setPage(1);
  }, [activeCategory, allVideos]);

  // Clamp page if it overflows after data changes
  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const pageVideos = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, page]);

  const goToPage = (p: number) => {
    const next = Math.min(Math.max(1, p), totalPages);
    setPage(next);
    gridTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const pageNumbers = useMemo(() => {
    // Compact pagination: show up to 5 page buttons centered around current page
    const max = 5;
    if (totalPages <= max) return Array.from({ length: totalPages }, (_, i) => i + 1);
    let start = Math.max(1, page - 2);
    let end = start + max - 1;
    if (end > totalPages) {
      end = totalPages;
      start = end - max + 1;
    }
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }, [page, totalPages]);

  return (
    <section id="our-work" className="pt-16 md:pt-20 pb-24 md:pb-32 bg-secondary relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-start md:items-center text-left md:text-center mb-10 md:mb-14">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-[#111111] mb-4 relative inline-block">
            Our Demo Ads
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
          <p className="text-lg md:text-xl text-subtext max-w-2xl font-medium">
            High-performing creatives that stop the scroll and drive action.
          </p>
        </div>

        {/* Category filter — horizontal scroll strip (Netflix / YouTube style) */}
        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onChange={setActiveCategory}
        />

        {/* Grid anchor (used to scroll to top on page change) */}
        <div ref={gridTopRef} />

        {/* Grid */}
        {loading ? (
          <div className="text-center text-subtext font-medium py-16">Loading videos…</div>
        ) : error ? (
          <div className="text-center text-red-600 font-medium py-16">
            {error}. Make sure "Resource list" is enabled in Cloudinary → Settings → Security.
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center text-subtext font-medium py-16">
            No videos in this category yet.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
              {pageVideos.map((video) => (
                <GridCard key={video.id} video={video} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex flex-col items-center gap-4 mt-12 md:mt-16">
                <div className="flex items-center gap-2 flex-wrap justify-center">
                  <button
                    onClick={() => goToPage(page - 1)}
                    disabled={page === 1}
                    className="w-10 h-10 rounded-full bg-white text-[#111111] border-2 border-gray-200 hover:border-primary hover:bg-primary disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-gray-200 transition-all duration-200 flex items-center justify-center"
                    aria-label="Previous page"
                  >
                    <ChevronLeft size={18} />
                  </button>

                  {pageNumbers[0] > 1 && (
                    <>
                      <button
                        onClick={() => goToPage(1)}
                        className="w-10 h-10 rounded-full bg-white text-[#111111] border-2 border-gray-200 hover:border-primary hover:bg-primary font-bold transition-all duration-200"
                      >
                        1
                      </button>
                      {pageNumbers[0] > 2 && (
                        <span className="px-1 text-subtext font-bold">…</span>
                      )}
                    </>
                  )}

                  {pageNumbers.map((p) => {
                    const isActive = p === page;
                    return (
                      <button
                        key={p}
                        onClick={() => goToPage(p)}
                        className={`w-10 h-10 rounded-full font-bold border-2 transition-all duration-200 ${
                          isActive
                            ? 'bg-primary text-[#111111] border-primary shadow-md'
                            : 'bg-white text-[#111111] border-gray-200 hover:border-primary hover:bg-primary/10'
                        }`}
                        aria-current={isActive ? 'page' : undefined}
                      >
                        {p}
                      </button>
                    );
                  })}

                  {pageNumbers[pageNumbers.length - 1] < totalPages && (
                    <>
                      {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
                        <span className="px-1 text-subtext font-bold">…</span>
                      )}
                      <button
                        onClick={() => goToPage(totalPages)}
                        className="w-10 h-10 rounded-full bg-white text-[#111111] border-2 border-gray-200 hover:border-primary hover:bg-primary font-bold transition-all duration-200"
                      >
                        {totalPages}
                      </button>
                    </>
                  )}

                  <button
                    onClick={() => goToPage(page + 1)}
                    disabled={page === totalPages}
                    className="w-10 h-10 rounded-full bg-white text-[#111111] border-2 border-gray-200 hover:border-primary hover:bg-primary disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-gray-200 transition-all duration-200 flex items-center justify-center"
                    aria-label="Next page"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>

                <p className="text-sm text-subtext font-medium">
                  Showing{' '}
                  <span className="font-bold text-[#111111]">
                    {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)}
                  </span>{' '}
                  of <span className="font-bold text-[#111111]">{filtered.length}</span>
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};
