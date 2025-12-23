"use client";

import { useLanguage } from "@/app/language-context";
import { FaqSection } from "@/components/sections/FaqSection";
import { Button } from "@/components/ui/button";
import { SERVICE_TIERS, ServiceTierKey } from "@/lib/services";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function ServicesPage() {
  const { t, tArray, language } = useLanguage();
  const servicesOrder: ServiceTierKey[] = ["starter", "custom", "ecommerce", "enterprise"];

  // Service structured data removed to simplify SEO and avoid unused variables

  /* removed duplicate breadcrumbSchema */

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": t("nav.home"),
        "item": `https://www.titancode.pl/${language}`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": t("nav.services"),
        "item": `https://www.titancode.pl/${language}/services`
      }
    ]
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="bg-white dark:bg-black text-gray-900 dark:text-white transition-colors duration-300">
        {/* Hero Section */}
      <section className="py-12 sm:py-20 text-center bg-gray-50 dark:bg-black">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
            {t("services.title")}
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-gray-600 dark:text-gray-400">
            {t("services.subtitle")}
          </p>
        </div>
      </section>

      {/* Custom Solutions Section */}
      <section className="py-16 sm:py-20 bg-white dark:bg-zinc-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            {t("services.customSolutions.title")}
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-600 dark:text-gray-400">
            {t("services.customSolutions.description")}
          </p>

          {/* SEO: internal links to key landing pages */}
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <Button asChild variant="outline">
              <Link href={`/${language}/strony-internetowe-warszawa`}>{t("landingWarsaw.kicker")}</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href={`/${language}/landing-page-dla-kursu-online`}>{t("landingCourse.kicker")}</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href={`/${language}/panel-administracyjny-na-zamowienie`}>{t("landingAdminPanel.kicker")}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Details Section */}
      <section className="py-24 sm:py-32 bg-gray-50 dark:bg-black">
        <div className="container mx-auto px-4">
          <div className="space-y-20">
            {servicesOrder.map((key, index) => {
              const service = SERVICE_TIERS[key];
              const isEven = index % 2 === 0;

              return (
                <div key={key} className={`grid md:grid-cols-2 gap-12 items-center ${isEven ? '' : 'md:grid-flow-col-dense '}`}>
                  <div className={`prose prose-lg bg-white shadow-lg dark:prose-invert max-w-none dark:bg-zinc-900 p-8 rounded rounded-2xl ${isEven ? '' : 'md:col-start-2'}`}>
                    <h2 className="text-3xl font-bold">{t(`estimatePage.tiers.${key}.name`)}</h2>
                    <p>{t(`estimatePage.tiers.${key}.description`)}</p>
                    <ul className="mt-6 space-y-3">
                      {tArray(`estimatePage.tiers.${key}.includes`).map((item, i) => (
                        <li key={i} className="flex items-start">
                          <CheckCircle2 className="h-6 w-6 text-cyan-500 mr-3 mt-1 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-8">
                      <p><strong>{t('estimatePage.techStack')}:</strong> {t(service.techStack)}</p>
                      <p><strong>{t('estimatePage.timeline')}:</strong> {t(service.time)}</p>
                    </div>
                  </div>
                  <div className={`p-8 bg-white dark:bg-zinc-900 rounded-2xl shadow-lg ${isEven ? '' : 'md:col-start-1'}`}>
                    <p className="text-sm font-semibold uppercase text-gray-500 dark:text-gray-400">{t('services.startingFrom')}</p>
                    <p className="text-5xl font-extrabold mt-2">{service.basePrice} {t("currency.pln")}</p>
                    <p className="mt-4 text-gray-600 dark:text-gray-300">{t(`estimatePage.tiers.${key}.description`)}</p>
                    <Button asChild size="lg" className="mt-8 w-full">
                      <Link href="/calculate-estimate">
                        {t("calculateEstimate.cta")}
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <FaqSection />

      {/* CTA Section */}
      <section className="bg-gray-100 dark:bg-zinc-900 py-20 sm:py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            {t("calculateEstimate.title")}
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400 ">
            {t("calculateEstimate.subtitle")}
          </p>
          <div className="mt-8">
            <Button asChild size="lg">
              <Link href="/calculate-estimate">
                {t("calculateEstimate.cta")}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      </div>
    </>
  );
}