import { Text, View, StyleSheet } from 'react-native';
import MBMainBtn from '../../components/buttons/MBMainBtn';
import { NeutralColors, PrimaryColors } from '../colors/Colors';
import { MBMainInfoSquareBtnType } from '../../components/buttons/MBMainInfoSquareBtn';
import MainNavigation, { registerNavigationTarget } from '../navigation/MainNavigation';
import UserSignupView from '../../views/usersignup/UserSignupView';
import MBEmptyImageView from '../../components/images/MBEmptyImageView';
import { Icons } from '../icons/Icons';
import MBMainInfoSquareBtn from '../../components/buttons/MBMainInfoSquareBtn';

registerNavigationTarget('UserSignupView', UserSignupView);

export function getBlockedTabBottomsheetTitle() {
  return 'Olá estranho, tudo bem?!';
}

export function getBlockedTabBottomsheetDescription() {
  return "Se você já conhece a casa, faça login para acessar as sessões. Se for novo por aqui, cadastre-se e conheça mais.";
}

export function renderBlockedTabBottomsheetContent() {
  return (
    <View style={[styles.container]}>
      {/* <MBEmptyImageView /> */}
      <View style={styles.buttonWrapper}>
        <MBMainInfoSquareBtn 
          icon={<Icons.loginArrow width={26} height={26} strokeColor={PrimaryColors.primary} />}
          title="Fazer Login"
          description="Já possuo conta e conheço o aplicativo."
          onPress={() => { MainNavigation.navigate('Login'); }}
        />
        <MBMainInfoSquareBtn 
          icon={<Icons.plusCircle width={26} height={26} strokeColor={PrimaryColors.primary} />}
          title="Criar Cadastro"
          type={MBMainInfoSquareBtnType.LIGHT}
          description="Não tenho cadastro e quero criar uma conta."
          onPress={() => { MainNavigation.navigate('UserSignupView'); }}
        />
      </View>
    </View>
  );
}

export function getStoreRequiredBottomsheetTitle() {
  return 'Minha loja indisponivel';
}

export function getStoreRequiredBottomsheetDescription() {
  return 'Voce ainda nao possui uma loja cadastrada. Crie sua loja para acessar essa aba.';
}

export function renderStoreRequiredBottomsheetContent() {
  return (
    <View style={[styles.container]}>
      <MBEmptyImageView />
      <View style={styles.buttonWrapper}>
        <MBMainBtn
          title="Criar minha loja"
          onPress={() => { MainNavigation.push('UserHomeStoreSignupView'); }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: 16, 
    alignItems: 'center',
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'SNPro-Bold',
    color: '#1F2A44',
    width: '100%',
    textAlign: 'left',
  },
  description: {
    fontSize: 13,
    fontFamily: 'SNPro-Regular',
    color: '#4B5875',
    lineHeight: 18,
  },
  buttonWrapper: {
    // flex: 1,
    // height: 46,
    gap: 16,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
