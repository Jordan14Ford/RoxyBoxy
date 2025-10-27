'use client';

import { motion } from 'framer-motion';
import { formatCurrency } from '../lib/utils';
import { BreakdownTable } from './BreakdownTable';
import { Button } from './Button';

interface CoachCardProps {
  fromAmount: number;
  fromCurrency: string;
  toAmount: number;
  toCurrency: string;
  rate: number;
  fee: number;
  netAmount: number;
  aiTips: string;
  onProceed: () => void;
  onLearnMore: () => void;
  onCancel: () => void;
}

export const CoachCard = ({
  fromAmount,
  fromCurrency,
  toAmount,
  toCurrency,
  rate,
  fee,
  netAmount,
  aiTips,
  onProceed,
  onLearnMore,
  onCancel,
}: CoachCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="mt-lg rounded-lg bg-white p-lg shadow-card"
    >
      <header className="flex flex-col gap-xs">
        <h2 className="font-heading text-h1 text-text-primary">
          You&apos;ll receive{' '}
          <span className="text-cash-app-green">
            {formatCurrency(netAmount, toCurrency)}
          </span>
        </h2>
        <p className="text-body text-text-secondary">
          Converted from {formatCurrency(fromAmount, fromCurrency)} at a rate of{' '}
          {rate.toFixed(4)}, giving {formatCurrency(toAmount, toCurrency)} before
          fees. After fees you&apos;ll receive{' '}
          {formatCurrency(netAmount, toCurrency)}.
        </p>
      </header>

      <BreakdownTable
        rate={rate}
        fee={fee}
        netAmount={netAmount}
        fromCurrency={fromCurrency}
        toCurrency={toCurrency}
      />

      <section className="mt-lg">
        <h3 className="mb-xs font-heading text-h2 text-text-primary">
          Coach Tips
        </h3>
        <p className="whitespace-pre-line rounded-lg bg-light-bg p-md text-body text-text-secondary">
          {aiTips}
        </p>
      </section>

      <div className="mt-lg flex flex-col gap-sm md:flex-row">
        <Button onClick={onProceed}>Proceed</Button>
        <Button onClick={onLearnMore} variant="secondary">
          Learn More
        </Button>
        <Button onClick={onCancel} variant="secondary">
          Cancel
        </Button>
      </div>
    </motion.div>
  );
};
