"use client";

import { useLanguage } from "./language-context";
import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import PortfolioSection from "@/components/sections/PortfolioSection";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  const { t } = useLanguage();

  return (
    <>
      <HeroSection />
      <ServicesSection />
      <PortfolioSection />
      <ContactSection />
    </>
  );
}
