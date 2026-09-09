# Phase 0 Terra review

## Findings and fixes

| Severity | Path                                                       | Root cause                                                                                                                                                                            | Fix                                                                                                                                                                                     | Evidence                                                                                                                       |
| -------- | ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| High     | `package.json`, `package-lock.json`                        | `eslint@10.10.0` was outside the peer ranges of `typescript-eslint@8.54.0` and `eslint-plugin-react-hooks@5.2.0`; clean `npm ci` failed with `ERESOLVE`.                              | Updated the compatible lint set to `eslint@10.10.0`, `@eslint/js@10.0.1`, `typescript-eslint@8.70.0`, and `eslint-plugin-react-hooks@7.1.1`.                                            | Pinned Node 22 `npm ci` and `npm ls` resolve cleanly without `--legacy-peer-deps` or `--force`.                                |
| High     | `backend/src/config.ts`, `backend/src/readiness.ts`        | A root `.env` copied from the documented example was not loaded by the compiled backend artifact, so `DATABASE_URL` was undefined. The readiness script also bypassed config loading. | Use Node 22 native `process.loadEnvFile` for the repository-root `.env` when it exists; inherited environment still has priority. Load config before the direct Prisma readiness query. | Before fix: compiled `node backend/dist/server.js` failed Zod on missing `DATABASE_URL`; after fix it booted from root `.env`. |
| High     | `backend/package.json`                                     | After a clean install, `@prisma/client` was ungenerated; `tsc` completed but the backend artifact threw on `new PrismaClient()`.                                                      | Make the backend build run `prisma generate` before `tsc`.                                                                                                                              | Root build generates Prisma Client `6.12.0`; the backend artifact then starts.                                                 |
| Medium   | `docker-compose.yml`, `.env.example`, `README.md`          | Compose embedded `trading` credentials although the guide requires local env configuration.                                                                                           | Compose requires `POSTGRES_USER`, `POSTGRES_PASSWORD`, and `POSTGRES_DB` from `.env`; example and README document matching `DATABASE_URL` and `npm ci`.                                 | No Compose credential literal remains.                                                                                         |
| Low      | `frontend/src/App.tsx`                                     | The supported React Hooks v7 rules reject a synchronous state-setting retry helper called from the initial effect.                                                                    | Initial health fetch resolves state from its promise; the state-resetting helper remains only for the retry button.                                                                     | Health success/retry tests pass and lint is clean.                                                                             |
| Low      | `.superdesign/init/pages.md`, `.superdesign/init/theme.md` | Init files did not show the full CSS source and reversed the page dependency direction.                                                                                               | Recorded full `styles.css` and the actual `index.html → main.tsx → App.tsx` import direction.                                                                                           | Matches the Phase 0 source; no fictional shared components were added.                                                         |

## Audit

The initial audit had five high findings: `prisma → @prisma/config → deepmerge-ts/effect` and `vite`. The supported scoped updates are `prisma`/`@prisma/client` `6.12.0`, `vite` `7.3.6`, and the lint set above. Final `npm audit --omit=dev` reports `0 vulnerabilities`.

## Database integration evidence

The project stack remains PostgreSQL + Prisma. `docker-compose.yml` uses PostgreSQL 16. The portable test runtime was PostgreSQL 18.4 from `embedded-postgres@18.4.0-beta.17`, installed only under `/tmp/terra-phase0-pg.S12NXl`, loopback-only on port `55432`, and was not added to the repository. This version difference is a test-runtime parity limitation; Luna should prefer Compose PostgreSQL 16 when it is available.

- With a non-listening local DB URL, `GET /api/v1/ready` returned `503` and `{ "error": { "code": "DATABASE_UNAVAILABLE" } }`; liveness returned `200`.
- With `DATABASE_URL` targeting the portable database, `GET /api/v1/ready` returned `200` with `{ "data": { "status": "ready", "database": "up" } }`, and `npm run db:readiness` printed `Database ready`.
- The final temporary data directory was `/tmp/terra-phase0-db.zqwgaz`; the process was stopped at the end of the check. It may be recreated with the portable package path above.

Replay exact commands for Luna (from the repository root):

```bash
terra_pg_pkg=/tmp/terra-phase0-pg.S12NXl
terra_pg_data=$(mktemp -d /tmp/luna-phase0-db.XXXXXX)
npm install --prefix "$terra_pg_pkg" embedded-postgres@18.4.0-beta.17
node --input-type=module -e "import EmbeddedPostgres from '$terra_pg_pkg/node_modules/embedded-postgres/dist/index.js'; const pg = new EmbeddedPostgres({ databaseDir: '$terra_pg_data', user: 'trading', password: 'local-test-only', port: 55432, persistent: false }); await pg.initialise(); await pg.start(); await pg.createDatabase('trading_platform'); console.log('LUNA_POSTGRES_READY'); setInterval(() => {}, 1000);" &
terra_pg_pid=$!

DATABASE_URL='postgresql://trading:local-test-only@127.0.0.1:55432/trading_platform' \
  npx --yes -p node@22.13.0 -c 'npm run db:readiness'

kill -TERM "$terra_pg_pid"
wait "$terra_pg_pid" 2>/dev/null || true
```

Stop the portable process created by the replay after checking it. Do not use it as a production dependency or service.

## Scope note

`index.html` and `week2.html` appeared in Terra's initial `rg --files` inventory, then Git reported them as tracked deletions (`48` and `127` lines) and both paths were absent when main raised the alert. No Terra command targeted either path. Git has no actor provenance, so the exact source cannot be identified beyond a concurrent change outside Terra; both deletions were intentionally left untouched.

## Final checks

Fresh root check under Node `22.13.0` passed: `npm ci`, `npm run lint`, `npm run format:check`, `npm run typecheck`, `npm test` (6 backend + 2 frontend tests), and `npm run build`.
