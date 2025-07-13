"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "en" | "pl";

type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
};

// Default translations
const translations = {
  en: {
    "nav.home": "Home",
    "nav.projects": "Projects",
    "nav.about": "About",
    "nav.contact": "Contact",
    "footer.rights": "All rights reserved",
    "home.welcome": "Professional Web Development",
    "home.subtitle": "Your next-generation development platform",
    "home.getStarted": "Get Started",
    "home.modernDesign": "Modern Design",
    "home.responsivePages": "Responsive Pages",
    "home.fastLoading": "Fast Loading",
    "home.viewServices": "View Services",
    "home.contact": "Contact Us",
    "home.ourProjects": "Our Projects",
    "home.projectsDescription": "Check out some of our recent work and discover how we can help bring your vision to life",
    "home.viewDetails": "View Details",
    "home.projectDetails": "Project Details",
    "home.client": "Client",
    "home.duration": "Duration",
    "home.technologies": "Technologies",
    "home.features": "Key Features",
    "home.contactAboutProject": "Contact About This Project"
  },
  pl: {
    "nav.home": "Strona główna",
    "nav.projects": "Projekty",
    "nav.about": "O nas",
    "nav.contact": "Kontakt",
    "footer.rights": "Wszelkie prawa zastrzeżone",
    "home.welcome": "Profesjonalne tworzenie stron internetowych",
    "home.subtitle": "Twoja platforma programistyczna nowej generacji",
    "home.getStarted": "Rozpocznij",
    "home.modernDesign": "Nowoczesny Design",
    "home.responsivePages": "Responsywne Strony",
    "home.fastLoading": "Szybkie Ładowanie",
    "home.viewServices": "Zobacz Usługi",
    "home.contact": "Skontaktuj Się",
    "home.ourProjects": "Nasze Projekty",
    "home.projectsDescription": "Zobacz nasze ostatnie prace i dowiedz się, jak możemy pomóc w realizacji Twojej wizji",
    "home.viewDetails": "Zobacz Szczegóły",
    "home.projectDetails": "Szczegóły Projektu",
    "home.client": "Klient",
    "home.duration": "Czas Realizacji",
    "home.technologies": "Technologie",
    "home.features": "Kluczowe Funkcje",
    "home.contactAboutProject": "Zapytaj o Ten Projekt"
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  // Load saved language preference from localStorage on component mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language;
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "pl")) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Save language preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  // Translation function
  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Custom hook to use the language context
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
} 