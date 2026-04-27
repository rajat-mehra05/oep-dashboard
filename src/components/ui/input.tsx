import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: ReactNode;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ leftIcon, error, className, id: externalId, ...props }, ref) => {
    const generatedId = useId();
    const inputId = externalId ?? generatedId;
    const errorId = `${inputId}-error`;

    return (
      <div className="w-full">
        {/* Inner wrapper keeps the icon positioned relative to the input only,
            not to the outer container which grows when an error message appears. */}
        <div className="relative">
          {leftIcon !== undefined ? (
            <span className="text-text-muted pointer-events-none absolute top-1/2 left-3 -translate-y-1/2">
              {leftIcon}
            </span>
          ) : null}
          <input
            ref={ref}
            id={inputId}
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
            aria-describedby={error !== undefined ? errorId : undefined}
            {...props}
          />
        </div>
        {error !== undefined ? (
          <p id={errorId} className="mt-1 text-xs text-red-500">
            {error}
          </p>
        ) : null}
      </div>
    );
  },
);
Input.displayName = 'Input';
