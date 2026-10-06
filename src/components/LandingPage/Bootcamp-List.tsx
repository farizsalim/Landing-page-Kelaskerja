"use client";

import { useState } from "react";
import {
  FadeInUp,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion-wrapper";
import {bootcamps} from "@/data/bootcamp";
import {motion} from "framer-motion";
import Image from "next/image";
import {ArrowUpRight, CheckCircle2, Clock3, Users} from "lucide-react";
import Link from "next/link";

const getMentorPhoto = (name: string) => {
  const lower = name.toLowerCase();
  if (lower.includes("arini")) return "/mentors/arini_formal.png";
  if (lower.includes("ricky")) return "/mentors/ricky.jpeg";
  if (lower.includes("bagas")) return "/mentors/bagas.JPG";
  if (lower.includes("ikhwan")) return "/mentors/hadi-v1.png";
  if (lower.includes("riri") || lower.includes("rini")) return "/mentors/rini-v1.png";
  if (lower.includes("diego") || lower.includes("tutor ahli") || lower.includes("praktisi")) return "/mentors/Diego.jpeg";
  if (lower.includes("edward")) return "/mentors/edward.jpeg";
  return null;
};

const readyBootcamps = ["digital-marketing", "smart-creator"];

const categories = ["Semua", ...Array.from(new Set(bootcamps.map(b => b.category)))];

const BootcampList = () => {
  const [activeCategory, setActiveCategory] = useState("Semua");

  const filteredBootcamps = bootcamps.filter(bootcamp => 
    activeCategory === "Semua" ? true : bootcamp.category === activeCategory
  );

  return (
    <section id="bootcamp" className="section-light scroll-mt-24 border-y border-slate-200 px-5 py-14 sm:px-6 sm:py-18 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <FadeInUp>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">
              Semua program bootcamp
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Pilih bootcamp yang <span className="text-brand-700">sesuai tujuanmu.</span>
            </h2>
            <p className="mt-4 max-w-xl leading-relaxed text-slate-600">
              Bandingkan fokus belajar, mentor, harga, dan status program sebelum memilih kelas yang paling sesuai.
            </p>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-slate-500 lg:text-right">
              Semua program dirancang bersama mentor yang memahami kebutuhan dunia kerja.
            </p>
          </div>
        </FadeInUp>

        <FadeInUp>
          <div className="mt-8 flex items-center justify-start gap-2.5 overflow-x-auto pb-2 sm:flex-wrap sm:overflow-visible sm:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`whitespace-nowrap rounded-full px-5 py-2 text-sm font-semibold transition-all border ${
                  activeCategory === category
                    ? "border-brand-500 bg-brand-500 text-[#1e2024] shadow-md shadow-brand-500/20"
                    : "border-slate-200 bg-white text-slate-600 hover:border-brand-400 hover:bg-brand-50 hover:text-slate-900"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </FadeInUp>

        <StaggerContainer key={activeCategory} className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredBootcamps.map((bootcamp) => (
            <StaggerItem key={bootcamp.id} className="h-full">
              <Link href={`/bootcamp/${bootcamp.slug}`} className="block h-full">
                <motion.article
                  whileHover={{
                    y: -6,
                    boxShadow: "0 24px 45px -18px rgba(0, 0, 0, 0.65)",
                  }}
                  transition={{type: "spring", stiffness: 300, damping: 20}}
                  className="flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg shadow-slate-900/5">
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                    <motion.div
                      whileHover={{scale: 1.06}}
                      transition={{duration: 0.5}}
                      className="relative h-full w-full">
                      <Image
                        src={bootcamp.image}
                        alt={bootcamp.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        className="object-cover object-center"
                      />
                    </motion.div>
                  </div>
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <div className="flex flex-col gap-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-800">
                          {bootcamp.category}
                        </span>
                        <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${readyBootcamps.includes(bootcamp.slug) ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                          {readyBootcamps.includes(bootcamp.slug) ? <CheckCircle2 size={13} /> : <Clock3 size={13} />}
                          {readyBootcamps.includes(bootcamp.slug) ? "Tersedia" : "Segera Hadir"}
                        </span>
                      </div>
                      <h3 className="line-clamp-2 text-xl font-semibold leading-tight text-slate-900">
                        {bootcamp.title}
                      </h3>
                    </div>
                    <p className="mt-4 line-clamp-2 grow leading-relaxed text-slate-600">
                      {bootcamp.description}
                    </p>
                    <div className="mt-auto">
                      <div className="mt-5 flex items-center gap-2.5 text-sm font-medium text-slate-700">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-slate-100">
                          {getMentorPhoto(bootcamp.mentor) ? (
                            <Image
                              src={getMentorPhoto(bootcamp.mentor)!}
                              alt={bootcamp.mentor}
                              width={28}
                              height={28}
                              className="h-full w-full object-cover object-top"
                            />
                          ) : (
                            <Users size={14} className="text-slate-400" />
                          )}
                        </div>
                        <span className="line-clamp-2">
                          Mentor: {bootcamp.mentor}
                        </span>
                      </div>
                      <div className="mt-5 flex flex-col items-start gap-3 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <p className="text-sm font-medium text-slate-500">
                            Mulai dari
                          </p>
                          {bootcamp.oldPrice && (
                              <p className="text-sm font-medium text-slate-400 line-through">
                              Rp{bootcamp.oldPrice.toLocaleString("id-ID")}
                            </p>
                          )}
                          <p className="text-2xl font-semibold text-slate-900">
                            Rp{bootcamp.newPrice.toLocaleString("id-ID")}
                          </p>
                        </div>

                        <span className="group inline-flex w-full items-center justify-center rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-[#1e2024] transition hover:bg-brand-400 sm:w-auto sm:justify-start">
                          Lihat Detail
                          <ArrowUpRight
                            size={16}
                            className="ml-1 transition-transform group-hover:translate-x-1"
                          />
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.article>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default BootcampList;
