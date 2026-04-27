# NXL Outbound Engine: Prospect Dashboard

A B2B go-to-market workspace for sales reps. This repo holds the Outbound Engine Prospect Dashboard screen.

**Status:** Phase 1 complete. Boilerplate, tooling, and CI are in place. No product UI yet.

## Prerequisites

- Node 20.11 or newer (`vite.config.ts` uses `import.meta.dirname`)
- npm 10 or newer

## Setup

```sh
npm install
npm run dev
```

The dev server runs at http://localhost:5173 and shows a "boilerplate ready" screen until Phase 5 wires up the dashboard shell.

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

Filled in once Phase 4 wires up auth.

## Tech Stack

React 19, Vite 8, TypeScript 6 strict, Tailwind CSS v4, ESLint 10, Prettier 3, Base UI primitives, Zustand, TanStack Query, MSW v2.

All deps pinned to current major (verified via `npm install @latest` and `npm outdated`). No version pulled from memory.

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
