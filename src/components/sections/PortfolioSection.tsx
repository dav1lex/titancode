"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/app/language-context";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import type { CarouselApi } from "@/components/ui/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const projects = [
  {
    id: 1,
    title: "NanoBid - Auction Platform",
    category: "Web Development",
    image: "/images/portfolio/nanobid/n1.png",
    imageAlt: "NanoBid website preview",
    link: "/portfolio/nanobid",
  },
  {
    id: 2,
    title: "Kurs8Klasisty.pl",
    category: "Web Development",
    image: "/images/portfolio/english-tutor/main.png",
    imageAlt: "Kurs8Klasisty.pl website preview",
    link: "/portfolio/kurs8klasisty",
  },
  {
    id: 3,
    title: "CareerFlex - AI job search assistant",
    category: "Web App",
    image: "/images/portfolio/careerflex/cfx1.jpg",
    imageAlt: "CareerFlex preview",
    link: "/portfolio/careerflex",
  },
  {
    id: 4,
    title: "Your Project",
    category: "-------------",
    image: "https://placehold.co/600x400/000000/FFFFFF/png",
    imageAlt: "Your project preview",
    link: "/contact",
  },
];

export default function PortfolioSection() {
  const { t, language } = useLanguage();
  const [api, setApi] = useState<CarouselApi>();

  // Auto-scroll every 3 seconds (mobile and desktop)
  useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, 3000);

    return () => clearInterval(interval);
  }, [api]);

  return (
    <section className="relative w-full py-24 bg-white dark:bg-black transition-all duration-300 z-10">
      <div className="absolute inset-0 h-full w-full bg-white dark:bg-black bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#374151_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-b from-gray-900 to-gray-600 dark:from-white dark:to-gray-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            {t("portfolio.title")}
          </motion.h2>
          
          <motion.p 
            className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            viewport={{ once: true }}
          >
            {t("portfolio.subtitle")}
          </motion.p>
        </div>

        <div className="relative">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            setApi={setApi}
            className="w-full max-w-sm sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto"
          >
            <CarouselContent>
              {projects.map((project) => (
                <CarouselItem key={project.id} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1 h-full">
                    <Link href={`/${language}${project.link}`} className="block h-full group">
                      <Card className="h-full flex flex-col overflow-hidden bg-card backdrop-blur border-border hover:border-primary/40 hover:shadow-md transition-all duration-300">
                        <CardHeader className="p-0">
                          <div className="relative w-full aspect-[4/3] overflow-hidden bg-muted">
                            <Image
                              src={project.image}
                              alt={project.imageAlt}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          </div>
                        </CardHeader>
                        <CardContent className="p-5 flex-1">
                          <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">
                            {project.category}
                          </p>
                          <CardTitle className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                            {project.title}
                          </CardTitle>
                        </CardContent>
                      </Card>
                    </Link>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            {/* Navigation buttons - hidden on mobile, shown on lg+ */}
            <div className="hidden lg:block">
              <CarouselPrevious />
              <CarouselNext />
            </div>
          </Carousel>
          
          {/* Mobile navigation dots indicator (optional, can add if needed) */}
        </div>

        <div className="mt-16 text-center">
          <Link href={`/${language}/portfolio`}>
            <Button 
              size="lg" 
              variant="outline"
              className="border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-100 active:bg-gray-100 dark:hover:bg-gray-800 dark:active:bg-gray-800 rounded-md px-6 transition-all"
            >
              {t("portfolio.viewAll")}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
