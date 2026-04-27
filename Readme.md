# NXL Outbound Engine: Prospect Dashboard

A B2B go-to-market workspace for sales reps. This repo holds the Outbound Engine Prospect Dashboard screen.

**Status:** Phases 4–6 complete. The full Outbound Engine Prospect Dashboard is working. Run `npm run dev`, log in at `localhost:5173/login`, and the dashboard is live.

## Prerequisites

- Node 20.19+ or 22.12+ (Vite 8 minimum; `vite.config.ts` also uses `import.meta.dirname` which landed in 20.11)
- npm 10 or newer

## Setup

```sh
npm install
npm run dev
```

The dev server runs at http://localhost:5173. You will be redirected to `/login` — use the credentials below or click Continue as guest.

## Scripts

| Command                | What it does                                          |
| ---------------------- | ----------------------------------------------------- |
| `npm run dev`          | Vite dev server with HMR                              |
| `npm run build`        | Type-check then produce a production build in `dist/` |
| `npm run preview`      | Serve the production build locally                    |
| `npm run lint`         | ESLint over the repo                                  |
| `npm run lint:fix`     | ESLint with autofix                                   |
| `npm run typecheck`    | TypeScript without emitting                           |
| `npm run format`       | Prettier write across the repo                        |
| `npm run format:check` | Prettier check, used by CI                            |

## Test Credentials

| Email         | Password    |
| ------------- | ----------- |
| lewis@xyz.com | password123 |
| rajat@xyz.com | password123 |

Or click **Continue as guest** on the login page.

## Tech Stack

React 19, Vite 8, TypeScript 6 strict, Tailwind CSS v4, ESLint 10, Prettier 3, Base UI v1.4 (`@base-ui/react`), TanStack Query v5, React Router v7, Zustand v5, MSW v2, lucide-react, tailwind-merge, clsx.

All deps pinned to current major (verified via `npm install @latest` and `npm outdated`). No version pulled from memory.

## What exists

| Path                            | Purpose                                                                                                                                                 |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/lib/constants.ts`          | Domain constants (stages, signals, goals, routes, storage keys, page size)                                                                              |
| `src/lib/utils.ts`              | `cn`, `formatRelativeTime`, `getTimeOfDayGreeting`, `useDebouncedValue`, `useMediaQuery`                                                                |
| `src/lib/apiFetch.ts`           | Typed fetch wrapper with auth header injection                                                                                                          |
| `src/lib/queryClient.ts`        | TanStack Query client (staleTime 60s, retry 1)                                                                                                          |
| `src/features/auth/types/`      | `User`, `LoginRequest`, `LoginResponse`                                                                                                                 |
| `src/features/prospects/types/` | `TeamMember`, `Prospect`, `ProspectPage`, `Counts`                                                                                                      |
| `src/mocks/`                    | MSW handlers for auth, me, team, prospects, counts + 12-prospect seed                                                                                   |
| `src/components/ui/`            | 10 primitives: Button, Input, Checkbox, Tabs, Popover, Tooltip, AlertDialog, Avatar, Badge, Skeleton                                                    |
| `src/features/auth/store/`      | `useAuthStore` — token + user state, manual localStorage sync so `apiFetch` reads a raw token string                                                    |
| `src/features/ui/store/`        | `useUIStore` — sidebar collapsed state, persisted via Zustand persist middleware                                                                        |
| `src/features/prospects/store/` | `useProspectStore` — tab/view/search/filter/page/selection state with encoded reset rules                                                               |
| `src/features/auth/hooks/`      | `useMe`, `useLogin`, `useGuestLogin` — TanStack Query hooks for auth flow                                                                               |
| `src/features/prospects/hooks/` | `useCounts`, `useTeam`, `useProspects` + `queryKeys.ts`                                                                                                 |
| `src/components/auth/`          | `LoginForm` — form with error state, pending state, and test-creds hint                                                                                 |
| `src/components/layout/`        | `AppShell`, `Sidebar` (with collapse), `MobileGate`, `ProtectedRoute` and sidebar sub-components                                                        |
| `src/components/dashboard/`     | `GreetingHeader`, `TabBar`, `HuntPanel`, `HuntQueueTable`, `ProspectRow`, `Pagination`, `BulkActionsBar`, `FiltersPopover`, `SearchBar`, `UploadButton` |
| `src/pages/`                    | `LoginPage`, `DashboardPage`, `ComingSoonPage`, `NotFoundPage`                                                                                          |
| `src/routes.tsx`                | React Router 7 route tree with `ProtectedRoute` wrapper                                                                                                 |

## Tooling and Quality Gates

- ESLint flat config with `@typescript-eslint/no-explicit-any: error`, `@typescript-eslint/no-non-null-assertion: error`, `react-hooks/exhaustive-deps: error`.
- Prettier with `prettier-plugin-tailwindcss` for class sorting.
- Husky pre-commit hook running `lint-staged` (eslint-fix + prettier-write on staged files only).
- TypeScript strict with `noUncheckedIndexedAccess`, `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`, `noUncheckedSideEffectImports`, `verbatimModuleSyntax`. Type-only imports must use `import type`.
- Path alias `@/` for `src/`.
- GitHub Actions CI runs `typecheck`, `lint`, `format:check`, and `build` on every PR and push to `main`.

## Repo Layout

- `src/` source code (filled out phase by phase per the plan)
- `.github/workflows/ci.yml` lint, typecheck, format, build on every PR
- `.husky/pre-commit` runs lint-staged

The build plan and product spec live outside the PR-tracked surface area:

- `Plan.md` phase by phase build plan
- `docs/spec.md` product spec

Both files are gitignored on purpose.
