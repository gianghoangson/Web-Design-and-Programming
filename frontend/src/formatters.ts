import type { Locale } from './translations';

const config: Record<Locale, { locale: string; volume: string; units: string[] }> = {
  vi: { locale: 'vi-VN', volume: 'CP', units: ['nghìn', 'triệu', 'tỷ'] },
  en: { locale: 'en-US', volume: 'shares', units: ['thousand', 'million', 'billion'] },
};
const finite = (value: number): number => {
  if (!Number.isFinite(value)) throw new Error('Value must be finite');
  return value;
};
const number = (value: number, locale: Locale, options?: Intl.NumberFormatOptions) =>
  new Intl.NumberFormat(config[locale].locale, options).format(finite(value));
const sign = (value: number) => (finite(value) > 0 ? '+' : '');

export function formatVnd(value: number, locale: Locale = 'vi'): string {
  return formatCurrency(value, locale, number);
}
export function formatCompact(value: number, locale: Locale = 'vi'): string {
  finite(value);
  const abs = Math.abs(value);
  const divisor = abs >= 1e9 ? 1e9 : abs >= 1e6 ? 1e6 : abs >= 1e3 ? 1e3 : 1;
  if (divisor === 1) return number(value, locale);
  return `${number(value / divisor, locale, { maximumFractionDigits: 2 })} ${config[locale].units[Math.log10(divisor) / 3 - 1]}`;
}
export function formatCompactVnd(value: number, locale: Locale = 'vi'): string {
  return formatCurrency(value, locale, formatCompact);
}
export function formatSignedCompactVnd(value: number, locale: Locale = 'vi'): string {
  return `${sign(value)}${formatCompactVnd(value, locale)}`;
}
export function formatSignedVnd(value: number, locale: Locale = 'vi'): string {
  return `${sign(value)}${formatVnd(value, locale)}`;
}
export function formatVolume(value: number, locale: Locale = 'vi'): string {
  return `${number(value, locale)} ${config[locale].volume}`;
}
export function formatIndex(value: number, locale: Locale = 'vi'): string {
  return number(value, locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
export function formatSignedIndex(value: number, locale: Locale = 'vi'): string {
  return `${sign(value)}${formatIndex(value, locale)}`;
}
export function formatIndexPoints(value: number, locale: Locale = 'vi'): string {
  return `${formatIndex(value, locale)} ${locale === 'vi' ? 'điểm' : 'points'}`;
}
export function formatSignedIndexPoints(value: number, locale: Locale = 'vi'): string {
  return `${formatSignedIndex(value, locale)} ${locale === 'vi' ? 'điểm' : 'points'}`;
}
export function formatPercent(value: number, locale: Locale = 'vi'): string {
  return `${sign(value)}${number(value, locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}%`;
}

function formatCurrency(
  value: number,
  locale: Locale,
  formatter: (amount: number, locale: Locale) => string,
): string {
  const signPrefix = value < 0 ? '-' : '';
  const result = formatter(Math.abs(finite(value)), locale);
  return locale === 'en' ? `${signPrefix}₫${result}` : `${signPrefix}${result} ₫`;
}
