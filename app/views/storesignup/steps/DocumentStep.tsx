import React, { useCallback, useRef } from 'react';
import { View, Text } from 'react-native';

// Componentes e utilitários já existentes no projeto — trocar pelos nomes/paths reais:
import { KeyboardAwareScreen } from '@/components/KeyboardAwareScreen';
import { MBStepperHeader } from '../../../components/stepper/MBStepperHeader';
import { MBMainInput } from '../../../components/form/MBMainInput';
import { OptionToggle } from '@/components/OptionToggle';
import { InlineInfoCard } from '@/components/InlineInfoCard';
import MBMainBtn, { MBMainBtnType } from '../../../components/buttons/MBMainBtn';
import { maskCPF } from '../../../common/constants/Masks';
import { isValidCPF } from '../../../common/constants/Validators';
import { useDebouncedCallback } from '@/hooks/useDebouncedCallback';

import { useStoreSignup } from '../../../common/contexts/StoreSignupContext';
import { StoreSignupStep } from '../../../common/types/StoreSignupTypes';
import { findUserByCpf, getCurrentAuthenticatedUser } from '../../../common/constants/StoreOwnerSearch';
import { STORE_SIGNUP_STEP_LABELS } from '../StoreSignupModel';

interface Props {
  navigation: { navigate: (screen: string) => void; goBack: () => void };
}

export function DocumentStep({ navigation }: Props) {
  const { state, dispatch, goNext } = useStoreSignup();
  const { cpf, documentSource, isSearchingCpf, existingUserMatch, hasAppliedAutofill } = state;

  // evita disparar busca duplicada pro mesmo CPF
  const lastSearchedCpf = useRef<string>('');

  const searchByCpf = useCallback(async (rawCpf: string) => {
    const digits = rawCpf.replace(/\D/g, '');
    if (digits.length !== 11 || !isValidCPF(digits) || digits === lastSearchedCpf.current) return;

    lastSearchedCpf.current = digits;
    dispatch({ type: 'SET_SEARCHING', isSearching: true });
    try {
      const match = await findUserByCpf(digits);
      dispatch({ type: 'SET_EXISTING_MATCH', match });
    } finally {
      dispatch({ type: 'SET_SEARCHING', isSearching: false });
    }
  }, [dispatch]);

  const debouncedSearch = useDebouncedCallback(searchByCpf, 500);

  const handleChangeCpf = (value: string) => {
    const masked = maskCPF(value);
    dispatch({ type: 'SET_CPF', cpf: masked });
    if (documentSource !== 'manual') dispatch({ type: 'SET_DOCUMENT_SOURCE', source: 'manual' });
    debouncedSearch(masked);
  };

  // Usuário optou por usar os dados da própria conta já cadastrada
  const handleUseExistingAccount = async (enabled: boolean) => {
    if (!enabled) {
      dispatch({ type: 'SET_DOCUMENT_SOURCE', source: 'manual' });
      return;
    }
    dispatch({ type: 'SET_DOCUMENT_SOURCE', source: 'existingAccount' });
    const currentUser = await getCurrentAuthenticatedUser();
    if (currentUser?.phoneNumber) {
      // aproveita o CPF já conhecido da conta, se existir, e dispara a mesma busca
      dispatch({ type: 'SET_CPF', cpf: maskCPF((currentUser as any).cpf ?? '') });
    }
    if (currentUser) {
      dispatch({ type: 'SET_EXISTING_MATCH', match: currentUser });
    }
  };

  const handleApplyAutofill = () => {
    dispatch({ type: 'APPLY_AUTOFILL' });
  };

  const canContinue = isValidCPF(cpf.replace(/\D/g, ''));

  const handleContinue = () => {
    goNext(StoreSignupStep.Documento, navigation);
  };

  return (
    <KeyboardAwareScreen>
      <MBStepperHeader
        steps={STORE_SIGNUP_STEP_LABELS}
        currentIndex={1}
      />

      <View style={{ gap: 16 }}>
        <OptionToggle
          label="Usar dados da minha conta já cadastrada"
          value={documentSource === 'existingAccount'}
          onChange={handleUseExistingAccount}
        />

        <MBMainInput
          label="CPF"
          value={cpf}
          onChangeText={handleChangeCpf}
          keyboardType="numeric"
          maxLength={14}
          editable={documentSource === 'manual'}
        />

        {isSearchingCpf && <Text>Buscando cadastro com este CPF...</Text>}

        {!isSearchingCpf && existingUserMatch && !hasAppliedAutofill && (
          <InlineInfoCard
            title="Encontramos um cadastro com este CPF"
            description={`Podemos preencher automaticamente os dados de ${existingUserMatch.name} nos próximos passos.`}
            actionLabel="Usar estes dados"
            onAction={handleApplyAutofill}
          />
        )}

        {hasAppliedAutofill && existingUserMatch && (
          <InlineInfoCard
            title="Dados preenchidos automaticamente"
            description={`Vamos usar as informações de ${existingUserMatch.name}. Você poderá revisar tudo no próximo passo.`}
            actionLabel="Preencher manualmente"
            onAction={() => dispatch({ type: 'DISMISS_AUTOFILL' })}
          />
        )}
      </View>

      <MBMainBtn 
        title="Continuar" 
        onPress={handleContinue} buttonType={ canContinue ? MBMainBtnType.NORMAL : MBMainBtnType.DISABLED } 
      />
    </KeyboardAwareScreen>
  );
}