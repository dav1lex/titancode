"use client";

import { useState } from "react";
import { useLanguage } from "@/app/language-context";
import { motion, AnimatePresence } from "framer-motion";
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiPhp,
  SiTailwindcss,
} from "react-icons/si";
import { cn } from "@/lib/utils";

const TechStackSection = () => {
  const { t } = useLanguage();
  const [selectedTech, setSelectedTech] = useState(0);

  const technologies = [
    {
      id: 0,
      icon: <SiNextdotjs className="h-12 w-12" />,
      name: "Next.js",
      description: t("aboutPage.techStack.nextjs_desc"),
      benefit: t("aboutPage.techStack.nextjs_benefit"),
    },
    {
      id: 1,
      icon: <SiReact className="h-12 w-12 text-[#61DAFB]" />,
      name: "React",
      description: t("aboutPage.techStack.react_desc"),
      benefit: t("aboutPage.techStack.react_benefit"),
    },
    {
      id: 2,
      icon: <SiTypescript className="h-12 w-12 text-[#3178C6]" />,
      name: "TypeScript",
      description: t("aboutPage.techStack.typescript_desc"),
      benefit: t("aboutPage.techStack.typescript_benefit"),
    },
    {
      id: 3,
      icon: <SiTailwindcss className="h-12 w-12 text-[#06B6D4]" />,
      name: "Tailwind CSS",
      description: t("aboutPage.techStack.tailwind_desc"),
      benefit: t("aboutPage.techStack.tailwind_benefit"),
    },
    {
      id: 4,
      icon: <SiPhp className="h-12 w-12 text-[#777BB4]" />,
      name: "PHP",
      description: t("aboutPage.techStack.php_desc"),
      benefit: t("aboutPage.techStack.php_benefit"),
    },
  ];

  return (
    <section className="py-24 sm:py-32 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">
            {t("aboutPage.techStack.title")}
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-lg sm:text-xl text-muted-foreground">
            {t("aboutPage.techStack.subtitle")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 max-w-6xl mx-auto">
          <div className="md:col-span-1">
            <div className="flex flex-col space-y-2">
              {technologies.map((tech) => (
                <button
                  key={tech.id}
                  onClick={() => setSelectedTech(tech.id)}
                  className={cn(
                    "w-full text-left p-4 rounded-lg transition-colors duration-200",
                    selectedTech === tech.id
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-muted/50 text-muted-foreground"
                  )}
                >
                  <span className="text-lg font-semibold">{tech.name}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="md:col-span-2">
            <div className="relative p-8 rounded-xl bg-muted/40 min-h-[300px] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedTech}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col justify-center h-full"
                >
                  <div className="flex items-center gap-6 mb-6">
                    {technologies[selectedTech].icon}
                    <h3 className="text-4xl font-bold">
                      {technologies[selectedTech].name}
                    </h3>
                  </div>
                  <p className="text-lg text-foreground/80">
                    {technologies[selectedTech].description}
                  </p>
                  <div className="mt-6 pt-6 border-t border-border/20">
                    <h4 className="text-sm font-semibold text-primary mb-2">
                      {t("aboutPage.techStack.benefit_title")}
                    </h4>
                    <p className="text-lg font-semibold text-foreground">
                      {technologies[selectedTech].benefit}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;