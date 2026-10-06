import { bootcamps } from "@/data/bootcamp";
import { notFound } from "next/navigation";
import Header from "@/components/LandingPage/Header";
import Footer from "@/components/LandingPage/Footer";
import {
  HeroSection,
  SectionNav,
  AboutSection,
  CareerSection,
  USPSection,
  CurriculumSection,
  ToolsSection,
  MentorSection,
  PortfolioSection,
  AlumniSection,
  PricingSection,
  FAQSection,
  JourneySection
} from "@/components/BootcampDetail/BootcampDetailSections";

export function generateStaticParams() {
  return bootcamps.map((bootcamp) => ({
    slug: bootcamp.slug,
  }));
}

export default async function BootcampDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const bootcamp = bootcamps.find((b) => b.slug === slug);

  if (!bootcamp) {
    notFound();
  }

  const whatsappLink = "https://wa.me/628212259967?text=Halo%20saya%20ingin%20konsultasi";

  return (
    <main className="min-h-screen bg-slate-50">
      <Header scrolled={true} whatsappLink={whatsappLink} position="absolute" />
      <HeroSection bootcamp={bootcamp} />
      <SectionNav />
      <AboutSection bootcamp={bootcamp} />
      <CareerSection bootcamp={bootcamp} />
      <USPSection bootcamp={bootcamp} />
      <JourneySection bootcamp={bootcamp} />
      <ToolsSection bootcamp={bootcamp} />
      <CurriculumSection bootcamp={bootcamp} />
      <MentorSection bootcamp={bootcamp} />
      <PortfolioSection bootcamp={bootcamp} />
      <AlumniSection bootcamp={bootcamp} />
      <PricingSection bootcamp={bootcamp} />
      <FAQSection bootcamp={bootcamp} />
      <Footer />
    </main>
  );
}
