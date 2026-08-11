import React, { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { MBMainInput } from '../../../components/ui/form/MBMainInput';
import { NeutralColors, PrimaryColors } from '../../../common/colors/Colors';
import { spacing, typography } from '../../../common/constants/Typgraphy';
import { isValidEmail, isValidPhone } from '../../../common/constants/Validators';
import { maskPhone } from '../../../common/constants/Masks';
import { StepProps } from '../../../common/types/Types';
import MBMainBtn, { MBMainBtnType } from '../../../components/ui/buttons/MBMainBtn';
import MBTextBtn from '../../../components/ui/buttons/MBTextBtn';
import MBTitleDescripted from '../../../components/ui/texts/MBTitleDescripted';

export const StepContato: React.FC<StepProps> = ({ data, updateData, onNext, onBack }) => {
  const [touched, setTouched] = useState({ email: false, celular: false });

  const emailError = useMemo(() => {
    if (!touched.email) return null;
    return isValidEmail(data.email) ? null : 'Digite um e-mail válido';
  }, [data.email, touched.email]);

  const celularError = useMemo(() => {
    if (!touched.celular) return null;
    return isValidPhone(data.celular) ? null : 'Digite um celular válido com DDD';
  }, [data.celular, touched.celular]);

  const canContinue = isValidEmail(data.email) && isValidPhone(data.celular);

  const handleContinue = () => {
    setTouched({ email: true, celular: true });
    if (canContinue) onNext();
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentWrapper}>
        <MBTitleDescripted 
          colorTitle={PrimaryColors.primaryDark}
          title={'Dados para contato'} 
          description={'Vamos usar esses dados para confirmar seu cadastro, pedidos e manter você informado.'} 
        />
      </View>

      <View style={styles.inputWrapper}>
        <MBMainInput
          label="E-mail"
          placeholder="voce@email.com"
          value={data.email}
          onChangeText={(text) => updateData({ email: text.trim() })}
          onBlur={() => setTouched((t) => ({ ...t, email: true }))}
          error={emailError}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="next"
        />

        <MBMainInput
          label="Celular"
          placeholder="(00) 00000-0000"
          value={data.celular}
          onChangeText={(text) => updateData({ celular: maskPhone(text) })}
          onBlur={() => setTouched((t) => ({ ...t, celular: true }))}
          error={celularError}
          keyboardType="phone-pad"
          returnKeyType="done"
        />
      </View>
      
      <View style={styles.footerDock}>
        <MBMainBtn
          title="Continuar"
          onPress={handleContinue}
          buttonType={!canContinue ? MBMainBtnType.DISABLED : MBMainBtnType.NORMAL}
        />
        {onBack && <View style={styles.backButtonWrapper}><MBTextBtn title="voltar" onPress={onBack} /></View>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 130,
  },
  contentWrapper: {
    // gap: spacing.sm,
  },
  inputWrapper: {
    gap: 16,
  },
  title: {
    ...typography.h1,
    color: NeutralColors.text,
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.body,
    color: NeutralColors.textSecondary,
    marginBottom: spacing.lg,
  },
  footerDock: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingTop: spacing.sm,
  },
  backButtonWrapper: {
    flex: 1,
    position: 'relative',
    textAlign: 'center',
    width: '100%',
    marginVertical: spacing.md,
    alignItems: 'center',
  },
});
