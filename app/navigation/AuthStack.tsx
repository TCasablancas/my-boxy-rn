import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList } from './types';
import LoginPage from '../pages/login';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AuthStack() {
  return(
    <Stack.Navigator>
      <Stack.Screen name="LoginView" component={LoginPage} />
    </Stack.Navigator>
  );
}