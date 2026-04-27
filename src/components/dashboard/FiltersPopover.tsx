import { useState } from 'react';
import { Filter } from 'lucide-react';
import { PopoverRoot, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  useProspectStore,
  type ProspectFilters,
} from '@/features/prospects/store/useProspectStore';
import { STAGES, SIGNALS } from '@/lib/constants';
import type { Stage, Signal } from '@/lib/constants';

export function FiltersPopover() {
  const filters = useProspectStore((s) => s.filters);
  const setFilters = useProspectStore((s) => s.setFilters);
  const clearFilters = useProspectStore((s) => s.clearFilters);
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState<ProspectFilters>(filters);

  const hasActiveFilters = filters.stages.length > 0 || filters.signals.length > 0;

  function handleOpenChange(next: boolean) {
    if (next) setPending(filters);
    setOpen(next);
  }

  function toggleStage(stage: Stage) {
    setPending((prev) => ({
      ...prev,
      stages: prev.stages.includes(stage)
        ? prev.stages.filter((s) => s !== stage)
        : [...prev.stages, stage],
    }));
  }

  function toggleSignal(signal: Signal) {
    setPending((prev) => ({
      ...prev,
      signals: prev.signals.includes(signal)
        ? prev.signals.filter((s) => s !== signal)
        : [...prev.signals, signal],
    }));
  }

  return (
    <PopoverRoot open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger
        render={
          <Button variant="outline" size="sm" className="relative gap-1.5">
            <Filter className="h-3.5 w-3.5" />
            Filters
            {hasActiveFilters ? (
              <span className="bg-primary absolute -top-1 -right-1 h-2 w-2 rounded-full" />
            ) : null}
          </Button>
        }
      />
      <PopoverContent className="w-64 space-y-4">
        <div>
          <p className="text-text-muted mb-2 text-xs font-semibold tracking-wider uppercase">
            Stage
          </p>
          <div className="space-y-1.5">
            {STAGES.map((stage) => (
              <label key={stage} className="flex cursor-pointer items-center gap-2">
                <Checkbox
                  checked={pending.stages.includes(stage)}
                  onCheckedChange={() => toggleStage(stage)}
                  aria-label={stage}
                />
                <span className="text-text-primary text-sm">{stage}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <p className="text-text-muted mb-2 text-xs font-semibold tracking-wider uppercase">
            Signal
          </p>
          <div className="space-y-1.5">
            {SIGNALS.map((signal) => (
              <label key={signal} className="flex cursor-pointer items-center gap-2">
                <Checkbox
                  checked={pending.signals.includes(signal)}
                  onCheckedChange={() => toggleSignal(signal)}
                  aria-label={signal}
                />
                <Badge variant="signal" className="text-xs">
                  {signal}
                </Badge>
              </label>
            ))}
          </div>
        </div>

        <div className="border-border flex items-center justify-between border-t pt-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              clearFilters();
              setPending({ stages: [], signals: [] });
            }}
          >
            Clear all
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              setFilters(pending);
              setOpen(false);
            }}
          >
            Apply
          </Button>
        </div>
      </PopoverContent>
    </PopoverRoot>
  );
}
