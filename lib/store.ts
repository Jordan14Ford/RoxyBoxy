/**
 * STATE MANAGEMENT - Zustand Store
 * Global state management for the Cash App Currency Coach web app
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ConversionResult {
  id: string;
  fromCurrency: string;
  toCurrency: string;
  amount: number;
  convertedAmount: number;
  rate: number;
  fees: number;
  timestamp: string;
}

export interface MarketTrend {
  currency: string;
  change: number;
  changePercent: number;
  trend: 'up' | 'down' | 'stable';
}

export interface UserPreferences {
  defaultFromCurrency: string;
  defaultToCurrency: string;
  notifications: boolean;
  theme: 'light' | 'dark';
}

export interface AppState {
  // User Data
  userBalance: number;
  recentConversions: ConversionResult[];
  marketTrends: MarketTrend[];
  userPreferences: UserPreferences;
  
  // UI State
  isLoading: boolean;
  error: string | null;
  
  // Actions
  updateBalance: (amount: number) => void;
  addConversion: (conversion: ConversionResult) => void;
  updateMarketTrends: (trends: MarketTrend[]) => void;
  updatePreferences: (preferences: Partial<UserPreferences>) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial State
      userBalance: 1000,
      recentConversions: [],
      marketTrends: [],
      userPreferences: {
        defaultFromCurrency: 'USD',
        defaultToCurrency: 'EUR',
        notifications: true,
        theme: 'light',
      },
      isLoading: false,
      error: null,

      // Actions
      updateBalance: (amount: number) => 
        set({ userBalance: amount }),

      addConversion: (conversion: ConversionResult) => 
        set(state => ({ 
          recentConversions: [conversion, ...state.recentConversions.slice(0, 9)]
        })),

      updateMarketTrends: (trends: MarketTrend[]) => 
        set({ marketTrends: trends }),

      updatePreferences: (preferences: Partial<UserPreferences>) =>
        set(state => ({
          userPreferences: { ...state.userPreferences, ...preferences }
        })),

      setLoading: (loading: boolean) => 
        set({ isLoading: loading }),

      setError: (error: string | null) => 
        set({ error }),

      clearError: () => 
        set({ error: null }),
    }),
    {
      name: 'cashapp-currency-coach-storage',
      partialize: (state) => ({
        userBalance: state.userBalance,
        recentConversions: state.recentConversions,
        userPreferences: state.userPreferences,
      }),
    }
  )
);

// Selectors for better performance
export const useUserBalance = () => useAppStore(state => state.userBalance);
export const useRecentConversions = () => useAppStore(state => state.recentConversions);
export const useMarketTrends = () => useAppStore(state => state.marketTrends);
export const useUserPreferences = () => useAppStore(state => state.userPreferences);
export const useIsLoading = () => useAppStore(state => state.isLoading);
export const useError = () => useAppStore(state => state.error);
