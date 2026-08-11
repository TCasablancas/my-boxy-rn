import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import LoginView from './login.view';
import { useLoginViewModel } from './login.model';
import { styles } from './styles';

export default function LoginPage() {
  return (
    <SafeAreaProvider style={[styles.container]}>
      <StatusBar barStyle="dark-content" backgroundColor={'transparent'} translucent />
      <LoginView />
    </SafeAreaProvider>
  );
}