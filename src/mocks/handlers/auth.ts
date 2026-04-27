import { http, HttpResponse } from 'msw';
import { SEEDED_USERS } from '@/mocks/seed';
import type { LoginRequest } from '@/features/auth/types';

const CREDENTIALS: Record<string, string> = {
  'lewis@xyz.com': 'password123',
  'rajat@xyz.com': 'password123',
};

const USER_BY_EMAIL: Record<string, string> = {
  'lewis@xyz.com': 'user-lewis',
  'rajat@xyz.com': 'user-rajat',
};

export const authHandlers = [
  http.post('/api/auth/login', async ({ request }) => {
    const body = (await request.json()) as LoginRequest;

    if (CREDENTIALS[body.email] !== body.password) {
      return HttpResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    const userId = USER_BY_EMAIL[body.email];
    const user = SEEDED_USERS.find((u) => u.id === userId);
    if (user === undefined) {
      return HttpResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return HttpResponse.json({ token: `mock-jwt-${user.name.toLowerCase()}`, user });
  }),

  http.post('/api/auth/guest', () => {
    const guest = SEEDED_USERS.find((u) => u.id === 'user-guest');
    if (guest === undefined) {
      return HttpResponse.json({ message: 'Guest user not seeded' }, { status: 500 });
    }
    return HttpResponse.json({ token: 'mock-jwt-guest', user: guest });
  }),
];
