"use client";

import { useLanguage } from "@/app/language-context";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { FaJs, FaNode, FaPhp, FaReact } from "react-icons/fa";
import { RiNextjsFill } from "react-icons/ri";
import Link from "next/link";

export default function HeroSection() {
  const { t, language } = useLanguage();

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-white dark:bg-black transition-all duration-300 z-10">
      {/*  gradient blur */}
      <div className="absolute top-[-250px] right-[-150px] w-[500px] h-[500px] bg-blue-500/20 dark:bg-blue-500/10 rounded-full blur-3xl opacity-50 z-[-1]"></div>
      <div className="absolute bottom-[-200px] left-[-100px] w-[400px] h-[400px] bg-cyan-500/20 dark:bg-cyan-500/10 rounded-full blur-3xl opacity-50 z-[-1]"></div>

      {/* Grid overlay */}
      <div className="absolute inset-0 z-0 opacity-20 dark:opacity-30">
        <div className="vercel-grid"></div>
      </div>

      <div className="container mx-auto relative z-10 h-screen flex flex-col justify-center items-center px-4">
        <div className="max-w-5xl mx-auto text-center">

          <motion.h1
            className=" whitespace-pre-line text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight pb-6 bg-clip-text text-transparent bg-gradient-to-b from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 whitespace-pre-line"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}

          >
            {t("hero.title")}
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            {t("hero.subtitle")}
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            <Link href={`/${language}/calculate-estimate`}>
              <Button
                size="lg"
                className="bg-black hover:bg-gray-800 active:bg-gray-800 text-white dark:bg-white dark:hover:bg-gray-200 dark:active:bg-gray-200 dark:text-black rounded-md px-6 transition-all"
              >
                <span className="flex items-center gap-2">
                  {t("hero.cta")}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-active:translate-x-1" />
                </span>
              </Button>
            </Link>

            <Link href={`/${language}/portfolio`}>
              <Button
                size="lg"
                variant="outline"
                className="border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-100 active:bg-gray-100 dark:hover:bg-gray-800 dark:active:bg-gray-800 rounded-md px-6 transition-all"
              >
                <span className="flex items-center gap-2">
                  {t("portfolio.title")}
                </span>
              </Button>
            </Link>
          </motion.div>

          {/* Tech stack logos */}
          <motion.div
            className="mt-16 flex flex-wrap gap-8 justify-center items-center opacity-70 dark:opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
          >
            {/* React */}
            <div className="h-6 w-auto text-black dark:text-gray-500 flex items-center justify-center">
              <FaReact className="text-4xl" />
            </div>
            {/* JavaScript */}
            <div className="h-6 w-auto text-black dark:text-gray-500 flex items-center justify-center">
              <FaJs className="text-4xl" />
            </div>
            {/* Next.js */}
            <div className="h-6 w-auto text-black dark:text-gray-500 flex items-center justify-center">
              <RiNextjsFill className="text-4xl" />
            </div>
            {/* Node.js */}
            <div className="h-6 w-auto text-black dark:text-gray-500 flex items-center justify-center">
              <FaNode className="text-4xl" />
            </div>
            {/* PHP */}
            <div className="h-6 w-auto text-black dark:text-gray-500 flex items-center justify-center">
              <FaPhp className="text-4xl" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}