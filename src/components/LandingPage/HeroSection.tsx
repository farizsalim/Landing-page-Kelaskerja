"use client";

import { useState } from "react";
import { motion} from "@/components/motion-wrapper";
import {
  ArrowRight,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import {FaWhatsapp} from "react-icons/fa";
import ConsultationQuiz from "./ConsultationQuiz";

type HeroSectionProps = {
  whatsappLink: string;
};

const mentors = [
  { name: "Miss Riri", photo: "/mentors/rini-v1.png", role: "Public Speaking" },
  { name: "Bagas", photo: "/mentors/bagas.JPG", role: "Digital Marketing" },
  { name: "Arini Tathagati", photo: "/mentors/arini_formal.png", role: "HRGA" },
  { name: "Diego Soryandana", photo: "/mentors/Diego.jpeg", role: "Smart Creator" },
  { name: "Ikhwanul Hadi", photo: "/mentors/hadi-v1.png", role: "Marketplace Optimization Specialist" },
  { name: "Ricky P. Faizal", photo: "/mentors/ricky.jpeg", role: "Social Media Specialist" },
  { name: "Ko Edward", photo: "/mentors/edward.jpeg", role: "Retail & Franchise" },
];

/* Distribute mentors into 3 columns with slight variation */
const col1 = [mentors[0], mentors[1], mentors[2], mentors[3], mentors[4], mentors[5], mentors[6]];
const col2 = [mentors[2], mentors[4], mentors[6], mentors[0], mentors[5], mentors[1], mentors[3]];
const col3 = [mentors[6], mentors[5], mentors[3], mentors[1], mentors[0], mentors[4], mentors[2]];

/* ── Mentor Card Component ── */
const MentorCard = ({
  mentor,
  priority = false,
}: {
  mentor: typeof mentors[0];
  priority?: boolean;
}) => (
  <div className="mb-4 w-full overflow-hidden transition-transform hover:scale-[1.02]">
    <div className="relative aspect-3/4 w-full overflow-hidden rounded-2xl">
      <Image
        src={mentor.photo}
        alt={mentor.name}
        fill
        priority={priority}
        className="object-cover object-top"
        sizes="180px"
      />
    </div>
    <div className="px-3 py-2.5 text-center">
      <p className="text-sm font-semibold text-white truncate">{mentor.name}</p>
      <p className="text-xs text-brand-400 truncate">{mentor.role}</p>
    </div>
  </div>
);

/* ── Sliding Column Component ── */
const SlidingColumn = ({
  mentorList,
  direction,
  duration,
}: {
  mentorList: typeof mentors;
  direction: "up" | "down";
  duration: number;
}) => {
  // Duplicate the list to create seamless loop
  const items = [...mentorList, ...mentorList];
  return (
    <div className="relative h-full overflow-hidden">
      <div
        className={`flex flex-col ${direction === "up" ? "animate-slide-up" : "animate-slide-down"}`}
        style={{
          ["--duration" as string]: `${duration}s`,
        } as React.CSSProperties}
      >
        {items.map((mentor, i) => (
          <MentorCard
            key={`${mentor.name}-${i}`}
            mentor={mentor}
            priority={direction === "down" && i === 0}
          />
        ))}
      </div>
    </div>
  );
};

const HeroSection = ({whatsappLink}: HeroSectionProps) => {
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  return (
    <section
      id="hero"
      className="hero-section section-dark relative overflow-x-hidden pb-0 pt-2 sm:pt-4 lg:min-h-[calc(100svh-80px)] lg:pt-6">
      {/* ── Background decorations ── */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Radial glow */}
        <div className="absolute left-[-10%] top-[-20%] h-150 w-150 rounded-full bg-brand-600/10 blur-[120px]" />
        <div className="absolute right-[-5%] top-[30%] h-100 w-100 rounded-full bg-brand-500/8 blur-[100px]" />

        {/* Animated orbs */}
        <motion.div
          className="absolute left-[15%] top-[25%] h-2 w-2 rounded-full bg-brand-400/40 hidden sm:block will-change-transform"
          animate={{
            y: [0, -30, 0],
            opacity: [0.4, 1, 0.4],
          }}
          transition={{duration: 4, repeat: Infinity, ease: "easeInOut"}}
        />
        <motion.div
          className="absolute right-[25%] top-[15%] h-1.5 w-1.5 rounded-full bg-brand-300/30 hidden sm:block will-change-transform"
          animate={{
            y: [0, 20, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <motion.div
          className="absolute left-[40%] bottom-[30%] h-1 w-1 rounded-full bg-white/20 hidden sm:block will-change-transform"
          animate={{
            y: [0, -15, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />

        {/* Decorative curved lines */}
        <svg
          className="absolute inset-0 h-full w-full opacity-[0.04]"
          viewBox="0 0 1200 800"
          fill="none"
          preserveAspectRatio="none">
          <path
            d="M-100 400 C200 200, 500 600, 800 300 S1100 500, 1400 250"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-brand-400"
          />
          <path
            d="M-100 500 C300 350, 600 700, 900 400 S1200 600, 1500 350"
            stroke="currentColor"
            strokeWidth="1"
            className="text-brand-300"
          />
        </svg>
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 mx-auto w-full min-w-0 max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Subtle dot pattern overlay */}
        <div className="absolute inset-0 z-0 bg-[radial-gradient(#ffffff20_1px,transparent_1px)] bg-size-[24px_24px] opacity-30 mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_70%)"></div>
        
        <div className="relative z-10 grid w-full min-w-0 items-center gap-6 pb-8 pt-2 sm:gap-10 sm:pb-12 sm:pt-6 lg:min-h-[calc(100svh-80px)] lg:grid-cols-1 lg:gap-10 lg:pb-16 lg:pr-[50%] lg:pt-8">
          {/* ── LEFT: Text content ── */}
          <div className="relative z-20 flex w-full min-w-0 max-w-2xl flex-col items-center text-center lg:items-start lg:text-left">
              {/* Eyebrow */}
              <motion.div
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1]}}
                className="mb-4 inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-brand-300 sm:mb-5 sm:gap-2 sm:text-sm sm:tracking-[0.16em]">
                <Sparkles size={14} className="fill-brand-500/20 text-brand-400 sm:h-4 sm:w-4" />
                Skill untuk langkah karier berikutnya
              </motion.div>

              {/* Headline */}
              <motion.h1
                initial={{opacity: 0, y: 30}}
                animate={{opacity: 1, y: 0}}
                transition={{
                  duration: 0.7,
                  delay: 0.35,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="w-full max-w-2xl break-words text-[2.15rem] font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[3.85rem] lg:leading-[1.04]">
                Belajar dari awal, ditemenin sampai{" "}
                <span className="text-brand-400">siap kerja.</span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1]}}
                className="mt-4 max-w-md text-sm leading-relaxed text-white/65 sm:mt-6 sm:max-w-xl sm:text-lg">
                Bootcamp praktis untuk kamu yang ingin membangun skill, portfolio,
                dan percaya diri untuk melangkah ke karier baru. Belum tahu mulai
                dari mana? Ikuti quiz singkat untuk mendapat rekomendasi kelas.
              </motion.p>

              {/* CTA buttons */}
              <motion.div
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{
                  duration: 0.6,
                  delay: 0.65,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mt-6 flex w-full min-w-0 flex-col items-center justify-center gap-2.5 sm:mt-8 sm:w-auto sm:flex-row sm:gap-3 lg:justify-start">
                <button
                  type="button"
                  onClick={() => setIsQuizOpen(true)}
                  className="group inline-flex min-w-0 w-full items-center justify-center rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-[#1e2024] transition hover:-translate-y-0.5 hover:bg-brand-500 hover:shadow-lg hover:shadow-brand-600/30 sm:w-auto sm:px-7 sm:py-3.5 sm:text-base">
                  Ikuti Quiz Gratis{" "}
                  <ArrowRight
                    className="ml-2 transition-transform group-hover:translate-x-1"
                    size={18}
                  />
                </button>
                <Link
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-w-0 w-full items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-brand-400/40 hover:bg-white/10 hover:shadow-md sm:w-auto sm:px-7 sm:py-3.5 sm:text-base">
                  <FaWhatsapp size={17} />
                  Daftar Sekarang
                </Link>
              </motion.div>

              <p className="mt-3 text-center text-xs text-white/45 sm:text-left">
                Rekomendasi bootcamp dan konsultasi gratis sesuai kebutuhanmu.
              </p>

              {/* Proof points */}
              <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{duration: 0.6, delay: 0.85}}
                className="mt-6 grid w-full max-w-xl grid-cols-3 divide-x divide-white/10 border-y border-white/10 py-3 text-center sm:mt-8 sm:py-4 lg:text-left">
                {[
                  ["7+", "Pilihan bootcamp"],
                  ["100%", "Mentor praktisi"],
                  ["Nyata", "Project portfolio"],
                ].map(([value, label], i) => (
                  <motion.div
                    key={label}
                    initial={{opacity: 0, y: 8}}
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: 0.9 + i * 0.1, duration: 0.4}}
                    className="px-2 first:pl-0 last:pr-0 sm:px-3">
                    <p className="text-base font-bold text-white sm:text-lg">{value}</p>
                    <p className="mt-1 text-[10px] leading-tight text-white/50 sm:text-xs">{label}</p>
                  </motion.div>
                ))}
              </motion.div>
          </div>

          {/* ── RIGHT: Sliding Mentor Columns ── */}
          <motion.div
            initial={{opacity: 0, x: 40}}
            animate={{opacity: 1, x: 0}}
            transition={{duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1]}}
            className="relative z-0 mx-auto w-full min-w-0 max-w-105 lg:absolute lg:inset-y-0 lg:right-0 lg:h-full lg:w-[min(42vw,36rem)] lg:max-w-none"
          >
            <div
              className="relative h-[min(74vw,18rem)] min-h-60 overflow-hidden sm:h-96 sm:min-h-0 lg:h-full"
              style={{
                WebkitMaskImage:
                  "linear-gradient(to bottom, transparent 0%, black 11%, black 89%, transparent 100%), linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
                maskImage:
                  "linear-gradient(to bottom, transparent 0%, black 11%, black 89%, transparent 100%), linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
                WebkitMaskComposite: "source-in",
                maskComposite: "intersect",
              }}
            >

            <div className="flex h-full gap-2 px-1 sm:gap-3 sm:px-2 lg:gap-3 lg:px-8">
              {/* Column 1 — slides DOWN */}
              <div className="flex-1 overflow-hidden">
                <SlidingColumn mentorList={col1} direction="down" duration={30} />
              </div>
              {/* Column 2 — slides UP */}
              <div className="flex-1 overflow-hidden">
                <SlidingColumn mentorList={col2} direction="up" duration={28} />
              </div>
              {/* Column 3 — slides DOWN */}
              <div className="flex-1 overflow-hidden">
                <SlidingColumn mentorList={col3} direction="down" duration={32} />
              </div>
            </div>
            </div>
          </motion.div>
        </div>
      </div>

      <ConsultationQuiz
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        whatsappLink={whatsappLink}
      />
    </section>
  );
};

export default HeroSection;
