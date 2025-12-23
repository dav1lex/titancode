"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { ProjectImageGallery } from "@/components/ProjectImageGallery";

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
          <div>
            <ProjectImageGallery
              title={title}
              images={[mainImage, ...images.filter((img) => img !== mainImage)]}
              screenshotsLabel={t("portfolio.projects.screenshotsTitle")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}