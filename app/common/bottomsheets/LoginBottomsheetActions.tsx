import { View, StyleSheet } from 'react-native';
import MainNavigation from '../navigation/MainNavigation';
import { PrimaryColors } from '../colors/Colors';
import { Icons } from '../icons/Icons';

import MBMainBtn from '../../components/buttons/MBMainBtn';
import MBEmptyImageView from '../../components/images/MBEmptyImageView';
import MBMainInfoSquareBtn, { MBMainInfoSquareBtnType } from '../../components/buttons/MBMainInfoSquareBtn';

import UserSignupView from '../../views/usersignup/UserSignupView';
import LoginView from '../../views/login/LoginView';

export function getBlockedTabBottomsheetTitle() {
  return 'Olá estranho, tudo bem?!';
}

export function getBlockedTabBottomsheetDescription() {
  return "Se você já conhece a casa, faça login para acessar as sessões. Se for novo por aqui, cadastre-se e conheça mais.";
}

export function getStoreRequiredBottomsheetTitle() {
  return 'Eita, mas você tem loja??';
}

export function getStoreRequiredBottomsheetDescription() {
  return 'Parece que você ainda não possui uma loja cadastrada. Para acessar essa sessão, é necessário criar sua loja primeiro.';
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
          onPress={() => { MainNavigation.push(LoginView); }}
        />
        <MBMainInfoSquareBtn 
          icon={<Icons.plusCircle width={26} height={26} strokeColor={PrimaryColors.primary} />}
          title="Criar Cadastro"
          type={MBMainInfoSquareBtnType.LIGHT}
          description="Não tenho cadastro e quero criar uma conta."
          onPress={() => { MainNavigation.push(UserSignupView); }}
        />
      </View>
    </View>
  );
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
    position: 'relative',
    gap: 16,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
