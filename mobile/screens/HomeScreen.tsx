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
  const [userBalance, setUserBalance] = useState(1000);
  const [marketTrends, setMarketTrends] = useState<any[]>([]);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      setIsLoading(true);
      
      // Load all user data in parallel
      const [conversions, balance, trends] = await Promise.all([
        CurrencyService.getStoredConversions(),
        CurrencyService.getUserBalance(),
        CurrencyService.getMarketTrends(),
      ]);
      
      setRecentConversions(conversions);
      setUserBalance(balance);
      setMarketTrends(trends);
      
      console.log('User data loaded successfully');
    } catch (error) {
      console.error('Failed to load user data:', error);
      Alert.alert('Error', 'Failed to load your data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

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
   * Performs actual conversion with data persistence
   */
  const handleQuickConvert = async () => {
    try {
      setIsLoading(true);
      
      // Perform a quick conversion
      const result = await CurrencyService.processConversion({
        fromCurrency: 'USD',
        toCurrency: 'EUR',
        amount: 100,
      });
      
      // Update local state
      setRecentConversions(prev => [result, ...prev.slice(0, 9)]);
      setUserBalance(prev => prev - 100);
      
      // Navigate to conversion screen with result
      navigation.navigate('Conversion', {
        conversionResult: result,
        showResult: true,
      });
      
      Alert.alert('Success!', `Converted $100 USD to €${result.netAmount.toFixed(2)} EUR`);
    } catch (error) {
      console.error('Quick conversion failed:', error);
      Alert.alert('Error', 'Failed to complete conversion. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * INTERACTIVE ACTION: Get AI coaching
   * Connects to GPT-4 for personalized currency advice
   */
  const handleGetCoaching = async () => {
    try {
      setIsLoading(true);
      
      // Get personalized AI coaching based on user data
      const advice = await AICoachService.getPersonalizedAdvice({
        recentConversions,
        userBalance,
        riskProfile: 'moderate'
      });
      
      navigation.navigate('Coach', { 
        conversionData: undefined,
        advice,
        userData: {
          balance: userBalance,
          recentConversions,
        }
      });
    } catch (error) {
      console.error('Failed to get AI coaching:', error);
      Alert.alert('Error', 'Failed to get AI coaching. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * INTERACTIVE ACTION: Refresh all data
   * Reloads user data from storage
   */
  const handleRefresh = async () => {
    await loadUserData();
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Balance Card */}
      <BalanceCard 
        balance={userBalance} 
        onRefresh={handleRefresh}
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
