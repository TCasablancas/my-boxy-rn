import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { v4 as uuidv4 } from 'uuid';
import { KeyboardAwareScreen } from '../../../sections/global/KeyboarAwareScreen';
// import { StepProgressHeader } from '@/components/StepProgressHeader';
import MBSummaryRow from '../../../components/global/MBSummaryRow';
import MBMainBtn, { MBMainBtnType } from '../../../components/buttons/MBMainBtn';

import { useStoreSignup } from '../../../common/contexts/StoreSignupContext';
import { StoreSignupModel, StoreSignupStep } from '../../../common/types/StoreSignupTypes';

interface Props {
  navigation: { goBack: () => void };
  onSubmit: (payload: StoreSignupModel) => Promise<void>;
}

export function RevisionStep({ navigation, onSubmit }: Props) {
  const { state, goBack } = useStoreSignup();
  const { draft } = state;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConfirm = async () => {
    setIsSubmitting(true);
    setError(null);
    try {
      const now = new Date().toISOString();
      const payload: StoreSignupModel = {
        storeId: uuidv4(), // troque pelo gerador de ID já usado no projeto, se houver
        storeOwner: {
          userId: draft.storeOwner.userId ?? '',
          name: draft.storeOwner.name ?? '',
          email: draft.storeOwner.email ?? '',
          phoneNumber: draft.storeOwner.phoneNumber ?? '',
          isWhatsapp: draft.storeOwner.isWhatsapp,
          profileImageUri: draft.storeOwner.profileImageUri ?? '',
        },
        storeName: draft.storeName ?? '',
        storeAlias: draft.storeAlias ?? '',
        storeDescription: draft.storeDescription ?? '',
        storeAddress: draft.storeAddress as StoreSignupModel['storeAddress'],
        storePhoneNumber: draft.storePhoneNumber ?? '',
        isWhatsapp: draft.isWhatsapp,
        storeEmail: draft.storeEmail ?? '',
        createdAt: now,
        updatedAt: now,
      };

      await onSubmit(payload);
    } catch (e) {
      setError('Não foi possível concluir o cadastro. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <KeyboardAwareScreen>
      {/* <StepProgressHeader title="Revisão" subtitle="Confira os dados antes de criar sua loja" currentStep={6} totalSteps={6} /> */}

      <View style={{ gap: 12 }}>
        <MBSummaryRow label="Proprietário" value={draft.storeOwner.name} />
        <MBSummaryRow label="E-mail do proprietário" value={draft.storeOwner.email} />
        <MBSummaryRow label="Nome da loja" value={draft.storeName} />
        <MBSummaryRow label="Alias" value={draft.storeAlias} />
        <MBSummaryRow label="Telefone da loja" value={draft.storePhoneNumber} />
        <MBSummaryRow label="E-mail da loja" value={draft.storeEmail} />
        <MBSummaryRow
          label="Endereço"
          value={draft.storeAddress ? `${draft.storeAddress.rua ?? ''}, ${draft.storeAddress.numero ?? ''}` : ''}
        />
      </View>

      {error && <Text>{error}</Text>}

      <MBMainBtn 
        title={isSubmitting ? 'Criando loja...' : 'Criar loja'} 
        onPress={handleConfirm} 
        buttonType={isSubmitting ? MBMainBtnType.DISABLED : MBMainBtnType.NORMAL} 
      />
      <MBMainBtn 
        title="Voltar" 
        buttonType={MBMainBtnType.DISABLED} 
        onPress={() => goBack(StoreSignupStep.Revisao, navigation)} 
      />
    </KeyboardAwareScreen>
  );
}