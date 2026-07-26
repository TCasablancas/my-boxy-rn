import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { NeutralColors, PrimaryColors } from '../../../common/colors/Colors';
import { spacing } from '../../../common/constants/Sizes';
import { MBMainInput } from '../../../components/form/MBMainInput';
import MBMainBtn, { MBMainBtnType } from '../../../components/buttons/MBMainBtn';
import { maskCPF } from '../../../common/constants/Masks';
import { isValidCPF } from '../../../common/constants/Validators';
import MBTitleDescripted from '../../../components/texts/MBTitleDescripted';
import type { StoreSignupStepProps } from '../StoreSignupModel';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import ScrollViewKeyboard from '../../../sections/global/ScrollViewKeyboard';

export function DocumentStep({ data, updateData, onNext }: StoreSignupStepProps) {
  const safeAreaInsets = useSafeAreaInsets();
  const canContinue = isValidCPF(data.storeDocument.replace(/\D/g, ''));

  return (
    <SafeAreaProvider>
      <ScrollViewKeyboard children={
        <>
          <View style={styles.container}>
          <MBTitleDescripted
            colorTitle={PrimaryColors.primaryDark}
            title="Documento do proprietário"
            description="Informe o CPF que vinculará esta conta de loja."
          />
          <MBMainInput
            label="CPF"
            value={data.storeDocument}
            onChangeText={(value) => updateData({ storeDocument: maskCPF(value) })}
            keyboardType="numeric"
            maxLength={14}
          />
        </View>
        </>
      }/>
      <View style={styles.buttonWrapper}>
        <MBMainBtn
          title="Continuar"
          onPress={onNext}
          buttonType={canContinue ? MBMainBtnType.NORMAL : MBMainBtnType.DISABLED}
          flex={1}
        />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.lg,
  },
   buttonWrapper: {
    gap: spacing.xl,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: NeutralColors.background,
    paddingTop: spacing.lg,
  },
});