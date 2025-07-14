"use client";

import { useLanguage } from "@/app/language-context";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Code, Smartphone, Palette, ShoppingCart, LineChart, LifeBuoy } from "lucide-react";

export default function ServicesSection() {
  const { t } = useLanguage();

  const services = [
    {
      icon: <Code className="w-8 h-8" />,
      key: "webDev",
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      key: "mobileDev",
    },
    {
      icon: <Palette className="w-8 h-8" />,
      key: "uiUx",
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
    <section className="relative py-24 bg-gray-50 dark:bg-zinc-900 transition-colors duration-300 z-10">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold bg-clip-text pb-4 text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {t("services.title")}
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            {t("services.subtitle")}
          </motion.p>
        </div>

        {/* Services grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-700"
            >
              <div className="mb-4 p-3 inline-flex rounded-lg bg-gray-100 dark:bg-gray-700 text-primary dark:text-primary-foreground">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                {t(`services.${service.key}.title`)}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-3">
                {t(`services.${service.key}.description`)}
              </p>
              <Button 
                variant="outline" 
                className="group text-primary dark:text-primary hover:text-primary-foreground active:text-primary-foreground hover:bg-primary active:bg-primary dark:hover:text-primary-foreground dark:active:text-primary-foreground dark:hover:bg-primary dark:active:bg-primary px-3 hover:px-4 active:px-4 transition-all duration-300"
              >
                <span className="flex items-center gap-2">
                  {t("services.viewDetails")}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-active:translate-x-1" />
                </span>
              </Button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}   