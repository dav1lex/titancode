"use client";

import { useLanguage } from "@/app/language-context";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { Send } from "lucide-react";

export default function ContactSection() {
  const { t } = useLanguage();

  return (
    <section className="w-full py-24 md:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-b from-gray-900 to-gray-600 dark:from-white dark:to-gray-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            {t("contact.title")}
          </motion.h2>

          <motion.p
            className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            viewport={{ once: true }}
          >
            {t("contact.subtitle")}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          viewport={{ once: true }}
        >
          <Card className="max-w-lg mx-auto bg-white/30 dark:bg-black/30 backdrop-blur-lg border border-gray-200/30 dark:border-gray-800/30 hover:border-gray-300/50 dark:hover:border-gray-700/50 transition-all duration-300 shadow-xl hover:shadow-2xl rounded-2xl overflow-hidden">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white text-center">
                {t("contact.form.submit")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">{t("contact.form.name")}</Label>
                <Input id="name" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">{t("contact.form.email")}</Label>
                <Input id="email" type="email" placeholder="john.doe@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">{t("contact.form.message")}</Label>
                <Textarea id="message" placeholder="Your message..." />
              </div>
            </CardContent>
            <CardFooter>
              <Button size="lg" className="w-full bg-gray-900 text-white dark:bg-white dark:text-black hover:bg-gray-700 dark:hover:bg-gray-200 transition-all duration-300 group">
                {t("contact.form.submit")}
                <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}