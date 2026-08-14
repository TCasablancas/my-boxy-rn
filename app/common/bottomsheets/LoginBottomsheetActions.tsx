import { View, StyleSheet } from 'react-native';
import MainNavigation from '../navigation/MainNavigation';
import { PrimaryColors } from '../colors/Colors';
import { Icons } from '../icons/Icons';

import MBMainBtn from '../../components/ui/buttons/MBMainBtn';
import MBEmptyImageView from '../../components/ui/images/MBEmptyImageView';
import MBMainInfoSquareBtn, { MBMainInfoSquareBtnType } from '../../components/ui/buttons/MBMainInfoSquareBtn';

import UserSignupView from '../../pages/usersignup/UserSignupView';

export function renderBlockedTabBottomsheetContent(onLoginPress: () => void) {
  return (
    <View style={[styles.container]}>
      {/* <MBEmptyImageView /> */}
      <View style={styles.buttonWrapper}>
        <MBMainInfoSquareBtn 
          icon={<Icons.loginArrow width={26} height={26} strokeColor={PrimaryColors.primary} />}
          title="Fazer Login"
          description="Já possuo conta e conheço o aplicativo."
          onPress={onLoginPress}
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
    fontFamily: 'SFMonoBold',
    letterSpacing: -0.5,
    color: '#1F2A44',
    width: '100%',
    textAlign: 'left',
  },
  description: {
    fontSize: 13,
    fontFamily: 'SFMonoRegular',
    letterSpacing: -0.5,
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
