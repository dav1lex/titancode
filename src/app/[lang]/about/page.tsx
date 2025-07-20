"use client";

import { useLanguage } from "@/app/language-context";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Award,
  CheckCircle,
  ClipboardCheck,
  Code,
  Gauge,
  LifeBuoy,
  Palette,
  Rocket,
  Search,
  ShieldCheck,
  TrendingUp,
  Users,
} from "lucide-react";
import Link from "next/link";
import WebpageAnimation from "@/components/ui/webpage-animation";
import Strong from "@/components/ui/strong";
import WordpressVsCustomSection from "@/components/sections/WordpressVsCustomSection";
import TechStackSection from "@/components/sections/TechStackSection";
 
 export default function AboutPage() {
   const { t ,language } = useLanguage();

  const aboutPageSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": t("aboutPage.seoTitle"),
    "description": t("aboutPage.seoDescription"),
    "url": `https://titancode.pl/${language}/about`,
    "mainEntity": {
      "@type": "Organization",
      "name": "TITANCODE",
      "url": "https://titancode.pl",
      "logo": "https://titancode.pl/og-image.png"
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": t("nav.home"),
        "item": `https://titancode.pl/${language}`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": t("nav.about"),
        "item": `https://titancode.pl/${language}/about`
      }
    ]
  };

  const whyUsFeatures = [
    {
      icon: <Award className="h-10 w-10 text-cyan-500" />,
      title: t("aboutPage.whyUs.feature1"),
      description: t("aboutPage.whyUs.feature1_desc"),
    },
    {
      icon: <Gauge className="h-10 w-10 text-cyan-500" />,
      title: t("aboutPage.whyUs.feature2"),
      description: t("aboutPage.whyUs.feature2_desc"),
    },
    {
      icon: <CheckCircle className="h-10 w-10 text-cyan-500" />,
      title: t("aboutPage.whyUs.feature3"),
      description: t("aboutPage.whyUs.feature3_desc"),
    },
    {
      icon: <Users className="h-10 w-10 text-cyan-500" />,
      title: t("aboutPage.whyUs.feature4"),
      description: t("aboutPage.whyUs.feature4_desc"),
    },
    {
      icon: <TrendingUp className="h-10 w-10 text-cyan-500" />,
      title: t("aboutPage.whyUs.feature5"),
      description: t("aboutPage.whyUs.feature5_desc"),
    },
    {
      icon: <ShieldCheck className="h-10 w-10 text-cyan-500" />,
      title: t("aboutPage.whyUs.feature6"),
      description: t("aboutPage.whyUs.feature6_desc"),
    },
  ];

  const processSteps = [
    {
      icon: <Search className="h-8 w-8 text-cyan-500" />,
      title: t("aboutPage.process.step1"),
      description: t("aboutPage.process.step1_desc"),
    },
    {
      icon: <Palette className="h-8 w-8 text-cyan-500" />,
      title: t("aboutPage.process.step2"),
      description: t("aboutPage.process.step2_desc"),
    },
    {
      icon: <Code className="h-8 w-8 text-cyan-500" />,
      title: t("aboutPage.process.step3"),
      description: t("aboutPage.process.step3_desc"),
    },
    {
      icon: <ClipboardCheck className="h-8 w-8 text-cyan-500" />,
      title: t("aboutPage.process.step4"),
      description: t("aboutPage.process.step4_desc"),
    },
    {
      icon: <Rocket className="h-8 w-8 text-cyan-500" />,
      title: t("aboutPage.process.step5"),
      description: t("aboutPage.process.step5_desc"),
    },
    {
      icon: <LifeBuoy className="h-8 w-8 text-cyan-500" />,
      title: t("aboutPage.process.step6"),
      description: t("aboutPage.process.step6_desc"),
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="bg-white dark:bg-black text-gray-900 dark:text-white transition-colors duration-300">
        {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="py-20 sm:py-32 text-center bg-gray-50 dark:bg-gray-900/50"
      >
        <div className="container mx-auto px-4">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight"
          >
            {t("aboutPage.hero.title")}
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-6 max-w-3xl mx-auto text-lg sm:text-xl text-gray-600 dark:text-gray-400"
          >
            {t("aboutPage.hero.subtitle")}
          </motion.p>
        </div>
      </motion.section>

      {/* Mission Section */}
      <section className="py-24 sm:py-32">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">{t("aboutPage.mission.title")}</h2>
            <p
              className="mt-6 text-lg text-gray-600 dark:text-gray-400 prose dark:prose-invert"
            >
              <Strong text="aboutPage.mission.text" />
            </p>
          </motion.div>
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <WebpageAnimation />
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 sm:py-32 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">{t("aboutPage.process.title")}</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-8 bg-white dark:bg-black rounded-2xl shadow-lg flex flex-col items-start"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="inline-block p-3 bg-cyan-500/10 rounded-lg">{step.icon}</div>
                  <span className="text-2xl font-bold text-gray-300 dark:text-gray-700">0{index + 1}</span>
                </div>
                <h3 className="text-xl font-bold text-left">{step.title}</h3>
                <p className="mt-3 text-gray-600 dark:text-gray-400 text-left">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 sm:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">{t("aboutPage.whyUs.title")}</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyUsFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-8 bg-gray-50 dark:bg-gray-900/50 rounded-2xl text-center"
              >
                <div className="inline-block p-4 bg-cyan-500/10 rounded-full mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold">{feature.title}</h3>
                <p className="mt-3 text-gray-600 dark:text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <WordpressVsCustomSection />

      <TechStackSection />

      {/* CTA Section */}
      <section className="bg-gray-100 dark:bg-gray-900 py-20 sm:py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            {t("aboutPage.cta.title")}
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400">
            {t("aboutPage.cta.subtitle")}
          </p>
          <div className="mt-8">
            <Button asChild size="lg">
              <Link href={`/${language}/contact`}>
                {t("aboutPage.cta.button")}
              </Link>
            </Button>
          </div>
        </div>
      </section>
      </div>
    </>
  );
}