"use client";

import { useLanguage } from "@/app/language-context";
import { motion } from "framer-motion";
import { ShieldCheck, Zap, Gem, AlertTriangle, ThumbsUp } from "lucide-react";

const WordpressVsCustomSection = () => {
  const { t } = useLanguage();

  const comparisonData = {
    custom: [
      {
        icon: <ShieldCheck className="h-8 w-8 text-green-500" />,
        title: t("aboutPage.comparison.custom.feature1_title"),
        description: t("aboutPage.comparison.custom.feature1_desc"),
      },
      {
        icon: <Zap className="h-8 w-8 text-green-500" />,
        title: t("aboutPage.comparison.custom.feature2_title"),
        description: t("aboutPage.comparison.custom.feature2_desc"),
      },
      {
        icon: <Gem className="h-8 w-8 text-green-500" />,
        title: t("aboutPage.comparison.custom.feature3_title"),
        description: t("aboutPage.comparison.custom.feature3_desc"),
      },
    ],
    wordpress: [
      {
        icon: <AlertTriangle className="h-8 w-8 text-amber-500" />,
        title: t("aboutPage.comparison.wordpress.feature1_title"),
        description: t("aboutPage.comparison.wordpress.feature1_desc"),
      },
      {
        icon: <AlertTriangle className="h-8 w-8 text-amber-500" />,
        title: t("aboutPage.comparison.wordpress.feature2_title"),
        description: t("aboutPage.comparison.wordpress.feature2_desc"),
      },
      {
        icon: <AlertTriangle className="h-8 w-8 text-amber-500" />,
        title: t("aboutPage.comparison.wordpress.feature3_title"),
        description: t("aboutPage.comparison.wordpress.feature3_desc"),
      },
    ],
  };

  return (
    <section className="py-24 sm:py-32 bg-white dark:bg-black">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            {t("aboutPage.comparison.title")}
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-600 dark:text-gray-400">
            {t("aboutPage.comparison.subtitle")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
          {/* Custom Code Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="p-8 bg-gray-50 dark:bg-gray-900/50 rounded-2xl"
          >
            <div className="flex items-center gap-4 mb-6">
              <ThumbsUp className="h-10 w-10 text-green-500" />
              <h3 className="text-2xl font-bold text-green-500">
                {t("aboutPage.comparison.custom.title")}
              </h3>
            </div>
            <div className="space-y-6">
              {comparisonData.custom.map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0">{item.icon}</div>
                  <div>
                    <h4 className="font-bold text-lg">{item.title}</h4>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* WordPress Column */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="p-8 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-amber-500/20"
          >
            <div className="flex items-center gap-4 mb-6">
              <AlertTriangle className="h-10 w-10 text-amber-500" />
              <h3 className="text-2xl font-bold text-amber-500">
                {t("aboutPage.comparison.wordpress.title")}
              </h3>
            </div>
            <div className="space-y-6">
              {comparisonData.wordpress.map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0">{item.icon}</div>
                  <div>
                    <h4 className="font-bold text-lg">{item.title}</h4>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-16 text-center max-w-4xl mx-auto"
        >
            <h3 className="text-2xl font-bold tracking-tight">{t("aboutPage.comparison.conclusion_title")}</h3>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            {t("aboutPage.comparison.conclusion_text")}
            </p>
        </motion.div>

      </div>
    </section>
  );
};

export default WordpressVsCustomSection;