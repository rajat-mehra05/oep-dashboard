import { create } from 'zustand';
import { STORAGE_KEYS } from '@/lib/constants';
import { apiFetch } from '@/lib/apiFetch';
import type { User } from '@/features/auth/types';

interface AuthStore {
  token: string | null;
  user: User | null;
  /*
    setAuth writes the raw token to localStorage directly so that apiFetch
    can read it as a plain string without parsing Zustand's persist JSON envelope.
  */
  setAuth: (token: string, user: User) => void;
  setUser: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()((set) => ({
  token: localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN),
  user: null,

  setAuth: (token, user) => {
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
    set({ token, user });
  },

  setUser: (user) => set({ user }),

  logout: () => {
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    set({ token: null, user: null });
  },
}));

/*
  Call once at app boot (after MSW starts in dev). If a token is already in
  localStorage, fetch /api/me to rehydrate the user object. On any failure
  the session is cleared so token and user never drift out of sync.
*/
export async function hydrateAuth(): Promise<void> {
  const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  if (!token) return;

  try {
    const user = await apiFetch<User>('/api/me');
    useAuthStore.getState().setUser(user);
  } catch {
    useAuthStore.getState().logout();
  }
}
