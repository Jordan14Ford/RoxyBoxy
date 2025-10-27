'use client';

import { ChangeEvent, useId } from 'react';
import {
  SUPPORTED_CURRENCIES,
  SupportedCurrency,
} from '../lib/utils';

interface CurrencyDropdownProps {
  value: SupportedCurrency;
  onChange: (value: SupportedCurrency) => void;
  label: string;
  disabledValue?: SupportedCurrency;
}

const currencyFlags: Record<SupportedCurrency, string> = {
  USD: '🇺🇸',
  EUR: '🇪🇺',
  GBP: '🇬🇧',
  JPY: '🇯🇵',
  CAD: '🇨🇦',
  AUD: '🇦🇺',
  CHF: '🇨🇭',
  CNY: '🇨🇳',
};

export const CurrencyDropdown = ({
  value,
  onChange,
  label,
  disabledValue,
}: CurrencyDropdownProps) => {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value as SupportedCurrency);
  };

  const selectId = useId();

  return (
    <div className="flex w-full flex-col">
      <label className="mb-xs text-small text-text-secondary" htmlFor={selectId}>
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={handleChange}
          id={selectId}
          className="w-full appearance-none rounded-lg border-2 border-gray-200 bg-white px-sm py-sm text-body font-semibold focus:border-cash-app-green focus:outline-none"
        >
          {SUPPORTED_CURRENCIES.map((currency) => (
            <option
              key={currency}
              value={currency}
              disabled={currency === disabledValue}
            >
              {currencyFlags[currency]} {currency}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-sm top-1/2 -translate-y-1/2 text-text-secondary">
          ▾
        </span>
      </div>
    </div>
  );
};
