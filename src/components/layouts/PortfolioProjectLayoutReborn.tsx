"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ExternalLink, ArrowLeft, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";

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

// A from-scratch, bold layout with a full-bleed hero, overlapping media card,
// scrollable chips, magazine-style content blocks, and a thumbnail-driven lightbox.
export default function PortfolioProjectLayoutReborn({
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

  const openLightbox = useCallback((i: number) => {
    setActiveIndex(i);
    setLightboxOpen(true);
  }, []);
  const closeLightbox = useCallback(() => setLightboxOpen(false), []);
  const prev = useCallback(() => setActiveIndex((i) => (i - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setActiveIndex((i) => (i + 1) % images.length), [images.length]);

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

  // Create a unique arrangement for the gallery (not a uniform grid)
  const galleryLayout = useMemo(() => {
    // Split into chunks for a mosaic: [1 wide], [2], [3], repeat
    const chunks: number[][] = [];
    let i = 0;
    while (i < images.length) {
      if (i === 0) {
        chunks.push([i]);
        i += 1;
      } else if (i + 1 < images.length) {
        chunks.push([i, i + 1]);
        i += 2;
      } else {
        chunks.push([i]);
        i += 1;
      }
      if (i + 2 < images.length) {
        chunks.push([i, i + 1, i + 2]);
        i += 3;
      }
    }
    return chunks;
  }, [images.length]);

  return (
    <div className="bg-white dark:bg-black text-gray-900 dark:text-gray-100">
      {/* Full-bleed header */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-purple-900/60 to-black/20 dark:from-black dark:via-purple-950 dark:to-black" />
        <div className="absolute inset-0 opacity-[0.12] bg-[radial-gradient(circle_600px_at_20%_20%,#8b5cf6,transparent),radial-gradient(circle_600px_at_80%_30%,#ec4899,transparent)]" />
        <div className="container mx-auto px-4 py-16 md:py-24 relative">
          <div className="max-w-3xl">
            <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-4xl md:text-6xl font-extrabold tracking-tight text-white">
              {title}
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="mt-3 text-lg md:text-2xl text-gray-100/90">
              {subtitle}
            </motion.p>

            {/* Scrollable tech chips */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }} className="mt-6 flex gap-2 overflow-x-auto no-scrollbar">
              {technologies.map((tech) => (
                <span key={tech} className="whitespace-nowrap text-sm md:text-base px-3 py-1 rounded-full bg-white/10 text-white border border-white/20 backdrop-blur">
                  {tech}
                </span>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Floating hero media card */}
        <div className="container mx-auto px-4 relative -mt-8 md:-mt-14 pb-8">
          <div className="mx-auto max-w-4xl rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/20">
            <div className="relative w-full h-[220px] sm:h-[320px] md:h-[420px]">
              <Image src={mainImage} alt={title} fill className="object-cover" priority />
            </div>
          </div>
        </div>
      </header>

      {/* Info pills */}
      <section className="container mx-auto px-4">
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2 -mt-2">
          {[
            { label: t("portfolio.projects.clientLabel"), value: projectInfo.client },
            { label: t("portfolio.projects.yearLabel"), value: projectInfo.year },
            { label: t("portfolio.projects.durationLabel"), value: projectInfo.duration },
          ].map((item) => (
            <div key={item.label} className="min-w-[180px] rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/60 p-4">
              <div className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">{item.label}</div>
              <div className="text-base md:text-lg font-semibold">{item.value}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Magazine-style content blocks */}
      <main className="container mx-auto px-4 py-10 md:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Story column */}
          <div className="lg:col-span-7 space-y-10">
            <article className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold">{t("portfolio.projects.summaryTitle")}</h2>
              <div className="prose prose-gray dark:prose-invert max-w-none text-[1.05rem] leading-relaxed">{summaryText}</div>
            </article>

            <article className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold">{t("portfolio.projects.challengeTitle")}</h2>
              <div className="prose prose-gray dark:prose-invert max-w-none text-[1.05rem] leading-relaxed">{challengeText}</div>
            </article>

            <article className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold">{t("portfolio.projects.solutionTitle")}</h2>
              <div className="prose prose-gray dark:prose-invert max-w-none text-[1.05rem] leading-relaxed">{solutionText}</div>
            </article>
          </div>

          {/* Side column with callouts */}
          <aside className="lg:col-span-5 space-y-4">
            {liveSiteUrl && (
              <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-5 bg-gradient-to-br from-gray-50 to-white dark:from-gray-950 dark:to-black">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs uppercase tracking-widest text-gray-500">Live</div>
                    <div className="text-lg font-semibold">{new URL(liveSiteUrl).hostname}</div>
                  </div>
                  <Button asChild className="bg-black hover:bg-gray-800 text-white dark:bg-white dark:text-black dark:hover:bg-gray-200">
                    <a href={liveSiteUrl} target="_blank" rel="noopener noreferrer">
                      {t("portfolio.projects.visitButton")} <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
            )}

            {/* Pull-quote card */}
            <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-5 bg-white/50 dark:bg-black/50">
              <p className="text-xl leading-snug font-semibold">“We build straightforward tools that do exactly what you need — no fluff.”</p>
            </div>

            {/* Back button */}
            <Button variant="outline" onClick={() => router.back()} className="w-full border-gray-300 dark:border-gray-700">
              <ArrowLeft className="mr-2 h-4 w-4" /> {t("portfolio.projects.backButton")}
            </Button>
          </aside>
        </div>
      </main>

      {/* Mosaic gallery */}
      <section className="container mx-auto px-4 pb-14">
        <h2 className="text-2xl md:text-3xl font-bold mb-5">{t("portfolio.projects.screenshotsTitle")}</h2>
        <div className="space-y-4">
          {galleryLayout.map((row, rIdx) => (
            <div key={rIdx} className={`grid gap-3 ${row.length === 1 ? "grid-cols-1" : row.length === 2 ? "grid-cols-2" : "grid-cols-3"}`}>
              {row.map((i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => openLightbox(i)}
                  className="group relative h-44 sm:h-56 md:h-64 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800"
                >
                  <Image src={images[i]} alt={`${title} - screenshot ${i + 1}`} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
                </button>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox with thumbnail rail */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            key="lb"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95"
          >
            <div className="absolute inset-0 flex items-center justify-center px-4">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="relative w-[92vw] h-[70vh] md:w-[82vw] md:h-[82vh]"
              >
                <Image src={images[activeIndex]} alt={`${title} - fullscreen ${activeIndex + 1}`} fill className="object-contain" />
              </motion.div>

              <button aria-label="Close" className="absolute top-4 right-4 text-white p-2 rounded hover:bg-white/10" onClick={closeLightbox}>
                <X className="h-6 w-6" />
              </button>
              <button aria-label="Prev" className="absolute left-3 md:left-6 text-white p-2 rounded hover:bg-white/10" onClick={prev}>
                <ChevronLeft className="h-8 w-8" />
              </button>
              <button aria-label="Next" className="absolute right-3 md:right-6 text-white p-2 rounded hover:bg-white/10" onClick={next}>
                <ChevronRight className="h-8 w-8" />
              </button>
            </div>

            {/* Thumbnails rail */}
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
              <div className="flex gap-2 overflow-x-auto no-scrollbar px-2">
                {images.map((src, i) => (
                  <button
                    key={i}
                    aria-label={`thumbnail ${i + 1}`}
                    className={`relative h-14 w-20 rounded-md overflow-hidden border ${i === activeIndex ? "border-white" : "border-white/20"}`}
                    onClick={() => setActiveIndex(i)}
                  >
                    <Image src={src} alt={`thumb ${i + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
