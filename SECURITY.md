# Security Posture

This document captures the current security stance of the NXL Outbound Engine Prospect Dashboard and the hardening required before it talks to a real backend.

The app runs as a Vite SPA against an in-browser MSW mock. There is no real server, no real auth provider, and no real database. The trust boundary today is "MSW handlers running in the same origin as the UI." That makes some choices acceptable now that would not be acceptable in production. This file lists those.

## Current state (v1)

- `npm audit` is clean. Zero vulnerabilities, prod or dev.
- No XSS sinks in source. No `innerHTML`, `dangerouslySetInnerHTML`, `eval`, `new Function`, or `document.write`.
- No hardcoded secrets. Test credentials in the codebase are stub credentials for the MSW handlers, not real secrets.
- `.env`, `.env.local`, and `.env.*.local` are gitignored. No `.env` files are tracked.
- `apiFetch` defensively parses error bodies and never leaks stack traces or internal state to the UI.
- All user-controlled strings reach the DOM through React JSX, which escapes by default.

## Hardening required before a real backend ships

The items below are deferred limitations, not current vulnerabilities. They become security issues the moment the app is wired to a production auth provider or API.

### 1. Move auth token off `localStorage`

- **Where:** [src/features/auth/store/useAuthStore.ts](src/features/auth/store/useAuthStore.ts), [src/lib/apiFetch.ts](src/lib/apiFetch.ts).
- **Today:** the bearer token is read from and written to `localStorage`. Any XSS bug anywhere in the app can read it.
- **Production fix:** switch to an `httpOnly` + `secure` + `sameSite=lax` (or `strict`) cookie issued by the backend. The frontend stops touching the token entirely. `apiFetch` drops its `Authorization` header injection. The browser sends the cookie automatically.

### 2. Remove demo credential prefill from the login form

- **Where:** [src/components/auth/LoginForm.tsx](src/components/auth/LoginForm.tsx).
- **Today:** email and password fields are prefilled with `lewis@xyz.com` / `password123` so the demo is one click away.
- **Production fix:** strip the defaults. Treat any default-credential string in a deployed bundle as a default-credential attack hint.

### 3. Set security headers at the hosting layer

- **Today:** none. Local dev does not need them.
- **Production fix:** configure the production host (Vercel `vercel.json`, Netlify `_headers`, nginx, etc.) to send:
  - `Content-Security-Policy` scoped to `'self'` plus the API origin.
  - `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`.
  - `X-Frame-Options: DENY`.
  - `X-Content-Type-Options: nosniff`.
  - `Referrer-Policy: strict-origin-when-cross-origin`.
  - `Permissions-Policy` denying anything the app does not use (camera, microphone, geolocation, payment).

### 4. Rate-limit auth endpoints on the real backend

- **Today:** N/A. MSW handlers do not throttle.
- **Production fix:** the real backend must rate-limit login and password-reset routes. Recommended baseline: 10 attempts per 15 minutes per IP, plus per-account lockout on repeated failures.

### 5. Validate dynamic style colors if they ever become user-controlled

- **Where:** [src/components/ui/avatar.tsx](src/components/ui/avatar.tsx) and [src/components/dashboard/ProspectRow.tsx](src/components/dashboard/ProspectRow.tsx) render `style={{ backgroundColor: color }}` with `color` coming from API data.
- **Today:** colors come from the controlled MSW seed. Modern browsers reject the historical CSS injection vectors (`expression(...)`, `url(javascript:...)`) in `backgroundColor`. Safe.
- **Production fix:** if these fields ever become user-customizable (e.g., a user picks their avatar color), validate against `^#[0-9a-fA-F]{6}$` before render. Cheap defense in depth.

### 6. Curated error messages from the backend

- **Where:** [src/components/auth/LoginForm.tsx](src/components/auth/LoginForm.tsx) renders `login.error.message` and `guestLogin.error.message` verbatim.
- **Today:** safe because React escapes the string and the MSW handler returns short, curated copy.
- **Production fix:** the real backend must return user-facing messages, not raw exception text. The frontend does not need to change, but the assumption needs to be enforced server-side.

## Review cadence

Re-run this checklist before any change that:

- adds or changes authentication or session handling
- introduces a new external API or third-party integration
- accepts uploaded files end-to-end (today the upload is a stub)
- stores a new category of user data

Re-run `npm audit` before every release.
