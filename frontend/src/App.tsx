import { useCallback, useEffect, useState } from 'react';
import { fetchHealth } from './api';
import './styles.css';

export function App() {
  const [state, setState] = useState<'loading' | 'success' | 'error'>('loading');
  const check = useCallback(async () => {
    setState('loading');
    try {
      await fetchHealth();
      setState('success');
    } catch {
      setState('error');
    }
  }, []);
  useEffect(() => {
    void fetchHealth().then(
      () => setState('success'),
      () => setState('error'),
    );
  }, []);
  return (
    <main>
      <p className="eyebrow">PHASE 0 · FOUNDATION</p>
      <h1>Nền tảng giao dịch Việt Nam</h1>
      <p>Khung React + Express đang được chuẩn bị. Chưa có dữ liệu thị trường hoặc giao dịch.</p>
      <section aria-live="polite" className={`status status-${state}`}>
        {state === 'loading' && 'Đang kiểm tra backend…'}
        {state === 'success' && 'Backend đang hoạt động.'}
        {state === 'error' && (
          <>
            <span>Không kết nối được backend.</span>
            <button onClick={() => void check()} aria-label="Thử kết nối lại">
              Thử lại
            </button>
          </>
        )}
      </section>
    </main>
  );
}
