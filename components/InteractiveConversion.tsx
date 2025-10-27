'use client';

import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { FeedbackService } from '@/lib/feedback';
import { SUPPORTED_CURRENCIES } from '@/lib/utils';

interface InteractiveConversionProps {
  onConversionComplete?: (result: any) => void;
}

export default function InteractiveConversion({ onConversionComplete }: InteractiveConversionProps) {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  
  const { addConversion, updateBalance, userBalance } = useAppStore();
  
  const handleConvert = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      FeedbackService.error('Please enter a valid amount');
      return;
    }

    if (parseFloat(amount) > userBalance) {
      FeedbackService.error('Insufficient balance for this conversion');
      return;
    }

    if (fromCurrency === toCurrency) {
      FeedbackService.error('Please select different currencies');
      return;
    }

    setIsLoading(true);
    FeedbackService.logUserAction('currency_conversion_attempt', {
      fromCurrency,
      toCurrency,
      amount: parseFloat(amount)
    });

    try {
      const response = await fetch('/api/convert-currency', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          fromCurrency, 
          toCurrency, 
          amount: parseFloat(amount) 
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setResult(data.data);
        addConversion(data.data);
        updateBalance(userBalance - parseFloat(amount));
        
        FeedbackService.success(data.message || 'Conversion successful!', {
          action: {
            label: 'View Details',
            onClick: () => {
              FeedbackService.info('Conversion details displayed');
            }
          }
        });

        FeedbackService.logUserAction('currency_conversion_success', {
          conversionId: data.data.id,
          amount: data.data.amount,
          convertedAmount: data.data.convertedAmount
        });

        if (onConversionComplete) {
          onConversionComplete(data.data);
        }
      } else {
        FeedbackService.error(data.error || 'Conversion failed. Please try again.');
        FeedbackService.logUserAction('currency_conversion_error', {
          error: data.error
        });
      }
    } catch (error) {
      console.error('Conversion error:', error);
      FeedbackService.error('Network error. Please check your connection and try again.');
      FeedbackService.logUserAction('currency_conversion_network_error', {
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    FeedbackService.logUserAction('currency_swap');
  };

  const handleQuickAmount = (quickAmount: number) => {
    setAmount(quickAmount.toString());
    FeedbackService.logUserAction('quick_amount_selected', { amount: quickAmount });
  };

  return (
    <div className="interactive-conversion">
      <div className="conversion-header">
        <h2 className="text-2xl font-semibold mb-4">Convert Currency</h2>
        <div className="balance-display mb-4">
          <span className="text-sm text-neutral-600">Available Balance: </span>
          <span className="font-mono font-bold text-lg text-cash-green">
            ${userBalance.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Quick Amount Buttons */}
      <div className="quick-amounts mb-4">
        <div className="text-sm font-medium text-neutral-700 mb-2">Quick Amounts:</div>
        <div className="flex gap-2 flex-wrap">
          {[25, 50, 100, 250, 500].map(quickAmount => (
            <button
              key={quickAmount}
              onClick={() => handleQuickAmount(quickAmount)}
              className="btn btn-ghost btn-sm"
              disabled={isLoading}
            >
              ${quickAmount}
            </button>
          ))}
        </div>
      </div>

      {/* Amount Input */}
      <div className="form-group mb-4">
        <label className="label">Amount to Convert</label>
        <div className="input-group-currency">
          <span className="currency-symbol">$</span>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className="input input-currency"
            disabled={isLoading}
            min="0"
            step="0.01"
          />
        </div>
      </div>

      {/* Currency Selection */}
      <div className="currency-selection mb-4">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <label className="label">From</label>
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="input select"
              disabled={isLoading}
            >
              {SUPPORTED_CURRENCIES.map(currency => (
                <option key={currency} value={currency}>
                  {currency} - {getCurrencyName(currency)}
                </option>
              ))}
            </select>
          </div>
          
          <button
            onClick={handleSwapCurrencies}
            className="btn btn-ghost btn-icon"
            disabled={isLoading}
            title="Swap currencies"
          >
            ↔️
          </button>
          
          <div className="flex-1">
            <label className="label">To</label>
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className="input select"
              disabled={isLoading}
            >
              {SUPPORTED_CURRENCIES.map(currency => (
                <option key={currency} value={currency}>
                  {currency} - {getCurrencyName(currency)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Convert Button */}
      <button
        onClick={handleConvert}
        disabled={isLoading || !amount || parseFloat(amount) <= 0}
        className="btn btn-primary btn-full mb-4"
      >
        {isLoading ? (
          <>
            <span className="loading-spinner mr-2"></span>
            Converting...
          </>
        ) : (
          'Convert Currency'
        )}
      </button>

      {/* Conversion Result */}
      {result && (
        <div className="conversion-result card">
          <div className="card-header">
            <h3 className="text-lg font-semibold">Conversion Result</h3>
          </div>
          <div className="card-body">
            <div className="conversion-summary mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold font-mono text-neutral-900 mb-1">
                  {result.amount} {result.fromCurrency}
                </div>
                <div className="text-sm text-neutral-600 mb-2">converts to</div>
                <div className="text-3xl font-bold font-mono text-cash-green">
                  {result.netAmount} {result.toCurrency}
                </div>
              </div>
            </div>
            
            <div className="conversion-details">
              <div className="flex justify-between items-center py-2 border-b border-neutral-200">
                <span className="text-sm text-neutral-600">Exchange Rate:</span>
                <span className="font-mono font-semibold">{result.rate.toFixed(4)}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-neutral-200">
                <span className="text-sm text-neutral-600">Fees:</span>
                <span className="font-mono font-semibold text-error-red">
                  ${result.fees.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-neutral-600">Net Amount:</span>
                <span className="font-mono font-bold text-success-green">
                  {result.netAmount} {result.toCurrency}
                </span>
              </div>
            </div>

            {result.aiTips && (
              <div className="ai-tips mt-4 p-3 bg-info-blue-light rounded-lg">
                <div className="text-sm font-medium text-info-blue mb-1">🤖 AI Tip:</div>
                <div className="text-sm text-neutral-700">{result.aiTips}</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Helper function to get currency names
function getCurrencyName(currency: string): string {
  const names: Record<string, string> = {
    'USD': 'US Dollar',
    'EUR': 'Euro',
    'GBP': 'British Pound',
    'JPY': 'Japanese Yen',
    'CAD': 'Canadian Dollar',
    'AUD': 'Australian Dollar',
    'CHF': 'Swiss Franc',
    'CNY': 'Chinese Yuan',
  };
  return names[currency] || currency;
}
