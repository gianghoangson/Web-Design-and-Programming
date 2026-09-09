import express, { type Express } from 'express';

export type DbClient = {
  $queryRaw: (query: TemplateStringsArray, ...values: unknown[]) => Promise<unknown>;
};

const ok = (data: Record<string, unknown>) => ({ data, error: null });
const failure = (code: string, message: string) => ({ data: null, error: { code, message } });

export function createApp(db: DbClient): Express {
  const app = express();
  app.disable('x-powered-by');
  app.use(express.json());
  app.get('/api/v1/health', (_req, res) => res.json(ok({ status: 'ok' })));
  app.get('/api/v1/ready', async (_req, res) => {
    try {
      await db.$queryRaw`SELECT 1`;
      return res.json(ok({ status: 'ready', database: 'up' }));
    } catch {
      return res.status(503).json(failure('DATABASE_UNAVAILABLE', 'Database chưa sẵn sàng'));
    }
  });
  return app;
}
