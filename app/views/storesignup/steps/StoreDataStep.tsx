import React from 'react';
import { View } from 'react-native';
import { KeyboardAwareScreen } from '../../../sections/global/KeyboarAwareScreen';
// import { StepProgressHeader } from '@/components/StepProgressHeader';
import MBFloatingLabelInput from '../../../components/labels/MBFloatingLabelInput';
import MBMainBtn, { MBMainBtnType } from '../../../components/buttons/MBMainBtn';
import { slugify } from '../../../common/types/Text';

import { useStoreSignup } from '../../../common/contexts/StoreSignupContext';
import { StoreSignupStep } from '../../../common/types/StoreSignupTypes';
import { GlobalNavigationProps } from '../../../models/NavigationModel';

export function StoreDataStep({ navigation }: GlobalNavigationProps) {
  const { state, dispatch, goNext, goBack } = useStoreSignup();
  const { draft } = state;

  const update = (patch: Partial<typeof draft>) => dispatch({ type: 'UPDATE_STORE', patch });

  const handleChangeName = (value: string) => {
    update({ storeName: value, storeAlias: draft.storeAlias || slugify(value) });
  };

  const canContinue = Boolean(draft.storeName && draft.storeAlias);

  return (
    <KeyboardAwareScreen>
      {/* <StepProgressHeader title="Dados da loja" subtitle="Como sua loja vai aparecer para os compradores" currentStep={3} totalSteps={6} /> */}

      <View style={{ gap: 16 }}>
        <MBFloatingLabelInput label="Nome da loja" value={draft.storeName ?? ''} onChangeText={handleChangeName} />

        <MBFloatingLabelInput
          label="Alias (usado na URL da loja)"
          value={draft.storeAlias ?? ''}
          onChangeText={(v) => update({ storeAlias: slugify(v) })}
          autoCapitalize="none"
        />

        <MBFloatingLabelInput
          label="Descrição da loja"
          value={draft.storeDescription ?? ''}
          onChangeText={(v) => update({ storeDescription: v })}
          multiline
          numberOfLines={4}
        />
      </View>

      <MBMainBtn 
        title="Continuar" 
        onPress={() => goNext(StoreSignupStep.DadosLoja, navigation)} 
        buttonType={canContinue ? MBMainBtnType.NORMAL : MBMainBtnType.DISABLED} 
      />
      <MBMainBtn 
        title="Voltar" 
        buttonType={MBMainBtnType.DISABLED} 
        onPress={() => goBack(StoreSignupStep.DadosLoja, navigation)} 
      />
    </KeyboardAwareScreen>
  );
}