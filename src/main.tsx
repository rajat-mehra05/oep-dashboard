import '@fontsource/geist-sans/400.css';
import '@fontsource/geist-sans/500.css';
import '@fontsource/geist-sans/600.css';
import '@fontsource/geist-sans/700.css';
import '@/styles/globals.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from '@/App';

async function bootstrap(): Promise<void> {
  if (import.meta.env.DEV) {
    const { startMockWorker } = await import('@/mocks/browser');
    await startMockWorker();
  }

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

bootstrap().catch((err: unknown) => {
  throw err;
});
