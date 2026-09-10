import { useCallback, useEffect, useState } from 'react';
import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { fetchHealth } from './api';
import {
  formatCompactVnd,
  formatIndexPoints,
  formatPercent,
  formatSignedCompactVnd,
  formatSignedIndexPoints,
  formatSignedVnd,
  formatVnd,
  formatVolume,
} from './formatters';
import { getStockPriceState, priceStateMeta, type StockPriceState } from './market';
import { translations, type Copy, type Locale } from './translations';
import './styles.css';

type AccountMode = 'NORMAL' | 'SIMULATION';
type HealthState = 'loading' | 'success' | 'error';
const indices = [
  { symbol: 'VNINDEX', value: 1827.12, change: 12.34, percent: 0.68, breadth: [184, 92, 121] },
  { symbol: 'HNXINDEX', value: 312.48, change: -1.16, percent: -0.37, breadth: [76, 44, 68] },
  { symbol: 'UPCOMINDEX', value: 96.22, change: 0.18, percent: 0.19, breadth: [103, 51, 72] },
];
const marketRows = [
  {
    symbol: 'FPT',
    name: 'FPT Corporation',
    exchange: 'HOSE',
    price: 128500,
    reference: 126000,
    ceiling: 134800,
    floor: 117200,
    volume: 6268500,
    value: 804700000000,
  },
  {
    symbol: 'VCB',
    name: 'Vietcombank',
    exchange: 'HOSE',
    price: 92500,
    reference: 93000,
    ceiling: 99500,
    floor: 86500,
    volume: 1832200,
    value: 169480000000,
  },
  {
    symbol: 'HPG',
    name: 'Hoa Phat Group',
    exchange: 'HOSE',
    price: 27600,
    reference: 27600,
    ceiling: 29500,
    floor: 25700,
    volume: 12480500,
    value: 344460000000,
  },
  {
    symbol: 'VHM',
    name: 'Vinhomes',
    exchange: 'HOSE',
    price: 45800,
    reference: 45200,
    ceiling: 48350,
    floor: 42050,
    volume: 3921800,
    value: 179630000000,
  },
];
const holdings = [
  { symbol: 'FPT', quantity: 200, price: 128500, pnl: 1250000 },
  { symbol: 'HPG', quantity: 1000, price: 27600, pnl: 0 },
];

export function App() {
  const [health, setHealth] = useState<HealthState>('loading');
  const [accountMode, setAccountMode] = useState<AccountMode>('SIMULATION');
  const checkHealth = useCallback(async () => {
    setHealth('loading');
    try {
      await fetchHealth();
      setHealth('success');
    } catch {
      setHealth('error');
    }
  }, []);
  useEffect(() => {
    void fetchHealth().then(
      () => setHealth('success'),
      () => setHealth('error'),
    );
  }, []);
  return (
    <Routes>
      <Route
        path="/vi/overview"
        element={
          <OverviewPage
            locale="vi"
            health={health}
            accountMode={accountMode}
            setAccountMode={setAccountMode}
            checkHealth={checkHealth}
          />
        }
      />
      <Route
        path="/en/overview"
        element={
          <OverviewPage
            locale="en"
            health={health}
            accountMode={accountMode}
            setAccountMode={setAccountMode}
            checkHealth={checkHealth}
          />
        }
      />
      <Route path="*" element={<Navigate replace to="/vi/overview" />} />
    </Routes>
  );
}

