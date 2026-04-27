import { Checkbox as BaseCheckbox } from '@base-ui/react/checkbox';
import { Check, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface CheckboxProps {
  checked?: boolean | 'indeterminate';
  onCheckedChange?: (checked: boolean) => void;
  indeterminate?: boolean;
  'aria-label'?: string;
  className?: string;
}

export function Checkbox({
  checked,
  onCheckedChange,
  indeterminate = false,
  'aria-label': ariaLabel,
  className,
}: CheckboxProps) {
  const isIndeterminate = indeterminate || checked === 'indeterminate';
  const isChecked = checked === true;

  return (
    <BaseCheckbox.Root
      checked={isChecked}
      indeterminate={isIndeterminate}
      onCheckedChange={onCheckedChange}
      aria-label={ariaLabel}
      className={cn(
        'border-border flex h-4 w-4 cursor-pointer items-center justify-center rounded border bg-white',
        'focus-visible:ring-primary transition-colors focus-visible:ring-2 focus-visible:outline-none',
        (isChecked || isIndeterminate) && 'border-primary bg-primary',
        className,
      )}
    >
      <BaseCheckbox.Indicator className="flex items-center justify-center text-white">
        {isIndeterminate ? <Minus className="h-3 w-3" /> : <Check className="h-3 w-3" />}
      </BaseCheckbox.Indicator>
    </BaseCheckbox.Root>
  );
}
