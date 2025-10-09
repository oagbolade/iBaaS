import { formatCurrency } from './hooks/useCurrencyFormat';


export const formatIfCurrency = (
  key: string,
  value: unknown,
  currencyKeys: readonly string[] | string[]
): string => {
  if (!currencyKeys.includes(key)) {
    return value != null && value !== '' ? String(value) : 'N/A';
  }

  const num =
    typeof value === 'string'
      ? parseFloat(value.replace(/,/g, '').trim())
      : typeof value === 'number'
      ? value
      : NaN;

  if (isNaN(num)) return 'N/A';
  return `NGN ${formatCurrency(num)}`;
};
