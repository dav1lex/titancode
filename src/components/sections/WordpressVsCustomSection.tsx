"use client";

import { useState } from "react";
import { useLanguage } from "@/app/language-context";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const WordpressVsCustomSection = () => {
  const { t } = useLanguage();

  const data = {
    performance: {
      wp: {
        label: t("aboutPage.comparison.performance.label_wp"),
        value: t("aboutPage.comparison.performance.value_wp"),
        rawValue: 4.2,
      },
      custom: {
        label: t("aboutPage.comparison.performance.label_custom"),
        value: t("aboutPage.comparison.performance.value_custom"),
        rawValue: 0.8,
      },
      title: t("aboutPage.comparison.performance.title"),
      description: t("aboutPage.comparison.performance.description"),
      whatYouGet: t("aboutPage.comparison.performance.whatYouGet"),
    },
    security: {
      wp: {
        label: t("aboutPage.comparison.security.label_wp"),
        value: t("aboutPage.comparison.security.value_wp"),
        rawValue: 90,
      },
      custom: {
        label: t("aboutPage.comparison.security.label_custom"),
        value: t("aboutPage.comparison.security.value_custom"),
        rawValue: 0,
      },
      title: t("aboutPage.comparison.security.title"),
      description: t("aboutPage.comparison.security.description"),
      whatYouGet: t("aboutPage.comparison.security.whatYouGet"),
    },
    cost: {
      wp: {
        label: t("aboutPage.comparison.cost.label_wp"),
        value: t("aboutPage.comparison.cost.value_wp"),
        rawValue: 7500,
      },
      custom: {
        label: t("aboutPage.comparison.cost.label_custom"),
        value: t("aboutPage.comparison.cost.value_custom"),
        rawValue: 7500,
      },
      title: t("aboutPage.comparison.cost.title"),
      description: t("aboutPage.comparison.cost.description"),
      whatYouGet: t("aboutPage.comparison.cost.whatYouGet"),
    },
  };

  const [activeTab, setActiveTab] = useState("performance");
  const activeData = data[activeTab as keyof typeof data];
  const maxRawValue = Math.max(activeData.wp.rawValue, activeData.custom.rawValue);

  return (
    <section className="py-24 sm:py-32 bg-background text-foreground">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">
            {t("aboutPage.comparison.title")}
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-lg sm:text-xl text-muted-foreground">
            {t("aboutPage.comparison.subtitle")}
          </p>
        </div>

        <Tabs
          defaultValue="performance"
          className="max-w-4xl mx-auto"
          onValueChange={setActiveTab}
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="performance">
              {t("aboutPage.comparison.tabs.performance")}
            </TabsTrigger>
            <TabsTrigger value="security">
              {t("aboutPage.comparison.tabs.security")}
            </TabsTrigger>
            <TabsTrigger value="cost">
              {t("aboutPage.comparison.tabs.cost")}
            </TabsTrigger>
          </TabsList>

          <div className="mt-8">
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-end mb-1">
                    <span className="font-medium text-muted-foreground">
                      {activeData.wp.label}
                    </span>
                    <span className="text-2xl font-bold text-muted-foreground">
                      {activeData.wp.value}
                    </span>
                  </div>
                  <div className="w-full bg-muted/40 rounded-full h-4 overflow-hidden">
                    <motion.div
                      className="bg-muted-foreground/50 h-4 rounded-full"
                      initial={{ width: 0 }}
                      animate={{
                        width: `${(activeData.wp.rawValue / maxRawValue) * 100}%`,
                      }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-end mb-1">
                    <span className="font-medium text-primary">
                      {activeData.custom.label}
                    </span>
                    <span className="text-2xl font-bold text-primary">
                      {activeData.custom.value}
                    </span>
                  </div>
                  <div className="w-full bg-primary/10 rounded-full h-4 overflow-hidden">
                    <motion.div
                      className="bg-primary h-4 rounded-full"
                      initial={{ width: 0 }}
                      animate={{
                        width: `${(activeData.custom.rawValue / maxRawValue) * 100}%`,
                      }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                  </div>
                </div>
              </div>
              <div className="text-left">
                <h3 className="text-2xl font-bold tracking-tight">
                  {activeData.title}
                </h3>
                <p className="mt-2 text-muted-foreground">
                  {activeData.description}
                </p>
                <p className="mt-4 text-primary font-semibold">
                  {activeData.whatYouGet}
                </p>
              </div>
            </div>
          </div>
        </Tabs>
      </div>
    </section>
  );
};

export default WordpressVsCustomSection;