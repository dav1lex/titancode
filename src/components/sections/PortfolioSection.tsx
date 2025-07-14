"use client";

import { useLanguage } from "@/app/language-context";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Portfolio project data
const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    category: "Web Development",
    image: "/images/portfolio/ecommerce.jpg",
    imageAlt: "E-commerce website preview",
    link: "/portfolio/ecommerce",
  },
  {
    id: 2,
    title: "Banking App",
    category: "Mobile Development",
    image: "/images/portfolio/banking.jpg",
    imageAlt: "Banking application preview",
    link: "/portfolio/banking",
  },
  {
    id: 3,
    title: "Fitness Tracker",
    category: "UI/UX Design",
    image: "/images/portfolio/fitness.jpg",
    imageAlt: "Fitness tracker application preview",
    link: "/portfolio/fitness",
  },
  {
    id: 4,
    title: "Educational Platform",
    category: "Web Development",
    image: "/images/portfolio/education.jpg",
    imageAlt: "Educational platform preview",
    link: "/portfolio/education",
  },
  {
    id: 5,
    title: "Restaurant Booking System",
    category: "Web Development",
    image: "/images/portfolio/restaurant.jpg",
    imageAlt: "Restaurant booking system preview",
    link: "/portfolio/restaurant",
  },
  {
    id: 6,
    title: "Travel Companion App",
    category: "Mobile Development",
    image: "/images/portfolio/travel.jpg",
    imageAlt: "Travel companion app preview",
    link: "/portfolio/travel",
  },
];

export default function PortfolioSection() {
  const { t } = useLanguage();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section className="relative py-24 bg-white dark:bg-black transition-all duration-300 z-10">
      {/* Background elements */}
      <div className="absolute left-20 top-1/2 w-72 h-72 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl opacity-70 -z-10"></div>
      <div className="absolute right-20 bottom-20 w-64 h-64 bg-cyan-500/10 dark:bg-cyan-500/5 rounded-full blur-3xl opacity-70 -z-10"></div>
      
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-b from-gray-900 to-gray-600 dark:from-white dark:to-gray-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            {t("portfolio.title")}
          </motion.h2>
          
          <motion.p 
            className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            viewport={{ once: true }}
          >
            {t("portfolio.subtitle")}
          </motion.p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {projects.map((project) => (
            <motion.div 
              key={project.id} 
              variants={item}
              className="group relative bg-gray-50 dark:bg-gray-900 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg dark:hover:shadow-cyan-900/20"
            >
              <div className="aspect-[16/9] relative overflow-hidden">
                {/* Placeholder for image - you'll need to add actual images */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
                  <span className="text-gray-500 dark:text-gray-400 text-sm">
                    {project.imageAlt}
                  </span>
                </div>
                {/* Uncomment when images are available */}
                {/* <Image
                  src={project.image}
                  alt={project.imageAlt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                /> */}
              </div>
              
              <div className="p-6">
                <span className="text-xs font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                  {project.category}
                </span>
                <h3 className="mt-2 text-xl font-semibold text-gray-900 dark:text-white">
                  {project.title}
                </h3>
                
                <div className="mt-4 flex items-center">
                  <a 
                    href={project.link} 
                    className="inline-flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {t("portfolio.viewProject")}
                    <ArrowRight className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-16 text-center">
          <Link href="/portfolio">
            <Button 
              size="lg" 
              variant="outline"
              className="border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md px-6 transition-all"
            >
              {t("portfolio.viewAll")}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}   