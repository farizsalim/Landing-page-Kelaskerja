"use client";

import {registrationSteps} from "@/data/registration-steps";
import {
  FadeInUp,
  StaggerContainer,
  StaggerItem,
  motion,
} from "../motion-wrapper";
import {
  MessageCircle,
  ClipboardList,
  CreditCard,
  Users,
  PartyPopper,
  GraduationCap,
  ChevronRight,
} from "lucide-react";
import {useState} from "react";
import ConsultationQuiz from "./ConsultationQuiz";

const iconMap: Record<string, React.ElementType> = {
  MessageCircle,
  ClipboardList,
  CreditCard,
  Users,
  PartyPopper,
  GraduationCap,
};

const registrationPhases = [
  {
    number: "01",
    title: "Konsultasi & pilih program",
    description: "Kenali kebutuhanmu lalu pilih jalur belajar yang paling sesuai.",
    icon: MessageCircle,
    steps: registrationSteps.slice(0, 1),
  },
  {
    number: "02",
    title: "Lengkapi pendaftaran",
    description: "Isi data yang dibutuhkan agar tim dapat menyiapkan proses belajarmu.",
    icon: ClipboardList,
    steps: registrationSteps.slice(1, 2),
  },
  {
    number: "03",
    title: "Validasi & amankan kursi",
    description: "Selesaikan pembayaran, lalu masuk ke grup koordinasi batch.",
    icon: CreditCard,
    steps: registrationSteps.slice(2, 4),
  },
  {
    number: "04",
    title: "Siap mulai belajar",
    description: "Akses LMS, terima Welcome Kit, dan mulai kelas bersama batch-mu.",
    icon: GraduationCap,
    steps: registrationSteps.slice(4, 6),
  },
];

const RegistrationSteps = ({whatsappLink}: {whatsappLink: string}) => {
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  return (
    <>
      <section
        id="registration"
        className="section-dark border-y border-white/10 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
        <FadeInUp>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-300">
              Cara Mendaftar
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Mulai perjalananmu dalam 4 tahap
            </h2>
            <p className="mt-4 text-white/60">
              Proses pendaftaran bootcamp yang mudah dan transparan — dari
              konsultasi hingga mulai belajar.
            </p>
          </div>
        </FadeInUp>

        <StaggerContainer className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-3">
          {registrationPhases.map((phase, phaseIndex) => {
            const Icon = phase.icon;
            return (
              <StaggerItem key={phase.number} className="relative h-full">
                <motion.div
                  whileHover={{
                    y: -4,
                    boxShadow: "0 20px 40px -12px rgba(255, 178, 2, 0.12)",
                  }}
                  transition={{type: "spring", stiffness: 300, damping: 20}}
                  className="group relative flex h-full flex-col rounded-2xl border border-white/15 bg-[#25282c] p-5 shadow-[0_18px_40px_-24px_rgba(0,0,0,0.85)] transition-colors hover:border-brand-400/50 hover:bg-[#2b2f34] sm:p-6">
                  <div className="mb-6 flex items-start justify-between gap-3">
                    <motion.div
                      whileHover={{scale: 1.1, rotate: 5}}
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-500 text-[#1e2024] shadow-md shadow-brand-600/20">
                      <Icon size={22} />
                    </motion.div>
                    <div className="font-mono text-xs font-bold tracking-widest text-brand-300/80">
                      {phase.number}
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold leading-snug text-white">{phase.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/65">{phase.description}</p>

                  <div className="mt-6 border-t border-white/15 pt-4">
                    {phase.steps.map((step) => {
                      const StepIcon = iconMap[step.icon] || MessageCircle;
                      return (
                        <div key={step.step} className="flex items-start gap-2.5 text-xs leading-relaxed text-white/55">
                          <StepIcon size={14} className="mt-0.5 shrink-0 text-brand-300" />
                          <span>{step.title}</span>
                        </div>
                      );
                    })}
                  </div>
                  {phaseIndex < registrationPhases.length - 1 && (
                    <div className="absolute -right-3 top-1/2 z-10 hidden text-brand-300 lg:block">
                      <ChevronRight size={20} />
                    </div>
                  )}
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* CTA */}
        <FadeInUp delay={0.3}>
          <div className="mt-10 text-center">
            <button
              type="button"
              onClick={() => setIsQuizOpen(true)}
              className="group inline-flex items-center rounded-full bg-brand-600 px-6 py-3.5 font-semibold text-white transition hover:bg-brand-700 hover:shadow-lg hover:shadow-brand-600/25">
              Cari Kelas yang Cocok
              <ChevronRight
                className="ml-2 transition-transform group-hover:translate-x-1"
                size={18}
              />
            </button>
          </div>
        </FadeInUp>
        </div>
      </section>
      <ConsultationQuiz
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        whatsappLink={whatsappLink}
      />
    </>
  );
};

export default RegistrationSteps;
