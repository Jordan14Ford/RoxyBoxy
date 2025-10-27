/**
 * RECENT CONVERSION CARD COMPONENT
 * Interactive card showing recent currency conversions
 * 
 * AI/MCP CONNECTION POINTS:
 * - Conversion data from API
 * - AI analysis of conversion timing and rates
 * - Click to get detailed AI coaching on that conversion
 */

import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
} from 'react-native';
import { ConversionResult } from '../types/navigation';

interface Props {
  conversion: ConversionResult;
  onPress: () => void;
}

export default function RecentConversionCard({ conversion, onPress }: Props) {
  const formatAmount = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <View style={styles.currencyPair}>
          <Text style={styles.currencyText}>
            {conversion.fromCurrency} → {conversion.toCurrency}
          </Text>
        </View>
        <Text style={styles.timeText}>{formatTime(conversion.timestamp)}</Text>
      </View>
      
      <View style={styles.amountsContainer}>
        <Text style={styles.fromAmount}>
          {formatAmount(conversion.amount, conversion.fromCurrency)}
        </Text>
        <Text style={styles.arrow}>→</Text>
        <Text style={styles.toAmount}>
          {formatAmount(conversion.convertedAmount, conversion.toCurrency)}
        </Text>
      </View>
      
      <View style={styles.detailsContainer}>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Rate</Text>
          <Text style={styles.detailValue}>{conversion.rate.toFixed(4)}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Fees</Text>
          <Text style={styles.detailValue}>
            {formatAmount(conversion.fees, conversion.fromCurrency)}
          </Text>
        </View>
      </View>
      
      {/* AI/MCP CONNECTION: AI analysis indicator */}
      <View style={styles.aiIndicator}>
        <Text style={styles.aiText}>🤖 Tap for AI analysis</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  currencyPair: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currencyText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  timeText: {
    fontSize: 12,
    color: '#6c757d',
  },
  amountsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  fromAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#dc3545',
  },
  arrow: {
    fontSize: 16,
    color: '#6c757d',
    marginHorizontal: 8,
  },
  toAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#28a745',
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailItem: {
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 12,
    color: '#6c757d',
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  aiIndicator: {
    backgroundColor: '#e3f2fd',
    borderRadius: 8,
    padding: 8,
    alignItems: 'center',
  },
  aiText: {
    fontSize: 12,
    color: '#1976d2',
    fontWeight: '500',
  },
});
