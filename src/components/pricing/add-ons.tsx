'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { addons, formatUsd } from '@/data/pricingData';
import { CloudDownload, Shield, type LucideIcon } from 'lucide-react';

const addonIcons: Record<string, LucideIcon> = {
  backups: CloudDownload,
  security: Shield,
};

interface AddOnsProps {
  selectedAddonIds: string[];
  onToggleAddon: (addonId: string) => void;
}

export function AddOns({ selectedAddonIds, onToggleAddon }: AddOnsProps) {
  return (
    <div className="space-y-4">
      {addons.map((addon) => {
        const Icon = addonIcons[addon.id] ?? Shield;
        const isChecked = selectedAddonIds.includes(addon.id);

        return (
          <label
            key={addon.id}
            className={`flex cursor-pointer items-start gap-4 rounded-xl border p-5 transition-all duration-200 ${
              isChecked
                ? 'border-primary bg-card shadow-lg shadow-primary/10'
                : 'border-border bg-card/50 hover:border-primary/50 hover:bg-card/80'
            }`}
          >
            <Checkbox
              checked={isChecked}
              onCheckedChange={() => onToggleAddon(addon.id)}
              className="mt-1"
            />

            <div
              className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${
                isChecked
                  ? 'bg-primary/20 text-primary'
                  : 'bg-secondary text-muted-foreground'
              }`}
            >
              <Icon className="size-5" />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-medium text-foreground">{addon.name}</h3>
                <span
                  className={`shrink-0 text-sm font-semibold ${
                    isChecked ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  {formatUsd(addon.price)}/mo
                </span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                {addon.description}
              </p>
            </div>
          </label>
        );
      })}
    </div>
  );
}
