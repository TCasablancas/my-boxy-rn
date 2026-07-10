import React from 'react';
import { StyleSheet, View } from 'react-native';

import { KeyboardAwareScreen } from '../../../sections/global/KeyboarAwareScreen';
// import { StepProgressHeader } from '@/components/StepProgressHeader';
import MBFloatingLabelInput from '../../../components/labels/MBFloatingLabelInput';
import MBOptionToggle from '../../../components/selectors/MBOptionToggle';
import MBProfileImagePicker from '../../../components/images/MBProfileImagePicker';
import MBMainBtn, { MBMainBtnType } from '../../../components/buttons/MBMainBtn';
import { maskPhone } from '../../../common/constants/Masks';
import { isValidEmail } from '../../../common/constants/Validators';

import { useStoreSignup } from '../../../common/contexts/StoreSignupContext';
import { StoreSignupStep } from '../../../common/types/StoreSignupTypes';
import MBTitleDescripted from '../../../components/texts/MBTitleDescripted';
import MBTitledViewHeader from '../../../components/header/MBTitledViewHeader';
import MBRoundedIconBtn from '../../../components/buttons/MBRoundedIconBtn';
import { IconsActions } from '../../../common/icons/IconsActions';
import { NeutralColors } from '../../../common/colors/Colors';
import { Icons } from '../../../common/icons/Icons';
import MainNavigation from '../../../common/navigation/MainNavigation';
import { MBMainInput } from '../../../components/form/MBMainInput';
import { STORE_SIGNUP_STEP_LABELS } from '../StoreSignupModel';
import { MBStepperHeader } from '../../../components/stepper/MBStepperHeader';

interface Props {
  navigation: { navigate: (screen: string) => void; goBack: () => void };
}

export function OwnerStep({ navigation }: Props) {
  const { state, dispatch, goNext, goBack } = useStoreSignup();
  const owner = state.draft.storeOwner;

  const update = (patch: Partial<typeof owner>) => dispatch({ type: 'UPDATE_OWNER', patch });

  const canContinue = Boolean(
    owner.name && owner.email && isValidEmail(owner.email) && owner.phoneNumber
  );

  return (
    <View style={styles.container}>
      <KeyboardAwareScreen>
        <MBTitledViewHeader 
          btnsLeft={<MBRoundedIconBtn 
            icon={<Icons.arrowBack width={16} height={16} strokeColor={NeutralColors.textSecondary} />} 
            onPress={() => goBack(StoreSignupStep.Documento, navigation)}
          />}
        />
        <MBStepperHeader steps={STORE_SIGNUP_STEP_LABELS} currentIndex={1} />
        <MBTitleDescripted 
          title="Dados da sua loja"
          description="Pedimos seu CPF para vários itens de segurança. Ele não aparece para outros usuários."
        />
        <View style={{ gap: 16 }}>
          <MBProfileImagePicker
            value={owner.profileImageUri}
            onChange={(uri) => update({ profileImageUri: uri })}
          />

          <MBMainInput
            label="Nome completo" 
            value={owner.name ?? ''} 
            onChangeText={(v) => update({ name: v })} 
          />
          <MBMainInput
            label="E-mail"
            value={owner.email ?? ''}
            onChangeText={(v) => update({ email: v })}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <MBMainInput
            label="Telefone"
            value={owner.phoneNumber ?? ''}
            onChangeText={(v) => update({ phoneNumber: maskPhone(v) })}
            keyboardType="phone-pad"
          />

          <MBOptionToggle
            label="Esse número é WhatsApp"
            value={Boolean(owner.isWhatsapp)}
            onChange={(v) => update({ isWhatsapp: v })}
          />
        </View>
      </KeyboardAwareScreen>
      <View style={styles.buttonWrapper}>
        <MBMainBtn 
          title="Continuar" 
          onPress={() => goNext(StoreSignupStep.Proprietario, navigation)} 
          buttonType={ canContinue ? MBMainBtnType.NORMAL : MBMainBtnType.DISABLED }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
  },
  buttonWrapper: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
  }
});