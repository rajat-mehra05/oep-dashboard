import { http, HttpResponse } from 'msw';
import { SEEDED_USERS } from '@/mocks/seed';
import type { LoginRequest } from '@/features/auth/types';

interface Account {
  password: string;
  userId: string;
}

const ACCOUNTS: Record<string, Account> = {
  'lewis@xyz.com': { password: 'password123', userId: 'user-lewis' },
  'rajat@xyz.com': { password: 'password123', userId: 'user-rajat' },
};

export const authHandlers = [
  http.post('/api/auth/login', async ({ request }) => {
    const body = (await request.json()) as LoginRequest;

    if (!body?.email || !body?.password) {
      return HttpResponse.json({ message: 'Missing email or password' }, { status: 400 });
    }

    const account = ACCOUNTS[body.email];
    if (account === undefined || account.password !== body.password) {
      return HttpResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    const user = SEEDED_USERS.find((u) => u.id === account.userId);
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
