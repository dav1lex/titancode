"use client";

import { useLanguage } from "@/app/language-context";
import PortfolioProjectLayoutSimple from "@/components/layouts/PortfolioProjectLayoutSimple";

export default function Page() {
  const { t } = useLanguage();

  const projectData = {
    title: t("portfolio.projects.careerflex.title"),
    subtitle: t("portfolio.projects.careerflex.subtitle"),
    mainImage: "/images/portfolio/careerflex/cfx1.jpg",
    projectInfo: {
      client: t("portfolio.projects.careerflex.client"),
      year: t("portfolio.projects.careerflex.year"),
      duration: t("portfolio.projects.careerflex.duration"),
    },
    summaryText: <p>{t("portfolio.projects.careerflex.summaryText")}</p>,
    challengeText: <p>{t("portfolio.projects.careerflex.challengeText")}</p>,
    solutionText: <p>{t("portfolio.projects.careerflex.solutionText")}</p>,
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
      "Stripe",
      "Go",
      "Playwright",
      "Framer Motion",
    ],
    images: [
      "/images/portfolio/careerflex/c1.png",
      "/images/portfolio/careerflex/c2.png",
      "/images/portfolio/careerflex/c3.png",
      "/images/portfolio/careerflex/c4.png",
      "/images/portfolio/careerflex/c5.png",
      "/images/portfolio/careerflex/c6.png",
    ],
    liveSiteUrl: "https://careerflex.app",
    t: t,
  };

  return (
    <>
      <PortfolioProjectLayoutSimple {...projectData} />
    </>
  );
}
