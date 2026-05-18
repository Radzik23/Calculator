'use client';

import { cn } from '@/lib/utils';
import { plans, formatUsd } from '@/data/pricingData';
import { Building2, Check, Server, Zap, type LucideIcon } from 'lucide-react';

const planIcons: Record<string, LucideIcon> = {
  basic: Server,
  pro: Zap,
  enterprise: Building2,
};

interface PlanSelectorProps {
  selectedPlanId: string;
  onPlanChange: (planId: string) => void;
}

export function PlanSelector({
  selectedPlanId,
  onPlanChange,
}: PlanSelectorProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {plans.map((plan) => {
        const isSelected = selectedPlanId === plan.id;
        const Icon = planIcons[plan.id] ?? Server;

        return (
          <button
            key={plan.id}
            type="button"
            onClick={() => onPlanChange(plan.id)}
            className={cn(
              'relative flex flex-col rounded-xl border p-5 text-left transition-all duration-200',
              'hover:border-primary/50 hover:bg-card/80',
              'focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none',
              isSelected
                ? 'border-primary bg-card shadow-lg shadow-primary/10'
                : 'border-border bg-card/50'
            )}
          >
            {plan.recommended && (
              <span className="absolute -top-3 left-4 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                Recommended
              </span>
            )}

            <div className="mb-4 flex items-center justify-between">
              <div
                className={cn(
                  'flex size-10 items-center justify-center rounded-lg',
                  isSelected
                    ? 'bg-primary/20 text-primary'
                    : 'bg-secondary text-muted-foreground'
                )}
              >
                <Icon className="size-5" />
              </div>
              {isSelected && (
                <div className="flex size-6 items-center justify-center rounded-full bg-primary">
                  <Check className="size-4 text-primary-foreground" />
                </div>
              )}
            </div>

            <h3 className="text-lg font-semibold text-foreground">
              {plan.name}
            </h3>

            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-3xl font-bold text-foreground">
                {formatUsd(plan.basePrice)}
              </span>
              <span className="text-sm text-muted-foreground">/month</span>
            </div>

            <p className="mt-2 text-sm text-muted-foreground">
              {plan.description}
            </p>

            <ul className="mt-4 space-y-2">
              {plan.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <Check
                    className={cn(
                      'size-4 shrink-0',
                      isSelected ? 'text-primary' : 'text-muted-foreground/60'
                    )}
                  />
                  {feature}
                </li>
              ))}
            </ul>
          </button>
        );
      })}
    </div>
  );
}
