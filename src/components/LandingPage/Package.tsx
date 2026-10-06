import {packageOptions} from "@/data/package";
import {AnimatePresence, FadeInLeft, FadeInUp, motion} from "../motion-wrapper";
import Link from "next/link";
import {BadgeCheck, Sparkles} from "lucide-react";
import {FaWhatsapp} from "react-icons/fa";

type PackageProps = {
  activePackage: string;
  setActivePackage: (activePackage: string) => void;
  whatsappLink: string;
};

const Package = ({
  activePackage,
  setActivePackage,
  whatsappLink,
}: PackageProps) => {
  return (
    <section id="package" className="px-4 py-10 sm:py-16 sm:px-6 lg:px-8">
      <FadeInUp>
        <div className="mx-auto max-w-7xl rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <FadeInLeft>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">
                  Package
                </p>
                <h2 className="mt-2 text-3xl font-semibold text-slate-900 sm:text-4xl">
                  Pilih paket sesuai target kariermu
                </h2>
              </div>
            </FadeInLeft>
            <div className="flex flex-wrap gap-3">
              {packageOptions.map((item) => {
                const isBnsp = item.title === "BNSP";
                return (
                  <motion.button
                    key={item.title}
                    whileHover={{scale: 1.05}}
                    whileTap={{scale: 0.97}}
                    onClick={() => setActivePackage(item.title)}
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
                      activePackage === item.title
                        ? "bg-brand-600 text-white shadow-md shadow-brand-600/20"
                        : isBnsp
                          ? "bg-slate-100 italic text-slate-400 hover:text-slate-600"
                          : "bg-slate-100 text-slate-700 hover:bg-brand-50"
                    }`}>
                    {item.title}
                    {isBnsp && (
                      <span className="rounded-full bg-red-500 px-1.5 py-0.5 text-[10px] font-bold not-italic uppercase tracking-widest text-white">
                        Soon
                      </span>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>
          <div className="mt-8 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
            <FadeInLeft delay={0.1}>
              <div className="rounded-3xl bg-slate-50 p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">
                  Paket pilihan
                </p>
                <h3 className="mt-3 text-2xl font-semibold">{activePackage}</h3>
                <p className="mt-3 text-slate-600">
                  Dapatkan akses materi, konsultasi, dan dukungan selama
                  program.
                </p>
                <div className="mt-6 rounded-[20px] bg-white p-5 shadow-sm">
                  <p className="text-sm text-slate-500">Harga mulai</p>
                  <p className="mt-2 text-3xl font-semibold text-slate-900">
                    Rp
                    {packageOptions
                      .find((item) => item.title === activePackage)
                      ?.price.toLocaleString("id-ID")}
                  </p>
                  {activePackage === "BNSP" ? (
                    <div className="mt-5 flex items-start gap-3 rounded-2xl border border-amber-200 bg-linear-to-br from-amber-50 to-orange-50 px-4 py-3.5">
                      <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-100">
                        <Sparkles size={14} className="text-amber-500" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-semibold text-amber-800">Segera Hadir</p>
                          <span className="rounded-full bg-red-500 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-white">Soon</span>
                        </div>
                        <p className="mt-0.5 text-xs text-amber-600/80">Jalur BNSP sedang dalam persiapan.</p>
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={whatsappLink}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-5 inline-flex items-center gap-2 rounded-full bg-brand-600 px-5 py-3 font-semibold text-white transition hover:bg-brand-700 hover:shadow-lg hover:shadow-brand-600/25">
                      <FaWhatsapp size={17} />
                      Konsultasi Gratis
                    </Link>
                  )}
                </div>
              </div>
            </FadeInLeft>
            <div className="space-y-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePackage}
                  initial={{opacity: 0, y: 15}}
                  animate={{opacity: 1, y: 0}}
                  exit={{opacity: 0, y: -15}}
                  transition={{duration: 0.3}}
                  className="space-y-4">
                  {packageOptions
                    .find((item) => item.title === activePackage)
                    ?.features.map((feature, i) => (
                      <motion.div
                        key={feature}
                        initial={{opacity: 0, x: 20}}
                        animate={{opacity: 1, x: 0}}
                        transition={{delay: i * 0.06, duration: 0.35}}
                        whileHover={{x: 4}}
                        className="flex items-start gap-3 rounded-[20px] border border-slate-200 bg-white p-5 shadow-sm">
                        <BadgeCheck
                          className="mt-0.5 text-green-500"
                          size={18}
                        />
                        <p className="text-slate-700">{feature}</p>
                      </motion.div>
                    ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </FadeInUp>
    </section>
  );
};

export default Package;
