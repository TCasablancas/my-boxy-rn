import React from 'react';
import type { CadastroFormData } from '../../../common/types/Types';
import { StepEndereco } from '../../usersignup/steps/StepEndereco';
import type { StoreSignupStepProps } from '../StoreSignupModel';

export function AddressStep({ data, updateData, onNext, onBack }: StoreSignupStepProps) {
  const cadastroCompatData = {
    endereco: data.storeAddress,
  } as CadastroFormData;

  return (
    <StepEndereco
      data={cadastroCompatData}
      updateData={(patch) => {
        if (!patch.endereco) {
          return;
        }
        updateData({ storeAddress: { ...data.storeAddress, ...patch.endereco } });
      }}
      onNext={onNext}
      onBack={onBack}
    />
  );
}