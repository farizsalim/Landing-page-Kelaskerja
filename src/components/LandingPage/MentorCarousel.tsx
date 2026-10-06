"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Briefcase, Award, Building2 } from "lucide-react";
import { bootcamps } from "@/data/bootcamp";

// Helper function to get mentor photo
const getMentorPhoto = (name: string) => {
  const lower = name.toLowerCase();
  if (lower.includes("arini")) return "/mentors/arini_formal.png";
  if (lower.includes("ricky")) return "/mentors/ricky.jpeg";
  if (lower.includes("bagas")) return "/mentors/bagas.JPG";
  if (lower.includes("ikhwan")) return "/mentors/hadi-v1.png";
  if (lower.includes("riri") || lower.includes("rini")) return "/mentors/rini-v1.png";
  if (lower.includes("diego") || lower.includes("tutor ahli") || lower.includes("praktisi")) return "/mentors/Diego.jpeg";
  if (lower.includes("edward")) return "/mentors/edward.jpeg";
  return "/mentors/rini-v1.png"; // fallback
};

// Map bootcamps to mentor data
const mentorsData = bootcamps.map(b => ({
  id: b.id,
  name: b.mentor,
  role: b.title,
  photo: getMentorPhoto(b.mentor),
  experienceTitle: b.experience,
  achievements: b.mentorAchievements || [],
  logos: b.experienceLogos || []
}));

export default function MentorCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const slideVariants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0
      };
    }
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let newIndex = prevIndex + newDirection;
      if (newIndex < 0) newIndex = mentorsData.length - 1;
      if (newIndex >= mentorsData.length) newIndex = 0;
      return newIndex;
    });
  };

  const activeMentor = mentorsData[currentIndex];

  return (
    <section className="section-light relative overflow-hidden border-t border-slate-200 py-14 sm:py-20 lg:py-28">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:mb-12 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">
              Mentor & praktisi
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Belajar dari orang yang <span className="text-brand-700">benar-benar mengerjakannya.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-slate-500 lg:text-right">
            Setiap kelas dibawakan oleh praktisi aktif dengan pengalaman yang bisa langsung kamu bawa ke pekerjaan dan proyek nyata.
          </p>
        </div>

        <div className="relative w-full max-w-5xl mx-auto overflow-hidden">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);

                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
              className="w-full flex flex-col items-center gap-6 border-y border-slate-200 bg-white py-6 sm:gap-8 sm:py-8 md:flex-row md:gap-12 md:py-10"
            >
              {/* Photo Side */}
              <div className="relative mx-auto aspect-[4/3] w-full max-w-85 shrink-0 overflow-hidden rounded-xl bg-slate-100 md:aspect-[3/4] md:max-w-none md:w-[36%]">
                <Image
                  src={activeMentor.photo}
                  alt={activeMentor.name}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>

              {/* Info Side */}
              <div className="flex h-full w-full flex-col justify-center md:w-[64%]">
                <div className="mb-4 flex items-center justify-between gap-4 sm:mb-5">
                  <div className="inline-flex w-fit items-center rounded-full bg-brand-50 px-3 py-1 text-sm font-semibold text-brand-800">
                  {activeMentor.role}
                  </div>
                  <span className="font-mono text-xs font-semibold tracking-widest text-slate-400">
                    {String(currentIndex + 1).padStart(2, "0")} / {String(mentorsData.length).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mb-1 text-2xl font-bold text-slate-900 sm:mb-2 sm:text-3xl md:text-4xl">
                  {activeMentor.name}
                </h3>
                <p className="mb-5 flex items-center gap-2 text-sm font-medium text-slate-600 sm:mb-7 sm:text-lg">
                  <Briefcase size={18} className="shrink-0 text-brand-700" />
                  {activeMentor.experienceTitle}
                </p>
                
                <div className="space-y-6">
                  {activeMentor.achievements.length > 0 && (
                    <div>
                      <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">
                        <Award size={18} className="text-brand-700" />
                        Pengalaman yang dibawa ke kelas
                      </h4>
                      <ul className="space-y-2">
                        {activeMentor.achievements.slice(0, 3).map((achieve, idx) => (
                          <li key={idx} className={`flex items-start gap-3 text-slate-600 ${idx > 1 ? "hidden md:flex" : ""}`}>
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-600" />
                            <span className="text-sm leading-relaxed sm:text-base">{achieve}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {activeMentor.logos.length > 0 && (
                    <div>
                      <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">
                        <Building2 size={18} className="text-brand-700" />
                        Pernah berkarya di
                      </h4>
                      <div className="flex max-w-full flex-nowrap items-center gap-4 overflow-x-auto rounded-xl border border-slate-200 bg-slate-50 p-3 sm:flex-wrap sm:overflow-visible sm:p-4">
                        {activeMentor.logos.map((logo, idx) => (
                          <div key={idx} className="relative h-8 w-auto min-w-15 shrink-0 sm:h-10">
                            <Image
                              src={logo.src}
                              alt={logo.alt}
                              width={120}
                              height={40}
                              className="h-full w-auto object-contain"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Controls */}
        <div className="mt-5 flex items-center justify-center gap-3 sm:mt-8 sm:gap-4">
          <button
            onClick={() => paginate(-1)}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition-all hover:border-brand-500 hover:text-brand-700 active:scale-95"
            aria-label="Previous mentor"
          >
            <ChevronLeft size={24} />
          </button>
          
          <div className="flex items-center gap-2 flex-wrap justify-center max-w-50 sm:max-w-none">
            {mentorsData.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setDirection(idx > currentIndex ? 1 : -1);
                  setCurrentIndex(idx);
                }}
                className={`h-2 transition-all rounded-full ${
                    currentIndex === idx ? "w-8 bg-brand-600" : "w-2 bg-slate-300 hover:bg-slate-400"
                }`}
                aria-label={`Go to mentor ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => paginate(1)}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition-all hover:border-brand-500 hover:text-brand-700 active:scale-95"
            aria-label="Next mentor"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
}
