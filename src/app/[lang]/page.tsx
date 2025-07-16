"use client";
import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import PortfolioSection from "@/components/sections/PortfolioSection";
import ContactSection from "@/components/sections/ContactSection";
import CalculateEstimateSection from "@/components/sections/CalculateEstimateSection";

export default function Home() {

  return (
    <>
      <HeroSection />
      <ServicesSection />
      <PortfolioSection />
      <CalculateEstimateSection />
      <ContactSection />
    </>
  );
}