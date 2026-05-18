// src/data/pricingData.ts

export type Plan = {
    id: string;
    name: string;
    basePrice: number;
};

export type Addon = {
    id: string;
    name: string;
    price: number;
};

export const plans: Plan[] = [
    { id: 'basic', name: 'Basic', basePrice: 9},
    { id: 'pro', name: 'Pro', basePrice: 29},
    { id: 'enterprise', name: 'Enterprise', basePrice: 99},
];

export const storageConfig = {
    min: 10,
    max: 500,
    step: 5,
    pricePerGB: 0.5,
};

export const addons: Addon[] = [
    {id: 'backups', name: 'Daily Backups', price: 5},
    {id: 'security', name: 'Advanced Security', price: 15},
];