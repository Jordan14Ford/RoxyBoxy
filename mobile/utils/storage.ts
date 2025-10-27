/**
 * MOBILE DATA PERSISTENCE - AsyncStorage Service
 * Handles data storage for React Native mobile app
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

export interface ConversionResult {
  id: string;
  fromCurrency: string;
  toCurrency: string;
  amount: number;
  convertedAmount: number;
  rate: number;
  fees: number;
  netAmount: number;
  aiTips?: string;
  timestamp: string;
}

export interface MarketTrend {
  currency: string;
  change: number;
  changePercent: number;
  trend: 'up' | 'down' | 'stable';
  timestamp: string;
}

export interface UserPreferences {
  defaultFromCurrency: string;
  defaultToCurrency: string;
  notifications: boolean;
  theme: 'light' | 'dark';
  biometricAuth: boolean;
}

export class StorageService {
  // Storage keys
  private static readonly KEYS = {
    CONVERSIONS: 'conversions',
    USER_BALANCE: 'userBalance',
    MARKET_TRENDS: 'marketTrends',
    USER_PREFERENCES: 'userPreferences',
    USER_ACTIONS: 'userActions',
  } as const;

  // Maximum number of items to store
  private static readonly MAX_CONVERSIONS = 50;
  private static readonly MAX_ACTIONS = 100;

  /**
   * Store conversion result
   */
  static async saveConversion(conversion: ConversionResult): Promise<void> {
    try {
      const existing = await this.getConversions();
      const updated = [conversion, ...existing.slice(0, this.MAX_CONVERSIONS - 1)];
      await AsyncStorage.setItem(this.KEYS.CONVERSIONS, JSON.stringify(updated));
      
      // Log user action
      await this.logUserAction('conversion_saved', {
        conversionId: conversion.id,
        amount: conversion.amount,
        fromCurrency: conversion.fromCurrency,
        toCurrency: conversion.toCurrency,
      });
    } catch (error) {
      console.error('Failed to save conversion:', error);
      throw new Error('Failed to save conversion');
    }
  }

  /**
   * Get stored conversions
   */
  static async getConversions(): Promise<ConversionResult[]> {
    try {
      const data = await AsyncStorage.getItem(this.KEYS.CONVERSIONS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Failed to get conversions:', error);
      return [];
    }
  }

  /**
   * Store user balance
   */
  static async saveBalance(balance: number): Promise<void> {
    try {
      await AsyncStorage.setItem(this.KEYS.USER_BALANCE, balance.toString());
      
      // Log user action
      await this.logUserAction('balance_updated', { balance });
    } catch (error) {
      console.error('Failed to save balance:', error);
      throw new Error('Failed to save balance');
    }
  }

  /**
   * Get user balance
   */
  static async getBalance(): Promise<number> {
    try {
      const data = await AsyncStorage.getItem(this.KEYS.USER_BALANCE);
      return data ? parseFloat(data) : 1000; // Default balance
    } catch (error) {
      console.error('Failed to get balance:', error);
      return 1000;
    }
  }

  /**
   * Store market trends
   */
  static async saveMarketTrends(trends: MarketTrend[]): Promise<void> {
    try {
      await AsyncStorage.setItem(this.KEYS.MARKET_TRENDS, JSON.stringify(trends));
    } catch (error) {
      console.error('Failed to save market trends:', error);
      throw new Error('Failed to save market trends');
    }
  }

  /**
   * Get market trends
   */
  static async getMarketTrends(): Promise<MarketTrend[]> {
    try {
      const data = await AsyncStorage.getItem(this.KEYS.MARKET_TRENDS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Failed to get market trends:', error);
      return [];
    }
  }

  /**
   * Store user preferences
   */
  static async savePreferences(preferences: UserPreferences): Promise<void> {
    try {
      await AsyncStorage.setItem(this.KEYS.USER_PREFERENCES, JSON.stringify(preferences));
      
      // Log user action
      await this.logUserAction('preferences_updated', preferences);
    } catch (error) {
      console.error('Failed to save preferences:', error);
      throw new Error('Failed to save preferences');
    }
  }

  /**
   * Get user preferences
   */
  static async getPreferences(): Promise<UserPreferences> {
    try {
      const data = await AsyncStorage.getItem(this.KEYS.USER_PREFERENCES);
      return data ? JSON.parse(data) : {
        defaultFromCurrency: 'USD',
        defaultToCurrency: 'EUR',
        notifications: true,
        theme: 'light',
        biometricAuth: false,
      };
    } catch (error) {
      console.error('Failed to get preferences:', error);
      return {
        defaultFromCurrency: 'USD',
        defaultToCurrency: 'EUR',
        notifications: true,
        theme: 'light',
        biometricAuth: false,
      };
    }
  }

  /**
   * Log user action for analytics
   */
  static async logUserAction(action: string, data?: any): Promise<void> {
    try {
      const existing = await this.getUserActions();
      const newAction = {
        action,
        data,
        timestamp: new Date().toISOString(),
      };
      
      const updated = [newAction, ...existing.slice(0, this.MAX_ACTIONS - 1)];
      await AsyncStorage.setItem(this.KEYS.USER_ACTIONS, JSON.stringify(updated));
    } catch (error) {
      console.error('Failed to log user action:', error);
    }
  }

  /**
   * Get user actions
   */
  static async getUserActions(): Promise<any[]> {
    try {
      const data = await AsyncStorage.getItem(this.KEYS.USER_ACTIONS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Failed to get user actions:', error);
      return [];
    }
  }

  /**
   * Clear all stored data (for logout/reset)
   */
  static async clearAllData(): Promise<void> {
    try {
      await AsyncStorage.multiRemove([
        this.KEYS.CONVERSIONS,
        this.KEYS.USER_BALANCE,
        this.KEYS.MARKET_TRENDS,
        this.KEYS.USER_PREFERENCES,
        this.KEYS.USER_ACTIONS,
      ]);
      
      console.log('All user data cleared');
    } catch (error) {
      console.error('Failed to clear data:', error);
      throw new Error('Failed to clear data');
    }
  }

  /**
   * Get storage usage info
   */
  static async getStorageInfo(): Promise<{
    conversions: number;
    actions: number;
    totalSize: number;
  }> {
    try {
      const [conversions, actions] = await Promise.all([
        this.getConversions(),
        this.getUserActions(),
      ]);

      // Estimate storage size (rough calculation)
      const conversionsSize = JSON.stringify(conversions).length;
      const actionsSize = JSON.stringify(actions).length;
      const totalSize = conversionsSize + actionsSize;

      return {
        conversions: conversions.length,
        actions: actions.length,
        totalSize,
      };
    } catch (error) {
      console.error('Failed to get storage info:', error);
      return {
        conversions: 0,
        actions: 0,
        totalSize: 0,
      };
    }
  }

  /**
   * Export user data (for backup/privacy)
   */
  static async exportUserData(): Promise<{
    conversions: ConversionResult[];
    balance: number;
    preferences: UserPreferences;
    actions: any[];
    exportDate: string;
  }> {
    try {
      const [conversions, balance, preferences, actions] = await Promise.all([
        this.getConversions(),
        this.getBalance(),
        this.getPreferences(),
        this.getUserActions(),
      ]);

      return {
        conversions,
        balance,
        preferences,
        actions,
        exportDate: new Date().toISOString(),
      };
    } catch (error) {
      console.error('Failed to export user data:', error);
      throw new Error('Failed to export user data');
    }
  }

  /**
   * Import user data (for restore)
   */
  static async importUserData(data: {
    conversions?: ConversionResult[];
    balance?: number;
    preferences?: UserPreferences;
  }): Promise<void> {
    try {
      const promises: Promise<void>[] = [];

      if (data.conversions) {
        promises.push(
          AsyncStorage.setItem(this.KEYS.CONVERSIONS, JSON.stringify(data.conversions))
        );
      }

      if (data.balance !== undefined) {
        promises.push(
          AsyncStorage.setItem(this.KEYS.USER_BALANCE, data.balance.toString())
        );
      }

      if (data.preferences) {
        promises.push(
          AsyncStorage.setItem(this.KEYS.USER_PREFERENCES, JSON.stringify(data.preferences))
        );
      }

      await Promise.all(promises);
      
      console.log('User data imported successfully');
    } catch (error) {
      console.error('Failed to import user data:', error);
      throw new Error('Failed to import user data');
    }
  }
}
