/**
 * CONVERSION SCREEN - Interactive Currency Conversion
 * Full-featured conversion screen with real-time rates and AI insights
 * 
 * AI/MCP CONNECTION POINTS:
 * - Real-time exchange rates from multiple APIs
 * - AI-powered conversion recommendations
 * - Smart amount suggestions based on user history
 * - Fee optimization using AI analysis
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList, ConversionResult } from '../types/navigation';

// Import mobile components
import CurrencySelector from '../components/CurrencySelector';
import ConversionResultCard from '../components/ConversionResultCard';
import FeeBreakdownCard from '../components/FeeBreakdownCard';
import AITipsCard from '../components/AITipsCard';

// Import services
import { CurrencyService } from '../services/CurrencyService';
import { AICoachService } from '../services/AICoachService';

type ConversionScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Conversion'>;
type ConversionScreenRouteProp = RouteProp<RootStackParamList, 'Conversion'>;

interface Props {
  navigation: ConversionScreenNavigationProp;
  route: ConversionScreenRouteProp;
}

const { width } = Dimensions.get('window');

export default function ConversionScreen({ navigation, route }: Props) {
  // State management
  const [fromCurrency, setFromCurrency] = useState(route.params?.fromCurrency || 'USD');
  const [toCurrency, setToCurrency] = useState(route.params?.toCurrency || 'EUR');
  const [amount, setAmount] = useState(route.params?.amount?.toString() || '');
  const [conversionResult, setConversionResult] = useState<ConversionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [exchangeRate, setExchangeRate] = useState<number>(0);
  const [aiTips, setAiTips] = useState<string[]>([]);

  useEffect(() => {
    if (amount && fromCurrency && toCurrency) {
      performConversion();
    }
  }, [fromCurrency, toCurrency, amount]);

  /**
   * AI/MCP CONNECTION: Perform currency conversion with AI insights
   * This connects to exchange rate APIs and AI coaching services
   */
  const performConversion = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      setConversionResult(null);
      return;
    }

    try {
      setIsLoading(true);
      
      // TODO: Replace with actual API calls
      // const rate = await CurrencyService.getExchangeRate(fromCurrency, toCurrency);
      // const fees = await CurrencyService.calculateFees(parseFloat(amount), fromCurrency, toCurrency);
      // const aiAnalysis = await AICoachService.getConversionTips({
      //   fromCurrency,
      //   toCurrency,
      //   amount: parseFloat(amount),
      //   rate
      // });
      
      // Mock data for now
      const mockRate = 0.855; // EUR/USD rate
      const mockFees = parseFloat(amount) * 0.025; // 2.5% fee
      const convertedAmount = parseFloat(amount) * mockRate - mockFees;
      
      const result: ConversionResult = {
        fromCurrency,
        toCurrency,
        amount: parseFloat(amount),
        convertedAmount,
        rate: mockRate,
        fees: mockFees,
        timestamp: new Date(),
      };
      
      setConversionResult(result);
      setExchangeRate(mockRate);
      setAiTips([
        'Best time to convert: 2-4 PM EST',
        'Consider converting in smaller batches',
        'Monitor Fed announcements this week'
      ]);
      
    } catch (error) {
      Alert.alert('Error', 'Failed to get conversion rate');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * INTERACTIVE ACTION: Swap currencies
   * Swaps from and to currencies with a smooth animation
   */
  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  /**
   * INTERACTIVE ACTION: Get AI coaching for this conversion
   * Navigates to coach screen with current conversion data
   */
  const handleGetCoaching = () => {
    if (conversionResult) {
      navigation.navigate('Coach', { conversionData: conversionResult });
    }
  };

  /**
   * INTERACTIVE ACTION: Confirm conversion
   * Processes the actual currency conversion
   */
  const handleConfirmConversion = async () => {
    if (!conversionResult) return;
    
    try {
      setIsLoading(true);
      
      // TODO: Replace with actual API call
      // await CurrencyService.processConversion(conversionResult);
      
      Alert.alert(
        'Conversion Successful!',
        `Converted ${conversionResult.amount} ${conversionResult.fromCurrency} to ${conversionResult.convertedAmount.toFixed(2)} ${conversionResult.toCurrency}`,
        [
          {
            text: 'Get AI Coaching',
            onPress: handleGetCoaching,
          },
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to process conversion');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Currency Selection */}
      <View style={styles.currencySelectionContainer}>
        <Text style={styles.sectionTitle}>Convert Currency</Text>
        
        <View style={styles.currencyRow}>
          <CurrencySelector
            currency={fromCurrency}
            onCurrencyChange={setFromCurrency}
            label="From"
            style={styles.currencySelector}
          />
          
          <TouchableOpacity
            style={styles.swapButton}
            onPress={handleSwapCurrencies}
          >
            <Text style={styles.swapIcon}>⇄</Text>
          </TouchableOpacity>
          
          <CurrencySelector
            currency={toCurrency}
            onCurrencyChange={setToCurrency}
            label="To"
            style={styles.currencySelector}
          />
        </View>
      </View>

      {/* Amount Input */}
      <View style={styles.amountContainer}>
        <Text style={styles.sectionTitle}>Amount</Text>
        <View style={styles.amountInputContainer}>
          <Text style={styles.currencySymbol}>{fromCurrency}</Text>
          <TextInput
            style={styles.amountInput}
            value={amount}
            onChangeText={setAmount}
            placeholder="0.00"
            keyboardType="numeric"
            placeholderTextColor="#6c757d"
          />
        </View>
        
        {/* Quick amount buttons */}
        <View style={styles.quickAmountsContainer}>
          {['100', '500', '1000'].map((quickAmount) => (
            <TouchableOpacity
              key={quickAmount}
              style={styles.quickAmountButton}
              onPress={() => setAmount(quickAmount)}
            >
              <Text style={styles.quickAmountText}>${quickAmount}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Conversion Result */}
      {conversionResult && (
        <ConversionResultCard
          result={conversionResult}
          isLoading={isLoading}
          onConfirm={handleConfirmConversion}
          onGetCoaching={handleGetCoaching}
        />
      )}

      {/* Fee Breakdown */}
      {conversionResult && (
        <FeeBreakdownCard result={conversionResult} />
      )}

      {/* AI Tips */}
      {aiTips.length > 0 && (
        <AITipsCard tips={aiTips} />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  currencySelectionContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 15,
  },
  currencyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  currencySelector: {
    flex: 1,
    marginHorizontal: 8,
  },
  swapButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#00D4AA',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
  },
  swapIcon: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  amountContainer: {
    padding: 20,
    paddingTop: 0,
  },
  amountInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  currencySymbol: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginRight: 12,
  },
  amountInput: {
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  quickAmountsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickAmountButton: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#e9ecef',
    flex: 1,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  quickAmountText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
  },
});
