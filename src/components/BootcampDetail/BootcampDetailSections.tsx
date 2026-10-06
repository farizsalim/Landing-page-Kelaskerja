"use client";

import { Bootcamp } from "@/types";
import Image from "next/image";
import { ChevronDown, Video, FileText, Banknote, Users, Briefcase, Target, CheckCircle2, Play, ArrowRight } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import CountUp from "react-countup";

const AnimatedStatNumber = ({ value }: { value: string }) => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const match = value.match(/(\D*)(\d+)(\D*)/);
  if (!match) return <>{value}</>;

  const prefix = match[1] || "";
  const end = parseInt(match[2], 10);
  const suffix = match[3] || "";

  if (!mounted) {
    return <>{value}</>;
  }

  return (
    <CountUp 
      start={0} 
      end={end} 
      duration={2.5} 
      prefix={prefix} 
      suffix={suffix} 
      autoAnimate 
      autoAnimateOnce 
    />
  );
};

const IconMap: Record<string, React.ElementType> = {
  Video, FileText, Banknote, Users, Briefcase, Target
};

export const HeroSection = ({ bootcamp }: { bootcamp: Bootcamp }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }, 10);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative overflow-hidden bg-slate-900 pt-32 pb-10 text-white sm:pt-40 sm:pb-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1">
            <span className="inline-block rounded-full bg-brand-500/20 px-3 py-1 text-sm font-semibold text-brand-400 mb-4">
              {bootcamp.category} Bootcamp
            </span>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl mb-6 leading-tight max-w-5xl">
              {bootcamp.title}
            </h1>
            <p className="text-lg text-slate-300 mb-8 max-w-3xl leading-relaxed">
              {bootcamp.description}
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#pricing" className="rounded-full bg-brand-600 px-6 py-3 font-semibold text-white transition hover:bg-brand-500">
                Daftar Sekarang
              </a>
              <a href="#curriculum" className="rounded-full bg-slate-800 px-6 py-3 font-semibold text-white transition hover:bg-slate-700">
                Lihat Kurikulum
              </a>
              {bootcamp.syllabus && (
                <a href={bootcamp.syllabus} download target="_blank" rel="noopener noreferrer" className="rounded-full bg-white px-6 py-3 font-semibold text-slate-900 shadow-sm transition hover:bg-slate-100">
                  Download Silabus
                </a>
              )}
            </div>
          </div>

          <div className="w-full lg:w-5/12 shrink-0 mt-12 lg:mt-0 relative z-10">
            {/* Glowing effect behind the transparent image */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-80 sm:h-80 bg-brand-500/10 rounded-full blur-[80px] pointer-events-none" />

            <div className="relative aspect-square sm:aspect-auto sm:h-125 w-full max-w-lg mx-auto lg:mx-0 lg:ml-auto transform scale-[1.3] origin-bottom -translate-y-8">
              <Image
                src="/mentors/talent-new-v2.png"
                alt="Peserta KelasKerja"
                fill
                className="object-contain object-bottom drop-shadow-[0_15px_35px_rgba(0,0,0,0.4)]"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const SectionNav = () => {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["about", "prospek", "usp", "journey", "curriculum", "mentor", "pricing", "faq"];
      let current = "";

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200) {
            current = section;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      // Offset by 60px to account for the SectionNav's own height
      const y = element.getBoundingClientRect().top + window.scrollY - 60;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const navItems = [
    { id: "about", label: "Tentang" },
    { id: "prospek", label: "Prospek" },
    { id: "usp", label: "Keunggulan" },
    { id: "journey", label: "Perjalanan" },
    { id: "curriculum", label: "Kurikulum" },
    { id: "mentor", label: "Mentor" },
    { id: "pricing", label: "Paket" },
    { id: "faq", label: "FAQ" }
  ];

  return (
    <div className="sticky top-0 z-50 w-full bg-white border-y border-slate-200 shadow-sm overflow-x-auto scrollbar-hide">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ul className="flex items-center gap-8 whitespace-nowrap">
          {navItems.map((item) => (
            <li key={item.id} className="flex">
              <a
                href={`#${item.id}`}
                onClick={(e) => handleClick(e, item.id)}
                className={`font-semibold text-sm transition border-b-2 py-4 px-1 -mb-px ${activeSection === item.id || (!activeSection && item.id === "about")
                    ? "border-brand-600 text-brand-600"
                    : "border-transparent text-slate-500 hover:text-slate-900 hover:border-slate-300"
                  }`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export const AboutSection = ({ bootcamp }: { bootcamp: Bootcamp }) => {
  if (!bootcamp.about) return null;
  return (
    <section id="about" className="py-10 sm:py-16 bg-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Tentang Program</h2>
            <div className="space-y-4 text-lg text-slate-600">
              {bootcamp.about.description.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {bootcamp.about.statistics.map((stat, i) => (
              <motion.div
                key={i}
                animate={{ y: [0, -10, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 3,
                  ease: "easeInOut",
                  delay: i * 0.2
                }}
                className="rounded-2xl bg-slate-50 p-6 border border-slate-100 flex flex-col items-center text-center justify-center"
              >
                <p className="text-4xl font-black text-brand-500 mb-2">
                  <AnimatedStatNumber value={stat.value} />
                </p>
                <p className="font-semibold text-slate-700">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export const CareerSection = ({ bootcamp }: { bootcamp: Bootcamp }) => {
  // ── Dot pagination for career cards ──
  const [careerEmblaRef, careerEmblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    dragFree: false,
    slidesToScroll: 1,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!careerEmblaApi) return;
    setSelectedIndex(careerEmblaApi.selectedScrollSnap());
  }, [careerEmblaApi]);

  useEffect(() => {
    if (!careerEmblaApi) return;
    careerEmblaApi.on("select", onSelect);
    return () => { careerEmblaApi.off("select", onSelect); };
  }, [careerEmblaApi, onSelect]);

  // ── Hiring partners marquee ──
  const [combinedLogos, setCombinedLogos] = useState(() => {
    return bootcamp.hiringPartners ? [...bootcamp.hiringPartners] : [];
  });

  useEffect(() => {
    // Dibungkus setTimeout (async) untuk menghindari error "Calling setState synchronously within an effect"
    const timer = setTimeout(() => {
      setCombinedLogos(prev => {
        const all = [...prev];
        // Math.random di dalam effect, sehingga tidak melanggar aturan "impure function in render (useMemo)"
        for (let i = all.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [all[i], all[j]] = [all[j], all[i]];
        }
        return all;
      });
    }, 0);

    return () => clearTimeout(timer);
  }, [bootcamp.hiringPartners]);

  const marqueeItems = combinedLogos.length > 0 ? [...combinedLogos, ...combinedLogos, ...combinedLogos] : [];
  const [emblaRef] = useEmblaCarousel({ loop: true, dragFree: true }, [
    AutoScroll({ stopOnInteraction: false, speed: 1.5 }),
  ]);

  if (!bootcamp.careerSalaries || bootcamp.careerSalaries.length === 0) return null;
  return (
    <section id="prospek" className="py-10 sm:py-16 bg-slate-50 border-t border-slate-100">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-900">Prospek Karir & Estimasi Gaji</h2>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">Peluang karir yang menjanjikan setelah lulus dengan estimasi gaji standar pasar Indonesia.</p>
        </div>
        {/* Cards — Embla carousel, no native scrollbar */}
        <div className="overflow-hidden" ref={careerEmblaRef}>
          <div className="flex gap-6 items-stretch">
          {bootcamp.careerSalaries.map((career, i) => {
            const isFreelance = career.type === "freelance";
            return (
              <div key={i} className="w-75 sm:w-[320px] shrink-0 bg-white p-6 border border-slate-200 rounded-2xl flex flex-col gap-6 transition-transform hover:-translate-y-1 shadow-sm">
                {/* Logo Section */}
                <div className="flex items-center">
                  <img
                    src="/logos/job-street-logo-v1-removebg-preview.png"
                    alt="JobStreet"
                    className="h-15 w-auto object-contain"
                  />
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] font-bold text-brand-500 uppercase tracking-wider mb-1">Position</p>
                    <h3 className="font-semibold text-slate-900 text-base leading-tight">{career.role}</h3>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-brand-500 uppercase tracking-wider mb-1">Type of Job</p>
                    <p className="font-semibold text-slate-900 text-base leading-tight">{isFreelance ? "Freelance" : "Fulltime"}</p>
                  </div>
                </div>

                {/* Salary */}
                <div>
                  <p className="text-[10px] font-bold text-brand-500 uppercase tracking-wider mb-1">Range Salary</p>
                  <p className="font-semibold text-slate-900 text-lg">{career.salary}</p>
                </div>

                {/* CTA Button */}
                <a href={bootcamp.jobstreetLink || "#"} target="_blank" rel="noopener noreferrer" className="mt-auto w-full flex items-center justify-between bg-brand-500 hover:bg-brand-600 text-white px-5 py-3 rounded-lg font-medium text-sm transition-colors">
                  Lihat Informasi
                  <ArrowRight size={18} />
                </a>
              </div>
            );
          })}
          </div>
        </div>

        {/* Dot pagination */}
        {bootcamp.careerSalaries.length > 1 && (
          <div className="mt-5 flex justify-center gap-2">
            {bootcamp.careerSalaries.map((_, i) => (
              <button
                key={i}
                onClick={() => careerEmblaApi?.scrollTo(i)}
                aria-label={`Slide ${i + 1}`}
                className={`transition-all duration-300 rounded-full ${
                  i === selectedIndex
                    ? "w-6 h-2 bg-brand-500"
                    : "w-2 h-2 bg-slate-300 hover:bg-slate-400"
                }`}
              />
            ))}
          </div>
        )}

        {combinedLogos.length > 0 && (
          <div className="mt-12 pt-12 border-t border-slate-200">
            <div className="text-center max-w-4xl mx-auto mb-10">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Mulai Karir Impianmu</h3>
              <p className="text-lg text-slate-600 leading-relaxed">
                Selesai dari bootcamp ini, kamu yang telah dipersiapkan menjadi seorang <span className="font-bold text-brand-600">{bootcamp.title}</span> yang kompeten, akan memiliki peluang emas untuk diperebutkan oleh perusahaan-perusahaan top berikut:
              </p>
            </div>

            <div className="relative overflow-hidden">
              {/* Gradient masks on edges */}
              <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-linear-to-r from-slate-50 to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-linear-to-l from-slate-50 to-transparent" />

              <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex cursor-grab touch-pan-y active:cursor-grabbing">
                  {marqueeItems.map((partner, i) => (
                    <div key={`${partner.name}-${i}`} className="flex h-16 sm:h-20 w-44 min-w-0 shrink-0 items-center justify-center px-4 transition-transform duration-300 hover:scale-110">
                      <img src={partner.logo} alt={partner.name} title={partner.name} className="max-h-full max-w-full object-contain pointer-events-none" draggable={false} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export const USPSection = ({ bootcamp }: { bootcamp: Bootcamp }) => {
  if (!bootcamp.usp) return null;
  return (
    <section id="usp" className="py-10 sm:py-16 bg-slate-50 border-y border-slate-100">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-900">Kenapa Memilih Kelaskerja?</h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {bootcamp.usp.map((usp, i) => {
            const IconComponent = IconMap[usp.icon] || CheckCircle2;
            return (
              <motion.div
                key={i}
                animate={{ y: [0, -12, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                  ease: "easeInOut",
                  delay: i * 0.3
                }}
                className="flex flex-col items-center text-center p-6 bg-white rounded-3xl shadow-sm border border-slate-100"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 mb-4">
                  <IconComponent size={32} />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">{usp.title}</h3>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export const ToolsSection = ({ bootcamp }: { bootcamp: Bootcamp }) => {
  const [emblaRef] = useEmblaCarousel({ loop: true, dragFree: true }, [
    AutoScroll({ stopOnInteraction: false, speed: 1.5 }),
  ]);

  if (!bootcamp.tools || bootcamp.tools.length === 0) return null;

  return (
    <section id="tools" className="py-10 bg-slate-50 border-y border-slate-200">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-slate-900">Kuasai tools terbaru di industri!</h2>
        </div>

        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-linear-to-r from-slate-50 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-linear-to-l from-slate-50 to-transparent" />

          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex cursor-grab touch-pan-y active:cursor-grabbing items-center">
              {[...bootcamp.tools, ...bootcamp.tools, ...bootcamp.tools].map((tool, i) => (
                <div key={`${tool.name}-${i}`} className="flex flex-col py-4 w-40 sm:w-48 min-w-0 shrink-0 items-center justify-center px-4 transition-transform duration-300 hover:scale-110 mx-3 gap-4">
                  <div className="h-16 flex items-center justify-center mix-blend-multiply">
                    <img src={tool.logo} alt={tool.name} title={tool.name} className="max-h-full max-w-full object-contain pointer-events-none rounded-xl" draggable={false} />
                  </div>
                  <span className="text-sm font-semibold text-slate-700 text-center line-clamp-1 w-full">{tool.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const CurriculumSection = ({ bootcamp }: { bootcamp: Bootcamp }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  if (!bootcamp.curriculum) return null;

  return (
    <section id="curriculum" className="py-10 sm:py-16 bg-white">
      <div className="mx-auto max-w-3xl px-5 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">{bootcamp.curriculum.title}</h2>
          <p className="text-slate-600">Pelajari modul-modul komprehensif yang dirancang khusus sesuai dengan kebutuhan industri saat ini.</p>
        </div>
        <div className="space-y-4">
          {bootcamp.curriculum.modules.map((mod, i) => (
            <div key={i} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between bg-slate-50 px-6 py-5 text-left transition hover:bg-slate-100"
              >
                <span className="font-semibold text-slate-900">Modul {i + 1}: {mod.title}</span>
                <ChevronDown size={20} className={`text-slate-500 transition-transform ${openIndex === i ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 py-5 border-t border-slate-200">
                      <ul className="space-y-3">
                        {mod.materials.map((mat, j) => (
                          <li key={j} className="flex items-start gap-3 text-slate-600">
                            <CheckCircle2 size={20} className="shrink-0 text-brand-500 mt-0.5" />
                            <span>{mat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const getMentorPhoto = (mentorName: string) => {
  const map: Record<string, string> = {
    "Rini": "/mentors/rini.jpeg",
    "Bagas": "/mentors/bagas.JPG",
    "Arini Tathagati": "/mentors/arini_formal.png",
    "Ikhwanul Hadi": "/mentors/hadi-v1.png",
    "Miss Riri": "/mentors/rini-v1.png",
    "Diego Soryandana": "/mentors/Diego.jpeg",
    "Ricky P. Faizal": "/mentors/ricky.jpeg",
    "Ko Edward": "/mentors/edward.jpeg",
  };
  return map[mentorName] || null;
};

export const MentorSection = ({ bootcamp }: { bootcamp: Bootcamp }) => {
  const photo = getMentorPhoto(bootcamp.mentor);
  const hasAchievements = bootcamp.mentorAchievements && bootcamp.mentorAchievements.length > 0;
  const hasGallery = bootcamp.mentorGallery && bootcamp.mentorGallery.length > 0;
  const isSplit = hasAchievements || hasGallery;

  const [galleryRef] = useEmblaCarousel({ loop: true, align: "start", dragFree: true }, [
    AutoScroll({ stopOnInteraction: false, speed: 1 }),
  ]);

  return (
    <section id="mentor" className="py-12 sm:py-20 bg-slate-50">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className={`text-center mb-12 ${isSplit ? "md:text-left" : ""}`}>
          <h2 className="text-3xl font-bold text-slate-900">Belajar dari Expert Industri</h2>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto md:mx-0">Mentor kami adalah praktisi berpengalaman yang siap membimbingmu mencapai karir impian.</p>
        </div>

        <div className={`grid gap-10 items-start ${isSplit ? "md:grid-cols-[320px_1fr] lg:grid-cols-[350px_1fr]" : "place-items-center"}`}>
          {/* KIRI: Mentor Card */}
          <div className="w-full max-w-xs mx-auto md:mx-0 rounded-3xl bg-white shadow-md border border-slate-100 overflow-hidden flex flex-col transition-transform hover:-translate-y-1">
            {photo ? (
              <div className="relative h-64 w-full bg-slate-100">
                <Image src={photo} alt={bootcamp.mentor} fill className="object-cover object-[center_25%]" />
              </div>
            ) : (
              <div className="relative h-64 w-full bg-slate-100 flex items-center justify-center text-6xl font-bold text-slate-300">
                {bootcamp.mentor[0]}
              </div>
            )}
            <div className="p-6 text-center flex flex-col items-center">
              <h3 className="text-xl font-bold text-slate-900">{bootcamp.mentor}</h3>
              <p className="mt-3 text-sm text-brand-600 font-semibold bg-brand-50 px-4 py-1.5 rounded-full inline-block">{bootcamp.experience}</p>

              {bootcamp.mentorLinkedin && (
                <a
                  href={bootcamp.mentorLinkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Profil LinkedIn ${bootcamp.mentor}`}
                  className="mt-6 inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#0A66C2] text-white transition-all duration-200 hover:bg-[#004182] hover:scale-110 shadow-md shadow-[#0A66C2]/30"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              )}

              {bootcamp.experienceLogos && bootcamp.experienceLogos.length > 0 && (
                <div className="mt-8 pt-6 border-t border-slate-100 w-full">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
                    Pernah berkolaborasi dengan:
                  </p>
                  <div className="flex flex-wrap justify-center gap-4 items-center">
                    {bootcamp.experienceLogos.map((logo, i) => (
                      <div key={i} className="relative h-10 w-24 transition-transform duration-300 hover:scale-110">
                        <Image
                          src={logo.src}
                          alt={logo.alt}
                          fill
                          className="object-contain"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {isSplit && (
            <div className="flex flex-col gap-10 overflow-hidden">
              {/* Achievements */}
              {hasAchievements && (
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm">
                  <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                    <span className="w-10 h-10 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">
                      <Target size={20} />
                    </span>
                    Jejak Kolaborasi & Portofolio
                  </h3>
                  <ul className="space-y-4">
                    {bootcamp.mentorAchievements!.map((achieve, i) => (
                      <li key={i} className="flex items-start gap-4">
                        <CheckCircle2 size={22} className="shrink-0 text-green-500 mt-0.5" />
                        <span className="text-slate-700 leading-relaxed font-medium">{achieve}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Gallery Carousel */}
              {hasGallery && (
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-4 px-2">Dokumentasi & Testimoni</h3>
                  <div className="overflow-hidden" ref={galleryRef}>
                    <div className="flex cursor-grab touch-pan-y active:cursor-grabbing gap-4 px-2 pb-4">
                      {[...bootcamp.mentorGallery!, ...bootcamp.mentorGallery!, ...bootcamp.mentorGallery!].map((item, i) => {
                        const isObj = typeof item === 'object';
                        const imgSrc = isObj ? item.image : item;
                        const caption = isObj ? item.caption : undefined;
                        const link = isObj ? item.link : undefined;
                        const isVideo = isObj ? item.isVideo : false;
                        const isLocalMp4 = isVideo && imgSrc.toLowerCase().endsWith('.mp4');

                        const content = (
                          <div className="relative h-60 w-fit shrink-0 transition-transform duration-300 hover:scale-[1.02] group">
                            {isLocalMp4 ? (
                              <video src={imgSrc} className="h-full w-auto object-contain rounded-2xl border border-slate-200 shadow-sm" controls preload="metadata" />
                            ) : (
                              <>
                                <img src={imgSrc} alt={caption || `Gallery ${i}`} className="h-full w-auto object-contain pointer-events-none rounded-2xl border border-slate-200 shadow-sm" draggable={false} />
                                
                                {isVideo && (
                                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <div className="w-12 h-12 rounded-full bg-black/60 flex items-center justify-center text-white backdrop-blur-sm group-hover:bg-brand-600 transition-colors">
                                      <Play size={24} className="ml-1" fill="currentColor" />
                                    </div>
                                  </div>
                                )}
                              </>
                            )}

                            {caption && (
                              <div className="absolute inset-x-0 bottom-0 rounded-b-2xl bg-linear-to-t from-black/80 via-black/40 to-transparent p-4 pt-12 pointer-events-none flex items-end">
                                <p className="text-white text-sm font-semibold w-full text-center leading-snug">{caption}</p>
                              </div>
                            )}
                          </div>
                        );

                        return (
                          <div key={i} className="shrink-0">
                            {link ? (
                              <a href={link} target="_blank" rel="noopener noreferrer" className="block outline-none focus:ring-2 focus:ring-brand-500 rounded-2xl">
                                {content}
                              </a>
                            ) : (
                              content
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export const PortfolioSection = ({ bootcamp }: { bootcamp: Bootcamp }) => {
  if (!bootcamp.portfolios || bootcamp.portfolios.length === 0) return null;
  return (
    <section id="portfolio" className="py-10 sm:py-16 bg-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-900">Portofolio Alumni</h2>
          <p className="mt-4 text-slate-600">Hasil karya luar biasa dari para alumni bootcamp {bootcamp.title}</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {bootcamp.portfolios.map((port, i) => (
            <div key={i} className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
              <div className="aspect-video w-full overflow-hidden bg-slate-100">
                <Image src={port.image} alt={port.title} width={400} height={225} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-slate-900 mb-2 line-clamp-2">{port.title}</h3>
                <p className="text-sm text-slate-500">Oleh: {port.author}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const PricingSection = ({ bootcamp }: { bootcamp: Bootcamp }) => {
  return (
    <section id="pricing" className="py-10 sm:py-16 bg-slate-900 text-white">
      <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Investasi Untuk Masa Depanmu</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">Pilih paket yang sesuai dengan kebutuhanmu. Kami menyediakan opsi cicilan dan BNSP.</p>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-3xl bg-slate-800 p-8 border border-slate-700 relative overflow-hidden">
            <h3 className="text-2xl font-bold mb-2">Paket Classic</h3>
            <p className="text-slate-400 mb-6">Bootcamp intensif + penyaluran magang</p>
            <div className="mb-8">
              <span className="text-slate-500 line-through text-lg">Rp{bootcamp.oldPrice.toLocaleString("id-ID")}</span>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-brand-400">Rp{bootcamp.newPrice.toLocaleString("id-ID")}</span>
              </div>
            </div>
            <ul className="space-y-4 mb-8">
              {bootcamp.features.map((f, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-300">
                  <CheckCircle2 size={20} className="text-brand-400 shrink-0" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <a href="https://wa.me/628212259967?text=Halo%20saya%20ingin%20konsultasi" target="_blank" rel="noreferrer" className="block w-full rounded-full bg-white px-6 py-4 text-center font-bold text-slate-900 transition hover:bg-slate-200">
              Daftar Paket Classic
            </a>
          </div>
          {bootcamp.bnspPrice && (
            <div className="rounded-3xl bg-linear-to-b from-brand-600 to-brand-800 p-8 border border-brand-500 relative overflow-hidden shadow-2xl shadow-brand-900/50">
              <div className="absolute top-0 right-0 bg-slate-800/80 backdrop-blur-sm text-slate-300 text-xs font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider border-b border-l border-slate-700">
                Coming Soon
              </div>
              <h3 className="text-2xl font-bold mb-2">Paket BNSP</h3>
              <p className="text-brand-100 mb-6">Semua fitur Classic + Sertifikasi BNSP</p>
              <div className="mb-8">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-white">Rp{bootcamp.bnspPrice.toLocaleString("id-ID")}</span>
                </div>
              </div>
              <ul className="space-y-4 mb-8 opacity-80">
                {bootcamp.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-brand-50">
                    <CheckCircle2 size={20} className="text-brand-200 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
                <li className="flex items-center gap-3 text-white font-semibold">
                  <CheckCircle2 size={20} className="text-yellow-400 shrink-0" />
                  <span>Ujian & Sertifikat Resmi BNSP</span>
                </li>
              </ul>
              <button disabled className="block w-full rounded-full bg-brand-800/60 px-6 py-4 text-center font-bold text-brand-200/60 transition cursor-not-allowed border border-brand-500/30">
                Segera Hadir
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export const AlumniSection = ({ bootcamp }: { bootcamp: Bootcamp }) => {
  if (!bootcamp.alumniStories || bootcamp.alumniStories.length === 0) return null;
  return (
    <section id="alumni" className="py-10 sm:py-16 bg-slate-50 border-y border-slate-100">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-900">Cerita Sukses Alumni</h2>
        </div>
        <div className="grid gap-8 sm:grid-cols-2">
          {bootcamp.alumniStories.map((alumni, i) => (
            <div key={i} className="flex flex-col rounded-3xl bg-white p-8 shadow-sm border border-slate-100">
              <div className="mb-6 flex items-center gap-4">
                <div className="h-16 w-16 overflow-hidden rounded-full bg-slate-100">
                  <Image src={alumni.image} alt={alumni.name} width={64} height={64} className="h-full w-full object-cover" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">{alumni.name}</h3>
                  <p className="text-sm font-medium text-brand-600">{alumni.role}</p>
                </div>
              </div>
              <p className="text-slate-600 italic grow">{alumni.story}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const FAQSection = ({ bootcamp }: { bootcamp: Bootcamp }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  if (!bootcamp.faqs || bootcamp.faqs.length === 0) return null;

  return (
    <section id="faq" className="py-10 sm:py-16 bg-white">
      <div className="mx-auto max-w-3xl px-5 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-900">Pertanyaan yang Sering Diajukan</h2>
        </div>
        <div className="space-y-4">
          {bootcamp.faqs.map((faq, i) => (
            <div key={i} className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between px-6 py-5 text-left transition hover:bg-slate-50"
              >
                <span className="font-semibold text-slate-900">{faq.question}</span>
                <ChevronDown size={20} className={`text-slate-500 transition-transform ${openIndex === i ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 text-slate-600">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const JourneySection = ({ bootcamp }: { bootcamp: Bootcamp }) => {
  if (!bootcamp.journey) return null;
  return (
    <section id="journey" className="py-10 sm:py-16 bg-slate-50 border-t border-slate-100">
      <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Bootcamp Journey</h2>
          {bootcamp.journey.description && (
            <p className="text-slate-600 max-w-2xl mx-auto">{bootcamp.journey.description}</p>
          )}
        </div>
        <div className="relative border-l-2 border-brand-200 ml-4 md:ml-6 space-y-10">
          {bootcamp.journey.phases.map((phase, i) => (
            <div key={i} className="relative pl-8 md:pl-10">
              <div className="absolute -left-2.75 top-1 h-5 w-5 rounded-full bg-brand-500 border-4 border-white shadow-sm"></div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">{phase.title}</h3>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <ul className="space-y-3">
                  {phase.description.map((desc, j) => (
                    <li key={j} className="flex items-start gap-3 text-slate-600">
                      <CheckCircle2 size={20} className="shrink-0 text-brand-500 mt-0.5" />
                      <span>{desc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
