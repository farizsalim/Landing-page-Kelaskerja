"use client";

import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import { FadeInUp } from "@/components/motion-wrapper";
import { testimonials, Testimonial } from "@/data/testimonials";
import { Star } from "lucide-react";

// Split testimonials into two rows
const row1 = testimonials.slice(0, 6);
const row2 = testimonials.slice(6, 12);

// Duplicate for seamless loop
const loop1 = [...row1, ...row1, ...row1];
const loop2 = [...row2, ...row2, ...row2];

/* ── Single testimonial card ── */
const TestimonialCard = ({ item }: { item: Testimonial }) => (
  <div className="testimonial-card mx-3 flex w-[320px] shrink-0 flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 text-slate-900 shadow-lg shadow-black/15 transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
    {/* Stars */}
    <div className="flex gap-0.5">
      {Array.from({ length: item.rating }).map((_, i) => (
        <Star
          key={i}
          size={15}
          className="fill-[#FFB500] text-[#FFB500]"
        />
      ))}
    </div>

    {/* Quote */}
    <p className="line-clamp-4 grow text-sm leading-relaxed text-slate-600">
      &ldquo;{item.quote}&rdquo;
    </p>

    {/* Author */}
    <div className="flex items-center gap-3 border-t border-slate-100 pt-4">
      {/* Avatar */}
      <div
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
        style={{ backgroundColor: item.color }}
      >
        {item.initials}
      </div>

      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-slate-900">
          {item.name}
        </p>
        <p className="truncate text-xs font-medium text-brand-700">
          {item.bootcamp}
        </p>
      </div>
    </div>
  </div>
);

/* ── Row component ── */
function TestimonialRow({
  items,
  direction,
}: {
  items: Testimonial[];
  direction: "forward" | "backward";
}) {
  const [emblaRef] = useEmblaCarousel(
    { loop: true, dragFree: true, align: "start" },
    [
      AutoScroll({
        stopOnInteraction: false,
        speed: 1.2,
        direction: direction === "forward" ? "forward" : "backward",
        startDelay: 0,
      }),
    ]
  );

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex">
        {items.map((item, index) => {
          return <TestimonialCard key={`${item.id}-${index}`} item={item} />;
        })}
      </div>
    </div>
  );
}

/* ── Main section ── */
const AlumniTestimonials = () => {
  return (
    <section className="section-dark overflow-hidden border-y border-white/10 px-0 py-16 sm:py-20">
      {/* Heading */}
      <FadeInUp>
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-300">
            Alumni KelasKerja
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Kisah Alumni KelasKerja
          </h2>
          <p className="mt-4 text-white/60">
            Ribuan alumni telah membuktikan. Simak cerita nyata mereka yang
            berhasil naik level kariernya bersama KelasKerja.
          </p>
        </div>
      </FadeInUp>

      {/* Sliders */}
      <div className="relative mt-12 flex flex-col gap-5">
        {/* Gradient masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-linear-to-r from-[#111315] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-linear-to-l from-[#111315] to-transparent" />

        {/* Row 1 — scrolls left (forward) */}
        <TestimonialRow items={loop1} direction="forward" />

        {/* Row 2 — scrolls right (backward) */}
        <TestimonialRow items={loop2} direction="backward" />
      </div>
    </section>
  );
};

export default AlumniTestimonials;
