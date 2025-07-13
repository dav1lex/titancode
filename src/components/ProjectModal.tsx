"use client";

import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useLanguage } from "@/app/language-context";
import { X } from "lucide-react";
import { ProjectCardData } from "./ProjectCard";

type ProjectModalProps = {
  card: ProjectCardData;
  onClose: () => void;
};

export default function ProjectModal({ card, onClose }: ProjectModalProps) {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const isDark = theme === "dark";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm" 
        onClick={onClose}
      ></div>
      
      {/* Modal Content */}
      <div className={`relative w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl ${
        isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
      }`}>
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/20 hover:bg-black/40 transition-colors"
        >
          <X className="w-5 h-5 text-white" />
        </button>

        {/* Image Header */}
        <div className="h-64 relative">
          <img 
            src={card.image} 
            alt={card.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
            <div className="p-6">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{card.title}</h2>
              <p className="text-white/80">{card.description}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="font-semibold mb-3">{t("home.projectDetails")}</h3>
              <div className="space-y-2">
                <p><span className="opacity-70">{t("home.client")}:</span> {card.details.client}</p>
                <p><span className="opacity-70">{t("home.duration")}:</span> {card.details.duration}</p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-3">{t("home.technologies")}</h3>
              <div className="flex flex-wrap gap-2">
                {card.details.technologies.map((tech, index) => (
                  <span 
                    key={index}
                    className={`px-3 py-1 rounded-full text-sm ${
                      isDark 
                        ? 'bg-blue-900/50 text-blue-200' 
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold mb-3">{t("home.features")}</h3>
            <ul className="list-disc pl-5 space-y-1 opacity-90">
              {card.details.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>

          <div className="flex justify-end mt-6">
            <Button 
              className={`px-6 ${isDark ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
            >
              {t("home.contactAboutProject")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 