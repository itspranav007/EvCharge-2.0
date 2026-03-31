import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  ChargingStationDescriptive,
  ChargingStations,
  CostCalculator,
  Dashboard,
  EvChargingTimeAlert,
  EvHelp,
  EvNews,
  ServiceCenter,
  SmartChargingReminder,
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
  EvHelp: undefined;
  SmartChargingReminder: undefined;
  EvNews: undefined;
  CostCalculator: undefined;
  ChargingStationDescriptive:undefined
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigation: React.FC = () => {
  return (
    <NavigationContainer>
      {/* <StatusBar barStyle="light-content" backgroundColor="black" /> */}

      <Stack.Navigator initialRouteName="DashboardTab">
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

        <Stack.Screen options={{ headerShown: false }} name="EvHelp" component={EvHelp} />
        <Stack.Screen options={{ headerShown: false }} name="SmartChargingReminder" component={SmartChargingReminder} />
        <Stack.Screen options={{ headerShown: false }} name="EvNews" component={EvNews} />

        <Stack.Screen options={{ headerShown: false }} name="CostCalculator" component={CostCalculator} />
         <Stack.Screen options={{ headerShown: false }} name="ChargingStationDescriptive" component={ChargingStationDescriptive} />
        {/* <Stack.Screen options={{ headerShown: false }} name="EvNews" component={EvNews} />  */}




      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
