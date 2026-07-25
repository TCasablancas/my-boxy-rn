import React from 'react';
import { View, StyleSheet, Text, KeyboardAvoidingView, StatusBar, } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { NeutralColors, PrimaryColors } from '../../common/colors/Colors';

import MBMainBtn from '../../components/buttons/MBMainBtn';
import { MBMainBtnType } from '../../components/buttons/MBMainBtn';
import { MBMainInput } from '../../components/form/MBMainInput';
import MBTextBtn from '../../components/buttons/MBTextBtn';
import MBOptionToggle from '../../components/selectors/MBOptionToggle';

import { useLoginViewModel } from './LoginViewModel';
import MBMainSelector from '../../components/selectors/MBMainSelector';
import MBTextWithSelect from '../../components/selectors/MBTextWithSelect';
import MBCenterStripeText from '../../components/labels/MBCenterStripeText';

export default function LoginView() {
  const safeAreaInsets = useSafeAreaInsets();
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
      <View style={{flex: 1, gap: 16}}>
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
        <MBCenterStripeText text="faça login também" marginVertical={8} />
      </View>
    </KeyboardAvoidingView>
  );

  return (
    <SafeAreaProvider style={[styles.container, { paddingTop: safeAreaInsets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor={'gray'} translucent />
      <View style={styles.topContentWrapper}>
        <Text>Login View</Text>
      </View>
      {formContentView}
      <View style={styles.footerButtonsWrapper}>
        <MBTextBtn title={'Política de Privacidade'} textColor={NeutralColors.white} />
        <Text style={{color: NeutralColors.white}}>·</Text>
        <MBTextBtn title={'Termos de Serviço'} textColor={NeutralColors.white} />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 32,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'gray',
  },
  topContentWrapper: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
  },
  contentWrapper: {
    flex: 1,
    width: '100%',
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 16,
  },
  footerButtonsWrapper: {
    flexDirection: 'row', 
    gap: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtonsWrapper: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
});