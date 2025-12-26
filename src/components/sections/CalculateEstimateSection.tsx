"use client";

import { useLanguage } from "@/app/language-context";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CalculateEstimateSection() {
  const { t, language } = useLanguage();

  return (
    <section className="relative w-full py-20 lg:py-32 bg-background overflow-hidden">
      {/* Subtle background gradient */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <Card className="max-w-4xl mx-auto text-center border-border/60 bg-card/70 backdrop-blur shadow-lg hover:shadow-xl hover:border-primary/30 transition-all duration-300">
            <div className="relative">
              {/* Inner gradient wash */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5 rounded-lg" />
              
              <CardHeader className="p-8 sm:p-10 lg:p-12 relative">
                <CardTitle className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
                  {t("calculateEstimate.title")}
                </CardTitle>
                <CardDescription className="text-lg leading-relaxed text-muted-foreground max-w-2xl mx-auto">
                  {t("calculateEstimate.subtitle")}
                </CardDescription>
              </CardHeader>

              <div className="pb-10 sm:pb-12 relative">
                <Link href={`/${language}/calculate-estimate`} passHref>
                  <Button size="lg" className="group px-8">
                    {t("calculateEstimate.cta")}
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}