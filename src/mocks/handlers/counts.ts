import { http, HttpResponse } from 'msw';
import { SEEDED_PROSPECTS } from '@/mocks/seed';

export const countsHandlers = [
  http.get('/api/prospects/counts', () => {
    const hunt = SEEDED_PROSPECTS.filter((p) => p.tab === 'hunt').length;
    const activate = SEEDED_PROSPECTS.filter((p) => p.tab === 'activate').length;
    const inbox = SEEDED_PROSPECTS.filter((p) => p.tab === 'inbox').length;
    return HttpResponse.json({ hunt, activate, inbox });
  }),
];
