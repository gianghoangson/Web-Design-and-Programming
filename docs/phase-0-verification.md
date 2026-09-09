# Phase 0 verification — Luna retest after Terra

Retest date: 2026-09-09. Runtime: task-local Node `22.13.0` via `npx --yes -p node@22.13.0`; host Node remains `18.19.1`. No screenshot was taken.

## Final checklist

| Gate                                 | Result | Evidence                                                                                                                                                                     |
| ------------------------------------ | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Clean install                        | PASS   | `npm ci` completed without legacy peer flags or force.                                                                                                                       |
| Prisma generation                    | PASS   | `npm run db:generate`; Prisma Client `6.12.0`.                                                                                                                               |
| Lint                                 | PASS   | `npm run lint`.                                                                                                                                                              |
| Format                               | PASS   | `npm run format:check`.                                                                                                                                                      |
| Typecheck                            | PASS   | `npm run typecheck`.                                                                                                                                                         |
| Tests                                | PASS   | 8 actual tests: backend `6/6`, frontend `2/2`.                                                                                                                               |
| Build                                | PASS   | `npm run build`; frontend Vite `7.3.6`, backend build regenerates Prisma.                                                                                                    |
| Full audit                           | PASS   | `npm audit`: 0 vulnerabilities.                                                                                                                                              |
| Production audit                     | PASS   | `npm audit --omit=dev`: 0 vulnerabilities.                                                                                                                                   |
| Built backend + PostgreSQL readiness | PASS   | `backend/dist/server.js` + portable PostgreSQL `18.4`: `GET /api/v1/health` 200 and `GET /api/v1/ready` 200 with `{"data":{"status":"ready","database":"up"},"error":null}`. |
| Built backend DB unavailable         | PASS   | Same artifact pointed at non-listening port: `GET /api/v1/ready` 503 with `DATABASE_UNAVAILABLE`; no connection details leaked.                                              |
| Built frontend preview/proxy         | PASS   | Vite preview `/` 200; `/api/v1/health` through preview proxy 200.                                                                                                            |
| Root dev startup/shutdown            | PASS   | `npm run dev` started Vite 5173 and backend 3001; dev proxy health 200; own services stopped.                                                                                |

## Database evidence and parity

The real DB evidence used the existing portable package at `/tmp/terra-phase0-pg.S12NXl`, loopback-only on port `55432`; it was not reinstalled or added to the repository. The test server was PostgreSQL `18.4` (`embedded-postgres@18.4.0-beta.17`). Compose remains PostgreSQL `16`; Docker was unavailable, so a Compose-16 run is BLOCKED. The portable PostgreSQL integration gate itself is PASS, but version parity with Compose 16 remains a limitation.

All temporary PostgreSQL, backend, preview, and dev processes from this retest were stopped. The existing concurrent deletions of root `index.html` and `week2.html` were left untouched.

## Retest finding fixed

Frontend preview initially failed because `frontend/package.json` lacked a `preview` script. The minimal fix added `"preview": "vite preview"`; format and build were rerun, then preview/proxy smoke passed. No other application code was changed.

## Limitations / handoff

- Docker Compose 16 was not available for direct verification.
- The project still intentionally contains only the Phase 0 Prisma connectivity probe; domain schema, auth, market data, trading, and broker features remain future phases.
- `docs/huong-dan-chay-project.md` is owned by main; this retest did not rewrite it.
