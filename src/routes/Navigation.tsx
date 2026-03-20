import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  ChargingStations,
  Dashboard,
  EvChargingTimeAlert,
  ServiceCenter,
  VehicalProfile,
} from '../screens';
import SplashScreen from '../screens/SplashScreen';
import TabNavigation from './TabNavigation';

// Import all screen components

// Define the type for the navigation stack
export type RootStackParamList = {
  Dashboard: undefined;
  ChargingStations: undefined;
  EvChargingTimeAlert: undefined;
  ServiceCenter: undefined;
  VehicalProfile: undefined;
  SplashScreen: undefined;
  DashboardTab: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigation: React.FC = () => {
  return (
    <NavigationContainer>
      {/* <StatusBar barStyle="light-content" backgroundColor="black" /> */}
      
     
      <Stack.Navigator initialRouteName="SplashScreen">
        
        <Stack.Screen
          options={{ headerShown: false }}
          name="SplashScreen"
          component={SplashScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="DashboardTab"
          component={TabNavigation}
        />
       

        <Stack.Screen
          options={{ headerShown: false }}
          name="ServiceCenter"
          component={ServiceCenter}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
