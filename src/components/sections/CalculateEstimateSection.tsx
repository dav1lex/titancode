"use client";

import { useLanguage } from "@/app/language-context";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CalculateEstimateSection() {
  const { t, language } = useLanguage();

  return (
    <section className="relative w-full py-24 md:py-32 bg-gray-50 dark:bg-zinc-900 transition-all duration-300">
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight pb-4 bg-clip-text text-transparent bg-gradient-to-b from-gray-900 to-gray-600 dark:from-white dark:to-gray-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
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

        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          viewport={{ once: true }}
        >
          <Card className="max-w-lg mx-auto bg-white/30 dark:bg-black/30 backdrop-blur-lg border border-gray-200/30 dark:border-gray-800/30 hover:border-gray-300/50 dark:hover:border-gray-700 transition-all duration-300 shadow-xl hover:shadow-2xl rounded-2xl overflow-hidden">
            <div className="p-8 text-center">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {t("calculateEstimate.testPrompt")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400 py-4">
                  {t("calculateEstimate.testDescription")}
                </p>
              </CardContent>
              <CardFooter>
                <Link href={`/${language}/calculate-estimate`} passHref className="w-full">
                  <Button size="lg" variant={"default"}  className="hover:bg-gray-700 dark:hover:bg-gray-200 transition-all duration-300 group">
                    {t("calculateEstimate.testButton")} 
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </CardFooter>
            </div>
          </Card>
        </motion.div>

      </div>
    </section>
  );
}