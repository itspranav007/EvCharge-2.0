import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ChargingStations, Dashboard, EvChargingTimeAlert, VehicalProfile } from '../screens';
import { Icon } from '../components';
import { fontFamily } from '../modules';
import { Colors, fontFamilyBold } from '../modules/themes';

export type RootTabParamList = {

  CharginStation: undefined;
Alert: undefined;
    Profile: undefined;
    
};

const Tab = createBottomTabNavigator<RootTabParamList>();

const TabNavigation: React.FC = () => {
  return (
    <Tab.Navigator
      initialRouteName="Alert"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarLabelStyle: { fontSize:12, fontFamily:fontFamilyBold},
         tabBarStyle: {
      position: 'absolute',
      bottom:0,      
      marginHorizontal:0,
      borderTopLeftRadius:15, 
      borderTopRightRadius:15, 
      height:60,  
        
    },
    tabBarActiveTintColor:Colors.primary,  
    tabBarInactiveTintColor: 'gray',    
      }}
    >
      <Tab.Screen
        name="Alert"
        component={EvChargingTimeAlert}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon
              name={'clock-time-five-outline'}
              type={'MaterialCommunityIcons'}
              size={25}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Chargin Station"
        component={ChargingStations}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon
              name={'ev-station'}
              type={'MaterialCommunityIcons'}
              size={25}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={VehicalProfile}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon
              name={'electric-car'}
              type={'MaterialIcons'}
              size={25}
              color={color}
            />
          ),
        }}
      />
    
    </Tab.Navigator>
  );
};

export default TabNavigation;
