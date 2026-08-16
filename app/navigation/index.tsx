import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { linking } from './linking';
import { RootNavigator } from './RootNavigator';
import { navigationRef } from '../common/navigation/MainNavigation';

<NavigationContainer 
  ref={navigationRef} 
  linking={linking} 
  fallback={<Text>Loading...</Text>}
>
  <RootNavigator />
</NavigationContainer>