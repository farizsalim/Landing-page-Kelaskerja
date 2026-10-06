import {FadeInLeft, FadeInRight, ScaleIn} from "@/components/motion-wrapper";
import {motion} from "framer-motion";
import {TrendingUp} from "lucide-react";
import Image from "next/image";

const WhyUsBanner = () => {
  return (
    <section className="section-light border-t border-slate-200 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <ScaleIn>
        {/* Menggunakan warna background dan styling border ala HeroSection */}
        <div className="section-dark relative mx-auto max-w-7xl overflow-hidden rounded-[28px] border border-white/10 p-5 text-white shadow-xl md:overflow-visible lg:p-12">
          <div className="flex flex-row items-stretch md:items-stretch justify-between gap-2 sm:gap-4">
            
            {/* Bagian Kiri (Teks & Kotak Statistik) */}
            <FadeInLeft className="w-[60%] sm:w-[60%] md:w-1/2 lg:w-1/2 md:pr-8 lg:pr-0 flex flex-col justify-center">
              <div className="relative z-30 flex flex-col items-start text-left justify-center w-full">
                <p className="text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-brand-400">
                  Kenapa memilih kami
                </p>
                <h2 className="mt-2 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold mb-4 md:mb-8 leading-tight">
                  Belajar dengan kurikulum yang dekat dengan kebutuhan industri.
                </h2>
                
                <div className="w-full">
                  <motion.div
                    whileHover={{scale: 1.03}}
                    transition={{type: "spring", stiffness: 300}}
                    className="inline-block rounded-2xl bg-white/5 border border-white/10 p-3 sm:p-4 md:p-5 backdrop-blur-sm shadow-lg text-left relative z-30">
                    <div className="flex items-center gap-2 md:gap-3 text-sm md:text-lg font-medium">
                      <TrendingUp className="text-brand-400 shrink-0 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" /> 
                      <span className="leading-tight sm:leading-snug">95% peserta merasa lebih siap masuk dunia kerja.</span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </FadeInLeft>

            {/* Bagian Kanan (Foto) - Mobile (Di dalam Flex Row, sejajar teks) */}
            <div className="md:hidden w-[30%] sm:w-[30%] relative flex items-end justify-end pointer-events-none">
              <FadeInRight className="absolute bottom-0 -right-16 sm:-right-24 w-[230%] sm:w-[200%] h-[140%] sm:h-[150%] z-20">
                <Image 
                  src="/mentors/talent-polos.png" 
                  alt="Talent Kelaskerja" 
                  fill 
                  className="object-contain object-bottom" 
                  sizes="(max-width: 768px) 60vw"
                />
              </FadeInRight>
            </div>

            {/* Bagian Kanan (Foto Pop-out) - Desktop/Tablet (Absolute) */}
            <div className="hidden md:block absolute bottom-0 right-0 lg:-right-4 xl:right-4 z-20 pointer-events-none w-87.5 lg:w-120 xl:w-137.5">
              <FadeInRight>
                <div className="relative w-full h-150 lg:h-162.5 xl:h-187.5 origin-bottom">
                  <Image 
                    src="/mentors/talent-polos.png" 
                    alt="Talent Kelaskerja" 
                    fill 
                    className="object-contain object-bottom" 
                    sizes="(max-width: 1024px) 100vw, 500px"
                  />
                </div>
              </FadeInRight>
            </div>

          </div>
        </div>
      </ScaleIn>
    </section>
  );
};

export default WhyUsBanner;
