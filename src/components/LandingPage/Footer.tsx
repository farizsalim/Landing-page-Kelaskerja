"use client";

import Link from "next/link";
import Image from "next/image";
import {usePathname} from "next/navigation";
import {FadeInUp, motion} from "../motion-wrapper";
import {FaInstagram, FaTiktok, FaWhatsapp} from "react-icons/fa";

const Footer = () => {
  const pathname = usePathname();
  const isHome = pathname === "/";
  
  return (
    <FadeInUp>
      <footer className="border-t border-white/10 bg-[#3f4247] px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 sm:gap-12 md:grid-cols-[1.45fr_0.75fr_1fr_1fr] md:gap-8">
          <div className="flex flex-col items-start text-left">
            <Link href="/" className="inline-block transition hover:opacity-80">
              <Image
                src="/footer/kelaskerja-white.png"
                alt="KelasKerja Logo"
                width={150}
                height={150}
                className="h-16 w-auto object-contain md:h-20"
              />
            </Link>
            <div className="relative mt-3 h-16 w-[180px] md:mt-5 md:h-20 md:w-[220px]">
              <Image
                src="/footer/natosi.webp"
                alt="Natosi Logo"
                fill
                sizes="(max-width: 768px) 200px, 240px"
                className="object-contain"
              />
            </div>
            <div className="mt-6 text-sm text-white/70">
              <p className="mb-2 font-bold text-white">PT NATOSI CORP</p>
              <p className="mb-6 max-w-sm leading-relaxed">
                Jl. Pangkalan 1 No.88, RT.001/RW.006, Bantargebang,<br />
                Kec. Bantar Gebang, Kota Bekasi, Jawa Barat 17151
              </p>
              
              <div className="flex flex-col items-start gap-2">
                <span className="font-semibold text-white">Metode Pembayaran</span>
                <div className="rounded bg-white px-3 py-2 flex items-center justify-center self-center md:self-start">
                  <img src="https://img.logo.dev/bca.co.id?token=pk_IFwTOSquQ3eTpzIkJOEs4w&format=webp&retina=true" alt="Bank BCA" loading="lazy" className="h-9 w-auto object-contain pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-white">Quick Links</h3>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              <li>
                <Link
                  href={isHome ? "#bootcamp" : "/#bootcamp"}
                  className="transition hover:text-white">
                  Bootcamp
                </Link>
              </li>
              <li>
                <Link href={isHome ? "#contact" : "/#contact"} className="transition hover:text-white">
                  Contact
                </Link>
              </li>
              <li>
                <Link href={isHome ? "#faq" : "/#faq"} className="transition hover:text-white">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-white">Contact</h3>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              <li>
                <a href="https://wa.me/628212259967?text=Halo%20saya%20ingin%20konsultasi" target="_blank" rel="noopener noreferrer" className="transition hover:text-white">
                  <span className="inline-flex items-center gap-2"><FaWhatsapp size={15} /> WhatsApp: 0821-2259-967</span>
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/kelaskerja.test/" target="_blank" rel="noopener noreferrer" className="transition hover:text-white">
                  Instagram: @kelaskerja.test
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-white">Social Media</h3>
            <div className="mt-4 flex flex-wrap gap-2 text-sm text-white/70">
              {[
                { name: "Instagram", url: "https://www.instagram.com/kelaskerja.test/", icon: FaInstagram },
                { name: "TikTok", url: "#", icon: FaTiktok },
              ].map((item) => {
                const Icon = item.icon;
                if (item.url) {
                  return (
                    <motion.a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      key={item.name}
                      whileHover={{scale: 1.05, y: -2}}
                      className="flex cursor-pointer items-center gap-2 rounded-full bg-white/10 px-4 py-2 transition hover:bg-white/20 hover:text-white">
                      <Icon size={16} />
                      <span>{item.name}</span>
                    </motion.a>
                  );
                }
                return (
                  <motion.span
                    key={item.name}
                    whileHover={{scale: 1.05, y: -2}}
                    className="flex cursor-pointer items-center gap-2 rounded-full bg-white/10 px-4 py-2 transition hover:bg-white/20 hover:text-white">
                    <Icon size={16} />
                    <span>{item.name}</span>
                  </motion.span>
                );
              })}
            </div>
          </div>
        </div>
        <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-3 border-t border-white/10 pt-6 text-sm text-white/50 md:flex-row md:items-center md:justify-between">
          <p>© 2026 PT Natosi Corp. Semua hak dilindungi.</p>
        </div>
      </footer>
    </FadeInUp>
  );
};

export default Footer;
