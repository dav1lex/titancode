"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

type Props = {
  title: string;
  images: string[];
  screenshotsLabel: string;
};

export function ProjectImageGallery({ title, images, screenshotsLabel }: Props) {
  const allImages = useMemo(() => images.filter(Boolean), [images]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [api, setApi] = useState<CarouselApi | null>(null);

  const openLightbox = useCallback((index: number) => {
    setActiveIndex(index);
    setLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => setLightboxOpen(false), []);

  const prev = useCallback(() => {
    setActiveIndex((idx) => (idx - 1 + allImages.length) % allImages.length);
  }, [allImages.length]);

  const next = useCallback(() => {
    setActiveIndex((idx) => (idx + 1) % allImages.length);
  }, [allImages.length]);

  // Keep carousel and thumbnails in sync.
  useEffect(() => {
    if (!api) return;
    api.scrollTo(activeIndex);
  }, [api, activeIndex]);

  // Keyboard controls for lightbox.
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

  if (allImages.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="text-lg font-semibold">{screenshotsLabel}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {activeIndex + 1}/{allImages.length}
        </p>
      </div>

      {/* Mobile: swipe carousel */}
      <div className="md:hidden">
        <Carousel setApi={setApi} opts={{ align: "start", loop: true }} className="w-full">
          <CarouselContent>
            {allImages.map((src, idx) => (
              <CarouselItem key={src + idx} className="basis-full">
                <button
                  type="button"
                  onClick={() => openLightbox(idx)}
                  className="relative w-full aspect-[4/3] overflow-hidden rounded-xl border bg-black/5 dark:bg-white/5"
                >
                  <Image
                    src={src}
                    alt={`${title} screenshot ${idx + 1}`}
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />
                </button>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2" />
          <CarouselNext className="right-2" />
        </Carousel>
      </div>

      {/* Desktop: main preview + thumbnail strip */}
      <div className="hidden md:block">
        <button
          type="button"
          onClick={() => openLightbox(activeIndex)}
          className="relative w-full aspect-[16/10] overflow-hidden rounded-xl border bg-black/5 dark:bg-white/5"
        >
          <Image
            src={allImages[activeIndex]}
            alt={`${title} screenshot ${activeIndex + 1}`}
            fill
            className="object-contain"
            sizes="(min-width: 768px) 50vw, 100vw"
            priority
          />
        </button>

        <div className="mt-3 flex gap-2 overflow-x-auto pb-2">
          {allImages.map((src, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={src + idx}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className={
                  "relative h-20 w-28 flex-shrink-0 overflow-hidden rounded-lg border transition " +
                  (isActive
                    ? "border-primary ring-2 ring-primary/30"
                    : "border-white/10 hover:border-white/20")
                }
              >
                <Image
                  src={src}
                  alt={`${title} thumbnail ${idx + 1}`}
                  fill
                  className="object-cover"
                  sizes="112px"
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Lightbox */}
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

            {allImages.length > 1 && (
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
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.15 }}
              className="relative w-[92vw] h-[82vh] md:w-[86vw] md:h-[74vh]"
            >
              <Image
                src={allImages[activeIndex]}
                alt={`${title} fullscreen ${activeIndex + 1}`}
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
