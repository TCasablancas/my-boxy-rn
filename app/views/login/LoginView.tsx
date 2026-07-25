import React from 'react';
import { View, StyleSheet, Text, KeyboardAvoidingView, StatusBar, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NeutralColors, PrimaryColors } from '../../common/colors/Colors';
import { useLoginViewModel } from './LoginViewModel';
import { IconsSocial } from '../../common/icons/IconsSocial';
import { Icons } from '../../common/icons/Icons';

import MBMainBtn from '../../components/buttons/MBMainBtn';
import { MBMainBtnType } from '../../components/buttons/MBMainBtn';
import { MBMainInput } from '../../components/form/MBMainInput';
import MBTextBtn, { MBTextBtnSize } from '../../components/buttons/MBTextBtn';

import MBTextWithSelect from '../../components/selectors/MBTextWithSelect';
import MBCenterStripeText from '../../components/labels/MBCenterStripeText';
import MBRoundedIconBtn from '../../components/buttons/MBRoundedIconBtn';
import MBTitledViewHeader from '../../components/header/MBTitledViewHeader';
import MBTitleDescripted from '../../components/texts/MBTitleDescripted';
import MainNavigation from '../../common/navigation/MainNavigation';

export default function LoginView() {
  const navigation = useNavigation();
  const {
    formData,
    formErrors,
    isSubmitting,
    canSubmit,
    onChangeEmailOrUser,
    onChangePassword,
    onSubmitLogin,
    isKeepConnectedEnabled,
    onChangeKeepConnected,
  } = useLoginViewModel();

  const formContentView = (
    <KeyboardAvoidingView style={styles.contentWrapper} behavior="padding">
      {/* <View style={{gap: 18, flexDirection: 'column', alignItems: 'stretch', justifyContent: 'space-around'}}> */}
        <MBMainInput
          label={'Email ou usuário'}
          placeholder="seu_email@exemplo.com.br"
          value={formData.emailOrUser}
          onChangeText={onChangeEmailOrUser}
          error={formErrors.emailOrUser}
          loading={isSubmitting}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <MBMainInput
          label={'Senha'}
          placeholder="sua senha"
          value={formData.password}
          onChangeText={onChangePassword}
          error={formErrors.password}
          loading={isSubmitting}
          secureTextEntry
        />
        <View style={styles.actionButtonsWrapper}>
          <MBTextBtn 
            title={'Esqueci minha senha'} 
            textColor={PrimaryColors.mainBlue} 
            onPress={() => {}}
          />
          <MBTextWithSelect 
            text="Manter Conectado" 
            value={isKeepConnectedEnabled ? 'on' : 'off'} 
            onChange={() => onChangeKeepConnected(!isKeepConnectedEnabled)} 
          />
        </View>
        <MBMainBtn
          title="Fazer Login"
          buttonType={canSubmit ? MBMainBtnType.NORMAL : MBMainBtnType.DISABLED}
          onPress={() => { onSubmitLogin(); }}
        />
        <MBCenterStripeText text="ou" marginVertical={8} />
        <Text style={styles.socialMediaDisclaimer}>
          Faça seu login utilizando sua conta em uma das redes sociais abaixo
        </Text>
        <View style={styles.loginWithSocialButtonsWrapper}>
          <MBRoundedIconBtn 
            icon={<IconsSocial.facebookSquare width={24} height={24} strokeColor="#FFF" />} 
            backgroundColor={PrimaryColors.mainBlue}
            onPress={() => {}}
          />
          <MBRoundedIconBtn 
            icon={<IconsSocial.googleSquare width={24} height={24} strokeColor="#FFF" />} 
            backgroundColor={PrimaryColors.mainRed}
            onPress={() => {}}
          />
          <MBRoundedIconBtn 
            icon={<IconsSocial.apple width={24} height={24} fillColor="#000" strokeColor='#000' />}
            onPress={() => {}}
          />
        </View>
      {/* </View> */}
    </KeyboardAvoidingView>
  );

  return (
    <SafeAreaProvider style={[styles.container]}>
      <StatusBar barStyle="dark-content" backgroundColor={NeutralColors.backgroundAlt} translucent />
      <MBTitledViewHeader 
        title="Login"
        btnsLeft={<MBRoundedIconBtn 
          icon={<Icons.arrowBack width={16} height={16} strokeColor={NeutralColors.textSecondary} />} 
          onPress={() => { MainNavigation.pop(); }}
        />}
      />
      <View style={styles.topContentWrapper}>
        <MBTitleDescripted 
          title="Bem-vindo de volta!"
          description={
            <>
            <Text>Se você já tem cadastro, faça login para continuar.</Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontFamily: 'SNPro-Regular', fontSize: 16, color: NeutralColors.text }}>
                Se ainda não tem, {''}
              </Text>
              <MBTextBtn title={'clique aqui.'} textColor={PrimaryColors.mainBlue} size={MBTextBtnSize.LARGE} /> 
            </View>
            </>
          }
          alignment="center"
        />
      </View>
      {formContentView}
      <Text style={styles.footerButtonsWrapper}>
        Ao criar sua conta, você concorda com a nossa.
        <MBTextBtn title={'Política de Privacidade e'} textColor={NeutralColors.textSecondary} />
        <MBTextBtn title={' Termos de Serviço'} textColor={NeutralColors.textSecondary} />
      </Text>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  socialMediaDisclaimer: {
    fontSize: 14,
    fontFamily: 'SNPro-Regular',
    color: NeutralColors.textSecondary,
    textAlign: 'center',
  },
  container: {
    padding: 16,
    gap: 26,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'space-around',
    backgroundColor: NeutralColors.backgroundAlt,
  },
  topContentWrapper: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentWrapper: {
    // flex: 1,
    gap: 16,
    width: '100%',
    padding: 20,
    paddingBottom: 32,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    borderRadius: 16,
    boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.2)',
    
  },
  footerButtonsWrapper: {
    flexDirection: 'row', 
    gap: 16,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontFamily: 'SNPro-Light',
    fontSize: 14,
  },
  actionButtonsWrapper: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  loginWithSocialButtonsWrapper: {
    flexDirection: 'row',
    gap: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 24,
  },
});