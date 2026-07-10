import React from 'react';
import { View } from 'react-native';

import { KeyboardAwareScreen } from '@/components/KeyboardAwareScreen';
import { StepProgressHeader } from '@/components/StepProgressHeader';
import { FloatingLabelInput } from '@/components/FloatingLabelInput';
import { OptionToggle } from '@/components/OptionToggle';
import { ProfileImagePicker } from '@/components/ProfileImagePicker';
import MBMainBtn, { MBMainBtnType } from '../../../components/buttons/MBMainBtn';
import { maskPhone } from '../../../common/constants/Masks';
import { isValidEmail } from '../../../common/constants/Validators';

import { useStoreSignup } from '../../../common/contexts/StoreSignupContext';
import { StoreSignupStep } from '../../../common/types/StoreSignupTypes';

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
    <KeyboardAwareScreen>
      <StepProgressHeader
        title="Proprietário da loja"
        subtitle={state.hasAppliedAutofill ? 'Revise os dados preenchidos automaticamente' : 'Conte um pouco sobre você'}
        currentStep={2}
        totalSteps={6}
      />

      <View style={{ gap: 16 }}>
        <ProfileImagePicker
          value={owner.profileImageUri}
          onChange={(uri) => update({ profileImageUri: uri })}
        />

        <FloatingLabelInput label="Nome completo" value={owner.name ?? ''} onChangeText={(v) => update({ name: v })} />

        <FloatingLabelInput
          label="E-mail"
          value={owner.email ?? ''}
          onChangeText={(v) => update({ email: v })}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <FloatingLabelInput
          label="Telefone"
          value={owner.phoneNumber ?? ''}
          onChangeText={(v) => update({ phoneNumber: maskPhone(v) })}
          keyboardType="phone-pad"
        />

        <OptionToggle
          label="Esse número é WhatsApp"
          value={Boolean(owner.isWhatsapp)}
          onChange={(v) => update({ isWhatsapp: v })}
        />
      </View>

      <MBMainBtn 
        title="Continuar" 
        onPress={() => goNext(StoreSignupStep.Proprietario, navigation)} 
        buttonType={ canContinue ? MBMainBtnType.NORMAL : MBMainBtnType.DISABLED }
    />
      <MBMainBtn 
        title="Voltar" 
        buttonType={MBMainBtnType.DISABLED} 
        onPress={() => goBack(StoreSignupStep.Proprietario, navigation)} 
      />
    </KeyboardAwareScreen>
  );
}