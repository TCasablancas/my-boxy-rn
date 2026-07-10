import React from 'react';
import { View } from 'react-native';

import { KeyboardAwareScreen } from '@/components/KeyboardAwareScreen';
import { StepProgressHeader } from '@/components/StepProgressHeader';
import { FloatingLabelInput } from '@/components/FloatingLabelInput';
import { PrimaryButton } from '@/components/PrimaryButton';
import { slugify } from '@/utils/text';

import { useStoreSignup } from '../../../common/contexts/StoreSignupContext';
import { StoreSignupStep } from '../../../common/types/StoreSignupTypes';

interface Props {
  navigation: { navigate: (screen: string) => void; goBack: () => void };
}

export function StoreDataStep({ navigation }: Props) {
  const { state, dispatch, goNext, goBack } = useStoreSignup();
  const { draft } = state;

  const update = (patch: Partial<typeof draft>) => dispatch({ type: 'UPDATE_STORE', patch });

  const handleChangeName = (value: string) => {
    // gera o alias automaticamente a partir do nome, mas deixa o usuário editar depois
    update({ storeName: value, storeAlias: draft.storeAlias || slugify(value) });
  };

  const canContinue = Boolean(draft.storeName && draft.storeAlias);

  return (
    <KeyboardAwareScreen>
      <StepProgressHeader title="Dados da loja" subtitle="Como sua loja vai aparecer para os compradores" currentStep={3} totalSteps={6} />

      <View style={{ gap: 16 }}>
        <FloatingLabelInput label="Nome da loja" value={draft.storeName ?? ''} onChangeText={handleChangeName} />

        <FloatingLabelInput
          label="Alias (usado na URL da loja)"
          value={draft.storeAlias ?? ''}
          onChangeText={(v) => update({ storeAlias: slugify(v) })}
          autoCapitalize="none"
        />

        <FloatingLabelInput
          label="Descrição da loja"
          value={draft.storeDescription ?? ''}
          onChangeText={(v) => update({ storeDescription: v })}
          multiline
          numberOfLines={4}
        />
      </View>

      <PrimaryButton label="Continuar" onPress={() => goNext(StoreSignupStep.DadosLoja, navigation)} disabled={!canContinue} />
      <PrimaryButton label="Voltar" variant="ghost" onPress={() => goBack(StoreSignupStep.DadosLoja, navigation)} />
    </KeyboardAwareScreen>
  );
}