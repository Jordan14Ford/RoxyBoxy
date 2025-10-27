/**
 * MOBILE APP ENTRY POINT
 * iOS Cash App Currency Coach Mobile Frontend
 * 
 * This is the main entry point for the mobile app.
 * Connects to AI API/MCP services for currency coaching.
 */

import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import screens
import HomeScreen from './mobile/screens/HomeScreen';
import ConversionScreen from './mobile/screens/ConversionScreen';
import CoachScreen from './mobile/screens/CoachScreen';
import SettingsScreen from './mobile/screens/SettingsScreen';

// Import navigation types
import { RootStackParamList } from './mobile/types/navigation';

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" backgroundColor="#00D4AA" />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#00D4AA', // Cash App green
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen 
            name="Home" 
            component={HomeScreen}
            options={{ title: 'Currency Coach' }}
          />
          <Stack.Screen 
            name="Conversion" 
            component={ConversionScreen}
            options={{ title: 'Convert Currency' }}
          />
          <Stack.Screen 
            name="Coach" 
            component={CoachScreen}
            options={{ title: 'AI Coach' }}
          />
          <Stack.Screen 
            name="Settings" 
            component={SettingsScreen}
            options={{ title: 'Settings' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
});
