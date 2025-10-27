/**
 * BALANCE CARD COMPONENT
 * Shows user's Cash App balance with refresh functionality
 * 
 * AI/MCP CONNECTION POINTS:
 * - Balance data from Cash App API
 * - AI spending insights and recommendations
 * - Real-time balance updates
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

interface Props {
  balance: number;
  onRefresh: () => void;
  isLoading: boolean;
}

export default function BalanceCard({ balance, onRefresh, isLoading }: Props) {
  const formatBalance = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Cash Balance</Text>
        <TouchableOpacity
          onPress={onRefresh}
          disabled={isLoading}
          style={styles.refreshButton}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#00D4AA" />
          ) : (
            <Text style={styles.refreshText}>↻</Text>
          )}
        </TouchableOpacity>
      </View>
      
      <Text style={styles.balance}>{formatBalance(balance)}</Text>
      
      {/* AI/MCP CONNECTION: AI spending insights */}
      <View style={styles.insightsContainer}>
        <Text style={styles.insightsTitle}>💡 AI Insight</Text>
        <Text style={styles.insightsText}>
          Your spending is 15% below average this month. Great job!
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#00D4AA',
    margin: 20,
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  refreshButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  refreshText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  balance: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  insightsContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 12,
    padding: 12,
  },
  insightsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  insightsText: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.9,
  },
});
