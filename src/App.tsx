import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/queryClient';
import { TooltipProvider } from '@/components/ui/tooltip';
import { PrimitiveSandbox } from '@/components/dashboard/PrimitiveSandbox';

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <PrimitiveSandbox />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
