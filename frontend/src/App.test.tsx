import { render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { App } from './App';

describe('foundation page', () => {
  beforeEach(() => vi.restoreAllMocks());

  it('shows backend success after health responds', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ ok: true, json: async () => ({ data: { status: 'ok' } }) }),
    );
    render(<App />);
    expect(screen.getByText('Đang kiểm tra backend…')).toBeInTheDocument();
    expect(await screen.findByText('Backend đang hoạt động.')).toBeInTheDocument();
  });

  it('shows retry and retries the health check after failure', async () => {
    const fetch = vi
      .fn()
      .mockRejectedValueOnce(new Error('offline'))
      .mockResolvedValueOnce({ ok: true, json: async () => ({ data: { status: 'ok' } }) });
    vi.stubGlobal('fetch', fetch);
    render(<App />);
    const retry = await screen.findByRole('button', { name: 'Thử kết nối lại' });
    retry.click();
    await waitFor(() => expect(screen.getByText('Backend đang hoạt động.')).toBeInTheDocument());
    expect(fetch).toHaveBeenCalledTimes(2);
  });
});
