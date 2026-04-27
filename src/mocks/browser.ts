import { setupWorker } from 'msw/browser';
import { authHandlers } from '@/mocks/handlers/auth';
import { meHandlers } from '@/mocks/handlers/me';
import { teamHandlers } from '@/mocks/handlers/team';
import { prospectsHandlers } from '@/mocks/handlers/prospects';
import { countsHandlers } from '@/mocks/handlers/counts';

const worker = setupWorker(
  ...authHandlers,
  ...meHandlers,
  ...teamHandlers,
  ...prospectsHandlers,
  ...countsHandlers,
);

export async function startMockWorker(): Promise<void> {
  await worker.start({ onUnhandledRequest: 'bypass' });
}
