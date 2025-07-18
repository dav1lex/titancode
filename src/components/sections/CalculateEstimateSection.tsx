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
    <section className="w-full py-20 lg:py-32 bg-zinc-50 dark:bg-black">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <Card className="max-w-4xl mx-auto text-center dark:bg-zinc-900">
            <CardHeader className="p-8">
              <CardTitle className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                {t("calculateEstimate.title")}
              </CardTitle>
              <CardDescription className="text-lg text-muted-foreground max-w-2xl mx-auto pt-4">
                {t("calculateEstimate.subtitle")}
              </CardDescription>
            </CardHeader>
            <div className="p-8 pt-0">
              <Link href={`/${language}/calculate-estimate`} passHref>
                <Button size="lg" className="group">
                  {t("calculateEstimate.cta")}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}