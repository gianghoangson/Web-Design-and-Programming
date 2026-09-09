import request from 'supertest';
import { describe, expect, it, vi } from 'vitest';
import { createApp, type DbClient } from './app.js';

const db = (query: () => Promise<unknown>): DbClient => ({ $queryRaw: vi.fn(query) });

describe('foundation API', () => {
  it('returns liveness without querying the database', async () => {
    const query = vi.fn();
    const response = await request(createApp({ $queryRaw: query })).get('/api/v1/health');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ data: { status: 'ok' }, error: null });
    expect(query).not.toHaveBeenCalled();
  });

  it('returns ready when PostgreSQL query succeeds', async () => {
    const response = await request(createApp(db(() => Promise.resolve([{ '?column?': 1 }])))).get(
      '/api/v1/ready',
    );
    expect(response.status).toBe(200);
    expect(response.body.data.database).toBe('up');
  });

  it('returns 503 without leaking connection details when PostgreSQL is unavailable', async () => {
    const response = await request(
      createApp(db(() => Promise.reject(new Error('secret://postgres')))),
    ).get('/api/v1/ready');
    expect(response.status).toBe(503);
    expect(response.body).toEqual({
      data: null,
      error: { code: 'DATABASE_UNAVAILABLE', message: 'Database chưa sẵn sàng' },
    });
    expect(JSON.stringify(response.body)).not.toContain('secret://');
  });
});
