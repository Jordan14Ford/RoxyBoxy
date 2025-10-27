'use client';

import { formatCurrency } from '../lib/utils';

interface BreakdownTableProps {
  rate: number;
  fee: number;
  netAmount: number;
  fromCurrency: string;
  toCurrency: string;
}

export const BreakdownTable = ({
  rate,
  fee,
  netAmount,
  fromCurrency,
  toCurrency,
}: BreakdownTableProps) => {
  return (
    <div className="mt-md rounded-lg border border-gray-200 bg-white p-md shadow-card">
      <h3 className="mb-sm font-heading text-h2 text-text-primary">
        Conversion Breakdown
      </h3>
      <dl className="space-y-sm text-body">
        <div className="flex items-center justify-between">
          <dt className="text-text-secondary">Exchange Rate</dt>
          <dd className="font-semibold text-text-primary">
            1 {fromCurrency} = {rate.toFixed(4)} {toCurrency}
          </dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-text-secondary">Fee (2%)</dt>
          <dd className="font-semibold text-text-primary">
            {formatCurrency(fee, toCurrency)}
          </dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-text-secondary">Net Amount</dt>
          <dd className="font-semibold text-text-primary">
            {formatCurrency(netAmount, toCurrency)}
          </dd>
        </div>
      </dl>
    </div>
  );
};
