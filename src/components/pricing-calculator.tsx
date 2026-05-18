'use client';

import { useCalculator } from '@/hooks/useCalculator';
import { AddOns } from './pricing/add-ons';
import { PlanSelector } from './pricing/plan-selector';
import { PriceSummary } from './pricing/price-summary';
import { StorageSlider } from './pricing/storage-slider';

export function PricingCalculator() {
  const {
    selectedPlanId,
    setSelectedPlanId,
    storageAmount,
    setStorageAmount,
    selectedAddonIds,
    toggleAddon,
    totalPrice,
  } = useCalculator();

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/60 bg-secondary/50 px-4 py-1.5 text-sm text-muted-foreground">
            <span className="inline-block size-2 animate-pulse rounded-full bg-primary" />
            Simple, transparent pricing
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-balance text-foreground sm:text-5xl lg:text-6xl">
            CloudHost Pricing
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-lg text-muted-foreground">
            Build your perfect hosting plan. Scale seamlessly as your business
            grows.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr,380px]">
          <div className="space-y-8">
            <section>
              <h2 className="mb-4 text-sm font-medium tracking-wider text-muted-foreground uppercase">
                Select Plan
              </h2>
              <PlanSelector
                selectedPlanId={selectedPlanId}
                onPlanChange={setSelectedPlanId}
              />
            </section>

            <section>
              <h2 className="mb-4 text-sm font-medium tracking-wider text-muted-foreground uppercase">
                Storage
              </h2>
              <StorageSlider
                value={storageAmount}
                onValueChange={setStorageAmount}
              />
            </section>

            <section>
              <h2 className="mb-4 text-sm font-medium tracking-wider text-muted-foreground uppercase">
                Add-ons
              </h2>
              <AddOns
                selectedAddonIds={selectedAddonIds}
                onToggleAddon={toggleAddon}
              />
            </section>
          </div>

          <div className="lg:sticky lg:top-8 lg:self-start">
            <PriceSummary
              planId={selectedPlanId}
              storageAmount={storageAmount}
              selectedAddonIds={selectedAddonIds}
              totalPrice={totalPrice}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
