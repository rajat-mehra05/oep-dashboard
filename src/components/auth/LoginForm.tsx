import { type FormEvent, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useLogin } from '@/features/auth/hooks/useLogin';
import { useGuestLogin } from '@/features/auth/hooks/useGuestLogin';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const login = useLogin();
  const guestLogin = useGuestLogin();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    login.mutate({ email, password });
  }

  const isPending = login.isPending || guestLogin.isPending;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {login.error !== null && login.error !== undefined ? (
        <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">{login.error.message}</p>
      ) : null}

      <Input
        type="email"
        placeholder="Email"
        autoComplete="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={isPending}
      />
      <Input
        type="password"
        placeholder="Password"
        autoComplete="current-password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={isPending}
      />

      <Button type="submit" variant="primary" className="w-full" disabled={isPending}>
        {login.isPending ? 'Logging in…' : 'Log in'}
      </Button>

      <button
        type="button"
        onClick={() => guestLogin.mutate()}
        disabled={isPending}
        className="text-text-muted hover:text-text-primary w-full text-center text-sm disabled:opacity-50"
      >
        {guestLogin.isPending ? 'Continuing…' : 'Continue as guest'}
      </button>

      <div className="border-border text-text-muted space-y-0.5 border-t pt-3 text-xs">
        <p>lewis@xyz.com / password123</p>
        <p>rajat@xyz.com / password123</p>
        <p>Or use Continue as guest</p>
      </div>
    </form>
  );
}
