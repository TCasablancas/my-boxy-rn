import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ScrollViewKeyboard from '../../../components/sections/global/ScrollViewKeyboard';
import { spacing } from '../../../common/constants/Sizes';
import { NeutralColors, PrimaryColors } from '../../../common/colors/Colors';

import MBTextBtn from '../../../components/ui/buttons/MBTextBtn';
import MBSummaryRow from '../../../components/ui/global/MBSummaryRow';
import MBMainBtn from '../../../components/ui/buttons/MBMainBtn';
import MBTitleDescripted from '../../../components/ui/texts/MBTitleDescripted';

import type { StoreSignupRevisionStepProps } from '../StoreSignupModel';

export function RevisionStep({ data, onBack, onSubmit }: StoreSignupRevisionStepProps) {
  const addressLine = [
    data.storeAddress.logradouro, data.storeAddress.numero
  ].filter(Boolean).join(', ');

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <ScrollViewKeyboard
        children={
          <>
          <View style={styles.container}>
            <MBTitleDescripted
              colorTitle={PrimaryColors.primaryDark}
              title="Revisão final"
              description="Confira os dados antes de concluir o cadastro da loja."
            />
            <View style={[{ gap: spacing.md }]}>
              <MBSummaryRow label="Documento" value={data.storeDocument} />
              <MBSummaryRow label="Proprietário" value={data.ownerName} />
              <MBSummaryRow label="E-mail do proprietário" value={data.ownerEmail} />
              <MBSummaryRow label="Telefone do proprietário" value={data.ownerPhoneNumber} />
              <MBSummaryRow label="Nome da loja" value={data.storeName} />
              <MBSummaryRow label="Alias" value={data.storeAlias} />
              <MBSummaryRow label="Descrição" value={data.storeDescription} />
              <MBSummaryRow label="Telefone da loja" value={data.storePhoneNumber} />
              <MBSummaryRow label="E-mail da loja" value={data.storeEmail} />
              <MBSummaryRow label="Endereço" value={addressLine} />
            </View>
          </View>
          </>
      } />
      <View style={styles.buttonWrapper}>
        <MBTextBtn title="Voltar" onPress={onBack} />
        <MBMainBtn title="Criar loja" onPress={onSubmit} flex={1} />
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