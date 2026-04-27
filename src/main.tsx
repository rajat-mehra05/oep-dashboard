import '@fontsource/geist-sans/400.css';
import '@fontsource/geist-sans/500.css';
import '@fontsource/geist-sans/600.css';
import '@fontsource/geist-sans/700.css';
import '@/styles/globals.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from '@/App';
import { hydrateAuth } from '@/features/auth/store/useAuthStore';

async function bootstrap(): Promise<void> {
  // No real backend: MSW handles every /api/* call in dev and prod alike.
  const { startMockWorker } = await import('@/mocks/browser');
  await startMockWorker();

  // Rehydrate auth before first render so user is never null when a valid token exists
  await hydrateAuth();

  const rootElement = document.getElementById('root');
  if (!rootElement) {
    throw new Error('Root element #root was not found in index.html');
  }

  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}

void bootstrap();
