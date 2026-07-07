import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { PlatformPressable } from '@react-navigation/elements';
import { PrimaryColors } from './app/common/colors/Colors';
import { Icons } from './app/common/constants/Icons';
import { IconsCommunication } from './app/common/constants/IconsCommunication';
import { IconsActions } from './app/common/constants/IconsActions';

import UserHomeView from './app/views/userhome/UserHomeView';
import UserFavoritesView from './app/views/favorites/UserFavoritesView';

export default function App() {
  const Tab = createBottomTabNavigator();
  const backgroundColor = '#F0E5E4';
  const mainColor = PrimaryColors.primary; 

  const screenOptions = {
    tabBarStyle: { 
      backgroundColor: backgroundColor,
      height: 60,
      paddingBottom: 8,
      elevation: 0,          // Removes shadow on Android
      borderTopWidth: 0,     // Removes top border line on iOS
      shadowOpacity: 0, 
    },
    headerShown: false,
  };

  const tabScreenOptions = {
    tabBarInactiveTintColor: 'gray',
    tabBarActiveTintColor: mainColor,
    tabBarLabelStyle: {
      fontSize: 11,
      fontFamily: 'SNPro-Bold',
    },
  };

  const tabBarButton = (props: any) => (
    <PlatformPressable
      {...props}
      android_ripple={{ color: 'transparent' }} 
      pressOpacity={1} 
    />
  );

  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen 
          name="início" component={UserHomeView} 
          options={({ route }) => ({
            ...tabScreenOptions,
            tabBarIcon: ({ focused, color }) => {
              return <Icons.home width={20} height={20} color={color} />;
            }, tabBarButton
          })}
        />
        <Tab.Screen 
          name="curtidos" component={UserFavoritesView} 
          options={({ route }) => ({
            ...tabScreenOptions,
            tabBarIcon: ({ focused, color }) => {
              return <Icons.heart width={20} height={20} strokeColor={color} />;
            }, tabBarButton
          })}
        />
        <Tab.Screen 
          name="carteira" component={UserHomeView} 
          options={({ route }) => ({
            ...tabScreenOptions,
            tabBarIcon: ({ focused, color }) => {
              return <Icons.wallet width={20} height={20} color={color} />;
            }, tabBarButton
          })}
        />
        <Tab.Screen 
          name="notificações" component={UserHomeView} 
          options={({ route }) => ({
            ...tabScreenOptions,
            tabBarIcon: ({ focused, color }) => {
              return <IconsCommunication.notification width={20} height={20} color={color} />;
            }, tabBarButton
          })}
        />
        <Tab.Screen 
          name="mais" component={UserHomeView} 
          options={({ route }) => ({
            ...tabScreenOptions,
            tabBarIcon: ({ focused, color }) => {
              return <IconsActions.squareFour width={20} height={20} strokeColor={color} />;
            }, tabBarButton
          })}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%', 
    height: '100%', 
    alignItems: 'center',
    justifyContent: 'center',
  },
});