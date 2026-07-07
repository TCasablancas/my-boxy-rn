/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { View, StatusBar, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import UserHomeView from './app/views/userhome/UserHomeView';

export default function App() {
  const Tab = createBottomTabNavigator();
  const backgroundColor = '#F0E5E4';

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#6200ee',
          tabBarInactiveTintColor: '#gray',
          tabBarStyle: { 
            backgroundColor: '#ffffff',
            height: 60,
            paddingBottom: 8,
          },
          headerShown: false,
        }}
      >
        <Tab.Screen name="Home" component={UserHomeView} />
        <Tab.Screen name="Settings" component={UserHomeView} />
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