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
  const hasBody = init?.body !== undefined;
  const isFormLike = hasBody && (init?.body instanceof FormData || init?.body instanceof Blob);

  const response = await fetch(path, {
    ...init,
    headers: {
      // Only set Content-Type for JSON bodies; let the browser set it for FormData/Blob
      ...(hasBody && !isFormLike ? { 'Content-Type': 'application/json' } : {}),
      ...(token !== null ? { Authorization: `Bearer ${token}` } : {}),
      ...init?.headers,
    },
  });

  if (response.status === 401) throw new UnauthorizedError();
  if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  if (response.status === 204) return undefined as unknown as T;

  return response.json() as Promise<T>;
}
