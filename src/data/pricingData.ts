export type Plan = {
  id: string;
  name: string;
  basePrice: number;
  description: string;
  features: string[];
  recommended?: boolean;
};

export type Addon = {
  id: string;
  name: string;
  price: number;
  description: string;
};

export const plans: Plan[] = [
  {
    id: 'basic',
    name: 'Basic',
    basePrice: 9,
    description: 'For personal projects and small sites',
    features: ['1 Website', '10GB Storage', 'Basic Support'],
  },
  {
    id: 'pro',
    name: 'Pro',
    basePrice: 29,
    description: 'For growing businesses and teams',
    features: [
      'Unlimited Websites',
      '100GB Storage',
      'Priority Support',
      'Custom Domains',
    ],
    recommended: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    basePrice: 99,
    description: 'For large-scale applications',
    features: [
      'Unlimited Everything',
      '500GB Storage',
      '24/7 Support',
      'SLA Guarantee',
      'Dedicated Account Manager',
    ],
  },
];

export const storageConfig = {
  min: 10,
  max: 500,
  step: 5,
  pricePerGB: 0.5,
  markers: [10, 100, 250, 500] as const,
};

export const addons: Addon[] = [
  {
    id: 'backups',
    name: 'Daily Backups',
    price: 5,
    description: 'Automatic daily backups with 30-day retention',
  },
  {
    id: 'security',
    name: 'Advanced Security',
    price: 15,
    description: 'DDoS protection, WAF, and SSL certificates',
  },
];

export type PlanId = (typeof plans)[number]['id'];

export function getPlanById(planId: string) {
  return plans.find((p) => p.id === planId);
}

export function getAddonById(addonId: string) {
  return addons.find((a) => a.id === addonId);
}

export function getStoragePrice(storageAmount: number) {
  const extraStorage = storageAmount - storageConfig.min;
  return extraStorage * storageConfig.pricePerGB;
}

export function formatUsd(amount: number) {
  return `$${amount.toFixed(2)}`;
}
