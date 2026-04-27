import { AlertDialog as BaseAlertDialog } from '@base-ui/react/alert-dialog';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import type { ReactNode } from 'react';

interface AlertDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children?: ReactNode;
}

export function AlertDialog({
  open,
  onOpenChange,
  title,
  description,
  children,
}: AlertDialogProps) {
  return (
    <BaseAlertDialog.Root open={open} onOpenChange={onOpenChange}>
      <BaseAlertDialog.Portal>
        <BaseAlertDialog.Backdrop
          className={cn(
            'fixed inset-0 z-40 bg-black/40',
            'data-[ending-style]:opacity-0 data-[starting-style]:opacity-0',
            'transition-opacity duration-150',
          )}
        />
        <BaseAlertDialog.Popup
          className={cn(
            'fixed top-1/2 left-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2',
            'border-border rounded-xl border bg-white p-6 shadow-xl outline-none',
            'data-[ending-style]:opacity-0 data-[starting-style]:opacity-0',
            'transition-opacity duration-150',
          )}
        >
          <BaseAlertDialog.Title className="text-text-primary mb-2 text-base font-semibold">
            {title}
          </BaseAlertDialog.Title>
          {description !== undefined ? (
            <BaseAlertDialog.Description className="text-text-muted mb-4 text-sm">
              {description}
            </BaseAlertDialog.Description>
          ) : null}
          {children}
          <div className="mt-4 flex justify-end">
            <BaseAlertDialog.Close
              render={
                <Button variant="primary" size="sm">
                  OK
                </Button>
              }
            />
          </div>
        </BaseAlertDialog.Popup>
      </BaseAlertDialog.Portal>
    </BaseAlertDialog.Root>
  );
}
