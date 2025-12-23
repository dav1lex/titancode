"use client";

import { useLanguage } from "@/app/language-context";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function CourseLandingPage() {
  const { t, language } = useLanguage();

  return (
    <div className="bg-white dark:bg-black text-gray-900 dark:text-white transition-colors duration-300">
      <section className="py-14 sm:py-20 bg-gray-50 dark:bg-black">
        <div className="container mx-auto px-4">
          <p className="text-sm font-semibold tracking-wide text-gray-600 dark:text-gray-400">
            {t("landingCourse.kicker")}
          </p>
          <h1 className="mt-3 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
            {t("landingCourse.h1")}
          </h1>
          <p className="mt-6 max-w-3xl text-lg sm:text-xl text-gray-600 dark:text-gray-400">
            {t("landingCourse.lead")}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Button asChild size="lg">
              <Link href={`/${language}/contact`}>{t("landingCourse.primaryCta")}</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href={`/${language}/services`}>{t("landingCourse.secondaryCta")}</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            {t("landingCourse.section1.title")}
          </h2>
          <p className="mt-4 max-w-3xl text-gray-600 dark:text-gray-400">
            {t("landingCourse.section1.desc")}
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <Card key={i} className="p-6">
                <h3 className="text-lg font-bold">{t(`landingCourse.cards.${i}.title`)}</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">{t(`landingCourse.cards.${i}.desc`)}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20 bg-gray-50 dark:bg-zinc-900">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            {t("landingCourse.section2.title")}
          </h2>
          <ul className="mt-6 space-y-3 text-gray-700 dark:text-gray-300">
            {[0, 1, 2, 3].map((i) => (
              <li key={i}>• {t(`landingCourse.section2.bullets.${i}`)}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            {t("landingCourse.finalCta.title")}
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-gray-600 dark:text-gray-400">
            {t("landingCourse.finalCta.desc")}
          </p>
          <div className="mt-8">
            <Button asChild size="lg">
              <Link href={`/${language}/calculate-estimate`}>{t("landingCourse.finalCta.button")}</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
