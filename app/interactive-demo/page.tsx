'use client';

import { useState, useEffect } from 'react';
import { useAppStore } from '@/lib/store';
import { FeedbackService } from '@/lib/feedback';
import InteractiveConversion from '@/components/InteractiveConversion';

export default function InteractiveDemoPage() {
  const [isClient, setIsClient] = useState(false);
  const { userBalance, recentConversions, updateBalance, addConversion } = useAppStore();

  useEffect(() => {
    setIsClient(true);
    
    // Initialize with some demo data
    if (recentConversions.length === 0) {
      const demoConversions = [
        {
          id: 'demo-1',
          fromCurrency: 'USD',
          toCurrency: 'EUR',
          amount: 100,
          convertedAmount: 85.50,
          rate: 0.855,
          fees: 2.50,
          netAmount: 83.00,
          timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
        },
        {
          id: 'demo-2',
          fromCurrency: 'USD',
          toCurrency: 'GBP',
          amount: 200,
          convertedAmount: 158.20,
          rate: 0.791,
          fees: 5.00,
          netAmount: 153.20,
          timestamp: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
        },
      ];
      
      demoConversions.forEach(conversion => addConversion(conversion));
    }
  }, [addConversion, recentConversions.length]);

  if (!isClient) {
    return (
      <div className="min-h-screen bg-neutral-200 flex items-center justify-center">
        <div className="text-center">
          <div className="loading-spinner mx-auto mb-4"></div>
          <p className="text-neutral-600">Loading interactive demo...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-200">
      {/* Header */}
      <header className="bg-cash-green-primary text-white p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">🎨 Interactive Demo</h1>
          <p className="text-cash-green-light">
            Click, convert, and see real data persistence in action!
          </p>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Interactive Conversion Component */}
        <div className="card">
          <div className="card-header">
            <h2 className="text-2xl font-semibold">💱 Live Currency Conversion</h2>
            <p className="text-sm text-neutral-600 mt-2">
              Try converting currencies and see the data persist across sessions!
            </p>
          </div>
          <div className="card-body">
            <InteractiveConversion 
              onConversionComplete={(result) => {
                FeedbackService.success(`Conversion completed! ${result.amount} ${result.fromCurrency} → ${result.netAmount} ${result.toCurrency}`);
              }}
            />
          </div>
        </div>

        {/* User Data Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Balance Card */}
          <div className="card card-balance">
            <div className="card-header">
              <h3 className="text-lg font-semibold text-white">💰 Current Balance</h3>
            </div>
            <div className="card-body">
              <div className="text-3xl font-bold font-mono text-white mb-2">
                ${userBalance.toFixed(2)}
              </div>
              <p className="text-sm text-white opacity-90">
                Available for conversions
              </p>
            </div>
          </div>

          {/* Recent Conversions */}
          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-semibold">📊 Recent Conversions</h3>
            </div>
            <div className="card-body">
              {recentConversions.length > 0 ? (
                <div className="space-y-3">
                  {recentConversions.slice(0, 3).map((conversion) => (
                    <div key={conversion.id} className="flex justify-between items-center p-3 bg-neutral-100 rounded-lg">
                      <div>
                        <div className="font-semibold text-sm">
                          {conversion.fromCurrency} → {conversion.toCurrency}
                        </div>
                        <div className="text-xs text-neutral-600">
                          {new Date(conversion.timestamp).toLocaleString()}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-mono font-bold text-success-green">
                          {conversion.netAmount.toFixed(2)} {conversion.toCurrency}
                        </div>
                        <div className="text-xs text-neutral-600">
                          Rate: {conversion.rate.toFixed(4)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-neutral-600 text-sm">No conversions yet. Try converting some currency!</p>
              )}
            </div>
          </div>
        </div>

        {/* Interactive Features Demo */}
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-semibold">🎮 Interactive Features</h3>
            <p className="text-sm text-neutral-600 mt-2">
              Try these interactive elements to see the feedback system in action:
            </p>
          </div>
          <div className="card-body">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => {
                  FeedbackService.success('Success notification!', {
                    action: {
                      label: 'View Details',
                      onClick: () => FeedbackService.info('Details clicked!')
                    }
                  });
                }}
                className="btn btn-success btn-full"
              >
                ✅ Success Demo
              </button>
              
              <button
                onClick={() => {
                  FeedbackService.error('Error notification!', {
                    action: {
                      label: 'Retry',
                      onClick: () => FeedbackService.info('Retry clicked!')
                    }
                  });
                }}
                className="btn btn-danger btn-full"
              >
                ❌ Error Demo
              </button>
              
              <button
                onClick={() => {
                  FeedbackService.info('Info notification with custom duration!', {
                    duration: 5000,
                    action: {
                      label: 'Learn More',
                      onClick: () => FeedbackService.warning('Learn more clicked!')
                    }
                  });
                }}
                className="btn btn-primary btn-full"
              >
                ℹ️ Info Demo
              </button>
            </div>
          </div>
        </div>

        {/* Data Persistence Info */}
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-semibold">💾 Data Persistence</h3>
          </div>
          <div className="card-body">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">🌐 Web App Features:</h4>
                <ul className="text-sm text-neutral-600 space-y-1">
                  <li>• Zustand state management with persistence</li>
                  <li>• Local storage for conversions and balance</li>
                  <li>• Real-time notifications and feedback</li>
                  <li>• Interactive conversion with validation</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">📱 Mobile App Features:</h4>
                <ul className="text-sm text-neutral-600 space-y-1">
                  <li>• AsyncStorage for data persistence</li>
                  <li>• Real conversion processing</li>
                  <li>• User action logging</li>
                  <li>• Native iOS interactions</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="card card-info">
          <div className="card-header">
            <h3 className="text-lg font-semibold text-info-blue">📋 How to Test</h3>
          </div>
          <div className="card-body">
            <ol className="text-sm text-neutral-700 space-y-2">
              <li><strong>1.</strong> Try converting different amounts and currencies</li>
              <li><strong>2.</strong> Watch your balance update in real-time</li>
              <li><strong>3.</strong> See conversions appear in the recent list</li>
              <li><strong>4.</strong> Click the notification buttons to test feedback</li>
              <li><strong>5.</strong> Refresh the page - your data persists!</li>
              <li><strong>6.</strong> Check browser dev tools → Application → Local Storage</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
