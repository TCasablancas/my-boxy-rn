import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { AppStackParamList } from './types';

// SCREENS
import LoginPage from '../pages/login';
import HomePage from '../pages/userhome/UserHomeView';
import RegisterPage from '../pages/usersignup/UserSignupView';

const Stack = createNativeStackNavigator<AppStackParamList>();

export function AppStack() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isRegisterFinished, setIsRegisterFinished] = useState(false);
  const userHomePage = (props: any) => <HomePage {...props} isUserLoggedIn={isUserLoggedIn} />;
  const registerPage = (props: any) => <RegisterPage {...props} setIsRegisterFinished={setIsRegisterFinished} />;

  return(
    <Stack.Navigator>
      <Stack.Screen name="UserLoginView" component={LoginPage} />
      <Stack.Screen name="UserRegisterView" component={registerPage} />
      <Stack.Screen name="HomeView" component={userHomePage} />
    </Stack.Navigator>
  );
}