'use client';

import { formatCurrency } from '../lib/utils';
import { Button } from './Button';

interface ConfirmationScreenProps {
  fromAmount: number;
  fromCurrency: string;
  toCurrency: string;
  netAmount: number;
  onNewConversion: () => void;
}

export const ConfirmationScreen = ({
  fromAmount,
  fromCurrency,
  toCurrency,
  netAmount,
  onNewConversion,
}: ConfirmationScreenProps) => {
  return (
    <div className="mt-lg rounded-lg bg-white p-lg text-center shadow-card">
      <h2 className="font-heading text-h1 text-text-primary">
        Conversion Scheduled 🎉
      </h2>
      <p className="mt-sm text-body text-text-secondary">
        You&apos;re sending {formatCurrency(fromAmount, fromCurrency)} and your
        recipient will receive{' '}
        <span className="font-semibold text-cash-app-green">
          {formatCurrency(netAmount, toCurrency)}
        </span>
        . We&apos;ll send notifications once it&apos;s complete.
      </p>
      <div className="mt-lg flex justify-center">
        <Button onClick={onNewConversion}>Start Another Conversion</Button>
      </div>
    </div>
  );
};
