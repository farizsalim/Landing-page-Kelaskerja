"use client";

import Link from "next/link";
import Image from "next/image";
import {useState} from "react";
import {motion} from "framer-motion";
import {AnimatePresence} from "framer-motion";
import {X, Menu, Sparkles} from "lucide-react";
import {FaWhatsapp} from "react-icons/fa";
import {usePathname} from "next/navigation";
import ConsultationQuiz from "./ConsultationQuiz";

type HeaderProps = {
  scrolled: boolean;
  whatsappLink: string;
  position?: "sticky" | "absolute";
};

const Header = ({scrolled, whatsappLink, position = "sticky"}: HeaderProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const navItems = [
    {label: "Bootcamp", href: "#bootcamp"},
    {label: "Kelas Gratis", href: "#kelas-gratis"},
    {label: "FAQ", href: "#faq"},
  ];
  
  return (
    <>
      <motion.header
        initial={{y: -40, opacity: 0}}
        animate={{y: 0, opacity: 1}}
        transition={{duration: 0.6, ease: [0.22, 1, 0.36, 1]}}
        className={`${position === "sticky" ? "sticky" : "absolute w-full"} top-0 z-50 border-b border-slate-200/80 bg-white transition-shadow ${scrolled ? "shadow-sm md:bg-white/95 md:backdrop-blur" : ""}`}>
        <nav className="mx-auto flex min-h-20 max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
          <Link href="/" className="flex shrink-0 items-center">
            <Image
              src="/Logo-Nav-transparent.png"
              alt="KelasKerja Logo"
              width={200}
              height={100}
              className="h-14 w-auto origin-left object-contain object-left scale-[2.8] md:h-20 md:scale-[3.3]"
            />
          </Link>
          <div className="hidden items-center gap-6 text-sm font-medium text-slate-700 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={isHome ? item.href : `/${item.href}`}
                className="nav-link-hover relative transition hover:text-brand-600">
                {item.label}
              </Link>
            ))}
            <Link
              href={isHome ? "#contact" : "/#contact"}
              className="nav-link-hover relative transition hover:text-brand-600">
              Contact
            </Link>
          </div>
          <div className="hidden items-center gap-3 md:flex">
            <button
              onClick={() => setIsQuizOpen(true)}
              className="inline-flex items-center gap-2 rounded-full border-2 border-[#FFB500] px-4 py-2 text-sm font-semibold text-[#B37A00] transition hover:bg-[#FFF8E7] hover:shadow-sm">
              <Sparkles size={14} />
              Mulai Konsultasi
            </button>
            <Link
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700 hover:shadow-lg hover:shadow-brand-600/25">
              <FaWhatsapp size={16} />
              Daftar Sekarang
            </Link>
          </div>
          <button
            aria-label="Buka menu navigasi"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            className="rounded-full border border-slate-200 p-2 text-slate-700 md:hidden"
            onClick={() => setMenuOpen((prev) => !prev)}>
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </nav>
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{height: 0, opacity: 0}}
              animate={{height: "auto", opacity: 1}}
              exit={{height: 0, opacity: 0}}
              transition={{duration: 0.3, ease: [0.22, 1, 0.36, 1]}}
                id="mobile-navigation"
                className="overflow-hidden border-t border-slate-200 bg-white shadow-sm md:hidden">
              <div className="flex flex-col px-2 py-4 text-sm font-medium text-slate-700">
                <Link href={isHome ? "#bootcamp" : "/#bootcamp"} onClick={() => setMenuOpen(false)} className="block px-3 py-3 rounded-md transition hover:bg-slate-50">
                  Bootcamp
                </Link>
                  <Link href={isHome ? "#kelas-gratis" : "/#kelas-gratis"} onClick={() => setMenuOpen(false)} className="block px-3 py-3 rounded-md transition hover:bg-slate-50">
                    Kelas Gratis
                  </Link>
                <Link href={isHome ? "#faq" : "/#faq"} onClick={() => setMenuOpen(false)} className="block px-3 py-3 rounded-md transition hover:bg-slate-50">
                  FAQ
                </Link>
                <Link href={isHome ? "#contact" : "/#contact"} onClick={() => setMenuOpen(false)} className="block px-3 py-3 rounded-md transition hover:bg-slate-50">
                  Contact
                </Link>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    setIsQuizOpen(true);
                  }}
                  className="mt-2 mx-2 inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#FFB500] px-4 py-3 text-sm font-semibold text-[#B37A00] transition hover:bg-[#FFF8E7]">
                  <Sparkles size={14} />
                  Mulai Konsultasi
                </button>
                <Link
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 mx-2 inline-flex items-center justify-center gap-2 rounded-full bg-brand-600 px-4 py-3 text-white transition hover:bg-brand-700">
                  <FaWhatsapp size={16} />
                  Daftar Sekarang
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Quiz Modal */}
      <ConsultationQuiz
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        whatsappLink={whatsappLink}
      />
    </>
  );
};

export default Header;

