/**
 * COACH SCREEN - AI-Powered Currency Coaching
 * Interactive screen with personalized AI advice and insights
 * 
 * AI/MCP CONNECTION POINTS:
 * - GPT-4 integration for personalized coaching
 * - Real-time market analysis and predictions
 * - User behavior analysis for custom recommendations
 * - Integration with conversion history for context
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList, CoachAdvice } from '../types/navigation';

// Import mobile components
import CoachAdviceCard from '../components/CoachAdviceCard';
import MarketAnalysisCard from '../components/MarketAnalysisCard';
import PersonalizedTipsCard from '../components/PersonalizedTipsCard';
import ActionPlanCard from '../components/ActionPlanCard';

// Import services
import { AICoachService } from '../services/AICoachService';
import { CurrencyService } from '../services/CurrencyService';

type CoachScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Coach'>;
type CoachScreenRouteProp = RouteProp<RootStackParamList, 'Coach'>;

interface Props {
  navigation: CoachScreenNavigationProp;
  route: CoachScreenRouteProp;
}

export default function CoachScreen({ navigation, route }: Props) {
  const [advice, setAdvice] = useState<CoachAdvice[]>([]);
  const [marketAnalysis, setMarketAnalysis] = useState<string>('');
  const [personalizedTips, setPersonalizedTips] = useState<string[]>([]);
  const [actionPlan, setActionPlan] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadAICoaching();
  }, []);

  /**
   * AI/MCP CONNECTION: Load comprehensive AI coaching
   * This is the main AI integration point - connects to GPT-4 and other AI services
   */
  const loadAICoaching = async () => {
    try {
      setIsLoading(true);
      
      // TODO: Replace with actual AI/MCP API calls
      // const coachingData = await AICoachService.getComprehensiveCoaching({
      //   conversionData: route.params?.conversionData,
      //   userProfile: await getUserProfile(),
      //   marketConditions: await getMarketConditions(),
      //   riskTolerance: 'moderate'
      // });
      
      // Mock AI coaching data
      const mockAdvice: CoachAdvice[] = [
        {
          title: 'Market Opportunity Detected',
          message: 'EUR rates are currently favorable. This is a good time to convert USD to EUR.',
          tips: [
            'Best conversion window: 2-4 PM EST',
            'Consider converting in smaller batches',
            'Monitor Fed announcements this week'
          ],
          urgency: 'medium',
          category: 'timing',
        },
        {
          title: 'Fee Optimization',
          message: 'Your current conversion has higher fees than average. Consider these alternatives.',
          tips: [
            'Use bank transfer instead of card for lower fees',
            'Convert larger amounts to reduce percentage fees',
            'Consider peer-to-peer exchange platforms'
          ],
          urgency: 'high',
          category: 'method',
        },
      ];
      
      setAdvice(mockAdvice);
      setMarketAnalysis('EUR showing strong momentum against USD. Technical indicators suggest continued strength in the short term.');
      setPersonalizedTips([
        'Based on your conversion history, you prefer morning transactions',
        'Your average conversion amount is $500 - consider bulk conversions',
        'You\'ve saved 15% on fees this month compared to last month'
      ]);
      setActionPlan([
        'Convert $500 USD to EUR today (optimal timing)',
        'Set up rate alerts for EUR/USD at 0.85',
        'Consider converting additional $200 next week'
      ]);
      
    } catch (error) {
      Alert.alert('Error', 'Failed to load AI coaching');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * INTERACTIVE ACTION: Get more specific advice
   * Triggers deeper AI analysis for specific scenarios
   */
  const handleGetMoreAdvice = async (category: string) => {
    try {
      setIsLoading(true);
      
      // AI/MCP CONNECTION: Get category-specific advice
      // const specificAdvice = await AICoachService.getSpecificAdvice({
      //   category,
      //   conversionData: route.params?.conversionData,
      //   context: 'detailed_analysis'
      // });
      
      Alert.alert(
        'Detailed Analysis',
        `Getting detailed ${category} analysis from AI...`,
        [{ text: 'OK' }]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to get detailed advice');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * INTERACTIVE ACTION: Apply AI recommendation
   * Executes the AI's recommended action
   */
  const handleApplyRecommendation = (recommendation: string) => {
    Alert.alert(
      'Apply Recommendation',
      `Apply this recommendation: ${recommendation}`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Apply',
          onPress: () => {
            // TODO: Implement recommendation application
            Alert.alert('Success', 'Recommendation applied successfully!');
          },
        },
      ]
    );
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00D4AA" />
        <Text style={styles.loadingText}>AI Coach is analyzing...</Text>
        <Text style={styles.loadingSubtext}>Getting personalized insights</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* AI Coach Header */}
      <View style={styles.header}>
        <Text style={styles.title}>🤖 AI Currency Coach</Text>
        <Text style={styles.subtitle}>Personalized insights for your conversions</Text>
      </View>

      {/* Market Analysis */}
      <MarketAnalysisCard
        analysis={marketAnalysis}
        onRefresh={() => loadAICoaching()}
      />

      {/* AI Advice Cards */}
      {advice.map((item, index) => (
        <CoachAdviceCard
          key={index}
          advice={item}
          onGetMoreInfo={() => handleGetMoreAdvice(item.category)}
          onApplyRecommendation={() => handleApplyRecommendation(item.message)}
        />
      ))}

      {/* Personalized Tips */}
      <PersonalizedTipsCard
        tips={personalizedTips}
        onTipPress={(tip) => Alert.alert('Tip Details', tip)}
      />

      {/* Action Plan */}
      <ActionPlanCard
        actions={actionPlan}
        onActionPress={handleApplyRecommendation}
      />

      {/* Refresh Button */}
      <TouchableOpacity
        style={styles.refreshButton}
        onPress={loadAICoaching}
        disabled={isLoading}
      >
        <Text style={styles.refreshButtonText}>
          {isLoading ? 'Analyzing...' : 'Refresh AI Analysis'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  loadingText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginTop: 16,
  },
  loadingSubtext: {
    fontSize: 14,
    color: '#6c757d',
    marginTop: 8,
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
  },
  refreshButton: {
    backgroundColor: '#00D4AA',
    margin: 20,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },
  refreshButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});
