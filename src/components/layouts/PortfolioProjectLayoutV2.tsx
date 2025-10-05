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

export default function PortfolioProjectLayoutV2({
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
    <div className="bg-white dark:bg-black text-gray-900 dark:text-gray-100">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col gap-6 md:gap-8">
          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
              {title}
            </h1>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-400">{subtitle}</p>
          </div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative mx-auto w-full max-w-3xl h-[200px] sm:h-[260px] md:h-[360px] rounded-xl overflow-hidden shadow-xl"
          >
            <Image
              src={mainImage}
              alt={`${title} - ${t('services.webDev.title')}`}
              fill
              className="object-cover"
              priority
            />
          </motion.div>

          {/* Quick facts (mobile-first scrollable) */}
          <div className="flex gap-3 overflow-x-auto no-scrollbar">
            {[
              { label: t("portfolio.projects.clientLabel"), value: projectInfo.client },
              { label: t("portfolio.projects.yearLabel"), value: projectInfo.year },
              { label: t("portfolio.projects.durationLabel"), value: projectInfo.duration },
            ].map((item) => (
              <div
                key={item.label}
                className="min-w-[180px] bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-lg p-4"
              >
                <div className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">{item.label}</div>
                <div className="text-base md:text-lg font-semibold">{item.value}</div>
              </div>
            ))}
          </div>

          {/* Content sections */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-8 text-base md:text-lg leading-relaxed">
              <section>
                <h2 className="text-2xl font-bold mb-3">{t("portfolio.projects.summaryTitle")}</h2>
                {summaryText}
              </section>
              <section>
                <h2 className="text-2xl font-bold mb-3">{t("portfolio.projects.challengeTitle")}</h2>
                {challengeText}
              </section>
              <section>
                <h2 className="text-2xl font-bold mb-3">{t("portfolio.projects.solutionTitle")}</h2>
                {solutionText}
              </section>
            </div>
            <aside className="md:col-span-1">
              <div className="sticky top-4 space-y-4">
                <div className="bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-3">{t("portfolio.projects.techTitle")}</h3>
                  <div className="flex flex-wrap gap-2">
                    {technologies.map((tech) => (
                      <span key={tech} className="px-3 py-1 rounded-full text-sm bg-gray-100 dark:bg-gray-800">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                {liveSiteUrl && (
                  <Button asChild className="w-full bg-black hover:bg-gray-800 text-white dark:bg-white dark:text-black dark:hover:bg-gray-200">
                    <a href={liveSiteUrl} target="_blank" rel="noopener noreferrer">
                      {t("portfolio.projects.visitButton")} <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                )}
                <Button 
                  variant="outline" 
                  onClick={() => router.back()} 
                  className="w-full border-gray-300 dark:border-gray-700"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" /> {t("portfolio.projects.backButton")}
                </Button>
              </div>
            </aside>
          </div>

          {/* Gallery */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">{t("portfolio.projects.screenshotsTitle")}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              {images.map((src, index) => (
                <button
                  type="button"
                  key={index}
                  className="relative w-full h-40 sm:h-48 md:h-56 rounded-lg overflow-hidden shadow"
                  onClick={() => openLightbox(index)}
                >
                  <Image src={src} alt={`${title} - screenshot ${index + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          >
            <button
              aria-label="Close"
              className="absolute top-4 right-4 text-white p-2 rounded hover:bg-white/10"
              onClick={closeLightbox}
            >
              <X className="h-6 w-6" />
            </button>

            {images.length > 1 && (
              <>
                <button
                  aria-label="Previous"
                  className="absolute left-3 md:left-6 text-white p-2 rounded hover:bg-white/10"
                  onClick={prev}
                >
                  <ChevronLeft className="h-8 w-8" />
                </button>
                <button
                  aria-label="Next"
                  className="absolute right-3 md:right-6 text-white p-2 rounded hover:bg-white/10"
                  onClick={next}
                >
                  <ChevronRight className="h-8 w-8" />
                </button>
              </>
            )}

            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="relative w-[92vw] h-[70vh] md:w-[80vw] md:h-[80vh]"
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
