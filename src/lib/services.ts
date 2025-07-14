export const SERVICE_TIERS = {
  starter: {
    name: 'Professional Starter',
    basePrice: 3500, // PLN
    description: 'A bespoke, professionally engineered web presence for discerning individuals and small businesses.',
    includes: [
      'Comprehensive UI/UX Design',
      'Up to 5 custom-designed pages',
      'Full development & deployment',
      'Mobile-first responsive design',
      'Technical SEO setup & optimization',
      'Contact forms & lead capture',
      '30-day post-launch warranty'
    ],
    idealFor: 'Solo professionals, small service businesses, and portfolio sites.',
    techStack: 'HTML, CSS, JavaScript (Jamstack)',
    time: '1-2 weeks'
  },
  custom: {
    name: 'Enterprise Custom',
    basePrice: 9500, // PLN
    description: 'A tailored, high-performance digital solution engineered for established businesses and high-growth startups.',
    includes: [
      'Everything in Starter',
      'Up to 15 content pages',
      'Headless CMS integration',
      'Advanced analytics & reporting setup',
      'Custom API & third-party integrations',
      'Performance & speed optimization',
      'Priority email & chat support'
    ],
    idealFor: 'Established businesses, companies requiring complex integrations, and high-growth startups.',
    techStack: 'Next.js, TypeScript, or custom stack',
    time: '3-6 weeks'
  },
  ecommerce: {
    name: 'E-Commerce Pro',
    basePrice: 14000, // PLN
    description: 'A powerful, custom-built e-commerce platform engineered for growth and seamless customer experiences.',
    includes: [
      'Everything in Business Elite',
      'Full e-commerce functionality',
      'Secure payment gateway integration (Stripe, etc.)',
      'Product & inventory management',
      'Customer accounts & order history',
      'Abandoned cart recovery features'
    ],
    idealFor: 'Online retailers, direct-to-consumer brands, and subscription businesses.',
    techStack: 'Next.js, Shopify Headless, or custom solution',
    time: '5-10 weeks'
  },
  enterprise: {
    name: 'Enterprise Elite',
    basePrice: 28000, // PLN
    description: 'A comprehensive, bespoke digital ecosystem for large-scale organizations with complex operational needs.',
    includes: [
      'Everything in E-Commerce Premium',
      'Bespoke application & feature development',
      'Complex multi-system API architecture',
      'Advanced security & compliance (GDPR, etc.)',
      'Dedicated project & account manager',
      'Service Level Agreement (SLA)'
    ],
    idealFor: 'Large corporations, multi-national businesses, and organizations with unique workflow requirements.',
    techStack: 'Custom-architected solution',
    time: 'Project dependent'
  }
} as const;

export type ServiceTierKey = keyof typeof SERVICE_TIERS;