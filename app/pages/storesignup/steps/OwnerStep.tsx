import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { spacing } from '../../../common/constants/Sizes';
import MBOptionToggle from '../../../components/ui/selectors/MBOptionToggle';
import MBProfileImagePicker from '../../../components/ui/images/MBProfileImagePicker';
import MBMainBtn, { MBMainBtnType } from '../../../components/ui/buttons/MBMainBtn';
import { maskPhone } from '../../../common/constants/Masks';
import { isValidEmail } from '../../../common/constants/Validators';
import MBTitleDescripted from '../../../components/ui/texts/MBTitleDescripted';
import { MBMainInput } from '../../../components/ui/form/MBMainInput';
import type { StoreSignupStepProps } from '../StoreSignupModel';
import MBTextBtn from '../../../components/ui/buttons/MBTextBtn';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ScrollViewKeyboard from '../../../components/sections/global/ScrollViewKeyboard';
import { useKeyboard } from '../../../common/constants/UseKeyboard';
import { NeutralColors, PrimaryColors } from '../../../common/colors/Colors';

export function OwnerStep({ data, updateData, onNext, onBack }: StoreSignupStepProps) {

  const canContinue = Boolean(
    data.ownerName && data.ownerEmail && isValidEmail(data.ownerEmail) && data.ownerPhoneNumber
  );

  return (
    <SafeAreaProvider>
      <ScrollViewKeyboard children={
        <>
        <View style={styles.container}>
          <MBTitleDescripted
            colorTitle={PrimaryColors.primaryDark}
            title="Dados do proprietário"
            description="Essas informações ficarão vinculadas à conta de loja."
          />
          <View style={[{ gap: spacing.lg }]}>
            {/* <MBProfileImagePicker
              value={data.ownerProfileImageUri}
              onChange={(uri) => updateData({ ownerProfileImageUri: uri })}
            /> */}
            <MBMainInput
              label="Nome completo"
              value={data.ownerName}
              onChangeText={(value) => updateData({ ownerName: value })}
            />
            <MBMainInput
              label="E-mail"
              value={data.ownerEmail}
              onChangeText={(value) => updateData({ ownerEmail: value })}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <MBMainInput
              label="Telefone"
              value={data.ownerPhoneNumber}
              onChangeText={(value) => updateData({ ownerPhoneNumber: maskPhone(value) })}
              keyboardType="phone-pad"
            />
            <MBOptionToggle
              label="Esse número é WhatsApp"
              value={data.ownerIsWhatsapp}
              onChange={(value) => updateData({ ownerIsWhatsapp: value })}
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
  }
});