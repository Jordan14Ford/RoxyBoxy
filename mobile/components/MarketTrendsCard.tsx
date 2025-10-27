/**
 * MARKET TRENDS CARD COMPONENT
 * Shows real-time currency market trends with AI insights
 * 
 * AI/MCP CONNECTION POINTS:
 * - Real-time market data from exchange APIs
 * - AI analysis of market trends and predictions
 * - Personalized recommendations based on user behavior
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

interface MarketTrend {
  currency: string;
  change: number;
  changePercent: number;
  trend: 'up' | 'down' | 'stable';
}

interface Props {
  onPress?: () => void;
}

export default function MarketTrendsCard({ onPress }: Props) {
  const [trends, setTrends] = useState<MarketTrend[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [aiInsight, setAiInsight] = useState<string>('');

  useEffect(() => {
    loadMarketTrends();
  }, []);

  /**
   * AI/MCP CONNECTION: Load real-time market trends
   * This connects to exchange rate APIs and AI analysis services
   */
  const loadMarketTrends = async () => {
    try {
      setIsLoading(true);
      
      // TODO: Replace with actual API calls
      // const marketData = await CurrencyService.getMarketTrends();
      // const aiAnalysis = await AICoachService.getMarketInsights();
      
      // Mock data for now
      const mockTrends: MarketTrend[] = [
        { currency: 'EUR/USD', change: 0.0023, changePercent: 0.21, trend: 'up' },
        { currency: 'GBP/USD', change: -0.0015, changePercent: -0.12, trend: 'down' },
        { currency: 'JPY/USD', change: 0.0008, changePercent: 0.05, trend: 'up' },
      ];
      
      setTrends(mockTrends);
      setAiInsight('EUR showing strong momentum. Consider converting USD to EUR today.');
    } catch (error) {
      console.error('Failed to load market trends:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return '📈';
      case 'down': return '📉';
      default: return '➡️';
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return '#28a745';
      case 'down': return '#dc3545';
      default: return '#6c757d';
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Market Trends</Text>
        <TouchableOpacity onPress={loadMarketTrends} disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator size="small" color="#00D4AA" />
          ) : (
            <Text style={styles.refreshText}>↻</Text>
          )}
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color="#00D4AA" />
          <Text style={styles.loadingText}>Loading market data...</Text>
        </View>
      ) : (
        <>
          {/* Market Trends List */}
          <View style={styles.trendsContainer}>
            {trends.map((trend, index) => (
              <View key={index} style={styles.trendItem}>
                <Text style={styles.currencyText}>{trend.currency}</Text>
                <View style={styles.trendData}>
                  <Text style={styles.trendIcon}>{getTrendIcon(trend.trend)}</Text>
                  <Text style={[styles.changeText, { color: getTrendColor(trend.trend) }]}>
                    {trend.changePercent > 0 ? '+' : ''}{trend.changePercent.toFixed(2)}%
                  </Text>
                </View>
              </View>
            ))}
          </View>

          {/* AI/MCP CONNECTION: AI Market Insight */}
          <View style={styles.aiInsightContainer}>
            <Text style={styles.aiInsightTitle}>🤖 AI Insight</Text>
            <Text style={styles.aiInsightText}>{aiInsight}</Text>
          </View>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    padding: 16,
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
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  refreshText: {
    fontSize: 18,
    color: '#00D4AA',
    fontWeight: 'bold',
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  loadingText: {
    fontSize: 14,
    color: '#6c757d',
    marginTop: 8,
  },
  trendsContainer: {
    marginBottom: 16,
  },
  trendItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f8f9fa',
  },
  currencyText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  trendData: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trendIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  changeText: {
    fontSize: 14,
    fontWeight: '600',
  },
  aiInsightContainer: {
    backgroundColor: '#e8f5e8',
    borderRadius: 12,
    padding: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#00D4AA',
  },
  aiInsightTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#00D4AA',
    marginBottom: 4,
  },
  aiInsightText: {
    fontSize: 12,
    color: '#1a1a1a',
    lineHeight: 16,
  },
});
