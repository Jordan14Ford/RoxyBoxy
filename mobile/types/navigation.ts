/**
 * NAVIGATION TYPES
 * TypeScript definitions for mobile app navigation
 */

export type RootStackParamList = {
  Home: undefined;
  Conversion: {
    fromCurrency?: string;
    toCurrency?: string;
    amount?: number;
  };
  Coach: {
    conversionData?: {
      fromCurrency: string;
      toCurrency: string;
      amount: number;
      convertedAmount: number;
      rate: number;
      fees: number;
    };
  };
  Settings: undefined;
};

// Currency types for the app
export interface Currency {
  code: string;
  name: string;
  symbol: string;
  flag: string;
}

export interface ConversionResult {
  fromCurrency: string;
  toCurrency: string;
  amount: number;
  convertedAmount: number;
  rate: number;
  fees: number;
  timestamp: Date;
}

export interface CoachAdvice {
  title: string;
  message: string;
  tips: string[];
  urgency: 'low' | 'medium' | 'high';
  category: 'timing' | 'amount' | 'method' | 'general';
}
