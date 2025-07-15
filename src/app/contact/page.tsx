"use client";

import { useLanguage } from "@/app/language-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { FormEvent, useState } from "react";

export default function ContactPage() {
  const { t } = useLanguage();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [responseMessage, setResponseMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setResponseMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setResponseMessage(t("contact.form.successMessage"));
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus("error");
        setResponseMessage(t("contact.form.errorMessage"));
      }
    } catch (error) {
      setStatus("error");
      setResponseMessage(t("contact.form.errorMessage"));
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: t("contactPage.emailLabel"),
      value: t("contactPage.email"),
      href: `mailto:${t("contactPage.email")}`,
    },
    {
      icon: Phone,
      label: t("contactPage.phoneLabel"),
      value: t("contactPage.phone"),
      href: `tel:${t("contactPage.phone")}`,
    },
    {
      icon: MapPin,
      label: t("contactPage.addressTitle"),
      value: `${t("contactPage.addressLine1")}, ${t(
        "contactPage.addressLine2"
      )}`,
    },
  ];

  return (
    <div className="relative bg-white dark:bg-gray-900 min-h-screen">
      <div className="hidden lg:block lg:absolute lg:inset-0 lg:left-1/2">
        <div className="h-64 w-full bg-gray-50 dark:bg-gray-800 sm:h-80 lg:absolute lg:h-full" />
      </div>
      <div className="pb-24 pt-16 sm:pb-32 sm:pt-24 lg:mx-auto lg:grid lg:max-w-7xl lg:grid-cols-2 lg:pt-32">
        <div className="px-6 lg:px-8">
          <motion.div
            className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl bg-clip-text text-transparent bg-gradient-to-b from-gray-900 to-gray-600 dark:from-white dark:to-gray-300">
              {t("contact.title")}
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
              {t("contact.subtitle")}
            </p>
            <dl className="mt-10 space-y-8 text-base leading-7 text-gray-600 dark:text-gray-400">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={item.label}
                  className="flex gap-x-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                >
                  <dt className="flex-none">
                    <span className="sr-only">{item.label}</span>
                    <item.icon
                      className="h-7 w-6 text-gray-400"
                      aria-hidden="true"
                    />
                  </dt>
                  <dd>
                    {item.href ? (
                      <a className="hover:text-gray-900 dark:hover:text-white" href={item.href}>
                        {item.value}
                      </a>
                    ) : (
                      item.value
                    )}
                  </dd>
                </motion.div>
              ))}
            </dl>
          </motion.div>
        </div>
        <div className="px-6 lg:px-8 mt-16 lg:mt-0">
          <motion.div
            className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Card className="bg-white/30 dark:bg-black/30 backdrop-blur-lg border border-gray-200/30 dark:border-gray-800/30 shadow-xl rounded-2xl">
              <form onSubmit={handleSubmit}>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white text-center">
                    {t("contact.form.submit")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-800 dark:text-gray-300">{t("contact.form.name")}</Label>
                    <Input id="name" placeholder="John Doe" className="bg-white/50 dark:bg-black/50" value={name} onChange={(e) => setName(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-800 dark:text-gray-300">{t("contact.form.email")}</Label>
                    <Input id="email" type="email" placeholder="mail@example.com" className="bg-white/50 dark:bg-black/50" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-gray-800 dark:text-gray-300">{t("contact.form.message")}</Label>
                    <Textarea id="message" placeholder="Your message..." className="bg-white/50 dark:bg-black/50" value={message} onChange={(e) => setMessage(e.target.value)} required />
                  </div>
                  {responseMessage && (
                    <p className={`text-sm ${status === 'success' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                      {responseMessage}
                    </p>
                  )}
                  <Button size="lg" type="submit" disabled={status === 'loading'} className="w-full bg-gray-900 text-white dark:bg-white dark:text-black hover:bg-gray-700 dark:hover:bg-gray-200 transition-all duration-300 group">
                    {status === 'loading' ? t("contact.form.sending") : t("contact.form.submit")}
                    {status !== 'loading' && <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />}
                  </Button>
                </CardContent>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}