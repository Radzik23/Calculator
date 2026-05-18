'use client';

import { Button } from '@/components/ui/button';
import {
  addons,
  formatUsd,
  getPlanById,
  getStoragePrice,
} from '@/data/pricingData';
import { ArrowRight, Check, Cloud } from 'lucide-react';

interface PriceSummaryProps {
  planId: string;
  storageAmount: number;
  selectedAddonIds: string[];
  totalPrice: number;
}

export function PriceSummary({
  planId,
  storageAmount,
  selectedAddonIds,
  totalPrice,
}: PriceSummaryProps) {
  const plan = getPlanById(planId);
  const storagePrice = getStoragePrice(storageAmount);
  const selectedAddons = addons.filter((addon) =>
    selectedAddonIds.includes(addon.id)
  );

  return (
    <div className="rounded-2xl border border-primary/30 bg-card p-6 shadow-xl shadow-primary/5">
      <div className="mb-6 flex items-center gap-3 border-b border-border pb-6">
        <div className="flex size-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <Cloud className="size-6" />
        </div>
        <div>
          <h2 className="font-bold text-foreground">CloudHost</h2>
          <p className="text-sm text-muted-foreground">Your configuration</p>
        </div>
      </div>

      <div className="mb-6 space-y-4">
        {plan && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Check className="size-4 text-primary" />
              <span className="text-sm text-foreground">{plan.name} Plan</span>
            </div>
            <span className="text-sm font-medium text-foreground">
              {formatUsd(plan.basePrice)}
            </span>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Check className="size-4 text-primary" />
            <span className="text-sm text-foreground">
              {storageAmount}GB Storage
            </span>
          </div>
          <span className="text-sm font-medium text-foreground">
            {formatUsd(storagePrice)}
          </span>
        </div>

        {selectedAddons.map((addon) => (
          <div key={addon.id} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Check className="size-4 text-primary" />
              <span className="text-sm text-foreground">{addon.name}</span>
            </div>
            <span className="text-sm font-medium text-foreground">
              {formatUsd(addon.price)}
            </span>
          </div>
        ))}
      </div>

      <div className="my-6 border-t border-border" />

      <div className="mb-6">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Total Monthly Price</p>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="text-4xl font-bold text-foreground">
                {formatUsd(totalPrice)}
              </span>
              <span className="text-muted-foreground">/mo</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">Billed monthly</p>
        </div>
      </div>

      <Button className="group h-12 w-full text-base font-semibold" size="lg">
        Get Started
        <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
      </Button>

      <p className="mt-4 text-center text-xs text-muted-foreground">
        14-day free trial • No credit card required
      </p>
    </div>
  );
}
