"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "@/components/motion-wrapper";
import {ArrowDown, ArrowUpRight, Clock3, MousePointer2, X} from "lucide-react";

interface Poster {
  id: string;
  src: string;
  alt: string;
  isiSrc: string | null;
  status: "ready" | "soon";
  bootcampSlug: string | null;
}

const posters: Poster[] = [
  { id: "bagas", src: "/slide-show/bagas-cover.png", alt: "Kelas Digital Marketing — Bagas Alimpad P.", isiSrc: "/slide-show/bagas-isi-new.png", status: "ready", bootcampSlug: "digital-marketing" },
  { id: "arini", src: "/slide-show/arini-cover.png", alt: "Kelas Bootcamp — Arini", isiSrc: "/slide-show/arini-isi-new.png", status: "soon", bootcampSlug: "hrga" },
  { id: "diego", src: "/slide-show/diego-cover-new.png", alt: "Kelas Bootcamp — Diego", isiSrc: "/slide-show/diego-isi-new.png", status: "ready", bootcampSlug: "smart-creator" },
  { id: "edward", src: "/slide-show/edward-cover.png", alt: "Kelas Bootcamp — Edward", isiSrc: "/slide-show/edward-isi-new.png", status: "soon", bootcampSlug: "retail-franchise" },
  { id: "hadi", src: "/slide-show/hadi-cover.png", alt: "Kelas Bootcamp — Hadi", isiSrc: "/slide-show/hadi-isi-new.png", status: "soon", bootcampSlug: "marketplace-optimization" },
  { id: "ricky", src: "/slide-show/ricky-cover.png", alt: "Kelas Bootcamp — Ricky", isiSrc: "/slide-show/ricky-isi-new.png", status: "soon", bootcampSlug: "social-media-specialist" },
  { id: "rini", src: "/slide-show/rini-cover.png", alt: "Kelas Bootcamp — Miss Riri", isiSrc: "/slide-show/miss-riri-isi.png", status: "soon", bootcampSlug: "public-speaking" },
];

const SLIDE_INTERVAL = 4000;
const TRANSITION_MS = 500;

