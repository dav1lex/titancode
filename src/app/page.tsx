"use client";
import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import PortfolioSection from "@/components/sections/PortfolioSection";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {

  return (
    <main className="flex flex-col items-center justify-center">
      <HeroSection />
      <ServicesSection />
      <PortfolioSection />
      <ContactSection />
    </main>
  );
}
