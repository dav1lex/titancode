"use client";

import { useLanguage } from "@/app/language-context";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function WarsawWebsitesLandingPage() {
  const { t, language } = useLanguage();

  return (
    <div className="bg-white dark:bg-black text-gray-900 dark:text-white transition-colors duration-300">
      <section className="py-14 sm:py-20 bg-gray-50 dark:bg-black">
        <div className="container mx-auto px-4">
          <p className="text-sm font-semibold tracking-wide text-gray-600 dark:text-gray-400">
            {t("landingWarsaw.kicker")}
          </p>
          <h1 className="mt-3 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
            {t("landingWarsaw.h1")}
          </h1>
          <p className="mt-6 max-w-3xl text-lg sm:text-xl text-gray-600 dark:text-gray-400">
            {t("landingWarsaw.lead")}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Button asChild size="lg">
              <Link href={`/${language}/contact`}>{t("landingWarsaw.primaryCta")}</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href={`/${language}/portfolio`}>{t("landingWarsaw.secondaryCta")}</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: t("landingWarsaw.cards.0.title"),
                desc: t("landingWarsaw.cards.0.desc"),
              },
              {
                title: t("landingWarsaw.cards.1.title"),
                desc: t("landingWarsaw.cards.1.desc"),
              },
              {
                title: t("landingWarsaw.cards.2.title"),
                desc: t("landingWarsaw.cards.2.desc"),
              },
            ].map((c) => (
              <Card key={c.title} className="p-6">
                <h2 className="text-xl font-bold">{c.title}</h2>
                <p className="mt-2 text-gray-600 dark:text-gray-400">{c.desc}</p>
              </Card>
            ))}
          </div>

          <div className="mt-14 max-w-3xl">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              {t("landingWarsaw.section2.title")}
            </h2>
            <ul className="mt-6 space-y-3 text-gray-700 dark:text-gray-300">
              {(
                [
                  t("landingWarsaw.section2.bullets.0"),
                  t("landingWarsaw.section2.bullets.1"),
                  t("landingWarsaw.section2.bullets.2"),
                  t("landingWarsaw.section2.bullets.3"),
                ] as const
              ).map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20 bg-gray-50 dark:bg-zinc-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            {t("landingWarsaw.finalCta.title")}
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-gray-600 dark:text-gray-400">
            {t("landingWarsaw.finalCta.desc")}
          </p>
          <div className="mt-8">
            <Button asChild size="lg">
              <Link href={`/${language}/calculate-estimate`}>{t("landingWarsaw.finalCta.button")}</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
