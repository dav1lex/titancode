"use client";

import { useLanguage } from "@/app/language-context";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const Beams = () => (
  <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
    <div className="absolute inset-0 z-0">
      <div
        style={{
          "maskImage": "radial-gradient(ellipse at center, white 10%, transparent 70%)",
          "WebkitMaskImage": "radial-gradient(ellipse at center, white 10%, transparent 70%)",
        }}
        className="absolute inset-0 bg-gradient-to-b from-cyan-500/50 to-transparent"
      ></div>
    </div>
    <div className="absolute top-1/2 left-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2">
      {[...Array(7)].map((_, i) => (
        <motion.div
          key={`beam_${i}`}
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{
            duration: Math.random() * 15 + 10, // 10s to 25s
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * -5,
          }}
          className="absolute h-full w-px bg-gradient-to-b from-transparent via-cyan-500 to-transparent"
          style={{
            left: `${(i / 7) * 100}%`,
            transformOrigin: "center top",
          }}
        />
      ))}
    </div>
  </div>
);


export default function CalculateEstimateSection() {
  const { t } = useLanguage();

  return (
    <section className="relative w-full py-32 bg-white dark:bg-black transition-all duration-300 z-10 overflow-hidden">
      <Beams />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-b from-gray-900 to-gray-600 dark:from-white dark:to-gray-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            {t("calculateEstimate.title")}
          </motion.h2>
          
          <motion.p 
            className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            viewport={{ once: true }}
          >
            {t("calculateEstimate.subtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            viewport={{ once: true }}
          >
            <Link href="/calculate-estimate">
              <Button 
                size="lg" 
                className="group bg-black hover:bg-gray-800 active:bg-gray-800 text-white dark:bg-white dark:hover:bg-gray-200 dark:active:bg-gray-200 dark:text-black rounded-md px-6 transition-all shadow-lg hover:shadow-cyan-500/20 dark:shadow-cyan-500/20"
              >
                <span className="flex items-center gap-2">
                  {t("calculateEstimate.cta")}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-active:translate-x-1" />
                </span>
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}