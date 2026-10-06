"use client";

import {FadeInLeft, FadeInRight, FadeInUp} from "@/components/motion-wrapper";
import {hiringPartners} from "@/data/hiring-partner";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";

const HiringPartner = () => {
  // Duplicate the list enough times for a seamless infinite scroll
  const marqueeItems = [...hiringPartners, ...hiringPartners, ...hiringPartners];

  const [emblaRef] = useEmblaCarousel({ loop: true, dragFree: true, align: "start" }, [
    AutoScroll({
      playOnInit: true,
      stopOnInteraction: false,
      stopOnMouseEnter: false,
      stopOnFocusIn: false,
      startDelay: 0,
      speed: 1.2,
    }),
  ]);

  return (
    <section className="border-b border-slate-100 bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <FadeInUp>
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <FadeInLeft>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">
                  Hiring Partner
                </p>
                <h2 className="mt-2 text-3xl font-semibold text-slate-900">
                  Perusahaan yang telah bekerja sama
                </h2>
              </div>
            </FadeInLeft>
            <FadeInRight>
              <p className="max-w-xl text-slate-600">
                Koneksi kami terus berkembang seiring program bootcamp yang
                berjalan.
              </p>
            </FadeInRight>
          </div>

          {/* ── Infinite marquee ── */}
          <div className="relative mt-10 border-y border-slate-100 py-5 sm:mt-12 sm:py-6">
            {/* Gradient masks on edges */}
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-linear-to-r from-white to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-linear-to-l from-white to-transparent" />

            {/* Embla Viewport */}
            <div className="overflow-hidden" ref={emblaRef}>
              {/* Embla Container */}
              <div className="flex cursor-grab touch-pan-y active:cursor-grabbing">
                {marqueeItems.map((partner, index) => (
                  <div
                    key={`${partner.name}-${index}`}
                    className="relative flex h-24 w-44 min-w-0 shrink-0 items-center justify-center px-4 transition duration-300">
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      fill
                      sizes="176px"
                      className="pointer-events-none object-contain"
                      draggable={false}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </FadeInUp>
    </section>
  );
};

export default HiringPartner;
