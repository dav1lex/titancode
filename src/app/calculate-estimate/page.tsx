"use client";
import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../language-context';
import { SERVICE_TIERS, ServiceTierKey } from '@/lib/services';
import { Info } from 'lucide-react';

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
    value: 1500,
    appliesTo: ['starter', 'custom', 'ecommerce', 'enterprise']
  },
  constantSupport: {
    label: 'Monthly support retainer',
    description: 'Ongoing technical support, updates, and performance monitoring.',
    type: 'surcharge',
    value: 0, // Note: This is now handled by SUPPORT_COST
    appliesTo: ['starter', 'custom', 'ecommerce', 'enterprise']
  }
};

type OptionKey = keyof typeof ADDITIONAL_OPTIONS;

const SUPPORT_COST = {
  starter: 600,
  custom: 1500,
  ecommerce: 2500,
  enterprise: 4000
};

export default function CalculateEstimatePage() {
  const { t } = useLanguage();
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

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
        <div className="p-8 md:p-12">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl">{t('estimatePage.mainTitle')}</h1>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">{t('estimatePage.mainSubtitle')}</p>
          </div>

          <div className="space-y-12">
            {/* Service Tier Selection */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t('estimatePage.step1Title')}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {Object.keys(SERVICE_TIERS).map((key) => {
                  const serviceKey = key as ServiceTierKey;
                  const service = SERVICE_TIERS[serviceKey];
                  return (
                    <div
                      key={serviceKey}
                      className={`p-6 border-2 rounded-xl transition-all ${
                        tier === serviceKey
                          ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-cyan-400 dark:hover:border-cyan-600'
                      }`}
                    >
                      <button onClick={() => setTier(serviceKey)} className="w-full text-left space-y-2">
                        <h3 className="font-bold text-xl text-gray-900 dark:text-white">{t(`estimatePage.tiers.${serviceKey}.name`)}</h3>
                        <p className="text-gray-600 dark:text-gray-300">{t(`estimatePage.tiers.${serviceKey}.description`)}</p>
                        <div className="text-sm text-gray-500 dark:text-gray-400 space-y-1 pt-2">
                          <p><strong>{t('estimatePage.techStack')}:</strong> {service.techStack}</p>
                          <p><strong>{t('estimatePage.timeline')}:</strong> {service.time}</p>
                        </div>
                        <p className="text-2xl font-bold text-cyan-600 dark:text-cyan-400 pt-2">{service.basePrice} PLN</p>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Project Details & Results */}
            {tier && (
              <div ref={detailsRef} className="transition-all duration-500 ease-in-out pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('estimatePage.step2Title')}</h2>
                    <div className="space-y-5">
                    {(Object.keys(ADDITIONAL_OPTIONS) as OptionKey[]).map((key) => {
                      const option = ADDITIONAL_OPTIONS[key];
                      if (!tier || !option.appliesTo.includes(tier)) return null;

                      return (
                        <div key={key} className="flex items-center">
                          <input
                            type="checkbox"
                            id={key}
                            checked={selectedOptions[key]}
                            onChange={() => handleOptionChange(key)}
                            className="h-5 w-5 text-cyan-600 focus:ring-cyan-500 border-gray-300 rounded"
                          />
                          <label htmlFor={key} className="ml-3 block text-gray-700 dark:text-gray-300 flex-grow">
                            {t(`estimatePage.options.${key}`)}
                            {option.type === 'discount' && ` ${t('estimatePage.optionDetails.discount').replace('{value}', (option.value * 100).toString())}`}
                            {option.type === 'surcharge' && typeof option.value === 'number' && ` ${t('estimatePage.optionDetails.surcharge').replace('{value}', option.value.toString())}`}
                          </label>
                          <div className="relative group">
                            <Info className="h-5 w-5 text-gray-400 dark:text-gray-500 cursor-help" />
                            <div className="absolute bottom-full mb-2 w-64 bg-gray-800 text-white text-sm rounded-lg p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10 right-0 transform translate-x-1/2">
                              {t(`estimatePage.options.${key}_description`)}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Results */}
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t('estimatePage.estimateTitle')}</h2>
                  {tier && (
                    <div className="space-y-4">
                      <div className="flex justify-between text-gray-700 dark:text-gray-300">
                        <span>{t('estimatePage.basePrice')}:</span>
                        <span className="font-medium">{SERVICE_TIERS[tier].basePrice} PLN</span>
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
                          <div key={key} className={`flex justify-between text-sm ${option.type === 'discount' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                            <span>{t(`estimatePage.summary.${key}`)}:</span>
                            <span>{option.type === 'discount' ? '-' : '+'}{Math.round(amount)} PLN</span>
                          </div>
                        );
                      })}

                      <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                        <div className="flex justify-between font-bold text-xl text-gray-900 dark:text-white">
                          <span>{t('estimatePage.totalCost')}:</span>
                          <span>{calculateTotal()} PLN</span>
                        </div>
                        <div className="flex justify-between text-lg text-gray-800 dark:text-gray-200">
                          <span>{t('estimatePage.upfrontPayment')}:</span>
                          <span className="font-medium">{Math.round(calculateTotal() * 0.4)} PLN</span>
                        </div>
                      </div>

                      {selectedOptions.constantSupport && (
                        <div className="text-sm text-gray-600 dark:text-gray-400 mt-2 text-right">
                          {t('estimatePage.monthlySupport').replace('{cost}', getSupportCost().toString())}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                  <div className="md:col-span-2 pt-8">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{t('estimatePage.includedTitle')}</h3>
                    <ul className="text-gray-600 dark:text-gray-300 space-y-2 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                      {SERVICE_TIERS[tier].includes.map((item, i) => (
                        <li key={i} className="flex items-start">
                          <svg className="h-5 w-5 text-cyan-500 mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {tier && (
            <div className="mt-10 text-center">
              <button
                onClick={resetCalculator}
                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 underline transition-colors"
              >
                {t('estimatePage.startOver')}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}