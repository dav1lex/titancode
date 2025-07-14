"use client";

import { useState, type ReactElement } from "react";
import { useLanguage } from "@/app/language-context";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { ArrowRight, Code, Bot, Search, ShoppingCart, LineChart, LifeBuoy } from "lucide-react";

type Service = {
  icon: ReactElement;
  key: string;
};

export default function ServicesSection() {
  const { t } = useLanguage();
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const services: Service[] = [
    {
      icon: <Code className="w-8 h-8" />,
      key: "webDev",
    },
    {
      icon: <Bot className="w-8 h-8" />,
      key: "automation",
    },
    {
      icon: <Search className="w-8 h-8" />,
      key: "seo",
    },
    {
      icon: <ShoppingCart className="w-8 h-8" />,
      key: "ecommerce",
    },
    {
      icon: <LineChart className="w-8 h-8" />,
      key: "consulting",
    },
    {
      icon: <LifeBuoy className="w-8 h-8" />,
      key: "maintenance",
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="py-24 sm:py-32 bg-white dark:bg-black transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl lg:max-w-4xl mx-auto text-center mb-16">
          <motion.h2
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {t("services.title")}
          </motion.h2>
          <motion.p
            className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            {t("services.subtitle")}
          </motion.p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service) => (
            <motion.div
              key={service.key}
              variants={itemVariants}
              className="group relative p-8 bg-gray-50 dark:bg-zinc-900 rounded-2xl overflow-hidden border border-transparent hover:border-primary dark:hover:border-primary transition-all duration-300"
            >
              <div className="relative z-10">
                <div className="mb-6 flex items-center justify-center w-12 h-12 bg-gray-100 dark:bg-zinc-800 rounded-lg text-primary dark:text-white group-hover:bg-primary dark:group-hover:bg-primary group-hover:text-white dark:group-hover:text-black transition-colors duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {t(`services.${service.key}.title`)}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-3 h-[4.5rem]">
                  {t(`services.${service.key}.description`)}
                </p>
                <Button
                  variant="link"
                  className="p-0 text-primary dark:text-white font-semibold group-hover:underline"
                  onClick={() => setSelectedService(service)}
                >
                  <span className="flex items-center gap-2">
                    {t("services.viewDetails")}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {selectedService && (
        <Dialog open={!!selectedService} onOpenChange={() => setSelectedService(null)}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-4">
                <div className="flex items-center justify-center w-12 h-12 bg-gray-100 dark:bg-zinc-800 rounded-lg text-primary dark:text-white">
                  {selectedService.icon}
                </div>
                {t(`services.${selectedService.key}.title`)}
              </DialogTitle>
              <DialogDescription>
                {t(`services.${selectedService.key}.description`)}
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <p className="text-sm text-gray-500">
                {t(`services.${selectedService.key}.longDescription`)}
              </p>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </section>
  );
}   