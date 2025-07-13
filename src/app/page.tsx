"use client";

import React, { useState, useEffect } from 'react';
import { Monitor, Smartphone, Zap, Sun, Moon } from 'lucide-react';
import { useLanguage } from "./language-context";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import ProjectCard, { ProjectCardData } from "@/components/ProjectCard";
import ProjectModal from "@/components/ProjectModal";
import { projectCards } from "@/data/projects";

export default function Home() {
  const { t } = useLanguage();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [selectedCard, setSelectedCard] = useState<null | ProjectCardData>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Ensure we only run theme detection after mount to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Only render content after mounting to avoid hydration mismatch
  if (!mounted) return <div className="min-h-screen"></div>;

  const isDark = theme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  const openModal = (card: ProjectCardData) => {
    setSelectedCard(card);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  };

  return (
    <>
      <div className={`min-h-screen relative overflow-hidden transition-all duration-500 ${
        isDark 
          ? 'bg-gradient-to-b from-black via-purple-900 to-purple-800' 
          : 'bg-gradient-to-b from-blue-50 via-blue-100 to-blue-200'
      }`}>
      

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Stars */}
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-1 h-1 rounded-full animate-pulse ${
                isDark ? 'bg-white' : 'bg-blue-300'
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
          
          {/* Sun/Moon */}
          <div className="absolute top-16 left-1/2 transform -translate-x-1/2">
            <div className={`w-32 h-32 md:w-40 md:h-40 rounded-full transition-all duration-500 ${
              isDark 
                ? 'bg-gradient-to-br from-red-400 to-red-600 shadow-red-500/50' 
                : 'bg-gradient-to-br from-orange-400 to-orange-500 shadow-orange-500/50'
            } shadow-2xl`}>
              <div className={`w-full h-full rounded-full animate-pulse ${
                isDark ? 'shadow-red-500/30' : 'shadow-orange-500/30'
              } shadow-2xl`} />
            </div>
          </div>

          {/* Mountains/Waves */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1200 200" className="w-full h-32 md:h-40">
              <path
                d="M0,100 C150,120 300,80 450,100 C600,120 750,80 900,100 C1050,120 1200,80 1200,100 L1200,200 L0,200 Z"
                className={`transition-all duration-500 ${
                  isDark 
                    ? 'fill-purple-600/60' 
                    : 'fill-blue-400/60'
                }`}
              />
              <path
                d="M0,120 C150,140 300,100 450,120 C600,140 750,100 900,120 C1050,140 1200,100 1200,120 L1200,200 L0,200 Z"
                className={`transition-all duration-500 ${
                  isDark 
                    ? 'fill-purple-700/80' 
                    : 'fill-blue-500/80'
                }`}
              />
            </svg>
          </div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
          <div className="max-w-4xl mx-auto text-center">
            {/* Main Card */}
            <div className={`backdrop-blur-xl rounded-2xl p-8 md:p-12 shadow-2xl border transition-all duration-500 ${
              isDark 
                ? 'bg-gray-900/40 border-gray-700/50' 
                : 'bg-white/40 border-white/60'
            }`}>
              {/* Title */}
              <h1 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-8 leading-tight transition-colors duration-500 ${
                isDark ? 'text-white' : 'text-gray-800'
              }`}>
                {t("home.welcome")}
              </h1>

              {/* Service Cards */}
              <div className="grid md:grid-cols-3 gap-4 md:gap-6 mb-8">
                {/* Modern Design */}
                <div className={`p-4 md:p-6 rounded-xl border transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                  isDark 
                    ? 'bg-blue-900/30 border-blue-700/50 hover:bg-blue-900/50' 
                    : 'bg-blue-100/60 border-blue-200/80 hover:bg-blue-200/80'
                }`}>
                  <Monitor className={`w-8 h-8 mx-auto mb-4 transition-colors duration-500 ${
                    isDark ? 'text-blue-400' : 'text-blue-600'
                  }`} />
                  <h3 className={`font-semibold mb-2 transition-colors duration-500 ${
                    isDark ? 'text-white' : 'text-gray-800'
                  }`}>
                    {t("home.modernDesign")}
                  </h3>
                </div>

                {/* Responsive Pages */}
                <div className={`p-4 md:p-6 rounded-xl border transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                  isDark 
                    ? 'bg-purple-900/30 border-purple-700/50 hover:bg-purple-900/50' 
                    : 'bg-purple-100/60 border-purple-200/80 hover:bg-purple-200/80'
                }`}>
                  <Smartphone className={`w-8 h-8 mx-auto mb-4 transition-colors duration-500 ${
                    isDark ? 'text-purple-400' : 'text-purple-600'
                  }`} />
                  <h3 className={`font-semibold mb-2 transition-colors duration-500 ${
                    isDark ? 'text-white' : 'text-gray-800'
                  }`}>
                    {t("home.responsivePages")}
                  </h3>
                </div>

                {/* Fast Loading */}
                <div className={`p-4 md:p-6 rounded-xl border transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                  isDark 
                    ? 'bg-indigo-900/30 border-indigo-700/50 hover:bg-indigo-900/50' 
                    : 'bg-indigo-100/60 border-indigo-200/80 hover:bg-indigo-200/80'
                }`}>
                  <Zap className={`w-8 h-8 mx-auto mb-4 transition-colors duration-500 ${
                    isDark ? 'text-indigo-400' : 'text-indigo-600'
                  }`} />
                  <h3 className={`font-semibold mb-2 transition-colors duration-500 ${
                    isDark ? 'text-white' : 'text-gray-800'
                  }`}>
                    {t("home.fastLoading")}
                  </h3>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                    isDark 
                      ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/25' 
                      : 'bg-blue-500 hover:bg-blue-600 text-white shadow-blue-500/25'
                  } shadow-lg`}
                >
                  {t("home.viewServices")}
                </Button>
                
                <Button
                  variant="outline"
                  className={`px-8 py-3 rounded-xl font-semibold border-2 transition-all duration-300 transform hover:scale-105 ${
                    isDark 
                      ? 'border-white/30 text-white hover:bg-white/10' 
                      : 'border-gray-600/30 text-gray-800 hover:bg-gray-600/10'
                  }`}
                >
                  {t("home.contact")}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Additional floating elements */}
        <div className="absolute top-1/4 left-10 w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0s'}} />
        <div className="absolute top-1/3 right-16 w-1 h-1 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '1s'}} />
        <div className="absolute bottom-1/4 left-16 w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{animationDelay: '2s'}} />
        <div className="absolute bottom-1/3 right-10 w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{animationDelay: '0.5s'}} />
      </div>

      {/* Projects Section with Cards and Modals */}
      <section className={`py-20 px-4 ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'}`}>
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("home.ourProjects")}</h2>
            <p className="text-lg max-w-2xl mx-auto opacity-80">{t("home.projectsDescription")}</p>
          </div>

          {/* Project Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {projectCards.map((card) => (
              <ProjectCard 
                key={card.id} 
                card={card} 
                onClick={openModal} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && selectedCard && (
        <ProjectModal card={selectedCard} onClose={closeModal} />
      )}
    </>
  );
}
