import Link from "next/link";
import Image from "next/image";
import {FadeInLeft, FadeInRight, ScaleIn, motion} from "../motion-wrapper";
import {ChevronRight} from "lucide-react";
import {FaWhatsapp} from "react-icons/fa";

const Contact = ({whatsappLink}: {whatsappLink: string}) => {
  return (
    <section id="contact" className="bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <ScaleIn>
        <div className="section-dark relative mx-auto max-w-7xl overflow-hidden rounded-[28px] px-6 py-8 text-white shadow-soft sm:px-10 lg:px-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-center gap-6 lg:gap-12">
            
            {/* Bagian Kiri: Teks */}
            <div className="lg:max-w-lg w-full pt-4 lg:pt-0">
              <FadeInLeft>
                <div>
                  <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#D6A15C]">
                    FREE CONSULTATION
                  </p>
                  <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
                    Masih bingung milih bootcamp?
                  </h2>
                  <p className="mt-4 text-base sm:text-lg text-gray-300">
                    Konsultasikan tujuan karir mu bersama tim KelasKerja secara
                    GRATIS dan dapatkan rekomendasi yang paling sesuai
                  </p>
                </div>
              </FadeInLeft>
            </div>

            {/* Bagian Kanan: Card WA & Foto */}
            <div className="relative min-h-65 w-full sm:min-h-80 lg:w-150">
              {/* Card WhatsApp */}
              <div className="absolute right-0 top-3 z-10 w-[68%] max-w-80 sm:top-8 sm:w-80 lg:w-88">
                <FadeInRight>
                  <motion.div
                    whileHover={{scale: 1.02, y: -3}}
                    transition={{type: "spring", stiffness: 300}}
                    className="rounded-3xl border border-[#25D366]/25 bg-white/10 p-4 shadow-xl backdrop-blur-md sm:p-6">
                    <div className="flex items-center gap-2 sm:gap-3 text-sm sm:text-lg font-semibold">
                      <motion.span
                        animate={{
                          scale: [1, 1.2, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}>
                        <FaWhatsapp size={20} className="hidden text-[#25D366] sm:block" />
                        <FaWhatsapp size={16} className="text-[#25D366] sm:hidden" />
                      </motion.span>
                      <span className="leading-tight sm:leading-normal">Chat Whatsapp Sekarang</span>
                    </div>
                    <Link
                      href={whatsappLink}
                      target="_blank"
                      rel="noreferrer"
                      className="group mt-4 flex w-full items-center justify-center rounded-full bg-[#25D366] px-4 py-2.5 text-xs font-semibold text-[#102318] transition hover:-translate-y-0.5 hover:bg-[#20bd5a] hover:shadow-lg hover:shadow-[#25D366]/25 sm:mt-6 sm:w-auto sm:px-5 sm:py-3 sm:text-base">
                      Chat WhatsApp{" "}
                      <ChevronRight
                        className="ml-1 sm:ml-2 transition-transform group-hover:translate-x-1"
                        size={16}
                      />
                    </Link>
                  </motion.div>
                </FadeInRight>
              </div>

              {/* Foto Talent */}
              <div className="absolute bottom-[-1px] left-0 z-0 w-[48%] sm:w-64 lg:w-72">
                <FadeInRight delay={0.2}>
                  <Image
                    src="/mentors/talent-contact.png"
                    alt="Konsultan KelasKerja"
                    width={400}
                    height={500}
                    className="w-full h-auto object-contain object-bottom"
                  />
                </FadeInRight>
              </div>

            </div>
          </div>
        </div>
      </ScaleIn>
    </section>
  );
};

export default Contact;
