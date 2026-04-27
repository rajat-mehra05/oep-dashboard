import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: ReactNode;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ leftIcon, error, className, ...props }, ref) => (
    <div className="relative w-full">
      {leftIcon !== undefined ? (
        <span className="text-text-muted pointer-events-none absolute top-1/2 left-3 -translate-y-1/2">
          {leftIcon}
        </span>
      ) : null}
      <input
        ref={ref}
        className={cn(
          'border-border text-text-primary w-full rounded-full border bg-white px-4 py-2 text-sm',
          'placeholder:text-text-muted',
          'focus:ring-primary focus:ring-2 focus:ring-offset-0 focus:outline-none',
          'disabled:cursor-not-allowed disabled:opacity-50',
          leftIcon !== undefined && 'pl-9',
          error !== undefined && 'border-red-500 focus:ring-red-500',
          className,
        )}
        aria-invalid={error !== undefined ? true : undefined}
        {...props}
      />
      {error !== undefined ? <p className="mt-1 text-xs text-red-500">{error}</p> : null}
    </div>
  ),
);
Input.displayName = 'Input';
