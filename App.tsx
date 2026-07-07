/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { View, StatusBar, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import UserHomeView from './app/views/userhome/UserHomeView';

export default function App() {
  const backgroundColor = '#F0E5E4';

  return (
    <UserHomeView />
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