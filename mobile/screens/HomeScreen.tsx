/**
 * HOME SCREEN - Main Dashboard
 * Interactive iOS-style home screen with quick actions
 * 
 * AI/MCP CONNECTION POINTS:
 * - Quick conversion button → triggers AI rate analysis
 * - Coach button → connects to GPT-4 for personalized advice
 * - Recent conversions → fetches from API with AI insights
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Dimensions,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, ConversionResult } from '../types/navigation';

// Import mobile components
import QuickActionCard from '../components/QuickActionCard';
import RecentConversionCard from '../components/RecentConversionCard';
import BalanceCard from '../components/BalanceCard';
import MarketTrendsCard from '../components/MarketTrendsCard';

// Import services for API/MCP connections
import { CurrencyService } from '../services/CurrencyService';
import { AICoachService } from '../services/AICoachService';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }: Props) {
  const [recentConversions, setRecentConversions] = useState<ConversionResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userBalance, setUserBalance] = useState(1000); // Mock balance

  useEffect(() => {
    loadRecentConversions();
    loadUserBalance();
  }, []);

  /**
   * AI/MCP CONNECTION: Load recent conversions with AI insights
   * This connects to the backend API which uses AI to analyze conversion patterns
   */
  const loadRecentConversions = async () => {
    try {
      setIsLoading(true);
      // TODO: Replace with actual API call
      // const conversions = await CurrencyService.getRecentConversions();
      
      // Mock data for now
      const mockConversions: ConversionResult[] = [
        {
          fromCurrency: 'USD',
          toCurrency: 'EUR',
          amount: 100,
          convertedAmount: 85.50,
          rate: 0.855,
          fees: 2.50,
          timestamp: new Date(),
        },
        {
          fromCurrency: 'USD',
          toCurrency: 'GBP',
          amount: 200,
          convertedAmount: 158.20,
          rate: 0.791,
          fees: 3.00,
          timestamp: new Date(),
        },
      ];
      
      setRecentConversions(mockConversions);
    } catch (error) {
      Alert.alert('Error', 'Failed to load recent conversions');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * AI/MCP CONNECTION: Load user balance with AI spending insights
   * This could connect to Cash App API or MCP service for real balance data
   */
  const loadUserBalance = async () => {
    try {
      // TODO: Replace with actual API call
      // const balance = await CurrencyService.getUserBalance();
      setUserBalance(1000); // Mock balance
    } catch (error) {
      console.error('Failed to load balance:', error);
    }
  };

  /**
   * INTERACTIVE ACTION: Quick currency conversion
   * Navigates to conversion screen with pre-filled popular currencies
   */
  const handleQuickConvert = () => {
    navigation.navigate('Conversion', {
      fromCurrency: 'USD',
      toCurrency: 'EUR',
      amount: 100,
    });
  };

  /**
   * INTERACTIVE ACTION: Get AI coaching
   * Connects to GPT-4 for personalized currency advice
   */
  const handleGetCoaching = async () => {
    try {
      setIsLoading(true);
      
      // AI/MCP CONNECTION: Get personalized coaching
      // const advice = await AICoachService.getPersonalizedAdvice({
      //   recentConversions,
      //   userBalance,
      //   riskProfile: 'moderate'
      // });
      
      // Mock AI advice for now
      const mockAdvice = {
        title: 'Market Opportunity',
        message: 'EUR rates are favorable today. Consider converting USD to EUR.',
        tips: [
          'Best time to convert: 2-4 PM EST',
          'Consider converting in smaller batches',
          'Monitor Fed announcements this week'
        ],
        urgency: 'medium' as const,
        category: 'timing' as const,
      };
      
      navigation.navigate('Coach', { conversionData: undefined });
    } catch (error) {
      Alert.alert('Error', 'Failed to get AI coaching');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * INTERACTIVE ACTION: View detailed conversion
   * Shows conversion details with AI analysis
   */
  const handleViewConversion = (conversion: ConversionResult) => {
    navigation.navigate('Coach', { conversionData: conversion });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Balance Card */}
      <BalanceCard 
        balance={userBalance} 
        onRefresh={loadUserBalance}
        isLoading={isLoading}
      />

      {/* Quick Actions */}
      <View style={styles.quickActionsContainer}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActionsRow}>
          <QuickActionCard
            title="Convert"
            icon="💱"
            onPress={handleQuickConvert}
            style={styles.quickActionCard}
          />
          <QuickActionCard
            title="AI Coach"
            icon="🤖"
            onPress={handleGetCoaching}
            style={styles.quickActionCard}
          />
        </View>
      </View>

      {/* Market Trends */}
      <MarketTrendsCard />

      {/* Recent Conversions */}
      <View style={styles.recentConversionsContainer}>
        <Text style={styles.sectionTitle}>Recent Conversions</Text>
        {recentConversions.map((conversion, index) => (
          <RecentConversionCard
            key={index}
            conversion={conversion}
            onPress={() => handleViewConversion(conversion)}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  quickActionsContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 15,
  },
  quickActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickActionCard: {
    width: (width - 60) / 2,
  },
  recentConversionsContainer: {
    padding: 20,
    paddingTop: 0,
  },
});
