export const SERVICE_TIERS = {
  starter: {
    basePrice: 2500, // PLN
    includes: [
      'estimatePage.tiers.starter.includes.0',
      'estimatePage.tiers.starter.includes.1',
      'estimatePage.tiers.starter.includes.2',
      'estimatePage.tiers.starter.includes.3',
      'estimatePage.tiers.starter.includes.4',
      'estimatePage.tiers.starter.includes.5',
      'estimatePage.tiers.starter.includes.6'
    ],
    idealFor: 'estimatePage.tiers.starter.idealFor',
    techStack: 'estimatePage.tiers.starter.techStack',
    time: 'estimatePage.tiers.starter.time'
  },
  custom: {
    basePrice: 7000, // PLN
    includes: [
      'estimatePage.tiers.custom.includes.0',
      'estimatePage.tiers.custom.includes.1',
      'estimatePage.tiers.custom.includes.2',
      'estimatePage.tiers.custom.includes.3',
      'estimatePage.tiers.custom.includes.4',
      'estimatePage.tiers.custom.includes.5',
      'estimatePage.tiers.custom.includes.6'
    ],
    idealFor: 'estimatePage.tiers.custom.idealFor',
    techStack: 'estimatePage.tiers.custom.techStack',
    time: 'estimatePage.tiers.custom.time'
  },
  ecommerce: {
    basePrice: 10000, // PLN
    includes: [
      'estimatePage.tiers.ecommerce.includes.0',
      'estimatePage.tiers.ecommerce.includes.1',
      'estimatePage.tiers.ecommerce.includes.2',
      'estimatePage.tiers.ecommerce.includes.3',
      'estimatePage.tiers.ecommerce.includes.4',
      'estimatePage.tiers.ecommerce.includes.5'
    ],
    idealFor: 'estimatePage.tiers.ecommerce.idealFor',
    techStack: 'estimatePage.tiers.ecommerce.techStack',
    time: 'estimatePage.tiers.ecommerce.time'
  },
  enterprise: {
    basePrice: 20000, // PLN
    includes: [
      'estimatePage.tiers.enterprise.includes.0',
      'estimatePage.tiers.enterprise.includes.1',
      'estimatePage.tiers.enterprise.includes.2',
      'estimatePage.tiers.enterprise.includes.3',
      'estimatePage.tiers.enterprise.includes.4',
      'estimatePage.tiers.enterprise.includes.5'
    ],
    idealFor: 'estimatePage.tiers.enterprise.idealFor',
    techStack: 'estimatePage.tiers.enterprise.techStack',
    time: 'estimatePage.tiers.enterprise.time'
  }
} as const;

export type ServiceTierKey = keyof typeof SERVICE_TIERS;