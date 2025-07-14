"use client";

import { useLanguage } from "@/app/language-context";
import { Button } from "@/components/ui/button";
import { SERVICE_TIERS, ServiceTierKey } from "@/lib/services";
import { ArrowRight, CheckCircle2, Briefcase, Lightbulb, PenSquare, Rocket } from "lucide-react";
import Link from "next/link";

export default function ServicesPage() {
  const { t } = useLanguage();
  const servicesOrder: ServiceTierKey[] = ["starter", "custom", "ecommerce", "enterprise"];

  return (
    <div className="bg-white dark:bg-black text-gray-900 dark:text-white transition-colors duration-300">
      {/* Hero Section */}
      <section className="py-12 sm:py-20 text-center bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
            {t("services.title")}
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-gray-600 dark:text-gray-400">
            {t("services.subtitle")}
          </p>
        </div>
      </section>


      {/* Services Details Section */}
      <section className="py-24 sm:py-32 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="space-y-20">
            {servicesOrder.map((key, index) => {
              const service = SERVICE_TIERS[key];
              const isEven = index % 2 === 0;

              return (
                <div key={key} className={`grid md:grid-cols-2 gap-12 items-center ${isEven ? '' : 'md:grid-flow-col-dense'}`}>
                  <div className={`prose prose-lg dark:prose-invert max-w-none ${isEven ? '' : 'md:col-start-2'}`}>
                    <h2 className="text-3xl font-bold">{t(`estimatePage.tiers.${key}.name`)}</h2>
                    <p>{t(`estimatePage.tiers.${key}.description`)}</p>
                    <ul className="mt-6 space-y-3">
                      {service.includes.map((item, i) => (
                        <li key={i} className="flex items-start">
                          <CheckCircle2 className="h-6 w-6 text-cyan-500 mr-3 mt-1 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-8">
                      <p><strong>{t('estimatePage.techStack')}:</strong> {service.techStack}</p>
                      <p><strong>{t('estimatePage.timeline')}:</strong> {service.time}</p>
                    </div>
                  </div>
                  <div className={`p-8 bg-white dark:bg-black rounded-2xl shadow-lg ${isEven ? '' : 'md:col-start-1'}`}>
                    <p className="text-sm font-semibold uppercase text-gray-500 dark:text-gray-400">{t('services.startingFrom')}</p>
                    <p className="text-5xl font-extrabold mt-2">{service.basePrice} PLN</p>
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

      {/* CTA Section */}
      <section className="bg-gray-100 dark:bg-gray-900 py-20 sm:py-24">
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
  );
}