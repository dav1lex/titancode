"use client";

import { useLanguage } from "@/app/language-context";
import PortfolioProjectLayout from "@/components/layouts/PortfolioProjectLayout";

export default function Page() {
  const { t, language } = useLanguage();

  const projectData = {
    title: t("portfolio.projects.kurs8klasisty.title"),
    subtitle: t("portfolio.projects.kurs8klasisty.subtitle"),
    mainImage: "https://assets.titancode.pl/images/portfolio/english-tutor/main.png",
    projectInfo: {
      client: t("portfolio.projects.kurs8klasisty.client"),
      year: t("portfolio.projects.kurs8klasisty.year"),
      duration: t("portfolio.projects.kurs8klasisty.duration"),
    },
    summaryText: <p>{t("portfolio.projects.kurs8klasisty.summaryText")}</p>,
    challengeText: <p>{t("portfolio.projects.kurs8klasisty.challengeText")}</p>,
    solutionText: <p>{t("portfolio.projects.kurs8klasisty.solutionText")}</p>,
    technologies: ["HTML", "CSS", "PHP", "JavaScript", "MySQL", "Tailwind CSS", "Alpine.js"],
    images: [
      "https://assets.titancode.pl/images/portfolio/english-tutor/main.png",
      "https://assets.titancode.pl/images/portfolio/english-tutor/k2.png",
      "https://assets.titancode.pl/images/portfolio/english-tutor/k3.png",
      "https://assets.titancode.pl/images/portfolio/english-tutor/k4.png",
    ],
    liveSiteUrl: "https://kurs8klasisty.pl",
    t: t,
  };

  const techArticleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": t("portfolio.projects.kurs8klasisty.seoTitle"),
    "description": t("portfolio.projects.kurs8klasisty.seoDescription"),
    "image": projectData.mainImage,
    "author": {
      "@type": "Organization",
      "name": "TITANCODE"
    },
    "publisher": {
      "@type": "Organization",
      "name": "TITANCODE",
      "logo": {
        "@type": "ImageObject",
        "url": "https://titancode.pl/og-image.png"
      }
    },
    "datePublished": "2024-01-01", // Example date, should be dynamic in a real app
    "dateModified": "2024-01-01",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://titancode.pl/${language}/portfolio/kurs8klasisty`
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
        "name": t("nav.portfolio"),
        "item": `https://titancode.pl/${language}/portfolio`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": t("portfolio.projects.kurs8klasisty.title"),
        "item": `https://titancode.pl/${language}/portfolio/kurs8klasisty`
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(techArticleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <PortfolioProjectLayout {...projectData} />
    </>
  );
}