import React from 'react';
import { KeyboardAwareScreen } from '@/components/KeyboardAwareScreen';
import { StepProgressHeader } from '@/components/StepProgressHeader';
import MBMainBtn, { MBMainBtnType } from '../../../components/buttons/MBMainBtn';
import { StepEndereco } from '../../usersignup/steps/StepEndereco';
import { useStoreSignup } from '../../../common/contexts/StoreSignupContext';
import { StoreSignupStep } from '../../../common/types/StoreSignupTypes';
import { GlobalNavigationProps } from '../../../models/NavigationModel';

export function AddressStep({ navigation }: GlobalNavigationProps) {
  const { state, dispatch, goNext, goBack } = useStoreSignup();
  const { storeAddress } = state.draft;

  const [isAddressValid, setIsAddressValid] = React.useState(false);

  return (
    <KeyboardAwareScreen>
      <StepProgressHeader title="Endereço da loja" subtitle="Onde sua loja está localizada" currentStep={5} totalSteps={6} />

      <StepEndereco
        data={storeAddress}
        updateData={(patch: typeof storeAddress) => dispatch({ type: 'UPDATE_ADDRESS', patch })}
        // onValidChange={setIsAddressValid}
        onNext={() => goNext(StoreSignupStep.Endereco, navigation)}
        onBack={() => goBack(StoreSignupStep.Endereco, navigation)}
      />

      <MBMainBtn 
        title="Continuar" 
        onPress={() => goNext(StoreSignupStep.Endereco, navigation)} 
        buttonType={!isAddressValid ? MBMainBtnType.DISABLED : MBMainBtnType.NORMAL} 
      />
      <MBMainBtn 
        title="Voltar" 
        buttonType={MBMainBtnType.DISABLED} 
        onPress={() => goBack(StoreSignupStep.Endereco, navigation)} 
      />
    </KeyboardAwareScreen>
  );
}