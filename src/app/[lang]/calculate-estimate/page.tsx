"use client";
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/app/language-context';
import { SERVICE_TIERS, ServiceTierKey } from '@/lib/services';
import {
  Info,
  Calculator,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Zap,
  TrendingUp,
  Shield,
  Clock,
  Users,
  Palette,
  Code,
  Globe,
  Headphones
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ClientNumber } from '@/components/ui/client-number';
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

type OptionConfig = {
  label: string;
  description: string;
  type: 'discount' | 'surcharge';
  value: number;
  appliesTo: ServiceTierKey[];
};

const ADDITIONAL_OPTIONS: Record<string, OptionConfig> = {
  hasDesign: {
    label: 'I already have a design',
    description: 'Reduces cost if you provide a complete, development-ready design file (e.g., Figma).',
    type: 'discount',
    value: 0.10,
    appliesTo: ['starter', 'custom', 'ecommerce', 'enterprise']
  },
  contentSeoPack: {
    label: 'Content & SEO Pack',
    description: 'Professional content writing for up to 5 pages combined with advanced SEO to maximize organic traffic.',
    type: 'surcharge',
    value: 2200,
    appliesTo: ['starter', 'custom', 'ecommerce', 'enterprise']
  },
  advancedFeaturesPack: {
    label: 'Advanced Features Pack',
    description: 'Includes a custom admin panel and automated PDF generation/mailing capabilities.',
    type: 'surcharge',
    value: 4000,
    appliesTo: ['custom', 'ecommerce', 'enterprise']
  },
  logoDesign: {
    label: 'Logo design',
    description: 'A unique, professional logo to represent your brand identity.',
    type: 'surcharge',
    value: 100, // Fixed price for logo design
    // Note: This is a fixed price and does not depend on the service tier
    appliesTo: ['starter', 'custom', 'ecommerce', 'enterprise']
  },
  constantSupport: {
    label: 'Monthly support retainer',
    description: 'Ongoing technical support, updates, and performance monitoring.',
    type: 'surcharge',
    value: 0, // Note: This is now handled by SUPPORT_COST
    appliesTo: ['starter', 'custom', 'ecommerce', 'enterprise']
  },
  customOption: {
    label: 'Custom requirement',
    description: 'If you have any specific requirements that are not covered by the options above, please let us know. We can customize the package to fit your needs.',
    type: 'surcharge',
    value: 0, // This will be handled separately based on user input
    appliesTo: ['starter', 'custom', 'ecommerce', 'enterprise']
  }
};

type OptionKey = keyof typeof ADDITIONAL_OPTIONS;

const SUPPORT_COST = {
  starter: 100,
  custom: 200,
  ecommerce: 300,
  enterprise: 500
};

