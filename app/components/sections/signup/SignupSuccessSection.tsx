import { View, StyleSheet, Text, Image, StatusBar } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { spacing } from '../../common/constants/Sizes';
import { PrimaryColors } from '../../common/colors/Colors';

import MBMainBtn from '../../components/ui/buttons/MBMainBtn';
import MBTitleDescripted from '../../components/ui/texts/MBTitleDescripted';
import MBTextBtn from '../../components/ui/buttons/MBTextBtn';
import MainNavigation from '../../common/navigation/MainNavigation';

interface SignupSuccessSectionProps {

  //onPopToHome: () => void;
}

export default function SignupSuccessSection({ 
  
}: SignupSuccessSectionProps) {
  const safeAreaInsets = useSafeAreaInsets();

  // REMOVER
    const imageUrl = 'https://img.magnific.com/fotos-premium/3d-cartoon-character-celebrating-success-with-joy_1058338-90103.jpg?semt=ais_hybrid&w=740&q=80';

  return (
    <SafeAreaProvider style={{ 
      marginTop: safeAreaInsets.top, marginBottom: safeAreaInsets.bottom 
    }}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <View style={[ styles.container ]}>
        <Image source={{ uri: imageUrl }} style={styles.image} />
        <MBTitleDescripted
          colorTitle={PrimaryColors.primaryDark}
          title="Uhul, loja criada!"
          description="A sua loja foi criada com sucesso. Agora você pode adicionar seus produtos ou voltar para a tela inicial."
          alignment="center"
        />
      </View>
      <View style={styles.buttonWrapper}>
        <View style={{ height: 50, width: '100%' }}>
          <MBMainBtn 
            title="Adicionar produtos" 
            onPress={() => MainNavigation.push('AddProductScreen')} flex={1} 
          />
        </View>
        <MBTextBtn 
          title="Voltar para início"
          onPress={MainNavigation.popToTop} 
          textColor={PrimaryColors.primaryDark} 
        />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: 250,
    height: 250,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonWrapper: { 
    gap: spacing.lg,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});