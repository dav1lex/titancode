"use client";

import { useLanguage } from "@/app/language-context";
import { motion } from "framer-motion";
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiJavascript,
  SiPhp,
  SiTailwindcss,
} from "react-icons/si";

const TechStackSection = () => {
  const { t } = useLanguage();

  const technologies = [
    {
      icon: <SiNextdotjs className="h-12 w-12" />,
      name: "Next.js",
      description: t("aboutPage.techStack.nextjs_desc"),
    },
    {
      icon: <SiReact className="h-12 w-12 text-[#61DAFB]" />,
      name: "React",
      description: t("aboutPage.techStack.react_desc"),
    },
    {
      icon: <SiTypescript className="h-12 w-12 text-[#3178C6]" />,
      name: "TypeScript",
      description: t("aboutPage.techStack.typescript_desc"),
    },
    {
      icon: <SiJavascript className="h-12 w-12 text-[#F7DF1E]" />,
      name: "JavaScript",
      description: t("aboutPage.techStack.javascript_desc"),
    },
    {
      icon: <SiPhp className="h-12 w-12 text-[#777BB4]" />,
      name: "PHP",
      description: t("aboutPage.techStack.php_desc"),
    },
    {
      icon: <SiTailwindcss className="h-12 w-12 text-[#06B6D4]" />,
      name: "Tailwind CSS",
      description: t("aboutPage.techStack.tailwind_desc"),
    },
  ];

  return (
    <section className="py-24 sm:py-32 bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            {t("aboutPage.techStack.title")}
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-600 dark:text-gray-400">
            {t("aboutPage.techStack.subtitle")}
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {technologies.map((tech, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-8 bg-white dark:bg-black rounded-2xl shadow-lg text-left"
            >
              <div className="flex items-center gap-4 mb-4">
                {tech.icon}
                <h3 className="text-2xl font-bold">{tech.name}</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                {tech.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;