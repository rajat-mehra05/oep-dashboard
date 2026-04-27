import { http, HttpResponse } from 'msw';
import { SEEDED_USERS } from '@/mocks/seed';

const TOKEN_TO_USER_ID: Record<string, string> = {
  'mock-jwt-lewis': 'user-lewis',
  'mock-jwt-rajat': 'user-rajat',
  'mock-jwt-guest': 'user-guest',
};

export const meHandlers = [
  http.get('/api/me', ({ request }) => {
    const auth = request.headers.get('Authorization');
    const token = auth?.replace('Bearer ', '') ?? '';
    const userId = TOKEN_TO_USER_ID[token];

    if (userId === undefined) {
      return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const user = SEEDED_USERS.find((u) => u.id === userId);
    return HttpResponse.json(user ?? null);
  }),
];
