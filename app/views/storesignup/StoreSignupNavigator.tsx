import React from 'react';
// Troque pela sua implementação real de stack navigator (ex: React Navigation)
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { StoreSignupProvider } from '../../common/contexts/StoreSignupContext';
import { StoreSignupStep, StoreSignupModel } from '../../common/types/StoreSignupTypes';
import { DocumentStep } from './steps/DocumentStep';
import { OwnerStep } from './steps/OwnerStep';
import { StoreDataStep } from './steps/StoreDataStep';
import { StoreContactStep } from './steps/StoreContactStep';
import { AddressStep } from './steps/AddressStep';
import { RevisionStep } from './steps/RevisionStep';

const Stack = createNativeStackNavigator();

interface StoreSignupNavigatorProps {
  onSubmit: (payload: StoreSignupModel) => Promise<void>;
}

export default function StoreSignupNavigator({ onSubmit }: StoreSignupNavigatorProps) {
  return (
    <StoreSignupProvider>
      <Stack.Navigator initialRouteName={StoreSignupStep.Documento} screenOptions={{ headerShown: false }}>
        <Stack.Screen name={StoreSignupStep.Documento} component={DocumentStep} />
        <Stack.Screen name={StoreSignupStep.Proprietario} component={OwnerStep} />
        <Stack.Screen name={StoreSignupStep.DadosLoja} component={StoreDataStep} />
        <Stack.Screen name={StoreSignupStep.ContatoLoja} component={StoreContactStep} />
        <Stack.Screen name={StoreSignupStep.Endereco} component={AddressStep} />
        <Stack.Screen name={StoreSignupStep.Revisao}>
          {(props: any) => <RevisionStep {...props} onSubmit={onSubmit} />}
        </Stack.Screen>
      </Stack.Navigator>
    </StoreSignupProvider>
  );
}