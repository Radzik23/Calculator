'use client';

import { Slider } from '@/components/ui/slider';
import { formatUsd, getStoragePrice, storageConfig } from '@/data/pricingData';
import { cn } from '@/lib/utils';
import { HardDrive } from 'lucide-react';

interface StorageSliderProps {
  value: number;
  onValueChange: (value: number) => void;
}

export function StorageSlider({ value, onValueChange }: StorageSliderProps) {
  const storagePrice = getStoragePrice(value);

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg bg-primary/20 text-primary">
            <HardDrive className="size-5" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Storage</p>
            <p className="text-2xl font-bold text-foreground">{value}GB</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Monthly</p>
          <p className="text-lg font-semibold text-primary">
            {formatUsd(storagePrice)}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <Slider
          value={[value]}
          onValueChange={(values) =>
            onValueChange(values[0] ?? storageConfig.min)
          }
          min={storageConfig.min}
          max={storageConfig.max}
          step={storageConfig.step}
          className="w-full"
        />

        <div className="flex justify-between text-xs text-muted-foreground">
          {storageConfig.markers.map((marker) => (
            <button
              key={marker}
              type="button"
              onClick={() => onValueChange(marker)}
              className={cn(
                'transition-colors hover:text-primary',
                value === marker && 'font-medium text-primary'
              )}
            >
              {marker}GB
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
