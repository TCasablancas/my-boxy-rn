import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList } from './types';
import LoginPage from '../pages/login';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName="LoginView" screenOptions={{ headerShown: false, }}>
      <Stack.Screen name="LoginView" component={LoginPage} />
    </Stack.Navigator>
  );
}