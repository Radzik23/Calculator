// src/hooks/useCalculator.ts

import { useState, useMemo } from 'react';
import { plans, storageConfig, addons } from '../data/pricingData';

export function useCalculator() {
  const [selectedPlanId, setSelectedPlanId] = useState<string>(plans[0].id);
  const [storageAmount, setStorageAmount] = useState<number>(storageConfig.min);
  const [selectedAddonIds, setSelectedAddonIds] = useState<string[]>([]);

  const toggleAddon = (addonId: string) => {
    setSelectedAddonIds((prev) =>
      prev.includes(addonId)
        ? prev.filter((id) => id !== addonId)
        : [...prev, addonId]
    );
  };

  const totalPrice = useMemo(() => {
    const planPrice =
      plans.find((p) => p.id === selectedPlanId)?.basePrice || 0;
    const extraStorage = storageAmount - storageConfig.min;
    const storagePrice = extraStorage * storageConfig.pricePerGB;

    const addonsPrice = selectedAddonIds.reduce((sum, addonId) => {
      const addon = addons.find((a) => a.id === addonId);
      return sum + (addon ? addon.price : 0);
    }, 0);

    return planPrice + storagePrice + addonsPrice;
  }, [selectedPlanId, storageAmount, selectedAddonIds]);

  return {
    selectedPlanId,
    setSelectedPlanId,
    storageAmount,
    setStorageAmount,
    selectedAddonIds,
    toggleAddon,
    totalPrice,
  };
}
