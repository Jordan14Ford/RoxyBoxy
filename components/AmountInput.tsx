'use client';

import { ChangeEvent, useId, useMemo, useState } from 'react';
import { formatCurrency, parseCurrencyInput } from '../lib/utils';

interface AmountInputProps {
  value: string;
  onChange: (value: string) => void;
  currency: string;
  error?: string;
}

export const AmountInput = ({
  value,
  onChange,
  currency,
  error,
}: AmountInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputId = useId();

  const sanitizedValue = useMemo(() => parseCurrencyInput(value), [value]);
  const numericValue = Number(sanitizedValue);

  const formattedValue =
    sanitizedValue && !Number.isNaN(numericValue)
      ? formatCurrency(numericValue, currency)
      : '';

  const displayValue = isFocused ? sanitizedValue : formattedValue;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextSanitized = parseCurrencyInput(event.target.value);
    onChange(nextSanitized);
  };

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <div className="w-full">
      <label
        className="mb-xs block text-text-secondary text-small"
        htmlFor={inputId}
      >
        Amount
      </label>
      <input
        type="text"
        inputMode="decimal"
        id={inputId}
        value={displayValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder="Enter amount"
        className={`w-full rounded-lg border-2 px-sm py-sm text-[20px] font-semibold leading-tight transition focus:outline-none ${
          error
            ? 'border-red-500 focus:border-red-500'
            : 'border-gray-200 focus:border-cash-app-green'
        }`}
      />
      {error ? <p className="mt-xs text-small text-red-500">{error}</p> : null}
    </div>
  );
};
