export const SERVICE_TIERS = {
  starter: {
    name: 'Professional Starter',
    basePrice: 2500, // PLN
    description: 'A bespoke, professionally engineered web presence for discerning individuals and small businesses.',
    includes: [
      'Up to 5 pages',
      'Bespoke, responsive design',
      'Core SEO optimization',
      'Secure SSL Certificate (3 months)',
      'Contact & inquiry forms'
    ],
    idealFor: 'Solo professionals, small service businesses, and portfolio sites.',
    techStack: 'HTML, CSS, JavaScript (Jamstack)',
    time: '1-2 weeks'
  },
  custom: {
    name: 'Enterprise Custom',
    basePrice: 7000, // PLN
    description: 'A tailored, high-performance digital solution engineered for established businesses and high-growth startups.',
    includes: [
      'Up to 15 pages',
      'Custom-engineered features',
      'Advanced SEO & performance optimization',
      'Custom API integrations',
      'Priority support & maintenance'
    ],
    idealFor: 'Established businesses, companies requiring complex integrations, and high-growth startups.',
    techStack: 'Next.js, TypeScript, or custom stack',
    time: '3-6 weeks'
  },
  ecommerce: {
    name: 'E-Commerce Pro',
    basePrice: 9500, // PLN
    description: 'A powerful, custom-built e-commerce platform engineered for growth and seamless customer experiences.',
    includes: [
      'Everything in Enterprise Custom',
      'Unlimited product listings',
      'Secure payment gateway integration',
      'Advanced inventory management',
      'Customer accounts & order history'
    ],
    idealFor: 'Online retailers, direct-to-consumer brands, and subscription businesses.',
    techStack: 'Next.js, Shopify Headless, or custom solution',
    time: '5-10 weeks'
  },
  enterprise: {
    name: 'Enterprise Elite',
    basePrice: 20000, // PLN
    description: 'A comprehensive, bespoke digital ecosystem for large-scale organizations with complex operational needs.',
    includes: [
      'Everything in E-Commerce Pro',
      'Full-scale custom application development',
      'Multi-system API integrations',
      'Advanced security & compliance audits',
      'Dedicated project manager & team'
    ],
    idealFor: 'Large corporations, multi-national businesses, and organizations with unique workflow requirements.',
    techStack: 'Custom-architected solution',
    time: 'Project dependent'
  }
} as const;

export type ServiceTierKey = keyof typeof SERVICE_TIERS;