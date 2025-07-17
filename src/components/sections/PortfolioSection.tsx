"use client";

import { useLanguage } from "@/app/language-context";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
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
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const projects = [
  {
    id: 1,
    title: "NanoBid - Auction Platform",
    category: "Web Development",
    image: "https://assets.titancode.pl/images/portfolio/nanobid/n1.png",
    imageAlt: "NanoBid website preview",
    link: "/portfolio/nanobid",
  },
  {
    id: 2,
    title: "Kurs8Klasisty.pl",
    category: "Web Development",
    image: "https://assets.titancode.pl/images/portfolio/english-tutor/main.png",
    imageAlt: "Kurs8Klasisty.pl website preview",
    link: "/portfolio/kurs8klasisty",
  },
  {
    id: 3,
    title: "Your Project",
    category: "-------------",
    image: "https://placehold.co/600x400/000000/FFFFFF/png",
    imageAlt: "Your project preview",
    link: "/contact",
  },
];

export default function PortfolioSection() {
  const { t,language } = useLanguage();

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

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-sm sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto"
        >
          <CarouselContent>
            {projects.map((project) => (
              <CarouselItem key={project.id} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1 h-full">
                  <Card className="h-full flex flex-col bg-white/50 dark:bg-black/50 backdrop-blur-sm border-gray-200/50 dark:border-gray-800/50 hover:border-gray-300 dark:hover:border-gray-700 transition-all">
                    <CardHeader className="p-0">
                      <Image
                        src={project.image}
                        alt={project.imageAlt}
                        width={600}
                        height={400}
                        className="rounded-t-lg object-cover"
                      />
                    </CardHeader>
                    <CardContent className="pt-2 flex-grow">
                      <p className="text-xs font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">
                        {project.category}
                      </p>
                      <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                        {project.title}
                      </CardTitle>
                    </CardContent>
                    <CardFooter>
                      <Link href={`/${language}${project.link}`} className="w-full">
                        <Button variant="outline" className="w-full">
                          {t("portfolio.viewProject")}
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

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
