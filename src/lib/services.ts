export const SERVICE_TIERS = {
  starter: {
    basePrice: 2500, // PLN
    includes: [],
    idealFor: 'estimatePage.tiers.starter.idealFor',
    techStack: 'estimatePage.tiers.starter.techStack',
    time: 'estimatePage.tiers.starter.time'
  },
  custom: {
    basePrice: 7000, // PLN
    includes: [],
    idealFor: 'estimatePage.tiers.custom.idealFor',
    techStack: 'estimatePage.tiers.custom.techStack',
    time: 'estimatePage.tiers.custom.time'
  },
  ecommerce: {
    basePrice: 10000, // PLN
    includes: [],
    idealFor: 'estimatePage.tiers.ecommerce.idealFor',
    techStack: 'estimatePage.tiers.ecommerce.techStack',
    time: 'estimatePage.tiers.ecommerce.time'
  },
  enterprise: {
    basePrice: 20000, // PLN
    includes: [],
    idealFor: 'estimatePage.tiers.enterprise.idealFor',
    techStack: 'estimatePage.tiers.enterprise.techStack',
    time: 'estimatePage.tiers.enterprise.time'
  }
} as const;

export type ServiceTierKey = keyof typeof SERVICE_TIERS;