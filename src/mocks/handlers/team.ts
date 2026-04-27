import { http, HttpResponse } from 'msw';
import { SEEDED_TEAM } from '@/mocks/seed';

export const teamHandlers = [http.get('/api/team', () => HttpResponse.json(SEEDED_TEAM))];
