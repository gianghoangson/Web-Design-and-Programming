import { describe, expect, it } from 'vitest';
import {
  formatCompact,
  formatCompactVnd,
  formatIndex,
  formatSignedCompactVnd,
  formatSignedIndex,
  formatSignedVnd,
  formatVnd,
  formatVolume,
} from './formatters';
import { getStockPriceState } from './market';
import {
  formatIndexPoints,
  formatPercent,
  formatSignedIndexPoints,
  formatVnd as formatLocaleVnd,
  formatVolume as formatLocaleVolume,
} from './formatters';

describe('market price state', () => {
  it('uses deterministic precedence at boundaries', () => {
    expect(getStockPriceState(110, 100, 110, 90)).toBe('CEILING');
    expect(getStockPriceState(90, 100, 110, 90)).toBe('FLOOR');
    expect(getStockPriceState(100, 100, 110, 90)).toBe('REFERENCE');
    expect(getStockPriceState(101, 100, 110, 90)).toBe('UP');
    expect(getStockPriceState(99, 100, 110, 90)).toBe('DOWN');
  });

  it('rejects non-finite input', () => {
    expect(() => getStockPriceState(Number.NaN, 100, 110, 90)).toThrow();
    expect(() => getStockPriceState(100, Infinity, 110, 90)).toThrow();
  });
});

describe('Vietnamese number formatters', () => {
  it('formats full VND and volume', () => {
    expect(formatVnd(128500)).toBe('128.500 ₫');
    expect(formatSignedVnd(2500)).toBe('+2.500 ₫');
    expect(formatSignedVnd(0)).toBe('0 ₫');
    expect(formatVolume(6268500)).toBe('6.268.500 CP');
  });

  it('formats compact values with stable units', () => {
    expect(formatCompact(12850000)).toBe('12,85 triệu');
    expect(formatCompact(1_200_000_000)).toBe('1,2 tỷ');
    expect(formatCompact(850)).toBe('850');
    expect(formatCompactVnd(12_850_000)).toBe('12,85 triệu ₫');
    expect(formatSignedCompactVnd(1_250_000)).toBe('+1,25 triệu ₫');
    expect(formatIndex(1284.42)).toBe('1.284,42');
    expect(formatSignedIndex(-0.05)).toBe('-0,05');
  });
});

describe('localized number formatters', () => {
  it('formats currency and volume for both supported locales', () => {
    expect(formatLocaleVnd(128500, 'vi')).toBe('128.500 ₫');
    expect(formatLocaleVnd(128500, 'en')).toBe('₫128,500');
    expect(formatLocaleVolume(6268500, 'vi')).toBe('6.268.500 CP');
    expect(formatLocaleVolume(6268500, 'en')).toBe('6,268,500 shares');
  });

  it('puts a negative sign before the English currency symbol', () => {
    expect(formatSignedVnd(-500, 'en')).toBe('-₫500');
    expect(formatSignedCompactVnd(-1_250_000, 'en')).toBe('-₫1.25 million');
  });

  it('formats market index levels and signed point changes separately from money', () => {
    expect(formatIndexPoints(1827.12, 'vi')).toBe('1.827,12 điểm');
    expect(formatIndexPoints(1827.12, 'en')).toBe('1,827.12 points');
    expect(formatSignedIndexPoints(12.34, 'vi')).toBe('+12,34 điểm');
    expect(formatSignedIndexPoints(-12.34, 'en')).toBe('-12.34 points');
    expect(formatIndexPoints(1827.12, 'vi')).not.toMatch(/[₫]|VND/);
    expect(formatIndexPoints(1827.12, 'en')).not.toMatch(/[₫]|VND/);
  });

  it('formats signed percentages for both locales', () => {
    expect(formatPercent(0.68, 'vi')).toBe('+0,68%');
    expect(formatPercent(-0.37, 'en')).toBe('-0.37%');
    expect(formatPercent(0, 'vi')).toBe('0,00%');
  });
});
