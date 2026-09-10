export type StockPriceState = 'CEILING' | 'FLOOR' | 'REFERENCE' | 'UP' | 'DOWN';

export function getStockPriceState(
  price: number,
  reference: number,
  ceiling: number,
  floor: number,
): StockPriceState {
  if (![price, reference, ceiling, floor].every(Number.isFinite))
    throw new Error('Giá cổ phiếu phải là số hữu hạn');
  if (price === ceiling) return 'CEILING';
  if (price === floor) return 'FLOOR';
  if (price === reference) return 'REFERENCE';
  return price > reference ? 'UP' : 'DOWN';
}

export const priceStateMeta: Record<StockPriceState, { className: string; label: string }> = {
  CEILING: { className: 'price-ceiling', label: 'Trần' },
  FLOOR: { className: 'price-floor', label: 'Sàn' },
  REFERENCE: { className: 'price-reference', label: 'Tham chiếu' },
  UP: { className: 'price-up', label: 'Tăng' },
  DOWN: { className: 'price-down', label: 'Giảm' },
};
