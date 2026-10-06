"use client";

import Image from "next/image";
import {Clock3, ChevronLeft, ChevronRight, Gift, MoveHorizontal} from "lucide-react";
import {FaWhatsapp} from "react-icons/fa";
import {motion} from "@/components/motion-wrapper";
import {useCallback, useEffect, useState} from "react";
import useEmblaCarousel from "embla-carousel-react";

const freeClassPosters = [
  {
    id: 1,
    src: "/free-class/public-speaking-kelas-gratis.png",
    alt: "Public Speaking Kelas Gratis",
    courseName: "Public Speaking",
    detail: "Bangun percaya diri dan kemampuan bicara yang lebih meyakinkan.",
  },
  {
    id: 2,
    src: "/free-class/digital-marketing-kelas-gratis.png",
    alt: "Digital Marketing Kelas Gratis",
    courseName: "Digital Marketing",
    detail: "Kenali strategi digital marketing yang dipakai di dunia kerja.",
  },
  {
    id: 3,
    src: "/free-class/smart-creator-kelas-gratis.png",
    alt: "Smart Creator Kelas Gratis",
    courseName: "Smart Creator",
    detail: "Mulai membuat konten yang relevan, kreatif, dan bernilai.",
  },
];

export default function FreeClassCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    skipSnaps: false,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section
      id="kelas-gratis"
      className="section-light relative overflow-hidden border-b border-slate-200 py-8 sm:py-14 lg:py-16"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-5 grid gap-4 sm:mb-10 sm:gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:gap-16">
          <div className="max-w-xl lg:max-w-none">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-brand-600">
              Mulai tanpa risiko
            </p>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Coba dulu sebelum memilih <span className="text-brand-600">bootcamp.</span>
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:mt-4 sm:text-lg">
              Kenali cara belajar Kelas Kerja lewat kelas gratis yang praktis dan relevan.
            </p>
          </div>

          <div className="hidden grid-cols-3 gap-2 sm:grid sm:gap-3">
            {[
              [Gift, "100% gratis", "Tanpa biaya pendaftaran"],
              [Clock3, "Praktis", "Materi langsung terpakai"],
              [FaWhatsapp, "Dibantu", "Daftar lewat WhatsApp"],
            ].map(([Icon, title, detail]) => (
              <div key={title as string} className="flex min-w-0 flex-col items-center rounded-xl border border-slate-200 bg-slate-50/80 p-2 text-center sm:flex-row sm:items-start sm:gap-2.5 sm:p-4 sm:text-left">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-100 text-brand-700 sm:mt-0.5 sm:h-8 sm:w-8">
                  <Icon size={15} />
                </span>
                <span className="min-w-0">
                  <strong className="mt-1 block truncate text-[11px] font-semibold text-slate-900 sm:mt-0 sm:text-sm">{title as string}</strong>
                  <span className="mt-1 hidden text-xs leading-relaxed text-slate-500 sm:block">{detail as string}</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        <p className="mb-4 flex items-center justify-center gap-1.5 text-xs font-medium text-slate-500 sm:hidden">
          <MoveHorizontal size={14} />
          Geser untuk melihat kelas lain
        </p>

        <div className="relative mx-auto max-w-6xl">
          <div className="overflow-hidden px-1 py-2 sm:px-0" ref={emblaRef}>
            <div className="flex -ml-4 touch-pan-y sm:-ml-5">
              {freeClassPosters.map((poster, index) => {
                const waUrl = `https://wa.me/628212259967?text=${encodeURIComponent(`Halo!, saya ingin bergabung Kelas Gratis ${poster.courseName}!.`)}`;

                return (
                  <motion.article
                    key={poster.id}
                    initial={{opacity: 0, y: 18}}
                    whileInView={{opacity: 1, y: 0}}
                    viewport={{once: true, amount: 0.2}}
                    transition={{duration: 0.45, delay: index * 0.08}}
                    className="min-w-0 flex-[0_0_86%] pl-4 sm:flex-[0_0_50%] sm:pl-5 md:flex-[0_0_33.333%]"
                  >
                    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-900/10">
                      <div className="relative aspect-[5/6] w-full bg-slate-100 sm:aspect-3/4">
                        <Image
                          src={poster.src}
                          alt={poster.alt}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 82vw, (max-width: 768px) 48vw, 32vw"
                          draggable={false}
                        />
                      </div>
                      <div className="p-3 sm:p-5">
                        <h3 className="text-base font-bold text-slate-900 sm:text-lg">{poster.courseName}</h3>
                        <p className="mt-2 hidden min-h-12 text-sm leading-relaxed text-slate-600 sm:block">{poster.detail}</p>
                        <a
                          href={waUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#20bd5a] hover:shadow-lg hover:shadow-[#25D366]/20 sm:mt-4 sm:py-2.5"
                        >
                          <FaWhatsapp size={17} />
                          Daftar kelas ini
                        </a>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>

          <button
            type="button"
            onClick={scrollPrev}
            disabled={selectedIndex === 0}
            className="absolute -left-5 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-lg shadow-slate-900/10 transition hover:border-brand-400 hover:text-brand-700 disabled:pointer-events-none disabled:opacity-30 lg:flex"
            aria-label="Kelas sebelumnya"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            type="button"
            onClick={scrollNext}
            disabled={selectedIndex >= freeClassPosters.length - 1}
            className="absolute -right-5 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-lg shadow-slate-900/10 transition hover:border-brand-400 hover:text-brand-700 disabled:pointer-events-none disabled:opacity-30 lg:flex"
            aria-label="Kelas berikutnya"
          >
            <ChevronRight size={22} />
          </button>

          <div className="mt-6 flex items-center justify-center gap-2 lg:hidden" aria-label="Navigasi kelas gratis">
            {freeClassPosters.map((poster, index) => (
              <button
                key={poster.id}
                type="button"
                onClick={() => emblaApi?.scrollTo(index)}
                aria-label={`Buka ${poster.courseName}`}
                className={`h-2 rounded-full transition-all ${
                  selectedIndex === index ? "w-6 bg-brand-500" : "w-2 bg-slate-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
