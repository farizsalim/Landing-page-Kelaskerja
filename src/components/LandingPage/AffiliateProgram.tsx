"use client";

import {affiliateSteps} from "@/data/affiliate-steps";
import {
  FadeInUp,
  FadeInRight,
  StaggerContainer,
  StaggerItem,
  motion,
} from "../motion-wrapper";
import Image from "next/image";
import {
  UserPlus,
  Ticket,
  Share2,
  BarChart3,
  Wallet,
  Sparkles,
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  UserPlus,
  Ticket,
  Share2,
  BarChart3,
  Wallet,
};

const AffiliateProgram = () => {
  return (
    <section id="affiliate" className="section-dark border-y border-white/10 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header with highlight banner */}
        <FadeInUp>
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-brand-400/15 px-4 py-1.5 text-sm font-semibold text-brand-300">
              <Sparkles size={14} />
              Program Afiliasi
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ajak teman, dapatkan komisi hingga{" "}
                <span className="text-brand-300">
                Rp500.000
              </span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-white/60">
              Bagikan link referral dan dapatkan komisi untuk setiap siswa yang mendaftar melalui kode unikmu. Tanpa modal, tanpa risiko.
            </p>
          </div>
        </FadeInUp>

        {/* Two-column layout: steps + highlight card */}
        <div className="mt-12 grid gap-8 lg:grid-cols-[7fr_5fr] lg:items-center">
          {/* Steps */}
          <StaggerContainer className="space-y-4">
            {affiliateSteps.map((step) => {
              const Icon = iconMap[step.icon] || UserPlus;
              return (
                <StaggerItem key={step.step}>
                  <motion.div
                    whileHover={{
                      x: 4,
                      boxShadow: "0 8px 30px -8px rgba(255, 178, 2, 0.1)",
                    }}
                    transition={{type: "spring", stiffness: 300, damping: 20}}
                    className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-lg shadow-black/20 transition-transform hover:-translate-y-1 hover:border-brand-300 hover:shadow-xl sm:gap-5 sm:p-6">
                    <motion.div
                      whileHover={{scale: 1.1, rotate: -5}}
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-500 text-[#1e2024] shadow-md sm:h-14 sm:w-14">
                      <Icon size={24} />
                    </motion.div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-300 text-xs font-bold text-[#1e2024]">
                          {step.step}
                        </span>
                        <h3 className="text-base font-semibold text-slate-900 sm:text-lg">
                          {step.title}
                        </h3>
                      </div>
                      <p className="mt-1 text-xs leading-relaxed text-slate-600 sm:mt-2 sm:text-sm">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>

          {/* Highlight card */}
          <FadeInRight delay={0.2}>
            <div className="relative flex min-h-100 items-center overflow-hidden rounded-3xl border border-brand-300/20 bg-[#25282c] p-7 text-white shadow-2xl shadow-black/20 sm:p-10">
              
              <div className="relative z-10 w-full">
                <div className="relative z-10 max-w-[72%] sm:max-w-[60%]">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/70 sm:text-sm">
                    KOMISI PER SISWA
                  </p>
                  <p className="mt-2 text-3xl font-bold tracking-tight text-brand-300 sm:text-4xl">
                    Rp500.000
                  </p>
                  <p className="mt-5 text-sm leading-relaxed text-white/60 sm:mt-6 sm:text-base">
                    Cair setiap tanggal 25. Tidak ada batas maksimal komisi: semakin banyak referral, semakin besar penghasilanmu.
                  </p>

                  <div className="mt-8 space-y-3">
                    <div className="flex items-center gap-3 text-sm text-white/75 sm:text-base">
                      <div className="h-2.5 w-2.5 rounded-full bg-brand-300" />
                      Pendaftaran Gratis
                    </div>
                    <div className="flex items-center gap-3 text-sm text-white/75 sm:text-base">
                      <div className="h-2.5 w-2.5 rounded-full bg-brand-300" />
                      Voucher berlaku 60 hari
                    </div>
                    <div className="flex items-center gap-3 text-sm text-white/75 sm:text-base">
                      <div className="h-2.5 w-2.5 rounded-full bg-brand-300" />
                      Dasbor transparan
                    </div>
                  </div>
                </div>
              </div>

              {/* Absolute Image */}
              <div className="pointer-events-none absolute bottom-0 right-0 z-0 w-[38%] sm:w-60 lg:w-65">
                <Image 
                  src="/mentors/talent-afiliasi.png"
                  alt="Affiliate Talent"
                  width={400}
                  height={500}
                  className="w-full h-auto object-contain object-bottom"
                />
              </div>

            </div>
          </FadeInRight>
        </div>
      </div>
    </section>
  );
};

export default AffiliateProgram;
