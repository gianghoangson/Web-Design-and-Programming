import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { MemoryRouter, useLocation } from 'react-router-dom';
import { App } from './App';

function LocationProbe() {
  return <output data-testid="location">{useLocation().pathname}</output>;
}

function renderApp(initialEntry = '/vi/overview', includeLocation = false) {
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <App />
      {includeLocation && <LocationProbe />}
    </MemoryRouter>,
  );
}

describe('Phase 1 shell', () => {
  beforeEach(() => vi.restoreAllMocks());
  afterEach(() => document.body.replaceChildren());

  it('shows backend success after health responds', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ ok: true, json: async () => ({ data: { status: 'ok' } }) }),
    );
    renderApp();
    expect(screen.getByText('Đang kiểm tra backend…')).toBeInTheDocument();
    expect(await screen.findByText('Backend đang hoạt động')).toBeInTheDocument();
  });

  it('shows retry and retries the health check after failure', async () => {
    const fetch = vi
      .fn()
      .mockRejectedValueOnce(new Error('offline'))
      .mockResolvedValueOnce({ ok: true, json: async () => ({ data: { status: 'ok' } }) });
    vi.stubGlobal('fetch', fetch);
    renderApp();
    const retry = await screen.findByRole('button', { name: 'Thử lại' });
    retry.click();
    await waitFor(() => expect(screen.getByText('Backend đang hoạt động')).toBeInTheDocument());
    expect(fetch).toHaveBeenCalledTimes(2);
  });

  it('renders simulation labels, the demo disclaimer, and accessible search', () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ ok: true, json: async () => ({ data: { status: 'ok' } }) }),
    );
    renderApp();
    expect(screen.getByText('Không sử dụng tiền thật')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Tổng quan thị trường' })).toBeInTheDocument();
    expect(screen.getByText('Sàn Việt')).toBeInTheDocument();
    expect(screen.getByRole('note')).toHaveTextContent(
      'DỮ LIỆU MẪU · KHÔNG PHẢI THỊ TRƯỜNG TRỰC TIẾP',
    );
    expect(screen.getByRole('navigation', { name: 'Điều hướng chính' })).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Tìm kiếm mã chứng khoán...')).toBeInTheDocument();
    expect(document.body.textContent).not.toContain('LIVE');
  });

  it('switches to NORMAL labels through the accessible account control', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ ok: true, json: async () => ({ data: { status: 'ok' } }) }),
    );
    renderApp();
    const select = screen.getByRole('combobox', {
      name: 'Chọn chế độ tài khoản',
    }) as HTMLSelectElement;
    fireEvent.change(select, { target: { value: 'NORMAL' } });
    await waitFor(() =>
      expect(screen.getByRole('region', { name: 'Trạng thái hệ thống' })).toHaveTextContent(
        'Chưa kết nối công ty chứng khoán',
      ),
    );
  });

  it('renders the English overview with the document language set', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ ok: true, json: async () => ({ data: { status: 'ok' } }) }),
    );
    renderApp('/en/overview');
    expect(screen.getByRole('heading', { name: 'Market overview' })).toBeInTheDocument();
    expect(screen.getByRole('note')).toHaveTextContent('SAMPLE DATA · NOT LIVE MARKET DATA');
    await waitFor(() => expect(document.documentElement.lang).toBe('en'));
    expect(document.title).toBe('Sàn Việt · Market overview');
    expect(screen.getByRole('navigation', { name: 'Primary navigation' })).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: 'Language' })).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: 'Choose account mode' })).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search symbols...')).toBeInTheDocument();
    expect(
      screen.getByRole('button', {
        name: 'Profile and sign out are unavailable in this DEMO',
      }),
    ).toBeDisabled();
    expect(document.body.textContent).not.toContain('Không gian thị trường');
    expect(document.body.textContent).not.toContain('Nguồn dữ liệu');
  });

  it('redirects the root route to the Vietnamese overview', () => {
    renderApp('/', true);
    expect(screen.getByRole('heading', { name: 'Tổng quan thị trường' })).toBeInTheDocument();
    expect(screen.getByTestId('location')).toHaveTextContent('/vi/overview');
  });

  it('redirects unknown routes to the Vietnamese overview', () => {
    renderApp('/not-a-real-route', true);
    expect(screen.getByRole('heading', { name: 'Tổng quan thị trường' })).toBeInTheDocument();
    expect(screen.getByTestId('location')).toHaveTextContent('/vi/overview');
  });

  it('keeps index points separate from stock and account money', () => {
    renderApp('/vi/overview');
    const indices = screen.getByRole('region', { name: 'Chỉ số thị trường mẫu' });
    expect(indices).toHaveTextContent('1.827,12 điểm');
    expect(indices).toHaveTextContent('+12,34 điểm');
    expect(indices).not.toHaveTextContent(/[₫]|VND|Trần|Tham chiếu/);
    expect(screen.getByRole('region', { name: 'Tóm tắt tài khoản' })).toHaveTextContent('₫');
  });

  it('keeps English index points separate from stock and account money', () => {
    renderApp('/en/overview');
    const indices = screen.getByRole('region', { name: 'Sample market indices' });
    expect(indices).toHaveTextContent('1,827.12 points');
    expect(indices).toHaveTextContent('-1.16 points');
    expect(indices).not.toHaveTextContent(/[₫]|VND|Ceiling|Floor|Reference/);
    expect(screen.getByRole('region', { name: 'Account summary' })).toHaveTextContent('₫');
  });

  it('switches locale routes while preserving the account mode', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ ok: true, json: async () => ({ data: { status: 'ok' } }) }),
    );
    renderApp('/vi/overview');
    fireEvent.change(screen.getByRole('combobox', { name: 'Chọn chế độ tài khoản' }), {
      target: { value: 'NORMAL' },
    });
    fireEvent.click(screen.getByRole('link', { name: 'English' }));
    expect(await screen.findByRole('heading', { name: 'Market overview' })).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toHaveValue('NORMAL');
  });

  it('keeps the language switcher available in English', () => {
    renderApp('/en/overview');
    expect(screen.getByRole('link', { name: 'Vietnamese' })).toHaveAttribute(
      'href',
      '/vi/overview',
    );
    expect(screen.getByRole('link', { name: 'English' })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('link', { name: 'Vietnamese' })).not.toHaveAttribute('aria-current');
  });
});
