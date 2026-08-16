import { KeyboardAvoidingView, View, Text } from 'react-native';
import { MBTextBtnSize } from '../../../components/ui/buttons/MBTextBtn';
import { PrimaryColors } from '../../../common/colors/Colors';
import { IconsSocial } from '../../../common/icons/IconsSocial';
import { styles } from '../styles';

import { MBMainInput } from '../../../components/ui/form/MBMainInput';
import MBTextBtn from '../../../components/ui/buttons/MBTextBtn';
import MBTextWithSelect from '../../../components/ui/selectors/MBTextWithSelect';
import MBMainBtn, { MBMainBtnType } from '../../../components/ui/buttons/MBMainBtn';
import MBCenterStripeText from '../../../components/ui/labels/MBCenterStripeText';
import MBRoundedIconBtn from '../../../components/ui/buttons/MBRoundedIconBtn';

import { useLoginViewModel } from '../login.model';

export default function LoginForm() {
  const {
    formData,
    formErrors,
    isSubmitting,
    loginError,
    canSubmit,
    onChangeEmailOrUser,
    onChangePassword,
    onSubmitLogin,
    isKeepConnectedEnabled,
    onChangeKeepConnected,
  } = useLoginViewModel();

  return (
    <KeyboardAvoidingView style={styles.contentWrapper} behavior="padding">
      <MBMainInput
        label={'Email ou usuário'}
        // placeholder="seu_email@exemplo.com.br"
        value={formData.emailOrUser}
        onChangeText={onChangeEmailOrUser}
        error={formErrors.emailOrUser}
        loading={isSubmitting}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <MBMainInput
        label={'Senha'}
        // placeholder="sua senha"
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
          size={MBTextBtnSize.XSMALL}
          onPress={() => {}}
        />
        <MBTextWithSelect 
          text="manter conectado" 
          value={isKeepConnectedEnabled ? 'on' : 'off'} 
          onChange={() => onChangeKeepConnected(!isKeepConnectedEnabled)} 
        />
      </View>
      <MBMainBtn
        title="Fazer Login"
        buttonType={canSubmit ? MBMainBtnType.NORMAL : MBMainBtnType.DISABLED}
        onPress={() => { onSubmitLogin(); }}
      />
      {loginError ? <Text style={styles.loginErrorText}>{loginError}</Text> : null}
      <MBCenterStripeText text="ou entre com" marginVertical={8} />
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
    </KeyboardAvoidingView>
  );
}