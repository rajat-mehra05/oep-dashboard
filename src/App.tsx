import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/queryClient';
import { PrimitiveSandbox } from '@/components/dashboard/PrimitiveSandbox';

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PrimitiveSandbox />
    </QueryClientProvider>
  );
}
