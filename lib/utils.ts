const formatterCache = new Map<string, Intl.NumberFormat>();

const getFormatter = (currency: string) => {
  if (!formatterCache.has(currency)) {
    formatterCache.set(
      currency,
      new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
        maximumFractionDigits: 2,
      }),
    );
  }

  return formatterCache.get(currency)!;
};

export const formatCurrency = (value: number, currency: string): string => {
  if (Number.isNaN(value)) {
    return '';
  }

  return getFormatter(currency).format(value);
};

export const parseCurrencyInput = (value: string): string => {
  const cleaned = value.replace(/[^\d.]/g, '');
  const [whole, fraction] = cleaned.split('.');

  if (fraction !== undefined) {
    const trimmedFraction = fraction.slice(0, 2);
    return `${whole || '0'}.${trimmedFraction}`;
  }

  return whole;
};

export const isSupportedCurrency = (currency: string): boolean =>
  SUPPORTED_CURRENCIES.includes(currency);

export const validateAmount = (value: string): string | undefined => {
  if (!value.trim()) {
    return 'Please enter an amount.';
  }

  const sanitized = parseCurrencyInput(value);
  const numeric = Number(sanitized);
  if (Number.isNaN(numeric)) {
    return 'Amount must be a number.';
  }

  if (numeric <= 0) {
    return 'Amount must be greater than zero.';
  }

  if (numeric > 9999999999) {
    return 'Amount is too large.';
  }

  return undefined;
};

export const SUPPORTED_CURRENCIES = [
  'USD',
  'EUR',
  'GBP',
  'JPY',
  'CAD',
  'AUD',
  'CHF',
  'CNY',
] as const;

export type SupportedCurrency = (typeof SUPPORTED_CURRENCIES)[number];

export const formatExchangeRate = (
  base: string,
  quote: string,
  rate: number,
): string => {
  return `1 ${base} = ${rate.toFixed(4)} ${quote}`;
};
