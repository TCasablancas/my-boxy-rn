import React, {  } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ScrollViewKeyboard from '../../../sections/global/ScrollViewKeyboard';
import { spacing } from '../../../common/constants/Sizes';
import { slugify } from '../../../common/types/Text';

import MBMainBtn, { MBMainBtnType } from '../../../components/buttons/MBMainBtn';
import MBTextBtn from '../../../components/buttons/MBTextBtn';
import MBTitleDescripted from '../../../components/texts/MBTitleDescripted';
import { MBMainInput } from '../../../components/form/MBMainInput';

import type { StoreSignupStepProps } from '../StoreSignupModel';
import { useKeyboard } from '../../../common/constants/UseKeyboard';
import { NeutralColors, PrimaryColors } from '../../../common/colors/Colors';

export function StoreDataStep({ 
  data, updateData, onNext, onBack 
}: StoreSignupStepProps) {
  const handleChangeName = (value: string) => {
    updateData({ storeName: value, storeAlias: data.storeAlias || slugify(value) });
  };

  const canContinue = Boolean(data.storeName && data.storeAlias && data.storeDescription);

  return (
    <SafeAreaProvider>
      <ScrollViewKeyboard children={
        <>
          <View style={styles.container}>
            <MBTitleDescripted
              colorTitle={PrimaryColors.primaryDark}
              title="Dados da loja"
              description="Defina como sua loja será apresentada para os compradores."
            />
            <View style={[{ gap: spacing.lg }]}>
              <MBMainInput 
                label="Nome da loja" 
                value={data.storeName} 
                onChangeText={handleChangeName} 
              />
              <MBMainInput
                label="Alias da loja"
                value={data.storeAlias}
                onChangeText={(value) => updateData({ storeAlias: slugify(value) })}
                autoCapitalize="none"
              />
              <MBMainInput
                label="Descrição da loja"
                value={data.storeDescription}
                onChangeText={(value) => updateData({ storeDescription: value })}
                multiline
                numberOfLines={4}
              />
            </View>
          </View>
        </>
      }/>
      <View style={[
        styles.buttonWrapper, 
        { marginBottom: useKeyboard() ? -46 : 0 }
      ]}>
        {onBack ? <MBTextBtn title="Voltar" onPress={onBack} /> : null}
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
    paddingLeft: spacing.xl,
    paddingRight: spacing.lg,
    marginTop: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: NeutralColors.background,
    paddingTop: spacing.lg,
  },
});