function OverviewPage({
  locale,
  health,
  accountMode,
  setAccountMode,
  checkHealth,
}: {
  locale: Locale;
  health: HealthState;
  accountMode: AccountMode;
  setAccountMode: (mode: AccountMode) => void;
  checkHealth: () => void;
}) {
  const copy = translations[locale];
  const location = useLocation();
  useEffect(() => {
    document.documentElement.lang = locale;
    document.title = `${copy.wordmark} · ${copy.heading}`;
  }, [copy.heading, copy.wordmark, locale]);
  const isSimulation = accountMode === 'SIMULATION';
  const accountLabel = isSimulation ? copy.accountSimulation : copy.accountNormal;
  return (
    <div className="app-shell">
      <header className="topbar">
        <Link
          className="wordmark"
          to={location.pathname}
          aria-label={`${copy.wordmark}, ${copy.modeOverview}`}
        >
          {copy.wordmark}
        </Link>
        <nav className="desktop-nav" aria-label={copy.primaryNav}>
          {copy.nav.map((item, index) =>
            index === 0 ? (
              <Link className="active" to={location.pathname} key={item}>
                {item}
              </Link>
            ) : (
              <span
                className="nav-placeholder"
                aria-disabled="true"
                title={copy.futureNavigation}
                key={item}
              >
                {item}
              </span>
            ),
          )}
        </nav>
        <div className="top-actions">
          <label className="search-field">
            <span className="sr-only">{copy.search}</span>
            <input disabled placeholder={copy.search} />
          </label>
          <label className="account-select">
            <span className="sr-only">{copy.accountMode}</span>
            <select
              aria-label={copy.accountMode}
              value={accountMode}
              onChange={(event) => setAccountMode(event.target.value as AccountMode)}
            >
              <option value="SIMULATION">{copy.simulation}</option>
              <option value="NORMAL">{copy.normal}</option>
            </select>
          </label>
          <nav className="language-switch" aria-label={copy.language}>
            <Link
              className={locale === 'vi' ? 'current' : ''}
              aria-current={locale === 'vi' ? 'page' : undefined}
              aria-label={copy.vietnamese}
              to="/vi/overview"
            >
              VI
            </Link>
            <span aria-hidden="true">|</span>
            <Link
              className={locale === 'en' ? 'current' : ''}
              aria-current={locale === 'en' ? 'page' : undefined}
              aria-label={copy.english}
              to="/en/overview"
            >
              EN
            </Link>
          </nav>
          <button aria-label={copy.profile} className="profile-button" disabled type="button">
            ND
          </button>
        </div>
      </header>
      <div className="demo-banner" role="note">
        <span aria-hidden="true">●</span> {copy.demo}
      </div>
      <section className="index-strip" aria-label={copy.indexRegion}>
        <div className="market-context">
          <span className="status-dot" />
          <span>{copy.simulatedMarket}</span>
        </div>
        {indices.map((index) => (
          <div className="index-item" key={index.symbol}>
            <span className="index-symbol">{index.symbol}</span>
            <strong>{formatIndexPoints(index.value, locale)}</strong>
            <span className={index.change > 0 ? 'price-up' : 'price-down'}>
              {formatSignedIndexPoints(index.change, locale)} (
              {formatPercent(index.percent, locale)})
            </span>
          </div>
        ))}
      </section>
      <main className="content" id="overview">
        <div className="utility-line">
          <span>
            {copy.modeOverview} / {accountLabel}
          </span>
          <span>
            <i className="status-dot success" /> {copy.mockProvider}
          </span>
        </div>
        <div className="page-heading">
          <div>
            <h1>{copy.heading}</h1>
            <p className="muted">{copy.subtitle}</p>
          </div>
          <span className={`mode-badge ${isSimulation ? 'simulation' : 'normal'}`}>
            {accountLabel}
          </span>
        </div>
        <section className="breadth-line" aria-label={copy.breadth}>
          <strong>{copy.breadth}</strong>
          <span className="price-up">184 {copy.advances}</span>
          <span>92 {copy.unchanged}</span>
          <span className="price-down">121 {copy.declines}</span>
        </section>
        <section className="status-row" aria-label={copy.systemStatus}>
          <StatusCard
            title={copy.backend}
            state={health}
            copy={copy}
            onRetry={() => void checkHealth()}
          />
          <StatusCard title={copy.provider} state="success" copy={copy} provider />
          <StatusCard
            title={copy.account}
            state="success"
            copy={copy}
            accountLabel={accountLabel}
            isSimulation={isSimulation}
          />
        </section>
        <section className="summary-grid" aria-label={copy.summary}>
          <MetricCard
            label={copy.totalAssets}
            value={formatVnd(isSimulation ? 100000000 : 0, locale)}
            note={isSimulation ? copy.simulatedOpeningBalance : copy.brokerDisconnected}
          />
          <MetricCard
            label={copy.buyingPower}
            value={formatVnd(isSimulation ? 100000000 : 0, locale)}
            note={isSimulation ? copy.separateAccount : copy.brokerDisconnected}
          />
          <MetricCard
            label={copy.marketValue}
            value={formatVnd(isSimulation ? 53020000 : 0, locale)}
            note={copy.sampleSessionValue}
          />
          <MetricCard
            label={copy.unrealizedPnl}
            value={isSimulation ? formatSignedCompactVnd(1250000, locale) : '—'}
            positive={isSimulation}
            note={copy.sampleFinancialResult}
          />
        </section>
        <div className="workspace-grid">
          <section className="panel market-panel" aria-label={copy.market}>
            <PanelHeading title={copy.market} action="" copy={copy} />
            <div className="table-wrap">
              <table>
                <caption className="sr-only">{copy.marketCaption}</caption>
                <thead>
                  <tr>
                    <th>{copy.symbol}</th>
                    <th className="hide-tablet">{copy.exchange}</th>
                    <th className="numeric">{copy.price}</th>
                    <th className="numeric">{copy.change}</th>
                    <th className="numeric">{copy.percent}</th>
                    <th className="numeric hide-mobile">{copy.volume}</th>
                    <th className="numeric hide-mobile">{copy.value}</th>
                  </tr>
                </thead>
                <tbody>
                  {marketRows.map((row) => {
                    const state = getStockPriceState(
                      row.price,
                      row.reference,
                      row.ceiling,
                      row.floor,
                    );
                    const label = localizedPriceState(state, copy);
                    return (
                      <tr key={row.symbol}>
                        <td>
                          <strong>{row.symbol}</strong>
                          <span className="row-subtitle">{row.name}</span>
                        </td>
                        <td className="hide-tablet">{row.exchange}</td>
                        <td className={`numeric ${priceStateMeta[state].className}`}>
                          <strong>{formatVnd(row.price, locale)}</strong>
                          <span className="row-subtitle">{label}</span>
                        </td>
                        <td className={`numeric ${priceStateMeta[state].className}`}>
                          {formatSignedVnd(row.price - row.reference, locale)}
                        </td>
                        <td className={`numeric ${priceStateMeta[state].className}`}>
                          {formatPercent(
                            ((row.price - row.reference) / row.reference) * 100,
                            locale,
                          )}
                        </td>
                        <td className="numeric hide-mobile">{formatVolume(row.volume, locale)}</td>
                        <td className="numeric hide-mobile">
                          {formatCompactVnd(row.value, locale)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
          <section className="panel account-panel" aria-label={copy.accountPanel}>
            <PanelHeading title={copy.accountPanel} action={copy.details} copy={copy} />
            <div className="account-balance">
              <span className="muted">{accountLabel}</span>
              <strong>{formatVnd(isSimulation ? 100000000 : 0, locale)}</strong>
              <span className={isSimulation ? 'price-up' : 'muted'}>
                {isSimulation
                  ? `${formatSignedCompactVnd(1250000, locale)} · ${formatPercent(1.2, locale)}`
                  : copy.brokerDisconnected}
              </span>
            </div>
            <div className="mini-stats">
              <span>
                <small>{copy.buyingPower}</small>
                <b>{formatCompactVnd(isSimulation ? 100000000 : 0, locale)}</b>
              </span>
              <span>
                <small>{copy.portfolio}</small>
                <b>{formatCompactVnd(isSimulation ? 53020000 : 0, locale)}</b>
              </span>
            </div>
          </section>
          <section className="panel holdings-panel" aria-label={copy.recentHoldings}>
            <PanelHeading title={copy.recentHoldings} action={copy.portfolio} copy={copy} />
            {isSimulation ? (
              <div className="holding-list">
                {holdings.map((holding) => (
                  <div className="holding-row" key={holding.symbol}>
                    <span>
                      <strong>{holding.symbol}</strong>
                      <small>{formatVolume(holding.quantity, locale)}</small>
                    </span>
                    <span className="numeric">
                      <strong>{formatVnd(holding.price, locale)}</strong>
                      <small
                        className={
                          holding.pnl > 0
                            ? 'price-up'
                            : holding.pnl < 0
                              ? 'price-down'
                              : 'price-reference'
                        }
                      >
                        {formatSignedVnd(holding.pnl, locale)}
                      </small>
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState text={copy.noHoldings} copy={copy} />
            )}
          </section>
          <section className="panel performance-panel" aria-label={copy.performance}>
            <PanelHeading title={copy.performance} action={copy.report} copy={copy} />
            <EmptyState text={copy.noPerformance} disabled copy={copy} />
          </section>
        </div>
      </main>
      <nav className="mobile-nav" aria-label={copy.mobileNavigation}>
        {copy.mobileNav.map((item, index) =>
          index === 0 ? (
            <Link className="active" to={location.pathname} key={item}>
              {item}
            </Link>
          ) : (
            <span
              aria-disabled="true"
              className="nav-placeholder"
              title={copy.futureNavigation}
              key={item}
            >
              {item}
            </span>
          ),
        )}
      </nav>
    </div>
  );
}

function localizedPriceState(state: StockPriceState, copy: Copy) {
  return {
    CEILING: copy.ceiling,
    FLOOR: copy.floor,
    REFERENCE: copy.reference,
    UP: copy.up,
    DOWN: copy.down,
  }[state];
}
function StatusCard({
  title,
  state,
  copy,
  onRetry,
  provider,
  accountLabel,
  isSimulation,
}: {
  title: string;
  state: HealthState;
  copy: Copy;
  onRetry?: () => void;
  provider?: boolean;
  accountLabel?: string;
  isSimulation?: boolean;
}) {
  const label = provider
    ? copy.mockProvider
    : accountLabel ||
      (state === 'loading'
        ? copy.checkingBackend
        : state === 'success'
          ? copy.backendReady
          : copy.backendOffline);
  return (
    <div className="status-card">
      <span className="status-label">{title}</span>
      <strong className={state === 'error' ? 'price-down' : ''}>
        <span className={`status-dot ${state}`} />
        {label}
      </strong>
      {state === 'error' && (
        <button className="text-button" type="button" onClick={onRetry}>
          {copy.retry}
        </button>
      )}
      {state === 'loading' && <span className="muted">{copy.syncing}</span>}
      {state === 'success' && !provider && !accountLabel && (
        <span className="muted">{copy.readyForUi}</span>
      )}
      {accountLabel && (
        <span className="muted">{isSimulation ? copy.noRealMoney : copy.brokerDisconnected}</span>
      )}
    </div>
  );
}
function MetricCard({
  label,
  value,
  note,
  positive = false,
}: {
  label: string;
  value: string;
  note: string;
  positive?: boolean;
}) {
  return (
    <div className="metric-card">
      <span className="metric-label">{label}</span>
      <strong className={positive ? 'price-up' : ''}>{value}</strong>
      <small>{note}</small>
    </div>
  );
}
function PanelHeading({ title, action, copy }: { title: string; action: string; copy: Copy }) {
  return (
    <div className="panel-heading">
      <h2>{title}</h2>
      {action && (
        <button className="text-button" disabled title={copy.futureNavigation} type="button">
          {action} →
        </button>
      )}
    </div>
  );
}
function EmptyState({
  text,
  disabled = false,
  copy,
}: {
  text: string;
  disabled?: boolean;
  copy: Copy;
}) {
  return (
    <div className={`empty-state ${disabled ? 'disabled' : ''}`}>
      <span aria-hidden="true">—</span>
      <strong>{text}</strong>
      <small>{disabled ? copy.reportWillAppear : copy.updatesHere}</small>
    </div>
  );
}
