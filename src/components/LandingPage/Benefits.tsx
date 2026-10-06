"use client";

import {useState} from "react";
import {
  FadeInUp,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion-wrapper";
import {motion} from "framer-motion";
import {
  BadgeCheck,
  BookOpen,
  Brain,
  Clock3,
  GraduationCap,
  Sparkles,
  Users,
  ChevronDown,
} from "lucide-react";

const Benefits = () => {
  const [showAllBenefits, setShowAllBenefits] = useState(false);

  return (
    <section id="benefits" className="section-dark border-y border-white/10 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <FadeInUp>
          <div className="flex flex-col gap-5 border-b border-white/10 pb-10 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-300">
              Yang kamu dapatkan
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Bukan cuma kelas, tapi <span className="text-brand-300">bekal untuk mulai.</span>
            </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-white/60 md:text-right">
              Semua elemen program dirancang untuk membuat proses belajar terasa lebih terarah, praktis, dan dekat dengan kebutuhan kerja nyata.
            </p>
          </div>
        </FadeInUp>
        <StaggerContainer className="mt-8 grid gap-3 md:grid-cols-2 md:gap-4">
          {[
            {
              icon: Users,
              title: "Mentor Profesional",
              description:
                "Mentor profesional berkualitas dan berpengalaman sebagai praktisi.",
            },
            {
              icon: BookOpen,
              title: "Real Project Portfolio",
              description:
                "Bangun portofolio dari real-project yang terarah dan siap pakai.",
            },
            {
              icon: Clock3,
              title: "Pendampingan 24/7",
              description:
                "Pendampingan fasilitator dan mentor secara online, kapan saja.",
            },
            {
              icon: GraduationCap,
              title: "Penyaluran Magang",
              description:
                "Penyaluran magang ke perusahaan mitra untuk pengalaman kerja nyata.",
            },
            {
              icon: BadgeCheck,
              title: "Sertifikasi Kompetensi",
              description:
                "Dapatkan sertifikasi kompetensi yang diakui untuk menunjang karir.",
            },
            {
              icon: Sparkles,
              title: "Gratis Mengulang Batch",
              description:
                "Gratis mengulang batch apabila berhalangan hadir pada sesi kelas sebelumnya.",
            },
            {
              icon: Brain,
              title: "Konsultasi Psikis",
              description:
                "Fasilitas konsultasi dari sistem untuk menentukan pilihan kelas yang cocok dengan keinginan dan kemampuan siswa.",
            },
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <StaggerItem
                key={item.title}
                className={index > 3 && !showAllBenefits ? "hidden md:block" : "block"}
              >
                <motion.article
                  whileHover={{
                    y: -6,
                    boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.45)",
                  }}
                  transition={{type: "spring", stiffness: 300, damping: 20}}
                  className="group flex min-h-42 flex-col rounded-2xl border border-white/10 bg-white/6 p-5 text-left shadow-lg shadow-black/10 transition-colors hover:border-brand-400/40 hover:bg-white/10 sm:min-h-45 sm:p-6">
                  <div className="flex items-start justify-between gap-4">
                  <motion.div
                    whileHover={{rotate: [0, -10, 10, 0], scale: 1.1}}
                    transition={{duration: 0.5}}
                    className="inline-flex rounded-xl bg-brand-400/15 p-2.5 text-brand-300">
                    <Icon size={28} />
                  </motion.div>
                    <span className="font-mono text-xs font-semibold tracking-widest text-white/25 transition-colors group-hover:text-brand-300/70">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="mt-auto pt-6">
                    <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                    <p className="mt-2 max-w-md text-sm leading-relaxed text-white/65">{item.description}</p>
                  </div>
                </motion.article>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
        <button
          type="button"
          onClick={() => setShowAllBenefits((current) => !current)}
          className="mx-auto mt-7 flex items-center gap-2 rounded-full border border-white/20 px-4 py-2.5 text-sm font-semibold text-white/75 transition-colors hover:border-brand-400 hover:text-brand-300 md:hidden"
        >
          {showAllBenefits ? "Tampilkan lebih sedikit" : "Lihat benefit lainnya"}
          <ChevronDown
            size={16}
            className={`transition-transform ${showAllBenefits ? "rotate-180" : ""}`}
          />
        </button>
      </div>
    </section>
  );
};

export default Benefits;
