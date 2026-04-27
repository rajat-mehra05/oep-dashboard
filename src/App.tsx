import { RouterProvider } from 'react-router';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/queryClient';
import { TooltipProvider } from '@/components/ui/tooltip';
import { router } from '@/routes';
import { Agentation } from 'agentation';

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <RouterProvider router={router} />
      </TooltipProvider>
      {import.meta.env.DEV ? <Agentation /> : null}
    </QueryClientProvider>
  );
}
