import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { addons, plans, storageConfig } from '../data/pricingData';
import { useCalculator } from './useCalculator';

describe('useCalculator', () => {
  it('starts with the first plan, minimum storage, and no addons', () => {
    const { result } = renderHook(() => useCalculator());

    expect(result.current.selectedPlanId).toBe(plans[0].id);
    expect(result.current.storageAmount).toBe(storageConfig.min);
    expect(result.current.selectedAddonIds).toEqual([]);
    expect(result.current.totalPrice).toBe(plans[0].basePrice);
  });

  it('updates total price when the plan changes', () => {
    const { result } = renderHook(() => useCalculator());
    const proPlan = plans.find((p) => p.id === 'pro')!;

    act(() => {
      result.current.setSelectedPlanId('pro');
    });

    expect(result.current.selectedPlanId).toBe('pro');
    expect(result.current.totalPrice).toBe(proPlan.basePrice);
  });

  it('charges for storage above the minimum', () => {
    const { result } = renderHook(() => useCalculator());
    const extraGB = 20;
    const expectedStorageCost =
      (storageConfig.min + extraGB - storageConfig.min) * storageConfig.pricePerGB;

    act(() => {
      result.current.setStorageAmount(storageConfig.min + extraGB);
    });

    expect(result.current.totalPrice).toBe(plans[0].basePrice + expectedStorageCost);
  });

  it('adds and removes addons via toggleAddon', () => {
    const { result } = renderHook(() => useCalculator());
    const backups = addons.find((a) => a.id === 'backups')!;
    const security = addons.find((a) => a.id === 'security')!;

    act(() => {
      result.current.toggleAddon('backups');
    });
    expect(result.current.selectedAddonIds).toEqual(['backups']);
    expect(result.current.totalPrice).toBe(plans[0].basePrice + backups.price);

    act(() => {
      result.current.toggleAddon('security');
    });
    expect(result.current.selectedAddonIds).toEqual(['backups', 'security']);
    expect(result.current.totalPrice).toBe(
      plans[0].basePrice + backups.price + security.price
    );

    act(() => {
      result.current.toggleAddon('backups');
    });
    expect(result.current.selectedAddonIds).toEqual(['security']);
    expect(result.current.totalPrice).toBe(plans[0].basePrice + security.price);
  });

  it('sums plan, storage, and addons together', () => {
    const { result } = renderHook(() => useCalculator());
    const enterprise = plans.find((p) => p.id === 'enterprise')!;
    const backups = addons.find((a) => a.id === 'backups')!;
    const extraStorage = 30;
    const storageCost = extraStorage * storageConfig.pricePerGB;

    act(() => {
      result.current.setSelectedPlanId('enterprise');
      result.current.setStorageAmount(storageConfig.min + extraStorage);
      result.current.toggleAddon('backups');
    });

    expect(result.current.totalPrice).toBe(
      enterprise.basePrice + storageCost + backups.price
    );
  });
});
