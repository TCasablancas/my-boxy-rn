import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, StatusBar, Image, ActivityIndicator } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PrimaryColors } from '../../common/colors/Colors';
import SplashScreen from 'react-native-splash-screen';
// import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { MyBoxyLogo } from '../../../assets/images/my_boxy_logo';
import App from '../../../App';
import { Fonts } from '../../common/constants/Fonts';

const SplashView = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  useEffect(() => {
    // Simula o carregamento de dados, checagem de login, etc.
    setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 3 segundos de exibição
  }, []);

  if (isLoading) {
    return (
      <SafeAreaProvider>
        <StatusBar barStyle="dark-content" backgroundColor={PrimaryColors.primaryLight} />
        <View style={styles.container}>
          <MyBoxyLogo.fullLogo width={150} height={150} color={PrimaryColors.primary} />
        </View>
        {/* <DotLottieReact
          src="https://lottie.host/0ab3f9b6-334f-4996-bcd3-5778d17fc4d5/C9bwuifouG.json"
          autoplay
          loop
          style={styles.animation}
        /> */}
        <ActivityIndicator size="large" color="#ffffff" style={styles.animation} />
      </SafeAreaProvider>
    );
  }

  return (
    <App />
  );
};
export default SplashView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: PrimaryColors.primaryLight,
    position: 'absolute',
    alignSelf: 'center',
    width: '100%',
    height: '100%',
  },
  text: {
    ...Fonts.bold24,
  },
  animation: {
    width: 60,
    height: 60,
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
  },
});