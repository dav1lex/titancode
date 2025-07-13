"use client";

import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useLanguage } from "@/app/language-context";

export type ProjectCardData = {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  details: {
    client: string;
    duration: string;
    technologies: string[];
    features: string[];
  }
};

type ProjectCardProps = {
  card: ProjectCardData;
  onClick: (card: ProjectCardData) => void;
};

export default function ProjectCard({ card, onClick }: ProjectCardProps) {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const isDark = theme === "dark";

  return (
    <div 
      onClick={() => onClick(card)}
      className={`rounded-xl overflow-hidden shadow-lg cursor-pointer transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
        isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'
      }`}
    >
      <div className="h-48 overflow-hidden">
        <img 
          src={card.image} 
          alt={card.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>
      <div className="p-6">
        <div className="text-xs font-semibold uppercase tracking-wide mb-1 opacity-70">
          {card.category}
        </div>
        <h3 className="font-bold text-xl mb-2">{card.title}</h3>
        <p className="opacity-80">{card.description}</p>
        <div className="mt-4 flex justify-end">
          <Button 
            size="sm" 
            variant={isDark ? "outline" : "default"}
            className={`text-sm ${isDark ? 'border-blue-500 text-blue-400' : ''}`}
          >
            {t("home.viewDetails")}
          </Button>
        </div>
      </div>
    </div>
  );
} 