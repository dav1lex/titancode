"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ReactNode, useCallback, useEffect, useState } from "react";

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

export default function PortfolioProjectLayoutSimple({
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
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const openLightbox = useCallback((index: number) => {
    setActiveIndex(index);
    setLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => setLightboxOpen(false), []);

  const prev = useCallback(() => {
    setActiveIndex((idx) => (idx - 1 + images.length) % images.length);
  }, [images.length]);

  const next = useCallback(() => {
    setActiveIndex((idx) => (idx + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxOpen, closeLightbox, prev, next]);

  return (
    <div className="bg-white dark:bg-black text-gray-900 dark:text-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">{title}</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">{subtitle}</p>
        </div>

        {/* Two column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left column - Content */}
          <div className="space-y-8">
            {/* Project details */}
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <div className="font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  {t("portfolio.projects.clientLabel")}
                </div>
                <div className="mt-1 font-semibold">{projectInfo.client}</div>
              </div>
              <div>
                <div className="font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  {t("portfolio.projects.yearLabel")}
                </div>
                <div className="mt-1 font-semibold">{projectInfo.year}</div>
              </div>
              <div>
                <div className="font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  {t("portfolio.projects.durationLabel")}
                </div>
                <div className="mt-1 font-semibold">{projectInfo.duration}</div>
              </div>
            </div>

            {/* Content sections */}
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-semibold mb-4">{t("portfolio.projects.summaryTitle")}</h2>
                <div className="text-gray-700 dark:text-gray-300 leading-relaxed">{summaryText}</div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">{t("portfolio.projects.challengeTitle")}</h2>
                <div className="text-gray-700 dark:text-gray-300 leading-relaxed">{challengeText}</div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">{t("portfolio.projects.solutionTitle")}</h2>
                <div className="text-gray-700 dark:text-gray-300 leading-relaxed">{solutionText}</div>
              </section>
            </div>

            {/* Technologies */}
            <div>
              <h3 className="text-lg font-semibold mb-3">{t("portfolio.projects.techTitle")}</h3>
              <div className="flex flex-wrap gap-2">
                {technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800 rounded-md"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              {liveSiteUrl && (
                <Button asChild className="bg-black hover:bg-gray-800 text-white dark:bg-white dark:text-black dark:hover:bg-gray-200">
                  <a href={liveSiteUrl} target="_blank" rel="noopener noreferrer">
                    {t("portfolio.projects.visitButton")}
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              )}
              <Button
                variant="outline"
                onClick={() => router.back()}
                className="border-gray-300 dark:border-gray-700"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                {t("portfolio.projects.backButton")}
              </Button>
            </div>
          </div>

          {/* Right column - Images */}
          <div className="space-y-6">
            {/* Main image */}
            <button
              type="button"
              onClick={() => openLightbox(0)}
              className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden shadow-lg group"
            >
              <Image
                src={mainImage}
                alt={title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                priority
              />
            </button>

            {/* Gallery grid */}
            {images.length > 1 && (
              <div>
                <h3 className="text-lg font-semibold mb-3">{t("portfolio.projects.screenshotsTitle")}</h3>
                <div className="grid grid-cols-2 gap-3">
                  {images.slice(1).map((src, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => openLightbox(index + 1)}
                      className="relative w-full h-32 md:h-40 rounded-lg overflow-hidden shadow group"
                    >
                      <Image
                        src={src}
                        alt={`${title} - screenshot ${index + 2}`}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Simple lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          >
            <button
              aria-label="Close"
              className="absolute top-4 right-4 text-white p-2 rounded-full bg-black/50 hover:bg-black/70"
              onClick={closeLightbox}
            >
              <X className="h-6 w-6" />
            </button>

            {images.length > 1 && (
              <>
                <button
                  aria-label="Previous"
                  className="absolute left-4 text-white p-2 rounded-full bg-black/50 hover:bg-black/70"
                  onClick={prev}
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  aria-label="Next"
                  className="absolute right-4 text-white p-2 rounded-full bg-black/50 hover:bg-black/70"
                  onClick={next}
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}

            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="relative w-[90vw] h-[80vh] md:w-[80vw] md:h-[70vh]"
            >
              <Image
                src={images[activeIndex]}
                alt={`${title} - fullscreen ${activeIndex + 1}`}
                fill
                className="object-contain"
                priority
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}