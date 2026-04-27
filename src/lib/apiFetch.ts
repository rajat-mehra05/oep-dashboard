import { STORAGE_KEYS } from '@/lib/constants';

export class UnauthorizedError extends Error {
  constructor() {
    super('Unauthorized');
    this.name = 'UnauthorizedError';
  }
}

/*
  Reads token directly from localStorage so Phase 2 has no Zustand dependency.
  Phase 3 stores use the same key via STORAGE_KEYS.AUTH_TOKEN.
*/
function getStoredToken(): string | null {
  return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
}

export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const token = getStoredToken();

  const response = await fetch(path, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(token !== null ? { Authorization: `Bearer ${token}` } : {}),
      ...init?.headers,
    },
  });

  if (response.status === 401) throw new UnauthorizedError();
  if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`);

  return response.json() as Promise<T>;
}
