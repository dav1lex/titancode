"use client";

import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@/components/ui/visually-hidden";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ProjectInfo {
  client: string;
  year: string;
  duration: string;
}

interface PortfolioProjectLayoutProps {
  title: string;
  subtitle: string;
  mainImage: string;
  projectInfo: ProjectInfo;
  summaryText: ReactNode;
  challengeText: ReactNode;
  solutionText: ReactNode;
  technologies: string[];
  images: string[];
  liveSiteUrl?: string;
  t: (key: string) => string;
}

export default function PortfolioProjectLayout({
  title,
  subtitle,
  mainImage,
  projectInfo,
  summaryText,
  challengeText,
  solutionText,
  technologies,
  images,
  liveSiteUrl,
  t,
}: PortfolioProjectLayoutProps) {
  const router = useRouter();

  return (
    <div className="bg-white dark:bg-black text-gray-900 dark:text-gray-100">
      <div className="container mx-auto px-4 py-12">
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter pb-4 bg-clip-text text-transparent bg-gradient-to-b from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400">
            {subtitle}
          </p>
        </motion.header>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative w-full h-[400px] md:h-[600px] rounded-xl shadow-2xl mb-16 overflow-hidden "
        >
          <Image
            src={mainImage}
            alt={`${title} - ${t('services.webDev.title')}`}
            fill
            style={{ objectFit: "cover" }}
            className="rounded-xl"
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-4"
          >
            <div className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">{t("portfolio.projects.detailsTitle")}</h3>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li className="flex justify-between"><strong>{t("portfolio.projects.clientLabel")}:</strong> <span>{projectInfo.client}</span></li>
                <li className="flex justify-between"><strong>{t("portfolio.projects.yearLabel")}:</strong> <span>{projectInfo.year}</span></li>
                <li className="flex justify-between"><strong>{t("portfolio.projects.durationLabel")}:</strong> <span>{projectInfo.duration}</span></li>
              </ul>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-8"
          >
            <div className="space-y-6 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              <div>
                <h2 className="text-2xl font-bold mb-3 text-gray-800 dark:text-gray-200">{t("portfolio.projects.summaryTitle")}</h2>
                {summaryText}
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-3 text-gray-800 dark:text-gray-200">{t("portfolio.projects.challengeTitle")}</h2>
                {challengeText}
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-3 text-gray-800 dark:text-gray-200">{t("portfolio.projects.solutionTitle")}</h2>
                {solutionText}
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200">{t("portfolio.projects.techTitle")}</h2>
          <div className="flex flex-wrap justify-center items-center gap-4">
            {technologies.map((tech) => (
              <div key={tech} className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 font-medium px-4 py-2 rounded-full shadow-sm">
                {tech}
              </div>
            ))}
          </div>
        </motion.div>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-gray-200">{t("portfolio.projects.screenshotsTitle")}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {images.map((src, index) => (
              <Dialog key={index}>
                <DialogTrigger asChild>
                  <motion.div
                    className="relative w-full h-64 cursor-pointer md:h-80 rounded-lg shadow-lg overflow-hidden group"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Image
                      src={src}
                      alt={`${title} - ${t(
                        "portfolio.projects.screenshotsTitle"
                      )} ${index + 1}`}
                      fill
                      style={{ objectFit: "cover" }}
                      className="rounded-lg transition-transform duration-300 group-hover:scale-105"
                    />
                  </motion.div>
                </DialogTrigger>
                <DialogContent className="p-0 bg-transparent border-none max-w-none w-screen h-screen flex items-center justify-center">
                  <VisuallyHidden>
                    <DialogTitle>
                      {`${title} - ${t(
                        "portfolio.projects.screenshotsTitle"
                      )} ${index + 1}`}
                    </DialogTitle>
                  </VisuallyHidden>
                  <Image
                    src={src}
                    alt={`${title} - ${t(
                      "portfolio.projects.screenshotsTitle"
                    )} ${index + 1}`}
                    width={1920}
                    height={1080}
                    className="rounded-lg object-contain max-w-[90vw] max-h-[90vh] w-auto h-auto"
                  />
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </section>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-12"
        >
          <Button 
            variant="outline" 
            onClick={() => router.back()}
            className="w-full sm:w-auto border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t("portfolio.projects.backButton")}
          </Button>
          {liveSiteUrl && (
            <Button asChild className="w-full sm:w-auto bg-black hover:bg-gray-800 text-white dark:bg-white dark:hover:bg-gray-200 dark:text-black">
              <a href={liveSiteUrl} target="_blank" rel="noopener noreferrer">
                {t("portfolio.projects.visitButton")}
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          )}
        </motion.div>

      </div>
    </div>
  );
}