import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet } from 'react-native';

import {
  ChargingStations,
  EvChargingTimeAlert,
  MoreScreen,
  VehicalProfile,
} from '../screens';

import { Icon } from '../components';
import { Colors } from '../modules/themes';

export type RootTabParamList = {
  Alert: undefined;
  CharginStation: undefined;
  Profile: undefined;
  More: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

const TabNavigation: React.FC = () => {
  return (
    <Tab.Navigator
      initialRouteName="More"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,

        // 🔥 Floating Tab Bar (Clean EV Style)
        tabBarStyle: styles.tabBar,

        tabBarIcon: ({ focused }) => {
          let iconName = '';
          let type: any = 'MaterialCommunityIcons';

          if (route.name === 'Alert') {
            iconName = 'clock-time-five-outline';
          } else if (route.name === 'CharginStation') {
            iconName = 'ev-station';
          } else if (route.name === 'Profile') {
            iconName = 'account-circle';
          } else if (route.name === 'More') {
            iconName = 'reorder-horizontal';
          }

          return (
            <View
              style={[
                styles.iconWrapper,
                focused && styles.activeWrapper,
              ]}
            >
              <Icon
                name={iconName}
                type={type}
                size={24}
                color={focused ? Colors.primary : '#0000'}
              />
            </View>
          );
        },
      })}
    >
      <Tab.Screen name="Alert" component={EvChargingTimeAlert} />
      <Tab.Screen name="CharginStation" component={ChargingStations} />
      <Tab.Screen name="Profile" component={VehicalProfile} />
      <Tab.Screen name="More" component={MoreScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigation;

// 🎨 Clean EV Theme Styles
const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    // bottom: 20,
    left: 20,
    right: 20,
    height: 60,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#ECECEC', // white base
    borderTopWidth: 2,

    // Shadow (iOS + Android)
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    
  },

  iconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
    marginTop:20
  },

  activeWrapper: {
   
    // transform: [{ scale: 1.1 }],
   
    // width: 70,
  },
});