export default function CalculateEstimatePage() {
  const { t, tArray } = useLanguage();
  const [tier, setTier] = useState<ServiceTierKey | ''>('');
  const detailsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (tier && detailsRef.current) {
      detailsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [tier]);

  const [selectedOptions, setSelectedOptions] = useState<Record<OptionKey, boolean>>({
    hasDesign: false,
    contentSeoPack: false,
    advancedFeaturesPack: false,
    logoDesign: false,
    constantSupport: false
  });

  const handleOptionChange = (option: OptionKey) => {
    setSelectedOptions(prev => ({ ...prev, [option]: !prev[option] }));
  };

  const resetCalculator = () => {
    setTier('');
    setSelectedOptions({
      hasDesign: false,
      contentSeoPack: false,
      advancedFeaturesPack: false,
      logoDesign: false,
      constantSupport: false
    });
  };

  const calculateTotal = () => {
    if (!tier) return 0;

    let finalPrice = SERVICE_TIERS[tier].basePrice;

    Object.entries(selectedOptions).forEach(([key, isSelected]) => {
      if (!isSelected) return;

      const optionKey = key as OptionKey;
      const option = ADDITIONAL_OPTIONS[optionKey];

      if (option.appliesTo.includes(tier)) {
        if (option.type === 'discount') {
          finalPrice -= SERVICE_TIERS[tier].basePrice * option.value;
        } else if (option.type === 'surcharge' && typeof option.value === 'number') {
          // Fixed price surcharge
          finalPrice += option.value;
        }
      }
    });

    return Math.max(1000, Math.round(finalPrice));
  };

  const getSupportCost = () => {
    if (!tier || !selectedOptions.constantSupport) return 0;
    return SUPPORT_COST[tier];
  };

  const getServiceIcon = (serviceKey: ServiceTierKey) => {
    const icons = {
      starter: Code,
      custom: Sparkles,
      ecommerce: TrendingUp,
      enterprise: Shield
    };
    return icons[serviceKey] || Code;
  };

  const getOptionIcon = (optionKey: OptionKey) => {
    const icons: Record<OptionKey, typeof Info> = {
      hasDesign: Palette,
      contentSeoPack: Globe,
      advancedFeaturesPack: Zap,
      logoDesign: Sparkles,
      constantSupport: Headphones
    };
    return icons[optionKey] || Info;
  };

  const [currentStep, setCurrentStep] = useState<'services' | 'customize'>('services');

  return (
    <div className="bg-white dark:bg-black text-gray-900 dark:text-white transition-colors duration-300">
      {/* Hero Section */}
      <section className="pt-12 pb-6 text-center bg-gray-50 dark:bg-black">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
            {t('estimatePage.mainTitle')}
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-8">
            {t('estimatePage.mainSubtitle')}
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-600 dark:text-gray-400">
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 sm:py-16">
        {/* Step Navigation */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center gap-4">
            <Button
              variant={currentStep === 'services' ? 'default' : 'outline'}
              onClick={() => setCurrentStep('services')}
              className="flex items-center gap-2"
            >
              <Sparkles className="h-4 w-4" />
              {t('estimatePage.step1Button')}
            </Button>
            <ArrowRight className="h-4 w-4 text-gray-400" />
            <Button
              variant={currentStep === 'customize' ? 'default' : 'outline'}
              onClick={() => tier && setCurrentStep('customize')}
              disabled={!tier}
              className="flex items-center gap-2"
            >
              <Zap className="h-4 w-4" />
              {t('estimatePage.step2Button')}
            </Button>
          </div>
        </div>

        {/* Services Selection */}
        {currentStep === 'services' && (
          <div className="space-y-8">
            <div className="text-center mb-8 ">
              <h2 className="text-3xl font-bold mb-4">{t('estimatePage.step1Title')}</h2>
              <p className="text-gray-600 dark:text-gray-400">{t('estimatePage.step1Subtitle')}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
              {Object.keys(SERVICE_TIERS).map((key) => {
                const serviceKey = key as ServiceTierKey;
                const service = SERVICE_TIERS[serviceKey];
                const IconComponent = getServiceIcon(serviceKey);
                const isSelected = tier === serviceKey;

                return (
                  <Card
                    key={serviceKey}
                    className={`relative cursor-pointer transition-all duration-300 hover:shadow-lg bg-white dark:bg-zinc-900 ${isSelected ? 'ring-2 ring-black dark:ring-white shadow-lg' : 'hover:shadow-md'
                      }`}
                    onClick={() => setTier(serviceKey)}
                  >
                    <CardHeader className="pt-4 ">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${isSelected ? 'bg-black dark:bg-white text-white dark:text-black' : 'bg-gray-100 dark:bg-zinc-800'}`}>
                            <IconComponent className="h-5 w-5" />
                          </div>
                          <div>
                            <CardTitle className="text-xl">{t(`estimatePage.tiers.${serviceKey}.name`)}</CardTitle>
                            <CardDescription className="text-sm">{t(`estimatePage.tiers.${serviceKey}.description`)}</CardDescription>
                          </div>
                        </div>
                        {isSelected && <CheckCircle2 className="h-6 w-6 text-black dark:text-white" />}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 gap-3 text-sm">
                        <div className="flex items-center gap-2">
                          <Code className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                          <span><strong>Tech:</strong> {t(service.techStack)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                          <span><strong>Timeline:</strong> {t(service.time)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                          <span><strong>Ideal for:</strong> {t(service.idealFor)}</span>
                        </div>
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500 dark:text-gray-400">{t('estimatePage.startingFrom')}</span>
                        <div className="text-right">
                          <div className="text-2xl font-bold">
                            <ClientNumber value={service.basePrice} /> {t('currency.pln')}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {tier && (
              <div className="text-center pt-8">
                <Button
                  size="lg"
                  onClick={() => setCurrentStep('customize')}
                  className="group"
                >
                  {t('estimatePage.continueButton')}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Customization */}
        {currentStep === 'customize' && tier && (
          <div ref={detailsRef} className="space-y-8 ">

            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">{t('estimatePage.step2Title')}</h2>
              <p className="text-gray-600 dark:text-gray-400">{t('estimatePage.step2Subtitle')}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Options */}
              <div className="lg:col-span-2 space-y-4">
                {(Object.keys(ADDITIONAL_OPTIONS) as OptionKey[]).map((key) => {
                  const option = ADDITIONAL_OPTIONS[key];
                  if (!tier || !option.appliesTo.includes(tier)) return null;

                  const IconComponent = getOptionIcon(key);
                  const isSelected = selectedOptions[key];

                  return (
                    <Card key={key} className={`transition-all duration-200 bg-white dark:bg-zinc-900   ${isSelected ? 'ring-2 ring-black dark:ring-white' : ''}`}>
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between gap-1">
                          <div className="flex items-center gap-6 flex-1 ">
                            <div className={`p-2 rounded-lg ${isSelected ? 'bg-black dark:bg-white text-white dark:text-black' : 'bg-gray-100 dark:bg-zinc-800'}`}>
                              <IconComponent className="h-5 w-5" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2 ">
                                <h3 className="font-semibold">{t(`estimatePage.options.${key}`)}</h3>
                                {option.type === 'discount' && (
                                  <Badge variant="secondary" className="text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-950">
                                    -{(option.value * 100)}%
                                  </Badge>
                                )}
                                {option.type === 'surcharge' && option.value > 0 && (
                                  <Badge variant="secondary" className="text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950">
                                    +<ClientNumber value={option.value} /> zł
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {t(`estimatePage.options.${key}_description`)}
                              </p>
                            </div>
                          </div>
                          <Switch
                            checked={isSelected}
                            onCheckedChange={() => handleOptionChange(key)}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Estimate Summary */}
              {/* Estimate Summary */}
              <div className="lg:col-span-1">
                <Card className="sticky top-24 bg-white dark:bg-zinc-900">
                  <CardHeader className='p-4'>
                    <CardTitle className="flex items-center gap-2">
                      <Calculator className="h-5 w-5" />
                      {t('estimatePage.estimateTitle')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 space-y-4">
                    {/* Price Breakdown */}
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">{t('estimatePage.selectedPackage')}:</span>
                        <span className="font-semibold underline">{t(`estimatePage.tiers.${tier}.name`)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">{t('estimatePage.basePrice')}:</span>
                        <span className="font-medium"><ClientNumber value={SERVICE_TIERS[tier].basePrice} /> {t('currency.pln')}</span>
                      </div>

                      {(Object.keys(selectedOptions) as OptionKey[]).map((key) => {
                        if (!selectedOptions[key]) return null;
                        const option = ADDITIONAL_OPTIONS[key];
                        if (!tier || !option.appliesTo.includes(tier)) return null;

                        let amount = 0;
                        if (option.type === 'discount') {
                          amount = SERVICE_TIERS[tier].basePrice * option.value;
                        } else if (typeof option.value === 'number') {
                          amount = option.value;
                        }

                        if (key === 'constantSupport') return null;

                        return (
                          <div key={key} className="flex justify-between text-sm">
                            <span className="text-gray-600 dark:text-gray-400">{t(`estimatePage.summary.${key}`)}:</span>
                            <span className={option.type === 'discount' ? 'text-green-600 dark:text-green-400' : 'text-blue-600 dark:text-blue-400'}>
                              {option.type === 'discount' ? '-' : '+'}<ClientNumber value={Math.round(amount)} /> {t('currency.pln')}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    <Separator />

                    {/* Total */}
                    <div className="space-y-2">
                      <div className="flex justify-between font-bold text-lg">
                        <span>{t('estimatePage.totalCost')}:</span>
                        <span><ClientNumber value={calculateTotal()} /> {t('currency.pln')}</span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                        <span>{t('estimatePage.upfrontPayment')}:</span>
                        <span><ClientNumber value={Math.round(calculateTotal() * 0.4)} /> {t('currency.pln')}</span>
                      </div>
                    </div>

                    {/* Monthly Support */}
                    {selectedOptions.constantSupport && (
                      <div className="p-3 bg-gray-50 dark:bg-zinc-800 rounded-lg">
                        <div className="text-sm">
                          <div className="font-medium mb-1">{t('estimatePage.monthlySupportTitle')}</div>
                          <div className="text-gray-600 dark:text-gray-400">
                            <ClientNumber value={getSupportCost()} /> {t('currency.pln')}/{t('estimatePage.monthly')}
                          </div>
                        </div>
                      </div>
                    )}

                  

                    {/* CTA Button */}
                    <Link href="/contact" className="w-full">
                      <Button className="w-full" size="lg">
                        {t('estimatePage.getQuoteButton')}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>

                    <Separator className="my-4" />

                    {/* What's Included */}
                    <div className="space-y-3">
                      <h3 className="font-semibold flex items-center">
                        <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                        {t('estimatePage.includedTitle')}
                      </h3>
                      <div className="space-y-2">
                        {tArray(`estimatePage.tiers.${tier}.includes`).map((item, i) => (
                          <div key={i} className="flex items-start gap-2.5 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-600 dark:text-gray-400">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                      <div className="p-3 bg-blue-50 dark:bg-blue-950/50 rounded-lg border border-blue-200 dark:border-blue-800">
                      <div className="flex items-start gap-3">
                        <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-blue-800 dark:text-blue-300">{t('estimatePage.estimateDisclaimerTitle')}</h4>
                          <p className="text-sm text-blue-700 dark:text-blue-400">
                            {t('estimatePage.estimateDisclaimerText')}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

           
          </div>
        )}

        {tier && (
          <div className="text-center mt-12">
            <Button variant="outline" onClick={resetCalculator}>
              {t('estimatePage.startOver')}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}