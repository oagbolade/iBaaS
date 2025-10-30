import { formatCurrency } from './hooks/useCurrencyFormat';

export const formatIfCurrency = (
  key: string,
  value: unknown,
  currencyKeys: readonly string[] | string[]
): string => {
  if (!currencyKeys.includes(key)) {
    return value != null && value !== '' ? String(value) : 'N/A';
  }

  let num: number;

  if (typeof value === 'string') {
    num = parseFloat(value.replace(/,/g, '').trim());
  } else if (typeof value === 'number') {
    num = value;
  } else {
    num = NaN;
  }

  if (Number.isNaN(num)) return 'N/A';
  return `NGN ${formatCurrency(num)}`;
};
