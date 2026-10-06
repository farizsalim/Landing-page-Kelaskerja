"use client";

import { useEffect, useState } from "react";
import Header from "./LandingPage/Header";
import HeroSection from "./LandingPage/HeroSection";
import MentorCarousel from "./LandingPage/MentorCarousel";
import FreeClassCarousel from "@/components/LandingPage/FreeClassCarousel";
import WhyUsBanner from "./LandingPage/WhyUsBanner";
import Benefits from "./LandingPage/Benefits";
import HiringPartner from "./LandingPage/HiringPartner";
import AlumniTestimonials from "./LandingPage/AlumniTestimonials";
import RegistrationSteps from "./LandingPage/RegistrationSteps";
import BootcampList from "./LandingPage/Bootcamp-List";
import PosterSlideshow from "./LandingPage/PosterSlideshow";
import Faq from "./LandingPage/Faq";
import AffiliateProgram from "./LandingPage/AffiliateProgram";
import Contact from "./LandingPage/Contact";
import Footer from "./LandingPage/Footer";

const whatsappLink = "https://wa.me/628212259967?text=Halo%20saya%20ingin%20konsultasi";

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);



  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 24);
          ticking = false;
        });
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, {passive: true});
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-x-clip bg-white text-slate-900">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-blue-600 focus:px-4 focus:py-2 focus:text-white">
        Lompat ke konten utama
      </a>

      {/* ── Navbar ── */}
      <Header scrolled={scrolled} whatsappLink={whatsappLink} />

      <main id="main-content">
        {/* ── Hero ── */}
        <HeroSection whatsappLink={whatsappLink} />

        {/* ── Kelas Gratis Unggulan ── */}
        <FreeClassCarousel />

        {/* ── Program Unggulan ── */}
        <PosterSlideshow />

        {/* ── Semua Bootcamp ── */}
        <BootcampList />

        {/* ── Why Us Banner ── */}
        <WhyUsBanner />

        {/* ── Benefits ── */}
        <Benefits />

        {/* ── Mentor Carousel ── */}
        <MentorCarousel />

        {/* ── Alumni Testimonials ── */}
        <AlumniTestimonials />

        {/* ── Hiring Partner ── */}
        <HiringPartner />

        {/* ── Alur Pendaftaran ── */}
        <RegistrationSteps whatsappLink={whatsappLink} />

        {/* ── FAQ ── */}
        <Faq whatsappLink={whatsappLink} />

        {/* ── Program Afiliasi ── */}
        <AffiliateProgram />

        {/* ── Contact CTA ── */}
        <Contact whatsappLink={whatsappLink} />
      </main>

      {/* ── Footer ── */}
      <Footer />
    </div>
  );
}