/* ── Detail Modal ── */
const DetailModal = ({
  poster,
  onClose,
  onViewDetail,
}: {
  poster: Poster | null;
  onClose: () => void;
  onViewDetail: () => void;
}) => {
  useEffect(() => {
    if (!poster) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [poster, onClose]);

  return (
    <AnimatePresence>
      {poster && poster.isiSrc && (
        <motion.div
          key="detail-modal-backdrop"
          className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/80 backdrop-blur-sm transition-colors hover:bg-white/20 hover:text-white sm:right-6 sm:top-6 sm:h-12 sm:w-12"
            aria-label="Tutup poster"
          >
            <X size={20} />
          </button>

          {/* Detail poster image */}
          <motion.div
            key={`detail-modal-${poster.id}`}
            className="relative z-10 w-full max-w-md overflow-hidden rounded-3xl shadow-2xl shadow-black/50 sm:max-w-lg"
            initial={{ scale: 0.7, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.7, opacity: 0, y: 30 }}
            transition={{ type: "spring", stiffness: 300, damping: 25, mass: 0.8 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-4/5 w-full bg-slate-800">
              <Image
                src={poster.isiSrc}
                alt={`Detail ${poster.alt}`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 90vw, 512px"
              />
            </div>
            <div className="bg-[#1a1c1f] p-4 sm:p-5">
              <button
                type="button"
                onClick={onViewDetail}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-brand-500 px-5 py-3 text-sm font-semibold text-[#1e2024] transition-colors hover:bg-brand-400"
              >
                Lihat detail kelas
                <ArrowUpRight size={17} />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* ── Main PosterSlideshow Component ── */
const PosterSlideshow = () => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedPoster, setSelectedPoster] = useState<Poster | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const trackRef = useRef<HTMLDivElement>(null);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Drag state
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragDelta = useRef(0);
  const dragMoved = useRef(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [isGrabbing, setIsGrabbing] = useState(false);

  const totalSlides = posters.length;

  /* ── Responsive: visible count ── */
  const visibleCount = 1;

  /* ── Build extended list for infinite loop ── */
  // We prepend `visibleCount` items at start and append `visibleCount` at end
  const extendedPosters = [
    ...posters.slice(-visibleCount),
    ...posters,
    ...posters.slice(0, visibleCount),
  ];
  const offsetIndex = currentIndex + visibleCount; // index in extendedPosters

  /* ── Slide width percentage ── */
  const slideWidthPercent = 100 / visibleCount;
  const gapPx = 16; // gap between slides

  /* ── Compute transform ── */
  const getTransform = useCallback(
    (index: number, drag: number = 0) => {
      // Each slide takes slideWidthPercent of the track
      // Transform = -(index * slideWidthPercent)%
      // But we also need to account for the gap
      const percentShift = -(index * slideWidthPercent);
      return `calc(${percentShift}% + ${-index * gapPx + drag}px)`;
    },
    [slideWidthPercent, gapPx]
  );

  /* ── Go to slide ── */
  const goToSlide = useCallback(
    (index: number, animate = true) => {
      if (animate) {
        setIsTransitioning(true);
      }
      setCurrentIndex(index);
      setDragOffset(0);

      // Handle wrapping after transition
      if (animate) {
        setTimeout(() => {
          setIsTransitioning(false);
          // Wrap around
          if (index >= totalSlides) {
            setCurrentIndex(0);
          } else if (index < 0) {
            setCurrentIndex(totalSlides - 1);
          }
        }, TRANSITION_MS);
      }
    },
    [totalSlides]
  );

  /* ── Auto-play ── */
  useEffect(() => {
    autoplayRef.current = setInterval(() => {
      goToSlide(currentIndex + 1, true);
    }, SLIDE_INTERVAL);

    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [currentIndex, goToSlide]);

  /* ── Pointer / drag handlers ── */
  /* ── Drag handlers ── */
  const handleDragStart = useCallback((clientX: number) => {
    isDragging.current = true;
    dragMoved.current = false;
    dragStartX.current = clientX;
    dragDelta.current = 0;
    setIsGrabbing(true);
  }, []);

  const handleDragMove = useCallback((clientX: number) => {
    if (!isDragging.current) return;
    const dx = clientX - dragStartX.current;
    if (Math.abs(dx) > 5) dragMoved.current = true;
    dragDelta.current = dx;
    setDragOffset(dx);
  }, []);

  const handleDragEnd = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;
    setIsGrabbing(false);

    const threshold = 60; // px threshold to trigger slide change
    if (dragDelta.current < -threshold) {
      goToSlide(currentIndex + 1, true);
    } else if (dragDelta.current > threshold) {
      goToSlide(currentIndex - 1, true);
    } else {
      setDragOffset(0);
    }
    dragDelta.current = 0;
  }, [currentIndex, goToSlide]);

  const handlePointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    handleDragStart(e.clientX);
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  }, [handleDragStart]);

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    handleDragMove(e.clientX);
  }, [handleDragMove]);

  const handleTouchStart = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    handleDragStart(e.touches[0].clientX);
  }, [handleDragStart]);

  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    handleDragMove(e.touches[0].clientX);
  }, [handleDragMove]);

  /* ── Click handler ── */
  const handlePosterClick = useCallback(
    (poster: Poster) => {
      if (dragMoved.current) return; // ignore drag-based clicks
      setSelectedPoster(poster);
    },
    []
  );

  const handleCloseModal = useCallback(() => setSelectedPoster(null), []);

  const handleViewDetail = useCallback(() => {
    if (!selectedPoster?.bootcampSlug) return;
    router.push(`/bootcamp/${selectedPoster.bootcampSlug}`);
  }, [router, selectedPoster]);

  /* ── Dot click ── */
  const handleDotClick = useCallback(
    (index: number) => {
      goToSlide(index, true);
    },
    [goToSlide]
  );

  /* ── Determine the real index for dots (handle wrapping) ── */
  const realIndex = ((currentIndex % totalSlides) + totalSlides) % totalSlides;

  return (
    <>
      <section id="poster-slideshow" className="section-dark relative overflow-hidden border-y border-white/10 pb-0 pt-10 sm:pt-14">
        {/* Subtle top separator line */}
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-brand-600/30 to-transparent" />

        {/* ── Heading ── */}
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand-300">
            Program unggulan
          </p>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Kelas yang sedang dipromosikan
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-white/60 sm:text-base">
            Pilihan kelas dari mentor berpengalaman untuk membantu kamu upgrade skill dan lebih siap kerja.
          </p>
        </div>

        {/* ── Carousel ── */}
        <div className="relative mx-auto mt-10 max-w-6xl px-4 sm:mt-12 sm:px-6">
          <div
            className="overflow-hidden select-none"
            style={{ cursor: isGrabbing ? "grabbing" : "grab", touchAction: "pan-y" }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handleDragEnd}
            onPointerCancel={handleDragEnd}
            onPointerLeave={handleDragEnd}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleDragEnd}
            onTouchCancel={handleDragEnd}
          >
            <div
              ref={trackRef}
              className="flex"
              style={{
                gap: `${gapPx}px`,
                transform: `translateX(${getTransform(offsetIndex, dragOffset)})`,
                transition: isTransitioning && dragOffset === 0
                  ? `transform ${TRANSITION_MS}ms cubic-bezier(0.25, 1, 0.5, 1)`
                  : "none",
                willChange: "transform",
              }}
            >
              {extendedPosters.map((poster, i) => {
                const isClickable = poster.bootcampSlug !== null || poster.isiSrc !== null;
                const isReady = poster.status === "ready";
                return (
                  <div
                    key={`${poster.id}-${i}`}
                    className="flex shrink-0 justify-center px-4"
                    style={{
                      width: `calc(${slideWidthPercent}% - ${gapPx * (visibleCount - 1) / visibleCount}px)`,
                    }}
                  >
                    <button
                      type="button"
                      className={`group relative w-full max-w-70 sm:max-w-75 rounded-2xl border-0 bg-transparent p-0 shadow-none transition-transform duration-300 ${
                        isClickable
                          ? "cursor-pointer"
                          : "cursor-default"
                      }`}
                      onClick={() => handlePosterClick(poster)}
                      aria-label={
                        isClickable
                          ? `Buka poster ${poster.alt}`
                          : poster.alt
                      }
                      tabIndex={isClickable ? 0 : -1}
                    >
                      <div className="relative aspect-4/5 w-full overflow-hidden rounded-2xl">
                        <Image
                          src={poster.src}
                          alt={poster.alt}
                          fill
                          className="pointer-events-none object-cover transition-transform duration-500"
                          sizes="(max-width: 640px) 280px, 300px"
                          draggable={false}
                        />
                        
                        {/* "SOON" Ribbon for unclickable posters or soon posters (Moved here to be clipped by overflow-hidden) */}
                        {!isReady && (
                          <div className="pointer-events-none absolute -right-12 top-6 z-10 flex w-40 rotate-45 items-center justify-center gap-1 bg-red-600/90 py-1 text-xs font-bold tracking-widest text-white shadow-md backdrop-blur-sm sm:text-sm">
                            <Clock3 size={13} /> Segera hadir
                          </div>
                        )}
                      </div>

                      {/* Click indicator icon (Always visible for mobile support, placed fully inside to avoid carousel clip) */}
                      {isClickable && (
                        <div className={`pointer-events-none absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center justify-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold sm:bottom-5 sm:px-4 sm:text-sm ${
                          isReady ? "bg-green-500 text-slate-900 shadow-[0_0_15px_rgba(34,197,94,0.6)]" : "bg-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.6)]"
                        }`}>
                          <MousePointer2 size={14} />
                          Buka poster
                        </div>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Indicator Dots ── */}
          <div className="mt-6 flex items-center justify-center gap-2 sm:mt-8">
            {posters.map((poster, i) => (
              <button
                key={poster.id}
                type="button"
                onClick={() => handleDotClick(i)}
                aria-label={`Slide ${i + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  i === realIndex
                    ? "w-8 bg-brand-500"
                    : "w-2.5 bg-white/25 hover:bg-white/40"
                }`}
              />
            ))}
          </div>

          <a
            href="#bootcamp"
            className="mx-auto mt-6 flex w-fit items-center gap-2 text-sm font-semibold text-white/70 transition-colors hover:text-brand-300"
          >
            Lihat semua bootcamp
            <ArrowDown size={15} />
          </a>
        </div>

        <div className="h-8 sm:h-10" />
      </section>

      {/* Modal rendered outside section */}
      <DetailModal
        poster={selectedPoster}
        onClose={handleCloseModal}
        onViewDetail={handleViewDetail}
      />
    </>
  );
};

export default PosterSlideshow;
