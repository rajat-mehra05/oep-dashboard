import { http, HttpResponse } from 'msw';
import { SEEDED_PROSPECTS } from '@/mocks/seed';

export const countsHandlers = [
  http.get('/api/prospects/counts', () => {
    const hunt = SEEDED_PROSPECTS.filter((p) => p.tab === 'hunt').length;
    // activate and inbox are spec-defined placeholder counts — no Activate/Inbox
    // seeded prospects exist because those tabs render placeholder content only.
    return HttpResponse.json({ hunt, activate: 8, inbox: 4 });
  }),
];
