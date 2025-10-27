'use client';

import { FormEvent, useMemo, useState } from 'react';
import { AmountInput } from '../components/AmountInput';
import { Button } from '../components/Button';
import { CoachCard } from '../components/CoachCard';
import { ConfirmationScreen } from '../components/ConfirmationScreen';
import { CurrencyDropdown } from '../components/CurrencyDropdown';
import {
  SUPPORTED_CURRENCIES,
  SupportedCurrency,
  formatCurrency,
  parseCurrencyInput,
  validateAmount,
} from '../lib/utils';

type ViewState = 'form' | 'results' | 'confirmation';

interface ConversionData {
  rate: number;
  fee: number;
  netAmount: number;
  aiTips: string;
  convertedAmount: number;
  originalAmount: number;
}

export default function HomePage() {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState<SupportedCurrency>('USD');
  const [toCurrency, setToCurrency] = useState<SupportedCurrency>('EUR');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [view, setView] = useState<ViewState>('form');
  const [conversionData, setConversionData] = useState<ConversionData | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const [showLearnMore, setShowLearnMore] = useState(false);

  const numericAmount = useMemo(() => {
    const sanitized = parseCurrencyInput(amount);
    const numeric = Number(sanitized);
    return Number.isNaN(numeric) ? 0 : numeric;
  }, [amount]);

  const isFormValid = numericAmount > 0 && fromCurrency !== toCurrency;

  const resetForm = () => {
    setAmount('');
    setFromCurrency('USD');
    setToCurrency('EUR');
    setErrors({});
    setServerError(null);
    setShowLearnMore(false);
    setConversionData(null);
    setView('form');
  };

  const handleSubmit = async (event?: FormEvent) => {
    event?.preventDefault();

    const nextErrors: Record<string, string> = {};
    const amountError = validateAmount(amount);
    if (amountError) {
      nextErrors.amount = amountError;
    }
    if (fromCurrency === toCurrency) {
      nextErrors.currency = 'Choose two different currencies.';
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    setServerError(null);
    setIsLoading(true);

    try {
      const response = await fetch('/api/convert-currency', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: numericAmount,
          fromCurrency,
          toCurrency,
        }),
      });

      const json = await response.json();

      if (!response.ok || !json.success) {
        throw new Error(json.error ?? 'Something went wrong.');
      }

      const { rate, fee, netAmount, aiTips, convertedAmount } = json.data;
      setConversionData({
        rate,
        fee,
        netAmount,
        aiTips,
        convertedAmount,
        originalAmount: Number(numericAmount.toFixed(2)),
      });
      setShowLearnMore(false);
      setView('results');
    } catch (error) {
      setServerError(
        error instanceof Error
          ? error.message
          : 'Unable to complete conversion right now.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <main className="flex flex-1 flex-col">
      <section className="rounded-lg bg-white p-lg shadow-card">
        <h1 className="font-heading text-h1 text-text-primary">
          Currency Coach
        </h1>
        <p className="mt-xs text-body text-text-secondary">
          Get real-time conversions and friendly advice while you travel. We&apos;ll
          coach you through the best way to move your money abroad.
        </p>

        {serverError ? (
          <div className="mt-sm rounded-md border border-warning-amber bg-warning-amber/10 p-sm text-body text-text-primary">
            {serverError}
          </div>
        ) : null}

        {view === 'form' ? (
          <form
            className="mt-lg flex flex-col gap-md"
            onSubmit={handleSubmit}
          >
            <AmountInput
              value={amount}
              onChange={setAmount}
              currency={fromCurrency}
              error={errors.amount}
            />

            <div className="flex flex-col gap-sm md:flex-row">
              <CurrencyDropdown
                label="From"
                value={fromCurrency}
                onChange={setFromCurrency}
                disabledValue={toCurrency}
              />
              <button
                type="button"
                onClick={handleSwapCurrencies}
                className="self-center rounded-full border border-gray-200 px-sm py-xs text-small text-text-secondary transition hover:border-cash-app-green hover:text-cash-app-green md:self-end"
                aria-label="Swap currencies"
              >
                ↕ Swap
              </button>
              <CurrencyDropdown
                label="To"
                value={toCurrency}
                onChange={setToCurrency}
                disabledValue={fromCurrency}
              />
            </div>
            {errors.currency ? (
              <p className="text-small text-red-500">{errors.currency}</p>
            ) : null}

            <div className="mt-sm">
              <Button
                disabled={!isFormValid}
                loading={isLoading}
                type="submit"
              >
                Get Conversion
              </Button>
            </div>
          </form>
        ) : null}
      </section>

      {view === 'results' && conversionData ? (
        <>
          <CoachCard
            fromAmount={conversionData.originalAmount}
            fromCurrency={fromCurrency}
            toAmount={conversionData.convertedAmount}
            toCurrency={toCurrency}
            rate={conversionData.rate}
            fee={conversionData.fee}
            netAmount={conversionData.netAmount}
            aiTips={conversionData.aiTips}
            onProceed={() => setView('confirmation')}
            onLearnMore={() => setShowLearnMore(true)}
            onCancel={resetForm}
          />
          {showLearnMore ? (
            <div className="mt-md rounded-lg border border-cash-app-green bg-light-bg p-md">
              <h3 className="font-heading text-h2 text-text-primary">
                Want to dive deeper?
              </h3>
              <p className="mt-xs text-body text-text-secondary">
                Check the mid-market rate directly inside Cash App, set rate alerts,
                and compare fees with local kiosks before confirming your transfer.
                Traveling soon? Conversions made mid-week typically avoid weekend
                volatility.
              </p>
            </div>
          ) : null}
        </>
      ) : null}

      {view === 'confirmation' && conversionData ? (
        <ConfirmationScreen
          fromAmount={conversionData.originalAmount}
          fromCurrency={fromCurrency}
          toCurrency={toCurrency}
          netAmount={conversionData.netAmount}
          onNewConversion={resetForm}
        />
      ) : null}

      {view !== 'form' ? (
        <div className="mt-lg text-center text-small text-text-secondary">
          <p>
            Need to adjust something?{' '}
            <button
              type="button"
              onClick={resetForm}
              className="font-semibold text-cash-app-green underline"
            >
              Start over
            </button>
          </p>
        </div>
      ) : null}

      <section className="mt-xl rounded-lg border border-gray-200 bg-white p-lg shadow-card">
        <h2 className="font-heading text-h2 text-text-primary">
          Today&apos;s spotlight
        </h2>
        <p className="mt-xs text-body text-text-secondary">
          Traveling between multiple countries? Save your favorite pairs for quick
          checks, and lean on Currency Coach to surface timing tips based on market
          hours, local bank holidays, and major economic events.
        </p>
        <ul className="mt-sm grid gap-sm md:grid-cols-2">
          {SUPPORTED_CURRENCIES.slice(0, 4).map((currency) => (
            <li
              key={currency}
              className="rounded-lg border border-gray-100 bg-light-bg p-md text-text-secondary"
            >
              {currency}: Track how your {formatCurrency(100, currency)} shifts
              throughout the day.
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
