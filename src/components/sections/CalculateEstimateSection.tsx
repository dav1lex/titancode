"use client";

import { useLanguage } from "@/app/language-context";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const services = [
  {
    id: 1,
    title: "Web Development",
    description: "Custom websites and web applications",
    cta: "Estimate Project",
  },
  {
    id: 2,
    title: "Mobile Apps",
    description: "iOS and Android app development",
    cta: "Estimate Project",
  },
  {
    id: 3,
    title: "UI/UX Design",
    description: "User experience and interface design",
    cta: "Estimate Project",
  },
];

export default function CalculateEstimateSection() {
  const { t } = useLanguage();
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Use effect to handle theme change after component mount
  useEffect(() => {
    const html = document.documentElement;
    setIsDarkMode(html.classList.contains('dark'));
    
    // Listen for theme changes
    const observer = new MutationObserver(() => {
      setIsDarkMode(html.classList.contains('dark'));
    });
    
    observer.observe(html, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  return (
    <section className={`relative w-full py-28 transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-900' : 'bg-white'
    }`}>
      <div className={`absolute inset-0 h-full w-full transition-all duration-300 ${
        isDarkMode 
          ? 'bg-[radial-gradient(#1f2937_1px,transparent_1px)]' 
          : 'bg-[radial-gradient(#e5e7eb_1px,transparent_1px)]'
      } [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]`}></div>
      
      <div className={`absolute inset-0 bg-gradient-to-br transition-all duration-300 ${
        isDarkMode 
          ? 'from-blue-900/30 to-cyan-900/30' 
          : 'from-blue-50/60 to-cyan-50/60'
      } z-[1]`}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-b from-blue-700 to-cyan-600 dark:from-blue-400 dark:to-cyan-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            {t("calculateEstimate.title")}
          </motion.h2>
          
          <motion.p 
            className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            viewport={{ once: true }}
          >
            {t("calculateEstimate.subtitle")}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              className={`backdrop-blur-sm border rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ${
                isDarkMode 
                  ? 'bg-gray-800/60 border-gray-700' 
                  : 'bg-white/70 border-gray-200/50'
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="p-8 h-full flex flex-col">
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {service.description}
                  </p>
                </div>
                <Link href="/calculate-estimate" passHref>
                  <Button
                    size="lg"
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 dark:from-blue-500 dark:to-cyan-500 dark:hover:from-blue-600 dark:hover:to-cyan-600 text-white transition-all"
                  >
                    <span className="flex items-center justify-center gap-2">
                      {service.cta}
                      <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}