import type { LinkingOptions } from '@react-navigation/native';
import type { RootStackParamList } from './types';

export const linking: LinkingOptions<RootStackParamList> = {
  prefixes: ['myboxy://', 'https://myboxy.com'],
  config: {
    screens: {
      LoginView: 'login',
      RegisterView: 'register',
      HomeView: 'home',
      ProfileView: 'profile',
      SettingsView: 'settings',
    },
  },
};